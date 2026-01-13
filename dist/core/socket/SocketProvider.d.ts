import { ReactNode } from 'react';
import { SocketContextValue, SocketMap } from './types';
import * as React from 'react';
export interface SocketProviderProps {
    children: ReactNode;
    sockets: SocketMap;
}
export declare const SocketProvider: React.FC<SocketProviderProps>;
export declare const useSocketContext: () => SocketContextValue;
