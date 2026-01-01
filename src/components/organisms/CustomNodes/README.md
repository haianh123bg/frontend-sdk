# CustomNodes Module

Module cho phép load custom components từ Backend/CDN và sử dụng trong SchemaRenderer.

## Tính năng

- ✅ Load custom components từ Backend API
- ✅ Dynamic import từ CDN URLs
- ✅ Cache management với retry logic
- ✅ React Context API để chia sẻ registry
- ✅ Custom hook để load components
- ✅ Error handling và fallback UI
- ✅ Mock API cho development/demo

## Cấu trúc thư mục

```
CustomNodes/
├── index.ts                      # Main exports
├── types.ts                      # TypeScript types
├── services/
│   └── cdnComponentLoader.ts     # CDN loading service
├── hooks/
│   └── useCustomComponents.ts    # React hook
├── context/
│   └── CustomNodeProvider.tsx    # Context provider
├── components/
│   └── (future)                  # Reusable components
└── demo/
    ├── mockApi.ts                # Mock API for demo
    └── components/
        ├── CdnCounter.tsx         # Demo: Counter component
        ├── CdnUserCard.tsx        # Demo: User card component
        └── CdnStatCard.tsx        # Demo: Stat card component
```

## Cách sử dụng

### 1. Sử dụng Hook

```tsx
import { SchemaRenderer } from '@/components/organisms/ChatKit/SchemaRenderer'
import { useCustomComponents } from '@/components/organisms/CustomNodes'

function MyApp() {
  const { registry, loading, error, reload } = useCustomComponents({
    apiEndpoint: '/api/custom-nodes',
    autoLoad: true,
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <SchemaRenderer
      registry={registry}
      nodes={[
        { type: 'cdn_counter', props: { initial: 10 } },
        { type: 'cdn_user_card', props: { user: {...} } }
      ]}
    />
  )
}
```

### 2. Sử dụng Provider Context

```tsx
import { CustomNodeProvider, useCustomNodeContext } from '@/components/organisms/CustomNodes'

function App() {
  return (
    <CustomNodeProvider apiEndpoint="/api/custom-nodes">
      <MyComponent />
    </CustomNodeProvider>
  )
}

function MyComponent() {
  const { registry, loading } = useCustomNodeContext()

  if (loading) return <div>Loading...</div>

  return <SchemaRenderer registry={registry} nodes={[...]} />
}
```

### 3. Local Registry (Development)

```tsx
import { CdnCounter, CdnUserCard } from '@/components/organisms/CustomNodes'

<SchemaRenderer
  registry={{
    my_counter: CdnCounter,
    my_card: CdnUserCard,
  }}
  nodes={[
    { type: 'my_counter', props: { initial: 5 } }
  ]}
/>
```

## Backend API Contract

### GET /api/custom-nodes

Response:

```json
{
  "components": [
    {
      "id": "uuid-1",
      "type": "my_component",
      "name": "My Component",
      "description": "Description",
      "cdn": {
        "url": "https://cdn.example.com/components/my-component.js",
        "version": "1.0.0",
        "checksum": "sha256:..."
      },
      "props_schema": {
        "title": { "type": "string", "required": true }
      },
      "thumbnail": "https://...",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

## Development với Mock API

```tsx
import { setupMockAPI } from '@/components/organisms/CustomNodes'

// Setup mock API để intercept requests
useEffect(() => {
  const restoreMockAPI = setupMockAPI()

  return () => restoreMockAPI()
}, [])

// Bây giờ mọi request đến /api/custom-nodes sẽ được mock
```

## Tạo Custom Component mới

### 1. Tạo component

```tsx
// MyComponent.tsx
import type { SchemaComponentProps } from '@/components/organisms/ChatKit/types'

export const MyComponent: React.FC<SchemaComponentProps> = ({
  node,
  onAction,
  conversationId,
  path,
}) => {
  const { title, value } = (node.props ?? {}) as Record<string, any>

  const handleClick = () => {
    if (conversationId && onAction) {
      onAction({
        type: 'my_component.click',
        conversationId,
        payload: { value, path }
      })
    }
  }

  return (
    <div className="p-4 border rounded">
      <h3>{title}</h3>
      <p>{value}</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  )
}
```

### 2. Build và upload lên CDN

```bash
# Build component thành ESM module
npm run build:component

# Upload to S3/CDN
aws s3 cp dist/my-component.js s3://my-cdn/components/
```

### 3. Register trong Backend

```sql
INSERT INTO custom_components (type, name, cdn_url, version)
VALUES ('my_component', 'My Component', 'https://cdn.example.com/components/my-component.js', '1.0.0');
```

### 4. Sử dụng trong SchemaRenderer

```tsx
// Component sẽ được tự động load từ CDN
<SchemaRenderer
  nodes={[
    { type: 'my_component', props: { title: 'Hello', value: 123 } }
  ]}
/>
```

## API Reference

### useCustomComponents

```tsx
const {
  registry,          // ComponentRegistry
  loading,           // boolean
  error,             // Error | null
  stats,             // CacheStats
  reload,            // () => Promise<void>
  reloadComponent,   // (type: string) => Promise<void>
  clearCache,        // () => void
} = useCustomComponents({
  apiEndpoint,       // Default: '/api/custom-nodes'
  autoLoad,          // Default: true
  onError,           // (error: Error) => void
  onLoadingChange,   // (loading: boolean) => void
})
```

### CustomNodeProvider

```tsx
<CustomNodeProvider
  apiEndpoint="/api/custom-nodes"
  autoLoad={true}
  loadingFallback={<div>Loading...</div>}
  errorFallback={<div>Error</div>}
  onError={(error) => console.error(error)}
>
  {children}
</CustomNodeProvider>
```

### CDNComponentLoader

```tsx
import { cdnComponentLoader } from '@/components/organisms/CustomNodes'

// Load từ API
const registry = await cdnComponentLoader.loadRegistryFromAPI('/api/custom-nodes')

// Load từ definitions
const registry = await cdnComponentLoader.loadRegistry([
  { type: 'counter', url: 'https://cdn.example.com/counter.js', version: '1.0.0' }
])

// Reload component
await cdnComponentLoader.reloadComponent('counter')

// Clear cache
cdnComponentLoader.clearCache()

// Get stats
const stats = cdnComponentLoader.getStats()
// { cached: 5, loading: 0, failed: 1 }
```

## Production Deployment

### 1. Backend Setup

```typescript
// Backend API endpoint
app.get('/api/custom-nodes', async (req, res) => {
  const components = await db.customComponent.findMany({
    where: { is_published: true }
  })

  res.json({
    components: components.map(c => ({
      id: c.id,
      type: c.type,
      name: c.name,
      cdn: {
        url: c.cdn_url,
        version: c.version,
        checksum: c.checksum
      }
    }))
  })
})
```

### 2. CDN Setup

- Upload component files đến S3/CloudFront
- Enable CORS
- Set cache headers

### 3. Build Configuration

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    lib: {
      entry: './src/components/MyComponent.tsx',
      name: 'MyComponent',
      fileName: 'my-component',
      formats: ['es']
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
})
```

## Demo

Xem các story trong `CustomNodes.stories.tsx`:

1. **WithHook**: Load components với useCustomComponents hook
2. **WithProvider**: Sử dụng CustomNodeProvider context
3. **LocalRegistry**: Mock local registry
4. **ErrorHandling**: Demo error handling

## License

MIT
