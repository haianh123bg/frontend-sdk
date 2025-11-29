import type { Meta, StoryObj } from '@storybook/react'
import { Progress } from './Progress'

const meta = {
  title: 'Atoms/Progress',
  component: Progress,
  tags: ['autodocs'],
  args: {
    value: 60,
    max: 100,
    variant: 'primary',
    type: 'linear',
    showLabel: true,
    size: 'md',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'composite'],
    },
    type: {
      control: 'radio',
      options: ['linear', 'circular'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    showLabel: { control: 'boolean' },
  },
} satisfies Meta<typeof Progress>

export default meta

type Story = StoryObj<typeof meta>

export const Linear: Story = {}

export const Circular: Story = {
  args: {
    type: 'circular',
    value: 75,
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-4">
      <Progress value={80} variant="primary" showLabel />
      <Progress value={60} variant="success" showLabel />
      <Progress value={20} variant="danger" showLabel />
    </div>
  ),
}

export const SizesCircular: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Progress type="circular" size="sm" value={25} />
      <Progress type="circular" size="md" value={50} />
      <Progress type="circular" size="lg" value={75} showLabel />
    </div>
  ),
}

export const CompositeGradient: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Progress value={20} variant="composite" showLabel />
      <Progress value={50} variant="composite" showLabel />
      <Progress value={85} variant="composite" showLabel />
    </div>
  ),
}
