import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useVirtualizer } from '@tanstack/react-virtual'
import { Scroll } from '../../atoms/Scroll/Scroll'
import { createFormulaRuntime, isFormulaError } from './formulaEngine'

export type ExcelGridCellValue = string | number | boolean | null
export type ExcelGridCells = Record<string, ExcelGridCellValue>

export type ExcelGridCellAddress = { row: number; col: number }
export type ExcelGridRange = { start: ExcelGridCellAddress; end: ExcelGridCellAddress }

export interface ExcelGridProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'defaultValue' | 'defaultChecked' | 'value' | 'onChange'> {
  value?: ExcelGridCells
  defaultValue?: ExcelGridCells
  onValueChange?: (next: ExcelGridCells) => void

  height?: number

  initialRowCount?: number
  initialColCount?: number
  maxRow?: number
  maxCol?: number
  expandStepRow?: number
  expandStepCol?: number
  expandThresholdPx?: number

  rowHeight?: number
  colWidth?: number
  headerHeight?: number
  rowNumberWidth?: number

  showRowNumbers?: boolean
  showColumnLetters?: boolean

  editable?: boolean
  enableCopyPaste?: boolean
  enableFormulas?: boolean
  initialColWidths?: Record<number, number>
  onColWidthChange?: (widths: Record<number, number>) => void
}

const cellKey = (row: number, col: number) => `${row}:${col}`

const indexToColumnLetter = (index: number) => {
  let n = index
  let s = ''
  while (n >= 0) {
    s = String.fromCharCode((n % 26) + 65) + s
    n = Math.floor(n / 26) - 1
  }
  return s
}

const normalizeRange = (range: ExcelGridRange) => {
  const top = Math.min(range.start.row, range.end.row)
  const bottom = Math.max(range.start.row, range.end.row)
  const left = Math.min(range.start.col, range.end.col)
  const right = Math.max(range.start.col, range.end.col)
  return { top, bottom, left, right }
}

const mod = (n: number, m: number) => ((n % m) + m) % m

const parseClipboardGrid = (text: string) => {
  const normalized = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
  const rows = normalized.split('\n')
  const trimmed = rows.length > 1 && rows[rows.length - 1] === '' ? rows.slice(0, -1) : rows
  return trimmed.map((line) => line.split('\t'))
}

const parseCellText = (text: string): ExcelGridCellValue => {
  const raw = text ?? ''
  const trimmed = String(raw).trim()
  if (!trimmed) return null
  if (trimmed.startsWith('=')) return String(raw)

  const lower = trimmed.toLowerCase()
  if (lower === 'true') return true
  if (lower === 'false') return false

  const n = Number(trimmed)
  if (Number.isFinite(n) && trimmed !== '') return n

  return String(raw)
}

export function ExcelGrid({
  className,
  value,
  defaultValue,
  onValueChange,
  height = 520,
  initialRowCount = 50,
  initialColCount = 26,
  maxRow = 10000,
  maxCol = 200,
  expandStepRow = 50,
  expandStepCol = 10,
  expandThresholdPx = 300,
  rowHeight = 32,
  colWidth = 120,
  headerHeight = 36,
  rowNumberWidth = 56,
  showRowNumbers = true,
  showColumnLetters = true,
  editable = true,
  enableCopyPaste = true,
  enableFormulas = false,
  initialColWidths,
  onColWidthChange,
  ...props
}: ExcelGridProps) {
  const isControlled = value !== undefined
  const [internalCells, setInternalCells] = React.useState<ExcelGridCells>(defaultValue ?? {})
  const cells = isControlled ? (value ?? {}) : internalCells

  const [rowCount, setRowCount] = React.useState(() => Math.min(Math.max(1, initialRowCount), maxRow))
  const [colCount, setColCount] = React.useState(() => Math.min(Math.max(1, initialColCount), maxCol))
  const [colWidths, setColWidths] = React.useState<Record<number, number>>(initialColWidths ?? {})

  const [activeCell, setActiveCell] = React.useState<ExcelGridCellAddress | null>({ row: 0, col: 0 })
  const [selectionAnchor, setSelectionAnchor] = React.useState<ExcelGridCellAddress | null>({ row: 0, col: 0 })
  const [selection, setSelection] = React.useState<ExcelGridRange | null>(
    activeCell ? { start: activeCell, end: activeCell } : null
  )

  const [editingCell, setEditingCell] = React.useState<ExcelGridCellAddress | null>(null)
  const [editingValue, setEditingValue] = React.useState('')

  const [dragMode, setDragMode] = React.useState<'select' | 'fill' | 'col' | 'row' | null>(null)
  const dragPointerRef = React.useRef<{ x: number; y: number } | null>(null)
  const dragHeaderAnchorRef = React.useRef<number | null>(null)
  const autoScrollRafRef = React.useRef<number | null>(null)

  const [resizingCol, setResizingCol] = React.useState<{ index: number; startX: number; startWidth: number } | null>(
    null
  )

  const [hoveredResizeCol, setHoveredResizeCol] = React.useState<number | null>(null)

  const [fillPreview, setFillPreview] = React.useState<{ top: number; bottom: number; left: number; right: number } | null>(null)
  const fillPreviewRef = React.useRef<{ top: number; bottom: number; left: number; right: number } | null>(null)

  const rootRef = React.useRef<HTMLDivElement | null>(null)
  const scrollRef = React.useRef<HTMLDivElement | null>(null)
  const editorRef = React.useRef<HTMLInputElement | null>(null)

  const setNextCells = React.useCallback(
    (updater: (prev: ExcelGridCells) => ExcelGridCells) => {
      const prev = cells
      const next = updater(prev)
      if (!isControlled) setInternalCells(next)
      onValueChange?.(next)
    },
    [cells, isControlled, onValueChange]
  )

  const getCellRaw = React.useCallback(
    (row: number, col: number) => {
      return cells[cellKey(row, col)] ?? null
    },
    [cells]
  )

  const formulaRuntime = React.useMemo(() => {
    if (!enableFormulas) return null
    return createFormulaRuntime({
      rowCount,
      colCount,
      getCellRaw,
    })
  }, [colCount, enableFormulas, getCellRaw, rowCount])

  const expandToInclude = React.useCallback(
    (row: number, col: number) => {
      setRowCount((prev) => Math.min(maxRow, Math.max(prev, row + 1)))
      setColCount((prev) => Math.min(maxCol, Math.max(prev, col + 1)))
    },
    [maxCol, maxRow]
  )

  const updateActiveCell = React.useCallback(
    (next: ExcelGridCellAddress, opts?: { extendSelection?: boolean }) => {
      expandToInclude(next.row, next.col)
      setActiveCell(next)

      if (!opts?.extendSelection) {
        setSelectionAnchor(next)
        setSelection({ start: next, end: next })
        return
      }

      const anchor = selectionAnchor ?? next
      setSelection({ start: anchor, end: next })
    },
    [expandToInclude, selectionAnchor]
  )

  const beginEdit = React.useCallback(
    (cell: ExcelGridCellAddress) => {
      if (!editable) return
      expandToInclude(cell.row, cell.col)

      const raw = getCellRaw(cell.row, cell.col)
      setEditingValue(raw === null || raw === undefined ? '' : String(raw))
      setEditingCell(cell)
    },
    [editable, expandToInclude, getCellRaw]
  )

  const commitEdit = React.useCallback(() => {
    if (!editingCell) return
    const r = editingCell.row
    const c = editingCell.col
    const parsed = parseCellText(editingValue)

    setNextCells((prev) => {
      const next: ExcelGridCells = { ...prev }
      const k = cellKey(r, c)
      if (parsed === null || parsed === '') {
        delete next[k]
      } else {
        next[k] = parsed
      }
      return next
    })

    setEditingCell(null)
  }, [editingCell, editingValue, setNextCells])

  const cancelEdit = React.useCallback(() => {
    setEditingCell(null)
  }, [])

  React.useEffect(() => {
    if (!editingCell) return
    if (typeof window === 'undefined') return
    const id = window.setTimeout(() => {
      editorRef.current?.focus()
      editorRef.current?.select()
    }, 0)
    return () => window.clearTimeout(id)
  }, [editingCell])

  React.useEffect(() => {
    if (!resizingCol) return
    const onMove = (e: MouseEvent) => {
      const delta = e.clientX - resizingCol.startX
      const newWidth = Math.max(40, resizingCol.startWidth + delta)
      setColWidths((prev) => {
        const next = { ...prev, [resizingCol.index]: newWidth }
        return next
      })
    }
    const onUp = () => {
      setResizingCol(null)
      onColWidthChange?.(colWidths)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
  }, [colWidths, onColWidthChange, resizingCol])

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => rowHeight,
    overscan: 12,
  })

  const colVirtualizer = useVirtualizer({
    horizontal: true,
    count: colCount,
    getScrollElement: () => scrollRef.current,
    estimateSize: (index) => colWidths[index] ?? colWidth,
    overscan: 8,
  })

  const virtualRows = rowVirtualizer.getVirtualItems()
  const virtualCols = colVirtualizer.getVirtualItems()

  const totalRowsSize = rowVirtualizer.getTotalSize()
  const totalColsSize = colVirtualizer.getTotalSize()

  const gridTop = showColumnLetters ? headerHeight : 0
  const gridLeft = showRowNumbers ? rowNumberWidth : 0

  const selectionNorm = React.useMemo(() => (selection ? normalizeRange(selection) : null), [selection])

  const computeFillPreview = React.useCallback(
    (target: ExcelGridCellAddress) => {
      if (!selectionNorm) return null
      const top = Math.min(selectionNorm.top, target.row)
      const bottom = Math.max(selectionNorm.bottom, target.row)
      const left = Math.min(selectionNorm.left, target.col)
      const right = Math.max(selectionNorm.right, target.col)
      const same =
        top === selectionNorm.top &&
        bottom === selectionNorm.bottom &&
        left === selectionNorm.left &&
        right === selectionNorm.right
      return same ? null : { top, bottom, left, right }
    },
    [selectionNorm]
  )

  const applyFill = React.useCallback(
    (rect: { top: number; bottom: number; left: number; right: number }) => {
      if (!selectionNorm) return

      expandToInclude(rect.bottom, rect.right)

      const srcTop = selectionNorm.top
      const srcBottom = selectionNorm.bottom
      const srcLeft = selectionNorm.left
      const srcRight = selectionNorm.right
      const srcH = srcBottom - srcTop + 1
      const srcW = srcRight - srcLeft + 1

      setNextCells((prev) => {
        const next: ExcelGridCells = { ...prev }

        for (let r = rect.top; r <= rect.bottom; r += 1) {
          for (let c = rect.left; c <= rect.right; c += 1) {
            const inSrc = r >= srcTop && r <= srcBottom && c >= srcLeft && c <= srcRight
            if (inSrc) continue

            const sr = srcTop + mod(r - srcTop, srcH)
            const sc = srcLeft + mod(c - srcLeft, srcW)
            const v = prev[cellKey(sr, sc)]
            const k = cellKey(r, c)

            if (v === null || v === undefined) {
              delete next[k]
            } else {
              next[k] = v
            }
          }
        }

        return next
      })

      setSelection({ start: { row: rect.top, col: rect.left }, end: { row: rect.bottom, col: rect.right } })
    },
    [expandToInclude, selectionNorm, setNextCells]
  )

  React.useEffect(() => {
    if (!dragMode) return
    if (typeof document === 'undefined') return

    const getCellFromPoint = (x: number, y: number) => {
      const el = document.elementFromPoint(x, y) as HTMLElement | null
      const cellEl = el?.closest?.('[data-excel-grid-cell]') as HTMLElement | null
      const raw = cellEl?.getAttribute?.('data-excel-grid-cell')
      if (!raw) return null
      const [rs, cs] = raw.split(':')
      const r = Number(rs)
      const c = Number(cs)
      if (!Number.isFinite(r) || !Number.isFinite(c)) return null
      return { row: r, col: c }
    }

    const tickAutoScroll = () => {
      if (!dragMode) return
      const el = scrollRef.current
      const p = dragPointerRef.current
      if (!el || !p) return

      const rect = el.getBoundingClientRect()
      const threshold = 48
      const maxSpeed = 24

      let dx = 0
      let dy = 0

      if (p.x < rect.left + threshold) {
        dx = -maxSpeed * (1 - (p.x - rect.left) / threshold)
      } else if (p.x > rect.right - threshold) {
        dx = maxSpeed * (1 - (rect.right - p.x) / threshold)
      }

      if (p.y < rect.top + threshold) {
        dy = -maxSpeed * (1 - (p.y - rect.top) / threshold)
      } else if (p.y > rect.bottom - threshold) {
        dy = maxSpeed * (1 - (rect.bottom - p.y) / threshold)
      }

      if (dx !== 0) el.scrollLeft += dx
      if (dy !== 0) el.scrollTop += dy

      autoScrollRafRef.current = window.requestAnimationFrame(tickAutoScroll)
    }

    const onMove = (ev: MouseEvent) => {
      dragPointerRef.current = { x: ev.clientX, y: ev.clientY }
      const cell = getCellFromPoint(ev.clientX, ev.clientY)
      if (!cell) return

      if (dragMode === 'select') {
        updateActiveCell(cell, { extendSelection: true })
        return
      }

      if (dragMode === 'fill') {
        const preview = computeFillPreview(cell)
        fillPreviewRef.current = preview
        setFillPreview(preview)
        return
      }

      if (dragMode === 'col') {
        const anchor = dragHeaderAnchorRef.current
        if (anchor == null) return
        const start = Math.min(anchor, cell.col)
        const end = Math.max(anchor, cell.col)
        setActiveCell({ row: 0, col: cell.col })
        setSelection({ start: { row: 0, col: start }, end: { row: rowCount - 1, col: end } })
        return
      }

      if (dragMode === 'row') {
        const anchor = dragHeaderAnchorRef.current
        if (anchor == null) return
        const start = Math.min(anchor, cell.row)
        const end = Math.max(anchor, cell.row)
        setActiveCell({ row: cell.row, col: 0 })
        setSelection({ start: { row: start, col: 0 }, end: { row: end, col: colCount - 1 } })
      }
    }

    const onUp = () => {
      if (dragMode === 'fill') {
        const rect = fillPreviewRef.current
        if (rect) applyFill(rect)
      }

      setDragMode(null)
      dragHeaderAnchorRef.current = null
      fillPreviewRef.current = null
      setFillPreview(null)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
    autoScrollRafRef.current = window.requestAnimationFrame(tickAutoScroll)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
      if (autoScrollRafRef.current != null) {
        window.cancelAnimationFrame(autoScrollRafRef.current)
        autoScrollRafRef.current = null
      }
    }
  }, [applyFill, colCount, computeFillPreview, dragMode, rowCount, updateActiveCell])

  const handleScroll = () => {
    const el = scrollRef.current
    if (!el) return

    const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - expandThresholdPx
    const nearRight = el.scrollLeft + el.clientWidth >= el.scrollWidth - expandThresholdPx

    if (nearBottom) {
      setRowCount((prev) => {
        if (prev >= maxRow) return prev
        return Math.min(maxRow, prev + expandStepRow)
      })
    }

    if (nearRight) {
      setColCount((prev) => {
        if (prev >= maxCol) return prev
        return Math.min(maxCol, prev + expandStepCol)
      })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (editingCell) return
    if (!activeCell) return

    const extendSelection = e.shiftKey

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      updateActiveCell({ row: Math.max(0, activeCell.row - 1), col: activeCell.col }, { extendSelection })
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      updateActiveCell({ row: activeCell.row + 1, col: activeCell.col }, { extendSelection })
      return
    }

    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      updateActiveCell({ row: activeCell.row, col: Math.max(0, activeCell.col - 1) }, { extendSelection })
      return
    }

    if (e.key === 'ArrowRight') {
      e.preventDefault()
      updateActiveCell({ row: activeCell.row, col: activeCell.col + 1 }, { extendSelection })
      return
    }

    if (e.key === 'Enter' || e.key === 'F2') {
      e.preventDefault()
      beginEdit(activeCell)
      return
    }

    if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault()
      setNextCells((prev) => {
        const next: ExcelGridCells = { ...prev }
        const range = selection ?? { start: activeCell, end: activeCell }
        const { top, bottom, left, right } = normalizeRange(range)

        for (let r = top; r <= bottom; r += 1) {
          for (let c = left; c <= right; c += 1) {
            delete next[cellKey(r, c)]
          }
        }

        return next
      })
      return
    }

    if (
      editable &&
      e.key.length === 1 &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.altKey
    ) {
      e.preventDefault()
      beginEdit(activeCell)
      setEditingValue(e.key)
      return
    }
  }

  const handleCopy = (e: React.ClipboardEvent<HTMLDivElement>) => {
    if (!enableCopyPaste) return
    if (!activeCell) return

    const range = selection ?? { start: activeCell, end: activeCell }
    const { top, bottom, left, right } = normalizeRange(range)

    const lines: string[] = []
    for (let r = top; r <= bottom; r += 1) {
      const cols: string[] = []
      for (let c = left; c <= right; c += 1) {
        const v = getCellRaw(r, c)
        cols.push(v === null || v === undefined ? '' : String(v))
      }
      lines.push(cols.join('\t'))
    }

    e.clipboardData.setData('text/plain', lines.join('\n'))
    e.preventDefault()
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    if (!enableCopyPaste) return
    if (!activeCell) return

    const text = e.clipboardData.getData('text/plain')
    const grid = parseClipboardGrid(text)
    const gridRows = grid.length
    const gridCols = grid[0]?.length ?? 0

    if (gridRows <= 0 || gridCols <= 0) return

    const range = selection ?? { start: activeCell, end: activeCell }
    const norm = normalizeRange(range)

    const targetTop = norm.top
    const targetLeft = norm.left

    const isMultiSelection = norm.bottom !== norm.top || norm.right !== norm.left

    const targetBottom = isMultiSelection ? norm.bottom : targetTop + gridRows - 1
    const targetRight = isMultiSelection ? norm.right : targetLeft + gridCols - 1

    expandToInclude(targetBottom, targetRight)

    setNextCells((prev) => {
      let next: ExcelGridCells = { ...prev }

      for (let r = targetTop; r <= targetBottom; r += 1) {
        for (let c = targetLeft; c <= targetRight; c += 1) {
          const srcR = (r - targetTop) % gridRows
          const srcC = (c - targetLeft) % gridCols
          const raw = grid[srcR]?.[srcC] ?? ''
          const parsed = parseCellText(raw)
          const k = cellKey(r, c)

          if (parsed === null || parsed === '') {
            delete next[k]
          } else {
            next[k] = parsed
          }
        }
      }

      return next
    })

    e.preventDefault()
  }

  const canvasWidth = gridLeft + totalColsSize
  const canvasHeight = gridTop + totalRowsSize

  return (
    <div
      ref={rootRef}
      className={twMerge(clsx('w-full rounded-2xl bg-surface outline-none', className))}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onCopy={handleCopy}
      onPaste={handlePaste}
      onMouseDown={() => rootRef.current?.focus()}
      {...props}
    >
      <Scroll
        ref={scrollRef}
        direction="both"
        autoHide
        className="w-full rounded-2xl"
        style={{ maxHeight: height }}
        onScroll={handleScroll}
      >
        <div className="relative" style={{ width: canvasWidth, height: canvasHeight }}>
          {showColumnLetters && (
            <div
              className="sticky top-0 z-30 flex bg-surface"
              style={{ width: canvasWidth, height: headerHeight }}
            >
              {showRowNumbers && (
                <div
                  className="sticky left-0 top-0 z-40 shrink-0 border-b border-r border-slate-200 bg-surface"
                  style={{ width: rowNumberWidth, height: headerHeight }}
                />
              )}
              <div
                className="relative border-b border-slate-200 bg-surface"
                style={{ width: totalColsSize, height: headerHeight }}
              >
                <div className="relative" style={{ height: headerHeight, width: totalColsSize }}>
                  {virtualCols.map((vcol) => {
                    const isActiveCol = activeCell?.col === vcol.index
                    const isHoveredResize = hoveredResizeCol === vcol.index
                    return (
                      <div
                        key={vcol.key}
                        className={twMerge(
                          clsx(
                            'group absolute top-0 flex h-full items-center justify-center border-r border-slate-200 text-xs font-semibold text-text-secondary',
                            isActiveCol && 'bg-primary-50'
                          )
                        )}
                        style={{ left: vcol.start, width: vcol.size }}
                        onMouseDown={(ev) => {
                          ev.preventDefault()
                          rootRef.current?.focus()

                          dragPointerRef.current = { x: ev.clientX, y: ev.clientY }
                          dragHeaderAnchorRef.current = vcol.index
                          setActiveCell({ row: 0, col: vcol.index })
                          setSelection({
                            start: { row: 0, col: vcol.index },
                            end: { row: rowCount - 1, col: vcol.index },
                          })
                          setDragMode('col')
                        }}
                        data-excel-grid-col-header={vcol.index}
                      >
                        {indexToColumnLetter(vcol.index)}
                        <div
                          className={twMerge(
                            clsx(
                              'absolute right-0 top-0 h-full w-3 cursor-col-resize opacity-0 group-hover:opacity-100',
                              isHoveredResize && 'bg-primary-100/60 opacity-100'
                            )
                          )}
                          style={{
                            right: -6,
                            zIndex: 10,
                          }}
                          onMouseDown={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            setResizingCol({
                              index: vcol.index,
                              startX: e.clientX,
                              startWidth: vcol.size,
                            })
                          }}
                          onMouseEnter={() => setHoveredResizeCol(vcol.index)}
                          onMouseLeave={() => setHoveredResizeCol(null)}
                        />
                        {isHoveredResize && (
                          <div className="pointer-events-none absolute right-0 top-0 h-[200vh] w-px bg-primary-400" style={{ right: 0 }} />
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {showRowNumbers && (
            <div
              className="sticky left-0 z-20 border-r border-slate-200 bg-surface"
              style={{
                width: rowNumberWidth,
                height: totalRowsSize,
              }}
            >
              <div className="relative" style={{ height: totalRowsSize, width: rowNumberWidth }}>
                {virtualRows.map((vrow) => {
                  const isActiveRow = activeCell?.row === vrow.index
                  return (
                    <div
                      key={vrow.key}
                      className={twMerge(
                        clsx(
                          'absolute left-0 flex items-center justify-center border-b border-slate-200 text-xs text-text-muted',
                          isActiveRow && 'bg-primary-50'
                        )
                      )}
                      style={{ top: vrow.start, height: vrow.size, width: rowNumberWidth }}
                      onMouseDown={(ev) => {
                        ev.preventDefault()
                        rootRef.current?.focus()

                        dragPointerRef.current = { x: ev.clientX, y: ev.clientY }
                        dragHeaderAnchorRef.current = vrow.index
                        setActiveCell({ row: vrow.index, col: 0 })
                        setSelection({
                          start: { row: vrow.index, col: 0 },
                          end: { row: vrow.index, col: colCount - 1 },
                        })
                        setDragMode('row')
                      }}
                      data-excel-grid-row-header={vrow.index}
                    >
                      {vrow.index + 1}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          <div
            className="absolute"
            style={{
              top: gridTop,
              left: gridLeft,
              width: totalColsSize,
              height: totalRowsSize,
            }}
          >
            <div className="relative" style={{ width: totalColsSize, height: totalRowsSize }}>
              {selectionNorm && (
                <div
                  className="pointer-events-none absolute z-10 border-2 border-primary-500 bg-primary-50/10"
                  style={{
                    top: selectionNorm.top * rowHeight,
                    left: selectionNorm.left * colWidth,
                    width: (selectionNorm.right - selectionNorm.left + 1) * colWidth,
                    height: (selectionNorm.bottom - selectionNorm.top + 1) * rowHeight,
                  }}
                />
              )}

              {selectionNorm && fillPreview && (
                <div
                  className="pointer-events-none absolute z-10 border-2 border-dashed border-primary-500 bg-primary-50/5"
                  style={{
                    top: fillPreview.top * rowHeight,
                    left: fillPreview.left * colWidth,
                    width: (fillPreview.right - fillPreview.left + 1) * colWidth,
                    height: (fillPreview.bottom - fillPreview.top + 1) * rowHeight,
                  }}
                />
              )}

              {selectionNorm && (
                <div
                  className="absolute z-20 h-2 w-2 cursor-crosshair border border-white bg-primary-500"
                  style={{
                    top: (selectionNorm.bottom + 1) * rowHeight - 5,
                    left: (selectionNorm.right + 1) * colWidth - 5,
                  }}
                  onMouseDown={(ev) => {
                    if (editingCell) return
                    ev.preventDefault()
                    ev.stopPropagation()
                    rootRef.current?.focus()

                    dragPointerRef.current = { x: ev.clientX, y: ev.clientY }
                    fillPreviewRef.current = null
                    setFillPreview(null)
                    setDragMode('fill')
                  }}
                />
              )}

              {virtualRows.flatMap((vrow) => {
                return virtualCols.map((vcol) => {
                  const r = vrow.index
                  const c = vcol.index
                  const isActive = activeCell?.row === r && activeCell?.col === c
                  const isEditing = editingCell?.row === r && editingCell?.col === c

                  const rawValue = getCellRaw(r, c)
                  const showFormulaValue =
                    !!formulaRuntime && typeof rawValue === 'string' && rawValue.trim().startsWith('=')

                  const computed = showFormulaValue
                    ? (() => {
                      const v = formulaRuntime.evaluateCell(r, c)
                      if (isFormulaError(v)) return v.code
                      if (v === null) return ''
                      return String(v)
                    })()
                    : null

                  const inSelection =
                    !!selectionNorm &&
                    r >= selectionNorm.top &&
                    r <= selectionNorm.bottom &&
                    c >= selectionNorm.left &&
                    c <= selectionNorm.right

                  return (
                    <div
                      key={`${vrow.key}:${vcol.key}`}
                      className={twMerge(
                        clsx(
                          'absolute border-b border-r border-slate-200 bg-surface text-sm text-text-primary',
                          'hover:bg-slate-50',
                          inSelection && !isActive && 'bg-primary-50/60',
                          !isEditing && 'px-2',
                          isEditing && 'p-0',
                          isActive && !isEditing && 'outline outline-2 outline-primary-500 outline-offset-[-2px]',
                          showFormulaValue && typeof computed === 'string' && computed.startsWith('#') && 'text-red-600'
                        )
                      )}
                      style={{
                        top: vrow.start,
                        left: vcol.start,
                        width: vcol.size,
                        height: vrow.size,
                      }}
                      data-excel-grid-cell={`${r}:${c}`}
                      onMouseDown={(ev) => {
                        if (editingCell) return
                        ev.preventDefault()
                        rootRef.current?.focus()

                        dragPointerRef.current = { x: ev.clientX, y: ev.clientY }
                        updateActiveCell({ row: r, col: c }, { extendSelection: ev.shiftKey })
                        setDragMode('select')
                      }}
                      onDoubleClick={() => beginEdit({ row: r, col: c })}
                    >
                      {isEditing ? (
                        <input
                          ref={editorRef}
                          className="h-full w-full bg-white px-2 text-sm text-text-primary outline-none"
                          value={editingValue}
                          onMouseDown={(ev) => ev.stopPropagation()}
                          onChange={(ev) => setEditingValue(ev.target.value)}
                          onBlur={commitEdit}
                          onKeyDown={(ev) => {
                            if (ev.key === 'Enter') {
                              ev.preventDefault()
                              commitEdit()
                            }
                            if (ev.key === 'Escape') {
                              ev.preventDefault()
                              cancelEdit()
                            }
                          }}
                        />
                      ) : (
                        <span className="block truncate">{showFormulaValue ? computed : rawValue ?? ''}</span>
                      )}
                    </div>
                  )
                })
              })}
            </div>
          </div>
        </div>
      </Scroll>
    </div>
  )
}
