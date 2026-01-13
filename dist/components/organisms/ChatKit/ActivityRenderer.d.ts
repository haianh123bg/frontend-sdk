import { ChatKitActionEvent, ChatKitActivity } from './contracts';
import * as React from 'react';
export type ActivityComponentProps = {
    activity: ChatKitActivity;
    onAction?: (event: ChatKitActionEvent) => void;
    conversationId?: string;
};
export type ActivityComponent = React.ComponentType<ActivityComponentProps>;
export type ActivityRegistry = Record<string, ActivityComponent>;
export interface ActivityRendererProps {
    activities: ChatKitActivity[];
    registry?: ActivityRegistry;
    conversationId?: string;
    onAction?: (event: ChatKitActionEvent) => void;
    className?: string;
    unknownFallback?: (activity: ChatKitActivity) => React.ReactNode;
}
export declare const ActivityRenderer: React.FC<ActivityRendererProps>;
