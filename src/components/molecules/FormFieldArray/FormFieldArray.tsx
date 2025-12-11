import * as React from 'react'
import {
  useFieldArray,
  useFormContext,
  type FieldArrayPath,
  type FieldValues,
  type UseFieldArrayProps,
  type UseFieldArrayReturn,
} from 'react-hook-form'

export interface FormFieldArrayProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>
> extends Omit<UseFieldArrayProps<TFieldValues, TName>, 'control' | 'name'> {
  name: TName
  children: (helpers: UseFieldArrayReturn<TFieldValues, TName>) => React.ReactNode
}

export function FormFieldArray<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>
>({ name, children, ...rest }: FormFieldArrayProps<TFieldValues, TName>) {
  const { control } = useFormContext<TFieldValues>()
  const helpers = useFieldArray<TFieldValues, TName>({
    control,
    name,
    ...rest,
  })

  return <>{children(helpers)}</>
}
