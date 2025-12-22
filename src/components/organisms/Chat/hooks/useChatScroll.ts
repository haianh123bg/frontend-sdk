import * as React from 'react'

export interface UseChatScrollOptions {
  thresholdPx?: number
}

export function useIsAtBottom(scrollRef: React.RefObject<HTMLElement>, options: UseChatScrollOptions = {}) {
  const { thresholdPx = 24 } = options
  const [isAtBottom, setIsAtBottom] = React.useState(true)

  const recompute = React.useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const distance = el.scrollHeight - el.scrollTop - el.clientHeight
    setIsAtBottom(distance <= thresholdPx)
  }, [scrollRef, thresholdPx])

  React.useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    recompute()

    const onScroll = () => recompute()
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [scrollRef, recompute])

  return { isAtBottom, recompute, setIsAtBottom }
}

export function scrollToBottom(scrollRef: React.RefObject<HTMLElement>, behavior: ScrollBehavior = 'auto') {
  const el = scrollRef.current
  if (!el) return
  el.scrollTo({ top: el.scrollHeight, behavior })
}

export function usePreserveScrollOnPrepend(params: {
  scrollRef: React.RefObject<HTMLElement>
  firstRowKey?: string
  enabled?: boolean
}) {
  const { scrollRef, firstRowKey, enabled = true } = params

  const prevFirstKeyRef = React.useRef<string | undefined>(undefined)
  const prevScrollHeightRef = React.useRef<number>(0)
  const prevScrollTopRef = React.useRef<number>(0)

  React.useLayoutEffect(() => {
    if (!enabled) return

    const el = scrollRef.current
    if (!el) return

    const prevFirstKey = prevFirstKeyRef.current

    if (prevFirstKey !== undefined && firstRowKey !== undefined && prevFirstKey !== firstRowKey) {
      const prevHeight = prevScrollHeightRef.current
      const prevTop = prevScrollTopRef.current
      const nextHeight = el.scrollHeight
      const delta = nextHeight - prevHeight

      if (delta > 0 && prevTop < 220) {
        el.scrollTop = prevTop + delta
      }
    }

    prevFirstKeyRef.current = firstRowKey
    prevScrollHeightRef.current = el.scrollHeight
    prevScrollTopRef.current = el.scrollTop
  }, [enabled, firstRowKey, scrollRef])

  React.useEffect(() => {
    if (!enabled) return
    const el = scrollRef.current
    if (!el) return

    const onScroll = () => {
      prevScrollHeightRef.current = el.scrollHeight
      prevScrollTopRef.current = el.scrollTop
    }

    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [enabled, scrollRef])
}
