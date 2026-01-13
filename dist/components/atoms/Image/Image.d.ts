import * as React from 'react';
export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallback?: string;
    aspectRatio?: '1/1' | '16/9' | '4/3' | '3/2';
    objectFit?: 'contain' | 'cover' | 'fill' | 'none';
}
export declare const Image: React.ForwardRefExoticComponent<ImageProps & React.RefAttributes<HTMLImageElement>>;
