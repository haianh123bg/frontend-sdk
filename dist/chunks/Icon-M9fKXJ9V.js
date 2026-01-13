import { j as x } from "./jsx-runtime-DGlMoOmv.js";
import * as m from "react";
import { t as i, c as l } from "./bundle-mjs-C7_IOFkA.js";
const n = {
  default: "text-text",
  primary: "text-primary-500",
  muted: "text-text-muted",
  error: "text-red-600",
  success: "text-green-600",
  warning: "text-yellow-500",
  info: "text-blue-500",
  white: "text-white"
}, c = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
  xl: "h-8 w-8",
  "2xl": "h-10 w-10"
}, w = m.forwardRef(
  ({ icon: t, variant: e = "default", size: r = "md", className: s, ...a }, o) => /* @__PURE__ */ x.jsx(
    t,
    {
      ref: o,
      className: i(l(n[e], c[r], s)),
      ...a
    }
  )
);
w.displayName = "Icon";
export {
  w as I
};
