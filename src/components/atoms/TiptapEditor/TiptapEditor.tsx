import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import type { Editor } from '@tiptap/core'

export interface TiptapEditorProps {
  value?: string
  onValueChange?: (html: string) => void
  className?: string
  placeholder?: string
}

export const TiptapEditor: React.FC<TiptapEditorProps> = ({
  value,
  onValueChange,
  className,
  placeholder = 'Nhập nội dung...',
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || '',
    editorProps: {
      attributes: {
        class:
          'min-h-[160px] w-full rounded-xl bg-surface-alt px-3 py-2 text-sm text-text-primary focus:outline-none',
        'data-placeholder': placeholder,
      },
    },
    onUpdate({ editor }: { editor: Editor }) {
      const html = editor.getHTML()
      onValueChange?.(html)
    },
  })

  React.useEffect(() => {
    if (!editor) return
    const current = editor.getHTML()
    const next = value || ''
    if (current !== next) {
      editor.commands.setContent(next, { emitUpdate: false })
    }
  }, [editor, value])

  if (!editor) return null

  return (
    <div
      className={twMerge(
        clsx(
          'rounded-xl border border-slate-200 bg-surface',
          'focus-within:ring-2 focus-within:ring-primary-500',
          className
        )
      )}
    >
      <EditorContent editor={editor} />
    </div>
  )
}

TiptapEditor.displayName = 'TiptapEditor'
