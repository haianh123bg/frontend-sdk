import type { Meta, StoryObj } from '@storybook/react'
import { Spinner } from './Spinner'

const meta = {
  title: 'Molecules/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  args: {
    size: 'md',
    variant: 'primary',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'white'],
    },
  },
} satisfies Meta<typeof Spinner>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-4 rounded bg-slate-100 p-4">
      <Spinner variant="primary" />
      <Spinner variant="secondary" />
      <div className="rounded bg-primary-500 p-2">
        <Spinner variant="white" />
      </div>
    </div>
  ),
}
