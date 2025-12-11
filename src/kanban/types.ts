// File: src/kanban/types.ts
import type * as React from 'react'

export type KanbanFieldType =
  | 'string'
  | 'text'
  | 'number'
  | 'date'
  | 'datetime'
  | 'boolean'
  | 'enum'
  | 'relation'
  | 'user'
  | 'richtext'
  | 'file'
  | 'uuid'
  | string

export interface KanbanFieldSchema {
  name: string
  type: KanbanFieldType
  label?: string
  description?: string
  enumValues?: string[]
  relationTable?: string
  isRequired?: boolean
  defaultValue?: unknown
  min?: number
  max?: number
  pattern?: string
  metadata?: Record<string, any>
}

export interface KanbanFieldMappings {
  /**
   * Trường dùng làm khoá cột (ví dụ: "status"). Các giá trị khác nhau tạo thành các column.
   */
  columnKey?: string
  /**
   * (Tuỳ chọn) Trường để group theo swimlane, ví dụ: "assignee" hoặc "project".
   */
  swimlaneKey?: string
  /**
   * Trường hiển thị làm title chính trên card.
   */
  cardTitle?: string
  /**
   * Trường hiển thị làm subtitle (thường là assignee hoặc project).
   */
  cardSubtitle?: string
  /**
   * Danh sách các trường hiển thị ở phần meta (dueDate, priority,...).
   */
  cardMeta?: string[]
  /**
   * Trường chứa avatar (URL hoặc object user có avatar) để hiển thị trên card.
   */
  cardAvatar?: string
  /**
   * Trường chứa tags/labels.
   */
  cardTags?: string | string[]
  /**
   * Trường ID duy nhất cho mỗi item. Mặc định là "id" nếu không cấu hình.
   */
  idField?: string
}

export interface KanbanSchema {
  table: string
  fields: KanbanFieldSchema[]
  defaultMappings?: KanbanFieldMappings
}

export type KanbanMappings = KanbanFieldMappings

export interface KanbanColumnConfig {
  /**
   * ID duy nhất của column trong board.
   */
  id: string
  /**
   * Giá trị thực tế của field columnKey (ví dụ: "todo", "doing").
   */
  value: string
  /**
   * Nhãn hiển thị cho column.
   */
  label: string
  /**
   * Thứ tự sắp xếp cột.
   */
  order?: number
  /**
   * Ẩn/hiện cột.
   */
  visible?: boolean
  /**
   * Màu accent cho cột (tuỳ host quy ước, ví dụ: token hoặc mã màu). 
   */
  color?: string
  /**
   * Meta bổ sung cho host app.
   */
  meta?: Record<string, any>
}

export interface KanbanItem {
  id: string
  /**
   * Dữ liệu gốc theo schema backend.
   */
  data: Record<string, any>
}

export interface KanbanColumnState {
  key: string
  config: KanbanColumnConfig
  itemIds: string[]
  totalCount: number
  hasMore?: boolean
  loadingMore?: boolean
}

export interface KanbanBoardState {
  itemsById: Record<string, KanbanItem>
  columns: KanbanColumnState[]
}

export interface MoveLocation {
  columnKey: string
  swimlaneKey?: string
}

export type BulkActionType = 'move' | 'assign' | 'change_status' | 'delete' | string

export interface BulkAction {
  type: BulkActionType
  label?: string
  payload?: any
}

export interface RealtimeConfig {
  /**
   * Tên channel (map với SocketChannel trong core/socket) để lắng nghe sự kiện realtime.
   */
  channel: string
  /**
   * Prefix hoặc namespace cho event (ví dụ: "tasks").
   */
  eventPrefix?: string
  listenEvents?: {
    created?: string
    updated?: string
    moved?: string
    deleted?: string
  }
  emitEvents?: {
    create?: string
    update?: string
    move?: string
    delete?: string
  }
}

export type FieldPermissionMode = 'hidden' | 'readonly' | 'editable'

export interface Permissions {
  canCreate?: boolean
  canEdit?: boolean
  canMove?: boolean
  canDelete?: boolean
  canComment?: boolean
  canAttach?: boolean
  fieldPermissions?: Record<string, FieldPermissionMode>
}

export interface KanbanBoardProps {
  schema: KanbanSchema
  mappings?: KanbanMappings
  columns?: KanbanColumnConfig[]
  items: Record<string, any>[]
  onLoadMore?: (columnKey: string, cursor?: string) => Promise<Record<string, any>[]>
  onCreate?: (payload: any) => Promise<any>
  onUpdate?: (id: string, patch: any) => Promise<any>
  onMove?: (id: string, from: MoveLocation, to: MoveLocation, position: number) => Promise<any>
  onBulkAction?: (ids: string[], action: BulkAction) => Promise<any>
  realtime?: RealtimeConfig
  renderCard?: (item: any, defaultRender: () => JSX.Element) => JSX.Element
  renderColumnHeader?: (column: KanbanColumnConfig, defaultRender: () => JSX.Element) => JSX.Element
  pageSize?: number
  virtualization?: boolean
  permissions?: Permissions
  locale?: string
  className?: string
  style?: React.CSSProperties
  orientation?: 'horizontal' | 'vertical'
  instanceId?: string
}
