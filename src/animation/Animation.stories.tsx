import type { Meta, StoryObj } from '@storybook/react'
import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { Animated, type AnimatedProps } from './Animated'
import { animationPresets, type AnimationPresetName } from './presets'

const meta: Meta<typeof Animated> = {
  title: 'Utilities/Animation',
  component: Animated,
  argTypes: {
    preset: {
      control: 'select',
      options: Object.keys(animationPresets),
    },
  },
}

export default meta

type Story = StoryObj<typeof Animated>

export const CustomVariantsAndTransition: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    const [mode, setMode] = useState<'tween' | 'spring'>('tween')

    const transition =
      mode === 'tween'
        ? ({ duration: 0.25, ease: [0.16, 1, 0.3, 1] } as const)
        : ({ type: 'spring', stiffness: 520, damping: 34, mass: 0.9 } as const)

    return (
      <div className="min-h-[260px] p-8">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600"
            onClick={() => setOpen((v) => !v)}
          >
            Toggle
          </button>
          <button
            type="button"
            className="rounded-lg bg-surface-alt px-4 py-2 text-sm font-medium text-text-primary hover:bg-slate-200"
            onClick={() => setMode((m) => (m === 'tween' ? 'spring' : 'tween'))}
          >
            Transition: {mode}
          </button>
        </div>

        <div className="mt-6">
          <AnimatePresence mode="wait">
            {open && (
              <Animated
                key={mode}
                preset="fade"
                transition={transition}
                variants={{
                  initial: { opacity: 0, scale: 0.96, rotate: -1 },
                  animate: { opacity: 1, scale: 1, rotate: 0 },
                  exit: { opacity: 0, scale: 0.98, rotate: 1 },
                }}
                className="inline-flex items-center rounded-2xl bg-surface px-5 py-4 text-sm text-text-primary"
              >
                Custom variants + {mode} transition
              </Animated>
            )}
          </AnimatePresence>
        </div>
      </div>
    )
  },
}

export const StaggeredList: Story = {
  render: () => {
    const [items, setItems] = useState(() => ['Alpha', 'Beta', 'Gamma', 'Delta'])

    const containerVariants = useMemo(
      () => ({
        initial: { opacity: 1 },
        animate: {
          opacity: 1,
          transition: {
            staggerChildren: 0.06,
            delayChildren: 0.05,
          },
        },
      }),
      []
    )

    const itemVariants = useMemo(
      () => ({
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
      }),
      []
    )

    return (
      <div className="min-h-[320px] p-8">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600"
            onClick={() => setItems((prev) => [...prev, `Item ${prev.length + 1}`])}
          >
            Add item
          </button>
          <button
            type="button"
            className="rounded-lg bg-surface-alt px-4 py-2 text-sm font-medium text-text-primary hover:bg-slate-200"
            onClick={() => setItems((prev) => prev.slice(0, Math.max(0, prev.length - 1)))}
          >
            Remove item
          </button>
        </div>

        <motion.ul
          className="mt-6 grid max-w-md gap-2"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <AnimatePresence>
            {items.map((item) => (
              <motion.li
                key={item}
                variants={itemVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-between rounded-xl bg-surface px-4 py-3 text-sm text-text-primary"
              >
                <span className="truncate">{item}</span>
                <span className="ml-3 inline-flex h-2 w-2 rounded-full bg-primary-500" />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    )
  },
}

export const LayoutAnimation: Story = {
  render: () => {
    const [expanded, setExpanded] = useState(false)

    return (
      <div className="min-h-[360px] p-8">
        <button
          type="button"
          className="rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600"
          onClick={() => setExpanded((v) => !v)}
        >
          Toggle layout
        </button>

        <LayoutGroup>
          <div className={expanded ? 'mt-6 grid gap-3 md:grid-cols-3' : 'mt-6 grid gap-3 md:grid-cols-2'}>
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                layout
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                className="rounded-2xl bg-surface p-4"
              >
                <div className="text-sm font-semibold text-text-primary">Card {i + 1}</div>
                <div className="mt-1 text-xs text-text-secondary">
                  Layout animation (reflow) với `layout`.
                </div>
              </motion.div>
            ))}
          </div>
        </LayoutGroup>
      </div>
    )
  },
}

export const SharedLayoutId: Story = {
  render: () => {
    const [active, setActive] = useState<number | null>(null)

    return (
      <div className="min-h-[420px] p-8">
        <div className="mb-4 text-sm text-text-secondary">Click 1 card để phóng to (layoutId).</div>

        <LayoutGroup>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.button
                key={i}
                type="button"
                layoutId={`card-${i}`}
                className="rounded-2xl bg-surface p-4 text-left"
                onClick={() => setActive(i)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="text-sm font-semibold text-text-primary">Card {i + 1}</div>
                <div className="mt-1 text-xs text-text-secondary">Shared layoutId transition.</div>
              </motion.button>
            ))}
          </div>

          <AnimatePresence>
            {active !== null && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActive(null)}
              >
                <motion.div
                  layoutId={`card-${active}`}
                  className="w-full max-w-lg rounded-2xl bg-surface p-6"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-base font-semibold text-text-primary">Card {active + 1}</div>
                      <div className="mt-1 text-sm text-text-secondary">
                        Smooth transition nhờ `layoutId`.
                      </div>
                    </div>
                    <button
                      type="button"
                      className="rounded-lg bg-surface-alt px-3 py-2 text-xs font-medium text-text-primary hover:bg-slate-200"
                      onClick={() => setActive(null)}
                    >
                      Close
                    </button>
                  </div>
                  <div className="mt-4 text-sm text-text-secondary">
                    Bạn có thể dùng pattern này cho preview/detail (card {'->'} modal detail).
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    )
  },
}

export const HoverTapAndKeyframes: Story = {
  render: () => {
    return (
      <div className="min-h-[320px] p-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <div className="mb-3 text-sm font-semibold text-text-primary">whileHover / whileTap</div>
            <motion.button
              type="button"
              className="inline-flex items-center rounded-xl bg-primary-500 px-4 py-2 text-sm font-medium text-white"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Interact me
            </motion.button>
          </div>

          <div>
            <div className="mb-3 text-sm font-semibold text-text-primary">Keyframes</div>
            <motion.div
              className="inline-flex items-center rounded-2xl bg-surface px-5 py-4 text-sm text-text-primary"
              animate={{
                rotate: [0, -2, 2, -1, 0],
                y: [0, -2, 2, -1, 0],
              }}
              transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.8 }}
            >
              Keyframes loop
            </motion.div>
          </div>
        </div>
      </div>
    )
  },
}

export const DragGesture: Story = {
  render: () => {
    const constraintsRef = useRef<HTMLDivElement>(null)

    return (
      <div className="min-h-[340px] p-8">
        <div className="mb-4 text-sm text-text-secondary">Kéo thả (drag) trong vùng box.</div>
        <div ref={constraintsRef} className="relative h-56 w-full max-w-xl rounded-2xl bg-surface-alt p-4">
          <motion.div
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.2}
            whileDrag={{ scale: 1.06 }}
            className="absolute left-4 top-4 inline-flex items-center rounded-full bg-primary-500 px-4 py-3 text-sm font-medium text-white"
          >
            Drag me
          </motion.div>
        </div>
      </div>
    )
  },
}

export const ScrollProgress: Story = {
  render: () => {
    const scrollRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ container: scrollRef })
    const progress = useSpring(scrollYProgress, { stiffness: 260, damping: 32 })

    return (
      <div className="min-h-[520px] p-8">
        <div className="mb-3 text-sm text-text-secondary">
          Demo `useScroll` + progress bar (scroll trong container).
        </div>

        <div className="mb-4 h-2 w-full max-w-xl overflow-hidden rounded-full bg-surface-alt">
          <motion.div
            className="h-full w-full origin-left rounded-full bg-primary-500"
            style={{ scaleX: progress }}
          />
        </div>

        <div
          ref={scrollRef}
          className="h-[380px] w-full max-w-xl overflow-y-auto rounded-2xl bg-surface p-4"
        >
          <div className="grid gap-3">
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} className="rounded-xl bg-surface-alt px-4 py-3">
                <div className="text-sm font-semibold text-text-primary">Section {i + 1}</div>
                <div className="mt-1 text-xs text-text-secondary">
                  Scroll để thấy progress bar thay đổi.
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
}

export const SvgPathDrawing: Story = {
  render: () => {
    return (
      <div className="min-h-[320px] p-8">
        <div className="mb-4 text-sm text-text-secondary">SVG path drawing (pathLength).</div>

        <div className="inline-flex items-center gap-6 rounded-2xl bg-surface px-6 py-5">
          <motion.svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <motion.circle
              cx="32"
              cy="32"
              r="22"
              stroke="currentColor"
              strokeWidth="4"
              className="text-primary-500"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.path
              d="M22 33.5L29 40.5L44 25.5"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary-500"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.svg>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="text-sm font-semibold text-text-primary">Done</div>
            <div className="mt-1 text-xs text-text-secondary">Dùng cho success/check animation.</div>
          </motion.div>
        </div>
      </div>
    )
  },
}

export const WhileInView: Story = {
  render: () => {
    return (
      <div className="h-[520px] overflow-y-auto p-8">
        <div className="mb-6 text-sm text-text-secondary">
          Scroll xuống để xem `whileInView` (viewport).
        </div>

        <div className="grid gap-3">
          {Array.from({ length: 14 }).map((_, i) => (
            <motion.div
              key={i}
              className="rounded-2xl bg-surface px-5 py-4"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="text-sm font-semibold text-text-primary">Row {i + 1}</div>
              <div className="mt-1 text-xs text-text-secondary">Enter animation on scroll.</div>
            </motion.div>
          ))}
        </div>
      </div>
    )
  },
}

export const ReducedMotionDemo: Story = {
  render: () => {
    const prefersReducedMotion = useReducedMotion()

    return (
      <div className="min-h-[260px] p-8">
        <div className="mb-4 text-sm text-text-secondary">
          prefers-reduced-motion: <span className="font-semibold">{String(prefersReducedMotion)}</span>
        </div>

        <Animated
          preset="fadeUp"
          transition={prefersReducedMotion ? { duration: 0 } : undefined}
          variants={
            prefersReducedMotion
              ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 1 } }
              : undefined
          }
          className="inline-flex items-center rounded-2xl bg-surface px-5 py-4 text-sm text-text-primary"
        >
          Tôn trọng reduced motion
        </Animated>
      </div>
    )
  },
}

export const Playground: Story = {
  render: (args: AnimatedProps) => {
    const [open, setOpen] = useState(true)

    return (
      <div className="min-h-[260px] p-8">
        <button
          type="button"
          className="rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600"
          onClick={() => setOpen((v) => !v)}
        >
          Toggle
        </button>

        <div className="mt-6">
          <AnimatePresence mode="wait">
            {open && (
              <Animated
                key="box"
                {...args}
                className={
                  args.className ??
                  'inline-flex items-center gap-2 rounded-2xl bg-surface px-5 py-4 text-sm text-text-primary'
                }
              >
                <span className="inline-block h-2 w-2 rounded-full bg-primary-500" />
                Animated preset: <span className="font-semibold">{String(args.preset ?? 'fade')}</span>
              </Animated>
            )}
          </AnimatePresence>
        </div>
      </div>
    )
  },
  args: {
    preset: 'fadeUp',
  },
}

export const PresetGallery: Story = {
  render: () => {
    const [active, setActive] = useState<string | null>(null)

    return (
      <div className="min-h-[360px] p-8">
        <div className="mb-4 text-sm text-text-secondary">Click vào từng preset để xem hiệu ứng.</div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {Object.keys(animationPresets).map((name) => (
            <button
              key={name}
              type="button"
              className="rounded-xl bg-surface-alt px-3 py-2 text-left text-xs text-text-primary hover:bg-slate-200"
              onClick={() => setActive(name)}
            >
              {name}
            </button>
          ))}
        </div>

        <div className="mt-8">
          <AnimatePresence mode="wait">
            {active && (
              <Animated
                key={active}
                preset={active as AnimationPresetName}
                className="inline-flex items-center rounded-2xl bg-surface px-5 py-4 text-sm text-text-primary"
              >
                Preset: <span className="ml-2 font-semibold">{active}</span>
              </Animated>
            )}
          </AnimatePresence>
        </div>
      </div>
    )
  },
}
