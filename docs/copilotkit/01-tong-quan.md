# 01 - Tổng quan CopilotKit

## CopilotKit là gì?

CopilotKit là nền tảng giúp bạn **nhúng trải nghiệm AI “agentic” vào ứng dụng người dùng** (đặc biệt mạnh ở frontend React). Điểm khác biệt cốt lõi so với “chatbot trả lời text” là:

- AI có thể **thực thi hành động** (tools/actions) thay vì chỉ trả lời.
- UI có thể **hiển thị tiến trình / trạng thái / kết quả** theo thời gian thực.
- Có thể tạo trải nghiệm **cộng tác người dùng ↔ agent** (Shared State, Human-in-the-Loop).

Nguồn tham chiếu:
- Docs: https://docs.copilotkit.ai/
- Bản tổng hợp docs: https://docs.copilotkit.ai/llms-full.txt
- Nguồn MDX docs: https://github.com/CopilotKit/CopilotKit/tree/main/docs/content/docs

## 2 “mode” chính

### 1) Standard (Direct-to-LLM)
Phù hợp khi bạn muốn đi nhanh:

- Dùng CopilotKit theo kiểu “LLM + runtime + tools”, không cần framework agent phức tạp.
- Tập trung vào tool calling + UI hiển thị.

### 2) CoAgents (Agent Framework)
Phù hợp khi cần kiểm soát agent/runloop và workflow:

- Kết nối CopilotKit với backend agent frameworks (LangGraph, CrewAI, Mastra, PydanticAI, …)
- Dùng chuẩn giao tiếp để UI/agent “nói chuyện” ổn định, streaming, trạng thái…

## Các khối tính năng cốt lõi nên nắm

- **Agentic Chat UI**: chat có thể chạy tools, hiển thị rich content.
- **Frontend Tools/Actions**: agent gọi tool chạy ở frontend.
- **Backend Actions / Tools**: agent gọi tool ở backend/runtime.
- **Shared State**: trạng thái đồng bộ 2 chiều UI ↔ agent.
- **Generative UI**: agent dẫn dắt UI hiển thị dynamic theo ngữ cảnh.
- **Human-in-the-Loop**: agent “dừng lại” xin xác nhận/thu thập input từ user.
- **Agentic Protocols**: AG-UI, MCP, A2A và các chuẩn Generative UI.

## Mục tiêu khi áp dụng vào sản phẩm

- Tạo các “điểm chạm” AI hữu ích trong workflow, không biến app thành 1 chat app.
- Đảm bảo:
  - Có quyền kiểm soát/giải thích tool calls.
  - Có luồng phê duyệt (HITL) cho thao tác rủi ro.
  - Có quan sát/trace được lỗi & hành vi.

## Từ khóa quan trọng

- **CopilotKit Provider (`<CopilotKit>`):** ngữ cảnh runtime, agent, thread.
- **Agent:** thực thể chạy reasoning + tool calls.
- **Tool:** hàm có schema params + handler/render.
- **Runtime:** lớp backend điều phối LLM, tool calls, thread/state.
- **Protocol:** chuẩn sự kiện/handshake để kết nối agent ↔ UI ↔ tools.
