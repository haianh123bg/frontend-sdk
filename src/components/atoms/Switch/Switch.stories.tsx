import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from './Switch'
import { Sun } from 'lucide-react'

const meta = {
  title: 'Atoms/Switch',
  component: Switch,
  tags: ['autodocs'],
  args: {
    label: 'Notifications',
  },
  argTypes: {
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
  },
} satisfies Meta<typeof Switch>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
}

export const WithoutLabel: Story = {
  args: {
    label: undefined,
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Switch label="Primary" defaultChecked variant="primary" />
      <Switch label="Success" defaultChecked variant="success" />
      <Switch label="Warning" defaultChecked variant="warning" />
      <Switch label="Danger" defaultChecked variant="danger" />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Switch label="Small" defaultChecked size="sm" />
      <Switch label="Medium" defaultChecked size="md" />
      <Switch label="Large" defaultChecked size="lg" />
    </div>
  ),
}

export const InnerIcon: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Switch
        label="Icon left"
        defaultChecked
        size="md"
        innerIcon={Sun}
        innerStyle="default"
      />
      <Switch
        label="Solid"
        defaultChecked
        size="md"
        innerIcon={undefined}
        innerStyle="solid"
      />
    </div>
  ),
}
