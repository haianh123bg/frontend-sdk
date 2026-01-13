import { ControllerFieldState, ControllerRenderProps, FieldValues, Path, Control } from 'react-hook-form';
import { FormFieldProps } from './FormField';
import * as React from 'react';
export interface FormFieldControllerProps<TFieldValues extends FieldValues> extends Omit<FormFieldProps, 'children' | 'error'> {
    name: Path<TFieldValues>;
    helperText?: React.ReactNode;
    /**
     * Render prop. Có thể dùng `children` thay cho `render`.
     */
    render?: (params: {
        field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>;
        fieldState: ControllerFieldState;
    }) => React.ReactNode;
    children?: (params: {
        field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>;
        fieldState: ControllerFieldState;
    }) => React.ReactNode;
    control?: Control<TFieldValues>;
}
export declare function FormFieldController<TFieldValues extends FieldValues>({ name, render, children, label, required, helperText, control, ...rest }: FormFieldControllerProps<TFieldValues>): import("react/jsx-runtime").JSX.Element;
export declare namespace FormFieldController {
    var displayName: string;
}
