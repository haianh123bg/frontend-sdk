# Kế hoạch mở rộng frontend components cho SDK

## 1. Mục tiêu

- Bổ sung các component frontend thuần UI để:
  - Dựng nhanh layout trang (shell, navigation, flow).
  - Cải thiện UX cho form, bảng, kanban, dashboard.
  - Chuẩn hoá các pattern lặp lại (wizard/steps, card, empty state, skeleton…)
- Giữ phong cách hiện tại: Tailwind + clsx + twMerge, ưu tiên composable, không gài state business.

## 2. Phạm vi & ưu tiên

### 2.1. Phase 1 – Flow & Steps (ưu tiên cao)

Tập trung vào luồng nhiều bước (wizard, onboarding), tận dụng `components/molecules/Steps`.

- **Components chính**
  - `Steps` (container) – nếu chưa có: nhận danh sách step và render `Step` theo hướng ngang/dọc.
  - `Stepper` / `StepHeader`
    - API thân thiện cho case phổ biến: truyền `steps`, `currentStep`, `onStepClick?`.
  - `StepNavigation`
    - Thanh điều hướng dưới cùng: nút Back / Next / Submit, disabled logic theo props.
- **Mục tiêu**
  - Dùng được cho: Form nhiều bước, Roadmap flow, onboarding checklist.
  - Không phụ thuộc AI, chỉ thuần UI + callback.

### 2.2. Phase 2 – Data Display & Feedback

Tăng khả năng dựng dashboard và trang detail.

- **Components chính**
  - `StatCard` / `KPICard` – card hiển thị 1–2 KPI + icon + trend.
  - `EmptyState` – trạng thái không có dữ liệu: icon + title + description + optional action.
  - `Skeleton` – placeholder loading cho list, card, table row.
  - `DescriptionList` – hiển thị cặp label–value dạng grid.
- **Use cases**
  - Trang dashboard KPI, màn detail user/order, state loading/no-data thống nhất.

### 2.3. Phase 3 – Layout & Navigation

Chuẩn hoá shell cho các ứng dụng dùng SDK.

- **Components chính**
  - `AppShell` / `PageLayout` – khung trang: header + sidebar + content + footer.
  - `SidebarNav` – menu sidebar nhiều cấp, trạng thái active, icon.
  - `TopNav` – thanh trên cùng: title, breadcrumb slot, action buttons.
- **Mục tiêu**
  - Dễ wrap bất kỳ page nào chỉ với vài props/slot.

### 2.4. Phase 4 – Table & Kanban tooling

Hoàn thiện hệ sinh thái xung quanh Table và Kanban.

- **Table**
  - `TableToolbar` – thanh action phía trên bảng: search, filter, export, column toggle.
  - `ColumnVisibilityToggle` – dropdown chọn cột hiển thị.
- **Kanban**
  - `KanbanBoardToolbar` – filter theo assignee/status, sort theo priority/deadline.
  - `Checklist` / `SubtasksList` – list checkbox dùng trong card/task detail.

## 3. Thiết kế API tổng quát (Phase 1)

### 3.1. `Step` (hiện có)

- Đã tồn tại `components/molecules/Steps/Step.tsx` với props:
  - `index`, `title`, `description?`, `status?: 'completed' | 'current' | 'waiting'`,
  - `direction?: 'horizontal' | 'vertical'`, `isLast?: boolean`, `variant?`.
- Sẽ giữ nguyên API, chỉ bổ sung container bên ngoài.

### 3.2. `Steps` (container)

- **Props gợi ý**
  - `steps: { title: string; description?: string; status?: StepStatus; variant?: StepVariant }[]`
  - `current?: number` – index step hiện tại (0-based).
  - `direction?: 'horizontal' | 'vertical'`.
  - `onStepClick?: (index: number) => void`.
  - `className?`.
- **Hành vi**
  - Mặc định: mọi step trước `current` → `completed`, step `current` → `current`, phía sau → `waiting`.
  - Cho phép override `status` từng step nếu truyền vào.

### 3.3. `StepNavigation`

- **Props gợi ý**
  - `current: number`
  - `total: number`
  - `canNext?: boolean` (ví dụ dựa trên validate ngoài).
  - `canPrev?: boolean`
  - `onPrev?: () => void`
  - `onNext?: () => void`
  - `onSubmit?: () => void`
  - `labels?: { prev?: string; next?: string; submit?: string }`.
- **Hành vi**
  - Nếu `current === 0` → nút Back disabled/ẩn.
  - Nếu `current < total - 1` → hiển thị Next.
  - Nếu `current === total - 1` → hiển thị Submit.

## 4. Lộ trình triển khai

### Sprint 1

- [ ] Tạo `docs/FRONTEND_COMPONENT_PLAN.md` (file này).
- [ ] Implement `Steps` container + `StepNavigation` trong `components/molecules/Steps/`.
- [ ] Thêm Storybook story cho Steps/Stepper (horizontal + vertical, với StepNavigation).
- [ ] Export `Steps`/`StepNavigation` từ `src/components/...` và `src/index.ts`.

### Sprint 2

- [ ] Implement `StatCard`, `EmptyState`, `Skeleton` cơ bản.
- [ ] Storybook cho từng component.

### Sprint 3

- [ ] Implement `AppShell` / `PageLayout`, `SidebarNav`.
- [ ] Demo layout kết hợp với Table, Form, Kanban hiện có.

### Sprint 4

- [ ] Implement `TableToolbar`, `ColumnVisibilityToggle`.
- [ ] Implement `KanbanBoardToolbar`, `Checklist/SubtasksList`.

## 5. Nguyên tắc triển khai

- Tuân thủ code style hiện tại: TypeScript + React.FC + Tailwind + clsx + twMerge.
- Component stateless tối đa, nhận state & handler qua props.
- Không tự ý gắn thêm middleware/ActionBus/AI vào các component UI này (nếu cần sẽ có layer khác).
