import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from './Skeleton'

const meta = {
  title: 'Atoms/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  args: {
    variant: 'rect',
    width: '100%',
    height: 16,
    animate: true,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circle', 'rect'],
    },
    animate: { control: 'boolean' },
  },
} satisfies Meta<typeof Skeleton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const CardPlaceholder: Story = {
  render: () => (
    <div className="w-64 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <Skeleton variant="circle" width={40} height={40} />
        <div className="flex-1">
          <Skeleton variant="text" width="60%" className="mb-2" />
          <Skeleton variant="text" width="40%" />
        </div>
      </div>
      <Skeleton variant="rect" height={120} className="mb-4 rounded-lg" />
      <Skeleton variant="text" width="90%" className="mb-2" />
      <Skeleton variant="text" width="80%" />
    </div>
  ),
}
