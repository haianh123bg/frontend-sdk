import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { TreeView, type TreeNode, type TreeViewProps } from './TreeView'

const demoItems: TreeNode[] = [
  {
    id: 'docs',
    label: 'docs',
    type: 'folder',
    children: [
      {
        id: 'docs/data',
        label: 'data',
        type: 'folder',
        children: [
          {
            id: 'docs/data/migration',
            label: 'migration',
            type: 'folder',
            children: [
              {
                id: 'docs/data/migration/migration-pickers-v7.md',
                label: 'migration-pickers-v7.md',
                type: 'file',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'packages',
    label: 'packages',
    type: 'folder',
    children: [
      {
        id: 'packages/x-date-pickers-pro',
        label: 'x-date-pickers-pro',
        type: 'folder',
        children: [
          {
            id: 'packages/x-date-pickers-pro/src',
            label: 'src',
            type: 'folder',
            children: [
              {
                id: 'packages/x-date-pickers-pro/src/DateRangeCalendar',
                label: 'DateRangeCalendar',
                type: 'folder',
                children: [
                  {
                    id: 'packages/x-date-pickers-pro/src/DateRangeCalendar/DateRangeCalendar.tsx',
                    label: 'DateRangeCalendar.tsx',
                    type: 'file',
                  },
                  {
                    id: 'packages/x-date-pickers-pro/src/DateRangeCalendar/DateRangeCalendar.test.tsx',
                    label: 'DateRangeCalendar.test.tsx',
                    type: 'file',
                  },
                ],
              },
              {
                id: 'packages/x-date-pickers-pro/src/DateRangePicker',
                label: 'DateRangePicker',
                type: 'folder',
                children: [
                  {
                    id: 'packages/x-date-pickers-pro/src/DateRangePicker/DateRangePicker.tsx',
                    label: 'DateRangePicker.tsx',
                    type: 'file',
                  },
                ],
              },
              {
                id: 'packages/x-date-pickers-pro/src/internals',
                label: 'internals',
                type: 'folder',
                children: [
                  {
                    id: 'packages/x-date-pickers-pro/src/internals/hooks',
                    label: 'hooks',
                    type: 'folder',
                    children: [
                      {
                        id: 'packages/x-date-pickers-pro/src/internals/hooks/models',
                        label: 'models',
                        type: 'folder',
                        children: [
                          {
                            id: 'packages/x-date-pickers-pro/src/internals/hooks/models/index.ts',
                            label: 'index.ts',
                            type: 'file',
                          },
                          {
                            id: 'packages/x-date-pickers-pro/src/internals/hooks/models/useRangePicker.ts',
                            label: 'useRangePicker.ts',
                            type: 'file',
                          },
                        ],
                      },
                      {
                        id: 'packages/x-date-pickers-pro/src/internals/hooks/useEnrichedRangePickerField.ts',
                        label: 'useEnrichedRangePickerField.ts',
                        type: 'file',
                      },
                      {
                        id: 'packages/x-date-pickers-pro/src/internals/hooks/useRangePosition.tsx',
                        label: 'useRangePosition.tsx',
                        type: 'file',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]

const meta = {
  title: 'Molecules/TreeView',
  component: TreeView,
  tags: ['autodocs'],
  args: {
    items: demoItems,
    defaultExpandedIds: ['docs', 'docs/data', 'docs/data/migration', 'packages', 'packages/x-date-pickers-pro', 'packages/x-date-pickers-pro/src'],
    defaultSelectedId: 'packages/x-date-pickers-pro/src/DateRangePicker/DateRangePicker.tsx',
  },
} satisfies Meta<typeof TreeView>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Controlled: Story = {
  render: (args: TreeViewProps) => {
    const [selectedId, setSelectedId] = useState<string | undefined>(args.defaultSelectedId)
    const [expandedIds, setExpandedIds] = useState<string[]>(args.defaultExpandedIds ?? [])

    return (
      <div className="w-[420px] rounded-xl border border-slate-200 bg-white p-2">
        <TreeView
          {...args}
          selectedId={selectedId}
          expandedIds={expandedIds}
          onSelectedIdChange={(id) => setSelectedId(id)}
          onExpandedIdsChange={(ids) => setExpandedIds(ids)}
        />
      </div>
    )
  },
}
