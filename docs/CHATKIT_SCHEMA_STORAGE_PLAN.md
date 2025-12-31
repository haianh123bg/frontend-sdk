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
    "registryHints": ["sdk", "extended"],
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
  registry={mergeComponentRegistry(defaultComponentRegistry, sdkComponentRegistry, extendedComponentRegistry)}
  conversationId={conversationId}
  onAction={emitAction}
/>
```

### 8.2 Lazy-load registry presets (tăng hiệu năng)

Cơ chế khuyến nghị:
- Backend set `ui.meta.registryHints` (vd `["sdk", "extended"]`).
- Frontend dùng hints để `import()` preset registry.

Pseudo-code:

```ts
async function loadRegistries(hints: string[]) {
  const regs = []
  if (hints.includes('sdk')) regs.push((await import('@/.../ChatKit/registries')).sdkComponentRegistry)
  if (hints.includes('extended')) regs.push((await import('@/.../ChatKit/registries')).extendedComponentRegistry)
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

## 13) Triển khai backend lưu UISchemaDocument vào DB (chi tiết)

Mục tiêu của phần này là mô tả đủ chi tiết để đội backend có thể implement nhanh trong NestJS.

### 13.1 Kiến trúc lưu trữ: snapshot + latest pointer

Khuyến nghị lưu theo mô hình:

- **`ui_schema_snapshots`**: append-only (audit/replay)
- **`ui_schema_latest`**: pointer tới snapshot mới nhất (để `GET latest` nhanh)

Tại sao cần `latest`:

- Tránh query sort/limit trên bảng snapshot khi traffic lớn
- Cho phép index tối ưu theo `conversation_id`

### 13.2 Postgres DDL (tham chiếu)

```sql
-- conversations: tuỳ hệ thống, có thể đã tồn tại
create table if not exists conversations (
  id text primary key,
  user_id text not null,
  status text not null default 'IDLE',
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ui_schema_snapshots: lưu nguyên UISchemaDocument
create table if not exists ui_schema_snapshots (
  id text primary key,
  conversation_id text not null references conversations(id) on delete cascade,
  schema_version int not null,
  schema jsonb not null,
  schema_hash text not null,
  created_at timestamptz not null default now(),
  created_by text not null default 'system',
  trace_id text null
);

create index if not exists idx_ui_schema_snapshots_conversation_created_at
  on ui_schema_snapshots (conversation_id, created_at desc);

create index if not exists idx_ui_schema_snapshots_hash
  on ui_schema_snapshots (schema_hash);

-- latest pointer
create table if not exists ui_schema_latest (
  conversation_id text primary key references conversations(id) on delete cascade,
  snapshot_id text not null references ui_schema_snapshots(id) on delete restrict,
  updated_at timestamptz not null default now()
);
```

Ghi chú:

- `id` nên là **ULID** (để sort theo thời gian, log-friendly).
- `schema_hash` dùng để dedupe và kiểm soát “schema spam”.

### 13.3 Quy ước hash/dedupe

Khuyến nghị:

- Trước khi hash, backend **normalize JSON** (ví dụ stringify ổn định theo key order) để tránh hash khác nhau do thứ tự key.
- Hash bằng `sha256`.
- Nếu snapshot mới có `schema_hash` trùng snapshot latest hiện tại -> có thể **skip insert** (tuỳ policy).

### 13.4 Flow persist khi trả `ChatResponse.ui`

Pseudo-flow:

1. Backend tạo `UISchemaDocument` (hoặc nhận từ orchestrator/AI).
2. Validate schema + whitelist.
3. Persist snapshot:
   - insert `ui_schema_snapshots`
   - upsert `ui_schema_latest`
4. Trả `ChatResponse` chứa `ui` (Mode A) hoặc trả `ui.meta.schemaId` (Mode B).

### 13.5 Flow resume UI

Endpoint khuyến nghị:

- `GET /conversations/:id/ui`

Logic:

- AuthZ: user phải có quyền đọc conversation.
- Lấy `snapshot_id` từ `ui_schema_latest`.
- Trả `schema` từ `ui_schema_snapshots`.

### 13.6 Flow audit/replay

- `GET /conversations/:id/ui/snapshots?limit=50&before=...`

Trả danh sách snapshot (id + created_at + created_by + trace_id + schema_hash) và tuỳ nhu cầu có thể trả kèm `schema`.

### 13.7 Validation & security (bắt buộc)

Backend cần validate trước khi lưu và trước khi trả về frontend:

- **Validate shape**:
  - `type` là string non-empty
  - `props` là object hoặc undefined
  - `children` là array hoặc undefined
- **Whitelist component types** theo app/tenant:
  - Ví dụ `['card','row','col','text','button','input','select','file_uploader', ...]`
- **Action whitelist**:
  - Nếu node có `props.action.type` thì phải nằm trong whitelist/permission của conversation
- **Payload sanitization**:
  - Không cho schema nhúng function
  - Không cho schema nhúng object nhạy cảm (vd `File`)

### 13.8 Blueprint NestJS (module/service/controller)

Gợi ý cấu trúc:

```text
backend/
  src/
    ui-schema/
      ui-schema.module.ts
      ui-schema.controller.ts
      ui-schema.service.ts
      ui-schema.validator.ts
      ui-schema.repository.ts
```

Các hàm service tối thiểu:

- `persistSnapshot(conversationId, schemaDoc, meta)` -> snapshotId
- `getLatest(conversationId)` -> `UISchemaDocument | null`
- `listSnapshots(conversationId, limit, before?)` -> list

### 13.9 Gợi ý response format cho API `GET /conversations/:id/ui`

```json
{
  "conversationId": "conv_123",
  "snapshotId": "ui_01H...",
  "schema": { "version": 1, "nodes": [], "meta": {} }
}
```

## 14) Lưu ý đặc biệt: các component có dữ liệu không-JSON (FileUploader/AvatarUpload)

- Không lưu `File` vào schema.
- Khi user chọn file ở frontend, node sẽ emit action chứa **file metadata**.
- Backend nên triển khai flow upload riêng (presigned URL / multipart) và chỉ lưu **URL + metadata** vào state/schema.

## 15) Checklist triển khai (backend) - bản mở rộng

- [ ] DDL + migration cho `ui_schema_snapshots`, `ui_schema_latest`.
- [ ] Service persist snapshot (transaction + upsert latest).
- [ ] Hash/dedupe policy.
- [ ] Validator: shape + whitelist type + whitelist action.
- [ ] API `GET /conversations/:id/ui`.
- [ ] API `GET /conversations/:id/ui/snapshots`.
- [ ] Observability: trace_id, metrics (snapshot size, snapshot rate).

