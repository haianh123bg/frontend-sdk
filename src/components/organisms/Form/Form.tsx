// File: src/components/organisms/Form/Form.tsx
import * as React from 'react'
import { useDispatchAction } from '../../../bus/hooks'
import { EventType } from '../../../events/types'
import { generateId } from '../../../utils/id'
import {
  FormProvider,
  useForm,
  UseFormReturn,
  FieldValues,
  FieldErrors,
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
  formId?: string
  instanceId?: string
}

type FormComponent = <TFieldValues extends FieldValues = FieldValues>(
  props: FormProps<TFieldValues> & React.RefAttributes<HTMLFormElement>
) => JSX.Element

function InternalForm<TFieldValues extends FieldValues = FieldValues>(
  { children, methods, onSubmit, onInvalid, options, className, schema, formRef, formId, instanceId, ...props }: FormProps<TFieldValues>,
  ref: React.Ref<HTMLFormElement>
) {
  const dispatch = useDispatchAction()
  const autoInstanceIdRef = React.useRef<string | null>(null)
  if (!autoInstanceIdRef.current) {
    autoInstanceIdRef.current = generateId()
  }
  const effectiveInstanceId = instanceId ?? autoInstanceIdRef.current
  const formMethods =
    methods ??
    useForm<TFieldValues>({
      ...(options || {}),
      resolver: schema ? zodResolver(schema) : options?.resolver,
    })

  const internalFormRef = React.useRef<HTMLFormElement | null>(null)

  const focusFirstError = (errors: FieldErrors<TFieldValues>) => {
    const root = internalFormRef.current
    if (!root) return

    const findFirstErrorName = (errs: FieldErrors<TFieldValues>, parentPath = ''): string | undefined => {
      for (const key in errs) {
        const value: any = (errs as any)[key]
        if (!value) continue
        const path = parentPath ? `${parentPath}.${key}` : key
        if ((value as any).message) {
          return path
        }
        if (typeof value === 'object') {
          const child = findFirstErrorName(value as FieldErrors<TFieldValues>, path)
          if (child) return child
        }
      }
      return undefined
    }

    const firstErrorName = findFirstErrorName(errors)
    if (!firstErrorName) return

    const field = root.querySelector<HTMLElement>(`[name="${firstErrorName}"]`)
    if (field && typeof field.focus === 'function') {
      field.focus()
      if (typeof field.scrollIntoView === 'function') {
        field.scrollIntoView({ block: 'center', behavior: 'smooth' })
      }
    }
  }

  const handleValid: SubmitHandler<TFieldValues> = async (data, event) => {
    dispatch(
      EventType.FORM_SUBMIT,
      { formData: data, formId, instanceId: effectiveInstanceId },
      { meta: { component: 'Form', formId, instanceId: effectiveInstanceId }, flags: { persist: true } }
    )
    await onSubmit?.(data, event)
  }

  const handleInvalid: SubmitErrorHandler<TFieldValues> = async (errors, event) => {
    dispatch(
      EventType.FORM_VALIDATE,
      { success: false, errors, formId, instanceId: effectiveInstanceId },
      { meta: { component: 'Form', formId, instanceId: effectiveInstanceId } }
    )
    focusFirstError(errors)
    await onInvalid?.(errors, event)
  }

  const submitHandler = formMethods.handleSubmit(handleValid, handleInvalid)

  const setRefs = (node: HTMLFormElement | null) => {
    internalFormRef.current = node
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
