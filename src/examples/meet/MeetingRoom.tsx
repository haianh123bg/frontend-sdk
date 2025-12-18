import * as React from 'react'
import { Badge } from '../../components/atoms/Badge/Badge'
import { Button } from '../../components/atoms/Button/Button'
import { Card } from '../../components/atoms/Card/Card'
import { Heading } from '../../components/atoms/Heading/Heading'
import { Icon } from '../../components/atoms/Icon/Icon'
import { Caption, Text } from '../../components/atoms/TypographyPrimitives'
import { Tabs } from '../../components/molecules/Tabs/Tabs'
import { ChatPanel, ChatMessage } from './ChatPanel'
import { CallControls } from './CallControls'
import { ParticipantTile } from './ParticipantTile'
import { Participant, ParticipantsPanel } from './ParticipantsPanel'
import { Copy, ShieldCheck, Timer } from 'lucide-react'

const participants: Participant[] = [
  { id: '1', name: 'Nguyen Van A', role: 'host', isMuted: false, isVideoOn: true },
  { id: '2', name: 'Tran Thi B', role: 'guest', isMuted: true, isVideoOn: true },
  { id: '3', name: 'Le Van C', role: 'guest', isMuted: false, isVideoOn: false },
  { id: '4', name: 'Pham Thi D', role: 'guest', isMuted: true, isVideoOn: true },
  { id: '5', name: 'Hoang Van E', role: 'guest', isMuted: false, isVideoOn: true },
  { id: '6', name: 'Doan Thi F', role: 'guest', isMuted: true, isVideoOn: true },
]

const messages: ChatMessage[] = [
  { id: 'm1', sender: 'Tran Thi B', message: 'Mọi người nghe rõ không?', time: '09:01' },
  { id: 'm2', sender: 'Nguyen Van A', message: 'Rõ nhé, mình bắt đầu luôn.', time: '09:01' },
  { id: 'm3', sender: 'Le Van C', message: 'Ok, phần demo em share sau 5 phút.', time: '09:02' },
]

export const MeetingRoom = () => {
  const [isMuted, setIsMuted] = React.useState(false)
  const [isVideoOn, setIsVideoOn] = React.useState(true)
  const [isSharing, setIsSharing] = React.useState(false)

  return (
    <div className="h-screen w-full bg-slate-100 dark:bg-zinc-950 p-4">
      <div className="mx-auto flex h-full max-w-7xl flex-col gap-4">
        <Card padding="md" className="flex flex-col gap-3">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <Heading as="h2" size="lg">Daily Standup</Heading>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <Badge variant="success" size="sm">Live</Badge>
                <Badge variant="default" size="sm" className="bg-slate-100 text-slate-700">
                  <span className="inline-flex items-center gap-1">
                    <Icon icon={Timer} size="xs" />
                    09:00 - 09:15
                  </span>
                </Badge>
                <Badge variant="default" size="sm" className="bg-slate-100 text-slate-700">
                  <span className="inline-flex items-center gap-1">
                    <Icon icon={ShieldCheck} size="xs" />
                    E2EE
                  </span>
                </Badge>
              </div>
              <Caption className="text-text-secondary">Meeting code: redon-standup-1024</Caption>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="secondary" className="gap-2">
                <Icon icon={Copy} size="sm" />
                Copy invite
              </Button>
              <Button variant="ghost">Details</Button>
            </div>
          </div>
        </Card>

        <div className="flex flex-1 gap-4 overflow-hidden">
          <div className="flex flex-1 flex-col gap-4 overflow-hidden">
            <div className="grid flex-1 grid-cols-2 gap-3 overflow-auto md:grid-cols-3">
              <ParticipantTile name="You" role="host" isMuted={isMuted} isVideoOn={isVideoOn} isSpeaking={!isMuted} isPinned />
              {participants.slice(1).map((p) => (
                <ParticipantTile
                  key={p.id}
                  name={p.name}
                  role={p.role === 'host' ? 'host' : 'guest'}
                  isMuted={p.isMuted}
                  isVideoOn={p.isVideoOn}
                  isSpeaking={!p.isMuted && p.isVideoOn}
                />
              ))}
            </div>

            <Card padding="md" className="bg-white dark:bg-zinc-900">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div className="min-w-0">
                  <Text className="font-semibold">Call controls</Text>
                  <Caption className="text-text-secondary">Phím tắt: M (mute), V (video)</Caption>
                </div>
                <CallControls
                  isMuted={isMuted}
                  isVideoOn={isVideoOn}
                  isSharing={isSharing}
                  onToggleMuted={() => setIsMuted((v) => !v)}
                  onToggleVideo={() => setIsVideoOn((v) => !v)}
                  onToggleShare={() => setIsSharing((v) => !v)}
                  onEndCall={() => {
                    setIsSharing(false)
                    setIsMuted(true)
                    setIsVideoOn(false)
                  }}
                />
              </div>
            </Card>
          </div>

          <div className="hidden w-[380px] shrink-0 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 md:flex">
            <Tabs
              noBorder
              noDivider
              tabs={[
                {
                  id: 'participants',
                  label: `Participants (${participants.length})`,
                  content: (
                    <div className="h-[calc(100vh-180px)] overflow-auto p-4">
                      <ParticipantsPanel participants={participants} />
                    </div>
                  ),
                },
                {
                  id: 'chat',
                  label: 'Chat',
                  content: (
                    <div className="h-[calc(100vh-180px)] p-4">
                      <ChatPanel messages={messages} />
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
