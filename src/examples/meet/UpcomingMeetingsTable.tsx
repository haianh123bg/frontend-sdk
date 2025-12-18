import { Copy, Link as LinkIcon, Video } from 'lucide-react'
import { Badge } from '../../components/atoms/Badge/Badge'
import { Button } from '../../components/atoms/Button/Button'
import { Card } from '../../components/atoms/Card/Card'
import { Heading } from '../../components/atoms/Heading/Heading'
import { Icon } from '../../components/atoms/Icon/Icon'
import { Table, TableColumn } from '../../components/organisms/Table/Table'

export type MeetingStatus = 'scheduled' | 'live' | 'ended'

export interface MeetingItem {
  id: string
  title: string
  startTime: string
  durationMin: number
  host: string
  status: MeetingStatus
}

const data: MeetingItem[] = [
  { id: 'M-1024', title: 'Daily Standup', startTime: '09:00', durationMin: 15, host: 'Nguyen Van A', status: 'live' },
  { id: 'M-1025', title: 'Design Review', startTime: '10:30', durationMin: 45, host: 'Tran Thi B', status: 'scheduled' },
  { id: 'M-1026', title: 'Client Demo', startTime: '14:00', durationMin: 30, host: 'Le Van C', status: 'scheduled' },
  { id: 'M-1020', title: 'Retro Sprint 12', startTime: '17:00', durationMin: 60, host: 'Pham Thi D', status: 'ended' },
]

export const UpcomingMeetingsTable = () => {
  const columns: TableColumn<MeetingItem>[] = [
    {
      key: 'title',
      label: 'Meeting',
      render: (row: MeetingItem) => (
        <div>
          <div className="font-medium">{row.title}</div>
          <div className="text-xs text-text-muted">ID: {row.id}</div>
        </div>
      ),
    },
    { key: 'startTime', label: 'Start', width: '10%' },
    {
      key: 'durationMin',
      label: 'Duration',
      align: 'right',
      render: (row: MeetingItem) => <span className="text-sm text-text-secondary">{row.durationMin}m</span>,
    },
    { key: 'host', label: 'Host' },
    {
      key: 'status',
      label: 'Status',
      align: 'center',
      render: (row: MeetingItem) => {
        const map: Record<MeetingStatus, { label: string; variant: 'success' | 'warning' | 'default' }> = {
          live: { label: 'Live', variant: 'success' },
          scheduled: { label: 'Scheduled', variant: 'warning' },
          ended: { label: 'Ended', variant: 'default' },
        }
        const c = map[row.status]
        return <Badge variant={c.variant} size="sm">{c.label}</Badge>
      },
    },
    {
      key: 'actions',
      label: '',
      align: 'right',
      render: (row: MeetingItem) => (
        <div className="flex items-center justify-end gap-2">
          <Button variant="secondary" size="sm" className="gap-2">
            <Icon icon={LinkIcon} size="xs" />
            Copy link
          </Button>
          <Button variant={row.status === 'ended' ? 'secondary' : 'primary'} size="sm" className="gap-2">
            <Icon icon={Video} size="sm" />
            {row.status === 'live' ? 'Join' : row.status === 'scheduled' ? 'Start' : 'View'}
          </Button>
        </div>
      ),
    },
  ]

  return (
    <Card padding="none" className="overflow-hidden">
      <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
        <Heading as="h3" size="md">Upcoming meetings</Heading>
        <Button variant="ghost" className="gap-2">
          <Icon icon={Copy} size="sm" />
          Copy meeting ID
        </Button>
      </div>

      <Table data={data} columns={columns} rowKey={(row: MeetingItem) => row.id} striped stickyHeader />
    </Card>
  )
}
