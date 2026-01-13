export declare enum SchemaType {
    STRING = "string",
    NUMBER = "number",
    INTEGER = "integer",
    BOOLEAN = "boolean",
    ARRAY = "array",
    OBJECT = "object",
    NULL = "null"
}
export type SchemaValue = unknown;
export type ColumnSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export interface ResponsiveWidth {
    xs?: ColumnSpan;
    sm?: ColumnSpan;
    md?: ColumnSpan;
    lg?: ColumnSpan;
    xl?: ColumnSpan;
    '2xl'?: ColumnSpan;
}
export interface Schema {
    type: SchemaType;
    title?: string;
    description?: string;
    nullable?: boolean;
    format?: string;
    enum?: string[];
    maxItems?: string | number;
    minItems?: string | number;
    items?: Schema;
    properties?: {
        [key: string]: Schema;
    };
    required?: string[];
    minProperties?: string | number;
    maxProperties?: string | number;
    propertyOrdering?: string[];
    minLength?: string | number;
    maxLength?: string | number;
    pattern?: string;
    minimum?: number;
    maximum?: number;
    example?: SchemaValue;
    default?: SchemaValue;
    anyOf?: Schema[];
}
