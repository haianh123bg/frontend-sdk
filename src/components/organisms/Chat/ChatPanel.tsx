import * as React from 'react'
import { twMerge } from 'tailwind-merge'
import { ChatHeader, type ChatHeaderProps } from './ChatHeader'
import { ChatInput, type ChatInputProps } from './ChatInput'
import { MessageList, type MessageListProps } from './MessageList'
import { createOptimisticOutgoingMessage, type AgentThinkingState, type ChatAgentInfo, type ChatMessage, type SendMessageInput } from './types'

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

  React.useEffect(() => {
    setOptimisticMessages([])
  }, [conversationId])

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
    const all = [...messages, ...optimisticMessages]
    all.sort((a, b) => toMs(a.createdAt) - toMs(b.createdAt))
    return all
  }, [messages, optimisticMessages])

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
        onCallAgent={onCallAgent}
        onOpenConversations={onOpenConversations}
        onOpenTasks={onOpenTasks}
        onCreateConversation={onCreateConversation}
        onClose={onClose}
      />

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
        onDelete={onDelete}
        onRecall={onRecall}
        onReply={onReply}
        onReact={onReact}
        virtualized={virtualized}
        estimateRowHeight={estimateRowHeight}
        overscan={overscan}
        onLoadOlder={onLoadOlder}
        hasMoreOlder={hasMoreOlder}
        isLoadingOlder={isLoadingOlder}
        onRetrySend={handleRetrySend}
      />

      <ChatInput
        conversationId={conversationId}
        onSend={sendInternal}
        disabled={!onSend}
        allowAttachments={allowAttachments}
        maxAttachments={maxAttachments}
        placeholder={placeholder}
        mentionContexts={mentionContexts}
        onOpenSettings={onOpenSettings}
        onVoiceToText={onVoiceToText}
      />
    </div>
  )
}

ChatPanel.displayName = 'ChatPanel'
