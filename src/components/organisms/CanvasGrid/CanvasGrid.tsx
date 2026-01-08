/**
 * CanvasGrid Component
 * High-performance grid component using HTML5 Canvas
 * Based on NocoDB Grid Architecture
 */

import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { CanvasGridProps } from './types'
import { useCanvasGrid } from './hooks/useCanvasGrid'
import {
  COLUMN_HEADER_HEIGHT_IN_PX,
  ROW_META_COLUMN_WIDTH,
  GRID_COLORS,
} from './utils/constants'
import {
  renderSingleLineText,
  renderRectangle,
  getCellDisplayValue,
} from './utils/helpers'

export const CanvasGrid = React.forwardRef<HTMLDivElement, CanvasGridProps>(
  (props, ref) => {
    const {
      className,
      style,
      disableSkeleton = false,
    } = props

    const {
      canvasRef,
      containerRef,
      dimensions,
      hoveredCell,
      selectedCell,
      editingCell,
      isLoading,
      columns,
      rowHeight,
      gridWidth,
      gridHeight,
      visibleRange,
      handleMouseMove,
      handleMouseLeave,
      handleClick,
      handleDoubleClick,
      handleScroll,
    } = useCanvasGrid(props)

    // Render function
    const render = React.useCallback(() => {
      const canvas = canvasRef.current
      const ctx = canvas?.getContext('2d')
      if (!canvas || !ctx) return

      // Clear canvas
      ctx.fillStyle = GRID_COLORS.CELL_BG
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const { startRowIndex, endRowIndex, startColIndex, endColIndex } = visibleRange

      // Render column headers
      renderColumnHeaders(ctx, startColIndex, endColIndex)

      // Render rows
      for (let rowIndex = startRowIndex; rowIndex <= endRowIndex; rowIndex++) {
        renderRow(ctx, rowIndex, startColIndex, endColIndex)
      }

      // Render selection
      if (selectedCell) {
        renderSelection(ctx, selectedCell.rowIndex, selectedCell.colIndex)
      }

      // Render hover
      if (hoveredCell && hoveredCell !== selectedCell) {
        renderHover(ctx, hoveredCell.rowIndex, hoveredCell.colIndex)
      }
    }, [visibleRange, selectedCell, hoveredCell, columns])

    // Render column headers
    const renderColumnHeaders = React.useCallback(
      (
        ctx: CanvasRenderingContext2D,
        startColIndex: number,
        endColIndex: number
      ) => {
        let x = ROW_META_COLUMN_WIDTH

        // Render row meta header
        renderRectangle(ctx, {
          x: 0,
          y: 0,
          width: ROW_META_COLUMN_WIDTH,
          height: COLUMN_HEADER_HEIGHT_IN_PX,
          fillStyle: GRID_COLORS.HEADER_BG,
          borderColor: GRID_COLORS.BORDER,
        })

        for (let colIndex = startColIndex; colIndex <= endColIndex; colIndex++) {
          const column = columns[colIndex]
          if (!column) continue

          const colWidth = column.width || 200

          // Header background
          renderRectangle(ctx, {
            x,
            y: 0,
            width: colWidth,
            height: COLUMN_HEADER_HEIGHT_IN_PX,
            fillStyle: GRID_COLORS.HEADER_BG,
            borderColor: GRID_COLORS.BORDER,
          })

          // Header text
          renderSingleLineText(ctx, {
            text: column.title,
            x: x + 8,
            y: COLUMN_HEADER_HEIGHT_IN_PX / 2,
            maxWidth: colWidth - 16,
            color: GRID_COLORS.HEADER_TEXT,
            fontSize: 12,
            fontWeight: 'bold',
          })

          x += colWidth
        }
      },
      [columns]
    )

    // Render row
    const renderRow = React.useCallback(
      (
        ctx: CanvasRenderingContext2D,
        rowIndex: number,
        startColIndex: number,
        endColIndex: number
      ) => {
        const y = COLUMN_HEADER_HEIGHT_IN_PX + rowIndex * rowHeight

        // Row meta cell
        renderRectangle(ctx, {
          x: 0,
          y,
          width: ROW_META_COLUMN_WIDTH,
          height: rowHeight,
          fillStyle: GRID_COLORS.CELL_BG,
          borderColor: GRID_COLORS.BORDER,
        })

        // Render cells
        let x = ROW_META_COLUMN_WIDTH
        for (let colIndex = startColIndex; colIndex <= endColIndex; colIndex++) {
          const column = columns[colIndex]
          if (!column) continue

          const colWidth = column.width || 200

          // Cell background
          const isSelected =
            selectedCell?.rowIndex === rowIndex &&
            selectedCell?.colIndex === colIndex
          const isHovered =
            hoveredCell?.rowIndex === rowIndex &&
            hoveredCell?.colIndex === colIndex

          let fillStyle = GRID_COLORS.CELL_BG
          if (isSelected) fillStyle = GRID_COLORS.CELL_BG_SELECTED
          else if (isHovered) fillStyle = GRID_COLORS.CELL_BG_HOVER

          renderRectangle(ctx, {
            x,
            y,
            width: colWidth,
            height: rowHeight,
            fillStyle,
            borderColor: GRID_COLORS.BORDER,
          })

          // Cell value
          const cellData = props.data.get(rowIndex)
          if (cellData) {
            const value = cellData.row[column.id]
            const displayValue = getCellDisplayValue(column, value)

            if (displayValue) {
              renderSingleLineText(ctx, {
                text: displayValue,
                x: x + 8,
                y: y + rowHeight / 2,
                maxWidth: colWidth - 16,
                color: GRID_COLORS.TEXT,
              })
            }
          }

          x += colWidth
        }
      },
      [columns, rowHeight, selectedCell, hoveredCell, props.data]
    )

    // Render selection
    const renderSelection = React.useCallback(
      (ctx: CanvasRenderingContext2D, rowIndex: number, colIndex: number) => {
        const column = columns[colIndex]
        const colWidth = column?.width || 200
        const x = ROW_META_COLUMN_WIDTH + colIndex * colWidth
        const y = COLUMN_HEADER_HEIGHT_IN_PX + rowIndex * rowHeight

        renderRectangle(ctx, {
          x,
          y,
          width: colWidth,
          height: rowHeight,
          borderColor: GRID_COLORS.BORDER,
          borderWidth: 2,
        })
      },
      [columns, rowHeight]
    )

    // Render hover
    const renderHover = React.useCallback(
      (ctx: CanvasRenderingContext2D, rowIndex: number, colIndex: number) => {
        const column = columns[colIndex]
        const colWidth = column?.width || 200
        const x = ROW_META_COLUMN_WIDTH + colIndex * colWidth
        const y = COLUMN_HEADER_HEIGHT_IN_PX + rowIndex * rowHeight

        renderRectangle(ctx, {
          x,
          y,
          width: colWidth,
          height: rowHeight,
          borderColor: GRID_COLORS.BORDER_DARK,
          borderWidth: 1,
        })
      },
      [columns, rowHeight]
    )

    // Effect to render on changes
    React.useLayoutEffect(() => {
      render()
    }, [render])

    // Set canvas size
    React.useLayoutEffect(() => {
      const canvas = canvasRef.current
      if (canvas && dimensions.width > 0 && dimensions.height > 0) {
        // Handle high DPI displays
        const dpr = window.devicePixelRatio || 1
        canvas.width = dimensions.width * dpr
        canvas.height = dimensions.height * dpr
        canvas.style.width = `${dimensions.width}px`
        canvas.style.height = `${dimensions.height}px`

        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.scale(dpr, dpr)
        }
      }
    }, [dimensions])

    return (
      <div
        ref={ref}
        className={twMerge(
          clsx(
            'relative overflow-hidden bg-white border border-gray-200 rounded-lg',
            className
          )
        )}
        style={{
          width: '100%',
          height: '600px',
          ...style,
        }}
      >
        {/* Scrollable container */}
        <div
          ref={containerRef}
          className="absolute inset-0 overflow-auto"
          onScroll={handleScroll}
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          {/* Canvas */}
          <canvas
            ref={canvasRef}
            className="block cursor-cell"
            style={{
              width: `${gridWidth}px`,
              height: `${gridHeight}px`,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
          />

          {/* Loading overlay */}
          {isLoading && !disableSkeleton && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-2">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                <p className="text-sm text-gray-600">Loading data...</p>
              </div>
            </div>
          )}
        </div>

        {/* Editable cell portal */}
        {editingCell && (
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              pointerEvents: 'none',
            }}
          >
            {/* Portal for editing cell */}
          </div>
        )}
      </div>
    )
  }
)

CanvasGrid.displayName = 'CanvasGrid'

export default CanvasGrid
