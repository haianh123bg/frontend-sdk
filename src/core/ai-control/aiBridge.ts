import { actionBus } from '../../bus/actionBus'
import type { ActionEvent, Subscription } from '../../events/types'
import type { SocketContextValue } from '../socket/types'
import type { AiControlConfig, AiControlMessage, IncomingActionEvent } from './types'

const DEFAULT_OUTBOUND_CHANNEL = 'ai-events'
const DEFAULT_OUTBOUND_EVENT = 'event'
const DEFAULT_INBOUND_CHANNEL = 'ai-control'
const DEFAULT_INBOUND_EVENT = 'command'

export interface AiBridge {
  dispose: () => void
}

export interface AiBridgeDependencies {
  socket: Pick<SocketContextValue, 'subscribe' | 'emit'>
  config?: AiControlConfig
}

const defaultOutboundFilter = (_event: ActionEvent): boolean => {
  return true
}

const defaultMapEventToMessage = (event: ActionEvent): AiControlMessage => {
  return {
    id: event.id,
    direction: 'UI→AI',
    type: String(event.type),
    target: {
      component: event.meta?.component,
      instanceId: (event.meta as any)?.instanceId,
      path: (event.meta as any)?.path,
    },
    payload: event.payload,
    meta: {
      ...event.meta,
      source: event.source,
      flags: event.flags,
    },
    timestamp: event.timestamp,
  }
}

const defaultMapMessageToEvent = (message: AiControlMessage): IncomingActionEvent | null => {
  if (message.direction && message.direction !== 'AI→UI') {
    return null
  }

  return {
    type: message.type,
    payload: message.payload,
    source: 'ai',
    meta: {
      ...(message.meta || {}),
      target: message.target,
    },
    flags: {
      priority: 'high',
      persist: true,
    },
  }
}

export const createAiBridge = ({ socket, config }: AiBridgeDependencies): AiBridge => {
  const enabled = config?.enabled !== false

  let actionSubscription: Subscription | null = null
  let unsubscribeSocket: (() => void) | null = null

  if (enabled) {
    const outbound = config?.outbound
    const inbound = config?.inbound

    const outboundEnabled = outbound?.enabled !== false
    const inboundEnabled = inbound?.enabled !== false

    if (outboundEnabled) {
      const channel = outbound?.channel || DEFAULT_OUTBOUND_CHANNEL
      const eventName = outbound?.eventName || DEFAULT_OUTBOUND_EVENT
      const filter = outbound?.filter || defaultOutboundFilter
      const mapEventToMessage = outbound?.mapEventToMessage || defaultMapEventToMessage

      actionSubscription = actionBus.subscribeAll((event) => {
        try {
          if (!filter(event)) return

          const message = mapEventToMessage(event)
          if (!message) return

          socket.emit(channel, eventName, message)
        } catch (err) {
          if (process.env.NODE_ENV !== 'production') {
            console.error('[AiBridge] Outbound error', err)
          }
        }
      })
    }

    if (inboundEnabled) {
      const channel = inbound?.channel || DEFAULT_INBOUND_CHANNEL
      const eventName = inbound?.eventName || DEFAULT_INBOUND_EVENT
      const mapMessageToEvent = inbound?.mapMessageToEvent || defaultMapMessageToEvent
      const onMessage = inbound?.onMessage

      unsubscribeSocket = socket.subscribe<AiControlMessage>(channel, eventName, (message) => {
        try {
          if (onMessage) {
            onMessage(message)
          }

          const event = mapMessageToEvent(message)
          if (!event) return

          actionBus.publish(event)
        } catch (err) {
          if (process.env.NODE_ENV !== 'production') {
            console.error('[AiBridge] Inbound error', err)
          }
        }
      })
    }
  }

  const dispose = () => {
    if (actionSubscription) {
      actionSubscription.unsubscribe()
      actionSubscription = null
    }
    if (unsubscribeSocket) {
      unsubscribeSocket()
      unsubscribeSocket = null
    }
  }

  return { dispose }
}
