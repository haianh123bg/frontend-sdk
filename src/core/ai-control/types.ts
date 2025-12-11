import type { ActionEvent } from '../../events/types'
import type { SocketChannel } from '../socket/types'

export type AiControlDirection = 'UI→AI' | 'AI→UI'

export interface AiControlTarget {
  component?: string
  instanceId?: string
  path?: string
  [key: string]: any
}

export interface AiControlMessage {
  id: string
  direction: AiControlDirection
  type: string
  target?: AiControlTarget
  payload: any
  meta?: {
    correlationId?: string
    traceId?: string
    [key: string]: any
  }
  timestamp?: number
}

export interface AiOutboundConfig {
  enabled?: boolean
  channel?: SocketChannel
  eventName?: string
  filter?: (event: ActionEvent) => boolean
  mapEventToMessage?: (event: ActionEvent) => AiControlMessage | null
}

export type IncomingActionEvent = Omit<ActionEvent, 'id' | 'timestamp'>

export interface AiInboundConfig {
  enabled?: boolean
  channel?: SocketChannel
  eventName?: string
  mapMessageToEvent?: (message: AiControlMessage) => IncomingActionEvent | null
  onMessage?: (message: AiControlMessage) => void
}

export interface AiControlConfig {
  enabled?: boolean
  outbound?: AiOutboundConfig
  inbound?: AiInboundConfig
}
