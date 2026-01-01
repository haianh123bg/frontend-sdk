/**
 * CustomNodes Module Index
 * Export tất cả components, hooks, services
 */

// Types
export type {
  ComponentDefinition,
  CustomComponentResponse,
  GetCustomNodesResponse,
  LoadRegistryOptions,
  LoadingState,
  CacheStats,
  CustomNodeContextValue,
} from './types'

// Services
export { CDNComponentLoader, cdnComponentLoader } from './services/cdnComponentLoader'

// Hooks
export { useCustomComponents } from './hooks/useCustomComponents'

// Provider
export { CustomNodeProvider, useCustomNodeContext } from './context/CustomNodeProvider'

// Demo Components (để load local trong story, trong production sẽ load từ CDN)
export { CdnCounter } from './demo/components/CdnCounter'
export { CdnUserCard } from './demo/components/CdnUserCard'
export { CdnStatCard } from './demo/components/CdnStatCard'
export { CdnBadge } from './demo/components/CdnBadge'
export { CdnRating } from './demo/components/CdnRating'
export { CdnChip } from './demo/components/CdnChip'
export { CdnProgress } from './demo/components/CdnProgress'

// Mock API (chỉ cho development/demo)
export {
  mockCustomNodesData,
  mockFetchCustomNodes,
  mockFetchCustomNode,
  setupMockAPI,
} from './demo/mockApi'
