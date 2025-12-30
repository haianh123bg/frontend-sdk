import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { ExcelGrid, type ExcelGridCells } from './ExcelGrid'

const seedBasicCells = (): ExcelGridCells => {
  return {
    '0:0': 'Name',
    '0:1': 'Email',
    '0:2': 'Age',
    '1:0': 'User 1',
    '1:1': 'user1@example.com',
    '1:2': 22,
    '2:0': 'User 2',
    '2:1': 'user2@example.com',
    '2:2': 31,
  }
}

const seedFormulaCells = (): ExcelGridCells => {
  return {
    '0:0': 10,
    '0:1': 5,
    '0:2': '=A1+B1',
    '1:0': 7,
    '1:1': 3,
    '1:2': '=A2*B2',
    '2:0': '=SUM(A1:A2)',
    '2:1': '=C1/C2',
  }
}

const meta = {
  title: 'Organisms/SpreadsheetGrid/ExcelGrid',
  component: ExcelGrid,
  tags: ['autodocs'],
  args: {
    height: 520,
    initialRowCount: 50,
    initialColCount: 26,
    maxRow: 10000,
    maxCol: 200,
  },
  argTypes: {
    height: { control: 'number' },
    initialRowCount: { control: 'number' },
    initialColCount: { control: 'number' },
    maxRow: { control: 'number' },
    maxCol: { control: 'number' },
    enableFormulas: { control: 'boolean' },
    editable: { control: 'boolean' },
    enableCopyPaste: { control: 'boolean' },
    showRowNumbers: { control: 'boolean' },
    showColumnLetters: { control: 'boolean' },
  },
} satisfies Meta<typeof ExcelGrid>

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: (args) => {
    const [cells, setCells] = React.useState<ExcelGridCells>(() => seedBasicCells())

    return (
      <div className="w-[min(1200px,calc(100vw-24px))]">
        <ExcelGrid {...args} value={cells} onValueChange={setCells} />
      </div>
    )
  },
}

export const Formulas: Story = {
  args: {
    height: 420,
    enableFormulas: true,
    initialRowCount: 80,
    initialColCount: 40,
  },
  render: (args) => {
    const [cells, setCells] = React.useState<ExcelGridCells>(() => seedFormulaCells())

    return (
      <div className="w-[min(1200px,calc(100vw-24px))]">
        <ExcelGrid {...args} value={cells} onValueChange={setCells} />
      </div>
    )
  },
}

export const LargeSparse: Story = {
  args: {
    height: 520,
    initialRowCount: 2000,
    initialColCount: 200,
  },
  render: (args) => {
    const [cells, setCells] = React.useState<ExcelGridCells>(() => ({ '0:0': 'Large sparse sheet' }))

    return (
      <div className="w-[min(1200px,calc(100vw-24px))]">
        <ExcelGrid {...args} value={cells} onValueChange={setCells} />
      </div>
    )
  },
}
