// File: src/core/socket/useSocketEvent.ts

import { useEffect, useRef } from 'react'
import { useSocketContext } from './SocketProvider'
import type { SocketChannel } from './types'

export const useSocketEvent = <T = any>(
  channel: SocketChannel,
  event: string,
  handler: (data: T) => void
) => {
  const { subscribe } = useSocketContext()
  const handlerRef = useRef(handler)

  useEffect(() => {
    handlerRef.current = handler
  }, [handler])

  useEffect(() => {
    const unsubscribe = subscribe<T>(channel, event, (data) => {
      if (handlerRef.current) {
        handlerRef.current(data)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [channel, event, subscribe])
}
