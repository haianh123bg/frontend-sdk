/**
 * CdnUserCard Component
 * Demo user card component để load từ CDN
 */

import * as React from 'react'
import type { SchemaComponentProps } from '../../../ChatKit/types'

interface User {
  id: string
  name: string
  email?: string
  avatar?: string
  role?: string
  status?: 'online' | 'offline' | 'away'
}

export const CdnUserCard: React.FC<SchemaComponentProps> = ({
  node,
  onAction,
  conversationId,
  path,
}) => {
  const { user, showEmail = true, showStatus = true } = (node.props ?? {}) as Record<string, any>
  const userData = user as User

  if (!userData) {
    return (
      <div className="rounded-xl border border-dashed border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-700">
        Missing user prop
      </div>
    )
  }

  const statusColors: Record<string, string> = {
    online: 'bg-emerald-500',
    offline: 'bg-slate-400',
    away: 'bg-amber-500',
  }

  const handleContact = () => {
    if (conversationId && onAction) {
      onAction({
        type: 'cdn.user.contact',
        conversationId,
        payload: { userId: userData.id, path },
      })
    }
  }

  const handleView = () => {
    if (conversationId && onAction) {
      onAction({
        type: 'cdn.user.view',
        conversationId,
        payload: { userId: userData.id, path },
      })
    }
  }

  return (
    <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* Avatar */}
      <div className="relative shrink-0">
        <img
          src={
            userData.avatar ||
            `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.id}`
          }
          alt={userData.name}
          className="h-14 w-14 rounded-full object-cover ring-2 ring-slate-100"
        />
        {showStatus && userData.status && (
          <span
            className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white ${statusColors[userData.status]}`}
          />
        )}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="truncate text-base font-semibold text-slate-900">
              {userData.name}
            </div>
            {showEmail && userData.email && (
              <div className="mt-0.5 truncate text-sm text-slate-500">
                {userData.email}
              </div>
            )}
            {userData.role && (
              <div className="mt-1">
                <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                  {userData.role}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          onClick={handleView}
        >
          View
        </button>
        <button
          type="button"
          className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-slate-800"
          onClick={handleContact}
        >
          Contact
        </button>
      </div>
    </div>
  )
}

export default CdnUserCard
