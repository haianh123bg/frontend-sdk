import type { ChatMessage } from '../Chat/types'
import type { UIComponent } from './types'

export type UISchemaVersion = 1

export type UISchemaDocument = {
  version: UISchemaVersion
  nodes: UIComponent[]
  meta?: Record<string, any>
}

export type ChatKitActionEvent = {
  type: string
  conversationId: string
  payload?: any
  messageId?: string
  nodeId?: string
  traceId?: string
  meta?: Record<string, any>
}

export type ChatKitActionResponse = {
  ok: boolean
  error?: {
    code: string
    message?: string
    details?: any
  }
  patch?: {
    ui?: UISchemaDocument | null
    messages?: ChatMessage[]
  }
}

export type ChatResponse = {
  conversationId: string
  messages: ChatMessage[]
  ui?: UISchemaDocument
  meta?: {
    traceId?: string
  }
}

export type SendMessageRequest = {
  conversationId: string
  clientId: string
  text?: string
  markdown?: string
  replyToId?: string
  attachments?: Array<{
    name: string
    mimeType?: string
    size?: number
    url?: string
  }>
  meta?: Record<string, any>
}
