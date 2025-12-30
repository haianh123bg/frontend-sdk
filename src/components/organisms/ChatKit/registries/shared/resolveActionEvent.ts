import type { ChatKitActionEvent } from '../../contracts'
import type { ChatKitNodeAction } from '../../types'

export function resolveActionEvent(
  action: ChatKitNodeAction | undefined,
  conversationId: string | undefined
): ChatKitActionEvent | null {
  if (!action) return null
  const cid = action.conversationId ?? conversationId
  if (!cid) return null
  return { type: action.type, payload: action.payload, conversationId: cid }
}
