# Các bước triển khai ChatPanel / BoxChat (theo `CHAT_PANEL_AGENT_PROMPT.md`)

Tài liệu này mô tả **các hành động cụ thể từng bước** để triển khai bộ component chat trong repo `redai-fe-v2-sdk`.

---

## 1) Xác định phạm vi & vị trí code
- **Mục tiêu**: tạo các component `BoxChat`, `ChatPanel`, `ChatHeader`, `MessageList`, `MessageItem`, `ChatInput` + types/hooks.
- **Quy ước**:
  - Reuse primitives có sẵn: `Avatar`, `Button`, `IconButton`, `Input`, `Modal`, `Popover`, `CornerPanel`.
  - Styling bằng Tailwind theo pattern repo.
- **Chọn vị trí file** (đề xuất, có thể điều chỉnh theo structure hiện tại):
  - `src/components/organisms/Chat/` (hoặc `src/components/molecules/Chat/` nếu muốn nhỏ gọn)
  - `src/components/organisms/Chat/types.ts`
  - `src/components/organisms/Chat/hooks/*.ts`

---

## 2) Định nghĩa Data Model & Types (bắt buộc)
Tạo file `types.ts` và định nghĩa rõ:

- `ChatMessageDirection = 'incoming' | 'outgoing' | 'system'`
- `ChatMessageStatus = 'sending' | 'sent' | 'delivered' | 'seen' | 'failed'`
- `ChatAttachment` (metadata file/image)
- `ChatMessage` (tin nhắn hiển thị/nhận về)
  - có `direction`, `createdAt`, `status?`, `content` (union type), `attachments?`, `replyToId?`, `reactions?`.
- `SendMessageInput` (payload gửi đi khi bấm Send)
  - có `conversationId`, `clientId` (uuid), `text? | markdown?`, `attachments?: File[]`, `replyToId?`, `meta?`.
- `AgentThinkingState` (trạng thái thinking/streaming transient)
  - ví dụ: `{ mode: 'thinking' | 'streaming'; text?: string; startedAt?: number }`.

Kết quả:
- Types đủ rõ để UI phân biệt **incoming/outgoing/system** và xử lý **optimistic sending/failed**.

---

## 3) Thiết kế Props API cho từng component
Xác định rõ props để component không phụ thuộc backend:

- `BoxChatProps`:
  - `open`, `onClose`
  - `agent`: `{ name: string; logoUrl?: string; status?: 'online' | 'offline' }`
  - callbacks header icons: `onCallAgent`, `onOpenConversations`, `onOpenTasks`, `onCreateConversation`
  - `children` hoặc render trực tiếp `ChatPanel`

- `ChatPanelProps`:
  - `currentUserId`, `conversationId`
  - `messages: ChatMessage[]`
  - `agentThinking?: AgentThinkingState | null`
  - `typingUsers?`, `presence?`
  - `onSendMessage: (input: SendMessageInput) => Promise<void> | void`
  - `onLoadOlder?: (cursor?: string) => Promise<void> | void` + `hasMoreOlder?` + `isLoadingOlder?`
  - callbacks cho actions: `onCopy`, `onDelete`, `onRecall`, `onReply`, `onReact`

---

## 4) Implement `BoxChat` (container)
- Dùng `CornerPanel` (hoặc `Drawer` nếu bạn chọn) để dựng layout box chat.
- Cấu trúc:
  - Header (dùng `ChatHeader`)
  - Body chứa `ChatPanel`
- Đảm bảo responsive:
  - Desktop: panel cố định góc.
  - Mobile: full height, input bám đáy, list cuộn ổn.

---

## 5) Implement `ChatHeader`
- Trái: logo + tên Agent (+ Online/Offline nếu có).
- Phải: 4 nút icon (Call, Conversations, Tasks, New Conversation).
- Dùng `IconButton` + icon từ `lucide-react`.
- Mỗi nút có `aria-label` và gọi callback props tương ứng.

---

## 6) Implement `MessageItem` (render nội dung)
Tạo component render theo `message.direction` và `message.content.type`:

- **Outgoing** (current user): canh phải, bubble màu primary tint, có thể ẩn avatar.
- **Incoming**: canh trái, bubble trung tính, hiện avatar + tên.
- **System**: style khác (center/muted).

Render types:
- `text`: dùng `whitespace-pre-wrap`, `break-words`.
- `markdown`: render an toàn (xem bước 11).
- `image`: thumbnail + click mở `Modal` xem lớn.
- `file`: hiển thị file row (name/size) + open/download.
- `link`: detect URL trong text/markdown và render anchor an toàn.

Trạng thái message (nếu có): `sending/sent/delivered/seen/failed`.
- Với `failed`: hiển thị hint + nút retry (gọi callback).

---

## 7) Implement khu vực “thinking/streaming” của Agent
Tạo `AgentThinkingMessage` (hoặc tích hợp trong `MessageList`) với rules:

- Hiển thị như bubble incoming, **text mờ** + hiệu ứng chạy.
- Hai mode:
  - `thinking`: “Agent đang suy nghĩ…” + dot animation.
  - `streaming`: hiển thị `agentThinking.text` (partial) mờ hơn message final.
- Đây là transient UI:
  - Không ghi vào `messages[]` history.
  - Khi message final đến: component tự biến mất (do `agentThinking` về null).

---

## 8) Implement `MessageList` (scroll, infinite, virtualize)
Yêu cầu:
- Newest ở cuối.
- Auto-scroll có điều kiện.
- Scroll lên load older (pagination/infinite).
- Date separators.
- Nút “Tin nhắn mới” khi user đang xem tin cũ.

Thực hiện:
- Dùng `@tanstack/react-virtual` để render list.
- Tạo cơ chế:
  - `isAtBottom` (dựa trên scrollTop + clientHeight gần scrollHeight).
  - `scrollToBottom()`.
- Khi nhận message mới hoặc streaming text update:
  - Nếu `isAtBottom`: scroll xuống.
  - Nếu không: show “Tin nhắn mới”.
- Khi user scroll lên gần top:
  - nếu `hasMoreOlder` và không `isLoadingOlder`: gọi `onLoadOlder()`.
  - dùng “anchor” để giữ vị trí khi prepend.

---

## 9) Implement `ChatInput`
Bố cục 3 phần:

- (a) Attachments preview:
  - Hiển thị danh sách file đã chọn (chip/thumbnail), có nút remove.
- (b) Input nội dung:
  - hỗ trợ multiline (có thể dùng `Textarea` nếu repo có; nếu không thì dùng `textarea` + style theo `Input`).
  - cấu hình Enter để gửi / Shift+Enter để xuống dòng.
- (c) Row icon chức năng:
  - attach file
  - settings
  - voice-to-text

Hành vi:
- Khi bấm gửi:
  - validate (text rỗng và không attachment => không gửi)
  - tạo `SendMessageInput` với `clientId` (uuid)
  - gọi `onSendMessage(input)`
  - reset input + attachments khi thành công (hoặc ngay lập tức nếu optimistic).

---

## 10) Optimistic message flow (UI state)
- Khi user gửi:
  - UI append optimistic `ChatMessage` (outgoing) với `status: 'sending'` và `clientId`.
- Khi server ack:
  - map theo `clientId` để cập nhật `id` và `status`.
- Khi lỗi:
  - set `status: 'failed'`.
  - retry dùng lại payload tương ứng.

Lưu ý:
- Nếu SDK chỉ cung cấp UI thuần, optimistic state có thể do consumer quản lý; nhưng component nên **có guideline** và UI hiển thị trạng thái `sending/failed`.

---

## 11) Markdown rendering an toàn (XSS)
- Ưu tiên:
  - thêm `react-markdown` + `remark-gfm` + `rehype-sanitize`.
  - cấu hình sanitize chặt.
- Nếu không thêm dependency:
  - fallback: render markdown như plain text (không parse HTML).

---

## 12) Message actions menu (copy/delete/recall/reply/react)
- Với mỗi `MessageItem`:
  - đặt menu (Popover/Dropdown) ở góc bubble.
  - action nào bật/tắt dựa trên props/quyền (`canDelete/canRecall`).
  - `copy`: dùng Clipboard API.

---

## 13) Hoàn thiện UX: loading, errors, presence, typing
- Banner nhỏ/inline status:
  - mất kết nối
  - gửi lỗi
- Typing indicator:
  - hiển thị dưới list hoặc cuối list.
- Presence online/offline:
  - hiển thị tại header.

---

## 14) Export SDK & story/demo
- Export component/types từ `src/index.ts`.
- (Khuyến nghị) thêm storybook story hoặc example demo để QA:
  - list có nhiều message
  - infinite prepend
  - thinking/streaming
  - attachments + image preview

---

## 15) Checklist nghiệm thu (Acceptance Checklist)
- Header đủ icon + callback.
- Message list đúng thứ tự + newest ở cuối.
- Auto-scroll có điều kiện + nút “Tin nhắn mới”.
- Infinite load older + giữ vị trí scroll.
- Render: text/markdown/image/file/link/system.
- Có thinking/streaming bubble mờ + hiệu ứng chạy và biến mất khi có message final.
- Có trạng thái sending/failed tối thiểu.
- Không XSS.
- Responsive tốt.
