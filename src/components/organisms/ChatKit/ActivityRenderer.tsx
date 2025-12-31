import * as React from 'react'
import { twMerge } from 'tailwind-merge'
import type { ChatKitActionEvent, ChatKitActivity } from './contracts'

export type ActivityComponentProps = {
  activity: ChatKitActivity
  onAction?: (event: ChatKitActionEvent) => void
  conversationId?: string
}

export type ActivityComponent = React.ComponentType<ActivityComponentProps>

export type ActivityRegistry = Record<string, ActivityComponent>

const DefaultActivity: React.FC<ActivityComponentProps> = ({ activity }) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-surface px-3 py-2">
      <div className="text-xs font-semibold text-text-secondary">{activity.activityType}</div>
      <pre className="mt-2 max-h-[240px] overflow-auto rounded-lg bg-slate-950 p-2 text-[11px] text-slate-100">
        {JSON.stringify(activity.content ?? {}, null, 2)}
      </pre>
    </div>
  )
}

export interface ActivityRendererProps {
  activities: ChatKitActivity[]
  registry?: ActivityRegistry
  conversationId?: string
  onAction?: (event: ChatKitActionEvent) => void
  className?: string
  unknownFallback?: (activity: ChatKitActivity) => React.ReactNode
}

export const ActivityRenderer: React.FC<ActivityRendererProps> = ({
  activities,
  registry,
  conversationId,
  onAction,
  className,
  unknownFallback,
}) => {
  return (
    <div className={twMerge('flex flex-col gap-2', className)}>
      {(activities ?? []).map((a) => {
        const Comp = registry?.[a.activityType]
        if (!Comp) {
          return (
            <React.Fragment key={a.id}>
              {unknownFallback ? unknownFallback(a) : <DefaultActivity activity={a} conversationId={conversationId} onAction={onAction} />}
            </React.Fragment>
          )
        }
        return <Comp key={a.id} activity={a} conversationId={conversationId} onAction={onAction} />
      })}
    </div>
  )
}

ActivityRenderer.displayName = 'ActivityRenderer'
