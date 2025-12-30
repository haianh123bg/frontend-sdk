import type { SendMessageInput } from '../Chat/types'
import type { ChatKitActionEvent, ChatResponse, SendMessageRequest } from './contracts'
import type { ChatTransport, LoadOlderResult } from './transport'

export type HttpChatTransportOptions = {
  endpoints: {
    sendMessage: string
    sendAction: string
    loadOlder?: string
  }
  baseUrl?: string
  fetcher?: typeof fetch
  getAuthHeaders?: () => Promise<Record<string, string>> | Record<string, string>
  headers?: Record<string, string>
}

function joinUrl(baseUrl: string | undefined, path: string) {
  if (!baseUrl) return path
  const b = baseUrl.replace(/\/$/, '')
  const p = path.startsWith('/') ? path : `/${path}`
  return `${b}${p}`
}

async function jsonRequest<T>(fetcher: typeof fetch, url: string, init: RequestInit): Promise<T> {
  const res = await fetcher(url, init)
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`HTTP ${res.status} ${res.statusText}${text ? `: ${text}` : ''}`)
  }
  return (await res.json()) as T
}

function toSendMessageRequest(input: SendMessageInput): SendMessageRequest {
  return {
    conversationId: input.conversationId,
    clientId: input.clientId,
    text: input.text,
    markdown: input.markdown,
    replyToId: input.replyToId,
    attachments: input.attachments?.map((f) => ({
      name: f.name,
      mimeType: f.type,
      size: f.size,
    })),
    meta: input.meta as any,
  }
}

export function createHttpChatTransport(options: HttpChatTransportOptions): ChatTransport {
  const { endpoints, baseUrl, fetcher = fetch, getAuthHeaders, headers } = options

  const buildHeaders = async () => {
    const auth = (await getAuthHeaders?.()) ?? {}
    return {
      'Content-Type': 'application/json',
      ...(headers ?? {}),
      ...auth,
    }
  }

  return {
    sendMessage: async (input) => {
      const url = joinUrl(baseUrl, endpoints.sendMessage)
      const body = JSON.stringify(toSendMessageRequest(input))
      return jsonRequest<ChatResponse>(fetcher, url, { method: 'POST', headers: await buildHeaders(), body })
    },
    sendAction: async (event: ChatKitActionEvent) => {
      const url = joinUrl(baseUrl, endpoints.sendAction)
      const body = JSON.stringify(event)
      return jsonRequest<ChatResponse>(fetcher, url, { method: 'POST', headers: await buildHeaders(), body })
    },
    loadOlder: endpoints.loadOlder
      ? async (params): Promise<LoadOlderResult> => {
          const url = joinUrl(baseUrl, endpoints.loadOlder as string)
          const body = JSON.stringify(params)
          return jsonRequest<LoadOlderResult>(fetcher, url, { method: 'POST', headers: await buildHeaders(), body })
        }
      : undefined,
  }
}
