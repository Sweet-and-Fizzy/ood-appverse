/**
 * Flag API utilities for authenticated user operations.
 *
 * Auth detection: GET /user/login_status?_format=json → returns 1 or 0
 * Read flags:    GET /appverse/api/flags?_format=json → { flagged: [{ uuid, nid }] } (custom endpoint, read-only)
 * Flag app:      POST   /appverse/api/flag/{nid} → { flagged: true, changed, nid }   (custom endpoint)
 * Unflag app:    DELETE /appverse/api/flag/{nid} → { flagged: false, changed, nid }  (custom endpoint)
 * CSRF tokens:   GET /session/token → token sent as X-CSRF-Token on write requests
 *
 * The write endpoints are idempotent and act on the current session user only,
 * so no user UUID or flagging UUID is needed. JSON:API writes are no longer used.
 */

// CSRF token cache - fetch once per session
let csrfToken = null;
let csrfTokenPromise = null;

/**
 * Check if user is authenticated, and fetch their flagged app UUIDs.
 *
 * @param {string} [apiBaseUrl='/api'] - Unused. Kept for call-site compatibility; flag reads now
 *   go through siteBaseUrl like every other flag endpoint.
 * @param {string} [siteBaseUrl=''] - Base URL for Drupal endpoints
 * @returns {Promise<{authenticated: boolean, flaggedIds: string[]}>}
 */
export async function checkAuthAndFetchFlags(apiBaseUrl = '/api', siteBaseUrl = '') {
  if (import.meta.env.DEV) {
    return { authenticated: true, flaggedIds: [] };
  }

  const baseUrl = getFlagApiBaseUrl(siteBaseUrl);
  const loginStatusUrl = `${baseUrl}/user/login_status?_format=json`;

  try {
    const statusResponse = await fetch(loginStatusUrl, {
      credentials: 'include'
    });

    if (!statusResponse.ok) {
      console.error('[FlagApi] Login status check failed:', statusResponse.status);
      return { authenticated: false, flaggedIds: [] };
    }

    const loginStatus = await statusResponse.json();

    if (loginStatus !== 1) {
      return { authenticated: false, flaggedIds: [] };
    }

    const flagResult = await fetchFlaggings(siteBaseUrl);

    return {
      authenticated: true,
      flaggedIds: flagResult.flaggedIds,
    };
  } catch (error) {
    console.error('[FlagApi] Auth check failed:', error);
    return { authenticated: false, flaggedIds: [] };
  }
}

/**
 * Fetch the current user's flagged apps from the custom endpoint (read-only).
 * GET /appverse/api/flags?_format=json → { flagged: [{ uuid, nid }, ...] }
 * Returns the app UUIDs (the `uuid` of each entry). Malformed entries are skipped.
 *
 * @param {string} siteBaseUrl - Base URL for Drupal endpoints
 * @returns {Promise<{flaggedIds: string[]}>}
 */
async function fetchFlaggings(siteBaseUrl) {
  try {
    const baseUrl = getFlagApiBaseUrl(siteBaseUrl);
    const flagsUrl = `${baseUrl}/appverse/api/flags?_format=json`;
    const flagResponse = await fetch(flagsUrl, { credentials: 'include' });

    if (!flagResponse.ok) {
      console.error('[FlagApi] Flaggings fetch failed:', flagResponse.status);
      return { flaggedIds: [] };
    }

    const data = await flagResponse.json();
    if (!Array.isArray(data?.flagged)) {
      return { flaggedIds: [] };
    }

    const flaggedIds = data.flagged
      .map(entry => entry?.uuid)
      .filter(uuid => typeof uuid === 'string' && uuid.length > 0);

    return { flaggedIds };
  } catch (error) {
    console.error('[FlagApi] Flaggings fetch failed:', error);
    return { flaggedIds: [] };
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
 * Send a flag or unflag request to the custom endpoint.
 *
 * @param {'POST'|'DELETE'} method - POST to flag, DELETE to unflag
 * @param {number} nid - Drupal node ID
 * @param {string} siteBaseUrl - Base URL for Drupal endpoints
 * @param {string} label - Log/error label ('Flag' or 'Unflag')
 * @returns {Promise<{flagged: boolean, changed: boolean, nid: number}>}
 *   `changed` is false when the app was already in the requested state.
 */
async function requestFlagChange(method, nid, siteBaseUrl, label) {
  const token = await getCsrfToken(siteBaseUrl);

  const baseUrl = getFlagApiBaseUrl(siteBaseUrl);
  // _format=json makes Drupal return JSON errors with the real status; without
  // it a rejected DELETE comes back as 405 from the HTML error-page subrequest.
  const url = `${baseUrl}/appverse/api/flag/${encodeURIComponent(nid)}?_format=json`;
  const response = await fetch(url, {
    method,
    credentials: 'include',
    headers: {
      'X-CSRF-Token': token,
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const text = await response.text();
    console.error(`[FlagApi] ${label} failed:`, response.status, text);
    if (response.status === 403) {
      // Token may be stale; clear it so the next request fetches a fresh one
      clearCsrfToken();
    }
    throw new Error(`${label} failed: ${response.status}`);
  }

  return response.json();
}

/**
 * Flag an app for the current user.
 *
 * @param {number} nid - Drupal node ID
 * @param {string} siteBaseUrl - Base URL for Drupal endpoints
 * @returns {Promise<{flagged: boolean, changed: boolean, nid: number}>}
 *   `changed` is false when the app was already in the requested state.
 */
export async function flagApp(nid, siteBaseUrl = '') {
  return requestFlagChange('POST', nid, siteBaseUrl, 'Flag');
}

/**
 * Unflag an app for the current user.
 *
 * @param {number} nid - Drupal node ID
 * @param {string} siteBaseUrl - Base URL for Drupal endpoints
 * @returns {Promise<{flagged: boolean, changed: boolean, nid: number}>}
 *   `changed` is false when the app was already in the requested state.
 */
export async function unflagApp(nid, siteBaseUrl = '') {
  return requestFlagChange('DELETE', nid, siteBaseUrl, 'Unflag');
}
