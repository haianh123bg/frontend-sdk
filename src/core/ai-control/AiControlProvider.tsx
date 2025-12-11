import * as React from 'react'
import type { ReactNode } from 'react'
import { useSocketContext } from '../socket/SocketProvider'
import type { AiControlConfig } from './types'
import { createAiBridge } from './aiBridge'
import type { AiBridge } from './aiBridge'

export interface AiControlProviderProps {
  children: ReactNode
  config?: AiControlConfig
}

export const AiControlProvider: React.FC<AiControlProviderProps> = ({ children, config }) => {
  const socket = useSocketContext()
  const bridgeRef = React.useRef<AiBridge | null>(null)

  React.useEffect(() => {
    if (bridgeRef.current) {
      bridgeRef.current.dispose()
      bridgeRef.current = null
    }

    bridgeRef.current = createAiBridge({
      socket: {
        subscribe: socket.subscribe,
        emit: socket.emit,
      },
      config,
    })

    return () => {
      if (bridgeRef.current) {
        bridgeRef.current.dispose()
        bridgeRef.current = null
      }
    }
  }, [socket, config])

  return <>{children}</>
}
