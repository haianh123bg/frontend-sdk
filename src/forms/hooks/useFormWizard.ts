import { useCallback, useState } from 'react'
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'

export interface FormWizardStep<TFieldValues extends FieldValues> {
  id: string
  /**
   * Danh sách field cần validate ở step này.
   * Có thể để trống cho step review.
   */
  fields?: Path<TFieldValues>[]
}

export interface UseFormWizardOptions {
  /**
   * Mặc định true: tự focus vào field đầu tiên lỗi của step khi trigger.
   */
  shouldFocus?: boolean
}

export interface UseFormWizardResult<TFieldValues extends FieldValues> {
  stepIndex: number
  currentStep: FormWizardStep<TFieldValues>
  steps: FormWizardStep<TFieldValues>[]
  isFirstStep: boolean
  isLastStep: boolean
  next: () => Promise<boolean>
  back: () => void
  goTo: (index: number, options?: { validate?: boolean }) => Promise<boolean>
  reset: () => void
}

export function useFormWizard<TFieldValues extends FieldValues>(
  methods: UseFormReturn<TFieldValues>,
  steps: FormWizardStep<TFieldValues>[],
  options: UseFormWizardOptions = {}
): UseFormWizardResult<TFieldValues> {
  const [stepIndex, setStepIndex] = useState(0)
  const shouldFocus = options.shouldFocus ?? true

  const triggerStep = useCallback(
    async (index: number) => {
      const step = steps[index]
      if (!step || !step.fields || step.fields.length === 0) return true
      return methods.trigger(step.fields as any, { shouldFocus })
    },
    [methods, shouldFocus, steps]
  )

  const next = useCallback(async () => {
    const isValid = await triggerStep(stepIndex)
    if (!isValid) return false
    if (stepIndex < steps.length - 1) {
      setStepIndex((prev) => prev + 1)
    }
    return true
  }, [stepIndex, steps.length, triggerStep])

  const back = useCallback(() => {
    setStepIndex((prev) => (prev > 0 ? prev - 1 : prev))
  }, [])

  const goTo = useCallback(
    async (index: number, opts?: { validate?: boolean }) => {
      if (index < 0 || index >= steps.length) return false
      if (opts?.validate) {
        const ok = await triggerStep(stepIndex)
        if (!ok) return false
      }
      setStepIndex(index)
      return true
    },
    [stepIndex, steps.length, triggerStep]
  )

  const reset = useCallback(() => {
    setStepIndex(0)
  }, [])

  return {
    stepIndex,
    currentStep: steps[stepIndex],
    steps,
    isFirstStep: stepIndex === 0,
    isLastStep: stepIndex === steps.length - 1,
    next,
    back,
    goTo,
    reset,
  }
}
