export interface ChatMessage {
    id: string;
    sender: string;
    avatarUrl?: string;
    message: string;
    time: string;
}
export interface ChatPanelProps {
    messages: ChatMessage[];
}
export declare const ChatPanel: ({ messages }: ChatPanelProps) => import("react/jsx-runtime").JSX.Element;
