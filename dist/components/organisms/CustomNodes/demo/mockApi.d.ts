import { GetCustomNodesResponse, CustomComponentResponse } from '../types';

/**
 * Mock data cho custom components
 * TRONG DEMO: Components được import trực tiếp thay vì load từ CDN
 */
export declare const mockCustomNodesData: GetCustomNodesResponse;
/**
 * Mock CDN Components Registry
 * Map type -> actual component (để demo, không cần load từ CDN thật)
 */
export declare const mockCDNRegistry: Record<string, React.ComponentType<any>>;
/**
 * Mock API function
 * Giả lập việc gọi Backend API
 */
export declare function mockFetchCustomNodes(endpoint: string): Promise<GetCustomNodesResponse>;
/**
 * Mock single component API
 */
export declare function mockFetchCustomNode(type: string): Promise<CustomComponentResponse>;
/**
 * Patch global fetch để intercept các request đến /api/custom-nodes
 * Chỉ dùng cho demo/dev, không dùng trong production
 */
export declare function setupMockAPI(): () => void;
