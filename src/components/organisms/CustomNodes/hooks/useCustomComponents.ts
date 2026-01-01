/**
 * useCustomComponents Hook
 * Hook để load và manage custom components từ Backend API
 */

import { useState, useEffect, useCallback } from 'react'
import { cdnComponentLoader } from '../services/cdnComponentLoader'
import type { ComponentRegistry } from '../../ChatKit/types'
import type { CustomNodeContextValue } from '../types'

export interface UseCustomComponentsOptions {
  /** Backend API endpoint */
  apiEndpoint?: string
  /** Auto load on mount */
  autoLoad?: boolean
  /** Callback khi có lỗi */
  onError?: (error: Error) => void
  /** Callback khi loading state thay đổi */
  onLoadingChange?: (loading: boolean) => void
}

export interface UseCustomComponentsReturn extends Omit<CustomNodeContextValue, 'registry'> {
  registry: ComponentRegistry
}

/**
 * Hook để load custom components từ Backend API
 * @param options Options
 * @returns Registry và các functions để manage components
 */
export function useCustomComponents(
  options: UseCustomComponentsOptions = {}
): UseCustomComponentsReturn {
  const {
    apiEndpoint = '/api/custom-nodes',
    autoLoad = true,
    onError,
    onLoadingChange,
  } = options

  const [registry, setRegistry] = useState<ComponentRegistry>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [stats, setStats] = useState(() => cdnComponentLoader.getStats())

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    onLoadingChange?.(true)

    try {
      const newRegistry = await cdnComponentLoader.loadRegistryFromAPI(apiEndpoint, {
        onComponentLoaded: (type) => {
          console.log(`[useCustomComponents] ✓ Loaded: ${type}`)
        },
        onComponentError: (type, err) => {
          console.error(`[useCustomComponents] ✗ Failed: ${type}`, err)
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
      onLoadingChange?.(false)
    }
  }, [apiEndpoint, onError, onLoadingChange])

  const reload = useCallback(() => {
    cdnComponentLoader.clearCache()
    return load()
  }, [load])

  const reloadComponent = useCallback(
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

  const clearCache = useCallback(() => {
    cdnComponentLoader.clearCache()
    setRegistry({})
    setStats(cdnComponentLoader.getStats())
  }, [])

  useEffect(() => {
    if (autoLoad) {
      load()
    }
  }, [autoLoad, load])

  return {
    registry,
    loading,
    error,
    stats,
    reload,
    reloadComponent,
    clearCache,
  }
}
