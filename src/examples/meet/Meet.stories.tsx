import type { Meta, StoryObj } from '@storybook/react'
import { MeetingLobby } from './MeetingLobby'
import { MeetingRoom } from './MeetingRoom'
import { UpcomingMeetingsTable } from './UpcomingMeetingsTable'

const meta = {
  title: 'Examples/Meet',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta

export const Lobby: StoryObj = {
  render: () => <MeetingLobby />,
}

export const Room: StoryObj = {
  render: () => <MeetingRoom />,
}

export const Dashboard: StoryObj = {
  render: () => (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <UpcomingMeetingsTable />
      </div>
    </div>
  ),
}
