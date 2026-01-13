import { ColumnSpan, ResponsiveWidth, Schema, SchemaType } from './schema.interface';

export declare enum OptionSourceType {
    STATIC = "static",
    VIEW_QUERY = "view_query",
    API = "api",
    LOOKUP = "lookup",
    TABLE = "table"
}
export interface UiConfig {
    placeholder?: string;
    hint?: string;
    helper?: string;
    icon?: string;
    widget?: 'input' | 'textarea' | 'select' | 'date' | 'datetime' | 'richtext' | 'file';
    inputType?: string;
    rows?: number;
    file?: {
        multiple?: boolean;
        appendOnSelect?: boolean;
        accept?: string;
        maxSizeMb?: number;
        maxFiles?: number;
        mode?: 'dropzone' | 'button';
        size?: 'sm' | 'md' | 'lg';
        variant?: 'outline' | 'soft';
        fileListLayout?: 'vertical' | 'horizontal' | 'wrap';
        dropLabel?: string;
        browseLabel?: string;
        helperText?: string;
        showFileList?: boolean;
        allowRemove?: boolean;
        allowClear?: boolean;
    };
    width?: ColumnSpan | ResponsiveWidth;
    section?: string;
    order?: number;
    readOnly?: boolean;
}
export type VisibilityEffect = 'show' | 'hide' | 'enable' | 'disable' | 'require' | 'unrequire';
export type VisibilityOp = '=' | '!=' | '>' | '>=' | '<' | '<=' | 'in' | 'not_in' | 'contains';
export interface VisibilityRule {
    when: {
        field: string;
        op: VisibilityOp;
        value: any;
    };
    effect: VisibilityEffect;
}
export type ValidationType = 'required' | 'email' | 'phone' | 'regex' | 'number_range' | 'date_range' | 'file_size' | 'file_type' | 'enum_in';
export interface ValidationRule {
    type: ValidationType;
    pattern?: string;
    min?: number;
    max?: number;
    allowedTypes?: string[];
    maxSizeBytes?: number;
    message?: string;
}
export interface StaticOptionsSource {
    type: OptionSourceType.STATIC;
    options: Array<{
        id: string;
        label: string;
        color?: string;
    }>;
}
export interface ViewQueryOptionsSource {
    type: OptionSourceType.VIEW_QUERY;
    viewId: string;
    valueField: string;
    labelField: string;
    searchField?: string;
    filters?: Array<{
        field: string;
        op: VisibilityOp;
        value: any;
    }>;
}
export interface ApiOptionsSource {
    type: OptionSourceType.API;
    url: string;
    method?: 'GET' | 'POST';
    headers?: Record<string, string>;
    mapping: {
        value: string;
        label: string;
        color?: string;
    };
}
export interface LookupOptionsSource {
    type: OptionSourceType.LOOKUP;
    relationField: string;
    displayFields?: string[];
}
export interface TableOptionsSource {
    type: OptionSourceType.TABLE;
    tableId: string;
    valueField: string;
    labelField: string;
    searchField?: string;
    filters?: Array<{
        field: string;
        op: VisibilityOp;
        value: any;
    }>;
    limit?: number;
}
export type OptionsSource = StaticOptionsSource | ViewQueryOptionsSource | ApiOptionsSource | LookupOptionsSource | TableOptionsSource;
export interface FormAccessPolicy {
    isPublic?: boolean;
    allowAnonymousSubmit?: boolean;
    captchaRequired?: boolean;
    rateLimit?: {
        windowSec: number;
        max: number;
    };
    allowedDomains?: string[];
}
export interface FormSchema extends Omit<Schema, 'items' | 'properties' | 'anyOf'> {
    ui?: UiConfig;
    visibility?: VisibilityRule[];
    validation?: ValidationRule[];
    options?: OptionsSource;
    formAccess?: FormAccessPolicy;
    items?: FormSchema;
    properties?: {
        [key: string]: FormSchema;
    };
    anyOf?: FormSchema[];
}
export interface FormObjectSchema extends Omit<FormSchema, 'type'> {
    type: SchemaType.OBJECT;
    properties?: {
        [key: string]: FormSchema;
    };
    required?: string[];
}
