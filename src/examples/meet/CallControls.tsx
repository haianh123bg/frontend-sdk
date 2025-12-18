import * as React from 'react'
import {
  Hand,
  Mic,
  MicOff,
  MonitorUp,
  MoreHorizontal,
  PhoneOff,
  Settings,
  Video,
  VideoOff,
} from 'lucide-react'
import { Button } from '../../components/atoms/Button/Button'
import { Icon } from '../../components/atoms/Icon/Icon'

export interface CallControlsProps {
  isMuted: boolean
  isVideoOn: boolean
  isSharing: boolean
  onToggleMuted: () => void
  onToggleVideo: () => void
  onToggleShare: () => void
  onEndCall?: () => void
}

export const CallControls = ({
  isMuted,
  isVideoOn,
  isSharing,
  onToggleMuted,
  onToggleVideo,
  onToggleShare,
  onEndCall,
}: CallControlsProps) => {
  const [handRaised, setHandRaised] = React.useState(false)

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button
        variant={isMuted ? 'secondary' : 'primary'}
        size="sm"
        className="gap-2"
        onClick={onToggleMuted}
      >
        <Icon icon={isMuted ? MicOff : Mic} size="sm" />
        {isMuted ? 'Unmute' : 'Mute'}
      </Button>

      <Button
        variant={isVideoOn ? 'primary' : 'secondary'}
        size="sm"
        className="gap-2"
        onClick={onToggleVideo}
      >
        <Icon icon={isVideoOn ? Video : VideoOff} size="sm" />
        {isVideoOn ? 'Stop Video' : 'Start Video'}
      </Button>

      <Button
        variant={isSharing ? 'primary' : 'secondary'}
        size="sm"
        className="gap-2"
        onClick={onToggleShare}
      >
        <Icon icon={MonitorUp} size="sm" />
        {isSharing ? 'Stop Share' : 'Share Screen'}
      </Button>

      <Button
        variant={handRaised ? 'primary' : 'secondary'}
        size="sm"
        className="gap-2"
        onClick={() => setHandRaised((v) => !v)}
      >
        <Icon icon={Hand} size="sm" />
        {handRaised ? 'Lower Hand' : 'Raise Hand'}
      </Button>

      <Button variant="ghost" size="sm" className="gap-2">
        <Icon icon={Settings} size="sm" />
        Settings
      </Button>

      <Button variant="ghost" size="sm" className="gap-2">
        <Icon icon={MoreHorizontal} size="sm" />
        More
      </Button>

      <Button variant="danger" size="sm" className="gap-2" onClick={onEndCall}>
        <Icon icon={PhoneOff} size="sm" />
        End
      </Button>
    </div>
  )
}
