import * as React from 'react'
import { useCallback, useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { 
  BlockEditorProps, 
  BlockEditorRef, 
  SelectedBlock, 
  EditorHistory,
  FloatingToolbarPosition,
  BlockManipulation
} from './types'
import { BlockPreview } from './components/BlockPreview'
import { BlockToolbar } from './components/BlockToolbar'
import { injectSourceCoordinates } from './utils/htmlParser'
import {
  removeOuterHtmlAtLocation,
  duplicateBlockAtLocation,
  setTagStylePropertyAtLocation
} from './utils/blockManipulation'
import { replaceContentAtLocation } from './utils/htmlParser'

export const BlockEditor = forwardRef<BlockEditorRef, BlockEditorProps>(({
  initialContent = '',
  onContentChange,
  className,
  mode = 'edit',
  selectionMode = 'normal',
  onBlockSelect,
  onBlockEdit
}, ref) => {
  const [content, setContent] = useState<string>(initialContent)
  const [selectedBlock, setSelectedBlock] = useState<SelectedBlock | null>(null)
  const [toolbarPosition, setToolbarPosition] = useState<FloatingToolbarPosition>({
    top: 0,
    left: 0,
    visible: false
  })
  const [history, setHistory] = useState<EditorHistory>({
    past: [],
    future: [],
    current: initialContent
  })

  const containerRef = useRef<HTMLDivElement>(null)
  const toolbarRef = useRef<HTMLDivElement>(null)

  // Process HTML content with source coordinates
  const processedContent = React.useMemo(() => {
    return injectSourceCoordinates(content)
  }, [content])

  // Update content when initialContent changes
  useEffect(() => {
    if (initialContent !== content) {
      setContent(initialContent)
      setHistory(prev => ({
        past: [...prev.past, prev.current],
        future: [],
        current: initialContent
      }))
    }
  }, [initialContent, content])

  // Calculate toolbar position
  const calculateToolbarPosition = useCallback(() => {
    if (!selectedBlock || !toolbarRef.current) {
      setToolbarPosition(prev => ({ ...prev, visible: false }))
      return
    }

    const targetRect = selectedBlock.domElement.getBoundingClientRect()
    const toolbarRect = toolbarRef.current.getBoundingClientRect()
    const containerRect = containerRef.current?.getBoundingClientRect()

    if (!containerRect) return

    const toolbarWidth = toolbarRect.width || 300
    const toolbarHeight = toolbarRect.height || 50
    const padding = 8

    // Calculate position relative to container
    let left = targetRect.right - containerRect.left + padding
    let top = targetRect.top - containerRect.top

    // Adjust if toolbar would go outside container
    if (left + toolbarWidth > containerRect.width) {
      left = targetRect.left - containerRect.left - toolbarWidth - padding
    }

    if (top + toolbarHeight > containerRect.height) {
      top = targetRect.bottom - containerRect.top - toolbarHeight - padding
    }

    // Ensure toolbar stays within bounds
    left = Math.max(padding, Math.min(left, containerRect.width - toolbarWidth - padding))
    top = Math.max(padding, Math.min(top, containerRect.height - toolbarHeight - padding))

    setToolbarPosition({
      top: top + containerRect.top,
      left: left + containerRect.left,
      visible: true
    })
  }, [selectedBlock])

  // Update toolbar position when selection changes
  useEffect(() => {
    calculateToolbarPosition()

    const handleResize = () => calculateToolbarPosition()
    const handleScroll = () => calculateToolbarPosition()

    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll, true)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll, true)
    }
  }, [calculateToolbarPosition])

  // Handle content changes
  const handleContentChange = useCallback((newContent: string) => {
    setHistory(prev => ({
      past: [...prev.past, prev.current],
      future: [],
      current: newContent
    }))
    setContent(newContent)
    onContentChange?.(newContent)
  }, [onContentChange])

  // Handle block selection
  const handleBlockSelect = useCallback((block: SelectedBlock) => {
    setSelectedBlock(block)
    onBlockSelect?.(block)
  }, [onBlockSelect])

  // Handle block deselection
  const handleBlockDeselect = useCallback(() => {
    setSelectedBlock(null)
    setToolbarPosition(prev => ({ ...prev, visible: false }))
    onBlockSelect?.(null)
  }, [onBlockSelect])

  // Handle block editing
  const handleBlockEdit = useCallback((blockId: string, newContent: string) => {
    if (!selectedBlock) return

    const newHtml = replaceContentAtLocation(content, selectedBlock.location, newContent)
    handleContentChange(newHtml)
    onBlockEdit?.(blockId, newContent)
  }, [content, selectedBlock, handleContentChange, onBlockEdit])

  // Block manipulation functions
  const blockManipulation: BlockManipulation = React.useMemo(() => ({
    copy: () => {
      if (!selectedBlock) return
      const newHtml = duplicateBlockAtLocation(content, selectedBlock.location)
      handleContentChange(newHtml)
    },

    delete: () => {
      if (!selectedBlock) return
      const newHtml = removeOuterHtmlAtLocation(content, selectedBlock.location)
      handleContentChange(newHtml)
      handleBlockDeselect()
    },

    move: (_blockId: string, direction: 'up' | 'down') => {
      // Implementation for moving blocks would go here
      // This is a complex operation that requires DOM manipulation
      console.log(`Moving block ${_blockId} ${direction}`)
    },

    duplicate: () => {
      if (!selectedBlock) return
      const newHtml = duplicateBlockAtLocation(content, selectedBlock.location)
      handleContentChange(newHtml)
    },

    edit: (blockId: string, newContent: string) => {
      handleBlockEdit(blockId, newContent)
    },

    style: (blockId: string, property: string, value: string) => {
      if (!selectedBlock) return
      const newHtml = setTagStylePropertyAtLocation(content, selectedBlock.location, {
        propertyName: property,
        propertyValue: value
      })
      handleContentChange(newHtml)
    }
  }), [content, selectedBlock, handleContentChange, handleBlockDeselect, handleBlockEdit])

  // Handle toolbar actions
  const handleToolbarAction = useCallback((command: string, value?: string) => {
    if (!selectedBlock) return

    switch (command) {
      case 'bold':
        blockManipulation.style(selectedBlock.id, 'font-weight', 'bold')
        break
      case 'italic':
        blockManipulation.style(selectedBlock.id, 'font-style', 'italic')
        break
      case 'underline':
        blockManipulation.style(selectedBlock.id, 'text-decoration', 'underline')
        break
      case 'foreColor':
        if (value) blockManipulation.style(selectedBlock.id, 'color', value)
        break
      case 'hiliteColor':
        if (value) blockManipulation.style(selectedBlock.id, 'background-color', value)
        break
      case 'justifyLeft':
        blockManipulation.style(selectedBlock.id, 'text-align', 'left')
        break
      case 'justifyCenter':
        blockManipulation.style(selectedBlock.id, 'text-align', 'center')
        break
      case 'justifyRight':
        blockManipulation.style(selectedBlock.id, 'text-align', 'right')
        break
      case 'fontSize':
        if (value) {
          const fontSizes = {
            '1': '10px', '2': '13px', '3': '16px', '4': '18px',
            '5': '24px', '6': '32px', '7': '48px'
          }
          const fontSize = fontSizes[value as keyof typeof fontSizes]
          if (fontSize) blockManipulation.style(selectedBlock.id, 'font-size', fontSize)
        }
        break
      case 'fontName':
        if (value) blockManipulation.style(selectedBlock.id, 'font-family', value)
        break
      case 'copy':
        blockManipulation.copy()
        break
      case 'delete':
        blockManipulation.delete()
        break
      case 'replaceImage':
        // This would open an image picker modal
        console.log('Replace image for block:', selectedBlock.id)
        break
      case 'editImage':
        // This would open an image editor modal
        console.log('Edit image for block:', selectedBlock.id)
        break
      default:
        console.log('Unknown command:', command, value)
    }
  }, [selectedBlock, blockManipulation])

  // Undo/Redo functionality
  const undo = useCallback(() => {
    setHistory(prev => {
      if (prev.past.length === 0) return prev
      
      const previous = prev.past[prev.past.length - 1]
      const newPast = prev.past.slice(0, -1)
      
      setContent(previous)
      onContentChange?.(previous)
      
      return {
        past: newPast,
        future: [prev.current, ...prev.future],
        current: previous
      }
    })
  }, [onContentChange])

  const redo = useCallback(() => {
    setHistory(prev => {
      if (prev.future.length === 0) return prev
      
      const next = prev.future[0]
      const newFuture = prev.future.slice(1)
      
      setContent(next)
      onContentChange?.(next)
      
      return {
        past: [...prev.past, prev.current],
        future: newFuture,
        current: next
      }
    })
  }, [onContentChange])

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    getContent: () => content,
    setContent: (newContent: string) => {
      setContent(newContent)
      handleContentChange(newContent)
    },
    getSelectedBlock: () => selectedBlock,
    selectBlock: (blockId: string) => {
      // Implementation to select block by ID
      console.log('Select block:', blockId)
    },
    deselectBlock: handleBlockDeselect,
    undo,
    redo,
    focus: () => {
      containerRef.current?.focus()
    }
  }), [content, selectedBlock, handleContentChange, handleBlockDeselect, undo, redo])

  return (
    <div
      ref={containerRef}
      className={twMerge(
        clsx(
          'block-editor',
          'relative w-full h-full',
          'border border-gray-200 rounded-lg',
          'bg-white overflow-hidden',
          className
        )
      )}
    >
      {/* Main editor area */}
      <div className="w-full h-full relative">
        <BlockPreview
          htmlContent={processedContent}
          selectedLocation={selectedBlock?.location}
          interactionMode={mode === 'preview' ? 'preview' : selectionMode === 'block-select' ? 'select' : 'edit'}
          onBlockSelect={handleBlockSelect}
          onBlockHover={(_location) => {
            // Handle block hover if needed
          }}
          onBlockEdit={handleBlockEdit}
          onBlockDeselect={handleBlockDeselect}
          className="w-full h-full"
        />

        {/* Floating toolbar */}
        {toolbarPosition.visible && selectedBlock && (
          <div
            ref={toolbarRef}
            className="fixed z-50"
            style={{
              top: toolbarPosition.top,
              left: toolbarPosition.left
            }}
          >
            <BlockToolbar
              selectedBlock={selectedBlock}
              onAction={handleToolbarAction}
              visible={toolbarPosition.visible}
            />
          </div>
        )}
      </div>

      {/* Editor controls */}
      <div className="absolute top-2 right-2 flex gap-2">
        <button
          type="button"
          onClick={undo}
          disabled={history.past.length === 0}
          className="p-2 bg-white border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50"
          title="Hoàn tác"
        >
          ↶
        </button>
        <button
          type="button"
          onClick={redo}
          disabled={history.future.length === 0}
          className="p-2 bg-white border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50"
          title="Làm lại"
        >
          ↷
        </button>
      </div>
    </div>
  )
})

BlockEditor.displayName = 'BlockEditor'
