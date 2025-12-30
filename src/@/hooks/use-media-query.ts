import { useEffect, useState } from 'react'

export function useMediaQuery(query: string, defaultState = false) {
  const [matches, setMatches] = useState<boolean>(defaultState)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mql = window.matchMedia(query)
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches)

    setMatches(mql.matches)

    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}
