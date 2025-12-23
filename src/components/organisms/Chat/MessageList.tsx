import * as React from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { Scroll } from '../../atoms/Scroll/Scroll'
import { Button } from '../../atoms/Button/Button'
import { Caption } from '../../atoms/TypographyPrimitives'
import type { AgentThinkingState, ChatMessage } from './types'
import { AgentThinkingMessage, MessageItem, type MessageItemProps } from './MessageItem'
import { formatDateSeparatorLabel } from './utils'
import { scrollToBottom, useIsAtBottom, usePreserveScrollOnPrepend } from './hooks/useChatScroll'

type RowItem =
  | { type: 'separator'; key: string; label: string }
  | { type: 'message'; key: string; message: ChatMessage }
  | { type: 'thinking'; key: string }

export interface MessageListProps
  extends Pick<
    MessageItemProps,
    | 'currentUserId'
    | 'showSenderName'
    | 'showOutgoingAvatar'
    | 'incomingMessageStyle'
    | 'onCopy'
    | 'onDelete'
    | 'onRecall'
    | 'onReply'
    | 'onReact'
    | 'onRetrySend'
  > {
  messages: ChatMessage[]
  agentThinking?: AgentThinkingState | null
  agentName?: string
  virtualized?: boolean
  estimateRowHeight?: number
  overscan?: number
  onLoadOlder?: () => void
  hasMoreOlder?: boolean
  isLoadingOlder?: boolean
  typingText?: string
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  agentThinking,
  agentName,
  virtualized = true,
  estimateRowHeight = 44,
  overscan = 10,
  onLoadOlder,
  hasMoreOlder,
  isLoadingOlder,
  typingText,
  ...itemProps
}) => {
  const scrollRef = React.useRef<HTMLDivElement | null>(null)
  const { isAtBottom } = useIsAtBottom(scrollRef)
  const [highlightMessageKey, setHighlightMessageKey] = React.useState<string | null>(null)
  const highlightTimeoutRef = React.useRef<number | null>(null)

  const messageById = React.useMemo(() => {
    const map = new Map<string, ChatMessage>()
    for (const m of messages) {
      map.set(m.id, m)
      if (m.clientId) map.set(m.clientId, m)
    }
    return map
  }, [messages])

  const firstMessageKey = messages[0]?.clientId || messages[0]?.id
  usePreserveScrollOnPrepend({ scrollRef, firstRowKey: firstMessageKey, enabled: !!onLoadOlder })

  const rows = React.useMemo<RowItem[]>(() => {
    const result: RowItem[] = []
    let lastLabel: string | undefined

    for (const m of messages) {
      const stableId = m.clientId || m.id
      const label = formatDateSeparatorLabel(m.createdAt)
      if (label !== lastLabel) {
        result.push({ type: 'separator', key: `sep:${label}:${stableId}`, label })
        lastLabel = label
      }
      result.push({ type: 'message', key: `msg:${stableId}`, message: m })
    }

    if (agentThinking) {
      result.push({ type: 'thinking', key: `thinking:${agentThinking.mode}` })
    }

    if (typingText) {
      result.push({ type: 'separator', key: `typing:${typingText}`, label: typingText })
    }

    return result
  }, [agentThinking, messages, typingText])

  const messageRowIndexById = React.useMemo(() => {
    const map = new Map<string, number>()
    rows.forEach((row, idx) => {
      if (row.type !== 'message') return
      map.set(row.message.id, idx)
      if (row.message.clientId) map.set(row.message.clientId, idx)
    })
    return map
  }, [rows])

  const [showNewMessageButton, setShowNewMessageButton] = React.useState(false)
  const lastRowKey = rows.length ? rows[rows.length - 1].key : undefined
  const prevLastRowKeyRef = React.useRef<string | undefined>(undefined)

  React.useEffect(() => {
    const prev = prevLastRowKeyRef.current
    prevLastRowKeyRef.current = lastRowKey

    if (!lastRowKey) return
    if (prev === undefined) {
      requestAnimationFrame(() => scrollToBottom(scrollRef))
      return
    }
    if (prev !== lastRowKey) {
      if (isAtBottom) {
        requestAnimationFrame(() => scrollToBottom(scrollRef, 'smooth'))
        setShowNewMessageButton(false)
      } else {
        setShowNewMessageButton(true)
      }
    }
  }, [isAtBottom, lastRowKey])

  React.useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    let raf = 0
    const handle = () => {
      if (!onLoadOlder || !hasMoreOlder || isLoadingOlder) return
      if (el.scrollTop <= 80) {
        onLoadOlder()
      }
    }

    const onScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(() => {
        raf = 0
        handle()
        if (el.scrollHeight - el.scrollTop - el.clientHeight <= 24) {
          setShowNewMessageButton(false)
        }
      })
    }

    el.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      if (raf) window.cancelAnimationFrame(raf)
      el.removeEventListener('scroll', onScroll)
    }
  }, [hasMoreOlder, isLoadingOlder, onLoadOlder])

  const estimateSize = React.useCallback(
    (index: number) => {
      const row = rows[index]
      if (!row) return estimateRowHeight
      if (row.type === 'separator') return 32
      if (row.type === 'thinking') return 56
      return estimateRowHeight
    },
    [estimateRowHeight, rows]
  )

  const rowVirtualizer = useVirtualizer({
    count: virtualized ? rows.length : 0,
    getScrollElement: () => scrollRef.current,
    estimateSize,
    getItemKey: (index) => rows[index]?.key ?? index,
    overscan,
  })

  const virtualItems = virtualized ? rowVirtualizer.getVirtualItems() : []
  const totalSize = virtualized ? rowVirtualizer.getTotalSize() : 0
  const paddingTop = virtualized && virtualItems.length > 0 ? virtualItems[0].start : 0
  const paddingBottom =
    virtualized && virtualItems.length > 0 ? totalSize - virtualItems[virtualItems.length - 1].end : 0

  const renderRow = (row: RowItem) => {
    if (row.type === 'separator') {
      return (
        <div className="flex justify-center py-2">
          <Caption className="rounded-full bg-surface px-3 py-1 text-text-muted">{row.label}</Caption>
        </div>
      )
    }

    if (row.type === 'thinking') {
      if (!agentThinking) return null
      return <AgentThinkingMessage state={agentThinking} agentName={agentName} />
    }

    const replyToMessage = row.message.replyToId ? messageById.get(row.message.replyToId) : undefined
    const stableId = row.message.clientId || row.message.id
    return (
      <MessageItem
        message={row.message}
        replyToMessage={replyToMessage}
        highlighted={highlightMessageKey === stableId}
        onJumpToMessage={(messageId) => {
          const idx = messageRowIndexById.get(messageId)
          if (idx == null) return

          const targetRow = rows[idx]
          if (!targetRow || targetRow.type !== 'message') return
          const targetStableId = targetRow.message.clientId || targetRow.message.id

          if (highlightTimeoutRef.current) {
            window.clearTimeout(highlightTimeoutRef.current)
            highlightTimeoutRef.current = null
          }

          setHighlightMessageKey(targetStableId)
          highlightTimeoutRef.current = window.setTimeout(() => {
            setHighlightMessageKey(null)
            highlightTimeoutRef.current = null
          }, 300)

          if (virtualized) {
            rowVirtualizer.scrollToIndex(idx, { align: 'center' })
          } else {
            const el = document.getElementById(`chat-msg-${targetStableId}`)
            el?.scrollIntoView({ block: 'center' })
          }
        }}
        {...itemProps}
      />
    )
  }

  return (
    <div className="relative flex-1 overflow-hidden">
      <Scroll ref={scrollRef} direction="vertical" autoHide className="h-full pr-1">
        {isLoadingOlder && (
          <div className="py-2">
            <Caption className="text-center text-text-muted">Đang tải tin nhắn cũ…</Caption>
          </div>
        )}

        {virtualized ? (
          <div style={{ height: totalSize }} className="relative w-full">
            {paddingTop > 0 && <div style={{ height: paddingTop }} aria-hidden />}
            {virtualItems.map((vRow) => {
              const row = rows[vRow.index]
              if (!row) return null
              const stableId = row.type === 'message' ? row.message.clientId || row.message.id : undefined
              return (
                <div
                  key={row.key}
                  id={stableId ? `chat-msg-${stableId}` : undefined}
                  data-index={vRow.index}
                  ref={(el) => {
                    if (el) rowVirtualizer.measureElement(el)
                  }}
                  style={{
                    position: 'absolute',
                    top: vRow.start,
                    left: 0,
                    right: 0,
                  }}
                  className="px-1"
                >
                  {renderRow(row)}
                </div>
              )
            })}
            {paddingBottom > 0 && <div style={{ height: paddingBottom }} aria-hidden />}
          </div>
        ) : (
          <div className="flex flex-col gap-2 px-1">
            {rows.map((row) => {
              const stableId = row.type === 'message' ? row.message.clientId || row.message.id : undefined
              return (
                <div key={row.key} id={stableId ? `chat-msg-${stableId}` : undefined}>
                  {renderRow(row)}
                </div>
              )
            })}
          </div>
        )}

        <div className="h-2" />
      </Scroll>

      {showNewMessageButton && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
          <Button
            variant="secondary"
            size="sm"
            className="shadow-soft"
            onClick={() => {
              scrollToBottom(scrollRef, 'smooth')
              setShowNewMessageButton(false)
            }}
          >
            Tin nhắn mới
          </Button>
        </div>
      )}
    </div>
  )
}

MessageList.displayName = 'MessageList'
