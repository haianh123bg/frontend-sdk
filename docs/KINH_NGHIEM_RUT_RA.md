# Kinh nghiệm rút ra (để tránh lặp lại lỗi)

## Mục tiêu
- Ghi lại các lỗi/điểm đau đã gặp khi refactor UI component (đặc biệt dạng dropdown/filter/kanban) để lần sau làm nhanh và đúng chuẩn.
- Chuẩn hoá cách thêm props, xử lý i18n, tránh lỗi UI/UX (2-layer dropdown, cắt chữ, scrollbar xấu, …).

## Checklist trước khi refactor component UI
### API & Backward compatibility
- **Giữ nguyên API public** nếu component đã được dùng ở nhiều nơi.
- Nếu cần thêm chức năng, ưu tiên **additive change**:
  - Thêm prop mới có **default**.
  - Tránh đổi tên prop/cấu trúc data nếu không thật sự cần.
- Nếu buộc phải breaking-change: tạo layer tương thích hoặc tách version.

### UI/UX dropdown/select
- Tránh tình huống **dropdown lồng dropdown** (MenuDropdown mở rồi lại mở Select) gây UX “2 lớp”.
  - Nếu dữ liệu đơn giản (enum/boolean), ưu tiên render list trực tiếp trong dropdown.
- Dropdown list:
  - **Không cắt chữ** với dữ liệu ngắn nhưng quan trọng (operator/option).
  - Dropdown nên có width hợp lý: **min bằng trigger**, nhưng có thể **nở theo nội dung** (có giới hạn max).
- Scrollbar:
  - Nếu dropdown bo góc, cần `overflow-hidden` ở container để scrollbar không “lọt” ra ngoài.
  - Ưu tiên dùng component chung `Scroll` để đồng nhất behaviour.

### i18n
- Tất cả label/placeholder/operator name phải **cấu hình được từ ngoài**.
- Luôn có **default i18n** để không bắt buộc truyền.
- Khi merge i18n:
  - Merge sâu cho các nhánh object (vd `operators`).

### Kiểu dữ liệu & editor
- Xác định rõ `valueType` theo operator: `none | single | multi | range`.
- Khi đổi operator phải **normalize value** theo `valueType` mới (tránh state “rác”).
- Với `date/datetime`:
  - UX tốt hơn khi **hiển thị trực tiếp panel chọn ngày/giờ** trong filter dropdown thay vì chỉ input.
  - Nếu component picker chưa hỗ trợ, thêm prop `inline` (additive) để tái sử dụng.

## Kinh nghiệm refactor lớn (tách file/component)
- Tách component nội bộ ra file riêng để:
  - Dễ đọc, dễ test.
  - Giảm diff “khổng lồ” khi chỉnh sửa UI nhỏ.
- Quy trình an toàn:
  - (1) Đọc types & public props.
  - (2) Tách component theo “khối logic” (Card/Column/Modal), giữ nguyên props.
  - (3) Sửa file gốc chỉ còn wiring/logic.
  - (4) Build/Storybook check.

## Storybook “đủ” nên có gì
- **Basic**: cấu hình phổ biến.
- **Empty**: không có item.
- **Many items**: dữ liệu dài để test overflow/scroll.
- **Virtualized**: bật virtualization.
- **Custom renderCard / renderColumnHeader**: test extension point.
- **Permissions**: canCreate/canMove…

## Những lỗi cụ thể đã gặp & cách tránh
### 1) Scrollbar của dropdown bị lọt khỏi bo góc
- Nguyên nhân: container dropdown không `overflow-hidden`, danh sách dùng `overflow-auto` trực tiếp.
- Cách tránh:
  - Container bo góc: thêm `overflow-hidden`.
  - Danh sách dùng `Scroll` chung.

### 2) Dropdown quá hẹp làm cắt chữ option/operator
- Nguyên nhân: dropdown bị khoá `w-full` theo trigger, option dùng `truncate`.
- Cách tránh:
  - Width: `min-w-full` + `w-max` + `max-w`.
  - Text: dùng `whitespace-nowrap` (hoặc wrap nếu phù hợp).

### 3) Date/Datetime filter chỉ hiện input, không “mở sẵn” chọn ngày
- Nguyên nhân: picker thiết kế theo trigger->dropdown.
- Cách tránh:
  - Thêm `inline` (additive) để render trực tiếp panel.

---

## Ghi chú
- Tài liệu này là living document: mỗi lần gặp lỗi mới, bổ sung thêm case + cách fix.
