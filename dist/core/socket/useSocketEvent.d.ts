import { SocketChannel } from './types';

export declare const useSocketEvent: <T = any>(channel: SocketChannel, event: string, handler: (data: T) => void) => void;
