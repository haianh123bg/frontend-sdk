/**
 * CDNComponentLoader Service
 * Load custom components từ CDN/Backend API
 */

import type {
  ComponentDefinition,
  CustomComponentResponse,
  GetCustomNodesResponse,
  LoadRegistryOptions,
  CacheStats,
} from '../types'
import type { ComponentRegistry } from '../../ChatKit/types'

// Import demo components cho mock
import { CdnCounter } from '../demo/components/CdnCounter'
import { CdnUserCard } from '../demo/components/CdnUserCard'
import { CdnStatCard } from '../demo/components/CdnStatCard'
import { CdnBadge } from '../demo/components/CdnBadge'
import { CdnRating } from '../demo/components/CdnRating'
import { CdnChip } from '../demo/components/CdnChip'
import { CdnProgress } from '../demo/components/CdnProgress'

/**
 * Mock registry để demo
 * Map type -> component directly thay vì load từ CDN
 */
const MOCK_REGISTRY: Record<string, any> = {
  cdn_counter: CdnCounter,
  cdn_user_card: CdnUserCard,
  cdn_stat_card: CdnStatCard,
  cdn_badge: CdnBadge,
  cdn_rating: CdnRating,
  cdn_chip: CdnChip,
  cdn_progress: CdnProgress,
}

export class CDNComponentLoader {
  private cache = new Map<string, React.ComponentType>()  // url → component
  private typeToUrl = new Map<string, string>()          // type → url mapping
  private loadingPromises = new Map<string, Promise<React.ComponentType>>()
  private failedUrls = new Set<string>()
  private retryCount = 3
  private timeout = 10000  // 10s

  /**
   * Load registry từ Backend API
   * @param apiEndpoint URL của Backend API
   * @param options Options cho loading
   * @returns ComponentRegistry để dùng trong SchemaRenderer
   */
  async loadRegistryFromAPI(
    apiEndpoint: string,
    options: LoadRegistryOptions = {}
  ): Promise<ComponentRegistry> {
    const { onComponentLoaded, onComponentError, retryCount, timeout } = options

    if (retryCount) this.retryCount = retryCount
    if (timeout) this.timeout = timeout

    try {
      // Fetch từ backend
      const response = await fetch(apiEndpoint, {
        headers: { 'Content-Type': 'application/json' },
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`)
      }

      const data: GetCustomNodesResponse = await response.json()

      // Convert responses thành definitions
      const definitions: ComponentDefinition[] = data.components.map((c) => ({
        type: c.type,
        url: c.cdn.url,
        version: c.cdn.version,
        checksum: c.cdn.checksum,
      }))

      // Load all components
      return await this.loadRegistry(definitions, { onComponentLoaded, onComponentError })
    } catch (error) {
      console.error('[CDNComponentLoader] Failed to fetch from API:', error)
      throw error
    }
  }

  /**
   * Load registry từ array definitions
   * @param definitions Mảng component definitions
   * @param options Options cho loading
   * @returns ComponentRegistry
   */
  async loadRegistry(
    definitions: ComponentDefinition[],
    options: LoadRegistryOptions = {}
  ): Promise<ComponentRegistry> {
    const { onComponentLoaded, onComponentError } = options
    const registry: any = {}

    // Load tất cả components song song
    const results = await Promise.allSettled(
      definitions.map(async (def) => {
        try {
          const Component = await this.loadComponent(def)

          // Lưu mapping type → component
          registry[def.type] = Component
          this.typeToUrl.set(def.type, def.url)

          onComponentLoaded?.(def.type, Component)

          return { type: def.type, Component }
        } catch (error) {
          onComponentError?.(def.type, error as Error)
          throw error
        }
      })
    )

    // Log failed components
    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.error(
          `[CDNComponentLoader] Failed to load ${definitions[index].type}:`,
          result.reason
        )
      }
    })

    return registry
  }

  /**
   * Load single component từ URL
   * @param def Component definition
   * @returns React Component
   */
  async loadComponent(def: ComponentDefinition): Promise<React.ComponentType<any>> {
    const { url } = def

    // Check cache
    if (this.cache.has(url)) {
      return this.cache.get(url)!
    }

    // Check if failed before
    if (this.failedUrls.has(url)) {
      throw new Error(`Component previously failed to load: ${url}`)
    }

    // Check if already loading
    if (this.loadingPromises.has(url)) {
      return this.loadingPromises.get(url)!
    }

    // Start loading
    const promise = this.loadComponentWithRetry(def)
    this.loadingPromises.set(url, promise)

    try {
      const Component = await promise
      this.cache.set(url, Component)
      return Component
    } finally {
      this.loadingPromises.delete(url)
    }
  }

  /**
   * Load with retry logic
   */
  private async loadComponentWithRetry(
    def: ComponentDefinition,
    attempt: number = 1
  ): Promise<React.ComponentType> {
    const { url } = def

    try {
      return await this.importComponent(def)
    } catch (error) {
      if (attempt < this.retryCount) {
        console.warn(
          `[CDNComponentLoader] Retry ${attempt}/${this.retryCount} for ${url}`
        )
        await this.delay(1000 * attempt) // Exponential backoff
        return this.loadComponentWithRetry(def, attempt + 1)
      }

      this.failedUrls.add(url)
      throw error
    }
  }

  /**
   * Dynamic import từ URL hoặc Mock Registry
   */
  private async importComponent(def: ComponentDefinition): Promise<React.ComponentType> {
    const { url, type } = def

    // MOCK: Cho demo, nếu url bắt đầu bằng "mock://" thì sử dụng mock registry
    if (url.startsWith('mock://') && type && MOCK_REGISTRY[type]) {
      console.log(`[CDNComponentLoader] ✓ Using mock registry for: ${type}`)
      return MOCK_REGISTRY[type]
    }

    // Production: Load từ CDN thật
    // Tạo script tag với timeout
    const script = document.createElement('script')
    script.type = 'module'

    // Import với version cache busting
    const importUrl = url.includes('?') ? `${url}&t=${Date.now()}` : `${url}?t=${Date.now()}`

    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        this.cleanupScript(script)
        reject(new Error(`Timeout loading component: ${url}`))
      }, this.timeout)

      const cleanup = () => {
        clearTimeout(timeoutId)
        this.cleanupScript(script)
      }

      script.onload = async () => {
        try {
          // Dynamic import
          const module = await import(/* webpackIgnore: true */ importUrl)

          // Validate component
          const Component = this.validateModule(module)

          cleanup()
          resolve(Component)
        } catch (error) {
          cleanup()
          reject(new Error(`Failed to import module from ${url}: ${error}`))
        }
      }

      script.onerror = () => {
        cleanup()
        reject(new Error(`Failed to load script: ${url}`))
      }

      script.src = importUrl
      document.head.appendChild(script)
    })
  }

  /**
   * Validate module và trả về component
   */
  private validateModule(module: any): React.ComponentType {
    // Try default export
    if (module.default) {
      if (typeof module.default === 'function') {
        return module.default
      }
      // Try named export if default is object
      if (typeof module.default === 'object' && module.default.Component) {
        return module.default.Component
      }
    }

    // Try named exports
    if (module.Component && typeof module.Component === 'function') {
      return module.Component
    }

    // Return first function export
    const functionExport = Object.values(module).find((v) => typeof v === 'function')

    if (functionExport) {
      return functionExport as React.ComponentType
    }

    throw new Error('No valid component export found')
  }

  /**
   * Reload component (để update)
   */
  async reloadComponent(type: string): Promise<React.ComponentType> {
    const url = this.typeToUrl.get(type)

    if (!url) {
      throw new Error(`Unknown component type: ${type}`)
    }

    // Clear cache
    this.cache.delete(url)
    this.failedUrls.delete(url)

    // Reload từ API
    const response = await fetch(`/api/custom-nodes/${type}`)
    const data: CustomComponentResponse = await response.json()

    // Load lại
    const definition: ComponentDefinition = {
      type: data.type,
      url: data.cdn.url,
      version: data.cdn.version,
      checksum: data.cdn.checksum,
    }

    return await this.loadComponent(definition)
  }

  /**
   * Clear all cache
   */
  clearCache(): void {
    this.cache.clear()
    this.typeToUrl.clear()
    this.loadingPromises.clear()
    this.failedUrls.clear()
  }

  /**
   * Get cache stats
   */
  getStats(): CacheStats {
    return {
      cached: this.cache.size,
      loading: this.loadingPromises.size,
      failed: this.failedUrls.size,
    }
  }

  /**
   * Cleanup script tag
   */
  private cleanupScript(script: HTMLScriptElement): void {
    if (script.parentNode) {
      script.parentNode.removeChild(script)
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}

// Singleton instance
export const cdnComponentLoader = new CDNComponentLoader()
