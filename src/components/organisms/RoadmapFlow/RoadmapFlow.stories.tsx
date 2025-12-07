// File: src/components/organisms/RoadmapFlow/RoadmapFlow.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import 'reactflow/dist/style.css'
import { RoadmapFlow, type RoadmapFlowDto } from './RoadmapFlow'

const meta: Meta<typeof RoadmapFlow> = {
  title: 'Organisms/RoadmapFlow',
  component: RoadmapFlow,
}

export default meta

type Story = StoryObj<typeof RoadmapFlow>

const sampleConfig: RoadmapFlowDto = {
  title: 'Backend Roadmap (flow)',
  description: 'Phiên bản giản lược của backend roadmap với các node và đường nối.',
  nodes: [
    // Cột 0: Start / Language
    { id: 'pick-lang', label: 'Pick a Backend Language', column: 0, row: 2, status: 'in-progress' },
    { id: 'js', label: 'JavaScript', column: 0, row: 0, status: 'completed' },
    { id: 'ts', label: 'TypeScript', column: 0, row: 1, status: 'in-progress' },
    { id: 'go', label: 'Go', column: 0, row: 3, status: 'optional' },

    // Cột 1: Internet / Frontend basics
    { id: 'internet', label: 'Internet', column: 1, row: 1, status: 'completed' },
    { id: 'frontend-basics', label: 'Frontend Basics', column: 1, row: 2, status: 'in-progress' },

    // Cột 2: Web fundamentals
    { id: 'html', label: 'HTML', column: 2, row: 1, status: 'completed' },
    { id: 'css', label: 'CSS', column: 2, row: 2, status: 'in-progress' },
    { id: 'js-front', label: 'JavaScript (browser)', column: 2, row: 3, status: 'in-progress' },

    // Cột 3: VCS / Repo hosting
    { id: 'vcs', label: 'Version Control Systems', column: 3, row: 1, status: 'in-progress' },
    { id: 'repo-host', label: 'Repo Hosting Services', column: 3, row: 2, status: 'todo' },
    { id: 'git', label: 'Git', column: 4, row: 1, status: 'completed' },
    { id: 'github', label: 'GitHub', column: 4, row: 2, status: 'completed' },
    { id: 'gitlab', label: 'GitLab', column: 4, row: 3, status: 'optional' },

    // Cột 5–6: Databases
    { id: 'relational-db', label: 'Relational Databases', column: 5, row: 2, status: 'in-progress' },
    { id: 'mysql', label: 'MySQL', column: 6, row: 1, status: 'todo' },
    { id: 'postgres', label: 'PostgreSQL', column: 6, row: 2, status: 'completed' },
    { id: 'sqlite', label: 'SQLite', column: 6, row: 3, status: 'optional' },

    // Cột 7–8: APIs
    { id: 'learn-apis', label: 'Learn about APIs', column: 7, row: 2, status: 'todo' },
    { id: 'rest', label: 'REST', column: 8, row: 1, status: 'in-progress' },
    { id: 'json-apis', label: 'JSON APIs', column: 8, row: 2, status: 'optional' },
    { id: 'grpc', label: 'gRPC', column: 8, row: 3, status: 'optional' },
  ],
  edges: [
    // Language -> Pick language
    { from: 'js', to: 'pick-lang', dashed: true },
    { from: 'ts', to: 'pick-lang', dashed: true },
    { from: 'go', to: 'pick-lang', dashed: true },

    // Pick language -> Internet / Frontend
    { from: 'pick-lang', to: 'internet' },
    { from: 'pick-lang', to: 'frontend-basics' },

    // Internet -> HTML/CSS/JS
    { from: 'internet', to: 'html', dashed: true },
    { from: 'internet', to: 'css', dashed: true },
    { from: 'internet', to: 'js-front', dashed: true },

    // Frontend basics -> VCS
    { from: 'frontend-basics', to: 'vcs' },

    // VCS -> Git / Hosting
    { from: 'vcs', to: 'git', dashed: true },
    { from: 'vcs', to: 'repo-host', dashed: true },
    { from: 'repo-host', to: 'github', dashed: true },
    { from: 'repo-host', to: 'gitlab', dashed: true },

    // Databases
    { from: 'frontend-basics', to: 'relational-db' },
    { from: 'relational-db', to: 'mysql', dashed: true },
    { from: 'relational-db', to: 'postgres', dashed: true },
    { from: 'relational-db', to: 'sqlite', dashed: true },

    // APIs
    { from: 'relational-db', to: 'learn-apis' },
    { from: 'learn-apis', to: 'rest', dashed: true },
    { from: 'learn-apis', to: 'json-apis', dashed: true },
    { from: 'learn-apis', to: 'grpc', dashed: true },
  ],
}

export const Basic: Story = {
  args: {
    config: sampleConfig,
  },
}
