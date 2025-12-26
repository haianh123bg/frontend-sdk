export type ThemeMode = 'light' | 'dark' | 'system'

export type ResolvedThemeMode = 'light' | 'dark'

export type ThemeVars = Record<string, string>

export interface ThemeDefinition {
  name: string
  vars?: {
    light?: ThemeVars
    dark?: ThemeVars
  }
}

export interface ThemeState {
  themeName: string
  mode: ThemeMode
}
