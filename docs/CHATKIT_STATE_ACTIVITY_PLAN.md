# Kế hoạch (Clean + Agentic): ChatKit State/Activity/Bindings theo mô hình Snapshot/Delta

## 1) Mục tiêu

- Giảm việc backend phải **resend toàn bộ** `ui.nodes` khi chỉ có **dữ liệu thay đổi** (progress, form value, steps, search status…).
- Tách bạch rõ:
  - **UI structure**: `UISchemaDocument.nodes` (ít thay đổi)
  - **UI data**: `state` (shared state) + `activities` (in-progress objects) thay đổi liên tục
- Hỗ trợ **realtime streaming** theo mô hình **Snapshot/Delta** (JSON Patch RFC 6902) tương tự AG-UI.
- Giữ nguyên nguyên tắc:
  - **Schema-first**, **backend orchestrated**, **AI-safe** (frontend chỉ render + emit action)
  - Backend chịu trách nhiệm validate/whitelist schema và action.
- Hướng tới **agentic**: runtime có thể quan sát/điều khiển một “agent run” bằng state/activity + tool events + interrupt/resume.
- Tương thích ngược: hệ thống hiện tại vẫn hoạt động nếu backend chưa gửi `state/activity`.

## 2) Non-goals

- Không biến ChatKit thành “AG-UI client” đầy đủ.
- Không implement “full generative UI spec” (A2UI/MCP-UI/Open-JSON-UI).
- Không bắt buộc implement patch thực sự cho `ui.nodes` ngay (có thể làm sau).

## 3) Kiến trúc mục tiêu (mental model)

ChatKit sẽ có 3 “kênh đồng bộ” độc lập:

- **UI schema channel**: cập nhật hiếm (snapshot/replace) -> `ui.nodes`.
- **State channel**: cập nhật thường xuyên (snapshot/delta) -> `state`.
- **Activity channel**: các tiến trình/plan/search/upload... (snapshot/delta) -> `activities`.

Mục tiêu là: UI schema ổn định, dữ liệu thay đổi đi qua state/activity với payload nhỏ.

## 4) Contracts/Protocol (frontend SDK)

### 4.1 Types mới

#### 4.1.1 Shared State

```ts
export type ChatKitState = Record<string, any>

export type JsonPatchOperation = {
  op: 'add' | 'remove' | 'replace' | 'move' | 'copy' | 'test'
  path: string
  value?: any
  from?: string
}
```

#### 4.1.2 Activity

```ts
export type ChatKitActivity = {
  id: string
  activityType: string
  content: Record<string, any>
  createdAt?: string | number
  updatedAt?: string | number
}
```

#### 4.1.3 Agentic Run (đề xuất mở rộng – phase sau)

Mục tiêu: backend điều khiển lifecycle “agent run”, frontend hiển thị/interrupt/resume.

```ts
export type ChatKitRun = {
  id: string
  status: 'idle' | 'running' | 'paused' | 'completed' | 'failed'
  startedAt?: string | number
  updatedAt?: string | number
  meta?: Record<string, any>
}
```

### 4.2 Mở rộng `ChatResponse`

```ts
export type ChatResponse = {
  conversationId: string
  messages: ChatMessage[]
  ui?: UISchemaDocument
  state?: ChatKitState
  activities?: ChatKitActivity[]
  meta?: {
    traceId?: string
  }
}
```

Quy ước:

- `state`/`activities` optional để tương thích ngược.
- Nếu backend trả `state` thì coi đó là snapshot latest.

### 4.3 Streaming Events (protocol tối thiểu)

```ts
export type StreamingEvent =
  | { type: 'typing'; conversationId: string; isTyping: boolean; text?: string }
  | { type: 'message.delta'; conversationId: string; messageId?: string; text: string }
  | { type: 'message.final'; conversationId: string; message: ChatMessage }
  | { type: 'ui.patch'; conversationId: string; ui: UISchemaDocument | null }
  | { type: 'state.snapshot'; conversationId: string; snapshot: ChatKitState }
  | { type: 'state.delta'; conversationId: string; delta: JsonPatchOperation[] }
  | { type: 'activity.snapshot'; conversationId: string; activity: ChatKitActivity; replace?: boolean }
  | { type: 'activity.delta'; conversationId: string; activityId: string; patch: JsonPatchOperation[] }
```

Ghi chú:

- `activity.snapshot.replace` default là true (thay thế), nếu false thì merge nhẹ.
- `activity.delta` patch áp dụng lên `activity.content`.

### 4.4 Streaming Events (agentic – phase sau)

Đề xuất bổ sung để hỗ trợ agentic workflows (tools, HITL, lifecycle):

```ts
export type StreamingEvent =
  | { type: 'run.snapshot'; conversationId: string; run: ChatKitRun }
  | { type: 'run.delta'; conversationId: string; delta: JsonPatchOperation[] }
  | { type: 'tool.call'; conversationId: string; runId: string; toolCallId: string; tool: string; input: any }
  | { type: 'tool.result'; conversationId: string; runId: string; toolCallId: string; output: any; error?: any }
  | { type: 'interrupt'; conversationId: string; runId: string; reason: string; ui?: UISchemaDocument | null }
```

## 5) Data-binding (UI schema <-> state)

### 5.1 Mục tiêu

- Không eval code.
- Backend/orchestrator author được dễ.
- Widget đọc data từ `state` qua path.

### 5.2 Quy ước binding

Khuyến nghị: `props.bindings`.

```json
{
  "type": "progress",
  "props": {
    "bindings": {
      "value": { "path": "/checkout/progress", "default": 0 },
      "label": { "path": "/checkout/label", "default": "Đang xử lý" }
    }
  }
}
```

### 5.3 Resolve bindings ở đâu (clean nhất)

- Tạo wrapper `BoundSchemaRenderer`.
- `SchemaRenderer` giữ nguyên (tương thích ngược), wrapper chỉ “compile props” từ state.

## 6) Runtime/store (frontend)

### 6.1 API surface đề xuất

- `useChatRuntime()` expose thêm:
  - `state?: ChatKitState`
  - `activities: ChatKitActivity[]`

### 6.2 Patch engine

- Đặt patch engine vào module riêng (vd `jsonPatch.ts`).
- Mục tiêu production:
  - Hoặc dùng thư viện chuẩn RFC 6902.
  - Hoặc define rõ subset được hỗ trợ + backend chỉ gửi subset đó.

### 6.3 Quy ước ordering

- Backend nên gửi snapshot trước delta.
- Nếu stream out-of-order:
  - Quy ước: client có thể apply delta lên `{}` hoặc buffer cho tới khi có snapshot.

## 7) UI render pattern

### 7.1 Widgets

- Render widgets bằng `BoundSchemaRenderer` để tự resolve bindings.
- Registry nên được chọn dựa trên preset/hints.

### 7.2 Activity area

- `ActivityRenderer` render list activity độc lập, registry theo `activityType`.
- Hoặc encode activities thành `ui.nodes` bằng một node riêng (tuỳ product).

## 8) Registry hints + lazy-load (tương thích plan lưu schema)

Backend nên set `ui.meta.registryHints` (vd `['sdk', 'extended']`).

Frontend:

- load preset registry theo hint (lazy import)
- merge vào `defaultComponentRegistry`

## 9) Backend orchestration (agentic-oriented)

### 9.1 Khi nào gửi UI schema?

- Khi cấu trúc UI thay đổi: gửi `ui` đầy đủ.
- Khi chỉ data thay đổi: gửi `state.delta` / `activity.delta`.
- Khi cần HITL: gửi `interrupt` + UI schema yêu cầu user xác nhận.

### 9.2 “AI dựa vào gì để generate đúng?”

- Backend phải cung cấp:
  - Component catalog (registry types + allowed props)
  - Allowlist `action.type`
  - Validation + repair loop

## 10) Persistence / Resume

Lưu theo conversation:

- Latest `UISchemaDocument`.
- Latest `state` snapshot (hoặc snapshot + patch log).
- Latest activities snapshot.

Compaction:

- Nếu lưu patch log: định kỳ compact thành snapshot.

## 11) Phân kỳ triển khai (phased) + acceptance

### Phase 1 — Contracts + Runtime store

- Add types + extend `ChatResponse` / `StreamingEvent`.
- Runtime apply snapshot/delta.

Acceptance:

- Không phá API cũ.
- state/activity cập nhật đúng theo stream.

### Phase 2 — Bindings

- Define `props.bindings` + implement `BoundSchemaRenderer`.

Acceptance:

- state thay đổi => widget update mà không resend `ui.nodes`.

### Phase 3 — Activity system

- `ActivityRenderer` + registry.

Acceptance:

- activity.delta cập nhật liên tục mà không spam messages.

### Phase 4 — Agentic events (runs/tools/HITL)

- Add `run.*`, `tool.*`, `interrupt` events.
- Add “resume action” patterns.

Acceptance:

- UI có thể phản ánh lifecycle và tool calls.
- Có thể pause/confirm/resume.

### Phase 5 — Hardening

- Validation, security hardening.
- Out-of-order strategy.
- Telemetry/debug.

## 12) Checklist triển khai

- [ ] Contracts: `ChatResponse`, `StreamingEvent`.
- [ ] Runtime: store + apply patch.
- [ ] Bindings: `props.bindings` + renderer wrapper.
- [ ] Activities: renderer + registry.
- [ ] Registry hints: lazy-load presets.
- [ ] Storybook: demo state/activity streaming.
- [ ] Agentic: run/tool/interrupt events (phase sau).

