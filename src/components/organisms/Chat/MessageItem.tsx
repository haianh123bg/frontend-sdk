import * as React from 'react'
import {
  Copy,
  CornerUpLeft,
  EllipsisVertical,
  ExternalLink,
  Download,
  Trash2,
  RotateCcw,
  Undo2,
  ThumbsUp,
  Heart,
  Laugh,
  Play,
  MapPin,
  PhoneIncoming,
  PhoneMissed,
  Video,
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  FileArchive,
} from 'lucide-react'
import { Avatar } from '../../atoms/Avatar/Avatar'
import { Button } from '../../atoms/Button/Button'
import { IconButton } from '../../atoms/IconButton/IconButton'
import { Image } from '../../atoms/Image/Image'
import { Caption } from '../../atoms/TypographyPrimitives'
import { DropdownMenu, DropdownTrigger, DropdownContent, DropdownItem } from '../../molecules/DropdownMenu/DropdownMenu'
import { Modal } from '../../molecules/Modal/Modal'
import type { AgentThinkingState, ChatMessage } from './types'
import { formatMessageTime, isProbablyUrl } from './utils'

export interface MessageItemProps {
  message: ChatMessage
  currentUserId: string
  showSenderName?: boolean
  showOutgoingAvatar?: boolean
  incomingMessageStyle?: 'default' | 'flat'
  replyToMessage?: ChatMessage
  highlighted?: boolean
  onJumpToMessage?: (messageId: string) => void
  onCopy?: (message: ChatMessage) => void
  onDelete?: (message: ChatMessage) => void
  onRecall?: (message: ChatMessage) => void
  onReply?: (message: ChatMessage) => void
  onReact?: (message: ChatMessage, reaction: string) => void
  onRetrySend?: (message: ChatMessage) => void
}

const statusLabel: Record<NonNullable<ChatMessage['status']>, string> = {
  sending: 'Đang gửi',
  sent: 'Đã gửi',
  delivered: 'Đã nhận',
  seen: 'Đã xem',
  failed: 'Gửi lỗi',
}

function safeText(text: string) {
  return text
}

function formatDuration(sec: number) {
  const s = Math.max(0, Math.floor(sec))
  const mm = String(Math.floor(s / 60)).padStart(2, '0')
  const ss = String(s % 60).padStart(2, '0')
  return `${mm}:${ss}`
}

function formatFileSize(size?: number) {
  if (!Number.isFinite(size) || !size || size <= 0) return undefined
  const kb = size / 1024
  if (kb < 1024) return `${kb.toFixed(kb < 10 ? 1 : 0)} KB`
  const mb = kb / 1024
  if (mb < 1024) return `${mb.toFixed(mb < 10 ? 1 : 0)} MB`
  const gb = mb / 1024
  return `${gb.toFixed(gb < 10 ? 1 : 0)} GB`
}

function getFileExtension(nameOrUrl: string) {
  const clean = nameOrUrl.split('?')[0].split('#')[0]
  const base = clean.split('/').pop() || clean
  const idx = base.lastIndexOf('.')
  if (idx <= 0) return ''
  return base.slice(idx + 1).toLowerCase()
}

function getFileBadge(ext: string) {
  const e = ext.toLowerCase()

  if (['pdf'].includes(e)) {
    return { label: 'PDF', className: 'bg-red-500 text-white' }
  }
  if (['doc', 'docx'].includes(e)) {
    return { label: 'W', className: 'bg-blue-600 text-white' }
  }
  if (['xls', 'xlsx', 'csv'].includes(e)) {
    return { label: 'X', className: 'bg-emerald-600 text-white' }
  }
  if (['ppt', 'pptx'].includes(e)) {
    return { label: 'P', className: 'bg-orange-500 text-white' }
  }

  if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(e)) {
    return { icon: FileImage, className: 'bg-teal-500 text-white' }
  }
  if (['mp4', 'mov', 'webm', 'mkv'].includes(e)) {
    return { icon: FileVideo, className: 'bg-fuchsia-500 text-white' }
  }
  if (['mp3', 'wav', 'ogg', 'm4a'].includes(e)) {
    return { icon: FileAudio, className: 'bg-indigo-500 text-white' }
  }
  if (['zip', 'rar', '7z', 'tar', 'gz'].includes(e)) {
    return { icon: FileArchive, className: 'bg-amber-500 text-white' }
  }

  return { icon: FileText, className: 'bg-slate-100 text-text-secondary' }
}

export const MessageItem: React.FC<MessageItemProps> = ({
  message,
  currentUserId,
  showSenderName = true,
  showOutgoingAvatar = false,
  incomingMessageStyle = 'default',
  replyToMessage,
  highlighted,
  onJumpToMessage,
  onCopy,
  onDelete,
  onRecall,
  onReply,
  onReact,
  onRetrySend,
}) => {
  const isOutgoing = message.direction === 'outgoing' || message.senderId === currentUserId
  const isSystem = message.direction === 'system' || message.content.type === 'system'
  const [openImage, setOpenImage] = React.useState(false)
  const [openVideo, setOpenVideo] = React.useState(false)
  const [openSticker, setOpenSticker] = React.useState(false)

  if (isSystem) {
    return (
      <div className="flex justify-center py-2">
        <Caption className="rounded-full bg-surface-alt px-3 py-1 text-text-muted">
          {message.content.type === 'system' ? message.content.text : safeText((message.content as any).text || '')}
        </Caption>
      </div>
    )
  }

  const isNoBubble =
    message.content.type === 'image' ||
    message.content.type === 'video' ||
    message.content.type === 'sticker' ||
    message.content.type === 'audio' ||
    message.content.type === 'contact' ||
    message.content.type === 'location' ||
    message.content.type === 'call' ||
    message.content.type === 'file'

  const isColoredOutgoingBubble = isOutgoing && !isNoBubble

  const outgoingBubbleBase =
    'max-w-[80%] min-w-0 rounded-2xl px-3 py-2 text-sm break-words whitespace-pre-wrap [overflow-wrap:anywhere]'
  const incomingBubbleBase =
    incomingMessageStyle === 'flat'
      ? 'max-w-[80%] min-w-0 rounded-xl px-2 py-1.5 text-sm break-words whitespace-pre-wrap [overflow-wrap:anywhere]'
      : outgoingBubbleBase

  const mediaBubbleBase = 'max-w-[80%] min-w-0 rounded-2xl p-0 bg-transparent'

  const bubbleClass = isNoBubble
    ? mediaBubbleBase
    : isOutgoing
      ? `bg-primary-500 text-white ${outgoingBubbleBase}`
      : incomingMessageStyle === 'flat'
        ? `bg-transparent text-text-primary ${incomingBubbleBase}`
        : `bg-surface-alt text-text-primary ${incomingBubbleBase}`

  const wrapperClass = isOutgoing ? 'justify-end' : 'justify-start'

  const timeText = formatMessageTime(message.createdAt)
  const statusText = message.status ? statusLabel[message.status] : undefined

  const replyPreviewText = React.useMemo(() => {
    if (!message.replyToId) return undefined
    if (!replyToMessage) return 'Tin nhắn đã bị xóa'
    if (replyToMessage.content.type === 'text') return safeText(replyToMessage.content.text)
    if (replyToMessage.content.type === 'markdown') return safeText(replyToMessage.content.markdown)
    if (replyToMessage.content.type === 'image') return '[Ảnh]'
    if (replyToMessage.content.type === 'video') return '[Video]'
    if (replyToMessage.content.type === 'audio') return '[Audio]'
    if (replyToMessage.content.type === 'sticker') return '[Sticker]'
    if (replyToMessage.content.type === 'contact') return `[Liên hệ] ${replyToMessage.content.name}`
    if (replyToMessage.content.type === 'location') return '[Vị trí]'
    if (replyToMessage.content.type === 'call') return replyToMessage.content.kind === 'missed' ? '[Cuộc gọi nhỡ]' : '[Cuộc gọi đến]'
    if (replyToMessage.content.type === 'file') return `[File] ${replyToMessage.content.fileName}`
    if (replyToMessage.content.type === 'system') return safeText(replyToMessage.content.text)
    return ''
  }, [message.replyToId, replyToMessage])

  const reactionEntries = React.useMemo(() => {
    const r = message.reactions
    if (!r) return [] as Array<[string, number]>
    return Object.entries(r).filter(([, count]) => Number(count) > 0)
  }, [message.reactions])

  const renderContent = () => {
    if (message.content.type === 'text') {
      const t = safeText(message.content.text)
      if (isProbablyUrl(t.trim())) {
        return (
          <a
            href={t.trim()}
            target="_blank"
            rel="noreferrer"
            className={isOutgoing ? 'underline text-white' : 'underline text-primary-600'}
          >
            {t}
          </a>
        )
      }
      return <span>{t}</span>
    }

    if (message.content.type === 'markdown') {
      return <span>{safeText(message.content.markdown)}</span>
    }

    if (message.content.type === 'image') {
      return (
        <>
          <button
            type="button"
            className="block overflow-hidden rounded-2xl"
            onClick={() => setOpenImage(true)}
            aria-label="Xem ảnh"
          >
            <Image
              src={message.content.thumbnailUrl || message.content.url}
              alt={message.content.alt || 'image'}
              className="max-h-56 w-auto max-w-[260px] rounded-2xl"
              objectFit="cover"
            />
          </button>
          <Modal open={openImage} onClose={() => setOpenImage(false)} title="Ảnh">
            <Image
              src={message.content.url}
              alt={message.content.alt || 'image'}
              className="w-full max-h-[70vh]"
              objectFit="contain"
            />
          </Modal>
        </>
      )
    }

    if (message.content.type === 'call') {
      const isMissed = message.content.kind === 'missed'
      const isVideo = !!message.content.isVideo
      const title = isMissed ? 'Cuộc gọi nhỡ' : 'Cuộc gọi đến'
      const subtitle =
        typeof message.content.durationSec === 'number'
          ? `Thời lượng: ${formatDuration(message.content.durationSec)}`
          : isMissed
            ? 'Không trả lời'
            : 'Đã kết thúc'

      const LeadingIcon = isVideo ? Video : isMissed ? PhoneMissed : PhoneIncoming

      return (
        <div className="w-[280px] max-w-full overflow-hidden rounded-2xl border border-slate-200 bg-surface px-4 py-3">
          <div className="flex items-center gap-3">
            <div className={isMissed ? 'rounded-xl bg-red-50 p-2 text-red-600' : 'rounded-xl bg-slate-100 p-2 text-text-secondary'}>
              <LeadingIcon size={18} />
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-text-primary">{title}{isVideo ? ' (Video)' : ''}</div>
              <div className="mt-0.5 truncate text-[12px] text-text-muted">{subtitle}</div>
            </div>
          </div>
        </div>
      )
    }

    if (message.content.type === 'video') {
      const thumb = message.content.thumbnailUrl
      return (
        <>
          <button
            type="button"
            className="relative block overflow-hidden rounded-2xl"
            onClick={() => setOpenVideo(true)}
            aria-label="Phát video"
          >
            {thumb ? (
              <Image src={thumb} alt={message.content.alt || 'video'} className="max-h-56 w-auto max-w-[260px] rounded-2xl" objectFit="cover" />
            ) : (
              <div className="flex h-40 w-[260px] max-w-full items-center justify-center rounded-2xl bg-slate-200 text-text-muted">
                Video
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-black/55 text-white">
                <Play size={20} />
              </span>
            </div>
          </button>

          <Modal open={openVideo} onClose={() => setOpenVideo(false)} title="Video">
            <video src={message.content.url} controls autoPlay playsInline className="w-full max-h-[70vh]" />
          </Modal>
        </>
      )
    }

    if (message.content.type === 'sticker') {
      return (
        <>
          <button
            type="button"
            className="block"
            onClick={() => setOpenSticker(true)}
            aria-label="Xem sticker"
          >
            <Image
              src={message.content.thumbnailUrl || message.content.url}
              alt={message.content.alt || 'sticker'}
              className="h-28 w-28 rounded-none bg-transparent"
              objectFit="contain"
            />
          </button>
          <Modal open={openSticker} onClose={() => setOpenSticker(false)} title="Sticker">
            <Image
              src={message.content.url}
              alt={message.content.alt || 'sticker'}
              className="w-full max-h-[70vh] rounded-none bg-transparent"
              objectFit="contain"
            />
          </Modal>
        </>
      )
    }

    if (message.content.type === 'audio') {
      return (
        <audio controls src={message.content.url} className="w-[260px] max-w-full" />
      )
    }

    if (message.content.type === 'contact') {
      const name = message.content.name
      const vcard =
        `BEGIN:VCARD\nVERSION:3.0\nFN:${name}` +
        (message.content.phone ? `\nTEL:${message.content.phone}` : '') +
        (message.content.email ? `\nEMAIL:${message.content.email}` : '') +
        `\nEND:VCARD`
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=${encodeURIComponent(vcard)}`

      return (
        <div className="w-[280px] max-w-full overflow-hidden rounded-2xl border border-slate-200 bg-surface">
          <div className="flex items-start justify-between gap-3 bg-gradient-to-br from-primary-600 to-primary-500 px-4 py-4">
            <div className="flex min-w-0 items-center gap-3">
              <Avatar
                src={message.content.avatarUrl}
                alt={name}
                size="sm"
                className="ring-2 ring-white/30"
              />
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-white">{name}</div>
                <div className="mt-0.5 flex flex-col gap-0.5 text-[12px] text-white/80">
                  {message.content.phone && <div className="truncate">{message.content.phone}</div>}
                  {message.content.email && <div className="truncate">{message.content.email}</div>}
                </div>
              </div>
            </div>

            <div className="shrink-0 rounded-lg bg-white p-1">
              <Image src={qrUrl} alt="QR" className="h-[48px] w-[48px] rounded-none bg-white" objectFit="cover" />
            </div>
          </div>

          <div className="grid grid-cols-2 divide-x divide-slate-200">
            {message.content.phone ? (
              <a
                href={`tel:${message.content.phone}`}
                className="inline-flex items-center justify-center py-3 text-sm font-semibold text-text-secondary hover:bg-slate-50"
              >
                Gọi Điện
              </a>
            ) : (
              <div className="inline-flex items-center justify-center py-3 text-sm font-semibold text-text-muted">Gọi Điện</div>
            )}

            {message.content.phone ? (
              <a
                href={`sms:${message.content.phone}`}
                className="inline-flex items-center justify-center py-3 text-sm font-semibold text-text-secondary hover:bg-slate-50"
              >
                Nhắn Tin
              </a>
            ) : (
              <div className="inline-flex items-center justify-center py-3 text-sm font-semibold text-text-muted">Nhắn Tin</div>
            )}
          </div>
        </div>
      )
    }

    if (message.content.type === 'location') {
      const { lat, lng, label } = message.content
      const mapUrl = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`
      const mapLink = `https://www.google.com/maps?q=${lat},${lng}&z=15`

      return (
        <div className="w-[280px] max-w-full overflow-hidden rounded-2xl border border-slate-200 bg-surface">
          <div className="overflow-hidden">
            <iframe
              title={label || 'Google Map'}
              src={mapUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-40 w-full"
            />
          </div>
          <a
            href={mapLink}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-primary-600 hover:bg-slate-50"
          >
            <MapPin size={16} />
            <span className="truncate">{label || `${lat}, ${lng}`}</span>
          </a>
        </div>
      )
    }

    if (message.content.type === 'file') {
      const label = message.content.fileName
      const url = message.content.url
      const ext = getFileExtension(label || url || '')
      const badge = getFileBadge(ext)
      const sizeText = formatFileSize(message.content.size)

      return (
        <div className="w-[340px] max-w-full overflow-hidden rounded-2xl border border-slate-200 bg-surface">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className={`shrink-0 rounded-xl ${badge.className} flex h-11 w-11 items-center justify-center`}>
              {'label' in badge && badge.label ? (
                <span className="text-sm font-extrabold">{badge.label}</span>
              ) : (
                (() => {
                  const Icon = (badge as any).icon as React.ComponentType<{ size?: number }>
                  return <Icon size={18} />
                })()
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold text-text-primary">{label}</div>
              <div className="mt-0.5 truncate text-[12px] text-text-muted">
                {sizeText ? sizeText : ''}
                {sizeText && ext ? ' · ' : ''}
                {ext ? ext.toUpperCase() : ''}
                {!url ? (sizeText || ext ? ' · Đã có trên máy' : 'Đã có trên máy') : ''}
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              {url && (
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary hover:bg-slate-50"
                  aria-label="Mở file"
                >
                  <ExternalLink size={16} />
                </a>
              )}
              {url && (
                <a
                  href={url}
                  download
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary hover:bg-slate-50"
                  aria-label="Tải xuống"
                >
                  <Download size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      )
    }

    return null
  }

  const showAvatar = !isOutgoing
  const showName = !isOutgoing && showSenderName && !!message.senderName

  const handleCopy = async () => {
    const text =
      message.content.type === 'text'
        ? message.content.text
        : message.content.type === 'markdown'
          ? message.content.markdown
          : message.content.type === 'system'
            ? message.content.text
            : message.content.type === 'image'
              ? message.content.url
              : message.content.type === 'video'
                ? message.content.url
                : message.content.type === 'audio'
                  ? message.content.url
                  : message.content.type === 'sticker'
                    ? message.content.url
                    : message.content.type === 'call'
                      ? message.content.kind === 'missed'
                        ? 'Cuộc gọi nhỡ'
                        : 'Cuộc gọi đến'
                    : message.content.type === 'file'
                      ? message.content.url || message.content.fileName
                      : message.content.type === 'contact'
                        ? `${message.content.name}${message.content.phone ? `\n${message.content.phone}` : ''}${
                            message.content.email ? `\n${message.content.email}` : ''
                          }`
                        : message.content.type === 'location'
                          ? `https://www.google.com/maps?q=${message.content.lat},${message.content.lng}&z=15`
                          : ''

    try {
      await navigator.clipboard.writeText(text)
    } catch {
    }
    onCopy?.(message)
  }

  return (
    <div className={`flex w-full gap-2 ${wrapperClass}`}>
      {!isOutgoing && showAvatar && (
        <div className="pt-1">
          <Avatar
            src={message.senderAvatarUrl}
            alt={message.senderName || message.senderId}
            initials={message.senderName || message.senderId}
            size="sm"
          />
        </div>
      )}

      <div className={`min-w-0 ${isOutgoing ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
        {showName && <Caption className="text-text-muted">{message.senderName}</Caption>}

        <div className="group">
          <div className={`flex items-start gap-1 ${isOutgoing ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`${bubbleClass}${highlighted ? ' ring-2 ring-primary-400' : ''}`}>
              {message.replyToId && (
                <button
                  type="button"
                  className={
                    isOutgoing
                      ? 'mb-2 w-full rounded-xl bg-white/15 px-2 py-1 text-left text-white/90 hover:bg-white/20'
                      : 'mb-2 w-full rounded-xl bg-slate-100 px-2 py-1 text-left text-text-secondary hover:bg-slate-200'
                  }
                  onClick={() => {
                    if (message.replyToId) onJumpToMessage?.(message.replyToId)
                  }}
                >
                  <div className={isOutgoing ? 'text-[11px] font-medium text-white/90' : 'text-[11px] font-medium text-text-secondary'}>
                    {replyToMessage?.senderName || 'Tin nhắn'}
                  </div>
                  <div className={isOutgoing ? 'text-[11px] text-white/80 line-clamp-2' : 'text-[11px] text-text-muted line-clamp-2'}>
                    {replyPreviewText}
                  </div>
                </button>
              )}
              {renderContent()}
            </div>

            <div className="shrink-0 pt-0.5 opacity-0 transition-opacity group-hover:opacity-100">
              <DropdownMenu>
                <DropdownTrigger>
                  <IconButton icon={EllipsisVertical} size="xs" variant={isOutgoing ? 'default' : 'muted'} aria-label="Hành động" />
                </DropdownTrigger>
                <DropdownContent align={isOutgoing ? 'left' : 'right'}>
                  <DropdownItem onClick={handleCopy}>
                    <span className="inline-flex items-center gap-2">
                      <Copy size={14} />
                      Copy
                    </span>
                  </DropdownItem>
                  {onReply && (
                    <DropdownItem onClick={() => onReply(message)}>
                      <span className="inline-flex items-center gap-2">
                        <CornerUpLeft size={14} />
                        Reply
                      </span>
                    </DropdownItem>
                  )}
                  {onReact && (
                    <>
                      <DropdownItem onClick={() => onReact(message, '👍')}>
                        <span className="inline-flex items-center gap-2">
                          <ThumbsUp size={14} />
                          👍
                        </span>
                      </DropdownItem>
                      <DropdownItem onClick={() => onReact(message, '❤️')}>
                        <span className="inline-flex items-center gap-2">
                          <Heart size={14} />
                          ❤️
                        </span>
                      </DropdownItem>
                      <DropdownItem onClick={() => onReact(message, '😆')}>
                        <span className="inline-flex items-center gap-2">
                          <Laugh size={14} />
                          😆
                        </span>
                      </DropdownItem>
                    </>
                  )}
                  {onRecall && message.canRecall && (
                    <DropdownItem onClick={() => onRecall(message)}>
                      <span className="inline-flex items-center gap-2">
                        <Undo2 size={14} />
                        Thu hồi
                      </span>
                    </DropdownItem>
                  )}
                  {onDelete && message.canDelete && (
                    <DropdownItem danger onClick={() => onDelete(message)}>
                      <span className="inline-flex items-center gap-2">
                        <Trash2 size={14} />
                        Xóa
                      </span>
                    </DropdownItem>
                  )}
                </DropdownContent>
              </DropdownMenu>
            </div>
          </div>

          <div className={`mt-1 flex items-center gap-2 ${isOutgoing ? 'justify-end' : 'justify-start'}`}>
            <Caption className={isColoredOutgoingBubble ? 'text-white/80' : 'text-text-muted'}>
              {timeText}
              {statusText ? ` · ${statusText}` : ''}
            </Caption>

            {message.status === 'failed' && onRetrySend && (
              <Button
                variant={isOutgoing ? 'secondary' : 'ghost'}
                size="sm"
                className="h-7 px-2"
                onClick={() => onRetrySend(message)}
              >
                <span className="inline-flex items-center gap-1">
                  <RotateCcw size={14} />
                  Gửi lại
                </span>
              </Button>
            )}
          </div>

          {reactionEntries.length > 0 && (
            <div className={`flex flex-wrap gap-1 ${isOutgoing ? 'justify-end' : 'justify-start'}`}>
              {reactionEntries.map(([emoji, count]) => (
                <button
                  key={`${message.id}:${emoji}`}
                  type="button"
                  className={
                    isColoredOutgoingBubble
                      ? 'inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-xs text-white/90 hover:bg-white/20'
                      : 'inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs text-text-secondary hover:bg-slate-200'
                  }
                  onClick={() => onReact?.(message, emoji)}
                >
                  <span>{emoji}</span>
                  <span className="text-[11px]">{count}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {isOutgoing && showOutgoingAvatar && (
        <div className="pt-1">
          <Avatar src={message.senderAvatarUrl} alt={message.senderName || message.senderId} initials={message.senderName || message.senderId} size="sm" />
        </div>
      )}
    </div>
  )
}

MessageItem.displayName = 'MessageItem'

export interface AgentThinkingMessageProps {
  state: AgentThinkingState
  agentName?: string
}

export const AgentThinkingMessage: React.FC<AgentThinkingMessageProps> = ({ state, agentName }) => {
  const text = state.mode === 'streaming' ? state.text : 'Đang suy nghĩ'

  return (
    <div className="flex w-full justify-start gap-2">
      <div className="min-w-0">
        <div className="max-w-[80%] rounded-2xl bg-surface px-3 py-2 text-sm text-text-muted opacity-80">
          <div className="flex items-center gap-2">
            <span className="truncate">{agentName ? `${agentName}: ` : ''}{text}</span>
            <span className="inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="h-1.5 w-1.5 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="h-1.5 w-1.5 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: '300ms' }} />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

AgentThinkingMessage.displayName = 'AgentThinkingMessage'
