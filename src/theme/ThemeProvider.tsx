import * as React from 'react'
import type { ResolvedThemeMode, ThemeDefinition, ThemeMode, ThemeState, ThemeVars } from './types'

export interface ThemeContextValue {
  themeName: string
  mode: ThemeMode
  resolvedMode: ResolvedThemeMode
  theme?: ThemeDefinition
  themes: ThemeDefinition[]
  setThemeName: (themeName: string) => void
  setMode: (mode: ThemeMode) => void
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null)

export const useTheme = (): ThemeContextValue => {
  const ctx = React.useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}

export interface ThemeProviderProps {
  children: React.ReactNode
  themes?: ThemeDefinition[]
  defaultThemeName?: string
  defaultMode?: ThemeMode
  storageKey?: string
  disablePersistence?: boolean
  root?: 'documentElement' | 'body'
}

const safeParseJSON = (value: string | null): any => {
  if (!value) return null
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

const getSystemResolvedMode = (): ResolvedThemeMode => {
  if (typeof window === 'undefined') return 'light'
  const mql = window.matchMedia?.('(prefers-color-scheme: dark)')
  return mql?.matches ? 'dark' : 'light'
}

const getThemeVars = (theme: ThemeDefinition | undefined, resolvedMode: ResolvedThemeMode): ThemeVars => {
  const vars = theme?.vars?.[resolvedMode]
  return vars ?? {}
}

const applyVarsToElement = (
  el: HTMLElement,
  nextVars: ThemeVars,
  appliedKeys: Set<string>,
  originalValues: Map<string, string | null>
) => {
  for (const [key, value] of Object.entries(nextVars)) {
    if (!originalValues.has(key)) {
      const prev = el.style.getPropertyValue(key)
      originalValues.set(key, prev === '' ? null : prev)
    }

    el.style.setProperty(key, value)
    appliedKeys.add(key)
  }

  for (const key of Array.from(appliedKeys)) {
    if (key in nextVars) continue

    const original = originalValues.get(key)
    if (original == null) el.style.removeProperty(key)
    else el.style.setProperty(key, original)

    appliedKeys.delete(key)
  }
}

const resolveInitialState = (
  themes: ThemeDefinition[],
  defaultThemeName: string,
  defaultMode: ThemeMode,
  storageKey: string,
  disablePersistence?: boolean
): ThemeState => {
  if (typeof window === 'undefined' || disablePersistence) {
    return { themeName: defaultThemeName, mode: defaultMode }
  }

  const stored = safeParseJSON(window.localStorage.getItem(storageKey)) as ThemeState | null
  const storedThemeName = typeof stored?.themeName === 'string' ? stored.themeName : undefined
  const storedMode = stored?.mode === 'light' || stored?.mode === 'dark' || stored?.mode === 'system' ? stored.mode : undefined

  const hasTheme = storedThemeName ? themes.some((t) => t.name === storedThemeName) : false

  return {
    themeName: hasTheme ? (storedThemeName as string) : defaultThemeName,
    mode: storedMode ?? defaultMode,
  }
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  themes = [{ name: 'default' }],
  defaultThemeName = 'default',
  defaultMode = 'system',
  storageKey = 'rai-theme',
  disablePersistence,
  root = 'documentElement',
}) => {
  const appliedKeysRef = React.useRef<Set<string>>(new Set())
  const originalVarValuesRef = React.useRef<Map<string, string | null>>(new Map())
  const originalElementStateRef = React.useRef<{
    themeDark: boolean
    dark: boolean
    datasetTheme?: string
    datasetThemeMode?: string
  } | null>(null)
  const elementRef = React.useRef<HTMLElement | null>(null)

  const [{ themeName, mode }, setState] = React.useState<ThemeState>(() =>
    resolveInitialState(themes, defaultThemeName, defaultMode, storageKey, disablePersistence)
  )

  const [systemResolvedMode, setSystemResolvedMode] = React.useState<ResolvedThemeMode>(() => getSystemResolvedMode())

  React.useEffect(() => {
    if (typeof document === 'undefined') return

    const el = root === 'body' ? document.body : document.documentElement
    elementRef.current = el

    originalElementStateRef.current = {
      themeDark: el.classList.contains('theme-dark'),
      dark: el.classList.contains('dark'),
      datasetTheme: el.dataset.theme,
      datasetThemeMode: el.dataset.themeMode,
    }

    return () => {
      const targetEl = elementRef.current
      const original = originalElementStateRef.current
      if (!targetEl || !original) return

      for (const key of Array.from(appliedKeysRef.current)) {
        const prev = originalVarValuesRef.current.get(key)
        if (prev == null) targetEl.style.removeProperty(key)
        else targetEl.style.setProperty(key, prev)
        appliedKeysRef.current.delete(key)
      }

      targetEl.classList.toggle('theme-dark', original.themeDark)
      targetEl.classList.toggle('dark', original.dark)

      if (original.datasetTheme === undefined) delete targetEl.dataset.theme
      else targetEl.dataset.theme = original.datasetTheme

      if (original.datasetThemeMode === undefined) delete targetEl.dataset.themeMode
      else targetEl.dataset.themeMode = original.datasetThemeMode
    }
  }, [root])

  React.useEffect(() => {
    if (typeof window === 'undefined') return
    const mql = window.matchMedia?.('(prefers-color-scheme: dark)')
    if (!mql) return

    const handler = () => setSystemResolvedMode(mql.matches ? 'dark' : 'light')
    handler()

    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', handler)
      return () => mql.removeEventListener('change', handler)
    }

    mql.addListener(handler)
    return () => mql.removeListener(handler)
  }, [])

  React.useEffect(() => {
    if (typeof window === 'undefined') return
    if (disablePersistence) return
    window.localStorage.setItem(storageKey, JSON.stringify({ themeName, mode } satisfies ThemeState))
  }, [disablePersistence, mode, storageKey, themeName])

  const resolvedMode: ResolvedThemeMode = mode === 'system' ? systemResolvedMode : mode

  const theme = React.useMemo(() => themes.find((t) => t.name === themeName), [themeName, themes])

  React.useEffect(() => {
    if (typeof document === 'undefined') return

    const el = root === 'body' ? document.body : document.documentElement

    el.classList.toggle('theme-dark', resolvedMode === 'dark')
    el.classList.toggle('dark', resolvedMode === 'dark')
    el.dataset.theme = themeName
    el.dataset.themeMode = resolvedMode

    const vars = getThemeVars(theme, resolvedMode)
    applyVarsToElement(el, vars, appliedKeysRef.current, originalVarValuesRef.current)
  }, [resolvedMode, root, theme, themeName])

  const setThemeName = React.useCallback((nextThemeName: string) => {
    setState((prev) => ({ ...prev, themeName: nextThemeName }))
  }, [])

  const setMode = React.useCallback((nextMode: ThemeMode) => {
    setState((prev) => ({ ...prev, mode: nextMode }))
  }, [])

  const value = React.useMemo<ThemeContextValue>(
    () => ({
      themeName,
      mode,
      resolvedMode,
      theme,
      themes,
      setThemeName,
      setMode,
    }),
    [mode, resolvedMode, setMode, setThemeName, theme, themeName, themes]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
