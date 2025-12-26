export enum SchemaType {
  STRING = 'string',
  NUMBER = 'number',
  INTEGER = 'integer',
  BOOLEAN = 'boolean',
  ARRAY = 'array',
  OBJECT = 'object',
  NULL = 'null',
}

export type SchemaValue = unknown

export interface ResponsiveWidth {
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
}

export interface Schema {
  type: SchemaType

  title?: string
  description?: string
  nullable?: boolean

  format?: string

  enum?: string[]

  maxItems?: string
  minItems?: string
  items?: Schema

  properties?: { [key: string]: Schema }
  required?: string[]
  minProperties?: string
  maxProperties?: string
  propertyOrdering?: string[]

  minLength?: string
  maxLength?: string
  pattern?: string

  minimum?: number
  maximum?: number

  example?: SchemaValue
  default?: SchemaValue

  anyOf?: Schema[]
}
