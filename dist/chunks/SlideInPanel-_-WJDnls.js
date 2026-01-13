import { j as l } from "./jsx-runtime-DGlMoOmv.js";
import { LazyMotion as M, domAnimation as N, useMotionValue as f, useSpring as w, useMotionTemplate as P, useScroll as S, useTransform as k, m as g, useInView as R, AnimatePresence as I } from "framer-motion";
import * as c from "react";
import { useMemo as j } from "react";
import { c as y } from "./bundle-mjs-C7_IOFkA.js";
import { I as X } from "./Icon-M9fKXJ9V.js";
const G = ({
  children: s,
  features: t = N,
  strict: e
}) => /* @__PURE__ */ l.jsx(M, { features: t, strict: e, children: s }), b = {
  instant: 0.12,
  fast: 0.24,
  normal: 0.36,
  slow: 0.55
}, v = {
  standard: [0.2, 0.7, 0.4, 1],
  emphasized: [0.4, 0, 0.2, 1],
  bounce: [0.34, 1.56, 0.64, 1]
}, Y = {
  gentle: { type: "spring", stiffness: 200, damping: 26 },
  snappy: { type: "spring", stiffness: 320, damping: 25 },
  loose: { type: "spring", stiffness: 140, damping: 20 }
}, J = ({ offsetY: s = 12, delay: t = 0, duration: e = "normal" } = {}) => j(() => {
  const n = {
    duration: b[e],
    ease: v.standard,
    delay: t
  };
  return {
    initial: { opacity: 0, y: s },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -s / 2 },
    transition: n
  };
}, [s, t, e]), K = ({
  stagger: s = 0.08,
  delayChildren: t = 0,
  duration: e = "normal"
} = {}) => j(() => {
  const n = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: s,
        delayChildren: t
      }
    }
  }, o = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: b[e],
        ease: v.standard
      }
    }
  };
  return { container: n, item: o };
}, [s, t, e]), z = ({ strength: s = 0.25, spring: t } = {}) => {
  const e = f(0), n = f(0), o = t ?? { stiffness: 300, damping: 20, mass: 0.5 }, d = w(e, o), a = w(n, o), p = c.useCallback(
    (i) => {
      const u = i.currentTarget.getBoundingClientRect(), h = i.clientX - (u.left + u.width / 2), m = i.clientY - (u.top + u.height / 2);
      e.set(h * s), n.set(m * s);
    },
    [s, e, n]
  ), r = c.useCallback(() => {
    e.set(0), n.set(0);
  }, [e, n]);
  return {
    springX: d,
    springY: a,
    eventHandlers: {
      onPointerMove: p,
      onPointerLeave: r
    }
  };
}, B = () => {
  const s = f("50%"), t = f("50%"), e = c.useCallback((a, p) => {
    const r = (a == null ? void 0 : a.currentTarget) || p;
    if (!r) return;
    const i = r.getBoundingClientRect(), u = a ? a.clientX : i.left + i.width / 2, h = a ? a.clientY : i.top + i.height / 2, m = (u - i.left) / i.width * 100, C = (h - i.top) / i.height * 100;
    s.set(`${m}%`), t.set(`${C}%`);
  }, [s, t]), n = c.useCallback(
    (a) => e(a),
    [e]
  ), o = c.useCallback((a) => e(null, a), [e]);
  return { gradient: P`radial-gradient(circle at ${s} ${t}, rgba(255,255,255,0.85), rgba(255,255,255,0))`, handlePointerMove: n, handlePointerLeave: o };
}, Q = (s, { offset: t = [-0.15, 0.15] } = {}) => {
  const { scrollYProgress: e } = S({ target: s, offset: ["start end", "end start"] });
  return { translateY: k(e, [0, 1], t) };
}, _ = c.forwardRef(({ children: s, ...t }, e) => /* @__PURE__ */ l.jsx(g.div, { ref: e, ...t, children: s }));
_.displayName = "MotionBox";
const L = c.forwardRef(
  ({
    once: s = !0,
    amount: t = "some",
    offsetY: e = 16,
    delay: n = 0,
    duration: o = "normal",
    className: d,
    children: a,
    ...p
  }, r) => {
    const i = c.useRef(null), u = c.useCallback(
      (m) => {
        i.current = m, typeof r == "function" ? r(m) : r && (r.current = m);
      },
      [r]
    ), h = R(i, { once: s, amount: t });
    return /* @__PURE__ */ l.jsx(
      g.div,
      {
        ref: u,
        className: y("will-change-transform", d),
        initial: { opacity: 0, y: e },
        animate: h ? { opacity: 1, y: 0 } : { opacity: 0, y: e },
        transition: {
          duration: b[o],
          ease: v.standard,
          delay: n
        },
        ...p,
        children: a
      }
    );
  }
);
L.displayName = "RevealOnScroll";
const T = {
  primary: "bg-primary-500 text-white shadow-primary-200/60",
  danger: "bg-red-500 text-white shadow-red-200/70"
}, A = c.forwardRef(
  ({ icon: s, label: t, variant: e = "primary", className: n, ...o }, d) => /* @__PURE__ */ l.jsxs(
    g.button,
    {
      ref: d,
      type: "button",
      className: y(
        "inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold shadow-lg transition-colors",
        T[e],
        n
      ),
      whileHover: { scale: 1.05 },
      whileTap: { scale: 0.95 },
      transition: Y.snappy,
      ...o,
      children: [
        /* @__PURE__ */ l.jsx(X, { icon: s, variant: "white", size: "md" }),
        t && /* @__PURE__ */ l.jsx("span", { children: t })
      ]
    }
  )
);
A.displayName = "FloatingActionButton";
const F = c.forwardRef(
  ({ className: s, children: t, strength: e, style: n, ...o }, d) => {
    const { springX: a, springY: p, eventHandlers: r } = z({ strength: e }), i = c.useMemo(
      () => ({
        ...n,
        x: a,
        y: p
      }),
      [n, a, p]
    );
    return /* @__PURE__ */ l.jsxs(
      g.div,
      {
        ref: d,
        className: y(
          "group relative rounded-3xl border border-orange-100 bg-white p-6 shadow-[0_25px_60px_rgba(249,115,22,0.12)] transition-colors hover:border-orange-200",
          s
        ),
        style: i,
        ...r,
        ...o,
        children: [
          /* @__PURE__ */ l.jsx("div", { className: "pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-100/40 to-rose-100/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100" }),
          /* @__PURE__ */ l.jsx("div", { className: "relative z-10", children: t })
        ]
      }
    );
  }
);
F.displayName = "MagneticCard";
const H = c.forwardRef(
  ({ className: s, children: t, style: e, ...n }, o) => {
    const d = c.useRef(null), a = c.useCallback(
      (u) => {
        d.current = u, o && (typeof o == "function" ? o(u) : o.current = u);
      },
      [o]
    ), { gradient: p, handlePointerMove: r, handlePointerLeave: i } = B();
    return /* @__PURE__ */ l.jsxs(
      g.div,
      {
        ref: a,
        className: y(
          "group relative overflow-hidden rounded-3xl border border-amber-100 bg-white/80 p-6 shadow-[0_25px_50px_rgba(0,0,0,0.08)] backdrop-blur-lg",
          s
        ),
        style: e,
        onPointerMove: r,
        onPointerLeave: () => i(d.current),
        ...n,
        children: [
          /* @__PURE__ */ l.jsx(
            "div",
            {
              className: "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100",
              style: { backgroundImage: p.get() }
            }
          ),
          /* @__PURE__ */ l.jsx("div", { className: "relative z-10 text-slate-900", children: t })
        ]
      }
    );
  }
);
H.displayName = "SpotlightCard";
const x = {
  left: {
    hidden: { x: "-100%" },
    visible: { x: 0 }
  },
  right: {
    hidden: { x: "100%" },
    visible: { x: 0 }
  },
  top: {
    hidden: { y: "-100%" },
    visible: { y: 0 }
  },
  bottom: {
    hidden: { y: "100%" },
    visible: { y: 0 }
  }
}, V = ({
  open: s,
  direction: t = "right",
  width: e = 420,
  height: n = "100%",
  overlayOpacity: o = 0.4,
  onClose: d,
  className: a,
  children: p
}) => {
  const r = t === "left" || t === "right" ? { width: e } : { height: n };
  return /* @__PURE__ */ l.jsx(I, { children: s && /* @__PURE__ */ l.jsxs(
    g.div,
    {
      className: "fixed inset-0 z-[60] flex",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      children: [
        /* @__PURE__ */ l.jsx(
          "div",
          {
            className: "absolute inset-0 bg-slate-950",
            style: { opacity: o },
            onClick: d
          }
        ),
        /* @__PURE__ */ l.jsx(
          g.div,
          {
            className: y(
              "relative ml-auto flex h-full flex-col overflow-hidden bg-white shadow-2xl",
              t === "left" && "ml-0 mr-auto",
              t === "top" && "mx-auto",
              t === "bottom" && "mx-auto",
              a
            ),
            style: r,
            initial: x[t].hidden,
            animate: x[t].visible,
            exit: x[t].hidden,
            transition: { type: "spring", damping: 24, stiffness: 260 },
            children: p
          }
        )
      ]
    }
  ) });
};
V.displayName = "SlideInPanel";
export {
  A as F,
  G as M,
  L as R,
  H as S,
  v as a,
  Y as b,
  K as c,
  z as d,
  B as e,
  Q as f,
  _ as g,
  F as h,
  V as i,
  b as m,
  J as u
};
