import * as React from 'react'
import { createOptimisticOutgoingMessage, type AgentThinkingState, type ChatMessage, type SendMessageInput } from '../Chat/types'
import type { ChatKitActionEvent } from './contracts'
import type { UIComponent } from './types'
import type { ChatStreamEvent, ChatTransport, LoadOlderResult, Unsubscribe } from './transport'

export type ChatRuntimeStatus = 'idle' | 'sending' | 'error'

export type ChatRuntimeState = {
  conversationId: string
  messages: ChatMessage[]
  widgets: UIComponent[]
  status: ChatRuntimeStatus
  agentThinking?: AgentThinkingState | null
  typingText?: string
  error?: unknown
  traceId?: string
  hasMoreOlder?: boolean
  isLoadingOlder?: boolean
}

export type ChatRuntimeActions = {
  sendMessage: (input: SendMessageInput) => Promise<void>
  emitAction: (event: ChatKitActionEvent) => Promise<void>
  loadOlder: (params?: { beforeId?: string; limit?: number }) => Promise<void>
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>
  setWidgets: React.Dispatch<React.SetStateAction<UIComponent[]>>
}

export type ChatRuntimeApi = ChatRuntimeState & ChatRuntimeActions

function toMs(v: string | number) {
  const n = typeof v === 'number' ? v : Date.parse(v)
  return Number.isFinite(n) ? n : 0
}

function getMessageKey(m: ChatMessage) {
  return m.clientId || m.id
}

function mergeMessages(prev: ChatMessage[], incoming: ChatMessage[]): ChatMessage[] {
  if (!incoming.length) return prev

  const map = new Map<string, ChatMessage>()
  for (const m of prev) map.set(getMessageKey(m), m)

  for (const m of incoming) {
    const key = getMessageKey(m)
    const old = map.get(key)
    map.set(key, old ? { ...old, ...m } : m)
  }

  const all = Array.from(map.values())
  all.sort((a, b) => toMs(a.createdAt) - toMs(b.createdAt))
  return all
}

const ChatRuntimeContext = React.createContext<ChatRuntimeApi | null>(null)

export interface ChatRuntimeProviderProps {
  conversationId: string
  transport: ChatTransport
  currentUserId: string
  currentUserName?: string
  currentUserAvatarUrl?: string
  initialMessages?: ChatMessage[]
  initialWidgets?: UIComponent[]
  enableOptimistic?: boolean
  children: React.ReactNode
}

export const ChatRuntimeProvider: React.FC<ChatRuntimeProviderProps> = ({
  conversationId,
  transport,
  currentUserId,
  currentUserName,
  currentUserAvatarUrl,
  initialMessages,
  initialWidgets,
  enableOptimistic = true,
  children,
}) => {
  const [messages, setMessages] = React.useState<ChatMessage[]>(initialMessages ?? [])
  const [widgets, setWidgets] = React.useState<UIComponent[]>(initialWidgets ?? [])
  const [status, setStatus] = React.useState<ChatRuntimeStatus>('idle')
  const [agentThinking, setAgentThinking] = React.useState<AgentThinkingState | null>(null)
  const [typingText, setTypingText] = React.useState<string | undefined>(undefined)
  const [error, setError] = React.useState<unknown>(undefined)
  const [traceId, setTraceId] = React.useState<string | undefined>(undefined)
  const [hasMoreOlder, setHasMoreOlder] = React.useState<boolean | undefined>(undefined)
  const [isLoadingOlder, setIsLoadingOlder] = React.useState<boolean | undefined>(undefined)

  const streamRef = React.useRef<{ messageId?: string; text: string } | null>(null)

  React.useEffect(() => {
    setMessages(initialMessages ?? [])
    setWidgets(initialWidgets ?? [])
    setStatus('idle')
    setAgentThinking(null)
    setTypingText(undefined)
    setError(undefined)
    setTraceId(undefined)
    setHasMoreOlder(undefined)
    setIsLoadingOlder(undefined)
    streamRef.current = null
  }, [conversationId, initialMessages, initialWidgets])

  React.useEffect(() => {
    if (!transport.subscribe) return

    let unsub: Unsubscribe | undefined

    const onEvent = (event: ChatStreamEvent) => {
      if (event.conversationId !== conversationId) return

      if (event.type === 'typing') {
        setTypingText(event.isTyping ? event.text ?? 'Đang nhập…' : undefined)
        return
      }

      if (event.type === 'message.delta') {
        setTypingText(undefined)
        const cur = streamRef.current
        if (!cur || cur.messageId !== event.messageId) {
          streamRef.current = { messageId: event.messageId, text: '' }
        }

        const next = streamRef.current
        if (!next) return

        next.text += event.text
        setAgentThinking({ mode: 'streaming', text: next.text })
        return
      }

      if (event.type === 'message.final') {
        streamRef.current = null
        setTypingText(undefined)
        setAgentThinking(null)
        setMessages((prev) => mergeMessages(prev, [event.message]))
        return
      }

      if (event.type === 'ui.patch') {
        setWidgets(event.ui?.nodes ?? [])
        return
      }
    }

    try {
      unsub = transport.subscribe(conversationId, {
        onEvent,
        onError: (e) => {
          setError(e)
          setStatus('error')
        },
        onClose: () => {
          streamRef.current = null
          setTypingText(undefined)
          setAgentThinking(null)
        },
      })
    } catch (e) {
      setError(e)
      setStatus('error')
    }

    return () => {
      try {
        unsub?.()
      } catch {
      }
    }
  }, [conversationId, transport])

  const sendMessage = React.useCallback(
    async (input: SendMessageInput) => {
      setError(undefined)
      setStatus('sending')
      setAgentThinking({ mode: 'thinking' })

      if (enableOptimistic) {
        const optimistic = createOptimisticOutgoingMessage({
          currentUserId,
          currentUserName,
          currentUserAvatarUrl,
          input,
        })
        setMessages((prev) => mergeMessages(prev, [optimistic]))
      }

      try {
        const res = await transport.sendMessage(input)
        setMessages((prev) => mergeMessages(prev, res.messages ?? []))
        setWidgets((prev) => res.ui?.nodes ?? prev)
        setTraceId((prev) => res.meta?.traceId ?? prev)
        setStatus('idle')
        const hasIncoming = (res.messages ?? []).some((m) => m.direction !== 'outgoing')
        if (!transport.subscribe || hasIncoming) setAgentThinking(null)
      } catch (e) {
        setError(e)
        if (enableOptimistic) {
          setMessages((prev) =>
            prev.map((m) => (getMessageKey(m) === input.clientId ? { ...m, status: 'failed' } : m))
          )
        }
        setStatus('error')
        setAgentThinking(null)
        throw e
      }
    },
    [currentUserAvatarUrl, currentUserId, currentUserName, enableOptimistic, transport]
  )

  const emitAction = React.useCallback(
    async (event: ChatKitActionEvent) => {
      setError(undefined)
      setStatus('sending')
      setAgentThinking({ mode: 'thinking' })

      try {
        const res = await transport.sendAction(event)
        setMessages((prev) => mergeMessages(prev, res.messages ?? []))
        setWidgets((prev) => res.ui?.nodes ?? prev)
        setTraceId((prev) => res.meta?.traceId ?? prev)
        setStatus('idle')
        const hasIncoming = (res.messages ?? []).some((m) => m.direction !== 'outgoing')
        if (!transport.subscribe || hasIncoming) setAgentThinking(null)
      } catch (e) {
        setError(e)
        setStatus('error')
        setAgentThinking(null)
        throw e
      }
    },
    [transport]
  )

  const loadOlder = React.useCallback(
    async (params?: { beforeId?: string; limit?: number }) => {
      if (!transport.loadOlder) return
      if (isLoadingOlder) return

      setIsLoadingOlder(true)
      setError(undefined)

      try {
        const first = messages[0]
        const beforeId = params?.beforeId ?? (first ? getMessageKey(first) : undefined)
        const result: LoadOlderResult = await transport.loadOlder({
          conversationId,
          beforeId,
          limit: params?.limit,
        })

        setMessages((prev) => {
          const prepend = result.messages ?? []
          if (!prepend.length) return prev
          return mergeMessages(prepend, prev)
        })

        if (typeof result.hasMore === 'boolean') setHasMoreOlder(result.hasMore)
      } catch (e) {
        setError(e)
        setStatus('error')
        throw e
      } finally {
        setIsLoadingOlder(false)
      }
    },
    [conversationId, isLoadingOlder, messages, transport]
  )

  const value: ChatRuntimeApi = React.useMemo(
    () => ({
      conversationId,
      messages,
      widgets,
      status,
      agentThinking,
      typingText,
      error,
      traceId,
      hasMoreOlder,
      isLoadingOlder,
      sendMessage,
      emitAction,
      loadOlder,
      setMessages,
      setWidgets,
    }),
    [
      agentThinking,
      conversationId,
      emitAction,
      error,
      hasMoreOlder,
      isLoadingOlder,
      loadOlder,
      messages,
      sendMessage,
      status,
      traceId,
      typingText,
      widgets,
    ]
  )

  return <ChatRuntimeContext.Provider value={value}>{children}</ChatRuntimeContext.Provider>
}

export function useChatRuntime(): ChatRuntimeApi {
  const ctx = React.useContext(ChatRuntimeContext)
  if (!ctx) {
    throw new Error('useChatRuntime must be used within ChatRuntimeProvider')
  }
  return ctx
}
