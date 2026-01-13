import { ComponentRegistry } from '../../ChatKit/types';
import { CustomNodeContextValue } from '../types';

export interface UseCustomComponentsOptions {
    /** Backend API endpoint */
    apiEndpoint?: string;
    /** Auto load on mount */
    autoLoad?: boolean;
    /** Callback khi có lỗi */
    onError?: (error: Error) => void;
    /** Callback khi loading state thay đổi */
    onLoadingChange?: (loading: boolean) => void;
}
export interface UseCustomComponentsReturn extends Omit<CustomNodeContextValue, 'registry'> {
    registry: ComponentRegistry;
}
/**
 * Hook để load custom components từ Backend API
 * @param options Options
 * @returns Registry và các functions để manage components
 */
export declare function useCustomComponents(options?: UseCustomComponentsOptions): UseCustomComponentsReturn;
