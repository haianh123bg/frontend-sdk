import { AiControlMessage } from './types';

export interface AiControlApi {
    sendUiEvent: (message: Omit<AiControlMessage, 'direction'>) => void;
    sendCommand: (message: Omit<AiControlMessage, 'direction'>) => void;
}
export declare const useAiControl: () => AiControlApi;
