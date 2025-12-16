// File: src/charts/FinancialChart.stories.tsx

import type { Meta, StoryObj } from '@storybook/react'
import { FinancialChart } from './FinancialChart'
import type { FinancialChartDto } from './dto/financial-chart.dto'

const meta: Meta<typeof FinancialChart> = {
  title: 'Charts/FinancialChart',
  component: FinancialChart,
}

export default meta

type Story = StoryObj<typeof FinancialChart>

const makeSample = (): FinancialChartDto => {
  const candles: FinancialChartDto['candles'] = []
  const now = Date.now() - 1000 * 60 * 60 * 24 * 60

  let price = 100
  for (let i = 0; i < 120; i += 1) {
    const t = now + i * 1000 * 60 * 60 * 4
    const open = price
    const delta = (Math.random() - 0.5) * 4
    const close = Math.max(10, open + delta)
    const high = Math.max(open, close) + Math.random() * 2
    const low = Math.min(open, close) - Math.random() * 2
    const volume = Math.round(1000 + Math.random() * 5000)

    candles.push({ time: t, open, high, low, close, volume })
    price = close
  }

  return {
    title: 'BTC/USDT (demo)',
    candles,
    showVolume: true,
    indicators: [
      { type: 'MA', period: 7, color: '#2563eb' },
      { type: 'MA', period: 25, color: '#f59e0b' },
      { type: 'RSI', period: 14 },
      { type: 'MACD' },
    ],
  }
}

export const Default: Story = {
  args: {
    config: makeSample(),
    height: 520,
  },
}
