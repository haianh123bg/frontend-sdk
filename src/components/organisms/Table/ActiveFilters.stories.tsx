// File: src/components/organisms/Table/ActiveFilters.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { ActiveFilters, type ActiveFilterChip } from './ActiveFilters'

const meta: Meta<typeof ActiveFilters> = {
  title: 'Organisms/ActiveFilters',
  component: ActiveFilters,
}

export default meta

type Story = StoryObj<typeof ActiveFilters>

const sampleFilters: ActiveFilterChip[] = [
  { id: 'status', label: 'Status', value: 'active' },
  { id: 'role', label: 'Role', value: 'Admin' },
  { id: 'search', label: 'Search', value: 'alice' },
]

export const Default: Story = {
  render: () => {
    const [filters, setFilters] = useState<ActiveFilterChip[]>(sampleFilters)

    return (
      <ActiveFilters
        filters={filters}
        onRemoveFilter={(id) => setFilters((prev) => prev.filter((f) => f.id !== id))}
        onClearAll={() => setFilters([])}
      />
    )
  },
}

export const NoBackground: Story = {
  render: () => {
    const [filters, setFilters] = useState<ActiveFilterChip[]>(sampleFilters)

    return (
      <div className="space-y-2">
        <p className="text-sm text-text-secondary">
          ActiveFilters không nền, chỉ còn chip + link Clear all, phù hợp để embed vào layout có nền riêng.
        </p>
        <ActiveFilters
          filters={filters}
          noBackground
          onRemoveFilter={(id) => setFilters((prev) => prev.filter((f) => f.id !== id))}
          onClearAll={() => setFilters([])}
        />
      </div>
    )
  },
}
