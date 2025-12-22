import * as React from 'react'
import { useCallback } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { BlockToolbarAction, SelectedBlock } from '../types'

export interface BlockToolbarProps {
  selectedBlock?: SelectedBlock | null
  actions?: BlockToolbarAction[]
  onAction?: (command: string, value?: string) => void
  className?: string
  position?: { top: number; left: number }
  visible?: boolean
}

const defaultActions: BlockToolbarAction[] = [
  {
    id: 'bold',
    label: 'Đậm',
    icon: 'bold',
    command: 'bold'
  },
  {
    id: 'italic',
    label: 'Nghiêng',
    icon: 'italic',
    command: 'italic'
  },
  {
    id: 'underline',
    label: 'Gạch chân',
    icon: 'underline',
    command: 'underline'
  },
  {
    id: 'color',
    label: 'Màu chữ',
    icon: 'palette',
    command: 'foreColor',
    value: '#000000'
  },
  {
    id: 'background',
    label: 'Màu nền',
    icon: 'paint-bucket',
    command: 'hiliteColor',
    value: '#ffffff'
  },
  {
    id: 'align-left',
    label: 'Căn trái',
    icon: 'align-left',
    command: 'justifyLeft'
  },
  {
    id: 'align-center',
    label: 'Căn giữa',
    icon: 'align-center',
    command: 'justifyCenter'
  },
  {
    id: 'align-right',
    label: 'Căn phải',
    icon: 'align-right',
    command: 'justifyRight'
  },
  {
    id: 'copy',
    label: 'Sao chép',
    icon: 'copy',
    command: 'copy'
  },
  {
    id: 'delete',
    label: 'Xóa',
    icon: 'trash-2',
    command: 'delete'
  }
]

const IconButton: React.FC<{
  icon: string
  label: string
  onClick: () => void
  disabled?: boolean
  className?: string
}> = ({ icon, label, onClick, disabled = false, className }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={label}
      className={twMerge(
        clsx(
          'inline-flex items-center justify-center',
          'w-8 h-8 rounded-md',
          'text-gray-600 hover:text-gray-900',
          'hover:bg-gray-100',
          'transition-colors duration-200',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          className
        )
      )}
    >
      <span className="sr-only">{label}</span>
      {/* Icon placeholder - in real implementation you'd use an icon library */}
      <span className="text-sm font-medium">{icon.charAt(0).toUpperCase()}</span>
    </button>
  )
}

export const BlockToolbar: React.FC<BlockToolbarProps> = ({
  selectedBlock,
  actions = defaultActions,
  onAction,
  className,
  position,
  visible = true
}) => {
  const handleAction = useCallback((action: BlockToolbarAction) => {
    if (action.disabled) return
    onAction?.(action.command, action.value)
  }, [onAction])

  const getFilteredActions = useCallback(() => {
    if (!selectedBlock) return actions

    const blockType = selectedBlock.element.type
    
    // Filter actions based on block type
    return actions.filter(action => {
      switch (blockType) {
        case 'image':
          return ['copy', 'delete'].includes(action.id)
        case 'button':
          return ['copy', 'delete', 'color', 'background'].includes(action.id)
        case 'text':
        case 'paragraph':
        case 'heading':
          return !['copy', 'delete'].includes(action.id) || 
                 ['copy', 'delete'].includes(action.id)
        default:
          return true
      }
    })
  }, [selectedBlock, actions])

  if (!visible || !selectedBlock) {
    return null
  }

  const filteredActions = getFilteredActions()

  const toolbarStyle: React.CSSProperties = position ? {
    position: 'fixed',
    top: position.top,
    left: position.left,
    zIndex: 9999
  } : {}

  return (
    <div
      className={twMerge(
        clsx(
          'block-editor-toolbar',
          'flex items-center gap-1 p-2',
          'bg-white border border-gray-200 rounded-lg shadow-lg',
          'backdrop-blur-sm bg-white/90',
          className
        )
      )}
      style={toolbarStyle}
    >
      {/* Block type indicator */}
      <div className="flex items-center px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-600 mr-2">
        {selectedBlock.element.tagName.toUpperCase()}
      </div>

      {/* Action buttons */}
      {filteredActions.map((action) => (
        <IconButton
          key={action.id}
          icon={action.icon}
          label={action.label}
          onClick={() => handleAction(action)}
          disabled={action.disabled}
        />
      ))}

      {/* Special controls for specific block types */}
      {selectedBlock.element.type === 'image' && (
        <>
          <div className="w-px h-6 bg-gray-200 mx-1" />
          <IconButton
            icon="upload"
            label="Thay thế hình ảnh"
            onClick={() => onAction?.('replaceImage')}
          />
          <IconButton
            icon="edit"
            label="Chỉnh sửa hình ảnh"
            onClick={() => onAction?.('editImage')}
          />
        </>
      )}

      {selectedBlock.element.type === 'text' && (
        <>
          <div className="w-px h-6 bg-gray-200 mx-1" />
          <select
            className="px-2 py-1 text-xs border border-gray-200 rounded"
            onChange={(e) => onAction?.('fontSize', e.target.value)}
            defaultValue="3"
          >
            <option value="1">10px</option>
            <option value="2">13px</option>
            <option value="3">16px</option>
            <option value="4">18px</option>
            <option value="5">24px</option>
            <option value="6">32px</option>
            <option value="7">48px</option>
          </select>
          <select
            className="px-2 py-1 text-xs border border-gray-200 rounded"
            onChange={(e) => onAction?.('fontName', e.target.value)}
            defaultValue="Arial"
          >
            <option value="Arial">Arial</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Georgia">Georgia</option>
            <option value="Verdana">Verdana</option>
          </select>
        </>
      )}
    </div>
  )
}

BlockToolbar.displayName = 'BlockToolbar'
