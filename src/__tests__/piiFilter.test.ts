// File: src/__tests__/piiFilter.test.ts
import { describe, it, expect, vi } from 'vitest'
import { piiFilterMiddleware } from '../middleware/piiFilter'
import { ActionEvent } from '../events/types'

describe('PII Filter Middleware', () => {
  it('should redact emails and phones when sensitive flag is true', async () => {
    const next = vi.fn()
    const middleware = piiFilterMiddleware(next)
    
    const event: ActionEvent = {
      id: '1',
      type: 'TEST',
      timestamp: 123,
      payload: {
        email: 'user@example.com',
        phone: '123-456-7890',
        other: 'safe'
      },
      flags: { sensitive: true }
    }
    
    await middleware(event)
    
    expect(next).toHaveBeenCalledWith(expect.objectContaining({
      payload: {
        email: '[REDACTED_EMAIL]',
        phone: '[REDACTED_PHONE]',
        other: 'safe'
      }
    }))
  })

  it('should NOT redact when sensitive flag is missing or false', async () => {
    const next = vi.fn()
    const middleware = piiFilterMiddleware(next)
    
    const event: ActionEvent = {
      id: '1',
      type: 'TEST',
      timestamp: 123,
      payload: {
        email: 'user@example.com'
      }
    }
    
    await middleware(event)
    
    expect(next).toHaveBeenCalledWith(expect.objectContaining({
      payload: {
        email: 'user@example.com'
      }
    }))
  })
})
