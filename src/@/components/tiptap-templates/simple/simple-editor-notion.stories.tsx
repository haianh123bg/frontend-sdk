import type { Meta, StoryObj } from "@storybook/react"

import "@/styles/_variables.scss"
import "@/styles/_keyframe-animations.scss"

import { SimpleEditorNotion } from "./simple-editor-notion"

const meta = {
  title: "Tiptap/SimpleEditor Notion (srcAt)",
  component: SimpleEditorNotion,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SimpleEditorNotion>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
