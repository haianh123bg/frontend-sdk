import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Grid } from './Grid'

const meta = {
  title: 'Atoms/Grid',
  component: Grid,
  tags: ['autodocs'],
} satisfies Meta<typeof Grid>

export default meta

type Story = StoryObj<typeof meta>

const Item: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex h-16 items-center justify-center rounded bg-blue-50 text-xs font-medium text-blue-700 border border-blue-100">
    {children}
  </div>
)

export const TwelveColumns: Story = {
  render: () => (
    <Grid container spacing={2}>
      <Grid size={8}>
        <Item>size=8</Item>
      </Grid>
      <Grid size={4}>
        <Item>size=4</Item>
      </Grid>
      <Grid size={4}>
        <Item>size=4</Item>
      </Grid>
      <Grid size={8}>
        <Item>size=8</Item>
      </Grid>
    </Grid>
  ),
}

export const ResponsiveSizes: Story = {
  render: () => (
    <Grid container spacing={2}>
      <Grid size={{ xs: 6, md: 8 }}>
        <Item>xs=6 md=8</Item>
      </Grid>
      <Grid size={{ xs: 6, md: 4 }}>
        <Item>xs=6 md=4</Item>
      </Grid>
      <Grid size={{ xs: 6, md: 4 }}>
        <Item>xs=6 md=4</Item>
      </Grid>
      <Grid size={{ xs: 6, md: 8 }}>
        <Item>xs=6 md=8</Item>
      </Grid>
    </Grid>
  ),
}
