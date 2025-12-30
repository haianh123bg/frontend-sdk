import type { ChatMessage, SendMessageInput } from '../Chat/types'
import type { ChatKitActionEvent, ChatResponse, StreamingEvent } from './contracts'

export type Unsubscribe = () => void

export type ChatStreamEvent = StreamingEvent

export type ChatStreamHandlers = {
  onEvent?: (event: ChatStreamEvent) => void
  onError?: (error: unknown) => void
  onClose?: () => void
}

export type LoadOlderResult = {
  messages: ChatMessage[]
  hasMore?: boolean
}

export interface ChatTransport {
  sendAction: (event: ChatKitActionEvent) => Promise<ChatResponse>
  sendMessage: (input: SendMessageInput) => Promise<ChatResponse>
  loadOlder?: (params: { conversationId: string; beforeId?: string; limit?: number }) => Promise<LoadOlderResult>
  subscribe?: (conversationId: string, handlers: ChatStreamHandlers) => Unsubscribe
}
