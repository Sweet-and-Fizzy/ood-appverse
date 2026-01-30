/**
 * Flag API utilities for authenticated user operations
 * Uses Drupal Flag module REST endpoints for flag/unflag actions,
 * and JSON:API for reading the current user's flaggings.
 */

// CSRF token cache - fetch once per session
let csrfToken = null;
let csrfTokenPromise = null;

/**
 * Check if user is authenticated using Drupal's /user/login_status endpoint,
 * then fetch their flaggings if logged in.
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

    // User is authenticated — fetch their flaggings via JSON:API
    const flaggingsUrl = `${apiBaseUrl}/flagging/appverse_apps`;
    const flagResponse = await fetch(flaggingsUrl, { credentials: 'include' });

    if (!flagResponse.ok) {
      console.error('[FlagApi] Flaggings fetch failed:', flagResponse.status);
      return { authenticated: true, flaggedIds: [] };
    }

    const data = await flagResponse.json();
    const flaggedIds = [];
    for (const flagging of (data.data || [])) {
      const appId = flagging.relationships?.flagged_entity?.data?.id;
      if (appId) {
        flaggedIds.push(appId);
      }
    }

    console.log('[FlagApi] Authenticated, user has', flaggedIds.length, 'flagged apps');
    return { authenticated: true, flaggedIds };
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

/**
 * Clear cached CSRF token (e.g., on logout or session expiry)
 */
export function clearCsrfToken() {
  csrfToken = null;
  csrfTokenPromise = null;
}

/**
 * Flag an app via Flag module REST endpoint.
 * The Flag module handles uid/session resolution internally.
 * @param {number} nid - Drupal node ID of the app to flag
 * @param {string} siteBaseUrl - Base URL for Drupal endpoints
 */
export async function flagApp(nid, siteBaseUrl = '') {
  const token = await getCsrfToken(siteBaseUrl);
  const baseUrl = getFlagApiBaseUrl(siteBaseUrl);
  const flagUrl = `${baseUrl}/flag/flag/appverse_apps/${nid}?_format=json`;

  console.log('[FlagApi] Flagging app:', flagUrl);

  const response = await fetch(flagUrl, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'X-CSRF-Token': token,
      'Content-Type': 'application/json',
    }
  });

  console.log('[FlagApi] Flag response:', response.status);

  if (response.status === 403) {
    throw new Error('Not authenticated');
  }

  if (!response.ok) {
    const text = await response.text();
    console.error('[FlagApi] Flag failed:', text);
    throw new Error(`Failed to flag app: ${response.statusText}`);
  }

  console.log('[FlagApi] Flag success');
}

/**
 * Unflag an app via Flag module REST endpoint.
 * @param {number} nid - Drupal node ID of the app to unflag
 * @param {string} siteBaseUrl - Base URL for Drupal endpoints
 */
export async function unflagApp(nid, siteBaseUrl = '') {
  const token = await getCsrfToken(siteBaseUrl);
  const baseUrl = getFlagApiBaseUrl(siteBaseUrl);
  const unflagUrl = `${baseUrl}/flag/unflag/appverse_apps/${nid}?_format=json`;

  console.log('[FlagApi] Unflagging app:', unflagUrl);

  const response = await fetch(unflagUrl, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'X-CSRF-Token': token,
      'Content-Type': 'application/json',
    }
  });

  console.log('[FlagApi] Unflag response:', response.status);

  if (response.status === 403) {
    throw new Error('Not authenticated');
  }

  if (!response.ok) {
    const text = await response.text();
    console.error('[FlagApi] Unflag failed:', text);
    throw new Error(`Failed to unflag app: ${response.statusText}`);
  }

  console.log('[FlagApi] Unflag success');
}
