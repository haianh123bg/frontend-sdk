import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { SchemaRenderer, type SchemaRendererProps } from './SchemaRenderer'
import type { ChatKitActionEvent } from './contracts'
import type { UIComponent } from './types'

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
