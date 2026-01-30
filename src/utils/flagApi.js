/**
 * Flag API utilities for authenticated user operations.
 *
 * Auth detection: GET /user/login_status?_format=json → returns 1 or 0
 * User UUID:     GET /jsonapi (with credentials) → meta.links.me.meta.id
 * Read flags:    GET /jsonapi/flagging/appverse_apps → user's flaggings
 * Create flag:   POST /jsonapi/flagging/appverse_apps (with explicit uid relationship)
 * Delete flag:   DELETE /jsonapi/flagging/appverse_apps/{flaggingId}
 * CSRF tokens:   GET /session/token → token for write operations
 */

// CSRF token cache - fetch once per session
let csrfToken = null;
let csrfTokenPromise = null;

/**
 * Check if user is authenticated, fetch their UUID, and fetch their flaggings.
 */
export async function checkAuthAndFetchFlags(apiBaseUrl = '/api', siteBaseUrl = '') {
  if (import.meta.env.DEV) {
    return { authenticated: true, flaggedIds: [], userUuid: null };
  }

  const baseUrl = getFlagApiBaseUrl(siteBaseUrl);
  const loginStatusUrl = `${baseUrl}/user/login_status?_format=json`;

  try {
    const statusResponse = await fetch(loginStatusUrl, {
      credentials: 'include'
    });

    if (!statusResponse.ok) {
      console.error('[FlagApi] Login status check failed:', statusResponse.status);
      return { authenticated: false, flaggedIds: [], userUuid: null };
    }

    const loginStatus = await statusResponse.json();

    if (loginStatus !== 1) {
      return { authenticated: false, flaggedIds: [], userUuid: null };
    }

    // Fetch user UUID and flaggings in parallel
    const [userUuid, flagResult] = await Promise.all([
      fetchUserUuid(apiBaseUrl),
      fetchFlaggings(apiBaseUrl),
    ]);

    return {
      authenticated: true,
      userUuid,
      flaggedIds: flagResult.flaggedIds,
      flaggingMap: flagResult.flaggingMap,
    };
  } catch (error) {
    console.error('[FlagApi] Auth check failed:', error);
    return { authenticated: false, flaggedIds: [], userUuid: null };
  }
}

/**
 * Fetch current user's UUID from the JSON:API root endpoint.
 * Drupal exposes meta.links.me.meta.id for authenticated users.
 */
async function fetchUserUuid(apiBaseUrl) {
  try {
    const response = await fetch(apiBaseUrl, { credentials: 'include' });
    if (!response.ok) {
      console.error('[FlagApi] JSON:API root fetch failed:', response.status);
      return null;
    }
    const data = await response.json();
    const uuid = data?.meta?.links?.me?.meta?.id;
    if (!uuid) {
      console.error('[FlagApi] No user UUID in JSON:API root response');
    }
    return uuid || null;
  } catch (error) {
    console.error('[FlagApi] Failed to fetch user UUID:', error);
    return null;
  }
}

/**
 * Fetch user's flaggings via JSON:API.
 */
async function fetchFlaggings(apiBaseUrl) {
  try {
    const flaggingsUrl = `${apiBaseUrl}/flagging/appverse_apps`;
    const flagResponse = await fetch(flaggingsUrl, { credentials: 'include' });

    if (!flagResponse.ok) {
      console.error('[FlagApi] Flaggings fetch failed:', flagResponse.status);
      return { flaggedIds: [], flaggingMap: {} };
    }

    const data = await flagResponse.json();
    const flaggedIds = [];
    const flaggingMap = {};
    for (const flagging of (data.data || [])) {
      const appId = flagging.relationships?.flagged_entity?.data?.id;
      if (appId) {
        flaggedIds.push(appId);
        flaggingMap[appId] = flagging.id;
      }
    }

    return { flaggedIds, flaggingMap };
  } catch (error) {
    console.error('[FlagApi] Flaggings fetch failed:', error);
    return { flaggedIds: [], flaggingMap: {} };
  }
}

function getFlagApiBaseUrl(siteBaseUrl) {
  if (import.meta.env.DEV) {
    return '';
  }
  return siteBaseUrl;
}

/**
 * Fetch CSRF token from Drupal (cached for session).
 */
export async function getCsrfToken(siteBaseUrl = '') {
  if (csrfToken) {
    return csrfToken;
  }
  if (csrfTokenPromise) {
    return csrfTokenPromise;
  }

  const baseUrl = getFlagApiBaseUrl(siteBaseUrl);
  const tokenUrl = `${baseUrl}/session/token`;

  csrfTokenPromise = fetch(tokenUrl, {
    credentials: 'include'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch CSRF token: ${response.statusText}`);
      }
      return response.text();
    })
    .then(token => {
      csrfToken = token;
      csrfTokenPromise = null;
      return token;
    })
    .catch(error => {
      csrfTokenPromise = null;
      throw error;
    });

  return csrfTokenPromise;
}

export function clearCsrfToken() {
  csrfToken = null;
  csrfTokenPromise = null;
}

/**
 * Flag an app by creating a flagging entity via JSON:API.
 *
 * @param {string} appId - App UUID (for the flagged_entity relationship)
 * @param {number} nid - Drupal node ID (entity_id attribute)
 * @param {string} userUuid - Current user's UUID (for the uid relationship)
 * @param {string} apiBaseUrl - JSON:API base URL
 * @param {string} siteBaseUrl - Base URL for Drupal endpoints
 * @returns {Promise<{flaggingId: string}>}
 */
export async function flagApp(appId, nid, userUuid, apiBaseUrl = '/api', siteBaseUrl = '') {
  const token = await getCsrfToken(siteBaseUrl);

  const body = {
    data: {
      type: 'flagging--appverse_apps',
      attributes: {
        entity_type: 'node',
        entity_id: String(nid),
      },
      relationships: {
        uid: {
          data: { type: 'user--user', id: userUuid }
        },
        flagged_entity: {
          data: { type: 'node--appverse_app', id: appId }
        }
      }
    }
  };

  const url = `${apiBaseUrl}/flagging/appverse_apps`;
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'application/vnd.api+json',
      'X-CSRF-Token': token,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error('[FlagApi] Flag failed:', response.status, text);
    throw new Error(`Flag failed: ${response.status}`);
  }

  const data = await response.json();
  return { flaggingId: data.data?.id };
}

/**
 * Unflag an app by deleting the flagging entity via JSON:API.
 *
 * @param {string} flaggingId - Flagging entity UUID
 * @param {string} apiBaseUrl - JSON:API base URL
 * @param {string} siteBaseUrl - Base URL for Drupal endpoints
 */
export async function unflagApp(flaggingId, apiBaseUrl = '/api', siteBaseUrl = '') {
  const token = await getCsrfToken(siteBaseUrl);

  const url = `${apiBaseUrl}/flagging/appverse_apps/${flaggingId}`;
  const response = await fetch(url, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Accept': 'application/vnd.api+json',
      'X-CSRF-Token': token,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    console.error('[FlagApi] Unflag failed:', response.status, text);
    throw new Error(`Unflag failed: ${response.status}`);
  }
}
