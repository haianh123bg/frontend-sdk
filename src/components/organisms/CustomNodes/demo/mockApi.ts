/**
 * Mock API để demo CustomNodes loading
 * Trong production, replace bằng real Backend API calls
 */

import type { GetCustomNodesResponse, CustomComponentResponse } from '../types'
import { CdnCounter } from './components/CdnCounter'
import { CdnUserCard } from './components/CdnUserCard'
import { CdnStatCard } from './components/CdnStatCard'
import { CdnBadge } from './components/CdnBadge'
import { CdnRating } from './components/CdnRating'
import { CdnChip } from './components/CdnChip'
import { CdnProgress } from './components/CdnProgress'

/**
 * Mock data cho custom components
 * TRONG DEMO: Components được import trực tiếp thay vì load từ CDN
 */
export const mockCustomNodesData: GetCustomNodesResponse = {
  components: [
    {
      id: 'cdn-counter-1',
      type: 'cdn_counter',
      name: 'CDN Counter',
      description: 'Counter component loaded from CDN',
      cdn: {
        url: 'mock://cdn-counter',
        version: '1.0.0',
        checksum: 'abc123',
      },
      props_schema: {
        initial: { type: 'number', required: false },
        label: { type: 'string', required: false },
        step: { type: 'number', required: false },
        variant: { type: 'string', required: false },
      },
      thumbnail: 'https://via.placeholder.com/100x100',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'cdn-user-card-1',
      type: 'cdn_user_card',
      name: 'CDN User Card',
      description: 'User card component loaded from CDN',
      cdn: {
        url: 'mock://cdn-user-card',
        version: '1.0.0',
        checksum: 'def456',
      },
      props_schema: {
        user: { type: 'object', required: true },
        showEmail: { type: 'boolean', required: false },
        showStatus: { type: 'boolean', required: false },
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'cdn-stat-card-1',
      type: 'cdn_stat_card',
      name: 'CDN Stat Card',
      description: 'Statistics card component loaded from CDN',
      cdn: {
        url: 'mock://cdn-stat-card',
        version: '1.0.0',
        checksum: 'ghi789',
      },
      props_schema: {
        title: { type: 'string', required: true },
        value: { type: 'string', required: true },
        change: { type: 'string', required: false },
        changeType: { type: 'string', required: false },
        icon: { type: 'string', required: false },
        size: { type: 'string', required: false },
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'cdn-badge-1',
      type: 'cdn_badge',
      name: 'CDN Badge',
      description: 'Badge component with tone colors',
      cdn: {
        url: 'mock://cdn-badge',
        version: '1.0.0',
        checksum: 'badge001',
      },
      props_schema: {
        text: { type: 'string', required: true },
        tone: { type: 'string', required: false },
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'cdn-rating-1',
      type: 'cdn_rating',
      name: 'CDN Rating',
      description: 'Rating stars component',
      cdn: {
        url: 'mock://cdn-rating',
        version: '1.0.0',
        checksum: 'rating001',
      },
      props_schema: {
        value: { type: 'number', required: true },
        count: { type: 'number', required: false },
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'cdn-chip-1',
      type: 'cdn_chip',
      name: 'CDN Chip',
      description: 'Filter chip component',
      cdn: {
        url: 'mock://cdn-chip',
        version: '1.0.0',
        checksum: 'chip001',
      },
      props_schema: {
        label: { type: 'string', required: true },
        active: { type: 'boolean', required: false },
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'cdn-progress-1',
      type: 'cdn_progress',
      name: 'CDN Progress',
      description: 'Progress bar component',
      cdn: {
        url: 'mock://cdn-progress',
        version: '1.0.0',
        checksum: 'progress001',
      },
      props_schema: {
        value: { type: 'number', required: true },
        max: { type: 'number', required: false },
        label: { type: 'string', required: false },
        color: { type: 'string', required: false },
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
}

/**
 * Mock CDN Components Registry
 * Map type -> actual component (để demo, không cần load từ CDN thật)
 */
export const mockCDNRegistry: Record<string, React.ComponentType<any>> = {
  cdn_counter: CdnCounter,
  cdn_user_card: CdnUserCard,
  cdn_stat_card: CdnStatCard,
  cdn_badge: CdnBadge,
  cdn_rating: CdnRating,
  cdn_chip: CdnChip,
  cdn_progress: CdnProgress,
}

/**
 * Mock API function
 * Giả lập việc gọi Backend API
 */
export async function mockFetchCustomNodes(
  endpoint: string
): Promise<GetCustomNodesResponse> {
  console.log(`[Mock API] Fetching from: ${endpoint}`)

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Return mock data
  return mockCustomNodesData
}

/**
 * Mock single component API
 */
export async function mockFetchCustomNode(
  type: string
): Promise<CustomComponentResponse> {
  console.log(`[Mock API] Fetching component: ${type}`)

  await new Promise((resolve) => setTimeout(resolve, 300))

  const component = mockCustomNodesData.components.find((c) => c.type === type)

  if (!component) {
    throw new Error(`Component not found: ${type}`)
  }

  return component
}

/**
 * Patch global fetch để intercept các request đến /api/custom-nodes
 * Chỉ dùng cho demo/dev, không dùng trong production
 */
export function setupMockAPI() {
  const originalFetch = window.fetch

  window.fetch = async function (input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url

    // Debug log cho tất cả requests
    console.log(`[Mock API] Checking URL: ${url}`)

    // Intercept requests to /api/custom-nodes (không có /:type ở cuối)
    if (url.match(/\/api\/custom-nodes(\?|$)/)) {
      console.log(`[Mock API] ✓ Intercepted LIST request: ${url}`)
      const data = await mockFetchCustomNodes(url)

      return new Response(JSON.stringify(data), {
        status: 200,
        statusText: 'OK',
        headers: { 'Content-Type': 'application/json' },
      }) as Response
    }

    // Intercept requests to /api/custom-nodes/:type
    const singleNodeMatch = url.match(/\/api\/custom-nodes\/([^/?]+)/)
    if (singleNodeMatch) {
      const type = singleNodeMatch[1]
      console.log(`[Mock API] ✓ Intercepted SINGLE request: ${type}`)
      const data = await mockFetchCustomNode(type)

      return new Response(JSON.stringify(data), {
        status: 200,
        statusText: 'OK',
        headers: { 'Content-Type': 'application/json' },
      }) as Response
    }

    // Use original fetch for other requests
    return originalFetch(input, init)
  }

  console.log('[Mock API] ✓ Setup complete. Will intercept: /api/custom-nodes*')
  console.log('[Mock API] Current fetch is now patched')

  return () => {
    // Restore original fetch
    window.fetch = originalFetch
    console.log('[Mock API] × Restored original fetch')
  }
}
