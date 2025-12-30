import * as React from 'react'
import { twMerge } from 'tailwind-merge'
import type { SchemaComponentProps } from '../../types'
import { formatCurrency } from '../shared/formatCurrency'

export const PriceNode: React.FC<SchemaComponentProps> = ({ node }) => {
  const { value = 0, oldValue, currency = 'VND', className } = (node.props ?? {}) as Record<string, any>
  const v = Number(value)
  const old = oldValue != null ? Number(oldValue) : null

  return (
    <div className={twMerge('flex items-end gap-2', className)}>
      <div className="text-lg font-semibold text-text-primary">{formatCurrency(v, String(currency))}</div>
      {old != null && Number.isFinite(old) && old > v && (
        <div className="text-xs text-text-muted line-through">{formatCurrency(old, String(currency))}</div>
      )}
    </div>
  )
}
