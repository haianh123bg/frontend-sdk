/**
 * CdnChip Component
 * Filter chip component - load từ CDN
 */

import * as React from 'react'
import { twMerge } from 'tailwind-merge'
import type { SchemaComponentProps } from '../../../ChatKit/types'

export const CdnChip: React.FC<SchemaComponentProps> = ({ node, onAction, conversationId, path }) => {
  const { label, active, actionType = 'cdn.chip.select', payload, className } = (node.props ?? {}) as Record<string, any>

  const handleClick = () => {
    if (conversationId && onAction) {
      onAction({
        type: String(actionType),
        conversationId,
        payload: { ...(payload ?? {}), label, path }
      })
    }
  }

  return (
    <button
      type="button"
      className={twMerge(
        'rounded-full px-4 py-2 text-sm font-medium ring-1 transition-all',
        active
          ? 'bg-slate-900 text-white ring-slate-900'
          : 'bg-white text-slate-700 ring-slate-200 hover:bg-slate-50',
        className
      )}
      onClick={handleClick}
    >
      {label != null ? String(label) : ''}
    </button>
  )
}

export default CdnChip
