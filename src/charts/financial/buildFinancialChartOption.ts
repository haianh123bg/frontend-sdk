// File: src/charts/financial/buildFinancialChartOption.ts

import type { EChartsOption } from 'echarts'
import type { FinancialChartDto, FinancialIndicator, FinancialTime } from '../dto/financial-chart.dto'
import { calcEMA, calcMA, calcMACD, calcRSI } from './indicators'

const toCategoryLabel = (time: FinancialTime): string => {
  if (time instanceof Date) return time.toISOString()
  if (typeof time === 'number') {
    const ms = time < 1e12 ? time * 1000 : time
    return new Date(ms).toISOString()
  }
  return time
}

type Overrides = EChartsOption | ((base: EChartsOption) => EChartsOption) | undefined

const mergeDeepReplaceArrays = (base: any, override: any): any => {
  if (override == null) return base
  if (Array.isArray(override)) return override
  if (typeof override !== 'object') return override
  if (base == null || typeof base !== 'object' || Array.isArray(base)) return override

  const out: any = { ...base }
  Object.keys(override).forEach((k) => {
    out[k] = mergeDeepReplaceArrays(base[k], override[k])
  })
  return out
}

export const applyOptionOverrides = (base: EChartsOption, overrides: Overrides): EChartsOption => {
  if (!overrides) return base
  if (typeof overrides === 'function') return overrides(base)
  return mergeDeepReplaceArrays(base as any, overrides as any) as EChartsOption
}

type MAIndicator = Extract<FinancialIndicator, { type: 'MA' }>
type EMAIndicator = Extract<FinancialIndicator, { type: 'EMA' }>
type RSIIndicator = Extract<FinancialIndicator, { type: 'RSI' }>
type MACDIndicator = Extract<FinancialIndicator, { type: 'MACD' }>

const isOverlayIndicator = (i: FinancialIndicator): i is MAIndicator | EMAIndicator => i.type === 'MA' || i.type === 'EMA'
const isPaneIndicator = (i: FinancialIndicator): i is RSIIndicator | MACDIndicator => i.type === 'RSI' || i.type === 'MACD'

export const buildFinancialChartOption = (config: FinancialChartDto): EChartsOption => {
  const candles = config.candles ?? []
  const showVolume = config.showVolume !== false
  const upColor = config.upColor ?? '#16a34a'
  const downColor = config.downColor ?? '#dc2626'

  const categories = candles.map((c) => toCategoryLabel(c.time))
  const ohlc = candles.map((c) => [c.open, c.close, c.low, c.high])
  const closes = candles.map((c) => c.close)
  const volumes = candles.map((c) => c.volume ?? 0)

  const indicators = config.indicators ?? []
  const overlayIndicators = indicators.filter(isOverlayIndicator)
  const paneIndicators = indicators.filter(isPaneIndicator)

  const paneCount = 1 + (showVolume ? 1 : 0) + paneIndicators.length
  const priceRatio = 6
  const volumeRatio = showVolume ? 2 : 0
  const indicatorRatioEach = paneIndicators.length > 0 ? 2 : 0
  const totalRatio = priceRatio + volumeRatio + indicatorRatioEach * paneIndicators.length

  let top = 6
  const gap = 2

  const grids: any[] = []
  const xAxis: any[] = []
  const yAxis: any[] = []

  const addPane = (heightPct: number, opts?: { bottomAxis?: boolean }) => {
    const gridIndex = grids.length
    grids.push({ left: 56, right: 16, top: `${top}%`, height: `${heightPct}%` })
    xAxis.push({
      type: 'category',
      gridIndex,
      data: categories,
      axisLabel: { show: !!opts?.bottomAxis },
      axisTick: { show: false },
      axisLine: { lineStyle: { color: '#D0D5DD' } },
    })
    yAxis.push({
      type: 'value',
      gridIndex,
      scale: true,
      splitLine: { lineStyle: { type: 'dashed', color: '#EAECF0' } },
    })

    top += heightPct + gap
    return gridIndex
  }

  const paneHeights: number[] = []
  const priceHeight = Math.max(35, Math.round((priceRatio / totalRatio) * 100) - gap * (paneCount - 1))
  paneHeights.push(priceHeight)

  if (showVolume) {
    const h = Math.max(12, Math.round((volumeRatio / totalRatio) * 100))
    paneHeights.push(h)
  }

  for (let i = 0; i < paneIndicators.length; i += 1) {
    const h = Math.max(14, Math.round((indicatorRatioEach / totalRatio) * 100))
    paneHeights.push(h)
  }

  const sumHeights = paneHeights.reduce((a, b) => a + b, 0) + gap * (paneHeights.length - 1) + top
  if (sumHeights > 98) {
    const scale = (98 - (gap * (paneHeights.length - 1) + 6)) / paneHeights.reduce((a, b) => a + b, 0)
    for (let i = 0; i < paneHeights.length; i += 1) paneHeights[i] = Math.max(10, Math.floor(paneHeights[i] * scale))
  }

  const priceGridIndex = addPane(paneHeights[0], { bottomAxis: paneCount === 1 })

  let volumeGridIndex: number | null = null
  if (showVolume) {
    const isBottom = paneIndicators.length === 0
    volumeGridIndex = addPane(paneHeights[1], { bottomAxis: isBottom })
    yAxis[volumeGridIndex] = {
      ...yAxis[volumeGridIndex],
      splitNumber: 2,
    }
  }

  const indicatorGridIndices: number[] = []
  const indicatorStart = 1 + (showVolume ? 1 : 0)
  for (let i = 0; i < paneIndicators.length; i += 1) {
    const isBottom = i === paneIndicators.length - 1
    const gi = addPane(paneHeights[indicatorStart + i], { bottomAxis: isBottom })
    indicatorGridIndices.push(gi)
  }

  const xAxisIndices = xAxis.map((_x, i) => i)

  const series: any[] = []

  series.push({
    name: 'Price',
    type: 'candlestick',
    xAxisIndex: priceGridIndex,
    yAxisIndex: priceGridIndex,
    data: ohlc,
    itemStyle: {
      color: upColor,
      color0: downColor,
      borderColor: upColor,
      borderColor0: downColor,
    },
  })

  overlayIndicators.forEach((ind) => {
    const period = ind.period
    const data = ind.type === 'MA' ? calcMA(closes, period) : calcEMA(closes, period)
    series.push({
      name: ind.name ?? `${ind.type}${period}`,
      type: 'line',
      xAxisIndex: priceGridIndex,
      yAxisIndex: priceGridIndex,
      data,
      showSymbol: false,
      smooth: true,
      lineStyle: { width: 1.2, color: ind.color },
      emphasis: { focus: 'series' },
    })
  })

  if (showVolume && volumeGridIndex != null) {
    series.push({
      name: 'Volume',
      type: 'bar',
      xAxisIndex: volumeGridIndex,
      yAxisIndex: volumeGridIndex,
      data: volumes,
      itemStyle: {
        color: (params: any) => {
          const idx = params?.dataIndex ?? 0
          const c = candles[idx]
          if (!c) return '#94a3b8'
          return c.close >= c.open ? upColor : downColor
        },
      },
    })
  }

  paneIndicators.forEach((ind, i) => {
    const gi = indicatorGridIndices[i]
    if (ind.type === 'RSI') {
      const period = ind.period ?? 14
      const data = calcRSI(closes, period)
      yAxis[gi] = {
        ...yAxis[gi],
        min: 0,
        max: 100,
        splitNumber: 2,
      }
      series.push({
        name: ind.name ?? `RSI${period}`,
        type: 'line',
        xAxisIndex: gi,
        yAxisIndex: gi,
        data,
        showSymbol: false,
        smooth: true,
        lineStyle: { width: 1.2, color: ind.color ?? '#7c3aed' },
      })
    }

    if (ind.type === 'MACD') {
      const fast = ind.fast ?? 12
      const slow = ind.slow ?? 26
      const signal = ind.signal ?? 9
      const { dif, dea, hist } = calcMACD(closes, fast, slow, signal)
      const colors = ind.colors ?? {}
      series.push({
        name: ind.name ?? `MACD`,
        type: 'bar',
        xAxisIndex: gi,
        yAxisIndex: gi,
        data: hist,
        itemStyle: {
          color: (params: any) => {
            const v = params?.value
            if (typeof v !== 'number') return '#94a3b8'
            return v >= 0 ? colors.macdUp ?? upColor : colors.macdDown ?? downColor
          },
        },
      })
      series.push({
        name: 'DIF',
        type: 'line',
        xAxisIndex: gi,
        yAxisIndex: gi,
        data: dif,
        showSymbol: false,
        smooth: true,
        lineStyle: { width: 1.1, color: colors.dif ?? '#2563eb' },
      })
      series.push({
        name: 'DEA',
        type: 'line',
        xAxisIndex: gi,
        yAxisIndex: gi,
        data: dea,
        showSymbol: false,
        smooth: true,
        lineStyle: { width: 1.1, color: colors.dea ?? '#f59e0b' },
      })
    }
  })

  const option: EChartsOption = {
    title: config.title ? { text: config.title } : undefined,
    grid: grids,
    xAxis,
    yAxis,
    legend: {
      show: true,
      top: 8,
      left: 12,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' },
      formatter: (params: any) => {
        const items = Array.isArray(params) ? params : [params]
        const candleItem = items.find((p: any) => p?.seriesType === 'candlestick')
        const idx = candleItem?.dataIndex
        const c = typeof idx === 'number' ? candles[idx] : undefined

        const parts: string[] = []
        if (c) {
          parts.push(`${toCategoryLabel(c.time)}`)
          parts.push(`O: ${c.open}  H: ${c.high}  L: ${c.low}  C: ${c.close}`)
          if (c.volume != null) parts.push(`V: ${c.volume}`)
        }

        items
          .filter((p: any) => p?.seriesType !== 'candlestick')
          .forEach((p: any) => {
            const name = p?.seriesName
            const v = p?.value
            if (!name) return
            if (v == null || v === '') return
            parts.push(`${name}: ${typeof v === 'number' ? v.toFixed(4) : v}`)
          })

        return parts.join('<br/>')
      },
    },
    axisPointer: {
      link: [{ xAxisIndex: xAxisIndices }],
    },
    dataZoom: [
      {
        type: 'inside',
        xAxisIndex: xAxisIndices,
        start: 70,
        end: 100,
      },
      {
        type: 'slider',
        xAxisIndex: xAxisIndices,
        height: 20,
        bottom: 2,
        start: 70,
        end: 100,
      },
    ],
    series,
  }

  return option
}
