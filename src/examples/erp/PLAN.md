# Kế hoạch Triển khai Giao diện ERP

Hệ thống ERP (Enterprise Resource Planning) yêu cầu các giao diện phức tạp để quản lý dữ liệu lớn, quy trình làm việc và báo cáo. Dưới đây là phân tích và kế hoạch triển khai các component mẫu cho các phân hệ chính.

## 1. Phân hệ HRM (Nhân sự)
**Yêu cầu:** Quản lý danh sách nhân viên, chấm công, tiền lương.
**Component đề xuất:** `EmployeeTable`
- **Tính năng:**
  - Danh sách nhân viên dạng bảng (Table).
  - Tìm kiếm và lọc theo phòng ban, trạng thái (Active/Inactive).
  - Avatar nhân viên và thông tin liên hệ.
  - Các hành động: Chỉnh sửa, Xóa, Xem chi tiết.
- **Components sử dụng:** `Table`, `Avatar`, `Badge`, `Button`, `Input`, `Select`.

## 2. Phân hệ CRM (Quản lý Khách hàng)
**Yêu cầu:** Quản lý quy trình bán hàng (Deals), thông tin khách hàng.
**Component đề xuất:** `DealPipeline` (dạng Kanban hoặc List) & `CustomerCard`
- **Tính năng:**
  - Hiển thị các cơ hội bán hàng theo giai đoạn (New, Qualification, Negotiation, Won/Lost).
  - Thông tin nhanh về giá trị hợp đồng, người phụ trách.
- **Components sử dụng:** `Card`, `Badge`, `AvatarGroup`, `Progress` (xác suất thành công).

## 3. Phân hệ Finance (Tài chính - Kế toán)
**Yêu cầu:** Quản lý hóa đơn, công nợ.
**Component đề xuất:** `InvoiceDetail`
- **Tính năng:**
  - Header hóa đơn (Thông tin khách hàng, ngày tháng, số HD).
  - Bảng chi tiết hạng mục (Item, Qty, Price, Total).
  - Tổng cộng tiền hàng, thuế, giảm giá.
  - Trạng thái thanh toán (Paid, Pending, Overdue).
- **Components sử dụng:** `Card`, `Table` (simple version), `Badge`, `Button` (Print/Download).

## 4. Phân hệ Inventory (Kho vận)
**Yêu cầu:** Quản lý tồn kho, nhập/xuất.
**Component đề xuất:** `InventoryDashboard`
- **Tính năng:**
  - Widget thống kê tồn kho (Low stock alerts).
  - Danh sách sản phẩm với hình ảnh và số lượng tồn.
- **Components sử dụng:** `StatCard`, `Table`, `Image`, `Progress` (Stock level).

## Kế hoạch thực hiện
1.  **HRM**: Tạo `src/examples/erp/hrm/EmployeeList.tsx`
2.  **CRM**: Tạo `src/examples/erp/crm/DealBoard.tsx`
3.  **Finance**: Tạo `src/examples/erp/finance/Invoice.tsx`
4.  **Inventory**: Tạo `src/examples/erp/inventory/InventoryDashboard.tsx`
5.  **Storybook**: Tạo `src/examples/erp/ERP.stories.tsx` để demo tất cả.
