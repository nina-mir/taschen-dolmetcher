import { useEffect, useState } from 'react'

export type Route = 'game' | 'archive'

function readRoute(): Route {
  return window.location.hash.replace(/^#\/?/, '') === 'archive' ? 'archive' : 'game'
}

/**
 * Tiny router: the page is chosen by the part of the URL after "#".
 *   …/taschen-dolmetcher/           → the game
 *   …/taschen-dolmetcher/#/archive  → the archive
 * Hash URLs need no server setup, so they work on GitHub Pages as-is.
 */
export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(readRoute)

  useEffect(() => {
    const onChange = () => {
      setRoute(readRoute())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return route
}
