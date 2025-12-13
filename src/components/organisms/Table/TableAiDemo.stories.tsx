import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import type { SortingState } from '@tanstack/react-table'
import type { AiControlMessage } from '../../../core/ai-control/types'
import { AiControlProvider } from '../../../core/ai-control/AiControlProvider'
import { useAiControl } from '../../../core/ai-control/hooks'
import { SocketProvider } from '../../../core/socket/SocketProvider'
import type { GenericSocket, SocketMap } from '../../../core/socket/types'
import { Table, type TableColumn } from './Table'
import { Button } from '../../atoms/Button/Button'
import { useTableAiControl } from './useTableAiControl'
import { generateId } from '../../../utils/id'

interface UserRow {
  id: string
  name: string
  email: string
  role: string
}

const docsSourceCode = `import * as React from 'react'
import type { SortingState } from '@tanstack/react-table'
import { Table, type TableColumn } from './Table'

type UserRow = {
  id: string
  name: string
  email: string
  role: string
}

const data: UserRow[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'Editor' },
]

const columns: TableColumn<UserRow>[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
]

export const Example = () => {
  const [sorting, setSorting] = React.useState<SortingState>([])

  return (
    <Table
      columns={columns}
      data={data}
      rowKey={(row) => row.id}
      pageSize={3}
      pageSizeOptions={[3, 5, 10]}
      showSortIndicator
      sorting={sorting}
      onSortingChange={setSorting}
    />
  )
}`

const data: UserRow[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'Editor' },
  { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', role: 'Viewer' },
  { id: '4', name: 'Diana Prince', email: 'diana@example.com', role: 'Admin' },
  { id: '5', name: 'Evan Stone', email: 'evan@example.com', role: 'Editor' },
  { id: '6', name: 'Fiona Apple', email: 'fiona@example.com', role: 'Viewer' },
]

const columns: TableColumn<UserRow>[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
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

const TableAiDemoInner: React.FC = () => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const instanceId = React.useMemo(() => generateId(), [])

  useTableAiControl({ instanceId, setSorting })

  return (
    <div style={{ display: 'flex', gap: 24 }}>
      <div style={{ flex: 1 }}>
        <Table
          columns={columns}
          data={data}
          rowKey={(row: UserRow) => row.id}
          striped
          size="md"
          pageSize={3}
          pageSizeOptions={[3, 5, 10]}
          showSortIndicator
          sorting={sorting}
          onSortingChange={setSorting}
          instanceId={instanceId}
        />
      </div>
      <AiTablePanel instanceId={instanceId} />
    </div>
  )
}

const AiTablePanel: React.FC<{ instanceId: string }> = ({ instanceId }) => {
  const { sendCommand } = useAiControl()

  const send = (sorting: SortingState) => {
    const message: AiControlMessage = {
      id: String(Date.now()),
      direction: 'AI→UI',
      type: 'AI.TABLE.SET_SORT',
      target: { component: 'Table', instanceId },
      payload: { sorting },
      meta: {},
    }
    sendCommand(message)
  }

  const setNameAsc = () => {
    const sorting: SortingState = [{ id: 'name', desc: false }]
    send(sorting)
  }

  const setNameDesc = () => {
    const sorting: SortingState = [{ id: 'name', desc: true }]
    send(sorting)
  }

  const clearSorting = () => {
    const sorting: SortingState = []
    send(sorting)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontWeight: 500 }}>AI Panel (mock)</div>
      <Button variant="secondary" onClick={setNameAsc}>
        AI: Sort by name ASC
      </Button>
      <Button variant="secondary" onClick={setNameDesc}>
        AI: Sort by name DESC
      </Button>
      <Button variant="secondary" onClick={clearSorting}>
        AI: Clear sorting
      </Button>
    </div>
  )
}

const TableAiDemoShell: React.FC = () => {
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
          <TableAiDemoInner />
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

const meta: Meta<typeof TableAiDemoShell> = {
  title: 'Organisms/Table/AiControlDemo',
  component: TableAiDemoShell,
}

export default meta

type Story = StoryObj<typeof TableAiDemoShell>

export const Default: Story = {
  render: () => <TableAiDemoShell />,
  parameters: {
    docs: {
      source: {
        code: docsSourceCode,
        language: 'tsx',
      },
    },
  },
}
