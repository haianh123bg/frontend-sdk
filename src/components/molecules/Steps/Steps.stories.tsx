// File: src/components/molecules/Steps/Steps.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Steps, type StepsProps } from './Steps'

const meta: Meta<typeof Steps> = {
  title: 'Molecules/Steps',
  component: Steps,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger', 'info'],
    },
    direction: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
    },
  },
}

export default meta

type Story = StoryObj<typeof Steps>

const defaultItems: StepsProps['items'] = [
  {
    title: 'Bước 1',
    description: 'Nhập thông tin cơ bản',
  },
  {
    title: 'Bước 2',
    description: 'Xác thực dữ liệu',
  },
  {
    title: 'Bước 3',
    description: 'Hoàn tất và xác nhận',
  },
]

export const Horizontal: Story = {
  args: {
    items: defaultItems,
    current: 1,
    direction: 'horizontal',
    variant: 'primary',
    className: 'p-8 bg-surface-elevated rounded-lg',
  },
}

export const Vertical: Story = {
  args: {
    items: defaultItems,
    current: 1,
    direction: 'vertical',
    variant: 'primary',
    className: 'p-8 bg-surface-elevated rounded-lg max-w-md',
  },
}

export const Playground: Story = {
  render: (args: StepsProps) => {
    const [current, setCurrent] = useState(args.current ?? 0)

    return (
      <div className="space-y-4 p-8 bg-surface-elevated rounded-lg">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-md bg-primary-500 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-primary-600 disabled:cursor-not-allowed disabled:bg-slate-300"
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current <= 0}
          >
            Trước
          </button>
          <button
            type="button"
            className="rounded-md bg-primary-500 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-primary-600 disabled:cursor-not-allowed disabled:bg-slate-300"
            onClick={() => setCurrent((c) => Math.min((args.items ?? defaultItems).length - 1, c + 1))}
            disabled={current >= (args.items ?? defaultItems).length - 1}
          >
            Tiếp
          </button>
          <span className="text-xs text-text-muted">
            Step hiện tại: {current + 1} / {(args.items ?? defaultItems).length}
          </span>
        </div>

        <Steps
          {...args}
          items={args.items ?? defaultItems}
          current={current}
          onChange={setCurrent}
        />
      </div>
    )
  },
  args: {
    items: defaultItems,
    current: 1,
    direction: 'horizontal',
    variant: 'primary',
  },
}
