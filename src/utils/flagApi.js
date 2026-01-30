/**
 * Flag API utilities for authenticated user operations.
 *
 * WHAT WORKS:
 * - Auth detection: GET /user/login_status?_format=json → returns 1 or 0
 * - Reading flags: GET /jsonapi/flagging/appverse_apps → returns user's flaggings
 * - CSRF tokens: GET /session/token → returns token for write operations
 *
 * WHAT WE NEED TO SOLVE:
 * Creating/deleting flaggings. Two approaches have been tried:
 *
 * 1) JSON:API POST /jsonapi/flagging/appverse_apps
 *    → 500: uid is NULL. JSON:API bypasses Flag module logic and does a raw
 *      INSERT without setting uid from the session. We couldn't get the user's
 *      UUID to pass explicitly (user entity not exposed via JSON:API or REST).
 *
 * 2) REST entity POST /entity/flagging?_format=json
 *    → 422 "flag_id field is missing" (body format unclear)
 *    → 500 after adjusting body (likely same uid problem)
 *
 * The Flag module's own action endpoints (/flag/flag/..., /flag/unflag/...)
 * would handle uid automatically, but they return 404 — those routes don't
 * exist in this Flag module version even with the Flagging REST resource enabled.
 *
 * flagApp() and unflagApp() below are stubs that log the request details.
 * Use browser devtools or curl to experiment with the correct endpoint/body
 * format, then update these functions once a working approach is found.
 */

// CSRF token cache - fetch once per session
let csrfToken = null;
let csrfTokenPromise = null;

/**
 * Check if user is authenticated, then fetch their flaggings.
 * This part works reliably.
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
    console.log('[FlagApi] Login status:', loginStatus);

    if (loginStatus !== 1) {
      return { authenticated: false, flaggedIds: [] };
    }

    // Fetch flaggings via JSON:API (this works)
    const flaggingsUrl = `${apiBaseUrl}/flagging/appverse_apps`;
    const flagResponse = await fetch(flaggingsUrl, { credentials: 'include' });

    if (!flagResponse.ok) {
      console.error('[FlagApi] Flaggings fetch failed:', flagResponse.status);
      return { authenticated: true, flaggedIds: [] };
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

    console.log('[FlagApi] Authenticated, user has', flaggedIds.length, 'flagged apps');
    return { authenticated: true, flaggedIds, flaggingMap };
  } catch (error) {
    console.error('[FlagApi] Auth check failed:', error);
    return { authenticated: false, flaggedIds: [] };
  }
}

function getFlagApiBaseUrl(siteBaseUrl) {
  if (import.meta.env.DEV) {
    return '';
  }
  return siteBaseUrl;
}

/**
 * Fetch CSRF token from Drupal (cached for session). This works.
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
 * Flag an app — NO-OP STUB. Logs context info only, makes no requests.
 * Once a working Drupal endpoint/body is confirmed, wire it in here.
 *
 * @param {number} nid - Drupal node ID of the app
 * @param {string} siteBaseUrl - Base URL for Drupal endpoints
 * @returns {Promise<{flaggingId: string}>}
 */
export async function flagApp(nid, siteBaseUrl = '') {
  console.log('[FlagApi] === FLAG (no-op) ===');
  console.log('[FlagApi] App NID:', nid);
  console.log('[FlagApi] siteBaseUrl:', JSON.stringify(siteBaseUrl));
  console.log('[FlagApi] drupalSettings.user:', JSON.stringify(window.drupalSettings?.user));
  console.log('[FlagApi] drupalSettings.path:', JSON.stringify(window.drupalSettings?.path));
  console.log('[FlagApi] Origin:', window.location.origin);
  console.log('[FlagApi] Cookie present:', document.cookie.length > 0);

  // No request made — return a fake flaggingId so the UI toggles
  return { flaggingId: 'stub-' + nid };
}

/**
 * Unflag an app — NO-OP STUB. Logs context info only, makes no requests.
 *
 * @param {string} flaggingId - Flagging entity UUID
 * @param {string} siteBaseUrl - Base URL for Drupal endpoints
 */
export async function unflagApp(flaggingId, siteBaseUrl = '') {
  console.log('[FlagApi] === UNFLAG (no-op) ===');
  console.log('[FlagApi] Flagging ID:', flaggingId);
  console.log('[FlagApi] siteBaseUrl:', JSON.stringify(siteBaseUrl));
}
