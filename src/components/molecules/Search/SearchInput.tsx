// File: src/components/molecules/Search/SearchInput.tsx
import * as React from 'react'
import type { KeyboardEvent } from 'react'
import { Input } from '../../atoms/Input/Input'
import type { InputProps } from '../../atoms/Input/Input'

export interface SearchInputProps
  extends Omit<InputProps, 'onChange' | 'defaultValue'> {
  /**
   * Giá trị điều khiển từ bên ngoài (thường là state search hiện tại).
   */
  value?: string
  /**
   * Callback khi search được "commit" (sau debounce hoặc khi nhấn Enter).
   */
  onSearch?: (value: string) => void
  /**
   * Thời gian debounce (ms). Mặc định 1000ms. Đặt 0 để tắt debounce.
   */
  debounceMs?: number
  /**
   * Giá trị khởi tạo khi không dùng controlled value.
   */
  initialValue?: string
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      value: valueProp,
      onSearch,
      debounceMs = 1000,
      initialValue = '',
      onKeyDown,
      ...rest
    },
    ref
  ) => {
    const [innerValue, setInnerValue] = React.useState<string>(valueProp ?? initialValue)

    // Đồng bộ khi value controlled thay đổi từ bên ngoài
    React.useEffect(() => {
      if (valueProp !== undefined && valueProp !== innerValue) {
        setInnerValue(valueProp)
      }
    }, [valueProp])

    // Debounce commit
    React.useEffect(() => {
      if (!onSearch || debounceMs <= 0) return
      const handle = window.setTimeout(() => {
        onSearch(innerValue)
      }, debounceMs)
      return () => window.clearTimeout(handle)
    }, [innerValue, debounceMs, onSearch])

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        if (onSearch) {
          onSearch(innerValue)
        }
      }
      onKeyDown?.(e)
    }

    const handleChange: NonNullable<InputProps['onChange']> = (e) => {
      setInnerValue(e.target.value)
      // Không gọi onSearch trực tiếp ở đây, chỉ update local và để debounce / Enter xử lý
    }

    return (
      <Input
        ref={ref}
        value={innerValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...rest}
      />
    )
  }
)

SearchInput.displayName = 'SearchInput'
