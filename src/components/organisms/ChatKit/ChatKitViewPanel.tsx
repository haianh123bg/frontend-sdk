import * as React from 'react'
import { twMerge } from 'tailwind-merge'
import type { ChatKitActionEvent, ChatKitActivity, ChatKitState } from './contracts'
import type { ComponentRegistry, UIComponent } from './types'
import { BoundSchemaRenderer } from './BoundSchemaRenderer'
import { ActivityRenderer, type ActivityRegistry } from './ActivityRenderer'

export interface ChatKitViewPanelProps {
  title?: React.ReactNode
  widgets?: UIComponent[]
  state?: ChatKitState
  widgetRegistry?: ComponentRegistry
  activities?: ChatKitActivity[]
  activityRegistry?: ActivityRegistry
  conversationId?: string
  onAction?: (event: ChatKitActionEvent) => void
  className?: string
  contentClassName?: string
  emptyState?: React.ReactNode
}

export const ChatKitViewPanel: React.FC<ChatKitViewPanelProps> = ({
  title = 'ViewPanel',
  widgets,
  state,
  widgetRegistry,
  activities,
  activityRegistry,
  conversationId,
  onAction,
  className,
  contentClassName,
  emptyState,
}) => {
  const hasWidgets = Boolean(widgets?.length)
  const hasActivities = Boolean(activities?.length)

  return (
    <div className={twMerge('flex h-full w-full flex-col overflow-hidden rounded-2xl bg-surface shadow-sm', className)}>
      <div className="border-b border-slate-200/70 px-4 py-2 text-sm font-semibold">{title}</div>
      <div className={twMerge('flex-1 overflow-auto p-4', contentClassName)}>
        {hasWidgets && (
          <BoundSchemaRenderer
            nodes={widgets}
            registry={widgetRegistry}
            conversationId={conversationId}
            onAction={onAction}
            state={state}
          />
        )}

        {hasActivities && (
          <div className={hasWidgets ? 'mt-3' : undefined}>
            <ActivityRenderer
              activities={activities ?? []}
              registry={activityRegistry}
              conversationId={conversationId}
              onAction={onAction}
            />
          </div>
        )}

        {!hasWidgets && !hasActivities && (emptyState ?? <div className="text-sm text-text-muted">Chưa có nội dung.</div>)}
      </div>
    </div>
  )
}

ChatKitViewPanel.displayName = 'ChatKitViewPanel'
