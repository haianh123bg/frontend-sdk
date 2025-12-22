import * as React from 'react'
import { Copy, CornerUpLeft, EllipsisVertical, Trash2, RotateCcw, Undo2, ThumbsUp, Heart, Laugh } from 'lucide-react'
import { Avatar } from '../../atoms/Avatar/Avatar'
import { Button } from '../../atoms/Button/Button'
import { IconButton } from '../../atoms/IconButton/IconButton'
import { Image } from '../../atoms/Image/Image'
import { Caption, Text } from '../../atoms/TypographyPrimitives'
import { DropdownMenu, DropdownTrigger, DropdownContent, DropdownItem } from '../../molecules/DropdownMenu/DropdownMenu'
import { Modal } from '../../molecules/Modal/Modal'
import type { AgentThinkingState, ChatMessage } from './types'
import { formatMessageTime, isProbablyUrl } from './utils'

export interface MessageItemProps {
  message: ChatMessage
  currentUserId: string
  showSenderName?: boolean
  showOutgoingAvatar?: boolean
  onCopy?: (message: ChatMessage) => void
  onDelete?: (message: ChatMessage) => void
  onRecall?: (message: ChatMessage) => void
  onReply?: (message: ChatMessage) => void
  onReact?: (message: ChatMessage, reaction: string) => void
  onRetrySend?: (message: ChatMessage) => void
}

const statusLabel: Record<NonNullable<ChatMessage['status']>, string> = {
  sending: 'Đang gửi',
  sent: 'Đã gửi',
  delivered: 'Đã nhận',
  seen: 'Đã xem',
  failed: 'Gửi lỗi',
}

function safeText(text: string) {
  return text
}

export const MessageItem: React.FC<MessageItemProps> = ({
  message,
  currentUserId,
  showSenderName = true,
  showOutgoingAvatar = false,
  onCopy,
  onDelete,
  onRecall,
  onReply,
  onReact,
  onRetrySend,
}) => {
  const isOutgoing = message.direction === 'outgoing' || message.senderId === currentUserId
  const isSystem = message.direction === 'system' || message.content.type === 'system'
  const [openImage, setOpenImage] = React.useState(false)

  if (isSystem) {
    return (
      <div className="flex justify-center py-2">
        <Caption className="rounded-full bg-surface-alt px-3 py-1 text-text-muted">
          {message.content.type === 'system' ? message.content.text : safeText((message.content as any).text || '')}
        </Caption>
      </div>
    )
  }

  const bubbleBase =
    'max-w-[80%] rounded-2xl px-3 py-2 text-sm break-words whitespace-pre-wrap'
  const bubbleClass = isOutgoing
    ? `bg-primary-500 text-white ${bubbleBase}`
    : `bg-surface-alt text-text-primary ${bubbleBase}`

  const wrapperClass = isOutgoing ? 'justify-end' : 'justify-start'

  const timeText = formatMessageTime(message.createdAt)
  const statusText = message.status ? statusLabel[message.status] : undefined

  const renderContent = () => {
    if (message.content.type === 'text') {
      const t = safeText(message.content.text)
      if (isProbablyUrl(t.trim())) {
        return (
          <a
            href={t.trim()}
            target="_blank"
            rel="noreferrer"
            className={isOutgoing ? 'underline text-white' : 'underline text-primary-600'}
          >
            {t}
          </a>
        )
      }
      return <span>{t}</span>
    }

    if (message.content.type === 'markdown') {
      return <span>{safeText(message.content.markdown)}</span>
    }

    if (message.content.type === 'image') {
      return (
        <>
          <button
            type="button"
            className="block"
            onClick={() => setOpenImage(true)}
            aria-label="Xem ảnh"
          >
            <Image
              src={message.content.thumbnailUrl || message.content.url}
              alt={message.content.alt || 'image'}
              className="max-h-40 w-auto max-w-[220px]"
              objectFit="cover"
            />
          </button>
          <Modal open={openImage} onClose={() => setOpenImage(false)} title="Ảnh">
            <Image
              src={message.content.url}
              alt={message.content.alt || 'image'}
              className="w-full max-h-[70vh]"
              objectFit="contain"
            />
          </Modal>
        </>
      )
    }

    if (message.content.type === 'file') {
      const label = message.content.fileName
      return message.content.url ? (
        <a
          href={message.content.url}
          target="_blank"
          rel="noreferrer"
          className={isOutgoing ? 'underline text-white' : 'underline text-primary-600'}
        >
          {label}
        </a>
      ) : (
        <span>{label}</span>
      )
    }

    return null
  }

  const showAvatar = !isOutgoing
  const showName = !isOutgoing && showSenderName && !!message.senderName

  const handleCopy = async () => {
    const text =
      message.content.type === 'text'
        ? message.content.text
        : message.content.type === 'markdown'
          ? message.content.markdown
          : message.content.type === 'system'
            ? message.content.text
            : ''

    try {
      await navigator.clipboard.writeText(text)
    } catch {
    }
    onCopy?.(message)
  }

  return (
    <div className={`flex w-full gap-2 ${wrapperClass}`}>
      {!isOutgoing && showAvatar && (
        <div className="pt-1">
          <Avatar
            src={message.senderAvatarUrl}
            alt={message.senderName || message.senderId}
            initials={message.senderName || message.senderId}
            size="sm"
          />
        </div>
      )}

      <div className={`min-w-0 ${isOutgoing ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
        {showName && <Caption className="text-text-muted">{message.senderName}</Caption>}

        <div className="group relative">
          <div className={bubbleClass}>{renderContent()}</div>

          <div className={`mt-1 flex items-center gap-2 ${isOutgoing ? 'justify-end' : 'justify-start'}`}>
            <Caption className={isOutgoing ? 'text-white/80' : 'text-text-muted'}>
              {timeText}
              {statusText ? ` · ${statusText}` : ''}
            </Caption>

            {message.status === 'failed' && onRetrySend && (
              <Button
                variant={isOutgoing ? 'secondary' : 'ghost'}
                size="sm"
                className="h-7 px-2"
                onClick={() => onRetrySend(message)}
              >
                <span className="inline-flex items-center gap-1">
                  <RotateCcw size={14} />
                  Gửi lại
                </span>
              </Button>
            )}
          </div>

          <div className={`absolute top-1 ${isOutgoing ? 'left-1' : 'right-1'} opacity-0 group-hover:opacity-100 transition-opacity`}>
            <DropdownMenu>
              <DropdownTrigger>
                <IconButton icon={EllipsisVertical} size="xs" variant={isOutgoing ? 'default' : 'muted'} aria-label="Hành động" />
              </DropdownTrigger>
              <DropdownContent align={isOutgoing ? 'left' : 'right'}>
                <DropdownItem onClick={handleCopy}>
                  <span className="inline-flex items-center gap-2">
                    <Copy size={14} />
                    Copy
                  </span>
                </DropdownItem>
                {onReply && (
                  <DropdownItem onClick={() => onReply(message)}>
                    <span className="inline-flex items-center gap-2">
                      <CornerUpLeft size={14} />
                      Reply
                    </span>
                  </DropdownItem>
                )}
                {onReact && (
                  <>
                    <DropdownItem onClick={() => onReact(message, '👍')}>
                      <span className="inline-flex items-center gap-2">
                        <ThumbsUp size={14} />
                        👍
                      </span>
                    </DropdownItem>
                    <DropdownItem onClick={() => onReact(message, '❤️')}>
                      <span className="inline-flex items-center gap-2">
                        <Heart size={14} />
                        ❤️
                      </span>
                    </DropdownItem>
                    <DropdownItem onClick={() => onReact(message, '😆')}>
                      <span className="inline-flex items-center gap-2">
                        <Laugh size={14} />
                        😆
                      </span>
                    </DropdownItem>
                  </>
                )}
                {onRecall && message.canRecall && (
                  <DropdownItem onClick={() => onRecall(message)}>
                    <span className="inline-flex items-center gap-2">
                      <Undo2 size={14} />
                      Thu hồi
                    </span>
                  </DropdownItem>
                )}
                {onDelete && message.canDelete && (
                  <DropdownItem danger onClick={() => onDelete(message)}>
                    <span className="inline-flex items-center gap-2">
                      <Trash2 size={14} />
                      Xóa
                    </span>
                  </DropdownItem>
                )}
              </DropdownContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {isOutgoing && showOutgoingAvatar && (
        <div className="pt-1">
          <Avatar src={message.senderAvatarUrl} alt={message.senderName || message.senderId} initials={message.senderName || message.senderId} size="sm" />
        </div>
      )}
    </div>
  )
}

MessageItem.displayName = 'MessageItem'

export interface AgentThinkingMessageProps {
  state: AgentThinkingState
  agentName?: string
}

export const AgentThinkingMessage: React.FC<AgentThinkingMessageProps> = ({ state, agentName }) => {
  const text = state.mode === 'streaming' ? state.text : 'Đang suy nghĩ'

  return (
    <div className="flex w-full justify-start gap-2">
      <div className="min-w-0">
        <div className="max-w-[80%] rounded-2xl border border-slate-200 bg-surface px-3 py-2 text-sm text-text-muted opacity-80">
          <div className="flex items-center gap-2">
            <span className="truncate">{agentName ? `${agentName}: ` : ''}{text}</span>
            <span className="inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="h-1.5 w-1.5 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="h-1.5 w-1.5 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: '300ms' }} />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

AgentThinkingMessage.displayName = 'AgentThinkingMessage'
