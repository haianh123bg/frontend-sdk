/**
 * Canvas Grid Constants
 * Based on NocoDB Grid Constants
 */

// Layout Constants
export const COLUMN_HEADER_HEIGHT_IN_PX = 32
export const ROW_HEIGHT_IN_PX: Record<number, number> = {
  1: 32, // Small
  2: 40, // Medium
  4: 64, // Large
  6: 96, // Extra Large
}
export const ROW_META_COLUMN_WIDTH = 48
export const ADD_NEW_COLUMN_WIDTH = 150
export const AGGREGATION_HEIGHT = 32
export const GROUP_HEADER_HEIGHT = 40
export const GROUP_PADDING = 16
export const CELL_PADDING = 8

// Border Constants
export const CELL_BOTTOM_BORDER_IN_PX = 1
export const ROW_COLOR_BORDER_WIDTH = 3

// Font Constants
export const DEFAULT_FONT_FAMILY = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
export const DEFAULT_FONT_SIZE = 13
export const HEADER_FONT_SIZE = 12
export const FONT_WEIGHT = {
  NORMAL: 'normal' as const,
  BOLD: 'bold' as const,
}

// Color Constants
export const GRID_COLORS = {
  BORDER: '#e5e7eb', // gray-200
  BORDER_DARK: '#d1d5db', // gray-300
  HEADER_BG: '#f9fafb', // gray-50
  HEADER_TEXT: '#374151', // gray-700
  CELL_BG: '#ffffff',
  CELL_BG_HOVER: '#f3f4f6', // gray-100
  CELL_BG_SELECTED: '#dbeafe', // blue-100
  CELL_BG_EDITING: '#ffffff',
  TEXT: '#111827', // gray-900
  TEXT_DISABLED: '#9ca3af', // gray-400
  PLACEHOLDER: '#9ca3af', // gray-400
  ERROR: '#ef4444', // red-500
  WARNING: '#f59e0b', // amber-500
  SUCCESS: '#10b981', // emerald-500
  GROUP_HEADER_BG: '#f3f4f6', // gray-100
  GROUP_HEADER_BORDER: '#e5e7eb', // gray-200
  NEW_ROW_INDICATOR: '#3b82f6', // blue-500
}

// Selection Colors
export const SELECTION_COLORS = {
  PRIMARY: '#3b82f6', // blue-500
  PRIMARY_LIGHT: 'rgba(59, 130, 246, 0.1)',
  BORDER: '#3b82f6',
}

// Scroll Constants
export const SCROLL_THRESHOLD = 100
export const VIRTUAL_ROW_OVERSCAN = 5
export const VIRTUAL_COL_OVERSCAN = 3

// Performance Constants
export const MAX_CACHED_ROWS = 1000
export const MAX_CACHED_CELLS = 5000
export const DEBOUNCE_SCROLL_MS = 16
export const THROTTLE_RESIZE_MS = 100

// Edit Constants
export const EDIT_INTERACTABLE = true
export const NO_EDITABLE_CELL = ['formula', 'rollup', 'lookup', 'created_at', 'updated_at']

// Fill Handle Constants
export const FILL_HANDLE_SIZE = 8
export const FILL_HANDLE_CORNER_SIZE = 6

// Copy Paste Constants
export const COPY_PASTE_DELIMITER = '\t'
export const COPY_PASTE_NEWLINE = '\n'

// Validation Constants
export const MAX_SELECTED_ROWS = 1000
export const MAX_SELECTED_CELLS = 10000

// Animation Constants
export const ANIMATION_DURATION_MS = 200
export const HOVER_DELAY_MS = 150

// Default Column Widths
export const DEFAULT_COLUMN_WIDTHS: Record<string, number> = {
  default: 200,
}

// Cell Type Icons (emoji representations)
export const CELL_TYPE_ICONS: Record<string, string> = {}
