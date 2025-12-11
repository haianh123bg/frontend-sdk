import * as React from 'react'
import { useSocketContext } from '../socket/SocketProvider'
import type { AiControlMessage } from './types'

export interface AiControlApi {
  sendUiEvent: (message: Omit<AiControlMessage, 'direction'>) => void
  sendCommand: (message: Omit<AiControlMessage, 'direction'>) => void
}

const OUTBOUND_CHANNEL = 'ai-events'
const OUTBOUND_EVENT = 'event'
const INBOUND_CHANNEL = 'ai-control'
const INBOUND_EVENT = 'command'

export const useAiControl = (): AiControlApi => {
  const { emit } = useSocketContext()

  const sendUiEvent = React.useCallback(
    (message: Omit<AiControlMessage, 'direction'>) => {
      emit(OUTBOUND_CHANNEL, OUTBOUND_EVENT, {
        ...message,
        direction: 'UI→AI' as const,
      })
    },
    [emit]
  )

  const sendCommand = React.useCallback(
    (message: Omit<AiControlMessage, 'direction'>) => {
      emit(INBOUND_CHANNEL, INBOUND_EVENT, {
        ...message,
        direction: 'AI→UI' as const,
      })
    },
    [emit]
  )

  return React.useMemo(
    () => ({
      sendUiEvent,
      sendCommand,
    }),
    [sendUiEvent, sendCommand]
  )
}
