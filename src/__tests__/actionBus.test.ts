// File: src/__tests__/actionBus.test.ts
import { describe, it, expect, vi } from 'vitest'
import { actionBus } from '../bus/actionBus'
import { EventType } from '../events/types'

describe('ActionBus', () => {
  // Reset singleton state if possible, or rely on unique event types per test
  // In a real scenario, ActionBus should probably be instantiated per test or have a reset method
  
  it('should publish and subscribe to events', () => {
    const handler = vi.fn()
    const eventType = 'TEST_EVENT_' + Date.now()
    
    const sub = actionBus.subscribe(eventType, handler)
    
    actionBus.publish({
      type: eventType,
      payload: { data: 'test' }
    })
    
    // ActionBus is async by default in the pipeline
    return new Promise<void>(resolve => {
      setTimeout(() => {
        expect(handler).toHaveBeenCalled()
        expect(handler.mock.calls[0][0]).toMatchObject({
          type: eventType,
          payload: { data: 'test' }
        })
        sub.unsubscribe()
        resolve()
      }, 10)
    })
  })

  it('should handle global subscribers', () => {
    const globalHandler = vi.fn()
    const sub = actionBus.subscribeAll(globalHandler)
    
    actionBus.publish({
      type: EventType.UI_CLICK,
      payload: {}
    })
    
    return new Promise<void>(resolve => {
      setTimeout(() => {
        expect(globalHandler).toHaveBeenCalled()
        sub.unsubscribe()
        resolve()
      }, 10)
    })
  })
})
