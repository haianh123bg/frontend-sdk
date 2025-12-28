# Chat UI Platform Architecture (ChatKit-like)

Tài liệu này mô tả kiến trúc và hợp đồng tích hợp cho một hệ thống Chat UI “ChatKit-like” trong đó **frontend SDK chỉ render UI theo schema** và **mọi hành vi/luồng nghiệp vụ do backend điều phối**.


## Mục lục

1. [Mục tiêu](#1-mục-tiêu)
2. [Phạm vi & ranh giới trách nhiệm](#2-phạm-vi--ranh-giới-trách-nhiệm)
3. [Nguyên tắc thiết kế](#3-nguyên-tắc-thiết-kế)
4. [Kiến trúc tổng thể](#4-kiến-trúc-tổng-thể)
5. [Hợp đồng dữ liệu (Schema-first)](#5-hợp-đồng-dữ-liệu-schema-first)
6. [Frontend SDK (React)](#6-frontend-sdk-react)
7. [Backend Chat Runtime (tham chiếu)](#7-backend-chat-runtime-tham-chiếu)
8. [Orchestrator](#8-orchestrator)
9. [AI Integration Layer](#9-ai-integration-layer)
10. [Tool System (tuỳ chọn)](#10-tool-system-tuỳ-chọn)
11. [Security & Governance](#11-security--governance)
12. [Luồng hoạt động chuẩn](#12-luồng-hoạt-động-chuẩn)
13. [Lộ trình triển khai](#13-lộ-trình-triển-khai)
14. [Tóm tắt 1 câu](#14-tóm-tắt-1-câu)


## 1. Mục tiêu

Hệ thống hướng tới:

- **Render UI chat dựa trên component DSL** (JSON/UI schema).
- **UI không chứa logic nghiệp vụ**: chỉ hiển thị, thu thập tương tác, và phát sự kiện.
- **Hỗ trợ Widget, Action, AI, Tool** thông qua hợp đồng schema rõ ràng.
- **Backend kiểm soát state, permission, business logic** và quyết định luồng hội thoại.
- Có thể mở rộng thành **chat platform** / **AI agent platform**.


## 2. Phạm vi & ranh giới trách nhiệm

### 2.1 Frontend SDK (trong repo này)

- Render danh sách message.
- Render widget từ JSON schema.
- Emit action event (từ thao tác người dùng) về backend.

### 2.2 Backend Runtime (ngoài repo này, chỉ mô tả để thống nhất hợp đồng)

- Quản lý conversation, state, permission.
- Dispatch action sang các handler nghiệp vụ.
- Orchestrate luồng (AI/tool) và trả về `ChatResponse` (text + widget).

### 2.3 Không thuộc phạm vi của frontend SDK

- Xử lý nghiệp vụ.
- Gọi AI trực tiếp.
- Truy cập DB / gọi service nội bộ.


## 3. Nguyên tắc thiết kế

- **Declarative UI**
  - UI chỉ mô tả *cái gì hiển thị*, không mô tả *làm gì*.
- **Action-driven**
  - Mọi tương tác của người dùng đều được chuẩn hoá thành **Action Event**.
- **Backend orchestrated**
  - Backend quyết định luồng hội thoại (state machine + policy + nghiệp vụ).
- **Schema-first**
  - UI schema, action schema, tool schema đều là “source of truth”.
- **AI-safe**
  - AI không được execute code; AI chỉ được sinh text/schema và đề xuất action/tool.


## 4. Kiến trúc tổng thể

```text
┌───────────────┐
│   Chat UI     │  React (Frontend SDK)
│───────────────│
│ Message View  │
│ Widget Engine │
│ Action Emit   │
└───────▲───────┘
        │ Action / Message
        ▼
┌────────────────────────┐
│   Chat Gateway API     │  NestJS (tham chiếu)
│────────────────────────│
│ Conversation Manager   │
│ Action Dispatcher      │
│ Orchestrator           │
└───────▲────────▲───────┘
        │        │
        │        │
┌───────┘        └─────────┐
│                            │
▼                            ▼
AI Provider              Tool / Service
(OpenAI, etc)            (Order, DB, API)
```


## 5. Hợp đồng dữ liệu (Schema-first)

Mục tiêu của phần này là chuẩn hoá “ngôn ngữ giao tiếp” giữa backend và frontend để frontend có thể render và emit action một cách thuần tuý.


### 5.1 UI Schema (Component DSL)

```ts
interface UIComponent {
  type: string
  props?: Record<string, any>
  children?: UIComponent[]
}
```


### 5.2 Ví dụ widget JSON

```json
{
  "type": "card",
  "props": { "size": "sm" },
  "children": [
    {
      "type": "text",
      "props": { "value": "Order Summary" }
    }
  ]
}
```


### 5.3 Action Event (frontend → backend)

```ts
interface ActionEvent {
  type: string
  payload?: any
  conversationId: string
}

emitAction({
  type: "purchase",
  payload: { itemIds: [1, 2] },
  conversationId: "..."
})
```


### 5.4 ChatResponse (backend → frontend)

Đây là response “chuẩn” để UI render lại.

```ts
type ChatResponse = {
  messages: Message[]
  widgets: UIComponent[]
  stream: boolean
}
```


## 6. Frontend SDK (React)

### 6.1 Chat UI Layer

**Chức năng**

- Hiển thị message.
- Render widget từ JSON schema.
- Emit action.

**Không làm**

- Không xử lý nghiệp vụ.
- Không gọi AI trực tiếp.


### 6.2 Component Registry

`Component Registry` là ánh xạ từ `type` (trong schema) sang React component thật.

```ts
const componentRegistry = {
  card: Card,
  row: Row,
  col: Col,
  text: Text,
  image: Image,
  button: Button
}
```


### 6.3 Widget Renderer

Renderer chịu trách nhiệm render đệ quy theo cây schema.

```tsx
function renderNode(node: UIComponent) {
  const Comp = componentRegistry[node.type]
  return (
    <Comp {...node.props}>
      {node.children?.map(renderNode)}
    </Comp>
  )
}
```


## 7. Backend Chat Runtime (tham chiếu)

### 7.1 Core Modules

```text
chat-runtime/ (NestJS)
└── src/
    ├── main.ts
    ├── app.module.ts
    ├── schema/
    ├── conversation/
    ├── action/
    ├── orchestrator/
    ├── ai/
    └── tool/
```


### 7.2 Conversation Management

```text
Conversation {
  id
  userId
  state
  context
  history
}
```


State ví dụ:

- `IDLE`
- `WAITING_ACTION`
- `PROCESSING`
- `COMPLETED`


### 7.3 Action System (cốt lõi)

**Action Contract**

```ts
type ActionRequest = {
  type: string
  payload?: Record<string, any>
  conversationId: string
}
```


**Action Handler Interface**

```ts
interface ChatActionHandler {
  supports(actionType: string): boolean
  handle(request: ActionRequest, ctx: Conversation): Promise<ChatResponse> | ChatResponse
}
```


**Action Registry / Dispatcher**

```ts
@Injectable()
export class ActionDispatcher {
  constructor(private readonly handlers: ChatActionHandler[]) {}

  dispatch(req: ActionRequest, ctx: Conversation) {
    const handler = this.handlers.find((h) => h.supports(req.type))
    if (!handler) throw new Error(`No handler for action type: ${req.type}`)
    return handler.handle(req, ctx)
  }
}
```


**Ví dụ Action: `purchase`**

```ts
@Injectable()
export class PurchaseActionHandler implements ChatActionHandler {
  supports(actionType: string) {
    return actionType === 'purchase'
  }

  handle(req: ActionRequest, ctx: Conversation) {
    // business logic
    return ChatResponse.message('Đơn hàng đã được tạo')
  }
}
```


## 8. Orchestrator

**Nhiệm vụ**

- Nhận message / action.
- Quyết định:
  - Gọi AI.
  - Gọi tool.
  - Trả widget.
- Update state.


```ts
type ChatResponse = {
  messages: Message[]
  widgets: UIComponent[]
  stream: boolean
}
```


## 9. AI Integration Layer

```ts
interface AIProvider {
  chat(context: ChatContext): Promise<AIResult> | AIResult
}
```


AI chỉ được:

- Sinh text.
- Sinh UI schema.
- Đề xuất action / tool.

AI không được:

- Gọi DB.
- Execute code.


## 10. Tool System (tuỳ chọn)

```text
Tool {
  name
  inputSchema
  execute()
}
```

AI → đề xuất tool → Orchestrator quyết định.


## 11. Security & Governance

- Action whitelist.
- Payload validation (schema).
- Permission per action.
- Rate limit.
- Conversation isolation.


## 12. Luồng hoạt động chuẩn

```text
User click button
→ Action Event
→ Backend Action Dispatcher
→ Business Logic
→ ChatResponse (text + widget)
→ UI render
```


## 13. Lộ trình triển khai

- Phase 1
  - Message
  - JSON widget
  - Action dispatcher
- Phase 2
  - Conversation state
  - AI response
- Phase 3
  - Tool calling
  - Streaming
- Phase 4
  - Flow builder
  - Multi-agent

## 14. Tóm tắt 1 câu

Hệ thống là một Chat Runtime, nơi UI chỉ render schema, mọi hành vi được điều khiển bằng Action và Orchestrator ở backend.