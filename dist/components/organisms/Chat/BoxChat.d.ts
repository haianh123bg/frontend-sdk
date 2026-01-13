import { ChatPanelProps } from './ChatPanel';
import * as React from 'react';
export interface BoxChatProps extends Omit<ChatPanelProps, 'className'> {
    mode?: 'floating' | 'split';
    open: boolean;
    onClose?: () => void;
    title?: React.ReactNode;
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    size?: 'sm' | 'md' | 'lg';
    view?: React.ReactNode;
    chatSide?: 'left' | 'right';
    chatRatio?: number;
    minChat?: number;
    minView?: number;
    className?: string;
}
export declare const BoxChat: React.FC<BoxChatProps>;
