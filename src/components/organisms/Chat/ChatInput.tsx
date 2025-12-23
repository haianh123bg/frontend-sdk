import * as React from 'react'
import { Paperclip, Send, Mic, Settings, X } from 'lucide-react'
import { IconButton } from '../../atoms/IconButton/IconButton'
import { Button } from '../../atoms/Button/Button'
import { Chip } from '../../atoms/Chip/Chip'
import { Switch } from '../../atoms/Switch/Switch'
import { MenuDropdownPortal } from '../../molecules/MenuDropdown/MenuDropdownPortal'
import { generateId } from '../../../utils/id'
import type { SendMessageInput } from './types'

export interface ChatInputProps {
  conversationId: string
  disabled?: boolean
  placeholder?: string
  allowAttachments?: boolean
  maxAttachments?: number
  mentionContexts?: Array<{ id: string; label: string; description?: string }>
  replyTo?: { id: string; senderName?: string; previewText?: string }
  onCancelReply?: () => void
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
  mentionContexts,
  replyTo,
  onCancelReply,
  onSend,
  onOpenSettings,
  onVoiceToText,
}) => {
  const [text, setText] = React.useState('')
  const [attachments, setAttachments] = React.useState<File[]>([])
  const [linkedSources, setLinkedSources] = React.useState<string[]>([])
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null)
  const highlighterRef = React.useRef<HTMLDivElement | null>(null)
  const highlighterContentRef = React.useRef<HTMLDivElement | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const attachmentsButtonRef = React.useRef<HTMLButtonElement | null>(null)
  const settingsButtonRef = React.useRef<HTMLButtonElement | null>(null)

  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false)
  const [isAttachmentsOpen, setIsAttachmentsOpen] = React.useState(false)
  const [attachmentsMenuMode, setAttachmentsMenuMode] = React.useState<'root' | 'linked'>('root')
  const [enableWebSearch, setEnableWebSearch] = React.useState(false)
  const [enableAutoApprove, setEnableAutoApprove] = React.useState(false)
  const [isListening, setIsListening] = React.useState(false)

  const [isMentionOpen, setIsMentionOpen] = React.useState(false)
  const [mentionStartIndex, setMentionStartIndex] = React.useState<number | null>(null)
  const [mentionCaretIndex, setMentionCaretIndex] = React.useState(0)
  const [mentionQuery, setMentionQuery] = React.useState('')
  const [mentionActiveIndex, setMentionActiveIndex] = React.useState(0)

  const resolvedMentionContexts = React.useMemo(() => {
    const fallback: Array<{ id: string; label: string; description?: string }> = [
      { id: 'ctx:conversation', label: 'Cuộc trò chuyện', description: 'Ngữ cảnh của cuộc trò chuyện hiện tại' },
      { id: 'ctx:docs', label: 'Tài liệu', description: 'Tài liệu/ghi chú liên quan' },
      { id: 'ctx:files', label: 'Files', description: 'Danh sách file đính kèm hoặc tham chiếu' },
      { id: 'ctx:kb', label: 'Knowledge Base', description: 'Kho kiến thức' },
    ]
    return mentionContexts && mentionContexts.length ? mentionContexts : fallback
  }, [mentionContexts])

  const filteredMentionContexts = React.useMemo(() => {
    const q = mentionQuery.trim().toLowerCase()
    if (!q) return resolvedMentionContexts
    return resolvedMentionContexts.filter((c) => c.label.toLowerCase().includes(q) || c.id.toLowerCase().includes(q))
  }, [mentionQuery, resolvedMentionContexts])

  React.useEffect(() => {
    if (!isMentionOpen) return
    setMentionActiveIndex((prev) => {
      if (prev < 0) return 0
      if (prev >= filteredMentionContexts.length) return 0
      return prev
    })
  }, [filteredMentionContexts.length, isMentionOpen])

  React.useEffect(() => {
    if (!isMentionOpen) return
    setMentionActiveIndex(0)
  }, [isMentionOpen, mentionQuery])

  const updateMentionState = (nextValue: string, caret: number) => {
    const upto = nextValue.slice(0, caret)
    const at = upto.lastIndexOf('@')
    if (at < 0) {
      setIsMentionOpen(false)
      setMentionStartIndex(null)
      setMentionQuery('')
      return
    }

    const before = at === 0 ? '' : upto[at - 1]
    if (before && !/\s/.test(before)) {
      setIsMentionOpen(false)
      setMentionStartIndex(null)
      setMentionQuery('')
      return
    }

    const q = upto.slice(at + 1)
    if (/\s/.test(q) || q.includes('[') || q.includes(']')) {
      setIsMentionOpen(false)
      setMentionStartIndex(null)
      setMentionQuery('')
      return
    }

    setIsMentionOpen(true)
    setMentionStartIndex(at)
    setMentionQuery(q)
    setMentionCaretIndex(caret)
  }

  const syncMentionActiveIndex = (nextIndex: number) => {
    const len = filteredMentionContexts.length
    if (len <= 0) {
      setMentionActiveIndex(0)
      return
    }
    const normalized = ((nextIndex % len) + len) % len
    setMentionActiveIndex(normalized)
  }

  const syncHighlighterScroll = () => {
    const ta = textareaRef.current
    const hl = highlighterRef.current
    const content = highlighterContentRef.current
    if (!ta || !hl || !content) return
    content.style.transform = `translate(${-ta.scrollLeft}px, ${-ta.scrollTop}px)`
  }

  const insertMention = (ctx: { id: string; label: string }) => {
    const start = mentionStartIndex
    const caret = mentionCaretIndex
    if (start === null) return

    const token = `@[${ctx.label}] `
    const next = `${text.slice(0, start)}${token}${text.slice(caret)}`
    setText(next)

    setIsMentionOpen(false)
    setMentionStartIndex(null)
    setMentionQuery('')
    setMentionCaretIndex(0)
    setMentionActiveIndex(0)

    requestAnimationFrame(() => {
      const ta = textareaRef.current
      if (!ta) return
      const nextPos = start + token.length
      ta.focus()
      try {
        ta.setSelectionRange(nextPos, nextPos)
      } catch {
      }
    })
  }

  const renderHighlightedText = (value: string) => {
    const re = /@\[[^\]]+\]/g
    const nodes: React.ReactNode[] = []
    let last = 0
    let match: RegExpExecArray | null = null

    while ((match = re.exec(value))) {
      const start = match.index
      const raw = match[0]
      if (start > last) {
        nodes.push(value.slice(last, start))
      }
      nodes.push(
        <span key={`${start}:${raw}`} className="rounded-md bg-primary-100 px-1 text-transparent">
          {raw}
        </span>
      )
      last = start + raw.length
    }

    if (last < value.length) nodes.push(value.slice(last))
    return nodes
  }

  const extractMentions = (content: string) => {
    const re = /@\[([^\]]+)\]/g
    const labels: string[] = []
    let m: RegExpExecArray | null = null
    while ((m = re.exec(content))) {
      const label = m[1]
      if (label) labels.push(label)
    }

    const ids = labels
      .map((label) => resolvedMentionContexts.find((c) => c.label === label)?.id ?? label)
      .filter((v, idx, arr) => arr.indexOf(v) === idx)

    return ids.length ? ids : undefined
  }

  const minTextareaHeight = 44
  const maxTextareaHeight = 160

  const syncTextareaHeight = () => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = 'auto'
    const desired = Math.min(Math.max(ta.scrollHeight, minTextareaHeight), maxTextareaHeight)
    ta.style.height = `${desired}px`
    ta.style.overflowY = ta.scrollHeight > maxTextareaHeight ? 'auto' : 'hidden'
  }

  React.useLayoutEffect(() => {
    syncTextareaHeight()
    syncHighlighterScroll()
  }, [text])

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
      meta: {
        source,
        webSearch: enableWebSearch,
        autoApprove: enableAutoApprove,
        linkedSources: linkedSources.length ? linkedSources : undefined,
        mentions: extractMentions(text),
      },
    }

    const prevText = text
    const prevAttachments = attachments

    setText('')
    setAttachments([])
    setLinkedSources([])
    setIsMentionOpen(false)
    setMentionStartIndex(null)
    setMentionQuery('')
    setMentionCaretIndex(0)
    setMentionActiveIndex(0)

    try {
      await onSend?.(payload)
    } catch {
      setText(prevText)
      setAttachments(prevAttachments)
    }
  }

  const startVoiceToText = () => {
    if (disabled) return

    onVoiceToText?.()

    if (typeof window === 'undefined') return

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) return

    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = true
    recognition.lang = 'vi-VN'

    setIsListening(true)

    recognition.onresult = (event: any) => {
      const result = event?.results?.[0]
      const transcript = result?.[0]?.transcript
      if (typeof transcript === 'string' && transcript.trim()) {
        setText((prev) => (prev ? `${prev} ${transcript}` : transcript).trim())
      }
    }

    recognition.onerror = () => {
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.start()
  }

  return (
    <div ref={containerRef} className="border-t border-slate-200 bg-surface px-3 py-3">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => handleFilesSelected(e.target.files)}
        disabled={disabled || !allowAttachments}
      />

      <div className="rounded-2xl border border-slate-200 bg-surface px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-primary-500">
        {replyTo && (
          <div className="mb-2 flex items-start justify-between gap-2 rounded-xl bg-slate-50 px-3 py-2">
            <div className="min-w-0">
              <div className="text-xs font-medium text-text-secondary truncate">Reply {replyTo.senderName ? `· ${replyTo.senderName}` : ''}</div>
              <div className="text-xs text-text-muted truncate">{replyTo.previewText || ''}</div>
            </div>
            <IconButton
              icon={X}
              size="xs"
              variant="muted"
              aria-label="Hủy reply"
              onClick={() => onCancelReply?.()}
            />
          </div>
        )}
        {(attachments.length > 0 || linkedSources.length > 0) && (
          <div className="mb-2 flex flex-wrap gap-2">
            {attachments.map((f, idx) => (
              <Chip
                key={`${f.name}:${f.size}:${idx}`}
                label={f.name}
                onDelete={() => setAttachments((prev) => prev.filter((_, i) => i !== idx))}
              />
            ))}
            {linkedSources.map((src) => (
              <Chip
                key={`linked:${src}`}
                label={src}
                onDelete={() => setLinkedSources((prev) => prev.filter((s) => s !== src))}
              />
            ))}
          </div>
        )}

        <div className="relative">
          <div
            ref={highlighterRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden px-1 py-1 text-sm leading-5 whitespace-pre-wrap break-words text-transparent"
          >
            <div ref={highlighterContentRef}>{renderHighlightedText(text)}</div>
          </div>

          <textarea
            ref={textareaRef}
            className="relative z-10 min-h-[44px] max-h-40 w-full resize-none bg-transparent px-1 py-1 text-sm leading-5 text-text-primary placeholder:text-text-muted focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
            placeholder={placeholder}
            value={text}
            disabled={disabled}
            onScroll={() => {
              syncHighlighterScroll()
            }}
            onClick={() => {
              const ta = textareaRef.current
              if (!ta) return
              updateMentionState(text, ta.selectionStart ?? text.length)
            }}
            onKeyUp={() => {
              const ta = textareaRef.current
              if (!ta) return
              updateMentionState(text, ta.selectionStart ?? text.length)
            }}
            onChange={(e) => {
              const next = e.target.value
              const caret = e.target.selectionStart ?? next.length
              setText(next)
              syncTextareaHeight()
              updateMentionState(next, caret)
            }}
            onKeyDown={(e) => {
              if (isMentionOpen) {
                if (e.key === 'Escape') {
                  e.preventDefault()
                  setIsMentionOpen(false)
                  setMentionStartIndex(null)
                  setMentionQuery('')
                  return
                }

                if (e.key === 'ArrowDown') {
                  e.preventDefault()
                  syncMentionActiveIndex(mentionActiveIndex + 1)
                  return
                }

                if (e.key === 'ArrowUp') {
                  e.preventDefault()
                  syncMentionActiveIndex(mentionActiveIndex - 1)
                  return
                }

                if ((e.key === 'Enter' && !e.shiftKey) || e.key === 'Tab') {
                  const ctx = filteredMentionContexts[mentionActiveIndex]
                  if (ctx) {
                    e.preventDefault()
                    insertMention(ctx)
                    return
                  }
                }
              }

              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                void doSend('keyboard')
              }
            }}
          />

          <MenuDropdownPortal
            anchorRef={textareaRef as unknown as React.RefObject<HTMLElement | null>}
            open={isMentionOpen}
            label="Chọn context"
            options={filteredMentionContexts.map((c) => ({ value: c.id, label: c.label }))}
            value={filteredMentionContexts[mentionActiveIndex]?.id}
            side="top"
            align="start"
            className="min-w-[240px]"
            onDismiss={() => {
              setIsMentionOpen(false)
              setMentionStartIndex(null)
              setMentionQuery('')
            }}
            renderOption={(option, state) => {
              const ctx = resolvedMentionContexts.find((c) => c.id === option.value)
              return (
                <button
                  type="button"
                  className={
                    state.selected
                      ? 'flex w-full flex-col gap-0.5 rounded-xl bg-slate-100 px-4 py-2 text-left'
                      : 'flex w-full flex-col gap-0.5 rounded-xl px-4 py-2 text-left hover:bg-slate-50'
                  }
                  onMouseEnter={() => {
                    const idx = filteredMentionContexts.findIndex((c) => c.id === option.value)
                    if (idx >= 0) setMentionActiveIndex(idx)
                  }}
                  onClick={() => {
                    if (!ctx) return
                    insertMention(ctx)
                  }}
                >
                  <span className="text-sm text-text-secondary">{ctx?.label ?? option.label ?? option.value}</span>
                  {ctx?.description && <span className="text-xs text-text-muted">{ctx.description}</span>}
                </button>
              )
            }}
          />
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="relative">
              <IconButton
                ref={attachmentsButtonRef}
                icon={Paperclip}
                size="sm"
                variant="muted"
                aria-label="Đính kèm"
                onClick={() => {
                  if (disabled) return
                  setIsAttachmentsOpen((v) => {
                    const next = !v
                    if (next) setAttachmentsMenuMode('root')
                    return next
                  })
                  setIsSettingsOpen(false)
                }}
                disabled={disabled}
              />

              <MenuDropdownPortal
                anchorRef={attachmentsButtonRef}
                open={isAttachmentsOpen}
                label={attachmentsMenuMode === 'root' ? 'Đính kèm' : 'Dữ liệu liên kết'}
                headerRight={
                  attachmentsMenuMode === 'linked' ? (
                    <button
                      type="button"
                      className="rounded px-1 py-0.5 text-[10px] leading-none text-text-muted hover:text-text-secondary"
                      onClick={(e) => {
                        e.stopPropagation()
                        setAttachmentsMenuMode('root')
                      }}
                    >
                      Quay lại
                    </button>
                  ) : null
                }
                options={
                  attachmentsMenuMode === 'root'
                    ? [
                        {
                          value: 'upload',
                          label: 'Upload từ máy',
                          disabled: disabled || !allowAttachments,
                        },
                        { value: 'linked', label: 'Dữ liệu liên kết', disabled },
                      ]
                    : [
                        { value: 'Google Drive', label: 'Google Drive' },
                        { value: 'Hệ thống', label: 'Hệ thống' },
                        { value: 'OneDrive', label: 'OneDrive' },
                        { value: 'Dropbox', label: 'Dropbox' },
                      ]
                }
                renderOption={(option) => {
                  if (attachmentsMenuMode === 'root' && option.value === 'linked') {
                    return (
                      <button
                        type="button"
                        className="flex w-full items-center justify-between px-4 py-1.5 text-sm text-text-secondary hover:bg-slate-50"
                        onClick={() => {
                          if (option.disabled) return
                          setAttachmentsMenuMode('linked')
                        }}
                        disabled={option.disabled}
                      >
                        <span>{option.label ?? option.value}</span>
                        <span className="text-xs text-text-muted">›</span>
                      </button>
                    )
                  }

                  if (attachmentsMenuMode === 'root' && option.value === 'upload') {
                    return (
                      <button
                        type="button"
                        className="flex w-full items-center justify-between px-4 py-1.5 text-sm text-text-secondary hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                        onClick={() => {
                          if (option.disabled) return
                          pickFiles()
                          setIsAttachmentsOpen(false)
                          setAttachmentsMenuMode('root')
                        }}
                        disabled={option.disabled}
                      >
                        <span>{option.label ?? option.value}</span>
                      </button>
                    )
                  }

                  return (
                    <button
                      type="button"
                      className="flex w-full items-center justify-between px-4 py-1.5 text-sm text-text-secondary hover:bg-slate-50"
                      onClick={() => {
                        if (attachmentsMenuMode !== 'linked') return
                        setLinkedSources((prev) => (prev.includes(option.value) ? prev : [...prev, option.value]))
                        setIsAttachmentsOpen(false)
                        setAttachmentsMenuMode('root')
                      }}
                    >
                      <span>{option.label ?? option.value}</span>
                    </button>
                  )
                }}
                align="start"
                onDismiss={() => {
                  setIsAttachmentsOpen(false)
                  setAttachmentsMenuMode('root')
                }}
              />
            </div>

            <div className="relative">
              <IconButton
                ref={settingsButtonRef}
                icon={Settings}
                size="sm"
                variant="muted"
                aria-label="Cài đặt"
                onClick={() => {
                  if (disabled) return
                  onOpenSettings?.()
                  setIsSettingsOpen((v) => !v)
                  setIsAttachmentsOpen(false)
                  setAttachmentsMenuMode('root')
                }}
                disabled={disabled}
              />

              <MenuDropdownPortal
                anchorRef={settingsButtonRef}
                open={isSettingsOpen}
                label="Cài đặt"
                options={[
                  { value: 'web_search', label: 'Tìm kiếm trên web' },
                  { value: 'auto_approve', label: 'Tự động phê duyệt' },
                ]}
                renderOption={(option) => {
                  const checked = option.value === 'web_search' ? enableWebSearch : enableAutoApprove
                  const toggle = () => {
                    if (option.value === 'web_search') setEnableWebSearch((v) => !v)
                    if (option.value === 'auto_approve') setEnableAutoApprove((v) => !v)
                  }

                  return (
                    <button
                      type="button"
                      className="flex w-full items-center justify-between px-4 py-1.5 text-sm text-text-secondary hover:bg-slate-50"
                      onClick={toggle}
                    >
                      <span>{option.label ?? option.value}</span>
                      <span onClick={(e) => e.stopPropagation()}>
                        <Switch checked={checked} onChange={() => toggle()} size="sm" />
                      </span>
                    </button>
                  )
                }}
                align="start"
                onDismiss={() => setIsSettingsOpen(false)}
              />
            </div>

            <IconButton
              icon={Mic}
              size="sm"
              variant="muted"
              aria-label="Nhập giọng nói"
              onClick={startVoiceToText}
              disabled={disabled}
              className={isListening ? 'bg-primary-100' : undefined}
            />
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => void doSend('quick_action')}
            disabled={!canSend}
            icon={<Send size={16} />}
            aria-label="Gửi"
            className="h-9 w-9 px-0"
          />
        </div>
      </div>
    </div>
  )
}

ChatInput.displayName = 'ChatInput'
