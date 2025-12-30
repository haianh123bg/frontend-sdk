# Kế hoạch: Lưu UISchemaDocument/UIComponent vào Database (Backend Orchestrated)

## 1) Mục tiêu

- Cho phép **backend** tạo/patch UI theo mô hình **schema-first** (`UISchemaDocument`, `UIComponent`).
- Cho phép **lưu trữ** (persist) UI schema để:
  - Audit/debug (replay theo conversation).
  - Resume UI khi reload/trở lại cuộc hội thoại.
  - Tách “payload nặng” (UI schema lớn) khỏi response nếu cần.
- Đảm bảo frontend **chỉ render** schema + emit `ChatKitActionEvent`, không chứa nghiệp vụ.

## 2) Phạm vi

- Backend tham chiếu: NestJS (theo tinh thần `CHATKIT_FRONTEND_SDK_PLAN.md` và `chat-kit.studio.md`).
- Frontend SDK hiện có contract:
  - `UIComponent` (`src/components/organisms/ChatKit/types.ts`)
  - `UISchemaDocument` + `UISchemaVersion` (`src/components/organisms/ChatKit/contracts.ts`)
  - `ChatResponse` trả `ui?: UISchemaDocument`
  - Streaming có `StreamingEvent` với `type: 'ui.patch'` (hiện đang dùng `ui: UISchemaDocument | null`).

## 3) Data contract (chuẩn hiện tại)

### 3.1 `UIComponent`

```ts
export type UIComponent = {
  type: string
  props?: Record<string, any>
  children?: UIComponent[]
  key?: string
  id?: string
}
```

### 3.2 `UISchemaDocument`

```ts
export type UISchemaVersion = 1

export type UISchemaDocument = {
  version: UISchemaVersion
  nodes: UIComponent[]
  meta?: Record<string, any>
}
```

### 3.3 Quy ước nên bổ sung vào `meta`

Để support lazy registry + debug + permission:

```json
{
  "version": 1,
  "nodes": [ ... ],
  "meta": {
    "schemaId": "ui_01H...",
    "registryHints": ["extended", "fintech"],
    "allowedActions": ["chatkit.txn.open", "chatkit.bank.statement"],
    "traceId": "...",
    "updatedAt": "2025-12-31T00:00:00Z"
  }
}
```

Ghi chú:
- `registryHints` là gợi ý cho frontend (hoặc consumer app) biết nên load preset registry nào.
- `allowedActions` giúp backend/consumer dễ whitelist ở frontend (optional).

## 4) Lưu cái gì vào DB?

### 4.1 Không lưu “React component code”

- Không lưu code như `RatingNode` vào DB.
- DB chỉ lưu **JSON schema** + metadata.

### 4.2 Lưu “UI schema snapshot” theo conversation

Tối thiểu nên lưu:
- Latest UI schema theo `conversationId`.
- Lịch sử các phiên bản schema (để audit/replay) là optional nhưng rất hữu ích.

## 5) Thiết kế DB (đề xuất)

### 5.1 Bảng `conversations`

- `id` (PK)
- `user_id`
- `status` (IDLE/WAITING_ACTION/PROCESSING...)
- `created_at`, `updated_at`
- `meta` (jsonb)

### 5.2 Bảng `ui_schema_snapshots`

- `id` (PK, uuid/ulid)
- `conversation_id` (FK)
- `version` (int) — schema version (`UISchemaVersion`)
- `schema` (json/jsonb) — lưu nguyên `UISchemaDocument`
- `hash` (string) — optional dedupe
- `created_at`
- `created_by` (system/ai/user)
- `trace_id` (optional)

### 5.3 Bảng `conversation_state` (optional)

Nếu backend cần store thêm state machine/context riêng:
- `conversation_id`
- `state` (jsonb)
- `updated_at`

## 6) Khi nào persist schema?

### 6.1 Khi backend trả `ChatResponse.ui`

- Nếu `ChatResponse.ui` có mặt: persist thành 1 snapshot.
- Return response theo 1 trong 2 mode:

**Mode A (đơn giản, phù hợp hiện tại):**
- `ChatResponse.ui` chứa đầy đủ schema (frontend render ngay).

**Mode B (tối ưu payload):**
- `ChatResponse.ui` chỉ chứa `{ version, nodes: [], meta: { schemaId } }` hoặc `ui: null`.
- Frontend gọi thêm API `GET /conversations/:id/ui` để fetch schema theo `schemaId`.

Khuyến nghị: bắt đầu với Mode A, sau đó nâng cấp sang Mode B nếu schema lớn.

### 6.2 Khi streaming `ui.patch`

Hiện contract streaming đang là `ui: UISchemaDocument | null`.
- Nếu `ui` là full document => persist snapshot mới.
- Nếu `ui` là null => persist event “clear UI”.

**Gợi ý nâng cấp (Phase sau):**
- Thay `ui.patch` thành patch thực sự (JSON Patch / merge patch) để giảm payload.
- Backend apply patch -> persist snapshot kết quả.

## 7) API backend (tham chiếu)

### 7.1 Các endpoint tương ứng với `httpTransport.ts`

Frontend SDK đang expect:
- `POST {endpoints.sendMessage}`: body `SendMessageRequest` -> response `ChatResponse`
- `POST {endpoints.sendAction}`: body `ChatKitActionEvent` -> response `ChatResponse`
- `POST {endpoints.loadOlder}` (optional)

### 7.2 Endpoint bổ sung để “resume UI” (khuyến nghị)

- `GET /conversations/:id` -> trả metadata + trạng thái.
- `GET /conversations/:id/ui` -> trả latest `UISchemaDocument` (hoặc schema theo `schemaId`).
- `GET /conversations/:id/ui/snapshots?limit=...` -> audit/replay.

## 8) Frontend render từ DB như thế nào?

### 8.1 Flow cơ bản

- App gọi backend lấy `ChatResponse` hoặc fetch UI schema theo conversation.
- App render:

```tsx
<SchemaRenderer
  nodes={ui.nodes}
  registry={mergeComponentRegistry(defaultComponentRegistry, extendedComponentRegistry, fintechComponentRegistry)}
  conversationId={conversationId}
  onAction={emitAction}
/>
```

### 8.2 Lazy-load registry presets (tăng hiệu năng)

Cơ chế khuyến nghị:
- Backend set `ui.meta.registryHints` (vd `["extended", "fintech"]`).
- Frontend dùng hints để `import()` preset registry.

Pseudo-code:

```ts
async function loadRegistries(hints: string[]) {
  const regs = []
  if (hints.includes('extended')) regs.push((await import('@/.../ChatKit/registries')).extendedComponentRegistry)
  if (hints.includes('fintech')) regs.push((await import('@/.../ChatKit/registries')).fintechComponentRegistry)
  return mergeComponentRegistry(defaultComponentRegistry, ...regs)
}
```

Ghi chú:
- Đây là lazy-load “theo preset”, đơn giản và hiệu quả.
- Không cần làm `React.lazy` theo từng node type (phức tạp hơn nhiều).

## 9) Ví dụ lưu schema cho `Rating` vào DB

### 9.1 JSON lưu

```json
{
  "version": 1,
  "nodes": [
    {
      "type": "card",
      "props": { "title": "Đánh giá", "padding": "md" },
      "children": [
        {
          "type": "rating",
          "props": {
            "value": 4.5,
            "max": 5,
            "showValue": true,
            "readOnly": true
          }
        }
      ]
    }
  ],
  "meta": {
    "registryHints": ["extended"],
    "schemaId": "ui_01H..."
  }
}
```

### 9.2 Frontend hiển thị

- Frontend load `extendedComponentRegistry` (vì `rating` thuộc extended).
- `SchemaRenderer` gặp node `{ type: 'rating' }` -> map sang component `RatingNode` (hoặc node wrapper) trong preset.

## 10) Validation, security, governance

### 10.1 Backend validate schema

- Validate shape: `type` là string, `children` là array nếu có.
- Whitelist node `type` theo registry/preset được phép cho tenant/app.
- Validate `action.type` theo whitelist (tránh schema inject action nguy hiểm).

### 10.2 Frontend safety

- Frontend **không** execute code từ schema.
- Props chỉ là data.
- Event đi ra chỉ qua `ChatKitActionEvent`.

## 11) Versioning & migration

- `UISchemaDocument.version` đang là `1`.
- Khi thay đổi contract:
  - Tăng version (2,3...) và backend có chiến lược migrate.
  - Frontend render theo version hoặc backend luôn migrate về latest trước khi trả UI.

## 12) Checklist triển khai (backend)

- [ ] Thêm module `UiSchemaService` (CRUD snapshot).
- [ ] Thêm `UiSchemaValidator` (shape + whitelist).
- [ ] Persist snapshot khi tạo `ChatResponse.ui` hoặc nhận `ui.patch`.
- [ ] API: `GET /conversations/:id/ui`.
- [ ] Chuẩn hoá `meta.registryHints`, `meta.schemaId`.
- [ ] Logging/trace: propagate `traceId` để debug.

