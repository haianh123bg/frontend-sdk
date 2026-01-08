/**
 * Canvas Grid Helper Functions
 */

import { UITypes, type ColumnType, type Row } from '../types'
import { GRID_COLORS, DEFAULT_FONT_FAMILY, DEFAULT_FONT_SIZE, FONT_WEIGHT } from './constants'

// Text Measurement Cache
const textMeasurementCache = new Map<string, number>()

/**
 * Clear text measurement cache
 */
export function clearTextCache(): void {
  textMeasurementCache.clear()
}

/**
 * Get canvas 2D context with default settings
 */
export function getDefaultCanvasContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  const ctx = canvas.getContext('2d', { alpha: false })
  if (!ctx) throw new Error('Failed to get 2D context')

  ctx.font = `${DEFAULT_FONT_SIZE}px ${DEFAULT_FONT_FAMILY}`
  ctx.textBaseline = 'middle'
  return ctx
}

/**
 * Measure text width
 */
export function measureTextWidth(
  text: string,
  ctx: CanvasRenderingContext2D,
  maxWidth?: number
): number {
  if (!text) return 0

  const cacheKey = `${text}_${ctx.font}_${maxWidth || 'auto'}`
  const cached = textMeasurementCache.get(cacheKey)
  if (cached !== undefined) return cached

  let width = ctx.measureText(text).width

  if (maxWidth && width > maxWidth) {
    // Calculate truncated width
    const ellipsis = '...'
    const ellipsisWidth = ctx.measureText(ellipsis).width
    let truncatedText = text

    while (truncatedText.length > 0 && width > maxWidth) {
      truncatedText = truncatedText.slice(0, -1)
      width = ctx.measureText(truncatedText).width + ellipsisWidth
    }
  }

  textMeasurementCache.set(cacheKey, width)
  return width
}

/**
 * Render single line text with truncation
 */
export function renderSingleLineText(
  ctx: CanvasRenderingContext2D,
  props: {
    text: string
    x: number
    y: number
    maxWidth?: number
    color?: string
    fontSize?: number
    fontWeight?: string
    underline?: boolean
    strikethrough?: boolean
  }
): { text: string; width: number; isTruncated: boolean } {
  const {
    text,
    x,
    y,
    maxWidth,
    color = GRID_COLORS.TEXT,
    fontSize = DEFAULT_FONT_SIZE,
    fontWeight = FONT_WEIGHT.NORMAL,
    underline = false,
    strikethrough = false,
  } = props

  ctx.save()
  ctx.font = `${fontWeight} ${fontSize}px ${DEFAULT_FONT_FAMILY}`
  ctx.fillStyle = color

  let displayText = text
  let isTruncated = false

  if (maxWidth) {
    const textWidth = measureTextWidth(text, ctx, maxWidth)
    if (textWidth > maxWidth) {
      displayText = truncateText(ctx, text, maxWidth)
      isTruncated = true
    }
  }

  ctx.fillText(displayText, x, y)

  // Draw underline
  if (underline) {
    const textWidth = measureTextWidth(displayText, ctx)
    const lineWidth = 1
    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth
    ctx.beginPath()
    ctx.moveTo(x, y + fontSize / 2 + 2)
    ctx.lineTo(x + textWidth, y + fontSize / 2 + 2)
    ctx.stroke()
  }

  // Draw strikethrough
  if (strikethrough) {
    const textWidth = measureTextWidth(displayText, ctx)
    ctx.strokeStyle = color
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + textWidth, y)
    ctx.stroke()
  }

  ctx.restore()

  return {
    text: displayText,
    width: measureTextWidth(displayText, ctx),
    isTruncated,
  }
}

/**
 * Truncate text to fit max width
 */
export function truncateText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  suffix = '...'
): string {
  if (measureTextWidth(text, ctx) <= maxWidth) return text

  const suffixWidth = measureTextWidth(suffix, ctx)
  let truncatedText = text

  while (truncatedText.length > 0) {
    truncatedText = truncatedText.slice(0, -1)
    if (measureTextWidth(truncatedText, ctx) + suffixWidth <= maxWidth) {
      return truncatedText + suffix
    }
  }

  return suffix
}

/**
 * Render rectangle with border
 */
export function renderRectangle(
  ctx: CanvasRenderingContext2D,
  props: {
    x: number
    y: number
    width: number
    height: number
    fillStyle?: string | CanvasGradient | CanvasPattern
    borderColor?: string
    borderWidth?: number
    radius?: number
  }
): void {
  const {
    x,
    y,
    width,
    height,
    fillStyle,
    borderColor = GRID_COLORS.BORDER,
    borderWidth = 1,
    radius = 0,
  } = props

  ctx.save()

  if (radius > 0) {
    ctx.beginPath()
    ctx.roundRect(x, y, width, height, radius)
  } else {
    ctx.beginPath()
    ctx.rect(x, y, width, height)
  }

  if (fillStyle) {
    ctx.fillStyle = fillStyle
    ctx.fill()
  }

  if (borderWidth > 0) {
    ctx.strokeStyle = borderColor
    ctx.lineWidth = borderWidth
    ctx.stroke()
  }

  ctx.restore()
}

/**
 * Check if point is inside box
 */
export function isPointInBox(
  x: number,
  y: number,
  boxX: number,
  boxY: number,
  boxWidth: number,
  boxHeight: number
): boolean {
  return x >= boxX && x <= boxX + boxWidth && y >= boxY && y <= boxY + boxHeight
}

/**
 * Get cell at position
 */
export function getCellAtPosition(
  x: number,
  y: number,
  columns: ColumnType[],
  rowHeight: number,
  columnHeaderHeight: number,
  rowMetaWidth: number
): { rowIndex: number; colIndex: number } | null {
  // Check if in header
  if (y < columnHeaderHeight) return null

  // Calculate row index
  const rowIndex = Math.floor((y - columnHeaderHeight) / rowHeight)

  // Calculate col index
  let currentX = rowMetaWidth
  for (let colIndex = 0; colIndex < columns.length; colIndex++) {
    const colWidth = columns[colIndex].width || 200
    if (x >= currentX && x < currentX + colWidth) {
      return { rowIndex, colIndex }
    }
    currentX += colWidth
  }

  return null
}

/**
 * Parse cell value to display text
 */
export function getCellDisplayValue(column: ColumnType, value: any): string {
  if (value === null || value === undefined) return ''

  switch (column.uidt) {
    case UITypes.Checkbox:
      return value ? '✓' : ''

    case UITypes.Date:
    case UITypes.DateTime:
    case UITypes.Time:
      return value instanceof Date ? value.toLocaleString() : String(value)

    case UITypes.MultiSelect:
    case UITypes.SingleSelect:
      if (Array.isArray(value)) {
        return value.map((v) => (typeof v === 'object' ? v.title : v)).join(', ')
      }
      return typeof value === 'object' ? value.title || '' : String(value)

    case UITypes.Attachment:
      return Array.isArray(value) ? `${value.length} files` : String(value)

    case UITypes.Rating:
      return '⭐'.repeat(value || 0)

    case UITypes.Percent:
      return `${value}%`

    case UITypes.Currency:
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(value)

    case UITypes.Collaborator:
      if (Array.isArray(value)) {
        return value.map((v) => (typeof v === 'object' ? v.display_name || v.email : v)).join(', ')
      }
      return typeof value === 'object' ? value.display_name || value.email || '' : String(value)

    case UITypes.LinkToAnotherRecord:
      if (Array.isArray(value)) {
        return value.map((v) => (typeof v === 'object' ? v.title || v.id : v)).join(', ')
      }
      return typeof value === 'object' ? value.title || String(value?.id || '') : String(value)

    default:
      return String(value)
  }
}

/**
 * Check if column is editable
 */
export function isColumnEditable(column: ColumnType): boolean {
  return !column.system && !column.readonly && column.uidt !== UITypes.Formula
}

/**
 * Check if column is virtual
 */
export function isVirtualColumn(column: ColumnType): boolean {
  return [
    UITypes.Formula,
    UITypes.Rollup,
    UITypes.Lookup,
    UITypes.LinkToAnotherRecordShowing,
  ].includes(column.uidt)
}

/**
 * Get default value for column type
 */
export function getDefaultValueForColumn(column: ColumnType): any {
  switch (column.uidt) {
    case UITypes.Checkbox:
      return false

    case UITypes.Number:
    case UITypes.Decimal:
    case UITypes.Percent:
    case UITypes.Currency:
    case UITypes.Rating:
    case UITypes.Year:
      return 0

    case UITypes.MultiSelect:
    case UITypes.Attachment:
    case UITypes.LinkToAnotherRecord:
    case UITypes.Collaborator:
      return []

    case UITypes.SingleSelect:
      return null

    case UITypes.Date:
    case UITypes.DateTime:
    case UITypes.Time:
      return new Date()

    default:
      return ''
  }
}

/**
 * Format row meta cell content
 */
export function formatRowMetaCell(row: Row): string {
  if (row.rowMeta.isNew) return '⭐'
  if (row.rowMeta.isDirty) return '●'
  if (row.rowMeta.commentCount) return '💬'
  return ''
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Get default column width for UI type
 */
export function getDefaultColumnWidth(uidt: UITypes): number {
  const widths: Record<UITypes, number> = {
    [UITypes.SingleLineText]: 200,
    [UITypes.LongText]: 300,
    [UITypes.Number]: 120,
    [UITypes.Decimal]: 120,
    [UITypes.Percent]: 120,
    [UITypes.Currency]: 140,
    [UITypes.Date]: 150,
    [UITypes.DateTime]: 180,
    [UITypes.Time]: 120,
    [UITypes.Email]: 200,
    [UITypes.PhoneNumber]: 150,
    [UITypes.URL]: 250,
    [UITypes.Checkbox]: 80,
    [UITypes.MultiSelect]: 200,
    [UITypes.SingleSelect]: 180,
    [UITypes.Attachment]: 200,
    [UITypes.Rating]: 150,
    [UITypes.Formula]: 150,
    [UITypes.Rollup]: 150,
    [UITypes.Lookup]: 150,
    [UITypes.LinkToAnotherRecord]: 200,
    [UITypes.Duration]: 120,
    [UITypes.Barcode]: 150,
    [UITypes.QRCode]: 150,
    [UITypes.GeoData]: 200,
    [UITypes.JSON]: 250,
    [UITypes.Collaborator]: 200,
    [UITypes.Year]: 100,
    [UITypes.AI]: 200,
    [UITypes.LinkToAnotherRecordShowing]: 200,
  }

  return widths[uidt] || 200
}

/**
 * Get cell type icon
 */
export function getCellTypeIcon(uidt: UITypes): string {
  const icons: Record<UITypes, string> = {
    [UITypes.SingleLineText]: '📝',
    [UITypes.LongText]: '📄',
    [UITypes.Number]: '🔢',
    [UITypes.Decimal]: '🔢',
    [UITypes.Percent]: '💯',
    [UITypes.Currency]: '💰',
    [UITypes.Date]: '📅',
    [UITypes.DateTime]: '📅',
    [UITypes.Time]: '⏰',
    [UITypes.Email]: '📧',
    [UITypes.PhoneNumber]: '📱',
    [UITypes.URL]: '🔗',
    [UITypes.Checkbox]: '☑️',
    [UITypes.MultiSelect]: '🏷️',
    [UITypes.SingleSelect]: '🏷️',
    [UITypes.Attachment]: '📎',
    [UITypes.Rating]: '⭐',
    [UITypes.Formula]: '🧮',
    [UITypes.Rollup]: '📊',
    [UITypes.Lookup]: '🔍',
    [UITypes.LinkToAnotherRecord]: '🔗',
    [UITypes.Duration]: '⏱️',
    [UITypes.Barcode]: '📊',
    [UITypes.QRCode]: '📱',
    [UITypes.GeoData]: '📍',
    [UITypes.JSON]: '📋',
    [UITypes.Collaborator]: '👤',
    [UITypes.Year]: '📆',
    [UITypes.AI]: '🤖',
    [UITypes.LinkToAnotherRecordShowing]: '🔗',
  }

  return icons[uidt] || '📄'
}
