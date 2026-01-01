/**
 * CdnStatCard Component
 * Demo statistics card component để load từ CDN
 */

import * as React from 'react'
import type { SchemaComponentProps } from '../../../ChatKit/types'

export const CdnStatCard: React.FC<SchemaComponentProps> = ({ node, renderChildren }) => {
  const {
    title = 'Statistic',
    value = '0',
    change,
    changeType = 'neutral',
    icon,
    size = 'md',
    className,
  } = (node.props ?? {}) as Record<string, any>

  const sizeStyles: Record<string, { title: string; value: string; change: string }> = {
    sm: {
      title: 'text-xs',
      value: 'text-lg',
      change: 'text-[10px]',
    },
    md: {
      title: 'text-sm',
      value: 'text-2xl',
      change: 'text-xs',
    },
    lg: {
      title: 'text-base',
      value: 'text-3xl',
      change: 'text-sm',
    },
  }

  const changeTypeStyles: Record<string, string> = {
    positive: 'text-emerald-600',
    negative: 'text-rose-600',
    neutral: 'text-slate-500',
  }

  const changeIcons: Record<string, string> = {
    positive: '↑',
    negative: '↓',
    neutral: '−',
  }

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${className || ''}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className={`font-medium text-slate-500 ${sizeStyles[size].title}`}>{title}</div>
          <div className={`mt-1 font-semibold text-slate-900 ${sizeStyles[size].value}`}>
            {value}
          </div>
          {change && (
            <div className={`mt-1 flex items-center gap-1 ${sizeStyles[size].change}`}>
              <span className={changeTypeStyles[changeType]}>
                {changeIcons[changeType]} {change}
              </span>
            </div>
          )}
        </div>

        {icon && (
          <div className="flex shrink-0 items-center justify-center rounded-xl bg-slate-100 p-3 text-slate-600">
            <span className="text-xl">{icon}</span>
          </div>
        )}
        {renderChildren && renderChildren()}
      </div>
    </div>
  )
}

export default CdnStatCard
