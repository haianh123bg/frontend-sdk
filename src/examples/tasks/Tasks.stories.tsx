import type { Meta, StoryObj } from '@storybook/react';
import { TaskCard } from './TaskCard';

const meta = {
  title: 'Examples/Tasks',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;

export const TaskBoard: StoryObj = {
  render: () => (
    <div className="flex gap-6 overflow-x-auto p-4 bg-slate-100 dark:bg-zinc-900 min-h-[400px]">
       {/* Column 1: To Do */}
       <div className="w-[320px] shrink-0 flex flex-col gap-4">
          <div className="font-bold text-sm text-text-secondary uppercase tracking-wider flex justify-between">
             To Do <span className="bg-slate-200 dark:bg-zinc-800 px-2 rounded-full text-xs flex items-center">3</span>
          </div>
          <TaskCard
            id="1"
            title="Research competitors"
            description="Analyze top 5 competitors in the market and create a comparison matrix."
            priority="high"
            tags={['Strategy', 'Research']}
            assignees={[
                { name: 'Alice', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop' }
            ]}
            dueDate="2024-03-25"
            attachmentCount={2}
          />
          <TaskCard
            id="2"
            title="Update dependencies"
            priority="low"
            tags={['Dev', 'Maintenance']}
            assignees={[
                { name: 'Bob', avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop' }
            ]}
          />
       </div>

       {/* Column 2: In Progress */}
       <div className="w-[320px] shrink-0 flex flex-col gap-4">
          <div className="font-bold text-sm text-text-secondary uppercase tracking-wider flex justify-between">
             In Progress <span className="bg-slate-200 dark:bg-zinc-800 px-2 rounded-full text-xs flex items-center">1</span>
          </div>
          <TaskCard
            id="3"
            title="Design system accessibility audit"
            description="Check all components for WCAG 2.1 compliance."
            priority="medium"
            tags={['Design', 'A11y']}
            assignees={[
                { name: 'Charlie', avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop' },
                { name: 'Dave', avatarUrl: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200&auto=format&fit=crop' }
            ]}
            dueDate="2024-03-20"
            attachmentCount={5}
          />
       </div>

       {/* Column 3: Done */}
       <div className="w-[320px] shrink-0 flex flex-col gap-4">
          <div className="font-bold text-sm text-text-secondary uppercase tracking-wider flex justify-between">
             Done <span className="bg-slate-200 dark:bg-zinc-800 px-2 rounded-full text-xs flex items-center">1</span>
          </div>
          <TaskCard
            id="4"
            title="Q1 Planning Meeting"
            priority="high"
            isCompleted={true}
            tags={['Meeting']}
            assignees={[
                { name: 'Alice', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop' }
            ]}
            dueDate="2024-03-15"
          />
       </div>
    </div>
  ),
};
