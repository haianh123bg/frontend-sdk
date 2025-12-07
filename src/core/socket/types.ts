// File: src/core/socket/types.ts

export type SocketChannel = string

// Interface tối thiểu mà bất kỳ socket client nào cần implement
// (tương thích với socket.io-client hoặc wrapper khác)
export interface GenericSocket {
  on: (event: string, handler: (data: any) => void) => void
  off: (event: string, handler: (data: any) => void) => void
  emit: (event: string, payload: any) => void
}

export type SocketMap = Record<SocketChannel, GenericSocket>

export interface SocketContextValue {
  getSocket: (channel: SocketChannel) => GenericSocket | undefined
  subscribe: <T = any>(
    channel: SocketChannel,
    event: string,
    handler: (data: T) => void
  ) => () => void
  emit: (channel: SocketChannel, event: string, payload: any) => void
}
