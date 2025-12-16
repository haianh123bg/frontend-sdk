// File: src/charts/financial/indicators.ts

export type NullableNumber = number | null

export const calcMA = (values: number[], period: number): NullableNumber[] => {
  if (period <= 0) return values.map(() => null)
  const result: NullableNumber[] = new Array(values.length).fill(null)
  let sum = 0
  for (let i = 0; i < values.length; i += 1) {
    sum += values[i]
    if (i >= period) {
      sum -= values[i - period]
    }
    if (i >= period - 1) {
      result[i] = sum / period
    }
  }
  return result
}

export const calcEMA = (values: number[], period: number): NullableNumber[] => {
  if (period <= 0) return values.map(() => null)
  const result: NullableNumber[] = new Array(values.length).fill(null)
  const k = 2 / (period + 1)

  let ema: number | null = null
  for (let i = 0; i < values.length; i += 1) {
    const v = values[i]
    if (ema == null) {
      ema = v
    } else {
      ema = v * k + ema * (1 - k)
    }
    if (i >= period - 1) {
      result[i] = ema
    }
  }

  return result
}

export const calcRSI = (closes: number[], period: number): NullableNumber[] => {
  const n = period > 0 ? period : 14
  const result: NullableNumber[] = new Array(closes.length).fill(null)
  if (closes.length < n + 1) return result

  let gainSum = 0
  let lossSum = 0
  for (let i = 1; i <= n; i += 1) {
    const diff = closes[i] - closes[i - 1]
    if (diff >= 0) gainSum += diff
    else lossSum += -diff
  }

  let avgGain = gainSum / n
  let avgLoss = lossSum / n
  const rs = avgLoss === 0 ? Number.POSITIVE_INFINITY : avgGain / avgLoss
  result[n] = 100 - 100 / (1 + rs)

  for (let i = n + 1; i < closes.length; i += 1) {
    const diff = closes[i] - closes[i - 1]
    const gain = diff > 0 ? diff : 0
    const loss = diff < 0 ? -diff : 0

    avgGain = (avgGain * (n - 1) + gain) / n
    avgLoss = (avgLoss * (n - 1) + loss) / n

    const rs2 = avgLoss === 0 ? Number.POSITIVE_INFINITY : avgGain / avgLoss
    result[i] = 100 - 100 / (1 + rs2)
  }

  return result
}

export interface MACDResult {
  dif: NullableNumber[]
  dea: NullableNumber[]
  hist: NullableNumber[]
}

export const calcMACD = (
  closes: number[],
  fastPeriod: number,
  slowPeriod: number,
  signalPeriod: number
): MACDResult => {
  const fast = calcEMA(closes, fastPeriod)
  const slow = calcEMA(closes, slowPeriod)

  const dif: NullableNumber[] = closes.map((_v, i) => {
    const f = fast[i]
    const s = slow[i]
    if (f == null || s == null) return null
    return f - s
  })

  const difForEma = dif.map((v) => v ?? 0)
  const deaRaw = calcEMA(difForEma, signalPeriod)
  const dea: NullableNumber[] = deaRaw.map((v, i) => (dif[i] == null ? null : v))

  const hist: NullableNumber[] = closes.map((_v, i) => {
    const d = dif[i]
    const e = dea[i]
    if (d == null || e == null) return null
    return (d - e) * 2
  })

  return { dif, dea, hist }
}
