import type { Meta, StoryObj } from '@storybook/react'
import { PageLayout } from './PageLayout'
import { SidebarNav } from '../../molecules/SidebarNav/SidebarNav'
import { TopNav } from '../../molecules/TopNav/TopNav'
import { Breadcrumb } from '../../molecules/Breadcrumb/Breadcrumb'
import { SearchInput } from '../../molecules/Search/SearchInput'
import { Button } from '../../atoms/Button/Button'
import { Card } from '../../atoms/Card/Card'

const meta = {
  title: 'Organisms/PageLayout',
  component: PageLayout,
  tags: ['autodocs'],
} satisfies Meta<typeof PageLayout>

export default meta

type Story = StoryObj<typeof meta>

const sidebarDemo = (
  <SidebarNav
    header={<span className="text-xs font-semibold">Main navigation</span>}
    items={[
      { id: 'dashboard', label: 'Dashboard', active: true },
      { id: 'customers', label: 'Customers' },
      { id: 'analytics', label: 'Analytics' },
      { id: 'settings', label: 'Settings' },
    ]}
  />
)

const headerDemo = (
  <TopNav
    left={
      <div className="flex items-center gap-3">
        <div>
          <p className="text-xs text-text-muted">Redon SDK</p>
          <h2 className="text-sm font-semibold text-text-primary">Overview</h2>
        </div>
      </div>
    }
    right={
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm">
          Invite
        </Button>
        <Button size="sm">New report</Button>
      </div>
    }
  />
)

export const DashboardLike: Story = {
  args: {
    sidebar: sidebarDemo,
    header: headerDemo,
    children: (
      <div className="grid gap-4 md:grid-cols-2">
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <Card key={index} title={`Widget ${index + 1}`} subtitle="Summary">
              <div className="h-24 rounded-xl bg-slate-100" />
            </Card>
          ))}
      </div>
    ),
  },
}

export const WithBreadcrumbAndSearch: Story = {
  args: {
    sidebar: sidebarDemo,
    header: (
      <TopNav
        left={
          <div className="flex flex-col gap-1">
            <Breadcrumb
              items={[
                { label: 'Home' },
                { label: 'Projects' },
                { label: 'SDK Frontend', href: '#' },
              ]}
            />
            <h2 className="text-sm font-semibold text-text-primary">Project overview</h2>
          </div>
        }
        right={
          <div className="flex items-center gap-3">
            <div className="w-56">
              <SearchInput placeholder="Search..." debounceMs={400} />
            </div>
            <Button size="sm">New project</Button>
          </div>
        }
      />
    ),
    children: (
      <div className="space-y-4">
        <Card title="Summary" subtitle="High-level metrics">
          <div className="h-24 rounded-xl bg-slate-100" />
        </Card>
        <Card title="Activity" subtitle="Recent changes">
          <div className="h-40 rounded-xl bg-slate-100" />
        </Card>
      </div>
    ),
  },
}
