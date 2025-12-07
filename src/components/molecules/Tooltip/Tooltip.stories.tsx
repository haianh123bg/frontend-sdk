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
    variant: 'default',
  },
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'error', 'warning', 'info'],
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

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-6 p-12">
      <div className="flex items-center gap-6">
        <Tooltip content="Default tooltip" variant="default">
          <Button variant="secondary">Default</Button>
        </Tooltip>
        <Tooltip content="Success tooltip" variant="success">
          <Button variant="secondary">Success</Button>
        </Tooltip>
        <Tooltip content="Error tooltip" variant="error">
          <Button variant="secondary">Error</Button>
        </Tooltip>
      </div>
      <div className="flex items-center gap-6">
        <Tooltip content="Warning tooltip" variant="warning">
          <Button variant="secondary">Warning</Button>
        </Tooltip>
        <Tooltip content="Info tooltip" variant="info">
          <Button variant="secondary">Info</Button>
        </Tooltip>
      </div>
    </div>
  ),
}
