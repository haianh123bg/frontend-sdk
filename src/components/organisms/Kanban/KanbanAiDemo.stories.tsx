import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import type { AiControlMessage } from '../../../core/ai-control/types'
import { AiControlProvider } from '../../../core/ai-control/AiControlProvider'
import { useAiControl } from '../../../core/ai-control/hooks'
import { SocketProvider } from '../../../core/socket/SocketProvider'
import type { GenericSocket, SocketMap } from '../../../core/socket/types'
import { KanbanBoard } from './KanbanBoard'
import type { KanbanSchema, KanbanMappings, KanbanColumnConfig } from '../../../kanban/types'
import { generateId } from '../../../utils/id'

const schema: KanbanSchema = {
  table: 'tasks',
  fields: [
    { name: 'id', type: 'string', label: 'ID' },
    { name: 'title', type: 'string', label: 'Title' },
    { name: 'status', type: 'enum', label: 'Status', enumValues: ['todo', 'doing', 'done'] },
    { name: 'assignee', type: 'user', label: 'Assignee' },
  ],
  defaultMappings: {
    idField: 'id',
    columnKey: 'status',
    cardTitle: 'title',
  },
}

const mappings: KanbanMappings = {
  idField: 'id',
  columnKey: 'status',
  cardTitle: 'title',
}

const columns: KanbanColumnConfig[] = [
  { id: 'todo', value: 'todo', label: 'Todo', order: 0 },
  { id: 'doing', value: 'doing', label: 'Doing', order: 1 },
  { id: 'done', value: 'done', label: 'Done', order: 2 },
]

const items: Record<string, any>[] = [
  { id: '1', title: 'Set up project', status: 'todo', assignee: 'Alice' },
  { id: '2', title: 'Design Kanban UI', status: 'doing', assignee: 'Bob' },
  { id: '3', title: 'Write docs', status: 'done', assignee: 'Charlie' },
]

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

const KanbanAiDemoInner: React.FC = () => {
  const instanceId = React.useMemo(() => generateId(), [])

  return (
    <div style={{ display: 'flex', gap: 24 }}>
      <div style={{ flex: 1, minWidth: 480 }}>
        <KanbanBoard
          schema={schema}
          mappings={mappings}
          columns={columns}
          items={items}
          pageSize={10}
          locale="vi-VN"
          instanceId={instanceId}
        />
      </div>
      <KanbanAiPanel instanceId={instanceId} />
    </div>
  )
}

const KanbanAiPanel: React.FC<{ instanceId: string }> = ({ instanceId }) => {
  const { sendCommand } = useAiControl()

  const sendMove = (cardId: string, fromColumnId: string, toColumnId: string, toIndex: number) => {
    const message: AiControlMessage = {
      id: String(Date.now()),
      direction: 'AI→UI',
      type: 'AI.KANBAN.MOVE_CARD',
      target: { component: 'KanbanBoard', instanceId },
      payload: { cardId, fromColumnId, toColumnId, toIndex },
      meta: {},
    }
    sendCommand(message)
  }

  const move1ToDoing = () => {
    sendMove('1', 'todo', 'doing', 0)
  }

  const move2ToDone = () => {
    sendMove('2', 'doing', 'done', 0)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontWeight: 500 }}>AI Panel (mock)</div>
      <button onClick={move1ToDoing}>Move #1: todo → doing</button>
      <button onClick={move2ToDone}>Move #2: doing → done</button>
    </div>
  )
}

const KanbanAiDemoShell: React.FC = () => {
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <KanbanAiDemoInner />
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500 }}>UI → AI stream</div>
              <pre style={{ maxHeight: 200, overflow: 'auto', fontSize: 11 }}>
                {JSON.stringify(uiEvents, null, 2)}
              </pre>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500 }}>AI → UI commands</div>
              <pre style={{ maxHeight: 200, overflow: 'auto', fontSize: 11 }}>
                {JSON.stringify(aiCommands, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </AiControlProvider>
    </SocketProvider>
  )
}

const meta: Meta<typeof KanbanAiDemoShell> = {
  title: 'Organisms/Kanban/AiControlDemo',
  component: KanbanAiDemoShell,
}

export default meta

type Story = StoryObj<typeof KanbanAiDemoShell>

export const Default: Story = {
  render: () => <KanbanAiDemoShell />,
}
