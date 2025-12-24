import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Input } from '../Input/Input'
import { Popover, PopoverContent, PopoverTrigger, usePopover } from '../../molecules/Popover/Popover'

export interface ColorPickerProps {
  value?: string
  defaultValue?: string
  onChange?: (color: string) => void
  colors?: string[]
  allowCustom?: boolean
  showPresets?: boolean
  showCustom?: boolean
  className?: string
}

const DEFAULT_COLORS = [
  '#0ea5e9',
  '#22c55e',
  '#a855f7',
  '#f97316',
  '#ef4444',
  '#eab308',
  '#14b8a6',
  '#3b82f6',
  '#64748b',
  '#111827',
]

const normalizeHex = (input: string): string | null => {
  const v = input.trim()
  if (!v) return null

  const withHash = v.startsWith('#') ? v : `#${v}`
  const hex = withHash.toLowerCase()

  if (/^#[0-9a-f]{6}$/.test(hex)) return hex
  if (/^#[0-9a-f]{3}$/.test(hex)) {
    const r = hex[1]
    const g = hex[2]
    const b = hex[3]
    return `#${r}${r}${g}${g}${b}${b}`
  }

  return null
}

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n))

const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const normalized = normalizeHex(hex)
  if (!normalized) return null
  const raw = normalized.slice(1)
  const r = parseInt(raw.slice(0, 2), 16)
  const g = parseInt(raw.slice(2, 4), 16)
  const b = parseInt(raw.slice(4, 6), 16)
  return { r, g, b }
}

const rgbToHex = (rgb: { r: number; g: number; b: number }) => {
  const toHex2 = (n: number) => clamp(Math.round(n), 0, 255).toString(16).padStart(2, '0')
  return `#${toHex2(rgb.r)}${toHex2(rgb.g)}${toHex2(rgb.b)}`
}

type Hsv = { h: number; s: number; v: number }

const rgbToHsv = (rgb: { r: number; g: number; b: number }): Hsv => {
  const r = rgb.r / 255
  const g = rgb.g / 255
  const b = rgb.b / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const d = max - min

  let h = 0
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6
    else if (max === g) h = (b - r) / d + 2
    else h = (r - g) / d + 4
    h *= 60
    if (h < 0) h += 360
  }

  const s = max === 0 ? 0 : d / max
  const v = max
  return { h, s, v }
}

const hsvToRgb = (hsv: Hsv): { r: number; g: number; b: number } => {
  const h = ((hsv.h % 360) + 360) % 360
  const s = clamp(hsv.s, 0, 1)
  const v = clamp(hsv.v, 0, 1)

  const c = v * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = v - c

  let rp = 0
  let gp = 0
  let bp = 0
  if (h < 60) {
    rp = c
    gp = x
  } else if (h < 120) {
    rp = x
    gp = c
  } else if (h < 180) {
    gp = c
    bp = x
  } else if (h < 240) {
    gp = x
    bp = c
  } else if (h < 300) {
    rp = x
    bp = c
  } else {
    rp = c
    bp = x
  }

  return {
    r: (rp + m) * 255,
    g: (gp + m) * 255,
    b: (bp + m) * 255,
  }
}

const ColorPickerPopover: React.FC<{
  color: string
  onChange: (next: string) => void
}> = ({ color, onChange }) => {
  const { setOpen } = usePopover()
  const svRef = React.useRef<HTMLDivElement | null>(null)
  const hueRef = React.useRef<HTMLDivElement | null>(null)

  const [hsv, setHsv] = React.useState<Hsv>(() => {
    const rgb = hexToRgb(color) ?? { r: 14, g: 165, b: 233 }
    return rgbToHsv(rgb)
  })

  const [hexText, setHexText] = React.useState<string>(color)

  React.useEffect(() => {
    const rgb = hexToRgb(color)
    if (!rgb) return
    setHexText(color)
    setHsv(rgbToHsv(rgb))
  }, [color])

  const hueHex = React.useMemo(() => rgbToHex(hsvToRgb({ h: hsv.h, s: 1, v: 1 })), [hsv.h])
  const rgb = React.useMemo(() => hsvToRgb(hsv), [hsv])
  const rgbHex = React.useMemo(() => rgbToHex(rgb), [rgb])

  const commitHsv = React.useCallback(
    (next: Hsv) => {
      setHsv(next)
      const nextHex = rgbToHex(hsvToRgb(next))
      onChange(nextHex)
    },
    [onChange]
  )

  const handleSvFromEvent = React.useCallback(
    (e: PointerEvent | React.PointerEvent) => {
      const el = svRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const x = clamp((('clientX' in e ? e.clientX : 0) - rect.left) / rect.width, 0, 1)
      const y = clamp((('clientY' in e ? e.clientY : 0) - rect.top) / rect.height, 0, 1)
      commitHsv({ ...hsv, s: x, v: 1 - y })
    },
    [commitHsv, hsv]
  )

  const handleHueFromEvent = React.useCallback(
    (e: PointerEvent | React.PointerEvent) => {
      const el = hueRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const x = clamp((('clientX' in e ? e.clientX : 0) - rect.left) / rect.width, 0, 1)
      commitHsv({ ...hsv, h: x * 360 })
    },
    [commitHsv, hsv]
  )

  const onSvPointerDown = (e: React.PointerEvent) => {
    e.preventDefault()
    handleSvFromEvent(e)
    const onMove = (ev: PointerEvent) => handleSvFromEvent(ev)
    const onUp = () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  const onHuePointerDown = (e: React.PointerEvent) => {
    e.preventDefault()
    handleHueFromEvent(e)
    const onMove = (ev: PointerEvent) => handleHueFromEvent(ev)
    const onUp = () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start gap-4">
        <div className="flex flex-col gap-3">
          <div
            ref={svRef}
            className="relative h-36 w-48 overflow-hidden rounded-xl ring-1 ring-slate-200"
            style={{ backgroundColor: hueHex }}
            onPointerDown={onSvPointerDown}
          >
            <div className="absolute inset-0 bg-[linear-gradient(90deg,#fff,rgba(255,255,255,0))]" />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,#000,rgba(0,0,0,0))]" />
            <div
              className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-white shadow"
              style={{
                left: `${hsv.s * 100}%`,
                top: `${(1 - hsv.v) * 100}%`,
                backgroundColor: rgbHex,
              }}
            />
          </div>

          <div
            ref={hueRef}
            className="relative h-3 w-48 cursor-pointer overflow-hidden rounded-full ring-1 ring-slate-200"
            style={{
              background:
                'linear-gradient(90deg, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)',
            }}
            onPointerDown={onHuePointerDown}
          >
            <div
              className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white ring-1 ring-slate-200 shadow"
              style={{ left: `${(hsv.h / 360) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl ring-1 ring-slate-200" style={{ backgroundColor: rgbHex }} />
            <div className="text-xs font-medium text-text-muted">{rgbHex.toUpperCase()}</div>
          </div>

          <div>
            <div className="mb-1 text-xs font-semibold text-text-muted">HEX</div>
            <Input
              value={hexText}
              onChange={(e) => {
                const nextText = e.target.value
                setHexText(nextText)
                const normalized = normalizeHex(nextText)
                if (normalized) onChange(normalized)
              }}
              placeholder="#0ea5e9"
            />
          </div>

          <button
            type="button"
            className="self-end rounded-xl bg-surface-alt px-3 py-2 text-xs font-semibold text-text-primary hover:bg-slate-200 transition-colors"
            onClick={() => setOpen(false)}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  )
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  defaultValue = '#0ea5e9',
  onChange,
  colors = DEFAULT_COLORS,
  allowCustom = true,
  showPresets = true,
  showCustom,
  className,
}) => {
  const isControlled = value !== undefined
  const [internal, setInternal] = React.useState<string>(defaultValue)

  const effective = isControlled ? (value ?? defaultValue) : internal

  const commit = React.useCallback(
    (next: string) => {
      if (!isControlled) setInternal(next)
      onChange?.(next)
    },
    [isControlled, onChange]
  )

  const [hexText, setHexText] = React.useState<string>(effective)

  React.useEffect(() => {
    setHexText(effective)
  }, [effective])

  const effectiveShowCustom = showCustom ?? allowCustom

  return (
    <div className={twMerge(clsx('flex flex-col gap-3', className))}>
      {showPresets && (
        <div className="grid grid-cols-10 gap-2">
          {colors.map((c) => {
            const selected = c.toLowerCase() === effective.toLowerCase()
            return (
              <button
                key={c}
                type="button"
                className={clsx(
                  'h-7 w-7 rounded-full transition-all',
                  'ring-1 ring-slate-200 hover:scale-[1.03]',
                  selected && 'ring-2 ring-primary-500'
                )}
                style={{ backgroundColor: c }}
                aria-label={c}
                onClick={() => commit(c)}
              />
            )
          })}
        </div>
      )}

      {effectiveShowCustom && (
        <div className="flex items-center justify-between gap-3">
          <Popover>
            <PopoverTrigger
              role="button"
              tabIndex={0}
              className="inline-flex"
              aria-label="Chọn màu"
              onKeyDown={(e) => {
                if (e.key !== 'Enter' && e.key !== ' ') return
                e.preventDefault()
                ;(e.currentTarget as HTMLDivElement).click()
              }}
            >
              <div
                className="h-10 w-10 rounded-xl ring-1 ring-slate-200 transition-colors hover:ring-primary-500"
                style={{ backgroundColor: effective }}
              />
            </PopoverTrigger>

            <PopoverContent
              side="bottom"
              align="start"
              className="rounded-2xl border border-slate-200 bg-surface p-4 text-text-primary shadow-soft"
            >
              <ColorPickerPopover color={effective} onChange={commit} />
            </PopoverContent>
          </Popover>

          <Input
            value={hexText}
            onChange={(e) => {
              const nextText = e.target.value
              setHexText(nextText)
              const normalized = normalizeHex(nextText)
              if (normalized) commit(normalized)
            }}
            placeholder="#0ea5e9"
          />
        </div>
      )}
    </div>
  )
}

ColorPicker.displayName = 'ColorPicker'
