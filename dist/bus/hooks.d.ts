import { ActionBus } from './actionBus';
import { ActionEvent, EventHandler } from '../events/types';

export declare const useActionBus: () => ActionBus;
export declare const useDispatchAction: () => <T = any>(type: string, payload: T, options?: {
    meta?: ActionEvent["meta"];
    flags?: ActionEvent["flags"];
    source?: string;
}) => void;
export declare const useSubscribeAction: (eventType: string, handler: EventHandler, deps?: any[]) => void;
export declare const useAsyncAction: () => void;
