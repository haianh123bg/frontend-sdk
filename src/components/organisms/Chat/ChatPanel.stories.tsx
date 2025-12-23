import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { ChatPanel, type ChatPanelProps } from './ChatPanel'
import type { ChatAgentInfo, ChatMessage, SendMessageInput } from './types'

const meta: Meta<typeof ChatPanel> = {
  title: 'Organisms/Chat/ChatPanel',
  component: ChatPanel,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    incomingMessageStyle: {
      control: 'select',
      options: ['default', 'flat'],
    },
  },
}

export default meta

type Story = StoryObj<typeof ChatPanel>

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
    content: { type: 'text', text: 'Tóm tắt giúp mình các bước triển khai Storybook nhé.' },
    canDelete: true,
  },
  {
    id: 'm_in_2',
    conversationId,
    senderId: 'agent',
    senderName: 'RedAI',
    direction: 'incoming',
    createdAt: nowMinus(20),
    content: { type: 'markdown', markdown: '1. Tạo `*.stories.tsx`\n2. Import component\n3. Tạo mock props & render\n4. Chạy `npm run storybook`' },
    canDelete: true,
  },
  {
    id: 'm_out_2',
    conversationId,
    senderId: currentUserId,
    senderName: 'Bạn',
    direction: 'outgoing',
    createdAt: nowMinus(18),
    status: 'failed',
    content: { type: 'text', text: 'Tin nhắn này mô phỏng trạng thái failed.' },
    canDelete: true,
  },
]

export const Basic: Story = {
  render: (args: ChatPanelProps) => {
    const [messages, setMessages] = React.useState<ChatMessage[]>(args.messages)

    const onSend = async (input: SendMessageInput) => {
      await new Promise((r) => setTimeout(r, 450))

      if (input.text?.toLowerCase().includes('fail')) {
        throw new Error('Simulated send error')
      }

      const m: ChatMessage = {
        id: `srv_${input.clientId}`,
        clientId: input.clientId,
        conversationId: input.conversationId,
        senderId: args.currentUserId,
        senderName: args.currentUserName,
        senderAvatarUrl: args.currentUserAvatarUrl,
        direction: 'outgoing',
        createdAt: Date.now(),
        status: 'sent',
        content: { type: 'text', text: input.text || '' },
        canDelete: true,
      }

      setMessages((prev) => [...prev, m])
    }

    return (
      <div className="h-[640px] w-full">
        <ChatPanel {...args} messages={messages} onSend={onSend} />
      </div>
    )
  },
  args: {
    agent,
    conversationId,
    currentUserId,
    currentUserName: 'Bạn',
    messages: baseMessages,
    virtualized: true,
    allowAttachments: false,
    enableOptimistic: true,
    incomingMessageStyle: 'default',
  },
}

export const WithThinking: Story = {
  render: (args: ChatPanelProps) => {
    const [messages, setMessages] = React.useState<ChatMessage[]>(args.messages)

    const onSend = async (input: SendMessageInput) => {
      await new Promise((r) => setTimeout(r, 450))
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
      <div className="h-[640px] w-full">
        <ChatPanel {...args} messages={messages} onSend={onSend} />
      </div>
    )
  },
  args: {
    agent,
    conversationId,
    currentUserId,
    currentUserName: 'Bạn',
    messages: baseMessages,
    agentThinking: { mode: 'streaming', text: 'Đang phân tích yêu cầu…' },
    typingText: 'Agent đang nhập…',
    virtualized: true,
    allowAttachments: false,
    incomingMessageStyle: 'default',
  },
}

export const NonVirtualized: Story = {
  render: (args: ChatPanelProps) => {
    const [messages, setMessages] = React.useState<ChatMessage[]>(args.messages)

    const onSend = async (input: SendMessageInput) => {
      await new Promise((r) => setTimeout(r, 250))
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
      <div className="h-[640px] w-full">
        <ChatPanel {...args} messages={messages} onSend={onSend} virtualized={false} />
      </div>
    )
  },
  args: {
    agent,
    conversationId,
    currentUserId,
    currentUserName: 'Bạn',
    messages: baseMessages,
    allowAttachments: false,
  },
}
