"use client"

import { useEffect, useMemo, useRef, useState, type RefObject } from "react"
import type { Editor } from "@tiptap/react"
import { MenuDropdown, type MenuDropdownOption } from "../../../../components/molecules/MenuDropdown/MenuDropdown"
import { selectCurrentBlockContent } from "@/lib/tiptap-utils"

type Anchor = { x: number; y: number }

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n))

const GUTTER_OFFSET_X = 72
const GUTTER_PAD_X = 6
const GUTTER_PAD_Y = 2

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
  const [focused, setFocused] = useState(false)
  const [menuDismissed, setMenuDismissed] = useState(false)

  const selectionActiveRef = useRef(false)
  const menuPinnedOpenRef = useRef(false)
  const hoveringRef = useRef(false)
  const focusedRef = useRef(false)
  const menuDismissedRef = useRef(false)
  const lastSelectionKeyRef = useRef<string>("")

  const activeBlockElRef = useRef<HTMLElement | null>(null)
  const activeTopLevelPosRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)
  const lastAnchorRef = useRef<Anchor | null>(null)

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

  const setAnchorIfChanged = (next: Anchor | null) => {
    const prev = lastAnchorRef.current
    if (!next && !prev) return
    if (!next || !prev) {
      lastAnchorRef.current = next
      setAnchor(next)
      return
    }

    const dx = Math.abs(next.x - prev.x)
    const dy = Math.abs(next.y - prev.y)
    if (dx < 1 && dy < 1) return

    lastAnchorRef.current = next
    setAnchor(next)
  }

  const getBlockElementFromDom = (domNode: Node | null): HTMLElement | null => {
    if (!editor) return null
    if (!domNode) return null

    const root = editor.view.dom
    const el = domNode instanceof HTMLElement ? domNode : domNode.parentElement
    if (!el) return null

    const pick = (...selectors: string[]) => {
      for (const sel of selectors) {
        const found = el.closest(sel)
        if (found && found instanceof HTMLElement && root.contains(found)) return found
      }
      return null
    }

    return pick(
      "div[data-type=\"image-upload\"]",
      ".tiptap-thread",
      "img",
      "table",
      "li",
      "blockquote",
      "pre",
      "hr",
      "h1,h2,h3,h4,h5,h6",
      "p"
    )
  }

  const getBlockElementFromDocPos = (docPos: number): HTMLElement | null => {
    if (!editor) return null
    const { doc } = editor.state
    const pos = clamp(docPos, 0, doc.content.size)
    try {
      const domAt = editor.view.domAtPos(pos)
      return getBlockElementFromDom(domAt.node)
    } catch {
      return null
    }
  }

  const updateAnchorFromBlockEl = (blockEl: HTMLElement | null) => {
    if (!editor) return
    const containerEl = containerRef.current
    if (!containerEl) return

    if (!blockEl) {
      setAnchorIfChanged(null)
      return
    }

    const containerRect = containerEl.getBoundingClientRect()
    const blockRect = blockEl.getBoundingClientRect()

    // Không clamp min X để gutter có thể nằm hẳn bên trái vùng text (tránh che chữ)
    const x = Math.min(containerRect.width - GUTTER_PAD_X, blockRect.left - containerRect.left - GUTTER_OFFSET_X)
    const y = clamp(blockRect.top - containerRect.top - GUTTER_PAD_Y, 0, containerRect.height)

    setAnchorIfChanged({ x, y })
  }

  const setMenuDismissedSafe = (next: boolean) => {
    menuDismissedRef.current = next
    setMenuDismissed(next)
  }

  const setMenuPinnedOpenSafe = (next: boolean) => {
    menuPinnedOpenRef.current = next
    setMenuPinnedOpen(next)
  }

  const scheduleUpdateFromBlockEl = (nextEl: HTMLElement | null) => {
    if (!nextEl) return
    if (activeBlockElRef.current === nextEl) return
    activeBlockElRef.current = nextEl

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null
      updateAnchorFromBlockEl(nextEl)
    })
  }

  const scheduleUpdateFromDocPos = (docPos: number) => {
    if (!editor) return
    const nextEl = getBlockElementFromDocPos(docPos)
    if (!nextEl) {
      activeBlockElRef.current = null
      updateAnchorFromBlockEl(null)
      return
    }

    scheduleUpdateFromBlockEl(nextEl)
  }

  useEffect(() => {
    if (!editor) return

    const onSelectionUpdate = () => {
      const sel = editor.state.selection
      const hasSelection = !sel.empty

      // Tránh setState lặp lại liên tục khi đang gõ (selection vẫn empty)
      if (hasSelection !== selectionActiveRef.current) {
        selectionActiveRef.current = hasSelection
        setSelectionActive(hasSelection)
      }

      // Khi đang gõ bình thường (selection empty), sel.from sẽ thay đổi theo từng ký tự.
      // Nếu ta xử lý nextKey/menuDismissed/reposition ở đây sẽ gây re-render/đo DOM liên tục => lag.
      // Reposition lúc hover đã do mousemove handle, còn lúc selection thật sẽ xử lý bên dưới.
      if (sel.empty && !menuPinnedOpenRef.current) {
        return
      }

      // Nếu không có selection và không hover/menu, đừng chạy domAtPos mỗi keystroke
      if (!hasSelection && !menuPinnedOpenRef.current && !hoveringRef.current) {
        return
      }

      const nextKey = `${sel.from}:${sel.to}`
      if (nextKey !== lastSelectionKeyRef.current) {
        lastSelectionKeyRef.current = nextKey
        setMenuDismissedSafe(false)
      }

      // Chỉ reposition khi đổi block top-level (giảm lag khi gõ trong cùng 1 block)
      const $from = sel.$from
      const nextTopLevelPos = $from.depth >= 1 ? $from.before(1) : sel.from
      if (activeTopLevelPosRef.current === nextTopLevelPos) return
      activeTopLevelPosRef.current = nextTopLevelPos
      scheduleUpdateFromDocPos(sel.from)
    }

    const onFocus = () => {
      const sel = editor.state.selection
      focusedRef.current = true
      setFocused(true)
      setMenuDismissedSafe(false)
      activeTopLevelPosRef.current = null
      scheduleUpdateFromDocPos(sel.from)
    }

    const onBlur = () => {
      focusedRef.current = false
      setFocused(false)
      if (menuPinnedOpenRef.current) return
      if (selectionActiveRef.current) return
      if (hoveringRef.current) return
      activeTopLevelPosRef.current = null
      activeBlockElRef.current = null
      updateAnchorFromBlockEl(null)
    }

    editor.on("selectionUpdate", onSelectionUpdate)
    editor.on("focus", onFocus)
    editor.on("blur", onBlur)

    onSelectionUpdate()

    return () => {
      editor.off("selectionUpdate", onSelectionUpdate)
      editor.off("focus", onFocus)
      editor.off("blur", onBlur)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [editor])

  useEffect(() => {
    if (!editor) return
    const containerEl = containerRef.current
    if (!containerEl) return

    const scrollEl = containerEl.closest(".simple-editor-wrapper")
    const onReposition = () => {
      const el = activeBlockElRef.current
      if (el) updateAnchorFromBlockEl(el)
    }

    window.addEventListener("resize", onReposition)
    scrollEl?.addEventListener("scroll", onReposition, { passive: true })
    return () => {
      window.removeEventListener("resize", onReposition)
      scrollEl?.removeEventListener("scroll", onReposition)
    }
  }, [editor, containerRef])

  useEffect(() => {
    if (!editor) return
    const containerEl = containerRef.current
    if (!containerEl) return
    const dom = editor.view.dom

    const onMouseMove = (e: MouseEvent) => {
      if (menuPinnedOpenRef.current) return

      const target = e.target as Node
      if (overlayRef.current?.contains(target)) {
        if (!hoveringRef.current) {
          hoveringRef.current = true
          setHovering(true)
        }
        return
      }

      // Nếu đang ở trong wrapper nhưng không nằm trong ProseMirror (vùng padding)
      // thì vẫn coi là đang hover editor và giữ anchor hiện tại để tránh nháy.
      if (!dom.contains(target)) {
        if (!hoveringRef.current) {
          hoveringRef.current = true
          setHovering(true)
        }
        return
      }

      if (!hoveringRef.current) {
        hoveringRef.current = true
        setHovering(true)
      }

      const sel = editor.state.selection
      if (!sel.empty) return

      const blockEl = getBlockElementFromDom(target)
      scheduleUpdateFromBlockEl(blockEl)
    }

    const onMouseLeave = () => {
      hoveringRef.current = false
      setHovering(false)
      if (selectionActiveRef.current || menuPinnedOpenRef.current || focusedRef.current) return
      activeBlockElRef.current = null
      updateAnchorFromBlockEl(null)
    }

    containerEl.addEventListener("mousemove", onMouseMove)
    containerEl.addEventListener("mouseleave", onMouseLeave)

    return () => {
      containerEl.removeEventListener("mousemove", onMouseMove)
      containerEl.removeEventListener("mouseleave", onMouseLeave)
    }
  }, [editor, containerRef])

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      const el = overlayRef.current
      if (!el) return
      if (el.contains(e.target as Node)) return
      setMenuPinnedOpenSafe(false)
      setMenuDismissedSafe(true)
    }

    document.addEventListener("mousedown", onDown)
    return () => document.removeEventListener("mousedown", onDown)
  }, [])

  const showOverlay = !!anchor && (!!editor && (selectionActive || menuPinnedOpen || hovering || focused))
  const showMenu = menuPinnedOpen || (!menuDismissed && selectionActive && focused)

  if (!editor) return null
  if (!showOverlay) return null

  return (
    <div
      ref={overlayRef}
      className="absolute z-40 pointer-events-none"
      style={{ left: anchor!.x, top: anchor!.y }}
    >
      <div className="relative flex items-center gap-1 pointer-events-auto">
        <button
          type="button"
          className="h-7 w-7 rounded-md bg-surface text-text-muted hover:bg-slate-100 hover:text-text-primary"
          onMouseDown={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          onClick={() => {
            setMenuDismissedSafe(false)
            setMenuPinnedOpenSafe(true)
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

              setMenuPinnedOpenSafe(false)
              setMenuDismissedSafe(true)
            }}
          />
        )}
      </div>
    </div>
  )
}
