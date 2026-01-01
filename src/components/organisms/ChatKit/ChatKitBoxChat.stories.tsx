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

function gridCells(grid: Array<Array<string | number | boolean | null>>): Record<string, string | number | boolean | null> {
  const out: Record<string, string | number | boolean | null> = {}
  for (let r = 0; r < grid.length; r += 1) {
    const row = grid[r] ?? []
    for (let c = 0; c < row.length; c += 1) {
      out[`${r}:${c}`] = row[c] ?? null
    }
  }
  return out
}

const viewWidgetRegistry = mergeComponentRegistry(sdkComponentRegistry, extendedComponentRegistry)

type ScenarioCtx = {
  publish: (event: ChatStreamEvent) => void
  delay: (ms: number) => Promise<void>
}

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

const industryScenarioMap = {
  industry_retail: {
    title: 'Retail / E-commerce',
    viewTitle: 'Retail Ops',
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
                type: 'row',
                props: { gap: 'md', className: 'items-start justify-between' },
                children: [
                  {
                    type: 'col',
                    props: { gap: 'xs' },
                    children: [
                      {
                        type: 'text',
                        props: {
                          as: 'h2',
                          value: 'Retail Operations',
                          className: 'text-3xl font-semibold tracking-tight text-slate-900',
                        },
                      },
                      {
                        type: 'text',
                        props: {
                          value: 'Theo dõi doanh thu, đơn hàng, hoàn trả và SLA fulfillment theo thời gian thực.',
                          className: 'text-sm text-slate-600',
                        },
                      },
                    ],
                  },
                  {
                    type: 'row',
                    props: { gap: 'sm', className: 'items-center' },
                    children: [
                      { type: 'badge', props: { text: 'LIVE', variant: 'success', size: 'sm' } },
                      {
                        type: 'chip',
                        props: { label: 'Refresh', variant: 'outline', size: 'sm', action: { type: 'chatkit.retail.refresh' } },
                      },
                    ],
                  },
                ],
              },
              { type: 'divider', props: { className: 'my-5' } },
              {
                type: 'row',
                props: { gap: 'md', className: 'items-stretch' },
                children: [
                  {
                    type: 'card',
                    props: { padding: 'md', className: 'flex-1 bg-slate-50 ring-1 ring-slate-200' },
                    children: [
                      { type: 'text', props: { value: 'Doanh thu hôm nay', className: 'text-xs font-semibold text-slate-500' } },
                      { type: 'price', props: { bindings: { value: { path: '/retail/revenue', default: 0 } }, currency: 'VND', className: 'mt-2' } },
                    ],
                  },
                  {
                    type: 'card',
                    props: { padding: 'md', className: 'flex-1 bg-slate-50 ring-1 ring-slate-200' },
                    children: [
                      { type: 'text', props: { value: 'Đơn hàng', className: 'text-xs font-semibold text-slate-500' } },
                      {
                        type: 'text',
                        props: {
                          className: 'mt-2 text-2xl font-semibold text-slate-900',
                          bindings: { value: { path: '/retail/ordersToday', default: 0 } },
                        },
                      },
                      {
                        type: 'text',
                        props: {
                          className: 'mt-1 text-xs text-slate-600',
                          bindings: { value: { path: '/retail/ordersNote', default: 'So với hôm qua: +0%' } },
                        },
                      },
                    ],
                  },
                  {
                    type: 'card',
                    props: { padding: 'md', className: 'flex-1 bg-slate-50 ring-1 ring-slate-200' },
                    children: [
                      { type: 'text', props: { value: 'Fulfillment SLA', className: 'text-xs font-semibold text-slate-500' } },
                      {
                        type: 'progress',
                        props: {
                          className: 'mt-3',
                          showLabel: true,
                          bindings: {
                            value: { path: '/retail/fulfillment', default: 0 },
                            max: { path: '/retail/fulfillmentMax', default: 100 },
                          },
                        },
                      },
                      {
                        type: 'row',
                        props: { gap: 'sm', className: 'mt-3 items-center justify-between' },
                        children: [
                          {
                            type: 'badge',
                            props: { variant: 'info', bindings: { text: { path: '/retail/fulfillmentStatus', default: 'On Track' } } },
                          },
                          {
                            type: 'text',
                            props: { className: 'text-xs text-slate-600', bindings: { value: { path: '/retail/etaText', default: 'ETA: 2h' } } },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: 'card',
                props: { padding: 'md', className: 'mt-4 bg-white ring-1 ring-slate-200' },
                children: [
                  {
                    type: 'row',
                    props: { gap: 'sm', className: 'items-center justify-between' },
                    children: [
                      {
                        type: 'col',
                        props: { gap: 'xs' },
                        children: [
                          { type: 'text', props: { value: 'Đơn gần đây', className: 'text-sm font-semibold text-slate-900' } },
                          {
                            type: 'text',
                            props: { value: 'Bảng theo dõi đơn hàng dạng spreadsheet (read-only).', className: 'text-xs text-slate-600' },
                          },
                        ],
                      },
                      {
                        type: 'row',
                        props: { gap: 'sm', className: 'items-center' },
                        children: [
                          { type: 'chip', props: { label: 'Hôm nay', variant: 'primary', size: 'sm', action: { type: 'chatkit.retail.range', payload: { range: 'today' } } } },
                          { type: 'chip', props: { label: '7 ngày', variant: 'outline', size: 'sm', action: { type: 'chatkit.retail.range', payload: { range: '7d' } } } },
                          { type: 'chip', props: { label: '30 ngày', variant: 'outline', size: 'sm', action: { type: 'chatkit.retail.range', payload: { range: '30d' } } } },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'excel_grid',
                    props: {
                      className: 'mt-4',
                      height: 360,
                      editable: false,
                      enableCopyPaste: false,
                      showRowNumbers: false,
                      showColumnLetters: false,
                      rowHeight: 36,
                      colWidth: 160,
                      bindings: { value: { path: '/retail/ordersGrid', default: {} } },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    state: {
      retail: {
        revenue: 128500000,
        ordersToday: 342,
        ordersNote: 'So với hôm qua: +8.2%',
        fulfillment: 72,
        fulfillmentMax: 100,
        fulfillmentStatus: 'On Track',
        etaText: 'ETA: 1h 45m',
        ordersGrid: gridCells([
          ['Order', 'Customer', 'Total', 'Status', 'ETA'],
          ['#SO-12093', 'Nguyễn A', 1250000, 'Picking', '45m'],
          ['#SO-12094', 'Trần B', 389000, 'Packed', '20m'],
          ['#SO-12095', 'Lê C', 2250000, 'Shipped', '2h'],
          ['#SO-12096', 'Phạm D', 790000, 'Delayed', '3h'],
        ]),
      },
    },
    onConnect: (ctx: ScenarioCtx) => {
      const run = async () => {
        for (let i = 0; i < 6; i++) {
          await ctx.delay(320)
          ctx.publish({
            type: 'state.delta',
            conversationId,
            delta: [
              { op: 'replace', path: '/retail/fulfillment', value: 72 + i * 3 },
              { op: 'replace', path: '/retail/revenue', value: 128500000 + i * 1250000 },
              { op: 'replace', path: '/retail/ordersToday', value: 342 + i * 4 },
            ],
          })
        }
      }
      void run()
    },
    onAction: async (event: ChatKitActionEvent, ctx: ScenarioCtx) => {
      if (event.type === 'chatkit.retail.refresh') {
        await ctx.delay(180)
        ctx.publish({
          type: 'state.delta',
          conversationId,
          delta: [
            { op: 'replace', path: '/retail/ordersNote', value: 'So với hôm qua: +9.1%' },
            { op: 'replace', path: '/retail/fulfillmentStatus', value: 'On Track' },
          ],
        })
      }
      if (event.type === 'chatkit.retail.range') {
        await ctx.delay(120)
      }
    },
  },

  industry_finance: {
    title: 'Finance / Risk',
    viewTitle: 'Risk Monitor',
    widgets: [
      {
        type: 'box',
        props: {
          padding: 'none',
          className: 'w-full overflow-hidden rounded-[28px] bg-slate-950 ring-1 ring-slate-900 shadow-xl',
        },
        children: [
          {
            type: 'box',
            props: { padding: 'lg', className: 'text-slate-100' },
            children: [
              {
                type: 'row',
                props: { gap: 'md', className: 'items-start justify-between' },
                children: [
                  {
                    type: 'col',
                    props: { gap: 'xs' },
                    children: [
                      {
                        type: 'text',
                        props: {
                          as: 'h2',
                          value: 'Risk Monitor',
                          className: 'text-3xl font-semibold tracking-tight text-white',
                        },
                      },
                      {
                        type: 'text',
                        props: {
                          value: 'Theo dõi exposure, cảnh báo AML và điểm rủi ro theo luồng realtime.',
                          className: 'text-sm text-slate-300',
                        },
                      },
                    ],
                  },
                  {
                    type: 'row',
                    props: { gap: 'sm', className: 'items-center' },
                    children: [
                      { type: 'badge', props: { text: 'SECURE', variant: 'info', size: 'sm' } },
                      { type: 'badge', props: { text: 'LIVE', variant: 'success', size: 'sm' } },
                    ],
                  },
                ],
              },
              { type: 'divider', props: { className: 'my-5 border-white/10' } },
              {
                type: 'row',
                props: { gap: 'md', className: 'items-stretch' },
                children: [
                  {
                    type: 'card',
                    props: { padding: 'md', className: 'flex-1 bg-slate-900 ring-1 ring-white/10' },
                    children: [
                      { type: 'text', props: { value: 'Exposure', className: 'text-xs font-semibold text-slate-300' } },
                      { type: 'price', props: { bindings: { value: { path: '/finance/exposure', default: 0 } }, currency: 'USD', className: 'mt-2 text-white' } },
                      { type: 'text', props: { className: 'mt-1 text-xs text-slate-400', bindings: { value: { path: '/finance/exposureNote', default: 'Δ 0.0%' } } } },
                    ],
                  },
                  {
                    type: 'card',
                    props: { padding: 'md', className: 'flex-1 bg-slate-900 ring-1 ring-white/10' },
                    children: [
                      { type: 'text', props: { value: 'Risk Score', className: 'text-xs font-semibold text-slate-300' } },
                      {
                        type: 'progress',
                        props: {
                          className: 'mt-3',
                          showLabel: true,
                          variant: 'warning',
                          bindings: { value: { path: '/finance/riskScore', default: 0 }, max: { path: '/finance/riskMax', default: 100 } },
                        },
                      },
                      {
                        type: 'badge',
                        props: { className: 'mt-3', variant: 'warning', bindings: { text: { path: '/finance/riskStatus', default: 'Medium' } } },
                      },
                    ],
                  },
                  {
                    type: 'card',
                    props: { padding: 'md', className: 'flex-1 bg-slate-900 ring-1 ring-white/10' },
                    children: [
                      { type: 'text', props: { value: 'AML Alerts', className: 'text-xs font-semibold text-slate-300' } },
                      { type: 'text', props: { className: 'mt-2 text-2xl font-semibold text-white', bindings: { value: { path: '/finance/alerts', default: 0 } } } },
                      { type: 'text', props: { className: 'mt-1 text-xs text-slate-400', bindings: { value: { path: '/finance/alertsNote', default: 'Last 60m' } } } },
                    ],
                  },
                ],
              },
              {
                type: 'row',
                props: { gap: 'md', className: 'mt-4 flex-wrap' },
                children: [
                  {
                    type: 'card',
                    props: { padding: 'md', className: 'flex-1 min-w-[260px] bg-slate-900 ring-1 ring-white/10' },
                    children: [
                      {
                        type: 'row',
                        props: { gap: 'sm', className: 'items-center justify-between' },
                        children: [
                          { type: 'text', props: { value: 'Alert feed', className: 'text-sm font-semibold text-white' } },
                          { type: 'chip', props: { label: 'Live stream', variant: 'outline', size: 'sm' } },
                        ],
                      },
                      {
                        type: 'col',
                        props: { gap: 'sm', className: 'mt-4' },
                        children: [
                          {
                            type: 'row',
                            props: { gap: 'sm', className: 'items-start justify-between rounded-2xl bg-white/5 px-4 py-3' },
                            children: [
                              {
                                type: 'col',
                                props: { gap: 'xs' },
                                children: [
                                  {
                                    type: 'text',
                                    props: {
                                      className: 'text-sm font-semibold text-white',
                                      bindings: { value: { path: '/finance/alertPrimary/code', default: 'TX-00000' } },
                                    },
                                  },
                                  {
                                    type: 'text',
                                    props: {
                                      className: 'text-xs text-slate-300',
                                      bindings: { value: { path: '/finance/alertPrimary/rule', default: 'Rule' } },
                                    },
                                  },
                                  {
                                    type: 'price',
                                    props: {
                                      className: 'text-white',
                                      currency: 'USD',
                                      bindings: { value: { path: '/finance/alertPrimary/amount', default: 0 } },
                                    },
                                  },
                                ],
                              },
                              {
                                type: 'badge',
                                props: {
                                  variant: 'warning',
                                  bindings: { text: { path: '/finance/alertPrimary/status', default: 'Review' } },
                                },
                              },
                            ],
                          },
                          {
                            type: 'row',
                            props: { gap: 'sm', className: 'items-start justify-between rounded-2xl bg-white/5 px-4 py-3' },
                            children: [
                              {
                                type: 'col',
                                props: { gap: 'xs' },
                                children: [
                                  {
                                    type: 'text',
                                    props: {
                                      className: 'text-sm font-semibold text-white',
                                      bindings: { value: { path: '/finance/alertSecondary/code', default: 'TX-00000' } },
                                    },
                                  },
                                  {
                                    type: 'text',
                                    props: {
                                      className: 'text-xs text-slate-300',
                                      bindings: { value: { path: '/finance/alertSecondary/rule', default: 'Rule' } },
                                    },
                                  },
                                  {
                                    type: 'price',
                                    props: {
                                      className: 'text-white',
                                      currency: 'USD',
                                      bindings: { value: { path: '/finance/alertSecondary/amount', default: 0 } },
                                    },
                                  },
                                ],
                              },
                              {
                                type: 'badge',
                                props: {
                                  variant: 'danger',
                                  bindings: { text: { path: '/finance/alertSecondary/status', default: 'Escalate' } },
                                },
                              },
                            ],
                          },
                          {
                            type: 'row',
                            props: { gap: 'sm', className: 'items-start justify-between rounded-2xl bg-white/5 px-4 py-3' },
                            children: [
                              {
                                type: 'col',
                                props: { gap: 'xs' },
                                children: [
                                  {
                                    type: 'text',
                                    props: {
                                      className: 'text-sm font-semibold text-white',
                                      bindings: { value: { path: '/finance/alertTertiary/code', default: 'TX-00000' } },
                                    },
                                  },
                                  {
                                    type: 'text',
                                    props: {
                                      className: 'text-xs text-slate-300',
                                      bindings: { value: { path: '/finance/alertTertiary/rule', default: 'Rule' } },
                                    },
                                  },
                                  {
                                    type: 'price',
                                    props: {
                                      className: 'text-white',
                                      currency: 'USD',
                                      bindings: { value: { path: '/finance/alertTertiary/amount', default: 0 } },
                                    },
                                  },
                                ],
                              },
                              {
                                type: 'badge',
                                props: {
                                  variant: 'info',
                                  bindings: { text: { path: '/finance/alertTertiary/status', default: 'Watch' } },
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
                    props: { padding: 'md', className: 'flex-1 min-w-[220px] bg-slate-900 ring-1 ring-white/10' },
                    children: [
                      {
                        type: 'row',
                        props: { gap: 'sm', className: 'items-center justify-between' },
                        children: [
                          { type: 'text', props: { value: 'Escalation board', className: 'text-sm font-semibold text-white' } },
                          { type: 'badge', props: { text: 'Ops-bridge', variant: 'info', size: 'sm' } },
                        ],
                      },
                      {
                        type: 'col',
                        props: { gap: 'sm', className: 'mt-4' },
                        children: [
                          {
                            type: 'row',
                            props: { gap: 'sm', className: 'items-center justify-between' },
                            children: [
                              { type: 'text', props: { className: 'text-xs text-slate-300', value: 'Queue' } },
                              {
                                type: 'text',
                                props: {
                                  className: 'text-sm font-semibold text-white',
                                  bindings: { value: { path: '/finance/escalation/queue', default: 'Queue-00' } },
                                },
                              },
                            ],
                          },
                          {
                            type: 'row',
                            props: { gap: 'sm', className: 'items-center justify-between' },
                            children: [
                              { type: 'text', props: { className: 'text-xs text-slate-300', value: 'Owner' } },
                              {
                                type: 'text',
                                props: {
                                  className: 'text-sm font-semibold text-white',
                                  bindings: { value: { path: '/finance/escalation/owner', default: 'Ops' } },
                                },
                              },
                            ],
                          },
                          {
                            type: 'row',
                            props: { gap: 'sm', className: 'items-center justify-between' },
                            children: [
                              { type: 'text', props: { className: 'text-xs text-slate-300', value: 'Priority' } },
                              {
                                type: 'chip',
                                props: {
                                  size: 'sm',
                                  variant: 'outline',
                                  bindings: { label: { path: '/finance/escalation/priority', default: 'High' } },
                                },
                              },
                            ],
                          },
                          {
                            type: 'row',
                            props: { gap: 'sm', className: 'items-center justify-between' },
                            children: [
                              { type: 'text', props: { className: 'text-xs text-slate-300', value: 'ETA' } },
                              {
                                type: 'text',
                                props: {
                                  className: 'text-sm font-semibold text-white',
                                  bindings: { value: { path: '/finance/escalation/eta', default: '0m' } },
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
              {
                type: 'card',
                props: { padding: 'md', className: 'mt-4 bg-slate-900 ring-1 ring-white/10' },
                children: [
                  {
                    type: 'row',
                    props: { gap: 'sm', className: 'items-center justify-between' },
                    children: [
                      { type: 'text', props: { value: 'Action center', className: 'text-sm font-semibold text-white' } },
                      {
                        type: 'row',
                        props: { gap: 'sm', className: 'items-center' },
                        children: [
                          { type: 'chip', props: { label: 'Freeze top', variant: 'outline', size: 'sm', action: { type: 'chatkit.finance.freeze' } } },
                          { type: 'chip', props: { label: 'Export', variant: 'outline', size: 'sm', action: { type: 'chatkit.finance.export' } } },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'col',
                    props: { gap: 'sm', className: 'mt-4' },
                    children: [
                      {
                        type: 'text',
                        props: {
                          className: 'text-xs text-slate-300',
                          bindings: { value: { path: '/finance/taskNext/title', default: 'Task' } },
                        },
                      },
                      {
                        type: 'row',
                        props: { gap: 'sm', className: 'items-center justify-between rounded-2xl bg-white/5 px-4 py-3' },
                        children: [
                          {
                            type: 'col',
                            props: { gap: 'xs' },
                            children: [
                              {
                                type: 'text',
                                props: {
                                  className: 'text-sm font-semibold text-white',
                                  bindings: { value: { path: '/finance/taskNext/assignee', default: 'Fraud Ops' } },
                                },
                              },
                              {
                                type: 'text',
                                props: {
                                  className: 'text-xs text-slate-300',
                                  bindings: { value: { path: '/finance/taskNext/sla', default: '15m SLA' } },
                                },
                              },
                            ],
                          },
                          { type: 'button', props: { label: 'Trigger', variant: 'primary', size: 'sm' } },
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
    state: {
      finance: {
        exposure: 12843000,
        exposureNote: 'Δ +1.2% (24h)',
        riskScore: 63,
        riskMax: 100,
        riskStatus: 'Medium',
        alerts: 7,
        alertsNote: 'Last 60m',
        txGrid: gridCells([
          ['Tx', 'Account', 'Amount', 'Rule', 'Status'],
          ['TX-90812', 'AC-01293', 9500, 'Velocity', 'Review'],
          ['TX-90813', 'AC-88912', 25000, 'Geo', 'Freeze'],
          ['TX-90814', 'AC-11029', 1200, 'Pattern', 'Review'],
          ['TX-90815', 'AC-77210', 78000, 'Sanctions', 'Escalate'],
        ]),
      },
    },
    onConnect: (ctx: ScenarioCtx) => {
      const run = async () => {
        for (let i = 0; i < 6; i++) {
          await ctx.delay(360)
          ctx.publish({
            type: 'state.delta',
            conversationId,
            delta: [
              { op: 'replace', path: '/finance/riskScore', value: 63 + (i % 3) * 4 },
              { op: 'replace', path: '/finance/alerts', value: 7 + (i % 2) },
            ],
          })
        }
      }
      void run()
    },
    onAction: async (_event: ChatKitActionEvent, ctx: ScenarioCtx) => {
      await ctx.delay(120)
    },
  },

  industry_healthcare: {
    title: 'Healthcare / Clinic',
    viewTitle: 'Clinic Triage',
    widgets: [
      {
        type: 'box',
        props: { padding: 'none', className: 'w-full overflow-hidden rounded-[28px] bg-white ring-1 ring-slate-200 shadow-xl' },
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
                    props: { gap: 'xs' },
                    children: [
                      { type: 'text', props: { as: 'h2', value: 'Clinic Triage', className: 'text-3xl font-semibold tracking-tight text-slate-900' } },
                      { type: 'text', props: { value: 'Theo dõi hàng chờ, mức độ ưu tiên và SLA khám.', className: 'text-sm text-slate-600' } },
                    ],
                  },
                  {
                    type: 'row',
                    props: { gap: 'sm', className: 'items-center' },
                    children: [
                      { type: 'badge', props: { text: 'LIVE', variant: 'success', size: 'sm' } },
                      { type: 'chip', props: { label: 'Call next', variant: 'primary', size: 'sm', action: { type: 'chatkit.clinic.call_next' } } },
                    ],
                  },
                ],
              },
              { type: 'divider', props: { className: 'my-5' } },
              {
                type: 'row',
                props: { gap: 'md', className: 'items-stretch' },
                children: [
                  {
                    type: 'card',
                    props: { padding: 'md', className: 'flex-1 bg-slate-50 ring-1 ring-slate-200' },
                    children: [
                      { type: 'text', props: { value: 'Đang chờ', className: 'text-xs font-semibold text-slate-500' } },
                      { type: 'text', props: { className: 'mt-2 text-2xl font-semibold text-slate-900', bindings: { value: { path: '/clinic/waiting', default: 0 } } } },
                      { type: 'text', props: { className: 'mt-1 text-xs text-slate-600', bindings: { value: { path: '/clinic/waitingNote', default: 'Avg wait 0m' } } } },
                    ],
                  },
                  {
                    type: 'card',
                    props: { padding: 'md', className: 'flex-1 bg-slate-50 ring-1 ring-slate-200' },
                    children: [
                      { type: 'text', props: { value: 'SLA', className: 'text-xs font-semibold text-slate-500' } },
                      { type: 'progress', props: { className: 'mt-3', showLabel: true, bindings: { value: { path: '/clinic/sla', default: 0 }, max: { path: '/clinic/slaMax', default: 100 } } } },
                      { type: 'badge', props: { className: 'mt-3', variant: 'info', bindings: { text: { path: '/clinic/slaStatus', default: 'Stable' } } } },
                    ],
                  },
                  {
                    type: 'card',
                    props: { padding: 'md', className: 'flex-1 bg-slate-50 ring-1 ring-slate-200' },
                    children: [
                      { type: 'text', props: { value: 'CSAT', className: 'text-xs font-semibold text-slate-500' } },
                      { type: 'rating', props: { showValue: true, bindings: { value: { path: '/clinic/csat', default: 4.5 } }, className: 'mt-2' } },
                    ],
                  },
                ],
              },
              {
                type: 'card',
                props: { padding: 'md', className: 'mt-4 bg-white ring-1 ring-slate-200' },
                children: [
                  { type: 'text', props: { value: 'Danh sách bệnh nhân', className: 'text-sm font-semibold text-slate-900' } },
                  { type: 'text', props: { value: 'Ví dụ triage queue (demo).', className: 'mt-1 text-xs text-slate-600' } },
                  {
                    type: 'excel_grid',
                    props: {
                      className: 'mt-4',
                      height: 360,
                      editable: false,
                      enableCopyPaste: false,
                      showRowNumbers: false,
                      showColumnLetters: false,
                      rowHeight: 36,
                      colWidth: 170,
                      bindings: { value: { path: '/clinic/queueGrid', default: {} } },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    state: {
      clinic: {
        waiting: 14,
        waitingNote: 'Avg wait: 12m',
        sla: 81,
        slaMax: 100,
        slaStatus: 'Stable',
        csat: 4.6,
        queueGrid: gridCells([
          ['Patient', 'Age', 'Reason', 'Priority', 'Status'],
          ['P-19021', 42, 'Chest pain', 'High', 'Waiting'],
          ['P-19022', 31, 'Fever', 'Medium', 'Waiting'],
          ['P-19023', 67, 'Dizziness', 'High', 'In room'],
          ['P-19024', 24, 'Cough', 'Low', 'Waiting'],
        ]),
      },
    },
    onConnect: (ctx: ScenarioCtx) => {
      const run = async () => {
        for (let i = 0; i < 6; i++) {
          await ctx.delay(420)
          ctx.publish({
            type: 'state.delta',
            conversationId,
            delta: [
              { op: 'replace', path: '/clinic/waiting', value: 14 + (i % 3) },
              { op: 'replace', path: '/clinic/sla', value: 81 - (i % 2) * 2 },
            ],
          })
        }
      }
      void run()
    },
    onAction: async (_event: ChatKitActionEvent, ctx: ScenarioCtx) => {
      await ctx.delay(160)
    },
  },

  industry_logistics: {
    title: 'Logistics / Fleet',
    viewTitle: 'Delivery Control',
    widgets: [
      {
        type: 'box',
        props: { padding: 'none', className: 'w-full overflow-hidden rounded-[28px] bg-white ring-1 ring-slate-200 shadow-xl' },
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
                    props: { gap: 'xs' },
                    children: [
                      { type: 'text', props: { as: 'h2', value: 'Delivery Control', className: 'text-3xl font-semibold tracking-tight text-slate-900' } },
                      { type: 'text', props: { value: 'Giám sát tuyến, ETA, on-time rate và incident.', className: 'text-sm text-slate-600' } },
                    ],
                  },
                  {
                    type: 'row',
                    props: { gap: 'sm', className: 'items-center' },
                    children: [
                      { type: 'badge', props: { text: 'LIVE', variant: 'success', size: 'sm' } },
                      { type: 'chip', props: { label: 'Reroute', variant: 'outline', size: 'sm', action: { type: 'chatkit.logistics.reroute' } } },
                    ],
                  },
                ],
              },
              { type: 'divider', props: { className: 'my-5' } },
              {
                type: 'row',
                props: { gap: 'md', className: 'items-stretch' },
                children: [
                  {
                    type: 'card',
                    props: { padding: 'md', className: 'flex-1 bg-slate-50 ring-1 ring-slate-200' },
                    children: [
                      { type: 'text', props: { value: 'In transit', className: 'text-xs font-semibold text-slate-500' } },
                      { type: 'text', props: { className: 'mt-2 text-2xl font-semibold text-slate-900', bindings: { value: { path: '/logistics/inTransit', default: 0 } } } },
                      { type: 'text', props: { className: 'mt-1 text-xs text-slate-600', bindings: { value: { path: '/logistics/inTransitNote', default: 'Active routes' } } } },
                    ],
                  },
                  {
                    type: 'card',
                    props: { padding: 'md', className: 'flex-1 bg-slate-50 ring-1 ring-slate-200' },
                    children: [
                      { type: 'text', props: { value: 'On-time rate', className: 'text-xs font-semibold text-slate-500' } },
                      { type: 'progress', props: { className: 'mt-3', showLabel: true, bindings: { value: { path: '/logistics/onTime', default: 0 }, max: { path: '/logistics/onTimeMax', default: 100 } } } },
                      { type: 'badge', props: { className: 'mt-3', variant: 'info', bindings: { text: { path: '/logistics/onTimeStatus', default: 'Stable' } } } },
                    ],
                  },
                  {
                    type: 'card',
                    props: { padding: 'md', className: 'flex-1 bg-slate-50 ring-1 ring-slate-200' },
                    children: [
                      { type: 'text', props: { value: 'Incidents', className: 'text-xs font-semibold text-slate-500' } },
                      { type: 'text', props: { className: 'mt-2 text-2xl font-semibold text-slate-900', bindings: { value: { path: '/logistics/incidents', default: 0 } } } },
                      { type: 'text', props: { className: 'mt-1 text-xs text-slate-600', bindings: { value: { path: '/logistics/incidentsNote', default: 'Last 24h' } } } },
                    ],
                  },
                ],
              },
              {
                type: 'card',
                props: { padding: 'md', className: 'mt-4 bg-white ring-1 ring-slate-200' },
                children: [
                  { type: 'text', props: { value: 'Danh sách chuyến', className: 'text-sm font-semibold text-slate-900' } },
                  { type: 'text', props: { value: 'Theo dõi tuyến / ETA (demo).', className: 'mt-1 text-xs text-slate-600' } },
                  {
                    type: 'excel_grid',
                    props: {
                      className: 'mt-4',
                      height: 360,
                      editable: false,
                      enableCopyPaste: false,
                      showRowNumbers: false,
                      showColumnLetters: false,
                      rowHeight: 36,
                      colWidth: 180,
                      bindings: { value: { path: '/logistics/routesGrid', default: {} } },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    state: {
      logistics: {
        inTransit: 58,
        inTransitNote: 'Active routes',
        onTime: 92,
        onTimeMax: 100,
        onTimeStatus: 'Healthy',
        incidents: 3,
        incidentsNote: 'Last 24h',
        routesGrid: gridCells([
          ['Route', 'Driver', 'Stops', 'ETA', 'Status'],
          ['R-2201', 'Duy', 12, '35m', 'On Track'],
          ['R-2202', 'Hà', 9, '1h', 'On Track'],
          ['R-2203', 'Minh', 15, '2h', 'Delayed'],
          ['R-2204', 'Lan', 7, '25m', 'On Track'],
        ]),
      },
    },
    onConnect: (ctx: ScenarioCtx) => {
      const run = async () => {
        for (let i = 0; i < 6; i++) {
          await ctx.delay(380)
          ctx.publish({
            type: 'state.delta',
            conversationId,
            delta: [
              { op: 'replace', path: '/logistics/onTime', value: 92 - (i % 3) },
              { op: 'replace', path: '/logistics/incidents', value: 3 + (i % 2) },
            ],
          })
        }
      }
      void run()
    },
    onAction: async (_event: ChatKitActionEvent, ctx: ScenarioCtx) => {
      await ctx.delay(140)
    },
  },

  industry_education: {
    title: 'Education / Training',
    viewTitle: 'Learning Analytics',
    widgets: [
      {
        type: 'box',
        props: { padding: 'none', className: 'w-full overflow-hidden rounded-[28px] bg-white ring-1 ring-slate-200 shadow-xl' },
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
                    props: { gap: 'xs' },
                    children: [
                      { type: 'text', props: { as: 'h2', value: 'Learning Analytics', className: 'text-3xl font-semibold tracking-tight text-slate-900' } },
                      { type: 'text', props: { value: 'Theo dõi tiến độ học, completion rate và feedback.', className: 'text-sm text-slate-600' } },
                    ],
                  },
                  {
                    type: 'row',
                    props: { gap: 'sm', className: 'items-center' },
                    children: [
                      { type: 'badge', props: { text: 'LIVE', variant: 'success', size: 'sm' } },
                      { type: 'chip', props: { label: 'Sync', variant: 'outline', size: 'sm', action: { type: 'chatkit.edu.sync' } } },
                    ],
                  },
                ],
              },
              { type: 'divider', props: { className: 'my-5' } },
              {
                type: 'row',
                props: { gap: 'md', className: 'items-stretch' },
                children: [
                  {
                    type: 'card',
                    props: { padding: 'md', className: 'flex-1 bg-slate-50 ring-1 ring-slate-200' },
                    children: [
                      { type: 'text', props: { value: 'Active learners', className: 'text-xs font-semibold text-slate-500' } },
                      { type: 'text', props: { className: 'mt-2 text-2xl font-semibold text-slate-900', bindings: { value: { path: '/edu/active', default: 0 } } } },
                    ],
                  },
                  {
                    type: 'card',
                    props: { padding: 'md', className: 'flex-1 bg-slate-50 ring-1 ring-slate-200' },
                    children: [
                      { type: 'text', props: { value: 'Completion', className: 'text-xs font-semibold text-slate-500' } },
                      { type: 'progress', props: { className: 'mt-3', showLabel: true, bindings: { value: { path: '/edu/completion', default: 0 }, max: { path: '/edu/completionMax', default: 100 } } } },
                    ],
                  },
                  {
                    type: 'card',
                    props: { padding: 'md', className: 'flex-1 bg-slate-50 ring-1 ring-slate-200' },
                    children: [
                      { type: 'text', props: { value: 'Feedback', className: 'text-xs font-semibold text-slate-500' } },
                      { type: 'rating', props: { showValue: true, bindings: { value: { path: '/edu/feedback', default: 4.4 } }, className: 'mt-2' } },
                    ],
                  },
                ],
              },
              {
                type: 'card',
                props: { padding: 'md', className: 'mt-4 bg-white ring-1 ring-slate-200' },
                children: [
                  { type: 'text', props: { value: 'Khoá học nổi bật', className: 'text-sm font-semibold text-slate-900' } },
                  { type: 'text', props: { value: 'Danh sách progress theo cohort (demo).', className: 'mt-1 text-xs text-slate-600' } },
                  {
                    type: 'excel_grid',
                    props: {
                      className: 'mt-4',
                      height: 360,
                      editable: false,
                      enableCopyPaste: false,
                      showRowNumbers: false,
                      showColumnLetters: false,
                      rowHeight: 36,
                      colWidth: 200,
                      bindings: { value: { path: '/edu/coursesGrid', default: {} } },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    state: {
      edu: {
        active: 1240,
        completion: 68,
        completionMax: 100,
        feedback: 4.5,
        coursesGrid: gridCells([
          ['Course', 'Cohort', 'Enrolled', 'Completed', 'Status'],
          ['Sales Onboarding', 'Jan', 320, '61%', 'Running'],
          ['CS Playbook', 'Jan', 210, '73%', 'Running'],
          ['Security Basics', 'Dec', 480, '92%', 'Done'],
          ['Product 101', 'Jan', 230, '55%', 'Running'],
        ]),
      },
    },
    onConnect: (ctx: ScenarioCtx) => {
      const run = async () => {
        for (let i = 0; i < 6; i++) {
          await ctx.delay(400)
          ctx.publish({
            type: 'state.delta',
            conversationId,
            delta: [
              { op: 'replace', path: '/edu/completion', value: 68 + (i % 3) },
              { op: 'replace', path: '/edu/feedback', value: 4.5 - (i % 2) * 0.1 },
            ],
          })
        }
      }
      void run()
    },
    onAction: async (_event: ChatKitActionEvent, ctx: ScenarioCtx) => {
      await ctx.delay(140)
    },
  },
}

type ScenarioId =
  | 'overview'
  | 'task_form'
  | 'upload'
  | 'search'
  | 'dashboard'
  | 'stream_ui_connect'
  | 'stream_ui_prompt'
  | 'industry_retail'
  | 'industry_finance'
  | 'industry_healthcare'
  | 'industry_logistics'
  | 'industry_education'

type ScenarioDefinition = {
  title: string
  viewTitle: string
  widgets: UIComponent[]
  state?: ChatKitState
  activities?: ChatKitActivity[]
  onConnect?: (ctx: { publish: (event: ChatStreamEvent) => void; delay: (ms: number) => Promise<void> }) => void
  onPrompt?: (prompt: string, ctx: { publish: (event: ChatStreamEvent) => void; delay: (ms: number) => Promise<void> }) => void | Promise<void>
  onAction?: (
    event: ChatKitActionEvent,
    ctx: { publish: (event: ChatStreamEvent) => void; delay: (ms: number) => Promise<void> }
  ) => void | Promise<void>
}

const scenarioMap: Record<ScenarioId, ScenarioDefinition> = {
  ...industryScenarioMap,
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

  stream_ui_connect: {
    title: 'Stream UI (on connect)',
    viewTitle: 'Live UI',
    widgets: [],
    state: { live: { statusText: 'Đang khởi tạo…', progress: 0, max: 100, resultText: '' } },
    onConnect: (ctx) => {
      const run = async () => {
        ctx.publish({
          type: 'ui.patch',
          conversationId,
          ui: {
            version: 1,
            nodes: [
              {
                type: 'card',
                props: {
                  title: 'Kết nối realtime',
                  subtitle: 'UI được cập nhật bằng ui.patch + bindings từ state',
                  padding: 'md',
                  className: 'w-full bg-slate-50 ring-1 ring-slate-200',
                },
                children: [
                  {
                    type: 'badge',
                    props: {
                      variant: 'info',
                      bindings: { text: { path: '/live/statusText', default: 'Đang khởi tạo…' } },
                    },
                  },
                  {
                    type: 'progress',
                    props: {
                      showLabel: false,
                      className: 'mt-3',
                      bindings: {
                        value: { path: '/live/progress', default: 0 },
                        max: { path: '/live/max', default: 100 },
                      },
                    },
                  },
                ],
              },
            ],
          },
        })

        for (let i = 1; i <= 5; i++) {
          await ctx.delay(220)
          ctx.publish({
            type: 'state.delta',
            conversationId,
            delta: [
              { op: 'replace', path: '/live/progress', value: i * 20 },
              { op: 'replace', path: '/live/statusText', value: `Đang tải UI: ${i}/5` },
            ],
          })
        }

        await ctx.delay(320)
        ctx.publish({
          type: 'ui.patch',
          conversationId,
          ui: {
            version: 1,
            nodes: [
              {
                type: 'card',
                props: {
                  title: 'UI đã sẵn sàng',
                  subtitle: 'Đây là patch UI thứ 2',
                  padding: 'md',
                  className: 'w-full bg-white ring-1 ring-slate-200 shadow-sm',
                },
                children: [
                  { type: 'text', props: { value: 'Bạn có thể gửi tin nhắn để xem streaming message.' } },
                  {
                    type: 'box',
                    props: { padding: 'md', className: 'mt-3 rounded-2xl bg-slate-950 text-slate-100' },
                    children: [
                      { type: 'text', props: { value: 'status:', className: 'text-xs font-semibold text-slate-300' } },
                      {
                        type: 'text',
                        props: {
                          className: 'mt-2 whitespace-pre-wrap font-mono text-xs',
                          bindings: { value: { path: '/live/statusText', default: '' } },
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        })

        ctx.publish({
          type: 'state.delta',
          conversationId,
          delta: [
            { op: 'replace', path: '/live/statusText', value: 'Hoàn tất' },
            { op: 'replace', path: '/live/resultText', value: 'UI streamed on connect\nState streamed via JSON Patch' },
          ],
        })
      }

      void run()
    },
  },

  stream_ui_prompt: {
    title: 'Stream UI + Data (on prompt)',
    viewTitle: 'Live Run',
    widgets: [],
    state: { live: { statusText: 'Idle', progress: 0, max: 100, resultText: '' } },
    onPrompt: async (prompt, ctx) => {
      const actId = `act_live_${Date.now()}`

      ctx.publish({
        type: 'state.snapshot',
        conversationId,
        snapshot: { live: { statusText: 'Đang chạy…', progress: 0, max: 100, resultText: '' } },
      })

      ctx.publish({
        type: 'activity.snapshot',
        conversationId,
        activity: {
          id: actId,
          activityType: 'RUN',
          content: { status: 'running', logs: [] },
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      })

      ctx.publish({
        type: 'ui.patch',
        conversationId,
        ui: {
          version: 1,
          nodes: [
            {
              type: 'card',
              props: {
                title: 'Đang xử lý',
                subtitle: prompt ? `Prompt: ${prompt}` : 'Prompt: (empty)',
                padding: 'md',
                className: 'w-full bg-slate-50 ring-1 ring-slate-200',
              },
              children: [
                {
                  type: 'badge',
                  props: {
                    variant: 'info',
                    bindings: { text: { path: '/live/statusText', default: 'Đang chạy…' } },
                  },
                },
                {
                  type: 'progress',
                  props: {
                    showLabel: false,
                    className: 'mt-3',
                    bindings: {
                      value: { path: '/live/progress', default: 0 },
                      max: { path: '/live/max', default: 100 },
                    },
                  },
                },
                { type: 'divider', props: { className: 'my-4' } },
                {
                  type: 'box',
                  props: { padding: 'md', className: 'rounded-2xl bg-slate-950 text-slate-100' },
                  children: [
                    { type: 'text', props: { value: 'result', className: 'text-xs font-semibold text-slate-300' } },
                    {
                      type: 'text',
                      props: {
                        className: 'mt-2 whitespace-pre-wrap font-mono text-xs',
                        bindings: { value: { path: '/live/resultText', default: '(streaming...)' } },
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      })

      for (let i = 1; i <= 6; i++) {
        await ctx.delay(220)
        ctx.publish({
          type: 'state.delta',
          conversationId,
          delta: [
            { op: 'replace', path: '/live/progress', value: i * 15 },
            { op: 'replace', path: '/live/statusText', value: `Đang xử lý ${i}/6` },
            { op: 'replace', path: '/live/resultText', value: `chunk ${i}/6\n` },
          ],
        })

        ctx.publish({
          type: 'activity.delta',
          conversationId,
          activityId: actId,
          patch: [{ op: 'add', path: '/logs/-', value: { t: Date.now(), msg: `Step ${i}/6 done` } }],
        })
      }

      await ctx.delay(220)
      ctx.publish({
        type: 'state.delta',
        conversationId,
        delta: [
          { op: 'replace', path: '/live/progress', value: 100 },
          { op: 'replace', path: '/live/statusText', value: 'Hoàn tất' },
          { op: 'replace', path: '/live/resultText', value: 'Kết quả A\nKết quả B\nKết quả C' },
        ],
      })

      ctx.publish({
        type: 'activity.delta',
        conversationId,
        activityId: actId,
        patch: [{ op: 'replace', path: '/status', value: 'completed' }],
      })

      ctx.publish({
        type: 'ui.patch',
        conversationId,
        ui: {
          version: 1,
          nodes: [
            {
              type: 'card',
              props: {
                title: 'Kết quả',
                subtitle: 'UI patch cuối sau khi stream data',
                padding: 'md',
                className: 'w-full bg-white ring-1 ring-slate-200 shadow-sm',
              },
              children: [
                {
                  type: 'badge',
                  props: {
                    variant: 'success',
                    bindings: { text: { path: '/live/statusText', default: 'Hoàn tất' } },
                  },
                },
                {
                  type: 'box',
                  props: { padding: 'md', className: 'mt-3 rounded-2xl bg-slate-950 text-slate-100' },
                  children: [
                    {
                      type: 'text',
                      props: {
                        className: 'whitespace-pre-wrap font-mono text-xs',
                        bindings: { value: { path: '/live/resultText', default: '' } },
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  props: { gap: 'sm', className: 'mt-4 justify-end' },
                  children: [
                    { type: 'button', props: { variant: 'secondary', label: 'Run again', action: { type: 'chatkit.live.run' } } },
                  ],
                },
              ],
            },
          ],
        },
      })
    },
    onAction: async (event, ctx) => {
      if (event.type === 'chatkit.live.run') {
        await ctx.delay(80)
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

      const prompt = input.text || input.markdown || ''
      void scenario.onPrompt?.(prompt, { publish, delay })
      void simulateStream(prompt)

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
export const Split_StreamUI_OnConnect: Story = { render: () => <StoryShell scenarioId="stream_ui_connect" mode="split" /> }
export const Split_StreamUI_OnPrompt: Story = { render: () => <StoryShell scenarioId="stream_ui_prompt" mode="split" /> }
export const Split_Industry_Retail: Story = { render: () => <StoryShell scenarioId="industry_retail" mode="split" /> }
export const Split_Industry_Finance: Story = { render: () => <StoryShell scenarioId="industry_finance" mode="split" /> }
export const Split_Industry_Healthcare: Story = { render: () => <StoryShell scenarioId="industry_healthcare" mode="split" /> }
export const Split_Industry_Logistics: Story = { render: () => <StoryShell scenarioId="industry_logistics" mode="split" /> }
export const Split_Industry_Education: Story = { render: () => <StoryShell scenarioId="industry_education" mode="split" /> }
export const Floating_DashboardWidgetsInChat: Story = {
  render: () => <StoryShell scenarioId="dashboard" mode="floating" renderWidgetsInChat={true} />,
}
