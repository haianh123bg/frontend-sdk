import type { ThemeDefinition, ThemeState } from './types'

export const themeVarsJsonSchema = {
  type: 'object',
  additionalProperties: {
    type: 'string',
  },
} as const

export const themeDefinitionJsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'https://redai/sdk/theme-definition.schema.json',
  title: 'ThemeDefinition',
  type: 'object',
  additionalProperties: false,
  required: ['name'],
  properties: {
    name: { type: 'string', minLength: 1 },
    vars: {
      type: 'object',
      additionalProperties: false,
      properties: {
        light: themeVarsJsonSchema,
        dark: themeVarsJsonSchema,
      },
    },
  },
} as const

export const themeStateJsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'https://redai/sdk/theme-state.schema.json',
  title: 'ThemeState',
  type: 'object',
  additionalProperties: false,
  required: ['themeName', 'mode'],
  properties: {
    themeName: { type: 'string', minLength: 1 },
    mode: { type: 'string', enum: ['light', 'dark', 'system'] },
  },
} as const

export type ThemeDefinitionJsonSchema = typeof themeDefinitionJsonSchema
export type ThemeStateJsonSchema = typeof themeStateJsonSchema

export type ThemeDefinitionFromSchema = ThemeDefinition
export type ThemeStateFromSchema = ThemeState
