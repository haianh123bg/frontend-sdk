// File: src/middleware/auditLogger.ts
import { ActionEvent, EventHandler } from '../events/types'

const BATCH_SIZE = 10
const FLUSH_INTERVAL_MS = 5000
const MOCK_ENDPOINT = '/telemetry/event'

class AuditLoggerService {
  private queue: ActionEvent[] = []
  private timer: NodeJS.Timeout | null = null

  constructor() {
    this.startTimer()
  }

  private startTimer() {
    if (this.timer) return
    this.timer = setInterval(() => this.flush(), FLUSH_INTERVAL_MS)
  }

  private async flush() {
    if (this.queue.length === 0) return

    const batch = [...this.queue]
    this.queue = []

    try {
      // Mock API Call
      if (process.env.NODE_ENV !== 'test') {
        console.log(`[AuditLogger] Mock send ${batch.length} events to ${MOCK_ENDPOINT}`)
      }
      // await fetch(MOCK_ENDPOINT, { method: 'POST', body: JSON.stringify(batch) })
    } catch (error) {
      console.error('[AuditLogger] Failed to send events, requeuing', error)
      // Simple retry logic: put back in front
      this.queue = [...batch, ...this.queue]
    }
  }

  public log(event: ActionEvent) {
    this.queue.push(event)
    if (this.queue.length >= BATCH_SIZE) {
      this.flush()
    }
  }
}

const loggerService = new AuditLoggerService()

export const auditLoggerMiddleware = (next: EventHandler): EventHandler => {
  return async (event: ActionEvent) => {
    // Process first
    await next(event)

    // Then Log (Fire and forget)
    if (event.flags?.persist) {
      loggerService.log(event)
    }
  }
}
