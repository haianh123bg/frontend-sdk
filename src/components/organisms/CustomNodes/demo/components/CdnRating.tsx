/**
 * CdnRating Component
 * Rating stars component - load từ CDN
 */

import * as React from 'react'
import { twMerge } from 'tailwind-merge'
import type { SchemaComponentProps } from '../../../ChatKit/types'

export const CdnRating: React.FC<SchemaComponentProps> = ({ node }) => {
  const { value = 0, count, className } = (node.props ?? {}) as Record<string, any>
  const v = Math.max(0, Math.min(5, Number(value)))
  const full = Math.floor(v)
  const half = v - full >= 0.5
  const stars = Array.from({ length: 5 }, (_, i) => {
    if (i < full) return 'full'
    if (i === full && half) return 'half'
    return 'empty'
  })

  return (
    <div className={twMerge('flex items-center gap-2', className)}>
      <div className="flex items-center gap-0.5">
        {stars.map((s, i) => (
          <span
            key={i}
            className={twMerge(
              'text-base',
              s === 'full' ? 'text-amber-400' : s === 'half' ? 'text-amber-300' : 'text-slate-200'
            )}
            aria-hidden
          >
            ★
          </span>
        ))}
      </div>
      <span className="text-sm font-semibold text-slate-900">{v.toFixed(1)}</span>
      {count != null && <span className="text-xs text-slate-500">({String(count)})</span>}
    </div>
  )
}

export default CdnRating
