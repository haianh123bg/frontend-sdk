import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../../atoms/Button/Button'
import { SnackbarProvider, useSnackbar } from './SnackbarProvider'

const meta = {
  title: 'Molecules/Snackbar',
  component: SnackbarProvider,
  tags: ['autodocs'],
  args: {
    maxSnackbars: 3,
  },
  decorators: [
    (Story) => (
      <div className="min-h-[200px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SnackbarProvider>

export default meta

type Story = StoryObj<typeof meta>

const Trigger = () => {
  const { showSnackbar } = useSnackbar()
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Button onClick={() => showSnackbar({ message: 'Info message', variant: 'info' })}>Info</Button>
        <Button
          variant="secondary"
          onClick={() => showSnackbar({ message: 'Success! Saved.', variant: 'success' })}
        >
          Success
        </Button>
        <Button variant="danger" onClick={() => showSnackbar({ message: 'Error occurred!', variant: 'error' })}>
          Error
        </Button>
      </div>
      <Button
        variant="ghost"
        onClick={() =>
          showSnackbar({
            message: 'Undo action?',
            variant: 'warning',
            actionLabel: 'UNDO',
            onAction: () => alert('Undoing...'),
          })
        }
      >
        With Action
      </Button>
    </div>
  )
}

export const Default: Story = {
  args: {
    children: null,
  },
  render: (args) => (
    <SnackbarProvider {...args}>
      <Trigger />
    </SnackbarProvider>
  ),
}
