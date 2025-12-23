import * as React from 'react'
import { twMerge } from 'tailwind-merge'
import { SplitPane } from '../../molecules/SplitPane/SplitPane'
import { ChatPanel, type ChatPanelProps } from './ChatPanel'

export interface BoxChatProps extends Omit<ChatPanelProps, 'className'> {
  mode?: 'floating' | 'split'
  open: boolean
  onClose?: () => void
  title?: React.ReactNode
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  size?: 'sm' | 'md' | 'lg'
  view?: React.ReactNode
  chatSide?: 'left' | 'right'
  chatRatio?: number
  minChat?: number
  minView?: number
  className?: string
}

export const BoxChat: React.FC<BoxChatProps> = ({
  mode = 'floating',
  open,
  onClose,
  title,
  position = 'bottom-right',
  size = 'md',
  view,
  chatSide = 'right',
  chatRatio = 0.34,
  minChat = 320,
  minView = 320,
  className,
  ...chatPanelProps
}) => {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const positionClasses: Record<NonNullable<BoxChatProps['position']>, string> = {
    'top-left': 'top-6 left-6',
    'top-right': 'top-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'bottom-right': 'bottom-6 right-6',
  }

  const sizeClasses: Record<NonNullable<BoxChatProps['size']>, string> = {
    sm: 'w-[320px] h-[440px]',
    md: 'w-[360px] h-[520px]',
    lg: 'w-[420px] h-[640px]',
  }

  const resolvedAgent =
    typeof title === 'string'
      ? {
          ...chatPanelProps.agent,
          name: title,
        }
      : chatPanelProps.agent

  if (mode === 'split') {
    if (!open) {
      return <>{view ?? null}</>
    }

    const normalizedChatRatio = Math.min(Math.max(chatRatio, 0.1), 0.9)
    const initialRatio = chatSide === 'left' ? normalizedChatRatio : 1 - normalizedChatRatio
    const primary = chatSide === 'left' ? (
      <ChatPanel {...chatPanelProps} agent={resolvedAgent} onClose={onClose} className="h-full" />
    ) : (
      view ?? <div className="h-full w-full" />
    )
    const secondary = chatSide === 'left' ? (
      view ?? <div className="h-full w-full" />
    ) : (
      <ChatPanel {...chatPanelProps} agent={resolvedAgent} onClose={onClose} className="h-full" />
    )

    const minPrimary = chatSide === 'left' ? minChat : minView
    const minSecondary = chatSide === 'left' ? minView : minChat

    return (
      <SplitPane
        direction="horizontal"
        initialRatio={initialRatio}
        minPrimary={minPrimary}
        minSecondary={minSecondary}
        className={twMerge('h-full w-full', className)}
      >
        <div className="h-full w-full min-h-0">{primary}</div>
        <div className="h-full w-full min-h-0">{secondary}</div>
      </SplitPane>
    )
  }

  if (!open) return null

  return (
    <div
      className={twMerge(
        'fixed z-50 overflow-hidden',
        'max-w-[calc(100vw-3rem)] max-h-[calc(100vh-3rem)]',
        'rounded-3xl border border-slate-200/70 ring-1 ring-black/5',
        'bg-surface shadow-2xl',
        'transition-transform transition-opacity duration-200 ease-out will-change-transform',
        mounted ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
        'flex flex-col',
        sizeClasses[size],
        positionClasses[position],
        className
      )}
      aria-label={typeof title === 'string' ? title : undefined}
    >
      <div className="flex h-full min-h-0 flex-col">
        <ChatPanel {...chatPanelProps} agent={resolvedAgent} onClose={onClose} className="h-full" />
      </div>
    </div>
  )
}

BoxChat.displayName = 'BoxChat'
