/**
 * GTM DataLayer tracking utility
 * Pushes structured events to window.dataLayer for GTM consumption.
 * Does NOT inject GTM — assumes it's already loaded on the host page.
 */

/**
 * Push a tracking event to the dataLayer
 * @param {string} eventName - Event name (will be prefixed with 'appverse_')
 * @param {Object} params - Event parameters
 * @param {Object} options
 * @param {string} options.dataLayerName - Name of the dataLayer array (default: 'dataLayer')
 */
export function track(eventName, params = {}, { dataLayerName = 'dataLayer' } = {}) {
  const dl = window[dataLayerName]
  if (!Array.isArray(dl)) {
    if (import.meta.env.DEV) {
      console.debug(`[AppVerse Tracking] window.${dataLayerName} not found — event "${eventName}" not sent`)
    }
    return
  }

  const { event: _reserved, ...safeParams } = params
  dl.push({
    event: `appverse_${eventName}`,
    ...safeParams
  })
}
