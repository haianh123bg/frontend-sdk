// File: src/components/molecules/Snackbar/SnackbarProvider.tsx
import * as React from 'react'
import { v4 as uuid } from 'uuid'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useDispatchAction } from '../../../bus/hooks'
import { EventType } from '../../../events/types'

export type SnackbarVariant = 'info' | 'success' | 'warning' | 'error'

export interface SnackbarConfig {
  message: string
  variant?: SnackbarVariant
  duration?: number
  actionLabel?: string
  onAction?: () => void
}

interface InternalSnackbar extends SnackbarConfig {
  id: string
}

interface SnackbarContextValue {
  showSnackbar: (config: SnackbarConfig) => void
}

const SnackbarContext = React.createContext<SnackbarContextValue | null>(null)

export const useSnackbar = () => {
  const context = React.useContext(SnackbarContext)
  if (!context) {
    throw new Error('useSnackbar must be used inside SnackbarProvider')
  }
  return context
}

export interface SnackbarProviderProps {
  children: React.ReactNode
  maxSnackbars?: number
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children, maxSnackbars = 3 }) => {
  const dispatch = useDispatchAction()
  const [snackbars, setSnackbars] = React.useState<InternalSnackbar[]>([])

  const removeSnackbar = React.useCallback((id: string) => {
    setSnackbars((prev) => prev.filter((snackbar) => snackbar.id !== id))
  }, [])

  const showSnackbar = React.useCallback(
    (config: SnackbarConfig) => {
      const snackbar: InternalSnackbar = {
        id: uuid(),
        duration: 4000,
        variant: 'info',
        ...config,
      }
      setSnackbars((prev) => {
        const next = [...prev, snackbar]
        return next.slice(-maxSnackbars)
      })
      dispatch(
        EventType.UI_CHANGE,
        { component: 'Snackbar', variant: snackbar.variant, message: snackbar.message },
        { meta: { component: 'SnackbarProvider' } }
      )
      if (snackbar.duration && snackbar.duration > 0) {
        setTimeout(() => removeSnackbar(snackbar.id), snackbar.duration)
      }
    },
    [dispatch, maxSnackbars, removeSnackbar]
  )

  const contextValue = React.useMemo(() => ({ showSnackbar }), [showSnackbar])

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {snackbars.map((snackbar) => (
          <div
            key={snackbar.id}
            className={twMerge(
              clsx(
                'flex min-w-[240px] items-center justify-between gap-3 rounded-2xl px-4 py-3 text-sm shadow-xl',
                'text-white',
                snackbar.variant === 'success' && 'bg-green-500',
                snackbar.variant === 'info' && 'bg-blue-500',
                snackbar.variant === 'warning' && 'bg-amber-500',
                snackbar.variant === 'error' && 'bg-red-500'
              )
            )}
          >
            <span>{snackbar.message}</span>
            {snackbar.actionLabel && (
              <button
                className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold"
                onClick={() => {
                  snackbar.onAction?.()
                  removeSnackbar(snackbar.id)
                }}
              >
                {snackbar.actionLabel}
              </button>
            )}
            <button className="text-lg" onClick={() => removeSnackbar(snackbar.id)}>
              ×
            </button>
          </div>
        ))}
      </div>
    </SnackbarContext.Provider>
  )
}
