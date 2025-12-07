// File: src/charts/TableAnalytics.tsx
import * as React from 'react'
import type { TableAnalyticsDto } from './dto/table-analytics.dto'
import { Table } from '../components/organisms/Table/Table'

export interface TableAnalyticsProps<Row extends Record<string, any> = Record<string, any>> {
  config: TableAnalyticsDto<Row>
}

export const TableAnalytics = <Row extends Record<string, any>>({ config }: TableAnalyticsProps<Row>) => {
  const columns = React.useMemo(
    () =>
      config.columns.map((c) => ({
        key: c.key,
        label: c.label,
        align: c.align,
      })),
    [config.columns]
  )

  const rowKey = React.useCallback((row: Row, index: number) => {
    return (row as any).id?.toString?.() ?? `${index}`
  }, [])

  return (
    <div className="space-y-3">
      {config.title && <h3 className="text-sm font-semibold text-text-primary">{config.title}</h3>}
      <Table<Row>
        columns={columns as any}
        data={config.rows}
        rowKey={rowKey}
        size="sm"
        striped
      />
    </div>
  )
}

TableAnalytics.displayName = 'TableAnalytics'
