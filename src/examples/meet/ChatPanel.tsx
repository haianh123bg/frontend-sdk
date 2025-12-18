import * as React from 'react'
import { Send } from 'lucide-react'
import { Avatar } from '../../components/atoms/Avatar/Avatar'
import { Button } from '../../components/atoms/Button/Button'
import { Icon } from '../../components/atoms/Icon/Icon'
import { Input } from '../../components/atoms/Input/Input'
import { Caption, Text } from '../../components/atoms/TypographyPrimitives'

export interface ChatMessage {
  id: string
  sender: string
  avatarUrl?: string
  message: string
  time: string
}

export interface ChatPanelProps {
  messages: ChatMessage[]
}

export const ChatPanel = ({ messages }: ChatPanelProps) => {
  const [value, setValue] = React.useState('')

  return (
    <div className="flex h-full flex-col gap-3">
      <div>
        <Text className="font-semibold">Meeting chat</Text>
        <Caption className="text-text-secondary">Messages are visible to everyone</Caption>
      </div>

      <div className="flex-1 space-y-3 overflow-auto rounded-xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3">
        {messages.map((m) => (
          <div key={m.id} className="flex gap-3">
            <Avatar src={m.avatarUrl} alt={m.sender} initials={m.sender} size="sm" />
            <div className="min-w-0">
              <div className="flex items-baseline gap-2">
                <Text className="text-sm font-semibold">{m.sender}</Text>
                <Caption className="text-text-secondary">{m.time}</Caption>
              </div>
              <Text className="text-sm text-text-secondary break-words">{m.message}</Text>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type a message…"
          className="flex-1"
        />
        <Button variant="primary" className="gap-2" onClick={() => setValue('')}>
          <Icon icon={Send} size="sm" />
          Send
        </Button>
      </div>
    </div>
  )
}
