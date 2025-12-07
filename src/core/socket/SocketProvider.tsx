// File: src/core/socket/SocketProvider.tsx

import * as React from 'react'
import type { ReactNode } from 'react'
import type { SocketChannel, SocketContextValue, SocketMap } from './types'

const SocketContext = React.createContext<SocketContextValue | null>(null)

export interface SocketProviderProps {
  children: ReactNode
  sockets: SocketMap
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children, sockets }) => {
  const socketsRef = React.useRef<SocketMap>(sockets)

  React.useEffect(() => {
    socketsRef.current = sockets
  }, [sockets])

  const value = React.useMemo<SocketContextValue>(
    () => ({
      getSocket: (channel: SocketChannel) => socketsRef.current[channel],

      subscribe: (channel, event, handler) => {
        const socket = socketsRef.current[channel]
        if (!socket) {
          if (process.env.NODE_ENV !== 'production') {
            // eslint-disable-next-line no-console
            console.warn(`[SocketProvider] Socket channel "${channel}" is not available`)
          }
          return () => {}
        }

        const wrapped = (data: unknown) => {
          handler(data as any)
        }

        socket.on(event, wrapped)

        return () => {
          socket.off(event, wrapped)
        }
      },

      emit: (channel, event, payload) => {
        const socket = socketsRef.current[channel]
        if (!socket) {
          if (process.env.NODE_ENV !== 'production') {
            // eslint-disable-next-line no-console
            console.warn(`[SocketProvider] Socket channel "${channel}" is not available`)
          }
          return
        }
        socket.emit(event, payload)
      },
    }),
    []
  )

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}

export const useSocketContext = (): SocketContextValue => {
  const ctx = React.useContext(SocketContext)
  if (!ctx) {
    throw new Error('useSocketContext must be used within SocketProvider')
  }
  return ctx
}
