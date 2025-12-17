import type { Meta, StoryObj } from "@storybook/react"

import "@/styles/_variables.scss"
import "@/styles/_keyframe-animations.scss"

import { SimpleEditor } from "./simple-editor"

const meta = {
  title: "Tiptap/SimpleEditor",
  component: SimpleEditor,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SimpleEditor>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
