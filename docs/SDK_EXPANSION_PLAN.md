# Kế hoạch mở rộng thư viện UI/SDK

## 1. Bối cảnh & trạng thái hiện tại
- **Table**: Đã tích hợp `@tanstack/react-table` cơ bản (sort, pagination), có `TableToolbar` (search/filter/ẩn cột), `Pagination` mới. Chưa hoàn thiện lộ trình TanStack (row selection, column visibility control, multi-sort, server-side mode, virtualization).
- **Form**: Đang dựa trên `react-hook-form`, đã có lộ trình Zod + controller trong `docs/form-roadmap.md` nhưng chưa triển khai.
- **Select**: Đã có `SelectLazy` và story lazy loading (infinite scroll) để hỗ trợ danh sách lớn.
- **Atoms/Molecules mới**: DropdownMenu, Avatar, Tag, EmptyState, Alert, Steps… đã sẵn, cần đưa vào use-case thực tế và Storybook.
- **Docs**: Đã có `TANSTACK_TABLE_PLAN.md` và `form-roadmap.md` làm kế hoạch chi tiết cho từng mảng.

## 2. Mục tiêu tổng
1. Hoàn thiện Table thế hệ mới dựa trên TanStack, sẵn sàng cho dataset lớn và server-side.
2. Chuẩn hóa Form với Zod + controller, hiển thị lỗi rõ ràng và tích hợp API.
3. Củng cố DX: Storybook đầy đủ, ví dụ end-to-end, telemetry sự kiện nhất quán.
4. Ổn định chất lượng: test, loại bỏ regression, cải thiện a11y.

## 3. Lộ trình đề xuất (ưu tiên theo giai đoạn)
### Giai đoạn A — Table nâng cao (ưu tiên cao)
- [ ] Hoàn tất **Phase 1.2–1.3** trong `TANSTACK_TABLE_PLAN.md`: state sorting/pagination/globalFilter, row selection cơ bản, multi-sort, global search.
- [ ] **Row Selection**: cột checkbox + expose `rowSelection` + callback `onRowSelectionChange`.
- [ ] **Column Visibility**: prop `enableColumnVisibility`; nối với `TableToolbar` để toggle cột (sync state `columnVisibility`).
- [ ] **Pagination & page size**: kiểm thử `Pagination` + `Select` page size; đảm bảo `onPageChange` đồng bộ.
- [ ] Stories: tạo story đầy đủ (selection, column toggle, multi-sort) + kiểm thử event dispatch (UI_CLICK meta).

### Giai đoạn B — Table performance & enterprise
- [ ] **Server-side mode**: props `manualPagination`, `manualSorting`, `pageCount`; không tự slice/sort; demo với mock API.
- [ ] **Virtualization**: tích hợp `@tanstack/react-virtual` cho 10k+ rows; story lớn dữ liệu.
- [ ] **Grouping/Expanding** (optional): group theo cột, sub-rows demo.

### Giai đoạn C — Form + Zod
- [ ] Thêm deps `zod`, `@hookform/resolvers`.
- [ ] Tạo helper `useZodForm` (theo `form-roadmap.md`), export public API.
- [ ] Tạo `FormFieldController` + `FormErrorBanner`.
- [ ] Story `WithZodAndErrors` và `WithApiErrors` (mock lỗi server, setError).
- [ ] Docs: thêm section Form + Zod + API trong README/docs.

### Giai đoạn D — Input lớn & Select
- [ ] Mở rộng `SelectLazy`: hỗ trợ server-side search param, debounce, loading indicator rõ ràng, empty state.
- [ ] Tạo story thực tế: tìm user/option lớn, demo scroll + load thêm.
- [ ] Kiểm tra a11y: keyboard navigation, ARIA cho Select/DropdownMenu.

### Giai đoạn E — Component polishing & DX
- [ ] Dùng components mới (Avatar, Tag, EmptyState, Alert, Steps) trong các template/table empty state.
- [ ] Củng cố `TableToolbar`: animation mở search/filter, đóng khi blur, keyboard trap tối thiểu.
- [ ] Telemetry: thống nhất meta `{ component, action }` cho UI_CLICK/UI_CHANGE.

### Giai đoạn F — Testing & chất lượng
- [ ] Unit tests cho Table logic (sorting/pagination manual), Form helpers.
- [ ] Storybook interaction tests (play function) cho Table selection & column toggle.
- [ ] Kiểm thử hiệu năng với dataset mock 10k rows; đo FPS khi scroll.
- [ ] Accessibility pass: heading/role/aria-label cho table controls, focus ring.

## 4. Phân bổ công việc ngắn hạn (đề xuất sprint 2–3 tuần)
1. **Sprint 1**: Table Phase A (row selection, column visibility, multi-sort) + stories.
2. **Sprint 2**: Table server-side + virtualization demo; bắt đầu Form deps + `useZodForm`.
3. **Sprint 3**: Form controllers + stories lỗi API; polish SelectLazy; DX/a11y/telemetry.
4. **Sprint 4**: Testing (unit + Storybook interaction), docs hoàn thiện, performance review.

## 5. Rủi ro & lưu ý
- Bundle size tăng (Zod, resolvers, react-virtual); cân nhắc code-splitting hoặc export tùy chọn.
- Breaking change Table: giữ backward compatibility; hỗ trợ controlled/ uncontrolled states.
- Hiệu năng Table: tránh re-render do prop thay đổi; memo columnDefs; virtualization cho data lớn.
- A11y: Table/Select/Dropdown cần roles/aria; keyboard navigation cho filter/search.

## 6. Tiêu chí hoàn thành
- Table hỗ trợ: sort/multi-sort, pagination, selection, column visibility, server/manual mode, virtualization demo.
- Form: Zod validation + controller + hiển thị lỗi rõ ràng + ví dụ API.
- Storybook: kịch bản đầy đủ cho mỗi tính năng; interaction tests cơ bản pass.
- Docs cập nhật: hướng dẫn Table nâng cao, Form + Zod, SelectLazy large data.
- Telemetry ổn định, không crash, không regression UI.
