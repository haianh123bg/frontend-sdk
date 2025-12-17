"use client"

import { useEffect, useState } from "react"

export interface UseMediaQueryOptions {
  defaultValue?: boolean
  initializeWithValue?: boolean
}

export function useMediaQuery(query: string, options: UseMediaQueryOptions = {}) {
  const { defaultValue = false, initializeWithValue = true } = options

  const [matches, setMatches] = useState<boolean>(() => {
    if (!initializeWithValue) return defaultValue
    if (typeof window === "undefined") return defaultValue
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    if (typeof window === "undefined") return

    const mql = window.matchMedia(query)
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches)

    setMatches(mql.matches)

    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", onChange)
      return () => mql.removeEventListener("change", onChange)
    }

    const legacyMql = mql as unknown as {
      addListener: (listener: (e: MediaQueryListEvent) => void) => void
      removeListener: (listener: (e: MediaQueryListEvent) => void) => void
    }

    legacyMql.addListener(onChange)
    return () => legacyMql.removeListener(onChange)
  }, [query])

  return matches
}
