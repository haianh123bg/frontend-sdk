import { j as e } from "./jsx-runtime-DGlMoOmv.js";
import * as i from "react";
import { t as y, c as x } from "./bundle-mjs-C7_IOFkA.js";
import { b as X, E as P } from "./types-CglsW3cy.js";
import { c as ke, I as fe } from "./createLucideIcon-CKrNh_SW.js";
import { I as we } from "./Icon-M9fKXJ9V.js";
import { C as De, a as Se } from "./chevron-left-BSNIzxpu.js";
const Ce = i.forwardRef(
  ({ className: n, variant: r = "primary", size: a = "md", fullWidth: u, isLoading: o, icon: f, onClick: l, children: p, ...b }, c) => {
    const D = X(), z = "inline-flex items-center justify-center rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50", E = {
      primary: "bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700",
      secondary: "bg-surface-alt text-text-primary hover:bg-slate-200 active:bg-slate-300",
      ghost: "hover:bg-slate-100 text-text-secondary hover:text-text-primary",
      danger: "bg-red-500 text-white hover:bg-red-600 active:bg-red-700"
    }, _ = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-8 text-base"
    }, j = ($) => {
      D(P.UI_CLICK, { component: "Button", variant: r }, { meta: { component: "Button" } }), l == null || l($);
    };
    return /* @__PURE__ */ e.jsxs(
      "button",
      {
        ref: c,
        className: y(
          x(
            z,
            E[r],
            _[a],
            u && "w-full",
            n
          )
        ),
        onClick: j,
        ...b,
        children: [
          o && /* @__PURE__ */ e.jsx("span", { className: "mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" }),
          f && /* @__PURE__ */ e.jsx("span", { className: x("inline-flex shrink-0", p ? "mr-2" : void 0), children: f }),
          p
        ]
      }
    );
  }
);
Ce.displayName = "Button";
const Ie = i.forwardRef(
  ({ className: n, type: r, error: a, fullWidth: u = !0, onChange: o, onBlur: f, ...l }, p) => {
    const b = X(), c = (D) => {
      b(P.UI_CHANGE, { value: D.target.value }, {
        meta: { component: "Input", type: r },
        flags: { sensitive: r === "password" || r === "email" }
      }), o == null || o(D);
    };
    return /* @__PURE__ */ e.jsx(
      "input",
      {
        ref: p,
        type: r,
        className: y(
          x(
            "flex h-10 w-full rounded-xl bg-surface-alt px-3 py-2 text-sm placeholder:text-text-muted",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "transition-all duration-200",
            a && "ring-2 ring-red-500 focus-visible:ring-red-500",
            u ? "w-full" : "w-auto",
            n
          )
        ),
        onChange: c,
        onBlur: f,
        ...l
      }
    );
  }
);
Ie.displayName = "Input";
const Ee = i.forwardRef(
  ({ className: n, label: r, error: a, variant: u = "primary", indeterminate: o, onChange: f, id: l, checked: p, ...b }, c) => {
    const D = X(), z = i.useId(), E = l || z, _ = i.useRef(null), j = p !== void 0 ? { checked: p } : {};
    i.useEffect(() => {
      _.current && (_.current.indeterminate = !!o);
    }, [o]);
    const $ = (M) => {
      if (_.current = M, !!c) {
        if (typeof c == "function") {
          c(M);
          return;
        }
        c.current = M;
      }
    }, F = (M) => {
      D(
        P.UI_CHANGE,
        { checked: M.target.checked, value: M.target.value },
        { meta: { component: "Checkbox" } }
      ), f == null || f(M);
    }, T = a ? "accent-red-500 focus-visible:ring-red-500" : {
      primary: "accent-primary-500 focus-visible:ring-primary-500",
      success: "accent-green-500 focus-visible:ring-green-500",
      warning: "accent-amber-500 focus-visible:ring-amber-500",
      danger: "accent-red-500 focus-visible:ring-red-500",
      info: "accent-blue-500 focus-visible:ring-blue-500"
    }[u];
    return u === "primary" ? /* @__PURE__ */ e.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ e.jsxs("label", { htmlFor: E, className: "flex items-center gap-2 cursor-pointer select-none", children: [
      /* @__PURE__ */ e.jsxs("span", { className: "relative inline-flex items-center justify-center", children: [
        /* @__PURE__ */ e.jsx(
          "input",
          {
            ref: $,
            type: "checkbox",
            id: E,
            className: y(
              x(
                "peer sr-only",
                "focus-visible:outline-none",
                "disabled:cursor-not-allowed disabled:opacity-50",
                n
              )
            ),
            onChange: F,
            ...j,
            ...b
          }
        ),
        /* @__PURE__ */ e.jsx(
          "span",
          {
            className: x(
              "h-4 w-4 rounded border border-slate-300 bg-surface-alt",
              "transition-all duration-200",
              "peer-checked:bg-[linear-gradient(135deg,#0EA5E9,#0284C7)]",
              "peer-checked:border-transparent",
              o && "bg-[linear-gradient(135deg,#0EA5E9,#0284C7)] border-transparent",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-primary-500",
              "peer-disabled:opacity-50 peer-disabled:cursor-not-allowed",
              a && "border-red-500"
            )
          }
        ),
        /* @__PURE__ */ e.jsx(
          "svg",
          {
            viewBox: "0 0 16 16",
            className: x(
              "pointer-events-none absolute h-3 w-3 text-white opacity-0 transition-opacity duration-150",
              "peer-checked:opacity-100",
              o && "opacity-100"
            ),
            "aria-hidden": "true",
            children: o ? /* @__PURE__ */ e.jsx(
              "line",
              {
                x1: "4",
                y1: "8",
                x2: "12",
                y2: "8",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: 2,
                strokeLinecap: "round"
              }
            ) : /* @__PURE__ */ e.jsx(
              "polyline",
              {
                points: "3.5 8.5 6.5 11.5 12.5 4.5",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: 2,
                strokeLinecap: "round",
                strokeLinejoin: "round"
              }
            )
          }
        )
      ] }),
      r && /* @__PURE__ */ e.jsx("span", { className: "text-sm font-medium text-text-primary", children: r })
    ] }) }) : /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ e.jsx(
        "input",
        {
          ref: $,
          type: "checkbox",
          id: E,
          className: y(
            x(
              "h-4 w-4 cursor-pointer rounded bg-surface-alt border border-slate-300",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "transition-all duration-200",
              T,
              a && "border-red-500",
              n
            )
          ),
          onChange: F,
          ...j,
          ...b
        }
      ),
      r && /* @__PURE__ */ e.jsx(
        "label",
        {
          htmlFor: E,
          className: "cursor-pointer text-sm font-medium text-text-primary select-none",
          children: r
        }
      )
    ] });
  }
);
Ee.displayName = "Checkbox";
const ee = i.forwardRef(
  ({ className: n, autoHide: r = !1, direction: a = "vertical", children: u, ...o }, f) => {
    const l = a === "vertical" ? "overflow-y-auto overflow-x-hidden" : a === "horizontal" ? "overflow-x-auto overflow-y-hidden" : "overflow-auto", p = r ? (
      // Ẩn scrollbar trên các trình duyệt phổ biến, vẫn scroll được
      "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
    ) : "", b = (c) => {
      a === "horizontal" && c.currentTarget && c.deltaY !== 0 && (c.preventDefault(), c.currentTarget.scrollLeft += c.deltaY);
    };
    return /* @__PURE__ */ e.jsx(
      "div",
      {
        ref: f,
        className: y(x("relative", l, p, n)),
        onWheel: b,
        ...o,
        children: u
      }
    );
  }
);
ee.displayName = "Scroll";
const $e = i.forwardRef(
  ({
    className: n,
    options: r,
    placeholder: a,
    error: u,
    fullWidth: o = !0,
    disabled: f = !1,
    value: l,
    defaultValue: p = "",
    compact: b = !1,
    hideCaret: c = !1,
    mode: D,
    variant: z = "filled",
    dropdownPlacement: E = "bottom",
    autoOpen: _ = !1,
    dropdownScrollProps: j,
    onValueChange: $,
    name: F,
    id: A,
    onChange: T,
    ...M
  }, te) => {
    const J = X(), [h, O] = i.useState(!1), [R, N] = i.useState(p), C = i.useRef(null), v = l ?? R, k = r.find((g) => g.value === v), S = D ?? z, I = (j == null ? void 0 : j.autoHide) ?? !0, H = j == null ? void 0 : j.className, { autoHide: L, className: U, ...G } = j ?? {}, W = (g) => {
      f || (l === void 0 && N(g), J(
        P.UI_CHANGE,
        { value: g },
        { meta: { component: "Select" } }
      ), T && T({
        target: { value: g, name: F }
      }), $ == null || $(g), O(!1));
    };
    return i.useEffect(() => {
      if (!h) return;
      const g = (Y) => {
        C.current && (C.current.contains(Y.target) || O(!1));
      };
      return document.addEventListener("mousedown", g), () => document.removeEventListener("mousedown", g);
    }, [h]), i.useEffect(() => {
      _ && !h && !f && O(!0);
    }, [_, h, f]), /* @__PURE__ */ e.jsxs(
      "div",
      {
        ref: C,
        className: y(
          x(
            "relative text-sm",
            o ? "w-full" : "w-auto",
            f && "opacity-60 cursor-not-allowed",
            n
          )
        ),
        children: [
          /* @__PURE__ */ e.jsx(
            "input",
            {
              ref: te,
              type: "hidden",
              name: F,
              id: A ?? F,
              value: v ?? "",
              ...M
            }
          ),
          /* @__PURE__ */ e.jsxs(
            "button",
            {
              type: "button",
              onClick: () => !f && O((g) => !g),
              className: y(
                x(
                  "flex w-full items-center justify-between",
                  S === "filled" && "rounded-xl bg-surface-alt px-3 py-2",
                  S === "ghost" && "rounded-lg bg-transparent px-1 py-1 hover:bg-slate-50",
                  "text-left",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100",
                  "transition-all duration-200",
                  !f && "cursor-pointer",
                  u && "bg-red-50 text-red-700 focus-visible:ring-red-100",
                  b && S === "filled" && "h-8 rounded-lg px-2 text-xs",
                  b && S === "ghost" && "h-7 text-xs"
                )
              ),
              children: [
                /* @__PURE__ */ e.jsx("span", { className: x("truncate", !k && "text-text-muted"), children: (k == null ? void 0 : k.label) ?? a ?? "Select..." }),
                !c && /* @__PURE__ */ e.jsx(
                  "span",
                  {
                    className: x(
                      "ml-2 text-xs text-text-muted transition-transform",
                      h && "rotate-180"
                    ),
                    children: "▼"
                  }
                )
              ]
            }
          ),
          h && !f && /* @__PURE__ */ e.jsx(
            "div",
            {
              className: y(
                x(
                  "absolute z-50 rounded-xl bg-surface shadow-lg outline-none overflow-hidden",
                  E === "top" ? "bottom-full mb-1" : "mt-1",
                  // giữ tối thiểu bằng trigger nhưng cho phép nở theo nội dung
                  "min-w-full w-max max-w-[min(420px,calc(100vw-24px))]"
                )
              ),
              children: /* @__PURE__ */ e.jsx(
                ee,
                {
                  direction: "vertical",
                  autoHide: I,
                  className: y("max-h-60 py-1 text-sm", H),
                  ...G,
                  children: /* @__PURE__ */ e.jsxs("ul", { children: [
                    a && /* @__PURE__ */ e.jsx("li", { className: "px-3 py-2 text-text-muted", children: a }),
                    r.map((g) => {
                      const Y = g.value === v;
                      return /* @__PURE__ */ e.jsx("li", { children: /* @__PURE__ */ e.jsx(
                        "button",
                        {
                          type: "button",
                          disabled: g.disabled,
                          onClick: () => W(g.value),
                          className: y(
                            x(
                              "flex w-full items-center justify-between px-3 py-2 text-left",
                              "transition-colors",
                              !g.disabled && "hover:bg-slate-50 cursor-pointer",
                              g.disabled && "cursor-not-allowed text-text-muted",
                              Y && "bg-primary-50"
                            )
                          ),
                          children: /* @__PURE__ */ e.jsx("span", { className: "whitespace-nowrap", children: g.label })
                        }
                      ) }, g.value);
                    })
                  ] })
                }
              )
            }
          )
        ]
      }
    );
  }
);
$e.displayName = "Select";
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fe = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
], Re = ke("calendar", Fe);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const He = [
  ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
], _e = ke("clock", He), ve = (n) => {
  if (!n) return "";
  const [r, a, u] = n.split("-").map(Number);
  return !r || !a || !u ? n : `${String(u).padStart(2, "0")}/${String(a).padStart(2, "0")}/${r}`;
}, Me = (n, r, a) => {
  if (!n || !r || !a || r < 1 || r > 12) return !1;
  const u = new Date(n, r, 0).getDate();
  return !(a < 1 || a > u);
}, ie = (n) => {
  if (!n) return;
  const [r, a, u] = n.split("-").map(Number);
  if (!Me(r, a, u)) return;
  const o = new Date(r, a - 1, u);
  if (!(o.getFullYear() !== r || o.getMonth() !== a - 1 || o.getDate() !== u))
    return o;
}, be = (n) => {
  const r = n.trim();
  if (r) {
    if (/^\d{4}-\d{2}-\d{2}$/.test(r))
      return ie(r);
    if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(r)) {
      const [a, u, o] = r.split("/").map(Number);
      if (!Me(o, u, a)) return;
      const f = new Date(o, u - 1, a);
      return f.getFullYear() !== o || f.getMonth() !== u - 1 || f.getDate() !== a ? void 0 : f;
    }
  }
}, Te = (n) => {
  const r = n.getFullYear(), a = String(n.getMonth() + 1).padStart(2, "0"), u = String(n.getDate()).padStart(2, "0");
  return `${r}-${a}-${u}`;
}, Ye = (n, r) => new Date(n, r + 1, 0).getDate(), ze = (n, r) => (new Date(n, r, 1).getDay() + 6) % 7, Ae = i.forwardRef(
  ({
    className: n,
    error: r,
    fullWidth: a = !0,
    placeholder: u = "dd/mm/yyyy",
    value: o,
    defaultValue: f,
    disabled: l,
    onValueChange: p,
    autoOpen: b = !1,
    inline: c = !1,
    name: D,
    id: z,
    locale: E = "vi-VN",
    weekdayLabels: _ = ["M", "T", "W", "T", "F", "S", "S"],
    monthLabelFormatter: j,
    onChange: $,
    ...F
  }, A) => {
    const T = X(), M = o !== void 0, [te, J] = i.useState(f), h = M ? o : te, O = ie(h) ?? /* @__PURE__ */ new Date(), [R, N] = i.useState(O.getFullYear()), [C, v] = i.useState(O.getMonth()), [k, S] = i.useState("day"), [I, H] = i.useState(c), [L, U] = i.useState(
      h ? ve(h) : ""
    ), G = i.useRef(null), W = i.useRef(null);
    i.useEffect(() => {
      U(h ? ve(h) : "");
    }, [h]), i.useEffect(() => {
      const s = ie(h);
      s && (N(s.getFullYear()), v(s.getMonth()));
    }, [h]), i.useEffect(() => {
      if (!I) return;
      const s = be(L) ?? ie(h);
      s && (N(s.getFullYear()), v(s.getMonth()));
    }, [I, L, h]), i.useEffect(() => {
      if (!I || c) return;
      const s = (d) => {
        G.current && (G.current.contains(d.target) || H(!1));
      };
      return document.addEventListener("mousedown", s), () => document.removeEventListener("mousedown", s);
    }, [I, c]), i.useEffect(() => {
      c || b && !I && !l && H(!0);
    }, [b, I, l, c]);
    const g = (s) => {
      const d = Te(s);
      M || J(d), T(
        P.UI_CHANGE,
        { date: d },
        { meta: { component: "DatePicker" } }
      ), $ && $({
        target: { value: d, name: D }
      }), p == null || p(d), c || H(!1);
    }, Y = (s) => {
      if (l) return;
      const d = new Date(R, C, s);
      g(d);
    }, se = (s) => {
      if (l) return;
      let w = s.target.value.replace(/[^0-9]/g, "");
      w.length > 2 && (w = `${w.slice(0, 2)}/${w.slice(2)}`), w.length > 5 && (w = `${w.slice(0, 5)}/${w.slice(5, 9)}`), w.length > 10 && (w = w.slice(0, 10)), U(w);
    }, Q = () => {
      if (l) return;
      const s = be(L);
      s ? g(s) : U(h ? ve(h) : "");
    }, xe = (s) => {
      var w;
      const d = s.relatedTarget;
      d && ((w = W.current) != null && w.contains(d)) || Q();
    }, pe = (s) => {
      s.key === "Enter" && (s.preventDefault(), Q(), H(!1));
    }, le = () => {
      if (k === "day") {
        const s = C - 1;
        s < 0 ? (v(11), N((d) => d - 1)) : v(s);
      } else N(k === "month" ? (s) => s - 1 : (s) => s - 12);
    }, he = () => {
      if (k === "day") {
        const s = C + 1;
        s > 11 ? (v(0), N((d) => d + 1)) : v(s);
      } else N(k === "month" ? (s) => s + 1 : (s) => s + 12);
    }, ce = Ye(R, C), ue = ze(R, C), Z = be(L) ?? ie(h), re = [];
    let B = 1 - ue;
    for (; B <= ce; ) {
      const s = [];
      for (let d = 0; d < 7; d++)
        B < 1 || B > ce ? s.push(null) : s.push(B), B++;
      re.push(s);
    }
    const q = i.useMemo(
      () => new Intl.DateTimeFormat(E, { month: "long" }),
      [E]
    ), ne = i.useCallback(
      (s, d) => j ? j(s, d) : q.format(new Date(s, d, 1)),
      [q, j]
    ), ae = ne(R, C), ge = Array.from({ length: 12 }, (s, d) => ({
      index: d,
      label: ne(R, d)
    })), de = R - 50, me = R + 49, ye = Array.from({ length: me - de + 1 }, (s, d) => de + d);
    return /* @__PURE__ */ e.jsxs(
      "div",
      {
        ref: G,
        className: y(
          x(
            "relative text-sm",
            a ? "w-full" : "inline-block w-auto",
            l && "opacity-60 cursor-not-allowed",
            n
          )
        ),
        children: [
          /* @__PURE__ */ e.jsx(
            "input",
            {
              ref: A,
              type: "hidden",
              name: D,
              id: z ?? D,
              value: h ?? "",
              ...F
            }
          ),
          !c && /* @__PURE__ */ e.jsxs(
            "div",
            {
              className: y(
                x(
                  "flex h-10 items-center justify-between rounded-xl bg-surface-alt px-3 py-2",
                  a ? "w-full" : "w-auto",
                  "text-left",
                  "focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-100",
                  "transition-all duration-200",
                  !l && "cursor-text",
                  l && "cursor-not-allowed",
                  r && "bg-red-50 text-red-700 focus-within:ring-red-100"
                )
              ),
              onClick: () => {
                l || H(!0);
              },
              children: [
                /* @__PURE__ */ e.jsx(
                  "input",
                  {
                    type: "text",
                    disabled: l,
                    value: L,
                    onChange: se,
                    onBlur: xe,
                    onKeyDown: pe,
                    placeholder: u,
                    className: y(
                      x(
                        "flex-1 bg-transparent text-sm",
                        "outline-none border-none",
                        !h && "text-text-muted"
                      )
                    )
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  we,
                  {
                    icon: Re,
                    variant: "muted",
                    size: "sm",
                    className: x("ml-2 transition-transform", I && "rotate-180")
                  }
                )
              ]
            }
          ),
          (I || c) && !l && /* @__PURE__ */ e.jsxs(
            "div",
            {
              ref: W,
              onMouseDown: (s) => {
                var d;
                (d = s.target) != null && d.closest("button") && s.preventDefault();
              },
              className: y(
                x(
                  // Dropdown bám theo input
                  c ? "relative w-full rounded-xl bg-transparent shadow-none outline-none" : "absolute left-0 z-50 mt-1 w-full rounded-xl bg-surface shadow-lg outline-none",
                  "max-h-[80vh] overflow-hidden sm:min-w-[240px] sm:max-w-xs"
                )
              ),
              children: [
                /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between px-3 pt-2 text-xs text-text-muted", children: [
                  /* @__PURE__ */ e.jsx(fe, { icon: De, size: "xs", variant: "muted", onClick: le }),
                  /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-1 text-sm", children: [
                    /* @__PURE__ */ e.jsx(
                      "button",
                      {
                        type: "button",
                        className: "rounded px-2 py-1 text-text hover:bg-slate-50",
                        onClick: () => S((s) => s === "month" ? "day" : "month"),
                        children: ae
                      }
                    ),
                    /* @__PURE__ */ e.jsx(
                      "button",
                      {
                        type: "button",
                        className: "rounded px-2 py-1 text-text-muted hover:bg-slate-50",
                        onClick: () => S((s) => s === "year" ? "day" : "year"),
                        children: R
                      }
                    )
                  ] }),
                  /* @__PURE__ */ e.jsx(fe, { icon: Se, size: "xs", variant: "muted", onClick: he })
                ] }),
                /* @__PURE__ */ e.jsxs("div", { className: "px-3 pb-2 pt-1 text-[11px] text-text-muted", children: [
                  k === "day" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                    /* @__PURE__ */ e.jsx("div", { className: "grid grid-cols-7 justify-items-center", children: _.map((s, d) => /* @__PURE__ */ e.jsx("div", { className: "h-8 w-8 flex items-center justify-center text-xs font-semibold text-text-muted", children: s }, d)) }),
                    /* @__PURE__ */ e.jsx("div", { className: "mt-1 grid grid-cols-7 text-xs justify-items-center", children: re.map((s, d) => /* @__PURE__ */ e.jsx(i.Fragment, { children: s.map((w, t) => {
                      if (!w)
                        return /* @__PURE__ */ e.jsx("div", { className: "h-8 w-8" }, t);
                      const m = Z && Z.getFullYear() === R && Z.getMonth() === C && Z.getDate() === w;
                      return /* @__PURE__ */ e.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => Y(w),
                          className: y(
                            x(
                              "flex h-7 w-7 items-center justify-center rounded-full text-text",
                              "transition-colors",
                              "hover:bg-slate-50",
                              m && "bg-primary-500 text-white hover:bg-primary-500"
                            )
                          ),
                          children: w
                        },
                        t
                      );
                    }) }, d)) })
                  ] }),
                  k === "month" && /* @__PURE__ */ e.jsx("div", { className: "grid grid-cols-3 gap-2 pt-1 text-xs text-text", children: ge.map((s) => {
                    const d = s.index === C;
                    return /* @__PURE__ */ e.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => {
                          v(s.index), S("day");
                        },
                        className: y(
                          x(
                            "rounded-lg px-2 py-2 text-center transition-colors hover:bg-slate-50",
                            d && "bg-primary-500 text-white hover:bg-primary-500"
                          )
                        ),
                        children: s.label
                      },
                      s.index
                    );
                  }) }),
                  k === "year" && /* @__PURE__ */ e.jsx(ee, { autoHide: !0, direction: "vertical", className: "max-h-56 pt-1 text-xs text-text", children: /* @__PURE__ */ e.jsx("div", { className: "grid grid-cols-3 gap-2 pr-1", children: ye.map((s) => {
                    const d = s === R;
                    return /* @__PURE__ */ e.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => {
                          N(s), S("day");
                        },
                        className: y(
                          x(
                            "rounded-lg px-2 py-2 text-center transition-colors hover:bg-slate-50",
                            d && "bg-primary-500 text-white hover:bg-primary-500"
                          )
                        ),
                        children: s
                      },
                      s
                    );
                  }) }) })
                ] })
              ]
            }
          )
        ]
      }
    );
  }
);
Ae.displayName = "DatePicker";
const oe = (n) => {
  if (!n) return;
  const [r, a] = n.split(" ");
  if (!r) return;
  const [u, o, f] = r.split("-").map(Number);
  if (!u || !o || !f) return;
  let l = 0, p = 0;
  if (a) {
    const [b, c] = a.split(":").map(Number);
    l = Number.isFinite(b) ? b : 0, p = Number.isFinite(c) ? c : 0;
  }
  return new Date(u, o - 1, f, l, p);
}, Ne = (n) => {
  const r = n.getFullYear(), a = String(n.getMonth() + 1).padStart(2, "0"), u = String(n.getDate()).padStart(2, "0"), o = String(n.getHours()).padStart(2, "0"), f = String(n.getMinutes()).padStart(2, "0");
  return `${r}-${a}-${u} ${o}:${f}`;
}, Le = (n) => {
  const r = oe(n);
  if (!r) return "";
  const a = String(r.getDate()).padStart(2, "0"), u = String(r.getMonth() + 1).padStart(2, "0"), o = r.getFullYear(), f = String(r.getHours()).padStart(2, "0"), l = String(r.getMinutes()).padStart(2, "0");
  return `${a}/${u}/${o} ${f}:${l}`;
}, Be = (n, r) => new Date(n, r + 1, 0).getDate(), Oe = (n, r) => (new Date(n, r, 1).getDay() + 6) % 7, Ke = i.forwardRef(
  ({
    className: n,
    error: r,
    fullWidth: a = !0,
    placeholder: u = "dd/mm/yyyy hh:mm",
    value: o,
    defaultValue: f,
    disabled: l,
    onValueChange: p,
    autoOpen: b = !1,
    inline: c = !1,
    name: D,
    id: z,
    locale: E = "vi-VN",
    weekdayLabels: _ = ["M", "T", "W", "T", "F", "S", "S"],
    monthLabelFormatter: j,
    hourLabel: $ = "Giờ",
    minuteLabel: F = "Phút",
    onChange: A,
    // @ts-ignore - prevent type override
    type: T,
    ...M
  }, te) => {
    const J = X(), h = o !== void 0, [O, R] = i.useState(f), N = h ? o : O, C = oe(N) ?? /* @__PURE__ */ new Date(), [v, k] = i.useState(C.getFullYear()), [S, I] = i.useState(C.getMonth()), [H, L] = i.useState("day"), [U, G] = i.useState(C.getHours()), [W, g] = i.useState(C.getMinutes()), [Y, se] = i.useState(c), Q = i.useRef(null);
    i.useEffect(() => {
      if (!Y || c) return;
      const t = (m) => {
        Q.current && (Q.current.contains(m.target) || se(!1));
      };
      return document.addEventListener("mousedown", t), () => document.removeEventListener("mousedown", t);
    }, [Y, c]), i.useEffect(() => {
      c || b && !Y && !l && se(!0);
    }, [b, Y, l, c]), i.useEffect(() => {
      const t = oe(N);
      t && (k(t.getFullYear()), I(t.getMonth()), G(t.getHours()), g(t.getMinutes()));
    }, [N]);
    const xe = (t) => {
      t.setHours(U), t.setMinutes(W);
      const m = Ne(t);
      h || R(m), J(
        P.UI_CHANGE,
        { datetime: m },
        { meta: { component: "DatetimePicker" } }
      ), A && A({
        target: { value: m, name: D }
      }), p == null || p(m);
    }, pe = (t) => {
      if (l) return;
      const m = new Date(v, S, t);
      xe(m);
    }, le = (t, m) => {
      if (l) return;
      G(t), g(m);
      const K = oe(N) ?? new Date(v, S, 1);
      K.setHours(t), K.setMinutes(m);
      const V = Ne(K);
      h || R(V), J(
        P.UI_CHANGE,
        { datetime: V },
        { meta: { component: "DatetimePicker" } }
      ), A && A({
        target: { value: V, name: D }
      }), p == null || p(V);
    }, he = () => {
      if (H === "day") {
        const t = S - 1;
        t < 0 ? (I(11), k((m) => m - 1)) : I(t);
      } else k(H === "month" ? (t) => t - 1 : (t) => t - 12);
    }, ce = () => {
      if (H === "day") {
        const t = S + 1;
        t > 11 ? (I(0), k((m) => m + 1)) : I(t);
      } else k(H === "month" ? (t) => t + 1 : (t) => t + 12);
    }, ue = Be(v, S), Z = Oe(v, S), re = [];
    let B = 1 - Z;
    for (; B <= ue; ) {
      const t = [];
      for (let m = 0; m < 7; m++)
        B < 1 || B > ue ? t.push(null) : t.push(B), B++;
      re.push(t);
    }
    const q = oe(N), ne = i.useMemo(
      () => new Intl.DateTimeFormat(E, { month: "long" }),
      [E]
    ), ae = i.useCallback(
      (t, m) => j ? j(t, m) : ne.format(new Date(t, m, 1)),
      [ne, j]
    ), ge = ae(v, S), de = i.useMemo(
      () => Array.from({ length: 12 }, (t, m) => ({
        index: m,
        label: ae(v, m)
      })),
      [ae, v]
    ), me = v - 50, ye = v + 49, s = Array.from({ length: ye - me + 1 }, (t, m) => me + m), d = Array.from({ length: 24 }, (t, m) => m), w = Array.from({ length: 60 }, (t, m) => m);
    return /* @__PURE__ */ e.jsxs(
      "div",
      {
        ref: Q,
        className: y(
          x(
            "relative text-sm",
            a ? "w-full" : "inline-block w-auto",
            l && "opacity-60 cursor-not-allowed",
            n
          )
        ),
        children: [
          /* @__PURE__ */ e.jsx(
            "input",
            {
              ref: te,
              type: "hidden",
              name: D,
              id: z ?? D,
              value: N ?? "",
              ...M
            }
          ),
          !c && /* @__PURE__ */ e.jsxs(
            "button",
            {
              type: "button",
              disabled: l,
              onClick: () => !l && se((t) => !t),
              className: y(
                x(
                  "flex h-10 w-full items-center justify-between rounded-xl bg-surface-alt px-3 py-2",
                  "text-left",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100",
                  "transition-all duration-200",
                  !l && "cursor-pointer",
                  r && "bg-red-50 text-red-700 focus-visible:ring-red-100"
                )
              ),
              children: [
                /* @__PURE__ */ e.jsx("span", { className: x("truncate", !N && "text-text-muted"), children: N ? Le(N) : u }),
                /* @__PURE__ */ e.jsx(we, { icon: _e, variant: "muted", size: "sm", className: "ml-2" })
              ]
            }
          ),
          (Y || c) && !l && /* @__PURE__ */ e.jsxs(
            "div",
            {
              className: y(
                x(
                  // Dropdown bám theo input
                  c ? "relative w-full rounded-xl bg-transparent shadow-none outline-none" : "absolute left-0 z-50 mt-1 w-full rounded-xl bg-surface shadow-lg outline-none",
                  "max-h-[80vh] overflow-hidden sm:min-w-[260px] sm:max-w-sm"
                )
              ),
              children: [
                /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between px-3 pt-2 text-xs text-text-muted", children: [
                  /* @__PURE__ */ e.jsx(fe, { icon: De, size: "xs", variant: "muted", onClick: he }),
                  /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-1 text-sm", children: [
                    /* @__PURE__ */ e.jsx(
                      "button",
                      {
                        type: "button",
                        className: "rounded px-2 py-1 text-text hover:bg-slate-50",
                        onClick: () => L((t) => t === "month" ? "day" : "month"),
                        children: ge
                      }
                    ),
                    /* @__PURE__ */ e.jsx(
                      "button",
                      {
                        type: "button",
                        className: "rounded px-2 py-1 text-text-muted hover:bg-slate-50",
                        onClick: () => L((t) => t === "year" ? "day" : "year"),
                        children: v
                      }
                    )
                  ] }),
                  /* @__PURE__ */ e.jsx(fe, { icon: Se, size: "xs", variant: "muted", onClick: ce })
                ] }),
                /* @__PURE__ */ e.jsxs("div", { className: "px-3 pb-2 pt-1 text-[11px] text-text-muted", children: [
                  H === "day" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                    /* @__PURE__ */ e.jsx("div", { className: "grid grid-cols-7 justify-items-center", children: _.map((t, m) => /* @__PURE__ */ e.jsx("div", { className: "h-8 w-8 flex items-center justify-center text-xs font-semibold text-text-muted", children: t }, `${t}-${m}`)) }),
                    /* @__PURE__ */ e.jsx("div", { className: "mt-1 grid grid-cols-7 text-xs justify-items-center", children: re.map((t, m) => /* @__PURE__ */ e.jsx(i.Fragment, { children: t.map((K, V) => {
                      if (!K)
                        return /* @__PURE__ */ e.jsx("div", { className: "h-8 w-8" }, V);
                      const je = q && q.getFullYear() === v && q.getMonth() === S && q.getDate() === K;
                      return /* @__PURE__ */ e.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => pe(K),
                          className: y(
                            x(
                              "flex h-7 w-7 items-center justify-center rounded-full text-text",
                              "transition-colors",
                              "hover:bg-slate-50",
                              je && "bg-primary-500 text-white hover:bg-primary-500"
                            )
                          ),
                          children: K
                        },
                        V
                      );
                    }) }, m)) })
                  ] }),
                  H === "month" && /* @__PURE__ */ e.jsx("div", { className: "grid grid-cols-3 gap-2 pt-1 text-xs text-text", children: de.map((t) => {
                    const m = t.index === S;
                    return /* @__PURE__ */ e.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => {
                          I(t.index), L("day");
                        },
                        className: y(
                          x(
                            "rounded-lg px-2 py-2 text-center transition-colors hover:bg-slate-50",
                            m && "bg-primary-500 text-white hover:bg-primary-500"
                          )
                        ),
                        children: t.label
                      },
                      t.index
                    );
                  }) }),
                  H === "year" && /* @__PURE__ */ e.jsx(ee, { autoHide: !0, direction: "vertical", className: "max-h-56 pt-1 text-xs text-text", children: /* @__PURE__ */ e.jsx("div", { className: "grid grid-cols-3 gap-2 pr-1", children: s.map((t) => {
                    const m = t === v;
                    return /* @__PURE__ */ e.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => {
                          k(t), L("day");
                        },
                        className: y(
                          x(
                            "rounded-lg px-2 py-2 text-center transition-colors hover:bg-slate-50",
                            m && "bg-primary-500 text-white hover:bg-primary-500"
                          )
                        ),
                        children: t
                      },
                      t
                    );
                  }) }) }),
                  /* @__PURE__ */ e.jsxs("div", { className: "mt-3 flex flex-col gap-2 pt-1 text-xs text-text", children: [
                    /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ e.jsx("span", { className: "shrink-0 text-[11px] text-text-muted", children: $ }),
                      /* @__PURE__ */ e.jsx(
                        ee,
                        {
                          autoHide: !0,
                          direction: "horizontal",
                          className: "flex-1 overflow-y-hidden rounded-full bg-surface-alt px-2 py-2 text-center text-xs",
                          children: /* @__PURE__ */ e.jsx("div", { className: "flex gap-1", children: d.map((t) => /* @__PURE__ */ e.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => le(t, W),
                              className: y(
                                x(
                                  "inline-flex h-8 aspect-square items-center justify-center rounded-full text-[11px] transition-colors",
                                  t === U ? "bg-primary-500 text-white" : "hover:bg-slate-50 text-text"
                                )
                              ),
                              children: String(t).padStart(2, "0")
                            },
                            t
                          )) })
                        }
                      )
                    ] }),
                    /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ e.jsx("span", { className: "shrink-0 text-[11px] text-text-muted", children: F }),
                      /* @__PURE__ */ e.jsx(
                        ee,
                        {
                          autoHide: !0,
                          direction: "horizontal",
                          className: "flex-1 overflow-y-hidden rounded-full bg-surface-alt px-2 py-2 text-center text-xs",
                          children: /* @__PURE__ */ e.jsx("div", { className: "flex gap-1", children: w.map((t) => /* @__PURE__ */ e.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => le(U, t),
                              className: y(
                                x(
                                  "inline-flex h-8 aspect-square items-center justify-center rounded-full text-[11px] transition-colors",
                                  t === W ? "bg-primary-500 text-white" : "hover:bg-slate-50 text-text"
                                )
                              ),
                              children: String(t).padStart(2, "0")
                            },
                            t
                          )) })
                        }
                      )
                    ] })
                  ] })
                ] })
              ]
            }
          )
        ]
      }
    );
  }
);
Ke.displayName = "DatetimePicker";
const Ue = {
  sm: {
    track: "h-6 w-12",
    knob: "h-5 w-5 left-0.5 top-0.5",
    solidKnob: "h-6 w-6 left-0 top-0",
    translateDefault: 24,
    translateSolid: 24
  },
  md: {
    track: "h-8 w-14",
    knob: "h-6 w-6 left-1 top-1",
    solidKnob: "h-8 w-8 left-0 top-0",
    translateDefault: 24,
    translateSolid: 24
  },
  lg: {
    track: "h-10 w-18",
    knob: "h-8 w-8 left-1.5 top-1.5",
    solidKnob: "h-10 w-10 left-0 top-0",
    translateDefault: 28,
    translateSolid: 32
  }
}, Ge = {
  primary: "bg-primary-500",
  success: "bg-green-500",
  warning: "bg-yellow-500",
  danger: "bg-red-500"
}, We = i.forwardRef(
  ({
    className: n,
    checked: r,
    defaultChecked: a = !1,
    disabled: u,
    onChange: o,
    label: f,
    variant: l = "primary",
    size: p = "md",
    innerIcon: b,
    innerStyle: c = "default",
    ...D
  }, z) => {
    const E = X(), [_, j] = i.useState(a), $ = r !== void 0, F = $ ? r : _, A = () => {
      if (u) return;
      const M = !F;
      $ || j(M), E(P.UI_CLICK, { value: M }, { meta: { component: "Switch" } }), o == null || o(M);
    }, T = Ue[p];
    return /* @__PURE__ */ e.jsxs("div", { className: x("inline-flex items-center gap-3", n), children: [
      /* @__PURE__ */ e.jsx(
        "button",
        {
          ref: z,
          type: "button",
          role: "switch",
          "aria-checked": F,
          disabled: u,
          onClick: A,
          className: x(
            "relative rounded-full transition-colors duration-200",
            T.track,
            F ? Ge[l] : "bg-slate-300",
            u && "opacity-60 cursor-not-allowed"
          ),
          ...D,
          children: /* @__PURE__ */ e.jsx(
            "span",
            {
              className: x(
                "absolute rounded-full bg-white shadow-sm transition-transform duration-200 flex items-center justify-center overflow-hidden",
                c === "solid" ? T.solidKnob : T.knob
              ),
              style: {
                transform: `translateX(${F ? c === "solid" ? T.translateSolid : T.translateDefault : 0}px)`
              },
              children: b && /* @__PURE__ */ e.jsx(we, { icon: b, size: "xs", variant: "default" })
            }
          )
        }
      ),
      f && /* @__PURE__ */ e.jsx("span", { className: "text-sm font-medium text-text", children: f })
    ] });
  }
);
We.displayName = "Switch";
export {
  Ce as B,
  Ee as C,
  Ae as D,
  Ie as I,
  $e as S,
  Ke as a,
  We as b,
  ee as c,
  Re as d
};
