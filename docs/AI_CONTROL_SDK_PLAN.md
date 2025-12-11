# Kế hoạch AI hoá SDK & Component Control

_Cập nhật lần đầu: 11/12/2025_

## 1. Bối cảnh & kiến trúc hiện tại

- **Nhóm core sự kiện**
  - `ActionBus` (`src/bus/actionBus.ts`): bus sự kiện trung tâm với `publish`, `subscribe`, `subscribeAll`, hỗ trợ `Middleware` (PII filter, audit logger, ...).
  - `EventType`, `ActionEvent` (`src/events/types.ts`): mô hình hoá sự kiện UI / Form / System / Navigation, có `meta`, `flags` (PII, persist, priority).
  - Middleware hiện có:
    - `piiFilterMiddleware` (`src/middleware/piiFilter.ts`): che thông tin nhạy cảm nếu `flags.sensitive`.
    - `auditLoggerMiddleware` (`src/middleware/auditLogger.ts`): log sự kiện có `flags.persist`.
- **Layer socket**
  - `SocketProvider`, `useSocketContext`, `useSocketEmit`, `useSocketEvent` (`src/core/socket/*`): trừu tượng hoá map `SocketChannel → GenericSocket`, cho phép `subscribe`/`emit` event theo từng channel.
  - `GenericSocket` tương thích `socket.io-client` hoặc client khác (`on`, `off`, `emit`).
- **Hook bus**
  - `useDispatchAction`, `useSubscribeAction` (`src/bus/hooks.ts`): API chuẩn để component phát/nhận sự kiện từ `ActionBus`.
- **Nhóm component & module chính**
  - **Form**: `components/organisms/Form/Form.tsx` + hệ sinh thái `form-roadmap.md` + hooks `useZodForm`, `useFormErrors`, `useFormSubmit` (đã được thiết kế trong docs).
  - **Table**: `components/organisms/Table/Table.tsx` + kế hoạch `TANSTACK_TABLE_PLAN.md` để nâng cấp sang `@tanstack/react-table`.
  - **Kanban**: module `src/kanban` + `components/organisms/Kanban/*` (đang phát triển, đã có plan trong `KANBAN_MODULE_PLAN.md`).
  - **Charts**: `src/charts/*` với base `EChartsBase.tsx`.
  - **Workspace/Chat**: định hướng trong `GENERIC_WORKSPACE_MODULE.md` (workspace shell + chat + context panels, đã tích hợp `ActionBus` cho telemetry).
- **Entry point SDK**
  - `src/index.ts` re-export toàn bộ atoms/molecules/organisms, `actionBus`, `hooks`, `events`, `core`, `charts`, `kanban`, ...

Nhìn chung, SDK đã có:
- Một event bus mạnh (ActionBus + middleware) → rất phù hợp làm nguồn telemetry & control.
- Abstraction socket đủ generic → có thể dùng làm kênh AI control.
- Các module domain (Form, Table, Kanban, Charts) được tổ chức rõ ràng, có tài liệu roadmap để mở rộng.

---

## 2. Định nghĩa "AI control" cho SDK

**AI control** = một agent AI (ở backend hoặc service riêng) có thể:
- **Quan sát**:
  - Nhận toàn bộ sự kiện UI/Business quan trọng từ client (click, change, submit, drag, route, ...).
  - Kèm `meta` (component, instanceId, version, route, correlationId, ...).
- **Điều khiển**:
  - Gửi lệnh qua socket để:
    - Thay đổi state/props của component (filter/sort table, điền form, di chuyển card Kanban, đổi range chart,...).
    - Kích hoạt hành động (click ảo, submit form, mở modal, chuyển route, ...).
- **An toàn & kiểm soát được**:
  - Có PII filtering, audit log, whitelist action theo config.
  - Có khả năng replay / trace lại flow dựa trên event stream.

**Non-goals (ngoài phạm vi trước mắt):**
- Tự động refactor code component.
- Điều chỉnh layout phức tạp vượt ra ngoài khả năng của SDK (chủ yếu tập trung vào điều khiển trên primitives đã có).

---

## 3. Kiến trúc tổng thể đề xuất

### 3.1. Sơ đồ high-level

```text
User ↔ UI Components
      │        ▲
      │        │
      ▼        │
   ActionBus (UI/Domain events)
      │        ▲
      │        │ (AI commands được map thành ActionEvent)
      ▼        │
   Middleware (PII, Audit, Telemetry, AI-Bridge)
      │
      ▼
 Socket Layer (SocketProvider, useSocketEvent/useSocketEmit)
      │
      ▼
    AI Service / Orchestrator / LLM
```

Tầng bổ sung chính: **AI-Bridge** giữa `ActionBus` và `SocketProvider` + **component capability adapters** cho từng module.

### 3.2. Các tầng chính

- **Tầng ActionBus**
  - Là nơi mọi component phát sự kiện chuẩn từ UI.
  - Mọi AI control command khi về client cũng nên được quy về `ActionEvent` để dễ log & trace.

- **Tầng Middleware**
  - Hiện có: `piiFilterMiddleware`, `auditLoggerMiddleware`.
  - Sẽ bổ sung:
    - `aiForwardMiddleware`: chọn lọc sự kiện cần gửi sang AI (ví dụ chỉ `UI.*`, `FORM.*`, `TABLE.*`, `KANBAN.*`).
    - `aiPolicyMiddleware`: enforce policy (chặn hành động AI không hợp lệ nếu đi qua bus).

- **Tầng Socket Bridge (AI-Bridge)**
  - Chịu trách nhiệm:
    - **Outbound**: đẩy sự kiện từ `ActionBus` → socket (channel `ai-events`).
    - **Inbound**: lắng nghe lệnh AI từ socket (channel `ai-control`) → chuyển thành `ActionEvent` hoặc gọi handler chuyên biệt.
  - Đề xuất module mới: `src/core/ai-control/`.

- **Tầng Capability Adapter cho từng module**
  - Mỗi module lớn (Form, Table, Kanban, Charts, Workspace) có 1 adapter/hook:
    - Đăng ký lắng nghe các `AI.*` command liên quan.
    - Map command → hành vi cụ thể trên component/hook.

---

## 4. Chuẩn hoá mô hình Event cho toàn bộ component

### 4.1. Mở rộng `EventType` & naming convention

- Giữ `EventType` cho các nhóm core (UI, FORM, SYSTEM, NAV).
- Cho các module khác, dùng string type mở rộng theo convention:
  - **Table**:
    - `TABLE.INIT`, `TABLE.SORT_CHANGE`, `TABLE.FILTER_CHANGE`, `TABLE.PAGE_CHANGE`, `TABLE.PAGE_SIZE_CHANGE`,
      `TABLE.ROW_SELECT`, `TABLE.ROW_ACTION`.
  - **Form** (bổ sung trên nền hiện tại):
    - `FORM.FIELD_CHANGE`, `FORM.RESET`, `FORM.SUBMIT_SUCCESS`, `FORM.SUBMIT_ERROR`.
  - **Kanban**:
    - `KANBAN.CARD_MOVE`, `KANBAN.CARD_UPDATE`, `KANBAN.CARD_CREATE`, `KANBAN.CARD_DELETE`,
      `KANBAN.COLUMN_CREATE`, `KANBAN.COLUMN_REORDER`.
  - **Charts**:
    - `CHART.INIT`, `CHART.RANGE_CHANGE`, `CHART.SERIES_TOGGLE`, `CHART.POINT_HOVER`, `CHART.POINT_SELECT`.
  - **Layout / Workspace**:
    - `WORKSPACE.PANEL_TOGGLE`, `WORKSPACE.BLOCK_UPDATE`, `WORKSPACE.BLOCK_SELECT`,
      `CHAT.MESSAGE_APPEND`, `CHAT.MESSAGE_TOKEN`, `CHAT.MESSAGE_ACTION`.

### 4.2. Chuẩn hoá `meta` và `flags`

- `meta` chuẩn:
  - `component`: tên component (`Form`, `Table`, `KanbanBoard`, `EChart`, `WorkspaceShell`, ...).
  - `instanceId`: id duy nhất cho mỗi instance (do component tự generate hoặc nhận qua prop).
  - `route` hoặc `location`: context màn hình.
  - `version`: version SDK.
  - `correlationId`: nối các event thuộc cùng 1 flow (1 prompt AI ↔ nhiều action).
- `flags` chuẩn:
  - `sensitive`: đánh dấu payload nhạy cảm (để `piiFilter` xử lý).
  - `persist`: sự kiện phải được audit.
  - `priority`: low/medium/high cho việc ưu tiên xử lý/log.

### 4.3. Các bước triển khai event hoá component

1. **Audit hiện trạng** (coding task riêng):
   - Tìm trong `src/components` các nơi chưa dùng `useDispatchAction` nhưng có tương tác quan trọng (click, submit, drag, sort, ...).
   - Đánh dấu theo nhóm: Form, Table, Kanban, Charts, Navigation, Feedback (Modal, Toast,...).
2. **Bổ sung dispatch chuẩn**:
   - `Button`, `Tabs`, `Pagination`, `Modal`, ... phát `UI.CLICK` / `UI.CHANGE` với đầy đủ `meta`.
   - `Table` phát `TABLE.*` khi sort/filter/paginate/rowSelect.
   - `KanbanBoard` phát `KANBAN.*` khi card/column thay đổi.
   - `EChartsBase` phát `CHART.*` khi người dùng tương tác.
3. **Helper tạo sự kiện**:
   - Tạo util (ví dụ `createComponentEvent`) để tránh lặp lại việc gán `meta`, `flags`.

---

## 5. Thiết kế protocol AI control (socket message)

### 5.1. Envelope chung

```ts
// Phía client (TypeScript)
export type AiControlMessage = {
  id: string
  direction: 'UI→AI' | 'AI→UI'
  type: string            // vd: 'AI.FORM.FILL', 'AI.TABLE.SORT'
  target?: {
    component?: string    // 'Form', 'Table', 'KanbanBoard', 'EChart', ...
    instanceId?: string
    path?: string         // context tuỳ ý: 'settings/users', 'board/123', ...
  }
  payload: any
  meta?: {
    correlationId?: string
    traceId?: string
    [key: string]: any
  }
}
```

- `UI→AI`:
  - Được sinh từ `ActionEvent` (qua AI-Bridge outbound) → gửi sang socket `ai-events`.
- `AI→UI`:
  - Nhận từ kênh `ai-control` → map thành `ActionEvent` hoặc gọi trực tiếp adapter.

### 5.2. Kênh & event socket

- **Channels đề xuất**:
  - `ai-events`: stream sự kiện từ UI gửi lên AI.
  - `ai-control`: lệnh điều khiển từ AI xuống UI.
- **Event name** (trên mỗi channel):
  - `event`: (UI→AI) gửi gói `AiControlMessage` có `direction: 'UI→AI'`.
  - `command`: (AI→UI) gửi `AiControlMessage` có `direction: 'AI→UI'`.

### 5.3. Domain commands theo module

- **Form**
  - `AI.FORM.FILL_FIELDS`: điền nhiều field cùng lúc (`payload: { values: Record<string, any> }`).
  - `AI.FORM.SET_FIELD`: sửa một field (`{ name, value }`).
  - `AI.FORM.FOCUS_FIELD`: focus vào một field (`{ name }`).
  - `AI.FORM.SUBMIT`: trigger submit form.
  - `AI.FORM.RESET`: reset về default.

- **Table** (gắn với TanStack Table):
  - `AI.TABLE.SET_SORT`: `{ sorting: SortingState }`.
  - `AI.TABLE.SET_FILTERS`: `{ filters: ColumnFiltersState }`.
  - `AI.TABLE.GO_TO_PAGE`: `{ pageIndex }`.
  - `AI.TABLE.SET_PAGE_SIZE`: `{ pageSize }`.
  - `AI.TABLE.SELECT_ROWS`: `{ rowIds: string[] }`.
  - `AI.TABLE.EXECUTE_ROW_ACTION`: `{ rowId, actionId }`.

- **Kanban**
  - `AI.KANBAN.MOVE_CARD`: `{ cardId, fromColumnId, toColumnId, toIndex }`.
  - `AI.KANBAN.UPDATE_CARD`: `{ cardId, patch: Partial<Card> }`.
  - `AI.KANBAN.CREATE_CARD`: `{ columnId, data }`.
  - `AI.KANBAN.DELETE_CARD`: `{ cardId }`.

- **Charts**
  - `AI.CHART.SET_RANGE`: `{ from, to }`.
  - `AI.CHART.TOGGLE_SERIES`: `{ seriesKey, visible }`.
  - `AI.CHART.HIGHLIGHT_POINTS`: `{ ids: string[] }`.

- **Workspace / Navigation**
  - `AI.NAV.ROUTE`: `{ path, params? }` (bọc quanh `NAV.ROUTE`).
  - `AI.WORKSPACE.OPEN_PANEL`: `{ panelId }`.
  - `AI.WORKSPACE.SELECT_BLOCK`: `{ blockId }`.

---

## 6. Kế hoạch triển khai theo phase

### Phase 0 – Chuẩn hoá hạ tầng

- **Mục tiêu:** Đảm bảo core event + socket + middleware đủ sạch để gắn AI.
- **Tasks:**
  - [ ] Rà soát `events/types.ts`, thống nhất việc dùng enum + string type mở rộng.
  - [ ] Hoàn thiện export `middleware/*` và cách attach vào `actionBus` (ví dụ trong bootstrap của app sử dụng SDK).
  - [ ] Định nghĩa type `AiControlMessage`, `AiCommand`, `AiObservation` trong `src/core/ai-control/types.ts`.
  - [ ] Tạo mock socket client cho Storybook (ví dụ `InMemorySocket` hoặc wrapper `socket.io-client`).

### Phase 1 – ActionBus ↔ Socket Bridge (AI-Bridge core)

- **Mục tiêu:** Có cầu nối chuẩn giữa event bus và socket, chưa cần đụng sâu vào module.
- **Tasks:**
  - [ ] Tạo folder `src/core/ai-control/` với các file:
    - `AiControlProvider.tsx`: wrap `SocketProvider` + config (`channels`, `enabled`, ...).
    - `aiBridge.ts`: tạo bridge giữa `ActionBus` và socket dựa trên config mapping.
    - `hooks.ts`: `useAiControl`, `useAiEvents` nếu cần.
  - [ ] Outbound flow:
    - [ ] Dùng `actionBus.subscribeAll` trong `aiBridge` để lắng nghe mọi event.
    - [ ] Áp dụng `piiFilterMiddleware` trước khi gửi nếu chưa đảm bảo.
    - [ ] Map `ActionEvent` → `AiControlMessage` (`direction: 'UI→AI'`) → `socketEmit('ai-events', 'event', msg)`.
    - [ ] Cho phép config filter/whitelist event type.
  - [ ] Inbound flow:
    - [ ] Dùng `useSocketEvent('ai-control', 'command', handler)` (hoặc generic listener) ở cấp `AiControlProvider`.
    - [ ] Validate command, map thành:
      - `ActionEvent` (vd: `type: 'AI.FORM.FILL'`) bắn vào `ActionBus` **hoặc**
      - Gọi trực tiếp `commandHandlers` đã đăng ký per module (xem Phase 2+).

### Phase 2 – AI hoá Form

- **Mục tiêu:** Cho phép AI điền, sửa, submit form một cách an toàn.
- **Tasks:**
  - [ ] Bổ sung prop `instanceId?: string` cho `Form`, nếu không truyền thì tự sinh (vd: `useId`).
  - [ ] Tạo hook `useFormAiControl({ instanceId, methods })`:
    - [ ] Đăng ký handler với AI-Bridge cho các command `AI.FORM.*` target đúng `instanceId`.
    - [ ] Map command → thao tác trên `react-hook-form` (`setValue`, `setFocus`, `handleSubmit`, `reset`...).
  - [ ] Đảm bảo `Form` hiện tại luôn dispatch:
    - `FORM.SUBMIT` (persist, có formData).
    - `FORM.VALIDATE`.
    - `FORM.FIELD_CHANGE` (có thể dispatch từ `Input` qua `UI.CHANGE` + meta instanceId/formId).
  - [ ] Storybook demo:
    - Mock AI response điều khiển `Form` (ví dụ form contact) qua socket nội bộ.

### Phase 3 – AI hoá Table (sau TanStack integration)

- **Mục tiêu:** Để AI điều khiển sorting/filter/pagination/selection trên table.
- **Tasks:**
  - [ ] Sau khi hoàn thành phase 1.2–1.3 trong `TANSTACK_TABLE_PLAN.md`, gom state vào `useReactTable`.
  - [ ] Tạo hook `useTableAiControl({ instanceId, table })`:
    - Outbound:
      - [ ] Lắng nghe thay đổi `sorting`, `columnFilters`, `pagination`, `rowSelection` → dispatch `TABLE.*` events.
    - Inbound:
      - [ ] Map command `AI.TABLE.*` → update state của TanStack Table (`table.setSorting`, `setPageIndex`, ...).
  - [ ] Storybook demo:
    - AI filter danh sách, sort theo cột, chọn một số row (dùng mock command sequence).

### Phase 4 – AI hoá Kanban

- **Mục tiêu:** Cho phép AI tổ chức/congigure board: di chuyển, tạo, sửa card.
- **Tasks:**
  - [ ] Chuẩn hoá event trong `KanbanBoard` + hooks `useKanbanData`:
    - Phát `KANBAN.CARD_MOVE`, `KANBAN.CARD_UPDATE`, `KANBAN.COLUMN_CREATE`, ... khi user thao tác.
  - [ ] Tạo hook `useKanbanAiControl({ instanceId, api })`:
    - `api` có thể là hàm mutate data hiện có (add/update/move card).
    - Inbound command `AI.KANBAN.*` → gọi `api` tương ứng.
  - [ ] Storybook demo:
    - Kịch bản AI tự sắp xếp card theo priority/status.

### Phase 5 – AI hoá Charts & Dashboard Layout

- **Mục tiêu:** Cho phép AI điều chỉnh góc nhìn dữ liệu.
- **Tasks:**
  - [ ] Trong `EChartsBase` và các chart cụ thể, thêm dispatch `CHART.*` khi:
    - Người dùng đổi range, bật/tắt series, zoom, chọn điểm.
  - [ ] Tạo hook `useChartAiControl({ instanceId, chartRef })`:
    - Inbound `AI.CHART.*` → gọi API của ECharts (setOption, dispatchAction) tương ứng.
  - [ ] Cho layout/dashboard:
    - Dùng `NAV.ROUTE`, `WORKSPACE.PANEL_TOGGLE` để AI có thể mở/đóng panel, chuyển tab.

### Phase 6 – Workspace / Chat integration

- **Mục tiêu:** Tích hợp với định hướng trong `GENERIC_WORKSPACE_MODULE.md` để AI agent có thể vừa chat vừa điều khiển UI.
- **Tasks:**
  - [ ] Trong module workspace/chat:
    - Dùng `ActionBus` để log mọi thao tác block/chat như docs đã mô tả.
    - Dùng kênh socket giống với AI-Bridge, để mỗi phiên chat có `correlationId` nối với các hành động UI.
  - [ ] Cung cấp ví dụ: một trang workspace nơi:
    - Bên trái: danh sách tài liệu/bảng.
    - Ở giữa: Table/Form/Kanban.
    - Bên phải: Chat AI; khi user gõ yêu cầu, AI gửi command qua socket điều khiển Table/Form/Kanban.

### Phase 7 – Hardening, security & DX

- **Mục tiêu:** Biến AI control thành feature an toàn, dễ dùng.
- **Tasks:**
  - [ ] **Policy & permission**:
    - Config xác định command nào được phép, cho module nào.
    - Ví dụ: chỉ cho phép `AI.FORM.FILL` nhưng không cho phép `AI.NAV.ROUTE` trong một số màn hình.
  - [ ] **Rate limiting & throttling**:
    - Bảo vệ khỏi spam command từ AI service.
  - [ ] **Observability**:
    - Middleware log riêng cho `AI.*` events, gắn với traceId.
    - Export hook `useAiDebugPanel` để hiển thị log AI command trong Storybook/devtools.
  - [ ] **DX**:
    - Snippet TypeScript cho việc config `AiControlProvider`.
    - Tài liệu mô tả rõ contract socket để backend/AI team implement.

---

## 7. Thay đổi cấu trúc file & public API dự kiến

### 7.1. Cấu trúc file mới

```text
src/
  core/
    ai-control/
      AiControlProvider.tsx
      aiBridge.ts
      hooks.ts
      types.ts
```

- Có thể bổ sung thêm:
  - `src/forms/aiControl.ts` – helper cho Form.
  - `src/kanban/aiControl.ts` – helper cho Kanban.
  - `src/charts/aiControl.ts` – helper cho Charts.

### 7.2. Export public API

- Từ `src/core/index.ts` (nếu có) và `src/index.ts`:
  - Export `AiControlProvider`, `useAiControl`.
  - Export type `AiControlMessage` nếu cần cho side ứng dụng.

### 7.3. Backward compatibility

- Component vẫn hoạt động bình thường **khi không cấu hình socket/AI**.
- AI control chỉ được kích hoạt khi:
  - Bọc app bởi `SocketProvider`/`AiControlProvider`.
  - Truyền `sockets` map đã connect tới AI service.

---

## 8. Milestone & deliverables

- **Milestone 1 – AI-Bridge Core (Phase 0–1)**
  - [x] Module `core/ai-control` với bridge 2 chiều.
  - [x] Storybook demo minimal (log event & command qua mock socket).
- **Milestone 2 – Form AI Control (Phase 2)**
  - [x] `useFormAiControl` + story demo.
  - [ ] Docs ngắn hướng dẫn tích hợp với API backend.
- **Milestone 3 – Table AI Control (Phase 3)**
  - [x] `useTableAiControl` sau khi hoàn thiện TanStack integration.
  - [x] Story: AI lọc/sort/nhấn hành động trên table (demo sort).
- **Milestone 4 – Kanban & Charts (Phase 4–5)**
  - [x] Hooks AI cho Kanban + story demo.
  - [ ] Hooks AI cho Charts.
  - [ ] Demo dashboard nơi AI tối ưu board & chart view.
- **Milestone 5 – Workspace Integration & Hardening (Phase 6–7)**
  - [ ] Workspace page full-stack: Chat + AI control.
  - [ ] Policy, audit log, docs chi tiết cho backend/AI team.
