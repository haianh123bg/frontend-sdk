/**
 * Canvas Grid Types
 * Based on NocoDB Grid Architecture
 */

// Column Types
export enum UITypes {
  SingleLineText = 'SingleLineText',
  LongText = 'LongText',
  Number = 'Number',
  Decimal = 'Decimal',
  Percent = 'Percent',
  Currency = 'Currency',
  Date = 'Date',
  DateTime = 'DateTime',
  Time = 'Time',
  Email = 'Email',
  PhoneNumber = 'PhoneNumber',
  URL = 'URL',
  Checkbox = 'Checkbox',
  MultiSelect = 'MultiSelect',
  SingleSelect = 'SingleSelect',
  Attachment = 'Attachment',
  Rating = 'Rating',
  Formula = 'Formula',
  Rollup = 'Rollup',
  Lookup = 'Lookup',
  LinkToAnotherRecord = 'LinkToAnotherRecord',
  LinkToAnotherRecordShowing = 'LinkToAnotherRecord.Showing',
  Duration = 'Duration',
  Barcode = 'Barcode',
  QRCode = 'QRCode',
  GeoData = 'GeoData',
  JSON = 'JSON',
  Collaborator = 'Collaborator',
  Year = 'Year',
  AI = 'AI',
}

// Column Definition
export interface ColumnType {
  id: string
  title: string
  uidt: UITypes
  width?: number
  position?: number
  column_order?: number
  meta?: Record<string, any>
  pv?: boolean // Primary value
  pk?: boolean // Primary key
  system?: boolean // System column
  readonly?: boolean
  hidden?: boolean
  required?: boolean
  unique?: boolean
}

// Row Definition
export interface Row {
  row: Record<string, any>
  oldRow: Record<string, any>
  rowMeta: RowMeta
}

export interface RowMeta {
  rowIndex?: number
  commentCount?: number
  isNew?: boolean
  isDirty?: boolean
  isValid?: boolean
  errorMessage?: string
  color?: string
}

// Cell Definition
export interface Cell {
  rowIndex: number
  colIndex: number
  column: ColumnType
  value: any
  oldValue: any
  isEdited?: boolean
  isValid?: boolean
  errorMessage?: string
}

// Cell Range for Selection
export interface CellRange {
  startRowIndex: number
  endRowIndex: number
  startColIndex: number
  endColIndex: number
}

// Group By
export interface Group {
  key: string
  column: ColumnType
  value: any
  rows: Row[]
  children?: Group[]
  isExpanded?: boolean
  depth: number
  path: number[]
}

// Pagination
export interface PaginatedType {
  page: number
  pageSize: number
  totalRows: number
  isLastPage: boolean
  isFirstPage: boolean
}

// View Types
export enum ViewTypes {
  GRID = 'grid',
  FORM = 'form',
  GALLERY = 'gallery',
  CALENDAR = 'calendar',
  KANBAN = 'kanban',
  MAP = 'map',
}

export interface ViewType {
  id: string
  title: string
  type: ViewTypes
  order?: number
  show_system_fields?: boolean
  column_order?: string[]
  cover_image_field?: string
  group_by?: GroupByConfig[]
  sort_by?: SortConfig[]
  filter_by?: FilterConfig[]
}

export interface GroupByConfig {
  column_id: string
  order?: number
  sort?: 'asc' | 'desc'
}

export interface SortConfig {
  column_id: string
  direction: 'asc' | 'desc'
}

export interface FilterConfig {
  column_id: string
  operator: string
  value: any
}

// Table Meta
export interface TableType {
  id: string
  title: string
  columns: ColumnType[]
  views: ViewType[]
  meta?: Record<string, any>
}

// Canvas Grid Props
export interface CanvasGridProps extends React.HTMLAttributes<HTMLDivElement> {
  meta: TableType
  view: ViewType
  data: Map<number, Row>
  totalRows: number
  actualTotalRows?: number
  loadData: (params?: any, shouldShowLoading?: boolean) => Promise<Row[]>
  updateOrSaveRow: (
    row: Row,
    property?: string,
    args?: { metaValue?: TableType; viewMetaValue?: ViewType }
  ) => Promise<any>
  deleteRow?: (rowIndex: number) => Promise<void>
  addEmptyRow?: (addAfter?: number) => Row | undefined
  expandForm?: (row: Row, state?: Record<string, any>) => void
  bulkUpdateRows?: (
    rows: Row[],
    props: string[],
    metas?: { metaValue?: TableType; viewMetaValue?: ViewType }
  ) => Promise<void>
  deleteSelectedRows?: () => Promise<void>
  rowHeightEnum?: number
  readOnly?: boolean
  disableSkeleton?: boolean
  isPublic?: boolean
  isGroupBy?: boolean
  groupDataCache?: Map<string, any>
}

// Canvas Grid State
export interface CanvasGridState {
  scrollLeft: number
  scrollTop: number
  width: number
  height: number
  hoveredCell: { rowIndex: number; colIndex: number } | null
  selectedCell: { rowIndex: number; colIndex: number } | null
  selectedRange: CellRange | null
  editingCell: { rowIndex: number; colIndex: number } | null
  isDragging: boolean
  dragType: 'column' | 'row' | 'fill' | null
}

// Cell Renderer Props
export interface CellRendererProps {
  value: any
  column: ColumnType
  row: Row
  rowIndex: number
  colIndex: number
  isEditing: boolean
  isSelected: boolean
  readonly?: boolean
  onChange?: (value: any) => void
  onSave?: () => void
  onCancel?: () => void
}

// Canvas Context
export interface CanvasContext {
  canvas: HTMLCanvasElement | null
  ctx: CanvasRenderingContext2D | null
  offscreenCanvas: HTMLCanvasElement | null
  offscreenCtx: CanvasRenderingContext2D | null
}

// Grid Layout
export interface GridLayout {
  columnHeaderHeight: number
  rowHeight: number
  rowMetaWidth: number
  addNewColumnWidth: number
  cellPadding: number
  groupHeaderHeight: number
  aggregationHeight: number
}

// Navigation Direction
export enum NavigateDir {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
}

// Event Types
export enum GridEventType {
  CELL_CLICK = 'cellClick',
  CELL_DOUBLE_CLICK = 'cellDoubleClick',
  CELL_RIGHT_CLICK = 'cellRightClick',
  CELL_EDIT = 'cellEdit',
  CELL_CHANGE = 'cellChange',
  ROW_CLICK = 'rowClick',
  ROW_DOUBLE_CLICK = 'rowDoubleClick',
  COLUMN_CLICK = 'columnClick',
  COLUMN_RIGHT_CLICK = 'columnRightClick',
  SELECTION_CHANGE = 'selectionChange',
  SCROLL = 'scroll',
  DATA_LOAD = 'dataLoad',
  ROW_ADD = 'rowAdd',
  ROW_DELETE = 'rowDelete',
  COLUMN_RESIZE = 'columnResize',
  COLUMN_REORDER = 'columnReorder',
}

export interface GridEvent {
  type: GridEventType
  payload: any
  timestamp: number
}
