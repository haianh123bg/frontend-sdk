import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../../atoms/Button/Button'
import { Toast } from './Toast'

const meta = {
  title: 'Molecules/Toast',
  component: Toast,
  tags: ['autodocs'],
  args: {
    message: 'Operation completed successfully',
    variant: 'success',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'],
    },
  },
} satisfies Meta<typeof Toast>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Toast message="Success! Data saved." variant="success" />
      <Toast message="Error: Failed to connect." variant="error" />
      <Toast message="Warning: Storage is full." variant="warning" />
      <Toast message="Info: New version available." variant="info" />
    </div>
  ),
}

export const WithClose: Story = {
  render: () => {
    const [show, setShow] = useState(true)
    if (!show) return <Button onClick={() => setShow(true)}>Show Toast</Button>
    return (
      <Toast
        message="Click the IconButton in the corner to close"
        variant="info"
        onClose={() => setShow(false)}
      />
    )
  },
}
