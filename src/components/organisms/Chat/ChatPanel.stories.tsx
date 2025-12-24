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
  {
    id: 'm_in_long_1',
    conversationId,
    senderId: 'agent',
    senderName: 'RedAI',
    direction: 'incoming',
    createdAt: nowMinus(16),
    content: {
      type: 'text',
      text: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    },
  },
  {
    id: 'm_out_long_1',
    conversationId,
    senderId: currentUserId,
    senderName: 'Bạn',
    direction: 'outgoing',
    createdAt: nowMinus(15),
    status: 'seen',
    content: {
      type: 'text',
      text: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
    },
    canDelete: true,
  },
  {
    id: 'm_in_img_1',
    conversationId,
    senderId: 'agent',
    senderName: 'RedAI',
    direction: 'incoming',
    createdAt: nowMinus(14),
    content: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=60',
      thumbnailUrl:
        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=60',
      alt: 'Demo image',
    },
  },
  {
    id: 'm_out_file_1',
    conversationId,
    senderId: currentUserId,
    senderName: 'Bạn',
    direction: 'outgoing',
    createdAt: nowMinus(13),
    status: 'sent',
    content: {
      type: 'file',
      fileName: 'report.pdf',
      url: 'https://example.com/report.pdf',
      size: 1024 * 1024,
    },
    canDelete: true,
  },
  {
    id: 'm_in_file_1',
    conversationId,
    senderId: 'agent',
    senderName: 'RedAI',
    direction: 'incoming',
    createdAt: nowMinus(12.9),
    content: {
      type: 'file',
      fileName: 'product-spec-v2.docx',
      url: 'https://example.com/product-spec-v2.docx',
      size: 1024 * 420,
    },
  },
  {
    id: 'm_in_file_2',
    conversationId,
    senderId: 'agent',
    senderName: 'RedAI',
    direction: 'incoming',
    createdAt: nowMinus(12.8),
    content: {
      type: 'file',
      fileName: 'build-log-2025-12-24.txt',
      size: 38_000,
    },
  },
  {
    id: 'm_out_file_3',
    conversationId,
    senderId: currentUserId,
    senderName: 'Bạn',
    direction: 'outgoing',
    createdAt: nowMinus(12.7),
    status: 'sent',
    content: {
      type: 'file',
      fileName: 'invoice_2025_12_24.xlsx',
      size: 1024 * 90,
    },
    canDelete: true,
  },
  {
    id: 'm_out_file_2',
    conversationId,
    senderId: currentUserId,
    senderName: 'Bạn',
    direction: 'outgoing',
    createdAt: nowMinus(12.6),
    status: 'sent',
    content: {
      type: 'file',
      fileName: 'super-long-file-name___this_is_a_very_very_very_long_filename_that_should_wrap_or_truncate_properly.zip',
      url: 'https://example.com/super-long-file.zip',
      size: 1024 * 1024 * 24,
    },
    canDelete: true,
  },
  {
    id: 'm_in_call_missed_1',
    conversationId,
    senderId: 'agent',
    senderName: 'RedAI',
    direction: 'incoming',
    createdAt: nowMinus(12.3),
    content: {
      type: 'call',
      kind: 'missed',
      isVideo: false,
    },
  },
  {
    id: 'm_out_call_incoming_1',
    conversationId,
    senderId: currentUserId,
    senderName: 'Bạn',
    direction: 'outgoing',
    createdAt: nowMinus(12.2),
    status: 'sent',
    content: {
      type: 'call',
      kind: 'incoming',
      isVideo: true,
      durationSec: 95,
    },
    canDelete: true,
  },
  {
    id: 'm_in_reply_src',
    conversationId,
    senderId: 'agent',
    senderName: 'RedAI',
    direction: 'incoming',
    createdAt: nowMinus(12),
    content: { type: 'text', text: 'Tin nhắn gốc để test reply.' },
  },
  {
    id: 'm_out_reply_1',
    conversationId,
    senderId: currentUserId,
    senderName: 'Bạn',
    direction: 'outgoing',
    createdAt: nowMinus(11),
    status: 'sent',
    replyToId: 'm_in_reply_src',
    content: { type: 'text', text: 'Đây là tin nhắn reply (bạn thử bấm Reply trên message để tạo mới).' },
    canDelete: true,
  },
  {
    id: 'm_in_react_1',
    conversationId,
    senderId: 'agent',
    senderName: 'RedAI',
    direction: 'incoming',
    createdAt: nowMinus(10),
    reactions: { '👍': 3, '❤️': 1 },
    content: { type: 'text', text: 'Tin nhắn có reactions (bấm vào badge để toggle).' },
  },
  {
    id: 'm_in_video_1',
    conversationId,
    senderId: 'agent',
    senderName: 'RedAI',
    direction: 'incoming',
    createdAt: nowMinus(9),
    content: {
      type: 'video',
      url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=60',
      alt: 'Demo video',
    },
  },
  {
    id: 'm_out_audio_1',
    conversationId,
    senderId: currentUserId,
    senderName: 'Bạn',
    direction: 'outgoing',
    createdAt: nowMinus(8),
    status: 'sent',
    content: {
      type: 'audio',
      url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3',
      fileName: 'voice-note.mp3',
    },
    canDelete: true,
  },
  {
    id: 'm_in_contact_1',
    conversationId,
    senderId: 'agent',
    senderName: 'RedAI',
    direction: 'incoming',
    createdAt: nowMinus(7),
    content: {
      type: 'contact',
      name: 'Nguyễn Văn A',
      phone: '+84 912 345 678',
      email: 'a@example.com',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=60',
    },
  },
  {
    id: 'm_out_location_1',
    conversationId,
    senderId: currentUserId,
    senderName: 'Bạn',
    direction: 'outgoing',
    createdAt: nowMinus(6),
    status: 'sent',
    content: {
      type: 'location',
      lat: 21.027763,
      lng: 105.83416,
      label: 'Hà Nội',
    },
    canDelete: true,
  },
  {
    id: 'm_in_sticker_1',
    conversationId,
    senderId: 'agent',
    senderName: 'RedAI',
    direction: 'incoming',
    createdAt: nowMinus(5),
    content: {
      type: 'sticker',
      url: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f60a.svg',
      thumbnailUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f60a.svg',
      alt: 'Sticker',
    },
  },
  {
    id: 'm_in_file_png_1',
    conversationId,
    senderId: 'agent',
    senderName: 'RedAI',
    direction: 'incoming',
    createdAt: nowMinus(4.9),
    content: {
      type: 'file',
      fileName: 'Ảnh màn hình 2024-10-06 lúc 15.06.35.png',
      url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=60',
      size: 499_550,
    },
  },
  {
    id: 'm_out_file_pdf_2',
    conversationId,
    senderId: currentUserId,
    senderName: 'Bạn',
    direction: 'outgoing',
    createdAt: nowMinus(4.7),
    status: 'sent',
    content: {
      type: 'file',
      fileName: 'NguyenNgocHaiAnh_JavaDeveloper.pdf',
      url: 'https://example.com/NguyenNgocHaiAnh_JavaDeveloper.pdf',
      size: 136_080,
    },
    canDelete: true,
  },
  {
    id: 'm_in_file_pptx_1',
    conversationId,
    senderId: 'agent',
    senderName: 'RedAI',
    direction: 'incoming',
    createdAt: nowMinus(4.5),
    content: {
      type: 'file',
      fileName: 'CAU-TRUC-DU-LIEU-NANG-CAO-TONG-QUAN-ODB.pptx',
      url: 'https://example.com/CAU-TRUC-DU-LIEU-NANG-CAO-TONG-QUAN-ODB.pptx',
      size: 7.12 * 1024 * 1024,
    },
  },
  {
    id: 'm_out_file_xlsx_2',
    conversationId,
    senderId: currentUserId,
    senderName: 'Bạn',
    direction: 'outgoing',
    createdAt: nowMinus(4.3),
    status: 'sent',
    content: {
      type: 'file',
      fileName: 'bao_cao_thang_12_2025.xlsx',
      url: 'https://example.com/bao_cao_thang_12_2025.xlsx',
      size: 1024 * 200,
    },
    canDelete: true,
  },
  {
    id: 'm_in_file_docx_2',
    conversationId,
    senderId: 'agent',
    senderName: 'RedAI',
    direction: 'incoming',
    createdAt: nowMinus(4.1),
    content: {
      type: 'file',
      fileName: 'KeHoachTrienKhai.docx',
      url: 'https://example.com/KeHoachTrienKhai.docx',
      size: 1024 * 320,
    },
  },
]

const fileMessagesOnly: ChatMessage[] = [
  {
    id: 'm_file_sys_1',
    conversationId,
    senderId: 'system',
    direction: 'system',
    createdAt: nowMinus(30),
    content: { type: 'system', text: 'Demo file messages' },
  },
  {
    id: 'm_file_in_png_1',
    conversationId,
    senderId: 'agent',
    senderName: 'RedAI',
    direction: 'incoming',
    createdAt: nowMinus(6),
    content: {
      type: 'file',
      fileName: 'screenshot.png',
      url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=60',
      size: 499_550,
    },
  },
  {
    id: 'm_file_out_pdf_1',
    conversationId,
    senderId: currentUserId,
    senderName: 'Bạn',
    direction: 'outgoing',
    createdAt: nowMinus(5.7),
    status: 'sent',
    content: {
      type: 'file',
      fileName: 'profile.pdf',
      url: 'https://example.com/profile.pdf',
      size: 136_080,
    },
    canDelete: true,
  },
  {
    id: 'm_file_in_pptx_1',
    conversationId,
    senderId: 'agent',
    senderName: 'RedAI',
    direction: 'incoming',
    createdAt: nowMinus(5.4),
    content: {
      type: 'file',
      fileName: 'deck.pptx',
      url: 'https://example.com/deck.pptx',
      size: 7.12 * 1024 * 1024,
    },
  },
  {
    id: 'm_file_out_xlsx_1',
    conversationId,
    senderId: currentUserId,
    senderName: 'Bạn',
    direction: 'outgoing',
    createdAt: nowMinus(5.1),
    status: 'sent',
    content: {
      type: 'file',
      fileName: 'report.xlsx',
      url: 'https://example.com/report.xlsx',
      size: 1024 * 200,
    },
    canDelete: true,
  },
  {
    id: 'm_file_in_docx_1',
    conversationId,
    senderId: 'agent',
    senderName: 'RedAI',
    direction: 'incoming',
    createdAt: nowMinus(4.8),
    content: {
      type: 'file',
      fileName: 'spec.docx',
      url: 'https://example.com/spec.docx',
      size: 1024 * 420,
    },
  },
  {
    id: 'm_file_out_local_1',
    conversationId,
    senderId: currentUserId,
    senderName: 'Bạn',
    direction: 'outgoing',
    createdAt: nowMinus(4.5),
    status: 'sent',
    content: {
      type: 'file',
      fileName: 'build-log.txt',
      size: 38_000,
    },
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

export const FileMessages: Story = {
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
        <ChatPanel {...args} messages={messages} onSend={onSend} />
      </div>
    )
  },
  args: {
    agent,
    conversationId,
    currentUserId,
    currentUserName: 'Bạn',
    messages: fileMessagesOnly,
    virtualized: true,
    allowAttachments: false,
    enableOptimistic: true,
    incomingMessageStyle: 'default',
  },
}
