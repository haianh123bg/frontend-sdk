import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from './Textarea'

const meta = {
  title: 'Atoms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  args: {
    placeholder: 'Share a quick update…',
  },
  argTypes: {
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
    },
    error: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
} satisfies Meta<typeof Textarea>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithLabel: Story = {
  render: (args) => (
    <label className="flex flex-col gap-2 text-sm text-text-primary">
      <span className="font-medium">Notes</span>
      <Textarea {...args} />
    </label>
  ),
}

export const ErrorState: Story = {
  args: {
    placeholder: 'Tell us more…',
    error: true,
  },
}

export const LimitedResize: Story = {
  args: {
    resize: 'none',
    rows: 3,
  },
}
