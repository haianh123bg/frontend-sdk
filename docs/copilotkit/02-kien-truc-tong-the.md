# 02 - Kiến trúc tổng thể

## Bức tranh lớn

CopilotKit có thể hiểu như “lớp cuối (last-mile)” để đưa agent/LLM vào **UI sản phẩm** một cách có cấu trúc:

- **Frontend (React App)**: hiển thị chat/UI, khai báo tool frontend, render tool calls, quản lý thread.
- **Copilot Runtime (Backend)**: trung gian giữa UI và LLM/Agent backend; điều phối gọi tool backend, streaming, lưu lịch sử/thread/state (tùy cấu hình).
- **Agentic Backend**: có thể là LLM trực tiếp (Standard) hoặc agent framework (CoAgents) qua protocol.

Nguồn tham chiếu:
- Tổng quan docs: https://docs.copilotkit.ai/
- Agentic Protocols: https://docs.copilotkit.ai/agentic-protocols
- AG-UI: https://docs.copilotkit.ai/ag-ui-protocol
- MDX kiến trúc: https://github.com/CopilotKit/CopilotKit/blob/main/docs/content/docs/(root)/architecture.mdx

## Các lớp trong hệ thống

### 1) React Provider (`<CopilotKit>`)
`<CopilotKit>` là “cửa vào” ở phía frontend, cung cấp context cho:

- UI component (CopilotChat / Sidebar / Popup / Headless)
- Hooks (tool/hitl/state…)
- Kết nối runtime (qua `runtimeUrl` hoặc Copilot Cloud `publicApiKey`)

Một số props đáng chú ý:

- `runtimeUrl`: endpoint runtime tự host.
- `publicApiKey`: dùng Copilot Cloud.
- `headers`: thêm header auth/trace.
- `threadId`: điều khiển thread.
- `properties`: đính kèm metadata (vd `authorization`, `threadMetadata`).

### 2) UI Layer
Có 2 hướng:

- **Prebuilt UI**: chat components (nhanh).
- **Headless UI**: tự render toàn bộ, chỉ dùng hooks/state.

### 3) Tooling Layer
CopilotKit phân biệt:

- **Frontend tools/actions**: chạy ở browser (tác động UI/state).
- **Backend tools/actions**: chạy ở runtime/backend (tác động DB/API/compute).

### 4) Runtime (`CopilotRuntime`)
Là thành phần backend:

- Gọi LLM (qua adapter) hoặc kết nối agent.
- Nhận request từ frontend (chat, tool calls, thread).
- Có thể tích hợp MCP, kiểm soát streaming, v.v.

### 5) Agentic Protocol Layer
CopilotKit có thể kết nối agent qua các protocol:

- **AG-UI**: Agent ↔ User/UI
- **MCP**: Agent ↔ Tools/Data
- **A2A**: Agent ↔ Agent

## Dataflow điển hình

### Luồng chat/tool cơ bản
1. User nhập message trên UI.
2. Frontend gửi message + context (state/readables/thread) tới runtime.
3. Runtime gọi LLM/agent.
4. Agent quyết định gọi tool:
   - Tool frontend: runtime/agent phát event/toolcall → frontend execute `handler`.
   - Tool backend: runtime execute tool → trả kết quả.
5. Kết quả/streaming được đẩy lại UI.

### Luồng Shared State
- Agent phát state updates → UI render (progress, intermediate results).
- UI cập nhật inputs/state → agent nhận và tiếp tục chạy.

### Luồng HITL
- Agent “dừng” ở checkpoint → UI render yêu cầu xác nhận/thu input.
- User phản hồi → agent tiếp tục.

## Điểm nhấn kiến trúc

- **Decouple UI khỏi agent framework** bằng protocol (đặc biệt AG-UI).
- **Quan sát được (observability)**: tool calls, errors, thread.
- **Khả năng mở rộng**: thay backend agent/LLM không phá UX.
