import * as React from 'react'
import {
  useForm,
  useFieldArray,
  useFormContext,
  type FieldValues,
  type UseFormProps,
  type UseFormReturn,
  type SubmitHandler,
  type SubmitErrorHandler,
  type Resolver,
  type FieldErrors,
} from 'react-hook-form'
import { Form } from './Form'
import { FormField } from '../../molecules/FormField/FormField'
import { FormFieldController } from '../../molecules/FormField/FormFieldController'
import { Button } from '../../atoms/Button/Button'
import { Input } from '../../atoms/Input/Input'
import { Textarea } from '../../atoms/Textarea/Textarea'
import { Checkbox } from '../../atoms/Checkbox/Checkbox'
import { Select, type SelectOption } from '../../atoms/Select/Select'
import { SelectLazy, type FetchOptionsResult } from '../../atoms/Select/SelectLazy'
import { DatePicker } from '../../atoms/DatePicker/DatePicker'
import { DatetimePicker } from '../../atoms/DatetimePicker/DatetimePicker'
import { TiptapEditor } from '../../atoms/TiptapEditor/TiptapEditor'
import { FileUploader } from '../../molecules/FileUploader/FileUploader'
import { Grid, type GridSizeConfig } from '../../atoms/Grid/Grid'

import {
  OptionSourceType,
  SchemaType,
  type FormObjectSchema,
  type FormSchema,
  type OptionsSource,
  type TableOptionsSource,
  type ViewQueryOptionsSource,
  type LookupOptionsSource,
  type ApiOptionsSource,
  type StaticOptionsSource,
  type VisibilityOp,
} from '../../../forms/schema'

export interface SchemaFormOptionsProvider {
  fetchTableOptions?: (params: {
    source: TableOptionsSource
    page: number
    pageSize: number
    search?: string
    values: Record<string, any>
  }) => Promise<FetchOptionsResult>
  fetchViewQueryOptions?: (params: {
    source: ViewQueryOptionsSource
    page: number
    pageSize: number
    search?: string
    values: Record<string, any>
  }) => Promise<FetchOptionsResult>
  fetchLookupOptions?: (params: {
    source: LookupOptionsSource
    page: number
    pageSize: number
    search?: string
    values: Record<string, any>
  }) => Promise<FetchOptionsResult>
}

export interface SchemaFormProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'onInvalid'> {
  schema: FormObjectSchema
  methods?: UseFormReturn<TFieldValues>
  formOptions?: UseFormProps<TFieldValues>
  onSubmit?: SubmitHandler<TFieldValues>
  onInvalid?: SubmitErrorHandler<TFieldValues>
  optionsProvider?: SchemaFormOptionsProvider
  gridSpacing?: 0 | 1 | 2 | 3 | 4
  renderFooter?: (params: { methods: UseFormReturn<TFieldValues> }) => React.ReactNode
}

type FlattenedField = {
  path: string
  schema: FormSchema
  parentSchema: FormObjectSchema
  key: string
}

function toInt(value: any): number | undefined {
  if (value === null || value === undefined) return undefined
  const n = typeof value === 'number' ? value : Number(String(value).trim())
  return Number.isFinite(n) ? n : undefined
}

function buildDefaultValueForSchema(schema: FormSchema): any {
  if (schema.default !== undefined) return schema.default

  if (schema.ui?.widget === 'file') {
    return schema.ui.file?.multiple ? [] : undefined
  }

  if (schema.type === SchemaType.OBJECT) {
    const props = schema.properties ?? {}
    const out: Record<string, any> = {}
    for (const key of Object.keys(props)) {
      out[key] = buildDefaultValueForSchema(props[key] as FormSchema)
    }
    return out
  }

  if (schema.type === SchemaType.ARRAY) {
    const minItems = toInt(schema.minItems) ?? 0
    const itemSchema = (schema.items as FormSchema | undefined) ?? ({ type: SchemaType.STRING } as FormSchema)
    return Array.from({ length: minItems }, () => buildDefaultValueForSchema(itemSchema))
  }

  if (schema.type === SchemaType.STRING) return ''
  if (schema.type === SchemaType.BOOLEAN) return false
  return undefined
}

function isEmptyValue(value: any) {
  if (value === null || value === undefined) return true
  if (typeof value === 'string' && value.trim() === '') return true
  if (Array.isArray(value) && value.length === 0) return true
  return false
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function isPhone(value: string) {
  return /^\+?[0-9\s().-]{7,}$/.test(value)
}

function toFiles(value: any): File[] {
  if (typeof File === 'undefined') return []
  if (value instanceof File) return [value]
  if (Array.isArray(value)) return value.filter((v) => v instanceof File)
  return []
}

function mimeMatches(allowed: string, file: File) {
  const a = allowed.trim()
  if (!a) return true

  if (a.includes('/')) {
    if (a.endsWith('/*')) {
      const prefix = a.slice(0, -1)
      return file.type.startsWith(prefix)
    }
    return file.type === a
  }

  if (a.startsWith('.')) {
    return file.name.toLowerCase().endsWith(a.toLowerCase())
  }

  return true
}

function toNumber(value: any): number | undefined {
  if (value === null || value === undefined) return undefined
  if (typeof value === 'number') return Number.isFinite(value) ? value : undefined
  if (typeof value === 'string') {
    const v = value.trim()
    if (!v) return undefined
    const n = Number(v)
    return Number.isFinite(n) ? n : undefined
  }
  return undefined
}

function compareValue(op: VisibilityOp, left: any, right: any) {
  switch (op) {
    case '=':
      return left === right
    case '!=':
      return left !== right
    case '>':
      return (left ?? 0) > right
    case '>=':
      return (left ?? 0) >= right
    case '<':
      return (left ?? 0) < right
    case '<=':
      return (left ?? 0) <= right
    case 'in':
      return Array.isArray(right) ? right.includes(left) : false
    case 'not_in':
      return Array.isArray(right) ? !right.includes(left) : false
    case 'contains':
      if (typeof left === 'string') return left.includes(String(right))
      if (Array.isArray(left)) return left.includes(right)
      return false
    default:
      return false
  }
}

function getValueAtPath(values: Record<string, any>, path: string) {
  return path.split('.').reduce<any>((acc, key) => acc?.[key], values)
}

function setErrorAtPath(errors: Record<string, any>, path: string, message: string) {
  const parts = path.split('.')
  let cur: any = errors
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i]
    if (!cur[key] || typeof cur[key] !== 'object') cur[key] = {}
    cur = cur[key]
  }
  const last = parts[parts.length - 1]
  cur[last] = { type: 'schema', message }
}

function hasRequiredRule(schema: FormSchema) {
  return (schema.validation ?? []).some((r) => r.type === 'required')
}

function applyVisibilityRules(params: {
  fieldSchema: FormSchema
  values: Record<string, any>
  baseRequired: boolean
}) {
  const { fieldSchema, values, baseRequired } = params

  let visible = true
  let enabled = true
  let required = baseRequired

  const rules = fieldSchema.visibility ?? []
  for (const rule of rules) {
    const left = getValueAtPath(values, rule.when.field)
    const ok = compareValue(rule.when.op, left, rule.when.value)
    if (!ok) continue

    switch (rule.effect) {
      case 'show':
        visible = true
        break
      case 'hide':
        visible = false
        break
      case 'enable':
        enabled = true
        break
      case 'disable':
        enabled = false
        break
      case 'require':
        required = true
        break
      case 'unrequire':
        required = false
        break
    }
  }

  const readOnly = !!fieldSchema.ui?.readOnly
  if (readOnly) {
    enabled = false
  }

  return { visible, enabled, required }
}

function flattenObjectSchema(schema: FormObjectSchema, parentPath = ''): FlattenedField[] {
  const props = schema.properties ?? {}
  const keys = Object.keys(props)

  const ordering = schema.propertyOrdering?.length
    ? schema.propertyOrdering.filter((k) => k in props)
    : keys

  const ordered = ordering.length ? ordering : keys

  const base: FlattenedField[] = []
  for (const key of ordered) {
    const fieldSchema = props[key] as FormSchema
    const path = parentPath ? `${parentPath}.${key}` : key

    if (fieldSchema.type === SchemaType.OBJECT) {
      base.push({ path, schema: fieldSchema, parentSchema: schema, key })
      const nested = flattenObjectSchema(fieldSchema as any, path)
      base.push(...nested)
      continue
    }

    base.push({ path, schema: fieldSchema, parentSchema: schema, key })
  }

  return base
}

function toGridSizeConfig(width?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number }): GridSizeConfig | undefined {
  if (!width) return undefined
  if (typeof width === 'number') {
    return width as any
  }
  const out: any = {}
  if (width.xs) out.xs = width.xs
  if (width.sm) out.sm = width.sm
  if (width.md) out.md = width.md
  if (width.lg) out.lg = width.lg
  if (width.xl) out.xl = width.xl
  return out
}

function buildStaticSelectOptions(source: StaticOptionsSource): SelectOption[] {
  return source.options.map((o) => ({ label: o.label, value: o.id }))
}

async function fetchApiOptions(params: {
  source: ApiOptionsSource
  page: number
  pageSize: number
  search?: string
}): Promise<FetchOptionsResult> {
  const { source, page, pageSize, search } = params
  const method = source.method ?? 'GET'

  let url = source.url
  const headers = {
    'Content-Type': 'application/json',
    ...(source.headers ?? {}),
  }

  let body: string | undefined
  if (method === 'GET') {
    const u = new URL(url, window.location.origin)
    u.searchParams.set('page', String(page))
    u.searchParams.set('pageSize', String(pageSize))
    if (search) u.searchParams.set('search', search)
    url = u.toString()
  } else {
    body = JSON.stringify({ page, pageSize, search })
  }

  const res = await fetch(url, {
    method,
    headers,
    body,
  })

  const json = await res.json()

  const items: any[] = Array.isArray(json)
    ? json
    : Array.isArray(json?.data)
      ? json.data
      : Array.isArray(json?.items)
        ? json.items
        : []

  const data = items.map((item) => ({
    value: String(item?.[source.mapping.value] ?? ''),
    label: String(item?.[source.mapping.label] ?? ''),
  }))

  const hasMore =
    typeof json?.hasMore === 'boolean'
      ? json.hasMore
      : typeof json?.total === 'number'
        ? page * pageSize < json.total
        : data.length >= pageSize

  return { data, hasMore }
}

function validateWithRules(params: {
  schema: FormSchema
  value: any
  required: boolean
}) {
  const { schema, value, required } = params

  if (required && isEmptyValue(value)) {
    const msg = schema.validation?.find((v) => v.type === 'required')?.message
    return msg ?? 'Trường này là bắt buộc'
  }

  if (required && schema.type === SchemaType.BOOLEAN && value !== true) {
    const msg = schema.validation?.find((v) => v.type === 'required')?.message
    return msg ?? 'Trường này là bắt buộc'
  }

  if (isEmptyValue(value)) {
    return undefined
  }

  if (schema.enum?.length && typeof value === 'string') {
    if (!schema.enum.includes(value)) {
      return 'Giá trị không hợp lệ'
    }
  }

  if (schema.pattern && typeof value === 'string') {
    try {
      const re = new RegExp(schema.pattern)
      if (!re.test(value)) return 'Giá trị không đúng định dạng'
    } catch {
      return 'Giá trị không đúng định dạng'
    }
  }

  if (schema.minLength && typeof value === 'string') {
    const min = Number(schema.minLength)
    if (Number.isFinite(min) && value.length < min) return `Tối thiểu ${min} ký tự`
  }

  if (schema.maxLength && typeof value === 'string') {
    const max = Number(schema.maxLength)
    if (Number.isFinite(max) && value.length > max) return `Tối đa ${max} ký tự`
  }

  if ((schema.type === SchemaType.NUMBER || schema.type === SchemaType.INTEGER) && (schema.minimum !== undefined || schema.maximum !== undefined)) {
    const n = toNumber(value)
    if (n === undefined) return 'Giá trị số không hợp lệ'
    if (schema.minimum !== undefined && n < schema.minimum) return `Tối thiểu ${schema.minimum}`
    if (schema.maximum !== undefined && n > schema.maximum) return `Tối đa ${schema.maximum}`
  }

  const rules = schema.validation ?? []
  for (const rule of rules) {
    const msg = rule.message

    switch (rule.type) {
      case 'required':
        break
      case 'email':
        if (typeof value === 'string' && !isEmail(value)) return msg ?? 'Email không hợp lệ'
        break
      case 'phone':
        if (typeof value === 'string' && !isPhone(value)) return msg ?? 'Số điện thoại không hợp lệ'
        break
      case 'regex':
        if (typeof value === 'string') {
          const p = rule.pattern ?? schema.pattern
          if (!p) break
          try {
            const re = new RegExp(p)
            if (!re.test(value)) return msg ?? 'Giá trị không đúng định dạng'
          } catch {
            return msg ?? 'Giá trị không đúng định dạng'
          }
        }
        break
      case 'number_range': {
        const n = toNumber(value)
        if (n === undefined) return msg ?? 'Giá trị số không hợp lệ'
        if (rule.min !== undefined && n < rule.min) return msg ?? `Tối thiểu ${rule.min}`
        if (rule.max !== undefined && n > rule.max) return msg ?? `Tối đa ${rule.max}`
        break
      }
      case 'date_range': {
        if (typeof value !== 'string') break
        const v = value.trim()
        if (!v) break
        const asTime = Date.parse(v)
        if (!Number.isFinite(asTime)) return msg ?? 'Ngày không hợp lệ'
        if (rule.min !== undefined) {
          const min = Date.parse(String(rule.min))
          if (Number.isFinite(min) && asTime < min) return msg ?? 'Ngày không hợp lệ'
        }
        if (rule.max !== undefined) {
          const max = Date.parse(String(rule.max))
          if (Number.isFinite(max) && asTime > max) return msg ?? 'Ngày không hợp lệ'
        }
        break
      }
      case 'enum_in': {
        if (typeof value !== 'string') break
        const list = schema.enum ?? []
        if (list.length && !list.includes(value)) {
          return msg ?? 'Giá trị không hợp lệ'
        }
        break
      }
      case 'file_size': {
        const files = toFiles(value)
        if (!files.length) break

        const fallbackMaxBytes =
          typeof schema.ui?.file?.maxSizeMb === 'number' ? schema.ui.file.maxSizeMb * 1024 * 1024 : undefined
        const maxBytes = rule.maxSizeBytes ?? fallbackMaxBytes
        if (!maxBytes) break

        const oversized = files.find((f) => f.size > maxBytes)
        if (oversized) return msg ?? 'File vượt quá dung lượng cho phép'
        break
      }
      case 'file_type': {
        const files = toFiles(value)
        if (!files.length) break

        const fallbackAllowed = schema.ui?.file?.accept
          ? schema.ui.file.accept
              .split(',')
              .map((x) => x.trim())
              .filter(Boolean)
          : []

        const allowed = (rule.allowedTypes?.length ? rule.allowedTypes : fallbackAllowed) ?? []
        if (!allowed.length) break

        const bad = files.find((f) => !allowed.some((t) => mimeMatches(t, f)))
        if (bad) return msg ?? 'Định dạng file không được hỗ trợ'
        break
      }
    }
  }

  return undefined
}

function createSchemaResolver(schema: FormObjectSchema): Resolver<any> {
  return async (values) => {
    const errors: Record<string, any> = {}

    const validateArraySchema = (params: {
      fieldSchema: FormSchema
      fieldPath: string
      value: any
      required: boolean
    }) => {
      const { fieldSchema, fieldPath, value, required } = params
      const arr = Array.isArray(value) ? value : []

      const requiredMsg = validateWithRules({ schema: fieldSchema, value: arr, required })
      if (requiredMsg) {
        setErrorAtPath(errors, fieldPath, requiredMsg)
        return
      }

      const minItems = toInt(fieldSchema.minItems)
      if (minItems !== undefined && arr.length < minItems) {
        setErrorAtPath(errors, fieldPath, `Tối thiểu ${minItems} mục`)
        return
      }
      const maxItems = toInt(fieldSchema.maxItems)
      if (maxItems !== undefined && arr.length > maxItems) {
        setErrorAtPath(errors, fieldPath, `Tối đa ${maxItems} mục`)
        return
      }

      const itemSchema = fieldSchema.items as FormSchema | undefined
      if (!itemSchema) return

      for (let i = 0; i < arr.length; i++) {
        const itemPath = `${fieldPath}.${i}`
        const itemValue = arr[i]

        if (itemSchema.type === SchemaType.OBJECT) {
          validateObjectSchema(itemSchema as any, itemPath)
          continue
        }

        if (itemSchema.type === SchemaType.ARRAY) {
          validateArraySchema({ fieldSchema: itemSchema, fieldPath: itemPath, value: itemValue, required: false })
          continue
        }

        const itemMsg = validateWithRules({ schema: itemSchema, value: itemValue, required: hasRequiredRule(itemSchema) })
        if (itemMsg) {
          setErrorAtPath(errors, itemPath, itemMsg)
        }
      }
    }

    const validateObjectSchema = (objSchema: FormSchema, basePath: string) => {
      const props = objSchema.properties ?? {}
      const keys = Object.keys(props)
      for (const key of keys) {
        const fieldSchema = props[key] as FormSchema
        const fieldPath = basePath ? `${basePath}.${key}` : key
        const baseRequired = (objSchema.required ?? []).includes(key) || hasRequiredRule(fieldSchema)

        const { visible, required } = applyVisibilityRules({ fieldSchema, values: values as any, baseRequired })
        if (!visible) continue

        const fieldValue = getValueAtPath(values as any, fieldPath)

        if (fieldSchema.type === SchemaType.OBJECT) {
          validateObjectSchema(fieldSchema, fieldPath)
          continue
        }

        if (fieldSchema.type === SchemaType.ARRAY) {
          validateArraySchema({ fieldSchema, fieldPath, value: fieldValue, required })
          continue
        }

        const msg = validateWithRules({ schema: fieldSchema, value: fieldValue, required })
        if (msg) {
          setErrorAtPath(errors, fieldPath, msg)
        }
      }
    }

    validateObjectSchema(schema as any, '')

    return {
      values,
      errors: errors as FieldErrors<any>,
    }
  }
}

function buildDefaultValues(schema: FormObjectSchema) {
  const props = schema.properties ?? {}
  const out: Record<string, any> = {}

  for (const key of Object.keys(props)) {
    const s = props[key] as FormSchema

    if (s.type === SchemaType.OBJECT) {
      out[key] = buildDefaultValues(s as any)
      continue
    }

    if (s.default !== undefined) {
      out[key] = s.default
      continue
    }

    if (s.ui?.widget === 'file') {
      out[key] = s.ui.file?.multiple ? [] : undefined
      continue
    }

    if (s.type === SchemaType.ARRAY) {
      const minItems = toInt(s.minItems) ?? 0
      const itemSchema = (s.items as FormSchema | undefined) ?? ({ type: SchemaType.STRING } as FormSchema)
      out[key] = Array.from({ length: minItems }, () => buildDefaultValueForSchema(itemSchema))
      continue
    }
  }

  return out
}

function computeEffectiveFields(schema: FormObjectSchema): FlattenedField[] {
  const flat = flattenObjectSchema(schema)
  const leaf = flat.filter((f) => f.schema.type !== SchemaType.OBJECT)

  const withUi = leaf.map((f, index) => {
    const section = f.schema.ui?.section ?? ''
    const order = f.schema.ui?.order ?? index
    return { ...f, section, order }
  })

  withUi.sort((a, b) => {
    if (a.section !== b.section) return a.section.localeCompare(b.section)
    return a.order - b.order
  })

  return withUi
}

type ControllerFieldLike = {
  name: string
  value: any
  onChange: (...event: any[]) => void
  onBlur: () => void
}

type FieldWidget =
  | { kind: 'select'; source: OptionsSource | StaticOptionsSource }
  | { kind: 'date' }
  | { kind: 'datetime' }
  | { kind: 'richtext' }
  | { kind: 'file' }
  | { kind: 'textarea' }
  | { kind: 'input' }

function pickFieldWidget(fieldSchema: FormSchema): FieldWidget {
  if (fieldSchema.ui?.widget === 'date' || fieldSchema.format === 'date') {
    return { kind: 'date' }
  }
  if (fieldSchema.ui?.widget === 'datetime' || fieldSchema.format === 'date-time') {
    return { kind: 'datetime' }
  }
  if (fieldSchema.ui?.widget === 'richtext') {
    return { kind: 'richtext' }
  }
  if (fieldSchema.ui?.widget === 'file') {
    return { kind: 'file' }
  }
  if (fieldSchema.ui?.widget === 'textarea') {
    return { kind: 'textarea' }
  }

  const source = fieldSchema.options
  if (source) {
    return { kind: 'select', source }
  }
  if (fieldSchema.enum?.length) {
    const staticSource: StaticOptionsSource = {
      type: OptionSourceType.STATIC,
      options: fieldSchema.enum.map((v) => ({ id: v, label: v })),
    }
    return { kind: 'select', source: staticSource }
  }
  return { kind: 'input' }
}

function orderedKeysForObjectSchema(objSchema: FormSchema) {
  const props = objSchema.properties ?? {}
  const keys = Object.keys(props)
  const ordering = objSchema.propertyOrdering?.length ? objSchema.propertyOrdering.filter((k) => k in props) : keys
  return ordering.length ? ordering : keys
}

function SchemaArrayField(params: {
  name: string
  fieldSchema: FormSchema
  disabled: boolean
  placeholder?: string
  optionsProvider?: SchemaFormOptionsProvider
  values: Record<string, any>
}) {
  const { name, fieldSchema, disabled, placeholder, optionsProvider, values } = params
  const { control } = useFormContext<any>()
  const helpers = useFieldArray({ control, name: name as any })

  const minItems = toInt(fieldSchema.minItems) ?? 0
  const maxItems = toInt(fieldSchema.maxItems)
  const itemSchema = (fieldSchema.items as FormSchema | undefined) ?? ({ type: SchemaType.STRING } as FormSchema)

  const canAdd = !disabled && (maxItems === undefined || helpers.fields.length < maxItems)
  const canRemove = (index: number) => !disabled && helpers.fields.length > Math.max(0, minItems) && index >= 0

  const appendItem = () => {
    helpers.append(buildDefaultValueForSchema(itemSchema) as any)
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <Button type="button" variant="secondary" size="sm" disabled={!canAdd} onClick={appendItem}>
          Thêm
        </Button>
      </div>

      <div className="space-y-3">
        {helpers.fields.map((f, index) => {
          const basePath = `${name}.${index}`
          return (
            <div key={f.id} className="rounded-2xl border border-slate-200 bg-surface p-4">
              <div className="mb-3 flex justify-end">
                <Button type="button" variant="ghost" size="sm" disabled={!canRemove(index)} onClick={() => helpers.remove(index)}>
                  Xoá
                </Button>
              </div>

              {itemSchema.type === SchemaType.OBJECT ? (
                <Grid container spacing={2}>
                  {orderedKeysForObjectSchema(itemSchema).map((k) => {
                    const childSchema = (itemSchema.properties?.[k] ?? ({ type: SchemaType.STRING } as any)) as FormSchema
                    const childPath = `${basePath}.${k}`
                    const label = childSchema.title ?? k
                    const childPlaceholder = childSchema.ui?.placeholder
                    const helperText = childSchema.ui?.helper ?? childSchema.ui?.hint
                    const width = toGridSizeConfig(childSchema.ui?.width)
                    const baseRequired = (itemSchema.required ?? []).includes(k) || hasRequiredRule(childSchema)
                    const state = applyVisibilityRules({ fieldSchema: childSchema, values, baseRequired })
                    if (!state.visible) return null

                    return (
                      <Grid key={childPath} size={width}>
                        <FormFieldController<any> name={childPath as any} label={label} required={state.required} helperText={helperText}>
                          {({ field }) =>
                            renderFieldControl({
                              field,
                              fieldSchema: childSchema,
                              disabled: !state.enabled,
                              placeholder: childPlaceholder,
                              optionsProvider,
                              values,
                            })
                          }
                        </FormFieldController>
                      </Grid>
                    )
                  })}
                </Grid>
              ) : (
                <FormFieldController<any> name={basePath as any} label={`#${index + 1}`}>
                  {({ field }) =>
                    renderFieldControl({
                      field,
                      fieldSchema: itemSchema,
                      disabled,
                      placeholder,
                      optionsProvider,
                      values,
                    })
                  }
                </FormFieldController>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function renderFieldControl(params: {
  field: ControllerFieldLike
  fieldSchema: FormSchema
  disabled: boolean
  placeholder?: string
  optionsProvider?: SchemaFormOptionsProvider
  values: Record<string, any>
}) {
  const { field, fieldSchema, disabled, placeholder, optionsProvider, values } = params

  const widget = pickFieldWidget(fieldSchema)

  if (widget.kind === 'date') {
    return (
      <DatePicker
        name={field.name}
        disabled={disabled}
        placeholder={placeholder}
        value={field.value ?? ''}
        onValueChange={(v) => field.onChange(v)}
        onBlur={field.onBlur}
      />
    )
  }

  if (widget.kind === 'datetime') {
    return (
      <DatetimePicker
        name={field.name}
        disabled={disabled}
        placeholder={placeholder}
        value={field.value ?? ''}
        onValueChange={(v) => field.onChange(v)}
        onBlur={field.onBlur}
      />
    )
  }

  if (widget.kind === 'richtext') {
    return (
      <div className={disabled ? 'pointer-events-none opacity-60' : undefined}>
        <TiptapEditor value={field.value ?? ''} onValueChange={(html) => field.onChange(html)} />
      </div>
    )
  }

  if (widget.kind === 'file') {
    const multiple = fieldSchema.ui?.file?.multiple ?? false
    return (
      <div className={disabled ? 'pointer-events-none opacity-60' : undefined}>
        <FileUploader
          multiple={multiple}
          accept={fieldSchema.ui?.file?.accept}
          maxSizeMb={fieldSchema.ui?.file?.maxSizeMb}
          onFilesSelected={(files) => {
            field.onChange(multiple ? files : files[0])
            field.onBlur()
          }}
        />
      </div>
    )
  }

  if (widget.kind === 'select') {
    const source = widget.source

    if (source.type === OptionSourceType.STATIC) {
      const options = buildStaticSelectOptions(source)
      return (
        <Select
          name={field.name}
          value={field.value ?? ''}
          disabled={disabled}
          placeholder={placeholder}
          options={options}
          onValueChange={(v) => field.onChange(v)}
          onBlur={field.onBlur}
        />
      )
    }

    const fetchOptions = async ({ page, pageSize, search }: { page: number; pageSize: number; search?: string }) => {
      if (source.type === OptionSourceType.API) {
        return fetchApiOptions({ source, page, pageSize, search })
      }
      if (source.type === OptionSourceType.TABLE) {
        if (!optionsProvider?.fetchTableOptions) throw new Error('Missing optionsProvider.fetchTableOptions')
        return optionsProvider.fetchTableOptions({ source, page, pageSize, search, values })
      }
      if (source.type === OptionSourceType.VIEW_QUERY) {
        if (!optionsProvider?.fetchViewQueryOptions) throw new Error('Missing optionsProvider.fetchViewQueryOptions')
        return optionsProvider.fetchViewQueryOptions({ source, page, pageSize, search, values })
      }
      if (source.type === OptionSourceType.LOOKUP) {
        if (!optionsProvider?.fetchLookupOptions) throw new Error('Missing optionsProvider.fetchLookupOptions')
        return optionsProvider.fetchLookupOptions({ source, page, pageSize, search, values })
      }
      throw new Error('Unsupported options source')
    }

    return (
      <SelectLazy
        name={field.name}
        value={field.value ?? ''}
        disabled={disabled}
        placeholder={placeholder}
        fetchOptions={fetchOptions}
        onValueChange={(v) => field.onChange(v)}
        onBlur={field.onBlur}
      />
    )
  }

  if (fieldSchema.type === SchemaType.BOOLEAN) {
    return (
      <Checkbox
        name={field.name}
        checked={!!field.value}
        disabled={disabled}
        onChange={(e) => field.onChange(e.target.checked)}
        onBlur={field.onBlur}
      />
    )
  }

  if (fieldSchema.type === SchemaType.NUMBER || fieldSchema.type === SchemaType.INTEGER) {
    return (
      <Input
        name={field.name}
        type="number"
        disabled={disabled}
        placeholder={placeholder}
        value={field.value ?? ''}
        onChange={(e) => {
          const raw = e.target.value
          field.onChange(raw === '' ? undefined : Number(raw))
        }}
        onBlur={field.onBlur}
      />
    )
  }

  if (fieldSchema.type === SchemaType.STRING) {
    const useTextarea = widget.kind === 'textarea' || Number(fieldSchema.maxLength ?? 0) > 120

    if (useTextarea) {
      return (
        <Textarea
          name={field.name}
          disabled={disabled}
          placeholder={placeholder}
          value={field.value ?? ''}
          onChange={(e) => field.onChange(e.target.value)}
          onBlur={field.onBlur}
          rows={fieldSchema.ui?.rows ?? 4}
        />
      )
    }

    const derivedType = fieldSchema.ui?.inputType ?? (fieldSchema.format === 'email' ? 'email' : undefined)

    return (
      <Input
        name={field.name}
        type={derivedType}
        disabled={disabled}
        placeholder={placeholder}
        value={field.value ?? ''}
        onChange={(e) => field.onChange(e.target.value)}
        onBlur={field.onBlur}
      />
    )
  }

  return (
    <Input
      name={field.name}
      disabled={disabled}
      placeholder={placeholder}
      value={field.value ?? ''}
      onChange={(e) => field.onChange(e.target.value)}
      onBlur={field.onBlur}
    />
  )
}

function isFieldRequiredBySchema(schema: FormObjectSchema, fieldKey: string) {
  return (schema.required ?? []).includes(fieldKey)
}

export function SchemaForm<TFieldValues extends FieldValues = FieldValues>({
  schema,
  methods: methodsProp,
  formOptions,
  onSubmit,
  onInvalid,
  optionsProvider,
  gridSpacing = 2,
  renderFooter,
  className,
  ...rest
}: SchemaFormProps<TFieldValues>) {
  const resolver = React.useMemo(() => createSchemaResolver(schema), [schema])

  const internalMethods = useForm<TFieldValues>({
    ...(formOptions ?? ({} as UseFormProps<TFieldValues>)),
    defaultValues: (formOptions?.defaultValues ?? buildDefaultValues(schema)) as any,
    resolver: (formOptions?.resolver ?? (resolver as any)) as any,
  }) as UseFormReturn<TFieldValues>

  const methods = methodsProp ?? internalMethods

  const values = (methods.watch() ?? {}) as Record<string, any>

  const fields = React.useMemo(() => computeEffectiveFields(schema), [schema])

  return (
    <Form methods={methods} onSubmit={onSubmit} onInvalid={onInvalid} className={className} {...rest}>
      <Grid container spacing={gridSpacing}>
        {fields.map((f) => {
          const label = f.schema.title ?? f.key
          const placeholder = f.schema.ui?.placeholder
          const helperText = f.schema.ui?.helper ?? f.schema.ui?.hint
          const width = toGridSizeConfig(f.schema.ui?.width)

          const baseRequired = isFieldRequiredBySchema(f.parentSchema, f.key) || hasRequiredRule(f.schema)
          const state = applyVisibilityRules({ fieldSchema: f.schema, values, baseRequired })

          if (!state.visible) return null

          return (
            <Grid key={f.path} size={width}>
              {f.schema.type === SchemaType.ARRAY ? (
                <FormField
                  label={label}
                  required={state.required}
                  error={(getValueAtPath(methods.formState.errors as any, f.path)?.message as any) ?? undefined}
                >
                  <SchemaArrayField
                    name={f.path}
                    fieldSchema={f.schema}
                    disabled={!state.enabled}
                    placeholder={placeholder}
                    optionsProvider={optionsProvider}
                    values={values}
                  />
                </FormField>
              ) : (
                <FormFieldController<any> name={f.path as any} label={label} required={state.required} helperText={helperText}>
                  {({ field }) =>
                    renderFieldControl({
                      field,
                      fieldSchema: f.schema,
                      disabled: !state.enabled,
                      placeholder,
                      optionsProvider,
                      values,
                    })
                  }
                </FormFieldController>
              )}
            </Grid>
          )
        })}
      </Grid>
      {renderFooter?.({ methods })}
    </Form>
  )
}
