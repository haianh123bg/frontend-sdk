"use client"

import { useEffect, useMemo, useRef, useState, type RefObject } from "react"
import type { Editor } from "@tiptap/react"
import { MenuDropdown, type MenuDropdownOption } from "../../../../components/molecules/MenuDropdown/MenuDropdown"
import { selectCurrentBlockContent } from "@/lib/tiptap-utils"

type Anchor = { x: number; y: number }

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n))

const PlusIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
)

const GripIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <circle cx="8" cy="6" r="1.5" />
    <circle cx="16" cy="6" r="1.5" />
    <circle cx="8" cy="12" r="1.5" />
    <circle cx="16" cy="12" r="1.5" />
    <circle cx="8" cy="18" r="1.5" />
    <circle cx="16" cy="18" r="1.5" />
  </svg>
)

export interface NotionBlockToolbarProps {
  editor: Editor | null
  containerRef: RefObject<HTMLElement>
}

export function NotionBlockToolbar({ editor, containerRef }: NotionBlockToolbarProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const [anchor, setAnchor] = useState<Anchor | null>(null)
  const [selectionActive, setSelectionActive] = useState(false)
  const [menuPinnedOpen, setMenuPinnedOpen] = useState(false)
  const [hovering, setHovering] = useState(false)

  const options = useMemo<MenuDropdownOption[]>(
    () => [
      { value: "paragraph", label: "Đoạn văn" },
      { value: "h1", label: "Heading 1" },
      { value: "h2", label: "Heading 2" },
      { value: "bulletList", label: "Bullet list" },
      { value: "orderedList", label: "Numbered list" },
      { value: "taskList", label: "Todo list" },
      { value: "blockquote", label: "Quote" },
      { value: "codeBlock", label: "Code block" },
      { value: "horizontalRule", label: "Divider" },
      { value: "bold", label: "Bold" },
      { value: "italic", label: "Italic" },
    ],
    []
  )

  const updateAnchorFromPos = (pos: number) => {
    if (!editor) return
    const containerEl = containerRef.current
    if (!containerEl) return

    const containerRect = containerEl.getBoundingClientRect()
    const coords = editor.view.coordsAtPos(pos)

    const x = clamp(coords.left - containerRect.left - 44, 6, containerRect.width - 6)
    const y = clamp(coords.top - containerRect.top - 2, 0, containerRect.height - 0)

    setAnchor({ x, y })
  }

  useEffect(() => {
    if (!editor) return

    const onSelectionUpdate = () => {
      const sel = editor.state.selection
      const hasSelection = !sel.empty
      setSelectionActive(hasSelection)
      updateAnchorFromPos(sel.from)
    }

    const onFocus = () => {
      const sel = editor.state.selection
      updateAnchorFromPos(sel.from)
    }

    editor.on("selectionUpdate", onSelectionUpdate)
    editor.on("focus", onFocus)

    onSelectionUpdate()

    return () => {
      editor.off("selectionUpdate", onSelectionUpdate)
      editor.off("focus", onFocus)
    }
  }, [editor])

  useEffect(() => {
    if (!editor) return
    const containerEl = containerRef.current
    if (!containerEl) return

    const scrollEl = containerEl.closest(".simple-editor-wrapper")
    const onReposition = () => {
      const sel = editor.state.selection
      updateAnchorFromPos(sel.from)
    }

    window.addEventListener("resize", onReposition)
    scrollEl?.addEventListener("scroll", onReposition, { passive: true } as AddEventListenerOptions)
    return () => {
      window.removeEventListener("resize", onReposition)
      scrollEl?.removeEventListener("scroll", onReposition as EventListener)
    }
  }, [editor, containerRef])

  useEffect(() => {
    if (!editor) return
    const dom = editor.view.dom

    const onMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      if (!dom.contains(e.target as Node)) return

      setHovering(true)

      const sel = editor.state.selection
      if (!sel.empty) return

      const pos = editor.view.posAtCoords({ left: e.clientX, top: e.clientY })
      if (!pos) return
      updateAnchorFromPos(pos.pos)
    }

    const onMouseLeave = () => {
      setHovering(false)
      if (selectionActive || menuPinnedOpen) return
      setAnchor(null)
    }

    dom.addEventListener("mousemove", onMouseMove)
    dom.addEventListener("mouseleave", onMouseLeave)

    return () => {
      dom.removeEventListener("mousemove", onMouseMove)
      dom.removeEventListener("mouseleave", onMouseLeave)
    }
  }, [editor, containerRef, menuPinnedOpen, selectionActive])

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      const el = overlayRef.current
      if (!el) return
      if (el.contains(e.target as Node)) return
      setMenuPinnedOpen(false)
    }

    document.addEventListener("mousedown", onDown)
    return () => document.removeEventListener("mousedown", onDown)
  }, [])

  const showOverlay = !!anchor && (!!editor && (selectionActive || menuPinnedOpen || hovering))
  const showMenu = selectionActive || menuPinnedOpen

  if (!editor) return null
  if (!showOverlay) return null

  return (
    <div
      ref={overlayRef}
      className="absolute z-30"
      style={{ left: anchor!.x, top: anchor!.y }}
    >
      <div className="relative flex items-center gap-1">
        <button
          type="button"
          className="h-7 w-7 rounded-md bg-surface text-text-muted hover:bg-slate-100 hover:text-text-primary"
          onMouseDown={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          onClick={() => {
            setMenuPinnedOpen(true)
            if (editor.state.selection.empty) {
              selectCurrentBlockContent(editor)
            }
          }}
          aria-label="Add"
        >
          <PlusIcon className="h-4 w-4 mx-auto" />
        </button>

        <button
          type="button"
          className="h-7 w-7 cursor-grab rounded-md bg-surface text-text-muted hover:bg-slate-100 hover:text-text-primary"
          onMouseDown={(e) => {
            e.preventDefault()
            e.stopPropagation()
            selectCurrentBlockContent(editor)
          }}
          aria-label="Drag"
        >
          <GripIcon className="h-4 w-4 mx-auto" />
        </button>

        {showMenu && (
          <MenuDropdown
            label="Tuỳ chọn"
            options={options}
            side="bottom"
            align="start"
            sideOffset={8}
            autoPosition
            onChange={(v) => {
              const chain = editor.chain().focus()

              if (v === "paragraph") chain.setParagraph().run()
              else if (v === "h1") chain.setHeading({ level: 1 }).run()
              else if (v === "h2") chain.setHeading({ level: 2 }).run()
              else if (v === "bulletList") chain.toggleBulletList().run()
              else if (v === "orderedList") chain.toggleOrderedList().run()
              else if (v === "taskList") chain.toggleTaskList().run()
              else if (v === "blockquote") chain.toggleBlockquote().run()
              else if (v === "codeBlock") chain.toggleCodeBlock().run()
              else if (v === "horizontalRule") chain.setHorizontalRule().run()
              else if (v === "bold") chain.toggleBold().run()
              else if (v === "italic") chain.toggleItalic().run()

              setMenuPinnedOpen(false)
            }}
          />
        )}
      </div>
    </div>
  )
}
