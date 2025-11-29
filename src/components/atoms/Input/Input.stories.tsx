import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    placeholder: 'Search reports…',
    type: 'text',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number'],
    },
    error: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithLabel: Story = {
  args: {
    placeholder: 'Your full name',
  },
  render: (args) => (
    <label className="flex flex-col gap-2 text-sm text-text-primary">
      <span className="font-medium">Full name</span>
      <Input {...args} />
    </label>
  ),
}

export const ErrorState: Story = {
  args: {
    placeholder: 'user@company.com',
    type: 'email',
    error: true,
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled field',
    disabled: true,
  },
}

export const Compact: Story = {
  args: {
    placeholder: 'Inline width',
    fullWidth: false,
    className: 'w-64',
  },
}
