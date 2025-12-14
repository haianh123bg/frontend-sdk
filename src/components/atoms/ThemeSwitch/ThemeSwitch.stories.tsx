import type { Meta, StoryObj } from '@storybook/react'
import { ThemeSwitch } from './ThemeSwitch'

const meta = {
  title: 'Atoms/ThemeSwitch',
  component: ThemeSwitch,
  tags: ['autodocs'],
  args: {
    label: 'Theme',
  },
  argTypes: {
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
  },
} satisfies Meta<typeof ThemeSwitch>

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

export const ToggleSize: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <ThemeSwitch label="24px" toggleSize={24} defaultChecked />
      <ThemeSwitch label="30px" toggleSize={30} defaultChecked />
      <ThemeSwitch label="40px" toggleSize={40} defaultChecked />
    </div>
  ),
}
