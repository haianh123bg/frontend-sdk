import { useState } from 'react';
import { useMetaStore } from '../../../store/useMetaStore';

export const useColumnResize = (columnId: string, initialWidth?: number) => {
    const { updateColumn } = useMetaStore();
    const [width, setWidth] = useState(initialWidth || 150);
    const [isResizing, setIsResizing] = useState(false);

    // Optimized resize handler using Ref for current width tracking during drag
    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsResizing(true);

        const startX = e.pageX;
        const startWidth = width;
        let currentNewWidth = startWidth;

        const onMouseMove = (moveEvent: MouseEvent) => {
            const diff = moveEvent.pageX - startX;
            currentNewWidth = Math.max(50, startWidth + diff);
            setWidth(currentNewWidth);
        };

        const onMouseUp = () => {
            setIsResizing(false);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            updateColumn(columnId, { width: currentNewWidth });
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    return {
        width,
        isResizing,
        handleMouseDown
    };
};
