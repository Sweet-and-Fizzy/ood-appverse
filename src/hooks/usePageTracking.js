/**
 * Hook that fires appverse_page_view on every route change.
 */
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTracking } from './useTracking'

export function usePageTracking() {
  const track = useTracking()
  const { pathname } = useLocation()

  useEffect(() => {
    const isHome = pathname === '/'
    const slug = isHome ? undefined : pathname.replace(/^\//, '')

    track('page_view', {
      page_type: isHome ? 'home' : 'software_detail',
      page_path: pathname,
      ...(slug && { software_slug: slug })
    })
  }, [pathname, track])
}
