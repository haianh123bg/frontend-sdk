/**
 * CdnProgress Component
 * Progress bar component - load từ CDN
 */

import * as React from 'react'
import { twMerge } from 'tailwind-merge'
import type { SchemaComponentProps } from '../../../ChatKit/types'

export const CdnProgress: React.FC<SchemaComponentProps> = ({ node }) => {
  const { value = 0, max = 100, label, showPercentage = true, color = 'primary', className } = (node.props ?? {}) as Record<string, any>

  const percentage = Math.max(0, Math.min(100, (Number(value) / Number(max)) * 100))

  const colorStyles: Record<string, string> = {
    primary: 'bg-slate-900',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-rose-500',
    info: 'bg-sky-500',
  }

  return (
    <div className={twMerge('w-full', className)}>
      {(label || showPercentage) && (
        <div className="mb-2 flex items-center justify-between">
          {label && <div className="text-sm font-medium text-slate-700">{String(label)}</div>}
          {showPercentage && (
            <div className="text-sm font-semibold text-slate-900">
              {percentage.toFixed(0)}%
            </div>
          )}
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={twMerge('h-full rounded-full transition-all duration-300', colorStyles[color] || colorStyles.primary)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export default CdnProgress
