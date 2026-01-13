import { ComponentDefinition, LoadRegistryOptions, CacheStats } from '../types';
import { ComponentRegistry } from '../../ChatKit/types';

export declare class CDNComponentLoader {
    private cache;
    private typeToUrl;
    private loadingPromises;
    private failedUrls;
    private retryCount;
    private timeout;
    /**
     * Load registry từ Backend API
     * @param apiEndpoint URL của Backend API
     * @param options Options cho loading
     * @returns ComponentRegistry để dùng trong SchemaRenderer
     */
    loadRegistryFromAPI(apiEndpoint: string, options?: LoadRegistryOptions): Promise<ComponentRegistry>;
    /**
     * Load registry từ array definitions
     * @param definitions Mảng component definitions
     * @param options Options cho loading
     * @returns ComponentRegistry
     */
    loadRegistry(definitions: ComponentDefinition[], options?: LoadRegistryOptions): Promise<ComponentRegistry>;
    /**
     * Load single component từ URL
     * @param def Component definition
     * @returns React Component
     */
    loadComponent(def: ComponentDefinition): Promise<React.ComponentType<any>>;
    /**
     * Load with retry logic
     */
    private loadComponentWithRetry;
    /**
     * Dynamic import từ URL hoặc Mock Registry
     */
    private importComponent;
    /**
     * Validate module và trả về component
     */
    private validateModule;
    /**
     * Reload component (để update)
     */
    reloadComponent(type: string): Promise<React.ComponentType>;
    /**
     * Clear all cache
     */
    clearCache(): void;
    /**
     * Get cache stats
     */
    getStats(): CacheStats;
    /**
     * Cleanup script tag
     */
    private cleanupScript;
    private delay;
}
export declare const cdnComponentLoader: CDNComponentLoader;
