import * as React from 'react'
import { twMerge } from 'tailwind-merge'
import { List, ListTodo, SquarePen } from 'lucide-react'
import { ChatHeader, type ChatHeaderProps } from './ChatHeader'
import { ChatInput, type ChatInputProps } from './ChatInput'
import { MessageList, type MessageListProps } from './MessageList'
import { Button } from '../../atoms/Button/Button'
import { Modal } from '../../molecules/Modal/Modal'
import { CallInProgressCard } from './CallInProgressCard'
import { createOptimisticOutgoingMessage, type AgentThinkingState, type ChatAgentInfo, type ChatMessage, type SendMessageInput } from './types'
import { SchemaRenderer, type ComponentRegistry, type ChatKitActionEvent, type UIComponent } from '../ChatKit'

export interface ChatPanelProps
  extends Pick<
      MessageListProps,
      | 'showSenderName'
      | 'showOutgoingAvatar'
      | 'incomingMessageStyle'
      | 'onCopy'
      | 'onDelete'
      | 'onRecall'
      | 'onReply'
      | 'onReact'
    >,
    Pick<ChatHeaderProps, 'onCallAgent' | 'onOpenConversations' | 'onOpenTasks' | 'onCreateConversation' | 'onClose'>,
    Pick<ChatInputProps, 'allowAttachments' | 'maxAttachments' | 'placeholder' | 'mentionContexts' | 'onOpenSettings' | 'onVoiceToText'> {
  agent: ChatAgentInfo
  messages: ChatMessage[]
  agentThinking?: AgentThinkingState | null
  typingText?: string
  conversationId: string
  currentUserId: string
  currentUserName?: string
  currentUserAvatarUrl?: string
  widgets?: UIComponent[]
  widgetRegistry?: ComponentRegistry
  onWidgetAction?: (event: ChatKitActionEvent) => void
  virtualized?: boolean
  estimateRowHeight?: number
  overscan?: number
  onLoadOlder?: () => void
  hasMoreOlder?: boolean
  isLoadingOlder?: boolean
  onSend?: (input: SendMessageInput) => void | Promise<void>
  enableOptimistic?: boolean
  className?: string
}

function toMs(v: string | number) {
  const n = typeof v === 'number' ? v : Date.parse(v)
  return Number.isFinite(n) ? n : 0
}

export const ChatPanel: React.FC<ChatPanelProps> = ({
  agent,
  messages,
  agentThinking,
  typingText,
  conversationId,
  currentUserId,
  currentUserName,
  currentUserAvatarUrl,
  widgets,
  widgetRegistry,
  onWidgetAction,
  showSenderName,
  showOutgoingAvatar,
  incomingMessageStyle,
  onCopy,
  onDelete,
  onRecall,
  onReply,
  onReact,
  onCallAgent,
  onOpenConversations,
  onOpenTasks,
  onCreateConversation,
  onClose,
  allowAttachments,
  maxAttachments,
  placeholder,
  mentionContexts,
  onOpenSettings,
  onVoiceToText,
  virtualized,
  estimateRowHeight,
  overscan,
  onLoadOlder,
  hasMoreOlder,
  isLoadingOlder,
  onSend,
  enableOptimistic = true,
  className,
}) => {
  const [optimisticMessages, setOptimisticMessages] = React.useState<ChatMessage[]>([])
  const [replyTo, setReplyTo] = React.useState<ChatMessage | null>(null)
  const [confirmDelete, setConfirmDelete] = React.useState<ChatMessage | null>(null)
  const [localDeleted, setLocalDeleted] = React.useState<Record<string, true>>({})
  const [localReactions, setLocalReactions] = React.useState<Record<string, Record<string, number>>>({})
  const [myReactions, setMyReactions] = React.useState<Record<string, Record<string, true>>>({})

  const [headerModal, setHeaderModal] = React.useState<null | 'call' | 'conversations' | 'tasks' | 'create'>(null)
  const [callConnected, setCallConnected] = React.useState(false)
  const [callTick, setCallTick] = React.useState(0)
  const callStartedAtRef = React.useRef<number | null>(null)

  const getMessageKey = React.useCallback((m: ChatMessage) => m.clientId || m.id, [])

  const replyPreviewText = React.useMemo(() => {
    if (!replyTo) return undefined
    if (replyTo.content.type === 'text') return replyTo.content.text
    if (replyTo.content.type === 'markdown') return replyTo.content.markdown
    if (replyTo.content.type === 'image') return '[Ảnh]'
    if (replyTo.content.type === 'video') return '[Video]'
    if (replyTo.content.type === 'audio') return '[Audio]'
    if (replyTo.content.type === 'sticker') return '[Sticker]'
    if (replyTo.content.type === 'contact') return `[Liên hệ] ${replyTo.content.name}`
    if (replyTo.content.type === 'location') return '[Vị trí]'
    if (replyTo.content.type === 'call') return replyTo.content.kind === 'missed' ? '[Cuộc gọi nhỡ]' : '[Cuộc gọi đến]'
    if (replyTo.content.type === 'file') return `[File] ${replyTo.content.fileName}`
    if (replyTo.content.type === 'system') return replyTo.content.text
    return ''
  }, [replyTo])

  React.useEffect(() => {
    setOptimisticMessages([])
    setReplyTo(null)
    setConfirmDelete(null)
    setLocalDeleted({})
    setLocalReactions({})
    setMyReactions({})
    setHeaderModal(null)
  }, [conversationId])

  React.useEffect(() => {
    if (headerModal !== 'call') return

    setCallConnected(false)
    setCallTick(0)
    callStartedAtRef.current = null

    const t = window.setTimeout(() => {
      setCallConnected(true)
      callStartedAtRef.current = Date.now()
    }, 650)

    return () => window.clearTimeout(t)
  }, [headerModal])

  React.useEffect(() => {
    if (headerModal !== 'call') return
    if (!callConnected) return

    const interval = window.setInterval(() => {
      setCallTick((v) => v + 1)
    }, 1000)

    return () => window.clearInterval(interval)
  }, [callConnected, headerModal])

  const callDurationLabel = React.useMemo(() => {
    if (!callConnected) return 'Đang gọi…'
    const startedAt = callStartedAtRef.current
    if (!startedAt) return '00:00'
    const sec = Math.max(0, Math.floor((Date.now() - startedAt) / 1000))
    const mm = String(Math.floor(sec / 60)).padStart(2, '0')
    const ss = String(sec % 60).padStart(2, '0')
    return `${mm}:${ss}`
  }, [callConnected, callTick])

  React.useEffect(() => {
    if (optimisticMessages.length === 0) return

    setOptimisticMessages((prev) =>
      prev.filter((om) => {
        const exists = messages.some((m) => {
          if (om.clientId && m.clientId) return m.clientId === om.clientId
          if (om.clientId) return m.id === om.clientId
          return m.id === om.id
        })
        return !exists
      })
    )
  }, [messages, optimisticMessages.length])

  const combinedMessages = React.useMemo(() => {
    const map = new Map<string, ChatMessage>()

    for (const m of optimisticMessages) {
      map.set(getMessageKey(m), m)
    }
    for (const m of messages) {
      map.set(getMessageKey(m), m)
    }

    const all = Array.from(map.values())
    all.sort((a, b) => toMs(a.createdAt) - toMs(b.createdAt))

    return all
      .filter((m) => !localDeleted[getMessageKey(m)])
      .map((m) => {
        const key = getMessageKey(m)
        const reactions = localReactions[key]
        return reactions ? { ...m, reactions } : m
      })
  }, [getMessageKey, localDeleted, localReactions, messages, optimisticMessages])

  const sendInternal = async (input: SendMessageInput) => {
    if (!onSend) return

    if (enableOptimistic) {
      const optimistic = createOptimisticOutgoingMessage({
        currentUserId,
        currentUserName,
        currentUserAvatarUrl,
        input,
      })
      setOptimisticMessages((prev) => [...prev, optimistic])
    }

    try {
      await onSend(input)
      if (enableOptimistic) {
        setOptimisticMessages((prev) =>
          prev.map((m) => (m.id === input.clientId ? { ...m, status: 'sent' } : m))
        )
      }
    } catch {
      if (enableOptimistic) {
        setOptimisticMessages((prev) =>
          prev.map((m) => (m.id === input.clientId ? { ...m, status: 'failed' } : m))
        )
      }
    }
  }

  const handleSend = async (input: SendMessageInput) => {
    const patched = replyTo ? { ...input, replyToId: replyTo.id } : input
    setReplyTo(null)
    await sendInternal(patched)
  }

  const handleReply = (message: ChatMessage) => {
    setReplyTo(message)
    onReply?.(message)
  }

  const handleReact = (message: ChatMessage, reaction: string) => {
    const key = getMessageKey(message)
    const already = !!myReactions[key]?.[reaction]
    const base = localReactions[key] ?? message.reactions ?? {}
    const next = { ...base }

    if (already) {
      const nextCount = (next[reaction] ?? 0) - 1
      if (nextCount > 0) next[reaction] = nextCount
      else delete next[reaction]

      setMyReactions((prev) => {
        const cur = prev[key] ? { ...prev[key] } : {}
        delete cur[reaction]
        const out = { ...prev }
        if (Object.keys(cur).length === 0) delete out[key]
        else out[key] = cur as Record<string, true>
        return out
      })
    } else {
      next[reaction] = (next[reaction] ?? 0) + 1
      setMyReactions((prev) => ({
        ...prev,
        [key]: { ...(prev[key] ?? {}), [reaction]: true },
      }))
    }

    setLocalReactions((prev) => ({ ...prev, [key]: next }))
    onReact?.(message, reaction)
  }

  const requestDelete = (message: ChatMessage) => {
    setConfirmDelete(message)
  }

  const confirmDeleteNow = (message: ChatMessage) => {
    const key = getMessageKey(message)
    setLocalDeleted((prev) => ({ ...prev, [key]: true }))
    setOptimisticMessages((prev) => prev.filter((m) => getMessageKey(m) !== key))
    setConfirmDelete(null)
    setReplyTo((prev) => (prev && getMessageKey(prev) === key ? null : prev))
    onDelete?.(message)
  }

  const handleRecall = (message: ChatMessage) => {
    const key = getMessageKey(message)
    setLocalDeleted((prev) => ({ ...prev, [key]: true }))
    setReplyTo((prev) => (prev && getMessageKey(prev) === key ? null : prev))
    onRecall?.(message)
  }

  const handleRetrySend = async (message: ChatMessage) => {
    if (!onSend) return

    const files = (message.attachments || [])
      .map((a) => a.file)
      .filter((f): f is File => !!f)

    const input: SendMessageInput = {
      conversationId: message.conversationId,
      clientId: message.clientId || message.id,
      text: message.content.type === 'text' ? message.content.text : undefined,
      markdown: message.content.type === 'markdown' ? message.content.markdown : undefined,
      attachments: files.length ? files : undefined,
      replyToId: message.replyToId,
      meta: { source: 'quick_action' },
    }

    setOptimisticMessages((prev) => prev.map((m) => (m.id === message.id ? { ...m, status: 'sending' } : m)))

    try {
      await onSend(input)
      setOptimisticMessages((prev) => prev.map((m) => (m.id === message.id ? { ...m, status: 'sent' } : m)))
    } catch {
      setOptimisticMessages((prev) => prev.map((m) => (m.id === message.id ? { ...m, status: 'failed' } : m)))
    }
  }

  return (
    <div className={twMerge('flex h-full min-h-0 flex-col overflow-hidden bg-surface', className)}>
      <ChatHeader
        agent={agent}
        onCallAgent={() => {
          setHeaderModal('call')
          onCallAgent?.()
        }}
        onOpenConversations={() => {
          setHeaderModal('conversations')
          onOpenConversations?.()
        }}
        onOpenTasks={() => {
          setHeaderModal('tasks')
          onOpenTasks?.()
        }}
        onCreateConversation={() => {
          setHeaderModal('create')
          onCreateConversation?.()
        }}
        onClose={onClose}
      />

      {headerModal === 'call' && (
        <CallInProgressCard
          agent={agent}
          callDurationLabel={callDurationLabel}
          onEndCall={() => setHeaderModal(null)}
        />
      )}

      <MessageList
        messages={combinedMessages}
        agentThinking={agentThinking}
        typingText={typingText}
        agentName={agent.name}
        currentUserId={currentUserId}
        showSenderName={showSenderName}
        showOutgoingAvatar={showOutgoingAvatar}
        incomingMessageStyle={incomingMessageStyle}
        onCopy={onCopy}
        onDelete={requestDelete}
        onRecall={handleRecall}
        onReply={handleReply}
        onReact={handleReact}
        virtualized={virtualized}
        estimateRowHeight={estimateRowHeight}
        overscan={overscan}
        onLoadOlder={onLoadOlder}
        hasMoreOlder={hasMoreOlder}
        isLoadingOlder={isLoadingOlder}
        onRetrySend={handleRetrySend}
      />

      {!!widgets?.length && (
        <div className="border-t border-slate-200 bg-surface px-3 py-3">
          <SchemaRenderer
            nodes={widgets}
            registry={widgetRegistry}
            conversationId={conversationId}
            onAction={onWidgetAction}
            className="gap-2"
          />
        </div>
      )}

      <ChatInput
        conversationId={conversationId}
        onSend={handleSend}
        disabled={!onSend}
        allowAttachments={allowAttachments}
        maxAttachments={maxAttachments}
        placeholder={placeholder}
        mentionContexts={mentionContexts}
        onOpenSettings={onOpenSettings}
        onVoiceToText={onVoiceToText}
        className={widgets?.length ? 'border-t-0 pt-0' : undefined}
        replyTo={
          replyTo
            ? {
                id: replyTo.id,
                senderName: replyTo.senderName,
                previewText: replyPreviewText,
              }
            : undefined
        }
        onCancelReply={() => setReplyTo(null)}
      />

      <Modal open={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Xóa tin nhắn" size="sm">
        <div className="text-sm text-text-secondary">Bạn có chắc chắn muốn xóa tin nhắn này không?</div>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setConfirmDelete(null)}>
            Hủy
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              if (confirmDelete) confirmDeleteNow(confirmDelete)
            }}
          >
            Xóa
          </Button>
        </div>
      </Modal>

      <Modal open={headerModal === 'conversations'} onClose={() => setHeaderModal(null)} title="Cuộc trò chuyện" size="md">
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <List size={16} />
          <span>Danh sách cuộc trò chuyện (demo UI).</span>
        </div>
      </Modal>

      <Modal open={headerModal === 'tasks'} onClose={() => setHeaderModal(null)} title="Nhiệm vụ" size="md">
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <ListTodo size={16} />
          <span>Danh sách nhiệm vụ (demo UI).</span>
        </div>
      </Modal>

      <Modal open={headerModal === 'create'} onClose={() => setHeaderModal(null)} title="Tạo cuộc trò chuyện" size="md">
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <SquarePen size={16} />
          <span>Tạo cuộc trò chuyện mới (demo UI).</span>
        </div>
      </Modal>
    </div>
  )
}

ChatPanel.displayName = 'ChatPanel'
