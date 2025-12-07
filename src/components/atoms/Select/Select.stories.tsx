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
    const fetchOptions = async ({ page, pageSize, search }: { page: number; pageSize: number; search?: string }) => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 700))

      const start = (page - 1) * pageSize
      const allOptions = Array.from({ length: 50 }, (_, i) => ({
        label: `Lazy Option ${i + 1}`,
        value: `lazy-${i + 1}`,
      }))

      const filtered = search
        ? allOptions.filter((item) => item.label.toLowerCase().includes(search.toLowerCase()))
        : allOptions
      const slice = filtered.slice(start, start + pageSize)

      return {
        data: slice,
        hasMore: start + pageSize < filtered.length,
      }
    }

    return (
      <SelectLazy
        fetchOptions={fetchOptions}
        placeholder="Scroll to load more..."
        pageSize={10}
        enableSearch
        debounceMs={400}
        searchPlaceholder="Tìm kiếm option..."
        emptyText="Không có kết quả"
        loadingText="Đang tải..."
      />
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates infinite scrolling + server-side style search (debounced). Scroll to bottom để load thêm; gõ để lọc server-side.',
      },
    },
  },
}
