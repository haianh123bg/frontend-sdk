# 06 - Backend Actions

Nguồn tham chiếu:
- Backend Actions: https://docs.copilotkit.ai/backend-actions
- (MDX) https://github.com/CopilotKit/CopilotKit/blob/main/docs/content/docs/(root)/backend-actions.mdx

## Backend Actions là gì?

Backend Actions là các hàm chạy server-side mà agent/LLM có thể gọi để:

- Query DB
- Gọi API có secret
- Xử lý file
- Orchestrate workflow business

Khác với frontend tools, backend actions thường:

- Cần bảo mật (không lộ token)
- Cần tài nguyên server (DB, queue, compute)

## Pattern phổ biến

- **Database Operations**
- **API Integrations**
- **File Operations**
- **Authentication & Authorization**
- **Data Processing**
- **Workflow Orchestration**

## Các loại backend actions

- **Synchronous**: trả ngay.
- **Asynchronous**: chạy lâu, nên có tiến trình.
- **Streaming**: trả dần (phù hợp UI realtime).
- **Batch**: xử lý nhiều phần tử.
- **Transactional**: đảm bảo nhất quán.

## Khi nào dùng Backend Actions?

Khi agent cần:

- Truy cập dữ liệu nhạy cảm
- Tích hợp service yêu cầu auth server-side
- Thực thi business logic đa hệ thống
- Xử lý dữ liệu lớn

## Lưu ý với Agent Framework (CoAgents)

Trong các agent frameworks (LangGraph/CrewAI/…):

- Backend functionality thường được triển khai dạng **agent tools**/integration của framework
- Không nhất thiết phải đi theo “Backend Actions” kiểu direct-to-LLM

Tức là: với CoAgents, CopilotKit chủ yếu lo “last-mile UI + protocol”, còn backend tools nằm ở agent framework.

## Khuyến nghị an toàn

- Với thao tác rủi ro: bắt buộc HITL.
- Audit log tool calls.
- Thêm giới hạn rate/permissions theo user.
