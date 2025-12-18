import * as React from 'react'
import { Copy, Link as LinkIcon, ShieldCheck } from 'lucide-react'
import { Badge } from '../../components/atoms/Badge/Badge'
import { Button } from '../../components/atoms/Button/Button'
import { Card } from '../../components/atoms/Card/Card'
import { Heading } from '../../components/atoms/Heading/Heading'
import { Icon } from '../../components/atoms/Icon/Icon'
import { Input } from '../../components/atoms/Input/Input'
import { Switch } from '../../components/atoms/Switch/Switch'
import { Caption, Text } from '../../components/atoms/TypographyPrimitives'
import { ParticipantTile } from './ParticipantTile'

export const MeetingLobby = () => {
  const [name, setName] = React.useState('Nguyen Van A')
  const [micOn, setMicOn] = React.useState(true)
  const [camOn, setCamOn] = React.useState(true)

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-zinc-950 p-6">
      <div className="mx-auto max-w-6xl space-y-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <Heading as="h2" size="lg">Join meeting</Heading>
            <Caption className="text-text-secondary">Kiểm tra thiết bị trước khi vào phòng</Caption>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="default" size="sm" className="bg-slate-100 text-slate-700">
              <span className="inline-flex items-center gap-1">
                <Icon icon={ShieldCheck} size="xs" />
                Secure
              </span>
            </Badge>
            <Button variant="secondary" className="gap-2">
              <Icon icon={Copy} size="sm" />
              Copy code
            </Button>
            <Button variant="ghost" className="gap-2">
              <Icon icon={LinkIcon} size="sm" />
              Copy link
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <ParticipantTile name={name || 'You'} role="host" isMuted={!micOn} isVideoOn={camOn} isPinned />
          </div>

          <Card padding="lg" className="space-y-4">
            <div>
              <Text className="font-semibold">Your name</Text>
              <Caption className="text-text-secondary">Tên này sẽ hiển thị trong phòng họp</Caption>
              <div className="mt-2">
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" fullWidth />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Text className="font-medium">Microphone</Text>
                  <Caption className="text-text-secondary">{micOn ? 'On' : 'Off'}</Caption>
                </div>
                <Switch checked={micOn} onChange={setMicOn} variant={micOn ? 'success' : 'danger'} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Text className="font-medium">Camera</Text>
                  <Caption className="text-text-secondary">{camOn ? 'On' : 'Off'}</Caption>
                </div>
                <Switch checked={camOn} onChange={setCamOn} variant={camOn ? 'success' : 'danger'} />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Button variant="primary" fullWidth>
                Join now
              </Button>
              <Button variant="secondary" fullWidth>
                Join and present
              </Button>
              <Caption className="text-text-secondary">Bằng việc tham gia, bạn đồng ý với chính sách của tổ chức.</Caption>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
