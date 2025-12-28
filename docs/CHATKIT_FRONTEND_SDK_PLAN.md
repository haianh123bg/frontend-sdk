# Kế hoạch triển khai Frontend ChatKit SDK

## 0. Bối cảnh

Repo `redai-fe-v2-sdk` là SDK frontend (React + TypeScript + Tailwind) chứa các UI components. Mục tiêu của ChatKit SDK là cung cấp một bộ UI + runtime để:

- Render giao diện chat và widget theo schema (`UIComponent` DSL).
- Thu thập tương tác người dùng và emit `ActionEvent` về backend.
- Hỗ trợ streaming/real-time nhưng không phụ thuộc cứng vào một cơ chế (SSE/WebSocket/Polling).
- Giữ nguyên nguyên tắc: frontend thuần UI + orchestration ở backend (NestJS).

Tài liệu kiến trúc tổng thể: `chat-kit.studio.md`.

## 1. Mục tiêu (Goals)

- Cung cấp bộ component chat sẵn dùng (ChatPanel + primitives) cho các sản phẩm sử dụng SDK.
- Cung cấp engine render widget từ JSON schema, mở rộng được bằng registry.
- Chuẩn hoá contracts và public API để tích hợp với backend (NestJS) dễ dàng.
- Đảm bảo UI an toàn (XSS), dễ theme, dễ test, có Storybook.

## 2. Nguyên tắc thiết kế

- **Schema-first**: UI render theo schema, không hardcode nghiệp vụ.
- **Backend orchestrated**: backend quyết định state/permission/flow và trả `ChatResponse`.
- **Pluggable transport**: hỗ trợ nhiều transport (HTTP/SSE/WS) qua interface.
- **Composable**: tách layer UI (components) và layer runtime (hooks/store).
- **AI-safe**: SDK không execute tool/logic nhạy cảm; chỉ render schema + emit action.

## 3. Phạm vi Frontend SDK (Deliverables)

### 3.1. UI Components (React)

- `ChatPanel` (tổng hợp): header + message list + input.
- `ChatHeader`:
  - Title/agent info, status.
  - Các icon actions (callback props).
- `MessageList`:
  - Virtualized list.
  - Auto-scroll có điều kiện.
  - Load older messages (infinite).
  - Date separators.
- `MessageItem`:
  - Render message theo `ChatMessage` union (text/markdown/image/file/system).
  - Outgoing/incoming styles.
  - Menu thao tác (copy/reply/delete/react...).
- `ChatInput`:
  - Textarea + attachments preview.
  - Send/enter behavior.
- `TypingIndicator` / `ThinkingOrStreamingBubble`:
  - UI trạng thái đang nhập/đang thinking/đang stream.

### 3.2. Widget Engine (Schema Renderer)

- `SchemaRenderer`:
  - Render `UIComponent` tree.
  - Fallback UI khi gặp `type` không hỗ trợ.
- `ComponentRegistry`:
  - Registry mặc định (card/row/col/text/image/button...).
  - API để consumer register thêm widget types.
- Validation nhẹ ở runtime:
  - Detect schema shape sai và render error boundary (không crash toàn app).

### 3.3. Runtime layer (hooks/store)

Mục tiêu của runtime layer là cung cấp khả năng tích hợp “Chat runtime” theo nhiều mức:

- **UI-only mode**: consumer tự quản lý `messages/widgets` và pass vào `ChatPanel`.
- **SDK-managed mode**: SDK cung cấp hook/store để:
  - Gửi message/action.
  - Nhận `ChatResponse` và cập nhật state.
  - Support optimistic messages.
  - Support streaming.

Các deliverables chính:

- `useChatRuntime()` (hook):
  - Quản lý `messages`, `widgets`, `status`.
  - Expose actions: `sendMessage`, `emitAction`, `loadOlder`.
- `ChatRuntimeProvider` (context):
  - Chứa transport + config.
  - Dùng cho nhiều component con.
- `ConversationStore` (internal):
  - Merge message theo `clientId`/`id`.
  - Update status `sending/sent/failed`.

### 3.4. Transport layer (interfaces)

Định nghĩa interface để backend tích hợp linh hoạt.

- `ChatTransport` (interface):
  - `sendAction(event: ActionEvent): Promise<ChatResponse>`
  - `sendMessage(input: SendMessageInput): Promise<ChatResponse>`
  - `subscribe?(conversationId, handlers): Unsubscribe` (tuỳ chọn cho streaming)
- Implement tham chiếu (tuỳ chọn):
  - HTTP-only transport.
  - SSE transport.
  - WebSocket transport.

Lưu ý:

- SDK không hardcode URL/headers/auth.
- SDK nhận `getAuthHeaders`/`fetcher`/`baseUrl` từ consumer.

### 3.5. Types & Contracts (TypeScript)

- `UIComponent`, `ActionEvent`, `ChatResponse` (đồng bộ với `chat-kit.studio.md`).
- `ChatMessage`, `ChatAttachment`, `SendMessageInput`.
- `StreamingEvent` (nếu streaming):
  - `message.delta`, `message.final`, `widget.patch`, `typing`, `presence`...

### 3.6. Security & Safety (frontend)

- Markdown/text render an toàn:
  - Mặc định không render HTML nguy hiểm.
  - Nếu dùng markdown lib, bắt buộc sanitize.
- URL handling an toàn:
  - whitelist protocol.
  - tránh open redirect / javascript:.
- Widget registry:
  - Không cho schema tự ý inject component nguy hiểm.

### 3.7. Theming & UX

- Tailwind-based styling, cho phép override qua `className`/slots.
- A11y:
  - `aria-label` cho buttons.
  - keyboard navigation cơ bản.
- Mobile/desktop responsive.

### 3.8. Storybook & Testing

- Storybook:
  - `ChatPanel` states: empty/loading/with messages/streaming.
  - Widget renderer với nhiều schema samples.
- Unit tests:
  - Schema renderer recursion.
  - Registry behavior.
  - Store merge optimistic.

## 4. Public API đề xuất

### 4.1. UI-only APIs

- `ChatPanel`
- `SchemaRenderer`
- `createComponentRegistry` / `mergeRegistry`
- Types: `ChatMessage`, `ActionEvent`, `UIComponent`...

### 4.2. Runtime APIs (tuỳ chọn nhưng khuyến nghị)

- `ChatRuntimeProvider`
- `useChatRuntime`
- `ChatTransport` interface

## 5. Luồng dữ liệu chuẩn (Frontend SDK)

- User nhập nội dung/nhấn nút.
- UI tạo `SendMessageInput` hoặc `ActionEvent`.
- Runtime gọi `transport.sendMessage/sendAction`.
- Backend (NestJS) trả `ChatResponse`.
- UI render `messages` + `widgets`.

Streaming (nếu bật):

- Runtime subscribe event stream.
- Nhận delta và cập nhật message tạm thời.
- Khi final: commit message chính thức và kết thúc trạng thái streaming.

## 6. Roadmap triển khai (phased)

### Phase 1: UI & schema renderer (MVP)

- `ChatPanel` + `MessageList` + `ChatInput`.
- `SchemaRenderer` + registry cơ bản.
- `ActionEvent` emit (UI-only mode).

### Phase 2: Runtime hook + transport HTTP

- `ChatTransport` interface.
- `useChatRuntime` (send message/action, load older).
- Optimistic message `sending/failed`.

### Phase 3: Streaming/real-time

- SSE/WS transport tham chiếu.
- `StreamingEvent` types.
- Thinking/streaming bubble chuẩn.

### Phase 4: Plugin ecosystem

- Widget/plugin packaging (consumer đăng ký widget set theo domain).
- Telemetry hooks (optional).

## 7. Tiêu chí hoàn thành (Acceptance Criteria)

- Consumer có thể dùng SDK ở 2 chế độ:
  - UI-only (controlled props).
  - SDK-managed (useChatRuntime + transport).
- Render widget schema ổn định, không crash nếu schema lỗi.
- Action/message emit đúng contract.
- Có Storybook demos cho các state quan trọng.
- Không có XSS trong message/markdown.
