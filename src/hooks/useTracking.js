/**
 * Hook that returns a config-bound track() function.
 * Returns a no-op if tracking is disabled via config.
 */
import { useCallback } from 'react'
import { useConfig } from '../contexts/ConfigContext'
import { track } from '../utils/tracking'

const noop = () => {}

export function useTracking() {
  const { tracking, dataLayerName } = useConfig()

  const boundTrack = useCallback(
    (eventName, params = {}) => {
      track(eventName, params, { dataLayerName })
    },
    [dataLayerName]
  )

  return tracking ? boundTrack : noop
}
