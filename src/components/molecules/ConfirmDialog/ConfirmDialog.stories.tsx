import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../../atoms/Button/Button'
import { ConfirmDialog } from './ConfirmDialog'

const meta = {
  title: 'Molecules/ConfirmDialog',
  component: ConfirmDialog,
  tags: ['autodocs'],
  args: {
    title: 'Delete item',
    description: 'This action cannot be undone. This will permanently delete the item.',
    confirmLabel: 'Delete',
    cancelLabel: 'Cancel',
    confirmVariant: 'danger',
    open: false,
  },
} satisfies Meta<typeof ConfirmDialog>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false)

    return (
      <div className="flex flex-col items-start gap-4 p-8">
        <Button variant="danger" onClick={() => setOpen(true)}>
          Delete item
        </Button>
        <ConfirmDialog
          {...args}
          open={open}
          onOpenChange={setOpen}
        />
      </div>
    )
  },
}

export const WithAsyncAction: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false)

    return (
      <div className="flex flex-col items-start gap-4 p-8">
        <Button variant="danger" onClick={() => setOpen(true)}>
          Delete with async
        </Button>
        <ConfirmDialog
          {...args}
          open={open}
          onOpenChange={setOpen}
          onConfirm={async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000))
          }}
        />
      </div>
    )
  },
}
