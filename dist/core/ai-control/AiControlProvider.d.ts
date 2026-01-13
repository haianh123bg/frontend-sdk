import { ReactNode } from 'react';
import { AiControlConfig } from './types';
import * as React from 'react';
export interface AiControlProviderProps {
    children: ReactNode;
    config?: AiControlConfig;
}
export declare const AiControlProvider: React.FC<AiControlProviderProps>;
