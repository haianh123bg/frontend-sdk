import type { Meta, StoryObj } from '@storybook/react'
import { Radio } from './Radio'

const meta = {
  title: 'Atoms/Radio',
  component: Radio,
  tags: ['autodocs'],
  args: {
    label: 'Option 1',
    name: 'example-radio-group',
  },
  argTypes: {
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    variant: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger', 'info'],
    },
  },
} satisfies Meta<typeof Radio>

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
    label: 'Invalid option',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Unavailable option',
  },
}

export const RadioGroup: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Radio name="group1" label="Option A" value="a" defaultChecked />
      <Radio name="group1" label="Option B" value="b" />
      <Radio name="group1" label="Option C" value="c" disabled />
    </div>
  ),
}

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Radio {...args} variant="primary" label="Primary" defaultChecked />
      <Radio {...args} variant="success" label="Success" defaultChecked />
      <Radio {...args} variant="warning" label="Warning" defaultChecked />
      <Radio {...args} variant="danger" label="Danger" defaultChecked />
      <Radio {...args} variant="info" label="Info" defaultChecked />
    </div>
  ),
}
