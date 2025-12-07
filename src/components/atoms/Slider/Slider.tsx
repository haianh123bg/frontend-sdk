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
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info'
  onChange?: (value: number) => void
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      className,
      min = 0,
      max = 100,
      step = 1,
      value,
      defaultValue = min,
      showValue = true,
      variant = 'default',
      onChange,
      style,
      ...props
    },
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

    const variantTrackClasses: Record<
      NonNullable<SliderProps['variant']>,
      string
    > = {
      default: 'bg-primary-500',
      success: 'bg-emerald-500',
      error: 'bg-rose-500',
      warning: 'bg-amber-400',
      info: 'bg-sky-500',
    }

    const variantThumbStyles: Record<
      NonNullable<SliderProps['variant']>,
      React.CSSProperties
    > = {
      default: {},
      success: { accentColor: '#10b981' },
      error: { accentColor: '#f43f5e' },
      warning: { accentColor: '#fbbf24' },
      info: { accentColor: '#0ea5e9' },
    }

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
            className={clsx(
              'pointer-events-none absolute h-1 rounded-full',
              variantTrackClasses[variant]
            )}
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
            style={{ ...style, ...variantThumbStyles[variant] }}
            {...props}
          />
        </div>
      </div>
    )
  }
)

Slider.displayName = 'Slider'
