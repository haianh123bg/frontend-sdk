/**
 * useCanvasGrid Hook
 * Main hook for Canvas Grid state management and interactions
 */

import { useState, useRef, useCallback, useEffect, useMemo } from 'react'
import type {
  ColumnType,
  Row,
  CellRange,
  CanvasGridProps,
  NavigateDir,
} from '../types'
import {
  COLUMN_HEADER_HEIGHT_IN_PX,
  ROW_HEIGHT_IN_PX,
  ROW_META_COLUMN_WIDTH,
  DEBOUNCE_SCROLL_MS,
  SCROLL_THRESHOLD,
} from '../utils/constants'
import {
  getCellAtPosition,
  getCellDisplayValue,
  isColumnEditable,
  debounce,
  throttle,
} from '../utils/helpers'

export function useCanvasGrid(props: CanvasGridProps) {
  const {
    meta,
    view,
    data,
    totalRows,
    loadData,
    updateOrSaveRow,
    deleteRow,
    addEmptyRow,
    expandForm,
    bulkUpdateRows,
    deleteSelectedRows,
    rowHeightEnum = 1,
    readOnly = false,
  } = props

  // Refs
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)

  // Layout State
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  })

  // Scroll State
  const [scrollPosition, setScrollPosition] = useState({
    left: 0,
    top: 0,
  })

  // Cell Selection State
  const [hoveredCell, setHoveredCell] = useState<{ rowIndex: number; colIndex: number } | null>(null)
  const [selectedCell, setSelectedCell] = useState<{ rowIndex: number; colIndex: number } | null>(null)
  const [selectedRange, setSelectedRange] = useState<CellRange | null>(null)
  const [editingCell, setEditingCell] = useState<{ rowIndex: number; colIndex: number; value: any } | null>(null)

  // Dragging State
  const [isDragging, setIsDragging] = useState(false)
  const [dragType, setDragType] = useState<'column' | 'row' | 'fill' | null>(null)
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null)

  // Loading State
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  // Computed Values
  const columns = useMemo(() => {
    return meta.columns.filter((col) => !col.hidden)
  }, [meta.columns])

  const rowHeight = useMemo(() => {
    return ROW_HEIGHT_IN_PX[rowHeightEnum] || ROW_HEIGHT_IN_PX[1]
  }, [rowHeightEnum])

  const gridWidth = useMemo(() => {
    let width = ROW_META_COLUMN_WIDTH
    columns.forEach((col) => {
      width += col.width || 200
    })
    return width
  }, [columns])

  const gridHeight = useMemo(() => {
    return COLUMN_HEADER_HEIGHT_IN_PX + totalRows * rowHeight
  }, [totalRows, rowHeight])

  // Visible Range Calculation
  const visibleRange = useMemo(() => {
    const startRowIndex = Math.floor(scrollPosition.top / rowHeight)
    const endRowIndex = Math.min(
      totalRows - 1,
      Math.ceil((scrollPosition.top + dimensions.height) / rowHeight)
    )

    let startColIndex = 0
    let endColIndex = 0
    let currentX = ROW_META_COLUMN_WIDTH

    for (let i = 0; i < columns.length; i++) {
      const colWidth = columns[i].width || 200
      if (currentX + colWidth >= scrollPosition.left && startColIndex === 0) {
        startColIndex = i
      }
      if (currentX <= scrollPosition.left + dimensions.width) {
        endColIndex = i
      }
      currentX += colWidth
    }

    return { startRowIndex, endRowIndex, startColIndex, endColIndex }
  }, [scrollPosition, dimensions, rowHeight, totalRows, columns])

  // Handlers
  const handleMouseMove = useCallback(
    throttle((e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!canvasRef.current) return

      const rect = canvasRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const cell = getCellAtPosition(
        x,
        y,
        columns,
        rowHeight,
        COLUMN_HEADER_HEIGHT_IN_PX,
        ROW_META_COLUMN_WIDTH
      )

      if (cell) {
        setHoveredCell(cell)
      } else {
        setHoveredCell(null)
      }

      // Handle dragging
      if (isDragging && dragStart) {
        // Implement drag logic based on dragType
      }
    }, DEBOUNCE_SCROLL_MS),
    [isDragging, dragStart, columns, rowHeight]
  )

  const handleMouseLeave = useCallback(() => {
    setHoveredCell(null)
  }, [])

  const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const cell = getCellAtPosition(
      x,
      y,
      columns,
      rowHeight,
      COLUMN_HEADER_HEIGHT_IN_PX,
      ROW_META_COLUMN_WIDTH
    )

    if (cell) {
      setSelectedCell(cell)
      setSelectedRange({
        startRowIndex: cell.rowIndex,
        endRowIndex: cell.rowIndex,
        startColIndex: cell.colIndex,
        endColIndex: cell.colIndex,
      })
    }
  }, [columns, rowHeight])

  const handleDoubleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || readOnly) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const cell = getCellAtPosition(
      x,
      y,
      columns,
      rowHeight,
      COLUMN_HEADER_HEIGHT_IN_PX,
      ROW_META_COLUMN_WIDTH
    )

    if (cell) {
      const column = columns[cell.colIndex]
      if (isColumnEditable(column)) {
        const row = Array.from(data.values())[cell.rowIndex]
        if (row) {
          const value = row.row[column.id]
          setEditingCell({ rowIndex: cell.rowIndex, colIndex: cell.colIndex, value })
        }
      }
    }
  }, [columns, rowHeight, data, readOnly])

  const handleScroll = useCallback(
    debounce((e: React.UIEvent<HTMLDivElement>) => {
      const target = e.target as HTMLDivElement
      setScrollPosition({
        left: target.scrollLeft,
        top: target.scrollTop,
      })

      // Load more data if needed
      const scrollBottom = target.scrollTop + target.clientHeight
      if (scrollBottom >= target.scrollHeight - SCROLL_THRESHOLD && !isLoadingMore) {
        // Implement load more logic
      }
    }, DEBOUNCE_SCROLL_MS),
    [isLoadingMore]
  )

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!selectedCell) return

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault()
        navigateCell(NavigateDir.UP)
        break
      case 'ArrowDown':
        e.preventDefault()
        navigateCell(NavigateDir.DOWN)
        break
      case 'ArrowLeft':
        e.preventDefault()
        navigateCell(NavigateDir.LEFT)
        break
      case 'ArrowRight':
        e.preventDefault()
        navigateCell(NavigateDir.RIGHT)
        break
      case 'Enter':
        e.preventDefault()
        if (editingCell) {
          saveEditingCell()
        } else {
          startEditingCell()
        }
        break
      case 'Escape':
        e.preventDefault()
        cancelEditingCell()
        break
      case 'Delete':
      case 'Backspace':
        if (!editingCell && !readOnly) {
          e.preventDefault()
          deleteSelectedCells()
        }
        break
    }
  }, [selectedCell, editingCell, readOnly])

  // Navigation
  const navigateCell = useCallback((direction: NavigateDir) => {
    if (!selectedCell) return

    let { rowIndex, colIndex } = selectedCell

    switch (direction) {
      case NavigateDir.UP:
        rowIndex = Math.max(0, rowIndex - 1)
        break
      case NavigateDir.DOWN:
        rowIndex = Math.min(totalRows - 1, rowIndex + 1)
        break
      case NavigateDir.LEFT:
        colIndex = Math.max(0, colIndex - 1)
        break
      case NavigateDir.RIGHT:
        colIndex = Math.min(columns.length - 1, colIndex + 1)
        break
    }

    setSelectedCell({ rowIndex, colIndex })
    setSelectedRange({
      startRowIndex: rowIndex,
      endRowIndex: rowIndex,
      startColIndex: colIndex,
      endColIndex: colIndex,
    })
  }, [selectedCell, totalRows, columns.length])

  // Cell Editing
  const startEditingCell = useCallback(() => {
    if (!selectedCell || readOnly) return

    const column = columns[selectedCell.colIndex]
    if (!isColumnEditable(column)) return

    const row = Array.from(data.values())[selectedCell.rowIndex]
    if (row) {
      const value = row.row[column.id]
      setEditingCell({ rowIndex: selectedCell.rowIndex, colIndex: selectedCell.colIndex, value })
    }
  }, [selectedCell, columns, data, readOnly])

  const saveEditingCell = useCallback(async () => {
    if (!editingCell) return

    const row = Array.from(data.values())[editingCell.rowIndex]
    const column = columns[editingCell.colIndex]

    if (row && column) {
      try {
        await updateOrSaveRow(row, column.id)
        setEditingCell(null)
      } catch (error) {
        console.error('Failed to save cell:', error)
      }
    }
  }, [editingCell, data, columns, updateOrSaveRow])

  const cancelEditingCell = useCallback(() => {
    setEditingCell(null)
  }, [])

  const deleteSelectedCells = useCallback(() => {
    // Implement delete logic
  }, [])

  // Row Operations
  const handleAddRow = useCallback(() => {
    addEmptyRow?.()
  }, [addEmptyRow])

  const handleDeleteRow = useCallback(async (rowIndex: number) => {
    if (deleteRow) {
      await deleteRow(rowIndex)
    }
  }, [deleteRow])

  const handleExpandForm = useCallback((row: Row) => {
    expandForm?.(row)
  }, [expandForm])

  // Effects
  useEffect(() => {
    const handleResize = throttle(() => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        })
      }
    }, 100)

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Initial data load
  useEffect(() => {
    const initData = async () => {
      setIsLoading(true)
      try {
        await loadData()
      } finally {
        setIsLoading(false)
      }
    }

    initData()
  }, [loadData])

  return {
    // Refs
    canvasRef,
    containerRef,
    offscreenCanvasRef,
    ctxRef,

    // State
    dimensions,
    scrollPosition,
    hoveredCell,
    selectedCell,
    selectedRange,
    editingCell,
    isDragging,
    dragType,
    isLoading,
    isLoadingMore,

    // Computed
    columns,
    rowHeight,
    gridWidth,
    gridHeight,
    visibleRange,

    // Handlers
    handleMouseMove,
    handleMouseLeave,
    handleClick,
    handleDoubleClick,
    handleScroll,
    handleAddRow,
    handleDeleteRow,
    handleExpandForm,
    startEditingCell,
    saveEditingCell,
    cancelEditingCell,

    // Navigation
    navigateCell,
  }
}
