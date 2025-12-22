import * as React from 'react'
import { 
  Type, 
  Hash, 
  Calendar, 
  List, 
  CheckSquare, 
  AlignLeft, 
  User, 
  ChevronLeft,
  Plus,
  X
} from 'lucide-react'
import { Button } from '../../atoms/Button/Button'
import { Input } from '../../atoms/Input/Input'
import { CornerPanel } from '../../molecules/CornerPanel/CornerPanel'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface FieldConfig {
  name: string
  type: string
  label: string
  enumValues?: string[]
}

export interface PropertyBuilderPanelProps {
  open: boolean
  onClose: () => void
  onAdd: (field: FieldConfig) => void
  editField?: FieldConfig | null
  onUpdate?: (field: FieldConfig) => void
}

const FIELD_TYPES = [
  { type: 'string', label: 'Văn bản', icon: <Type size={16} />, description: 'Tên, tiêu đề, ghi chú ngắn' },
  { type: 'number', label: 'Số', icon: <Hash size={16} />, description: 'Số lượng, điểm số, giá trị' },
  { type: 'date', label: 'Ngày', icon: <Calendar size={16} />, description: 'Ngày hết hạn, ngày bắt đầu' },
  { type: 'enum', label: 'Danh sách chọn', icon: <List size={16} />, description: 'Trạng thái, ưu tiên, loại' },
  { type: 'boolean', label: 'Check box', icon: <CheckSquare size={16} />, description: 'Đúng/Sai, Hoàn thành' },
  { type: 'text', label: 'Văn bản dài', icon: <AlignLeft size={16} />, description: 'Mô tả chi tiết' },
  { type: 'user', label: 'Người dùng', icon: <User size={16} />, description: 'Người được giao, người tạo' },
]

export const PropertyBuilderPanel: React.FC<PropertyBuilderPanelProps> = ({ open, onClose, onAdd, editField, onUpdate }) => {
  const [step, setStep] = React.useState<'list' | 'config'>('list')
  const [selectedType, setSelectedType] = React.useState<typeof FIELD_TYPES[0] | null>(null)
  
  // Form state
  const [fieldName, setFieldName] = React.useState('')
  const [options, setOptions] = React.useState<string[]>([])
  const [newOption, setNewOption] = React.useState('')

  React.useEffect(() => {
    if (open && editField) {
      const matchedType = FIELD_TYPES.find((t) => t.type === editField.type) ?? null
      setSelectedType(matchedType)
      setStep('config')
      setFieldName(editField.label)
      setOptions(editField.enumValues ?? [])
      setNewOption('')
      return
    }

    if (!open) {
      // Reset state when closed
      setTimeout(() => {
        setStep('list')
        setSelectedType(null)
        setFieldName('')
        setOptions([])
        setNewOption('')
      }, 300)
    }
  }, [open, editField])

  const handleSelectType = (type: typeof FIELD_TYPES[0]) => {
    setSelectedType(type)
    setStep('config')
    if (!editField) {
      setFieldName('')
      setOptions([])
      return
    }

    if (type.type !== 'enum') {
      setOptions([])
    }
  }

  const handleBack = () => {
    setStep('list')
    setSelectedType(null)
  }

  const handleAddOption = () => {
    if (newOption.trim()) {
      setOptions([...options, newOption.trim()])
      setNewOption('')
    }
  }

  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    if (!fieldName.trim() || !selectedType) return

    const payload: FieldConfig = {
      name: editField?.name ?? fieldName.trim().toLowerCase().replace(/\s+/g, '_'),
      label: fieldName.trim(),
      type: selectedType.type,
      enumValues: selectedType.type === 'enum' ? options : undefined
    }

    if (editField && onUpdate) {
      onUpdate(payload)
    } else {
      onAdd(payload)
    }
    onClose()
  }

  const titleNode = (
    <div className="flex items-center gap-2">
      {step === 'config' && (
        <Button
          size="sm"
          variant="ghost"
          className="-ml-2 h-8 w-8 px-0"
          onClick={handleBack}
          aria-label="Back"
        >
          <ChevronLeft size={16} />
        </Button>
      )}
      <span>
        {step === 'list'
          ? 'Thêm thuộc tính'
          : editField
            ? `Chỉnh sửa ${selectedType?.label}`
            : `Cấu hình ${selectedType?.label}`}
      </span>
    </div>
  )

  return (
    <CornerPanel
      open={open}
      onClose={onClose}
      title={titleNode}
      size="sm"
      className="flex flex-col z-[60]" // Higher z-index to overlay parent panel if needed
    >
      <div className="flex-1 overflow-y-auto">
        {step === 'list' ? (
          <div className="flex flex-col gap-1">
            {FIELD_TYPES.map((item) => (
              <button
                key={item.type}
                onClick={() => handleSelectType(item)}
                className={twMerge(
                  clsx(
                    'flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition-colors',
                    'hover:bg-slate-50 active:bg-slate-100'
                  )
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="text-text-secondary">{item.icon}</span>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-text-primary">{item.label}</span>
                    <span className="text-xs text-text-secondary">{item.description}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4 p-1">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-text-secondary">Tên thuộc tính</label>
              <Input 
                value={fieldName} 
                onChange={(e) => setFieldName(e.target.value)}
                placeholder="Ví dụ: Độ ưu tiên, Khách hàng..."
                autoFocus
              />
            </div>

            {selectedType?.type === 'enum' && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-secondary">Tùy chọn</label>
                <div className="flex gap-2">
                  <Input 
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                    placeholder="Nhập tên tùy chọn..."
                    onKeyDown={(e) => e.key === 'Enter' && handleAddOption()}
                  />
                  <Button size="sm" variant="secondary" onClick={handleAddOption}>
                    <Plus size={16} />
                  </Button>
                </div>
                {options.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {options.map((opt, idx) => (
                      <div key={idx} className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-xs">
                        <span>{opt}</span>
                        <button 
                          onClick={() => handleRemoveOption(idx)}
                          className="text-slate-400 hover:text-slate-600"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="pt-4">
              <Button 
                variant="primary" 
                className="w-full" 
                onClick={handleSubmit}
                disabled={!fieldName.trim()}
              >
                {editField ? 'Lưu thay đổi' : 'Tạo thuộc tính'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </CornerPanel>
  )
}
