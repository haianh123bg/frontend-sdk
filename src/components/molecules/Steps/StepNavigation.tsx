import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Button } from '../../atoms/Button/Button'

export interface StepNavigationLabels {
  prev?: string
  next?: string
  submit?: string
}

export interface StepNavigationProps extends React.HTMLAttributes<HTMLDivElement> {
  current: number
  total: number
  canNext?: boolean
  canPrev?: boolean
  isSubmitting?: boolean
  labels?: StepNavigationLabels
  onPrev?: () => void
  onNext?: () => void
  onSubmit?: () => void
}

export const StepNavigation = React.forwardRef<HTMLDivElement, StepNavigationProps>(
  (
    {
      className,
      current,
      total,
      canNext = true,
      canPrev = true,
      isSubmitting,
      labels,
      onPrev,
      onNext,
      onSubmit,
      ...props
    },
    ref
  ) => {
    const isFirst = current <= 0
    const isLast = current >= total - 1

    const handlePrev = () => {
      if (isFirst || !canPrev) return
      onPrev?.()
    }

    const handleNext = () => {
      if (isLast || !canNext) return
      onNext?.()
    }

    const handleSubmit = () => {
      if (!isLast) return
      onSubmit?.()
    }

    const prevLabel = labels?.prev ?? 'Previous'
    const nextLabel = labels?.next ?? 'Next'
    const submitLabel = labels?.submit ?? 'Submit'

    return (
      <div
        ref={ref}
        className={twMerge(
          clsx(
            'flex items-center justify-between gap-4',
            className
          )
        )}
        {...props}
      >
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>
            Step {current + 1} / {total}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handlePrev}
            disabled={isFirst || !canPrev}
          >
            {prevLabel}
          </Button>
          {!isLast && (
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={handleNext}
              disabled={!canNext}
            >
              {nextLabel}
            </Button>
          )}
          {isLast && (
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={handleSubmit}
              isLoading={isSubmitting}
            >
              {submitLabel}
            </Button>
          )}
        </div>
      </div>
    )
  }
)

StepNavigation.displayName = 'StepNavigation'
