import { Crown, MicOff, VideoOff } from 'lucide-react'
import { Avatar } from '../../components/atoms/Avatar/Avatar'
import { Badge } from '../../components/atoms/Badge/Badge'
import { Button } from '../../components/atoms/Button/Button'
import { Icon } from '../../components/atoms/Icon/Icon'
import { Divider } from '../../components/atoms/Divider/Divider'
import { Caption, Text } from '../../components/atoms/TypographyPrimitives'

export interface Participant {
  id: string
  name: string
  avatarUrl?: string
  role?: 'host' | 'cohost' | 'guest'
  isMuted?: boolean
  isVideoOn?: boolean
}

export interface ParticipantsPanelProps {
  participants: Participant[]
}

export const ParticipantsPanel = ({ participants }: ParticipantsPanelProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <Text className="font-semibold">Participants</Text>
          <Caption className="text-text-secondary">{participants.length} in call</Caption>
        </div>
        <Button variant="secondary" size="sm">
          Invite
        </Button>
      </div>

      <Divider />

      <div className="space-y-2">
        {participants.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between rounded-xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2"
          >
            <div className="flex items-center gap-3 min-w-0">
              <Avatar src={p.avatarUrl} alt={p.name} initials={p.name} size="md" />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <Text className="font-medium truncate">{p.name}</Text>
                  {p.role === 'host' && (
                    <Badge variant="warning" size="sm" className="bg-yellow-100 text-yellow-800">
                      <span className="inline-flex items-center gap-1">
                        <Icon icon={Crown} size="xs" />
                        Host
                      </span>
                    </Badge>
                  )}
                </div>
                <Caption className="text-text-secondary">Online</Caption>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {p.isVideoOn === false && (
                <span title="Camera off" className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 dark:bg-zinc-800">
                  <Icon icon={VideoOff} size="xs" variant="muted" />
                </span>
              )}
              {p.isMuted && (
                <span title="Muted" className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 dark:bg-zinc-800">
                  <Icon icon={MicOff} size="xs" variant="muted" />
                </span>
              )}
              <Button variant="ghost" size="sm">⋯</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
