import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ResponsiveGrid, ResponsiveGridItem } from './ResponsiveGrid'

const meta = {
  title: 'Atoms/ResponsiveGrid',
  component: ResponsiveGrid,
  tags: ['autodocs'],
  args: {
    gap: 'md',
  },
} satisfies Meta<typeof ResponsiveGrid>

export default meta

type Story = StoryObj<typeof meta>

const Box: React.FC<{ label: string; className?: string }> = ({ label, className }) => (
  <div
    className={
      'flex h-16 items-center justify-center rounded bg-blue-50 text-[11px] font-medium text-blue-700 border border-blue-100 ' +
      (className ?? '')
    }
  >
    {label}
  </div>
)

export const Basic: Story = {
  render: (args) => (
    <ResponsiveGrid {...args} cols={{ xs: 1, sm: 2, lg: 3 }}>
      <ResponsiveGridItem>
        <Box label="Item 1" />
      </ResponsiveGridItem>
      <ResponsiveGridItem>
        <Box label="Item 2" />
      </ResponsiveGridItem>
      <ResponsiveGridItem>
        <Box label="Item 3" />
      </ResponsiveGridItem>
      <ResponsiveGridItem>
        <Box label="Item 4" />
      </ResponsiveGridItem>
      <ResponsiveGridItem>
        <Box label="Item 5" />
      </ResponsiveGridItem>
      <ResponsiveGridItem>
        <Box label="Item 6" />
      </ResponsiveGridItem>
    </ResponsiveGrid>
  ),
}

export const WithSpans: Story = {
  render: (args) => (
    <ResponsiveGrid {...args} cols={{ xs: 1, sm: 2, lg: 4 }}>
      <ResponsiveGridItem span={{ xs: 1, sm: 2, lg: 2 }}>
        <Box label="A: xs=1, sm=2, lg=2" />
      </ResponsiveGridItem>
      <ResponsiveGridItem span={{ xs: 1, sm: 1, lg: 1 }}>
        <Box label="B: xs=1, sm=1, lg=1" />
      </ResponsiveGridItem>
      <ResponsiveGridItem span={{ xs: 1, sm: 2, lg: 1 }}>
        <Box label="C: xs=1, sm=2, lg=1" />
      </ResponsiveGridItem>
      <ResponsiveGridItem span={{ xs: 1, sm: 2, lg: 4 }}>
        <Box label="D: xs=1, sm=2, lg=4 (full row on lg)" />
      </ResponsiveGridItem>
      <ResponsiveGridItem span={{ xs: 1, sm: 1, lg: 2 }}>
        <Box label="E: xs=1, sm=1, lg=2" />
      </ResponsiveGridItem>
      <ResponsiveGridItem span={{ xs: 1, sm: 1, lg: 1 }}>
        <Box label="F: xs=1, sm=1, lg=1" />
      </ResponsiveGridItem>
    </ResponsiveGrid>
  ),
}
