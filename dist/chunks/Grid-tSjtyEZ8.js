import { j as e } from "./jsx-runtime-DGlMoOmv.js";
import * as i from "react";
import { t as m, c as x } from "./bundle-mjs-C7_IOFkA.js";
const f = {
  xs: "",
  sm: "sm:",
  md: "md:",
  lg: "lg:",
  xl: "xl:",
  "2xl": "2xl:"
}, d = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
  7: "col-span-7",
  8: "col-span-8",
  9: "col-span-9",
  10: "col-span-10",
  11: "col-span-11",
  12: "col-span-12"
}, g = {
  0: "gap-0",
  1: "gap-2",
  2: "gap-4",
  3: "gap-6",
  4: "gap-8"
}, u = ["xs", "sm", "md", "lg", "xl", "2xl"];
function b(s) {
  if (!s) return "";
  const c = typeof s == "number" ? { xs: s } : s, o = [];
  for (const a of u) {
    const n = c[a];
    if (!n) continue;
    const p = f[a];
    o.push(`${p}${d[n]}`);
  }
  return o.join(" ");
}
const j = i.forwardRef(
  ({ container: s, spacing: c = 0, size: o, className: a, children: n, ...p }, t) => {
    const l = [];
    s && l.push("grid", "grid-cols-12", g[c]);
    const r = b(o);
    return r && l.push(r), /* @__PURE__ */ e.jsx("div", { ref: t, className: m(x(l, a)), ...p, children: n });
  }
);
j.displayName = "Grid";
export {
  j as G
};
