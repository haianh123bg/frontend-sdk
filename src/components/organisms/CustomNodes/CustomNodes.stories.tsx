/**
 * CustomNodes Stories
 * Demo SchemaRenderer với Custom Components được load từ Backend/CDN
 */

import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { SchemaRenderer, type SchemaRendererProps } from '../ChatKit/SchemaRenderer'
import type { ChatKitActionEvent } from '../ChatKit/contracts'
import type { UIComponent } from '../ChatKit/types'
import {
  useCustomComponents,
  CustomNodeProvider,
  setupMockAPI,
  CdnCounter,
  CdnUserCard,
  CdnStatCard,
  CdnBadge,
  CdnRating,
  CdnChip,
  CdnProgress,
} from './index'

const meta: Meta<typeof SchemaRenderer> = {
  title: 'Organisms/CustomNodes/CustomNodes',
  component: SchemaRenderer,
  parameters: { layout: 'fullscreen' },
}

export default meta

type Story = StoryObj<typeof SchemaRenderer>

// ===================================================================
// Demo Nodes
// ===================================================================

const demoNodes: UIComponent[] = [
  {
    type: 'card',
    props: {
      title: 'Custom Components Demo',
      subtitle: 'Các component dưới đây được load từ Backend API',
      padding: 'md',
    },
    children: [
      // Badges showcase
      {
        type: 'col',
        props: { gap: 'sm' },
        children: [
          { type: 'text', props: { value: 'Badges với các tone colors:' } },
          {
            type: 'row',
            props: { gap: 'sm' },
            children: [
              { type: 'cdn_badge', props: { text: 'NEW', tone: 'emerald' } },
              { type: 'cdn_badge', props: { text: 'PRO', tone: 'indigo' } },
              { type: 'cdn_badge', props: { text: 'SALE', tone: 'rose' } },
              { type: 'cdn_badge', props: { text: 'BETA', tone: 'amber' } },
            ],
          },
        ],
      },
      { type: 'divider' },
      // Rating
      {
        type: 'row',
        props: { gap: 'md', className: 'items-center' },
        children: [
          { type: 'cdn_rating', props: { value: 4.5, count: 1234 } },
          { type: 'cdn_rating', props: { value: 5, count: 89 } },
          { type: 'cdn_rating', props: { value: 3.7 } },
        ],
      },
      { type: 'divider' },
      // Chips
      {
        type: 'col',
        props: { gap: 'sm' },
        children: [
          { type: 'text', props: { value: 'Filter Chips:' } },
          {
            type: 'row',
            props: { gap: 'sm', className: 'flex-wrap' },
            children: [
              { type: 'cdn_chip', props: { label: 'Tất cả', active: true } },
              { type: 'cdn_chip', props: { label: 'Đang bán' } },
              { type: 'cdn_chip', props: { label: 'Hết hàng' } },
              { type: 'cdn_chip', props: { label: 'Khuyến mãi' } },
            ],
          },
        ],
      },
      { type: 'divider' },
      // Progress bars
      {
        type: 'col',
        props: { gap: 'sm' },
        children: [
          { type: 'cdn_progress', props: { value: 75, label: 'Tiến độ dự án' } },
          { type: 'cdn_progress', props: { value: 45, max: 200, label: 'Điểm thưởng', color: 'success' } },
          { type: 'cdn_progress', props: { value: 90, label: 'Hoàn thành', color: 'warning' } },
        ],
      },
      { type: 'divider' },
      // Stat cards
      {
        type: 'cdn_stat_card',
        props: {
          title: 'Total Users',
          value: '12,345',
          change: '+12.5%',
          changeType: 'positive',
          icon: '👥',
          size: 'lg',
        },
      },
      { type: 'divider' },
      // Counter
      {
        type: 'cdn_counter',
        props: {
          initial: 42,
          label: 'Increment',
          step: 5,
          variant: 'primary',
        },
      },
      { type: 'divider' },
      // User cards
      {
        type: 'cdn_user_card',
        props: {
          user: {
            id: 'user-1',
            name: 'Nguyễn Văn A',
            email: 'nguyenvana@example.com',
            role: 'Developer',
            status: 'online',
          },
        },
      },
      {
        type: 'cdn_user_card',
        props: {
          user: {
            id: 'user-2',
            name: 'Trần Thị B',
            email: 'tranthib@example.com',
            role: 'Designer',
            status: 'away',
          },
          showEmail: false,
        },
      },
    ],
  },
]

// ===================================================================
// STORY 1: Basic với Hook
// ===================================================================

export const WithHook: Story = {
  render: (args: SchemaRendererProps) => {
    const { registry, loading, error, reload } = useCustomComponents({
      apiEndpoint: '/api/custom-nodes',
      autoLoad: true,
    })

    const [lastAction, setLastAction] = React.useState<ChatKitActionEvent | null>(null)

    if (loading) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
          <div className="text-center">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900 mx-auto" />
            <div className="text-slate-600">Loading custom components...</div>
          </div>
        </div>
      )
    }

    if (error) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-8">
          <div className="max-w-md text-center">
            <div className="mb-4 text-6xl">⚠️</div>
            <h3 className="mb-2 text-xl font-semibold text-slate-900">
              Failed to load custom components
            </h3>
            <p className="mb-4 text-slate-600">{error.message}</p>
            <button
              onClick={reload}
              className="rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-800"
            >
              Retry
            </button>
          </div>
        </div>
      )
    }

    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">
                SchemaRenderer với Custom Components (Hook)
              </h2>
              <p className="mt-1 text-slate-600">
                Components được load từ Backend API thông qua useCustomComponents hook
              </p>
            </div>
            <button
              onClick={reload}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Reload
            </button>
          </div>

          <SchemaRenderer
            {...args}
            registry={registry}
            onAction={(e) => {
              setLastAction(e)
              args.onAction?.(e)
            }}
          />

          {lastAction && (
            <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4">
              <div className="mb-2 text-sm font-medium text-slate-700">Last Action:</div>
              <pre className="overflow-auto rounded-lg bg-slate-950 p-3 text-xs text-slate-100">
                {JSON.stringify(lastAction, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    )
  },
  args: {
    conversationId: 'conv_custom_nodes',
    nodes: demoNodes,
  },
}

// ===================================================================
// STORY 2: Với Provider Context
// ===================================================================

export const WithProvider: Story = {
  render: (args: SchemaRendererProps) => {
    const [lastAction, setLastAction] = React.useState<ChatKitActionEvent | null>(null)

    return (
      <CustomNodeProvider
        apiEndpoint="/api/custom-nodes"
        autoLoad
        loadingFallback={
          <div className="flex min-h-screen items-center justify-center bg-slate-50">
            <div className="text-center">
              <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900 mx-auto" />
              <div className="text-slate-600">Loading custom components...</div>
            </div>
          </div>
        }
        errorFallback={
          <div className="flex min-h-screen items-center justify-center bg-slate-50 p-8">
            <div className="max-w-md text-center">
              <div className="mb-4 text-6xl">⚠️</div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900">
                Failed to load custom components
              </h3>
            </div>
          </div>
        }
      >
        <CustomNodesDemo args={args} lastAction={lastAction} setLastAction={setLastAction} />
      </CustomNodeProvider>
    )
  },
  args: {
    conversationId: 'conv_provider',
    nodes: demoNodes,
  },
}

// Component con để sử dụng context
function CustomNodesDemo({
  args,
  lastAction,
  setLastAction,
}: {
  args: SchemaRendererProps
  lastAction: ChatKitActionEvent | null
  setLastAction: (action: ChatKitActionEvent | null) => void
}) {
  const { registry, loading, error, reload } = useCustomComponents()

  if (loading || error) {
    return null // Fallback được render bởi Provider
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              SchemaRenderer với CustomNodeProvider
            </h2>
            <p className="mt-1 text-slate-600">
              Components được chia sẻ qua Context API
            </p>
          </div>
          <button
            onClick={reload}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Reload
          </button>
        </div>

        <SchemaRenderer
          {...args}
          registry={registry}
          onAction={(e) => {
            setLastAction(e)
            args.onAction?.(e)
          }}
        />

        {lastAction && (
          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4">
            <div className="mb-2 text-sm font-medium text-slate-700">Last Action:</div>
            <pre className="overflow-auto rounded-lg bg-slate-950 p-3 text-xs text-slate-100">
              {JSON.stringify(lastAction, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}

// ===================================================================
// STORY 3: Local Registry (Mocking CDN)
// ===================================================================

export const LocalRegistry: Story = {
  render: (args: SchemaRendererProps) => {
    const [lastAction, setLastAction] = React.useState<ChatKitActionEvent | null>(null)

    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-slate-900">
              Local Registry (Mocking CDN)
            </h2>
            <p className="mt-1 text-slate-600">
              Components được import trực tiếp thay vì load từ CDN
            </p>
          </div>

          <SchemaRenderer
            {...args}
            registry={{
              cdn_counter: CdnCounter,
              cdn_user_card: CdnUserCard,
              cdn_stat_card: CdnStatCard,
              cdn_badge: CdnBadge,
              cdn_rating: CdnRating,
              cdn_chip: CdnChip,
              cdn_progress: CdnProgress,
            }}
            onAction={(e) => {
              setLastAction(e)
              args.onAction?.(e)
            }}
          />

          {lastAction && (
            <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4">
              <div className="mb-2 text-sm font-medium text-slate-700">Last Action:</div>
              <pre className="overflow-auto rounded-lg bg-slate-950 p-3 text-xs text-slate-100">
                {JSON.stringify(lastAction, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    )
  },
  args: {
    conversationId: 'conv_local',
    nodes: demoNodes,
  },
}

// ===================================================================
// STORY 4: Error Handling Demo
// ===================================================================

export const ErrorHandling: Story = {
  render: (args: SchemaRendererProps) => {
    const { registry, loading, error, reload } = useCustomComponents({
      apiEndpoint: '/api/custom-nodes-invalid', // Invalid endpoint
      autoLoad: true,
    })

    const [lastAction, setLastAction] = React.useState<ChatKitActionEvent | null>(null)

    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-slate-900">Error Handling Demo</h2>
            <p className="mt-1 text-slate-600">
              Test error handling khi API endpoint không hợp lệ
            </p>
          </div>

          {loading && (
            <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-white p-8">
              <div className="text-center">
                <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900 mx-auto" />
                <div className="text-slate-600">Loading...</div>
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-6">
              <div className="mb-4 flex items-start gap-3">
                <span className="text-2xl">⚠️</span>
                <div>
                  <h3 className="font-semibold text-rose-900">Error Loading Components</h3>
                  <p className="mt-1 text-sm text-rose-700">{error.message}</p>
                </div>
              </div>
              <button
                onClick={reload}
                className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700"
              >
                Retry
              </button>
            </div>
          )}

          {!loading && !error && (
            <>
              <SchemaRenderer
                {...args}
                registry={registry}
                onAction={(e) => {
                  setLastAction(e)
                  args.onAction?.(e)
                }}
              />

              {lastAction && (
                <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4">
                  <div className="mb-2 text-sm font-medium text-slate-700">Last Action:</div>
                  <pre className="overflow-auto rounded-lg bg-slate-950 p-3 text-xs text-slate-100">
                    {JSON.stringify(lastAction, null, 2)}
                  </pre>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    )
  },
  args: {
    conversationId: 'conv_error',
    nodes: demoNodes,
  },
}

// Setup mock API for all stories
export const decorators = [
  (Story: React.FC) => {
    // Setup mock API IMMEDIATELY (synchronously) before any render
    const restoreMockAPI = React.useMemo(() => setupMockAPI(), [])

    React.useEffect(() => {
      return () => {
        // Cleanup on unmount
        restoreMockAPI()
      }
    }, [restoreMockAPI])

    return <Story />
  },
]
