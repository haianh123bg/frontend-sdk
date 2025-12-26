import type { BarChartDto } from './dto/bar-chart.dto'

export interface HistogramBin {
  start: number
  end: number
  count: number
  label: string
}

export interface BuildHistogramOptions {
  binCount?: number
  binSize?: number
  min?: number
  max?: number
  labelFormatter?: (start: number, end: number, index: number) => string
}

const isFiniteNumber = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v)

export const buildHistogram = (values: number[], options?: BuildHistogramOptions): HistogramBin[] => {
  const data = (values ?? []).filter(isFiniteNumber)
  if (data.length === 0) return []

  const min = isFiniteNumber(options?.min) ? options!.min : Math.min(...data)
  const max = isFiniteNumber(options?.max) ? options!.max : Math.max(...data)

  const requestedBinSize = options?.binSize
  const requestedBinCount = options?.binCount

  const binCount =
    typeof requestedBinSize === 'number' && requestedBinSize > 0
      ? Math.max(1, Math.ceil((max - min) / requestedBinSize))
      : Math.max(1, requestedBinCount ?? Math.ceil(Math.sqrt(data.length)))

  const binSize =
    typeof requestedBinSize === 'number' && requestedBinSize > 0
      ? requestedBinSize
      : binCount === 1
        ? 1
        : (max - min) / binCount

  const makeLabel = options?.labelFormatter
    ? options.labelFormatter
    : (s: number, e: number) => {
        const a = Number.isFinite(s) ? s : 0
        const b = Number.isFinite(e) ? e : 0
        return `${a.toFixed(2)} - ${b.toFixed(2)}`
      }

  const bins: HistogramBin[] = []
  for (let i = 0; i < binCount; i += 1) {
    const start = min + i * binSize
    const end = i === binCount - 1 ? max : min + (i + 1) * binSize
    bins.push({ start, end, count: 0, label: makeLabel(start, end, i) })
  }

  for (const v of data) {
    const idx =
      binCount === 1
        ? 0
        : Math.min(binCount - 1, Math.max(0, Math.floor((v - min) / binSize)))
    bins[idx].count += 1
  }

  return bins
}

export const histogramBinsToBarChartDto = (
  bins: HistogramBin[],
  opts?: { title?: string; seriesName?: string }
): BarChartDto => {
  return {
    title: opts?.title,
    xLabels: bins.map((b) => b.label),
    series: [{ name: opts?.seriesName ?? 'Count', data: bins.map((b) => b.count) }],
    orientation: 'vertical',
    stacked: false,
  }
}

export const valuesToHistogramBarChartDto = (
  values: number[],
  options?: BuildHistogramOptions & { title?: string; seriesName?: string }
): BarChartDto => {
  const bins = buildHistogram(values, options)
  return histogramBinsToBarChartDto(bins, { title: options?.title, seriesName: options?.seriesName })
}
