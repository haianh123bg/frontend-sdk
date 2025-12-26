import type { ThemeDefinition } from './types'
import { defaultTheme } from './presets'

const registry = new Map<string, ThemeDefinition>()

export const registerTheme = (theme: ThemeDefinition, options?: { replace?: boolean }) => {
  const name = theme?.name
  if (!name) throw new Error('ThemeDefinition.name is required')

  if (!options?.replace && registry.has(name)) {
    throw new Error(`Theme '${name}' is already registered`)
  }

  registry.set(name, theme)
}

export const registerThemes = (themes: ThemeDefinition[], options?: { replace?: boolean }) => {
  for (const theme of themes) registerTheme(theme, options)
}

export const unregisterTheme = (themeName: string) => {
  registry.delete(themeName)
}

export const getRegisteredTheme = (themeName: string) => {
  return registry.get(themeName)
}

export const listRegisteredThemes = (): ThemeDefinition[] => {
  return Array.from(registry.values())
}

export const clearRegisteredThemes = () => {
  registry.clear()
}

registerTheme(defaultTheme, { replace: true })
