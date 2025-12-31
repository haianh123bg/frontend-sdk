# AG-UI (Agent User Interaction Protocol) — Links & Architecture Notes

## 1) Link tài liệu (docs.ag-ui.com)

### 1.1. Tổng quan / kiến trúc
- **Introduction (Overview)**: https://docs.ag-ui.com/introduction
- **Core architecture**: https://docs.ag-ui.com/concepts/architecture
- **Events (concepts)**: https://docs.ag-ui.com/concepts/events
- **Agents (concepts)**: https://docs.ag-ui.com/concepts/agents
- **Messages (concepts)**: https://docs.ag-ui.com/concepts/messages
- **State Management (concepts)**: https://docs.ag-ui.com/concepts/state
- **Serialization (concepts)**: https://docs.ag-ui.com/concepts/serialization
- **Tools (concepts)**: https://docs.ag-ui.com/concepts/tools
- **Middleware (concepts)**: https://docs.ag-ui.com/concepts/middleware

### 1.2. AG-UI và hệ sinh thái protocol
- **MCP, A2A, and AG-UI**: https://docs.ag-ui.com/agentic-protocols
- **Generative UI Specs (A2UI / MCP-UI / Open-JSON-UI)**: https://docs.ag-ui.com/concepts/generative-ui-specs
- **Integrations**: https://docs.ag-ui.com/integrations

### 1.3. SDK TypeScript
- **@ag-ui/core overview**: https://docs.ag-ui.com/sdk/js/core/overview
- **@ag-ui/core types**: https://docs.ag-ui.com/sdk/js/core/types
- **@ag-ui/core events**: https://docs.ag-ui.com/sdk/js/core/events
- **@ag-ui/client overview**: https://docs.ag-ui.com/sdk/js/client/overview
- **AbstractAgent**: https://docs.ag-ui.com/sdk/js/client/abstract-agent
- **HttpAgent**: https://docs.ag-ui.com/sdk/js/client/http-agent

### 1.4. Quickstart / Tutorials
- **Quickstart: Build clients**: https://docs.ag-ui.com/quickstart/clients
- **Quickstart: Server**: https://docs.ag-ui.com/quickstart/server
- **Quickstart: Middleware (bridge protocols)**: https://docs.ag-ui.com/quickstart/middleware
- **Tutorial: Debugging**: https://docs.ag-ui.com/tutorials/debugging

### 1.5. Draft proposals (đề xuất mở rộng)
- **Drafts overview**: https://docs.ag-ui.com/drafts/overview
- **Reasoning**: https://docs.ag-ui.com/drafts/reasoning
- **Multi-modal Messages**: https://docs.ag-ui.com/drafts/multimodal-messages
- **Interrupt-Aware Run Lifecycle**: https://docs.ag-ui.com/drafts/interrupts
- **Meta Events**: https://docs.ag-ui.com/drafts/meta-events
- **Generative User Interfaces (draft)**: https://docs.ag-ui.com/drafts/generative-ui

## 2) Ghi chú kiến trúc AG-UI (tóm tắt có hệ thống)

### 2.1. Bản chất của AG-UI
- **Event-based protocol**: AG-UI chuẩn hoá giao tiếp giữa frontend và agent backend bằng một **stream các event** (thay vì request/response truyền thống).
- **Transport-agnostic**: không ép transport; có thể dùng **SSE / WebSocket / webhook / HTTP streaming**.

### 2.2. Các thành phần trong kiến trúc
Theo “Core architecture”, hệ thống thường có:
- **Application (Frontend)**: chat UI hoặc app có agent.
- **AG-UI Client**: client generic để kết nối agent (ví dụ `HttpAgent`).
- **Agents (Backend)**: xử lý input và phát event stream.
- **Secure Proxy** (optional): lớp proxy/backend service để thêm auth, audit, routing, tool execution, v.v.

### 2.3. Event model: các nhóm event chính
Trong `@ag-ui/core`, có `EventType` bao phủ:
- **Lifecycle**: `RUN_STARTED`, `RUN_FINISHED`, `RUN_ERROR`, `STEP_STARTED`, `STEP_FINISHED`.
- **Text message stream**: `TEXT_MESSAGE_START`, `TEXT_MESSAGE_CONTENT`, `TEXT_MESSAGE_END` (và dạng *chunk* tuỳ SDK).
- **Tool call stream**: `TOOL_CALL_START`, `TOOL_CALL_ARGS`, `TOOL_CALL_END`, `TOOL_CALL_RESULT`.
- **State management**: `STATE_SNAPSHOT`, `STATE_DELTA` (RFC 6902 JSON Patch), `MESSAGES_SNAPSHOT`.
- **Activity stream**: `ACTIVITY_SNAPSHOT`, `ACTIVITY_DELTA` (cũng theo JSON Patch) để render các “in-progress activities” (plan/steps/searching...).
- **Special**: `RAW`, `CUSTOM` để mở rộng.

### 2.4. 3 pattern luồng event (rất quan trọng)
Theo docs “Events”:
- **Start → Content → End**: dùng cho streaming text/tool args.
  - Ví dụ text: `TEXT_MESSAGE_START` → nhiều `TEXT_MESSAGE_CONTENT(delta)` → `TEXT_MESSAGE_END`.
  - Ví dụ tool: `TOOL_CALL_START` → nhiều `TOOL_CALL_ARGS(delta)` → `TOOL_CALL_END`.
- **Snapshot → Delta**: dùng cho sync state.
  - `STATE_SNAPSHOT(snapshot)` thiết lập baseline.
  - `STATE_DELTA(delta[])` là JSON Patch để update incrementally.
- **Lifecycle**: theo dõi run/step bắt đầu-kết thúc-lỗi.

### 2.5. Messages model (vendor-neutral)
- Message cơ bản có `id`, `role`, `content`.
- Role chuẩn: `developer | system | assistant | user | tool | activity`.
- Có khái niệm **MessagesSnapshot** để đồng bộ lại toàn bộ history khi init/reconnect.
- Tool call có thể gắn trong assistant message (tuỳ mapping), và tool result là `ToolMessage` với `toolCallId`.

### 2.6. State management (shared state)
- AG-UI nhấn mạnh “shared state”:
  - persist qua các lượt tương tác,
  - agent và frontend đều quan sát/điều chỉnh,
  - update real-time qua event stream.
- Delta sử dụng **JSON Patch (RFC 6902)**. Frontend thường apply patch bằng lib kiểu `fast-json-patch`.

### 2.7. Tools & Human-in-the-loop
- Tool được định nghĩa bởi frontend (hoặc app) và pass vào `runAgent({ tools: [...] })`.
- Tool schema dùng JSON Schema.
- Lifecycle tool call:
  - `TOOL_CALL_START(toolCallId, toolCallName, parentMessageId?)`
  - `TOOL_CALL_ARGS(delta)` stream JSON args
  - `TOOL_CALL_END`
  - Tool result thường là message role `tool` chứa `toolCallId`.
- Đây là chỗ “human approval / confirm / form” thường được cắm vào.

### 2.8. Run input (RunAgentInput) và định danh
- `RunAgentInput` (JS core types) có các trường quan trọng:
  - `threadId`, `runId`, `parentRunId?`
  - `state`, `messages`, `tools`, `context`, `forwardedProps`
- `parentRunId` dùng cho **branching/time travel**.

### 2.9. Serialization & Compaction (điểm rất mạnh)
- AG-UI đề xuất lưu **append-only event log**.
- Có helper concept `compactEvents(events)` để:
  - gộp các chuỗi `TEXT_MESSAGE_*` thành snapshot,
  - gộp state deltas thành `STATE_SNAPSHOT` cuối,
  - chuẩn hoá run input (bỏ messages đã tồn tại trong history).
- Mục tiêu: **restore** sau reload/reconnect + **giảm dung lượng** + **audit**.

### 2.10. Drafts đáng chú ý
- **Interrupt-Aware Run Lifecycle**:
  - `RUN_FINISHED` có thể kết thúc với `outcome: "interrupt"` và `interrupt.payload` (UI forms/proposals/diffs...).
  - `RunAgentInput.resume` cho phép resume với `interruptId` + payload.
- **Meta Events**:
  - side-band annotation xuất hiện ở bất kỳ đâu trong stream (feedback/tags/external annotations).
- **Multi-modal messages**:
  - input content có thể là `text` hoặc `binary` (mimeType/url/data/filename).
- **Reasoning**:
  - đề xuất event riêng cho reasoning để UI hiển thị có kiểm soát (privacy/security).

## 3) Gợi ý liên hệ nhanh với ChatKit trong repo này (tóm tắt)
- ChatKit hiện tại đã có “transport + runtime + streaming events” nhưng event types đang đơn giản hơn (typing, message.delta/final, ui.patch).
- Nếu muốn tiến tới kiểu AG-UI:
  - chuẩn hoá event stream theo `Start/Content/End` và `Snapshot/Delta`.
  - cân nhắc thêm `STATE_SNAPSHOT/STATE_DELTA` và `ACTIVITY_SNAPSHOT/ACTIVITY_DELTA` để render tiến trình/plan/search.
  - cân nhắc lớp “serialization/compaction” để persist history + resume.
