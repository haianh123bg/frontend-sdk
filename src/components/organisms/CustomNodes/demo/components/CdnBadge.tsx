/**
 * CdnBadge Component
 * Badge component với tone colors - load từ CDN
 */

import * as React from 'react'
import { twMerge } from 'tailwind-merge'
import type { SchemaComponentProps } from '../../../ChatKit/types'

export const CdnBadge: React.FC<SchemaComponentProps> = ({ node }) => {
  const { text, tone = 'slate', className } = (node.props ?? {}) as Record<string, any>

  const toneMap: Record<string, { bg: string; ring: string; text: string }> = {
    slate: { bg: 'bg-slate-100', ring: 'ring-slate-200', text: 'text-slate-700' },
    indigo: { bg: 'bg-indigo-50', ring: 'ring-indigo-200', text: 'text-indigo-700' },
    emerald: { bg: 'bg-emerald-50', ring: 'ring-emerald-200', text: 'text-emerald-700' },
    amber: { bg: 'bg-amber-50', ring: 'ring-amber-200', text: 'text-amber-700' },
    rose: { bg: 'bg-rose-50', ring: 'ring-rose-200', text: 'text-rose-700' },
    sky: { bg: 'bg-sky-50', ring: 'ring-sky-200', text: 'text-sky-700' },
  }

  const t = toneMap[String(tone)] ?? toneMap.slate

  return (
    <span
      className={twMerge(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide ring-1',
        t.bg,
        t.ring,
        t.text,
        className
      )}
    >
      {text != null ? String(text) : ''}
    </span>
  )
}

export default CdnBadge
