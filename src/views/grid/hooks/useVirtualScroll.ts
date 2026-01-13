import { useState, useMemo } from 'react';

interface VirtualScrollOptions {
    totalItems: number;
    itemHeight: number;
    containerHeight: number;
    buffer?: number;
}

export const useVirtualScroll = ({
    totalItems,
    itemHeight,
    containerHeight,
    buffer = 5,
}: VirtualScrollOptions) => {
    const [scrollTop, setScrollTop] = useState(0);

    const totalHeight = totalItems * itemHeight;

    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer);
    const endIndex = Math.min(
        totalItems - 1,
        Math.floor((scrollTop + containerHeight) / itemHeight) + buffer
    );

    const visibleItems = useMemo(() => {
        const items = [];
        for (let i = startIndex; i <= endIndex; i++) {
            items.push({
                index: i,
                offsetTop: i * itemHeight,
            });
        }
        return items;
    }, [startIndex, endIndex, itemHeight]);

    const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
        setScrollTop(e.currentTarget.scrollTop);
    };

    return {
        visibleItems,
        totalHeight,
        onScroll,
        scrollTop
    };
};
