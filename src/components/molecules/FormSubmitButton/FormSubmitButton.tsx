import * as React from 'react'
import { useFormContext } from 'react-hook-form'
import { Button, type ButtonProps } from '../../atoms/Button/Button'

export interface FormSubmitButtonProps extends Omit<ButtonProps, 'type'> {}

export const FormSubmitButton = React.forwardRef<HTMLButtonElement, FormSubmitButtonProps>(
  ({ isLoading, disabled, ...rest }, ref) => {
    const { formState } = useFormContext()
    const submitting = formState.isSubmitting
    const resolvedLoading = isLoading ?? submitting
    const resolvedDisabled = disabled ?? submitting

    return (
      <Button
        ref={ref}
        type="submit"
        isLoading={resolvedLoading}
        disabled={resolvedDisabled}
        {...rest}
      />
    )
  }
)

FormSubmitButton.displayName = 'FormSubmitButton'
