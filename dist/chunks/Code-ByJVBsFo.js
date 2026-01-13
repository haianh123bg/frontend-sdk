import { j as a } from "./jsx-runtime-DGlMoOmv.js";
import { t as e, c as x } from "./bundle-mjs-C7_IOFkA.js";
import * as o from "react";
const n = ({ as: s = "p", className: t, ...r }) => /* @__PURE__ */ a.jsx(s, { className: e(x("text-text-primary", t)), ...r }), b = ({ className: s, ...t }) => /* @__PURE__ */ a.jsx(n, { as: "h2", className: e(x("text-2xl font-bold text-text-primary", s)), ...t }), z = ({ className: s, ...t }) => /* @__PURE__ */ a.jsx(n, { as: "p", className: e(x("text-base text-text-primary", s)), ...t }), C = ({ className: s, ...t }) => /* @__PURE__ */ a.jsx(n, { as: "span", className: e(x("text-xs text-text-muted", s)), ...t }), T = ({ className: s, ...t }) => /* @__PURE__ */ a.jsx(n, { as: "label", className: e(x("text-sm font-medium text-text-secondary", s)), ...t }), l = o.forwardRef(
  ({ className: s, as: t = "h2", size: r, children: m, ...d }, c) => {
    const f = r || {
      h1: "3xl",
      h2: "2xl",
      h3: "xl",
      h4: "lg",
      h5: "md",
      h6: "sm"
    }[t], i = {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl"
    };
    return /* @__PURE__ */ a.jsx(
      t,
      {
        ref: c,
        className: e(
          x("font-bold text-text-primary", i[f], s)
        ),
        ...d,
        children: m
      }
    );
  }
);
l.displayName = "Heading";
const p = o.forwardRef((s, t) => /* @__PURE__ */ a.jsx(l, { ref: t, as: "h1", ...s }));
p.displayName = "H1";
const j = o.forwardRef((s, t) => /* @__PURE__ */ a.jsx(l, { ref: t, as: "h2", ...s }));
j.displayName = "H2";
const h = o.forwardRef((s, t) => /* @__PURE__ */ a.jsx(l, { ref: t, as: "h3", ...s }));
h.displayName = "H3";
const y = o.forwardRef((s, t) => /* @__PURE__ */ a.jsx(l, { ref: t, as: "h4", ...s }));
y.displayName = "H4";
const H = o.forwardRef((s, t) => /* @__PURE__ */ a.jsx(l, { ref: t, as: "h5", ...s }));
H.displayName = "H5";
const N = o.forwardRef((s, t) => /* @__PURE__ */ a.jsx(l, { ref: t, as: "h6", ...s }));
N.displayName = "H6";
const u = o.forwardRef(
  ({ className: s, block: t = !1, children: r, ...m }, d) => t ? /* @__PURE__ */ a.jsx(
    "pre",
    {
      ref: d,
      className: e(
        x(
          "overflow-x-auto rounded-xl bg-slate-900 p-4 text-sm text-slate-50",
          "font-mono",
          s
        )
      ),
      ...m,
      children: /* @__PURE__ */ a.jsx("code", { children: r })
    }
  ) : /* @__PURE__ */ a.jsx(
    "code",
    {
      ref: d,
      className: e(
        x(
          "rounded bg-slate-100 px-1.5 py-0.5 text-sm font-mono text-slate-900",
          s
        )
      ),
      ...m,
      children: r
    }
  )
);
u.displayName = "Code";
export {
  C,
  l as H,
  T as L,
  n as T,
  b as a,
  z as b,
  p as c,
  j as d,
  h as e,
  y as f,
  H as g,
  N as h,
  u as i
};
