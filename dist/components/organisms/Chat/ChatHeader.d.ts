import { ChatAgentInfo } from './types';
import * as React from 'react';
export interface ChatHeaderProps {
    agent: ChatAgentInfo;
    onCallAgent?: () => void;
    onOpenConversations?: () => void;
    onOpenTasks?: () => void;
    onCreateConversation?: () => void;
    onClose?: () => void;
}
export declare const ChatHeader: React.FC<ChatHeaderProps>;
