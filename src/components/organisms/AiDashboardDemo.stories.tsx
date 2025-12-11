// File: src/components/organisms/AiDashboardDemo.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import type { SortingState } from '@tanstack/react-table'
import type { AiControlMessage } from '../../core/ai-control/types'
import { AiControlProvider } from '../../core/ai-control/AiControlProvider'
import { useAiControl } from '../../core/ai-control/hooks'
import { SocketProvider } from '../../core/socket/SocketProvider'
import type { GenericSocket, SocketMap } from '../../core/socket/types'
import { Table, type TableColumn } from './Table/Table'
import { useTableAiControl } from './Table/useTableAiControl'
import { KanbanBoard } from './Kanban/KanbanBoard'
import type { KanbanSchema, KanbanMappings, KanbanColumnConfig } from '../../kanban/types'
import { AreaChart } from '../../charts/AreaChart'
import { PieChart } from '../../charts/PieChart'
import type { AreaChartDto } from '../../charts/dto/area-chart.dto'
import type { PieChartDto } from '../../charts/dto/pie-chart.dto'
import { Button } from '../atoms/Button/Button'
import { generateId } from '../../utils/id'

interface UserRow {
  id: string
  name: string
  email: string
  role: string
}

const tableData: UserRow[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'Editor' },
  { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', role: 'Viewer' },
  { id: '4', name: 'Diana Prince', email: 'diana@example.com', role: 'Admin' },
  { id: '5', name: 'Evan Stone', email: 'evan@example.com', role: 'Editor' },
  { id: '6', name: 'Fiona Apple', email: 'fiona@example.com', role: 'Viewer' },
]

const tableColumns: TableColumn<UserRow>[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
]

const kanbanSchema: KanbanSchema = {
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

const kanbanMappings: KanbanMappings = {
  idField: 'id',
  columnKey: 'status',
  cardTitle: 'title',
}

const kanbanColumns: KanbanColumnConfig[] = [
  { id: 'todo', value: 'todo', label: 'Todo', order: 0 },
  { id: 'doing', value: 'doing', label: 'Doing', order: 1 },
  { id: 'done', value: 'done', label: 'Done', order: 2 },
]

const kanbanItems: Record<string, any>[] = [
  { id: '1', title: 'Set up project', status: 'todo', assignee: 'Alice' },
  { id: '2', title: 'Design Kanban UI', status: 'doing', assignee: 'Bob' },
  { id: '3', title: 'Write docs', status: 'done', assignee: 'Charlie' },
]

const areaConfig: AreaChartDto = {
  title: 'Revenue over time',
  xLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  series: [
    { name: 'Product A', data: [120, 132, 101, 134, 90, 230] },
    { name: 'Product B', data: [220, 182, 191, 234, 290, 330] },
  ],
  stacked: true,
}

const pieConfig: PieChartDto = {
  title: 'User segments',
  data: [
    { name: 'Free', value: 40 },
    { name: 'Pro', value: 25 },
    { name: 'Business', value: 20 },
    { name: 'Enterprise', value: 15 },
  ],
}

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

const AiDashboardInner: React.FC = () => {
  const [sorting, setSorting] = React.useState<SortingState>([])

  const tableInstanceId = React.useMemo(() => generateId(), [])
  const kanbanInstanceId = React.useMemo(() => generateId(), [])
  const chartInstanceId = React.useMemo(() => generateId(), [])

  useTableAiControl({ instanceId: tableInstanceId, setSorting })

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 style={{ marginBottom: 8 }}>Users Table</h3>
        <Table
          columns={tableColumns}
          data={tableData}
          rowKey={(row: UserRow) => row.id}
          striped
          size="md"
          pageSize={3}
          pageSizeOptions={[3, 5, 10]}
          showSortIndicator
          sorting={sorting}
          onSortingChange={setSorting}
          instanceId={tableInstanceId}
        />
      </div>
      <div>
        <h3 style={{ marginBottom: 8 }}>Tasks Kanban</h3>
        <KanbanBoard
          schema={kanbanSchema}
          mappings={kanbanMappings}
          columns={kanbanColumns}
          items={kanbanItems}
          pageSize={10}
          instanceId={kanbanInstanceId}
        />
      </div>
      <div>
        <h3 style={{ marginBottom: 8 }}>Charts</h3>
        <AreaChart config={areaConfig} height={220} instanceId={chartInstanceId} />
        <div style={{ height: 16 }} />
        <PieChart config={pieConfig} height={220} instanceId={chartInstanceId} />
        <div style={{ height: 16 }} />
        <AiDashboardPanel
          tableInstanceId={tableInstanceId}
          kanbanInstanceId={kanbanInstanceId}
          chartInstanceId={chartInstanceId}
        />
      </div>
    </div>
  )
}

const AiDashboardPanel: React.FC<{
  tableInstanceId: string
  kanbanInstanceId: string
  chartInstanceId: string
}> = ({ tableInstanceId, kanbanInstanceId, chartInstanceId }) => {
  const { sendCommand } = useAiControl()

  const sendTableSort = (sorting: SortingState) => {
    const message: AiControlMessage = {
      id: String(Date.now()),
      direction: 'AI→UI',
      type: 'AI.TABLE.SET_SORT',
      target: { component: 'Table', instanceId: tableInstanceId },
      payload: { sorting },
      meta: {},
    }
    sendCommand(message)
  }

  const moveKanbanCard = (cardId: string, fromColumnId: string, toColumnId: string, toIndex: number) => {
    const message: AiControlMessage = {
      id: String(Date.now()),
      direction: 'AI→UI',
      type: 'AI.KANBAN.MOVE_CARD',
      target: { component: 'KanbanBoard', instanceId: kanbanInstanceId },
      payload: { cardId, fromColumnId, toColumnId, toIndex },
      meta: {},
    }
    sendCommand(message)
  }

  const sendChartRange = (from: number, to: number) => {
    const message: AiControlMessage = {
      id: String(Date.now()),
      direction: 'AI→UI',
      type: 'AI.CHART.SET_RANGE',
      target: { component: 'EChart', instanceId: chartInstanceId },
      payload: { from, to },
      meta: {},
    }
    sendCommand(message)
  }

  const toggleChartSeries = (seriesKey: string, visible: boolean) => {
    const message: AiControlMessage = {
      id: String(Date.now()),
      direction: 'AI→UI',
      type: 'AI.CHART.TOGGLE_SERIES',
      target: { component: 'EChart', instanceId: chartInstanceId },
      payload: { seriesKey, visible },
      meta: {},
    }
    sendCommand(message)
  }

  const highlightChartPoints = (ids: string[]) => {
    const message: AiControlMessage = {
      id: String(Date.now()),
      direction: 'AI→UI',
      type: 'AI.CHART.HIGHLIGHT_POINTS',
      target: { component: 'EChart', instanceId: chartInstanceId },
      payload: { ids },
      meta: {},
    }
    sendCommand(message)
  }

  const sortNameAsc: SortingState = [{ id: 'name', desc: false }]
  const sortNameDesc: SortingState = [{ id: 'name', desc: true }]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontWeight: 500 }}>AI Panel (mock)</div>

      <div style={{ fontWeight: 500, marginTop: 4 }}>Table</div>
      <Button variant="secondary" onClick={() => sendTableSort(sortNameAsc)}>
        AI: Sort table by name ASC
      </Button>
      <Button variant="secondary" onClick={() => sendTableSort(sortNameDesc)}>
        AI: Sort table by name DESC
      </Button>

      <div style={{ fontWeight: 500, marginTop: 8 }}>Kanban</div>
      <Button variant="secondary" onClick={() => moveKanbanCard('1', 'todo', 'doing', 0)}>
        AI: Move #1 todo → doing
      </Button>
      <Button variant="secondary" onClick={() => moveKanbanCard('2', 'doing', 'done', 0)}>
        AI: Move #2 doing → done
      </Button>

      <div style={{ fontWeight: 500, marginTop: 8 }}>Charts</div>
      <Button variant="secondary" onClick={() => sendChartRange(0, 50)}>
        AI: Focus first half
      </Button>
      <Button variant="secondary" onClick={() => sendChartRange(50, 100)}>
        AI: Focus second half
      </Button>
      <Button variant="secondary" onClick={() => toggleChartSeries('Product A', false)}>
        AI: Hide Product A
      </Button>
      <Button variant="secondary" onClick={() => toggleChartSeries('Product A', true)}>
        AI: Show Product A
      </Button>
      <Button variant="secondary" onClick={() => highlightChartPoints(['Free'])}>
        AI: Highlight "Free" segment
      </Button>
    </div>
  )
}

const AiDashboardShell: React.FC = () => {
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
          <AiDashboardInner />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 500 }}>UI → AI stream</div>
              <pre style={{ maxHeight: 200, overflow: 'auto', fontSize: 11 }}>
                {JSON.stringify(uiEvents, null, 2)}
              </pre>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
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

const meta: Meta<typeof AiDashboardShell> = {
  title: 'Organisms/AiDashboard/AiControlDemo',
  component: AiDashboardShell,
}

export default meta

type Story = StoryObj<typeof AiDashboardShell>

export const Default: Story = {
  render: () => <AiDashboardShell />,
}
