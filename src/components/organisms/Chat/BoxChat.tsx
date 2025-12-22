import * as React from 'react'
import { twMerge } from 'tailwind-merge'
import { CornerPanel } from '../../molecules/CornerPanel/CornerPanel'
import { ChatPanel, type ChatPanelProps } from './ChatPanel'

export interface BoxChatProps extends Omit<ChatPanelProps, 'className'> {
  open: boolean
  onClose?: () => void
  title?: React.ReactNode
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const BoxChat: React.FC<BoxChatProps> = ({
  open,
  onClose,
  title,
  position = 'bottom-right',
  size = 'md',
  className,
  ...chatPanelProps
}) => {
  return (
    <CornerPanel
      open={open}
      onClose={onClose}
      title={title}
      position={position}
      size={size}
      className={twMerge('flex flex-col p-0', className)}
    >
      <div className="flex h-full min-h-0 flex-col">
        <ChatPanel {...chatPanelProps} className="h-full" />
      </div>
    </CornerPanel>
  )
}

BoxChat.displayName = 'BoxChat'
