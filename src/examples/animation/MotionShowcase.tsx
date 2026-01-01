import * as React from 'react'
import { Sparkles, PhoneCall } from 'lucide-react'
import {
  MotionProvider,
  MotionBox,
  RevealOnScroll,
  useFadeIn,
  useStaggerChildren,
  FloatingActionButton,
} from '../../animation'

export const MotionShowcase: React.FC = () => {
  const fadeIn = useFadeIn({ offsetY: 20, duration: 'slow' })
  const { container, item } = useStaggerChildren({ stagger: 0.1 })

  return (
    <MotionProvider>
      <div className="flex min-h-[420px] flex-col gap-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white">
        <MotionBox
          {...fadeIn}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-white/70">Motion Preset</p>
          <h3 className="mt-2 text-2xl font-semibold">RedAI Animation Kit</h3>
          <p className="mt-1 text-white/80">
            Dễ dàng áp dụng motion cho card, danh sách và CTA chỉ với vài dòng code.
          </p>
        </MotionBox>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <MotionBox
            initial="hidden"
            animate="show"
            variants={container}
            className="space-y-3 rounded-2xl border border-white/10 bg-black/20 p-4"
          >
            {[1, 2, 3].map((i) => (
              <MotionBox
                key={i}
                variants={item}
                className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/10 p-3"
              >
                <Sparkles className="h-5 w-5 text-amber-300" />
                <span className="text-sm">Tác vụ #{i} chạy animation stagger</span>
              </MotionBox>
            ))}
          </MotionBox>

          <RevealOnScroll className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-lg">
            <p className="text-sm text-white/70">RevealOnScroll</p>
            <h4 className="mt-2 text-xl font-semibold">Card sẽ fade-in khi đi vào viewport</h4>
            <p className="mt-1 text-white/80">
              Component tự động quan sát viewport bằng IntersectionObserver và áp dụng motion token tiêu chuẩn.
            </p>
          </RevealOnScroll>
        </div>

        <div className="flex justify-end">
          <FloatingActionButton icon={PhoneCall} label="Gọi Agent" />
        </div>
      </div>
    </MotionProvider>
  )
}

MotionShowcase.displayName = 'MotionShowcase'
