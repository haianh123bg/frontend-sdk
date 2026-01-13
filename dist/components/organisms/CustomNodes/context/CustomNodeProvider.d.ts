import { CustomNodeContextValue } from '../types';
/**
 * CustomNodeProvider Context
 * Provider để chia sẻ custom components registry cho toàn bộ app
 */
import * as React from 'react';
export interface CustomNodeProviderProps {
    children: React.ReactNode;
    /** Backend API endpoint */
    apiEndpoint?: string;
    /** Auto load on mount */
    autoLoad?: boolean;
    /** Fallback khi loading */
    loadingFallback?: React.ReactNode;
    /** Fallback khi có lỗi */
    errorFallback?: React.ReactNode;
    /** Callback khi có lỗi */
    onError?: (error: Error) => void;
}
/**
 * Provider để load và chia sẻ custom components
 */
export declare function CustomNodeProvider({ children, apiEndpoint, autoLoad, loadingFallback, errorFallback, onError, }: CustomNodeProviderProps): import("react/jsx-runtime").JSX.Element;
/**
 * Hook để sử dụng CustomNode context
 */
export declare function useCustomNodeContext(): CustomNodeContextValue;
