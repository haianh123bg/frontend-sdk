# Kanban Module Plan

## 1. Phạm vi & mục tiêu

- Xây dựng bộ Kanban Board (Board/Column/Card/Modal/Form) tái sử dụng, hỗ trợ:
  - Schema động từ backend (fields + mappings) để render card & form.
  - Drag & drop giữa các cột + reorder trong cột.
  - Optimistic UI + rollback khi API lỗi.
  - Realtime sync qua socket (WS/SSE wrapper `core/socket`).
  - Virtualization cho lists lớn.
  - Theming, render props, permissions, i18n.

Ba phase chính:

- **Phase A – Drag & Drop + Optimistic UI + onMove**  
  Tập trung vào trải nghiệm kéo thả, cập nhật lạc quan state local và wire `onMove`.
- **Phase B – TaskForm auto-gen + create/edit modal**  
  Tự động生成 form theo `schema.fields`, hỗ trợ create/edit task, wire `onCreate`/`onUpdate`.
- **Phase C – Realtime sync (socket)**  
  Nghe event từ backend theo `RealtimeConfig`, merge state an toàn.

---

## 2. Phase A – Drag & Drop + Optimistic UI + onMove

### 2.1 Mục tiêu

- Cho phép:
  - Kéo thả card trong cùng cột để đổi thứ tự.
  - Kéo card sang cột khác để đổi trạng thái (update field `columnKey`).
- Sau khi thả:
  - UI cập nhật ngay lập tức (optimistic) qua `moveItemLocal`.
  - Gọi callback `onMove(id, from, to, position)` để host sync backend.
  - Nếu API lỗi → rollback về state cũ.
- Hỗ trợ keyboard drag thông qua `KeyboardSensor` của dnd-kit.

### 2.2 Thiết kế kỹ thuật

- **Thư viện:** `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`.
- **Hook & state đã có:**
  - `useKanbanData`:
    - `state: KanbanBoardState` (columns + itemsById).
    - `moveItemLocal`, `replaceState`, `getItemById`.
- **Tích hợp DnD:**
  - Trong `KanbanBoard`:
    - Tạo `sensors` bằng `useSensors(PointerSensor, KeyboardSensor)`.
    - Wrap phần list cột bằng `<DndContext sensors={sensors} onDragEnd={handleDragEnd}>`.
  - Trong `KanbanColumn`:
    - Wrap list card bằng `<SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>`.
    - Tạo `SortableKanbanCard` dùng `useSortable({ id: item.id })` để:
      - Set `ref`, `attributes`, `listeners` vào wrapper `<div>`.
      - Áp dụng `transform`, `transition` từ `CSS.Transform.toString(transform)`.
      - Bọc `KanbanCard` bên trong (vẫn giữ `onClick` để mở detail).
    - Hỗ trợ cả chế độ thường và virtualized (với `virtualRow.start` kết hợp cùng transform).

### 2.3 Thuật toán `onDragEnd`

Pseudo:

1. Lấy `active.id`, `over.id` từ `DragEndEvent`.
2. Nếu không có `over` hoặc `active.id === over.id` → bỏ qua.
3. Tìm trong `state.columns`:
   - `fromColumnKey`, `fromIndex` nơi `activeId` đang nằm.
   - `toColumnKey`, `toIndex` nơi `overId` đang nằm.
4. Nếu không tìm được from/to → return.
5. Tính `position = toIndex`.
6. Lưu `prevState = state`.
7. Gọi `moveItemLocal(activeId, { columnKey: fromColumnKey }, { columnKey: toColumnKey }, position)` để update UI ngay.
8. Nếu có `onMove`:
   - Gọi `await onMove(activeId, from, to, position)`.
   - Nếu throw:
     - Gọi `replaceState(prevState)` để rollback.
     - Dispatch telemetry `SYSTEM_ERROR` qua `useDispatchAction`.

### 2.4 Công việc chi tiết

- [x] Thiết kế `KanbanSchema`, `KanbanMappings`, `KanbanBoardProps`, `KanbanBoardState`, `MoveLocation` (đã làm).
- [x] Implement `useKanbanData` với `moveItemLocal`, `replaceState` (đã làm).
- [ ] Thêm deps dnd-kit vào `package.json`.
- [ ] Cập nhật `KanbanBoard.tsx`:
  - [ ] Import `DndContext`, `PointerSensor`, `KeyboardSensor`, `useSensors`, `useSensor`, `DragEndEvent`.
  - [ ] Import `SortableContext`, `useSortable`, `verticalListSortingStrategy`, `CSS`, `sortableKeyboardCoordinates`.
  - [ ] Tạo `SortableKanbanCard` + tích hợp vào `KanbanColumn`.
  - [ ] Tạo `sensors` và `handleDragEnd` với optimistic + rollback.
  - [ ] Wrap columns bằng `<DndContext>`.
- [ ] Kiểm thử manual:
  - [ ] Kéo card trong cùng cột, verify thứ tự đổi.
  - [ ] Kéo card sang cột khác, verify cột source/target cập nhật.
  - [ ] Thử lỗi giả lập trong `onMove` để kiểm tra rollback.

---

## 3. Phase B – TaskForm auto-gen + create/edit modal

### 3.1 Mục tiêu

- Tạo `TaskForm` auto-gen từ `schema.fields`, dùng stack `forms/` hiện có.
- Hỗ trợ create (nút "Thêm task") + edit (ở Detail/Modal) với:
  - Validation dựa trên schema (required/min/max/pattern).
  - Render phù hợp cho từng type (string, number, date, enum, relation, boolean, richtext, file).
- Wire với `onCreate`/`onUpdate` + optimistic update vào `useKanbanData`.

### 3.2 Thiết kế kỹ thuật (high-level)

- **Form layer:**
  - Tận dụng `Form`, `FormField`, `Select`, `DatePicker`, `FileUploader`, `Switch`, `Textarea` từ `forms/`.
  - Có thể thêm helper map `KanbanFieldSchema` → component form.
- **TaskForm component:**
  - Props: `schema`, `mappings`, `defaultValues?`, `mode: 'create' | 'edit'`, `onSubmit`.
  - Loop `schema.fields`, render field theo `field.type`.
  - Cho phép host override renderer per-field (vd. prop `fieldRenderers` trong KanbanBoard sau này).
- **Create/Edit flow:**
  - Nút "Thêm task" trên `KanbanBoard` → mở `TaskModal` create.
  - Click card → DetailModal có nút "Sửa" để mở form edit.
  - Submit:
    - Gọi `onCreate` / `onUpdate` (async) từ props.
    - Optimistic: dùng `addItemLocal` / `updateItemLocal`, rollback nếu lỗi.

### 3.3 Công việc chi tiết

- [ ] Tạo `TaskForm` (organism hoặc trong module Kanban) dựng form từ schema.
- [ ] Tạo `TaskModal` bọc `TaskForm` cho create/edit.
- [ ] Tích hợp với `KanbanBoard` (nút tạo + nút edit trong DetailModal).
- [ ] Wire `onCreate`/`onUpdate` với optimistic update.

---

## 4. Phase C – Realtime sync (socket)

### 4.1 Mục tiêu

- Tự động cập nhật board khi backend phát event realtime:
  - `task_created`, `task_updated`, `task_moved`, `task_deleted`.
- Dựa trên `RealtimeConfig` + `core/socket` (`SocketProvider`, `useSocketEvent`, `useSocketEmit`).
- Đảm bảo không apply event trùng (dựa trên `eventId`/timestamp – tuỳ backend thiết kế).

### 4.2 Thiết kế kỹ thuật (high-level)

- **Hook `useRealtimeKanban`** (trong `src/kanban/hooks/useRealtime.ts`):
  - Input: `realtimeConfig`, `addItemLocal`, `updateItemLocal`, `moveItemLocal`, `removeItemLocal`.
  - Dùng `useSocketEvent` để subscribe trên `realtime.channel` + events:
    - map `listenEvents.created` → handler thêm item.
    - map `listenEvents.updated` → handler cập nhật item.
    - map `listenEvents.moved` → handler gọi `moveItemLocal`.
    - map `listenEvents.deleted` → handler xoá item.
  - Có cơ chế dedupe theo `eventId` hoặc `timestamp` nếu payload có.
- **Emit phía client (optional):**
  - Dùng `useSocketEmit` nếu muốn gửi event khi user kéo thả/ tạo/ sửa.

### 4.3 Công việc chi tiết

- [ ] Thiết kế type payload realtime (tối thiểu: `id`, `type`, `data`, `from`, `to`, `position`, `eventId`, `timestamp`).
- [ ] Implement `useRealtimeKanban` và tích hợp vào `KanbanBoard` khi props `realtime` được cung cấp.
- [ ] Test với Socket giả (story/Mock) để đảm bảo merge state đúng và không loop vô hạn.

---

## 5. Ghi chú

- Giai đoạn đầu ưu tiên Phase A để có UX Kanban cơ bản hoạt động.
- Phase B/C có thể triển khai dần nhưng nên giữ API `KanbanBoardProps` ổn định.
- Virtualization + Drag & drop: ưu tiên hoạt động ổn trong lists trung bình; với lists cực lớn có thể khuyến nghị tắt DnD hoặc tune thêm.
