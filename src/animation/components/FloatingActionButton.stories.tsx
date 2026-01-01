import type { Meta, StoryObj } from '@storybook/react'
import { PhoneCall, ShieldAlert } from 'lucide-react'
import { FloatingActionButton } from './FloatingActionButton'
import { MotionProvider } from '../MotionProvider'

const meta: Meta<typeof FloatingActionButton> = {
  title: 'Animation/FloatingActionButton',
  component: FloatingActionButton,
  decorators: [
    (Story) => (
      <MotionProvider>
        <div className="flex min-h-[200px] items-end justify-end rounded-[32px] bg-gradient-to-br from-rose-50 via-amber-50 to-white p-8">
          <Story />
        </div>
      </MotionProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Story = StoryObj<typeof FloatingActionButton>

export const Primary: Story = {
  args: {
    icon: PhoneCall,
    label: 'Gọi Agent',
  },
}

export const Danger: Story = {
  args: {
    icon: ShieldAlert,
    label: 'Dừng xử lý',
    variant: 'danger',
  },
}
