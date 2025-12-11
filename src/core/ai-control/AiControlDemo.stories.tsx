import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import type { AiControlMessage } from './types'
import { AiControlProvider } from './AiControlProvider'
import { useAiControl } from './hooks'
import { SocketProvider } from '../socket/SocketProvider'
import type { GenericSocket, SocketMap } from '../socket/types'
import { useDispatchAction, useSubscribeAction } from '../../bus/hooks'
import { Button } from '../../components/atoms/Button/Button'

const createInMemorySocket = (onEmit: (event: string, payload: any) => void): GenericSocket => {
  const handlers = new Map<string, Set<(data: any) => void>>()

  const ensureSet = (event: string) => {
    let set = handlers.get(event)
    if (!set) {
      set = new Set()
      handlers.set(event, set)
    }
    return set
  }

  return {
    on(event, handler) {
      const set = ensureSet(event)
      set.add(handler)
    },
    off(event, handler) {
      const set = handlers.get(event)
      if (set) {
        set.delete(handler)
      }
    },
    emit(event, payload) {
      onEmit(event, payload)
      const set = handlers.get(event)
      if (set) {
        set.forEach((handler) => handler(payload))
      }
    },
  }
}

const AiBridgeDemoInner: React.FC = () => {
  const dispatch = useDispatchAction()
  const { sendCommand } = useAiControl()
  const [aiCounter, setAiCounter] = React.useState(0)

  useSubscribeAction('AI.DEMO.INCREMENT', (event) => {
    const amount = typeof event.payload?.amount === 'number' ? event.payload.amount : 1
    setAiCounter((prev) => prev + amount)
  })

  const handleUserClick = () => {
    dispatch('UI.CLICK', { source: 'AiBridgeDemo' }, {
      meta: { component: 'AiBridgeDemoButton' },
    })
  }

  const handleSendCommand = () => {
    const message: AiControlMessage = {
      id: String(Date.now()),
      direction: 'AI→UI',
      type: 'AI.DEMO.INCREMENT',
      payload: { amount: 1 },
      meta: {},
    }
    sendCommand(message)
  }

  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Button onClick={handleUserClick}>Dispatch UI.CLICK</Button>
        <Button variant="secondary" onClick={handleSendCommand}>
          Send AI.DEMO.INCREMENT
        </Button>
        <div>AI counter: {aiCounter}</div>
      </div>
    </div>
  )
}

const AiBridgeDemoShell: React.FC = () => {
  const [uiEvents, setUiEvents] = React.useState<AiControlMessage[]>([])
  const [aiCommands, setAiCommands] = React.useState<AiControlMessage[]>([])

  const sockets: SocketMap = React.useMemo(() => {
    const uiSocket = createInMemorySocket((_event, payload) => {
      setUiEvents((prev) => [...prev, payload])
    })
    const aiSocket = createInMemorySocket((_event, payload) => {
      setAiCommands((prev) => [...prev, payload])
    })
    return {
      'ai-events': uiSocket,
      'ai-control': aiSocket,
    }
  }, [])

  return (
    <SocketProvider sockets={sockets}>
      <AiControlProvider>
        <div style={{ display: 'flex', gap: 24 }}>
          <AiBridgeDemoInner />
          <div style={{ flex: 1 }}>
            <h4>UI → AI stream</h4>
            <pre style={{ maxHeight: 240, overflow: 'auto', fontSize: 12 }}>
              {JSON.stringify(uiEvents, null, 2)}
            </pre>
          </div>
          <div style={{ flex: 1 }}>
            <h4>AI → UI commands</h4>
            <pre style={{ maxHeight: 240, overflow: 'auto', fontSize: 12 }}>
              {JSON.stringify(aiCommands, null, 2)}
            </pre>
          </div>
        </div>
      </AiControlProvider>
    </SocketProvider>
  )
}

const meta: Meta<typeof AiBridgeDemoShell> = {
  title: 'Core/AiControl/AiBridgeDemo',
  component: AiBridgeDemoShell,
}

export default meta

type Story = StoryObj<typeof AiBridgeDemoShell>

export const Default: Story = {
  render: () => <AiBridgeDemoShell />,
}
