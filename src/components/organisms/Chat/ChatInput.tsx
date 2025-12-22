import * as React from 'react'
import { Paperclip, Send, Mic, Settings } from 'lucide-react'
import { Textarea } from '../../atoms/Textarea/Textarea'
import { IconButton } from '../../atoms/IconButton/IconButton'
import { Button } from '../../atoms/Button/Button'
import { Chip } from '../../atoms/Chip/Chip'
import { generateId } from '../../../utils/id'
import type { SendMessageInput } from './types'

export interface ChatInputProps {
  conversationId: string
  disabled?: boolean
  placeholder?: string
  allowAttachments?: boolean
  maxAttachments?: number
  onSend?: (input: SendMessageInput) => void | Promise<void>
  onOpenSettings?: () => void
  onVoiceToText?: () => void
}

export const ChatInput: React.FC<ChatInputProps> = ({
  conversationId,
  disabled,
  placeholder = 'Nhập tin nhắn…',
  allowAttachments = true,
  maxAttachments = 10,
  onSend,
  onOpenSettings,
  onVoiceToText,
}) => {
  const [text, setText] = React.useState('')
  const [attachments, setAttachments] = React.useState<File[]>([])
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)

  const canSend = !disabled && (!!text.trim() || attachments.length > 0)

  const pickFiles = () => {
    if (disabled) return
    if (!allowAttachments) return
    fileInputRef.current?.click()
  }

  const handleFilesSelected = (files: FileList | null) => {
    if (!files || files.length === 0) return

    setAttachments((prev) => {
      const next = [...prev]
      for (const f of Array.from(files)) {
        if (next.length >= maxAttachments) break
        next.push(f)
      }
      return next
    })
  }

  const doSend = async (source: 'keyboard' | 'quick_action' = 'keyboard') => {
    if (!canSend) return

    const payload: SendMessageInput = {
      conversationId,
      clientId: generateId(),
      text: text.trim() ? text : undefined,
      attachments: attachments.length ? attachments : undefined,
      meta: { source },
    }

    const prevText = text
    const prevAttachments = attachments

    setText('')
    setAttachments([])

    try {
      await onSend?.(payload)
    } catch {
      setText(prevText)
      setAttachments(prevAttachments)
    }
  }

  return (
    <div className="border-t border-slate-200 bg-surface px-3 py-3">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => handleFilesSelected(e.target.files)}
        disabled={disabled || !allowAttachments}
      />

      {attachments.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-2">
          {attachments.map((f, idx) => (
            <Chip
              key={`${f.name}:${f.size}:${idx}`}
              label={f.name}
              onDelete={() => setAttachments((prev) => prev.filter((_, i) => i !== idx))}
            />
          ))}
        </div>
      )}

      <div className="flex items-end gap-2">
        <div className="flex shrink-0 items-center gap-1 pb-1">
          <IconButton
            icon={Paperclip}
            size="sm"
            variant="muted"
            aria-label="Đính kèm file"
            onClick={pickFiles}
            disabled={disabled || !allowAttachments}
          />
          {onOpenSettings && (
            <IconButton
              icon={Settings}
              size="sm"
              variant="muted"
              aria-label="Cài đặt"
              onClick={onOpenSettings}
              disabled={disabled}
            />
          )}
          {onVoiceToText && (
            <IconButton
              icon={Mic}
              size="sm"
              variant="muted"
              aria-label="Nhập giọng nói"
              onClick={onVoiceToText}
              disabled={disabled}
            />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <Textarea
            resize="none"
            className="min-h-[44px] max-h-40"
            placeholder={placeholder}
            value={text}
            disabled={disabled}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                void doSend('keyboard')
              }
            }}
          />
          <div className="mt-1 text-xs text-text-muted">Enter để gửi · Shift+Enter xuống dòng</div>
        </div>

        <div className="shrink-0 pb-1">
          <Button
            variant="primary"
            size="sm"
            onClick={() => void doSend('quick_action')}
            disabled={!canSend}
            icon={<Send size={14} />}
          >
            Gửi
          </Button>
        </div>
      </div>
    </div>
  )
}

ChatInput.displayName = 'ChatInput'
