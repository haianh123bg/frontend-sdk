# 05 - Frontend Actions / Frontend Tools

Nguồn tham chiếu:
- Frontend Actions (overview): https://docs.copilotkit.ai/frontend-actions
- Hook `useFrontendTool`: https://docs.copilotkit.ai/reference/hooks/useFrontendTool
- Hook `useRenderToolCall`: https://docs.copilotkit.ai/reference/hooks/useRenderToolCall

## Mục tiêu

Frontend tools cho phép agent **tác động trực tiếp lên UI** hoặc state phía frontend.

Ví dụ use-case:

- Mở/đóng panel, điều hướng.
- Cập nhật filter/search, chọn item.
- Show toast/notification.
- Tạo UI “card” trong chat dựa trên kết quả tool.

## Hook chính: `useFrontendTool`

`useFrontendTool` định nghĩa một tool gồm:

- `name`: tên tool
- `description`: mô tả để agent biết khi nào gọi
- `parameters`: schema params
- `handler`: logic thực thi (async)
- `render` (optional): UI hiển thị trong chat cho tool call

Điểm thiết kế quan trọng:

- **handler** chạy ở browser → không chứa secrets.
- `render` cho phép show trạng thái `inProgress/complete` + result.

## Chỉ render (không execute): `useRenderToolCall`

Dùng khi tool call chạy ở backend nhưng bạn muốn UI hiển thị progress/result.

- Không có `handler`.
- Chỉ có `render`.
- Có thể catch-all bằng `name: ""`.

## Migration

- `useCopilotAction` trước đây được thay bằng:
  - `useFrontendTool` (execute + optional render)
  - `useRenderToolCall` (render-only)
  - `useHumanInTheLoop` (wait for user response)

## Nguyên tắc thiết kế UX

- Tool frontend nên là “UI effects” rõ ràng và có giới hạn.
- Luôn render trạng thái đang chạy để user hiểu agent đang làm gì.
- Với hành động rủi ro: chuyển sang HITL.

## Gợi ý pattern

- **Command palette**: agent gọi tool `openCommandPalette`.
- **Contextual drill-down**: agent gọi tool mở tab/panel đúng ngữ cảnh.
- **Inline widgets**: tool call render card (bảng, chart, form).
