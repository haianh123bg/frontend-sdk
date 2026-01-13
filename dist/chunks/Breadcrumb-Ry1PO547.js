import { j as t } from "./jsx-runtime-DGlMoOmv.js";
import * as p from "react";
import { t as i, c as n } from "./bundle-mjs-C7_IOFkA.js";
import { b as v, E as y } from "./types-CglsW3cy.js";
const j = ({ tabs: a, defaultTab: d, onChange: l, className: m, noBorder: c, noDivider: r }) => {
  var f, x;
  const o = v(), [s, u] = p.useState(d || ((f = a[0]) == null ? void 0 : f.id)), b = (e) => {
    u(e), o(y.UI_CLICK, { tabId: e }, { meta: { component: "Tabs" } }), l == null || l(e);
  }, h = (x = a.find((e) => e.id === s)) == null ? void 0 : x.content;
  return /* @__PURE__ */ t.jsxs("div", { className: i(n("w-full", m)), children: [
    /* @__PURE__ */ t.jsx(
      "div",
      {
        className: i(
          n("flex gap-1", !c && !r && "border-b border-slate-200")
        ),
        children: a.map((e) => /* @__PURE__ */ t.jsx(
          "button",
          {
            onClick: () => !e.disabled && b(e.id),
            disabled: e.disabled,
            className: i(
              n(
                "px-4 py-2 text-sm font-medium transition-all rounded-t-lg",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
                s === e.id ? c || r ? "bg-surface text-primary-500" : "bg-surface text-primary-500 border-b-2 border-primary-500" : "text-text-secondary hover:text-text-primary hover:bg-slate-50",
                e.disabled && "opacity-50 cursor-not-allowed"
              )
            ),
            children: e.label
          },
          e.id
        ))
      }
    ),
    /* @__PURE__ */ t.jsx("div", { className: "p-4", children: h })
  ] });
};
j.displayName = "Tabs";
const g = ({
  items: a,
  separator: d = "/",
  className: l,
  hoverEffect: m = "underline",
  emphasizeLast: c = !1
}) => /* @__PURE__ */ t.jsx("nav", { "aria-label": "Breadcrumb", className: i(n("flex items-center gap-2", l)), children: a.map((r, o) => {
  const s = o === a.length - 1;
  return /* @__PURE__ */ t.jsxs(p.Fragment, { children: [
    r.href || r.onClick ? /* @__PURE__ */ t.jsx(
      "a",
      {
        href: r.href,
        onClick: r.onClick,
        className: i(
          n(
            "relative text-sm text-text-primary font-normal transition-colors",
            s ? c ? "font-medium cursor-default" : "cursor-default" : "cursor-pointer",
            m === "underline" && !s && "pb-0.5 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-current after:origin-left after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-100 focus-visible:after:scale-x-100"
          )
        ),
        children: r.label
      }
    ) : /* @__PURE__ */ t.jsx("span", { className: "text-sm text-text-primary font-normal", children: r.label }),
    !s && /* @__PURE__ */ t.jsx("span", { className: "text-sm text-text-primary", children: d })
  ] }, o);
}) });
g.displayName = "Breadcrumb";
export {
  g as B,
  j as T
};
