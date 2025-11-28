// File: src/bus/actionBus.ts
import { v4 as uuidv4 } from 'uuid'
import { ActionEvent, EventHandler, Subscription } from '../events/types'

type Middleware = (next: EventHandler) => EventHandler

export class ActionBus {
  private subscribers: Map<string, Set<EventHandler>> = new Map()
  private globalSubscribers: Set<EventHandler> = new Set()
  private middlewares: Middleware[] = []
  private handlerPipeline: EventHandler | null = null

  constructor() {
    // Default handler (terminal)
    this.handlerPipeline = async (event) => {
      this.notifySubscribers(event)
    }
  }

  public use(middleware: Middleware) {
    this.middlewares.push(middleware)
    this.rebuildPipeline()
  }

  private rebuildPipeline() {
    let pipeline: EventHandler = async (event) => {
      this.notifySubscribers(event)
    }

    // Compose middleware in reverse order
    for (let i = this.middlewares.length - 1; i >= 0; i--) {
      pipeline = this.middlewares[i](pipeline)
    }

    this.handlerPipeline = pipeline
  }

  private notifySubscribers(event: ActionEvent) {
    // Notify specific topic subscribers
    const topicHandlers = this.subscribers.get(event.type)
    if (topicHandlers) {
      topicHandlers.forEach((handler) => {
        try {
          handler(event)
        } catch (err) {
          console.error(`[ActionBus] Error in subscriber for ${event.type}:`, err)
        }
      })
    }

    // Notify global subscribers
    this.globalSubscribers.forEach((handler) => {
      try {
        handler(event)
      } catch (err) {
        console.error(`[ActionBus] Error in global subscriber:`, err)
      }
    })
  }

  public publish(event: Omit<ActionEvent, 'id' | 'timestamp'>): void {
    const fullEvent: ActionEvent = {
      ...event,
      id: uuidv4(),
      timestamp: Date.now(),
    }

    if (this.handlerPipeline) {
      Promise.resolve(this.handlerPipeline(fullEvent)).catch((err: any) => {
        console.error('[ActionBus] Pipeline error:', err)
      })
    }
  }

  public subscribe(eventType: string, handler: EventHandler): Subscription {
    if (!this.subscribers.has(eventType)) {
      this.subscribers.set(eventType, new Set())
    }
    this.subscribers.get(eventType)!.add(handler)

    return {
      unsubscribe: () => {
        const handlers = this.subscribers.get(eventType)
        if (handlers) {
          handlers.delete(handler)
          if (handlers.size === 0) {
            this.subscribers.delete(eventType)
          }
        }
      },
    }
  }

  public subscribeAll(handler: EventHandler): Subscription {
    this.globalSubscribers.add(handler)
    return {
      unsubscribe: () => {
        this.globalSubscribers.delete(handler)
      },
    }
  }
}

// Singleton instance
export const actionBus = new ActionBus()
