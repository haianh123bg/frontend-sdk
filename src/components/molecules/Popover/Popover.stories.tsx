import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../../atoms/Button/Button'
import { Popover, PopoverTrigger, PopoverContent } from './Popover'

const meta = {
  title: 'Molecules/Popover',
  component: Popover,
  tags: ['autodocs'],
  args: {
    children: null,
    defaultOpen: false,
  },
} satisfies Meta<typeof Popover>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex items-center justify-center p-12">
      <Popover>
        <PopoverTrigger>
          <Button variant="secondary">Open Popover</Button>
        </PopoverTrigger>
        <PopoverContent className="space-y-2">
          <div className="text-sm font-medium text-slate-900">Title</div>
          <div className="text-xs text-slate-600">
            This is a rich popover. You can put any content here, like text, buttons or small forms.
          </div>
          <div className="flex gap-2 pt-1">
            <Button size="sm">Primary action</Button>
            <Button size="sm" variant="ghost">
              Secondary
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
}

export const Positions: Story = {
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-8 p-12">
      <Popover>
        <PopoverTrigger>
          <Button variant="secondary">Top</Button>
        </PopoverTrigger>
        <PopoverContent side="top">Top popover</PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger>
          <Button variant="secondary">Bottom</Button>
        </PopoverTrigger>
        <PopoverContent side="bottom">Bottom popover</PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger>
          <Button variant="secondary">Left</Button>
        </PopoverTrigger>
        <PopoverContent side="left">Left popover</PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger>
          <Button variant="secondary">Right</Button>
        </PopoverTrigger>
        <PopoverContent side="right">Right popover</PopoverContent>
      </Popover>
    </div>
  ),
}
