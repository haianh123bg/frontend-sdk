# Kế Hoạch Triển Khai TanStack Table

Tài liệu này mô tả lộ trình tích hợp thư viện `@tanstack/react-table` (React Table v8) vào component `Table` hiện có trong `src/components/organisms/Table/Table.tsx`. Mục tiêu là tận dụng sức mạnh xử lý dữ liệu của TanStack Table trong khi vẫn giữ nguyên (hoặc nâng cấp nhẹ) giao diện UI/UX hiện tại.

---

## Phase 1: Full TanStack Integration (Core & Advanced)

**Mục tiêu:** Triển khai toàn bộ sức mạnh xử lý của TanStack Table, thay thế hoàn toàn logic cũ. Tích hợp sẵn Sorting, Pagination, Filtering, và Row Selection.

- [x] **1.1. Cài đặt Dependencies**
  - Thêm `@tanstack/react-table` vào `package.json`.
  - Thêm `@tanstack/react-virtual` vào `package.json`.

- [ ] **1.2. Refactor `Table.tsx` - Full Logic**
  - Cấu hình `useReactTable` với đầy đủ models:
    - `getCoreRowModel`
    - `getSortedRowModel` (Multi-sort support)
    - `getPaginationRowModel`
    - `getFilteredRowModel` (Global filter support)
  - State Management:
    - `sorting`, `pagination`, `rowSelection`, `globalFilter`.
  - Mapping UI:
    - Render Header với `table.getHeaderGroups()` (hỗ trợ sort, resize nếu cần).
    - Render Body với `table.getRowModel().rows` (hỗ trợ selection row).
    - Render Footer với `Pagination` component kết nối `table` API.

- [ ] **1.3. Tính năng nâng cao tích hợp sẵn**
  - **Row Selection:** Thêm cột checkbox tự động nếu có prop `enableRowSelection`.
  - **Global Search:** Expose prop `globalFilter` và `onGlobalFilterChange`.
  - **Multi-sort:** Hỗ trợ Shift+Click sort nhiều cột.

---

## Phase 2: Advanced Features (Tính Năng Nâng Cao)

**Mục tiêu:** Mở rộng các tính năng mà TanStack hỗ trợ tốt nhưng `Table` cũ chưa có hoặc làm chưa tới.

- [ ] **2.1. Row Selection (Chọn hàng)**
  - Thêm prop `enableRowSelection`.
  - Render checkbox ở cột đầu tiên (nếu bật).
  - Expose state `rowSelection` ra ngoài (callback `onRowSelectionChange` hoặc controlled state).

- [ ] **2.2. Column Visibility (Ẩn/Hiện cột)**
  - Thêm prop `enableColumnVisibility`.
  - Tạo UI (ví dụ: một Dropdown Menu ở Toolbar) để toggle các cột.

- [ ] **2.3. Multi-column Sorting**
  - Cho phép sort nhiều cột cùng lúc (giữ Shift + Click).
  - Hiển thị số thứ tự sort (1, 2, ...) trên header nếu cần.

- [ ] **2.4. Column Resizing (Tùy chọn)**
  - Nếu cần thiết, thêm handler để kéo thả độ rộng cột.

---

## Phase 3: Enterprise / Performance Features

**Mục tiêu:** Tối ưu cho dữ liệu lớn và các use-case phức tạp.

- [ ] **3.1. Server-side Pagination/Sorting/Filtering**
  - Hỗ trợ chế độ "manual": Table chỉ hiển thị dữ liệu được truyền vào, không tự slice/sort.
  - Props: `pageCount`, `manualPagination`, `manualSorting`.

- [ ] **3.2. Virtualization (Optional)**
  - Tích hợp `@tanstack/react-virtual` nếu cần render danh sách cực lớn (10k+ rows).

- [ ] **3.3. Grouping / Expanding**
  - Hỗ trợ gom nhóm theo cột.
  - Hỗ trợ hàng cha - con (Sub-components).

---

## Hướng dẫn kiểm thử (Verification)

Sau mỗi phase, cần kiểm tra lại với Storybook:
1. **Basic Table:** Kiểm tra hiển thị, sort 1 cột.
2. **Pagination:** Kiểm tra chuyển trang, đổi page size.
3. **Selection:** Kiểm tra chọn 1 dòng, chọn tất cả.
4. **Large Data:** Kiểm tra hiệu năng với 1000+ dòng (nếu có).
