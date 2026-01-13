import { j as s } from "./jsx-runtime-DGlMoOmv.js";
import * as R from "react";
import { t as d, c as t } from "./bundle-mjs-C7_IOFkA.js";
import { b as j, E as w } from "./types-CglsW3cy.js";
import { I as p } from "./createLucideIcon-CKrNh_SW.js";
import { C as N, a as C } from "./chevron-left-BSNIzxpu.js";
const I = ({
  currentPage: i,
  totalPages: n,
  onPageChange: u,
  siblingCount: e = 1,
  className: f,
  variant: v = "default"
}) => {
  const b = j(), l = (o) => {
    o >= 1 && o <= n && o !== i && (b(w.UI_CLICK, { page: o }, { meta: { component: "Pagination" } }), u(o));
  }, c = (o, r) => Array.from({ length: r - o + 1 }, (a, m) => o + m), y = R.useMemo(() => {
    if (e * 2 + 5 >= n)
      return c(1, n);
    const r = Math.max(i - e, 1), a = Math.min(i + e, n), m = r > 2, x = a < n - 2;
    return !m && x ? [...c(1, 3 + 2 * e), "...", n] : m && !x ? [1, "...", ...c(n - (3 + 2 * e) + 1, n)] : m && x ? [1, "...", ...c(r, a), "...", n] : c(1, n);
  }, [i, n, e]);
  return v === "icon" ? /* @__PURE__ */ s.jsxs("nav", { className: d(t("flex items-center gap-1", f)), children: [
    /* @__PURE__ */ s.jsx(
      p,
      {
        icon: N,
        size: "xs",
        variant: "muted",
        onClick: () => l(i - 1),
        disabled: i === 1,
        className: t(i === 1 && "cursor-not-allowed opacity-40")
      }
    ),
    /* @__PURE__ */ s.jsx(
      p,
      {
        icon: C,
        size: "xs",
        variant: "muted",
        onClick: () => l(i + 1),
        disabled: i === n,
        className: t(i === n && "cursor-not-allowed opacity-40")
      }
    )
  ] }) : /* @__PURE__ */ s.jsxs("nav", { className: d(t("flex items-center gap-1", f)), children: [
    /* @__PURE__ */ s.jsx(
      "button",
      {
        onClick: () => l(i - 1),
        disabled: i === 1,
        className: d(
          t(
            "rounded-lg px-3 py-2 text-sm font-medium transition-all",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
            i === 1 ? "cursor-not-allowed opacity-50" : "hover:bg-slate-100 text-text-secondary"
          )
        ),
        children: "Previous"
      }
    ),
    y.map((o, r) => o === "..." ? /* @__PURE__ */ s.jsx("span", { className: "px-2 text-text-muted", children: "..." }, `dots-${r}`) : /* @__PURE__ */ s.jsx(
      "button",
      {
        onClick: () => l(Number(o)),
        className: d(
          t(
            "rounded-lg px-3 py-2 text-sm font-medium transition-all",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
            i === o ? "bg-primary-500 text-white" : "hover:bg-slate-100 text-text-secondary"
          )
        ),
        children: o
      },
      o
    )),
    /* @__PURE__ */ s.jsx(
      "button",
      {
        onClick: () => l(i + 1),
        disabled: i === n,
        className: d(
          t(
            "rounded-lg px-3 py-2 text-sm font-medium transition-all",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
            i === n ? "cursor-not-allowed opacity-50" : "hover:bg-slate-100 text-text-secondary"
          )
        ),
        children: "Next"
      }
    )
  ] });
};
I.displayName = "Pagination";
export {
  I as P
};
