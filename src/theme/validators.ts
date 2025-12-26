import type { ThemeDefinition, ThemeMode, ThemeState, ThemeVars } from './types'

const isObject = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null

export const isThemeMode = (v: unknown): v is ThemeMode => v === 'light' || v === 'dark' || v === 'system'

export const isThemeVars = (v: unknown): v is ThemeVars => {
  if (!isObject(v)) return false
  for (const value of Object.values(v)) {
    if (typeof value !== 'string') return false
  }
  return true
}

export const isThemeDefinition = (v: unknown): v is ThemeDefinition => {
  if (!isObject(v)) return false
  if (typeof v.name !== 'string' || v.name.length === 0) return false

  if (v.vars === undefined) return true
  if (!isObject(v.vars)) return false

  const varsAny = v.vars as Record<string, unknown>

  if (varsAny.light !== undefined && !isThemeVars(varsAny.light)) return false
  if (varsAny.dark !== undefined && !isThemeVars(varsAny.dark)) return false

  return true
}

export const isThemeState = (v: unknown): v is ThemeState => {
  if (!isObject(v)) return false
  if (typeof v.themeName !== 'string' || v.themeName.length === 0) return false
  if (!isThemeMode(v.mode)) return false
  return true
}
