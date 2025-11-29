import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: {
    children: 'Badge',
    variant: 'default',
    size: 'md',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'danger', 'info'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Badge>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Variants: Story = {
  render: (args) => (
    <div className="flex gap-2">
      <Badge {...args} variant="default">
        Default
      </Badge>
      <Badge {...args} variant="primary">
        Primary
      </Badge>
      <Badge {...args} variant="success">
        Success
      </Badge>
      <Badge {...args} variant="warning">
        Warning
      </Badge>
      <Badge {...args} variant="danger">
        Danger
      </Badge>
      <Badge {...args} variant="info">
        Info
      </Badge>
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Badge {...args} size="sm">
        Small
      </Badge>
      <Badge {...args} size="md">
        Medium
      </Badge>
      <Badge {...args} size="lg">
        Large
      </Badge>
    </div>
  ),
}
