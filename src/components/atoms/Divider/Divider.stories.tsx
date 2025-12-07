// File: src/components/atoms/Divider/Divider.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Divider } from './Divider'

const meta = {
  title: 'Atoms/Divider',
  component: Divider,
  tags: ['autodocs'],
} satisfies Meta<typeof Divider>

export default meta

type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  args: {},
}

export const WithLabel: Story = {
  args: {
    label: 'Section',
    align: 'center',
  },
}

export const Vertical: Story = {
  render: () => (
    <div className="flex h-16 items-center">
      <span>Left</span>
      <Divider orientation="vertical" />
      <span>Right</span>
    </div>
  ),
}
