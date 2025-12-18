import { Crown, MicOff, Pin, VideoOff } from 'lucide-react'
import { Avatar } from '../../components/atoms/Avatar/Avatar'
import { Badge } from '../../components/atoms/Badge/Badge'
import { Card } from '../../components/atoms/Card/Card'
import { Icon } from '../../components/atoms/Icon/Icon'
import { Caption, Text } from '../../components/atoms/TypographyPrimitives'

export type ParticipantRole = 'host' | 'cohost' | 'guest'

export interface ParticipantTileProps {
  name: string
  avatarUrl?: string
  isMuted?: boolean
  isVideoOn?: boolean
  isSpeaking?: boolean
  isPinned?: boolean
  role?: ParticipantRole
}

export const ParticipantTile = ({
  name,
  avatarUrl,
  isMuted = false,
  isVideoOn = true,
  isSpeaking = false,
  isPinned = false,
  role,
}: ParticipantTileProps) => {
  return (
    <Card
      padding="none"
      className={
        'relative overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950 text-white ' +
        (isSpeaking ? 'ring-2 ring-primary-500' : '')
      }
    >
      <div className="h-40 md:h-48 w-full flex items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800">
        {isVideoOn ? (
          <div className="flex flex-col items-center gap-2">
            <Avatar src={avatarUrl} alt={name} initials={name} size="xl" className="border-2 border-white/10" />
            <Caption className="text-white/70">Camera preview</Caption>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Avatar src={avatarUrl} alt={name} initials={name} size="xl" className="border-2 border-white/10" />
            <Text className="text-white/80 text-sm">Camera off</Text>
          </div>
        )}
      </div>

      <div className="absolute top-2 left-2 flex items-center gap-2">
        {role === 'host' && (
          <Badge variant="warning" size="sm" className="bg-yellow-500/15 text-yellow-200">
            <span className="inline-flex items-center gap-1">
              <Icon icon={Crown} size="xs" />
              Host
            </span>
          </Badge>
        )}
        {isPinned && (
          <Badge variant="default" size="sm" className="bg-white/10 text-white/90">
            <span className="inline-flex items-center gap-1">
              <Icon icon={Pin} size="xs" />
              Pinned
            </span>
          </Badge>
        )}
      </div>

      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
        <div className="flex min-w-0 flex-col">
          <Text className="text-sm font-semibold text-white truncate">{name}</Text>
          <Caption className="text-white/70">In meeting</Caption>
        </div>

        <div className="flex items-center gap-2">
          {!isVideoOn && (
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10" title="Camera off">
              <Icon icon={VideoOff} size="xs" className="text-white/80" />
            </span>
          )}
          {isMuted && (
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10" title="Muted">
              <Icon icon={MicOff} size="xs" className="text-white/80" />
            </span>
          )}
        </div>
      </div>
    </Card>
  )
}
