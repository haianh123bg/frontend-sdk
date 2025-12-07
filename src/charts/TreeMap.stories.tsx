// File: src/charts/TreeMap.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { TreeMap } from './TreeMap'
import type { TreeMapDto } from './dto/tree-map.dto'

const meta: Meta<typeof TreeMap> = {
  title: 'Charts/TreeMap',
  component: TreeMap,
}

export default meta

type Story = StoryObj<typeof TreeMap>

const sampleConfig: TreeMapDto = {
  title: 'Revenue by category',
  data: [
    {
      name: 'Business',
      children: [
        { name: 'Enterprise', value: 18 },
        { name: 'SMB', value: 12 },
      ],
    },
    {
      name: 'Educational',
      children: [
        { name: 'K-12', value: 8 },
        { name: 'University', value: 10 },
      ],
    },
    {
      name: 'Games',
      children: [
        { name: 'Mobile', value: 6 },
        { name: 'Console', value: 4 },
        { name: 'PC', value: 5 },
      ],
    },
    {
      name: 'Hardware',
      children: [
        { name: 'Laptops', value: 9 },
        { name: 'Monitors', value: 7 },
        { name: 'Accessories', value: 5 },
      ],
    },
    {
      name: 'Personal',
      children: [
        { name: 'Subscriptions', value: 4 },
        { name: 'One‑time', value: 3 },
      ],
    },
  ],
}

export const Basic: Story = {
  args: {
    config: sampleConfig,
    height: 360,
  },
}
