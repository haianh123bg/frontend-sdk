# Build Custom Components cho CDN

Hướng dẫn build và upload custom components lên CDN.

## Cấu trúc file sau khi build

```
dist/
├── cdn-counter.mjs              # Main component file (ES Module)
├── cdn-counter.mjs.map          # Source map
├── cdn-user-card.mjs
├── cdn-user-card.mjs.map
├── cdn-stat-card.mjs
├── cdn-stat-card.mjs.map
├── cdn-badge.mjs
├── cdn-badge.mjs.map
├── cdn-rating.mjs
├── cdn-rating.mjs.map
├── cdn-chip.mjs
├── cdn-chip.mjs.map
├── cdn-progress.mjs
└── cdn-progress.mjs.map
```

## Build Commands

```bash
# Build tất cả components
npm run build:cdn

# Build với watch mode (development)
npm run build:cdn:watch
```

## Upload lên CDN

### 1. AWS S3 + CloudFront

```bash
# Upload to S3
aws s3 sync dist/ s3://your-cdn-bucket/custom-components/ \
  --cache-control "public, max-age=31536000, immutable" \
  --acl public-read

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/custom-components/*"
```

### 2. Vercel

```bash
# Upload to Vercel
vercel --prod dist/
```

### 3. GitHub Pages / CDN

```bash
# Push to gh-pages branch
git subtree push --prefix dist origin gh-pages
```

## File URL Convention

Sau khi upload, URL sẽ có format:

```
https://cdn.yourdomain.com/custom-components/cdn-counter.mjs?v=1.0.0
```

## Versioning

Để version vào URL:

```typescript
// Backend API response
{
  "type": "cdn_counter",
  "cdn": {
    "url": "https://cdn.yourdomain.com/custom-components/cdn-counter.mjs?v=1.0.0",
    "version": "1.0.0"
  }
}
```

## CDN Component Format

Mỗi component file phải export default:

```typescript
// cdn-counter.mjs
import React from 'react'

export const CdnCounter = ({ node, onAction, conversationId, path }) => {
  // Implementation
}

export default CdnCounter
```

## Runtime Import

Frontend sẽ import như sau:

```typescript
// Dynamic import từ CDN
const module = await import('https://cdn.yourdomain.com/cdn-counter.mjs?v=1.0.0')
const Component = module.default
```

## Lưu ý quan trọng

1. **External Dependencies**: React, ReactDOM KHÔNG được bundle vào file
2. **Peer Dependencies**: Consumer phải có react/react-dom installed
3. **Cache Strategy**: Sử dụng content hash để cache browser
4. **Version URLs**: Thêm query param `?v=1.0.0` để invalidate cache
5. **Source Maps**: Upload cả .map files để debug production errors

## Debug Production

```typescript
// Enable source maps in browser
// https://cdn.yourdomain.com/cdn-counter.mjs?v=1.0.0
// Download cdn-counter.mjs.map cùng lúc
```
