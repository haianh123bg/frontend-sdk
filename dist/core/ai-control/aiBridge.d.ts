import { SocketContextValue } from '../socket/types';
import { AiControlConfig } from './types';

export interface AiBridge {
    dispose: () => void;
}
export interface AiBridgeDependencies {
    socket: Pick<SocketContextValue, 'subscribe' | 'emit'>;
    config?: AiControlConfig;
}
export declare const createAiBridge: ({ socket, config }: AiBridgeDependencies) => AiBridge;
