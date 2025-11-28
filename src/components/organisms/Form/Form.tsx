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

export interface FormProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'onInvalid'> {
  methods?: UseFormReturn<TFieldValues>
  onSubmit?: SubmitHandler<TFieldValues>
  onInvalid?: SubmitErrorHandler<TFieldValues>
  options?: UseFormProps<TFieldValues>
}

type FormComponent = <TFieldValues extends FieldValues = FieldValues>(
  props: FormProps<TFieldValues> & React.RefAttributes<HTMLFormElement>
) => JSX.Element

function InternalForm<TFieldValues extends FieldValues = FieldValues>(
  { children, methods, onSubmit, onInvalid, options, className, ...props }: FormProps<TFieldValues>,
  ref: React.Ref<HTMLFormElement>
) {
  const dispatch = useDispatchAction()
  const formMethods = methods ?? useForm<TFieldValues>(options)

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

  return (
    <FormProvider {...formMethods}>
      <form ref={ref} className={className} onSubmit={submitHandler} {...props}>
        {children}
      </form>
    </FormProvider>
  )
}

const ForwardForm = React.forwardRef(InternalForm) as FormComponent
;(ForwardForm as React.ForwardRefExoticComponent<FormProps<any> & React.RefAttributes<HTMLFormElement>>).displayName = 'Form'

export { ForwardForm as Form }
