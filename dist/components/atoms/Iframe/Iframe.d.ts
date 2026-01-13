import * as React from 'react';
export interface IframeProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
    containerClassName?: string;
    aspectRatio?: '1/1' | '16/9' | '4/3' | '3/2';
    showLoading?: boolean;
    loadingOverlay?: React.ReactNode;
    errorFallback?: React.ReactNode;
}
export declare const Iframe: React.ForwardRefExoticComponent<IframeProps & React.RefAttributes<HTMLIFrameElement>>;
