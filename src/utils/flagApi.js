/**
 * Flag API utilities for authenticated user operations
 * Handles CSRF tokens and session-based authentication with Drupal Flag module
 */

// CSRF token cache - fetch once per session
let csrfToken = null;
let csrfTokenPromise = null;

/**
 * Check if user is authenticated using Drupal's /user/login_status endpoint,
 * then fetch their flaggings if logged in.
 *
 * Previous approach checked /jsonapi/flagging/appverse_apps response status,
 * but that endpoint returns 200 for anonymous users too.
 *
 * @param {string} apiBaseUrl - Base URL for JSON:API calls
 * @param {string} siteBaseUrl - Base URL for non-API Drupal endpoints
 * @returns {Promise<{authenticated: boolean, flaggedIds: string[]}>}
 */
export async function checkAuthAndFetchFlags(apiBaseUrl = '/api', siteBaseUrl = '') {
  if (import.meta.env.DEV) {
    console.log('[FlagApi] Dev mode: simulating authenticated user');
    return { authenticated: true, flaggedIds: [] };
  }

  // Step 1: Check login status via Drupal core endpoint
  // Returns 1 for logged-in, 0 for anonymous
  const baseUrl = getFlagApiBaseUrl(siteBaseUrl);
  const loginStatusUrl = `${baseUrl}/user/login_status?_format=json`;
  console.log('[FlagApi] Checking login status:', loginStatusUrl);

  try {
    const statusResponse = await fetch(loginStatusUrl, {
      credentials: 'include'
    });

    console.log('[FlagApi] Login status response:', statusResponse.status);

    if (!statusResponse.ok) {
      console.error('[FlagApi] Login status check failed:', statusResponse.status);
      return { authenticated: false, flaggedIds: [] };
    }

    const loginStatus = await statusResponse.json();
    console.log('[FlagApi] Login status value:', loginStatus);

    if (loginStatus !== 1) {
      console.log('[FlagApi] User not authenticated (login_status =', loginStatus, ')');
      return { authenticated: false, flaggedIds: [] };
    }

    // Step 2: Fetch current user UUID and flaggings in parallel
    // Drupal's /user redirects logged-in users to /user/{uid}
    // With ?_format=json it returns the user entity as JSON
    const flaggingsUrl = `${apiBaseUrl}/flagging/appverse_apps`;
    const userUrl = `${baseUrl}/user?_format=json`;
    console.log('[FlagApi] User authenticated, fetching flaggings and user info');
    console.log('[FlagApi] User URL:', userUrl);

    const [flagResponse, userResponse] = await Promise.all([
      fetch(flaggingsUrl, { credentials: 'include' }),
      fetch(userUrl, { credentials: 'include' })
    ]);

    // Parse user UUID from Drupal REST user endpoint
    // Response format: { uuid: [{value: "..."}], uid: [{value: N}], ... }
    let userUuid = null;
    console.log('[FlagApi] User endpoint response:', userResponse.status, 'url:', userResponse.url);
    if (userResponse.ok) {
      try {
        const contentType = userResponse.headers.get('content-type') || '';
        if (contentType.includes('json')) {
          const userData = await userResponse.json();
          console.log('[FlagApi] User data keys:', Object.keys(userData));
          if (userData.uuid) {
            userUuid = Array.isArray(userData.uuid) ? userData.uuid[0]?.value : userData.uuid;
            console.log('[FlagApi] Current user UUID:', userUuid);
          }
        } else {
          console.warn('[FlagApi] User endpoint returned non-JSON:', contentType);
        }
      } catch (e) {
        console.error('[FlagApi] Failed to parse user response:', e.message);
      }
    } else {
      console.error('[FlagApi] User endpoint failed:', userResponse.status);
    }

    if (!flagResponse.ok) {
      console.error('[FlagApi] Flaggings fetch failed:', flagResponse.status);
      return { authenticated: true, flaggedIds: [], userUuid };
    }

    const data = await flagResponse.json();
    // Build both a list of flagged app UUIDs and a map of appId → flaggingId
    // (the flagging UUID is needed for unflagging via JSON:API DELETE)
    const flaggedIds = [];
    const flaggingMap = {};
    for (const flagging of (data.data || [])) {
      const appId = flagging.relationships?.flagged_entity?.data?.id;
      if (appId) {
        flaggedIds.push(appId);
        flaggingMap[appId] = flagging.id;
      }
    }

    console.log('[FlagApi] Authenticated, user has', flaggedIds.length, 'flagged apps:', flaggedIds);
    return { authenticated: true, flaggedIds, flaggingMap, userUuid };
  } catch (error) {
    console.error('[FlagApi] Auth check failed:', error);
    return { authenticated: false, flaggedIds: [] };
  }
}

/**
 * Get the base URL for flag-related API calls.
 * In dev mode, we use empty string so requests go through Vite's proxy.
 * In production (embedded in Drupal), we use the provided siteBaseUrl.
 * @param {string} siteBaseUrl - Base URL for site (non-API endpoints)
 * @returns {string}
 */
function getFlagApiBaseUrl(siteBaseUrl) {
  // In dev mode, always use proxy (empty base URL)
  if (import.meta.env.DEV) {
    return '';
  }
  return siteBaseUrl;
}

/**
 * Fetch CSRF token from Drupal (cached for session)
 * @param {string} siteBaseUrl - Base URL for site (non-API endpoints)
 * @returns {Promise<string>}
 */
export async function getCsrfToken(siteBaseUrl = '') {
  // Return cached token if available
  if (csrfToken) {
    return csrfToken;
  }

  // Return pending promise if already fetching (deduplicate concurrent requests)
  if (csrfTokenPromise) {
    return csrfTokenPromise;
  }

  // Fetch and cache
  const baseUrl = getFlagApiBaseUrl(siteBaseUrl);
  const tokenUrl = `${baseUrl}/session/token`;
  console.log('[FlagApi] Fetching CSRF token from:', tokenUrl);

  csrfTokenPromise = fetch(tokenUrl, {
    credentials: 'include'
  })
    .then(response => {
      console.log('[FlagApi] CSRF token response status:', response.status);
      if (!response.ok) {
        throw new Error(`Failed to fetch CSRF token: ${response.statusText}`);
      }
      return response.text();
    })
    .then(token => {
      console.log('[FlagApi] CSRF token received successfully');
      csrfToken = token;
      csrfTokenPromise = null;
      return token;
    })
    .catch(error => {
      console.error('[FlagApi] CSRF token fetch failed:', error.message);
      csrfTokenPromise = null;
      throw error;
    });

  return csrfTokenPromise;
}

/**
 * Clear cached CSRF token (e.g., on logout or session expiry)
 */
export function clearCsrfToken() {
  csrfToken = null;
  csrfTokenPromise = null;
}

/**
 * Flag an app via JSON:API (create a flagging entity)
 * @param {string} appId - App UUID
 * @param {number} nid - Drupal node ID (required as entity_id attribute)
 * @param {string} userUuid - Current user's UUID (required for uid relationship)
 * @param {string} apiBaseUrl - Base URL for JSON:API calls
 * @param {string} siteBaseUrl - Base URL for CSRF token endpoint
 * @returns {Promise<{flaggingId: string}>} The created flagging entity's UUID
 */
export async function flagApp(appId, nid, userUuid, apiBaseUrl, siteBaseUrl = '') {
  const token = await getCsrfToken(siteBaseUrl);
  const flagUrl = `${apiBaseUrl}/flagging/appverse_apps`;

  const relationships = {
    flagged_entity: {
      data: {
        type: 'node--appverse_app',
        id: appId
      }
    }
  };

  // Explicitly set uid — Drupal JSON:API doesn't always resolve it from the session
  if (userUuid) {
    relationships.uid = {
      data: {
        type: 'user--user',
        id: userUuid
      }
    };
  }

  const body = {
    data: {
      type: 'flagging--appverse_apps',
      attributes: {
        entity_type: 'node',
        entity_id: String(nid),
      },
      relationships
    }
  };

  console.log('[FlagApi] Flagging app via JSON:API POST:', flagUrl, { appId, nid });

  const response = await fetch(flagUrl, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'X-CSRF-Token': token,
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'application/vnd.api+json'
    },
    body: JSON.stringify(body)
  });

  console.log('[FlagApi] Flag response:', response.status, response.statusText);

  if (response.status === 403) {
    throw new Error('Not authenticated');
  }

  if (!response.ok) {
    const text = await response.text();
    console.error('[FlagApi] Flag failed:', text);
    throw new Error(`Failed to flag app: ${response.statusText}`);
  }

  const data = await response.json();
  const flaggingId = data.data?.id;
  console.log('[FlagApi] Flag success, flagging UUID:', flaggingId);
  return { flaggingId };
}

/**
 * Unflag an app via JSON:API (delete the flagging entity)
 * @param {string} flaggingId - Flagging entity UUID (not the app UUID)
 * @param {string} apiBaseUrl - Base URL for JSON:API calls
 * @param {string} siteBaseUrl - Base URL for CSRF token endpoint
 */
export async function unflagApp(flaggingId, apiBaseUrl, siteBaseUrl = '') {
  const token = await getCsrfToken(siteBaseUrl);
  const unflagUrl = `${apiBaseUrl}/flagging/appverse_apps/${flaggingId}`;

  console.log('[FlagApi] Unflagging via JSON:API DELETE:', unflagUrl, { flaggingId });

  const response = await fetch(unflagUrl, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'X-CSRF-Token': token,
      'Accept': 'application/vnd.api+json'
    }
  });

  console.log('[FlagApi] Unflag response:', response.status, response.statusText);

  if (response.status === 403) {
    throw new Error('Not authenticated');
  }

  // JSON:API DELETE returns 204 No Content on success
  if (!response.ok) {
    const text = await response.text();
    console.error('[FlagApi] Unflag failed:', text);
    throw new Error(`Failed to unflag app: ${response.statusText}`);
  }

  console.log('[FlagApi] Unflag success');
}

