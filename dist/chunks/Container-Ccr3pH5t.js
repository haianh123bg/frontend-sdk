import { j as a } from "./jsx-runtime-DGlMoOmv.js";
import * as x from "react";
import { t as n, c as l } from "./bundle-mjs-C7_IOFkA.js";
import { b as w, E as h } from "./types-CglsW3cy.js";
const R = ({
  children: s,
  sidebar: e,
  header: t,
  className: r
}) => {
  const c = w();
  return x.useEffect(() => {
    c(h.NAV_ROUTE, { component: "DashboardLayout" }, { meta: { timestamp: Date.now() } });
  }, [c]), /* @__PURE__ */ a.jsxs("div", { className: "flex min-h-screen w-full bg-background text-text-primary", children: [
    e && /* @__PURE__ */ a.jsx("aside", { className: "hidden w-64 flex-col gap-4 bg-surface p-6 lg:flex", children: e }),
    /* @__PURE__ */ a.jsxs("div", { className: "flex flex-1 flex-col", children: [
      t && /* @__PURE__ */ a.jsx("header", { className: "sticky top-0 z-10 flex h-16 items-center gap-4 bg-background/80 px-6 backdrop-blur-sm", children: t }),
      /* @__PURE__ */ a.jsx("main", { className: n(l("flex-1 p-6", r)), children: /* @__PURE__ */ a.jsx("div", { className: "mx-auto w-full max-w-7xl", children: s }) })
    ] })
  ] });
}, i = { none: "", sm: "gap-2", md: "gap-4", lg: "gap-8" }, j = { none: "", sm: "p-2", md: "p-4", lg: "p-8" }, d = ({ className: s, padding: e = "none", ...t }) => /* @__PURE__ */ a.jsx("div", { className: n(l(j[e], s)), ...t }), k = ({ className: s, gap: e = "none", ...t }) => /* @__PURE__ */ a.jsx("div", { className: n(l("flex flex-row items-center", i[e], s)), ...t }), D = ({ className: s, gap: e = "none", ...t }) => /* @__PURE__ */ a.jsx("div", { className: n(l("flex flex-col", i[e], s)), ...t }), E = ({ size: s = "md" }) => {
  const e = { sm: "h-2 w-2", md: "h-4 w-4", lg: "h-8 w-8", xl: "h-16 w-16" };
  return /* @__PURE__ */ a.jsx("div", { className: e[s] });
}, L = ({ className: s }) => /* @__PURE__ */ a.jsx("hr", { className: n(l("border-t border-slate-200", s)) }), M = d, S = d, N = x.forwardRef(
  ({
    className: s,
    direction: e = "vertical",
    gap: t = "md",
    align: r = "stretch",
    justify: c = "start",
    children: o,
    ...m
  }, p) => {
    const f = {
      none: "gap-0",
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8"
    }, u = {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch"
    }, g = {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around"
    };
    return /* @__PURE__ */ a.jsx(
      "div",
      {
        ref: p,
        className: n(
          l(
            "flex",
            e === "vertical" ? "flex-col" : "flex-row",
            f[t],
            u[r],
            g[c],
            s
          )
        ),
        ...m,
        children: o
      }
    );
  }
);
N.displayName = "Stack";
const b = x.forwardRef(
  ({ className: s, maxWidth: e = "xl", padding: t = !0, children: r, ...c }, o) => {
    const m = {
      sm: "max-w-screen-sm",
      md: "max-w-screen-md",
      lg: "max-w-screen-lg",
      xl: "max-w-screen-xl",
      "2xl": "max-w-screen-2xl",
      full: "max-w-full"
    };
    return /* @__PURE__ */ a.jsx(
      "div",
      {
        ref: o,
        className: n(
          l("mx-auto w-full", m[e], t && "px-4 sm:px-6 lg:px-8", s)
        ),
        ...c,
        children: r
      }
    );
  }
);
b.displayName = "Container";
export {
  d as B,
  D as C,
  L as D,
  M as L,
  k as R,
  E as S,
  S as a,
  N as b,
  b as c,
  R as d
};
