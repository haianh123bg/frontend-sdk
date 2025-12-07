// File: src/core/socket/useSocketEmit.ts

import { useSocketContext } from './SocketProvider'
import type { SocketChannel } from './types'

export const useSocketEmit = () => {
  const { emit } = useSocketContext()

  return (channel: SocketChannel, event: string, payload: any) => {
    emit(channel, event, payload)
  }
}
