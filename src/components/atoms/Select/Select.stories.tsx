import type { Meta, StoryObj } from '@storybook/react'
import { Select } from './Select'
import { SelectLazy } from './SelectLazy'

const meta = {
  title: 'Atoms/Select',
  component: Select,
  tags: ['autodocs'],
  args: {
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
    ],
    placeholder: 'Select an option...',
  },
  argTypes: {
    error: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Select>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithError: Story = {
  args: {
    error: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const Compact: Story = {
  args: {
    fullWidth: false,
    className: 'w-48',
  },
}

export const WithDisabledOption: Story = {
  args: {
    options: [
      { label: 'Available', value: 'ok' },
      { label: 'Out of Stock', value: 'no', disabled: true },
    ],
  },
}

export const LazyLoading = {
  render: () => {
    const fetchOptions = async ({ page, pageSize }: { page: number; pageSize: number }) => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      const start = (page - 1) * pageSize
      const newOptions = Array.from({ length: pageSize }, (_, i) => ({
        label: `Lazy Option ${start + i + 1}`,
        value: `lazy-${start + i + 1}`,
      }))

      return {
        data: newOptions,
        hasMore: page < 5, // Limit to 5 pages
      }
    }

    return (
      <SelectLazy
        fetchOptions={fetchOptions}
        placeholder="Scroll to load more..."
        pageSize={10}
      />
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates infinite scrolling. Scroll down to the bottom of the list to load more items.',
      },
    },
  },
}
