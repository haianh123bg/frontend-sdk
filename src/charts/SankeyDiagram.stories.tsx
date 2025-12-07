// File: src/charts/SankeyDiagram.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { SankeyDiagram } from './SankeyDiagram'
import type { SankeyDiagramDto } from './dto/sankey-diagram.dto'

const meta: Meta<typeof SankeyDiagram> = {
  title: 'Charts/SankeyDiagram',
  component: SankeyDiagram,
}

export default meta

type Story = StoryObj<typeof SankeyDiagram>

const sampleConfig: SankeyDiagramDto = {
  title: 'Traffic flow',
  nodes: [
    { name: 'Source' },
    { name: 'Landing' },
    { name: 'Signup' },
    { name: 'Purchase' },
  ],
  links: [
    { source: 'Source', target: 'Landing', value: 1000 },
    { source: 'Landing', target: 'Signup', value: 400 },
    { source: 'Signup', target: 'Purchase', value: 120 },
  ],
}

export const Basic: Story = {
  args: {
    config: sampleConfig,
    height: 360,
  },
}
