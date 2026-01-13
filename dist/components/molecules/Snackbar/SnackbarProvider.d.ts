import * as React from 'react';
export type SnackbarVariant = 'info' | 'success' | 'warning' | 'error';
export interface SnackbarConfig {
    message: string;
    variant?: SnackbarVariant;
    duration?: number;
    actionLabel?: string;
    onAction?: () => void;
}
interface SnackbarContextValue {
    showSnackbar: (config: SnackbarConfig) => void;
}
export declare const useSnackbar: () => SnackbarContextValue;
export interface SnackbarProviderProps {
    children: React.ReactNode;
    maxSnackbars?: number;
}
export declare const SnackbarProvider: React.FC<SnackbarProviderProps>;
export {};
