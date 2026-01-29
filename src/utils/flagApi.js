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

    // Step 2: User is authenticated, fetch their flaggings
    const flaggingsUrl = `${apiBaseUrl}/flagging/appverse_apps`;
    console.log('[FlagApi] User authenticated, fetching flaggings:', flaggingsUrl);

    const flagResponse = await fetch(flaggingsUrl, {
      credentials: 'include'
    });

    if (!flagResponse.ok) {
      console.error('[FlagApi] Flaggings fetch failed:', flagResponse.status);
      // Authenticated but can't fetch flaggings — still report as authenticated
      return { authenticated: true, flaggedIds: [] };
    }

    const data = await flagResponse.json();
    const flaggedIds = (data.data || [])
      .map(flagging => flagging.relationships?.flagged_entity?.data?.id)
      .filter(Boolean);

    console.log('[FlagApi] Authenticated, user has', flaggedIds.length, 'flagged apps:', flaggedIds);
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
 * Flag an app for the current user
 * @param {number} nid - Drupal node ID (drupal_internal__nid)
 * @param {string} siteBaseUrl - Base URL for site
 * @returns {Promise<{status: boolean}>}
 */
export async function flagApp(nid, siteBaseUrl = '') {
  const baseUrl = getFlagApiBaseUrl(siteBaseUrl);
  const token = await getCsrfToken(siteBaseUrl);
  const flagUrl = `${baseUrl}/flag/flag/appverse_apps/${nid}?_format=json`;

  console.log('[FlagApi] Step 1: CSRF token from /session/token:', token);
  console.log('[FlagApi] Step 2: POST', flagUrl, {
    method: 'POST',
    credentials: 'include',
    headers: { 'X-CSRF-Token': token, 'Content-Type': 'application/json' }
  });

  const response = await fetch(flagUrl, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'X-CSRF-Token': token,
      'Content-Type': 'application/json'
    }
  });

  console.log('[FlagApi] Step 2 response:', response.status, response.statusText);

  if (response.status === 403) {
    throw new Error('Not authenticated');
  }

  if (!response.ok) {
    const text = await response.text();
    console.error('[FlagApi] Flag failed:', text);
    throw new Error(`Failed to flag app: ${response.statusText}`);
  }

  const data = await response.json();
  console.log('[FlagApi] Flag success:', data);
  return data;
}

/**
 * Unflag an app for the current user
 * @param {number} nid - Drupal node ID
 * @param {string} siteBaseUrl - Base URL for site
 * @returns {Promise<{status: boolean}>}
 */
export async function unflagApp(nid, siteBaseUrl = '') {
  const baseUrl = getFlagApiBaseUrl(siteBaseUrl);
  const token = await getCsrfToken(siteBaseUrl);
  const unflagUrl = `${baseUrl}/flag/unflag/appverse_apps/${nid}?_format=json`;

  console.log('[FlagApi] Step 1: CSRF token from /session/token:', token);
  console.log('[FlagApi] Step 3: POST', unflagUrl, {
    method: 'POST',
    credentials: 'include',
    headers: { 'X-CSRF-Token': token, 'Content-Type': 'application/json' }
  });

  const response = await fetch(unflagUrl, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'X-CSRF-Token': token,
      'Content-Type': 'application/json'
    }
  });

  console.log('[FlagApi] Step 3 response:', response.status, response.statusText);

  if (response.status === 403) {
    throw new Error('Not authenticated');
  }

  if (!response.ok) {
    const text = await response.text();
    console.error('[FlagApi] Unflag failed:', text);
    throw new Error(`Failed to unflag app: ${response.statusText}`);
  }

  const data = await response.json();
  console.log('[FlagApi] Unflag success:', data);
  return data;
}

