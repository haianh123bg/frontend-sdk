import * as React from 'react'
import {
  Controller,
  useFormContext,
  type ControllerFieldState,
  type ControllerRenderProps,
  type FieldValues,
  type Path,
  type Control,
} from 'react-hook-form'
import { FormField, type FormFieldProps } from './FormField'

export interface FormFieldControllerProps<TFieldValues extends FieldValues> extends Omit<FormFieldProps, 'children' | 'error'> {
  name: Path<TFieldValues>
  helperText?: React.ReactNode
  /**
   * Render prop. Có thể dùng `children` thay cho `render`.
   */
  render?: (params: {
    field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>
    fieldState: ControllerFieldState
  }) => React.ReactNode
  children?: (params: {
    field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>
    fieldState: ControllerFieldState
  }) => React.ReactNode
  control?: Control<TFieldValues>
}

export function FormFieldController<TFieldValues extends FieldValues>({
  name,
  render,
  children,
  label,
  required,
  helperText,
  control,
  ...rest
}: FormFieldControllerProps<TFieldValues>) {
  const { control: ctxControl } = useFormContext<TFieldValues>()
  const renderFn = render ?? children

  if (!renderFn) {
    throw new Error('FormFieldController requires a render/children prop')
  }

  return (
    <Controller<TFieldValues, Path<TFieldValues>>
      control={control ?? ctxControl}
      name={name}
      render={({ field, fieldState }) => (
        <FormField
          label={label}
          required={required}
          error={fieldState.error?.message}
          htmlFor={field.name}
          {...rest}
        >
          {renderFn({ field, fieldState })}
          {helperText && <p className="text-xs text-text-muted">{helperText}</p>}
        </FormField>
      )}
    />
  )
}

FormFieldController.displayName = 'FormFieldController'
