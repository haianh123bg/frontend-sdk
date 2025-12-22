import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { KanbanBoard } from './KanbanBoard'
import type { KanbanColumnConfig, KanbanMappings, KanbanSchema } from '../../../kanban/types'
import { SplitPane } from '../../molecules/SplitPane/SplitPane'
import { KanbanItemDetail } from './KanbanItemDetail'
import { Breadcrumb } from '../../molecules/Breadcrumb/Breadcrumb'
import { Avatar, AvatarGroup } from '../../atoms/Avatar/Avatar'
import { IconButton } from '../../atoms/IconButton/IconButton'
import { 
  ChevronsRight, 
  Maximize2, 
  Minimize2, 
  Star, 
  MoreHorizontal, 
  Share2,
  LayoutTemplate
} from 'lucide-react'

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
    { name: 'storyPoints', type: 'number', label: 'Points' },
    { name: 'isBlocked', type: 'boolean', label: 'Blocked' },
    { name: 'description', type: 'text', label: 'Description' },
  ],
  defaultMappings: {
    idField: 'id',
    columnKey: 'status',
    cardTitle: 'title',
    cardSubtitle: 'assignee',
    cardMeta: ['dueDate', 'priority', 'storyPoints', 'isBlocked'],
    cardTags: 'tags',
  },
}

const mappings: KanbanMappings = {
  idField: 'id',
  columnKey: 'status',
  cardTitle: 'title',
  cardSubtitle: 'assignee',
  cardMeta: ['dueDate', 'priority', 'storyPoints', 'isBlocked'],
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
    title: 'Set up project structure and initial configuration',
    status: 'todo',
    assignee: 'Alice',
    dueDate: '2025-01-10',
    priority: 'high',
    tags: ['setup', 'infra'],
    storyPoints: 5,
    isBlocked: false,
    description: 'Initialize repo, setup eslint, prettier, typescript',
  },
  {
    id: '2',
    title: 'Design Kanban UI Components',
    status: 'doing',
    assignee: 'Bob',
    dueDate: '2025-01-12',
    priority: 'medium',
    tags: ['ui', 'design'],
    storyPoints: 8,
    isBlocked: true,
    description: 'Create Figma designs for board, column, and card',
  },
  {
    id: '3',
    title: 'Write documentation for APIs',
    status: 'done',
    assignee: 'Charlie',
    dueDate: '2025-01-08',
    priority: 'low',
    tags: ['docs'],
    storyPoints: 3,
    isBlocked: false,
  },
  {
    id: '4',
    title: 'Implement Drag and Drop',
    status: 'doing',
    assignee: 'David',
    dueDate: '2025-01-15',
    priority: 'high',
    tags: ['feature', 'complex'],
    storyPoints: 13,
    isBlocked: false,
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
      title: `Task ${id} - This is a generated task title to test layout`,
      status,
      assignee,
      dueDate: `2025-01-${day}`,
      priority,
      tags: i % 3 === 0 ? ['bulk', 'long-list'] : ['bulk'],
      storyPoints: (i % 10) + 1,
      isBlocked: i % 5 === 0,
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
    <div className="h-[640px] w-full bg-slate-50 p-4">
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
        className="shadow-sm"
      />
    </div>
  )
}

const meta: Meta<typeof KanbanBoard> = {
  title: 'Organisms/Kanban/Board',
  component: KanbanBoard,
  parameters: {
    layout: 'fullscreen',
  },
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

const WithSplitPaneStory = () => {
  const [items, setItems] = React.useState(itemsBase)
  const [selectedId, setSelectedId] = React.useState<string | null>(null)
  const [isFullScreen, setIsFullScreen] = React.useState(false)

  const selectedItem = React.useMemo(() => 
    items.find(i => i.id === selectedId) ?? null, 
    [items, selectedId]
  )

  const handleUpdate = (id: string, patch: any) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...patch } : item
    ))
    return Promise.resolve()
  }

  React.useEffect(() => {
    if (typeof window === 'undefined') return

    const base = `${window.location.pathname}${window.location.search}`
    if (selectedId && isFullScreen) {
      window.history.replaceState({}, '', `${base}#/kanban/tasks/${selectedId}`)
      return
    }
    window.history.replaceState({}, '', `${base}#/kanban`)
  }, [selectedId, isFullScreen])

  const renderDetail = () => {
    if (!selectedItem) return null
    
    return (
      <div className="flex h-full flex-col bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2 bg-white">
          <div className="flex items-center gap-2">
            <IconButton 
              icon={ChevronsRight} 
              onClick={() => setSelectedId(null)} 
              title="Đóng chi tiết"
              size='xs'
            />
            <IconButton 
              icon={isFullScreen ? Minimize2 : Maximize2} 
              onClick={() => setIsFullScreen(!isFullScreen)}
              title={isFullScreen ? "Thoát toàn màn hình" : "Mở toàn màn hình"}
              size='xs'
            />
            <IconButton 
              icon={LayoutTemplate} 
              title="Chuyển chế độ xem"
              size='xs'
            />
          </div>
          <div className="flex items-center gap-3">
             <AvatarGroup max={3}>
               <Avatar initials="AB" size='sm' className="bg-blue-100 text-blue-600" />
               <Avatar initials="CD" size='sm' className="bg-green-100 text-green-600" />
               <Avatar initials="EF" size='sm' className="bg-purple-100 text-purple-600" />
               <Avatar initials="GH" size='sm' className="bg-orange-100 text-orange-600" />
             </AvatarGroup>
             <div className="h-4 w-[1px] bg-slate-200" />
             <div className="flex items-center gap-1">
               <IconButton icon={Share2} title="Chia sẻ" size='xs' />
               <IconButton icon={Star} title="Yêu thích" size='xs' />
               <IconButton icon={MoreHorizontal} title="Thêm" size='xs' />
             </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4">
          <KanbanItemDetail 
            item={{ id: selectedItem.id, data: selectedItem }} 
            schema={schema}
            onPatch={(_, patch) => handleUpdate(selectedItem.id, patch)}
            onCancel={() => setSelectedId(null)}
          />
        </div>
      </div>
    )
  }

  // Full Screen Mode
  if (selectedId && isFullScreen) {
    return (
      <div className="h-screen w-full bg-slate-50 p-4 flex flex-col gap-3">
        <div className="rounded-2xl bg-white px-4 py-2 shadow-sm">
          <Breadcrumb
            items={[
              { label: 'Projects', href: '#' },
              { label: 'Board', href: '#' },
              { label: selectedItem?.title || selectedId, onClick: () => {} }
            ]}
          />
        </div>
        <div className="flex-1 min-h-0">
          {renderDetail()}
        </div>
      </div>
    )
  }

  // Board Only Mode (No Selection)
  if (!selectedId) {
    return (
      <div className="h-screen w-full bg-slate-50 p-4">
        <KanbanBoard
          schema={schema}
          mappings={mappings}
          columns={columns}
          items={items}
          pageSize={50}
          locale="vi-VN"
          permissions={{ canCreate: true, canMove: true, canEdit: true }}
          onCreate={async (payload) => {
            const next = { ...payload, id: String(Date.now()), status: payload.status ?? 'todo' }
            setItems((prev) => [next, ...prev])
            return next
          }}
          onUpdate={handleUpdate}
          selectedId={null}
          onSelectionChange={setSelectedId}
          disableDetailModal
          className="shadow-sm"
        />
      </div>
    )
  }

  // Split Pane Mode (Board + Detail)
  return (
    <div className="h-screen w-full bg-slate-50 p-4">
      <SplitPane>
        <div className="h-full w-full pr-2">
           <KanbanBoard
            schema={schema}
            mappings={mappings}
            columns={columns}
            items={items}
            pageSize={50}
            locale="vi-VN"
            permissions={{ canCreate: true, canMove: true, canEdit: true }}
            onCreate={async (payload) => {
              const next = { ...payload, id: String(Date.now()), status: payload.status ?? 'todo' }
              setItems((prev) => [next, ...prev])
              return next
            }}
            onUpdate={handleUpdate}
            selectedId={selectedId}
            onSelectionChange={setSelectedId}
            disableDetailModal
            className="shadow-sm"
          />
        </div>
        <div className="h-full w-full pl-2">
          {renderDetail()}
        </div>
      </SplitPane>
    </div>
  )
}

export const WithSplitPane: Story = {
  render: () => <WithSplitPaneStory />
}
