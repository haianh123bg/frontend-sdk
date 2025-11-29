import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../../atoms/Button/Button'
import { Card } from '../../atoms/Card/Card'
import { DashboardLayout } from './DashboardLayout'

const meta = {
  title: 'Organisms/DashboardLayout',
  component: DashboardLayout,
  tags: ['autodocs'],
  args: {
    header: (
      <div className="flex flex-1 items-center justify-between">
        <div>
          <p className="text-sm text-text-muted">Redai Platform</p>
          <h2 className="text-lg font-semibold text-text-primary">Overview</h2>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost">Invite</Button>
          <Button>New Report</Button>
        </div>
      </div>
    ),
    sidebar: (
      <nav className="flex flex-col gap-2 text-sm">
        {['Dashboard', 'Customers', 'Analytics', 'Settings'].map((item) => (
          <button key={item} className="rounded-xl px-3 py-2 text-left text-text-secondary hover:bg-slate-100">
            {item}
          </button>
        ))}
      </nav>
    ),
    children: (
      <div className="grid gap-4 md:grid-cols-2">
        {Array(4)
          .fill(null)
          .map((_, i) => (
            <Card key={i} title={`Metric ${i + 1}`} subtitle="QoQ Growth">
              <div className="h-24 rounded-xl bg-slate-100" />
            </Card>
          ))}
      </div>
    ),
  },
} satisfies Meta<typeof DashboardLayout>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithoutSidebar: Story = {
  args: {
    sidebar: undefined,
  },
}

export const DenseContent: Story = {
  args: {
    children: (
      <div className="space-y-4">
        {Array(6)
          .fill(null)
          .map((_, i) => (
            <Card key={i} title={`Module ${i + 1}`}>
              <p className="text-text-secondary">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </p>
            </Card>
          ))}
      </div>
    ),
  },
}
