import * as React from 'react'
import { PhoneCall, List, ListTodo, SquarePen, X } from 'lucide-react'
import { Avatar } from '../../atoms/Avatar/Avatar'
import { IconButton } from '../../atoms/IconButton/IconButton'
import { Caption, Text } from '../../atoms/TypographyPrimitives'
import type { ChatAgentInfo } from './types'

export interface ChatHeaderProps {
  agent: ChatAgentInfo
  onCallAgent?: () => void
  onOpenConversations?: () => void
  onOpenTasks?: () => void
  onCreateConversation?: () => void
  onClose?: () => void
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  agent,
  onCallAgent,
  onOpenConversations,
  onOpenTasks,
  onCreateConversation,
  onClose,
}) => {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-surface px-3 py-2">
      <div className="flex min-w-0 items-center gap-2">
        <Avatar src={agent.logoUrl} alt={agent.name} initials={agent.name} size="sm" />
        <div className="min-w-0">
          <Text className="truncate text-sm font-semibold">{agent.name}</Text>
          {agent.status && (
            <Caption className="text-text-muted">{agent.status === 'online' ? 'Online' : 'Offline'}</Caption>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <IconButton icon={PhoneCall} size="sm" variant="muted" aria-label="Call Agent" onClick={onCallAgent} />
        <IconButton icon={List} size="sm" variant="muted" aria-label="Danh sách cuộc trò chuyện" onClick={onOpenConversations} />
        <IconButton icon={ListTodo} size="sm" variant="muted" aria-label="Danh sách nhiệm vụ" onClick={onOpenTasks} />
        <IconButton icon={SquarePen} size="sm" variant="muted" aria-label="Tạo cuộc trò chuyện mới" onClick={onCreateConversation} />
        {onClose && (
          <IconButton icon={X} size="sm" variant="muted" aria-label="Đóng" onClick={onClose} />
        )}
      </div>
    </div>
  )
}

ChatHeader.displayName = 'ChatHeader'
