// File: src/charts/ChartsAiDemo.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import type { AiControlMessage } from '../core/ai-control/types'
import { AiControlProvider } from '../core/ai-control/AiControlProvider'
import { useAiControl } from '../core/ai-control/hooks'
import { SocketProvider } from '../core/socket/SocketProvider'
import type { GenericSocket, SocketMap } from '../core/socket/types'
import { AreaChart } from './AreaChart'
import { PieChart } from './PieChart'
import type { AreaChartDto } from './dto/area-chart.dto'
import type { PieChartDto } from './dto/pie-chart.dto'
import { Button } from '../components/atoms/Button/Button'
import { generateId } from '../utils/id'

const createInMemorySocket = (onEmit: (event: string, payload: any) => void): GenericSocket => {
  const handlers = new Map<string, Set<(data: any) => void>>()

  const ensureSet = (event: string) => {
    let set = handlers.get(event)
    if (!set) {
      set = new Set()
      handlers.set(event, set)
    }
    return set
  }

  return {
    on(event, handler) {
      const set = ensureSet(event)
      set.add(handler)
    },
    off(event, handler) {
      const set = handlers.get(event)
      if (set) {
        set.delete(handler)
      }
    },
    emit(event, payload) {
      onEmit(event, payload)
      const set = handlers.get(event)
      if (set) {
        set.forEach((handler) => handler(payload))
      }
    },
  }
}

const areaConfig: AreaChartDto = {
  title: 'Revenue over time',
  xLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  series: [
    { name: 'Product A', data: [120, 132, 101, 134, 90, 230] },
    { name: 'Product B', data: [220, 182, 191, 234, 290, 330] },
  ],
  stacked: true,
}

const pieConfig: PieChartDto = {
  title: 'User segments',
  data: [
    { name: 'Free', value: 40 },
    { name: 'Pro', value: 25 },
    { name: 'Business', value: 20 },
    { name: 'Enterprise', value: 15 },
  ],
}

const ChartsAiDemoInner: React.FC = () => {
  const instanceId = React.useMemo(() => generateId(), [])

  return (
    <div style={{ display: 'flex', gap: 24 }}>
      <div style={{ flex: 1 }}>
        <AreaChart config={areaConfig} height={320} instanceId={instanceId} />
        <div style={{ height: 24 }} />
        <PieChart config={pieConfig} height={280} instanceId={instanceId} />
      </div>
      <ChartsAiPanel instanceId={instanceId} />
    </div>
  )
}

const ChartsAiPanel: React.FC<{ instanceId: string }> = ({ instanceId }) => {
  const { sendCommand } = useAiControl()

  const sendRange = (from: number, to: number) => {
    const message: AiControlMessage = {
      id: String(Date.now()),
      direction: 'AI→UI',
      type: 'AI.CHART.SET_RANGE',
      target: { component: 'EChart', instanceId },
      payload: { from, to },
      meta: {},
    }
    sendCommand(message)
  }

  const highlightPoints = (ids: string[]) => {
    const message: AiControlMessage = {
      id: String(Date.now()),
      direction: 'AI→UI',
      type: 'AI.CHART.HIGHLIGHT_POINTS',
      target: { component: 'EChart', instanceId },
      payload: { ids },
      meta: {},
    }
    sendCommand(message)
  }

  const toggleSeries = (seriesKey: string, visible: boolean) => {
    const message: AiControlMessage = {
      id: String(Date.now()),
      direction: 'AI→UI',
      type: 'AI.CHART.TOGGLE_SERIES',
      target: { component: 'EChart', instanceId },
      payload: { seriesKey, visible },
      meta: {},
    }
    sendCommand(message)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontWeight: 500 }}>AI Panel (mock)</div>
      <Button variant="secondary" onClick={() => sendRange(0, 50)}>
        AI: Focus first half
      </Button>
      <Button variant="secondary" onClick={() => sendRange(50, 100)}>
        AI: Focus second half
      </Button>
      <Button variant="secondary" onClick={() => toggleSeries('Product A', false)}>
        AI: Hide Product A
      </Button>
      <Button variant="secondary" onClick={() => toggleSeries('Product A', true)}>
        AI: Show Product A
      </Button>
      <Button variant="secondary" onClick={() => highlightPoints(['Free'])}>
        AI: Highlight "Free" segment
      </Button>
    </div>
  )
}

const ChartsAiDemoShell: React.FC = () => {
  const [uiEvents, setUiEvents] = React.useState<AiControlMessage[]>([])
  const [aiCommands, setAiCommands] = React.useState<AiControlMessage[]>([])

  const sockets: SocketMap = React.useMemo(() => {
    const uiSocket = createInMemorySocket((_event, payload) => {
      setUiEvents((prev) => [...prev, payload])
    })
    const aiSocket = createInMemorySocket((_event, payload) => {
      setAiCommands((prev) => [...prev, payload])
    })
    return {
      'ai-events': uiSocket,
      'ai-control': aiSocket,
    }
  }, [])

  return (
    <SocketProvider sockets={sockets}>
      <AiControlProvider>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <ChartsAiDemoInner />
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500 }}>UI → AI stream</div>
              <pre style={{ maxHeight: 200, overflow: 'auto', fontSize: 11 }}>
                {JSON.stringify(uiEvents, null, 2)}
              </pre>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500 }}>AI → UI commands</div>
              <pre style={{ maxHeight: 200, overflow: 'auto', fontSize: 11 }}>
                {JSON.stringify(aiCommands, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </AiControlProvider>
    </SocketProvider>
  )
}

const meta: Meta<typeof ChartsAiDemoShell> = {
  title: 'Charts/AiControlDemo',
  component: ChartsAiDemoShell,
}

export default meta

type Story = StoryObj<typeof ChartsAiDemoShell>

export const Default: Story = {
  render: () => <ChartsAiDemoShell />,
}
