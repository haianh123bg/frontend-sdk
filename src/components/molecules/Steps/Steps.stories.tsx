// File: src/components/molecules/Steps/Steps.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Steps, type StepsProps } from './Steps'
import { StepNavigation } from './StepNavigation'

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
        <Steps
          {...args}
          items={args.items ?? defaultItems}
          current={current}
          onChange={setCurrent}
        />
        <StepNavigation
          current={current}
          total={(args.items ?? defaultItems).length}
          onPrev={() => setCurrent((c) => Math.max(0, c - 1))}
          onNext={() =>
            setCurrent((c) => Math.min((args.items ?? defaultItems).length - 1, c + 1))
          }
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
