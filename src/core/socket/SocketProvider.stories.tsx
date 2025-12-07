import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { SocketProvider } from './SocketProvider'
import { useSocketEvent } from './useSocketEvent'
import { useSocketEmit } from './useSocketEmit'
import type { GenericSocket, SocketMap } from './types'
import { Button } from '../../components/atoms/Button/Button'
import { Input } from '../../components/atoms/Input/Input'

class MockSocket implements GenericSocket {
  private listeners: Record<string, Set<(data: any) => void>> = {}

  on(event: string, handler: (data: any) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = new Set()
    }
    this.listeners[event].add(handler)
  }

  off(event: string, handler: (data: any) => void) {
    const handlers = this.listeners[event]
    if (!handlers) return
    handlers.delete(handler)
    if (handlers.size === 0) {
      delete this.listeners[event]
    }
  }

  emit(event: string, payload: any) {
    const handlers = this.listeners[event]
    if (!handlers) return
    handlers.forEach((handler) => handler(payload))
  }
}

const CHANNEL = 'MAIN'

const createMockSockets = (): SocketMap => ({
  [CHANNEL]: new MockSocket(),
})

const SocketDemoInner: React.FC = () => {
  const [messages, setMessages] = React.useState<string[]>([])
  const [input, setInput] = React.useState('Hello from Storybook')
  const emit = useSocketEmit()

  useSocketEvent<string>(CHANNEL, 'message', (data) => {
    setMessages((prev) => [...prev, data])
  })

  return (
    <div className="flex flex-col gap-4 max-w-md">
      <div className="flex gap-2 items-center">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
        />
        <Button
          onClick={() => {
            if (!input) return
            emit(CHANNEL, 'message', input)
          }}
        >
          Send
        </Button>
      </div>
      <div className="rounded-lg border border-border-subtle p-3 text-sm">
        <div className="font-medium mb-2">Received messages</div>
        {messages.length === 0 ? (
          <div className="text-text-muted">No messages yet. Send one to see it here.</div>
        ) : (
          <ul className="list-disc pl-5 space-y-1">
            {messages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

const SocketDemo: React.FC = () => {
  const sockets = React.useMemo(createMockSockets, [])

  return (
    <SocketProvider sockets={sockets}>
      <SocketDemoInner />
    </SocketProvider>
  )
}

const meta = {
  title: 'Core/Socket/SocketProvider',
  component: SocketDemo,
  tags: ['autodocs'],
} satisfies Meta<typeof SocketDemo>

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => <SocketDemo />,
}
