# Prompt cho AI Agent: Xây dựng ChatPanel / BoxChat (React + TS + Tailwind)

## 0) Bối cảnh dự án
Bạn đang làm việc trong repo `redai-fe-v2-sdk` (React 18 + TypeScript + Tailwind). Repo đã có sẵn các UI primitives:

- `Avatar` (`src/components/atoms/Avatar/Avatar.tsx`)
- `Button` (`src/components/atoms/Button/Button.tsx`)
- `Icon` và `IconButton` (`src/components/atoms/Icon/Icon.tsx`, `src/components/atoms/IconButton/IconButton.tsx`)
- `Input` (`src/components/atoms/Input/Input.tsx`)
- `Modal`, `Popover`, `Tooltip`, `CornerPanel`, `Tabs`, … (xuất qua `src/index.ts`)
- Có sẵn `@tanstack/react-virtual` để virtualize list
- Icon set: `lucide-react`

## 1) Mục tiêu
Xây dựng bộ component chat gồm:

- `ChatPanel`: component chính (header + message list + chat input)
- `BoxChat`: vỏ/container cho chat (có thể dùng `CornerPanel` để hiển thị dạng “box chat” nổi, tương thích desktop/mobile)

Thiết kế UI/UX tham khảo phong cách chat hiện đại tương tự ảnh đính kèm (layout rõ ràng, bo góc, spacing dễ đọc).

## 2) Phạm vi & Deliverables (bắt buộc)
Tạo các component và type tối thiểu sau (có thể tách file theo module hợp lý):

- `ChatPanel`
- `BoxChat`
- `ChatHeader`
- `MessageList` (hỗ trợ scroll/infinite/virtualization)
- `MessageItem` (render nhiều loại nội dung)
- `ChatInput` (nhập nội dung + attachments preview + row icon chức năng)

Ngoài ra cần:

- Bộ `types` cho conversation/message/attachment/status
- Các utility/hook phục vụ:
  - auto-scroll
  - xác định đang ở cuối list
  - hiển thị “Tin nhắn mới” khi user đang xem tin cũ
  - load thêm tin cũ khi scroll lên trên (pagination/infinite)

## 2.1) Data model & Types (bắt buộc: phân biệt tin nhắn gửi đi vs nhận về)
Prompt này yêu cầu bạn **định nghĩa rõ** các interface/type cho:

- Tin nhắn **hiển thị/nhận về** (message model trong `messages[]`).
- Payload **gửi đi** khi user bấm Send (input model cho `onSendMessage`).
- (Optional nhưng khuyến nghị) model cho **optimistic message** để render ngay khi gửi và cập nhật trạng thái sau khi server ack.

Gợi ý type tối thiểu (có thể điều chỉnh nhưng phải giữ được ý nghĩa):

- `ChatMessageDirection = 'incoming' | 'outgoing' | 'system'`
- `ChatMessageStatus = 'sending' | 'sent' | 'delivered' | 'seen' | 'failed'`
- `ChatAttachment`:
  - `id?: string`
  - `name: string`
  - `mimeType?: string`
  - `size?: number`
  - `url?: string` (khi nhận về từ server)
  - `thumbnailUrl?: string` (cho image)

- `ChatMessage` (tin nhắn nhận về/hiển thị):
  - `id: string` (server id)
  - `clientId?: string` (id local để map optimistic -> server)
  - `conversationId: string`
  - `senderId: string`
  - `senderName?: string`
  - `senderAvatarUrl?: string`
  - `direction: ChatMessageDirection`
  - `createdAt: string | number` (ISO hoặc epoch)
  - `status?: ChatMessageStatus` (đặc biệt quan trọng cho outgoing)
  - `content` theo dạng union để support nhiều loại:
    - `{ type: 'text'; text: string }`
    - `{ type: 'markdown'; markdown: string }`
    - `{ type: 'image'; url: string; thumbnailUrl?: string; alt?: string }`
    - `{ type: 'file'; fileName: string; url?: string; size?: number }`
    - `{ type: 'system'; text: string }`
  - `attachments?: ChatAttachment[]`
  - `replyToId?: string`
  - `reactions?: Record<string, number>` hoặc danh sách reaction chi tiết

- `SendMessageInput` (payload khi bấm gửi):
  - `conversationId: string`
  - `clientId: string` (generate bằng `uuid`, để optimistic + reconcile)
  - `text?: string` (plain) hoặc `markdown?: string` (tùy UI input)
  - `attachments?: File[]` (file local trước khi upload)
  - `replyToId?: string`
  - `meta?: { source?: 'keyboard' | 'voice' | 'quick_action' }`

Yêu cầu hành vi liên quan types:

- Khi user bấm gửi:
  - Tạo optimistic `ChatMessage` với `status: 'sending'`, `direction: 'outgoing'`, và `clientId`.
  - Khi gửi thành công/ack: cập nhật message theo `clientId` (set `id`, `status: 'sent' | 'delivered' | ...`).
  - Khi lỗi: set `status: 'failed'` và UI cho phép retry.

## 3) Yêu cầu UI bố cục
### 3.1 Header
Header chia 2 cụm:

- Bên trái:
  - Hiển thị **logo** + **tên Agent** đang nhắn tin
  - (Optional) hiển thị trạng thái `Online/Offline`.

- Bên phải (các icon button):
  - **Call Agent**
  - **Danh sách cuộc trò chuyện**
  - **Danh sách nhiệm vụ**
  - **Tạo cuộc trò chuyện mới**

Yêu cầu:

- Dùng `IconButton` + icon từ `lucide-react`.
- Có `aria-label` rõ ràng cho từng nút.
- Có callback props tương ứng (không hardcode logic nghiệp vụ).

### 3.2 Message area
Khu vực message chiếm phần lớn chiều cao, có:

- Danh sách tin nhắn theo thứ tự thời gian
- Tin mới nhất ở cuối
- Hỗ trợ phân tách ngày (Today / Yesterday / dd/MM/yyyy)
- Hỗ trợ hiển thị “typing indicator”
- Hỗ trợ hiển thị trạng thái kết nối/lỗi

### 3.3 ChatInput
ChatInput gồm 3 phần:

- (a) **Khu vực hiển thị tệp đính kèm** đang chuẩn bị gửi (chip/thumbnail + nút remove)
- (b) **Ô nhập nội dung** (hỗ trợ xuống dòng, submit bằng Enter theo cấu hình)
- (c) **Row icon chức năng** bên dưới:
  - Đính kèm tệp
  - Cài đặt
  - Chuyển giọng nói thành văn bản

## 4) Yêu cầu hành vi danh sách tin nhắn (General Requirements)
- Hiển thị tin nhắn theo thứ tự thời gian.
- Tin nhắn mới nhất nằm ở cuối.
- Khi có tin mới:
  - Nếu user đang ở cuối list: tự động scroll xuống.
  - Nếu user đang xem tin cũ: **không** tự động scroll; hiển thị nút “Tin nhắn mới”.
- Không reload trang khi có tin mới.
- Responsive tốt trên desktop & mobile.
- Chuẩn bị sẵn API để tích hợp real-time (WebSocket / SSE / Polling) nhưng **UI component không được phụ thuộc cứng** vào 1 cơ chế cụ thể.

## 5) Hiển thị từng tin nhắn (Message Item)
Mỗi tin nhắn cần hiển thị:

- Avatar người gửi (dùng `Avatar`)
- Tên người gửi (có thể ẩn trong chat 1–1 theo config)
- Nội dung tin nhắn
- Thời gian gửi (`HH:mm` hoặc `dd/MM HH:mm`)
- Trạng thái (nếu có): `sent | delivered | seen | failed`

## 6) Phân biệt tin nhắn gửi & nhận
- Tin nhắn của user hiện tại:
  - Canh phải
  - Bubble màu khác (primary tint)
  - Avatar có thể ẩn theo cấu hình

- Tin nhắn của người khác:
  - Canh trái
  - Bubble màu trung tính
  - Hiển thị avatar + tên

## 7) Các loại nội dung tin nhắn hỗ trợ
Tối thiểu hỗ trợ render:

- Text (plain text) + emoji
- Markdown (xem mục 14)
- Image: thumbnail + click xem lớn (dùng `Modal`)
- File attachment (pdf/doc/zip…): hiển thị tên + size + nút download/open
- Link: tự động detect và render anchor an toàn (preview metadata là optional)
- System message: ví dụ “Người dùng đã tham gia”, “Cuộc trò chuyện đã kết thúc” (style khác bubble thường)

## 8) Xử lý độ dài & định dạng
- Tin nhắn dài:
  - tự xuống dòng
  - không làm vỡ layout
  - hỗ trợ xuống dòng `\n` (dùng CSS `whitespace-pre-wrap` cho plain text)
- **Không render HTML nguy hiểm (XSS)**.

## 9) Scroll behavior: load tin gần nhất & load thêm tin cũ
- Khi mở box chat:
  - Load N tin nhắn gần nhất (20–50) từ props/data layer.
- Khi kéo lên trên:
  - Tự động gọi `onLoadOlder()` để lấy thêm tin cũ
  - Có trạng thái loading (skeleton/spinner)

Gợi ý kỹ thuật:

- Dùng `@tanstack/react-virtual` để tránh render toàn bộ lịch sử chat.
- Có cơ chế “anchor” để tránh nhảy scroll khi prepend dữ liệu.

## 10) Trạng thái & phản hồi người dùng
- Hiển thị “Đang nhập…” (typing indicator)
- Hiển thị Online/Offline
- Hiển thị lỗi khi:
  - gửi thất bại (cho phép retry)
  - mất kết nối (banner nhỏ hoặc status ở header)

## 10.1) Hiển thị “thinking/streaming” của Agent (giống Grok/ChatGPT/Gemini)
Khi Agent đang xử lý hoặc đang stream nội dung, UI cần hiển thị một khu vực/tin nhắn tạm thời thể hiện trạng thái “đang nghĩ”:

- Hiển thị như một **bubble tin nhắn của Agent** (canh trái), nhưng **text mờ** (muted/opacity) và có **hiệu ứng chạy**.
- Có 2 chế độ (tối thiểu hỗ trợ 1 trong 2, ưu tiên hỗ trợ cả 2):
  - **Thinking placeholder**: chỉ hiện “Agent đang suy nghĩ…” kèm `…`/dot animation.
  - **Streaming preview**: hiển thị nội dung đang được stream theo thời gian thực (partial text), style mờ hơn message final.

Yêu cầu hành vi:

- Thinking/streaming là **transient UI state**:
  - Không tính là message chính thức trong lịch sử (không có status `sent/delivered/seen`).
  - Khi Agent trả về message hoàn chỉnh: bubble thinking/streaming biến mất và message chính thức được append vào list.
- Auto-scroll:
  - Nếu user đang ở cuối list: khi streaming cập nhật nội dung, list vẫn bám đáy (smooth).
  - Nếu user đang xem tin cũ: không auto-scroll; có thể hiển thị “Tin nhắn mới” tương tự khi có message mới.
- Không được làm nhảy layout quá nhiều:
  - Có thể giới hạn chiều cao khu vực streaming và cho scroll nội bộ, hoặc truncate với “đang tạo câu trả lời…”.

Yêu cầu UI gợi ý (không bắt buộc đúng từng chi tiết):

- Bubble có nền trung tính, border nhẹ.
- Text dùng màu `text-text-muted` và/hoặc `opacity-70`.
- Có thể có shimmer/skeleton line hoặc dot typing animation.
- Có thể có nhãn nhỏ “Thinking” hoặc icon spinner nhẹ.

## 11) Thao tác với tin nhắn
Cho phép tích hợp các action (UI + callback props):

- Copy nội dung
- Xóa tin (nếu có quyền)
- Thu hồi tin (trong thời gian cho phép)
- Reply một tin cụ thể
- React emoji (👍 ❤️ 😆 …)

Yêu cầu:

- UI action nên là menu (gợi ý: dùng `@radix-ui/react-dropdown-menu` hoặc Popover).
- Không hardcode quyền: nhận `canDelete/canRecall` từ message hoặc từ props.

## 12) Hiệu năng & tối ưu
- Không render toàn bộ lịch sử chat cùng lúc.
- Virtualized list.
- Lazy load ảnh.
- Tránh rerender không cần thiết (memo hóa `MessageItem`, tách props ổn định).

## 13) Bảo mật & dữ liệu
- Component chỉ là UI, nhưng **phải luôn render an toàn**:
  - escape/sanitize nội dung
  - không hiển thị các field nhạy cảm nếu được truyền nhầm (gợi ý: chỉ render các field đã whitelist)

## 14) Yêu cầu hiển thị Markdown trong tin nhắn
Tin nhắn dạng markdown cần render đẹp (prose style) nhưng **an toàn**.

- Ưu tiên giải pháp chuẩn:
  - Thêm dependency `react-markdown` + `remark-gfm` + `rehype-sanitize` (nếu repo cho phép thêm)
  - Cấu hình sanitize để chặn script/inline HTML nguy hiểm

- Nếu không thể thêm dependency:
  - Fallback: render markdown như plain text (không HTML) nhưng vẫn giữ xuống dòng, monospace cho code block đơn giản (tối thiểu).

## 15) API/Props đề xuất (bắt buộc phải rõ ràng)
Thiết kế component theo hướng “headless data / UI controlled”, ví dụ:

- `BoxChat`:
  - `open`, `onClose`
  - `title` hoặc `agent` (name/logo)
  - callbacks header icons: `onCallAgent`, `onOpenConversations`, `onOpenTasks`, `onCreateConversation`

- `ChatPanel`:
  - `currentUserId`
  - `messages: ChatMessage[]`
  - `onSendMessage(payload)`
  - `onLoadOlder?(cursor)` + `hasMoreOlder` + `isLoadingOlder`
  - `typingUsers?`, `presence?`
  - `agentThinking?` (trạng thái thinking/streaming của Agent, phục vụ UI transient)
  - message actions callbacks: `onCopy`, `onDelete`, `onRecall`, `onReply`, `onReact`

Đảm bảo type chặt chẽ và dễ tích hợp.

## 16) Quy ước code & tích hợp repo
- Dùng React + TypeScript.
- Styling bằng Tailwind theo pattern hiện có.
- Ưu tiên reuse atoms/molecules sẵn có: `Avatar`, `Button`, `IconButton`, `Input`, `Modal`, `Popover`, `CornerPanel`.
- Nếu thêm dependency mới (markdown), cập nhật `package.json` tương ứng và giải thích ngắn gọn trong PR description (không cần viết docs mới).
- Export component mới qua `src/index.ts` (để SDK consumer dùng được).

## 17) Tiêu chí hoàn thành (Acceptance Criteria)
- `BoxChat` hiển thị đúng 3 phần: header / message / input.
- Header có đầy đủ icon theo yêu cầu và có callback props.
- Message list:
  - đúng thứ tự thời gian, newest ở cuối
  - auto-scroll có điều kiện (chỉ khi đang ở cuối)
  - scroll lên load thêm tin cũ
  - có nút “Tin nhắn mới” khi user đang xem tin cũ
  - có date separators
- Có hiển thị trạng thái “thinking/streaming” của Agent theo yêu cầu (text mờ + hiệu ứng chạy), và tự biến mất khi có message final.
- `MessageItem` render được: text, markdown, image preview, file, link, system.
- Có định nghĩa rõ `ChatMessage` (nhận về/hiển thị) và `SendMessageInput` (gửi đi khi bấm Send) + xử lý optimistic status tối thiểu `sending/failed`.
- Có typing indicator + trạng thái lỗi/kết nối cơ bản.
- Không có XSS (markdown/text đều an toàn).
- Responsive tốt.

---

## Ghi chú (để tránh hiểu sai)
- Mục tiêu là UI SDK component: **không triển khai backend**, không hardcode WebSocket URL.
- Real-time sẽ được tích hợp từ bên ngoài qua props/hook adapter.
