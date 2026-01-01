/**
 * CdnCounter Component
 * Demo component để load từ CDN
 * Đây là component standalone có thể build và upload lên CDN riêng biệt
 */

import * as React from 'react'
import type { SchemaComponentProps } from '../../../ChatKit/types'

export const CdnCounter: React.FC<SchemaComponentProps> = ({
  node,
  path,
  onAction,
  conversationId,
}) => {
  const [count, setCount] = React.useState(0)
  const {
    initial = 0,
    label = 'Tăng',
    step = 1,
    variant = 'primary',
    showReset = true,
  } = (node.props ?? {}) as Record<string, any>

  // Initialize with initial value
  React.useEffect(() => {
    setCount(Number(initial))
  }, [initial])

  const variantStyles: Record<string, string> = {
    primary: 'bg-slate-900 text-white hover:bg-slate-800',
    secondary: 'bg-slate-200 text-slate-900 hover:bg-slate-300',
    accent: 'bg-indigo-600 text-white hover:bg-indigo-700',
  }

  const handleIncrement = () => {
    const newCount = count + Number(step)
    setCount(newCount)

    if (conversationId && onAction) {
      onAction({
        type: 'cdn.counter.increment',
        conversationId,
        payload: { count: newCount, step, path },
      })
    }
  }

  const handleDecrement = () => {
    const newCount = count - Number(step)
    setCount(newCount)

    if (conversationId && onAction) {
      onAction({
        type: 'cdn.counter.decrement',
        conversationId,
        payload: { count: newCount, step, path },
      })
    }
  }

  const handleReset = () => {
    setCount(Number(initial))

    if (conversationId && onAction) {
      onAction({
        type: 'cdn.counter.reset',
        conversationId,
        payload: { count: Number(initial), path },
      })
    }
  }

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
      <div className="min-w-0">
        <div className="text-xs font-medium text-slate-500">CDN Counter</div>
        <div className="mt-1 text-2xl font-semibold text-slate-900">
          {count.toLocaleString()}
        </div>
        {path.length > 0 && (
          <div className="mt-1 text-[10px] text-slate-400">
            path: {path.join('/')}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
            variant === 'secondary'
              ? 'bg-slate-200 text-slate-900 hover:bg-slate-300'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
          onClick={handleDecrement}
        >
          −
        </button>

        <button
          type="button"
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${variantStyles[variant]}`}
          onClick={handleIncrement}
        >
          {label}
        </button>

        {showReset && (
          <button
            type="button"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition"
            onClick={handleReset}
          >
            ↺
          </button>
        )}
      </div>
    </div>
  )
}

export default CdnCounter
