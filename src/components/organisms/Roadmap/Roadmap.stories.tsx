// File: src/components/organisms/Roadmap/Roadmap.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Roadmap, type RoadmapDto } from './Roadmap'

const meta: Meta<typeof Roadmap> = {
  title: 'Organisms/Roadmap',
  component: Roadmap,
}

export default meta

type Story = StoryObj<typeof Roadmap>

const sampleConfig: RoadmapDto = {
  title: 'Backend Developer Roadmap',
  description: 'Các bước gợi ý để trở thành backend engineer, chia thành nhiều giai đoạn.',
  columns: [
    {
      id: 'prerequisites',
      title: 'Prerequisites',
      groups: [
        {
          id: 'fundamentals',
          title: 'Fundamentals',
          items: [
            {
              id: 'cs-basics',
              label: 'CS basics',
              description: 'Data structure, algorithm, complexity.',
              status: 'completed',
            },
            {
              id: 'git',
              label: 'Git & Version Control',
              status: 'completed',
            },
            {
              id: 'terminal',
              label: 'Terminal & Shell',
              status: 'in-progress',
            },
          ],
        },
      ],
    },
    {
      id: 'language',
      title: 'Programming Language',
      groups: [
        {
          id: 'choose-lang',
          title: 'Choose one',
          items: [
            {
              id: 'node',
              label: 'Node.js',
              tag: 'Core',
              status: 'in-progress',
            },
            {
              id: 'go',
              label: 'Go',
              tag: 'Optional',
              status: 'optional',
            },
            {
              id: 'java',
              label: 'Java / Kotlin',
              status: 'optional',
            },
          ],
        },
      ],
    },
    {
      id: 'databases',
      title: 'Databases',
      groups: [
        {
          id: 'sql',
          title: 'SQL',
          items: [
            {
              id: 'postgres',
              label: 'PostgreSQL',
              status: 'in-progress',
            },
            {
              id: 'mysql',
              label: 'MySQL',
              status: 'todo',
            },
          ],
        },
        {
          id: 'nosql',
          title: 'NoSQL',
          items: [
            {
              id: 'redis',
              label: 'Redis & caching',
              status: 'todo',
            },
            {
              id: 'mongo',
              label: 'MongoDB',
              status: 'optional',
            },
          ],
        },
      ],
    },
    {
      id: 'advanced',
      title: 'Advanced Topics',
      groups: [
        {
          id: 'architecture',
          title: 'Architecture',
          items: [
            {
              id: 'ddd',
              label: 'Domain driven design',
              status: 'optional',
            },
            {
              id: 'microservices',
              label: 'Microservices',
              status: 'optional',
            },
          ],
        },
        {
          id: 'ops',
          title: 'Ops',
          items: [
            {
              id: 'docker',
              label: 'Docker & container',
              status: 'todo',
            },
            {
              id: 'k8s',
              label: 'Kubernetes (optional)',
              status: 'optional',
            },
          ],
        },
      ],
    },
  ],
}

export const Basic: Story = {
  args: {
    config: sampleConfig,
  },
}
