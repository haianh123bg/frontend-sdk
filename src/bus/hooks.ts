// File: src/bus/hooks.ts
import { useEffect, useCallback, useRef } from 'react'
import { ActionBus, actionBus } from './actionBus'
import { ActionEvent, EventHandler } from '../events/types'

export const useActionBus = (): ActionBus => {
  return actionBus
}

export const useDispatchAction = () => {
  const dispatch = useCallback(
    <T = any>(
      type: string,
      payload: T,
      options?: {
        meta?: ActionEvent['meta']
        flags?: ActionEvent['flags']
        source?: string
      }
    ) => {
      actionBus.publish({
        type,
        payload,
        source: options?.source || 'component',
        meta: options?.meta,
        flags: options?.flags,
      })
    },
    []
  )

  return dispatch
}

export const useSubscribeAction = (
  eventType: string,
  handler: EventHandler,
  deps: any[] = []
) => {
  // Use ref to keep the latest handler without re-subscribing constantly
  const handlerRef = useRef(handler)

  useEffect(() => {
    handlerRef.current = handler
  }, [handler])

  useEffect(() => {
    const subscription = actionBus.subscribe(eventType, (event) => {
      if (handlerRef.current) {
        handlerRef.current(event)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventType, ...deps])
}

// Advanced hook with debounce/throttle options could be added here
export const useAsyncAction = () => {
  // Placeholder for future async action handling logic
}
