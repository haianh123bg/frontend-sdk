import { ComponentRegistry } from '../ChatKit/types';

/**
 * Định nghĩa component từ CDN/Backend
 */
export interface ComponentDefinition {
    /** Component type name để sử dụng trong SchemaRenderer */
    type: string;
    /** CDN URL để load component */
    url: string;
    /** Phiên bản của component */
    version: string;
    /** Optional checksum để validate integrity */
    checksum?: string;
}
/**
 * Response từ Backend API
 */
export interface CustomComponentResponse {
    id: string;
    type: string;
    name: string;
    description?: string;
    cdn: {
        url: string;
        version: string;
        checksum?: string;
    };
    props_schema?: Record<string, {
        type: string;
        required: boolean;
    }>;
    thumbnail?: string;
    created_at: string;
    updated_at: string;
}
/**
 * Response từ GET /api/custom-nodes
 */
export interface GetCustomNodesResponse {
    components: CustomComponentResponse[];
}
/**
 * Options khi load registry
 */
export interface LoadRegistryOptions {
    /** Callback khi component được load thành công */
    onComponentLoaded?: (type: string, component: React.ComponentType) => void;
    /** Callback khi component load thất bại */
    onComponentError?: (type: string, error: Error) => void;
    /** Số lần retry khi thất bại */
    retryCount?: number;
    /** Timeout cho mỗi request (ms) */
    timeout?: number;
}
/**
 * Trạng thái loading
 */
export interface LoadingState {
    loading: boolean;
    loaded: string[];
    failed: Record<string, string>;
}
/**
 * Stats của cache
 */
export interface CacheStats {
    cached: number;
    loading: number;
    failed: number;
}
/**
 * Context value cho CustomNodeProvider
 */
export interface CustomNodeContextValue {
    registry: ComponentRegistry;
    loading: boolean;
    error: Error | null;
    stats: CacheStats;
    reload: () => Promise<void>;
    reloadComponent: (type: string) => Promise<void>;
    clearCache: () => void;
}
