"use client"

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react"
import type { Editor } from "@tiptap/react"
import { TextSelection } from "@tiptap/pm/state"

import { MenuDropdown, type MenuDropdownOption } from "../../../../components/molecules/MenuDropdown/MenuDropdown"
import { selectCurrentBlockContent } from "@/lib/tiptap-utils"

type Anchor = { x: number; y: number }

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n))

const GUTTER_OFFSET_X = 72
const GUTTER_PAD_X = 6
const GUTTER_PAD_Y = 2

const PlusIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
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
  const [isDragging, setIsDragging] = useState(false)

  const selectionActiveRef = useRef(false)
  const menuPinnedOpenRef = useRef(false)
  const hoveringRef = useRef(false)
  const focusedRef = useRef(false)
  const lastSelectionKeyRef = useRef<string>("")

  const activeBlockElRef = useRef<HTMLElement | null>(null)
  const activeTopLevelPosRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)
  const lastAnchorRef = useRef<Anchor | null>(null)

  const draggingRef = useRef(false)
  const dragSessionRef = useRef<{ startX: number; startY: number; fromPos: number } | null>(null)

  const DRAG_THRESHOLD_PX = 5

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
      'div[data-type="image-upload"]',
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

    const x = Math.min(containerRect.width - GUTTER_PAD_X, blockRect.left - containerRect.left - GUTTER_OFFSET_X)
    const y = clamp(blockRect.top - containerRect.top - GUTTER_PAD_Y, 0, containerRect.height)

    setAnchorIfChanged({ x, y })
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

  const getTopLevelPosFromBlockEl = (blockEl: HTMLElement | null): number | null => {
    if (!editor) return null
    if (!blockEl) return null
    try {
      const pos = editor.view.posAtDOM(blockEl, 0)
      const $pos = editor.state.doc.resolve(pos)
      if ($pos.depth < 1) return null
      return $pos.before(1)
    } catch {
      return null
    }
  }

  const getTopLevelPosFromCoords = (clientX: number, clientY: number): number | null => {
    if (!editor) return null
    try {
      const found = editor.view.posAtCoords({ left: clientX, top: clientY })
      if (!found) return null
      const $pos = editor.state.doc.resolve(found.pos)
      if ($pos.depth < 1) return null
      return $pos.before(1)
    } catch {
      return null
    }
  }

  const getTopLevelPosFromPoint = (clientX: number, clientY: number): number | null => {
    if (!editor) return null
    const byCoords = getTopLevelPosFromCoords(clientX, clientY)
    if (byCoords != null) return byCoords

    const elAtPoint = document.elementFromPoint(clientX, clientY)
    if (!elAtPoint) return null
    const blockEl = getBlockElementFromDom(elAtPoint)
    return getTopLevelPosFromBlockEl(blockEl)
  }

  const moveTopLevelNode = (fromPos: number, targetPos: number, placeAfter: boolean) => {
    if (!editor) return
    const { state } = editor
    const { doc } = state
    const node = doc.nodeAt(fromPos)
    if (!node) return

    const fromStart = fromPos
    const fromEnd = fromPos + node.nodeSize

    const targetNode = doc.nodeAt(targetPos)
    if (!targetNode) return

    let insertPos = placeAfter ? targetPos + targetNode.nodeSize : targetPos

    // Không move nếu thả vào chính nó hoặc vào trong vùng của nó
    if (insertPos >= fromStart && insertPos <= fromEnd) return

    // Nếu xoá trước khi insert ở phía sau thì phải trừ nodeSize
    if (fromStart < insertPos) {
      insertPos -= node.nodeSize
    }

    const tr = state.tr
      .deleteRange(fromStart, fromEnd)
      .insert(insertPos, node)

    // Set selection về block vừa move để UX rõ ràng
    const nextSelPos = Math.min(insertPos + 1, tr.doc.content.size)
    tr.setSelection(TextSelection.near(tr.doc.resolve(nextSelPos)))

    editor.view.dispatch(tr)
    editor.view.focus()
  }

  const startGripSession = (clientX: number, clientY: number) => {
    if (!editor) return

    // Đóng menu nếu đang mở
    setMenuPinnedOpenSafe(false)

    // Xác định block bắt đầu drag theo đúng vị trí con trỏ
    const fromPos =
      getTopLevelPosFromBlockEl(activeBlockElRef.current) ??
      getTopLevelPosFromPoint(clientX, clientY) ??
      (editor.state.selection.$from.depth >= 1 ? editor.state.selection.$from.before(1) : null)
    if (fromPos == null) return

    dragSessionRef.current = { startX: clientX, startY: clientY, fromPos }
    draggingRef.current = false
    setIsDragging(false)
  }

  const handleGripPointerDown = (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (!editor) return
    e.preventDefault()
    e.stopPropagation()

    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {
      // ignore
    }

    startGripSession(e.clientX, e.clientY)

    const onMove = (ev: PointerEvent) => {
      const s = dragSessionRef.current
      if (!s) return
      if (draggingRef.current) return

      const dx = ev.clientX - s.startX
      const dy = ev.clientY - s.startY
      if (Math.abs(dx) < DRAG_THRESHOLD_PX && Math.abs(dy) < DRAG_THRESHOLD_PX) return

      draggingRef.current = true
      setIsDragging(true)
      setMenuPinnedOpenSafe(false)
    }

    const cleanup = () => {
      document.removeEventListener("pointermove", onMove)
      document.removeEventListener("pointerup", onUp)
      document.removeEventListener("pointercancel", onCancel)
    }

    const onCancel = () => {
      cleanup()
      dragSessionRef.current = null
      draggingRef.current = false
      setIsDragging(false)
      setMenuPinnedOpenSafe(false)
    }

    const onUp = (ev: PointerEvent) => {
      const s = dragSessionRef.current
      dragSessionRef.current = null

      cleanup()

      if (!s) return

      // Không vượt ngưỡng => coi là click: mở menu
      if (!draggingRef.current) {
        draggingRef.current = false
        setIsDragging(false)
        setMenuPinnedOpenSafe(true)
        return
      }

      draggingRef.current = false
      setIsDragging(false)

      const to = getTopLevelPosFromPoint(ev.clientX, ev.clientY)
      if (to == null) return

      let placeAfter = false
      try {
        const found = editor.view.posAtCoords({ left: ev.clientX, top: ev.clientY })
        const blockEl = found
          ? getBlockElementFromDocPos(found.pos)
          : getBlockElementFromDom(document.elementFromPoint(ev.clientX, ev.clientY))
        if (blockEl) {
          const rect = blockEl.getBoundingClientRect()
          placeAfter = ev.clientY > rect.top + rect.height / 2
        }
      } catch {
        // ignore
      }

      moveTopLevelNode(s.fromPos, to, placeAfter)
    }

    document.addEventListener("pointermove", onMove)
    document.addEventListener("pointerup", onUp)
    document.addEventListener("pointercancel", onCancel)
  }

  const handleGripMouseDown = (e: ReactMouseEvent<HTMLButtonElement>) => {
    // Fallback nếu môi trường không phát pointer events
    if (!editor) return
    e.preventDefault()
    e.stopPropagation()
    startGripSession(e.clientX, e.clientY)

    // Mousedown fallback chỉ chuẩn bị session, còn hành vi click/drag nên dùng pointer.
  }

  useEffect(() => {
    if (!editor) return

    const onSelectionUpdate = () => {
      if (draggingRef.current) return
      const sel = editor.state.selection
      const hasSelection = !sel.empty

      if (hasSelection !== selectionActiveRef.current) {
        selectionActiveRef.current = hasSelection
        setSelectionActive(hasSelection)
      }

      // Khi đang gõ bình thường (selection empty), sel.from thay đổi theo từng ký tự.
      // Không làm việc nặng ở đây để tránh lag.
      if (sel.empty && !menuPinnedOpenRef.current) {
        return
      }

      if (!hasSelection && !menuPinnedOpenRef.current && !hoveringRef.current) {
        return
      }

      const nextKey = `${sel.from}:${sel.to}`
      if (nextKey !== lastSelectionKeyRef.current) {
        lastSelectionKeyRef.current = nextKey
      }

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
    }

    document.addEventListener("mousedown", onDown)
    return () => document.removeEventListener("mousedown", onDown)
  }, [])

  const showOverlay = !!anchor && (!!editor && (selectionActive || menuPinnedOpen || hovering || focused))
  // Menu chỉ mở khi user click vào icon (+ hoặc grip)
  const showMenu = !draggingRef.current && menuPinnedOpen

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
          className="h-7 w-7 rounded-md bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-700"
          onMouseDown={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          onClick={() => {
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
          className={
            "h-7 w-7 cursor-grab rounded-md bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-700 " +
            (isDragging ? "cursor-grabbing bg-slate-200 text-slate-700" : "")
          }
          onPointerDown={handleGripPointerDown}
          onMouseDown={handleGripMouseDown}
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
            }}
          />
        )}
      </div>
    </div>
  )
}
