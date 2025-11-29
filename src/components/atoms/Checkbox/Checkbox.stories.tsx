import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './Checkbox'

const meta = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: {
    label: 'Accept terms',
  },
  argTypes: {
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    variant: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger', 'info'],
    },
  },
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
}

export const ErrorState: Story = {
  args: {
    error: true,
    label: 'Must accept policy',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Checkbox {...args} variant="primary" label="Primary" defaultChecked />
      <Checkbox {...args} variant="success" label="Success" defaultChecked />
      <Checkbox {...args} variant="warning" label="Warning" defaultChecked />
      <Checkbox {...args} variant="danger" label="Danger" defaultChecked />
      <Checkbox {...args} variant="info" label="Info" defaultChecked />
    </div>
  ),
}
