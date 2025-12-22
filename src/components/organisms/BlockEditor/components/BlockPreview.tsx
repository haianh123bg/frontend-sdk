import * as React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { BlockLocation, SelectedBlock, BlockElement } from '../types'
import { parseSourceLocation, extractBlockElements } from '../utils/htmlParser'

export interface BlockPreviewProps {
  htmlContent: string
  selectedLocation?: BlockLocation | null
  interactionMode?: 'edit' | 'select' | 'preview'
  onBlockSelect?: (block: SelectedBlock) => void
  onBlockHover?: (location: BlockLocation | null) => void
  onBlockEdit?: (blockId: string, content: string) => void
  onBlockDeselect?: () => void
  className?: string
}

export const BlockPreview: React.FC<BlockPreviewProps> = ({
  htmlContent,
  selectedLocation,
  interactionMode = 'edit',
  onBlockSelect,
  onBlockHover,
  onBlockEdit,
  onBlockDeselect,
  className
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [blocks, setBlocks] = useState<BlockElement[]>([])
  const [hoveredLocation, setHoveredLocation] = useState<BlockLocation | null>(null)

  // Parse HTML content to extract blocks
  useEffect(() => {
    const extractedBlocks = extractBlockElements(htmlContent)
    setBlocks(extractedBlocks)
  }, [htmlContent])

  // Handle block selection
  const handleElementClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    if (interactionMode === 'preview') return

    event.preventDefault()
    event.stopPropagation()

    const target = event.target as HTMLElement
    const locAttr = target.getAttribute('data-source-loc') || 
                   target.closest('[data-source-loc]')?.getAttribute('data-source-loc')

    if (!locAttr) {
      onBlockDeselect?.()
      return
    }

    const location = parseSourceLocation(locAttr)
    if (!location) return

    const block = blocks.find(b => 
      b.location.startLine === location.startLine &&
      b.location.startCol === location.startCol &&
      b.location.endLine === location.endLine &&
      b.location.endCol === location.endCol
    )

    if (!block) return

    const selectedBlock: SelectedBlock = {
      id: block.id,
      element: block,
      domElement: target,
      location
    }

    onBlockSelect?.(selectedBlock)
  }, [interactionMode, blocks, onBlockSelect, onBlockDeselect])

  // Handle block hover
  const handleElementHover = useCallback((event: React.MouseEvent<HTMLElement>) => {
    if (interactionMode === 'preview') return

    const target = event.target as HTMLElement
    const locAttr = target.getAttribute('data-source-loc') || 
                   target.closest('[data-source-loc]')?.getAttribute('data-source-loc')

    if (!locAttr) {
      setHoveredLocation(null)
      onBlockHover?.(null)
      return
    }

    const location = parseSourceLocation(locAttr)
    if (!location) return

    setHoveredLocation(location)
    onBlockHover?.(location)
  }, [interactionMode, onBlockHover])

  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    setHoveredLocation(null)
    onBlockHover?.(null)
  }, [onBlockHover])

  // Handle content editable changes
  const handleContentEdit = useCallback((event: React.FormEvent<HTMLElement>) => {
    if (interactionMode !== 'edit') return

    const target = event.target as HTMLElement
    const locAttr = target.getAttribute('data-source-loc')
    
    if (!locAttr) return

    const location = parseSourceLocation(locAttr)
    if (!location) return

    const block = blocks.find(b => 
      b.location.startLine === location.startLine &&
      b.location.startCol === location.startCol &&
      b.location.endLine === location.endLine &&
      b.location.endCol === location.endCol
    )

    if (!block) return

    const newContent = target.innerHTML
    onBlockEdit?.(block.id, newContent)
  }, [interactionMode, blocks, onBlockEdit])

  // Check if a location matches the selected or hovered location
  const isLocationSelected = useCallback((location: BlockLocation): boolean => {
    if (!selectedLocation) return false
    return (
      location.startLine === selectedLocation.startLine &&
      location.startCol === selectedLocation.startCol &&
      location.endLine === selectedLocation.endLine &&
      location.endCol === selectedLocation.endCol
    )
  }, [selectedLocation])

  const isLocationHovered = useCallback((location: BlockLocation): boolean => {
    if (!hoveredLocation) return false
    return (
      location.startLine === hoveredLocation.startLine &&
      location.startCol === hoveredLocation.startCol &&
      location.endLine === hoveredLocation.endLine &&
      location.endCol === hoveredLocation.endCol
    )
  }, [hoveredLocation])

  // Add selection and hover styles to HTML content
  const processedHtml = React.useMemo(() => {
    if (!htmlContent) return ''

    let processed = htmlContent

    // Add event handlers and styling classes via data attributes
    processed = processed.replace(
      /(<[^>]+data-source-loc="[^"]*"[^>]*)(>)/g,
      (match, openTag, closeTag) => {
        const locMatch = match.match(/data-source-loc="([^"]*)"/)
        if (!locMatch) return match

        const location = parseSourceLocation(locMatch[1])
        if (!location) return match

        const isSelected = isLocationSelected(location)
        const isHovered = isLocationHovered(location)

        let classes = 'block-editor-element'
        if (isSelected) classes += ' block-editor-selected'
        if (isHovered) classes += ' block-editor-hovered'
        if (interactionMode === 'edit') classes += ' block-editor-editable'

        // Add class attribute or append to existing one
        if (openTag.includes('class=')) {
          return openTag.replace(
            /class="([^"]*)"/,
            `class="$1 ${classes}"`
          ) + closeTag
        } else {
          return openTag + ` class="${classes}"` + closeTag
        }
      }
    )

    return processed
  }, [htmlContent, isLocationSelected, isLocationHovered, interactionMode])

  return (
    <div
      ref={containerRef}
      className={twMerge(
        clsx(
          'block-editor-preview',
          'w-full h-full overflow-auto',
          'bg-white',
          interactionMode !== 'preview' && 'cursor-pointer',
          className
        )
      )}
      onClick={handleElementClick}
      onMouseOver={handleElementHover}
      onMouseLeave={handleMouseLeave}
      onInput={handleContentEdit}
      dangerouslySetInnerHTML={{ __html: processedHtml }}
      style={{
        '--block-editor-selected-bg': 'rgba(59, 130, 246, 0.1)',
        '--block-editor-selected-border': '#3b82f6',
        '--block-editor-hovered-bg': 'rgba(156, 163, 175, 0.1)',
        '--block-editor-hovered-border': '#9ca3af'
      } as React.CSSProperties}
    />
  )
}

BlockPreview.displayName = 'BlockPreview'
