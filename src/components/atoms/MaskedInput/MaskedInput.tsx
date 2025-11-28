// File: src/components/atoms/MaskedInput/MaskedInput.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useDispatchAction } from '../../../bus/hooks'
import { EventType } from '../../../events/types'

export interface MaskedInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  mask: string // e.g. "+XXX-XXX-XXXX"
  placeholderChar?: string
  onChange?: (value: string, rawValue: string) => void
  error?: boolean
}

const sanitize = (value: string) => value.replace(/[^0-9a-zA-Z]/g, '')

const buildMaskedValue = (mask: string, rawValue: string, placeholderChar: string) => {
  const chars = sanitize(rawValue)
  let charIndex = 0
  let result = ''

  for (let i = 0; i < mask.length; i++) {
    const maskChar = mask[i]
    if (maskChar === placeholderChar) {
      if (charIndex < chars.length) {
        result += chars[charIndex]
        charIndex++
      } else {
        break
      }
    } else {
      result += maskChar
    }
  }

  return result
}

export const MaskedInput = React.forwardRef<HTMLInputElement, MaskedInputProps>(
  (
    { className, mask, placeholderChar = 'X', onChange, error, value, defaultValue, ...props },
    ref
  ) => {
    const dispatch = useDispatchAction()
    const [rawValue, setRawValue] = React.useState<string>(
      (value ?? defaultValue ?? '').toString()
    )

    const maskedValue = React.useMemo(
      () => buildMaskedValue(mask, rawValue, placeholderChar),
      [mask, rawValue, placeholderChar]
    )

    React.useEffect(() => {
      if (value !== undefined) {
        setRawValue(value.toString())
      }
    }, [value])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value
      const unmasked = sanitize(inputValue)
      setRawValue(unmasked)
      const nextMasked = buildMaskedValue(mask, unmasked, placeholderChar)
      dispatch(
        EventType.UI_CHANGE,
        { value: nextMasked, masked: nextMasked, raw: unmasked },
        { meta: { component: 'MaskedInput' } }
      )
      onChange?.(nextMasked, unmasked)
    }

    return (
      <input
        ref={ref}
        value={maskedValue}
        className={twMerge(
          clsx(
            'flex h-10 w-full rounded-xl bg-surface-alt px-3 py-2 text-sm placeholder:text-text-muted',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'transition-all duration-200',
            error && 'ring-2 ring-red-500 focus-visible:ring-red-500',
            className
          )
        )}
        onChange={handleChange}
        {...props}
      />
    )
  }
)

MaskedInput.displayName = 'MaskedInput'
