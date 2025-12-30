import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { ChatPanel } from '../Chat/ChatPanel'
import type { ChatAgentInfo, ChatMessage } from '../Chat/types'
import type { ChatResponse } from './contracts'
import type { UIComponent } from './types'
import type { ChatStreamEvent, ChatStreamHandlers, ChatTransport, LoadOlderResult } from './transport'
import { ChatRuntimeProvider, useChatRuntime } from './runtime'

const meta: Meta = {
  title: 'Organisms/ChatKit/ChatRuntime',
  parameters: { layout: 'fullscreen' },
}

export default meta

type Story = StoryObj

const conversationId = 'conv_001'
const currentUserId = 'user_001'

const agent: ChatAgentInfo = {
  name: 'RedAI Assistant',
  status: 'online',
}

function nowMinus(minutes: number) {
  return Date.now() - minutes * 60 * 1000
}

function createMockTransport(): ChatTransport {
  let seq = 0

  const subscribers = new Set<ChatStreamHandlers>()

  const widgetNodes: UIComponent[] = [
    {
      type: 'card',
      props: { title: 'Gợi ý hành động', subtitle: 'Chọn 1 hành động để tiếp tục', padding: 'md', className: 'w-full' },
      children: [
        { type: 'text', props: { value: 'Bạn muốn mình làm gì tiếp theo?' } },
        {
          type: 'row',
          props: { gap: 'sm', className: 'justify-end' },
          children: [
            {
              type: 'button',
              props: { variant: 'secondary', label: 'Bỏ qua', action: { type: 'chatkit.skip' } },
            },
            {
              type: 'button',
              props: {
                variant: 'primary',
                label: 'Tạo task',
                action: { type: 'chatkit.create_task', payload: { priority: 'high' } },
              },
            },
          ],
        },
      ],
    },
  ]

  const delay = (ms: number) => new Promise<void>((r) => window.setTimeout(r, ms))

  const publish = (event: ChatStreamEvent) => {
    subscribers.forEach((s) => s.onEvent?.(event))
  }

  const simulateStream = async (prompt: string) => {
    const messageId = `stream_${Date.now()}`
    const parts = [
      'Đang xử lý yêu cầu của bạn',
      prompt ? `: ${prompt.trim()}` : '',
      '.\n\n',
      'Đây là nội dung trả lời được stream theo từng đoạn.',
    ]
    const full = parts.join('')

    publish({ type: 'typing', conversationId, isTyping: true, text: 'RedAI đang nhập…' })
    await delay(250)

    for (const chunk of parts) {
      publish({ type: 'message.delta', conversationId, messageId, text: chunk })
      await delay(140)
    }

    const finalMsg: ChatMessage = {
      id: `m_in_${Date.now()}`,
      conversationId,
      senderId: 'agent',
      senderName: 'RedAI',
      direction: 'incoming',
      createdAt: Date.now(),
      content: { type: 'text', text: full },
    }

    publish({ type: 'message.final', conversationId, message: finalMsg })
    publish({ type: 'typing', conversationId, isTyping: false })
    publish({ type: 'ui.patch', conversationId, ui: { version: 1, nodes: widgetNodes } })
  }

  return {
    subscribe: (_cid, handlers) => {
      subscribers.add(handlers)
      return () => {
        subscribers.delete(handlers)
        handlers.onClose?.()
      }
    },
    sendMessage: async (input) => {
      await delay(450)

      seq += 1
      const outgoing: ChatMessage = {
        id: `m_out_${seq}`,
        clientId: input.clientId,
        conversationId: input.conversationId,
        senderId: currentUserId,
        senderName: 'Bạn',
        direction: 'outgoing',
        createdAt: Date.now(),
        status: 'sent',
        content: input.markdown ? { type: 'markdown', markdown: input.markdown } : { type: 'text', text: input.text || '' },
      }

      const res: ChatResponse = {
        conversationId: input.conversationId,
        messages: [outgoing],
        meta: { traceId: `trace_${Date.now()}` },
      }

      void simulateStream(input.text || input.markdown || '')

      return res
    },

    sendAction: async (event) => {
      await delay(300)

      const sys: ChatMessage = {
        id: `m_sys_${Date.now()}`,
        conversationId: event.conversationId,
        senderId: 'system',
        direction: 'system',
        createdAt: Date.now(),
        content: { type: 'system', text: `Action received: ${event.type}` },
      }

      void simulateStream(`action=${event.type}`)

      return { conversationId: event.conversationId, messages: [sys], meta: { traceId: `trace_${Date.now()}` } }
    },

    loadOlder: async (_params): Promise<LoadOlderResult> => {
      await delay(350)

      const older: ChatMessage[] = [
        {
          id: `m_old_${Date.now()}_1`,
          conversationId,
          senderId: 'system',
          direction: 'system',
          createdAt: nowMinus(60),
          content: { type: 'system', text: 'Tin nhắn cũ hơn (demo load older)' },
        },
      ]

      return { messages: older, hasMore: false }
    },
  }
}

const RuntimeChatPanel: React.FC<{ agent: ChatAgentInfo }> = ({ agent }) => {
  const rt = useChatRuntime()

  return (
    <ChatPanel
      agent={agent}
      conversationId={rt.conversationId}
      currentUserId={currentUserId}
      messages={rt.messages}
      widgets={rt.widgets}
      agentThinking={rt.agentThinking}
      typingText={rt.typingText}
      onSend={rt.sendMessage}
      onWidgetAction={(e) => void rt.emitAction(e)}
      onLoadOlder={() => void rt.loadOlder()}
      hasMoreOlder={rt.hasMoreOlder}
      isLoadingOlder={rt.isLoadingOlder}
      showSenderName
      showOutgoingAvatar
      className="h-[720px]"
    />
  )
}

export const Basic: Story = {
  render: () => {
    const transport = React.useMemo(() => createMockTransport(), [])

    const initialMessages = React.useMemo<ChatMessage[]>(
      () => [
        {
          id: 'm_sys_1',
          conversationId,
          senderId: 'system',
          direction: 'system',
          createdAt: nowMinus(30),
          content: { type: 'system', text: 'Bắt đầu cuộc trò chuyện' },
        },
        {
          id: 'm_in_1',
          conversationId,
          senderId: 'agent',
          senderName: 'RedAI',
          direction: 'incoming',
          createdAt: nowMinus(25),
          content: { type: 'text', text: 'Chào bạn, mình có thể giúp gì?' },
        },
      ],
      []
    )

    const initialWidgets = React.useMemo<UIComponent[]>(
      () => [
        {
          type: 'card',
          props: { title: 'Widget demo', subtitle: 'Render từ schema', padding: 'md', className: 'w-full' },
          children: [{ type: 'text', props: { value: 'Bạn có thể bấm nút bên dưới để emit action.' } }],
        },
      ],
      []
    )

    return (
      <div className="h-screen w-full bg-surface p-4">
        <div className="mx-auto h-full max-w-[920px]">
          <ChatRuntimeProvider
            conversationId={conversationId}
            transport={transport}
            currentUserId={currentUserId}
            currentUserName="Bạn"
            initialMessages={initialMessages}
            initialWidgets={initialWidgets}
          >
            <RuntimeChatPanel agent={agent} />
          </ChatRuntimeProvider>
        </div>
      </div>
    )
  },
}
