import * as React from 'react'
import { clsx } from 'clsx'
import { ThemeSwitch, type ThemeSwitchProps } from '../components/atoms/ThemeSwitch/ThemeSwitch'
import { Button } from '../components/atoms/Button/Button'
import { useTheme } from './ThemeProvider'
import type { ThemeMode } from './types'

export interface ThemeModeSwitchProps
  extends Omit<ThemeSwitchProps, 'checked' | 'defaultChecked' | 'onCheckedChange'> {
  showSystemButton?: boolean
  systemLabel?: string
  onModeChange?: (mode: ThemeMode) => void
}

export const ThemeModeSwitch: React.FC<ThemeModeSwitchProps> = ({
  className,
  showSystemButton = true,
  systemLabel = 'System',
  onModeChange,
  label,
  ...props
}) => {
  const { mode, resolvedMode, setMode } = useTheme()

  const checked = resolvedMode === 'dark'

  const handleCheckedChange = (nextChecked: boolean) => {
    const nextMode: ThemeMode = nextChecked ? 'dark' : 'light'
    setMode(nextMode)
    onModeChange?.(nextMode)
  }

  const handleSetSystem = () => {
    setMode('system')
    onModeChange?.('system')
  }

  return (
    <div className={clsx('inline-flex items-center gap-2', className)}>
      <ThemeSwitch
        {...props}
        label={label}
        checked={checked}
        onCheckedChange={handleCheckedChange}
      />

      {showSystemButton && (
        <Button
          type="button"
          data-style={mode === 'system' ? 'primary' : 'secondary'}
          className="h-8 px-3"
          onClick={handleSetSystem}
        >
          {systemLabel}
        </Button>
      )}
    </div>
  )
}
