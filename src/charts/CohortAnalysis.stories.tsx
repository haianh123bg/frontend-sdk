// File: src/charts/CohortAnalysis.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { CohortAnalysis } from './CohortAnalysis'
import type { CohortAnalysisDto } from './dto/cohort-analysis.dto'

const meta: Meta<typeof CohortAnalysis> = {
  title: 'Charts/CohortAnalysis',
  component: CohortAnalysis,
}

export default meta

type Story = StoryObj<typeof CohortAnalysis>

const sampleConfig: CohortAnalysisDto = {
  title: 'Retention by cohort',
  cohorts: ['Jan', 'Feb', 'Mar'],
  periods: ['Week 1', 'Week 2', 'Week 3'],
  values: [
    [100, 80, 60],
    [100, 70, 50],
    [100, 75, 55],
  ],
}

export const Basic: Story = {
  args: {
    config: sampleConfig,
    height: 360,
  },
}
