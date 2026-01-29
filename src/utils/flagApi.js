/**
 * Flag API utilities for authenticated user operations
 * Handles CSRF tokens and session-based authentication with Drupal Flag module
 */

// CSRF token cache - fetch once per session
let csrfToken = null;
let csrfTokenPromise = null;

/**
 * Check for a Drupal session cookie.
 * @returns {boolean}
 */
function hasDrupalSessionCookie() {
  // instead of document.cookie.includes('SESSaccesscisso'),
  // match SESS* or SSESS* to handle any Drupal site/protocol
  const cookies = document.cookie;
  const match = /S?SESS/.test(cookies);
  console.log('[FlagApi] Cookie check:', { cookies: cookies.substring(0, 100), match });
  return match;
}

/**
 * Check if user is authenticated by looking for session cookie
 * @returns {boolean}
 */
export function isAuthenticated() {
  // In dev mode, assume authenticated to allow UI testing
  // (actual flag operations will still fail without real Drupal session)
  if (import.meta.env.DEV) {
    console.log('[FlagApi] Dev mode: simulating authenticated user');
    return true;
  }
  const hasSession = hasDrupalSessionCookie();
  console.log('[FlagApi] isAuthenticated:', hasSession);
  return hasSession;
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

  console.log('[FlagApi] Flagging app:', { nid, flagUrl });

  const response = await fetch(flagUrl, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'X-CSRF-Token': token,
      'Content-Type': 'application/json'
    }
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

  console.log('[FlagApi] Unflagging app:', { nid, unflagUrl });

  const response = await fetch(unflagUrl, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'X-CSRF-Token': token,
      'Content-Type': 'application/json'
    }
  });

  console.log('[FlagApi] Unflag response:', response.status, response.statusText);

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

/**
 * Fetch the current user's flagged apps via JSON:API
 * Returns the UUIDs of flagged app nodes
 * @param {string} apiBaseUrl - Base URL for API calls (e.g., '/api')
 * @returns {Promise<string[]>} Array of flagged app UUIDs
 */
export async function fetchUserFlaggings(apiBaseUrl = '/api') {
  const flaggingsUrl = `${apiBaseUrl}/flagging/appverse_apps`;
  console.log('[FlagApi] Fetching user flaggings from:', flaggingsUrl);

  const response = await fetch(flaggingsUrl, {
    credentials: 'include'
  });

  console.log('[FlagApi] Flaggings response:', response.status, response.statusText);

  // Not authenticated or no flags - return empty array
  if (response.status === 403 || response.status === 401) {
    console.log('[FlagApi] User not authenticated, returning empty flaggings');
    return [];
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch flagged apps: ${response.statusText}`);
  }

  const data = await response.json();

  // Extract app UUIDs from the flagging relationships
  // Each flagging has relationships.flagged_entity.data.id which is the app UUID
  const flaggedAppIds = (data.data || [])
    .map(flagging => flagging.relationships?.flagged_entity?.data?.id)
    .filter(Boolean);

  console.log('[FlagApi] User has', flaggedAppIds.length, 'flagged apps:', flaggedAppIds);
  return flaggedAppIds;
}
