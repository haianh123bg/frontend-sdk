import { SocketChannel } from './types';

export declare const useSocketEmit: () => (channel: SocketChannel, event: string, payload: any) => void;
