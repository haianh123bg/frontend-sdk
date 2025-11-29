import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../../atoms/Button/Button'
import { Modal } from './Modal'

const meta = {
  title: 'Molecules/Modal',
  component: Modal,
  tags: ['autodocs'],
  args: {
    title: 'Modal Title',
    children: <p className="text-text-secondary">This is the modal content.</p>,
    open: false,
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    open: { control: 'boolean' },
  },
} satisfies Meta<typeof Modal>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal {...args} open={isOpen} onClose={() => setIsOpen(false)}>
          <p className="mb-4 text-text-secondary">
            This is a standard modal dialog used for confirmation, details, or forms.
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>Confirm</Button>
          </div>
        </Modal>
      </>
    )
  },
}

export const LargeWithScroll: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Large Modal</Button>
        <Modal {...args} size="lg" open={isOpen} onClose={() => setIsOpen(false)} title="Terms and Conditions">
          <div className="space-y-4 text-text-secondary">
            {Array(10)
              .fill(null)
              .map((_, i) => (
                <p key={i}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat.
                </p>
              ))}
          </div>
          <div className="mt-6 flex justify-end">
            <Button onClick={() => setIsOpen(false)}>I Agree</Button>
          </div>
        </Modal>
      </>
    )
  },
}
