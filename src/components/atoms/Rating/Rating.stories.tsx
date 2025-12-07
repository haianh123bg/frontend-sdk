// File: src/components/atoms/Rating/Rating.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Rating, type RatingProps } from './Rating'

const meta = {
  title: 'Atoms/Rating',
  component: Rating,
  tags: ['autodocs'],
} satisfies Meta<typeof Rating>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args: RatingProps) => {
    const [value, setValue] = useState<number>(args.value ?? 3)

    return (
      <div className="space-y-4">
        <Rating {...args} value={value} onChange={setValue} />
        <div className="text-sm text-text-secondary">Giá trị hiện tại: {value}</div>
      </div>
    )
  },
  args: {
    max: 5,
    value: 3,
    showValue: true,
  },
}

export const ReadOnly: Story = {
  args: {
    value: 4,
    max: 5,
    readOnly: true,
    showValue: true,
  },
}

export const AllowClear: Story = {
  render: (args: RatingProps) => {
    const [value, setValue] = useState<number>(args.value ?? 0)

    return (
      <div className="space-y-4">
        <Rating {...args} value={value} onChange={setValue} />
        <div className="text-sm text-text-secondary">
          Click lại vào cùng số sao để clear về 0.
        </div>
      </div>
    )
  },
  args: {
    max: 5,
    value: 0,
    allowClear: true,
    showValue: true,
  },
}
