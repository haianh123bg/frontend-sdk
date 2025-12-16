// File: src/charts/FinancialChart.tsx

import * as React from 'react'
import type { EChartsOption } from 'echarts'
import { EChartsBase, type EChartsBaseProps } from './EChartsBase'
import type { FinancialChartDto } from './dto/financial-chart.dto'
import { applyOptionOverrides, buildFinancialChartOption } from './financial/buildFinancialChartOption'

export interface FinancialChartProps extends Omit<EChartsBaseProps, 'option'> {
  config: FinancialChartDto
  optionOverrides?: EChartsOption | ((base: EChartsOption) => EChartsOption)
}

export const FinancialChart: React.FC<FinancialChartProps> = ({
  config,
  optionOverrides,
  height,
  className,
  instanceId,
  notMerge,
  lazyUpdate,
  extraEvents,
  onChartReadyInstance,
}) => {
  const baseOption = React.useMemo(() => buildFinancialChartOption(config), [config])

  const option = React.useMemo(
    () => applyOptionOverrides(baseOption, optionOverrides),
    [baseOption, optionOverrides]
  )

  return (
    <EChartsBase
      option={option}
      height={height}
      className={className}
      instanceId={instanceId}
      notMerge={notMerge}
      lazyUpdate={lazyUpdate}
      extraEvents={extraEvents}
      onChartReadyInstance={onChartReadyInstance}
    />
  )
}

FinancialChart.displayName = 'FinancialChart'
