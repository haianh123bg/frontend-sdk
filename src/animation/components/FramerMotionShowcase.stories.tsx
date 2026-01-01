import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import type { Variants } from 'framer-motion'
import { AnimatePresence, m } from 'framer-motion'
import { Sparkles, Zap, MousePointerClick, Play } from 'lucide-react'
import { MotionProvider } from '../MotionProvider'
import { twMerge } from 'tailwind-merge'

const heroVariants = {
  hidden: { opacity: 0, y: 48 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.7, 0.4, 1] } },
}

const listItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.1, duration: 0.4, ease: [0.2, 0.7, 0.4, 1] },
  }),
}

const pulseRing = {
  animate: {
    scale: [0.9, 1.35],
    opacity: [0.4, 0],
    transition: { duration: 2.1, repeat: Infinity, repeatDelay: 0.2, ease: 'easeOut' },
  },
}

const testimonials = [
  {
    quote:
      '“Slide-in panel và spotlight card giúp team mình tạo ra trải nghiệm nhập vai chỉ trong vài phút!”',
    author: 'Lan Anh — Product Designer',
  },
  {
    quote:
      '“Motion hooks chuẩn hoá easing/time, nên toàn bộ dashboard trông cực kỳ nhất quán và premium.”',
    author: 'Huy Nguyễn — Frontend Lead',
  },
  {
    quote: '“Một file Storybook mà cover đủ pattern chính, cực tiện khi trình bày với stakeholder.”',
    author: 'Cường Lê — Creative Director',
  },
]

const InteractiveButton: React.FC<{ label: string; accent: string }> = ({ label, accent }) => (
  <m.button
    whileHover={{ y: -4, boxShadow: `0 15px 35px ${accent}` }}
    whileTap={{ scale: 0.96 }}
    className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white transition-colors"
    style={{ background: accent }}
  >
    <MousePointerClick className="h-4 w-4" />
    {label}
  </m.button>
)

const SpotlightDemo: React.FC = () => {
  const [pos, setPos] = React.useState({ x: 0, y: 0 })

  return (
    <div
      onPointerMove={(e) => setPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })}
      className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-6"
    >
      <m.div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, rgba(14,165,233,0.25), transparent 70%)`,
        }}
        animate={{ backgroundPosition: `${pos.x}px ${pos.y}px` }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      />
      <div className="relative space-y-2 text-slate-900">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Spotlight</p>
        <h4 className="text-xl font-semibold">Theo vệt chuột</h4>
        <p className="text-sm text-slate-600">Thêm chiều sâu ngay cả khi chỉ dùng một div duy nhất.</p>
      </div>
    </div>
  )
}

const SlideInPreview: React.FC = () => {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="relative">
      <m.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
        className="rounded-full bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 shadow"
      >
        Mở panel
      </m.button>
      <AnimatePresence>
        {open && (
          <>
            <m.div
              className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <m.div
              className="absolute right-0 top-12 w-72 rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 shadow-2xl"
              initial={{ x: 280 }}
              animate={{ x: 0 }}
              exit={{ x: 280 }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">Panel</p>
                <button onClick={() => setOpen(false)} className="text-xs text-slate-500">
                  Đóng
                </button>
              </div>
              <p className="mt-3 text-sm text-slate-600">
                Ví dụ slide-in mini ngay trong card Storybook để demo logic.
              </p>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

type SnippetExample = {
  title: string
  description: string
  code: string
  render: () => React.ReactNode
}

const snippetExamples: SnippetExample[] = [
  {
    title: 'Magnetic CTA',
    description: 'whileHover nâng nút + đổi shadow, whileTap scale nhẹ để tạo cảm giác nhấn.',
    code: String.raw`import { m } from 'framer-motion'

export const MagneticCTA = () => (
  <m.button
    whileHover={{ y: -6, boxShadow: '0 25px 45px rgba(251,146,60,0.35)' }}
    whileTap={{ scale: 0.94 }}
    className="rounded-full bg-gradient-to-r from-amber-500 to-rose-500 px-6 py-2.5 font-semibold text-white"
  >
    Khởi chạy Agent
  </m.button>
)`,
    render: () => (
      <m.button
        whileHover={{ y: -6, boxShadow: '0 25px 45px rgba(251,146,60,0.35)' }}
        whileTap={{ scale: 0.94 }}
        className="rounded-full bg-gradient-to-r from-amber-500 to-rose-500 px-6 py-2.5 font-semibold text-white"
      >
        Khởi chạy Agent
      </m.button>
    ),
  },
  {
    title: 'Spotlight Card',
    description: 'AnimatePresence + gradient spotlight theo vị trí chuột.',
    code: String.raw`import { m } from 'framer-motion'
import * as React from 'react'

export const SpotlightCard = () => {
  const [pos, setPos] = React.useState({ x: 0, y: 0 })
  return (
    <div
      onPointerMove={(e) => setPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 p-6"
    >
      <m.div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-400/20 via-transparent to-transparent"
        style={{ backgroundPosition: pos.x + 'px ' + pos.y + 'px' }}
        animate={{ backgroundPosition: pos.x + 'px ' + pos.y + 'px' }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      />
      <div className="relative space-y-2 text-white">
        <p className="text-xs uppercase text-white/60">Spotlight</p>
        <h4 className="text-xl font-semibold">Card nổi bật theo con trỏ</h4>
        <p className="text-sm text-white/70">Hoàn hảo cho gallery agent hoặc testimonial.</p>
      </div>
    </div>
  )
}`,
    render: () => <SpotlightDemo />,
  },
  {
    title: 'Slide-in Panel',
    description: 'Variants điều khiển enter/exit + overlay cho panel contextual.',
    code: String.raw`import { AnimatePresence, m } from 'framer-motion'
import * as React from 'react'

const panelVariants = {
  hidden: { x: '100%' },
  show: { x: '0%', transition: { type: 'spring', stiffness: 260, damping: 32 } },
  exit: { x: '100%', transition: { duration: 0.2 } },
}

export const SlideInPanel = () => {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)} className="rounded-full bg-white/10 px-4 py-2 text-white">
        Open Panel
      </button>
      <AnimatePresence>
        {open && (
          <>
            <m.div className="fixed inset-0 bg-black/60" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <m.aside className="fixed inset-y-0 right-0 w-full max-w-md bg-slate-900 p-6 text-white" variants={panelVariants} initial="hidden" animate="show" exit="exit">
              <button onClick={() => setOpen(false)} className="text-white/60">Đóng</button>
              <h3 className="mt-4 text-2xl font-semibold">Panel cho agent</h3>
              <p className="mt-2 text-white/70">Trình bày thông tin sâu mà không rời màn hình chính.</p>
            </m.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}`,
    render: () => <SlideInPreview />,
  },
  {
    title: 'Timeline Stagger',
    description: 'Dùng variants nhận custom index để tạo nhịp timeline.',
    code: String.raw`import { m } from 'framer-motion'

const timelineItem = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.45, ease: [0.4, 0, 0.2, 1] },
  }),
}

export const Timeline = () => (
  <div className="space-y-4">
    {['Chuẩn bị dữ liệu', 'Huấn luyện nhánh', 'Kích hoạt agent'].map((step, i) => (
      <m.div
        key={step}
        custom={i}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        variants={timelineItem}
        className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white"
      >
        <p className="text-xs uppercase text-white/50">Bước {i + 1}</p>
        <p className="text-lg font-semibold">{step}</p>
      </m.div>
    ))}
  </div>
)`,
    render: () => (
      <div className="space-y-4 text-white">
        {['Chuẩn bị dữ liệu', 'Huấn luyện nhánh', 'Kích hoạt agent'].map((step, index) => (
          <m.div
            key={step}
            custom={index}
            initial="hidden"
            animate="show"
            variants={listItem}
            className="rounded-2xl border border-white/10 bg-white/5 p-4"
          >
            <p className="text-xs uppercase text-white/50">Bước {index + 1}</p>
            <p className="text-lg font-semibold">{step}</p>
          </m.div>
        ))}
      </div>
    ),
  },
  {
    title: 'Orbit Badges',
    description: 'Badge xoay vòng quanh lõi agent để minh hoạ dòng dữ liệu realtime.',
    code: String.raw`import { m } from 'framer-motion'

const badges = [
  { label: 'Realtime', color: 'linear-gradient(120deg,#f97316,#fb7185)' },
  { label: 'LLM', color: 'linear-gradient(120deg,#38bdf8,#818cf8)' },
  { label: 'Voice', color: 'linear-gradient(120deg,#34d399,#10b981)' },
  { label: 'Analytics', color: 'linear-gradient(120deg,#facc15,#f97316)' },
]

export const OrbitBadges = () => (
  <div className="relative h-64 overflow-hidden rounded-3xl border border-slate-200 bg-white">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-slate-100 text-slate-900 shadow-inner">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Core</p>
        <p className="text-lg font-semibold">Agent</p>
      </div>
    </div>
    <m.div
      className="absolute inset-0"
      animate={{ rotate: 360 }}
      transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
    >
      {badges.map((badge, index) => (
        <m.div
          key={badge.label}
          className="absolute flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 shadow"
          style={{ transform: 'rotate(' + index * (360 / badges.length) + 'deg) translateX(120px)' }}
          whileHover={{ scale: 1.1 }}
        >
          <span className="h-2 w-2 rounded-full" style={{ background: badge.color }} />
          {badge.label}
        </m.div>
      ))}
    </m.div>
  </div>
)`,
    render: () => <OrbitShowcase compact />,
  },
  {
    title: 'Loop Progress',
    description: 'Thanh progress động mô phỏng mức độ xử lý thông tin theo chu kỳ.',
    code: String.raw`import { m } from 'framer-motion'
import * as React from 'react'

export const LoopProgress = () => {
  const [progress, setProgress] = React.useState(0.2)

  React.useEffect(() => {
    const id = setInterval(() => {
      setProgress((prev) => (prev >= 0.95 ? 0.15 : prev + 0.1))
    }, 1200)

    return () => clearInterval(id)
  }, [])

  const width = Math.round(progress * 100) + '%'

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 text-slate-900 shadow-lg shadow-slate-200/70">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-slate-500">
        <span>Processing</span>
        <span>{width}</span>
      </div>
      <div className="mt-4 h-2 w-full rounded-full bg-slate-100">
        <m.div
          className="h-2 rounded-full bg-gradient-to-r from-sky-400 via-indigo-400 to-violet-400"
          animate={{ width }}
          transition={{ type: 'spring', stiffness: 140, damping: 18 }}
        />
      </div>
    </div>
  )
}`,
    render: () => <ProgressShowcase compact />,
  },
]

const SnippetCard: React.FC<SnippetExample> = ({ title, description, code, render }) => {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard?.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/70">
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <MotionProvider>{render()}</MotionProvider>
      </div>
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-500">{title}</p>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
      <div className="relative rounded-2xl border border-slate-200 bg-slate-100 p-4">
        <pre className="overflow-x-auto text-xs leading-relaxed text-slate-800">
          <code>{code}</code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute right-4 top-4 rounded-full border border-slate-300 px-3 py-1 text-xs text-slate-600 transition hover:bg-slate-200"
        >
          {copied ? 'Đã copy' : 'Copy'}
        </button>
      </div>
    </div>
  )
}

const OrbitShowcase: React.FC<{ compact?: boolean }> = ({ compact }) => {
  const badges = [
    { label: 'Realtime', color: 'linear-gradient(120deg,#f97316,#fb7185)' },
    { label: 'LLM', color: 'linear-gradient(120deg,#38bdf8,#818cf8)' },
    { label: 'Voice', color: 'linear-gradient(120deg,#34d399,#10b981)' },
    { label: 'Analytics', color: 'linear-gradient(120deg,#facc15,#f97316)' },
  ]

  return (
    <div
      className={twMerge(
        'relative overflow-hidden rounded-3xl border border-slate-200 bg-white',
        compact ? 'h-56' : 'h-72'
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-slate-100 text-slate-900 shadow-inner">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Core</p>
          <p className="text-lg font-semibold">Agent</p>
        </div>
      </div>
      <m.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      >
        {badges.map((badge, index) => (
          <m.div
            key={badge.label}
            className="absolute flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 shadow"
            style={{
              transform: `rotate(${index * (360 / badges.length)}deg) translateX(${compact ? 110 : 140}px)`,
            }}
            whileHover={{ scale: 1.1 }}
          >
            <span className="h-2 w-2 rounded-full" style={{ background: badge.color }} />
            {badge.label}
          </m.div>
        ))}
      </m.div>
    </div>
  )
}

const ProgressShowcase: React.FC<{ compact?: boolean }> = ({ compact }) => {
  const [progress, setProgress] = React.useState(0.35)

  React.useEffect(() => {
    const id = setInterval(() => {
      setProgress((prev) => (prev >= 0.95 ? 0.25 : Number((prev + 0.12).toFixed(2))))
    }, 1200)

    return () => clearInterval(id)
  }, [])

  const width = `${Math.round(progress * 100)}%`

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 text-slate-900 shadow-lg shadow-slate-200/70">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-slate-500">
        <span>Processing</span>
        <span>{width}</span>
      </div>
      <div className={twMerge('mt-4 rounded-full bg-slate-100', compact ? 'h-2' : 'h-3')}>
        <m.div
          className="h-full rounded-full bg-gradient-to-r from-sky-400 via-indigo-400 to-violet-400"
          animate={{ width }}
          transition={{ type: 'spring', stiffness: 140, damping: 18 }}
        />
      </div>
    </div>
  )
}

type ShowcaseSection = 'hero' | 'feature-grid' | 'cta' | 'testimonial' | 'timeline'

const defaultSections: ShowcaseSection[] = ['hero', 'feature-grid', 'cta', 'testimonial', 'timeline']

const AnimationShowcase: React.FC<{ sections?: ShowcaseSection[] }> = ({ sections = defaultSections }) => {
  const [activeTestimonial, setActiveTestimonial] = React.useState(0)
  const enabled = React.useMemo(() => new Set(sections), [sections])
  const showSection = (section: ShowcaseSection) => enabled.has(section)

  React.useEffect(() => {
    const id = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 3600)
    return () => clearInterval(id)
  }, [])

  return (
    <MotionProvider>
      <div className="min-h-screen bg-slate-50 px-6 py-14 text-slate-900">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
          {showSection('hero') && (
            <m.section
              initial="hidden"
              animate="show"
              variants={heroVariants}
              className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-xl shadow-slate-200/60"
            >
              <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Framer Motion + Tokens</p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight text-slate-900">
                Bộ animation cho sản phẩm AI độ trễ thấp
              </h1>
              <p className="mt-3 max-w-2xl text-base text-slate-600">
                Kết hợp LazyMotion, variants và motion tokens để tạo ra giao diện giàu nhịp điệu mà vẫn dễ bảo trì.
              </p>
            </m.section>
          )}

          {showSection('feature-grid') && (
            <section className="grid gap-6 lg:grid-cols-3">
              {[
                { icon: Sparkles, title: 'Preset', desc: 'Hero fade, stagger list, CTA pulse.' },
                { icon: Zap, title: 'Realtime', desc: 'AnimatePresence + auto rotation.' },
                { icon: Play, title: 'Hover/Press', desc: 'whileHover và spring để tạo feedback.' },
              ].map(({ icon: Icon, title, desc }, index) => (
                <m.div
                  key={title}
                  custom={index}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.4 }}
                  variants={listItem}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/70"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-amber-500">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{desc}</p>
                </m.div>
              ))}
            </section>
          )}

          {showSection('cta') && (
            <section className="flex flex-wrap items-center gap-4 rounded-[28px] border border-slate-200 bg-white px-8 py-6 shadow-lg shadow-slate-200/60">
              <div className="flex flex-1 flex-col gap-2">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Interactive CTA</p>
                <h4 className="text-2xl font-semibold text-slate-900">Hover/Tap với spring snappy</h4>
                <p className="text-sm text-slate-600">
                  Dùng whileHover/whileTap thay vì tạo component mới, giúp tái sử dụng trực tiếp trong layout.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <InteractiveButton label="Dùng thử ngay" accent="linear-gradient(120deg,#f97316,#fb923c)" />
                <InteractiveButton label="Xem demo" accent="linear-gradient(120deg,#38bdf8,#818cf8)" />
              </div>
            </section>
          )}

          {showSection('testimonial') && (
            <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60">
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 -z-10 blur-3xl">
                  <m.div
                    className="absolute left-1/4 top-1/4 h-48 w-48 rounded-full bg-amber-500/40"
                    variants={pulseRing}
                    animate="animate"
                  />
                  <m.div
                    className="absolute right-1/4 bottom-1/4 h-52 w-52 rounded-full bg-blue-500/30"
                    variants={pulseRing}
                    animate="animate"
                  />
                </div>

                <AnimatePresence mode="wait">
                  <m.blockquote
                    key={activeTestimonial}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -24 }}
                    transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                    className="text-lg leading-relaxed text-slate-900"
                  >
                    {testimonials[activeTestimonial].quote}
                    <footer className="mt-4 text-sm text-slate-600">{testimonials[activeTestimonial].author}</footer>
                  </m.blockquote>
                </AnimatePresence>
              </div>
            </section>
          )}

          {showSection('timeline') && (
            <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/60">
              <div className="flex flex-col gap-6 md:flex-row">
                <div className="md:w-1/3">
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Stagger Timeline</p>
                  <h4 className="mt-2 text-2xl font-semibold text-slate-900">Reveal từng bước quy trình</h4>
                  <p className="mt-3 text-sm text-slate-600">
                    Dùng custom prop cho variants để kiểm soát delay dựa trên index, không cần tạo component riêng.
                  </p>
                </div>
                <div className="flex-1 space-y-4">
                  {['Khởi tạo agent', 'Huấn luyện kịch bản', 'Đo lường realtime'].map((step, index) => (
                    <m.div
                      key={step}
                      custom={index}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ amount: 0.6, once: true }}
                      variants={listItem}
                      className="rounded-2xl border border-slate-200 bg-white p-4"
                    >
                      <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Bước {index + 1}</p>
                      <h5 className="mt-2 text-lg font-semibold text-slate-900">{step}</h5>
                      <p className="mt-1 text-sm text-slate-600">
                        Các phần tử xuất hiện tuần tự nhưng vẫn dùng chung một variants function.
                      </p>
                    </m.div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </MotionProvider>
  )
}

const meta: Meta<typeof AnimationShowcase> = {
  title: 'Animation/FramerMotionShowcase',
  component: AnimationShowcase,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    controls: { hideNoControlsWarning: true },
  },
}

export default meta

type Story = StoryObj<typeof AnimationShowcase>

const createSectionStory = (sections: ShowcaseSection[], name: string): Story => ({
  name,
  render: () => <AnimationShowcase sections={sections} />,
  parameters: {
    layout: 'fullscreen',
  },
})

export const HeroSectionStory = createSectionStory(['hero'], 'Hero Section')
export const FeatureGridStory = createSectionStory(['feature-grid'], 'Feature Grid')
export const InteractiveCTAStory = createSectionStory(['cta'], 'Interactive CTA')
export const TestimonialStory = createSectionStory(['testimonial'], 'Testimonial Spotlight')
export const TimelineStory = createSectionStory(['timeline'], 'Timeline Stagger')

type SnippetTitle = (typeof snippetExamples)[number]['title']

const snippetLookup: Record<SnippetTitle, SnippetExample> = snippetExamples.reduce(
  (acc, item) => {
    acc[item.title as SnippetTitle] = item
    return acc
  },
  {} as Record<SnippetTitle, SnippetExample>
)

const createSnippetStory = (title: SnippetTitle): Story => ({
  name: title,
  render: () => (
    <div className="min-h-screen bg-slate-50 px-6 py-16">
      <div className="mx-auto w-full max-w-3xl">
        <SnippetCard {...snippetLookup[title]} />
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
})

export const MagneticCTAStory = createSnippetStory('Magnetic CTA')
export const SpotlightCardStory = createSnippetStory('Spotlight Card')
export const SlideInPanelStory = createSnippetStory('Slide-in Panel')
export const TimelineStaggerStory = createSnippetStory('Timeline Stagger')
export const OrbitBadgesStory = {
  name: 'Orbit Badges',
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-6 py-16 text-white">
      <div className="mx-auto w-full max-w-3xl space-y-4">
        <p className="text-sm uppercase tracking-[0.35em] text-white/60">Orbit Badges</p>
        <p className="text-base text-white/70">Badge xoay vòng quanh lõi agent để minh hoạ dòng dữ liệu realtime.</p>
        <OrbitShowcase />
      </div>
    </div>
  ),
}

export const LoopProgressStory = {
  name: 'Loop Progress',
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-6 py-16 text-white">
      <div className="mx-auto w-full max-w-3xl space-y-4">
        <p className="text-sm uppercase tracking-[0.35em] text-white/60">Loop Progress</p>
        <p className="text-base text-white/70">Thanh progress động mô phỏng mức độ xử lý thông tin theo chu kỳ.</p>
        <ProgressShowcase />
      </div>
    </div>
  ),
}
