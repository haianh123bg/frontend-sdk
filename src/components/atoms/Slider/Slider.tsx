// File: src/components/atoms/Slider/Slider.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useDispatchAction } from '../../../bus/hooks'
import { EventType } from '../../../events/types'

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  min?: number
  max?: number
  step?: number
  value?: number
  defaultValue?: number
  showValue?: boolean
  onChange?: (value: number) => void
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    { className, min = 0, max = 100, step = 1, value, defaultValue = min, showValue = true, onChange, ...props },
    ref
  ) => {
    const dispatch = useDispatchAction()
    const [internal, setInternal] = React.useState(defaultValue)

    const currentValue = value ?? internal

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = Number(e.target.value)
      if (value === undefined) {
        setInternal(next)
      }
      dispatch(EventType.UI_CHANGE, { value: next }, { meta: { component: 'Slider' } })
      onChange?.(next)
    }

    const percentage = ((currentValue - min) / (max - min)) * 100

    return (
      <div className={twMerge(clsx('flex w-full flex-col gap-2', className))}>
        {showValue && (
          <div className="flex justify-between text-xs text-text-muted">
            <span>{min}</span>
            <span className="font-medium text-text-primary">{currentValue}</span>
            <span>{max}</span>
          </div>
        )}
        <div className="relative flex items-center">
          <div className="pointer-events-none absolute h-1 w-full rounded-full bg-slate-200" />
          <div
            className="pointer-events-none absolute h-1 rounded-full bg-primary-500"
            style={{ width: `${percentage}%` }}
          />
          <input
            ref={ref}
            type="range"
            min={min}
            max={max}
            step={step}
            value={currentValue}
            onChange={handleChange}
            className="relative w-full appearance-none bg-transparent"
            {...props}
          />
        </div>
      </div>
    )
  }
)

Slider.displayName = 'Slider'
