// File: src/components/organisms/Form/Form.tsx
import * as React from 'react'
import { useDispatchAction } from '../../../bus/hooks'
import { EventType } from '../../../events/types'
import {
  FormProvider,
  useForm,
  UseFormReturn,
  FieldValues,
  SubmitHandler,
  SubmitErrorHandler,
  UseFormProps,
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ZodSchema } from 'zod'

export interface FormProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'onInvalid'> {
  methods?: UseFormReturn<TFieldValues>
  onSubmit?: SubmitHandler<TFieldValues>
  onInvalid?: SubmitErrorHandler<TFieldValues>
  options?: UseFormProps<TFieldValues>
  /**
   * Optional Zod schema. Nếu truyền, Form sẽ tự cấu hình resolver.
   */
  schema?: ZodSchema<TFieldValues>
  /**
   * Optional ref từ bên ngoài (ví dụ: hook useFormErrors trả về formRef).
   */
  formRef?: React.RefObject<HTMLFormElement>
}

type FormComponent = <TFieldValues extends FieldValues = FieldValues>(
  props: FormProps<TFieldValues> & React.RefAttributes<HTMLFormElement>
) => JSX.Element

function InternalForm<TFieldValues extends FieldValues = FieldValues>(
  { children, methods, onSubmit, onInvalid, options, className, schema, formRef, ...props }: FormProps<TFieldValues>,
  ref: React.Ref<HTMLFormElement>
) {
  const dispatch = useDispatchAction()
  const formMethods =
    methods ??
    useForm<TFieldValues>({
      ...(options || {}),
      resolver: schema ? zodResolver(schema) : options?.resolver,
    })

  const handleValid: SubmitHandler<TFieldValues> = async (data, event) => {
    dispatch(
      EventType.FORM_SUBMIT,
      { formData: data },
      { meta: { component: 'Form' }, flags: { persist: true } }
    )
    await onSubmit?.(data, event)
  }

  const handleInvalid: SubmitErrorHandler<TFieldValues> = async (errors, event) => {
    dispatch(
      EventType.FORM_VALIDATE,
      { success: false, errors },
      { meta: { component: 'Form' } }
    )
    await onInvalid?.(errors, event)
  }

  const submitHandler = formMethods.handleSubmit(handleValid, handleInvalid)

  const setRefs = (node: HTMLFormElement | null) => {
    if (typeof ref === 'function') ref(node)
    else if (ref) (ref as React.MutableRefObject<HTMLFormElement | null>).current = node
    if (formRef && 'current' in formRef) {
      (formRef as React.MutableRefObject<HTMLFormElement | null>).current = node
    }
  }

  return (
    <FormProvider {...formMethods}>
      <form ref={setRefs} className={className} onSubmit={submitHandler} {...props}>
        {children}
      </form>
    </FormProvider>
  )
}

const ForwardForm = React.forwardRef(InternalForm) as FormComponent
;(ForwardForm as React.ForwardRefExoticComponent<FormProps<any> & React.RefAttributes<HTMLFormElement>>).displayName = 'Form'

export { ForwardForm as Form }
