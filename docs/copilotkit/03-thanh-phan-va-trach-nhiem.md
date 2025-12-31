# 03 - Thành phần & Trách nhiệm

## Bảng trách nhiệm (responsibility map)

### Frontend (React)
- **Hiển thị UI**: chat, panel, widget, form.
- **Quản lý tương tác**: gửi message, hiển thị streaming.
- **Khai báo tool frontend**:
  - `useFrontendTool`: định nghĩa tool có `handler` (và `render` nếu muốn UI trong chat).
  - `useHumanInTheLoop`: định nghĩa “điểm phê duyệt/thu input”.
  - `useRenderToolCall`: chỉ render UI cho tool call backend.
- **Quản lý thread/session**:
  - `threadId`, metadata, auth forwarding.

### Runtime (Backend)
- **Orchestrate**: nhận request, gọi LLM/agent, điều phối tool backend.
- **Bảo mật**:
  - giữ secrets (API key), auth server-side.
  - enforce policies (tùy mô hình triển khai).
- **Streaming**:
  - đẩy token/progress/toolcall events về UI.
- **Tích hợp**:
  - adapters cho LLM.
  - MCP client (nếu self-host runtime và muốn chạy MCP).

### Agent / Agent Framework
- **Reasoning & planning**: quyết định tool nào chạy.
- **Workflow**: state machine / multi-step / multi-agent.
- **State emission**: đẩy state/toolcall events theo protocol.

## Các “điểm nối” quan trọng

### 1) Provider (`<CopilotKit>`)
- Nơi config runtime:
  - `runtimeUrl` (self-host) hoặc `publicApiKey` (cloud).
- Nơi gắn header/metadata:
  - `headers`, `properties`, `threadId`, `agent`.

### 2) Tool layer
- **Frontend tool** = hành động có side-effect UI.
- **Backend tool** = hành động cần server resources.
- **Tool rendering**: tách “execute” khỏi “render” (quan trọng để quan sát và UX).

### 3) Shared State
- **useCoAgent** (v1.x): hook tạo trải nghiệm state 2 chiều.
- **useAgent** (v2): trả về `AbstractAgent` và state/messages/run status.

## Gợi ý phân ranh (boundaries) cho sản phẩm

- **Frontend tools**:
  - mở/đóng panel, điều hướng, set filter, update draft…
  - thao tác không cần secret.

- **Backend tools**:
  - CRUD DB, gọi API có key, thao tác file, tính toán nặng.

- **HITL**:
  - thao tác rủi ro (xóa dữ liệu, thanh toán, thay đổi quyền, gửi email hàng loạt).

## Anti-pattern nên tránh

- **Để agent tự ý gọi backend action nguy hiểm** mà không có HITL.
- **Nhồi toàn bộ UX vào chat**: nên giữ chat là trợ lý, còn workflow chính vẫn là UI app.
- **Không có observability**: khó debug toolcall/state.
