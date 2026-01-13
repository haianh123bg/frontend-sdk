interface VirtualScrollOptions {
    totalItems: number;
    itemHeight: number;
    containerHeight: number;
    buffer?: number;
}
export declare const useVirtualScroll: ({ totalItems, itemHeight, containerHeight, buffer, }: VirtualScrollOptions) => {
    visibleItems: {
        index: number;
        offsetTop: number;
    }[];
    totalHeight: number;
    onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
    scrollTop: number;
};
export {};
