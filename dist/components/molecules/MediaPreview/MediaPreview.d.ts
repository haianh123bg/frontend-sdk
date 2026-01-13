import * as React from 'react';
export type MediaPreviewItemType = 'image' | 'video' | 'audio' | 'pdf' | 'iframe' | 'file';
export interface MediaPreviewItem {
    id?: string;
    type: MediaPreviewItemType;
    src: string;
    title?: string;
    mimeType?: string;
    poster?: string;
    downloadName?: string;
}
export interface MediaPreviewProps {
    open: boolean;
    onClose: () => void;
    items: MediaPreviewItem[];
    initialIndex?: number;
    index?: number;
    onIndexChange?: (nextIndex: number) => void;
    modalSize?: 'sm' | 'md' | 'lg' | 'xl';
}
export declare const MediaPreview: React.FC<MediaPreviewProps>;
