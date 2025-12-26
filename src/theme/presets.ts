import type { ThemeDefinition } from './types'

export const defaultTheme = { name: 'default' } satisfies ThemeDefinition

export const emeraldTheme = {
  name: 'emerald',
  vars: {
    light: {
      '--color-primary-500': '#10b981',
      '--color-primary-foreground': '#052e16',
    },
    dark: {
      '--color-primary-500': '#34d399',
      '--color-primary-foreground': '#052e16',
    },
  },
} satisfies ThemeDefinition

export const violetTheme = {
  name: 'violet',
  vars: {
    light: {
      '--color-primary-500': '#7c3aed',
      '--color-primary-foreground': '#ffffff',
    },
    dark: {
      '--color-primary-500': '#a78bfa',
      '--color-primary-foreground': '#1e1b4b',
    },
  },
} satisfies ThemeDefinition

export const themePresets = [defaultTheme, emeraldTheme, violetTheme] satisfies ThemeDefinition[]
