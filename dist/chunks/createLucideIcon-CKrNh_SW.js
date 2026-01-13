import { j as l } from "./jsx-runtime-DGlMoOmv.js";
import * as w from "react";
import { forwardRef as u, createElement as c } from "react";
import { c as C } from "./bundle-mjs-C7_IOFkA.js";
import { I as x } from "./Icon-M9fKXJ9V.js";
const g = {
  xs: "h-8 w-8",
  sm: "h-9 w-9",
  md: "h-10 w-10",
  lg: "h-11 w-11"
}, b = w.forwardRef(
  ({ icon: e, size: t = "sm", variant: r = "muted", className: o, disableHover: a = !1, ...s }, n) => /* @__PURE__ */ l.jsx(
    "button",
    {
      ref: n,
      type: "button",
      className: C(
        "flex items-center justify-center rounded-full transition-colors",
        !a && "hover:bg-slate-100",
        g[t],
        o
      ),
      ...s,
      children: /* @__PURE__ */ l.jsx(x, { icon: e, size: t, variant: r })
    }
  )
);
b.displayName = "IconButton";
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const y = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), j = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (t, r, o) => o ? o.toUpperCase() : r.toLowerCase()
), m = (e) => {
  const t = j(e);
  return t.charAt(0).toUpperCase() + t.slice(1);
}, p = (...e) => e.filter((t, r, o) => !!t && t.trim() !== "" && o.indexOf(t) === r).join(" ").trim(), A = (e) => {
  for (const t in e)
    if (t.startsWith("aria-") || t === "role" || t === "title")
      return !0;
};
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var I = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const k = u(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: r = 2,
    absoluteStrokeWidth: o,
    className: a = "",
    children: s,
    iconNode: n,
    ...i
  }, d) => c(
    "svg",
    {
      ref: d,
      ...I,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: o ? Number(r) * 24 / Number(t) : r,
      className: p("lucide", a),
      ...!s && !A(i) && { "aria-hidden": "true" },
      ...i
    },
    [
      ...n.map(([f, h]) => c(f, h)),
      ...Array.isArray(s) ? s : [s]
    ]
  )
);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const R = (e, t) => {
  const r = u(
    ({ className: o, ...a }, s) => c(k, {
      ref: s,
      iconNode: t,
      className: p(
        `lucide-${y(m(e))}`,
        `lucide-${e}`,
        o
      ),
      ...a
    })
  );
  return r.displayName = m(e), r;
};
export {
  b as I,
  R as c
};
