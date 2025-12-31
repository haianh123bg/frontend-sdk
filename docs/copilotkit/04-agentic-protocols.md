# 04 - Agentic Protocols (AG-UI, MCP, A2A) & Generative UI Specs

Nguồn tham chiếu:
- Agentic Protocols: https://docs.copilotkit.ai/agentic-protocols
- AG-UI: https://docs.copilotkit.ai/ag-ui-protocol
- MCP: https://docs.copilotkit.ai/connect-mcp-servers

## 1) AG-UI (Agents ↔ Users)

### Ý tưởng
AG-UI là giao thức event-based chuẩn hóa cách agent giao tiếp với ứng dụng UI.

### Vai trò trong CopilotKit
CopilotKit dùng AG-UI để:

- Đồng nhất luồng event giữa agent và frontend.
- Streaming message/tool calls.
- Đồng bộ Shared State.
- Tạo interoperability: thay agent framework mà UI không đổi.

## 2) MCP (Agents ↔ Tools/Data)

### Ý tưởng
MCP chuẩn hóa cách agent kết nối tới “tools” và “data sources” một cách an toàn.

### Trong CopilotKit
Có 2 mô hình phổ biến:

- **Frontend cấu hình MCP servers** (SSE endpoint) và chat có thể sử dụng tools từ MCP.
- **Self-host runtime**: runtime có thể cần `createMCPClient` để tự quản MCP.

## 3) A2A (Agents ↔ Agents)

### Ý tưởng
A2A tập trung vào phối hợp agent ↔ agent (multi-agent orchestration).

### Trong CopilotKit
CopilotKit hỗ trợ kết nối/hiển thị các thuộc tính UI của subagent nếu handshake đi qua AG-UI.

## 4) “Mixing & Matching”

CopilotKit cho phép:

- Kết nối trực tiếp qua AG-UI/MCP/A2A.
- Hoặc đi qua AG-UI để “mang” handshake/metadata của MCP/A2A lên UI.

Điểm quan trọng:

- UI có thể hiển thị tốt hơn (tool call UI, progress UI) trong khi vẫn giữ **security/policy/observability**.

## 5) Generative UI Specs

Ngoài protocol tương tác, còn có các chuẩn “declarative UI output”:

- **A2UI** (Google)
- **MCP-UI**
- **Open-JSON-UI**

CopilotKit tuyên bố hỗ trợ các chuẩn này để agent trả về cấu trúc UI-friendly.

## Khi nào chọn gì?

- **AG-UI**: gần như là “default” nếu bạn có agent backend/framework và muốn UI tương tác ổn định.
- **MCP**: khi muốn agent truy cập tool/data source theo chuẩn MCP.
- **A2A**: khi có kiến trúc multi-agent phân tán.
- **Generative UI specs**: khi bạn muốn agent trả về “UI schema” thay vì text.
