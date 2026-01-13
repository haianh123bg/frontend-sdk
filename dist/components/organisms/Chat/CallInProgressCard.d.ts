import { ChatAgentInfo } from './types';
import * as React from 'react';
export interface CallInProgressCardProps {
    agent: ChatAgentInfo;
    callDurationLabel: string;
    onEndCall: () => void;
    className?: string;
}
export declare const CallInProgressCard: React.FC<CallInProgressCardProps>;
