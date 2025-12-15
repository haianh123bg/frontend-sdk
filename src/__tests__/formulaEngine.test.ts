import { describe, it, expect } from 'vitest'
import { createFormulaRuntime, isFormulaError } from '../components/organisms/SpreadsheetGrid/formulaEngine'

describe('formulaEngine', () => {
  const runtimeFromGrid = (grid: unknown[][]) => {
    const rowCount = grid.length
    const colCount = Math.max(0, ...grid.map((r) => r.length))

    return createFormulaRuntime({
      rowCount,
      colCount,
      getCellRaw: (r, c) => grid[r]?.[c],
    })
  }

  it('evaluates basic arithmetic and cell references', () => {
    const rt = runtimeFromGrid([
      [10, 5, '=A1+B1'],
    ])

    const v = rt.evaluateCell(0, 2)
    expect(v).toBe(15)
  })

  it('evaluates ranges and SUM', () => {
    const rt = runtimeFromGrid([
      [10, 5, '=SUM(A1:B1)'],
      [7, 3, '=SUM(A1:A2)'],
    ])

    expect(rt.evaluateCell(0, 2)).toBe(15)
    expect(rt.evaluateCell(1, 2)).toBe(17)
  })

  it('supports comparisons and IF', () => {
    const rt = runtimeFromGrid([
      [10, 5, '=A1+B1', '=IF(C1>10,"OK","LOW")'],
    ])

    expect(rt.evaluateCell(0, 2)).toBe(15)
    expect(rt.evaluateCell(0, 3)).toBe('OK')
  })

  it('returns #DIV/0! on division by zero', () => {
    const rt = runtimeFromGrid([
      [1, 0, '=A1/B1'],
    ])

    const v = rt.evaluateCell(0, 2)
    expect(isFormulaError(v)).toBe(true)
    if (isFormulaError(v)) {
      expect(v.code).toBe('#DIV/0!')
    }
  })

  it('detects circular references', () => {
    const rt = runtimeFromGrid([
      ['=B1', '=A1'],
    ])

    const v = rt.evaluateCell(0, 0)
    expect(isFormulaError(v)).toBe(true)
    if (isFormulaError(v)) {
      expect(v.code).toBe('#CYCLE!')
    }
  })
})
