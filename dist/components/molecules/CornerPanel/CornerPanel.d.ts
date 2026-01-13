import * as React from 'react';
export interface CornerPanelProps {
    /**
     * Bật/tắt panel. Khi false component sẽ không render gì.
     */
    open: boolean;
    /**
     * Callback khi bấm nút đóng.
     */
    onClose?: () => void;
    /**
     * Tiêu đề hiển thị phía trên nội dung.
     */
    title?: React.ReactNode;
    /**
     * Nội dung panel, có thể là bất cứ ReactNode nào (form, button, v.v.).
     */
    children: React.ReactNode;
    /**
     * Vị trí neo panel trong viewport.
     * Mặc định: bottom-right.
     */
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    size?: 'sm' | 'md' | 'lg';
    animation?: 'slide-in' | 'slide-up' | 'none';
    fullHeight?: boolean;
    noBorder?: boolean;
    className?: string;
}
export declare const CornerPanel: React.ForwardRefExoticComponent<CornerPanelProps & React.RefAttributes<HTMLDivElement>>;
