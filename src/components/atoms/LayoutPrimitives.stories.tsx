import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentType } from 'react'
import { Box, Col, Divider, Row, Spacer } from './LayoutPrimitives'

const meta = {
  title: 'Atoms/LayoutPrimitives',
  component: Box,
  subcomponents: {
    Row: Row as ComponentType<any>,
    Col: Col as ComponentType<any>,
    Spacer: Spacer as ComponentType<any>,
    Divider: Divider as ComponentType<any>,
  },
  tags: ['autodocs'],
  args: {
    padding: 'md',
    className: 'rounded-xl border border-slate-200 bg-surface text-text-primary shadow-sm',
    children: 'Box content area',
  },
} satisfies Meta<typeof Box>

export default meta

type Story = StoryObj<typeof meta>

export const BasicBox: Story = {}

export const RowWithGap: Story = {
  render: (args) => (
    <Row gap="md" className="rounded-xl border border-dashed border-slate-300 bg-surface p-4">
      <Box className="flex-1 text-center" {...args}>
        Left
      </Box>
      <Box className="flex-1 text-center" {...args}>
        Right
      </Box>
    </Row>
  ),
}

export const ColumnStack: Story = {
  render: (args) => (
    <Col gap="sm" className="rounded-xl border border-slate-200 bg-surface p-4">
      <Box {...args}>Header</Box>
      <Box {...args} className="min-h-[120px]">
        Content
      </Box>
      <Box {...args}>Footer</Box>
    </Col>
  ),
}

export const SpacerShowcase: Story = {
  render: () => (
    <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-surface p-4">
      {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <div key={size} className="flex items-center gap-3 text-sm text-slate-600">
          <span className="w-16 text-right text-xs uppercase tracking-wide text-slate-400">{size}</span>
          <div className="flex items-center gap-2">
            <span className="text-slate-500">|</span>
            <Spacer size={size} />
            <span className="text-slate-500">|</span>
          </div>
        </div>
      ))}
    </div>
  ),
}

export const DividerUsage: Story = {
  render: () => (
    <div className="rounded-xl border border-slate-200 bg-surface p-4 text-sm text-slate-600">
      <p className="font-medium text-slate-900">Section Heading</p>
      <Divider className="my-2" />
      <p>
        Dividers giúp phân tách nội dung trong dashboard. Kết hợp với padding để duy trì spacing đồng nhất giữa các
        khu vực.
      </p>
    </div>
  ),
}
