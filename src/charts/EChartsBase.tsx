// File: src/charts/EChartsBase.tsx
import * as React from 'react'
import ReactECharts from 'echarts-for-react'
import type { EChartsOption } from 'echarts'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface EChartsBaseProps {
  option: EChartsOption
  height?: number | string
  className?: string
}

export const EChartsBase: React.FC<EChartsBaseProps> = ({ option, height = 320, className }) => {
  const style: React.CSSProperties = {
    width: '100%',
    height: typeof height === 'number' ? `${height}px` : height,
  }

  return (
    <ReactECharts
      option={option}
      style={style}
      className={twMerge(clsx('w-full', className))}
      notMerge
      lazyUpdate
    />
  )
}

EChartsBase.displayName = 'EChartsBase'
