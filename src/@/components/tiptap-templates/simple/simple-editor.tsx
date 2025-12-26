"use client"

import { useEffect, useMemo, useRef } from "react"
import { EditorContent, EditorContext, useEditor, type Editor } from "@tiptap/react"
import type { JSONContent } from "@tiptap/core"

// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit"
import { Image } from "@tiptap/extension-image"
import { TaskItem, TaskList } from "@tiptap/extension-list"
import { TextAlign } from "@tiptap/extension-text-align"
import { Typography } from "@tiptap/extension-typography"
import { Highlight } from "@tiptap/extension-highlight"
import { Subscript } from "@tiptap/extension-subscript"
import { Superscript } from "@tiptap/extension-superscript"
import { Selection } from "@tiptap/extensions"

// --- Tiptap Node ---
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension"
import { HorizontalRule } from "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension"
import "@/components/tiptap-node/blockquote-node/blockquote-node.scss"
import "@/components/tiptap-node/code-block-node/code-block-node.scss"
import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss"
import "@/components/tiptap-node/list-node/list-node.scss"
import "@/components/tiptap-node/image-node/image-node.scss"
import "@/components/tiptap-node/heading-node/heading-node.scss"
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss"

import { NotionBlockToolbar } from "@/components/tiptap-templates/simple/notion-block-toolbar"

// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils"

// --- Styles ---
import "@/components/tiptap-templates/simple/simple-editor.scss"

export interface SimpleEditorPropsHtml {
  contentType: "html"
  value?: string
  defaultValue?: string
  applyValue?: string
  applyValueKey?: string | number
  onValueChange?: (value: string) => void
}

export interface SimpleEditorPropsJson {
  contentType?: "json"
  value?: JSONContent
  defaultValue?: JSONContent
  applyValue?: JSONContent
  applyValueKey?: string | number
  onValueChange?: (value: JSONContent) => void
}

export type SimpleEditorProps = SimpleEditorPropsHtml | SimpleEditorPropsJson

const EMPTY_DOC: JSONContent = { type: "doc", content: [] }

export function SimpleEditor(props: SimpleEditorProps) {
  const { contentType = "json", value, defaultValue, onValueChange } = props
  const editorContainerRef = useRef<HTMLDivElement>(null)

  const applyValue = "applyValue" in props ? props.applyValue : undefined
  const applyValueKey = "applyValueKey" in props ? props.applyValueKey : undefined

  const initialValue =
    applyValue ??
    value ??
    defaultValue ??
    (contentType === "json" ? (EMPTY_DOC as SimpleEditorPropsJson["value"]) : ("" as SimpleEditorPropsHtml["value"]))
  const rafEmitRef = useRef<number | null>(null)
  const onValueChangeRef = useRef<SimpleEditorProps["onValueChange"]>(onValueChange)
  const initialContentRef = useRef<string | JSONContent>(initialValue as string | JSONContent)

  const lastAppliedKeyRef = useRef<string | number | undefined>(applyValueKey)

  // Ref có thể gán trực tiếp mỗi render, không cần useEffect
  onValueChangeRef.current = onValueChange

  const editorOptions = useMemo(
    () => ({
      immediatelyRender: false,
      editorProps: {
        attributes: {
          autocomplete: "off",
          autocorrect: "off",
          autocapitalize: "off",
          "aria-label": "Main content area, start typing to enter text.",
          class: "simple-editor",
        },
      },
      extensions: [
        StarterKit.configure({
          horizontalRule: false,
          link: {
            openOnClick: false,
            enableClickSelection: true,
          },
        }),
        HorizontalRule,
        TextAlign.configure({ types: ["heading", "paragraph"] }),
        TaskList,
        TaskItem.configure({ nested: true }),
        Highlight.configure({ multicolor: true }),
        Image,
        Typography,
        Superscript,
        Subscript,
        Selection,
        ImageUploadNode.configure({
          accept: "image/*",
          maxSize: MAX_FILE_SIZE,
          limit: 3,
          upload: handleImageUpload,
          onError: (error) => console.error("Upload failed:", error),
        }),
      ],
      // Chỉ dùng cho initial mount; các thay đổi value về sau sẽ sync bằng effect bên dưới.
      content: initialContentRef.current,
      onUpdate: ({ editor }: { editor: Editor }) => {
        if (rafEmitRef.current) return
        rafEmitRef.current = requestAnimationFrame(() => {
          rafEmitRef.current = null
          const cb = onValueChangeRef.current
          if (!cb) return

          if (contentType === "json") {
            const json = editor.getJSON() as JSONContent
            ;(cb as SimpleEditorPropsJson["onValueChange"])?.(json)
            return
          }

          const html = editor.getHTML()
          ;(cb as SimpleEditorPropsHtml["onValueChange"])?.(html)
        })
      },
    }),
    []
  )

  const editor = useEditor(editorOptions, [])

  // Unmanaged mode: KHÔNG sync ngược từ value để tránh giật khi gõ nhanh.
  // Chỉ apply nội dung từ ngoài khi caller chủ động tăng applyValueKey (ví dụ AI chỉnh sửa).
  useEffect(() => {
    if (!editor) return
    if (applyValueKey == null) return
    if (applyValueKey === lastAppliedKeyRef.current) return
    lastAppliedKeyRef.current = applyValueKey

    const next = applyValue ?? (contentType === "json" ? EMPTY_DOC : "")
    editor.commands.setContent(next as string | JSONContent, { emitUpdate: false })
  }, [editor, applyValueKey, applyValue, contentType])

  useEffect(() => {
    return () => {
      if (rafEmitRef.current) cancelAnimationFrame(rafEmitRef.current)
    }
  }, [])

  const editorContextValue = useMemo(() => ({ editor }), [editor])

  return (
    <div className="simple-editor-wrapper">
      <EditorContext.Provider value={editorContextValue}>
        <div ref={editorContainerRef} className="relative">
          <NotionBlockToolbar editor={editor} containerRef={editorContainerRef} />
          <EditorContent
            editor={editor}
            role="presentation"
            className="simple-editor-content"
          />
        </div>
      </EditorContext.Provider>
    </div>
  )
}
