import { j as e } from "./jsx-runtime-DGlMoOmv.js";
import * as i from "react";
import { t as m, c as d } from "./bundle-mjs-C7_IOFkA.js";
import { I as u } from "./createLucideIcon-CKrNh_SW.js";
import { X as b } from "./x-_6rYSRXj.js";
const p = i.forwardRef(
  ({ className: s, size: a = "md", variant: r = "primary", ...t }, o) => {
    const n = {
      xs: "h-3 w-3 border",
      sm: "h-4 w-4 border-2",
      md: "h-6 w-6 border-2",
      lg: "h-8 w-8 border-2",
      xl: "h-12 w-12 border-4"
    }, l = {
      primary: "border-primary-500 border-t-transparent",
      secondary: "border-slate-500 border-t-transparent",
      white: "border-white border-t-transparent"
    };
    return /* @__PURE__ */ e.jsx(
      "div",
      {
        ref: o,
        className: m(
          d(
            "inline-block animate-spin rounded-full",
            n[a],
            l[r],
            s
          )
        ),
        role: "status",
        "aria-label": "Loading",
        ...t,
        children: /* @__PURE__ */ e.jsx("span", { className: "sr-only", children: "Loading..." })
      }
    );
  }
);
p.displayName = "Spinner";
const w = i.forwardRef(
  ({ open: s, onClose: a, title: r, children: t, size: o = "md", className: n }, l) => {
    if (i.useEffect(() => (s ? document.body.style.overflow = "hidden" : document.body.style.overflow = "unset", () => {
      document.body.style.overflow = "unset";
    }), [s]), !s) return null;
    const c = {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl"
    };
    return /* @__PURE__ */ e.jsx(
      "div",
      {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-1",
        onClick: a,
        children: /* @__PURE__ */ e.jsxs(
          "div",
          {
            ref: l,
            className: m(
              d(
                "relative w-full rounded-2xl bg-surface",
                "max-h-[90vh] overflow-hidden",
                "flex flex-col",
                c[o],
                n
              )
            ),
            onClick: (f) => f.stopPropagation(),
            children: [
              r && /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between p-4 pb-4", children: [
                /* @__PURE__ */ e.jsx("h3", { className: "text-xl font-bold text-text-primary", children: r }),
                /* @__PURE__ */ e.jsx(
                  "button",
                  {
                    onClick: a,
                    className: "rounded-full p-1 hover:bg-slate-100 transition-colors",
                    "aria-label": "Close",
                    children: /* @__PURE__ */ e.jsx("svg", { className: "h-5 w-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ e.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
                  }
                )
              ] }),
              /* @__PURE__ */ e.jsx("div", { className: m(d("min-h-0 flex-1 overflow-y-auto p-6", r && "pt-0")), children: t })
            ]
          }
        )
      }
    );
  }
);
w.displayName = "Modal";
const h = ({
  content: s,
  children: a,
  position: r = "top",
  variant: t = "default",
  className: o
}) => {
  const [n, l] = i.useState(!1), c = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2"
  }, f = {
    top: "left-1/2 top-full -translate-x-1/2 -translate-y-1/2",
    bottom: "left-1/2 bottom-full -translate-x-1/2 translate-y-1/2",
    left: "top-1/2 left-full -translate-y-1/2 -translate-x-1/2",
    right: "top-1/2 right-full -translate-y-1/2 translate-x-1/2"
  }, x = {
    default: {
      container: "bg-slate-900 text-white",
      arrow: "bg-slate-900"
    },
    success: {
      container: "bg-emerald-600 text-white",
      arrow: "bg-emerald-600"
    },
    error: {
      container: "bg-rose-600 text-white",
      arrow: "bg-rose-600"
    },
    warning: {
      container: "bg-amber-400 text-slate-900",
      arrow: "bg-amber-400"
    },
    info: {
      container: "bg-sky-600 text-white",
      arrow: "bg-sky-600"
    }
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "relative inline-block", children: [
    i.cloneElement(a, {
      onMouseEnter: () => l(!0),
      onMouseLeave: () => l(!1)
    }),
    n && /* @__PURE__ */ e.jsxs(
      "div",
      {
        className: m(
          d(
            "absolute z-50 whitespace-nowrap rounded-lg px-3 py-2 text-sm",
            "pointer-events-none",
            x[t].container,
            c[r],
            o
          )
        ),
        children: [
          s,
          /* @__PURE__ */ e.jsx(
            "div",
            {
              className: d(
                "pointer-events-none absolute h-2 w-2 rotate-45",
                x[t].arrow,
                f[r]
              )
            }
          )
        ]
      }
    )
  ] });
};
h.displayName = "Tooltip";
const g = i.forwardRef(
  ({ message: s, variant: a = "info", duration: r = 3e3, onClose: t, className: o }, n) => {
    i.useEffect(() => {
      if (r > 0) {
        const c = setTimeout(() => {
          t == null || t();
        }, r);
        return () => clearTimeout(c);
      }
    }, [r, t]);
    const l = {
      success: "bg-green-500 text-white",
      error: "bg-red-500 text-white",
      warning: "bg-yellow-500 text-white",
      info: "bg-blue-500 text-white"
    };
    return /* @__PURE__ */ e.jsxs(
      "div",
      {
        ref: n,
        className: m(
          d(
            "flex items-center justify-between gap-4 rounded-xl px-4 py-3 shadow-lg",
            "animate-in slide-in-from-top-5",
            l[a],
            o
          )
        ),
        children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-sm font-medium", children: s }),
          t && /* @__PURE__ */ e.jsx(
            u,
            {
              onClick: t,
              icon: b,
              size: "xs",
              variant: "default",
              disableHover: !0,
              "aria-label": "Close"
            }
          )
        ]
      }
    );
  }
);
g.displayName = "Toast";
export {
  w as M,
  p as S,
  h as T,
  g as a
};
