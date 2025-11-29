import type { Meta, StoryObj } from '@storybook/react'
import { H1, H2, H3, H4, H5, H6, Heading } from './Heading'

const meta = {
  title: 'Atoms/Heading',
  component: Heading,
  subcomponents: { H1, H2, H3, H4, H5, H6 } as any,
  tags: ['autodocs'],
  args: {
    children: 'Heading Text',
    as: 'h2',
  },
  argTypes: {
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
    },
  },
} satisfies Meta<typeof Heading>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AllLevels: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <H1>Heading Level 1</H1>
      <H2>Heading Level 2</H2>
      <H3>Heading Level 3</H3>
      <H4>Heading Level 4</H4>
      <H5>Heading Level 5</H5>
      <H6>Heading Level 6</H6>
    </div>
  ),
}

export const CustomSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Heading as="h1" size="lg">
        H1 with LG size
      </Heading>
      <Heading as="h3" size="3xl">
        H3 with 3XL size
      </Heading>
    </div>
  ),
}
