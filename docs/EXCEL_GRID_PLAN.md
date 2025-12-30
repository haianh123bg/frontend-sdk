# Kế hoạch triển khai ExcelGrid (Spreadsheet chuẩn Excel)

## Mục tiêu
Triển khai một grid kiểu Excel với:
- UI giống Excel (header A/B/C…, row numbers, gridlines, active/selection border, fill handle).
- Tương tác giống Excel (kéo chọn vùng, Shift mở rộng vùng, keyboard nav, edit như Excel).
- Vô hạn “mềm”:
  - Auto-expand khi scroll/paste/edit.
  - Có giới hạn `maxRow`/`maxCol` để tránh kéo vô tận.
- Paste behavior giống Excel: **tile theo selection**.

## Lý do tách component mới
`SpreadsheetGrid` hiện tại phù hợp với mô hình “table theo schema” (TanStack Table + ColumnDef cố định). Yêu cầu “vô hạn hàng/cột” và selection/copy/paste kiểu Excel cần data model 2D (sparse) + virtualization 2 chiều.

=> Giữ `SpreadsheetGrid` hiện tại cho use-case table.
=> Tạo component mới: `ExcelGrid` (tên tạm) đặt cùng module SpreadsheetGrid để tái sử dụng formula engine.

## API đề xuất (v1)

### Types
- `CellKey`: `${row}:${col}` (0-based)
- `ExcelGridCellValue`: `string | number | boolean | null`
- `ExcelGridCells`: `Record<string, ExcelGridCellValue>`
- `ExcelGridCellAddress`: `{ row: number; col: number }`
- `ExcelGridRange`: `{ start: ExcelGridCellAddress; end: ExcelGridCellAddress }`

### Props core
- `value?: ExcelGridCells`
- `defaultValue?: ExcelGridCells`
- `onValueChange?: (next: ExcelGridCells) => void`

### Kích thước & vô hạn mềm
- `height?: number`
- `initialRowCount?: number` (default 50)
- `initialColCount?: number` (default 26)
- `maxRow?: number` (default 10000)
- `maxCol?: number` (default 200)
- `expandStepRow?: number` (default 50)
- `expandStepCol?: number` (default 10)
- `expandThresholdPx?: number` (default 300)

### UI
- `rowHeight?: number` (default 32)
- `colWidth?: number` (default 120)
- `rowNumberWidth?: number` (default 56)
- `headerHeight?: number` (default 36)
- `showRowNumbers?: boolean` (default true)
- `showColumnLetters?: boolean` (default true)

### Interaction
- Selection (v1: internal state, v2: controlled):
  - `onSelectionChange?: (next: ExcelGridRange | null) => void`
  - `onActiveCellChange?: (next: ExcelGridCellAddress | null) => void`
- `editable?: boolean` (default true)
- `enableCopyPaste?: boolean` (default true)

### Formulas (phase sau)
- `enableFormulas?: boolean` (default false)

## Phases triển khai

### Phase 1 — Scaffold + vô hạn mềm + 2D virtualization
- Render header letters + row numbers + corner.
- 2D virtualization (rows + cols) với `@tanstack/react-virtual`.
- Auto-expand khi scroll gần đáy/phải (tôn trọng `maxRow/maxCol`).
- Active cell + basic edit (double click / Enter / F2).

### Phase 2 — UI Excel chuẩn
- Gridlines chuẩn.
- Active border rõ + selection background/border.
- Fill handle (UI).
- Highlight header/row-number khi active/selection.

### Phase 3 — Interaction Excel
- Kéo chuột chọn vùng.
- Shift + click/arrow để mở rộng selection.
- Copy theo vùng (TSV).
- Paste tile theo selection.
- Auto-expand theo paste/edit.
- Auto-scroll khi drag selection.

### Phase 4 — Performance & resize
- Resize column/row.
- Tối ưu render cell (memo, batching updates).

### Phase 5 — Excel polish
- Formula bar.
- Fill handle auto-fill series.
- Tests (selection math, tile paste, clipboard parse).

## Acceptance criteria (v1)
- UI: header letters + row numbers + corner sticky; active cell border; selection range highlight.
- Interaction: drag select + shift select; copy/paste vùng; paste tile theo selection.
- Vô hạn mềm: auto-expand khi scroll/paste/edit nhưng không vượt `maxRow/maxCol`.
- Performance: scroll mượt với data sparse.
