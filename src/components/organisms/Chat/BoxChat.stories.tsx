import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { BoxChat, type BoxChatProps } from './BoxChat'
import type { ChatAgentInfo, ChatMessage, SendMessageInput } from './types'

const meta: Meta<typeof BoxChat> = {
  title: 'Organisms/Chat/BoxChat',
  component: BoxChat,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    mode: {
      control: 'radio',
      options: ['floating', 'split'],
    },
    position: {
      control: 'select',
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    chatSide: {
      control: 'radio',
      options: ['left', 'right'],
    },
    chatRatio: {
      control: { type: 'range', min: 0.1, max: 0.9, step: 0.01 },
    },
    minChat: {
      control: { type: 'range', min: 200, max: 700, step: 10 },
    },
    minView: {
      control: { type: 'range', min: 200, max: 900, step: 10 },
    },
  },
}

export default meta

type Story = StoryObj<typeof BoxChat>

const agent: ChatAgentInfo = {
  name: 'RedAI Assistant',
  status: 'online',
}

const conversationId = 'conv_001'
const currentUserId = 'user_001'

function nowMinus(minutes: number) {
  return Date.now() - minutes * 60 * 1000
}

const baseMessages: ChatMessage[] = [
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
  {
    id: 'm_out_1',
    conversationId,
    senderId: currentUserId,
    senderName: 'Bạn',
    direction: 'outgoing',
    createdAt: nowMinus(23),
    status: 'seen',
    content: { type: 'text', text: 'Mở BoxChat trong Storybook.' },
    canDelete: true,
  },
]

export const Playground: Story = {
  render: (args: BoxChatProps) => {
    const [open, setOpen] = React.useState(args.open ?? true)
    const [messages, setMessages] = React.useState<ChatMessage[]>(args.messages)

    React.useEffect(() => {
      setMessages(args.messages)
    }, [args.messages])

    React.useEffect(() => {
      if (typeof args.open !== 'undefined') setOpen(args.open)
    }, [args.open])

    const onSend = async (input: SendMessageInput) => {
      await new Promise((r) => setTimeout(r, 350))

      const m: ChatMessage = {
        id: `srv_${input.clientId}`,
        clientId: input.clientId,
        conversationId: input.conversationId,
        senderId: args.currentUserId,
        senderName: args.currentUserName,
        direction: 'outgoing',
        createdAt: Date.now(),
        status: 'sent',
        content: { type: 'text', text: input.text || '' },
        canDelete: true,
      }

      setMessages((prev) => [...prev, m])
    }

    return (
      <div className="min-h-[420px] p-8">
        <button
          type="button"
          className="rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-600"
          onClick={() => setOpen(true)}
        >
          Mở BoxChat
        </button>

        <BoxChat
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          messages={messages}
          onSend={onSend}
        />
      </div>
    )
  },
  args: {
    open: true,
    title: 'RedAI Assistant',
    position: 'bottom-right',
    size: 'md',
    agent,
    conversationId,
    currentUserId,
    currentUserName: 'Bạn',
    messages: baseMessages,
    allowAttachments: false,
    enableOptimistic: true,
  },
}

export const MultiplePositions: Story = {
  render: () => {
    return (
      <div className="min-h-[420px] p-8">
        <BoxChat
          open
          title="Top left"
          position="top-left"
          size="sm"
          agent={agent}
          conversationId={conversationId}
          currentUserId={currentUserId}
          currentUserName="Bạn"
          messages={baseMessages}
          allowAttachments={false}
        />
        <BoxChat
          open
          title="Top right"
          position="top-right"
          size="sm"
          agent={agent}
          conversationId={conversationId}
          currentUserId={currentUserId}
          currentUserName="Bạn"
          messages={baseMessages}
          allowAttachments={false}
        />
        <BoxChat
          open
          title="Bottom left"
          position="bottom-left"
          size="sm"
          agent={agent}
          conversationId={conversationId}
          currentUserId={currentUserId}
          currentUserName="Bạn"
          messages={baseMessages}
          allowAttachments={false}
        />
        <BoxChat
          open
          title="Bottom right"
          position="bottom-right"
          size="sm"
          agent={agent}
          conversationId={conversationId}
          currentUserId={currentUserId}
          currentUserName="Bạn"
          messages={baseMessages}
          allowAttachments={false}
        />
      </div>
    )
  },
}

export const SplitMode: Story = {
  render: (args: BoxChatProps) => {
    const [open, setOpen] = React.useState(args.open ?? true)
    const [messages, setMessages] = React.useState<ChatMessage[]>(args.messages)

    React.useEffect(() => {
      setMessages(args.messages)
    }, [args.messages])

    React.useEffect(() => {
      if (typeof args.open !== 'undefined') setOpen(args.open)
    }, [args.open])

    const onSend = async (input: SendMessageInput) => {
      await new Promise((r) => setTimeout(r, 300))
      const m: ChatMessage = {
        id: `srv_${input.clientId}`,
        clientId: input.clientId,
        conversationId: input.conversationId,
        senderId: args.currentUserId,
        senderName: args.currentUserName,
        direction: 'outgoing',
        createdAt: Date.now(),
        status: 'sent',
        content: { type: 'text', text: input.text || '' },
        canDelete: true,
      }
      setMessages((prev) => [...prev, m])
    }

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
          <div className="text-sm text-text-muted">Kéo thanh giữa để co giãn.</div>
        </div>

        <div className="h-[calc(100vh-6rem)] min-h-0">
          <BoxChat
            {...args}
            open={open}
            messages={messages}
            onSend={onSend}
            view={
              <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm">
                <div className="border-b border-slate-100 px-4 py-2 text-sm font-semibold">ViewPanel</div>
                <div className="flex-1 overflow-auto p-4 text-sm text-text-secondary">
                  Nội dung ứng dụng / dashboard / preview…
                  <div className="mt-4 rounded-xl bg-slate-50 p-4">
                    Bạn có thể render bất kỳ ReactNode nào vào prop <code>view</code>.
                  </div>
                </div>
              </div>
            }
          />
        </div>
      </div>
    )
  },
  args: {
    mode: 'split',
    open: true,
    title: 'RedAI Assistant',
    chatSide: 'right',
    chatRatio: 0.34,
    minChat: 320,
    minView: 320,
    agent,
    conversationId,
    currentUserId,
    currentUserName: 'Bạn',
    messages: baseMessages,
    allowAttachments: false,
    enableOptimistic: true,
  },
}
