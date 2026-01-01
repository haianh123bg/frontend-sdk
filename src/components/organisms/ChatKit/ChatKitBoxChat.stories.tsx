import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import type { ChatAgentInfo, ChatMessage } from '../Chat/types'
import { ChatKitBoxChat } from './ChatKitBoxChat'
import type { ChatKitActionEvent, ChatKitActivity, ChatKitState } from './contracts'
import { mergeComponentRegistry } from './registry'
import { extendedComponentRegistry } from './registries/extended'
import { sdkComponentRegistry } from './registries/sdk'
import type { UIComponent } from './types'
import type { ChatStreamEvent, ChatStreamHandlers, ChatTransport, LoadOlderResult } from './transport'

const meta: Meta<typeof ChatKitBoxChat> = {
  title: 'Organisms/ChatKit/ChatKitBoxChat',
  component: ChatKitBoxChat,
  parameters: { layout: 'fullscreen' },
}

export default meta

type Story = StoryObj<typeof ChatKitBoxChat>

const conversationId = 'conv_001'
const currentUserId = 'user_001'

const agent: ChatAgentInfo = {
  name: 'RedAI Assistant',
  status: 'online',
}

function nowMinus(minutes: number) {
  return Date.now() - minutes * 60 * 1000
}

const viewWidgetRegistry = mergeComponentRegistry(sdkComponentRegistry, extendedComponentRegistry)

function createBaseMessages(): ChatMessage[] {
  return [
    {
      id: 'm_sys_1',
      conversationId,
      senderId: 'system',
      direction: 'system',
      createdAt: nowMinus(30),
      content: { type: 'system', text: 'Bắt đầu cuộc trò chuyện' },
    },
    {
      id: 'm_in_1',
      conversationId,
      senderId: 'agent',
      senderName: 'RedAI',
      direction: 'incoming',
      createdAt: nowMinus(25),
      content: { type: 'text', text: 'Chào bạn, mình có thể giúp gì?' },
    },
  ]
}

type ScenarioId = 'overview' | 'task_form' | 'upload' | 'search' | 'dashboard'

type ScenarioDefinition = {
  title: string
  viewTitle: string
  widgets: UIComponent[]
  state?: ChatKitState
  activities?: ChatKitActivity[]
  onConnect?: (ctx: { publish: (event: ChatStreamEvent) => void; delay: (ms: number) => Promise<void> }) => void
  onAction?: (
    event: ChatKitActionEvent,
    ctx: { publish: (event: ChatStreamEvent) => void; delay: (ms: number) => Promise<void> }
  ) => void | Promise<void>
}

const scenarioMap: Record<ScenarioId, ScenarioDefinition> = {
  overview: {
    title: 'Demo',
    viewTitle: 'UI',
    widgets: [
      {
        type: 'box',
        props: {
          padding: 'none',
          className: 'w-full overflow-hidden rounded-[28px] bg-white ring-1 ring-slate-200 shadow-xl',
        },
        children: [
          {
            type: 'box',
            props: { padding: 'lg' },
            children: [
              {
                type: 'progress',
                props: {
                  showLabel: false,
                  bindings: {
                    value: { path: '/demo/progress', default: 0 },
                    max: { path: '/demo/progressMax', default: 100 },
                  },
                },
              },
            ],
          },
        ],
      },
    ],
    state: { demo: { progress: 10, progressMax: 100 } },
    onConnect: (ctx) => {
      const run = async () => {
        for (let i = 0; i <= 5; i++) {
          await ctx.delay(240)
          ctx.publish({ type: 'state.delta', conversationId, delta: [{ op: 'replace', path: '/demo/progress', value: 10 + i * 15 }] })
        }
      }
      void run()
    },
  },

  task_form: {
    title: 'Form tạo task',
    viewTitle: 'Task Builder',
    widgets: [
      {
        type: 'box',
        props: { padding: 'none', className: 'w-full rounded-[28px] bg-white ring-1 ring-slate-200 shadow-xl' },
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
                    type: 'col',
                    props: { gap: 'md', className: 'flex-1' },
                    children: [
                      {
                        type: 'card',
                        props: {
                          title: 'Tạo task',
                          subtitle: 'Giao diện form với bindings + actions',
                          padding: 'md',
                          className: 'bg-slate-50 ring-1 ring-slate-200',
                        },
                        children: [
                          {
                            type: 'input',
                            props: {
                              label: 'Tiêu đề',
                              placeholder: 'Ví dụ: Gọi khách hàng',
                              bindings: { value: { path: '/taskForm/title', default: '' } },
                              action: { type: 'chatkit.task_form.change', payload: { field: 'title' } },
                            },
                          },
                          {
                            type: 'select',
                            props: {
                              label: 'Ưu tiên',
                              options: [
                                { label: 'Low', value: 'low' },
                                { label: 'Medium', value: 'medium' },
                                { label: 'High', value: 'high' },
                              ],
                              bindings: { value: { path: '/taskForm/priority', default: 'medium' } },
                              action: { type: 'chatkit.task_form.change', payload: { field: 'priority' } },
                            },
                          },
                          {
                            type: 'checkbox',
                            props: {
                              label: 'Gán cho tôi',
                              bindings: { checked: { path: '/taskForm/assignToMe', default: false } },
                              action: { type: 'chatkit.task_form.change', payload: { field: 'assignToMe' } },
                            },
                          },
                          {
                            type: 'row',
                            props: { gap: 'sm', className: 'justify-end' },
                            children: [
                              {
                                type: 'button',
                                props: { variant: 'secondary', label: 'Clear', action: { type: 'chatkit.task_form.clear' } },
                              },
                              {
                                type: 'button',
                                props: { variant: 'primary', label: 'Submit', action: { type: 'chatkit.task_form.submit' } },
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'col',
                    props: { gap: 'md', className: 'w-[320px]' },
                    children: [
                      {
                        type: 'card',
                        props: { title: 'Preview', padding: 'md', className: 'bg-slate-50 ring-1 ring-slate-200' },
                        children: [
                          {
                            type: 'box',
                            props: { padding: 'md', className: 'rounded-2xl bg-slate-950 text-slate-100' },
                            children: [
                              { type: 'text', props: { value: 'title:', className: 'text-xs text-slate-300' } },
                              {
                                type: 'text',
                                props: {
                                  className: 'text-sm font-semibold text-slate-100',
                                  bindings: { value: { path: '/taskForm/title', default: '(empty)' } },
                                },
                              },
                              { type: 'divider', props: { className: 'my-3 border-white/10' } },
                              { type: 'text', props: { value: 'priority:', className: 'text-xs text-slate-300' } },
                              {
                                type: 'text',
                                props: {
                                  className: 'text-sm font-semibold text-slate-100',
                                  bindings: { value: { path: '/taskForm/priority', default: 'medium' } },
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
    ],
    state: { taskForm: { title: '', priority: 'medium', assignToMe: false } },
    onAction: async (event, ctx) => {
      if (event.type === 'chatkit.task_form.clear') {
        ctx.publish({ type: 'state.snapshot', conversationId, snapshot: { taskForm: { title: '', priority: 'medium', assignToMe: false } } })
        return
      }

      if (event.type === 'chatkit.task_form.change') {
        const field = (event.payload as any)?.field
        if (field === 'title') {
          ctx.publish({ type: 'state.delta', conversationId, delta: [{ op: 'replace', path: '/taskForm/title', value: (event.payload as any)?.value ?? '' }] })
        }
        if (field === 'priority') {
          ctx.publish({ type: 'state.delta', conversationId, delta: [{ op: 'replace', path: '/taskForm/priority', value: (event.payload as any)?.value ?? 'medium' }] })
        }
        if (field === 'assignToMe') {
          ctx.publish({ type: 'state.delta', conversationId, delta: [{ op: 'replace', path: '/taskForm/assignToMe', value: Boolean((event.payload as any)?.checked) }] })
        }
        return
      }

      if (event.type === 'chatkit.task_form.submit') {
        const actId = `act_task_${Date.now()}`
        ctx.publish({
          type: 'activity.snapshot',
          conversationId,
          activity: { id: actId, activityType: 'TASK_CREATE', content: { status: 'running' }, createdAt: Date.now(), updatedAt: Date.now() },
        })
        await ctx.delay(250)
        ctx.publish({ type: 'activity.delta', conversationId, activityId: actId, patch: [{ op: 'replace', path: '/status', value: 'completed' }] })
      }
    },
  },

  upload: {
    title: 'Upload',
    viewTitle: 'Upload',
    widgets: [
      {
        type: 'box',
        props: { padding: 'none', className: 'w-full rounded-[28px] bg-white ring-1 ring-slate-200 shadow-xl' },
        children: [
          {
            type: 'box',
            props: { padding: 'lg' },
            children: [
              {
                type: 'row',
                props: { gap: 'md', className: 'items-center justify-between' },
                children: [
                  {
                    type: 'col',
                    props: { gap: 'sm' },
                    children: [
                      {
                        type: 'text',
                        props: { as: 'h2', value: 'Upload', className: 'text-2xl font-semibold tracking-tight text-slate-900' },
                      },
                      {
                        type: 'text',
                        props: { value: 'Chọn file và theo dõi tiến trình realtime.', className: 'text-sm text-slate-600' },
                      },
                    ],
                  },
                  {
                    type: 'badge',
                    props: {
                      variant: 'info',
                      bindings: { text: { path: '/upload/statusText', default: 'Chưa chọn file' } },
                    },
                  },
                ],
              },
              { type: 'divider', props: { className: 'my-4' } },
              {
                type: 'card',
                props: { padding: 'md', className: 'bg-slate-50 ring-1 ring-slate-200' },
                children: [
                  { type: 'file_uploader', props: { label: 'Chọn file', action: { type: 'chatkit.upload.select' } } },
                  {
                    type: 'progress',
                    props: {
                      showLabel: false,
                      className: 'mt-4',
                      bindings: {
                        value: { path: '/upload/progress', default: 0 },
                        max: { path: '/upload/max', default: 100 },
                      },
                    },
                  },
                  {
                    type: 'row',
                    props: { gap: 'sm', className: 'mt-4 justify-end' },
                    children: [
                      {
                        type: 'button',
                        props: { variant: 'primary', label: 'Start upload', action: { type: 'chatkit.upload.start' } },
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
    state: { upload: { statusText: 'Chưa chọn file', progress: 0, max: 100, showLabel: true } },
    onAction: async (event, ctx) => {
      if (event.type === 'chatkit.upload.select') {
        const files = (event.payload as any)?.files ?? []
        ctx.publish({
          type: 'state.delta',
          conversationId,
          delta: [
            { op: 'replace', path: '/upload/statusText', value: files.length ? `Đã chọn ${files.length} file` : 'Chưa chọn file' },
            { op: 'replace', path: '/upload/progress', value: 0 },
          ],
        })
        return
      }

      if (event.type === 'chatkit.upload.start') {
        const actId = `act_upload_${Date.now()}`
        ctx.publish({
          type: 'activity.snapshot',
          conversationId,
          activity: { id: actId, activityType: 'UPLOAD', content: { status: 'running', logs: [] }, createdAt: Date.now(), updatedAt: Date.now() },
        })

        for (let i = 1; i <= 10; i++) {
          await ctx.delay(180)
          ctx.publish({ type: 'state.delta', conversationId, delta: [{ op: 'replace', path: '/upload/progress', value: i * 10 }] })
          ctx.publish({
            type: 'activity.delta',
            conversationId,
            activityId: actId,
            patch: [{ op: 'add', path: '/logs/-', value: { t: Date.now(), msg: `Uploaded chunk ${i}/10` } }],
          })
        }

        ctx.publish({ type: 'state.delta', conversationId, delta: [{ op: 'replace', path: '/upload/statusText', value: 'Upload hoàn tất' }] })
        ctx.publish({ type: 'activity.delta', conversationId, activityId: actId, patch: [{ op: 'replace', path: '/status', value: 'completed' }] })
      }
    },
  },

  search: {
    title: 'Search',
    viewTitle: 'Search',
    widgets: [
      {
        type: 'box',
        props: { padding: 'none', className: 'w-full rounded-[28px] bg-white ring-1 ring-slate-200 shadow-xl' },
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
                          value: 'Search',
                          className: 'text-2xl font-semibold tracking-tight text-slate-900',
                        },
                      },
                      {
                        type: 'text',
                        props: { value: 'Query + progress + results trong một schema.', className: 'text-sm text-slate-600' },
                      },
                    ],
                  },
                  {
                    type: 'badge',
                    props: {
                      variant: 'default',
                      bindings: { text: { path: '/search/statusText', default: 'Idle' } },
                    },
                  },
                ],
              },
              {
                type: 'row',
                props: { gap: 'sm', className: 'mt-4 flex-wrap' },
                children: [
                  { type: 'chip', props: { label: 'Docs', variant: 'outline', size: 'sm' } },
                  { type: 'chip', props: { label: 'Tickets', variant: 'outline', size: 'sm' } },
                  { type: 'chip', props: { label: 'Slack', variant: 'outline', size: 'sm' } },
                ],
              },
              { type: 'divider', props: { className: 'my-4' } },
              {
                type: 'card',
                props: { padding: 'md', className: 'bg-slate-50 ring-1 ring-slate-200' },
                children: [
                  {
                    type: 'input',
                    props: {
                      label: 'Query',
                      placeholder: 'Nhập từ khoá...',
                      bindings: { value: { path: '/search/query', default: '' } },
                      action: { type: 'chatkit.search.query' },
                    },
                  },
                  {
                    type: 'row',
                    props: { gap: 'sm', className: 'mt-3 justify-end' },
                    children: [{ type: 'button', props: { variant: 'primary', label: 'Start', action: { type: 'chatkit.search.start' } } }],
                  },
                  {
                    type: 'progress',
                    props: {
                      showLabel: false,
                      className: 'mt-4',
                      bindings: {
                        value: { path: '/search/progress', default: 0 },
                        max: { path: '/search/max', default: 100 },
                      },
                    },
                  },
                  {
                    type: 'box',
                    props: { padding: 'md', className: 'mt-4 rounded-2xl bg-slate-950 text-slate-100 ring-1 ring-black/10' },
                    children: [
                      {
                        type: 'text',
                        props: { value: 'results', className: 'text-xs font-semibold text-slate-300' },
                      },
                      {
                        type: 'text',
                        props: {
                          className: 'mt-2 whitespace-pre-wrap font-mono text-xs text-slate-100',
                          bindings: { value: { path: '/search/resultsText', default: '(none)' } },
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
    state: { search: { query: '', statusText: 'Idle', progress: 0, max: 100, showLabel: true, resultsText: '(none)' } },
    onAction: async (event, ctx) => {
      if (event.type === 'chatkit.search.query') {
        ctx.publish({ type: 'state.delta', conversationId, delta: [{ op: 'replace', path: '/search/query', value: (event.payload as any)?.value ?? '' }] })
        return
      }

      if (event.type === 'chatkit.search.start') {
        const actId = `act_search_${Date.now()}`
        ctx.publish({
          type: 'activity.snapshot',
          conversationId,
          activity: { id: actId, activityType: 'SEARCH', content: { status: 'running', sources: [] }, createdAt: Date.now(), updatedAt: Date.now() },
        })
        ctx.publish({ type: 'state.delta', conversationId, delta: [{ op: 'replace', path: '/search/statusText', value: 'Đang tìm...' }] })
        ctx.publish({ type: 'state.delta', conversationId, delta: [{ op: 'replace', path: '/search/resultsText', value: '' }] })

        const sources = ['Docs', 'Tickets', 'Slack']
        for (let i = 1; i <= 5; i++) {
          await ctx.delay(220)
          ctx.publish({ type: 'state.delta', conversationId, delta: [{ op: 'replace', path: '/search/progress', value: i * 20 }] })
          ctx.publish({ type: 'activity.delta', conversationId, activityId: actId, patch: [{ op: 'add', path: '/sources/-', value: { name: sources[i % sources.length], step: i } }] })
        }

        ctx.publish({
          type: 'state.delta',
          conversationId,
          delta: [
            { op: 'replace', path: '/search/statusText', value: 'Hoàn tất' },
            { op: 'replace', path: '/search/resultsText', value: '1) Result A\n2) Result B\n3) Result C' },
          ],
        })
        ctx.publish({ type: 'activity.delta', conversationId, activityId: actId, patch: [{ op: 'replace', path: '/status', value: 'completed' }] })
      }
    },
  },

  dashboard: {
    title: 'Dashboard',
    viewTitle: 'Dashboard',
    widgets: [
      {
        type: 'box',
        props: { padding: 'none', className: 'w-full rounded-[28px] bg-white ring-1 ring-slate-200 shadow-xl' },
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
                        props: { as: 'h2', value: 'Dashboard', className: 'text-3xl font-semibold tracking-tight text-slate-900' },
                      },
                      {
                        type: 'text',
                        props: { value: 'Bảng điều khiển realtime từ schema renderer.', className: 'text-sm text-slate-600' },
                      },
                    ],
                  },
                  {
                    type: 'row',
                    props: { gap: 'sm', className: 'items-center' },
                    children: [
                      { type: 'badge', props: { text: 'LIVE', variant: 'success', size: 'sm' } },
                      { type: 'badge', props: { text: 'AI', variant: 'info', size: 'sm' } },
                    ],
                  },
                ],
              },
              {
                type: 'row',
                props: { gap: 'sm', className: 'mt-4 flex-wrap' },
                children: [
                  { type: 'chip', props: { label: 'Realtime', variant: 'primary', size: 'sm' } },
                  { type: 'chip', props: { label: 'Agentic', variant: 'outline', size: 'sm' } },
                  { type: 'chip', props: { label: 'Widgets', variant: 'outline', size: 'sm' } },
                ],
              },
              { type: 'divider', props: { className: 'my-5' } },
              {
                type: 'row',
                props: { gap: 'md', className: 'items-stretch' },
                children: [
                  {
                    type: 'box',
                    props: { padding: 'md', className: 'flex-1 rounded-2xl bg-slate-50 ring-1 ring-slate-200' },
                    children: [
                      { type: 'text', props: { value: 'Doanh thu', className: 'text-xs font-semibold text-slate-500' } },
                      { type: 'price', props: { value: 18300000, currency: 'VND', className: 'mt-1' } },
                    ],
                  },
                  {
                    type: 'box',
                    props: { padding: 'md', className: 'flex-1 rounded-2xl bg-slate-50 ring-1 ring-slate-200' },
                    children: [
                      { type: 'text', props: { value: 'CSAT', className: 'text-xs font-semibold text-slate-500' } },
                      { type: 'rating', props: { value: 4.6, max: 5, showValue: true, className: 'mt-1' } },
                    ],
                  },
                  {
                    type: 'box',
                    props: { padding: 'md', className: 'flex-1 rounded-2xl bg-slate-50 ring-1 ring-slate-200' },
                    children: [
                      { type: 'text', props: { value: 'Owner', className: 'text-xs font-semibold text-slate-500' } },
                      {
                        type: 'row',
                        props: { gap: 'sm', className: 'mt-2 items-center' },
                        children: [
                          { type: 'avatar', props: { alt: 'RedAI', initials: 'RA', size: 'md', status: 'online' } },
                          { type: 'text', props: { value: 'RedAI', className: 'text-sm font-semibold text-slate-900' } },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: 'row',
                props: { gap: 'sm', className: 'mt-6 justify-end' },
                children: [
                  { type: 'button', props: { variant: 'secondary', label: 'Refresh', action: { type: 'chatkit.dashboard.refresh' } } },
                ],
              },
            ],
          },
        ],
      },
    ],
    state: {},
    onAction: async (event, ctx) => {
      if (event.type === 'chatkit.dashboard.refresh') {
        await ctx.delay(240)
      }
    },
  },
}

function createMockTransport(scenarioId: ScenarioId): ChatTransport {
  const scenario = scenarioMap[scenarioId]
  let seq = 0
  const subscribers = new Set<ChatStreamHandlers>()

  const delay = (ms: number) => new Promise<void>((r) => window.setTimeout(r, ms))

  const publish = (event: ChatStreamEvent) => {
    subscribers.forEach((s) => s.onEvent?.(event))
  }

  const emitInitial = () => {
    publish({ type: 'ui.patch', conversationId, ui: { version: 1, nodes: scenario.widgets } })
    if (scenario.state) publish({ type: 'state.snapshot', conversationId, snapshot: scenario.state })
    for (const a of scenario.activities ?? []) {
      publish({ type: 'activity.snapshot', conversationId, activity: a })
    }
  }

  const simulateStream = async (prompt: string) => {
    const messageId = `stream_${Date.now()}`
    const parts = ['Đang xử lý yêu cầu', prompt ? `: ${prompt.trim()}` : '', '.']

    publish({ type: 'typing', conversationId, isTyping: true, text: 'RedAI đang nhập…' })
    await delay(200)

    for (const chunk of parts) {
      publish({ type: 'message.delta', conversationId, messageId, text: chunk })
      await delay(120)
    }

    const finalMsg: ChatMessage = {
      id: `m_in_${Date.now()}`,
      conversationId,
      senderId: 'agent',
      senderName: 'RedAI',
      direction: 'incoming',
      createdAt: Date.now(),
      content: { type: 'text', text: parts.join('') },
    }

    publish({ type: 'message.final', conversationId, message: finalMsg })
    publish({ type: 'typing', conversationId, isTyping: false })
  }

  return {
    subscribe: (_cid, handlers) => {
      subscribers.add(handlers)

      void delay(30).then(() => {
        emitInitial()
        scenario.onConnect?.({ publish, delay })
      })

      return () => {
        subscribers.delete(handlers)
        handlers.onClose?.()
      }
    },

    sendMessage: async (input) => {
      await delay(250)

      seq += 1
      const outgoing: ChatMessage = {
        id: `m_out_${seq}`,
        clientId: input.clientId,
        conversationId: input.conversationId,
        senderId: currentUserId,
        senderName: 'Bạn',
        direction: 'outgoing',
        createdAt: Date.now(),
        status: 'sent',
        content: input.markdown ? { type: 'markdown', markdown: input.markdown } : { type: 'text', text: input.text || '' },
      }

      void simulateStream(input.text || input.markdown || '')

      const res = {
        conversationId: input.conversationId,
        messages: [outgoing],
        ui: { version: 1 as const, nodes: scenario.widgets },
        state: scenario.state,
        activities: scenario.activities,
        meta: { traceId: `trace_${Date.now()}` },
      }

      return res
    },

    sendAction: async (event) => {
      await delay(150)

      const sys: ChatMessage = {
        id: `m_sys_${Date.now()}`,
        conversationId: event.conversationId,
        senderId: 'system',
        direction: 'system',
        createdAt: Date.now(),
        content: { type: 'system', text: `Action received: ${event.type}` },
      }

      await scenario.onAction?.(event, { publish, delay })
      void simulateStream(`action=${event.type}`)

      return {
        conversationId: event.conversationId,
        messages: [sys],
        meta: { traceId: `trace_${Date.now()}` },
      }
    },

    loadOlder: async (_params): Promise<LoadOlderResult> => {
      await delay(120)

      const older: ChatMessage[] = [
        {
          id: `m_old_${Date.now()}_1`,
          conversationId,
          senderId: 'system',
          direction: 'system',
          createdAt: nowMinus(60),
          content: { type: 'system', text: 'Tin nhắn cũ hơn (demo load older)' },
        },
      ]

      return { messages: older, hasMore: false }
    },
  }
}

type StoryShellProps = {
  scenarioId: ScenarioId
  mode?: 'split' | 'floating'
  renderWidgetsInChat?: boolean
}

const StoryShell: React.FC<StoryShellProps> = ({ scenarioId, mode = 'split', renderWidgetsInChat }) => {
  const [open, setOpen] = React.useState(true)
  const scenario = scenarioMap[scenarioId]
  const transport = React.useMemo(() => createMockTransport(scenarioId), [scenarioId])
  const initialMessages = React.useMemo<ChatMessage[]>(() => createBaseMessages(), [])

  return (
    <div className="h-screen w-full bg-slate-50 p-4">
      <div className="mb-3 flex items-center gap-2">
        <button
          type="button"
          className="rounded-lg bg-primary-500 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-600"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Đóng chat' : 'Mở chat'}
        </button>
        <div className="text-sm text-text-muted">Scenario: {scenario.title}</div>
      </div>

      <div className="h-[calc(100vh-6rem)] min-h-0">
        <ChatKitBoxChat
          mode={mode}
          open={open}
          title="RedAI Assistant"
          chatSide="right"
          chatRatio={0.34}
          minChat={320}
          minView={320}
          agent={agent}
          conversationId={conversationId}
          currentUserId={currentUserId}
          currentUserName="Bạn"
          allowAttachments={false}
          transport={transport}
          initialMessages={initialMessages}
          viewTitle={scenario.viewTitle}
          viewWidgetRegistry={viewWidgetRegistry}
          renderWidgetsInChat={renderWidgetsInChat}
        />
      </div>
    </div>
  )
}

export const Split_Overview: Story = { render: () => <StoryShell scenarioId="overview" mode="split" /> }
export const Split_TaskForm: Story = { render: () => <StoryShell scenarioId="task_form" mode="split" /> }
export const Split_Upload: Story = { render: () => <StoryShell scenarioId="upload" mode="split" /> }
export const Split_Search: Story = { render: () => <StoryShell scenarioId="search" mode="split" /> }
export const Split_Dashboard: Story = { render: () => <StoryShell scenarioId="dashboard" mode="split" /> }
export const Floating_DashboardWidgetsInChat: Story = {
  render: () => <StoryShell scenarioId="dashboard" mode="floating" renderWidgetsInChat={true} />,
}
