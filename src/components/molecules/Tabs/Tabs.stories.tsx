import type { Meta, StoryObj } from '@storybook/react'
import { Tabs } from './Tabs'

const meta = {
  title: 'Molecules/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  args: {
    tabs: [
      { id: 'tab1', label: 'Account', content: <p className="text-text-secondary">Account settings content</p> },
      { id: 'tab2', label: 'Password', content: <p className="text-text-secondary">Password change form</p> },
      { id: 'tab3', label: 'Billing', content: <p className="text-text-secondary">Billing information</p> },
    ],
  },
} satisfies Meta<typeof Tabs>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithDisabledTab: Story = {
  args: {
    tabs: [
      { id: '1', label: 'General', content: 'General settings' },
      { id: '2', label: 'Advanced', content: 'Advanced settings', disabled: true },
      { id: '3', label: 'Notifications', content: 'Notification preferences' },
    ],
  },
}
