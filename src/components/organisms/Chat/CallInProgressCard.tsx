import * as React from 'react'
import { clsx } from 'clsx'
import { PhoneOff } from 'lucide-react'
import { Avatar } from '../../atoms/Avatar/Avatar'
import { Caption, Text } from '../../atoms/TypographyPrimitives'
import { IconButton } from '../../atoms/IconButton/IconButton'
import type { ChatAgentInfo } from './types'

export interface CallInProgressCardProps {
  agent: ChatAgentInfo
  callDurationLabel: string
  onEndCall: () => void
  className?: string
}

export const CallInProgressCard: React.FC<CallInProgressCardProps> = ({
  agent,
  callDurationLabel,
  onEndCall,
  className,
}) => {
  return (
    <div className={clsx('mx-3 mt-3 rounded-3xl border border-slate-100 bg-white p-4 shadow-lg', className)}>
      <div className="flex items-center gap-4">
        <div className="relative shrink-0">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-rose-400 via-orange-400 to-amber-400 opacity-70 blur-md" />
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 via-orange-400 to-amber-300 text-white">
            {agent.logoUrl ? (
              <Avatar src={agent.logoUrl} alt={agent.name} size="sm" />
            ) : (
              <span className="text-sm font-semibold">{agent.name.slice(0, 2).toUpperCase()}</span>
            )}
          </div>
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
          <div className="min-w-0">
            <Text className="text-base font-semibold text-slate-900">{agent.name}</Text>
            <Caption className="text-rose-500">{callDurationLabel}</Caption>
          </div>
        </div>

        <IconButton
          icon={PhoneOff}
          size="md"
          variant="default"
          className="h-11 w-11 shrink-0 bg-rose-500 text-white shadow-lg shadow-rose-200 hover:bg-rose-600"
          disableHover
          aria-label="Kết thúc cuộc gọi"
          onClick={onEndCall}
        />
      </div>
    </div>
  )
}
