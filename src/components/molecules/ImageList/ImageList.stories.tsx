// File: src/components/molecules/ImageList/ImageList.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { ImageList, type ImageListItem } from './ImageList'

const meta: Meta<typeof ImageList> = {
  title: 'Molecules/ImageList',
  component: ImageList,
}

export default meta

type Story = StoryObj<typeof ImageList>

const sampleItems: ImageListItem[] = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=600&q=80',
    title: 'Mountain view',
    subtitle: 'A peaceful mountain landscape.',
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=600&q=80',
    title: 'Forest path',
    subtitle: 'A path through the green forest.',
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80',
    title: 'City skyline',
    subtitle: 'City skyline during golden hour.',
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1523755231516-e43fd2e8dca5?auto=format&fit=crop&w=600&q=80',
    title: 'Workspace',
    subtitle: 'Minimalist workspace setup.',
  },
]

export const Basic: Story = {
  args: {
    items: sampleItems,
    cols: 3,
  },
}

export const TwoColumns: Story = {
  args: {
    items: sampleItems,
    cols: 2,
  },
}
