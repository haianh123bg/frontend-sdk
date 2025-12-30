import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { twMerge } from 'tailwind-merge'
import { SchemaRenderer, type SchemaRendererProps } from './SchemaRenderer'
import type { ChatKitActionEvent } from './contracts'
import type { SchemaComponentProps, UIComponent } from './types'

const meta: Meta<typeof SchemaRenderer> = {
  title: 'Organisms/ChatKit/SchemaRenderer',
  component: SchemaRenderer,
  parameters: { layout: 'centered' },
}

export default meta

type Story = StoryObj<typeof SchemaRenderer>

const nodes: UIComponent[] = [
  {
    type: 'card',
    props: { title: 'Tác vụ gợi ý', subtitle: 'Chọn 1 hành động để tiếp tục', padding: 'md', className: 'w-[420px]' },
    children: [
      { type: 'text', props: { value: 'Bạn muốn mình làm gì tiếp theo?' } },
      {
        type: 'row',
        props: { gap: 'sm', className: 'justify-end' },
        children: [
          {
            type: 'button',
            props: {
              variant: 'secondary',
              label: 'Bỏ qua',
              action: { type: 'chatkit.skip' },
            },
          },
          {
            type: 'button',
            props: {
              variant: 'primary',
              label: 'Tạo task',
              action: { type: 'chatkit.create_task', payload: { priority: 'high' } },
            },
          },
        ],
      },
      { type: 'divider' },
      {
        type: 'image',
        props: {
          src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=60',
          alt: 'Demo',
          className: 'w-full',
          aspectRatio: '16/9',
        },
      },
    ],
  },
]

export const Basic: Story = {
  render: (args: SchemaRendererProps) => {
    const [lastAction, setLastAction] = React.useState<ChatKitActionEvent | null>(null)

    return (
      <div className="flex flex-col gap-3">
        <SchemaRenderer
          {...args}
          onAction={(e) => {
            setLastAction(e)
            args.onAction?.(e)
          }}
        />

        {lastAction && (
          <pre className="max-w-[520px] overflow-auto rounded-xl bg-slate-950 p-3 text-xs text-slate-100">
            {JSON.stringify(lastAction, null, 2)}
          </pre>
        )}
      </div>
    )
  },
  args: {
    nodes,
    conversationId: 'conv_001',
  },
}

const complexNodes: UIComponent[] = [
  {
    type: 'card',
    props: {
      title: 'Bảng điều khiển',
      subtitle: 'Ví dụ nested layout + multiple actions',
      padding: 'md',
      className: 'w-[720px]',
    },
    children: [
      {
        type: 'row',
        props: { gap: 'md', className: 'items-start' },
        children: [
          {
            type: 'col',
            props: { gap: 'sm', className: 'flex-1' },
            children: [
              { type: 'text', props: { as: 'h3', value: 'Tóm tắt' } },
              {
                type: 'box',
                props: { padding: 'md', className: 'rounded-xl bg-slate-50 border border-slate-200' },
                children: [
                  { type: 'text', props: { value: 'Hôm nay bạn có 5 task cần xử lý.' } },
                  { type: 'divider' },
                  {
                    type: 'row',
                    props: { gap: 'sm', className: 'justify-end' },
                    children: [
                      {
                        type: 'button',
                        props: {
                          variant: 'secondary',
                          label: 'Xem danh sách',
                          action: { type: 'chatkit.open_tasks', payload: { view: 'today' } },
                        },
                      },
                      {
                        type: 'button',
                        props: {
                          variant: 'primary',
                          label: 'Tạo task mới',
                          action: { type: 'chatkit.create_task', payload: { priority: 'high', source: 'schema' } },
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: 'col',
            props: { gap: 'sm', className: 'w-[260px]' },
            children: [
              { type: 'text', props: { as: 'h3', value: 'Minh hoạ' } },
              {
                type: 'image',
                props: {
                  src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=60',
                  alt: 'Demo',
                  className: 'w-full rounded-xl',
                  aspectRatio: '4/3',
                },
              },
              {
                type: 'button',
                props: {
                  variant: 'secondary',
                  label: 'Phản hồi',
                  action: { type: 'chatkit.feedback', payload: { score: 5, tags: ['demo', 'schema'] } },
                },
              },
            ],
          },
        ],
      },
    ],
  },
]

export const ComplexLayout: Story = {
  render: (args: SchemaRendererProps) => {
    const [lastAction, setLastAction] = React.useState<ChatKitActionEvent | null>(null)
    return (
      <div className="flex flex-col gap-3">
        <SchemaRenderer
          {...args}
          onAction={(e) => {
            setLastAction(e)
            args.onAction?.(e)
          }}
        />

        {lastAction && (
          <pre className="max-w-[760px] overflow-auto rounded-xl bg-slate-950 p-3 text-xs text-slate-100">
            {JSON.stringify(lastAction, null, 2)}
          </pre>
        )}
      </div>
    )
  },
  args: {
    nodes: complexNodes,
    conversationId: 'conv_complex',
  },
}

const CounterNode: React.FC<SchemaComponentProps> = ({ node, path, onAction, conversationId }) => {
  const [count, setCount] = React.useState(0)
  const label = (node.props as any)?.label ?? 'Tăng'

  return (
    <div className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-surface px-3 py-2">
      <div className="min-w-0">
        <div className="text-xs text-text-muted">Custom widget (hooks)</div>
        <div className="text-sm text-text-secondary truncate">count = {count}</div>
      </div>
      <button
        type="button"
        className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs text-white"
        onClick={() => {
          setCount((v) => v + 1)
          if (conversationId && onAction) {
            onAction({ type: 'chatkit.counter', conversationId, payload: { count: count + 1, path } })
          }
        }}
      >
        {label}
      </button>
    </div>
  )
}

export const CustomRegistryWithHooks: Story = {
  args: {
    nodes: [
      {
        type: 'card',
        props: { title: 'Custom registry', subtitle: 'Component dùng React hooks', padding: 'md', className: 'w-[520px]' },
        children: [
          { type: 'text', props: { value: 'Bên dưới là widget custom type = counter.' } },
          { type: 'counter', props: { label: 'Increment' } },
        ],
      },
    ],
    conversationId: 'conv_hooks',
    registry: {
      counter: CounterNode,
    },
  },
}

export const UnknownAndInvalidNodes: Story = {
  args: {
    nodes: [
      {
        type: 'card',
        props: { title: 'Unknown + Invalid', subtitle: 'Test unknownFallback + invalidFallback', padding: 'md', className: 'w-[520px]' },
        children: [
          { type: 'text', props: { value: 'Node unknown và node invalid sẽ không làm crash renderer.' } },
          { type: 'unknown_widget', props: { foo: 'bar' } },
        ],
      },
    ] as any,
    conversationId: 'conv_unknown',
    unknownFallback: (node, path) => {
      return (
        <div className="rounded-xl border border-dashed border-indigo-300 bg-indigo-50 px-3 py-2 text-xs text-indigo-800">
          Unknown <span className="font-mono">{node.type}</span> at <span className="font-mono">{path.join('/')}</span>
        </div>
      )
    },
    invalidFallback: (_value, path) => {
      return (
        <div className="rounded-xl border border-dashed border-rose-300 bg-rose-50 px-3 py-2 text-xs text-rose-700">
          Invalid node at <span className="font-mono">{path.join('/')}</span>
        </div>
      )
    },
  },
  render: (args) => {
    const nodesWithInvalid: any[] = [...(args.nodes as any[])]
    nodesWithInvalid.splice(1, 0, { nope: true })
    return <SchemaRenderer {...args} nodes={nodesWithInvalid as any} />
  },
}

const CrashNode: React.FC<SchemaComponentProps> = () => {
  throw new Error('Intentional crash')
}

export const ErrorBoundary: Story = {
  args: {
    nodes: [
      {
        type: 'card',
        props: { title: 'ErrorBoundary', subtitle: 'Component crash sẽ bị chặn', padding: 'md', className: 'w-[520px]' },
        children: [
          { type: 'text', props: { value: 'Dòng tiếp theo sẽ throw error.' } },
          { type: 'crash' },
        ],
      },
    ],
    registry: { crash: CrashNode },
    fallback: (
      <div className="rounded-xl border border-dashed border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-800">
        Renderer fallback: có lỗi khi render schema.
      </div>
    ),
  },
}

function buildDeepTree(depth: number): UIComponent {
  let cur: UIComponent = { type: 'text', props: { value: `Leaf depth=${depth}` } }
  for (let i = 0; i < depth; i++) {
    cur = { type: 'box', props: { padding: 'sm', className: 'border border-slate-100 rounded-lg' }, children: [cur] }
  }
  return cur
}

export const MaxDepthProtection: Story = {
  args: {
    nodes: [
      {
        type: 'card',
        props: { title: 'MaxDepth', subtitle: 'Giới hạn độ sâu để tránh schema đệ quy quá sâu', padding: 'md', className: 'w-[520px]' },
        children: [buildDeepTree(12)],
      },
    ],
    maxDepth: 8,
  },
}

const formatCurrency = (value: number, currency: string) => {
  try {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency }).format(value)
  } catch {
    return String(value)
  }
}

const BadgeNode: React.FC<SchemaComponentProps> = ({ node }) => {
  const { text, tone = 'slate', className } = (node.props ?? {}) as Record<string, any>

  const toneMap: Record<string, { bg: string; ring: string; text: string }> = {
    slate: { bg: 'bg-white/10', ring: 'ring-white/10', text: 'text-white/80' },
    indigo: { bg: 'bg-indigo-500/15', ring: 'ring-indigo-400/20', text: 'text-indigo-100' },
    emerald: { bg: 'bg-emerald-500/15', ring: 'ring-emerald-400/20', text: 'text-emerald-100' },
    amber: { bg: 'bg-amber-500/15', ring: 'ring-amber-400/20', text: 'text-amber-100' },
    rose: { bg: 'bg-rose-500/15', ring: 'ring-rose-400/20', text: 'text-rose-100' },
  }

  const t = toneMap[String(tone)] ?? toneMap.slate

  return (
    <span
      className={twMerge(
        'inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide ring-1',
        t.bg,
        t.ring,
        t.text,
        className
      )}
    >
      {text != null ? String(text) : ''}
    </span>
  )
}

const RatingNode: React.FC<SchemaComponentProps> = ({ node }) => {
  const { value = 0, count, className } = (node.props ?? {}) as Record<string, any>
  const v = Math.max(0, Math.min(5, Number(value)))
  const full = Math.floor(v)
  const half = v - full >= 0.5
  const stars = Array.from({ length: 5 }, (_, i) => {
    if (i < full) return 'full'
    if (i === full && half) return 'half'
    return 'empty'
  })

  return (
    <div className={twMerge('flex items-center gap-2', className)}>
      <div className="flex items-center gap-0.5">
        {stars.map((s, i) => (
          <span
            key={i}
            className={twMerge(
              'text-sm',
              s === 'full' ? 'text-amber-300' : s === 'half' ? 'text-amber-200' : 'text-white/20'
            )}
            aria-hidden
          >
            ★
          </span>
        ))}
      </div>
      <span className="text-xs font-semibold text-white/80">{v.toFixed(1)}</span>
      {count != null && <span className="text-xs text-white/50">({String(count)})</span>}
    </div>
  )
}

const PriceNode: React.FC<SchemaComponentProps> = ({ node }) => {
  const { value = 0, oldValue, currency = 'VND', className } = (node.props ?? {}) as Record<string, any>
  const v = Number(value)
  const old = oldValue != null ? Number(oldValue) : null

  return (
    <div className={twMerge('flex items-end gap-2', className)}>
      <div className="text-lg font-semibold text-white">{formatCurrency(v, String(currency))}</div>
      {old != null && Number.isFinite(old) && old > v && (
        <div className="text-xs text-white/50 line-through">{formatCurrency(old, String(currency))}</div>
      )}
    </div>
  )
}

const SearchBarNode: React.FC<SchemaComponentProps> = ({ node, onAction, conversationId, path }) => {
  const { placeholder, actionType = 'chatkit.search', className, defaultValue } = (node.props ?? {}) as Record<
    string,
    any
  >
  const [value, setValue] = React.useState<string>(defaultValue ? String(defaultValue) : '')

  const emit = React.useCallback(() => {
    if (!onAction || !conversationId) return
    onAction({ type: String(actionType), conversationId, payload: { query: value, path } })
  }, [actionType, conversationId, onAction, path, value])

  return (
    <div className={twMerge('relative', className)}>
      <div className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/10 backdrop-blur">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white/60">
          <path
            d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <input
          className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
          placeholder={placeholder != null ? String(placeholder) : 'Tìm kiếm…'}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') emit()
          }}
        />
        <button
          type="button"
          className="rounded-xl bg-white/15 px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-white/10 hover:bg-white/20"
          onClick={emit}
        >
          Tìm
        </button>
      </div>
    </div>
  )
}

const ChipNode: React.FC<SchemaComponentProps> = ({ node, onAction, conversationId, path }) => {
  const { label, active, actionType = 'chatkit.filter', payload, className } = (node.props ?? {}) as Record<string, any>
  return (
    <button
      type="button"
      className={twMerge(
        'rounded-full px-3 py-1.5 text-xs font-semibold ring-1 transition',
        active
          ? 'bg-white text-slate-900 ring-white/20'
          : 'bg-white/10 text-white/80 ring-white/10 hover:bg-white/15',
        className
      )}
      onClick={() => {
        if (!onAction || !conversationId) return
        onAction({ type: String(actionType), conversationId, payload: { ...(payload ?? {}), label, path } })
      }}
    >
      {label != null ? String(label) : ''}
    </button>
  )
}

type BookItem = {
  id: string
  title: string
  author: string
  cover: string
  rating: number
  price: number
  badge?: string
}

const BookListNode: React.FC<SchemaComponentProps> = ({ node, onAction, conversationId, path }) => {
  const { items = [], className, actionType = 'chatkit.book.open' } = (node.props ?? {}) as Record<string, any>
  const list = Array.isArray(items) ? (items as BookItem[]) : []

  return (
    <div className={twMerge('flex flex-col gap-2', className)}>
      {list.map((it, idx) => (
        <button
          key={it.id}
          type="button"
          className="group flex items-center gap-3 rounded-2xl bg-white/5 p-3 text-left ring-1 ring-white/10 hover:bg-white/10"
          onClick={() => {
            if (!onAction || !conversationId) return
            onAction({ type: String(actionType), conversationId, payload: { bookId: it.id, index: idx, path } })
          }}
        >
          <img
            src={it.cover}
            alt={it.title}
            className="h-14 w-12 rounded-xl object-cover ring-1 ring-white/10"
          />
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold text-white">{it.title}</div>
            <div className="truncate text-xs text-white/60">{it.author}</div>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-xs font-semibold text-amber-200">★ {it.rating.toFixed(1)}</span>
              <span className="text-xs text-white/50">•</span>
              <span className="text-xs text-white/70">{formatCurrency(it.price, 'VND')}</span>
              {it.badge && (
                <span className="ml-auto rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-100 ring-1 ring-emerald-400/20">
                  {it.badge}
                </span>
              )}
            </div>
          </div>
          <div className="text-white/40 transition group-hover:text-white/70" aria-hidden>
            →
          </div>
        </button>
      ))}
    </div>
  )
}

export const BookPlatform_BookStoreHome: Story = {
  parameters: { layout: 'fullscreen' },
  render: (args: SchemaRendererProps) => {
    const [lastAction, setLastAction] = React.useState<ChatKitActionEvent | null>(null)

    return (
      <div className="min-h-screen w-full bg-slate-950 p-6">
        <div className="mx-auto w-full max-w-[1024px]">
          <SchemaRenderer
            {...args}
            onAction={(e) => {
              setLastAction(e)
              args.onAction?.(e)
            }}
          />
          {lastAction && (
            <pre className="mt-4 w-full overflow-auto rounded-2xl bg-black/60 p-4 text-xs text-slate-100 ring-1 ring-white/10">
              {JSON.stringify(lastAction, null, 2)}
            </pre>
          )}
        </div>
      </div>
    )
  },
  args: {
    conversationId: 'conv_books',
    registry: {
      badge: BadgeNode,
      rating: RatingNode,
      price: PriceNode,
      searchbar: SearchBarNode,
      chip: ChipNode,
      book_list: BookListNode,
    },
    nodes: [
      {
        type: 'box',
        props: {
          padding: 'none',
          className:
            'overflow-hidden rounded-[28px] bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 ring-1 ring-white/10 shadow-2xl',
        },
        children: [
          {
            type: 'box',
            props: { padding: 'lg', className: 'text-white' },
            children: [
              {
                type: 'row',
                props: { gap: 'md', className: 'items-start justify-between' },
                children: [
                  {
                    type: 'col',
                    props: { gap: 'sm' },
                    children: [
                      {
                        type: 'text',
                        props: {
                          as: 'h2',
                          value: 'Bookly',
                          className: 'text-3xl font-semibold tracking-tight text-white',
                        },
                      },
                      {
                        type: 'text',
                        props: {
                          value: 'Khám phá sách hay, gợi ý cá nhân hoá và mua nhanh trong 1 chạm.',
                          className: 'max-w-[520px] text-sm text-white/70',
                        },
                      },
                    ],
                  },
                  {
                    type: 'row',
                    props: { gap: 'sm', className: 'items-center' },
                    children: [
                      { type: 'badge', props: { text: 'PRO', tone: 'indigo' } },
                      { type: 'badge', props: { text: 'NEW', tone: 'emerald' } },
                    ],
                  },
                ],
              },
              {
                type: 'searchbar',
                props: {
                  placeholder: 'Tìm sách, tác giả, thể loại…',
                  actionType: 'chatkit.books.search',
                  className: 'mt-5',
                },
              },
              {
                type: 'row',
                props: { gap: 'sm', className: 'mt-4 flex-wrap' },
                children: [
                  { type: 'chip', props: { label: 'Gợi ý', active: true, payload: { key: 'for_you' } } },
                  { type: 'chip', props: { label: 'Tâm lý', payload: { key: 'psychology' } } },
                  { type: 'chip', props: { label: 'Kinh doanh', payload: { key: 'business' } } },
                  { type: 'chip', props: { label: 'Công nghệ', payload: { key: 'tech' } } },
                  { type: 'chip', props: { label: 'Tiểu thuyết', payload: { key: 'novel' } } },
                  { type: 'chip', props: { label: 'Thiếu nhi', payload: { key: 'kids' } } },
                ],
              },
              {
                type: 'row',
                props: { gap: 'lg', className: 'mt-6 items-stretch' },
                children: [
                  {
                    type: 'card',
                    props: {
                      className: 'w-[560px] bg-white/5 ring-1 ring-white/10 shadow-lg',
                      padding: 'md',
                      highlight: 'FEATURED',
                      title: 'Sách nổi bật hôm nay',
                      subtitle: 'Tuyển chọn bởi hệ thống gợi ý',
                    },
                    children: [
                      {
                        type: 'row',
                        props: { gap: 'md', className: 'items-start' },
                        children: [
                          {
                            type: 'image',
                            props: {
                              src: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=60',
                              alt: 'Book Cover',
                              className: 'w-[140px] rounded-2xl ring-1 ring-white/10',
                              aspectRatio: '3/2',
                            },
                          },
                          {
                            type: 'col',
                            props: { gap: 'sm', className: 'flex-1' },
                            children: [
                              {
                                type: 'text',
                                props: {
                                  as: 'h3',
                                  value: 'Atomic Habits',
                                  className: 'text-xl font-semibold text-white',
                                },
                              },
                              {
                                type: 'text',
                                props: {
                                  value: 'James Clear • Tối ưu thói quen • 320 trang',
                                  className: 'text-sm text-white/70',
                                },
                              },
                              { type: 'rating', props: { value: 4.8, count: 12458 } },
                              {
                                type: 'row',
                                props: { gap: 'sm', className: 'items-center justify-between' },
                                children: [
                                  { type: 'price', props: { value: 189000, oldValue: 249000, currency: 'VND' } },
                                  {
                                    type: 'button',
                                    props: {
                                      variant: 'primary',
                                      label: 'Mua ngay',
                                      action: { type: 'chatkit.books.buy', payload: { bookId: 'atomic_habits' } },
                                    },
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      { type: 'divider', props: { className: 'my-3 border-white/10' } },
                      {
                        type: 'row',
                        props: { gap: 'sm', className: 'flex-wrap' },
                        children: [
                          { type: 'badge', props: { text: 'Bán chạy', tone: 'amber' } },
                          { type: 'badge', props: { text: 'Gợi ý cho bạn', tone: 'emerald' } },
                          { type: 'badge', props: { text: 'Tặng bookmark', tone: 'slate' } },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'card',
                    props: {
                      className: 'flex-1 bg-white/5 ring-1 ring-white/10 shadow-lg',
                      padding: 'md',
                      title: 'Top tuần này',
                      subtitle: 'Danh sách được cập nhật theo xu hướng',
                    },
                    children: [
                      {
                        type: 'book_list',
                        props: {
                          items: [
                            {
                              id: 'b1',
                              title: 'The Psychology of Money',
                              author: 'Morgan Housel',
                              cover:
                                'https://images.unsplash.com/photo-1544717305-996b815c338c?auto=format&fit=crop&w=600&q=60',
                              rating: 4.7,
                              price: 179000,
                              badge: 'HOT',
                            },
                            {
                              id: 'b2',
                              title: 'Deep Work',
                              author: 'Cal Newport',
                              cover:
                                'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=60',
                              rating: 4.6,
                              price: 169000,
                              badge: 'SALE',
                            },
                            {
                              id: 'b3',
                              title: 'Sapiens',
                              author: 'Yuval Noah Harari',
                              cover:
                                'https://images.unsplash.com/photo-1529590003495-b2646e2718bf?auto=format&fit=crop&w=600&q=60',
                              rating: 4.8,
                              price: 229000,
                            },
                          ],
                        },
                      },
                      {
                        type: 'button',
                        props: {
                          variant: 'secondary',
                          size: 'sm',
                          className: 'mt-3 w-full',
                          label: 'Xem tất cả',
                          action: { type: 'chatkit.books.view_all', payload: { list: 'weekly_top' } },
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
}

type Transaction = {
  id: string
  title: string
  subtitle?: string
  amount: number
  time: string
  tone?: 'in' | 'out'
}

const MoneyNode: React.FC<SchemaComponentProps> = ({ node }) => {
  const { value = 0, currency = 'VND', tone = 'light', className } = (node.props ?? {}) as Record<string, any>
  const v = Number(value)
  const textClass = tone === 'dark' ? 'text-slate-900' : 'text-white'
  const subClass = tone === 'dark' ? 'text-slate-500' : 'text-white/60'

  return (
    <div className={twMerge('flex items-baseline gap-2', className)}>
      <div className={twMerge('text-2xl font-semibold tracking-tight', textClass)}>
        {formatCurrency(v, String(currency))}
      </div>
      <div className={twMerge('text-xs font-semibold', subClass)}>{String(currency)}</div>
    </div>
  )
}

const StatCardNode: React.FC<SchemaComponentProps> = ({ node, renderChildren }) => {
  const { title, value, sub, tone = 'slate', className } = (node.props ?? {}) as Record<string, any>
  const toneMap: Record<string, string> = {
    slate: 'from-slate-900/70 to-slate-800/40 ring-white/10',
    indigo: 'from-indigo-900/70 to-indigo-800/40 ring-indigo-400/15',
    emerald: 'from-emerald-900/70 to-emerald-800/40 ring-emerald-400/15',
    amber: 'from-amber-900/70 to-amber-800/40 ring-amber-400/15',
  }

  return (
    <div
      className={twMerge(
        'rounded-[22px] bg-gradient-to-br p-4 text-white shadow-xl ring-1',
        toneMap[String(tone)] ?? toneMap.slate,
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-semibold text-white/60">{title != null ? String(title) : ''}</div>
          <div className="mt-1 text-xl font-semibold tracking-tight text-white">{value != null ? String(value) : ''}</div>
          {sub && <div className="mt-1 text-xs text-white/60">{String(sub)}</div>}
        </div>
        <div className="text-white/60">{renderChildren()}</div>
      </div>
    </div>
  )
}

const TransactionListNode: React.FC<SchemaComponentProps> = ({ node, onAction, conversationId, path }) => {
  const { items = [], className, actionType = 'chatkit.txn.open' } = (node.props ?? {}) as Record<string, any>
  const list = Array.isArray(items) ? (items as Transaction[]) : []

  return (
    <div className={twMerge('flex flex-col gap-2', className)}>
      {list.map((t, idx) => {
        const positive = t.tone === 'in'
        return (
          <button
            key={t.id}
            type="button"
            className="flex items-center gap-3 rounded-2xl bg-white/5 p-3 text-left ring-1 ring-white/10 hover:bg-white/10"
            onClick={() => {
              if (!onAction || !conversationId) return
              onAction({ type: String(actionType), conversationId, payload: { id: t.id, index: idx, path } })
            }}
          >
            <div
              className={twMerge(
                'grid h-10 w-10 place-items-center rounded-2xl ring-1',
                positive ? 'bg-emerald-500/15 ring-emerald-400/20 text-emerald-200' : 'bg-white/10 ring-white/10 text-white/70'
              )}
            >
              {positive ? '↓' : '↑'}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold text-white">{t.title}</div>
              <div className="mt-0.5 flex items-center gap-2 text-xs text-white/60">
                {t.subtitle && <span className="truncate">{t.subtitle}</span>}
                {t.subtitle && <span className="text-white/30">•</span>}
                <span className="shrink-0">{t.time}</span>
              </div>
            </div>
            <div className={twMerge('text-sm font-semibold', positive ? 'text-emerald-200' : 'text-white')}
              >
              {positive ? '+' : '-'}{formatCurrency(Math.abs(t.amount), 'VND')}
            </div>
          </button>
        )
      })}
    </div>
  )
}

export const FintechPlatform_NeoBankDashboard: Story = {
  parameters: { layout: 'fullscreen' },
  render: (args: SchemaRendererProps) => {
    const [lastAction, setLastAction] = React.useState<ChatKitActionEvent | null>(null)

    return (
      <div className="min-h-screen w-full bg-slate-950 p-6">
        <div className="mx-auto w-full max-w-[1024px]">
          <SchemaRenderer
            {...args}
            onAction={(e) => {
              setLastAction(e)
              args.onAction?.(e)
            }}
          />
          {lastAction && (
            <pre className="mt-4 w-full overflow-auto rounded-2xl bg-black/60 p-4 text-xs text-slate-100 ring-1 ring-white/10">
              {JSON.stringify(lastAction, null, 2)}
            </pre>
          )}
        </div>
      </div>
    )
  },
  args: {
    conversationId: 'conv_fintech',
    registry: {
      money: MoneyNode,
      stat_card: StatCardNode,
      txn_list: TransactionListNode,
      badge: BadgeNode,
    },
    nodes: [
      {
        type: 'box',
        props: {
          padding: 'none',
          className:
            'overflow-hidden rounded-[28px] bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 ring-1 ring-white/10 shadow-2xl',
        },
        children: [
          {
            type: 'box',
            props: { padding: 'lg', className: 'text-white' },
            children: [
              {
                type: 'row',
                props: { gap: 'md', className: 'items-start justify-between' },
                children: [
                  {
                    type: 'col',
                    props: { gap: 'sm' },
                    children: [
                      {
                        type: 'text',
                        props: { as: 'h2', value: 'NovaBank', className: 'text-3xl font-semibold tracking-tight text-white' },
                      },
                      {
                        type: 'text',
                        props: { value: 'Dashboard tài chính cá nhân hoá theo hành vi chi tiêu.', className: 'text-sm text-white/70' },
                      },
                    ],
                  },
                  {
                    type: 'row',
                    props: { gap: 'sm', className: 'items-center' },
                    children: [
                      { type: 'badge', props: { text: 'SECURE', tone: 'emerald' } },
                      { type: 'badge', props: { text: 'AI INSIGHTS', tone: 'indigo' } },
                    ],
                  },
                ],
              },
              {
                type: 'card',
                props: {
                  className: 'mt-6 bg-white/5 ring-1 ring-white/10',
                  padding: 'md',
                  title: 'Số dư khả dụng',
                  subtitle: 'Cập nhật realtime • Ẩn/hiện khi cần',
                },
                children: [
                  { type: 'money', props: { value: 24592000, currency: 'VND', tone: 'light', className: 'mt-1' } },
                  {
                    type: 'row',
                    props: { gap: 'sm', className: 'mt-4 flex-wrap' },
                    children: [
                      {
                        type: 'button',
                        props: {
                          variant: 'primary',
                          label: 'Nạp tiền',
                          action: { type: 'chatkit.bank.topup', payload: { source: 'dashboard' } },
                        },
                      },
                      {
                        type: 'button',
                        props: {
                          variant: 'secondary',
                          label: 'Chuyển tiền',
                          action: { type: 'chatkit.bank.transfer', payload: { source: 'dashboard' } },
                        },
                      },
                      {
                        type: 'button',
                        props: {
                          variant: 'ghost',
                          label: 'Thanh toán QR',
                          action: { type: 'chatkit.bank.qr', payload: { source: 'dashboard' } },
                          className: 'text-white/80 hover:text-white',
                        },
                      },
                    ],
                  },
                ],
              },
              {
                type: 'row',
                props: { gap: 'md', className: 'mt-6 items-stretch' },
                children: [
                  {
                    type: 'stat_card',
                    props: { title: 'Chi tiêu tháng', value: '₫ 6.240.000', sub: '↓ 12% so với tháng trước', tone: 'indigo' },
                    children: [{ type: 'text', props: { as: 'span', value: '📊', className: 'text-xl' } }],
                  },
                  {
                    type: 'stat_card',
                    props: { title: 'Tiết kiệm', value: '₫ 1.850.000', sub: 'Mục tiêu: ₫ 5.000.000', tone: 'emerald' },
                    children: [{ type: 'text', props: { as: 'span', value: '🏦', className: 'text-xl' } }],
                  },
                  {
                    type: 'stat_card',
                    props: { title: 'Hoàn tiền', value: '₫ 120.000', sub: 'Từ 8 giao dịch', tone: 'amber' },
                    children: [{ type: 'text', props: { as: 'span', value: '✨', className: 'text-xl' } }],
                  },
                ],
              },
              {
                type: 'card',
                props: {
                  className: 'mt-6 bg-white/5 ring-1 ring-white/10',
                  padding: 'md',
                  title: 'Giao dịch gần đây',
                  subtitle: 'Tap để xem chi tiết',
                },
                children: [
                  {
                    type: 'txn_list',
                    props: {
                      items: [
                        { id: 't1', title: 'Starbucks', subtitle: 'Cà phê', amount: 82000, time: 'Hôm nay 09:12', tone: 'out' },
                        { id: 't2', title: 'Lương', subtitle: 'Cty ABC', amount: 18500000, time: 'Hôm qua 18:00', tone: 'in' },
                        { id: 't3', title: 'Grab', subtitle: 'Di chuyển', amount: 125000, time: 'Hôm qua 08:40', tone: 'out' },
                        { id: 't4', title: 'ShopeePay', subtitle: 'Hoàn tiền', amount: 45000, time: '3 ngày trước', tone: 'in' },
                      ],
                    },
                  },
                  {
                    type: 'button',
                    props: {
                      variant: 'secondary',
                      size: 'sm',
                      className: 'mt-3 w-full',
                      label: 'Xem sao kê',
                      action: { type: 'chatkit.bank.statement', payload: { range: '30d' } },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
}

type Product = {
  id: string
  name: string
  price: number
  oldPrice?: number
  img: string
  badge?: string
}

const ProductCardNode: React.FC<SchemaComponentProps> = ({ node, onAction, conversationId, path }) => {
  const { product, className } = (node.props ?? {}) as Record<string, any>
  const p = product as Product

  return (
    <div className={twMerge('overflow-hidden rounded-3xl bg-white ring-1 ring-slate-200 shadow-sm', className)}>
      <div className="relative">
        <img src={p.img} alt={p.name} className="h-40 w-full object-cover" />
        {p.badge && (
          <div className="absolute left-3 top-3 rounded-full bg-slate-900/90 px-2.5 py-1 text-[11px] font-semibold text-white ring-1 ring-white/10">
            {p.badge}
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="text-sm font-semibold text-slate-900 line-clamp-2">{p.name}</div>
        <div className="mt-2 flex items-end justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-slate-900">{formatCurrency(p.price, 'VND')}</div>
            {p.oldPrice && p.oldPrice > p.price && (
              <div className="text-xs text-slate-500 line-through">{formatCurrency(p.oldPrice, 'VND')}</div>
            )}
          </div>
          <button
            type="button"
            className="rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800"
            onClick={() => {
              if (!onAction || !conversationId) return
              onAction({ type: 'chatkit.shop.add_to_cart', conversationId, payload: { productId: p.id, path } })
            }}
          >
            Thêm
          </button>
        </div>
      </div>
    </div>
  )
}

const CheckoutSummaryNode: React.FC<SchemaComponentProps> = ({ node, onAction, conversationId, path }) => {
  const { subtotal, shipping, discount, total, className } = (node.props ?? {}) as Record<string, any>
  const s = Number(subtotal ?? 0)
  const sh = Number(shipping ?? 0)
  const d = Number(discount ?? 0)
  const t = Number(total ?? s + sh - d)

  return (
    <div className={twMerge('rounded-3xl bg-white p-5 ring-1 ring-slate-200 shadow-sm', className)}>
      <div className="text-sm font-semibold text-slate-900">Tóm tắt đơn hàng</div>
      <div className="mt-3 space-y-2 text-sm">
        <div className="flex items-center justify-between text-slate-600">
          <span>Tạm tính</span>
          <span className="font-semibold text-slate-900">{formatCurrency(s, 'VND')}</span>
        </div>
        <div className="flex items-center justify-between text-slate-600">
          <span>Vận chuyển</span>
          <span className="font-semibold text-slate-900">{formatCurrency(sh, 'VND')}</span>
        </div>
        <div className="flex items-center justify-between text-slate-600">
          <span>Giảm giá</span>
          <span className="font-semibold text-emerald-700">- {formatCurrency(d, 'VND')}</span>
        </div>
        <div className="my-3 h-px bg-slate-200" />
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-900">Tổng</span>
          <span className="text-lg font-semibold text-slate-900">{formatCurrency(t, 'VND')}</span>
        </div>
      </div>
      <button
        type="button"
        className="mt-4 w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        onClick={() => {
          if (!onAction || !conversationId) return
          onAction({ type: 'chatkit.shop.checkout', conversationId, payload: { path } })
        }}
      >
        Thanh toán
      </button>
    </div>
  )
}

export const EcommercePlatform_StorefrontAndCheckout: Story = {
  parameters: { layout: 'fullscreen' },
  render: (args: SchemaRendererProps) => {
    const [lastAction, setLastAction] = React.useState<ChatKitActionEvent | null>(null)
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6">
        <div className="mx-auto w-full max-w-[1024px]">
          <SchemaRenderer
            {...args}
            onAction={(e) => {
              setLastAction(e)
              args.onAction?.(e)
            }}
          />
          {lastAction && (
            <pre className="mt-4 w-full overflow-auto rounded-2xl bg-slate-950 p-4 text-xs text-slate-100">
              {JSON.stringify(lastAction, null, 2)}
            </pre>
          )}
        </div>
      </div>
    )
  },
  args: {
    conversationId: 'conv_shop',
    registry: {
      product_card: ProductCardNode,
      checkout_summary: CheckoutSummaryNode,
    },
    nodes: [
      {
        type: 'box',
        props: { padding: 'none', className: 'rounded-[28px] bg-white ring-1 ring-slate-200 shadow-xl' },
        children: [
          {
            type: 'box',
            props: { padding: 'lg' },
            children: [
              {
                type: 'row',
                props: { gap: 'md', className: 'items-start justify-between' },
                children: [
                  {
                    type: 'col',
                    props: { gap: 'sm' },
                    children: [
                      {
                        type: 'text',
                        props: { as: 'h2', value: 'ShopZero', className: 'text-3xl font-semibold tracking-tight text-slate-900' },
                      },
                      {
                        type: 'text',
                        props: { value: 'Trang chủ + giỏ hàng + checkout trong một schema.', className: 'text-sm text-slate-600' },
                      },
                    ],
                  },
                  {
                    type: 'button',
                    props: {
                      variant: 'secondary',
                      label: 'Giỏ hàng',
                      action: { type: 'chatkit.shop.cart', payload: { source: 'storefront' } },
                    },
                  },
                ],
              },
              {
                type: 'row',
                props: { gap: 'lg', className: 'mt-6 items-start' },
                children: [
                  {
                    type: 'col',
                    props: { gap: 'md', className: 'flex-1' },
                    children: [
                      {
                        type: 'text',
                        props: { as: 'h3', value: 'Sản phẩm nổi bật', className: 'text-lg font-semibold text-slate-900' },
                      },
                      {
                        type: 'row',
                        props: { gap: 'md', className: 'flex-wrap items-stretch' },
                        children: [
                          {
                            type: 'box',
                            props: { padding: 'none', className: 'w-[300px]' },
                            children: [
                              {
                                type: 'product_card',
                                props: {
                                  product: {
                                    id: 'p1',
                                    name: 'Tai nghe chống ồn AirLite Pro',
                                    price: 1299000,
                                    oldPrice: 1599000,
                                    badge: 'SALE',
                                    img: 'https://images.unsplash.com/photo-1518440958178-1f6b69f1d6b7?auto=format&fit=crop&w=1200&q=60',
                                  },
                                },
                              },
                            ],
                          },
                          {
                            type: 'box',
                            props: { padding: 'none', className: 'w-[300px]' },
                            children: [
                              {
                                type: 'product_card',
                                props: {
                                  product: {
                                    id: 'p2',
                                    name: 'Bàn phím cơ Low‑Profile',
                                    price: 990000,
                                    badge: 'HOT',
                                    img: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1200&q=60',
                                  },
                                },
                              },
                            ],
                          },
                          {
                            type: 'box',
                            props: { padding: 'none', className: 'w-[300px]' },
                            children: [
                              {
                                type: 'product_card',
                                props: {
                                  product: {
                                    id: 'p3',
                                    name: 'Bình giữ nhiệt Urban 650ml',
                                    price: 329000,
                                    oldPrice: 399000,
                                    badge: 'NEW',
                                    img: 'https://images.unsplash.com/photo-1526401485004-2aa6b257b3d2?auto=format&fit=crop&w=1200&q=60',
                                  },
                                },
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'box',
                    props: { padding: 'none', className: 'w-[340px]' },
                    children: [
                      {
                        type: 'checkout_summary',
                        props: { subtotal: 2648000, shipping: 30000, discount: 120000, total: 2558000 },
                      },
                      {
                        type: 'button',
                        props: {
                          variant: 'ghost',
                          className: 'mt-3 w-full',
                          label: 'Áp mã giảm giá',
                          action: { type: 'chatkit.shop.apply_coupon', payload: { code: 'NEWYEAR' } },
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
}

type Lesson = {
  id: string
  title: string
  duration: string
  status?: 'done' | 'next' | 'locked'
}

const ProgressNode: React.FC<SchemaComponentProps> = ({ node }) => {
  const { value = 0, label, className } = (node.props ?? {}) as Record<string, any>
  const v = Math.max(0, Math.min(100, Number(value)))

  return (
    <div className={twMerge('w-full', className)}>
      <div className="flex items-center justify-between">
        <div className="text-xs font-semibold text-slate-600">{label != null ? String(label) : 'Tiến độ'}</div>
        <div className="text-xs font-semibold text-slate-900">{v.toFixed(0)}%</div>
      </div>
      <div className="mt-2 h-2 w-full rounded-full bg-slate-200">
        <div className="h-2 rounded-full bg-slate-900" style={{ width: `${v}%` }} />
      </div>
    </div>
  )
}

const LessonListNode: React.FC<SchemaComponentProps> = ({ node, onAction, conversationId, path }) => {
  const { items = [], className, actionType = 'chatkit.lesson.open' } = (node.props ?? {}) as Record<string, any>
  const list = Array.isArray(items) ? (items as Lesson[]) : []

  return (
    <div className={twMerge('flex flex-col gap-2', className)}>
      {list.map((l, idx) => {
        const s = l.status ?? 'next'
        const disabled = s === 'locked'
        const pill =
          s === 'done'
            ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
            : s === 'locked'
              ? 'bg-slate-100 text-slate-500 ring-1 ring-slate-200'
              : 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200'

        return (
          <button
            key={l.id}
            type="button"
            disabled={disabled}
            className={twMerge(
              'flex items-center gap-3 rounded-2xl bg-white p-3 text-left ring-1 ring-slate-200 shadow-sm',
              disabled ? 'opacity-60' : 'hover:shadow-md'
            )}
            onClick={() => {
              if (!onAction || !conversationId) return
              onAction({ type: String(actionType), conversationId, payload: { lessonId: l.id, index: idx, path } })
            }}
          >
            <div className={twMerge('rounded-full px-2.5 py-1 text-[11px] font-semibold', pill)}>
              {s === 'done' ? 'Đã xong' : s === 'locked' ? 'Khoá' : 'Tiếp theo'}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold text-slate-900">{l.title}</div>
              <div className="mt-0.5 text-xs text-slate-500">{l.duration}</div>
            </div>
            <div className="text-slate-400" aria-hidden>
              →
            </div>
          </button>
        )
      })}
    </div>
  )
}

export const EducationPlatform_CourseDashboard: Story = {
  parameters: { layout: 'fullscreen' },
  render: (args: SchemaRendererProps) => {
    const [lastAction, setLastAction] = React.useState<ChatKitActionEvent | null>(null)
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-white via-slate-50 to-white p-6">
        <div className="mx-auto w-full max-w-[1024px]">
          <SchemaRenderer
            {...args}
            onAction={(e) => {
              setLastAction(e)
              args.onAction?.(e)
            }}
          />
          {lastAction && (
            <pre className="mt-4 w-full overflow-auto rounded-2xl bg-slate-950 p-4 text-xs text-slate-100">
              {JSON.stringify(lastAction, null, 2)}
            </pre>
          )}
        </div>
      </div>
    )
  },
  args: {
    conversationId: 'conv_edu',
    registry: {
      progress: ProgressNode,
      lesson_list: LessonListNode,
    },
    nodes: [
      {
        type: 'box',
        props: { padding: 'none', className: 'rounded-[28px] bg-white ring-1 ring-slate-200 shadow-xl' },
        children: [
          {
            type: 'box',
            props: { padding: 'lg' },
            children: [
              {
                type: 'row',
                props: { gap: 'lg', className: 'items-start' },
                children: [
                  {
                    type: 'box',
                    props: { padding: 'none', className: 'w-[360px]' },
                    children: [
                      {
                        type: 'image',
                        props: {
                          src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=60',
                          alt: 'Course',
                          className: 'w-full rounded-[24px]',
                          aspectRatio: '4/3',
                        },
                      },
                    ],
                  },
                  {
                    type: 'col',
                    props: { gap: 'sm', className: 'flex-1' },
                    children: [
                      {
                        type: 'text',
                        props: { as: 'h2', value: 'LearnUI — Thiết kế giao diện thực chiến', className: 'text-3xl font-semibold tracking-tight text-slate-900' },
                      },
                      {
                        type: 'text',
                        props: { value: 'Khoá học dạng module: layout, typography, component system, motion & delivery.', className: 'text-sm text-slate-600' },
                      },
                      { type: 'progress', props: { value: 62, label: 'Tiến độ khoá học', className: 'mt-3' } },
                      {
                        type: 'row',
                        props: { gap: 'sm', className: 'mt-4 flex-wrap' },
                        children: [
                          {
                            type: 'button',
                            props: {
                              variant: 'primary',
                              label: 'Tiếp tục học',
                              action: { type: 'chatkit.course.resume', payload: { courseId: 'learnui' } },
                            },
                          },
                          {
                            type: 'button',
                            props: {
                              variant: 'secondary',
                              label: 'Tải tài liệu',
                              action: { type: 'chatkit.course.download', payload: { courseId: 'learnui' } },
                            },
                          },
                          {
                            type: 'button',
                            props: {
                              variant: 'ghost',
                              label: 'Thảo luận',
                              action: { type: 'chatkit.course.discuss', payload: { courseId: 'learnui' } },
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: 'card',
                props: { className: 'mt-6 bg-slate-50 ring-1 ring-slate-200', padding: 'md', title: 'Danh sách bài học', subtitle: 'Click để mở bài' },
                children: [
                  {
                    type: 'lesson_list',
                    props: {
                      items: [
                        { id: 'l1', title: '1. Layout fundamentals', duration: '12:35', status: 'done' },
                        { id: 'l2', title: '2. Spacing, grid & rhythm', duration: '18:10', status: 'done' },
                        { id: 'l3', title: '3. Component patterns', duration: '22:05', status: 'next' },
                        { id: 'l4', title: '4. Motion & micro‑interaction', duration: '16:40', status: 'locked' },
                        { id: 'l5', title: '5. Handoff & design tokens', duration: '14:20', status: 'locked' },
                      ],
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
}

const HeroNode: React.FC<SchemaComponentProps> = ({ node, renderChildren }) => {
  const { image, title, subtitle, className } = (node.props ?? {}) as Record<string, any>

  return (
    <div className={twMerge('relative overflow-hidden rounded-[28px] ring-1 ring-white/10', className)}>
      <div className="absolute inset-0">
        <img src={String(image)} alt={String(title ?? 'hero')} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
      </div>
      <div className="relative p-8 text-white">
        {title && <div className="text-3xl font-semibold tracking-tight">{String(title)}</div>}
        {subtitle && <div className="mt-2 max-w-[560px] text-sm text-white/75">{String(subtitle)}</div>}
        <div className="mt-6">{renderChildren()}</div>
      </div>
    </div>
  )
}

type Hotel = {
  id: string
  name: string
  city: string
  img: string
  rating: number
  pricePerNight: number
  perks?: string[]
}

const HotelCardNode: React.FC<SchemaComponentProps> = ({ node, onAction, conversationId, path }) => {
  const { hotel, className, actionType = 'chatkit.hotel.open' } = (node.props ?? {}) as Record<string, any>
  const h = hotel as Hotel

  return (
    <button
      type="button"
      className={twMerge(
        'group w-full overflow-hidden rounded-3xl bg-white ring-1 ring-slate-200 shadow-sm transition hover:shadow-md',
        className
      )}
      onClick={() => {
        if (!onAction || !conversationId) return
        onAction({ type: String(actionType), conversationId, payload: { hotelId: h.id, path } })
      }}
    >
      <div className="relative">
        <img src={h.img} alt={h.name} className="h-44 w-full object-cover" />
        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-slate-900 ring-1 ring-white/60">
          ★ {h.rating.toFixed(1)}
        </div>
      </div>
      <div className="p-4 text-left">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-slate-900">{h.name}</div>
            <div className="mt-0.5 truncate text-xs text-slate-500">{h.city}</div>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold text-slate-900">{formatCurrency(h.pricePerNight, 'VND')}</div>
            <div className="text-[11px] text-slate-500">/ đêm</div>
          </div>
        </div>
        {Array.isArray(h.perks) && h.perks.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {h.perks.slice(0, 4).map((p) => (
              <span
                key={p}
                className="rounded-full bg-slate-50 px-2 py-1 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200"
              >
                {p}
              </span>
            ))}
          </div>
        )}
        <div className="mt-3 flex items-center justify-between">
          <div className="text-xs font-semibold text-emerald-700">Miễn phí huỷ</div>
          <div className="text-xs font-semibold text-slate-900 group-hover:translate-x-0.5 transition" aria-hidden>
            Chi tiết →
          </div>
        </div>
      </div>
    </button>
  )
}

export const TravelPlatform_HotelBooking: Story = {
  parameters: { layout: 'fullscreen' },
  render: (args: SchemaRendererProps) => {
    const [lastAction, setLastAction] = React.useState<ChatKitActionEvent | null>(null)
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
        <div className="mx-auto w-full max-w-[1024px]">
          <SchemaRenderer
            {...args}
            onAction={(e) => {
              setLastAction(e)
              args.onAction?.(e)
            }}
          />
          {lastAction && (
            <pre className="mt-4 w-full overflow-auto rounded-2xl bg-black/60 p-4 text-xs text-slate-100 ring-1 ring-white/10">
              {JSON.stringify(lastAction, null, 2)}
            </pre>
          )}
        </div>
      </div>
    )
  },
  args: {
    conversationId: 'conv_travel',
    registry: {
      hero: HeroNode,
      chip: ChipNode,
      searchbar: SearchBarNode,
      hotel_card: HotelCardNode,
      badge: BadgeNode,
    },
    nodes: [
      {
        type: 'col',
        props: { gap: 'lg', className: 'w-full' },
        children: [
          {
            type: 'hero',
            props: {
              image:
                'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=60',
              title: 'Triply',
              subtitle: 'Gợi ý khách sạn theo lịch trình. Tìm nhanh, lọc thông minh, đặt trong 30 giây.',
            },
            children: [
              {
                type: 'searchbar',
                props: {
                  placeholder: 'Tìm thành phố, khách sạn, điểm đến…',
                  actionType: 'chatkit.travel.search',
                  className: 'max-w-[720px]',
                },
              },
              {
                type: 'row',
                props: { gap: 'sm', className: 'mt-4 flex-wrap' },
                children: [
                  { type: 'chip', props: { label: 'Gần trung tâm', active: true, payload: { key: 'center' } } },
                  { type: 'chip', props: { label: '4★ trở lên', payload: { key: '4plus' } } },
                  { type: 'chip', props: { label: 'Có bể bơi', payload: { key: 'pool' } } },
                  { type: 'chip', props: { label: 'Free breakfast', payload: { key: 'breakfast' } } },
                  { type: 'chip', props: { label: 'Work-friendly', payload: { key: 'work' } } },
                ],
              },
              {
                type: 'row',
                props: { gap: 'sm', className: 'mt-5 items-center' },
                children: [
                  { type: 'badge', props: { text: 'DEALS', tone: 'amber' } },
                  { type: 'badge', props: { text: 'AI MATCH', tone: 'indigo' } },
                  { type: 'badge', props: { text: '24/7 SUPPORT', tone: 'emerald' } },
                ],
              },
            ],
          },
          {
            type: 'box',
            props: {
              padding: 'none',
              className:
                'rounded-[28px] bg-white/5 p-6 ring-1 ring-white/10 shadow-2xl backdrop-blur text-white',
            },
            children: [
              {
                type: 'row',
                props: { gap: 'md', className: 'items-end justify-between' },
                children: [
                  {
                    type: 'col',
                    props: { gap: 'sm' },
                    children: [
                      {
                        type: 'text',
                        props: { as: 'h3', value: 'Gợi ý phù hợp', className: 'text-xl font-semibold text-white' },
                      },
                      {
                        type: 'text',
                        props: {
                          value: 'Tối ưu theo ngân sách, tiện nghi và vị trí — click để xem chi tiết/đặt phòng.',
                          className: 'text-sm text-white/70',
                        },
                      },
                    ],
                  },
                  {
                    type: 'button',
                    props: {
                      variant: 'secondary',
                      size: 'sm',
                      label: 'Xem tất cả',
                      action: { type: 'chatkit.travel.view_all', payload: { list: 'recommended' } },
                    },
                  },
                ],
              },
              { type: 'divider', props: { className: 'my-4 border-white/10' } },
              {
                type: 'row',
                props: { gap: 'md', className: 'items-stretch' },
                children: [
                  {
                    type: 'col',
                    props: { gap: 'md', className: 'w-full' },
                    children: [
                      {
                        type: 'hotel_card',
                        props: {
                          hotel: {
                            id: 'h1',
                            name: 'Skyline Riverside',
                            city: 'Đà Nẵng • gần biển',
                            img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=60',
                            rating: 4.9,
                            pricePerNight: 1299000,
                            perks: ['Bể bơi', 'Gym', 'Breakfast', 'View biển'],
                          },
                          className: 'bg-white',
                        },
                      },
                      {
                        type: 'hotel_card',
                        props: {
                          hotel: {
                            id: 'h2',
                            name: 'Old Quarter Boutique',
                            city: 'Hà Nội • trung tâm',
                            img: 'https://images.unsplash.com/photo-1551887373-6c5bd9e46f47?auto=format&fit=crop&w=1200&q=60',
                            rating: 4.7,
                            pricePerNight: 899000,
                            perks: ['Gần phố cổ', 'Wi‑Fi', 'Lễ tân 24/7'],
                          },
                          className: 'bg-white',
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
}

type MenuItem = {
  id: string
  name: string
  desc?: string
  price: number
  img: string
  tag?: string
}

const MenuItemNode: React.FC<SchemaComponentProps> = ({ node, onAction, conversationId, path }) => {
  const { item, actionType = 'chatkit.food.add', className } = (node.props ?? {}) as Record<string, any>
  const it = item as MenuItem

  return (
    <div
      className={twMerge(
        'flex items-center gap-3 rounded-2xl bg-white p-3 ring-1 ring-slate-200 shadow-sm',
        className
      )}
    >
      <img src={it.img} alt={it.name} className="h-16 w-16 rounded-2xl object-cover" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <div className="truncate text-sm font-semibold text-slate-900">{it.name}</div>
          {it.tag && (
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-200">
              {it.tag}
            </span>
          )}
        </div>
        {it.desc && <div className="mt-0.5 line-clamp-2 text-xs text-slate-500">{it.desc}</div>}
        <div className="mt-1 text-sm font-semibold text-slate-900">{formatCurrency(it.price, 'VND')}</div>
      </div>
      <button
        type="button"
        className="rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800"
        onClick={() => {
          if (!onAction || !conversationId) return
          onAction({ type: String(actionType), conversationId, payload: { id: it.id, path } })
        }}
      >
        Thêm
      </button>
    </div>
  )
}

const RestaurantCardNode: React.FC<SchemaComponentProps> = ({ node, onAction, conversationId, path }) => {
  const { name, img, rating, eta, distance, tag, actionType = 'chatkit.restaurant.open', payload, className } =
    (node.props ?? {}) as Record<string, any>

  return (
    <button
      type="button"
      className={twMerge(
        'group w-full overflow-hidden rounded-3xl bg-white ring-1 ring-slate-200 shadow-sm transition hover:shadow-md',
        className
      )}
      onClick={() => {
        if (!onAction || !conversationId) return
        onAction({ type: String(actionType), conversationId, payload: { ...(payload ?? {}), path } })
      }}
    >
      <div className="relative">
        <img src={String(img)} alt={String(name)} className="h-44 w-full object-cover" />
        <div className="absolute left-3 top-3">
          <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-slate-900 ring-1 ring-white/60">
            {tag != null ? String(tag) : 'Gợi ý'}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <div className="rounded-2xl bg-black/55 px-3 py-2 text-left text-xs text-white ring-1 ring-white/10 backdrop-blur">
            <div className="text-sm font-semibold">{name != null ? String(name) : ''}</div>
            <div className="mt-0.5 flex items-center gap-2 text-white/80">
              <span className="font-semibold text-amber-200">★ {Number(rating ?? 0).toFixed(1)}</span>
              <span className="text-white/40">•</span>
              <span>{eta != null ? String(eta) : ''}</span>
              <span className="text-white/40">•</span>
              <span>{distance != null ? String(distance) : ''}</span>
            </div>
          </div>
          <div className="rounded-2xl bg-white/90 px-3 py-2 text-xs font-semibold text-slate-900 ring-1 ring-white/60">
            Xem menu →
          </div>
        </div>
      </div>
    </button>
  )
}

export const RestaurantPlatform_DiscoveryAndMenu: Story = {
  parameters: { layout: 'fullscreen' },
  render: (args: SchemaRendererProps) => {
    const [lastAction, setLastAction] = React.useState<ChatKitActionEvent | null>(null)

    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-emerald-50 p-6">
        <div className="mx-auto w-full max-w-[1024px]">
          <SchemaRenderer
            {...args}
            onAction={(e) => {
              setLastAction(e)
              args.onAction?.(e)
            }}
          />
          {lastAction && (
            <pre className="mt-4 w-full overflow-auto rounded-2xl bg-slate-950 p-4 text-xs text-slate-100">
              {JSON.stringify(lastAction, null, 2)}
            </pre>
          )}
        </div>
      </div>
    )
  },
  args: {
    conversationId: 'conv_food',
    registry: {
      restaurant_card: RestaurantCardNode,
      menu_item: MenuItemNode,
    },
    nodes: [
      {
        type: 'box',
        props: {
          padding: 'none',
          className: 'overflow-hidden rounded-[28px] bg-white ring-1 ring-slate-200 shadow-xl',
        },
        children: [
          {
            type: 'box',
            props: { padding: 'lg' },
            children: [
              {
                type: 'row',
                props: { gap: 'md', className: 'items-start justify-between' },
                children: [
                  {
                    type: 'col',
                    props: { gap: 'sm' },
                    children: [
                      {
                        type: 'text',
                        props: {
                          as: 'h2',
                          value: 'Foodie',
                          className: 'text-3xl font-semibold tracking-tight text-slate-900',
                        },
                      },
                      {
                        type: 'text',
                        props: {
                          value: 'Đặt món nhanh, theo dõi đơn hàng, ưu đãi theo vị trí.',
                          className: 'max-w-[560px] text-sm text-slate-600',
                        },
                      },
                    ],
                  },
                  {
                    type: 'button',
                    props: {
                      variant: 'secondary',
                      label: 'Đổi địa chỉ',
                      action: { type: 'chatkit.location.change', payload: { source: 'foodie' } },
                    },
                  },
                ],
              },
              {
                type: 'row',
                props: { gap: 'lg', className: 'mt-6 items-start' },
                children: [
                  {
                    type: 'col',
                    props: { gap: 'md', className: 'w-[520px]' },
                    children: [
                      {
                        type: 'text',
                        props: { as: 'h3', value: 'Quán gần bạn', className: 'text-lg font-semibold text-slate-900' },
                      },
                      {
                        type: 'restaurant_card',
                        props: {
                          name: 'Mì Ramen Osaka',
                          img: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=60',
                          rating: 4.8,
                          eta: '20-30 phút',
                          distance: '1.2km',
                          tag: 'Free ship',
                          payload: { restaurantId: 'osaka_ramen' },
                        },
                      },
                      {
                        type: 'restaurant_card',
                        props: {
                          name: 'Bún bò Huế 24/7',
                          img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=60',
                          rating: 4.6,
                          eta: '15-25 phút',
                          distance: '0.8km',
                          tag: 'Giảm 25%',
                          payload: { restaurantId: 'bunbo_247' },
                        },
                      },
                    ],
                  },
                  {
                    type: 'card',
                    props: {
                      className: 'flex-1 bg-slate-50 ring-1 ring-slate-200',
                      padding: 'md',
                      title: 'Gợi ý menu hôm nay',
                      subtitle: 'Món bán chạy, thêm vào giỏ trong 1 click',
                    },
                    children: [
                      {
                        type: 'col',
                        props: { gap: 'sm' },
                        children: [
                          {
                            type: 'menu_item',
                            props: {
                              item: {
                                id: 'm1',
                                name: 'Ramen Shoyu',
                                desc: 'Nước dùng xương hầm 12 giờ, trứng lòng đào, chashu.',
                                price: 79000,
                                img: 'https://images.unsplash.com/photo-1604908554027-9a6d8dcee9c1?auto=format&fit=crop&w=600&q=60',
                                tag: 'Best seller',
                              },
                            },
                          },
                          {
                            type: 'menu_item',
                            props: {
                              item: {
                                id: 'm2',
                                name: 'Gyoza',
                                desc: 'Bánh xếp chiên giòn, nhân thịt và rau củ, chấm sốt ponzu.',
                                price: 39000,
                                img: 'https://images.unsplash.com/photo-1604908176997-125f25cc5009?auto=format&fit=crop&w=600&q=60',
                                tag: 'Combo',
                              },
                            },
                          },
                          {
                            type: 'menu_item',
                            props: {
                              item: {
                                id: 'm3',
                                name: 'Trà đào cam sả',
                                desc: 'Thơm mát, ít đường, topping đào.',
                                price: 29000,
                                img: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&q=60',
                              },
                            },
                          },
                          {
                            type: 'button',
                            props: {
                              variant: 'primary',
                              fullWidth: true,
                              label: 'Đi tới giỏ hàng',
                              action: { type: 'chatkit.cart.open', payload: { source: 'foodie' } },
                              className: 'mt-2',
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
}

type Doctor = {
  id: string
  name: string
  specialty: string
  avatar: string
  rating: number
  location: string
  slots: string[]
}

const AvatarNode: React.FC<SchemaComponentProps> = ({ node }) => {
  const { src, alt, size = 44, className } = (node.props ?? {}) as Record<string, any>
  const s = Number(size)
  const px = Number.isFinite(s) ? s : 44

  return (
    <img
      src={String(src)}
      alt={alt != null ? String(alt) : ''}
      style={{ width: px, height: px }}
      className={twMerge('rounded-full object-cover ring-1 ring-white/10', className)}
    />
  )
}

const DoctorCardNode: React.FC<SchemaComponentProps> = ({ node, onAction, conversationId, path }) => {
  const {
    doctor,
    className,
    openActionType = 'chatkit.health.doctor.open',
    bookActionType = 'chatkit.health.book',
  } = (node.props ?? {}) as Record<string, any>

  const d = doctor as Doctor
  const [selected, setSelected] = React.useState<string | null>(null)

  return (
    <div
      className={twMerge(
        'rounded-3xl bg-white/10 p-4 text-white ring-1 ring-white/10 backdrop-blur shadow-2xl',
        className
      )}
    >
      <div className="flex items-start gap-4">
        <img src={d.avatar} alt={d.name} className="h-14 w-14 rounded-2xl object-cover ring-1 ring-white/10" />
        <div className="min-w-0 flex-1">
          <button
            type="button"
            className="text-left"
            onClick={() => {
              if (!onAction || !conversationId) return
              onAction({ type: String(openActionType), conversationId, payload: { doctorId: d.id, path } })
            }}
          >
            <div className="truncate text-sm font-semibold text-white">{d.name}</div>
            <div className="mt-0.5 truncate text-xs text-white/65">
              {d.specialty} • {d.location}
            </div>
          </button>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs font-semibold text-amber-200">★ {d.rating.toFixed(1)}</span>
            <span className="text-xs text-white/35">•</span>
            <span className="text-xs text-white/65">Tư vấn video / tại phòng khám</span>
          </div>
        </div>
        <button
          type="button"
          className="rounded-2xl bg-white/10 px-3 py-2 text-xs font-semibold text-white ring-1 ring-white/10 hover:bg-white/15"
          onClick={() => {
            if (!onAction || !conversationId) return
            onAction({ type: 'chatkit.health.chat', conversationId, payload: { doctorId: d.id, path } })
          }}
        >
          Nhắn
        </button>
      </div>

      <div className="mt-4">
        <div className="text-xs font-semibold text-white/60">Khung giờ sớm nhất</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {d.slots.map((s) => {
            const active = selected === s
            return (
              <button
                key={s}
                type="button"
                className={twMerge(
                  'rounded-full px-3 py-1.5 text-xs font-semibold ring-1 transition',
                  active
                    ? 'bg-white text-slate-900 ring-white/20'
                    : 'bg-white/10 text-white/80 ring-white/10 hover:bg-white/15'
                )}
                onClick={() => {
                  setSelected(s)
                  if (!onAction || !conversationId) return
                  onAction({
                    type: String(bookActionType),
                    conversationId,
                    payload: { doctorId: d.id, slot: s, path },
                  })
                }}
              >
                {s}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export const HealthcarePlatform_ClinicBooking: Story = {
  parameters: { layout: 'fullscreen' },
  render: (args: SchemaRendererProps) => {
    const [lastAction, setLastAction] = React.useState<ChatKitActionEvent | null>(null)
    return (
      <div className="min-h-screen w-full bg-slate-950 p-6">
        <div className="mx-auto w-full max-w-[1024px]">
          <SchemaRenderer
            {...args}
            onAction={(e) => {
              setLastAction(e)
              args.onAction?.(e)
            }}
          />
          {lastAction && (
            <pre className="mt-4 w-full overflow-auto rounded-2xl bg-black/60 p-4 text-xs text-slate-100 ring-1 ring-white/10">
              {JSON.stringify(lastAction, null, 2)}
            </pre>
          )}
        </div>
      </div>
    )
  },
  args: {
    conversationId: 'conv_health',
    registry: {
      badge: BadgeNode,
      searchbar: SearchBarNode,
      chip: ChipNode,
      doctor_card: DoctorCardNode,
      avatar: AvatarNode,
    },
    nodes: [
      {
        type: 'box',
        props: {
          padding: 'none',
          className:
            'overflow-hidden rounded-[28px] bg-gradient-to-br from-slate-950 via-emerald-950/30 to-slate-950 ring-1 ring-white/10 shadow-2xl',
        },
        children: [
          {
            type: 'box',
            props: { padding: 'lg', className: 'text-white' },
            children: [
              {
                type: 'row',
                props: { gap: 'md', className: 'items-start justify-between' },
                children: [
                  {
                    type: 'col',
                    props: { gap: 'sm' },
                    children: [
                      {
                        type: 'text',
                        props: { as: 'h2', value: 'MediFlow', className: 'text-3xl font-semibold tracking-tight text-white' },
                      },
                      {
                        type: 'text',
                        props: {
                          value: 'Đặt lịch khám nhanh — lựa chọn bác sĩ phù hợp và khung giờ trống ngay lập tức.',
                          className: 'max-w-[680px] text-sm text-white/70',
                        },
                      },
                    ],
                  },
                  {
                    type: 'row',
                    props: { gap: 'sm', className: 'items-center' },
                    children: [
                      { type: 'badge', props: { text: 'VERIFIED', tone: 'emerald' } },
                      { type: 'badge', props: { text: 'AI TRIAGE', tone: 'indigo' } },
                    ],
                  },
                ],
              },
              {
                type: 'searchbar',
                props: {
                  placeholder: 'Tìm triệu chứng, khoa, bác sĩ…',
                  actionType: 'chatkit.health.search',
                  className: 'mt-5 max-w-[720px]',
                },
              },
              {
                type: 'row',
                props: { gap: 'sm', className: 'mt-4 flex-wrap' },
                children: [
                  { type: 'chip', props: { label: 'Tổng quát', active: true, payload: { key: 'general' } } },
                  { type: 'chip', props: { label: 'Da liễu', payload: { key: 'derma' } } },
                  { type: 'chip', props: { label: 'Nhi khoa', payload: { key: 'pediatrics' } } },
                  { type: 'chip', props: { label: 'Tim mạch', payload: { key: 'cardio' } } },
                  { type: 'chip', props: { label: 'Tai mũi họng', payload: { key: 'ent' } } },
                ],
              },
              {
                type: 'row',
                props: { gap: 'lg', className: 'mt-6 items-start' },
                children: [
                  {
                    type: 'col',
                    props: { gap: 'md', className: 'w-[560px]' },
                    children: [
                      { type: 'text', props: { as: 'h3', value: 'Bác sĩ được đề xuất', className: 'text-lg font-semibold text-white' } },
                      {
                        type: 'doctor_card',
                        props: {
                          doctor: {
                            id: 'd1',
                            name: 'BS. Nguyễn Minh Tâm',
                            specialty: 'Nội tổng quát',
                            avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=60',
                            rating: 4.9,
                            location: 'Quận 1, TP.HCM',
                            slots: ['09:30', '10:00', '10:30', '11:00'],
                          },
                        },
                      },
                      {
                        type: 'doctor_card',
                        props: {
                          doctor: {
                            id: 'd2',
                            name: 'BS. Trần Thuỳ Linh',
                            specialty: 'Da liễu',
                            avatar: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=600&q=60',
                            rating: 4.8,
                            location: 'Thủ Đức, TP.HCM',
                            slots: ['14:00', '14:30', '15:00', '16:00'],
                          },
                        },
                      },
                    ],
                  },
                  {
                    type: 'card',
                    props: {
                      className: 'flex-1 bg-white/5 ring-1 ring-white/10',
                      padding: 'md',
                      title: 'Bảo hiểm & hồ sơ',
                      subtitle: 'Xác thực nhanh để rút ngắn thủ tục',
                    },
                    children: [
                      {
                        type: 'row',
                        props: { gap: 'md', className: 'items-center' },
                        children: [
                          { type: 'avatar', props: { src: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=600&q=60', size: 56 } },
                          {
                            type: 'col',
                            props: { gap: 'sm', className: 'flex-1' },
                            children: [
                              { type: 'text', props: { value: 'Nguyễn Hải Anh', className: 'text-sm font-semibold text-white' } },
                              { type: 'text', props: { value: 'BH: Premium Care • Hiệu lực đến 12/2026', className: 'text-xs text-white/65' } },
                            ],
                          },
                        ],
                      },
                      { type: 'divider', props: { className: 'my-4 border-white/10' } },
                      { type: 'button', props: { variant: 'primary', fullWidth: true, label: 'Tạo hồ sơ khám', action: { type: 'chatkit.health.profile.create', payload: { source: 'clinic_booking' } } } },
                      { type: 'button', props: { variant: 'secondary', fullWidth: true, className: 'mt-2', label: 'Chụp ảnh thẻ BH', action: { type: 'chatkit.health.insurance.scan', payload: { source: 'clinic_booking' } } } },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
}

type Post = {
  id: string
  author: string
  avatar: string
  time: string
  content: string
  image?: string
  likes: number
  comments: number
}

const PostCardNode: React.FC<SchemaComponentProps> = ({ node, onAction, conversationId, path }) => {
  const { post, className } = (node.props ?? {}) as Record<string, any>
  const p = post as Post
  const [liked, setLiked] = React.useState(false)
  const [likes, setLikes] = React.useState(Number(p.likes ?? 0))

  return (
    <div className={twMerge('overflow-hidden rounded-3xl bg-white ring-1 ring-slate-200 shadow-sm', className)}>
      <div className="p-4">
        <div className="flex items-center gap-3">
          <img src={p.avatar} alt={p.author} className="h-10 w-10 rounded-full object-cover" />
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold text-slate-900">{p.author}</div>
            <div className="text-xs text-slate-500">{p.time}</div>
          </div>
          <button
            type="button"
            className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200"
            onClick={() => {
              if (!onAction || !conversationId) return
              onAction({ type: 'chatkit.social.more', conversationId, payload: { postId: p.id, path } })
            }}
          >
            •••
          </button>
        </div>
        <div className="mt-3 text-sm text-slate-700">{p.content}</div>
      </div>
      {p.image && <img src={p.image} alt="post" className="h-64 w-full object-cover" />}
      <div className="p-4">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>{likes} lượt thích</span>
          <span>{p.comments} bình luận</span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <button
            type="button"
            className={twMerge(
              'rounded-2xl px-3 py-2 text-xs font-semibold ring-1 transition',
              liked ? 'bg-slate-900 text-white ring-slate-900' : 'bg-white text-slate-900 ring-slate-200 hover:bg-slate-50'
            )}
            onClick={() => {
              const nextLiked = !liked
              setLiked(nextLiked)
              setLikes((v) => v + (nextLiked ? 1 : -1))
              if (!onAction || !conversationId) return
              onAction({ type: 'chatkit.social.like', conversationId, payload: { postId: p.id, liked: nextLiked, path } })
            }}
          >
            Thích
          </button>
          <button
            type="button"
            className="rounded-2xl bg-white px-3 py-2 text-xs font-semibold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50"
            onClick={() => {
              if (!onAction || !conversationId) return
              onAction({ type: 'chatkit.social.comment', conversationId, payload: { postId: p.id, path } })
            }}
          >
            Bình luận
          </button>
          <button
            type="button"
            className="rounded-2xl bg-white px-3 py-2 text-xs font-semibold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50"
            onClick={() => {
              if (!onAction || !conversationId) return
              onAction({ type: 'chatkit.social.share', conversationId, payload: { postId: p.id, path } })
            }}
          >
            Chia sẻ
          </button>
        </div>
      </div>
    </div>
  )
}

export const SocialPlatform_ProfileAndFeed: Story = {
  parameters: { layout: 'fullscreen' },
  render: (args: SchemaRendererProps) => {
    const [lastAction, setLastAction] = React.useState<ChatKitActionEvent | null>(null)
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6">
        <div className="mx-auto w-full max-w-[1024px]">
          <SchemaRenderer
            {...args}
            onAction={(e) => {
              setLastAction(e)
              args.onAction?.(e)
            }}
          />
          {lastAction && (
            <pre className="mt-4 w-full overflow-auto rounded-2xl bg-slate-950 p-4 text-xs text-slate-100">
              {JSON.stringify(lastAction, null, 2)}
            </pre>
          )}
        </div>
      </div>
    )
  },
  args: {
    conversationId: 'conv_social',
    registry: {
      post_card: PostCardNode,
    },
    nodes: [
      {
        type: 'box',
        props: { padding: 'none', className: 'overflow-hidden rounded-[28px] bg-white ring-1 ring-slate-200 shadow-xl' },
        children: [
          {
            type: 'image',
            props: {
              src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=60',
              alt: 'cover',
              className: 'h-[220px] w-full rounded-none object-cover',
            },
          },
          {
            type: 'box',
            props: { padding: 'lg' },
            children: [
              {
                type: 'row',
                props: { gap: 'lg', className: 'items-start' },
                children: [
                  {
                    type: 'image',
                    props: {
                      src: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=600&q=60',
                      alt: 'avatar',
                      className: '-mt-16 h-[96px] w-[96px] rounded-3xl ring-2 ring-white object-cover',
                      objectFit: 'cover',
                    },
                  },
                  {
                    type: 'col',
                    props: { gap: 'sm', className: 'flex-1' },
                    children: [
                      {
                        type: 'row',
                        props: { gap: 'md', className: 'items-start justify-between' },
                        children: [
                          {
                            type: 'col',
                            props: { gap: 'sm' },
                            children: [
                              { type: 'text', props: { as: 'h2', value: 'Hải Anh', className: 'text-2xl font-semibold text-slate-900' } },
                              { type: 'text', props: { value: 'Product Builder • UI/UX • SDK', className: 'text-sm text-slate-600' } },
                            ],
                          },
                          {
                            type: 'row',
                            props: { gap: 'sm', className: 'items-center' },
                            children: [
                              { type: 'button', props: { variant: 'primary', label: 'Theo dõi', action: { type: 'chatkit.social.follow', payload: { userId: 'hai_anh' } } } },
                              { type: 'button', props: { variant: 'secondary', label: 'Nhắn tin', action: { type: 'chatkit.social.message', payload: { userId: 'hai_anh' } } } },
                            ],
                          },
                        ],
                      },
                      {
                        type: 'row',
                        props: { gap: 'lg', className: 'mt-2 flex-wrap' },
                        children: [
                          { type: 'text', props: { value: '2.1k Followers', className: 'text-sm font-semibold text-slate-900' } },
                          { type: 'text', props: { value: '186 Following', className: 'text-sm font-semibold text-slate-900' } },
                          { type: 'text', props: { value: '48 Posts', className: 'text-sm font-semibold text-slate-900' } },
                        ],
                      },
                    ],
                  },
                ],
              },
              { type: 'divider', props: { className: 'my-6' } },
              {
                type: 'row',
                props: { gap: 'lg', className: 'items-start' },
                children: [
                  {
                    type: 'col',
                    props: { gap: 'md', className: 'flex-1' },
                    children: [
                      { type: 'text', props: { as: 'h3', value: 'Bảng tin', className: 'text-lg font-semibold text-slate-900' } },
                      { type: 'post_card', props: { post: { id: 'p1', author: 'Hải Anh', avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=600&q=60', time: '2 giờ trước', content: 'Hôm nay mình hoàn thiện thêm nhiều story đẹp cho SchemaRenderer. Cảm giác như đang build mini-app chỉ từ JSON schema.', likes: 128, comments: 24 } } },
                      { type: 'post_card', props: { post: { id: 'p2', author: 'Hải Anh', avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=600&q=60', time: 'Hôm qua', content: 'Một UI tốt không chỉ đẹp mà còn phải có state/action rõ ràng — schema-first rất hợp để demo điều đó.', image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=60', likes: 342, comments: 51 } } },
                    ],
                  },
                  {
                    type: 'card',
                    props: { className: 'w-[320px] bg-slate-50 ring-1 ring-slate-200', padding: 'md', title: 'Gợi ý kết nối', subtitle: 'Tài khoản tương tự' },
                    children: [
                      { type: 'col', props: { gap: 'sm' }, children: [
                        { type: 'text', props: { value: 'Bạn có thể wiring action để follow/messaging.', className: 'text-sm text-slate-600' } },
                        { type: 'button', props: { variant: 'secondary', fullWidth: true, label: 'Khám phá', action: { type: 'chatkit.social.discover', payload: { source: 'sidebar' } } } },
                      ] },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
}
