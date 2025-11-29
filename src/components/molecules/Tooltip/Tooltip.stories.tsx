import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../../atoms/Button/Button'
import { Tooltip } from './Tooltip'

const meta = {
  title: 'Molecules/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  args: {
    content: 'This is a tooltip',
    children: <Button>Hover me</Button>,
    position: 'top',
  },
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
  },
} satisfies Meta<typeof Tooltip>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Positions: Story = {
  render: () => (
    <div className="flex items-center justify-center gap-8 p-12">
      <Tooltip content="Top Tooltip" position="top">
        <Button variant="secondary">Top</Button>
      </Tooltip>
      <Tooltip content="Bottom Tooltip" position="bottom">
        <Button variant="secondary">Bottom</Button>
      </Tooltip>
      <Tooltip content="Left Tooltip" position="left">
        <Button variant="secondary">Left</Button>
      </Tooltip>
      <Tooltip content="Right Tooltip" position="right">
        <Button variant="secondary">Right</Button>
      </Tooltip>
    </div>
  ),
}
