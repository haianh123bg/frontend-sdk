# Animation Module

SDK đã khai báo `framer-motion` như peer dependency nên module này cung cấp sẵn hạ tầng + tiện ích để áp dụng motion nhanh và thống nhất.

## Thành phần chính
- `MotionProvider`: bọc `LazyMotion` (domAnimation). Dùng ở root App hoặc story để đảm bảo các component motion hoạt động.
- `tokens.ts`: tập hợp duration, easing, spring preset đồng bộ.
- Hooks:
  - `useFadeIn`: trả về props initial/animate/exit để fade + slide nhẹ, nhận tham số offset/delay/duration.
  - `useStaggerChildren`: tạo `variants` container/item cho danh sách cần stagger.
- Components:
  - `MotionBox`: wrapper thuận tiện cho `<motion.div>`.
  - `RevealOnScroll`: card tự fade/slide vào khi xuất hiện trong viewport, sử dụng IntersectionObserver.
  - `FloatingActionButton`: nút tròn với chuyển động hover/tap spring, hỗ trợ icon + label.

## Ví dụ sử dụng
```tsx
import { MotionProvider, MotionBox, useFadeIn, useStaggerChildren } from '@haianh123bgln/redai-fe-v2-sdk/animation'

const Example = () => {
  const fadeIn = useFadeIn({ offsetY: 16 })
  const { container, item } = useStaggerChildren({ stagger: 0.12 })

  return (
    <MotionProvider>
      <MotionBox {...fadeIn} className="rounded-2xl bg-white p-6 shadow-lg">
        <m.ul variants={container} initial="hidden" animate="show" className="space-y-3">
          {[1, 2, 3].map((i) => (
            <m.li key={i} variants={item} className="rounded-xl bg-slate-100 p-3 text-sm">
              Item {i}
            </m.li>
          ))}
        </m.ul>
      </MotionBox>
    </MotionProvider>
  )
}
```

## Lộ trình mở rộng
- Thêm `RevealOnScroll`, `FloatingActionButton`, …
- Bổ sung Storybook examples cho từng component/hook.
- Cung cấp preset motion cho card, toast, modal để tái sử dụng đồng bộ.
