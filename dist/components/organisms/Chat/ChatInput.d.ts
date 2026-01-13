import { SendMessageInput } from './types';
import * as React from 'react';
export interface ChatInputProps {
    conversationId: string;
    disabled?: boolean;
    placeholder?: string;
    allowAttachments?: boolean;
    maxAttachments?: number;
    mentionContexts?: Array<{
        id: string;
        label: string;
        description?: string;
    }>;
    replyTo?: {
        id: string;
        senderName?: string;
        previewText?: string;
    };
    onCancelReply?: () => void;
    onSend?: (input: SendMessageInput) => void | Promise<void>;
    onOpenSettings?: () => void;
    onVoiceToText?: () => void;
    className?: string;
}
export declare const ChatInput: React.FC<ChatInputProps>;
