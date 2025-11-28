// File: src/middleware/piiFilter.ts
import { ActionEvent, EventHandler } from '../events/types'

const EMAIL_REGEX = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi
const PHONE_REGEX = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g

// Simple deep redaction
const redactSensitive = (obj: any): any => {
  if (typeof obj === 'string') {
    let str = obj
    str = str.replace(EMAIL_REGEX, '[REDACTED_EMAIL]')
    str = str.replace(PHONE_REGEX, '[REDACTED_PHONE]')
    return str
  }
  if (Array.isArray(obj)) {
    return obj.map(redactSensitive)
  }
  if (typeof obj === 'object' && obj !== null) {
    const newObj: any = {}
    for (const key in obj) {
      newObj[key] = redactSensitive(obj[key])
    }
    return newObj
  }
  return obj
}

export const piiFilterMiddleware = (next: EventHandler): EventHandler => {
  return async (event: ActionEvent) => {
    if (event.flags?.sensitive) {
      const redactedEvent = {
        ...event,
        payload: redactSensitive(event.payload),
      }
      return next(redactedEvent)
    }
    return next(event)
  }
}
