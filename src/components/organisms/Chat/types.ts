export type ChatMessageDirection = 'incoming' | 'outgoing' | 'system'

export type ChatMessageStatus = 'sending' | 'sent' | 'delivered' | 'seen' | 'failed'

export interface ChatAttachment {
  id?: string
  name: string
  mimeType?: string
  size?: number
  url?: string
  thumbnailUrl?: string
  file?: File
}

export type ChatMessageContent =
  | { type: 'text'; text: string }
  | { type: 'markdown'; markdown: string }
  | { type: 'image'; url: string; thumbnailUrl?: string; alt?: string }
  | { type: 'video'; url: string; thumbnailUrl?: string; alt?: string }
  | { type: 'audio'; url: string; fileName?: string; duration?: number }
  | { type: 'sticker'; url: string; thumbnailUrl?: string; alt?: string }
  | { type: 'contact'; name: string; phone?: string; email?: string; avatarUrl?: string }
  | { type: 'location'; lat: number; lng: number; label?: string }
  | { type: 'call'; kind: 'missed' | 'incoming'; isVideo?: boolean; durationSec?: number }
  | { type: 'file'; fileName: string; url?: string; size?: number }
  | { type: 'system'; text: string }

export interface ChatMessage {
  id: string
  clientId?: string
  conversationId: string
  senderId: string
  senderName?: string
  senderAvatarUrl?: string
  direction: ChatMessageDirection
  createdAt: string | number
  status?: ChatMessageStatus
  content: ChatMessageContent
  attachments?: ChatAttachment[]
  replyToId?: string
  reactions?: Record<string, number>
  canDelete?: boolean
  canRecall?: boolean
}

export interface SendMessageInput {
  conversationId: string
  clientId: string
  text?: string
  markdown?: string
  attachments?: File[]
  replyToId?: string
  meta?: {
    source?: 'keyboard' | 'voice' | 'quick_action'
    webSearch?: boolean
    autoApprove?: boolean
    linkedSources?: string[]
    mentions?: string[]
  }
}

export type AgentThinkingState =
  | { mode: 'thinking'; startedAt?: number }
  | { mode: 'streaming'; text: string; startedAt?: number }

export interface ChatAgentInfo {
  name: string
  logoUrl?: string
  status?: 'online' | 'offline'
}

export interface CreateOptimisticMessageParams {
  currentUserId: string
  currentUserName?: string
  currentUserAvatarUrl?: string
  input: SendMessageInput
  createdAt?: number
}

export function createOptimisticOutgoingMessage({
  currentUserId,
  currentUserName,
  currentUserAvatarUrl,
  input,
  createdAt,
}: CreateOptimisticMessageParams): ChatMessage {
  const attachments = (input.attachments || []).map((file) => ({
    name: file.name,
    size: file.size,
    mimeType: file.type,
    file,
  }))

  const content: ChatMessageContent = input.markdown
    ? { type: 'markdown', markdown: input.markdown }
    : { type: 'text', text: input.text || '' }

  return {
    id: input.clientId,
    clientId: input.clientId,
    conversationId: input.conversationId,
    senderId: currentUserId,
    senderName: currentUserName,
    senderAvatarUrl: currentUserAvatarUrl,
    direction: 'outgoing',
    createdAt: createdAt ?? Date.now(),
    status: 'sending',
    content,
    attachments: attachments.length ? attachments : undefined,
    replyToId: input.replyToId,
  }
}
