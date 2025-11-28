// File: src/components/molecules/RadioGroup/RadioGroup.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Radio } from '../../atoms/Radio/Radio'

export interface RadioOption {
  label: string
  value: string
  disabled?: boolean
}

export interface RadioGroupProps {
  name: string
  options: RadioOption[]
  value?: string
  onChange?: (value: string) => void
  orientation?: 'horizontal' | 'vertical'
  className?: string
  error?: boolean
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ name, options, value, onChange, orientation = 'vertical', className, error }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value)
    }

    return (
      <div
        ref={ref}
        role="radiogroup"
        className={twMerge(
          clsx(
            'flex gap-4',
            orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
            className
          )
        )}
      >
        {options.map((option) => (
          <Radio
            key={option.value}
            name={name}
            value={option.value}
            label={option.label}
            checked={value === option.value}
            onChange={handleChange}
            disabled={option.disabled}
            error={error}
          />
        ))}
      </div>
    )
  }
)

RadioGroup.displayName = 'RadioGroup'
