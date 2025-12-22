export interface BlockPosition {
  line: number
  column: number
}

export interface BlockRange {
  start: BlockPosition
  end: BlockPosition
}

export interface BlockLocation {
  startLine: number
  endLine: number
  startCol: number
  endCol: number
}

export interface BlockElement {
  id: string
  type: BlockType
  tagName: string
  content: string
  attributes: Record<string, string>
  styles: Record<string, string>
  location: BlockLocation
  element?: HTMLElement
}

export interface SelectedBlock {
  id: string
  element: BlockElement
  domElement: HTMLElement
  location: BlockLocation
}

export type BlockType = 
  | 'text'
  | 'heading'
  | 'paragraph'
  | 'image'
  | 'button'
  | 'link'
  | 'list'
  | 'table'
  | 'div'
  | 'section'
  | 'article'
  | 'span'

export type EditorMode = 'edit' | 'preview' | 'code'

export type SelectionMode = 'normal' | 'block-select'

export interface BlockEditorProps {
  initialContent?: string
  onContentChange?: (content: string) => void
  className?: string
  mode?: EditorMode
  selectionMode?: SelectionMode
  onBlockSelect?: (block: SelectedBlock | null) => void
  onBlockEdit?: (blockId: string, content: string) => void
}

export interface BlockToolbarAction {
  id: string
  label: string
  icon: string
  command: string
  value?: string
  disabled?: boolean
}

export interface FloatingToolbarPosition {
  top: number
  left: number
  visible: boolean
}

export interface BlockManipulation {
  copy: () => void
  delete: () => void
  move: (blockId: string, direction: 'up' | 'down') => void
  duplicate: () => void
  edit: (blockId: string, content: string) => void
  style: (blockId: string, property: string, value: string) => void
}

export interface EditorHistory {
  past: string[]
  future: string[]
  current: string
}

export interface BlockEditorRef {
  getContent: () => string
  setContent: (content: string) => void
  getSelectedBlock: () => SelectedBlock | null
  selectBlock: (blockId: string) => void
  deselectBlock: () => void
  undo: () => void
  redo: () => void
  focus: () => void
}
