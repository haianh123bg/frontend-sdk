import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { KanbanBoard } from './KanbanBoard'
import type { KanbanColumnConfig, KanbanMappings, KanbanSchema } from '../../../kanban/types'

const schema: KanbanSchema = {
  table: 'tasks',
  fields: [
    { name: 'id', type: 'string', label: 'ID' },
    { name: 'title', type: 'string', label: 'Title' },
    { name: 'status', type: 'enum', label: 'Status', enumValues: ['todo', 'doing', 'done'] },
    { name: 'assignee', type: 'user', label: 'Assignee' },
    { name: 'dueDate', type: 'date', label: 'Due date' },
    { name: 'priority', type: 'enum', label: 'Priority', enumValues: ['low', 'medium', 'high'] },
    { name: 'tags', type: 'string', label: 'Tags' },
  ],
  defaultMappings: {
    idField: 'id',
    columnKey: 'status',
    cardTitle: 'title',
    cardSubtitle: 'assignee',
    cardMeta: ['dueDate', 'priority'],
    cardTags: 'tags',
  },
}

const mappings: KanbanMappings = {
  idField: 'id',
  columnKey: 'status',
  cardTitle: 'title',
  cardSubtitle: 'assignee',
  cardMeta: ['dueDate', 'priority'],
  cardTags: 'tags',
}

const columns: KanbanColumnConfig[] = [
  { id: 'todo', value: 'todo', label: 'Todo', order: 0 },
  { id: 'doing', value: 'doing', label: 'Doing', order: 1 },
  { id: 'done', value: 'done', label: 'Done', order: 2 },
]

const itemsBase: Record<string, any>[] = [
  {
    id: '1',
    title: 'Set up project',
    status: 'todo',
    assignee: 'Alice',
    dueDate: '2025-01-10',
    priority: 'high',
    tags: ['setup', 'infra'],
  },
  {
    id: '2',
    title: 'Design Kanban UI',
    status: 'doing',
    assignee: 'Bob',
    dueDate: '2025-01-12',
    priority: 'medium',
    tags: ['ui'],
  },
  {
    id: '3',
    title: 'Write docs',
    status: 'done',
    assignee: 'Charlie',
    dueDate: '2025-01-08',
    priority: 'low',
    tags: ['docs'],
  },
]

const makeManyItems = (count: number): Record<string, any>[] => {
  const statuses = ['todo', 'doing', 'done']
  const assignees = ['Alice', 'Bob', 'Charlie', 'David', 'Eve']
  const priorities = ['low', 'medium', 'high']

  return Array.from({ length: count }, (_, i) => {
    const id = String(i + 1)
    const status = statuses[i % statuses.length]
    const assignee = assignees[i % assignees.length]
    const priority = priorities[i % priorities.length]
    const day = String(((i % 28) + 1)).padStart(2, '0')

    return {
      id,
      title: `Task ${id}`,
      status,
      assignee,
      dueDate: `2025-01-${day}`,
      priority,
      tags: i % 3 === 0 ? ['bulk', 'long-list'] : ['bulk'],
    }
  })
}

const Shell: React.FC<{
  items: Record<string, any>[]
  virtualization?: boolean
  orientation?: 'horizontal' | 'vertical'
  permissions?: { canCreate?: boolean; canMove?: boolean }
  renderCard?: any
  renderColumnHeader?: any
}> = ({ items, virtualization, orientation, permissions, renderCard, renderColumnHeader }) => {
  const [data, setData] = React.useState(items)

  return (
    <div style={{ height: 640 }}>
      <KanbanBoard
        schema={schema}
        mappings={mappings}
        columns={columns}
        items={data}
        pageSize={50}
        locale="vi-VN"
        virtualization={virtualization}
        orientation={orientation}
        permissions={permissions}
        onCreate={permissions?.canCreate ? async (payload) => {
          const next = { ...payload, id: String(Date.now()), status: payload.status ?? 'todo' }
          setData((prev) => [next, ...prev])
          return next
        } : undefined}
        renderCard={renderCard}
        renderColumnHeader={renderColumnHeader}
      />
    </div>
  )
}

const meta: Meta<typeof KanbanBoard> = {
  title: 'Organisms/Kanban/Board',
  component: KanbanBoard,
}

export default meta

type Story = StoryObj<typeof KanbanBoard>

export const Basic: Story = {
  render: () => <Shell items={itemsBase} permissions={{ canCreate: true, canMove: true }} />,
}

export const Empty: Story = {
  render: () => <Shell items={[]} permissions={{ canCreate: true, canMove: true }} />,
}

export const ManyItems: Story = {
  render: () => <Shell items={makeManyItems(120)} permissions={{ canCreate: false, canMove: true }} />,
}

export const Virtualized: Story = {
  render: () => (
    <Shell
      items={makeManyItems(300)}
      virtualization
      permissions={{ canCreate: false, canMove: true }}
    />
  ),
}

export const Vertical: Story = {
  render: () => (
    <Shell
      items={itemsBase}
      orientation="vertical"
      permissions={{ canCreate: true, canMove: true }}
    />
  ),
}

export const CustomCard: Story = {
  render: () => (
    <Shell
      items={itemsBase}
      permissions={{ canCreate: false, canMove: true }}
      renderCard={(item: any, defaultRender: () => JSX.Element) => {
        return (
          <div style={{ border: '1px solid #e2e8f0', borderRadius: 16, padding: 8 }}>
            {defaultRender()}
            <div style={{ fontSize: 11, color: '#64748b', marginTop: 6 }}>
              Custom footer: {String(item.id)}
            </div>
          </div>
        )
      }}
    />
  ),
}

export const CustomColumnHeader: Story = {
  render: () => (
    <Shell
      items={itemsBase}
      permissions={{ canCreate: true, canMove: true }}
      renderColumnHeader={(col: any, defaultRender: () => JSX.Element) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: 999, background: '#3b82f6' }} />
          {defaultRender()}
          <span style={{ fontSize: 11, color: '#64748b' }}>({col.value})</span>
        </div>
      )}
    />
  ),
}

export const ReadOnlyMoveDisabled: Story = {
  render: () => <Shell items={itemsBase} permissions={{ canCreate: false, canMove: false }} />,
}
