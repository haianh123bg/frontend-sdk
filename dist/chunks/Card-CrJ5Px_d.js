import { j as v } from "./jsx-runtime-DGlMoOmv.js";
import * as V from "react";
import te, { useLayoutEffect as Uo, useEffect as Y, useRef as J, useMemo as X, useCallback as pe, useState as De, createContext as Xt, memo as Ko, useReducer as Wo, useContext as gt, forwardRef as Xo, cloneElement as Yo } from "react";
import { t as U, c as q } from "./bundle-mjs-C7_IOFkA.js";
import { b as Yr, E as vn } from "./types-CglsW3cy.js";
import { flushSync as Jo, unstable_batchedUpdates as an, createPortal as Jr } from "react-dom";
import { g as Zo } from "./id-CKhXHm5z.js";
import { P as Qo } from "./Pagination-Blu6pSap.js";
import { b as ei, B as Ze, I as un, S as Dr, c as ti, C as cn, D as Ir, a as Er } from "./Switch-CQj_EZyS.js";
import { c as Zr } from "./createLucideIcon-CKrNh_SW.js";
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ni = [
  ["circle", { cx: "9", cy: "12", r: "1", key: "1vctgf" }],
  ["circle", { cx: "9", cy: "5", r: "1", key: "hp0tcf" }],
  ["circle", { cx: "9", cy: "19", r: "1", key: "fkjjf6" }],
  ["circle", { cx: "15", cy: "12", r: "1", key: "1tmaij" }],
  ["circle", { cx: "15", cy: "5", r: "1", key: "19l28e" }],
  ["circle", { cx: "15", cy: "19", r: "1", key: "f4zoj3" }]
], zn = Zr("grip-vertical", ni);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ri = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], Tn = Zr("plus", ri);
function Pt(e, n, t) {
  let r = t.initialDeps ?? [], o;
  function i() {
    var s, l, a, u;
    let d;
    t.key && ((s = t.debug) != null && s.call(t)) && (d = Date.now());
    const f = e();
    if (!(f.length !== r.length || f.some((h, x) => r[x] !== h)))
      return o;
    r = f;
    let g;
    if (t.key && ((l = t.debug) != null && l.call(t)) && (g = Date.now()), o = n(...f), t.key && ((a = t.debug) != null && a.call(t))) {
      const h = Math.round((Date.now() - d) * 100) / 100, x = Math.round((Date.now() - g) * 100) / 100, w = x / 16, S = (R, I) => {
        for (R = String(R); R.length < I; )
          R = " " + R;
        return R;
      };
      console.info(
        `%c⏱ ${S(x, 5)} /${S(h, 5)} ms`,
        `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(
          0,
          Math.min(120 - 120 * w, 120)
        )}deg 100% 31%);`,
        t == null ? void 0 : t.key
      );
    }
    return (u = t == null ? void 0 : t.onChange) == null || u.call(t, o), o;
  }
  return i.updateDeps = (s) => {
    r = s;
  }, i;
}
function _r(e, n) {
  if (e === void 0)
    throw new Error("Unexpected undefined");
  return e;
}
const oi = (e, n) => Math.abs(e - n) < 1.01, ii = (e, n, t) => {
  let r;
  return function(...o) {
    e.clearTimeout(r), r = e.setTimeout(() => n.apply(this, o), t);
  };
}, Mr = (e) => {
  const { offsetWidth: n, offsetHeight: t } = e;
  return { width: n, height: t };
}, si = (e) => e, li = (e) => {
  const n = Math.max(e.startIndex - e.overscan, 0), t = Math.min(e.endIndex + e.overscan, e.count - 1), r = [];
  for (let o = n; o <= t; o++)
    r.push(o);
  return r;
}, ai = (e, n) => {
  const t = e.scrollElement;
  if (!t)
    return;
  const r = e.targetWindow;
  if (!r)
    return;
  const o = (s) => {
    const { width: l, height: a } = s;
    n({ width: Math.round(l), height: Math.round(a) });
  };
  if (o(Mr(t)), !r.ResizeObserver)
    return () => {
    };
  const i = new r.ResizeObserver((s) => {
    const l = () => {
      const a = s[0];
      if (a != null && a.borderBoxSize) {
        const u = a.borderBoxSize[0];
        if (u) {
          o({ width: u.inlineSize, height: u.blockSize });
          return;
        }
      }
      o(Mr(t));
    };
    e.options.useAnimationFrameWithResizeObserver ? requestAnimationFrame(l) : l();
  });
  return i.observe(t, { box: "border-box" }), () => {
    i.unobserve(t);
  };
}, Fr = {
  passive: !0
}, Nr = typeof window > "u" ? !0 : "onscrollend" in window, ui = (e, n) => {
  const t = e.scrollElement;
  if (!t)
    return;
  const r = e.targetWindow;
  if (!r)
    return;
  let o = 0;
  const i = e.options.useScrollendEvent && Nr ? () => {
  } : ii(
    r,
    () => {
      n(o, !1);
    },
    e.options.isScrollingResetDelay
  ), s = (d) => () => {
    const { horizontal: f, isRtl: c } = e.options;
    o = f ? t.scrollLeft * (c && -1 || 1) : t.scrollTop, i(), n(o, d);
  }, l = s(!0), a = s(!1);
  a(), t.addEventListener("scroll", l, Fr);
  const u = e.options.useScrollendEvent && Nr;
  return u && t.addEventListener("scrollend", a, Fr), () => {
    t.removeEventListener("scroll", l), u && t.removeEventListener("scrollend", a);
  };
}, ci = (e, n, t) => {
  if (n != null && n.borderBoxSize) {
    const r = n.borderBoxSize[0];
    if (r)
      return Math.round(
        r[t.options.horizontal ? "inlineSize" : "blockSize"]
      );
  }
  return e[t.options.horizontal ? "offsetWidth" : "offsetHeight"];
}, di = (e, {
  adjustments: n = 0,
  behavior: t
}, r) => {
  var o, i;
  const s = e + n;
  (i = (o = r.scrollElement) == null ? void 0 : o.scrollTo) == null || i.call(o, {
    [r.options.horizontal ? "left" : "top"]: s,
    behavior: t
  });
};
class gi {
  constructor(n) {
    this.unsubs = [], this.scrollElement = null, this.targetWindow = null, this.isScrolling = !1, this.measurementsCache = [], this.itemSizeCache = /* @__PURE__ */ new Map(), this.pendingMeasuredCacheIndexes = [], this.scrollRect = null, this.scrollOffset = null, this.scrollDirection = null, this.scrollAdjustments = 0, this.elementsCache = /* @__PURE__ */ new Map(), this.observer = /* @__PURE__ */ (() => {
      let t = null;
      const r = () => t || (!this.targetWindow || !this.targetWindow.ResizeObserver ? null : t = new this.targetWindow.ResizeObserver((o) => {
        o.forEach((i) => {
          const s = () => {
            this._measureElement(i.target, i);
          };
          this.options.useAnimationFrameWithResizeObserver ? requestAnimationFrame(s) : s();
        });
      }));
      return {
        disconnect: () => {
          var o;
          (o = r()) == null || o.disconnect(), t = null;
        },
        observe: (o) => {
          var i;
          return (i = r()) == null ? void 0 : i.observe(o, { box: "border-box" });
        },
        unobserve: (o) => {
          var i;
          return (i = r()) == null ? void 0 : i.unobserve(o);
        }
      };
    })(), this.range = null, this.setOptions = (t) => {
      Object.entries(t).forEach(([r, o]) => {
        typeof o > "u" && delete t[r];
      }), this.options = {
        debug: !1,
        initialOffset: 0,
        overscan: 1,
        paddingStart: 0,
        paddingEnd: 0,
        scrollPaddingStart: 0,
        scrollPaddingEnd: 0,
        horizontal: !1,
        getItemKey: si,
        rangeExtractor: li,
        onChange: () => {
        },
        measureElement: ci,
        initialRect: { width: 0, height: 0 },
        scrollMargin: 0,
        gap: 0,
        indexAttribute: "data-index",
        initialMeasurementsCache: [],
        lanes: 1,
        isScrollingResetDelay: 150,
        enabled: !0,
        isRtl: !1,
        useScrollendEvent: !1,
        useAnimationFrameWithResizeObserver: !1,
        ...t
      };
    }, this.notify = (t) => {
      var r, o;
      (o = (r = this.options).onChange) == null || o.call(r, this, t);
    }, this.maybeNotify = Pt(
      () => (this.calculateRange(), [
        this.isScrolling,
        this.range ? this.range.startIndex : null,
        this.range ? this.range.endIndex : null
      ]),
      (t) => {
        this.notify(t);
      },
      {
        key: process.env.NODE_ENV !== "production" && "maybeNotify",
        debug: () => this.options.debug,
        initialDeps: [
          this.isScrolling,
          this.range ? this.range.startIndex : null,
          this.range ? this.range.endIndex : null
        ]
      }
    ), this.cleanup = () => {
      this.unsubs.filter(Boolean).forEach((t) => t()), this.unsubs = [], this.observer.disconnect(), this.scrollElement = null, this.targetWindow = null;
    }, this._didMount = () => () => {
      this.cleanup();
    }, this._willUpdate = () => {
      var t;
      const r = this.options.enabled ? this.options.getScrollElement() : null;
      if (this.scrollElement !== r) {
        if (this.cleanup(), !r) {
          this.maybeNotify();
          return;
        }
        this.scrollElement = r, this.scrollElement && "ownerDocument" in this.scrollElement ? this.targetWindow = this.scrollElement.ownerDocument.defaultView : this.targetWindow = ((t = this.scrollElement) == null ? void 0 : t.window) ?? null, this.elementsCache.forEach((o) => {
          this.observer.observe(o);
        }), this._scrollToOffset(this.getScrollOffset(), {
          adjustments: void 0,
          behavior: void 0
        }), this.unsubs.push(
          this.options.observeElementRect(this, (o) => {
            this.scrollRect = o, this.maybeNotify();
          })
        ), this.unsubs.push(
          this.options.observeElementOffset(this, (o, i) => {
            this.scrollAdjustments = 0, this.scrollDirection = i ? this.getScrollOffset() < o ? "forward" : "backward" : null, this.scrollOffset = o, this.isScrolling = i, this.maybeNotify();
          })
        );
      }
    }, this.getSize = () => this.options.enabled ? (this.scrollRect = this.scrollRect ?? this.options.initialRect, this.scrollRect[this.options.horizontal ? "width" : "height"]) : (this.scrollRect = null, 0), this.getScrollOffset = () => this.options.enabled ? (this.scrollOffset = this.scrollOffset ?? (typeof this.options.initialOffset == "function" ? this.options.initialOffset() : this.options.initialOffset), this.scrollOffset) : (this.scrollOffset = null, 0), this.getFurthestMeasurement = (t, r) => {
      const o = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
      for (let s = r - 1; s >= 0; s--) {
        const l = t[s];
        if (o.has(l.lane))
          continue;
        const a = i.get(
          l.lane
        );
        if (a == null || l.end > a.end ? i.set(l.lane, l) : l.end < a.end && o.set(l.lane, !0), o.size === this.options.lanes)
          break;
      }
      return i.size === this.options.lanes ? Array.from(i.values()).sort((s, l) => s.end === l.end ? s.index - l.index : s.end - l.end)[0] : void 0;
    }, this.getMeasurementOptions = Pt(
      () => [
        this.options.count,
        this.options.paddingStart,
        this.options.scrollMargin,
        this.options.getItemKey,
        this.options.enabled
      ],
      (t, r, o, i, s) => (this.pendingMeasuredCacheIndexes = [], {
        count: t,
        paddingStart: r,
        scrollMargin: o,
        getItemKey: i,
        enabled: s
      }),
      {
        key: !1
      }
    ), this.getMeasurements = Pt(
      () => [this.getMeasurementOptions(), this.itemSizeCache],
      ({ count: t, paddingStart: r, scrollMargin: o, getItemKey: i, enabled: s }, l) => {
        if (!s)
          return this.measurementsCache = [], this.itemSizeCache.clear(), [];
        this.measurementsCache.length === 0 && (this.measurementsCache = this.options.initialMeasurementsCache, this.measurementsCache.forEach((d) => {
          this.itemSizeCache.set(d.key, d.size);
        }));
        const a = this.pendingMeasuredCacheIndexes.length > 0 ? Math.min(...this.pendingMeasuredCacheIndexes) : 0;
        this.pendingMeasuredCacheIndexes = [];
        const u = this.measurementsCache.slice(0, a);
        for (let d = a; d < t; d++) {
          const f = i(d), c = this.options.lanes === 1 ? u[d - 1] : this.getFurthestMeasurement(u, d), g = c ? c.end + this.options.gap : r + o, h = l.get(f), x = typeof h == "number" ? h : this.options.estimateSize(d), w = g + x, S = c ? c.lane : d % this.options.lanes;
          u[d] = {
            index: d,
            start: g,
            size: x,
            end: w,
            key: f,
            lane: S
          };
        }
        return this.measurementsCache = u, u;
      },
      {
        key: process.env.NODE_ENV !== "production" && "getMeasurements",
        debug: () => this.options.debug
      }
    ), this.calculateRange = Pt(
      () => [
        this.getMeasurements(),
        this.getSize(),
        this.getScrollOffset(),
        this.options.lanes
      ],
      (t, r, o, i) => this.range = t.length > 0 && r > 0 ? fi({
        measurements: t,
        outerSize: r,
        scrollOffset: o,
        lanes: i
      }) : null,
      {
        key: process.env.NODE_ENV !== "production" && "calculateRange",
        debug: () => this.options.debug
      }
    ), this.getVirtualIndexes = Pt(
      () => {
        let t = null, r = null;
        const o = this.calculateRange();
        return o && (t = o.startIndex, r = o.endIndex), this.maybeNotify.updateDeps([this.isScrolling, t, r]), [
          this.options.rangeExtractor,
          this.options.overscan,
          this.options.count,
          t,
          r
        ];
      },
      (t, r, o, i, s) => i === null || s === null ? [] : t({
        startIndex: i,
        endIndex: s,
        overscan: r,
        count: o
      }),
      {
        key: process.env.NODE_ENV !== "production" && "getVirtualIndexes",
        debug: () => this.options.debug
      }
    ), this.indexFromElement = (t) => {
      const r = this.options.indexAttribute, o = t.getAttribute(r);
      return o ? parseInt(o, 10) : (console.warn(
        `Missing attribute name '${r}={index}' on measured element.`
      ), -1);
    }, this._measureElement = (t, r) => {
      const o = this.indexFromElement(t), i = this.measurementsCache[o];
      if (!i)
        return;
      const s = i.key, l = this.elementsCache.get(s);
      l !== t && (l && this.observer.unobserve(l), this.observer.observe(t), this.elementsCache.set(s, t)), t.isConnected && this.resizeItem(o, this.options.measureElement(t, r, this));
    }, this.resizeItem = (t, r) => {
      const o = this.measurementsCache[t];
      if (!o)
        return;
      const i = this.itemSizeCache.get(o.key) ?? o.size, s = r - i;
      s !== 0 && ((this.shouldAdjustScrollPositionOnItemSizeChange !== void 0 ? this.shouldAdjustScrollPositionOnItemSizeChange(o, s, this) : o.start < this.getScrollOffset() + this.scrollAdjustments) && (process.env.NODE_ENV !== "production" && this.options.debug && console.info("correction", s), this._scrollToOffset(this.getScrollOffset(), {
        adjustments: this.scrollAdjustments += s,
        behavior: void 0
      })), this.pendingMeasuredCacheIndexes.push(o.index), this.itemSizeCache = new Map(this.itemSizeCache.set(o.key, r)), this.notify(!1));
    }, this.measureElement = (t) => {
      if (!t) {
        this.elementsCache.forEach((r, o) => {
          r.isConnected || (this.observer.unobserve(r), this.elementsCache.delete(o));
        });
        return;
      }
      this._measureElement(t, void 0);
    }, this.getVirtualItems = Pt(
      () => [this.getVirtualIndexes(), this.getMeasurements()],
      (t, r) => {
        const o = [];
        for (let i = 0, s = t.length; i < s; i++) {
          const l = t[i], a = r[l];
          o.push(a);
        }
        return o;
      },
      {
        key: process.env.NODE_ENV !== "production" && "getVirtualItems",
        debug: () => this.options.debug
      }
    ), this.getVirtualItemForOffset = (t) => {
      const r = this.getMeasurements();
      if (r.length !== 0)
        return _r(
          r[Qr(
            0,
            r.length - 1,
            (o) => _r(r[o]).start,
            t
          )]
        );
    }, this.getOffsetForAlignment = (t, r, o = 0) => {
      const i = this.getSize(), s = this.getScrollOffset();
      r === "auto" && (r = t >= s + i ? "end" : "start"), r === "center" ? t += (o - i) / 2 : r === "end" && (t -= i);
      const l = this.getTotalSize() + this.options.scrollMargin - i;
      return Math.max(Math.min(l, t), 0);
    }, this.getOffsetForIndex = (t, r = "auto") => {
      t = Math.max(0, Math.min(t, this.options.count - 1));
      const o = this.measurementsCache[t];
      if (!o)
        return;
      const i = this.getSize(), s = this.getScrollOffset();
      if (r === "auto")
        if (o.end >= s + i - this.options.scrollPaddingEnd)
          r = "end";
        else if (o.start <= s + this.options.scrollPaddingStart)
          r = "start";
        else
          return [s, r];
      const l = r === "end" ? o.end + this.options.scrollPaddingEnd : o.start - this.options.scrollPaddingStart;
      return [
        this.getOffsetForAlignment(l, r, o.size),
        r
      ];
    }, this.isDynamicMode = () => this.elementsCache.size > 0, this.scrollToOffset = (t, { align: r = "start", behavior: o } = {}) => {
      o === "smooth" && this.isDynamicMode() && console.warn(
        "The `smooth` scroll behavior is not fully supported with dynamic size."
      ), this._scrollToOffset(this.getOffsetForAlignment(t, r), {
        adjustments: void 0,
        behavior: o
      });
    }, this.scrollToIndex = (t, { align: r = "auto", behavior: o } = {}) => {
      o === "smooth" && this.isDynamicMode() && console.warn(
        "The `smooth` scroll behavior is not fully supported with dynamic size."
      ), t = Math.max(0, Math.min(t, this.options.count - 1));
      let i = 0;
      const s = 10, l = (u) => {
        if (!this.targetWindow) return;
        const d = this.getOffsetForIndex(t, u);
        if (!d) {
          console.warn("Failed to get offset for index:", t);
          return;
        }
        const [f, c] = d;
        this._scrollToOffset(f, { adjustments: void 0, behavior: o }), this.targetWindow.requestAnimationFrame(() => {
          const g = this.getScrollOffset(), h = this.getOffsetForIndex(t, c);
          if (!h) {
            console.warn("Failed to get offset for index:", t);
            return;
          }
          oi(h[0], g) || a(c);
        });
      }, a = (u) => {
        this.targetWindow && (i++, i < s ? (process.env.NODE_ENV !== "production" && this.options.debug && console.info("Schedule retry", i, s), this.targetWindow.requestAnimationFrame(() => l(u))) : console.warn(
          `Failed to scroll to index ${t} after ${s} attempts.`
        ));
      };
      l(r);
    }, this.scrollBy = (t, { behavior: r } = {}) => {
      r === "smooth" && this.isDynamicMode() && console.warn(
        "The `smooth` scroll behavior is not fully supported with dynamic size."
      ), this._scrollToOffset(this.getScrollOffset() + t, {
        adjustments: void 0,
        behavior: r
      });
    }, this.getTotalSize = () => {
      var t;
      const r = this.getMeasurements();
      let o;
      if (r.length === 0)
        o = this.options.paddingStart;
      else if (this.options.lanes === 1)
        o = ((t = r[r.length - 1]) == null ? void 0 : t.end) ?? 0;
      else {
        const i = Array(this.options.lanes).fill(null);
        let s = r.length - 1;
        for (; s >= 0 && i.some((l) => l === null); ) {
          const l = r[s];
          i[l.lane] === null && (i[l.lane] = l.end), s--;
        }
        o = Math.max(...i.filter((l) => l !== null));
      }
      return Math.max(
        o - this.options.scrollMargin + this.options.paddingEnd,
        0
      );
    }, this._scrollToOffset = (t, {
      adjustments: r,
      behavior: o
    }) => {
      this.options.scrollToFn(t, { behavior: o, adjustments: r }, this);
    }, this.measure = () => {
      this.itemSizeCache = /* @__PURE__ */ new Map(), this.notify(!1);
    }, this.setOptions(n);
  }
}
const Qr = (e, n, t, r) => {
  for (; e <= n; ) {
    const o = (e + n) / 2 | 0, i = t(o);
    if (i < r)
      e = o + 1;
    else if (i > r)
      n = o - 1;
    else
      return o;
  }
  return e > 0 ? e - 1 : 0;
};
function fi({
  measurements: e,
  outerSize: n,
  scrollOffset: t,
  lanes: r
}) {
  const o = e.length - 1, i = (a) => e[a].start;
  if (e.length <= r)
    return {
      startIndex: 0,
      endIndex: o
    };
  let s = Qr(
    0,
    o,
    i,
    t
  ), l = s;
  if (r === 1)
    for (; l < o && e[l].end < t + n; )
      l++;
  else if (r > 1) {
    const a = Array(r).fill(0);
    for (; l < o && a.some((d) => d < t + n); ) {
      const d = e[l];
      a[d.lane] = d.end, l++;
    }
    const u = Array(r).fill(t + n);
    for (; s >= 0 && u.some((d) => d >= t); ) {
      const d = e[s];
      u[d.lane] = d.start, s--;
    }
    s = Math.max(0, s - s % r), l = Math.min(o, l + (r - 1 - l % r));
  }
  return { startIndex: s, endIndex: l };
}
const Pr = typeof document < "u" ? V.useLayoutEffect : V.useEffect;
function pi(e) {
  const n = V.useReducer(() => ({}), {})[1], t = {
    ...e,
    onChange: (o, i) => {
      var s;
      i ? Jo(n) : n(), (s = e.onChange) == null || s.call(e, o, i);
    }
  }, [r] = V.useState(
    () => new gi(t)
  );
  return r.setOptions(t), Pr(() => r._didMount(), []), Pr(() => r._willUpdate()), r;
}
function hi(e) {
  return pi({
    observeElementRect: ai,
    observeElementOffset: ui,
    scrollToFn: di,
    ...e
  });
}
const mi = {
  sm: "gap-1 text-xs",
  md: "gap-1.5 text-sm",
  lg: "gap-2 text-base"
}, vi = V.forwardRef(
  ({
    className: e,
    items: n,
    align: t = "start",
    size: r = "md",
    divider: o = !0,
    onItemClick: i,
    maxItems: s,
    emptyState: l = "No items to display",
    ...a
  }, u) => {
    const d = Yr(), f = (g, h) => {
      i && (d(vn.UI_CLICK, { itemId: g.id ?? h }, { meta: { component: "List" } }), i(g, h));
    }, c = V.useMemo(() => s ? n.slice(0, s) : n, [n, s]);
    return /* @__PURE__ */ v.jsxs(
      "ul",
      {
        ref: u,
        className: U(
          q("flex w-full flex-col", t === "center" && "items-center", e)
        ),
        ...a,
        children: [
          c.length === 0 && /* @__PURE__ */ v.jsx("li", { className: "w-full px-4 py-6 text-center text-sm text-text-muted", children: l }),
          c.map((g, h) => /* @__PURE__ */ v.jsxs(
            "li",
            {
              onClick: () => f(g, h),
              className: U(
                q(
                  "flex w-full items-start gap-3 rounded-2xl px-4 py-3 transition-colors",
                  o && h !== c.length - 1 && "border-b border-slate-200",
                  i && "cursor-pointer hover:bg-primary-50"
                )
              ),
              children: [
                g.icon && /* @__PURE__ */ v.jsx("span", { className: "text-primary-500", children: g.icon }),
                /* @__PURE__ */ v.jsxs("div", { className: U(q("flex flex-1 flex-col", mi[r])), children: [
                  /* @__PURE__ */ v.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                    /* @__PURE__ */ v.jsx("p", { className: "font-medium text-text-primary", children: g.title }),
                    g.meta && /* @__PURE__ */ v.jsx("span", { className: "text-xs text-text-muted", children: g.meta })
                  ] }),
                  g.description && /* @__PURE__ */ v.jsx("p", { className: "text-text-secondary", children: g.description })
                ] }),
                g.actions && /* @__PURE__ */ v.jsx("div", { className: "flex items-center gap-2", children: g.actions })
              ]
            },
            g.id ?? h
          ))
        ]
      }
    );
  }
);
vi.displayName = "List";
const xi = V.forwardRef(
  ({ className: e, label: n, value: t, delta: r, icon: o, muted: i = !1, ...s }, l) => {
    const a = (r == null ? void 0 : r.trend) === "down" ? "text-red-500" : "text-green-500", u = (r == null ? void 0 : r.trend) === "down" ? "↓" : "↑";
    return /* @__PURE__ */ v.jsxs(
      "div",
      {
        ref: l,
        className: U(
          q(
            "flex flex-col gap-2 rounded-2xl bg-surface px-4 py-4",
            i && "bg-surface-alt",
            e
          )
        ),
        ...s,
        children: [
          /* @__PURE__ */ v.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ v.jsx("p", { className: "text-sm font-medium text-text-muted", children: n }),
            o && /* @__PURE__ */ v.jsx("span", { className: "text-primary-500", children: o })
          ] }),
          /* @__PURE__ */ v.jsx("div", { className: "flex items-end justify-between gap-4", children: /* @__PURE__ */ v.jsxs("div", { children: [
            /* @__PURE__ */ v.jsx("p", { className: "text-2xl font-semibold text-text-primary", children: t }),
            r && /* @__PURE__ */ v.jsxs("p", { className: U(q("text-xs font-medium", a)), children: [
              u,
              " ",
              r.value
            ] })
          ] }) })
        ]
      }
    );
  }
);
xi.displayName = "Statistic";
function wi() {
  for (var e = arguments.length, n = new Array(e), t = 0; t < e; t++)
    n[t] = arguments[t];
  return X(
    () => (r) => {
      n.forEach((o) => o(r));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    n
  );
}
const Dn = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function Vt(e) {
  const n = Object.prototype.toString.call(e);
  return n === "[object Window]" || // In Electron context the Window object serializes to [object global]
  n === "[object global]";
}
function ir(e) {
  return "nodeType" in e;
}
function Ie(e) {
  var n, t;
  return e ? Vt(e) ? e : ir(e) && (n = (t = e.ownerDocument) == null ? void 0 : t.defaultView) != null ? n : window : window;
}
function sr(e) {
  const {
    Document: n
  } = Ie(e);
  return e instanceof n;
}
function Yt(e) {
  return Vt(e) ? !1 : e instanceof Ie(e).HTMLElement;
}
function eo(e) {
  return e instanceof Ie(e).SVGElement;
}
function Ot(e) {
  return e ? Vt(e) ? e.document : ir(e) ? sr(e) ? e : Yt(e) || eo(e) ? e.ownerDocument : document : document : document;
}
const qe = Dn ? Uo : Y;
function In(e) {
  const n = J(e);
  return qe(() => {
    n.current = e;
  }), pe(function() {
    for (var t = arguments.length, r = new Array(t), o = 0; o < t; o++)
      r[o] = arguments[o];
    return n.current == null ? void 0 : n.current(...r);
  }, []);
}
function Si() {
  const e = J(null), n = pe((r, o) => {
    e.current = setInterval(r, o);
  }, []), t = pe(() => {
    e.current !== null && (clearInterval(e.current), e.current = null);
  }, []);
  return [n, t];
}
function Ut(e, n) {
  n === void 0 && (n = [e]);
  const t = J(e);
  return qe(() => {
    t.current !== e && (t.current = e);
  }, n), t;
}
function Jt(e, n) {
  const t = J();
  return X(
    () => {
      const r = e(t.current);
      return t.current = r, r;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...n]
  );
}
function wn(e) {
  const n = In(e), t = J(null), r = pe(
    (o) => {
      o !== t.current && (n == null || n(o, t.current)), t.current = o;
    },
    //eslint-disable-next-line
    []
  );
  return [t, r];
}
function Sn(e) {
  const n = J();
  return Y(() => {
    n.current = e;
  }, [e]), n.current;
}
let Ln = {};
function Zt(e, n) {
  return X(() => {
    if (n)
      return n;
    const t = Ln[e] == null ? 0 : Ln[e] + 1;
    return Ln[e] = t, e + "-" + t;
  }, [e, n]);
}
function to(e) {
  return function(n) {
    for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++)
      r[o - 1] = arguments[o];
    return r.reduce((i, s) => {
      const l = Object.entries(s);
      for (const [a, u] of l) {
        const d = i[a];
        d != null && (i[a] = d + e * u);
      }
      return i;
    }, {
      ...n
    });
  };
}
const $t = /* @__PURE__ */ to(1), Kt = /* @__PURE__ */ to(-1);
function Ci(e) {
  return "clientX" in e && "clientY" in e;
}
function En(e) {
  if (!e)
    return !1;
  const {
    KeyboardEvent: n
  } = Ie(e.target);
  return n && e instanceof n;
}
function yi(e) {
  if (!e)
    return !1;
  const {
    TouchEvent: n
  } = Ie(e.target);
  return n && e instanceof n;
}
function Cn(e) {
  if (yi(e)) {
    if (e.touches && e.touches.length) {
      const {
        clientX: n,
        clientY: t
      } = e.touches[0];
      return {
        x: n,
        y: t
      };
    } else if (e.changedTouches && e.changedTouches.length) {
      const {
        clientX: n,
        clientY: t
      } = e.changedTouches[0];
      return {
        x: n,
        y: t
      };
    }
  }
  return Ci(e) ? {
    x: e.clientX,
    y: e.clientY
  } : null;
}
const ft = /* @__PURE__ */ Object.freeze({
  Translate: {
    toString(e) {
      if (!e)
        return;
      const {
        x: n,
        y: t
      } = e;
      return "translate3d(" + (n ? Math.round(n) : 0) + "px, " + (t ? Math.round(t) : 0) + "px, 0)";
    }
  },
  Scale: {
    toString(e) {
      if (!e)
        return;
      const {
        scaleX: n,
        scaleY: t
      } = e;
      return "scaleX(" + n + ") scaleY(" + t + ")";
    }
  },
  Transform: {
    toString(e) {
      if (e)
        return [ft.Translate.toString(e), ft.Scale.toString(e)].join(" ");
    }
  },
  Transition: {
    toString(e) {
      let {
        property: n,
        duration: t,
        easing: r
      } = e;
      return n + " " + t + "ms " + r;
    }
  }
}), $r = "a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),*[tabindex]";
function Ri(e) {
  return e.matches($r) ? e : e.querySelector($r);
}
const bi = {
  display: "none"
};
function Di(e) {
  let {
    id: n,
    value: t
  } = e;
  return te.createElement("div", {
    id: n,
    style: bi
  }, t);
}
function Ii(e) {
  let {
    id: n,
    announcement: t,
    ariaLiveType: r = "assertive"
  } = e;
  const o = {
    position: "fixed",
    top: 0,
    left: 0,
    width: 1,
    height: 1,
    margin: -1,
    border: 0,
    padding: 0,
    overflow: "hidden",
    clip: "rect(0 0 0 0)",
    clipPath: "inset(100%)",
    whiteSpace: "nowrap"
  };
  return te.createElement("div", {
    id: n,
    style: o,
    role: "status",
    "aria-live": r,
    "aria-atomic": !0
  }, t);
}
function Ei() {
  const [e, n] = De("");
  return {
    announce: pe((r) => {
      r != null && n(r);
    }, []),
    announcement: e
  };
}
const no = /* @__PURE__ */ Xt(null);
function _i(e) {
  const n = gt(no);
  Y(() => {
    if (!n)
      throw new Error("useDndMonitor must be used within a children of <DndContext>");
    return n(e);
  }, [e, n]);
}
function Mi() {
  const [e] = De(() => /* @__PURE__ */ new Set()), n = pe((r) => (e.add(r), () => e.delete(r)), [e]);
  return [pe((r) => {
    let {
      type: o,
      event: i
    } = r;
    e.forEach((s) => {
      var l;
      return (l = s[o]) == null ? void 0 : l.call(s, i);
    });
  }, [e]), n];
}
const Fi = {
  draggable: `
    To pick up a draggable item, press the space bar.
    While dragging, use the arrow keys to move the item.
    Press space again to drop the item in its new position, or press escape to cancel.
  `
}, Ni = {
  onDragStart(e) {
    let {
      active: n
    } = e;
    return "Picked up draggable item " + n.id + ".";
  },
  onDragOver(e) {
    let {
      active: n,
      over: t
    } = e;
    return t ? "Draggable item " + n.id + " was moved over droppable area " + t.id + "." : "Draggable item " + n.id + " is no longer over a droppable area.";
  },
  onDragEnd(e) {
    let {
      active: n,
      over: t
    } = e;
    return t ? "Draggable item " + n.id + " was dropped over droppable area " + t.id : "Draggable item " + n.id + " was dropped.";
  },
  onDragCancel(e) {
    let {
      active: n
    } = e;
    return "Dragging was cancelled. Draggable item " + n.id + " was dropped.";
  }
};
function Pi(e) {
  let {
    announcements: n = Ni,
    container: t,
    hiddenTextDescribedById: r,
    screenReaderInstructions: o = Fi
  } = e;
  const {
    announce: i,
    announcement: s
  } = Ei(), l = Zt("DndLiveRegion"), [a, u] = De(!1);
  if (Y(() => {
    u(!0);
  }, []), _i(X(() => ({
    onDragStart(f) {
      let {
        active: c
      } = f;
      i(n.onDragStart({
        active: c
      }));
    },
    onDragMove(f) {
      let {
        active: c,
        over: g
      } = f;
      n.onDragMove && i(n.onDragMove({
        active: c,
        over: g
      }));
    },
    onDragOver(f) {
      let {
        active: c,
        over: g
      } = f;
      i(n.onDragOver({
        active: c,
        over: g
      }));
    },
    onDragEnd(f) {
      let {
        active: c,
        over: g
      } = f;
      i(n.onDragEnd({
        active: c,
        over: g
      }));
    },
    onDragCancel(f) {
      let {
        active: c,
        over: g
      } = f;
      i(n.onDragCancel({
        active: c,
        over: g
      }));
    }
  }), [i, n])), !a)
    return null;
  const d = te.createElement(te.Fragment, null, te.createElement(Di, {
    id: r,
    value: o.draggable
  }), te.createElement(Ii, {
    id: l,
    announcement: s
  }));
  return t ? Jr(d, t) : d;
}
var le;
(function(e) {
  e.DragStart = "dragStart", e.DragMove = "dragMove", e.DragEnd = "dragEnd", e.DragCancel = "dragCancel", e.DragOver = "dragOver", e.RegisterDroppable = "registerDroppable", e.SetDroppableDisabled = "setDroppableDisabled", e.UnregisterDroppable = "unregisterDroppable";
})(le || (le = {}));
function yn() {
}
function Vr(e, n) {
  return X(
    () => ({
      sensor: e,
      options: n ?? {}
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [e, n]
  );
}
function $i() {
  for (var e = arguments.length, n = new Array(e), t = 0; t < e; t++)
    n[t] = arguments[t];
  return X(
    () => [...n].filter((r) => r != null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...n]
  );
}
const Ue = /* @__PURE__ */ Object.freeze({
  x: 0,
  y: 0
});
function ro(e, n) {
  return Math.sqrt(Math.pow(e.x - n.x, 2) + Math.pow(e.y - n.y, 2));
}
function Vi(e, n) {
  const t = Cn(e);
  if (!t)
    return "0 0";
  const r = {
    x: (t.x - n.left) / n.width * 100,
    y: (t.y - n.top) / n.height * 100
  };
  return r.x + "% " + r.y + "%";
}
function oo(e, n) {
  let {
    data: {
      value: t
    }
  } = e, {
    data: {
      value: r
    }
  } = n;
  return t - r;
}
function Oi(e, n) {
  let {
    data: {
      value: t
    }
  } = e, {
    data: {
      value: r
    }
  } = n;
  return r - t;
}
function Or(e) {
  let {
    left: n,
    top: t,
    height: r,
    width: o
  } = e;
  return [{
    x: n,
    y: t
  }, {
    x: n + o,
    y: t
  }, {
    x: n,
    y: t + r
  }, {
    x: n + o,
    y: t + r
  }];
}
function io(e, n) {
  if (!e || e.length === 0)
    return null;
  const [t] = e;
  return t[n];
}
function jr(e, n, t) {
  return n === void 0 && (n = e.left), t === void 0 && (t = e.top), {
    x: n + e.width * 0.5,
    y: t + e.height * 0.5
  };
}
const ji = (e) => {
  let {
    collisionRect: n,
    droppableRects: t,
    droppableContainers: r
  } = e;
  const o = jr(n, n.left, n.top), i = [];
  for (const s of r) {
    const {
      id: l
    } = s, a = t.get(l);
    if (a) {
      const u = ro(jr(a), o);
      i.push({
        id: l,
        data: {
          droppableContainer: s,
          value: u
        }
      });
    }
  }
  return i.sort(oo);
}, Ai = (e) => {
  let {
    collisionRect: n,
    droppableRects: t,
    droppableContainers: r
  } = e;
  const o = Or(n), i = [];
  for (const s of r) {
    const {
      id: l
    } = s, a = t.get(l);
    if (a) {
      const u = Or(a), d = o.reduce((c, g, h) => c + ro(u[h], g), 0), f = Number((d / 4).toFixed(4));
      i.push({
        id: l,
        data: {
          droppableContainer: s,
          value: f
        }
      });
    }
  }
  return i.sort(oo);
};
function zi(e, n) {
  const t = Math.max(n.top, e.top), r = Math.max(n.left, e.left), o = Math.min(n.left + n.width, e.left + e.width), i = Math.min(n.top + n.height, e.top + e.height), s = o - r, l = i - t;
  if (r < o && t < i) {
    const a = n.width * n.height, u = e.width * e.height, d = s * l, f = d / (a + u - d);
    return Number(f.toFixed(4));
  }
  return 0;
}
const Ti = (e) => {
  let {
    collisionRect: n,
    droppableRects: t,
    droppableContainers: r
  } = e;
  const o = [];
  for (const i of r) {
    const {
      id: s
    } = i, l = t.get(s);
    if (l) {
      const a = zi(l, n);
      a > 0 && o.push({
        id: s,
        data: {
          droppableContainer: i,
          value: a
        }
      });
    }
  }
  return o.sort(Oi);
};
function Li(e, n, t) {
  return {
    ...e,
    scaleX: n && t ? n.width / t.width : 1,
    scaleY: n && t ? n.height / t.height : 1
  };
}
function so(e, n) {
  return e && n ? {
    x: e.left - n.left,
    y: e.top - n.top
  } : Ue;
}
function ki(e) {
  return function(t) {
    for (var r = arguments.length, o = new Array(r > 1 ? r - 1 : 0), i = 1; i < r; i++)
      o[i - 1] = arguments[i];
    return o.reduce((s, l) => ({
      ...s,
      top: s.top + e * l.y,
      bottom: s.bottom + e * l.y,
      left: s.left + e * l.x,
      right: s.right + e * l.x
    }), {
      ...t
    });
  };
}
const Hi = /* @__PURE__ */ ki(1);
function lo(e) {
  if (e.startsWith("matrix3d(")) {
    const n = e.slice(9, -1).split(/, /);
    return {
      x: +n[12],
      y: +n[13],
      scaleX: +n[0],
      scaleY: +n[5]
    };
  } else if (e.startsWith("matrix(")) {
    const n = e.slice(7, -1).split(/, /);
    return {
      x: +n[4],
      y: +n[5],
      scaleX: +n[0],
      scaleY: +n[3]
    };
  }
  return null;
}
function Gi(e, n, t) {
  const r = lo(n);
  if (!r)
    return e;
  const {
    scaleX: o,
    scaleY: i,
    x: s,
    y: l
  } = r, a = e.left - s - (1 - o) * parseFloat(t), u = e.top - l - (1 - i) * parseFloat(t.slice(t.indexOf(" ") + 1)), d = o ? e.width / o : e.width, f = i ? e.height / i : e.height;
  return {
    width: d,
    height: f,
    top: u,
    right: a + d,
    bottom: u + f,
    left: a
  };
}
const Bi = {
  ignoreTransform: !1
};
function jt(e, n) {
  n === void 0 && (n = Bi);
  let t = e.getBoundingClientRect();
  if (n.ignoreTransform) {
    const {
      transform: u,
      transformOrigin: d
    } = Ie(e).getComputedStyle(e);
    u && (t = Gi(t, u, d));
  }
  const {
    top: r,
    left: o,
    width: i,
    height: s,
    bottom: l,
    right: a
  } = t;
  return {
    top: r,
    left: o,
    width: i,
    height: s,
    bottom: l,
    right: a
  };
}
function Ar(e) {
  return jt(e, {
    ignoreTransform: !0
  });
}
function qi(e) {
  const n = e.innerWidth, t = e.innerHeight;
  return {
    top: 0,
    left: 0,
    right: n,
    bottom: t,
    width: n,
    height: t
  };
}
function Ui(e, n) {
  return n === void 0 && (n = Ie(e).getComputedStyle(e)), n.position === "fixed";
}
function Ki(e, n) {
  n === void 0 && (n = Ie(e).getComputedStyle(e));
  const t = /(auto|scroll|overlay)/;
  return ["overflow", "overflowX", "overflowY"].some((o) => {
    const i = n[o];
    return typeof i == "string" ? t.test(i) : !1;
  });
}
function _n(e, n) {
  const t = [];
  function r(o) {
    if (n != null && t.length >= n || !o)
      return t;
    if (sr(o) && o.scrollingElement != null && !t.includes(o.scrollingElement))
      return t.push(o.scrollingElement), t;
    if (!Yt(o) || eo(o) || t.includes(o))
      return t;
    const i = Ie(e).getComputedStyle(o);
    return o !== e && Ki(o, i) && t.push(o), Ui(o, i) ? t : r(o.parentNode);
  }
  return e ? r(e) : t;
}
function ao(e) {
  const [n] = _n(e, 1);
  return n ?? null;
}
function kn(e) {
  return !Dn || !e ? null : Vt(e) ? e : ir(e) ? sr(e) || e === Ot(e).scrollingElement ? window : Yt(e) ? e : null : null;
}
function uo(e) {
  return Vt(e) ? e.scrollX : e.scrollLeft;
}
function co(e) {
  return Vt(e) ? e.scrollY : e.scrollTop;
}
function Jn(e) {
  return {
    x: uo(e),
    y: co(e)
  };
}
var ue;
(function(e) {
  e[e.Forward = 1] = "Forward", e[e.Backward = -1] = "Backward";
})(ue || (ue = {}));
function go(e) {
  return !Dn || !e ? !1 : e === document.scrollingElement;
}
function fo(e) {
  const n = {
    x: 0,
    y: 0
  }, t = go(e) ? {
    height: window.innerHeight,
    width: window.innerWidth
  } : {
    height: e.clientHeight,
    width: e.clientWidth
  }, r = {
    x: e.scrollWidth - t.width,
    y: e.scrollHeight - t.height
  }, o = e.scrollTop <= n.y, i = e.scrollLeft <= n.x, s = e.scrollTop >= r.y, l = e.scrollLeft >= r.x;
  return {
    isTop: o,
    isLeft: i,
    isBottom: s,
    isRight: l,
    maxScroll: r,
    minScroll: n
  };
}
const Wi = {
  x: 0.2,
  y: 0.2
};
function Xi(e, n, t, r, o) {
  let {
    top: i,
    left: s,
    right: l,
    bottom: a
  } = t;
  r === void 0 && (r = 10), o === void 0 && (o = Wi);
  const {
    isTop: u,
    isBottom: d,
    isLeft: f,
    isRight: c
  } = fo(e), g = {
    x: 0,
    y: 0
  }, h = {
    x: 0,
    y: 0
  }, x = {
    height: n.height * o.y,
    width: n.width * o.x
  };
  return !u && i <= n.top + x.height ? (g.y = ue.Backward, h.y = r * Math.abs((n.top + x.height - i) / x.height)) : !d && a >= n.bottom - x.height && (g.y = ue.Forward, h.y = r * Math.abs((n.bottom - x.height - a) / x.height)), !c && l >= n.right - x.width ? (g.x = ue.Forward, h.x = r * Math.abs((n.right - x.width - l) / x.width)) : !f && s <= n.left + x.width && (g.x = ue.Backward, h.x = r * Math.abs((n.left + x.width - s) / x.width)), {
    direction: g,
    speed: h
  };
}
function Yi(e) {
  if (e === document.scrollingElement) {
    const {
      innerWidth: i,
      innerHeight: s
    } = window;
    return {
      top: 0,
      left: 0,
      right: i,
      bottom: s,
      width: i,
      height: s
    };
  }
  const {
    top: n,
    left: t,
    right: r,
    bottom: o
  } = e.getBoundingClientRect();
  return {
    top: n,
    left: t,
    right: r,
    bottom: o,
    width: e.clientWidth,
    height: e.clientHeight
  };
}
function po(e) {
  return e.reduce((n, t) => $t(n, Jn(t)), Ue);
}
function Ji(e) {
  return e.reduce((n, t) => n + uo(t), 0);
}
function Zi(e) {
  return e.reduce((n, t) => n + co(t), 0);
}
function ho(e, n) {
  if (n === void 0 && (n = jt), !e)
    return;
  const {
    top: t,
    left: r,
    bottom: o,
    right: i
  } = n(e);
  ao(e) && (o <= 0 || i <= 0 || t >= window.innerHeight || r >= window.innerWidth) && e.scrollIntoView({
    block: "center",
    inline: "center"
  });
}
const Qi = [["x", ["left", "right"], Ji], ["y", ["top", "bottom"], Zi]];
class lr {
  constructor(n, t) {
    this.rect = void 0, this.width = void 0, this.height = void 0, this.top = void 0, this.bottom = void 0, this.right = void 0, this.left = void 0;
    const r = _n(t), o = po(r);
    this.rect = {
      ...n
    }, this.width = n.width, this.height = n.height;
    for (const [i, s, l] of Qi)
      for (const a of s)
        Object.defineProperty(this, a, {
          get: () => {
            const u = l(r), d = o[i] - u;
            return this.rect[a] + d;
          },
          enumerable: !0
        });
    Object.defineProperty(this, "rect", {
      enumerable: !1
    });
  }
}
class Ht {
  constructor(n) {
    this.target = void 0, this.listeners = [], this.removeAll = () => {
      this.listeners.forEach((t) => {
        var r;
        return (r = this.target) == null ? void 0 : r.removeEventListener(...t);
      });
    }, this.target = n;
  }
  add(n, t, r) {
    var o;
    (o = this.target) == null || o.addEventListener(n, t, r), this.listeners.push([n, t, r]);
  }
}
function es(e) {
  const {
    EventTarget: n
  } = Ie(e);
  return e instanceof n ? e : Ot(e);
}
function Hn(e, n) {
  const t = Math.abs(e.x), r = Math.abs(e.y);
  return typeof n == "number" ? Math.sqrt(t ** 2 + r ** 2) > n : "x" in n && "y" in n ? t > n.x && r > n.y : "x" in n ? t > n.x : "y" in n ? r > n.y : !1;
}
var ke;
(function(e) {
  e.Click = "click", e.DragStart = "dragstart", e.Keydown = "keydown", e.ContextMenu = "contextmenu", e.Resize = "resize", e.SelectionChange = "selectionchange", e.VisibilityChange = "visibilitychange";
})(ke || (ke = {}));
function zr(e) {
  e.preventDefault();
}
function ts(e) {
  e.stopPropagation();
}
var L;
(function(e) {
  e.Space = "Space", e.Down = "ArrowDown", e.Right = "ArrowRight", e.Left = "ArrowLeft", e.Up = "ArrowUp", e.Esc = "Escape", e.Enter = "Enter", e.Tab = "Tab";
})(L || (L = {}));
const mo = {
  start: [L.Space, L.Enter],
  cancel: [L.Esc],
  end: [L.Space, L.Enter, L.Tab]
}, ns = (e, n) => {
  let {
    currentCoordinates: t
  } = n;
  switch (e.code) {
    case L.Right:
      return {
        ...t,
        x: t.x + 25
      };
    case L.Left:
      return {
        ...t,
        x: t.x - 25
      };
    case L.Down:
      return {
        ...t,
        y: t.y + 25
      };
    case L.Up:
      return {
        ...t,
        y: t.y - 25
      };
  }
};
class ar {
  constructor(n) {
    this.props = void 0, this.autoScrollEnabled = !1, this.referenceCoordinates = void 0, this.listeners = void 0, this.windowListeners = void 0, this.props = n;
    const {
      event: {
        target: t
      }
    } = n;
    this.props = n, this.listeners = new Ht(Ot(t)), this.windowListeners = new Ht(Ie(t)), this.handleKeyDown = this.handleKeyDown.bind(this), this.handleCancel = this.handleCancel.bind(this), this.attach();
  }
  attach() {
    this.handleStart(), this.windowListeners.add(ke.Resize, this.handleCancel), this.windowListeners.add(ke.VisibilityChange, this.handleCancel), setTimeout(() => this.listeners.add(ke.Keydown, this.handleKeyDown));
  }
  handleStart() {
    const {
      activeNode: n,
      onStart: t
    } = this.props, r = n.node.current;
    r && ho(r), t(Ue);
  }
  handleKeyDown(n) {
    if (En(n)) {
      const {
        active: t,
        context: r,
        options: o
      } = this.props, {
        keyboardCodes: i = mo,
        coordinateGetter: s = ns,
        scrollBehavior: l = "smooth"
      } = o, {
        code: a
      } = n;
      if (i.end.includes(a)) {
        this.handleEnd(n);
        return;
      }
      if (i.cancel.includes(a)) {
        this.handleCancel(n);
        return;
      }
      const {
        collisionRect: u
      } = r.current, d = u ? {
        x: u.left,
        y: u.top
      } : Ue;
      this.referenceCoordinates || (this.referenceCoordinates = d);
      const f = s(n, {
        active: t,
        context: r.current,
        currentCoordinates: d
      });
      if (f) {
        const c = Kt(f, d), g = {
          x: 0,
          y: 0
        }, {
          scrollableAncestors: h
        } = r.current;
        for (const x of h) {
          const w = n.code, {
            isTop: S,
            isRight: R,
            isLeft: I,
            isBottom: F,
            maxScroll: $,
            minScroll: _
          } = fo(x), z = Yi(x), T = {
            x: Math.min(w === L.Right ? z.right - z.width / 2 : z.right, Math.max(w === L.Right ? z.left : z.left + z.width / 2, f.x)),
            y: Math.min(w === L.Down ? z.bottom - z.height / 2 : z.bottom, Math.max(w === L.Down ? z.top : z.top + z.height / 2, f.y))
          }, W = w === L.Right && !R || w === L.Left && !I, Z = w === L.Down && !F || w === L.Up && !S;
          if (W && T.x !== f.x) {
            const B = x.scrollLeft + c.x, Ne = w === L.Right && B <= $.x || w === L.Left && B >= _.x;
            if (Ne && !c.y) {
              x.scrollTo({
                left: B,
                behavior: l
              });
              return;
            }
            Ne ? g.x = x.scrollLeft - B : g.x = w === L.Right ? x.scrollLeft - $.x : x.scrollLeft - _.x, g.x && x.scrollBy({
              left: -g.x,
              behavior: l
            });
            break;
          } else if (Z && T.y !== f.y) {
            const B = x.scrollTop + c.y, Ne = w === L.Down && B <= $.y || w === L.Up && B >= _.y;
            if (Ne && !c.x) {
              x.scrollTo({
                top: B,
                behavior: l
              });
              return;
            }
            Ne ? g.y = x.scrollTop - B : g.y = w === L.Down ? x.scrollTop - $.y : x.scrollTop - _.y, g.y && x.scrollBy({
              top: -g.y,
              behavior: l
            });
            break;
          }
        }
        this.handleMove(n, $t(Kt(f, this.referenceCoordinates), g));
      }
    }
  }
  handleMove(n, t) {
    const {
      onMove: r
    } = this.props;
    n.preventDefault(), r(t);
  }
  handleEnd(n) {
    const {
      onEnd: t
    } = this.props;
    n.preventDefault(), this.detach(), t();
  }
  handleCancel(n) {
    const {
      onCancel: t
    } = this.props;
    n.preventDefault(), this.detach(), t();
  }
  detach() {
    this.listeners.removeAll(), this.windowListeners.removeAll();
  }
}
ar.activators = [{
  eventName: "onKeyDown",
  handler: (e, n, t) => {
    let {
      keyboardCodes: r = mo,
      onActivation: o
    } = n, {
      active: i
    } = t;
    const {
      code: s
    } = e.nativeEvent;
    if (r.start.includes(s)) {
      const l = i.activatorNode.current;
      return l && e.target !== l ? !1 : (e.preventDefault(), o == null || o({
        event: e.nativeEvent
      }), !0);
    }
    return !1;
  }
}];
function Tr(e) {
  return !!(e && "distance" in e);
}
function Lr(e) {
  return !!(e && "delay" in e);
}
class ur {
  constructor(n, t, r) {
    var o;
    r === void 0 && (r = es(n.event.target)), this.props = void 0, this.events = void 0, this.autoScrollEnabled = !0, this.document = void 0, this.activated = !1, this.initialCoordinates = void 0, this.timeoutId = null, this.listeners = void 0, this.documentListeners = void 0, this.windowListeners = void 0, this.props = n, this.events = t;
    const {
      event: i
    } = n, {
      target: s
    } = i;
    this.props = n, this.events = t, this.document = Ot(s), this.documentListeners = new Ht(this.document), this.listeners = new Ht(r), this.windowListeners = new Ht(Ie(s)), this.initialCoordinates = (o = Cn(i)) != null ? o : Ue, this.handleStart = this.handleStart.bind(this), this.handleMove = this.handleMove.bind(this), this.handleEnd = this.handleEnd.bind(this), this.handleCancel = this.handleCancel.bind(this), this.handleKeydown = this.handleKeydown.bind(this), this.removeTextSelection = this.removeTextSelection.bind(this), this.attach();
  }
  attach() {
    const {
      events: n,
      props: {
        options: {
          activationConstraint: t,
          bypassActivationConstraint: r
        }
      }
    } = this;
    if (this.listeners.add(n.move.name, this.handleMove, {
      passive: !1
    }), this.listeners.add(n.end.name, this.handleEnd), n.cancel && this.listeners.add(n.cancel.name, this.handleCancel), this.windowListeners.add(ke.Resize, this.handleCancel), this.windowListeners.add(ke.DragStart, zr), this.windowListeners.add(ke.VisibilityChange, this.handleCancel), this.windowListeners.add(ke.ContextMenu, zr), this.documentListeners.add(ke.Keydown, this.handleKeydown), t) {
      if (r != null && r({
        event: this.props.event,
        activeNode: this.props.activeNode,
        options: this.props.options
      }))
        return this.handleStart();
      if (Lr(t)) {
        this.timeoutId = setTimeout(this.handleStart, t.delay), this.handlePending(t);
        return;
      }
      if (Tr(t)) {
        this.handlePending(t);
        return;
      }
    }
    this.handleStart();
  }
  detach() {
    this.listeners.removeAll(), this.windowListeners.removeAll(), setTimeout(this.documentListeners.removeAll, 50), this.timeoutId !== null && (clearTimeout(this.timeoutId), this.timeoutId = null);
  }
  handlePending(n, t) {
    const {
      active: r,
      onPending: o
    } = this.props;
    o(r, n, this.initialCoordinates, t);
  }
  handleStart() {
    const {
      initialCoordinates: n
    } = this, {
      onStart: t
    } = this.props;
    n && (this.activated = !0, this.documentListeners.add(ke.Click, ts, {
      capture: !0
    }), this.removeTextSelection(), this.documentListeners.add(ke.SelectionChange, this.removeTextSelection), t(n));
  }
  handleMove(n) {
    var t;
    const {
      activated: r,
      initialCoordinates: o,
      props: i
    } = this, {
      onMove: s,
      options: {
        activationConstraint: l
      }
    } = i;
    if (!o)
      return;
    const a = (t = Cn(n)) != null ? t : Ue, u = Kt(o, a);
    if (!r && l) {
      if (Tr(l)) {
        if (l.tolerance != null && Hn(u, l.tolerance))
          return this.handleCancel();
        if (Hn(u, l.distance))
          return this.handleStart();
      }
      if (Lr(l) && Hn(u, l.tolerance))
        return this.handleCancel();
      this.handlePending(l, u);
      return;
    }
    n.cancelable && n.preventDefault(), s(a);
  }
  handleEnd() {
    const {
      onAbort: n,
      onEnd: t
    } = this.props;
    this.detach(), this.activated || n(this.props.active), t();
  }
  handleCancel() {
    const {
      onAbort: n,
      onCancel: t
    } = this.props;
    this.detach(), this.activated || n(this.props.active), t();
  }
  handleKeydown(n) {
    n.code === L.Esc && this.handleCancel();
  }
  removeTextSelection() {
    var n;
    (n = this.document.getSelection()) == null || n.removeAllRanges();
  }
}
const rs = {
  cancel: {
    name: "pointercancel"
  },
  move: {
    name: "pointermove"
  },
  end: {
    name: "pointerup"
  }
};
class cr extends ur {
  constructor(n) {
    const {
      event: t
    } = n, r = Ot(t.target);
    super(n, rs, r);
  }
}
cr.activators = [{
  eventName: "onPointerDown",
  handler: (e, n) => {
    let {
      nativeEvent: t
    } = e, {
      onActivation: r
    } = n;
    return !t.isPrimary || t.button !== 0 ? !1 : (r == null || r({
      event: t
    }), !0);
  }
}];
const os = {
  move: {
    name: "mousemove"
  },
  end: {
    name: "mouseup"
  }
};
var Zn;
(function(e) {
  e[e.RightClick = 2] = "RightClick";
})(Zn || (Zn = {}));
class is extends ur {
  constructor(n) {
    super(n, os, Ot(n.event.target));
  }
}
is.activators = [{
  eventName: "onMouseDown",
  handler: (e, n) => {
    let {
      nativeEvent: t
    } = e, {
      onActivation: r
    } = n;
    return t.button === Zn.RightClick ? !1 : (r == null || r({
      event: t
    }), !0);
  }
}];
const Gn = {
  cancel: {
    name: "touchcancel"
  },
  move: {
    name: "touchmove"
  },
  end: {
    name: "touchend"
  }
};
class ss extends ur {
  constructor(n) {
    super(n, Gn);
  }
  static setup() {
    return window.addEventListener(Gn.move.name, n, {
      capture: !1,
      passive: !1
    }), function() {
      window.removeEventListener(Gn.move.name, n);
    };
    function n() {
    }
  }
}
ss.activators = [{
  eventName: "onTouchStart",
  handler: (e, n) => {
    let {
      nativeEvent: t
    } = e, {
      onActivation: r
    } = n;
    const {
      touches: o
    } = t;
    return o.length > 1 ? !1 : (r == null || r({
      event: t
    }), !0);
  }
}];
var Gt;
(function(e) {
  e[e.Pointer = 0] = "Pointer", e[e.DraggableRect = 1] = "DraggableRect";
})(Gt || (Gt = {}));
var Rn;
(function(e) {
  e[e.TreeOrder = 0] = "TreeOrder", e[e.ReversedTreeOrder = 1] = "ReversedTreeOrder";
})(Rn || (Rn = {}));
function ls(e) {
  let {
    acceleration: n,
    activator: t = Gt.Pointer,
    canScroll: r,
    draggingRect: o,
    enabled: i,
    interval: s = 5,
    order: l = Rn.TreeOrder,
    pointerCoordinates: a,
    scrollableAncestors: u,
    scrollableAncestorRects: d,
    delta: f,
    threshold: c
  } = e;
  const g = us({
    delta: f,
    disabled: !i
  }), [h, x] = Si(), w = J({
    x: 0,
    y: 0
  }), S = J({
    x: 0,
    y: 0
  }), R = X(() => {
    switch (t) {
      case Gt.Pointer:
        return a ? {
          top: a.y,
          bottom: a.y,
          left: a.x,
          right: a.x
        } : null;
      case Gt.DraggableRect:
        return o;
    }
  }, [t, o, a]), I = J(null), F = pe(() => {
    const _ = I.current;
    if (!_)
      return;
    const z = w.current.x * S.current.x, T = w.current.y * S.current.y;
    _.scrollBy(z, T);
  }, []), $ = X(() => l === Rn.TreeOrder ? [...u].reverse() : u, [l, u]);
  Y(
    () => {
      if (!i || !u.length || !R) {
        x();
        return;
      }
      for (const _ of $) {
        if ((r == null ? void 0 : r(_)) === !1)
          continue;
        const z = u.indexOf(_), T = d[z];
        if (!T)
          continue;
        const {
          direction: W,
          speed: Z
        } = Xi(_, T, R, n, c);
        for (const B of ["x", "y"])
          g[B][W[B]] || (Z[B] = 0, W[B] = 0);
        if (Z.x > 0 || Z.y > 0) {
          x(), I.current = _, h(F, s), w.current = Z, S.current = W;
          return;
        }
      }
      w.current = {
        x: 0,
        y: 0
      }, S.current = {
        x: 0,
        y: 0
      }, x();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      n,
      F,
      r,
      x,
      i,
      s,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(R),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(g),
      h,
      u,
      $,
      d,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(c)
    ]
  );
}
const as = {
  x: {
    [ue.Backward]: !1,
    [ue.Forward]: !1
  },
  y: {
    [ue.Backward]: !1,
    [ue.Forward]: !1
  }
};
function us(e) {
  let {
    delta: n,
    disabled: t
  } = e;
  const r = Sn(n);
  return Jt((o) => {
    if (t || !r || !o)
      return as;
    const i = {
      x: Math.sign(n.x - r.x),
      y: Math.sign(n.y - r.y)
    };
    return {
      x: {
        [ue.Backward]: o.x[ue.Backward] || i.x === -1,
        [ue.Forward]: o.x[ue.Forward] || i.x === 1
      },
      y: {
        [ue.Backward]: o.y[ue.Backward] || i.y === -1,
        [ue.Forward]: o.y[ue.Forward] || i.y === 1
      }
    };
  }, [t, n, r]);
}
function cs(e, n) {
  const t = n != null ? e.get(n) : void 0, r = t ? t.node.current : null;
  return Jt((o) => {
    var i;
    return n == null ? null : (i = r ?? o) != null ? i : null;
  }, [r, n]);
}
function ds(e, n) {
  return X(() => e.reduce((t, r) => {
    const {
      sensor: o
    } = r, i = o.activators.map((s) => ({
      eventName: s.eventName,
      handler: n(s.handler, r)
    }));
    return [...t, ...i];
  }, []), [e, n]);
}
var Wt;
(function(e) {
  e[e.Always = 0] = "Always", e[e.BeforeDragging = 1] = "BeforeDragging", e[e.WhileDragging = 2] = "WhileDragging";
})(Wt || (Wt = {}));
var Qn;
(function(e) {
  e.Optimized = "optimized";
})(Qn || (Qn = {}));
const kr = /* @__PURE__ */ new Map();
function gs(e, n) {
  let {
    dragging: t,
    dependencies: r,
    config: o
  } = n;
  const [i, s] = De(null), {
    frequency: l,
    measure: a,
    strategy: u
  } = o, d = J(e), f = w(), c = Ut(f), g = pe(function(S) {
    S === void 0 && (S = []), !c.current && s((R) => R === null ? S : R.concat(S.filter((I) => !R.includes(I))));
  }, [c]), h = J(null), x = Jt((S) => {
    if (f && !t)
      return kr;
    if (!S || S === kr || d.current !== e || i != null) {
      const R = /* @__PURE__ */ new Map();
      for (let I of e) {
        if (!I)
          continue;
        if (i && i.length > 0 && !i.includes(I.id) && I.rect.current) {
          R.set(I.id, I.rect.current);
          continue;
        }
        const F = I.node.current, $ = F ? new lr(a(F), F) : null;
        I.rect.current = $, $ && R.set(I.id, $);
      }
      return R;
    }
    return S;
  }, [e, i, t, f, a]);
  return Y(() => {
    d.current = e;
  }, [e]), Y(
    () => {
      f || g();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, f]
  ), Y(
    () => {
      i && i.length > 0 && s(null);
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(i)]
  ), Y(
    () => {
      f || typeof l != "number" || h.current !== null || (h.current = setTimeout(() => {
        g(), h.current = null;
      }, l));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [l, f, g, ...r]
  ), {
    droppableRects: x,
    measureDroppableContainers: g,
    measuringScheduled: i != null
  };
  function w() {
    switch (u) {
      case Wt.Always:
        return !1;
      case Wt.BeforeDragging:
        return t;
      default:
        return !t;
    }
  }
}
function dr(e, n) {
  return Jt((t) => e ? t || (typeof n == "function" ? n(e) : e) : null, [n, e]);
}
function fs(e, n) {
  return dr(e, n);
}
function ps(e) {
  let {
    callback: n,
    disabled: t
  } = e;
  const r = In(n), o = X(() => {
    if (t || typeof window > "u" || typeof window.MutationObserver > "u")
      return;
    const {
      MutationObserver: i
    } = window;
    return new i(r);
  }, [r, t]);
  return Y(() => () => o == null ? void 0 : o.disconnect(), [o]), o;
}
function Mn(e) {
  let {
    callback: n,
    disabled: t
  } = e;
  const r = In(n), o = X(
    () => {
      if (t || typeof window > "u" || typeof window.ResizeObserver > "u")
        return;
      const {
        ResizeObserver: i
      } = window;
      return new i(r);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t]
  );
  return Y(() => () => o == null ? void 0 : o.disconnect(), [o]), o;
}
function hs(e) {
  return new lr(jt(e), e);
}
function Hr(e, n, t) {
  n === void 0 && (n = hs);
  const [r, o] = De(null);
  function i() {
    o((a) => {
      if (!e)
        return null;
      if (e.isConnected === !1) {
        var u;
        return (u = a ?? t) != null ? u : null;
      }
      const d = n(e);
      return JSON.stringify(a) === JSON.stringify(d) ? a : d;
    });
  }
  const s = ps({
    callback(a) {
      if (e)
        for (const u of a) {
          const {
            type: d,
            target: f
          } = u;
          if (d === "childList" && f instanceof HTMLElement && f.contains(e)) {
            i();
            break;
          }
        }
    }
  }), l = Mn({
    callback: i
  });
  return qe(() => {
    i(), e ? (l == null || l.observe(e), s == null || s.observe(document.body, {
      childList: !0,
      subtree: !0
    })) : (l == null || l.disconnect(), s == null || s.disconnect());
  }, [e]), r;
}
function ms(e) {
  const n = dr(e);
  return so(e, n);
}
const Gr = [];
function vs(e) {
  const n = J(e), t = Jt((r) => e ? r && r !== Gr && e && n.current && e.parentNode === n.current.parentNode ? r : _n(e) : Gr, [e]);
  return Y(() => {
    n.current = e;
  }, [e]), t;
}
function xs(e) {
  const [n, t] = De(null), r = J(e), o = pe((i) => {
    const s = kn(i.target);
    s && t((l) => l ? (l.set(s, Jn(s)), new Map(l)) : null);
  }, []);
  return Y(() => {
    const i = r.current;
    if (e !== i) {
      s(i);
      const l = e.map((a) => {
        const u = kn(a);
        return u ? (u.addEventListener("scroll", o, {
          passive: !0
        }), [u, Jn(u)]) : null;
      }).filter((a) => a != null);
      t(l.length ? new Map(l) : null), r.current = e;
    }
    return () => {
      s(e), s(i);
    };
    function s(l) {
      l.forEach((a) => {
        const u = kn(a);
        u == null || u.removeEventListener("scroll", o);
      });
    }
  }, [o, e]), X(() => e.length ? n ? Array.from(n.values()).reduce((i, s) => $t(i, s), Ue) : po(e) : Ue, [e, n]);
}
function Br(e, n) {
  n === void 0 && (n = []);
  const t = J(null);
  return Y(
    () => {
      t.current = null;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    n
  ), Y(() => {
    const r = e !== Ue;
    r && !t.current && (t.current = e), !r && t.current && (t.current = null);
  }, [e]), t.current ? Kt(e, t.current) : Ue;
}
function ws(e) {
  Y(
    () => {
      if (!Dn)
        return;
      const n = e.map((t) => {
        let {
          sensor: r
        } = t;
        return r.setup == null ? void 0 : r.setup();
      });
      return () => {
        for (const t of n)
          t == null || t();
      };
    },
    // TO-DO: Sensors length could theoretically change which would not be a valid dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
    e.map((n) => {
      let {
        sensor: t
      } = n;
      return t;
    })
  );
}
function Ss(e, n) {
  return X(() => e.reduce((t, r) => {
    let {
      eventName: o,
      handler: i
    } = r;
    return t[o] = (s) => {
      i(s, n);
    }, t;
  }, {}), [e, n]);
}
function vo(e) {
  return X(() => e ? qi(e) : null, [e]);
}
const qr = [];
function Cs(e, n) {
  n === void 0 && (n = jt);
  const [t] = e, r = vo(t ? Ie(t) : null), [o, i] = De(qr);
  function s() {
    i(() => e.length ? e.map((a) => go(a) ? r : new lr(n(a), a)) : qr);
  }
  const l = Mn({
    callback: s
  });
  return qe(() => {
    l == null || l.disconnect(), s(), e.forEach((a) => l == null ? void 0 : l.observe(a));
  }, [e]), o;
}
function xo(e) {
  if (!e)
    return null;
  if (e.children.length > 1)
    return e;
  const n = e.children[0];
  return Yt(n) ? n : e;
}
function ys(e) {
  let {
    measure: n
  } = e;
  const [t, r] = De(null), o = pe((u) => {
    for (const {
      target: d
    } of u)
      if (Yt(d)) {
        r((f) => {
          const c = n(d);
          return f ? {
            ...f,
            width: c.width,
            height: c.height
          } : c;
        });
        break;
      }
  }, [n]), i = Mn({
    callback: o
  }), s = pe((u) => {
    const d = xo(u);
    i == null || i.disconnect(), d && (i == null || i.observe(d)), r(d ? n(d) : null);
  }, [n, i]), [l, a] = wn(s);
  return X(() => ({
    nodeRef: l,
    rect: t,
    setRef: a
  }), [t, l, a]);
}
const Rs = [{
  sensor: cr,
  options: {}
}, {
  sensor: ar,
  options: {}
}], bs = {
  current: {}
}, xn = {
  draggable: {
    measure: Ar
  },
  droppable: {
    measure: Ar,
    strategy: Wt.WhileDragging,
    frequency: Qn.Optimized
  },
  dragOverlay: {
    measure: jt
  }
};
class Bt extends Map {
  get(n) {
    var t;
    return n != null && (t = super.get(n)) != null ? t : void 0;
  }
  toArray() {
    return Array.from(this.values());
  }
  getEnabled() {
    return this.toArray().filter((n) => {
      let {
        disabled: t
      } = n;
      return !t;
    });
  }
  getNodeFor(n) {
    var t, r;
    return (t = (r = this.get(n)) == null ? void 0 : r.node.current) != null ? t : void 0;
  }
}
const Ds = {
  activatorEvent: null,
  active: null,
  activeNode: null,
  activeNodeRect: null,
  collisions: null,
  containerNodeRect: null,
  draggableNodes: /* @__PURE__ */ new Map(),
  droppableRects: /* @__PURE__ */ new Map(),
  droppableContainers: /* @__PURE__ */ new Bt(),
  over: null,
  dragOverlay: {
    nodeRef: {
      current: null
    },
    rect: null,
    setRef: yn
  },
  scrollableAncestors: [],
  scrollableAncestorRects: [],
  measuringConfiguration: xn,
  measureDroppableContainers: yn,
  windowRect: null,
  measuringScheduled: !1
}, wo = {
  activatorEvent: null,
  activators: [],
  active: null,
  activeNodeRect: null,
  ariaDescribedById: {
    draggable: ""
  },
  dispatch: yn,
  draggableNodes: /* @__PURE__ */ new Map(),
  over: null,
  measureDroppableContainers: yn
}, Qt = /* @__PURE__ */ Xt(wo), So = /* @__PURE__ */ Xt(Ds);
function Is() {
  return {
    draggable: {
      active: null,
      initialCoordinates: {
        x: 0,
        y: 0
      },
      nodes: /* @__PURE__ */ new Map(),
      translate: {
        x: 0,
        y: 0
      }
    },
    droppable: {
      containers: new Bt()
    }
  };
}
function Es(e, n) {
  switch (n.type) {
    case le.DragStart:
      return {
        ...e,
        draggable: {
          ...e.draggable,
          initialCoordinates: n.initialCoordinates,
          active: n.active
        }
      };
    case le.DragMove:
      return e.draggable.active == null ? e : {
        ...e,
        draggable: {
          ...e.draggable,
          translate: {
            x: n.coordinates.x - e.draggable.initialCoordinates.x,
            y: n.coordinates.y - e.draggable.initialCoordinates.y
          }
        }
      };
    case le.DragEnd:
    case le.DragCancel:
      return {
        ...e,
        draggable: {
          ...e.draggable,
          active: null,
          initialCoordinates: {
            x: 0,
            y: 0
          },
          translate: {
            x: 0,
            y: 0
          }
        }
      };
    case le.RegisterDroppable: {
      const {
        element: t
      } = n, {
        id: r
      } = t, o = new Bt(e.droppable.containers);
      return o.set(r, t), {
        ...e,
        droppable: {
          ...e.droppable,
          containers: o
        }
      };
    }
    case le.SetDroppableDisabled: {
      const {
        id: t,
        key: r,
        disabled: o
      } = n, i = e.droppable.containers.get(t);
      if (!i || r !== i.key)
        return e;
      const s = new Bt(e.droppable.containers);
      return s.set(t, {
        ...i,
        disabled: o
      }), {
        ...e,
        droppable: {
          ...e.droppable,
          containers: s
        }
      };
    }
    case le.UnregisterDroppable: {
      const {
        id: t,
        key: r
      } = n, o = e.droppable.containers.get(t);
      if (!o || r !== o.key)
        return e;
      const i = new Bt(e.droppable.containers);
      return i.delete(t), {
        ...e,
        droppable: {
          ...e.droppable,
          containers: i
        }
      };
    }
    default:
      return e;
  }
}
function _s(e) {
  let {
    disabled: n
  } = e;
  const {
    active: t,
    activatorEvent: r,
    draggableNodes: o
  } = gt(Qt), i = Sn(r), s = Sn(t == null ? void 0 : t.id);
  return Y(() => {
    if (!n && !r && i && s != null) {
      if (!En(i) || document.activeElement === i.target)
        return;
      const l = o.get(s);
      if (!l)
        return;
      const {
        activatorNode: a,
        node: u
      } = l;
      if (!a.current && !u.current)
        return;
      requestAnimationFrame(() => {
        for (const d of [a.current, u.current]) {
          if (!d)
            continue;
          const f = Ri(d);
          if (f) {
            f.focus();
            break;
          }
        }
      });
    }
  }, [r, n, o, s, i]), null;
}
function Co(e, n) {
  let {
    transform: t,
    ...r
  } = n;
  return e != null && e.length ? e.reduce((o, i) => i({
    transform: o,
    ...r
  }), t) : t;
}
function Ms(e) {
  return X(
    () => ({
      draggable: {
        ...xn.draggable,
        ...e == null ? void 0 : e.draggable
      },
      droppable: {
        ...xn.droppable,
        ...e == null ? void 0 : e.droppable
      },
      dragOverlay: {
        ...xn.dragOverlay,
        ...e == null ? void 0 : e.dragOverlay
      }
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [e == null ? void 0 : e.draggable, e == null ? void 0 : e.droppable, e == null ? void 0 : e.dragOverlay]
  );
}
function Fs(e) {
  let {
    activeNode: n,
    measure: t,
    initialRect: r,
    config: o = !0
  } = e;
  const i = J(!1), {
    x: s,
    y: l
  } = typeof o == "boolean" ? {
    x: o,
    y: o
  } : o;
  qe(() => {
    if (!s && !l || !n) {
      i.current = !1;
      return;
    }
    if (i.current || !r)
      return;
    const u = n == null ? void 0 : n.node.current;
    if (!u || u.isConnected === !1)
      return;
    const d = t(u), f = so(d, r);
    if (s || (f.x = 0), l || (f.y = 0), i.current = !0, Math.abs(f.x) > 0 || Math.abs(f.y) > 0) {
      const c = ao(u);
      c && c.scrollBy({
        top: f.y,
        left: f.x
      });
    }
  }, [n, s, l, r, t]);
}
const Fn = /* @__PURE__ */ Xt({
  ...Ue,
  scaleX: 1,
  scaleY: 1
});
var ct;
(function(e) {
  e[e.Uninitialized = 0] = "Uninitialized", e[e.Initializing = 1] = "Initializing", e[e.Initialized = 2] = "Initialized";
})(ct || (ct = {}));
const Ns = /* @__PURE__ */ Ko(function(n) {
  var t, r, o, i;
  let {
    id: s,
    accessibility: l,
    autoScroll: a = !0,
    children: u,
    sensors: d = Rs,
    collisionDetection: f = Ti,
    measuring: c,
    modifiers: g,
    ...h
  } = n;
  const x = Wo(Es, void 0, Is), [w, S] = x, [R, I] = Mi(), [F, $] = De(ct.Uninitialized), _ = F === ct.Initialized, {
    draggable: {
      active: z,
      nodes: T,
      translate: W
    },
    droppable: {
      containers: Z
    }
  } = w, B = z != null ? T.get(z) : null, Ne = J({
    initial: null,
    translated: null
  }), Pe = X(() => {
    var ee;
    return z != null ? {
      id: z,
      // It's possible for the active node to unmount while dragging
      data: (ee = B == null ? void 0 : B.data) != null ? ee : bs,
      rect: Ne
    } : null;
  }, [z, B]), ae = J(null), [Qe, ie] = De(null), [he, St] = De(null), me = Ut(h, Object.values(h)), Ee = Zt("DndDescribedBy", s), Ct = X(() => Z.getEnabled(), [Z]), ne = Ms(c), {
    droppableRects: se,
    measureDroppableContainers: et,
    measuringScheduled: tt
  } = gs(Ct, {
    dragging: _,
    dependencies: [W.x, W.y],
    config: ne.droppable
  }), ve = cs(T, z), ht = X(() => he ? Cn(he) : null, [he]), He = vt(), Oe = fs(ve, ne.draggable.measure);
  Fs({
    activeNode: z != null ? T.get(z) : null,
    config: He.layoutShiftCompensation,
    initialRect: Oe,
    measure: ne.draggable.measure
  });
  const M = Hr(ve, ne.draggable.measure, Oe), ot = Hr(ve ? ve.parentElement : null), k = J({
    activatorEvent: null,
    active: null,
    activeNode: ve,
    collisionRect: null,
    collisions: null,
    droppableRects: se,
    draggableNodes: T,
    draggingNode: null,
    draggingNodeRect: null,
    droppableContainers: Z,
    over: null,
    scrollableAncestors: [],
    scrollAdjustedTranslate: null
  }), Q = Z.getNodeFor((t = k.current.over) == null ? void 0 : t.id), _e = ys({
    measure: ne.dragOverlay.measure
  }), $e = (r = _e.nodeRef.current) != null ? r : ve, je = _ ? (o = _e.rect) != null ? o : M : null, yt = !!(_e.nodeRef.current && _e.rect), Ae = ms(yt ? null : M), Rt = vo($e ? Ie($e) : null), ze = vs(_ ? Q ?? ve : null), bt = Cs(ze), Dt = Co(g, {
    transform: {
      x: W.x - Ae.x,
      y: W.y - Ae.y,
      scaleX: 1,
      scaleY: 1
    },
    activatorEvent: he,
    active: Pe,
    activeNodeRect: M,
    containerNodeRect: ot,
    draggingNodeRect: je,
    over: k.current.over,
    overlayNodeRect: _e.rect,
    scrollableAncestors: ze,
    scrollableAncestorRects: bt,
    windowRect: Rt
  }), en = ht ? $t(ht, W) : null, tn = xs(ze), It = Br(tn), Pn = Br(tn, [M]), it = $t(Dt, It), st = je ? Hi(je, Dt) : null, mt = Pe && st ? f({
    active: Pe,
    collisionRect: st,
    droppableRects: se,
    droppableContainers: Ct,
    pointerCoordinates: en
  }) : null, At = io(mt, "id"), [ge, nn] = De(null), zt = yt ? Dt : $t(Dt, Pn), Et = Li(zt, (i = ge == null ? void 0 : ge.rect) != null ? i : null, M), Tt = J(null), rn = pe(
    (ee, xe) => {
      let {
        sensor: we,
        options: Ke
      } = xe;
      if (ae.current == null)
        return;
      const Fe = T.get(ae.current);
      if (!Fe)
        return;
      const ce = ee.nativeEvent, re = new we({
        active: ae.current,
        activeNode: Fe,
        event: ce,
        options: Ke,
        // Sensors need to be instantiated with refs for arguments that change over time
        // otherwise they are frozen in time with the stale arguments
        context: k,
        onAbort(oe) {
          if (!T.get(oe))
            return;
          const {
            onDragAbort: Te
          } = me.current, Ge = {
            id: oe
          };
          Te == null || Te(Ge), R({
            type: "onDragAbort",
            event: Ge
          });
        },
        onPending(oe, We, Te, Ge) {
          if (!T.get(oe))
            return;
          const {
            onDragPending: ye
          } = me.current, Le = {
            id: oe,
            constraint: We,
            initialCoordinates: Te,
            offset: Ge
          };
          ye == null || ye(Le), R({
            type: "onDragPending",
            event: Le
          });
        },
        onStart(oe) {
          const We = ae.current;
          if (We == null)
            return;
          const Te = T.get(We);
          if (!Te)
            return;
          const {
            onDragStart: Ge
          } = me.current, Ce = {
            activatorEvent: ce,
            active: {
              id: We,
              data: Te.data,
              rect: Ne
            }
          };
          an(() => {
            Ge == null || Ge(Ce), $(ct.Initializing), S({
              type: le.DragStart,
              initialCoordinates: oe,
              active: We
            }), R({
              type: "onDragStart",
              event: Ce
            }), ie(Tt.current), St(ce);
          });
        },
        onMove(oe) {
          S({
            type: le.DragMove,
            coordinates: oe
          });
        },
        onEnd: Se(le.DragEnd),
        onCancel: Se(le.DragCancel)
      });
      Tt.current = re;
      function Se(oe) {
        return async function() {
          const {
            active: Te,
            collisions: Ge,
            over: Ce,
            scrollAdjustedTranslate: ye
          } = k.current;
          let Le = null;
          if (Te && ye) {
            const {
              cancelDrop: nt
            } = me.current;
            Le = {
              activatorEvent: ce,
              active: Te,
              collisions: Ge,
              delta: ye,
              over: Ce
            }, oe === le.DragEnd && typeof nt == "function" && await Promise.resolve(nt(Le)) && (oe = le.DragCancel);
          }
          ae.current = null, an(() => {
            S({
              type: oe
            }), $(ct.Uninitialized), nn(null), ie(null), St(null), Tt.current = null;
            const nt = oe === le.DragEnd ? "onDragEnd" : "onDragCancel";
            if (Le) {
              const lt = me.current[nt];
              lt == null || lt(Le), R({
                type: nt,
                event: Le
              });
            }
          });
        };
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [T]
  ), Me = pe((ee, xe) => (we, Ke) => {
    const Fe = we.nativeEvent, ce = T.get(Ke);
    if (
      // Another sensor is already instantiating
      ae.current !== null || // No active draggable
      !ce || // Event has already been captured
      Fe.dndKit || Fe.defaultPrevented
    )
      return;
    const re = {
      active: ce
    };
    ee(we, xe.options, re) === !0 && (Fe.dndKit = {
      capturedBy: xe.sensor
    }, ae.current = Ke, rn(we, xe));
  }, [T, rn]), _t = ds(d, Me);
  ws(d), qe(() => {
    M && F === ct.Initializing && $(ct.Initialized);
  }, [M, F]), Y(
    () => {
      const {
        onDragMove: ee
      } = me.current, {
        active: xe,
        activatorEvent: we,
        collisions: Ke,
        over: Fe
      } = k.current;
      if (!xe || !we)
        return;
      const ce = {
        active: xe,
        activatorEvent: we,
        collisions: Ke,
        delta: {
          x: it.x,
          y: it.y
        },
        over: Fe
      };
      an(() => {
        ee == null || ee(ce), R({
          type: "onDragMove",
          event: ce
        });
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [it.x, it.y]
  ), Y(
    () => {
      const {
        active: ee,
        activatorEvent: xe,
        collisions: we,
        droppableContainers: Ke,
        scrollAdjustedTranslate: Fe
      } = k.current;
      if (!ee || ae.current == null || !xe || !Fe)
        return;
      const {
        onDragOver: ce
      } = me.current, re = Ke.get(At), Se = re && re.rect.current ? {
        id: re.id,
        rect: re.rect.current,
        data: re.data,
        disabled: re.disabled
      } : null, oe = {
        active: ee,
        activatorEvent: xe,
        collisions: we,
        delta: {
          x: Fe.x,
          y: Fe.y
        },
        over: Se
      };
      an(() => {
        nn(Se), ce == null || ce(oe), R({
          type: "onDragOver",
          event: oe
        });
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [At]
  ), qe(() => {
    k.current = {
      activatorEvent: he,
      active: Pe,
      activeNode: ve,
      collisionRect: st,
      collisions: mt,
      droppableRects: se,
      draggableNodes: T,
      draggingNode: $e,
      draggingNodeRect: je,
      droppableContainers: Z,
      over: ge,
      scrollableAncestors: ze,
      scrollAdjustedTranslate: it
    }, Ne.current = {
      initial: je,
      translated: st
    };
  }, [Pe, ve, mt, st, T, $e, je, se, Z, ge, ze, it]), ls({
    ...He,
    delta: W,
    draggingRect: st,
    pointerCoordinates: en,
    scrollableAncestors: ze,
    scrollableAncestorRects: bt
  });
  const Lt = X(() => ({
    active: Pe,
    activeNode: ve,
    activeNodeRect: M,
    activatorEvent: he,
    collisions: mt,
    containerNodeRect: ot,
    dragOverlay: _e,
    draggableNodes: T,
    droppableContainers: Z,
    droppableRects: se,
    over: ge,
    measureDroppableContainers: et,
    scrollableAncestors: ze,
    scrollableAncestorRects: bt,
    measuringConfiguration: ne,
    measuringScheduled: tt,
    windowRect: Rt
  }), [Pe, ve, M, he, mt, ot, _e, T, Z, se, ge, et, ze, bt, ne, tt, Rt]), Mt = X(() => ({
    activatorEvent: he,
    activators: _t,
    active: Pe,
    activeNodeRect: M,
    ariaDescribedById: {
      draggable: Ee
    },
    dispatch: S,
    draggableNodes: T,
    over: ge,
    measureDroppableContainers: et
  }), [he, _t, Pe, M, S, Ee, T, ge, et]);
  return te.createElement(no.Provider, {
    value: I
  }, te.createElement(Qt.Provider, {
    value: Mt
  }, te.createElement(So.Provider, {
    value: Lt
  }, te.createElement(Fn.Provider, {
    value: Et
  }, u)), te.createElement(_s, {
    disabled: (l == null ? void 0 : l.restoreFocus) === !1
  })), te.createElement(Pi, {
    ...l,
    hiddenTextDescribedById: Ee
  }));
  function vt() {
    const ee = (Qe == null ? void 0 : Qe.autoScrollEnabled) === !1, xe = typeof a == "object" ? a.enabled === !1 : a === !1, we = _ && !ee && !xe;
    return typeof a == "object" ? {
      ...a,
      enabled: we
    } : {
      enabled: we
    };
  }
}), Ps = /* @__PURE__ */ Xt(null), Ur = "button", $s = "Draggable";
function Vs(e) {
  let {
    id: n,
    data: t,
    disabled: r = !1,
    attributes: o
  } = e;
  const i = Zt($s), {
    activators: s,
    activatorEvent: l,
    active: a,
    activeNodeRect: u,
    ariaDescribedById: d,
    draggableNodes: f,
    over: c
  } = gt(Qt), {
    role: g = Ur,
    roleDescription: h = "draggable",
    tabIndex: x = 0
  } = o ?? {}, w = (a == null ? void 0 : a.id) === n, S = gt(w ? Fn : Ps), [R, I] = wn(), [F, $] = wn(), _ = Ss(s, n), z = Ut(t);
  qe(
    () => (f.set(n, {
      id: n,
      key: i,
      node: R,
      activatorNode: F,
      data: z
    }), () => {
      const W = f.get(n);
      W && W.key === i && f.delete(n);
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [f, n]
  );
  const T = X(() => ({
    role: g,
    tabIndex: x,
    "aria-disabled": r,
    "aria-pressed": w && g === Ur ? !0 : void 0,
    "aria-roledescription": h,
    "aria-describedby": d.draggable
  }), [r, g, x, w, h, d.draggable]);
  return {
    active: a,
    activatorEvent: l,
    activeNodeRect: u,
    attributes: T,
    isDragging: w,
    listeners: r ? void 0 : _,
    node: R,
    over: c,
    setNodeRef: I,
    setActivatorNodeRef: $,
    transform: S
  };
}
function yo() {
  return gt(So);
}
const Os = "Droppable", js = {
  timeout: 25
};
function As(e) {
  let {
    data: n,
    disabled: t = !1,
    id: r,
    resizeObserverConfig: o
  } = e;
  const i = Zt(Os), {
    active: s,
    dispatch: l,
    over: a,
    measureDroppableContainers: u
  } = gt(Qt), d = J({
    disabled: t
  }), f = J(!1), c = J(null), g = J(null), {
    disabled: h,
    updateMeasurementsFor: x,
    timeout: w
  } = {
    ...js,
    ...o
  }, S = Ut(x ?? r), R = pe(
    () => {
      if (!f.current) {
        f.current = !0;
        return;
      }
      g.current != null && clearTimeout(g.current), g.current = setTimeout(() => {
        u(Array.isArray(S.current) ? S.current : [S.current]), g.current = null;
      }, w);
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [w]
  ), I = Mn({
    callback: R,
    disabled: h || !s
  }), F = pe((T, W) => {
    I && (W && (I.unobserve(W), f.current = !1), T && I.observe(T));
  }, [I]), [$, _] = wn(F), z = Ut(n);
  return Y(() => {
    !I || !$.current || (I.disconnect(), f.current = !1, I.observe($.current));
  }, [$, I]), Y(
    () => (l({
      type: le.RegisterDroppable,
      element: {
        id: r,
        key: i,
        disabled: t,
        node: $,
        rect: c,
        data: z
      }
    }), () => l({
      type: le.UnregisterDroppable,
      key: i,
      id: r
    })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [r]
  ), Y(() => {
    t !== d.current.disabled && (l({
      type: le.SetDroppableDisabled,
      id: r,
      key: i,
      disabled: t
    }), d.current.disabled = t);
  }, [r, i, t, l]), {
    active: s,
    rect: c,
    isOver: (a == null ? void 0 : a.id) === r,
    node: $,
    over: a,
    setNodeRef: _
  };
}
function zs(e) {
  let {
    animation: n,
    children: t
  } = e;
  const [r, o] = De(null), [i, s] = De(null), l = Sn(t);
  return !t && !r && l && o(l), qe(() => {
    if (!i)
      return;
    const a = r == null ? void 0 : r.key, u = r == null ? void 0 : r.props.id;
    if (a == null || u == null) {
      o(null);
      return;
    }
    Promise.resolve(n(u, i)).then(() => {
      o(null);
    });
  }, [n, r, i]), te.createElement(te.Fragment, null, t, r ? Yo(r, {
    ref: s
  }) : null);
}
const Ts = {
  x: 0,
  y: 0,
  scaleX: 1,
  scaleY: 1
};
function Ls(e) {
  let {
    children: n
  } = e;
  return te.createElement(Qt.Provider, {
    value: wo
  }, te.createElement(Fn.Provider, {
    value: Ts
  }, n));
}
const ks = {
  position: "fixed",
  touchAction: "none"
}, Hs = (e) => En(e) ? "transform 250ms ease" : void 0, Gs = /* @__PURE__ */ Xo((e, n) => {
  let {
    as: t,
    activatorEvent: r,
    adjustScale: o,
    children: i,
    className: s,
    rect: l,
    style: a,
    transform: u,
    transition: d = Hs
  } = e;
  if (!l)
    return null;
  const f = o ? u : {
    ...u,
    scaleX: 1,
    scaleY: 1
  }, c = {
    ...ks,
    width: l.width,
    height: l.height,
    top: l.top,
    left: l.left,
    transform: ft.Transform.toString(f),
    transformOrigin: o && r ? Vi(r, l) : void 0,
    transition: typeof d == "function" ? d(r) : d,
    ...a
  };
  return te.createElement(t, {
    className: s,
    style: c,
    ref: n
  }, i);
}), Bs = (e) => (n) => {
  let {
    active: t,
    dragOverlay: r
  } = n;
  const o = {}, {
    styles: i,
    className: s
  } = e;
  if (i != null && i.active)
    for (const [l, a] of Object.entries(i.active))
      a !== void 0 && (o[l] = t.node.style.getPropertyValue(l), t.node.style.setProperty(l, a));
  if (i != null && i.dragOverlay)
    for (const [l, a] of Object.entries(i.dragOverlay))
      a !== void 0 && r.node.style.setProperty(l, a);
  return s != null && s.active && t.node.classList.add(s.active), s != null && s.dragOverlay && r.node.classList.add(s.dragOverlay), function() {
    for (const [a, u] of Object.entries(o))
      t.node.style.setProperty(a, u);
    s != null && s.active && t.node.classList.remove(s.active);
  };
}, qs = (e) => {
  let {
    transform: {
      initial: n,
      final: t
    }
  } = e;
  return [{
    transform: ft.Transform.toString(n)
  }, {
    transform: ft.Transform.toString(t)
  }];
}, Us = {
  duration: 250,
  easing: "ease",
  keyframes: qs,
  sideEffects: /* @__PURE__ */ Bs({
    styles: {
      active: {
        opacity: "0"
      }
    }
  })
};
function Ks(e) {
  let {
    config: n,
    draggableNodes: t,
    droppableContainers: r,
    measuringConfiguration: o
  } = e;
  return In((i, s) => {
    if (n === null)
      return;
    const l = t.get(i);
    if (!l)
      return;
    const a = l.node.current;
    if (!a)
      return;
    const u = xo(s);
    if (!u)
      return;
    const {
      transform: d
    } = Ie(s).getComputedStyle(s), f = lo(d);
    if (!f)
      return;
    const c = typeof n == "function" ? n : Ws(n);
    return ho(a, o.draggable.measure), c({
      active: {
        id: i,
        data: l.data,
        node: a,
        rect: o.draggable.measure(a)
      },
      draggableNodes: t,
      dragOverlay: {
        node: s,
        rect: o.dragOverlay.measure(u)
      },
      droppableContainers: r,
      measuringConfiguration: o,
      transform: f
    });
  });
}
function Ws(e) {
  const {
    duration: n,
    easing: t,
    sideEffects: r,
    keyframes: o
  } = {
    ...Us,
    ...e
  };
  return (i) => {
    let {
      active: s,
      dragOverlay: l,
      transform: a,
      ...u
    } = i;
    if (!n)
      return;
    const d = {
      x: l.rect.left - s.rect.left,
      y: l.rect.top - s.rect.top
    }, f = {
      scaleX: a.scaleX !== 1 ? s.rect.width * a.scaleX / l.rect.width : 1,
      scaleY: a.scaleY !== 1 ? s.rect.height * a.scaleY / l.rect.height : 1
    }, c = {
      x: a.x - d.x,
      y: a.y - d.y,
      ...f
    }, g = o({
      ...u,
      active: s,
      dragOverlay: l,
      transform: {
        initial: a,
        final: c
      }
    }), [h] = g, x = g[g.length - 1];
    if (JSON.stringify(h) === JSON.stringify(x))
      return;
    const w = r == null ? void 0 : r({
      active: s,
      dragOverlay: l,
      ...u
    }), S = l.node.animate(g, {
      duration: n,
      easing: t,
      fill: "forwards"
    });
    return new Promise((R) => {
      S.onfinish = () => {
        w == null || w(), R();
      };
    });
  };
}
let Kr = 0;
function Xs(e) {
  return X(() => {
    if (e != null)
      return Kr++, Kr;
  }, [e]);
}
const Sa = /* @__PURE__ */ te.memo((e) => {
  let {
    adjustScale: n = !1,
    children: t,
    dropAnimation: r,
    style: o,
    transition: i,
    modifiers: s,
    wrapperElement: l = "div",
    className: a,
    zIndex: u = 999
  } = e;
  const {
    activatorEvent: d,
    active: f,
    activeNodeRect: c,
    containerNodeRect: g,
    draggableNodes: h,
    droppableContainers: x,
    dragOverlay: w,
    over: S,
    measuringConfiguration: R,
    scrollableAncestors: I,
    scrollableAncestorRects: F,
    windowRect: $
  } = yo(), _ = gt(Fn), z = Xs(f == null ? void 0 : f.id), T = Co(s, {
    activatorEvent: d,
    active: f,
    activeNodeRect: c,
    containerNodeRect: g,
    draggingNodeRect: w.rect,
    over: S,
    overlayNodeRect: w.rect,
    scrollableAncestors: I,
    scrollableAncestorRects: F,
    transform: _,
    windowRect: $
  }), W = dr(c), Z = Ks({
    config: r,
    draggableNodes: h,
    droppableContainers: x,
    measuringConfiguration: R
  }), B = W ? w.setRef : void 0;
  return te.createElement(Ls, null, te.createElement(zs, {
    animation: Z
  }, f && z ? te.createElement(Gs, {
    key: z,
    id: f.id,
    ref: B,
    as: l,
    activatorEvent: d,
    adjustScale: n,
    className: a,
    transition: i,
    rect: W,
    style: {
      zIndex: u,
      ...o
    },
    transform: T
  }, t) : null));
});
function gr(e, n, t) {
  const r = e.slice();
  return r.splice(t < 0 ? r.length + t : t, 0, r.splice(n, 1)[0]), r;
}
function Ys(e, n) {
  return e.reduce((t, r, o) => {
    const i = n.get(r);
    return i && (t[o] = i), t;
  }, Array(e.length));
}
function dn(e) {
  return e !== null && e >= 0;
}
function Js(e, n) {
  if (e === n)
    return !0;
  if (e.length !== n.length)
    return !1;
  for (let t = 0; t < e.length; t++)
    if (e[t] !== n[t])
      return !1;
  return !0;
}
function Zs(e) {
  return typeof e == "boolean" ? {
    draggable: e,
    droppable: e
  } : e;
}
const Ro = (e) => {
  let {
    rects: n,
    activeIndex: t,
    overIndex: r,
    index: o
  } = e;
  const i = gr(n, r, t), s = n[o], l = i[o];
  return !l || !s ? null : {
    x: l.left - s.left,
    y: l.top - s.top,
    scaleX: l.width / s.width,
    scaleY: l.height / s.height
  };
}, gn = {
  scaleX: 1,
  scaleY: 1
}, Qs = (e) => {
  var n;
  let {
    activeIndex: t,
    activeNodeRect: r,
    index: o,
    rects: i,
    overIndex: s
  } = e;
  const l = (n = i[t]) != null ? n : r;
  if (!l)
    return null;
  if (o === t) {
    const u = i[s];
    return u ? {
      x: 0,
      y: t < s ? u.top + u.height - (l.top + l.height) : u.top - l.top,
      ...gn
    } : null;
  }
  const a = el(i, o, t);
  return o > t && o <= s ? {
    x: 0,
    y: -l.height - a,
    ...gn
  } : o < t && o >= s ? {
    x: 0,
    y: l.height + a,
    ...gn
  } : {
    x: 0,
    y: 0,
    ...gn
  };
};
function el(e, n, t) {
  const r = e[n], o = e[n - 1], i = e[n + 1];
  return r ? t < n ? o ? r.top - (o.top + o.height) : i ? i.top - (r.top + r.height) : 0 : i ? i.top - (r.top + r.height) : o ? r.top - (o.top + o.height) : 0 : 0;
}
const bo = "Sortable", Do = /* @__PURE__ */ te.createContext({
  activeIndex: -1,
  containerId: bo,
  disableTransforms: !1,
  items: [],
  overIndex: -1,
  useDragOverlay: !1,
  sortedRects: [],
  strategy: Ro,
  disabled: {
    draggable: !1,
    droppable: !1
  }
});
function tl(e) {
  let {
    children: n,
    id: t,
    items: r,
    strategy: o = Ro,
    disabled: i = !1
  } = e;
  const {
    active: s,
    dragOverlay: l,
    droppableRects: a,
    over: u,
    measureDroppableContainers: d
  } = yo(), f = Zt(bo, t), c = l.rect !== null, g = X(() => r.map((_) => typeof _ == "object" && "id" in _ ? _.id : _), [r]), h = s != null, x = s ? g.indexOf(s.id) : -1, w = u ? g.indexOf(u.id) : -1, S = J(g), R = !Js(g, S.current), I = w !== -1 && x === -1 || R, F = Zs(i);
  qe(() => {
    R && h && d(g);
  }, [R, g, h, d]), Y(() => {
    S.current = g;
  }, [g]);
  const $ = X(
    () => ({
      activeIndex: x,
      containerId: f,
      disabled: F,
      disableTransforms: I,
      items: g,
      overIndex: w,
      useDragOverlay: c,
      sortedRects: Ys(g, a),
      strategy: o
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [x, f, F.draggable, F.droppable, I, g, w, a, c, o]
  );
  return te.createElement(Do.Provider, {
    value: $
  }, n);
}
const nl = (e) => {
  let {
    id: n,
    items: t,
    activeIndex: r,
    overIndex: o
  } = e;
  return gr(t, r, o).indexOf(n);
}, rl = (e) => {
  let {
    containerId: n,
    isSorting: t,
    wasDragging: r,
    index: o,
    items: i,
    newIndex: s,
    previousItems: l,
    previousContainerId: a,
    transition: u
  } = e;
  return !u || !r || l !== i && o === s ? !1 : t ? !0 : s !== o && n === a;
}, ol = {
  duration: 200,
  easing: "ease"
}, Io = "transform", il = /* @__PURE__ */ ft.Transition.toString({
  property: Io,
  duration: 0,
  easing: "linear"
}), sl = {
  roleDescription: "sortable"
};
function ll(e) {
  let {
    disabled: n,
    index: t,
    node: r,
    rect: o
  } = e;
  const [i, s] = De(null), l = J(t);
  return qe(() => {
    if (!n && t !== l.current && r.current) {
      const a = o.current;
      if (a) {
        const u = jt(r.current, {
          ignoreTransform: !0
        }), d = {
          x: a.left - u.left,
          y: a.top - u.top,
          scaleX: a.width / u.width,
          scaleY: a.height / u.height
        };
        (d.x || d.y) && s(d);
      }
    }
    t !== l.current && (l.current = t);
  }, [n, t, r, o]), Y(() => {
    i && s(null);
  }, [i]), i;
}
function al(e) {
  let {
    animateLayoutChanges: n = rl,
    attributes: t,
    disabled: r,
    data: o,
    getNewIndex: i = nl,
    id: s,
    strategy: l,
    resizeObserverConfig: a,
    transition: u = ol
  } = e;
  const {
    items: d,
    containerId: f,
    activeIndex: c,
    disabled: g,
    disableTransforms: h,
    sortedRects: x,
    overIndex: w,
    useDragOverlay: S,
    strategy: R
  } = gt(Do), I = ul(r, g), F = d.indexOf(s), $ = X(() => ({
    sortable: {
      containerId: f,
      index: F,
      items: d
    },
    ...o
  }), [f, o, F, d]), _ = X(() => d.slice(d.indexOf(s)), [d, s]), {
    rect: z,
    node: T,
    isOver: W,
    setNodeRef: Z
  } = As({
    id: s,
    data: $,
    disabled: I.droppable,
    resizeObserverConfig: {
      updateMeasurementsFor: _,
      ...a
    }
  }), {
    active: B,
    activatorEvent: Ne,
    activeNodeRect: Pe,
    attributes: ae,
    setNodeRef: Qe,
    listeners: ie,
    isDragging: he,
    over: St,
    setActivatorNodeRef: me,
    transform: Ee
  } = Vs({
    id: s,
    data: $,
    attributes: {
      ...sl,
      ...t
    },
    disabled: I.draggable
  }), Ct = wi(Z, Qe), ne = !!B, se = ne && !h && dn(c) && dn(w), et = !S && he, tt = et && se ? Ee : null, ht = se ? tt ?? (l ?? R)({
    rects: x,
    activeNodeRect: Pe,
    activeIndex: c,
    overIndex: w,
    index: F
  }) : null, He = dn(c) && dn(w) ? i({
    id: s,
    items: d,
    activeIndex: c,
    overIndex: w
  }) : F, Oe = B == null ? void 0 : B.id, M = J({
    activeId: Oe,
    items: d,
    newIndex: He,
    containerId: f
  }), ot = d !== M.current.items, k = n({
    active: B,
    containerId: f,
    isDragging: he,
    isSorting: ne,
    id: s,
    index: F,
    items: d,
    newIndex: M.current.newIndex,
    previousItems: M.current.items,
    previousContainerId: M.current.containerId,
    transition: u,
    wasDragging: M.current.activeId != null
  }), Q = ll({
    disabled: !k,
    index: F,
    node: T,
    rect: z
  });
  return Y(() => {
    ne && M.current.newIndex !== He && (M.current.newIndex = He), f !== M.current.containerId && (M.current.containerId = f), d !== M.current.items && (M.current.items = d);
  }, [ne, He, f, d]), Y(() => {
    if (Oe === M.current.activeId)
      return;
    if (Oe && !M.current.activeId) {
      M.current.activeId = Oe;
      return;
    }
    const $e = setTimeout(() => {
      M.current.activeId = Oe;
    }, 50);
    return () => clearTimeout($e);
  }, [Oe]), {
    active: B,
    activeIndex: c,
    attributes: ae,
    data: $,
    rect: z,
    index: F,
    newIndex: He,
    items: d,
    isOver: W,
    isSorting: ne,
    isDragging: he,
    listeners: ie,
    node: T,
    overIndex: w,
    over: St,
    setNodeRef: Ct,
    setActivatorNodeRef: me,
    setDroppableNodeRef: Z,
    setDraggableNodeRef: Qe,
    transform: Q ?? ht,
    transition: _e()
  };
  function _e() {
    if (
      // Temporarily disable transitions for a single frame to set up derived transforms
      Q || // Or to prevent items jumping to back to their "new" position when items change
      ot && M.current.newIndex === F
    )
      return il;
    if (!(et && !En(Ne) || !u) && (ne || k))
      return ft.Transition.toString({
        ...u,
        property: Io
      });
  }
}
function ul(e, n) {
  var t, r;
  return typeof e == "boolean" ? {
    draggable: e,
    // Backwards compatibility
    droppable: !1
  } : {
    draggable: (t = e == null ? void 0 : e.draggable) != null ? t : n.draggable,
    droppable: (r = e == null ? void 0 : e.droppable) != null ? r : n.droppable
  };
}
function bn(e) {
  if (!e)
    return !1;
  const n = e.data.current;
  return !!(n && "sortable" in n && typeof n.sortable == "object" && "containerId" in n.sortable && "items" in n.sortable && "index" in n.sortable);
}
const cl = [L.Down, L.Right, L.Up, L.Left], dl = (e, n) => {
  let {
    context: {
      active: t,
      collisionRect: r,
      droppableRects: o,
      droppableContainers: i,
      over: s,
      scrollableAncestors: l
    }
  } = n;
  if (cl.includes(e.code)) {
    if (e.preventDefault(), !t || !r)
      return;
    const a = [];
    i.getEnabled().forEach((f) => {
      if (!f || f != null && f.disabled)
        return;
      const c = o.get(f.id);
      if (c)
        switch (e.code) {
          case L.Down:
            r.top < c.top && a.push(f);
            break;
          case L.Up:
            r.top > c.top && a.push(f);
            break;
          case L.Left:
            r.left > c.left && a.push(f);
            break;
          case L.Right:
            r.left < c.left && a.push(f);
            break;
        }
    });
    const u = Ai({
      collisionRect: r,
      droppableRects: o,
      droppableContainers: a
    });
    let d = io(u, "id");
    if (d === (s == null ? void 0 : s.id) && u.length > 1 && (d = u[1].id), d != null) {
      const f = i.get(t.id), c = i.get(d), g = c ? o.get(c.id) : null, h = c == null ? void 0 : c.node.current;
      if (h && g && f && c) {
        const w = _n(h).some((_, z) => l[z] !== _), S = Eo(f, c), R = gl(f, c), I = w || !S ? {
          x: 0,
          y: 0
        } : {
          x: R ? r.width - g.width : 0,
          y: R ? r.height - g.height : 0
        }, F = {
          x: g.left,
          y: g.top
        };
        return I.x && I.y ? F : Kt(F, I);
      }
    }
  }
};
function Eo(e, n) {
  return !bn(e) || !bn(n) ? !1 : e.data.current.sortable.containerId === n.data.current.sortable.containerId;
}
function gl(e, n) {
  return !bn(e) || !bn(n) || !Eo(e, n) ? !1 : e.data.current.sortable.index < n.data.current.sortable.index;
}
/**
   * table-core
   *
   * Copyright (c) TanStack
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */
function dt(e, n) {
  return typeof e == "function" ? e(n) : e;
}
function Ve(e, n) {
  return (t) => {
    n.setState((r) => ({
      ...r,
      [e]: dt(t, r[e])
    }));
  };
}
function Nn(e) {
  return e instanceof Function;
}
function fl(e) {
  return Array.isArray(e) && e.every((n) => typeof n == "number");
}
function pl(e, n) {
  const t = [], r = (o) => {
    o.forEach((i) => {
      t.push(i);
      const s = n(i);
      s != null && s.length && r(s);
    });
  };
  return r(e), t;
}
function N(e, n, t) {
  let r = [], o;
  return (i) => {
    let s;
    t.key && t.debug && (s = Date.now());
    const l = e(i);
    if (!(l.length !== r.length || l.some((d, f) => r[f] !== d)))
      return o;
    r = l;
    let u;
    if (t.key && t.debug && (u = Date.now()), o = n(...l), t == null || t.onChange == null || t.onChange(o), t.key && t.debug && t != null && t.debug()) {
      const d = Math.round((Date.now() - s) * 100) / 100, f = Math.round((Date.now() - u) * 100) / 100, c = f / 16, g = (h, x) => {
        for (h = String(h); h.length < x; )
          h = " " + h;
        return h;
      };
      console.info(`%c⏱ ${g(f, 5)} /${g(d, 5)} ms`, `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0, Math.min(120 - 120 * c, 120))}deg 100% 31%);`, t == null ? void 0 : t.key);
    }
    return o;
  };
}
function P(e, n, t, r) {
  return {
    debug: () => {
      var o;
      return (o = e == null ? void 0 : e.debugAll) != null ? o : e[n];
    },
    key: process.env.NODE_ENV === "development" && t,
    onChange: r
  };
}
function hl(e, n, t, r) {
  const o = () => {
    var s;
    return (s = i.getValue()) != null ? s : e.options.renderFallbackValue;
  }, i = {
    id: `${n.id}_${t.id}`,
    row: n,
    column: t,
    getValue: () => n.getValue(r),
    renderValue: o,
    getContext: N(() => [e, t, n, i], (s, l, a, u) => ({
      table: s,
      column: l,
      row: a,
      cell: u,
      getValue: u.getValue,
      renderValue: u.renderValue
    }), P(e.options, "debugCells", "cell.getContext"))
  };
  return e._features.forEach((s) => {
    s.createCell == null || s.createCell(i, t, n, e);
  }, {}), i;
}
function ml(e, n, t, r) {
  var o, i;
  const l = {
    ...e._getDefaultColumnDef(),
    ...n
  }, a = l.accessorKey;
  let u = (o = (i = l.id) != null ? i : a ? typeof String.prototype.replaceAll == "function" ? a.replaceAll(".", "_") : a.replace(/\./g, "_") : void 0) != null ? o : typeof l.header == "string" ? l.header : void 0, d;
  if (l.accessorFn ? d = l.accessorFn : a && (a.includes(".") ? d = (c) => {
    let g = c;
    for (const x of a.split(".")) {
      var h;
      g = (h = g) == null ? void 0 : h[x], process.env.NODE_ENV !== "production" && g === void 0 && console.warn(`"${x}" in deeply nested key "${a}" returned undefined.`);
    }
    return g;
  } : d = (c) => c[l.accessorKey]), !u)
    throw process.env.NODE_ENV !== "production" ? new Error(l.accessorFn ? "Columns require an id when using an accessorFn" : "Columns require an id when using a non-string header") : new Error();
  let f = {
    id: `${String(u)}`,
    accessorFn: d,
    parent: r,
    depth: t,
    columnDef: l,
    columns: [],
    getFlatColumns: N(() => [!0], () => {
      var c;
      return [f, ...(c = f.columns) == null ? void 0 : c.flatMap((g) => g.getFlatColumns())];
    }, P(e.options, "debugColumns", "column.getFlatColumns")),
    getLeafColumns: N(() => [e._getOrderColumnsFn()], (c) => {
      var g;
      if ((g = f.columns) != null && g.length) {
        let h = f.columns.flatMap((x) => x.getLeafColumns());
        return c(h);
      }
      return [f];
    }, P(e.options, "debugColumns", "column.getLeafColumns"))
  };
  for (const c of e._features)
    c.createColumn == null || c.createColumn(f, e);
  return f;
}
const fe = "debugHeaders";
function Wr(e, n, t) {
  var r;
  let i = {
    id: (r = t.id) != null ? r : n.id,
    column: n,
    index: t.index,
    isPlaceholder: !!t.isPlaceholder,
    placeholderId: t.placeholderId,
    depth: t.depth,
    subHeaders: [],
    colSpan: 0,
    rowSpan: 0,
    headerGroup: null,
    getLeafHeaders: () => {
      const s = [], l = (a) => {
        a.subHeaders && a.subHeaders.length && a.subHeaders.map(l), s.push(a);
      };
      return l(i), s;
    },
    getContext: () => ({
      table: e,
      header: i,
      column: n
    })
  };
  return e._features.forEach((s) => {
    s.createHeader == null || s.createHeader(i, e);
  }), i;
}
const vl = {
  createTable: (e) => {
    e.getHeaderGroups = N(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (n, t, r, o) => {
      var i, s;
      const l = (i = r == null ? void 0 : r.map((f) => t.find((c) => c.id === f)).filter(Boolean)) != null ? i : [], a = (s = o == null ? void 0 : o.map((f) => t.find((c) => c.id === f)).filter(Boolean)) != null ? s : [], u = t.filter((f) => !(r != null && r.includes(f.id)) && !(o != null && o.includes(f.id)));
      return fn(n, [...l, ...u, ...a], e);
    }, P(e.options, fe, "getHeaderGroups")), e.getCenterHeaderGroups = N(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (n, t, r, o) => (t = t.filter((i) => !(r != null && r.includes(i.id)) && !(o != null && o.includes(i.id))), fn(n, t, e, "center")), P(e.options, fe, "getCenterHeaderGroups")), e.getLeftHeaderGroups = N(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left], (n, t, r) => {
      var o;
      const i = (o = r == null ? void 0 : r.map((s) => t.find((l) => l.id === s)).filter(Boolean)) != null ? o : [];
      return fn(n, i, e, "left");
    }, P(e.options, fe, "getLeftHeaderGroups")), e.getRightHeaderGroups = N(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.right], (n, t, r) => {
      var o;
      const i = (o = r == null ? void 0 : r.map((s) => t.find((l) => l.id === s)).filter(Boolean)) != null ? o : [];
      return fn(n, i, e, "right");
    }, P(e.options, fe, "getRightHeaderGroups")), e.getFooterGroups = N(() => [e.getHeaderGroups()], (n) => [...n].reverse(), P(e.options, fe, "getFooterGroups")), e.getLeftFooterGroups = N(() => [e.getLeftHeaderGroups()], (n) => [...n].reverse(), P(e.options, fe, "getLeftFooterGroups")), e.getCenterFooterGroups = N(() => [e.getCenterHeaderGroups()], (n) => [...n].reverse(), P(e.options, fe, "getCenterFooterGroups")), e.getRightFooterGroups = N(() => [e.getRightHeaderGroups()], (n) => [...n].reverse(), P(e.options, fe, "getRightFooterGroups")), e.getFlatHeaders = N(() => [e.getHeaderGroups()], (n) => n.map((t) => t.headers).flat(), P(e.options, fe, "getFlatHeaders")), e.getLeftFlatHeaders = N(() => [e.getLeftHeaderGroups()], (n) => n.map((t) => t.headers).flat(), P(e.options, fe, "getLeftFlatHeaders")), e.getCenterFlatHeaders = N(() => [e.getCenterHeaderGroups()], (n) => n.map((t) => t.headers).flat(), P(e.options, fe, "getCenterFlatHeaders")), e.getRightFlatHeaders = N(() => [e.getRightHeaderGroups()], (n) => n.map((t) => t.headers).flat(), P(e.options, fe, "getRightFlatHeaders")), e.getCenterLeafHeaders = N(() => [e.getCenterFlatHeaders()], (n) => n.filter((t) => {
      var r;
      return !((r = t.subHeaders) != null && r.length);
    }), P(e.options, fe, "getCenterLeafHeaders")), e.getLeftLeafHeaders = N(() => [e.getLeftFlatHeaders()], (n) => n.filter((t) => {
      var r;
      return !((r = t.subHeaders) != null && r.length);
    }), P(e.options, fe, "getLeftLeafHeaders")), e.getRightLeafHeaders = N(() => [e.getRightFlatHeaders()], (n) => n.filter((t) => {
      var r;
      return !((r = t.subHeaders) != null && r.length);
    }), P(e.options, fe, "getRightLeafHeaders")), e.getLeafHeaders = N(() => [e.getLeftHeaderGroups(), e.getCenterHeaderGroups(), e.getRightHeaderGroups()], (n, t, r) => {
      var o, i, s, l, a, u;
      return [...(o = (i = n[0]) == null ? void 0 : i.headers) != null ? o : [], ...(s = (l = t[0]) == null ? void 0 : l.headers) != null ? s : [], ...(a = (u = r[0]) == null ? void 0 : u.headers) != null ? a : []].map((d) => d.getLeafHeaders()).flat();
    }, P(e.options, fe, "getLeafHeaders"));
  }
};
function fn(e, n, t, r) {
  var o, i;
  let s = 0;
  const l = function(c, g) {
    g === void 0 && (g = 1), s = Math.max(s, g), c.filter((h) => h.getIsVisible()).forEach((h) => {
      var x;
      (x = h.columns) != null && x.length && l(h.columns, g + 1);
    }, 0);
  };
  l(e);
  let a = [];
  const u = (c, g) => {
    const h = {
      depth: g,
      id: [r, `${g}`].filter(Boolean).join("_"),
      headers: []
    }, x = [];
    c.forEach((w) => {
      const S = [...x].reverse()[0], R = w.column.depth === h.depth;
      let I, F = !1;
      if (R && w.column.parent ? I = w.column.parent : (I = w.column, F = !0), S && (S == null ? void 0 : S.column) === I)
        S.subHeaders.push(w);
      else {
        const $ = Wr(t, I, {
          id: [r, g, I.id, w == null ? void 0 : w.id].filter(Boolean).join("_"),
          isPlaceholder: F,
          placeholderId: F ? `${x.filter((_) => _.column === I).length}` : void 0,
          depth: g,
          index: x.length
        });
        $.subHeaders.push(w), x.push($);
      }
      h.headers.push(w), w.headerGroup = h;
    }), a.push(h), g > 0 && u(x, g - 1);
  }, d = n.map((c, g) => Wr(t, c, {
    depth: s,
    index: g
  }));
  u(d, s - 1), a.reverse();
  const f = (c) => c.filter((h) => h.column.getIsVisible()).map((h) => {
    let x = 0, w = 0, S = [0];
    h.subHeaders && h.subHeaders.length ? (S = [], f(h.subHeaders).forEach((I) => {
      let {
        colSpan: F,
        rowSpan: $
      } = I;
      x += F, S.push($);
    })) : x = 1;
    const R = Math.min(...S);
    return w = w + R, h.colSpan = x, h.rowSpan = w, {
      colSpan: x,
      rowSpan: w
    };
  });
  return f((o = (i = a[0]) == null ? void 0 : i.headers) != null ? o : []), a;
}
const xl = (e, n, t, r, o, i, s) => {
  let l = {
    id: n,
    index: r,
    original: t,
    depth: o,
    parentId: s,
    _valuesCache: {},
    _uniqueValuesCache: {},
    getValue: (a) => {
      if (l._valuesCache.hasOwnProperty(a))
        return l._valuesCache[a];
      const u = e.getColumn(a);
      if (u != null && u.accessorFn)
        return l._valuesCache[a] = u.accessorFn(l.original, r), l._valuesCache[a];
    },
    getUniqueValues: (a) => {
      if (l._uniqueValuesCache.hasOwnProperty(a))
        return l._uniqueValuesCache[a];
      const u = e.getColumn(a);
      if (u != null && u.accessorFn)
        return u.columnDef.getUniqueValues ? (l._uniqueValuesCache[a] = u.columnDef.getUniqueValues(l.original, r), l._uniqueValuesCache[a]) : (l._uniqueValuesCache[a] = [l.getValue(a)], l._uniqueValuesCache[a]);
    },
    renderValue: (a) => {
      var u;
      return (u = l.getValue(a)) != null ? u : e.options.renderFallbackValue;
    },
    subRows: [],
    getLeafRows: () => pl(l.subRows, (a) => a.subRows),
    getParentRow: () => l.parentId ? e.getRow(l.parentId, !0) : void 0,
    getParentRows: () => {
      let a = [], u = l;
      for (; ; ) {
        const d = u.getParentRow();
        if (!d) break;
        a.push(d), u = d;
      }
      return a.reverse();
    },
    getAllCells: N(() => [e.getAllLeafColumns()], (a) => a.map((u) => hl(e, l, u, u.id)), P(e.options, "debugRows", "getAllCells")),
    _getAllCellsByColumnId: N(() => [l.getAllCells()], (a) => a.reduce((u, d) => (u[d.column.id] = d, u), {}), P(e.options, "debugRows", "getAllCellsByColumnId"))
  };
  for (let a = 0; a < e._features.length; a++) {
    const u = e._features[a];
    u == null || u.createRow == null || u.createRow(l, e);
  }
  return l;
}, wl = {
  createColumn: (e, n) => {
    e._getFacetedRowModel = n.options.getFacetedRowModel && n.options.getFacetedRowModel(n, e.id), e.getFacetedRowModel = () => e._getFacetedRowModel ? e._getFacetedRowModel() : n.getPreFilteredRowModel(), e._getFacetedUniqueValues = n.options.getFacetedUniqueValues && n.options.getFacetedUniqueValues(n, e.id), e.getFacetedUniqueValues = () => e._getFacetedUniqueValues ? e._getFacetedUniqueValues() : /* @__PURE__ */ new Map(), e._getFacetedMinMaxValues = n.options.getFacetedMinMaxValues && n.options.getFacetedMinMaxValues(n, e.id), e.getFacetedMinMaxValues = () => {
      if (e._getFacetedMinMaxValues)
        return e._getFacetedMinMaxValues();
    };
  }
}, _o = (e, n, t) => {
  var r, o;
  const i = t == null || (r = t.toString()) == null ? void 0 : r.toLowerCase();
  return !!(!((o = e.getValue(n)) == null || (o = o.toString()) == null || (o = o.toLowerCase()) == null) && o.includes(i));
};
_o.autoRemove = (e) => Be(e);
const Mo = (e, n, t) => {
  var r;
  return !!(!((r = e.getValue(n)) == null || (r = r.toString()) == null) && r.includes(t));
};
Mo.autoRemove = (e) => Be(e);
const Fo = (e, n, t) => {
  var r;
  return ((r = e.getValue(n)) == null || (r = r.toString()) == null ? void 0 : r.toLowerCase()) === (t == null ? void 0 : t.toLowerCase());
};
Fo.autoRemove = (e) => Be(e);
const No = (e, n, t) => {
  var r;
  return (r = e.getValue(n)) == null ? void 0 : r.includes(t);
};
No.autoRemove = (e) => Be(e);
const Po = (e, n, t) => !t.some((r) => {
  var o;
  return !((o = e.getValue(n)) != null && o.includes(r));
});
Po.autoRemove = (e) => Be(e) || !(e != null && e.length);
const $o = (e, n, t) => t.some((r) => {
  var o;
  return (o = e.getValue(n)) == null ? void 0 : o.includes(r);
});
$o.autoRemove = (e) => Be(e) || !(e != null && e.length);
const Vo = (e, n, t) => e.getValue(n) === t;
Vo.autoRemove = (e) => Be(e);
const Oo = (e, n, t) => e.getValue(n) == t;
Oo.autoRemove = (e) => Be(e);
const fr = (e, n, t) => {
  let [r, o] = t;
  const i = e.getValue(n);
  return i >= r && i <= o;
};
fr.resolveFilterValue = (e) => {
  let [n, t] = e, r = typeof n != "number" ? parseFloat(n) : n, o = typeof t != "number" ? parseFloat(t) : t, i = n === null || Number.isNaN(r) ? -1 / 0 : r, s = t === null || Number.isNaN(o) ? 1 / 0 : o;
  if (i > s) {
    const l = i;
    i = s, s = l;
  }
  return [i, s];
};
fr.autoRemove = (e) => Be(e) || Be(e[0]) && Be(e[1]);
const rt = {
  includesString: _o,
  includesStringSensitive: Mo,
  equalsString: Fo,
  arrIncludes: No,
  arrIncludesAll: Po,
  arrIncludesSome: $o,
  equals: Vo,
  weakEquals: Oo,
  inNumberRange: fr
};
function Be(e) {
  return e == null || e === "";
}
const Sl = {
  getDefaultColumnDef: () => ({
    filterFn: "auto"
  }),
  getInitialState: (e) => ({
    columnFilters: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnFiltersChange: Ve("columnFilters", e),
    filterFromLeafRows: !1,
    maxLeafRowFilterDepth: 100
  }),
  createColumn: (e, n) => {
    e.getAutoFilterFn = () => {
      const t = n.getCoreRowModel().flatRows[0], r = t == null ? void 0 : t.getValue(e.id);
      return typeof r == "string" ? rt.includesString : typeof r == "number" ? rt.inNumberRange : typeof r == "boolean" || r !== null && typeof r == "object" ? rt.equals : Array.isArray(r) ? rt.arrIncludes : rt.weakEquals;
    }, e.getFilterFn = () => {
      var t, r;
      return Nn(e.columnDef.filterFn) ? e.columnDef.filterFn : e.columnDef.filterFn === "auto" ? e.getAutoFilterFn() : (
        // @ts-ignore
        (t = (r = n.options.filterFns) == null ? void 0 : r[e.columnDef.filterFn]) != null ? t : rt[e.columnDef.filterFn]
      );
    }, e.getCanFilter = () => {
      var t, r, o;
      return ((t = e.columnDef.enableColumnFilter) != null ? t : !0) && ((r = n.options.enableColumnFilters) != null ? r : !0) && ((o = n.options.enableFilters) != null ? o : !0) && !!e.accessorFn;
    }, e.getIsFiltered = () => e.getFilterIndex() > -1, e.getFilterValue = () => {
      var t;
      return (t = n.getState().columnFilters) == null || (t = t.find((r) => r.id === e.id)) == null ? void 0 : t.value;
    }, e.getFilterIndex = () => {
      var t, r;
      return (t = (r = n.getState().columnFilters) == null ? void 0 : r.findIndex((o) => o.id === e.id)) != null ? t : -1;
    }, e.setFilterValue = (t) => {
      n.setColumnFilters((r) => {
        const o = e.getFilterFn(), i = r == null ? void 0 : r.find((d) => d.id === e.id), s = dt(t, i ? i.value : void 0);
        if (Xr(o, s, e)) {
          var l;
          return (l = r == null ? void 0 : r.filter((d) => d.id !== e.id)) != null ? l : [];
        }
        const a = {
          id: e.id,
          value: s
        };
        if (i) {
          var u;
          return (u = r == null ? void 0 : r.map((d) => d.id === e.id ? a : d)) != null ? u : [];
        }
        return r != null && r.length ? [...r, a] : [a];
      });
    };
  },
  createRow: (e, n) => {
    e.columnFilters = {}, e.columnFiltersMeta = {};
  },
  createTable: (e) => {
    e.setColumnFilters = (n) => {
      const t = e.getAllLeafColumns(), r = (o) => {
        var i;
        return (i = dt(n, o)) == null ? void 0 : i.filter((s) => {
          const l = t.find((a) => a.id === s.id);
          if (l) {
            const a = l.getFilterFn();
            if (Xr(a, s.value, l))
              return !1;
          }
          return !0;
        });
      };
      e.options.onColumnFiltersChange == null || e.options.onColumnFiltersChange(r);
    }, e.resetColumnFilters = (n) => {
      var t, r;
      e.setColumnFilters(n ? [] : (t = (r = e.initialState) == null ? void 0 : r.columnFilters) != null ? t : []);
    }, e.getPreFilteredRowModel = () => e.getCoreRowModel(), e.getFilteredRowModel = () => (!e._getFilteredRowModel && e.options.getFilteredRowModel && (e._getFilteredRowModel = e.options.getFilteredRowModel(e)), e.options.manualFiltering || !e._getFilteredRowModel ? e.getPreFilteredRowModel() : e._getFilteredRowModel());
  }
};
function Xr(e, n, t) {
  return (e && e.autoRemove ? e.autoRemove(n, t) : !1) || typeof n > "u" || typeof n == "string" && !n;
}
const Cl = (e, n, t) => t.reduce((r, o) => {
  const i = o.getValue(e);
  return r + (typeof i == "number" ? i : 0);
}, 0), yl = (e, n, t) => {
  let r;
  return t.forEach((o) => {
    const i = o.getValue(e);
    i != null && (r > i || r === void 0 && i >= i) && (r = i);
  }), r;
}, Rl = (e, n, t) => {
  let r;
  return t.forEach((o) => {
    const i = o.getValue(e);
    i != null && (r < i || r === void 0 && i >= i) && (r = i);
  }), r;
}, bl = (e, n, t) => {
  let r, o;
  return t.forEach((i) => {
    const s = i.getValue(e);
    s != null && (r === void 0 ? s >= s && (r = o = s) : (r > s && (r = s), o < s && (o = s)));
  }), [r, o];
}, Dl = (e, n) => {
  let t = 0, r = 0;
  if (n.forEach((o) => {
    let i = o.getValue(e);
    i != null && (i = +i) >= i && (++t, r += i);
  }), t) return r / t;
}, Il = (e, n) => {
  if (!n.length)
    return;
  const t = n.map((i) => i.getValue(e));
  if (!fl(t))
    return;
  if (t.length === 1)
    return t[0];
  const r = Math.floor(t.length / 2), o = t.sort((i, s) => i - s);
  return t.length % 2 !== 0 ? o[r] : (o[r - 1] + o[r]) / 2;
}, El = (e, n) => Array.from(new Set(n.map((t) => t.getValue(e))).values()), _l = (e, n) => new Set(n.map((t) => t.getValue(e))).size, Ml = (e, n) => n.length, Bn = {
  sum: Cl,
  min: yl,
  max: Rl,
  extent: bl,
  mean: Dl,
  median: Il,
  unique: El,
  uniqueCount: _l,
  count: Ml
}, Fl = {
  getDefaultColumnDef: () => ({
    aggregatedCell: (e) => {
      var n, t;
      return (n = (t = e.getValue()) == null || t.toString == null ? void 0 : t.toString()) != null ? n : null;
    },
    aggregationFn: "auto"
  }),
  getInitialState: (e) => ({
    grouping: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onGroupingChange: Ve("grouping", e),
    groupedColumnMode: "reorder"
  }),
  createColumn: (e, n) => {
    e.toggleGrouping = () => {
      n.setGrouping((t) => t != null && t.includes(e.id) ? t.filter((r) => r !== e.id) : [...t ?? [], e.id]);
    }, e.getCanGroup = () => {
      var t, r;
      return ((t = e.columnDef.enableGrouping) != null ? t : !0) && ((r = n.options.enableGrouping) != null ? r : !0) && (!!e.accessorFn || !!e.columnDef.getGroupingValue);
    }, e.getIsGrouped = () => {
      var t;
      return (t = n.getState().grouping) == null ? void 0 : t.includes(e.id);
    }, e.getGroupedIndex = () => {
      var t;
      return (t = n.getState().grouping) == null ? void 0 : t.indexOf(e.id);
    }, e.getToggleGroupingHandler = () => {
      const t = e.getCanGroup();
      return () => {
        t && e.toggleGrouping();
      };
    }, e.getAutoAggregationFn = () => {
      const t = n.getCoreRowModel().flatRows[0], r = t == null ? void 0 : t.getValue(e.id);
      if (typeof r == "number")
        return Bn.sum;
      if (Object.prototype.toString.call(r) === "[object Date]")
        return Bn.extent;
    }, e.getAggregationFn = () => {
      var t, r;
      if (!e)
        throw new Error();
      return Nn(e.columnDef.aggregationFn) ? e.columnDef.aggregationFn : e.columnDef.aggregationFn === "auto" ? e.getAutoAggregationFn() : (t = (r = n.options.aggregationFns) == null ? void 0 : r[e.columnDef.aggregationFn]) != null ? t : Bn[e.columnDef.aggregationFn];
    };
  },
  createTable: (e) => {
    e.setGrouping = (n) => e.options.onGroupingChange == null ? void 0 : e.options.onGroupingChange(n), e.resetGrouping = (n) => {
      var t, r;
      e.setGrouping(n ? [] : (t = (r = e.initialState) == null ? void 0 : r.grouping) != null ? t : []);
    }, e.getPreGroupedRowModel = () => e.getFilteredRowModel(), e.getGroupedRowModel = () => (!e._getGroupedRowModel && e.options.getGroupedRowModel && (e._getGroupedRowModel = e.options.getGroupedRowModel(e)), e.options.manualGrouping || !e._getGroupedRowModel ? e.getPreGroupedRowModel() : e._getGroupedRowModel());
  },
  createRow: (e, n) => {
    e.getIsGrouped = () => !!e.groupingColumnId, e.getGroupingValue = (t) => {
      if (e._groupingValuesCache.hasOwnProperty(t))
        return e._groupingValuesCache[t];
      const r = n.getColumn(t);
      return r != null && r.columnDef.getGroupingValue ? (e._groupingValuesCache[t] = r.columnDef.getGroupingValue(e.original), e._groupingValuesCache[t]) : e.getValue(t);
    }, e._groupingValuesCache = {};
  },
  createCell: (e, n, t, r) => {
    e.getIsGrouped = () => n.getIsGrouped() && n.id === t.groupingColumnId, e.getIsPlaceholder = () => !e.getIsGrouped() && n.getIsGrouped(), e.getIsAggregated = () => {
      var o;
      return !e.getIsGrouped() && !e.getIsPlaceholder() && !!((o = t.subRows) != null && o.length);
    };
  }
};
function Nl(e, n, t) {
  if (!(n != null && n.length) || !t)
    return e;
  const r = e.filter((i) => !n.includes(i.id));
  return t === "remove" ? r : [...n.map((i) => e.find((s) => s.id === i)).filter(Boolean), ...r];
}
const Pl = {
  getInitialState: (e) => ({
    columnOrder: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnOrderChange: Ve("columnOrder", e)
  }),
  createColumn: (e, n) => {
    e.getIndex = N((t) => [qt(n, t)], (t) => t.findIndex((r) => r.id === e.id), P(n.options, "debugColumns", "getIndex")), e.getIsFirstColumn = (t) => {
      var r;
      return ((r = qt(n, t)[0]) == null ? void 0 : r.id) === e.id;
    }, e.getIsLastColumn = (t) => {
      var r;
      const o = qt(n, t);
      return ((r = o[o.length - 1]) == null ? void 0 : r.id) === e.id;
    };
  },
  createTable: (e) => {
    e.setColumnOrder = (n) => e.options.onColumnOrderChange == null ? void 0 : e.options.onColumnOrderChange(n), e.resetColumnOrder = (n) => {
      var t;
      e.setColumnOrder(n ? [] : (t = e.initialState.columnOrder) != null ? t : []);
    }, e._getOrderColumnsFn = N(() => [e.getState().columnOrder, e.getState().grouping, e.options.groupedColumnMode], (n, t, r) => (o) => {
      let i = [];
      if (!(n != null && n.length))
        i = o;
      else {
        const s = [...n], l = [...o];
        for (; l.length && s.length; ) {
          const a = s.shift(), u = l.findIndex((d) => d.id === a);
          u > -1 && i.push(l.splice(u, 1)[0]);
        }
        i = [...i, ...l];
      }
      return Nl(i, t, r);
    }, P(e.options, "debugTable", "_getOrderColumnsFn"));
  }
}, qn = () => ({
  left: [],
  right: []
}), $l = {
  getInitialState: (e) => ({
    columnPinning: qn(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnPinningChange: Ve("columnPinning", e)
  }),
  createColumn: (e, n) => {
    e.pin = (t) => {
      const r = e.getLeafColumns().map((o) => o.id).filter(Boolean);
      n.setColumnPinning((o) => {
        var i, s;
        if (t === "right") {
          var l, a;
          return {
            left: ((l = o == null ? void 0 : o.left) != null ? l : []).filter((f) => !(r != null && r.includes(f))),
            right: [...((a = o == null ? void 0 : o.right) != null ? a : []).filter((f) => !(r != null && r.includes(f))), ...r]
          };
        }
        if (t === "left") {
          var u, d;
          return {
            left: [...((u = o == null ? void 0 : o.left) != null ? u : []).filter((f) => !(r != null && r.includes(f))), ...r],
            right: ((d = o == null ? void 0 : o.right) != null ? d : []).filter((f) => !(r != null && r.includes(f)))
          };
        }
        return {
          left: ((i = o == null ? void 0 : o.left) != null ? i : []).filter((f) => !(r != null && r.includes(f))),
          right: ((s = o == null ? void 0 : o.right) != null ? s : []).filter((f) => !(r != null && r.includes(f)))
        };
      });
    }, e.getCanPin = () => e.getLeafColumns().some((r) => {
      var o, i, s;
      return ((o = r.columnDef.enablePinning) != null ? o : !0) && ((i = (s = n.options.enableColumnPinning) != null ? s : n.options.enablePinning) != null ? i : !0);
    }), e.getIsPinned = () => {
      const t = e.getLeafColumns().map((l) => l.id), {
        left: r,
        right: o
      } = n.getState().columnPinning, i = t.some((l) => r == null ? void 0 : r.includes(l)), s = t.some((l) => o == null ? void 0 : o.includes(l));
      return i ? "left" : s ? "right" : !1;
    }, e.getPinnedIndex = () => {
      var t, r;
      const o = e.getIsPinned();
      return o ? (t = (r = n.getState().columnPinning) == null || (r = r[o]) == null ? void 0 : r.indexOf(e.id)) != null ? t : -1 : 0;
    };
  },
  createRow: (e, n) => {
    e.getCenterVisibleCells = N(() => [e._getAllVisibleCells(), n.getState().columnPinning.left, n.getState().columnPinning.right], (t, r, o) => {
      const i = [...r ?? [], ...o ?? []];
      return t.filter((s) => !i.includes(s.column.id));
    }, P(n.options, "debugRows", "getCenterVisibleCells")), e.getLeftVisibleCells = N(() => [e._getAllVisibleCells(), n.getState().columnPinning.left], (t, r) => (r ?? []).map((i) => t.find((s) => s.column.id === i)).filter(Boolean).map((i) => ({
      ...i,
      position: "left"
    })), P(n.options, "debugRows", "getLeftVisibleCells")), e.getRightVisibleCells = N(() => [e._getAllVisibleCells(), n.getState().columnPinning.right], (t, r) => (r ?? []).map((i) => t.find((s) => s.column.id === i)).filter(Boolean).map((i) => ({
      ...i,
      position: "right"
    })), P(n.options, "debugRows", "getRightVisibleCells"));
  },
  createTable: (e) => {
    e.setColumnPinning = (n) => e.options.onColumnPinningChange == null ? void 0 : e.options.onColumnPinningChange(n), e.resetColumnPinning = (n) => {
      var t, r;
      return e.setColumnPinning(n ? qn() : (t = (r = e.initialState) == null ? void 0 : r.columnPinning) != null ? t : qn());
    }, e.getIsSomeColumnsPinned = (n) => {
      var t;
      const r = e.getState().columnPinning;
      if (!n) {
        var o, i;
        return !!((o = r.left) != null && o.length || (i = r.right) != null && i.length);
      }
      return !!((t = r[n]) != null && t.length);
    }, e.getLeftLeafColumns = N(() => [e.getAllLeafColumns(), e.getState().columnPinning.left], (n, t) => (t ?? []).map((r) => n.find((o) => o.id === r)).filter(Boolean), P(e.options, "debugColumns", "getLeftLeafColumns")), e.getRightLeafColumns = N(() => [e.getAllLeafColumns(), e.getState().columnPinning.right], (n, t) => (t ?? []).map((r) => n.find((o) => o.id === r)).filter(Boolean), P(e.options, "debugColumns", "getRightLeafColumns")), e.getCenterLeafColumns = N(() => [e.getAllLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (n, t, r) => {
      const o = [...t ?? [], ...r ?? []];
      return n.filter((i) => !o.includes(i.id));
    }, P(e.options, "debugColumns", "getCenterLeafColumns"));
  }
};
function Vl(e) {
  return e || (typeof document < "u" ? document : null);
}
const pn = {
  size: 150,
  minSize: 20,
  maxSize: Number.MAX_SAFE_INTEGER
}, Un = () => ({
  startOffset: null,
  startSize: null,
  deltaOffset: null,
  deltaPercentage: null,
  isResizingColumn: !1,
  columnSizingStart: []
}), Ol = {
  getDefaultColumnDef: () => pn,
  getInitialState: (e) => ({
    columnSizing: {},
    columnSizingInfo: Un(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    columnResizeMode: "onEnd",
    columnResizeDirection: "ltr",
    onColumnSizingChange: Ve("columnSizing", e),
    onColumnSizingInfoChange: Ve("columnSizingInfo", e)
  }),
  createColumn: (e, n) => {
    e.getSize = () => {
      var t, r, o;
      const i = n.getState().columnSizing[e.id];
      return Math.min(Math.max((t = e.columnDef.minSize) != null ? t : pn.minSize, (r = i ?? e.columnDef.size) != null ? r : pn.size), (o = e.columnDef.maxSize) != null ? o : pn.maxSize);
    }, e.getStart = N((t) => [t, qt(n, t), n.getState().columnSizing], (t, r) => r.slice(0, e.getIndex(t)).reduce((o, i) => o + i.getSize(), 0), P(n.options, "debugColumns", "getStart")), e.getAfter = N((t) => [t, qt(n, t), n.getState().columnSizing], (t, r) => r.slice(e.getIndex(t) + 1).reduce((o, i) => o + i.getSize(), 0), P(n.options, "debugColumns", "getAfter")), e.resetSize = () => {
      n.setColumnSizing((t) => {
        let {
          [e.id]: r,
          ...o
        } = t;
        return o;
      });
    }, e.getCanResize = () => {
      var t, r;
      return ((t = e.columnDef.enableResizing) != null ? t : !0) && ((r = n.options.enableColumnResizing) != null ? r : !0);
    }, e.getIsResizing = () => n.getState().columnSizingInfo.isResizingColumn === e.id;
  },
  createHeader: (e, n) => {
    e.getSize = () => {
      let t = 0;
      const r = (o) => {
        if (o.subHeaders.length)
          o.subHeaders.forEach(r);
        else {
          var i;
          t += (i = o.column.getSize()) != null ? i : 0;
        }
      };
      return r(e), t;
    }, e.getStart = () => {
      if (e.index > 0) {
        const t = e.headerGroup.headers[e.index - 1];
        return t.getStart() + t.getSize();
      }
      return 0;
    }, e.getResizeHandler = (t) => {
      const r = n.getColumn(e.column.id), o = r == null ? void 0 : r.getCanResize();
      return (i) => {
        if (!r || !o || (i.persist == null || i.persist(), Kn(i) && i.touches && i.touches.length > 1))
          return;
        const s = e.getSize(), l = e ? e.getLeafHeaders().map((S) => [S.column.id, S.column.getSize()]) : [[r.id, r.getSize()]], a = Kn(i) ? Math.round(i.touches[0].clientX) : i.clientX, u = {}, d = (S, R) => {
          typeof R == "number" && (n.setColumnSizingInfo((I) => {
            var F, $;
            const _ = n.options.columnResizeDirection === "rtl" ? -1 : 1, z = (R - ((F = I == null ? void 0 : I.startOffset) != null ? F : 0)) * _, T = Math.max(z / (($ = I == null ? void 0 : I.startSize) != null ? $ : 0), -0.999999);
            return I.columnSizingStart.forEach((W) => {
              let [Z, B] = W;
              u[Z] = Math.round(Math.max(B + B * T, 0) * 100) / 100;
            }), {
              ...I,
              deltaOffset: z,
              deltaPercentage: T
            };
          }), (n.options.columnResizeMode === "onChange" || S === "end") && n.setColumnSizing((I) => ({
            ...I,
            ...u
          })));
        }, f = (S) => d("move", S), c = (S) => {
          d("end", S), n.setColumnSizingInfo((R) => ({
            ...R,
            isResizingColumn: !1,
            startOffset: null,
            startSize: null,
            deltaOffset: null,
            deltaPercentage: null,
            columnSizingStart: []
          }));
        }, g = Vl(t), h = {
          moveHandler: (S) => f(S.clientX),
          upHandler: (S) => {
            g == null || g.removeEventListener("mousemove", h.moveHandler), g == null || g.removeEventListener("mouseup", h.upHandler), c(S.clientX);
          }
        }, x = {
          moveHandler: (S) => (S.cancelable && (S.preventDefault(), S.stopPropagation()), f(S.touches[0].clientX), !1),
          upHandler: (S) => {
            var R;
            g == null || g.removeEventListener("touchmove", x.moveHandler), g == null || g.removeEventListener("touchend", x.upHandler), S.cancelable && (S.preventDefault(), S.stopPropagation()), c((R = S.touches[0]) == null ? void 0 : R.clientX);
          }
        }, w = jl() ? {
          passive: !1
        } : !1;
        Kn(i) ? (g == null || g.addEventListener("touchmove", x.moveHandler, w), g == null || g.addEventListener("touchend", x.upHandler, w)) : (g == null || g.addEventListener("mousemove", h.moveHandler, w), g == null || g.addEventListener("mouseup", h.upHandler, w)), n.setColumnSizingInfo((S) => ({
          ...S,
          startOffset: a,
          startSize: s,
          deltaOffset: 0,
          deltaPercentage: 0,
          columnSizingStart: l,
          isResizingColumn: r.id
        }));
      };
    };
  },
  createTable: (e) => {
    e.setColumnSizing = (n) => e.options.onColumnSizingChange == null ? void 0 : e.options.onColumnSizingChange(n), e.setColumnSizingInfo = (n) => e.options.onColumnSizingInfoChange == null ? void 0 : e.options.onColumnSizingInfoChange(n), e.resetColumnSizing = (n) => {
      var t;
      e.setColumnSizing(n ? {} : (t = e.initialState.columnSizing) != null ? t : {});
    }, e.resetHeaderSizeInfo = (n) => {
      var t;
      e.setColumnSizingInfo(n ? Un() : (t = e.initialState.columnSizingInfo) != null ? t : Un());
    }, e.getTotalSize = () => {
      var n, t;
      return (n = (t = e.getHeaderGroups()[0]) == null ? void 0 : t.headers.reduce((r, o) => r + o.getSize(), 0)) != null ? n : 0;
    }, e.getLeftTotalSize = () => {
      var n, t;
      return (n = (t = e.getLeftHeaderGroups()[0]) == null ? void 0 : t.headers.reduce((r, o) => r + o.getSize(), 0)) != null ? n : 0;
    }, e.getCenterTotalSize = () => {
      var n, t;
      return (n = (t = e.getCenterHeaderGroups()[0]) == null ? void 0 : t.headers.reduce((r, o) => r + o.getSize(), 0)) != null ? n : 0;
    }, e.getRightTotalSize = () => {
      var n, t;
      return (n = (t = e.getRightHeaderGroups()[0]) == null ? void 0 : t.headers.reduce((r, o) => r + o.getSize(), 0)) != null ? n : 0;
    };
  }
};
let hn = null;
function jl() {
  if (typeof hn == "boolean") return hn;
  let e = !1;
  try {
    const n = {
      get passive() {
        return e = !0, !1;
      }
    }, t = () => {
    };
    window.addEventListener("test", t, n), window.removeEventListener("test", t);
  } catch {
    e = !1;
  }
  return hn = e, hn;
}
function Kn(e) {
  return e.type === "touchstart";
}
const Al = {
  getInitialState: (e) => ({
    columnVisibility: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnVisibilityChange: Ve("columnVisibility", e)
  }),
  createColumn: (e, n) => {
    e.toggleVisibility = (t) => {
      e.getCanHide() && n.setColumnVisibility((r) => ({
        ...r,
        [e.id]: t ?? !e.getIsVisible()
      }));
    }, e.getIsVisible = () => {
      var t, r;
      const o = e.columns;
      return (t = o.length ? o.some((i) => i.getIsVisible()) : (r = n.getState().columnVisibility) == null ? void 0 : r[e.id]) != null ? t : !0;
    }, e.getCanHide = () => {
      var t, r;
      return ((t = e.columnDef.enableHiding) != null ? t : !0) && ((r = n.options.enableHiding) != null ? r : !0);
    }, e.getToggleVisibilityHandler = () => (t) => {
      e.toggleVisibility == null || e.toggleVisibility(t.target.checked);
    };
  },
  createRow: (e, n) => {
    e._getAllVisibleCells = N(() => [e.getAllCells(), n.getState().columnVisibility], (t) => t.filter((r) => r.column.getIsVisible()), P(n.options, "debugRows", "_getAllVisibleCells")), e.getVisibleCells = N(() => [e.getLeftVisibleCells(), e.getCenterVisibleCells(), e.getRightVisibleCells()], (t, r, o) => [...t, ...r, ...o], P(n.options, "debugRows", "getVisibleCells"));
  },
  createTable: (e) => {
    const n = (t, r) => N(() => [r(), r().filter((o) => o.getIsVisible()).map((o) => o.id).join("_")], (o) => o.filter((i) => i.getIsVisible == null ? void 0 : i.getIsVisible()), P(e.options, "debugColumns", t));
    e.getVisibleFlatColumns = n("getVisibleFlatColumns", () => e.getAllFlatColumns()), e.getVisibleLeafColumns = n("getVisibleLeafColumns", () => e.getAllLeafColumns()), e.getLeftVisibleLeafColumns = n("getLeftVisibleLeafColumns", () => e.getLeftLeafColumns()), e.getRightVisibleLeafColumns = n("getRightVisibleLeafColumns", () => e.getRightLeafColumns()), e.getCenterVisibleLeafColumns = n("getCenterVisibleLeafColumns", () => e.getCenterLeafColumns()), e.setColumnVisibility = (t) => e.options.onColumnVisibilityChange == null ? void 0 : e.options.onColumnVisibilityChange(t), e.resetColumnVisibility = (t) => {
      var r;
      e.setColumnVisibility(t ? {} : (r = e.initialState.columnVisibility) != null ? r : {});
    }, e.toggleAllColumnsVisible = (t) => {
      var r;
      t = (r = t) != null ? r : !e.getIsAllColumnsVisible(), e.setColumnVisibility(e.getAllLeafColumns().reduce((o, i) => ({
        ...o,
        [i.id]: t || !(i.getCanHide != null && i.getCanHide())
      }), {}));
    }, e.getIsAllColumnsVisible = () => !e.getAllLeafColumns().some((t) => !(t.getIsVisible != null && t.getIsVisible())), e.getIsSomeColumnsVisible = () => e.getAllLeafColumns().some((t) => t.getIsVisible == null ? void 0 : t.getIsVisible()), e.getToggleAllColumnsVisibilityHandler = () => (t) => {
      var r;
      e.toggleAllColumnsVisible((r = t.target) == null ? void 0 : r.checked);
    };
  }
};
function qt(e, n) {
  return n ? n === "center" ? e.getCenterVisibleLeafColumns() : n === "left" ? e.getLeftVisibleLeafColumns() : e.getRightVisibleLeafColumns() : e.getVisibleLeafColumns();
}
const zl = {
  createTable: (e) => {
    e._getGlobalFacetedRowModel = e.options.getFacetedRowModel && e.options.getFacetedRowModel(e, "__global__"), e.getGlobalFacetedRowModel = () => e.options.manualFiltering || !e._getGlobalFacetedRowModel ? e.getPreFilteredRowModel() : e._getGlobalFacetedRowModel(), e._getGlobalFacetedUniqueValues = e.options.getFacetedUniqueValues && e.options.getFacetedUniqueValues(e, "__global__"), e.getGlobalFacetedUniqueValues = () => e._getGlobalFacetedUniqueValues ? e._getGlobalFacetedUniqueValues() : /* @__PURE__ */ new Map(), e._getGlobalFacetedMinMaxValues = e.options.getFacetedMinMaxValues && e.options.getFacetedMinMaxValues(e, "__global__"), e.getGlobalFacetedMinMaxValues = () => {
      if (e._getGlobalFacetedMinMaxValues)
        return e._getGlobalFacetedMinMaxValues();
    };
  }
}, Tl = {
  getInitialState: (e) => ({
    globalFilter: void 0,
    ...e
  }),
  getDefaultOptions: (e) => ({
    onGlobalFilterChange: Ve("globalFilter", e),
    globalFilterFn: "auto",
    getColumnCanGlobalFilter: (n) => {
      var t;
      const r = (t = e.getCoreRowModel().flatRows[0]) == null || (t = t._getAllCellsByColumnId()[n.id]) == null ? void 0 : t.getValue();
      return typeof r == "string" || typeof r == "number";
    }
  }),
  createColumn: (e, n) => {
    e.getCanGlobalFilter = () => {
      var t, r, o, i;
      return ((t = e.columnDef.enableGlobalFilter) != null ? t : !0) && ((r = n.options.enableGlobalFilter) != null ? r : !0) && ((o = n.options.enableFilters) != null ? o : !0) && ((i = n.options.getColumnCanGlobalFilter == null ? void 0 : n.options.getColumnCanGlobalFilter(e)) != null ? i : !0) && !!e.accessorFn;
    };
  },
  createTable: (e) => {
    e.getGlobalAutoFilterFn = () => rt.includesString, e.getGlobalFilterFn = () => {
      var n, t;
      const {
        globalFilterFn: r
      } = e.options;
      return Nn(r) ? r : r === "auto" ? e.getGlobalAutoFilterFn() : (n = (t = e.options.filterFns) == null ? void 0 : t[r]) != null ? n : rt[r];
    }, e.setGlobalFilter = (n) => {
      e.options.onGlobalFilterChange == null || e.options.onGlobalFilterChange(n);
    }, e.resetGlobalFilter = (n) => {
      e.setGlobalFilter(n ? void 0 : e.initialState.globalFilter);
    };
  }
}, Ll = {
  getInitialState: (e) => ({
    expanded: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onExpandedChange: Ve("expanded", e),
    paginateExpandedRows: !0
  }),
  createTable: (e) => {
    let n = !1, t = !1;
    e._autoResetExpanded = () => {
      var r, o;
      if (!n) {
        e._queue(() => {
          n = !0;
        });
        return;
      }
      if ((r = (o = e.options.autoResetAll) != null ? o : e.options.autoResetExpanded) != null ? r : !e.options.manualExpanding) {
        if (t) return;
        t = !0, e._queue(() => {
          e.resetExpanded(), t = !1;
        });
      }
    }, e.setExpanded = (r) => e.options.onExpandedChange == null ? void 0 : e.options.onExpandedChange(r), e.toggleAllRowsExpanded = (r) => {
      r ?? !e.getIsAllRowsExpanded() ? e.setExpanded(!0) : e.setExpanded({});
    }, e.resetExpanded = (r) => {
      var o, i;
      e.setExpanded(r ? {} : (o = (i = e.initialState) == null ? void 0 : i.expanded) != null ? o : {});
    }, e.getCanSomeRowsExpand = () => e.getPrePaginationRowModel().flatRows.some((r) => r.getCanExpand()), e.getToggleAllRowsExpandedHandler = () => (r) => {
      r.persist == null || r.persist(), e.toggleAllRowsExpanded();
    }, e.getIsSomeRowsExpanded = () => {
      const r = e.getState().expanded;
      return r === !0 || Object.values(r).some(Boolean);
    }, e.getIsAllRowsExpanded = () => {
      const r = e.getState().expanded;
      return typeof r == "boolean" ? r === !0 : !(!Object.keys(r).length || e.getRowModel().flatRows.some((o) => !o.getIsExpanded()));
    }, e.getExpandedDepth = () => {
      let r = 0;
      return (e.getState().expanded === !0 ? Object.keys(e.getRowModel().rowsById) : Object.keys(e.getState().expanded)).forEach((i) => {
        const s = i.split(".");
        r = Math.max(r, s.length);
      }), r;
    }, e.getPreExpandedRowModel = () => e.getSortedRowModel(), e.getExpandedRowModel = () => (!e._getExpandedRowModel && e.options.getExpandedRowModel && (e._getExpandedRowModel = e.options.getExpandedRowModel(e)), e.options.manualExpanding || !e._getExpandedRowModel ? e.getPreExpandedRowModel() : e._getExpandedRowModel());
  },
  createRow: (e, n) => {
    e.toggleExpanded = (t) => {
      n.setExpanded((r) => {
        var o;
        const i = r === !0 ? !0 : !!(r != null && r[e.id]);
        let s = {};
        if (r === !0 ? Object.keys(n.getRowModel().rowsById).forEach((l) => {
          s[l] = !0;
        }) : s = r, t = (o = t) != null ? o : !i, !i && t)
          return {
            ...s,
            [e.id]: !0
          };
        if (i && !t) {
          const {
            [e.id]: l,
            ...a
          } = s;
          return a;
        }
        return r;
      });
    }, e.getIsExpanded = () => {
      var t;
      const r = n.getState().expanded;
      return !!((t = n.options.getIsRowExpanded == null ? void 0 : n.options.getIsRowExpanded(e)) != null ? t : r === !0 || r != null && r[e.id]);
    }, e.getCanExpand = () => {
      var t, r, o;
      return (t = n.options.getRowCanExpand == null ? void 0 : n.options.getRowCanExpand(e)) != null ? t : ((r = n.options.enableExpanding) != null ? r : !0) && !!((o = e.subRows) != null && o.length);
    }, e.getIsAllParentsExpanded = () => {
      let t = !0, r = e;
      for (; t && r.parentId; )
        r = n.getRow(r.parentId, !0), t = r.getIsExpanded();
      return t;
    }, e.getToggleExpandedHandler = () => {
      const t = e.getCanExpand();
      return () => {
        t && e.toggleExpanded();
      };
    };
  }
}, er = 0, tr = 10, Wn = () => ({
  pageIndex: er,
  pageSize: tr
}), kl = {
  getInitialState: (e) => ({
    ...e,
    pagination: {
      ...Wn(),
      ...e == null ? void 0 : e.pagination
    }
  }),
  getDefaultOptions: (e) => ({
    onPaginationChange: Ve("pagination", e)
  }),
  createTable: (e) => {
    let n = !1, t = !1;
    e._autoResetPageIndex = () => {
      var r, o;
      if (!n) {
        e._queue(() => {
          n = !0;
        });
        return;
      }
      if ((r = (o = e.options.autoResetAll) != null ? o : e.options.autoResetPageIndex) != null ? r : !e.options.manualPagination) {
        if (t) return;
        t = !0, e._queue(() => {
          e.resetPageIndex(), t = !1;
        });
      }
    }, e.setPagination = (r) => {
      const o = (i) => dt(r, i);
      return e.options.onPaginationChange == null ? void 0 : e.options.onPaginationChange(o);
    }, e.resetPagination = (r) => {
      var o;
      e.setPagination(r ? Wn() : (o = e.initialState.pagination) != null ? o : Wn());
    }, e.setPageIndex = (r) => {
      e.setPagination((o) => {
        let i = dt(r, o.pageIndex);
        const s = typeof e.options.pageCount > "u" || e.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : e.options.pageCount - 1;
        return i = Math.max(0, Math.min(i, s)), {
          ...o,
          pageIndex: i
        };
      });
    }, e.resetPageIndex = (r) => {
      var o, i;
      e.setPageIndex(r ? er : (o = (i = e.initialState) == null || (i = i.pagination) == null ? void 0 : i.pageIndex) != null ? o : er);
    }, e.resetPageSize = (r) => {
      var o, i;
      e.setPageSize(r ? tr : (o = (i = e.initialState) == null || (i = i.pagination) == null ? void 0 : i.pageSize) != null ? o : tr);
    }, e.setPageSize = (r) => {
      e.setPagination((o) => {
        const i = Math.max(1, dt(r, o.pageSize)), s = o.pageSize * o.pageIndex, l = Math.floor(s / i);
        return {
          ...o,
          pageIndex: l,
          pageSize: i
        };
      });
    }, e.setPageCount = (r) => e.setPagination((o) => {
      var i;
      let s = dt(r, (i = e.options.pageCount) != null ? i : -1);
      return typeof s == "number" && (s = Math.max(-1, s)), {
        ...o,
        pageCount: s
      };
    }), e.getPageOptions = N(() => [e.getPageCount()], (r) => {
      let o = [];
      return r && r > 0 && (o = [...new Array(r)].fill(null).map((i, s) => s)), o;
    }, P(e.options, "debugTable", "getPageOptions")), e.getCanPreviousPage = () => e.getState().pagination.pageIndex > 0, e.getCanNextPage = () => {
      const {
        pageIndex: r
      } = e.getState().pagination, o = e.getPageCount();
      return o === -1 ? !0 : o === 0 ? !1 : r < o - 1;
    }, e.previousPage = () => e.setPageIndex((r) => r - 1), e.nextPage = () => e.setPageIndex((r) => r + 1), e.firstPage = () => e.setPageIndex(0), e.lastPage = () => e.setPageIndex(e.getPageCount() - 1), e.getPrePaginationRowModel = () => e.getExpandedRowModel(), e.getPaginationRowModel = () => (!e._getPaginationRowModel && e.options.getPaginationRowModel && (e._getPaginationRowModel = e.options.getPaginationRowModel(e)), e.options.manualPagination || !e._getPaginationRowModel ? e.getPrePaginationRowModel() : e._getPaginationRowModel()), e.getPageCount = () => {
      var r;
      return (r = e.options.pageCount) != null ? r : Math.ceil(e.getRowCount() / e.getState().pagination.pageSize);
    }, e.getRowCount = () => {
      var r;
      return (r = e.options.rowCount) != null ? r : e.getPrePaginationRowModel().rows.length;
    };
  }
}, Xn = () => ({
  top: [],
  bottom: []
}), Hl = {
  getInitialState: (e) => ({
    rowPinning: Xn(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    onRowPinningChange: Ve("rowPinning", e)
  }),
  createRow: (e, n) => {
    e.pin = (t, r, o) => {
      const i = r ? e.getLeafRows().map((a) => {
        let {
          id: u
        } = a;
        return u;
      }) : [], s = o ? e.getParentRows().map((a) => {
        let {
          id: u
        } = a;
        return u;
      }) : [], l = /* @__PURE__ */ new Set([...s, e.id, ...i]);
      n.setRowPinning((a) => {
        var u, d;
        if (t === "bottom") {
          var f, c;
          return {
            top: ((f = a == null ? void 0 : a.top) != null ? f : []).filter((x) => !(l != null && l.has(x))),
            bottom: [...((c = a == null ? void 0 : a.bottom) != null ? c : []).filter((x) => !(l != null && l.has(x))), ...Array.from(l)]
          };
        }
        if (t === "top") {
          var g, h;
          return {
            top: [...((g = a == null ? void 0 : a.top) != null ? g : []).filter((x) => !(l != null && l.has(x))), ...Array.from(l)],
            bottom: ((h = a == null ? void 0 : a.bottom) != null ? h : []).filter((x) => !(l != null && l.has(x)))
          };
        }
        return {
          top: ((u = a == null ? void 0 : a.top) != null ? u : []).filter((x) => !(l != null && l.has(x))),
          bottom: ((d = a == null ? void 0 : a.bottom) != null ? d : []).filter((x) => !(l != null && l.has(x)))
        };
      });
    }, e.getCanPin = () => {
      var t;
      const {
        enableRowPinning: r,
        enablePinning: o
      } = n.options;
      return typeof r == "function" ? r(e) : (t = r ?? o) != null ? t : !0;
    }, e.getIsPinned = () => {
      const t = [e.id], {
        top: r,
        bottom: o
      } = n.getState().rowPinning, i = t.some((l) => r == null ? void 0 : r.includes(l)), s = t.some((l) => o == null ? void 0 : o.includes(l));
      return i ? "top" : s ? "bottom" : !1;
    }, e.getPinnedIndex = () => {
      var t, r;
      const o = e.getIsPinned();
      if (!o) return -1;
      const i = (t = o === "top" ? n.getTopRows() : n.getBottomRows()) == null ? void 0 : t.map((s) => {
        let {
          id: l
        } = s;
        return l;
      });
      return (r = i == null ? void 0 : i.indexOf(e.id)) != null ? r : -1;
    };
  },
  createTable: (e) => {
    e.setRowPinning = (n) => e.options.onRowPinningChange == null ? void 0 : e.options.onRowPinningChange(n), e.resetRowPinning = (n) => {
      var t, r;
      return e.setRowPinning(n ? Xn() : (t = (r = e.initialState) == null ? void 0 : r.rowPinning) != null ? t : Xn());
    }, e.getIsSomeRowsPinned = (n) => {
      var t;
      const r = e.getState().rowPinning;
      if (!n) {
        var o, i;
        return !!((o = r.top) != null && o.length || (i = r.bottom) != null && i.length);
      }
      return !!((t = r[n]) != null && t.length);
    }, e._getPinnedRows = (n, t, r) => {
      var o;
      return ((o = e.options.keepPinnedRows) == null || o ? (
        //get all rows that are pinned even if they would not be otherwise visible
        //account for expanded parent rows, but not pagination or filtering
        (t ?? []).map((s) => {
          const l = e.getRow(s, !0);
          return l.getIsAllParentsExpanded() ? l : null;
        })
      ) : (
        //else get only visible rows that are pinned
        (t ?? []).map((s) => n.find((l) => l.id === s))
      )).filter(Boolean).map((s) => ({
        ...s,
        position: r
      }));
    }, e.getTopRows = N(() => [e.getRowModel().rows, e.getState().rowPinning.top], (n, t) => e._getPinnedRows(n, t, "top"), P(e.options, "debugRows", "getTopRows")), e.getBottomRows = N(() => [e.getRowModel().rows, e.getState().rowPinning.bottom], (n, t) => e._getPinnedRows(n, t, "bottom"), P(e.options, "debugRows", "getBottomRows")), e.getCenterRows = N(() => [e.getRowModel().rows, e.getState().rowPinning.top, e.getState().rowPinning.bottom], (n, t, r) => {
      const o = /* @__PURE__ */ new Set([...t ?? [], ...r ?? []]);
      return n.filter((i) => !o.has(i.id));
    }, P(e.options, "debugRows", "getCenterRows"));
  }
}, Gl = {
  getInitialState: (e) => ({
    rowSelection: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onRowSelectionChange: Ve("rowSelection", e),
    enableRowSelection: !0,
    enableMultiRowSelection: !0,
    enableSubRowSelection: !0
    // enableGroupingRowSelection: false,
    // isAdditiveSelectEvent: (e: unknown) => !!e.metaKey,
    // isInclusiveSelectEvent: (e: unknown) => !!e.shiftKey,
  }),
  createTable: (e) => {
    e.setRowSelection = (n) => e.options.onRowSelectionChange == null ? void 0 : e.options.onRowSelectionChange(n), e.resetRowSelection = (n) => {
      var t;
      return e.setRowSelection(n ? {} : (t = e.initialState.rowSelection) != null ? t : {});
    }, e.toggleAllRowsSelected = (n) => {
      e.setRowSelection((t) => {
        n = typeof n < "u" ? n : !e.getIsAllRowsSelected();
        const r = {
          ...t
        }, o = e.getPreGroupedRowModel().flatRows;
        return n ? o.forEach((i) => {
          i.getCanSelect() && (r[i.id] = !0);
        }) : o.forEach((i) => {
          delete r[i.id];
        }), r;
      });
    }, e.toggleAllPageRowsSelected = (n) => e.setRowSelection((t) => {
      const r = typeof n < "u" ? n : !e.getIsAllPageRowsSelected(), o = {
        ...t
      };
      return e.getRowModel().rows.forEach((i) => {
        nr(o, i.id, r, !0, e);
      }), o;
    }), e.getPreSelectedRowModel = () => e.getCoreRowModel(), e.getSelectedRowModel = N(() => [e.getState().rowSelection, e.getCoreRowModel()], (n, t) => Object.keys(n).length ? Yn(e, t) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, P(e.options, "debugTable", "getSelectedRowModel")), e.getFilteredSelectedRowModel = N(() => [e.getState().rowSelection, e.getFilteredRowModel()], (n, t) => Object.keys(n).length ? Yn(e, t) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, P(e.options, "debugTable", "getFilteredSelectedRowModel")), e.getGroupedSelectedRowModel = N(() => [e.getState().rowSelection, e.getSortedRowModel()], (n, t) => Object.keys(n).length ? Yn(e, t) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, P(e.options, "debugTable", "getGroupedSelectedRowModel")), e.getIsAllRowsSelected = () => {
      const n = e.getFilteredRowModel().flatRows, {
        rowSelection: t
      } = e.getState();
      let r = !!(n.length && Object.keys(t).length);
      return r && n.some((o) => o.getCanSelect() && !t[o.id]) && (r = !1), r;
    }, e.getIsAllPageRowsSelected = () => {
      const n = e.getPaginationRowModel().flatRows.filter((o) => o.getCanSelect()), {
        rowSelection: t
      } = e.getState();
      let r = !!n.length;
      return r && n.some((o) => !t[o.id]) && (r = !1), r;
    }, e.getIsSomeRowsSelected = () => {
      var n;
      const t = Object.keys((n = e.getState().rowSelection) != null ? n : {}).length;
      return t > 0 && t < e.getFilteredRowModel().flatRows.length;
    }, e.getIsSomePageRowsSelected = () => {
      const n = e.getPaginationRowModel().flatRows;
      return e.getIsAllPageRowsSelected() ? !1 : n.filter((t) => t.getCanSelect()).some((t) => t.getIsSelected() || t.getIsSomeSelected());
    }, e.getToggleAllRowsSelectedHandler = () => (n) => {
      e.toggleAllRowsSelected(n.target.checked);
    }, e.getToggleAllPageRowsSelectedHandler = () => (n) => {
      e.toggleAllPageRowsSelected(n.target.checked);
    };
  },
  createRow: (e, n) => {
    e.toggleSelected = (t, r) => {
      const o = e.getIsSelected();
      n.setRowSelection((i) => {
        var s;
        if (t = typeof t < "u" ? t : !o, e.getCanSelect() && o === t)
          return i;
        const l = {
          ...i
        };
        return nr(l, e.id, t, (s = r == null ? void 0 : r.selectChildren) != null ? s : !0, n), l;
      });
    }, e.getIsSelected = () => {
      const {
        rowSelection: t
      } = n.getState();
      return pr(e, t);
    }, e.getIsSomeSelected = () => {
      const {
        rowSelection: t
      } = n.getState();
      return rr(e, t) === "some";
    }, e.getIsAllSubRowsSelected = () => {
      const {
        rowSelection: t
      } = n.getState();
      return rr(e, t) === "all";
    }, e.getCanSelect = () => {
      var t;
      return typeof n.options.enableRowSelection == "function" ? n.options.enableRowSelection(e) : (t = n.options.enableRowSelection) != null ? t : !0;
    }, e.getCanSelectSubRows = () => {
      var t;
      return typeof n.options.enableSubRowSelection == "function" ? n.options.enableSubRowSelection(e) : (t = n.options.enableSubRowSelection) != null ? t : !0;
    }, e.getCanMultiSelect = () => {
      var t;
      return typeof n.options.enableMultiRowSelection == "function" ? n.options.enableMultiRowSelection(e) : (t = n.options.enableMultiRowSelection) != null ? t : !0;
    }, e.getToggleSelectedHandler = () => {
      const t = e.getCanSelect();
      return (r) => {
        var o;
        t && e.toggleSelected((o = r.target) == null ? void 0 : o.checked);
      };
    };
  }
}, nr = (e, n, t, r, o) => {
  var i;
  const s = o.getRow(n, !0);
  t ? (s.getCanMultiSelect() || Object.keys(e).forEach((l) => delete e[l]), s.getCanSelect() && (e[n] = !0)) : delete e[n], r && (i = s.subRows) != null && i.length && s.getCanSelectSubRows() && s.subRows.forEach((l) => nr(e, l.id, t, r, o));
};
function Yn(e, n) {
  const t = e.getState().rowSelection, r = [], o = {}, i = function(s, l) {
    return s.map((a) => {
      var u;
      const d = pr(a, t);
      if (d && (r.push(a), o[a.id] = a), (u = a.subRows) != null && u.length && (a = {
        ...a,
        subRows: i(a.subRows)
      }), d)
        return a;
    }).filter(Boolean);
  };
  return {
    rows: i(n.rows),
    flatRows: r,
    rowsById: o
  };
}
function pr(e, n) {
  var t;
  return (t = n[e.id]) != null ? t : !1;
}
function rr(e, n, t) {
  var r;
  if (!((r = e.subRows) != null && r.length)) return !1;
  let o = !0, i = !1;
  return e.subRows.forEach((s) => {
    if (!(i && !o) && (s.getCanSelect() && (pr(s, n) ? i = !0 : o = !1), s.subRows && s.subRows.length)) {
      const l = rr(s, n);
      l === "all" ? i = !0 : (l === "some" && (i = !0), o = !1);
    }
  }), o ? "all" : i ? "some" : !1;
}
const or = /([0-9]+)/gm, Bl = (e, n, t) => jo(pt(e.getValue(t)).toLowerCase(), pt(n.getValue(t)).toLowerCase()), ql = (e, n, t) => jo(pt(e.getValue(t)), pt(n.getValue(t))), Ul = (e, n, t) => hr(pt(e.getValue(t)).toLowerCase(), pt(n.getValue(t)).toLowerCase()), Kl = (e, n, t) => hr(pt(e.getValue(t)), pt(n.getValue(t))), Wl = (e, n, t) => {
  const r = e.getValue(t), o = n.getValue(t);
  return r > o ? 1 : r < o ? -1 : 0;
}, Xl = (e, n, t) => hr(e.getValue(t), n.getValue(t));
function hr(e, n) {
  return e === n ? 0 : e > n ? 1 : -1;
}
function pt(e) {
  return typeof e == "number" ? isNaN(e) || e === 1 / 0 || e === -1 / 0 ? "" : String(e) : typeof e == "string" ? e : "";
}
function jo(e, n) {
  const t = e.split(or).filter(Boolean), r = n.split(or).filter(Boolean);
  for (; t.length && r.length; ) {
    const o = t.shift(), i = r.shift(), s = parseInt(o, 10), l = parseInt(i, 10), a = [s, l].sort();
    if (isNaN(a[0])) {
      if (o > i)
        return 1;
      if (i > o)
        return -1;
      continue;
    }
    if (isNaN(a[1]))
      return isNaN(s) ? -1 : 1;
    if (s > l)
      return 1;
    if (l > s)
      return -1;
  }
  return t.length - r.length;
}
const kt = {
  alphanumeric: Bl,
  alphanumericCaseSensitive: ql,
  text: Ul,
  textCaseSensitive: Kl,
  datetime: Wl,
  basic: Xl
}, Yl = {
  getInitialState: (e) => ({
    sorting: [],
    ...e
  }),
  getDefaultColumnDef: () => ({
    sortingFn: "auto",
    sortUndefined: 1
  }),
  getDefaultOptions: (e) => ({
    onSortingChange: Ve("sorting", e),
    isMultiSortEvent: (n) => n.shiftKey
  }),
  createColumn: (e, n) => {
    e.getAutoSortingFn = () => {
      const t = n.getFilteredRowModel().flatRows.slice(10);
      let r = !1;
      for (const o of t) {
        const i = o == null ? void 0 : o.getValue(e.id);
        if (Object.prototype.toString.call(i) === "[object Date]")
          return kt.datetime;
        if (typeof i == "string" && (r = !0, i.split(or).length > 1))
          return kt.alphanumeric;
      }
      return r ? kt.text : kt.basic;
    }, e.getAutoSortDir = () => {
      const t = n.getFilteredRowModel().flatRows[0];
      return typeof (t == null ? void 0 : t.getValue(e.id)) == "string" ? "asc" : "desc";
    }, e.getSortingFn = () => {
      var t, r;
      if (!e)
        throw new Error();
      return Nn(e.columnDef.sortingFn) ? e.columnDef.sortingFn : e.columnDef.sortingFn === "auto" ? e.getAutoSortingFn() : (t = (r = n.options.sortingFns) == null ? void 0 : r[e.columnDef.sortingFn]) != null ? t : kt[e.columnDef.sortingFn];
    }, e.toggleSorting = (t, r) => {
      const o = e.getNextSortingOrder(), i = typeof t < "u" && t !== null;
      n.setSorting((s) => {
        const l = s == null ? void 0 : s.find((g) => g.id === e.id), a = s == null ? void 0 : s.findIndex((g) => g.id === e.id);
        let u = [], d, f = i ? t : o === "desc";
        if (s != null && s.length && e.getCanMultiSort() && r ? l ? d = "toggle" : d = "add" : s != null && s.length && a !== s.length - 1 ? d = "replace" : l ? d = "toggle" : d = "replace", d === "toggle" && (i || o || (d = "remove")), d === "add") {
          var c;
          u = [...s, {
            id: e.id,
            desc: f
          }], u.splice(0, u.length - ((c = n.options.maxMultiSortColCount) != null ? c : Number.MAX_SAFE_INTEGER));
        } else d === "toggle" ? u = s.map((g) => g.id === e.id ? {
          ...g,
          desc: f
        } : g) : d === "remove" ? u = s.filter((g) => g.id !== e.id) : u = [{
          id: e.id,
          desc: f
        }];
        return u;
      });
    }, e.getFirstSortDir = () => {
      var t, r;
      return ((t = (r = e.columnDef.sortDescFirst) != null ? r : n.options.sortDescFirst) != null ? t : e.getAutoSortDir() === "desc") ? "desc" : "asc";
    }, e.getNextSortingOrder = (t) => {
      var r, o;
      const i = e.getFirstSortDir(), s = e.getIsSorted();
      return s ? s !== i && ((r = n.options.enableSortingRemoval) == null || r) && // If enableSortRemove, enable in general
      (!(t && (o = n.options.enableMultiRemove) != null) || o) ? !1 : s === "desc" ? "asc" : "desc" : i;
    }, e.getCanSort = () => {
      var t, r;
      return ((t = e.columnDef.enableSorting) != null ? t : !0) && ((r = n.options.enableSorting) != null ? r : !0) && !!e.accessorFn;
    }, e.getCanMultiSort = () => {
      var t, r;
      return (t = (r = e.columnDef.enableMultiSort) != null ? r : n.options.enableMultiSort) != null ? t : !!e.accessorFn;
    }, e.getIsSorted = () => {
      var t;
      const r = (t = n.getState().sorting) == null ? void 0 : t.find((o) => o.id === e.id);
      return r ? r.desc ? "desc" : "asc" : !1;
    }, e.getSortIndex = () => {
      var t, r;
      return (t = (r = n.getState().sorting) == null ? void 0 : r.findIndex((o) => o.id === e.id)) != null ? t : -1;
    }, e.clearSorting = () => {
      n.setSorting((t) => t != null && t.length ? t.filter((r) => r.id !== e.id) : []);
    }, e.getToggleSortingHandler = () => {
      const t = e.getCanSort();
      return (r) => {
        t && (r.persist == null || r.persist(), e.toggleSorting == null || e.toggleSorting(void 0, e.getCanMultiSort() ? n.options.isMultiSortEvent == null ? void 0 : n.options.isMultiSortEvent(r) : !1));
      };
    };
  },
  createTable: (e) => {
    e.setSorting = (n) => e.options.onSortingChange == null ? void 0 : e.options.onSortingChange(n), e.resetSorting = (n) => {
      var t, r;
      e.setSorting(n ? [] : (t = (r = e.initialState) == null ? void 0 : r.sorting) != null ? t : []);
    }, e.getPreSortedRowModel = () => e.getGroupedRowModel(), e.getSortedRowModel = () => (!e._getSortedRowModel && e.options.getSortedRowModel && (e._getSortedRowModel = e.options.getSortedRowModel(e)), e.options.manualSorting || !e._getSortedRowModel ? e.getPreSortedRowModel() : e._getSortedRowModel());
  }
}, Jl = [
  vl,
  Al,
  Pl,
  $l,
  wl,
  Sl,
  zl,
  //depends on ColumnFaceting
  Tl,
  //depends on ColumnFiltering
  Yl,
  Fl,
  //depends on RowSorting
  Ll,
  kl,
  Hl,
  Gl,
  Ol
];
function Zl(e) {
  var n, t;
  process.env.NODE_ENV !== "production" && (e.debugAll || e.debugTable) && console.info("Creating Table Instance...");
  const r = [...Jl, ...(n = e._features) != null ? n : []];
  let o = {
    _features: r
  };
  const i = o._features.reduce((c, g) => Object.assign(c, g.getDefaultOptions == null ? void 0 : g.getDefaultOptions(o)), {}), s = (c) => o.options.mergeOptions ? o.options.mergeOptions(i, c) : {
    ...i,
    ...c
  };
  let a = {
    ...{},
    ...(t = e.initialState) != null ? t : {}
  };
  o._features.forEach((c) => {
    var g;
    a = (g = c.getInitialState == null ? void 0 : c.getInitialState(a)) != null ? g : a;
  });
  const u = [];
  let d = !1;
  const f = {
    _features: r,
    options: {
      ...i,
      ...e
    },
    initialState: a,
    _queue: (c) => {
      u.push(c), d || (d = !0, Promise.resolve().then(() => {
        for (; u.length; )
          u.shift()();
        d = !1;
      }).catch((g) => setTimeout(() => {
        throw g;
      })));
    },
    reset: () => {
      o.setState(o.initialState);
    },
    setOptions: (c) => {
      const g = dt(c, o.options);
      o.options = s(g);
    },
    getState: () => o.options.state,
    setState: (c) => {
      o.options.onStateChange == null || o.options.onStateChange(c);
    },
    _getRowId: (c, g, h) => {
      var x;
      return (x = o.options.getRowId == null ? void 0 : o.options.getRowId(c, g, h)) != null ? x : `${h ? [h.id, g].join(".") : g}`;
    },
    getCoreRowModel: () => (o._getCoreRowModel || (o._getCoreRowModel = o.options.getCoreRowModel(o)), o._getCoreRowModel()),
    // The final calls start at the bottom of the model,
    // expanded rows, which then work their way up
    getRowModel: () => o.getPaginationRowModel(),
    //in next version, we should just pass in the row model as the optional 2nd arg
    getRow: (c, g) => {
      let h = (g ? o.getPrePaginationRowModel() : o.getRowModel()).rowsById[c];
      if (!h && (h = o.getCoreRowModel().rowsById[c], !h))
        throw process.env.NODE_ENV !== "production" ? new Error(`getRow could not find row with ID: ${c}`) : new Error();
      return h;
    },
    _getDefaultColumnDef: N(() => [o.options.defaultColumn], (c) => {
      var g;
      return c = (g = c) != null ? g : {}, {
        header: (h) => {
          const x = h.header.column.columnDef;
          return x.accessorKey ? x.accessorKey : x.accessorFn ? x.id : null;
        },
        // footer: props => props.header.column.id,
        cell: (h) => {
          var x, w;
          return (x = (w = h.renderValue()) == null || w.toString == null ? void 0 : w.toString()) != null ? x : null;
        },
        ...o._features.reduce((h, x) => Object.assign(h, x.getDefaultColumnDef == null ? void 0 : x.getDefaultColumnDef()), {}),
        ...c
      };
    }, P(e, "debugColumns", "_getDefaultColumnDef")),
    _getColumnDefs: () => o.options.columns,
    getAllColumns: N(() => [o._getColumnDefs()], (c) => {
      const g = function(h, x, w) {
        return w === void 0 && (w = 0), h.map((S) => {
          const R = ml(o, S, w, x), I = S;
          return R.columns = I.columns ? g(I.columns, R, w + 1) : [], R;
        });
      };
      return g(c);
    }, P(e, "debugColumns", "getAllColumns")),
    getAllFlatColumns: N(() => [o.getAllColumns()], (c) => c.flatMap((g) => g.getFlatColumns()), P(e, "debugColumns", "getAllFlatColumns")),
    _getAllFlatColumnsById: N(() => [o.getAllFlatColumns()], (c) => c.reduce((g, h) => (g[h.id] = h, g), {}), P(e, "debugColumns", "getAllFlatColumnsById")),
    getAllLeafColumns: N(() => [o.getAllColumns(), o._getOrderColumnsFn()], (c, g) => {
      let h = c.flatMap((x) => x.getLeafColumns());
      return g(h);
    }, P(e, "debugColumns", "getAllLeafColumns")),
    getColumn: (c) => {
      const g = o._getAllFlatColumnsById()[c];
      return process.env.NODE_ENV !== "production" && !g && console.error(`[Table] Column with id '${c}' does not exist.`), g;
    }
  };
  Object.assign(o, f);
  for (let c = 0; c < o._features.length; c++) {
    const g = o._features[c];
    g == null || g.createTable == null || g.createTable(o);
  }
  return o;
}
function Ql() {
  return (e) => N(() => [e.options.data], (n) => {
    const t = {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, r = function(o, i, s) {
      i === void 0 && (i = 0);
      const l = [];
      for (let u = 0; u < o.length; u++) {
        const d = xl(e, e._getRowId(o[u], u, s), o[u], u, i, void 0, s == null ? void 0 : s.id);
        if (t.flatRows.push(d), t.rowsById[d.id] = d, l.push(d), e.options.getSubRows) {
          var a;
          d.originalSubRows = e.options.getSubRows(o[u], u), (a = d.originalSubRows) != null && a.length && (d.subRows = r(d.originalSubRows, i + 1, d));
        }
      }
      return l;
    };
    return t.rows = r(n), t;
  }, P(e.options, "debugTable", "getRowModel", () => e._autoResetPageIndex()));
}
function ea(e) {
  const n = [], t = (r) => {
    var o;
    n.push(r), (o = r.subRows) != null && o.length && r.getIsExpanded() && r.subRows.forEach(t);
  };
  return e.rows.forEach(t), {
    rows: n,
    flatRows: e.flatRows,
    rowsById: e.rowsById
  };
}
function ta(e) {
  return (n) => N(() => [n.getState().pagination, n.getPrePaginationRowModel(), n.options.paginateExpandedRows ? void 0 : n.getState().expanded], (t, r) => {
    if (!r.rows.length)
      return r;
    const {
      pageSize: o,
      pageIndex: i
    } = t;
    let {
      rows: s,
      flatRows: l,
      rowsById: a
    } = r;
    const u = o * i, d = u + o;
    s = s.slice(u, d);
    let f;
    n.options.paginateExpandedRows ? f = {
      rows: s,
      flatRows: l,
      rowsById: a
    } : f = ea({
      rows: s,
      flatRows: l,
      rowsById: a
    }), f.flatRows = [];
    const c = (g) => {
      f.flatRows.push(g), g.subRows.length && g.subRows.forEach(c);
    };
    return f.rows.forEach(c), f;
  }, P(n.options, "debugTable", "getPaginationRowModel"));
}
function na() {
  return (e) => N(() => [e.getState().sorting, e.getPreSortedRowModel()], (n, t) => {
    if (!t.rows.length || !(n != null && n.length))
      return t;
    const r = e.getState().sorting, o = [], i = r.filter((a) => {
      var u;
      return (u = e.getColumn(a.id)) == null ? void 0 : u.getCanSort();
    }), s = {};
    i.forEach((a) => {
      const u = e.getColumn(a.id);
      u && (s[a.id] = {
        sortUndefined: u.columnDef.sortUndefined,
        invertSorting: u.columnDef.invertSorting,
        sortingFn: u.getSortingFn()
      });
    });
    const l = (a) => {
      const u = a.map((d) => ({
        ...d
      }));
      return u.sort((d, f) => {
        for (let g = 0; g < i.length; g += 1) {
          var c;
          const h = i[g], x = s[h.id], w = x.sortUndefined, S = (c = h == null ? void 0 : h.desc) != null ? c : !1;
          let R = 0;
          if (w) {
            const I = d.getValue(h.id), F = f.getValue(h.id), $ = I === void 0, _ = F === void 0;
            if ($ || _) {
              if (w === "first") return $ ? -1 : 1;
              if (w === "last") return $ ? 1 : -1;
              R = $ && _ ? 0 : $ ? w : -w;
            }
          }
          if (R === 0 && (R = x.sortingFn(d, f, h.id)), R !== 0)
            return S && (R *= -1), x.invertSorting && (R *= -1), R;
        }
        return d.index - f.index;
      }), u.forEach((d) => {
        var f;
        o.push(d), (f = d.subRows) != null && f.length && (d.subRows = l(d.subRows));
      }), u;
    };
    return {
      rows: l(t.rows),
      flatRows: o,
      rowsById: t.rowsById
    };
  }, P(e.options, "debugTable", "getSortedRowModel", () => e._autoResetPageIndex()));
}
/**
   * react-table
   *
   * Copyright (c) TanStack
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */
function mn(e, n) {
  return e ? ra(e) ? /* @__PURE__ */ V.createElement(e, n) : e : null;
}
function ra(e) {
  return oa(e) || typeof e == "function" || ia(e);
}
function oa(e) {
  return typeof e == "function" && (() => {
    const n = Object.getPrototypeOf(e);
    return n.prototype && n.prototype.isReactComponent;
  })();
}
function ia(e) {
  return typeof e == "object" && typeof e.$$typeof == "symbol" && ["react.memo", "react.forward_ref"].includes(e.$$typeof.description);
}
function sa(e) {
  const n = {
    state: {},
    // Dummy state
    onStateChange: () => {
    },
    // noop
    renderFallbackValue: null,
    ...e
  }, [t] = V.useState(() => ({
    current: Zl(n)
  })), [r, o] = V.useState(() => t.current.initialState);
  return t.current.setOptions((i) => ({
    ...i,
    ...e,
    state: {
      ...r,
      ...e.state
    },
    // Similarly, we'll maintain both our internal state and any user-provided
    // state.
    onStateChange: (s) => {
      o(s), e.onStateChange == null || e.onStateChange(s);
    }
  })), t.current;
}
function la({
  className: e,
  columns: n,
  data: t,
  rowKey: r,
  size: o = "md",
  striped: i = !0,
  rowStyle: s,
  emptyState: l = "No data available",
  onRowClick: a,
  stickyHeader: u = !1,
  showSortIndicator: d = !1,
  multiSort: f = !1,
  editable: c,
  resizableColumns: g = !1,
  rowActions: h,
  pageSize: x,
  pageSizeOptions: w,
  initialPage: S = 1,
  onPageChange: R,
  sorting: I,
  onSortingChange: F,
  columnVisibility: $,
  virtualized: _ = !1,
  virtualRowHeight: z = 44,
  virtualOverscan: T = 10,
  virtualBodyMaxHeight: W = 420,
  pageSizeLabel: Z = "Số hàng trên trang",
  pageLabel: B = "Trang",
  instanceId: Ne,
  ...Pe
}) {
  const ae = Yr(), Qe = V.useRef(null);
  Qe.current || (Qe.current = Zo());
  const ie = Ne ?? Qe.current, [he, St] = V.useState([]), me = !!(c != null && c.enabled), Ee = !!(h != null && h.enabled), Ct = (h == null ? void 0 : h.allowInsertBelow) ?? !0, ne = (h == null ? void 0 : h.allowReorder) ?? !0, se = (h == null ? void 0 : h.allowSelect) ?? !0, [et, tt] = V.useState(!1), [ve, ht] = V.useState(""), [He, Oe] = V.useState(""), [M, ot] = V.useState(null), [k, Q] = V.useState(""), _e = V.useRef(null), $e = V.useRef(null), [je, yt] = V.useState(null), Ae = s ?? (i ? "striped" : "plain"), Rt = w && w.length ? w : [10, 20, 50, 100], ze = I ?? he, [bt] = V.useState({}), Dt = $ ?? bt, en = Math.max(0, S - 1), tn = x ?? Rt[0], [It, Pn] = V.useState({
    pageIndex: en,
    pageSize: tn
  }), [it, st] = V.useState({}), [mt, At] = V.useState(null), ge = V.useCallback((m) => typeof m.key == "string" ? m.key : String(m.key), []), nn = V.useCallback((m) => m.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9_]+/g, "_").replace(/_+/g, "_").replace(/^_+|_+$/g, "").toLowerCase(), []), zt = V.useCallback(
    (m) => {
      var C, E, O;
      const p = (m ?? "").toLowerCase(), y = (C = c == null ? void 0 : c.getDefaultValueForType) == null ? void 0 : C.call(c, m);
      if (y !== void 0) return y;
      const b = (O = (E = c == null ? void 0 : c.valueTypeOptions) == null ? void 0 : E.find((D) => D.value === m)) == null ? void 0 : O.defaultValue;
      return b !== void 0 ? b : p === "number" ? 0 : p === "boolean" ? !1 : p.includes("multi") ? [] : p === "number_range" || p === "range_number" ? { min: void 0, max: void 0 } : p === "date_range" || p === "datetime_range" ? { start: void 0, end: void 0 } : "";
    },
    [c]
  ), Et = Ee ? se ? 92 : 68 : 0, [Tt, rn] = V.useState(
    (h == null ? void 0 : h.defaultSelectedRowKeys) ?? []
  ), Me = (h == null ? void 0 : h.selectedRowKeys) ?? Tt, _t = (m) => {
    var p;
    (h == null ? void 0 : h.selectedRowKeys) === void 0 && rn(m), (p = h == null ? void 0 : h.onSelectedRowKeysChange) == null || p.call(h, m);
  }, Lt = (m) => {
    const y = Me.includes(m) ? Me.filter((b) => b !== m) : [...Me, m];
    _t(y);
  }, Mt = Ee ? 1 : 0, vt = Ee && Ct && !!(c != null && c.enabled) && !!c.onDataChange, ee = Ee && ne && !!(c != null && c.enabled) && !!c.onDataChange && !_ && ze.length === 0, xe = $i(
    Vr(cr, {
      activationConstraint: { distance: 4 }
    }),
    Vr(ar, {
      coordinateGetter: dl
    })
  ), we = V.useCallback(
    (m) => {
      if (!ee) return;
      const { active: p, over: y } = m;
      if (!y || p.id === y.id) return;
      const b = String(p.id), C = String(y.id), E = t.findIndex((D, j) => r(D, j) === b), O = t.findIndex((D, j) => r(D, j) === C);
      E < 0 || O < 0 || E !== O && (c == null || c.onDataChange(gr(t, E, O)));
    },
    [ee, t, c, r]
  ), Ke = ({
    rowKeyValue: m,
    canInsert: p,
    showDrag: y,
    showSelect: b,
    selected: C,
    dragEnabled: E,
    onInsertBelow: O,
    onToggleSelect: D,
    setActivatorNodeRef: j,
    listeners: A
  }) => /* @__PURE__ */ v.jsxs("div", { className: "flex items-center gap-1", children: [
    p && /* @__PURE__ */ v.jsx(
      "button",
      {
        type: "button",
        className: U(
          q(
            "inline-flex h-6 w-6 items-center justify-center rounded-md hover:bg-slate-100",
            "pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100"
          )
        ),
        onClick: (H) => {
          H.stopPropagation(), O();
        },
        children: /* @__PURE__ */ v.jsx(Tn, { className: "h-4 w-4 text-text-muted" })
      }
    ),
    y && /* @__PURE__ */ v.jsx(
      "button",
      {
        type: "button",
        ref: j,
        ...A,
        className: U(
          q(
            "inline-flex h-6 w-6 items-center justify-center rounded-md",
            E ? "cursor-grab hover:bg-slate-100" : "cursor-not-allowed opacity-40",
            "pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100"
          )
        ),
        onClick: (H) => H.stopPropagation(),
        children: /* @__PURE__ */ v.jsx(zn, { className: "h-4 w-4" })
      }
    ),
    b && /* @__PURE__ */ v.jsx(
      "div",
      {
        className: U(
          q(
            "inline-flex h-6 w-6 items-center justify-center",
            C ? "opacity-100" : "pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100"
          )
        ),
        onClick: (H) => H.stopPropagation(),
        children: /* @__PURE__ */ v.jsx(
          cn,
          {
            checked: C,
            onChange: (H) => {
              H.stopPropagation(), D();
            }
          }
        )
      }
    )
  ] }), Fe = ({ row: m, rowKeyValue: p, children: y, className: b }) => {
    const {
      attributes: C,
      listeners: E,
      setNodeRef: O,
      setActivatorNodeRef: D,
      transform: j,
      transition: A,
      isDragging: H
    } = al({ id: p }), Re = {
      transform: ft.Transform.toString(j),
      transition: A,
      opacity: H ? 0.9 : void 0
    };
    return /* @__PURE__ */ v.jsxs(
      "tr",
      {
        ref: O,
        style: Re,
        className: b,
        onClick: () => On(m.original, m.index),
        ...C,
        children: [
          Ee && /* @__PURE__ */ v.jsx("td", { className: "px-2 py-3 align-middle", style: { width: Et }, onClick: (be) => be.stopPropagation(), children: /* @__PURE__ */ v.jsx(
            Ke,
            {
              rowKeyValue: p,
              canInsert: vt,
              showDrag: ne,
              showSelect: se,
              selected: Me.includes(p),
              dragEnabled: ee,
              onInsertBelow: () => ce(p),
              onToggleSelect: () => Lt(p),
              setActivatorNodeRef: D,
              listeners: E
            }
          ) }),
          y
        ]
      }
    );
  }, ce = (m) => {
    if (!vt) return;
    const p = t.findIndex((C, E) => r(C, E) === m);
    if (p < 0) return;
    const y = {};
    n.forEach((C) => {
      const E = ge(C), O = C.valueType ?? "";
      y[E] = zt(O);
    });
    const b = [...t.slice(0, p + 1), y, ...t.slice(p + 1)];
    c == null || c.onDataChange(b);
  }, re = V.useMemo(() => new Map(n.map((m) => [ge(m), m])), [n, ge]), Se = V.useCallback((m) => (m ?? "").toLowerCase(), []), oe = V.useCallback(
    (m, p) => {
      var E;
      const y = Se(m == null ? void 0 : m.valueType), b = m == null ? void 0 : m.options;
      if (!!(b != null && b.length)) {
        if (Array.isArray(p))
          return p.filter((j) => typeof j == "string").map((j) => {
            var A;
            return ((A = b == null ? void 0 : b.find((H) => H.value === j)) == null ? void 0 : A.label) ?? j;
          }).join(", ");
        if (typeof p == "string")
          return ((E = b == null ? void 0 : b.find((O) => O.value === p)) == null ? void 0 : E.label) ?? p;
      }
      if (y === "boolean")
        return p ? "Có" : "Không";
      if ((y === "number_range" || y === "range_number") && p && typeof p == "object") {
        const O = p, D = typeof O.min == "number" ? O.min : void 0, j = typeof O.max == "number" ? O.max : void 0;
        return D === void 0 && j === void 0 ? "" : D !== void 0 && j !== void 0 ? `${D} - ${j}` : D !== void 0 ? `>= ${D}` : `<= ${j}`;
      }
      if ((y === "date_range" || y === "datetime_range") && p && typeof p == "object") {
        const O = p, D = typeof O.start == "string" ? O.start : "", j = typeof O.end == "string" ? O.end : "";
        return !D && !j ? "" : D && j ? `${D} - ${j}` : D ? `>= ${D}` : `<= ${j}`;
      }
      return p == null ? "" : String(p);
    },
    [Se]
  );
  V.useEffect(() => {
    if (!M || typeof window > "u") return;
    const m = window.setTimeout(() => {
      var p, y, b;
      (p = _e.current) == null || p.focus(), (b = (y = _e.current) == null ? void 0 : y.select) == null || b.call(y);
    }, 0);
    return () => window.clearTimeout(m);
  }, [M]), V.useEffect(() => {
    if (!M || typeof window > "u") return;
    const m = () => {
      $e.current && yt($e.current.getBoundingClientRect());
    };
    return m(), window.addEventListener("resize", m), window.addEventListener("scroll", m, !0), () => {
      window.removeEventListener("resize", m), window.removeEventListener("scroll", m, !0);
    };
  }, [M]);
  const We = V.useMemo(
    () => n.map((m) => {
      const p = ge(m);
      return {
        id: p,
        accessorKey: typeof m.key == "string" ? m.key : void 0,
        header: m.label,
        cell: (y) => {
          const b = y.row.original;
          if (m.render)
            return m.render(b);
          const C = b == null ? void 0 : b[p];
          return oe(m, C);
        },
        enableSorting: m.sortable,
        meta: {
          align: m.align,
          width: m.width
        }
      };
    }),
    [n, oe, ge]
  ), Te = () => {
    var A;
    if (!(c != null && c.enabled) || !c.onColumnsChange || !c.onDataChange) return;
    const m = ve.trim();
    if (!m) return;
    const p = He || ((A = c.valueTypeOptions[0]) == null ? void 0 : A.value);
    if (!p) return;
    const y = nn(m) || `field_${n.length + 1}`, b = new Set(n.map((H) => ge(H)));
    let C = y, E = 1;
    for (; b.has(C); )
      C = `${y}_${E}`, E += 1;
    const O = [
      ...n,
      {
        key: C,
        label: m,
        sortable: !1,
        valueType: p
      }
    ], D = zt(p), j = t.map((H) => ({
      ...H,
      [C]: D
    }));
    c.onColumnsChange(O), c.onDataChange(j), ht(""), Oe(""), tt(!1);
  }, Ge = () => {
    if (!(c != null && c.enabled) || !c.onDataChange) return;
    const m = {};
    n.forEach((p) => {
      const y = ge(p), b = p.valueType ?? "";
      m[y] = zt(b);
    }), c.onDataChange([...t, m]);
  }, Ce = V.useCallback(
    (m, p) => {
      if (!(c != null && c.enabled) || !c.onDataChange) return;
      const y = re.get(m.columnId), b = Se(y == null ? void 0 : y.valueType), C = y == null ? void 0 : y.options, E = !!(C != null && C.length), O = E && b.includes("multi");
      let D = p;
      if (b === "boolean")
        D = typeof p == "boolean" ? p : !!p;
      else if (b === "number") {
        const A = typeof p == "string" ? p : String(p ?? "");
        if (A.trim() === "")
          D = "";
        else {
          const H = Number(A);
          D = Number.isFinite(H) ? H : A;
        }
      } else if (b === "number_range" || b === "range_number") {
        const A = p && typeof p == "object" ? p : {}, H = typeof A.min == "string" ? A.min : "", Re = typeof A.max == "string" ? A.max : "", be = H.trim() ? Number(H) : void 0, de = Re.trim() ? Number(Re) : void 0;
        D = {
          min: Number.isFinite(be) ? be : void 0,
          max: Number.isFinite(de) ? de : void 0
        };
      } else if (b === "date_range" || b === "datetime_range") {
        const A = p && typeof p == "object" ? p : {};
        D = {
          start: typeof A.start == "string" && A.start ? A.start : void 0,
          end: typeof A.end == "string" && A.end ? A.end : void 0
        };
      } else O ? Array.isArray(p) ? D = p : typeof p == "string" && p ? D = [p] : D = [] : D = typeof p == "string" ? p : String(p ?? "");
      const j = t.map((A, H) => r(A, H) !== m.rowKey ? A : {
        ...A,
        [m.columnId]: D
      });
      c.onDataChange(j);
    },
    [re, t, c, Se, r]
  ), ye = V.useCallback(() => {
    ot(null), yt(null), $e.current = null;
  }, []), Le = V.useRef(null), nt = V.useCallback(
    (m) => {
      if (!(c != null && c.enabled) || !c.onDataChange) return;
      const p = re.get(m.columnId), y = Se(p == null ? void 0 : p.valueType), b = p == null ? void 0 : p.options, C = !!(b != null && b.length), E = C && !y ? "option" : y, O = C && E.includes("multi");
      if (M && (M.rowKey !== m.rowKeyValue || M.columnId !== m.columnId) && Ce(M, k), $e.current = m.anchorEl, yt(m.anchorEl.getBoundingClientRect()), ot({ rowKey: m.rowKeyValue, columnId: m.columnId }), E === "boolean") {
        Q(!!m.rawValue);
        return;
      }
      if (E === "number") {
        Q(m.rawValue === null || m.rawValue === void 0 ? "" : String(m.rawValue));
        return;
      }
      if (E === "number_range" || E === "range_number") {
        const D = m.rawValue ?? {};
        Q({
          min: typeof D.min == "number" ? String(D.min) : "",
          max: typeof D.max == "number" ? String(D.max) : ""
        });
        return;
      }
      if (E === "date_range" || E === "datetime_range") {
        const D = m.rawValue ?? {};
        Q({
          start: typeof D.start == "string" ? D.start : "",
          end: typeof D.end == "string" ? D.end : ""
        });
        return;
      }
      if (O) {
        const D = Array.isArray(m.rawValue) && m.rawValue.every((j) => typeof j == "string") ? m.rawValue : [];
        Q(D);
        return;
      }
      if (C) {
        Q(typeof m.rawValue == "string" ? m.rawValue : "");
        return;
      }
      Q(m.rawValue === null || m.rawValue === void 0 ? "" : String(m.rawValue));
    },
    [re, Ce, c, M, k, Se]
  ), lt = V.useCallback(() => {
    M && (Ce(M, k), ye());
  }, [ye, Ce, M, k]), at = V.useCallback(() => {
    ye();
  }, [ye]);
  V.useEffect(() => {
    if (!M || typeof document > "u") return;
    const m = (p) => {
      const y = p.target;
      Le.current && Le.current.contains(y) || $e.current && $e.current.contains(y) || lt();
    };
    return document.addEventListener("mousedown", m, !0), () => document.removeEventListener("mousedown", m, !0);
  }, [lt, M]);
  const Ao = V.useMemo(() => {
    if (!M || !je || typeof document > "u") return null;
    const m = re.get(M.columnId), p = m == null ? void 0 : m.options, y = !!(p != null && p.length), b = Se(m == null ? void 0 : m.valueType), C = y && !b ? "option" : b, E = y && C.includes("multi"), O = typeof window < "u" ? window.innerWidth : 1024, D = C === "datetime" || C === "date" ? 320 : C === "date_range" || C === "datetime_range" ? 520 : 240, j = C === "date_range" || C === "datetime_range" ? 720 : 520, A = Math.min(Math.max(je.width, D), Math.min(j, O - 16)), H = Math.min(Math.max(0, je.left), Math.max(0, O - A)), Re = je.top, be = Math.max(0, Re), de = () => lt(), Ye = () => {
      const G = typeof k == "string" ? k : "";
      return /* @__PURE__ */ v.jsx("div", { className: "max-h-64 overflow-auto", children: (p ?? []).map((K) => {
        const ut = K.value === G;
        return /* @__PURE__ */ v.jsxs(
          "button",
          {
            type: "button",
            className: U(
              q(
                "flex w-full items-center justify-between gap-2 rounded-lg px-3 py-1.5 text-left text-text-secondary",
                "hover:bg-slate-50",
                ut && "bg-primary-50 font-medium"
              )
            ),
            onClick: () => {
              Q(K.value), Ce(M, K.value), ye();
            },
            children: [
              /* @__PURE__ */ v.jsx("span", { className: "truncate", children: K.label }),
              /* @__PURE__ */ v.jsx("span", { className: q("text-[11px]", ut ? "opacity-100" : "opacity-0"), children: "✓" })
            ]
          },
          K.value
        );
      }) });
    }, wt = () => {
      const G = Array.isArray(k) ? k : [];
      return /* @__PURE__ */ v.jsxs("div", { className: "max-h-64 overflow-auto", children: [
        (p ?? []).map((K) => {
          const ut = G.includes(K.value);
          return /* @__PURE__ */ v.jsxs(
            "button",
            {
              type: "button",
              className: U(
                q(
                  "flex w-full items-center justify-between gap-2 rounded-lg px-3 py-1.5 text-left text-text-secondary",
                  "hover:bg-slate-50",
                  ut && "bg-primary-50 font-medium"
                )
              ),
              onClick: () => {
                const jn = ut ? G.filter((ln) => ln !== K.value) : [...G, K.value];
                Q(jn);
              },
              children: [
                /* @__PURE__ */ v.jsx("span", { className: "truncate", children: K.label }),
                /* @__PURE__ */ v.jsx("span", { className: q("text-[11px]", ut ? "opacity-100" : "opacity-0"), children: "✓" })
              ]
            },
            K.value
          );
        }),
        /* @__PURE__ */ v.jsxs("div", { className: "mt-2 flex items-center justify-end gap-2", children: [
          /* @__PURE__ */ v.jsx(Ze, { size: "sm", onClick: de, children: "Lưu" }),
          /* @__PURE__ */ v.jsx(Ze, { variant: "secondary", size: "sm", onClick: at, children: "Huỷ" })
        ] })
      ] });
    }, sn = () => {
      const G = k && typeof k == "object" ? k : {};
      return /* @__PURE__ */ v.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ v.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
          /* @__PURE__ */ v.jsx(
            un,
            {
              ref: _e,
              type: "number",
              placeholder: "Từ",
              value: typeof G.min == "string" ? G.min : "",
              onChange: (K) => Q({ ...G, min: K.target.value }),
              onKeyDown: (K) => {
                K.key === "Enter" && de(), K.key === "Escape" && at();
              }
            }
          ),
          /* @__PURE__ */ v.jsx(
            un,
            {
              type: "number",
              placeholder: "Đến",
              value: typeof G.max == "string" ? G.max : "",
              onChange: (K) => Q({ ...G, max: K.target.value }),
              onKeyDown: (K) => {
                K.key === "Enter" && de(), K.key === "Escape" && at();
              }
            }
          )
        ] }),
        /* @__PURE__ */ v.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
          /* @__PURE__ */ v.jsx(Ze, { size: "sm", onClick: de, children: "Lưu" }),
          /* @__PURE__ */ v.jsx(Ze, { variant: "secondary", size: "sm", onClick: at, children: "Huỷ" })
        ] })
      ] });
    }, br = (G) => {
      const K = k && typeof k == "object" ? k : {}, ut = typeof K.start == "string" ? K.start : "", jn = typeof K.end == "string" ? K.end : "", ln = G === "date" ? Ir : Er;
      return /* @__PURE__ */ v.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ v.jsxs("div", { className: "grid grid-cols-1 gap-2 sm:grid-cols-2", children: [
          /* @__PURE__ */ v.jsx(
            ln,
            {
              inline: !0,
              value: ut,
              onValueChange: (An) => Q({ ...K, start: An || "" })
            }
          ),
          /* @__PURE__ */ v.jsx(
            ln,
            {
              inline: !0,
              value: jn,
              onValueChange: (An) => Q({ ...K, end: An || "" })
            }
          )
        ] }),
        /* @__PURE__ */ v.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
          /* @__PURE__ */ v.jsx(Ze, { size: "sm", onClick: de, children: "Lưu" }),
          /* @__PURE__ */ v.jsx(Ze, { variant: "secondary", size: "sm", onClick: at, children: "Huỷ" })
        ] })
      ] });
    };
    let Je = null;
    return C === "boolean" ? Je = /* @__PURE__ */ v.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ v.jsx("span", { className: "text-sm text-text-secondary", children: (m == null ? void 0 : m.label) ?? "" }),
      /* @__PURE__ */ v.jsx(
        ei,
        {
          checked: typeof k == "boolean" ? k : !1,
          onChange: (G) => {
            Q(G), Ce(M, G), ye();
          }
        }
      )
    ] }) : C === "date" ? Je = /* @__PURE__ */ v.jsx(
      Ir,
      {
        inline: !0,
        value: typeof k == "string" ? k : "",
        onValueChange: (G) => {
          Q(G), Ce(M, G), ye();
        }
      }
    ) : C === "datetime" ? Je = /* @__PURE__ */ v.jsx(
      Er,
      {
        inline: !0,
        value: typeof k == "string" ? k : "",
        onValueChange: (G) => {
          Q(G), Ce(M, G), ye();
        }
      }
    ) : C === "number_range" || C === "range_number" ? Je = sn() : C === "date_range" ? Je = br("date") : C === "datetime_range" ? Je = br("datetime") : y && E ? Je = wt() : y ? Je = Ye() : Je = /* @__PURE__ */ v.jsx(
      un,
      {
        ref: _e,
        className: "h-8",
        type: C === "number" ? "number" : "text",
        value: typeof k == "string" ? k : "",
        onChange: (G) => Q(G.target.value),
        onKeyDown: (G) => {
          G.key === "Enter" && (G.preventDefault(), de()), G.key === "Escape" && (G.preventDefault(), at());
        }
      }
    ), Jr(
      /* @__PURE__ */ v.jsx(
        "div",
        {
          ref: Le,
          tabIndex: -1,
          className: "fixed z-50",
          style: {
            top: be,
            left: H,
            width: A
          },
          onKeyDown: (G) => {
            G.key === "Escape" && (G.preventDefault(), at());
          },
          children: /* @__PURE__ */ v.jsx("div", { className: "rounded-2xl border border-slate-200 bg-surface p-3 shadow-xl", children: Je })
        }
      ),
      document.body
    );
  }, [
    at,
    ye,
    re,
    lt,
    Ce,
    M,
    k,
    je,
    Se
  ]), xt = sa({
    data: t,
    columns: We,
    state: {
      sorting: ze,
      columnVisibility: Dt,
      pagination: It,
      columnSizing: it
    },
    onSortingChange: (m) => {
      const p = typeof m == "function" ? m(ze) : m;
      I || St(p), F == null || F(p);
      const y = p[0], b = y ? y.desc ? "desc" : "asc" : "none";
      y ? ae(
        vn.UI_CLICK,
        { column: y.id, direction: b, instanceId: ie },
        { meta: { component: "Table", instanceId: ie } }
      ) : ae(
        vn.UI_CLICK,
        { column: "all", direction: b, instanceId: ie },
        { meta: { component: "Table", instanceId: ie } }
      ), ae(
        "TABLE.SORT_CHANGE",
        {
          sorting: p,
          primaryColumn: (y == null ? void 0 : y.id) ?? null,
          direction: b,
          instanceId: ie
        },
        { meta: { component: "Table", instanceId: ie } }
      );
    },
    onPaginationChange: Pn,
    onColumnSizingChange: st,
    enableColumnResizing: g,
    columnResizeMode: "onChange",
    enableMultiSort: f,
    isMultiSortEvent: f ? () => !0 : void 0,
    getCoreRowModel: Ql(),
    getSortedRowModel: na(),
    getPaginationRowModel: ta()
  }), Xe = xt.getRowModel(), zo = V.useMemo(() => ee ? Xe.rows.map((m) => r(m.original, m.index)) : [], [ee, r, Xe.rows]), Ft = V.useMemo(() => Xe.rows.map((m) => r(m.original, m.index)), [r, Xe.rows]), To = se && Ft.some((m) => Me.includes(m)), $n = se && Ft.length > 0 && Ft.every((m) => Me.includes(m)), mr = To && !$n, Lo = se && Me.length > 0, ko = () => {
    if (!se || Ft.length === 0) return;
    if ($n) {
      _t(Me.filter((p) => !Ft.includes(p)));
      return;
    }
    const m = Array.from(/* @__PURE__ */ new Set([...Me, ...Ft]));
    _t(m);
  }, vr = xt.getPageCount() || 1, on = It.pageIndex + 1;
  V.useEffect(() => {
    R == null || R(on);
  }, [on, R]);
  const Ho = (m) => {
    if (!Number.isFinite(m)) return;
    const p = Math.min(Math.max(1, m), vr);
    xt.setPageIndex(p - 1), ae(
      "TABLE.PAGE_CHANGE",
      { page: p, pageSize: It.pageSize, instanceId: ie },
      { meta: { component: "Table", instanceId: ie } }
    );
  }, Vn = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base"
  }, On = (m, p) => {
    if (!a) return;
    const y = r(m, p);
    ae(
      vn.UI_CLICK,
      { rowKey: y, instanceId: ie },
      { meta: { component: "Table", instanceId: ie } }
    ), ae(
      "TABLE.ROW_CLICK",
      { rowKey: y, rowIndex: p, instanceId: ie },
      { meta: { component: "Table", instanceId: ie } }
    ), a(m);
  }, xr = It.pageSize, wr = !!xr, Go = (m) => {
    const p = Number(m);
    !Number.isFinite(p) || p <= 0 || (xt.setPageSize(p), xt.setPageIndex(0), ae(
      "TABLE.PAGE_SIZE_CHANGE",
      { pageSize: p, instanceId: ie },
      { meta: { component: "Table", instanceId: ie } }
    ));
  }, Sr = V.useRef(null), Cr = hi({
    count: _ ? Xe.rows.length : 0,
    getScrollElement: () => Sr.current,
    estimateSize: () => z,
    overscan: T
  }), Nt = _ ? Cr.getVirtualItems() : [], Bo = _ ? Cr.getTotalSize() : 0, yr = _ && Nt.length > 0 ? Nt[0].start : 0, Rr = _ && Nt.length > 0 ? Bo - Nt[Nt.length - 1].end : 0, qo = u || _;
  return /* @__PURE__ */ v.jsxs("div", { className: "w-full rounded-2xl bg-surface", children: [
    Ao,
    me && /* @__PURE__ */ v.jsx("div", { className: "border-b border-slate-200 px-4 py-3", children: et ? /* @__PURE__ */ v.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ v.jsx(
        un,
        {
          className: "h-8",
          fullWidth: !1,
          placeholder: (c == null ? void 0 : c.columnNamePlaceholder) ?? "Tên thuộc tính",
          value: ve,
          onChange: (m) => ht(m.target.value)
        }
      ),
      /* @__PURE__ */ v.jsx(
        Dr,
        {
          className: "h-8",
          fullWidth: !1,
          compact: !0,
          mode: "ghost",
          placeholder: (c == null ? void 0 : c.valueTypePlaceholder) ?? "Kiểu giá trị",
          options: c.valueTypeOptions,
          value: He,
          onValueChange: Oe
        }
      ),
      /* @__PURE__ */ v.jsx(Ze, { size: "sm", onClick: Te, children: "Thêm" }),
      /* @__PURE__ */ v.jsx(Ze, { variant: "secondary", size: "sm", onClick: () => tt(!1), children: "Huỷ" })
    ] }) : /* @__PURE__ */ v.jsx(Ze, { variant: "ghost", size: "sm", onClick: () => tt(!0), children: (c == null ? void 0 : c.addColumnLabel) ?? "+ Thêm cột" }) }),
    /* @__PURE__ */ v.jsx(
      "div",
      {
        className: q(
          "w-full overflow-hidden",
          wr ? "rounded-t-2xl" : "rounded-2xl"
        ),
        children: /* @__PURE__ */ v.jsx(
          ti,
          {
            ref: Sr,
            direction: "both",
            autoHide: _,
            className: "w-full",
            style: _ ? { maxHeight: W } : void 0,
            children: /* @__PURE__ */ v.jsxs(
              "table",
              {
                className: U(q("w-full border-collapse text-left", g && "table-fixed", e)),
                style: g ? { width: xt.getTotalSize() } : void 0,
                ...Pe,
                children: [
                  /* @__PURE__ */ v.jsx("thead", { className: U(qo && "sticky top-0 z-10 bg-surface"), children: xt.getHeaderGroups().map((m) => /* @__PURE__ */ v.jsxs("tr", { children: [
                    Ee && /* @__PURE__ */ v.jsx(
                      "th",
                      {
                        className: "group px-2 py-3",
                        style: { width: Et },
                        children: se && /* @__PURE__ */ v.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
                          vt && /* @__PURE__ */ v.jsx("span", { className: "inline-flex h-6 w-6", "aria-hidden": !0 }),
                          ne && /* @__PURE__ */ v.jsx("span", { className: "inline-flex h-6 w-6", "aria-hidden": !0 }),
                          /* @__PURE__ */ v.jsx(
                            "div",
                            {
                              className: U(
                                q(
                                  "inline-flex h-6 w-6 items-center justify-center",
                                  Lo ? "opacity-100" : "pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100"
                                )
                              ),
                              onClick: (p) => p.stopPropagation(),
                              children: /* @__PURE__ */ v.jsx(
                                cn,
                                {
                                  checked: $n || mr,
                                  indeterminate: mr,
                                  onChange: ko
                                }
                              )
                            }
                          )
                        ] })
                      },
                      `${m.id}::row-actions`
                    ),
                    m.headers.map((p) => {
                      if (p.isPlaceholder) return null;
                      const y = p.column.columnDef.meta, b = y == null ? void 0 : y.align, C = p.column.getIsSorted();
                      let E = null;
                      p.column.getCanSort() && d && (E = C ? C === "asc" ? "↑" : "↓" : "⇅");
                      const O = mt === p.column.id;
                      return /* @__PURE__ */ v.jsxs(
                        "th",
                        {
                          onClick: p.column.getCanSort() ? p.column.getToggleSortingHandler() : void 0,
                          className: U(
                            q(
                              "relative cursor-pointer select-none px-4 py-3 text-xs font-semibold uppercase tracking-wide text-text-secondary",
                              b === "center" && "text-center",
                              b === "right" && "text-right"
                            )
                          ),
                          style: { width: g ? p.getSize() : y == null ? void 0 : y.width },
                          children: [
                            /* @__PURE__ */ v.jsxs("span", { className: "inline-flex items-center gap-1", children: [
                              mn(p.column.columnDef.header, p.getContext()),
                              E && /* @__PURE__ */ v.jsx("span", { className: "text-text-muted", children: E })
                            ] }),
                            g && p.column.getCanResize() && /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
                              /* @__PURE__ */ v.jsx(
                                "div",
                                {
                                  className: U(
                                    q(
                                      "absolute right-0 top-0 h-full w-3 cursor-col-resize select-none touch-none",
                                      O && "bg-primary-100/60"
                                    )
                                  ),
                                  onMouseDown: p.getResizeHandler(),
                                  onTouchStart: p.getResizeHandler(),
                                  onMouseEnter: () => At(p.column.id),
                                  onMouseLeave: () => At((D) => D === p.column.id ? null : D),
                                  onClick: (D) => D.stopPropagation()
                                }
                              ),
                              O && /* @__PURE__ */ v.jsx("div", { className: "pointer-events-none absolute right-0 top-0 h-[200vh] w-px bg-primary-400" })
                            ] })
                          ]
                        },
                        p.id
                      );
                    })
                  ] }, m.id)) }),
                  /* @__PURE__ */ v.jsxs("tbody", { children: [
                    Xe.rows.length === 0 && /* @__PURE__ */ v.jsx("tr", { children: /* @__PURE__ */ v.jsx("td", { colSpan: n.length + Mt, className: "px-4 py-6 text-center text-sm text-text-muted", children: l }) }),
                    Xe.rows.length > 0 && (_ ? /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
                      yr > 0 && /* @__PURE__ */ v.jsx("tr", { "aria-hidden": !0, style: { height: yr }, children: /* @__PURE__ */ v.jsx("td", { colSpan: n.length + Mt }) }),
                      Nt.map((m) => {
                        const p = Xe.rows[m.index], y = r(p.original, p.index), b = Me.includes(y);
                        return /* @__PURE__ */ v.jsxs(
                          "tr",
                          {
                            onClick: () => On(p.original, p.index),
                            className: U(
                              q(
                                Vn[o],
                                "group px-4 text-text-primary transition-colors",
                                Ae === "striped" && p.index % 2 === 1 && "bg-surface-alt",
                                Ae === "plain" && "bg-surface",
                                Ae === "bordered" && "border-b border-slate-100",
                                a && "cursor-pointer hover:bg-primary-50",
                                b && "bg-primary-50"
                              )
                            ),
                            children: [
                              Ee && /* @__PURE__ */ v.jsx(
                                "td",
                                {
                                  className: "px-2 py-3 align-middle",
                                  style: { width: Et },
                                  onClick: (C) => C.stopPropagation(),
                                  children: /* @__PURE__ */ v.jsxs("div", { className: "flex items-center gap-1", children: [
                                    vt && /* @__PURE__ */ v.jsx(
                                      "button",
                                      {
                                        type: "button",
                                        className: U(
                                          q(
                                            "inline-flex h-6 w-6 items-center justify-center rounded-md hover:bg-slate-100",
                                            "pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100"
                                          )
                                        ),
                                        onClick: () => ce(r(p.original, p.index)),
                                        children: /* @__PURE__ */ v.jsx(Tn, { className: "h-4 w-4 text-text-muted" })
                                      }
                                    ),
                                    ne && /* @__PURE__ */ v.jsx(
                                      "span",
                                      {
                                        className: U(
                                          q(
                                            "inline-flex h-6 w-6 items-center justify-center rounded-md text-text-muted opacity-40",
                                            "pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100"
                                          )
                                        ),
                                        children: /* @__PURE__ */ v.jsx(zn, { className: "h-4 w-4" })
                                      }
                                    ),
                                    se && /* @__PURE__ */ v.jsx(
                                      "div",
                                      {
                                        className: U(
                                          q(
                                            "inline-flex h-6 w-6 items-center justify-center",
                                            b ? "opacity-100" : "pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100"
                                          )
                                        ),
                                        onClick: (C) => C.stopPropagation(),
                                        children: /* @__PURE__ */ v.jsx(
                                          cn,
                                          {
                                            checked: b,
                                            onChange: (C) => {
                                              C.stopPropagation(), Lt(y);
                                            }
                                          }
                                        )
                                      }
                                    )
                                  ] })
                                }
                              ),
                              p.getVisibleCells().map((C) => {
                                var Ye, wt;
                                const E = C.column.columnDef.meta, O = E == null ? void 0 : E.align, D = r(p.original, p.index), j = C.column.id, A = re.get(j), H = !!((Ye = A == null ? void 0 : A.options) != null && Ye.length), Re = (A == null ? void 0 : A.valueType) ?? "", be = me && (!!Re || H), de = be ? (wt = p.original) == null ? void 0 : wt[j] : void 0;
                                return /* @__PURE__ */ v.jsx(
                                  "td",
                                  {
                                    onClick: (sn) => {
                                      be && (sn.stopPropagation(), nt({
                                        rowKeyValue: D,
                                        columnId: j,
                                        rawValue: de,
                                        anchorEl: sn.currentTarget
                                      }));
                                    },
                                    className: U(
                                      q(
                                        "px-4 py-3 align-middle text-sm text-text-secondary",
                                        be && "cursor-text",
                                        O === "center" && "text-center",
                                        O === "right" && "text-right"
                                      )
                                    ),
                                    style: { width: g ? C.column.getSize() : E == null ? void 0 : E.width },
                                    children: mn(C.column.columnDef.cell, C.getContext())
                                  },
                                  C.id
                                );
                              })
                            ]
                          },
                          y
                        );
                      }),
                      Rr > 0 && /* @__PURE__ */ v.jsx("tr", { "aria-hidden": !0, style: { height: Rr }, children: /* @__PURE__ */ v.jsx("td", { colSpan: n.length + Mt }) })
                    ] }) : ee ? /* @__PURE__ */ v.jsx(Ns, { sensors: xe, collisionDetection: ji, onDragEnd: we, children: /* @__PURE__ */ v.jsx(tl, { items: zo, strategy: Qs, children: Xe.rows.map((m) => {
                      const p = r(m.original, m.index), y = Me.includes(p);
                      return /* @__PURE__ */ v.jsx(
                        Fe,
                        {
                          row: m,
                          rowKeyValue: p,
                          className: U(
                            q(
                              Vn[o],
                              "group px-4 text-text-primary transition-colors",
                              Ae === "striped" && m.index % 2 === 1 && "bg-surface-alt",
                              Ae === "plain" && "bg-surface",
                              Ae === "bordered" && "border-b border-slate-100",
                              a && "cursor-pointer hover:bg-primary-50",
                              y && "bg-primary-50"
                            )
                          ),
                          children: m.getVisibleCells().map((b) => {
                            var be, de;
                            const C = b.column.columnDef.meta, E = C == null ? void 0 : C.align, O = b.column.id, D = re.get(O), j = !!((be = D == null ? void 0 : D.options) != null && be.length), A = (D == null ? void 0 : D.valueType) ?? "", H = me && (!!A || j), Re = H ? (de = m.original) == null ? void 0 : de[O] : void 0;
                            return /* @__PURE__ */ v.jsx(
                              "td",
                              {
                                onClick: (Ye) => {
                                  H && (Ye.stopPropagation(), nt({
                                    rowKeyValue: p,
                                    columnId: O,
                                    rawValue: Re,
                                    anchorEl: Ye.currentTarget
                                  }));
                                },
                                className: U(
                                  q(
                                    "px-4 py-3 align-middle text-sm text-text-secondary",
                                    H && "cursor-text",
                                    E === "center" && "text-center",
                                    E === "right" && "text-right"
                                  )
                                ),
                                style: { width: g ? b.column.getSize() : C == null ? void 0 : C.width },
                                children: mn(b.column.columnDef.cell, b.getContext())
                              },
                              b.id
                            );
                          })
                        },
                        p
                      );
                    }) }) }) : Xe.rows.map((m, p) => {
                      const y = r(m.original, p), b = Me.includes(y);
                      return /* @__PURE__ */ v.jsxs(
                        "tr",
                        {
                          onClick: () => On(m.original, p),
                          className: U(
                            q(
                              Vn[o],
                              "group px-4 text-text-primary transition-colors",
                              Ae === "striped" && p % 2 === 1 && "bg-surface-alt",
                              Ae === "plain" && "bg-surface",
                              Ae === "bordered" && "border-b border-slate-100",
                              a && "cursor-pointer hover:bg-primary-50",
                              b && "bg-primary-50"
                            )
                          ),
                          children: [
                            Ee && /* @__PURE__ */ v.jsx(
                              "td",
                              {
                                className: "px-2 py-3 align-middle",
                                style: { width: Et },
                                onClick: (C) => C.stopPropagation(),
                                children: /* @__PURE__ */ v.jsxs("div", { className: "flex items-center gap-1", children: [
                                  vt && /* @__PURE__ */ v.jsx(
                                    "button",
                                    {
                                      type: "button",
                                      className: U(
                                        q(
                                          "inline-flex h-6 w-6 items-center justify-center rounded-md hover:bg-slate-100",
                                          "pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100"
                                        )
                                      ),
                                      onClick: () => ce(y),
                                      children: /* @__PURE__ */ v.jsx(Tn, { className: "h-4 w-4 text-text-muted" })
                                    }
                                  ),
                                  ne && /* @__PURE__ */ v.jsx(
                                    "span",
                                    {
                                      className: U(
                                        q(
                                          "inline-flex h-6 w-6 items-center justify-center rounded-md text-text-muted opacity-40",
                                          "pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100"
                                        )
                                      ),
                                      children: /* @__PURE__ */ v.jsx(zn, { className: "h-4 w-4" })
                                    }
                                  ),
                                  se && /* @__PURE__ */ v.jsx(
                                    "div",
                                    {
                                      className: U(
                                        q(
                                          "inline-flex h-6 w-6 items-center justify-center",
                                          b ? "opacity-100" : "pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100"
                                        )
                                      ),
                                      onClick: (C) => C.stopPropagation(),
                                      children: /* @__PURE__ */ v.jsx(
                                        cn,
                                        {
                                          checked: b,
                                          onChange: (C) => {
                                            C.stopPropagation(), Lt(y);
                                          }
                                        }
                                      )
                                    }
                                  )
                                ] })
                              }
                            ),
                            m.getVisibleCells().map((C) => {
                              var de, Ye;
                              const E = C.column.columnDef.meta, O = E == null ? void 0 : E.align, D = C.column.id, j = re.get(D), A = !!((de = j == null ? void 0 : j.options) != null && de.length), H = (j == null ? void 0 : j.valueType) ?? "", Re = me && (!!H || A), be = Re ? (Ye = m.original) == null ? void 0 : Ye[D] : void 0;
                              return /* @__PURE__ */ v.jsx(
                                "td",
                                {
                                  onClick: (wt) => {
                                    Re && (wt.stopPropagation(), nt({
                                      rowKeyValue: y,
                                      columnId: D,
                                      rawValue: be,
                                      anchorEl: wt.currentTarget
                                    }));
                                  },
                                  className: U(
                                    q(
                                      "px-4 py-3 align-middle text-sm text-text-secondary",
                                      Re && "cursor-text",
                                      O === "center" && "text-center",
                                      O === "right" && "text-right"
                                    )
                                  ),
                                  style: { width: g ? C.column.getSize() : E == null ? void 0 : E.width },
                                  children: mn(C.column.columnDef.cell, C.getContext())
                                },
                                C.id
                              );
                            })
                          ]
                        },
                        y
                      );
                    })),
                    me && !_ && /* @__PURE__ */ v.jsx("tr", { children: /* @__PURE__ */ v.jsx("td", { colSpan: n.length + Mt, className: "px-4 py-3", children: /* @__PURE__ */ v.jsx(Ze, { variant: "ghost", size: "sm", onClick: Ge, children: (c == null ? void 0 : c.addRowLabel) ?? "+ Thêm hàng" }) }) })
                  ] })
                ]
              }
            )
          }
        )
      }
    ),
    wr && /* @__PURE__ */ v.jsxs("div", { className: "flex items-center justify-between border-t border-slate-200 px-4 py-3 text-xs text-text-muted", children: [
      /* @__PURE__ */ v.jsxs("div", { className: "flex items-center gap-6", children: [
        /* @__PURE__ */ v.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ v.jsx("span", { children: Z }),
          /* @__PURE__ */ v.jsx(
            Dr,
            {
              className: "h-7 w-[72px] text-xs",
              fullWidth: !1,
              compact: !0,
              hideCaret: !0,
              mode: "ghost",
              dropdownPlacement: "bottom",
              options: Rt.map((m) => ({
                label: String(m),
                value: String(m)
              })),
              value: String(xr),
              onValueChange: Go
            }
          )
        ] }),
        /* @__PURE__ */ v.jsxs("span", { children: [
          B,
          " ",
          /* @__PURE__ */ v.jsx("span", { className: "font-medium", children: on })
        ] })
      ] }),
      /* @__PURE__ */ v.jsx(
        Qo,
        {
          currentPage: on,
          totalPages: vr,
          onPageChange: Ho,
          variant: "icon"
        }
      )
    ] })
  ] });
}
la.displayName = "Table";
const aa = {
  none: "p-0",
  sm: "p-3",
  md: "p-5",
  lg: "p-8"
}, ua = V.forwardRef(
  ({
    className: e,
    title: n,
    subtitle: t,
    footer: r,
    actions: o,
    padding: i = "md",
    media: s,
    mediaPosition: l = "top",
    highlight: a,
    compact: u = !1,
    children: d,
    ...f
  }, c) => {
    const g = () => !n && !t && !o && !a ? null : /* @__PURE__ */ v.jsxs("div", { className: "flex items-start justify-between gap-3 px-5 pt-5", children: [
      /* @__PURE__ */ v.jsxs("div", { className: "space-y-1", children: [
        a && /* @__PURE__ */ v.jsx("div", { className: "text-xs font-semibold text-primary-500", children: a }),
        n && /* @__PURE__ */ v.jsx("h3", { className: "text-lg font-semibold text-text-primary", children: n }),
        t && /* @__PURE__ */ v.jsx("p", { className: "text-sm text-text-muted", children: t })
      ] }),
      o && /* @__PURE__ */ v.jsx("div", { className: "flex items-center gap-2", children: o })
    ] }), h = () => /* @__PURE__ */ v.jsx(
      "div",
      {
        className: U(
          q("text-sm text-text-primary", aa[i], u && "text-xs")
        ),
        children: d
      }
    );
    return /* @__PURE__ */ v.jsxs(
      "div",
      {
        ref: c,
        className: U(
          q(
            "flex flex-col gap-4 rounded-2xl bg-surface p-0 shadow-none ring-1 ring-transparent",
            e
          )
        ),
        ...f,
        children: [
          s && l === "top" && /* @__PURE__ */ v.jsx("div", { className: "overflow-hidden rounded-t-2xl bg-surface-alt", children: s }),
          l === "left" && s ? /* @__PURE__ */ v.jsxs("div", { className: "flex flex-col gap-4 p-5 lg:flex-row", children: [
            /* @__PURE__ */ v.jsx("div", { className: "w-full rounded-2xl bg-surface-alt p-3 lg:w-1/3", children: s }),
            /* @__PURE__ */ v.jsxs("div", { className: "flex-1 space-y-4", children: [
              g(),
              h()
            ] })
          ] }) : /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
            g(),
            h()
          ] }),
          r && /* @__PURE__ */ v.jsx("div", { className: "px-5 pb-5 text-sm text-text-secondary", children: r })
        ]
      }
    );
  }
);
ua.displayName = "Card";
export {
  ua as C,
  Ns as D,
  zn as G,
  ar as K,
  vi as L,
  Tn as P,
  xi as S,
  la as T,
  $i as a,
  Vr as b,
  ji as c,
  tl as d,
  cr as e,
  al as f,
  ft as g,
  As as h,
  Sa as i,
  Bs as j,
  gr as k,
  dl as s,
  hi as u,
  Qs as v
};
