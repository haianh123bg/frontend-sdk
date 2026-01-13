import { UseFormReturn, FieldValues, SubmitHandler, SubmitErrorHandler, UseFormProps } from 'react-hook-form';
import { ZodSchema } from 'zod';
import * as React from 'react';
export interface FormProps<TFieldValues extends FieldValues = FieldValues> extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'onInvalid'>, UseFormProps<TFieldValues> {
    methods?: UseFormReturn<TFieldValues>;
    onSubmit?: SubmitHandler<TFieldValues>;
    onInvalid?: SubmitErrorHandler<TFieldValues>;
    options?: UseFormProps<TFieldValues>;
    /**
     * Optional Zod schema. Nếu truyền, Form sẽ tự cấu hình resolver.
     */
    schema?: ZodSchema<TFieldValues>;
    /**
     * Optional ref từ bên ngoài (ví dụ: hook useFormErrors trả về formRef).
     */
    formRef?: React.RefObject<HTMLFormElement>;
    formId?: string;
    instanceId?: string;
}
type FormComponent = <TFieldValues extends FieldValues = FieldValues>(props: FormProps<TFieldValues> & React.RefAttributes<HTMLFormElement>) => JSX.Element;
declare const ForwardForm: FormComponent;
export { ForwardForm as Form };
