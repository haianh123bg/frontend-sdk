// File: src/charts/GeographicMap.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import * as echarts from 'echarts'
import { GeographicMap } from './GeographicMap'
import type { GeographicMapDto } from './dto/geographic-map.dto'
import worldGeoJson from './maps/world-simplified.json'

const meta: Meta<typeof GeographicMap> = {
  title: 'Charts/GeographicMap',
  component: GeographicMap,
  parameters: {
    docs: {
      description: {
        component:
          'Story này dùng một world map geoJSON đơn giản được bundle local. Bạn có thể thay thế file `world-simplified.json` bằng world.json đầy đủ từ ECharts và vẫn giữ nguyên `mapName=\'world\'`.',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof GeographicMap>

const sampleConfig: GeographicMapDto = {
  mapName: 'world',
  title: 'Users by country',
  data: [
    { name: 'China', value: 1000 },
    { name: 'United States', value: 800 },
    { name: 'Vietnam', value: 300 },
  ],
}
// Đăng ký map local một lần
echarts.registerMap('world', worldGeoJson as any)

export const Basic: Story = {
  args: {
    config: sampleConfig,
    height: 400,
  },
}
