# Phân Tích Module Workspace / ChatKit Generic

_Cập nhật lần cuối: 28/11/2025_

## 1. Mục tiêu
Xây dựng một module tái sử dụng trong SDK để mô phỏng trải nghiệm workspace/chat hiện đại (ví dụ: Notion, ChatGPT). Mục tiêu là cung cấp các primitive có thể lắp ghép, giúp đội ngũ sử dụng SDK tạo ra:
- Không gian làm việc nhiều vùng (sidebar, khu vực tài liệu, inspector).
- Trải nghiệm chat/assistant theo thời gian thực với lịch sử tin nhắn, khung soạn thảo và các panel ngữ cảnh.

## 2. Các trụ cột trải nghiệm
1. **Bố cục có cấu trúc** – khung responsive gồm sidebar (thư mục/cuộc hội thoại), canvas chính (doc/chat) và ngăn phụ tuỳ chọn (chi tiết, gợi ý AI).
2. **Block có thể lắp ghép** – hỗ trợ block tài liệu (text, checklist, callout, code, embed) và block chat (user, assistant, system, function call).
3. **Phản hồi thời gian thực** – typing indicator, streaming, cập nhật lạc quan, trạng thái offline.
4. **Tích hợp ActionBus** – telemetry cho mọi thao tác (gửi tin, sửa block, đổi chế độ) với middleware logging/analytics.
5. **Theming nhất quán** – tuân thủ flat design của SDK (bo tròn mềm, nền grayscale nhẹ, accent dựa trên tokens).

## 3. Cấu trúc module đề xuất
`/src/workspace` (entry point mới)
- **layout/**
  - `WorkspaceShell` – bố cục tổng thể gồm header + sidebar co giãn + khu nội dung.
  - `SidebarTree` – điều hướng phân cấp (page, convo) với drag/drop.
  - `InspectorPane` – stack thẻ metadata/ngữ cảnh (gợi ý AI, thống kê doc).
- **blocks/**
  - `BlockRenderer` – render block theo schema (paragraph, heading, checklist, callout, code, image, table).
  - `BlockControls` – toolbar inline cho định dạng, AI assist, move up/down.
  - `BlockComposer` – slash menu kiểu Notion.
- **chat/**
  - `ChatThread` – danh sách tin nhắn ảo hoá (user/assistant/function).
  - `MessageBubble` – hỗ trợ Markdown/code, đính kèm, hành động (copy, retry, share).
  - `TypingIndicator`, `StreamingMessage` – hiển thị token streaming.
  - `Composer` – input nhiều dòng, đính file, command, gửi tin.
- **context/**
  - `MemoryCard`, `AttachmentList`, `CitationBadge` – hiển thị tài liệu tham chiếu.
  - `TraceTimeline` – timeline các bước agent (tool call, output).
- **state/**
  - Hooks cập nhật lạc quan (`useChatSession`, `useWorkspaceDoc`).
  - Provider context chứa thông tin session, quyền, feature flag.

## 4. Luồng dữ liệu & sự kiện
```
User action → Component Workspace/Chat → useDispatchAction(EventType.UI_*) →
  Middleware (PII filter -> auditor) → ActionBus subscribers
    ↳ Middleware telemetry đẩy analytics
    ↳ Hooks state local cập nhật UI (lịch sử chat, block doc)
```
- Block tài liệu lưu dạng cây JSON; chỉnh sửa phát `WORKSPACE_BLOCK_UPDATE`.
- Tin nhắn chat append qua `CHAT_MESSAGE_APPEND`; streaming dùng sự kiện incremental (`CHAT_MESSAGE_TOKEN`).
- Bật/tắt panel phụ phát `WORKSPACE_PANEL_TOGGLE` để tracking.

## 5. Yêu cầu UX
| Tính năng | Mô tả |
| --- | --- |
| **Slash Commands** | Palette lệnh (`/callout`, `/todo`, `/code`, `/summarize`). |
| **Drag Handles** | Mỗi block có tay cầm kéo, hỗ trợ phím tắt. |
| **AI Assist Buttons** | CTA inline: “Hỏi AI”, “Tóm tắt lựa chọn”, “Viết tiếp”. |
| **Presence Indicators** | Tuỳ chọn avatar/cursor khi đồng bộ thời gian thực. |
| **Message Actions** | Retry, copy code, chuyển tin nhắn thành block. |
| **Theming** | Tận dụng tokens (`bg-surface`, `bg-surface-alt`, màu text) + accent gradient cho đáp án AI. |

## 6. Chiến lược modular hoá
- **Entry point mới** `src/workspace/index.ts` export toàn bộ primitive.
- Giữ dependency nhẹ: tái dùng atoms/molecules hiện có; thư viện bổ sung (markdown, virtualization) nên optional & tree-shakeable.
- Cung cấp `WorkspaceProvider` quản lý:
  - Document/chapter hiện tại
  - Metadata phiên chat (model, persona)
  - Feature flag (AI tool, streaming)
- Public interface TypeScript cho block/message giúp map với backend.

## 7. Lộ trình triển khai
1. **Shell + Sidebar** – `WorkspaceShell`, `SidebarTree`, `InspectorPane`, `WorkspaceHeader`.
2. **Blocks** – `BlockRenderer` + block cơ bản (text, heading, list, checklist, callout, code), thêm slash menu và toolbar inline.
3. **Chat** – `ChatThread`, `MessageBubble`, `Composer`, `TypingIndicator`, xử lý streaming.
4. **Context Cards** – attachments, citations, timeline.
5. **State Hooks** – `useChatSession`, `useWorkspaceDoc` đồng bộ ActionBus.
6. **Sample Stories** – Storybook mô phỏng workspace page, phiên chat, luồng AI assist.
7. **Docs** – README/Docs mô tả module, contract dữ liệu, cách mở rộng.

## 8. Rủi ro & hướng xử lý
| Rủi ro | Giải pháp |
| --- | --- |
| Phức tạp / bundle lớn | Lazy-load thành phần nặng (markdown, virtualization), entrypoint tree-shakeable. |
| Khả năng truy cập | Bảo đảm ARIA cho collapse, keyboard nav cho slash/drag, semantics thân thiện voiceover. |
| Đồng nhất state | Dùng `WorkspaceProvider` với reducer + optimistic update; khai thác ActionBus cho audit. |
| Sai lệch phong cách | Tái dùng tokens và atoms (Button, Card, List, Skeleton) để giữ consistent. |

## 9. Deliverables
- `src/workspace/index.ts` export layout/chat/block primitives.
- Context & hooks (`WorkspaceProvider`, `useChatSession`).
- Storybook cảnh workspace + chat.
- Documentation (README + SDK_STATUS_REPORT) mô tả cách dùng và tuỳ biến.
- Ví dụ tích hợp hiển thị workspace + chat trên cùng một màn hình.
