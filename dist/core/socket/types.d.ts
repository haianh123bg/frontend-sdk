export type SocketChannel = string;
export interface GenericSocket {
    on: (event: string, handler: (data: any) => void) => void;
    off: (event: string, handler: (data: any) => void) => void;
    emit: (event: string, payload: any) => void;
}
export type SocketMap = Record<SocketChannel, GenericSocket>;
export interface SocketContextValue {
    getSocket: (channel: SocketChannel) => GenericSocket | undefined;
    subscribe: <T = any>(channel: SocketChannel, event: string, handler: (data: T) => void) => () => void;
    emit: (channel: SocketChannel, event: string, payload: any) => void;
}
