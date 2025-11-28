// File: src/components/atoms/Card/Card.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './Card'

const meta = {
  title: 'Atoms/Card',
  component: Card,
  tags: ['autodocs'],
  args: {
    title: 'Quarterly Revenue',
    subtitle: 'Q3 vs Q2',
    children: 'Revenue increased 12% QoQ thanks to the launch of the premium tier.',
    footer: 'Updated 2 hours ago',
  },
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithHighlight: Story = {
  args: {
    highlight: 'Finance',
  },
}

export const WithMedia: Story = {
  args: {
    media: <div className="aspect-video bg-slate-200" />,
    mediaPosition: 'top',
  },
}

export const Compact: Story = {
  args: {
    compact: true,
    children: 'Compact cards are perfect for dense dashboards with limited real estate.',
  },
}
