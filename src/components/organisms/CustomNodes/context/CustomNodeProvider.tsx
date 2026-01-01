/**
 * CustomNodeProvider Context
 * Provider để chia sẻ custom components registry cho toàn bộ app
 */

import * as React from 'react'
import { cdnComponentLoader } from '../services/cdnComponentLoader'
import type { ComponentRegistry } from '../../ChatKit/types'
import type { CustomNodeContextValue } from '../types'

const CustomNodeContext = React.createContext<CustomNodeContextValue | null>(null)

export interface CustomNodeProviderProps {
  children: React.ReactNode
  /** Backend API endpoint */
  apiEndpoint?: string
  /** Auto load on mount */
  autoLoad?: boolean
  /** Fallback khi loading */
  loadingFallback?: React.ReactNode
  /** Fallback khi có lỗi */
  errorFallback?: React.ReactNode
  /** Callback khi có lỗi */
  onError?: (error: Error) => void
}

/**
 * Provider để load và chia sẻ custom components
 */
export function CustomNodeProvider({
  children,
  apiEndpoint = '/api/custom-nodes',
  autoLoad = true,
  loadingFallback,
  errorFallback,
  onError,
}: CustomNodeProviderProps) {
  const [registry, setRegistry] = React.useState<ComponentRegistry>({})
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<Error | null>(null)
  const [stats, setStats] = React.useState(() => cdnComponentLoader.getStats())

  const load = React.useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const newRegistry = await cdnComponentLoader.loadRegistryFromAPI(apiEndpoint, {
        onComponentLoaded: (type) => {
          console.log(`[CustomNodeProvider] ✓ Loaded: ${type}`)
        },
        onComponentError: (type, err) => {
          console.error(`[CustomNodeProvider] ✗ Failed: ${type}`, err)
        },
      })

      setRegistry(newRegistry)
      setError(null)
    } catch (err) {
      const error = err as Error
      setError(error)
      onError?.(error)
    } finally {
      setLoading(false)
      setStats(cdnComponentLoader.getStats())
    }
  }, [apiEndpoint, onError])

  const reload = React.useCallback(() => {
    cdnComponentLoader.clearCache()
    return load()
  }, [load])

  const reloadComponent = React.useCallback(
    async (type: string) => {
      try {
        const Component = await cdnComponentLoader.reloadComponent(type)
        setRegistry((prev) => ({ ...prev, [type]: Component as any }))
        setStats(cdnComponentLoader.getStats())
      } catch (err) {
        onError?.(err as Error)
      }
    },
    [onError]
  )

  const clearCache = React.useCallback(() => {
    cdnComponentLoader.clearCache()
    setRegistry({})
    setStats(cdnComponentLoader.getStats())
  }, [])

  React.useEffect(() => {
    if (autoLoad) {
      load()
    }
  }, [autoLoad, load])

  const value: CustomNodeContextValue = {
    registry,
    loading,
    error,
    stats,
    reload,
    reloadComponent,
    clearCache,
  }

  if (loading && loadingFallback) {
    return <>{loadingFallback}</>
  }

  if (error && errorFallback) {
    return <>{errorFallback}</>
  }

  return <CustomNodeContext.Provider value={value}>{children}</CustomNodeContext.Provider>
}

/**
 * Hook để sử dụng CustomNode context
 */
export function useCustomNodeContext(): CustomNodeContextValue {
  const context = React.useContext(CustomNodeContext)
  if (!context) {
    throw new Error('useCustomNodeContext must be used within CustomNodeProvider')
  }
  return context
}
