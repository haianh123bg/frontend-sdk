import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import type { ChatAgentInfo, ChatMessage } from '../Chat/types'
import { ChatKitBoxChat } from './ChatKitBoxChat'
import type { ChatKitActivity, ChatKitState, ChatResponse } from './contracts'
import { mergeComponentRegistry } from './registry'
import { extendedComponentRegistry } from './registries/extended'
import { sdkComponentRegistry } from './registries/sdk'
import type { UIComponent } from './types'
import type { ChatStreamEvent, ChatStreamHandlers, ChatTransport, LoadOlderResult } from './transport'

const meta: Meta<typeof ChatKitBoxChat> = {
  title: 'Organisms/ChatKit/ChatKitBoxChat',
  component: ChatKitBoxChat,
  parameters: { layout: 'fullscreen' },
}

export default meta

type Story = StoryObj<typeof ChatKitBoxChat>

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
      props: { title: 'Tổng quan', subtitle: 'UI schema + state bindings', padding: 'md', className: 'w-full' },
      children: [
        { type: 'text', props: { value: 'Thanh tiến trình bên dưới lấy dữ liệu từ state (/demo/progress).' } },
        {
          type: 'progress',
          props: {
            bindings: {
              value: { path: '/demo/progress', default: 0 },
              max: { path: '/demo/progressMax', default: 100 },
              showLabel: { path: '/demo/showLabel', default: true },
            },
          },
        },
        {
          type: 'row',
          props: { gap: 'sm', className: 'justify-end' },
          children: [
            {
              type: 'button',
              props: { variant: 'secondary', label: 'Reset', action: { type: 'chatkit.reset_demo' } },
            },
            {
              type: 'button',
              props: { variant: 'primary', label: 'Tạo task', action: { type: 'chatkit.create_task', payload: { priority: 'high' } } },
            },
          ],
        },
      ],
    },
  ]

  const initialState: ChatKitState = {
    demo: {
      progress: 10,
      progressMax: 100,
      showLabel: true,
    },
  }

  const initialActivities: ChatKitActivity[] = [
    {
      id: 'act_1',
      activityType: 'PLAN',
      content: {
        title: 'Kế hoạch (demo)',
        steps: [{ id: 's1', text: 'Khởi tạo', status: 'done' }],
      },
      createdAt: nowMinus(2),
      updatedAt: nowMinus(2),
    },
  ]

  const delay = (ms: number) => new Promise<void>((r) => window.setTimeout(r, ms))

  const publish = (event: ChatStreamEvent) => {
    subscribers.forEach((s) => s.onEvent?.(event))
  }

  const simulateStream = async (prompt: string) => {
    const messageId = `stream_${Date.now()}`
    const parts = ['Đang xử lý yêu cầu', prompt ? `: ${prompt.trim()}` : '', '.']

    publish({ type: 'typing', conversationId, isTyping: true, text: 'RedAI đang nhập…' })
    await delay(200)

    for (const chunk of parts) {
      publish({ type: 'message.delta', conversationId, messageId, text: chunk })
      await delay(120)
    }

    const finalMsg: ChatMessage = {
      id: `m_in_${Date.now()}`,
      conversationId,
      senderId: 'agent',
      senderName: 'RedAI',
      direction: 'incoming',
      createdAt: Date.now(),
      content: { type: 'text', text: parts.join('') },
    }

    publish({ type: 'message.final', conversationId, message: finalMsg })
    publish({ type: 'typing', conversationId, isTyping: false })

    publish({ type: 'ui.patch', conversationId, ui: { version: 1, nodes: widgetNodes } })
    publish({ type: 'state.snapshot', conversationId, snapshot: initialState })
    publish({ type: 'activity.snapshot', conversationId, activity: initialActivities[0] })

    for (let i = 0; i <= 5; i++) {
      await delay(300)
      publish({
        type: 'state.delta',
        conversationId,
        delta: [{ op: 'replace', path: '/demo/progress', value: 10 + i * 15 }],
      })
    }

    publish({
      type: 'activity.delta',
      conversationId,
      activityId: 'act_1',
      patch: [{ op: 'add', path: '/steps/-', value: { id: `s_${Date.now()}`, text: 'Cập nhật realtime', status: 'doing' } }],
    })
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
      await delay(350)

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
        ui: { version: 1, nodes: widgetNodes },
        state: initialState,
        activities: initialActivities,
        meta: { traceId: `trace_${Date.now()}` },
      }

      void simulateStream(input.text || input.markdown || '')

      return res
    },

    sendAction: async (event) => {
      await delay(250)

      const sys: ChatMessage = {
        id: `m_sys_${Date.now()}`,
        conversationId: event.conversationId,
        senderId: 'system',
        direction: 'system',
        createdAt: Date.now(),
        content: { type: 'system', text: `Action received: ${event.type}` },
      }

      if (event.type === 'chatkit.reset_demo') {
        publish({ type: 'state.snapshot', conversationId, snapshot: initialState })
      }

      void simulateStream(`action=${event.type}`)

      return {
        conversationId: event.conversationId,
        messages: [sys],
        ui: { version: 1, nodes: widgetNodes },
        state: initialState,
        activities: initialActivities,
        meta: { traceId: `trace_${Date.now()}` },
      }
    },

    loadOlder: async (_params): Promise<LoadOlderResult> => {
      await delay(250)

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

export const SplitMode: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true)

    const transport = React.useMemo(() => createMockTransport(), [])

    const widgetRegistry = React.useMemo(() => mergeComponentRegistry(sdkComponentRegistry, extendedComponentRegistry), [])

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

    return (
      <div className="h-screen w-full bg-slate-50 p-4">
        <div className="mb-3 flex items-center gap-2">
          <button
            type="button"
            className="rounded-lg bg-primary-500 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-600"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? 'Đóng chat' : 'Mở chat'}
          </button>
          <div className="text-sm text-text-muted">ViewPanel (trái) render UI gen + activities từ ChatRuntimeProvider.</div>
        </div>

        <div className="h-[calc(100vh-6rem)] min-h-0">
          <ChatKitBoxChat
            mode="split"
            open={open}
            title="RedAI Assistant"
            chatSide="right"
            chatRatio={0.34}
            minChat={320}
            minView={320}
            agent={agent}
            conversationId={conversationId}
            currentUserId={currentUserId}
            currentUserName="Bạn"
            allowAttachments={false}
            transport={transport}
            initialMessages={initialMessages}
            viewTitle="Generated UI"
            viewWidgetRegistry={widgetRegistry}
          />
        </div>
      </div>
    )
  },
}
