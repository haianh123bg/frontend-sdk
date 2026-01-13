import * as React from 'react';
export interface UseChatScrollOptions {
    thresholdPx?: number;
}
export declare function useIsAtBottom(scrollRef: React.RefObject<HTMLElement>, options?: UseChatScrollOptions): {
    isAtBottom: boolean;
    recompute: () => void;
    setIsAtBottom: React.Dispatch<React.SetStateAction<boolean>>;
};
export declare function scrollToBottom(scrollRef: React.RefObject<HTMLElement>, behavior?: ScrollBehavior): void;
export declare function usePreserveScrollOnPrepend(params: {
    scrollRef: React.RefObject<HTMLElement>;
    firstRowKey?: string;
    enabled?: boolean;
}): void;
