import * as React from 'react'
import { CornerPanel } from '../../molecules/CornerPanel/CornerPanel'
import { Button } from '../../atoms/Button/Button'
import { Input } from '../../atoms/Input/Input'
import { Edit2, Copy, Trash2, Settings, ChevronLeft, Type } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface FieldSettingsPanelProps {
  open: boolean
  field: { name: string; label: string; type: string } | null
  onClose: () => void
  onRename: (name: string, newLabel: string) => void
  onDelete: (name: string) => void
  onDuplicate: (name: string) => void
  onEditType: (name: string) => void
}

export const FieldSettingsPanel: React.FC<FieldSettingsPanelProps> = ({
  open,
  field,
  onClose,
  onRename,
  onDelete,
  onDuplicate,
  onEditType
}) => {
  const [label, setLabel] = React.useState('')
  const [isRenaming, setIsRenaming] = React.useState(false)

  React.useEffect(() => {
    if (open && field) {
      setLabel(field.label)
      setIsRenaming(false)
    }
  }, [open, field])

  const handleRenameSubmit = () => {
    if (field && label.trim()) {
      onRename(field.name, label.trim())
      setIsRenaming(false)
    }
  }

  if (!field) return null

  const titleNode = (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant="ghost"
        className="-ml-2 h-8 w-8 px-0"
        onClick={onClose}
        aria-label="Back"
      >
        <ChevronLeft size={16} />
      </Button>
      <span>Cấu hình thuộc tính</span>
    </div>
  )

  return (
    <CornerPanel
      open={open}
      onClose={onClose}
      title={titleNode}
      size="sm"
      className="z-[70]" // Higher z-index than PropertyBuilder
    >
      <div className="flex flex-col gap-4 p-1">
        <div className="rounded-lg bg-slate-50 p-3">
          <div className="text-xs font-medium text-text-secondary uppercase mb-2">Thuộc tính đang chọn</div>
          <div className="flex items-center gap-2 font-medium text-text-primary">
             <span className="flex h-6 w-6 items-center justify-center rounded bg-slate-200">
                <Type size={14} />
             </span>
             {field.label}
          </div>
          <div className="text-xs text-text-muted mt-1 ml-8">Type: {field.type}</div>
        </div>

        <div className="flex flex-col gap-1">
            {/* Rename Section */}
            {isRenaming ? (
               <div className="p-2 border border-blue-200 rounded-lg bg-blue-50">
                  <div className="text-xs font-medium text-blue-600 mb-1.5">Tên hiển thị mới</div>
                  <div className="flex gap-2">
                     <Input 
                        value={label} 
                        onChange={e => setLabel(e.target.value)}
                        autoFocus
                        className="h-8 text-sm"
                        onKeyDown={e => e.key === 'Enter' && handleRenameSubmit()}
                     />
                     <Button size="sm" variant="primary" onClick={handleRenameSubmit}>Lưu</Button>
                  </div>
               </div>
            ) : (
                <button
                    onClick={() => setIsRenaming(true)}
                    className={twMerge(
                    clsx(
                        'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors',
                        'hover:bg-slate-50 active:bg-slate-100 text-text-primary'
                    )
                    )}
                >
                    <Edit2 size={16} className="text-text-secondary" />
                    <span className="text-sm font-medium">Đổi tên</span>
                </button>
            )}

            <button
                onClick={() => {
                    onEditType(field.name)
                    onClose()
                }}
                className={twMerge(
                clsx(
                    'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors',
                    'hover:bg-slate-50 active:bg-slate-100 text-text-primary'
                )
                )}
            >
                <Settings size={16} className="text-text-secondary" />
                <span className="text-sm font-medium">Chỉnh sửa thuộc tính</span>
            </button>

            <button
                onClick={() => {
                    onDuplicate(field.name)
                    onClose()
                }}
                className={twMerge(
                clsx(
                    'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors',
                    'hover:bg-slate-50 active:bg-slate-100 text-text-primary'
                )
                )}
            >
                <Copy size={16} className="text-text-secondary" />
                <span className="text-sm font-medium">Tạo bản sao</span>
            </button>

            <div className="my-1 border-t border-slate-100" />

            <button
                onClick={() => {
                    onDelete(field.name)
                    onClose()
                }}
                className={twMerge(
                clsx(
                    'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors',
                    'hover:bg-red-50 active:bg-red-100 text-red-600'
                )
                )}
            >
                <Trash2 size={16} />
                <span className="text-sm font-medium">Xóa thuộc tính</span>
            </button>
        </div>
      </div>
    </CornerPanel>
  )
}
