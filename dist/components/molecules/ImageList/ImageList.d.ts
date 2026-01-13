import { ImageProps } from '../../atoms/Image/Image';
import * as React from 'react';
export interface ImageListItem {
    id?: string;
    src: string;
    alt?: string;
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
}
export interface ImageListProps extends React.HTMLAttributes<HTMLDivElement> {
    items: ImageListItem[];
    cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
    gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
    aspectRatio?: ImageProps['aspectRatio'];
    objectFit?: ImageProps['objectFit'];
    renderItem?: (item: ImageListItem, index: number) => React.ReactNode;
}
export declare const ImageList: React.ForwardRefExoticComponent<ImageListProps & React.RefAttributes<HTMLDivElement>>;
