import { FieldArrayPath, FieldValues, UseFieldArrayProps, UseFieldArrayReturn } from 'react-hook-form';
import * as React from 'react';
export interface FormFieldArrayProps<TFieldValues extends FieldValues = FieldValues, TName extends FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>> extends Omit<UseFieldArrayProps<TFieldValues, TName>, 'control' | 'name'> {
    name: TName;
    children: (helpers: UseFieldArrayReturn<TFieldValues, TName>) => React.ReactNode;
}
export declare function FormFieldArray<TFieldValues extends FieldValues = FieldValues, TName extends FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>>({ name, children, ...rest }: FormFieldArrayProps<TFieldValues, TName>): import("react/jsx-runtime").JSX.Element;
