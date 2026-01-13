import { j as S } from "./jsx-runtime-DGlMoOmv.js";
import * as U from "react";
import B, { createRef as yh, memo as bh, createContext as Xc, createElement as xh, version as Ql, useContext as Qc, useState as dr, useLayoutEffect as kh, useEffect as Zc, useDebugValue as eu, useRef as tu, forwardRef as vh, useCallback as fo } from "react";
import { t as Ce, c as pe } from "./bundle-mjs-C7_IOFkA.js";
import { b as en, E as Lt } from "./types-CglsW3cy.js";
import { c as En, I as ho } from "./createLucideIcon-CKrNh_SW.js";
import { I as nu } from "./Icon-M9fKXJ9V.js";
import { X as ru } from "./x-_6rYSRXj.js";
import { g as Sh } from "./id-CKhXHm5z.js";
import { c as wh, B as po, D as Ch, a as Eh, S as Mh, C as Th, I as xi } from "./Switch-CQj_EZyS.js";
import Ah, { flushSync as Nh } from "react-dom";
import { G as ss } from "./Grid-tSjtyEZ8.js";
var Vk = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Oh(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Lr = (n) => n.type === "checkbox", un = (n) => n instanceof Date, Ye = (n) => n == null;
const su = (n) => typeof n == "object";
var Te = (n) => !Ye(n) && !Array.isArray(n) && su(n) && !un(n), iu = (n) => Te(n) && n.target ? Lr(n.target) ? n.target.checked : n.target.value : n, Rh = (n) => n.substring(0, n.search(/\.\d+(\.|$)/)) || n, ou = (n, e) => n.has(Rh(e)), Dh = (n) => {
  const e = n.constructor && n.constructor.prototype;
  return Te(e) && e.hasOwnProperty("isPrototypeOf");
}, el = typeof window < "u" && typeof window.HTMLElement < "u" && typeof document < "u";
function fe(n) {
  let e;
  const t = Array.isArray(n), r = typeof FileList < "u" ? n instanceof FileList : !1;
  if (n instanceof Date)
    e = new Date(n);
  else if (!(el && (n instanceof Blob || r)) && (t || Te(n)))
    if (e = t ? [] : Object.create(Object.getPrototypeOf(n)), !t && !Dh(n))
      e = n;
    else
      for (const s in n)
        n.hasOwnProperty(s) && (e[s] = fe(n[s]));
  else
    return n;
  return e;
}
var Qs = (n) => /^\w*$/.test(n), ue = (n) => n === void 0, Zs = (n) => Array.isArray(n) ? n.filter(Boolean) : [], tl = (n) => Zs(n.replace(/["|']|\]/g, "").split(/\.|\[/)), I = (n, e, t) => {
  if (!e || !Te(n))
    return t;
  const r = (Qs(e) ? [e] : tl(e)).reduce((s, i) => Ye(s) ? s : s[i], n);
  return ue(r) || r === n ? ue(n[e]) ? t : n[e] : r;
}, et = (n) => typeof n == "boolean", se = (n, e, t) => {
  let r = -1;
  const s = Qs(e) ? [e] : tl(e), i = s.length, o = i - 1;
  for (; ++r < i; ) {
    const l = s[r];
    let a = t;
    if (r !== o) {
      const c = n[l];
      a = Te(c) || Array.isArray(c) ? c : isNaN(+s[r + 1]) ? {} : [];
    }
    if (l === "__proto__" || l === "constructor" || l === "prototype")
      return;
    n[l] = a, n = n[l];
  }
};
const is = {
  BLUR: "blur",
  FOCUS_OUT: "focusout",
  CHANGE: "change"
}, ut = {
  onBlur: "onBlur",
  onChange: "onChange",
  onSubmit: "onSubmit",
  onTouched: "onTouched",
  all: "all"
}, Et = {
  max: "max",
  min: "min",
  maxLength: "maxLength",
  minLength: "minLength",
  pattern: "pattern",
  required: "required",
  validate: "validate"
}, nl = B.createContext(null);
nl.displayName = "HookFormContext";
const tn = () => B.useContext(nl), Ih = (n) => {
  const { children: e, ...t } = n;
  return B.createElement(nl.Provider, { value: t }, e);
};
var lu = (n, e, t, r = !0) => {
  const s = {
    defaultValues: e._defaultValues
  };
  for (const i in n)
    Object.defineProperty(s, i, {
      get: () => {
        const o = i;
        return e._proxyFormState[o] !== ut.all && (e._proxyFormState[o] = !r || ut.all), t && (t[o] = !0), n[o];
      }
    });
  return s;
};
const ei = typeof window < "u" ? B.useLayoutEffect : B.useEffect;
function Lh(n) {
  const e = tn(), { control: t = e.control, disabled: r, name: s, exact: i } = n || {}, [o, l] = B.useState(t._formState), a = B.useRef({
    isDirty: !1,
    isLoading: !1,
    dirtyFields: !1,
    touchedFields: !1,
    validatingFields: !1,
    isValidating: !1,
    isValid: !1,
    errors: !1
  });
  return ei(() => t._subscribe({
    name: s,
    formState: a.current,
    exact: i,
    callback: (c) => {
      !r && l({
        ...t._formState,
        ...c
      });
    }
  }), [s, r, i]), B.useEffect(() => {
    a.current.isValid && t._setValid(!0);
  }, [t]), B.useMemo(() => lu(o, t, a.current, !1), [o, t]);
}
var tt = (n) => typeof n == "string", mo = (n, e, t, r, s) => tt(n) ? (r && e.watch.add(n), I(t, n, s)) : Array.isArray(n) ? n.map((i) => (r && e.watch.add(i), I(t, i))) : (r && (e.watchAll = !0), t), go = (n) => Ye(n) || !su(n);
function pt(n, e, t = /* @__PURE__ */ new WeakSet()) {
  if (go(n) || go(e))
    return Object.is(n, e);
  if (un(n) && un(e))
    return n.getTime() === e.getTime();
  const r = Object.keys(n), s = Object.keys(e);
  if (r.length !== s.length)
    return !1;
  if (t.has(n) || t.has(e))
    return !0;
  t.add(n), t.add(e);
  for (const i of r) {
    const o = n[i];
    if (!s.includes(i))
      return !1;
    if (i !== "ref") {
      const l = e[i];
      if (un(o) && un(l) || Te(o) && Te(l) || Array.isArray(o) && Array.isArray(l) ? !pt(o, l, t) : !Object.is(o, l))
        return !1;
    }
  }
  return !0;
}
function rl(n) {
  const e = tn(), { control: t = e.control, name: r, defaultValue: s, disabled: i, exact: o, compute: l } = n || {}, a = B.useRef(s), c = B.useRef(l), u = B.useRef(void 0), d = B.useRef(t), f = B.useRef(r);
  c.current = l;
  const [h, p] = B.useState(() => {
    const v = t._getWatch(r, a.current);
    return c.current ? c.current(v) : v;
  }), m = B.useCallback((v) => {
    const x = mo(r, t._names, v || t._formValues, !1, a.current);
    return c.current ? c.current(x) : x;
  }, [t._formValues, t._names, r]), g = B.useCallback((v) => {
    if (!i) {
      const x = mo(r, t._names, v || t._formValues, !1, a.current);
      if (c.current) {
        const E = c.current(x);
        pt(E, u.current) || (p(E), u.current = E);
      } else
        p(x);
    }
  }, [t._formValues, t._names, i, r]);
  ei(() => ((d.current !== t || !pt(f.current, r)) && (d.current = t, f.current = r, g()), t._subscribe({
    name: r,
    formState: {
      values: !0
    },
    exact: o,
    callback: (v) => {
      g(v.values);
    }
  })), [t, o, r, g]), B.useEffect(() => t._removeUnmounted());
  const y = d.current !== t, k = f.current, C = B.useMemo(() => {
    if (i)
      return null;
    const v = !y && !pt(k, r);
    return y || v ? m() : null;
  }, [i, y, r, k, m]);
  return C !== null ? C : h;
}
function Ph(n) {
  const e = tn(), { name: t, disabled: r, control: s = e.control, shouldUnregister: i, defaultValue: o } = n, l = ou(s._names.array, t), a = B.useMemo(() => I(s._formValues, t, I(s._defaultValues, t, o)), [s, t, o]), c = rl({
    control: s,
    name: t,
    defaultValue: a,
    exact: !0
  }), u = Lh({
    control: s,
    name: t,
    exact: !0
  }), d = B.useRef(n), f = B.useRef(void 0), h = B.useRef(s.register(t, {
    ...n.rules,
    value: c,
    ...et(n.disabled) ? { disabled: n.disabled } : {}
  }));
  d.current = n;
  const p = B.useMemo(() => Object.defineProperties({}, {
    invalid: {
      enumerable: !0,
      get: () => !!I(u.errors, t)
    },
    isDirty: {
      enumerable: !0,
      get: () => !!I(u.dirtyFields, t)
    },
    isTouched: {
      enumerable: !0,
      get: () => !!I(u.touchedFields, t)
    },
    isValidating: {
      enumerable: !0,
      get: () => !!I(u.validatingFields, t)
    },
    error: {
      enumerable: !0,
      get: () => I(u.errors, t)
    }
  }), [u, t]), m = B.useCallback((C) => h.current.onChange({
    target: {
      value: iu(C),
      name: t
    },
    type: is.CHANGE
  }), [t]), g = B.useCallback(() => h.current.onBlur({
    target: {
      value: I(s._formValues, t),
      name: t
    },
    type: is.BLUR
  }), [t, s._formValues]), y = B.useCallback((C) => {
    const v = I(s._fields, t);
    v && C && (v._f.ref = {
      focus: () => C.focus && C.focus(),
      select: () => C.select && C.select(),
      setCustomValidity: (x) => C.setCustomValidity(x),
      reportValidity: () => C.reportValidity()
    });
  }, [s._fields, t]), k = B.useMemo(() => ({
    name: t,
    value: c,
    ...et(r) || u.disabled ? { disabled: u.disabled || r } : {},
    onChange: m,
    onBlur: g,
    ref: y
  }), [t, r, u.disabled, m, g, y, c]);
  return B.useEffect(() => {
    const C = s._options.shouldUnregister || i, v = f.current;
    v && v !== t && !l && s.unregister(v), s.register(t, {
      ...d.current.rules,
      ...et(d.current.disabled) ? { disabled: d.current.disabled } : {}
    });
    const x = (E, M) => {
      const D = I(s._fields, E);
      D && D._f && (D._f.mount = M);
    };
    if (x(t, !0), C) {
      const E = fe(I(s._options.defaultValues, t, d.current.defaultValue));
      se(s._defaultValues, t, E), ue(I(s._formValues, t)) && se(s._formValues, t, E);
    }
    return !l && s.register(t), f.current = t, () => {
      (l ? C && !s._state.action : C) ? s.unregister(t) : x(t, !1);
    };
  }, [t, s, l, i]), B.useEffect(() => {
    s._setDisabledField({
      disabled: r,
      name: t
    });
  }, [r, t, s]), B.useMemo(() => ({
    field: k,
    formState: u,
    fieldState: p
  }), [k, u, p]);
}
const _h = (n) => n.render(Ph(n));
var au = (n, e, t, r, s) => e ? {
  ...t[n],
  types: {
    ...t[n] && t[n].types ? t[n].types : {},
    [r]: s || !0
  }
} : {}, Qe = (n) => Array.isArray(n) ? n : [n], Zl = () => {
  let n = [];
  return {
    get observers() {
      return n;
    },
    next: (s) => {
      for (const i of n)
        i.next && i.next(s);
    },
    subscribe: (s) => (n.push(s), {
      unsubscribe: () => {
        n = n.filter((i) => i !== s);
      }
    }),
    unsubscribe: () => {
      n = [];
    }
  };
};
function cu(n, e) {
  const t = {};
  for (const r in n)
    if (n.hasOwnProperty(r)) {
      const s = n[r], i = e[r];
      if (s && Te(s) && i) {
        const o = cu(s, i);
        Te(o) && (t[r] = o);
      } else n[r] && (t[r] = i);
    }
  return t;
}
var je = (n) => Te(n) && !Object.keys(n).length, sl = (n) => n.type === "file", mt = (n) => typeof n == "function", ls = (n) => {
  if (!el)
    return !1;
  const e = n ? n.ownerDocument : 0;
  return n instanceof (e && e.defaultView ? e.defaultView.HTMLElement : HTMLElement);
}, uu = (n) => n.type === "select-multiple", il = (n) => n.type === "radio", Bh = (n) => il(n) || Lr(n), ki = (n) => ls(n) && n.isConnected;
function Fh(n, e) {
  const t = e.slice(0, -1).length;
  let r = 0;
  for (; r < t; )
    n = ue(n) ? r++ : n[e[r++]];
  return n;
}
function Vh(n) {
  for (const e in n)
    if (n.hasOwnProperty(e) && !ue(n[e]))
      return !1;
  return !0;
}
function we(n, e) {
  const t = Array.isArray(e) ? e : Qs(e) ? [e] : tl(e), r = t.length === 1 ? n : Fh(n, t), s = t.length - 1, i = t[s];
  return r && delete r[i], s !== 0 && (Te(r) && je(r) || Array.isArray(r) && Vh(r)) && we(n, t.slice(0, -1)), n;
}
var zh = (n) => {
  for (const e in n)
    if (mt(n[e]))
      return !0;
  return !1;
};
function du(n) {
  return Array.isArray(n) || Te(n) && !zh(n);
}
function yo(n, e = {}) {
  for (const t in n) {
    const r = n[t];
    du(r) ? (e[t] = Array.isArray(r) ? [] : {}, yo(r, e[t])) : ue(r) || (e[t] = !0);
  }
  return e;
}
function Bn(n, e, t) {
  t || (t = yo(e));
  for (const r in n) {
    const s = n[r];
    if (du(s))
      ue(e) || go(t[r]) ? t[r] = yo(s, Array.isArray(s) ? [] : {}) : Bn(s, Ye(e) ? {} : e[r], t[r]);
    else {
      const i = e[r];
      t[r] = !pt(s, i);
    }
  }
  return t;
}
const ea = {
  value: !1,
  isValid: !1
}, ta = { value: !0, isValid: !0 };
var fu = (n) => {
  if (Array.isArray(n)) {
    if (n.length > 1) {
      const e = n.filter((t) => t && t.checked && !t.disabled).map((t) => t.value);
      return { value: e, isValid: !!e.length };
    }
    return n[0].checked && !n[0].disabled ? (
      // @ts-expect-error expected to work in the browser
      n[0].attributes && !ue(n[0].attributes.value) ? ue(n[0].value) || n[0].value === "" ? ta : { value: n[0].value, isValid: !0 } : ta
    ) : ea;
  }
  return ea;
}, hu = (n, { valueAsNumber: e, valueAsDate: t, setValueAs: r }) => ue(n) ? n : e ? n === "" ? NaN : n && +n : t && tt(n) ? new Date(n) : r ? r(n) : n;
const na = {
  isValid: !1,
  value: null
};
var pu = (n) => Array.isArray(n) ? n.reduce((e, t) => t && t.checked && !t.disabled ? {
  isValid: !0,
  value: t.value
} : e, na) : na;
function ra(n) {
  const e = n.ref;
  return sl(e) ? e.files : il(e) ? pu(n.refs).value : uu(e) ? [...e.selectedOptions].map(({ value: t }) => t) : Lr(e) ? fu(n.refs).value : hu(ue(e.value) ? n.ref.value : e.value, n);
}
var jh = (n, e, t, r) => {
  const s = {};
  for (const i of n) {
    const o = I(e, i);
    o && se(s, i, o._f);
  }
  return {
    criteriaMode: t,
    names: [...n],
    fields: s,
    shouldUseNativeValidation: r
  };
}, as = (n) => n instanceof RegExp, nr = (n) => ue(n) ? n : as(n) ? n.source : Te(n) ? as(n.value) ? n.value.source : n.value : n, $n = (n) => ({
  isOnSubmit: !n || n === ut.onSubmit,
  isOnBlur: n === ut.onBlur,
  isOnChange: n === ut.onChange,
  isOnAll: n === ut.all,
  isOnTouch: n === ut.onTouched
});
const sa = "AsyncFunction";
var $h = (n) => !!n && !!n.validate && !!(mt(n.validate) && n.validate.constructor.name === sa || Te(n.validate) && Object.values(n.validate).find((e) => e.constructor.name === sa)), Hh = (n) => n.mount && (n.required || n.min || n.max || n.maxLength || n.minLength || n.pattern || n.validate), bo = (n, e, t) => !t && (e.watchAll || e.watch.has(n) || [...e.watch].some((r) => n.startsWith(r) && /^\.\w+/.test(n.slice(r.length))));
const Un = (n, e, t, r) => {
  for (const s of t || Object.keys(n)) {
    const i = I(n, s);
    if (i) {
      const { _f: o, ...l } = i;
      if (o) {
        if (o.refs && o.refs[0] && e(o.refs[0], s) && !r)
          return !0;
        if (o.ref && e(o.ref, o.name) && !r)
          return !0;
        if (Un(l, e))
          break;
      } else if (Te(l) && Un(l, e))
        break;
    }
  }
};
function ia(n, e, t) {
  const r = I(n, t);
  if (r || Qs(t))
    return {
      error: r,
      name: t
    };
  const s = t.split(".");
  for (; s.length; ) {
    const i = s.join("."), o = I(e, i), l = I(n, i);
    if (o && !Array.isArray(o) && t !== i)
      return { name: t };
    if (l && l.type)
      return {
        name: i,
        error: l
      };
    if (l && l.root && l.root.type)
      return {
        name: `${i}.root`,
        error: l.root
      };
    s.pop();
  }
  return {
    name: t
  };
}
var Uh = (n, e, t, r) => {
  t(n);
  const { name: s, ...i } = n;
  return je(i) || Object.keys(i).length >= Object.keys(e).length || Object.keys(i).find((o) => e[o] === (!r || ut.all));
}, Wh = (n, e, t) => !n || !e || n === e || Qe(n).some((r) => r && (t ? r === e : r.startsWith(e) || e.startsWith(r))), qh = (n, e, t, r, s) => s.isOnAll ? !1 : !t && s.isOnTouch ? !(e || n) : (t ? r.isOnBlur : s.isOnBlur) ? !n : (t ? r.isOnChange : s.isOnChange) ? n : !0, Kh = (n, e) => !Zs(I(n, e)).length && we(n, e), mu = (n, e, t) => {
  const r = Qe(I(n, t));
  return se(r, "root", e[t]), se(n, t, r), n;
};
function oa(n, e, t = "validate") {
  if (tt(n) || Array.isArray(n) && n.every(tt) || et(n) && !n)
    return {
      type: t,
      message: tt(n) ? n : "",
      ref: e
    };
}
var In = (n) => Te(n) && !as(n) ? n : {
  value: n,
  message: ""
}, xo = async (n, e, t, r, s, i) => {
  const { ref: o, refs: l, required: a, maxLength: c, minLength: u, min: d, max: f, pattern: h, validate: p, name: m, valueAsNumber: g, mount: y } = n._f, k = I(t, m);
  if (!y || e.has(m))
    return {};
  const C = l ? l[0] : o, v = (F) => {
    s && C.reportValidity && (C.setCustomValidity(et(F) ? "" : F || ""), C.reportValidity());
  }, x = {}, E = il(o), M = Lr(o), D = E || M, L = (g || sl(o)) && ue(o.value) && ue(k) || ls(o) && o.value === "" || k === "" || Array.isArray(k) && !k.length, z = au.bind(null, m, r, x), X = (F, V, W, J = Et.maxLength, Q = Et.minLength) => {
    const re = F ? V : W;
    x[m] = {
      type: F ? J : Q,
      message: re,
      ref: o,
      ...z(F ? J : Q, re)
    };
  };
  if (i ? !Array.isArray(k) || !k.length : a && (!D && (L || Ye(k)) || et(k) && !k || M && !fu(l).isValid || E && !pu(l).isValid)) {
    const { value: F, message: V } = tt(a) ? { value: !!a, message: a } : In(a);
    if (F && (x[m] = {
      type: Et.required,
      message: V,
      ref: C,
      ...z(Et.required, V)
    }, !r))
      return v(V), x;
  }
  if (!L && (!Ye(d) || !Ye(f))) {
    let F, V;
    const W = In(f), J = In(d);
    if (!Ye(k) && !isNaN(k)) {
      const Q = o.valueAsNumber || k && +k;
      Ye(W.value) || (F = Q > W.value), Ye(J.value) || (V = Q < J.value);
    } else {
      const Q = o.valueAsDate || new Date(k), re = (ye) => /* @__PURE__ */ new Date((/* @__PURE__ */ new Date()).toDateString() + " " + ye), Z = o.type == "time", ee = o.type == "week";
      tt(W.value) && k && (F = Z ? re(k) > re(W.value) : ee ? k > W.value : Q > new Date(W.value)), tt(J.value) && k && (V = Z ? re(k) < re(J.value) : ee ? k < J.value : Q < new Date(J.value));
    }
    if ((F || V) && (X(!!F, W.message, J.message, Et.max, Et.min), !r))
      return v(x[m].message), x;
  }
  if ((c || u) && !L && (tt(k) || i && Array.isArray(k))) {
    const F = In(c), V = In(u), W = !Ye(F.value) && k.length > +F.value, J = !Ye(V.value) && k.length < +V.value;
    if ((W || J) && (X(W, F.message, V.message), !r))
      return v(x[m].message), x;
  }
  if (h && !L && tt(k)) {
    const { value: F, message: V } = In(h);
    if (as(F) && !k.match(F) && (x[m] = {
      type: Et.pattern,
      message: V,
      ref: o,
      ...z(Et.pattern, V)
    }, !r))
      return v(V), x;
  }
  if (p) {
    if (mt(p)) {
      const F = await p(k, t), V = oa(F, C);
      if (V && (x[m] = {
        ...V,
        ...z(Et.validate, V.message)
      }, !r))
        return v(V.message), x;
    } else if (Te(p)) {
      let F = {};
      for (const V in p) {
        if (!je(F) && !r)
          break;
        const W = oa(await p[V](k, t), C, V);
        W && (F = {
          ...W,
          ...z(V, W.message)
        }, v(W.message), r && (x[m] = F));
      }
      if (!je(F) && (x[m] = {
        ref: C,
        ...F
      }, !r))
        return x;
    }
  }
  return v(!0), x;
};
const Jh = {
  mode: ut.onSubmit,
  reValidateMode: ut.onChange,
  shouldFocusError: !0
};
function Gh(n = {}) {
  let e = {
    ...Jh,
    ...n
  }, t = {
    submitCount: 0,
    isDirty: !1,
    isReady: !1,
    isLoading: mt(e.defaultValues),
    isValidating: !1,
    isSubmitted: !1,
    isSubmitting: !1,
    isSubmitSuccessful: !1,
    isValid: !1,
    touchedFields: {},
    dirtyFields: {},
    validatingFields: {},
    errors: e.errors || {},
    disabled: e.disabled || !1
  }, r = {}, s = Te(e.defaultValues) || Te(e.values) ? fe(e.defaultValues || e.values) || {} : {}, i = e.shouldUnregister ? {} : fe(s), o = {
    action: !1,
    mount: !1,
    watch: !1
  }, l = {
    mount: /* @__PURE__ */ new Set(),
    disabled: /* @__PURE__ */ new Set(),
    unMount: /* @__PURE__ */ new Set(),
    array: /* @__PURE__ */ new Set(),
    watch: /* @__PURE__ */ new Set()
  }, a, c = 0;
  const u = {
    isDirty: !1,
    dirtyFields: !1,
    validatingFields: !1,
    touchedFields: !1,
    isValidating: !1,
    isValid: !1,
    errors: !1
  };
  let d = {
    ...u
  };
  const f = {
    array: Zl(),
    state: Zl()
  }, h = e.criteriaMode === ut.all, p = (b) => (w) => {
    clearTimeout(c), c = setTimeout(b, w);
  }, m = async (b) => {
    if (!e.disabled && (u.isValid || d.isValid || b)) {
      const w = e.resolver ? je((await M()).errors) : await L(r, !0);
      w !== t.isValid && f.state.next({
        isValid: w
      });
    }
  }, g = (b, w) => {
    !e.disabled && (u.isValidating || u.validatingFields || d.isValidating || d.validatingFields) && ((b || Array.from(l.mount)).forEach((T) => {
      T && (w ? se(t.validatingFields, T, w) : we(t.validatingFields, T));
    }), f.state.next({
      validatingFields: t.validatingFields,
      isValidating: !je(t.validatingFields)
    }));
  }, y = (b, w = [], T, P, R = !0, O = !0) => {
    if (P && T && !e.disabled) {
      if (o.action = !0, O && Array.isArray(I(r, b))) {
        const H = T(I(r, b), P.argA, P.argB);
        R && se(r, b, H);
      }
      if (O && Array.isArray(I(t.errors, b))) {
        const H = T(I(t.errors, b), P.argA, P.argB);
        R && se(t.errors, b, H), Kh(t.errors, b);
      }
      if ((u.touchedFields || d.touchedFields) && O && Array.isArray(I(t.touchedFields, b))) {
        const H = T(I(t.touchedFields, b), P.argA, P.argB);
        R && se(t.touchedFields, b, H);
      }
      (u.dirtyFields || d.dirtyFields) && (t.dirtyFields = Bn(s, i)), f.state.next({
        name: b,
        isDirty: X(b, w),
        dirtyFields: t.dirtyFields,
        errors: t.errors,
        isValid: t.isValid
      });
    } else
      se(i, b, w);
  }, k = (b, w) => {
    se(t.errors, b, w), f.state.next({
      errors: t.errors
    });
  }, C = (b) => {
    t.errors = b, f.state.next({
      errors: t.errors,
      isValid: !1
    });
  }, v = (b, w, T, P) => {
    const R = I(r, b);
    if (R) {
      const O = I(i, b, ue(T) ? I(s, b) : T);
      ue(O) || P && P.defaultChecked || w ? se(i, b, w ? O : ra(R._f)) : W(b, O), o.mount && !o.action && m();
    }
  }, x = (b, w, T, P, R) => {
    let O = !1, H = !1;
    const ie = {
      name: b
    };
    if (!e.disabled) {
      if (!T || P) {
        (u.isDirty || d.isDirty) && (H = t.isDirty, t.isDirty = ie.isDirty = X(), O = H !== ie.isDirty);
        const ce = pt(I(s, b), w);
        H = !!I(t.dirtyFields, b), ce ? we(t.dirtyFields, b) : se(t.dirtyFields, b, !0), ie.dirtyFields = t.dirtyFields, O = O || (u.dirtyFields || d.dirtyFields) && H !== !ce;
      }
      if (T) {
        const ce = I(t.touchedFields, b);
        ce || (se(t.touchedFields, b, T), ie.touchedFields = t.touchedFields, O = O || (u.touchedFields || d.touchedFields) && ce !== T);
      }
      O && R && f.state.next(ie);
    }
    return O ? ie : {};
  }, E = (b, w, T, P) => {
    const R = I(t.errors, b), O = (u.isValid || d.isValid) && et(w) && t.isValid !== w;
    if (e.delayError && T ? (a = p(() => k(b, T)), a(e.delayError)) : (clearTimeout(c), a = null, T ? se(t.errors, b, T) : we(t.errors, b)), (T ? !pt(R, T) : R) || !je(P) || O) {
      const H = {
        ...P,
        ...O && et(w) ? { isValid: w } : {},
        errors: t.errors,
        name: b
      };
      t = {
        ...t,
        ...H
      }, f.state.next(H);
    }
  }, M = async (b) => {
    g(b, !0);
    const w = await e.resolver(i, e.context, jh(b || l.mount, r, e.criteriaMode, e.shouldUseNativeValidation));
    return g(b), w;
  }, D = async (b) => {
    const { errors: w } = await M(b);
    if (b)
      for (const T of b) {
        const P = I(w, T);
        P ? se(t.errors, T, P) : we(t.errors, T);
      }
    else
      t.errors = w;
    return w;
  }, L = async (b, w, T = {
    valid: !0
  }) => {
    for (const P in b) {
      const R = b[P];
      if (R) {
        const { _f: O, ...H } = R;
        if (O) {
          const ie = l.array.has(O.name), ce = R._f && $h(R._f);
          ce && u.validatingFields && g([O.name], !0);
          const ot = await xo(R, l.disabled, i, h, e.shouldUseNativeValidation && !w, ie);
          if (ce && u.validatingFields && g([O.name]), ot[O.name] && (T.valid = !1, w))
            break;
          !w && (I(ot, O.name) ? ie ? mu(t.errors, ot, O.name) : se(t.errors, O.name, ot[O.name]) : we(t.errors, O.name));
        }
        !je(H) && await L(H, w, T);
      }
    }
    return T.valid;
  }, z = () => {
    for (const b of l.unMount) {
      const w = I(r, b);
      w && (w._f.refs ? w._f.refs.every((T) => !ki(T)) : !ki(w._f.ref)) && xe(b);
    }
    l.unMount = /* @__PURE__ */ new Set();
  }, X = (b, w) => !e.disabled && (b && w && se(i, b, w), !pt(ye(), s)), F = (b, w, T) => mo(b, l, {
    ...o.mount ? i : ue(w) ? s : tt(b) ? { [b]: w } : w
  }, T, w), V = (b) => Zs(I(o.mount ? i : s, b, e.shouldUnregister ? I(s, b, []) : [])), W = (b, w, T = {}) => {
    const P = I(r, b);
    let R = w;
    if (P) {
      const O = P._f;
      O && (!O.disabled && se(i, b, hu(w, O)), R = ls(O.ref) && Ye(w) ? "" : w, uu(O.ref) ? [...O.ref.options].forEach((H) => H.selected = R.includes(H.value)) : O.refs ? Lr(O.ref) ? O.refs.forEach((H) => {
        (!H.defaultChecked || !H.disabled) && (Array.isArray(R) ? H.checked = !!R.find((ie) => ie === H.value) : H.checked = R === H.value || !!R);
      }) : O.refs.forEach((H) => H.checked = H.value === R) : sl(O.ref) ? O.ref.value = "" : (O.ref.value = R, O.ref.type || f.state.next({
        name: b,
        values: fe(i)
      })));
    }
    (T.shouldDirty || T.shouldTouch) && x(b, R, T.shouldTouch, T.shouldDirty, !0), T.shouldValidate && ee(b);
  }, J = (b, w, T) => {
    for (const P in w) {
      if (!w.hasOwnProperty(P))
        return;
      const R = w[P], O = b + "." + P, H = I(r, O);
      (l.array.has(b) || Te(R) || H && !H._f) && !un(R) ? J(O, R, T) : W(O, R, T);
    }
  }, Q = (b, w, T = {}) => {
    const P = I(r, b), R = l.array.has(b), O = fe(w);
    se(i, b, O), R ? (f.array.next({
      name: b,
      values: fe(i)
    }), (u.isDirty || u.dirtyFields || d.isDirty || d.dirtyFields) && T.shouldDirty && f.state.next({
      name: b,
      dirtyFields: Bn(s, i),
      isDirty: X(b, O)
    })) : P && !P._f && !Ye(O) ? J(b, O, T) : W(b, O, T), bo(b, l) && f.state.next({ ...t, name: b }), f.state.next({
      name: o.mount ? b : void 0,
      values: fe(i)
    });
  }, re = async (b) => {
    o.mount = !0;
    const w = b.target;
    let T = w.name, P = !0;
    const R = I(r, T), O = (ce) => {
      P = Number.isNaN(ce) || un(ce) && isNaN(ce.getTime()) || pt(ce, I(i, T, ce));
    }, H = $n(e.mode), ie = $n(e.reValidateMode);
    if (R) {
      let ce, ot;
      const zr = w.type ? ra(R._f) : iu(b), _t = b.type === is.BLUR || b.type === is.FOCUS_OUT, ph = !Hh(R._f) && !e.resolver && !I(t.errors, T) && !R._f.deps || qh(_t, I(t.touchedFields, T), t.isSubmitted, ie, H), yi = bo(T, l, _t);
      se(i, T, zr), _t ? (!w || !w.readOnly) && (R._f.onBlur && R._f.onBlur(b), a && a(0)) : R._f.onChange && R._f.onChange(b);
      const bi = x(T, zr, _t), mh = !je(bi) || yi;
      if (!_t && f.state.next({
        name: T,
        type: b.type,
        values: fe(i)
      }), ph)
        return (u.isValid || d.isValid) && (e.mode === "onBlur" ? _t && m() : _t || m()), mh && f.state.next({ name: T, ...yi ? {} : bi });
      if (!_t && yi && f.state.next({ ...t }), e.resolver) {
        const { errors: Yl } = await M([T]);
        if (O(zr), P) {
          const gh = ia(t.errors, r, T), Xl = ia(Yl, r, gh.name || T);
          ce = Xl.error, T = Xl.name, ot = je(Yl);
        }
      } else
        g([T], !0), ce = (await xo(R, l.disabled, i, h, e.shouldUseNativeValidation))[T], g([T]), O(zr), P && (ce ? ot = !1 : (u.isValid || d.isValid) && (ot = await L(r, !0)));
      P && (R._f.deps && (!Array.isArray(R._f.deps) || R._f.deps.length > 0) && ee(R._f.deps), E(T, ot, ce, bi));
    }
  }, Z = (b, w) => {
    if (I(t.errors, w) && b.focus)
      return b.focus(), 1;
  }, ee = async (b, w = {}) => {
    let T, P;
    const R = Qe(b);
    if (e.resolver) {
      const O = await D(ue(b) ? b : R);
      T = je(O), P = b ? !R.some((H) => I(O, H)) : T;
    } else b ? (P = (await Promise.all(R.map(async (O) => {
      const H = I(r, O);
      return await L(H && H._f ? { [O]: H } : H);
    }))).every(Boolean), !(!P && !t.isValid) && m()) : P = T = await L(r);
    return f.state.next({
      ...!tt(b) || (u.isValid || d.isValid) && T !== t.isValid ? {} : { name: b },
      ...e.resolver || !b ? { isValid: T } : {},
      errors: t.errors
    }), w.shouldFocus && !P && Un(r, Z, b ? R : l.mount), P;
  }, ye = (b, w) => {
    let T = {
      ...o.mount ? i : s
    };
    return w && (T = cu(w.dirtyFields ? t.dirtyFields : t.touchedFields, T)), ue(b) ? T : tt(b) ? I(T, b) : b.map((P) => I(T, P));
  }, _e = (b, w) => ({
    invalid: !!I((w || t).errors, b),
    isDirty: !!I((w || t).dirtyFields, b),
    error: I((w || t).errors, b),
    isValidating: !!I(t.validatingFields, b),
    isTouched: !!I((w || t).touchedFields, b)
  }), We = (b) => {
    b && Qe(b).forEach((w) => we(t.errors, w)), f.state.next({
      errors: b ? t.errors : {}
    });
  }, Oe = (b, w, T) => {
    const P = (I(r, b, { _f: {} })._f || {}).ref, R = I(t.errors, b) || {}, { ref: O, message: H, type: ie, ...ce } = R;
    se(t.errors, b, {
      ...ce,
      ...w,
      ref: P
    }), f.state.next({
      name: b,
      errors: t.errors,
      isValid: !1
    }), T && T.shouldFocus && P && P.focus && P.focus();
  }, ne = (b, w) => mt(b) ? f.state.subscribe({
    next: (T) => "values" in T && b(F(void 0, w), T)
  }) : F(b, w, !0), be = (b) => f.state.subscribe({
    next: (w) => {
      Wh(b.name, w.name, b.exact) && Uh(w, b.formState || u, On, b.reRenderRoot) && b.callback({
        values: { ...i },
        ...t,
        ...w,
        defaultValues: s
      });
    }
  }).unsubscribe, de = (b) => (o.mount = !0, d = {
    ...d,
    ...b.formState
  }, be({
    ...b,
    formState: d
  })), xe = (b, w = {}) => {
    for (const T of b ? Qe(b) : l.mount)
      l.mount.delete(T), l.array.delete(T), w.keepValue || (we(r, T), we(i, T)), !w.keepError && we(t.errors, T), !w.keepDirty && we(t.dirtyFields, T), !w.keepTouched && we(t.touchedFields, T), !w.keepIsValidating && we(t.validatingFields, T), !e.shouldUnregister && !w.keepDefaultValue && we(s, T);
    f.state.next({
      values: fe(i)
    }), f.state.next({
      ...t,
      ...w.keepDirty ? { isDirty: X() } : {}
    }), !w.keepIsValid && m();
  }, Be = ({ disabled: b, name: w }) => {
    (et(b) && o.mount || b || l.disabled.has(w)) && (b ? l.disabled.add(w) : l.disabled.delete(w));
  }, Ge = (b, w = {}) => {
    let T = I(r, b);
    const P = et(w.disabled) || et(e.disabled);
    return se(r, b, {
      ...T || {},
      _f: {
        ...T && T._f ? T._f : { ref: { name: b } },
        name: b,
        mount: !0,
        ...w
      }
    }), l.mount.add(b), T ? Be({
      disabled: et(w.disabled) ? w.disabled : e.disabled,
      name: b
    }) : v(b, !0, w.value), {
      ...P ? { disabled: w.disabled || e.disabled } : {},
      ...e.progressive ? {
        required: !!w.required,
        min: nr(w.min),
        max: nr(w.max),
        minLength: nr(w.minLength),
        maxLength: nr(w.maxLength),
        pattern: nr(w.pattern)
      } : {},
      name: b,
      onChange: re,
      onBlur: re,
      ref: (R) => {
        if (R) {
          Ge(b, w), T = I(r, b);
          const O = ue(R.value) && R.querySelectorAll && R.querySelectorAll("input,select,textarea")[0] || R, H = Bh(O), ie = T._f.refs || [];
          if (H ? ie.find((ce) => ce === O) : O === T._f.ref)
            return;
          se(r, b, {
            _f: {
              ...T._f,
              ...H ? {
                refs: [
                  ...ie.filter(ki),
                  O,
                  ...Array.isArray(I(s, b)) ? [{}] : []
                ],
                ref: { type: O.type, name: b }
              } : { ref: O }
            }
          }), v(b, !1, void 0, O);
        } else
          T = I(r, b, {}), T._f && (T._f.mount = !1), (e.shouldUnregister || w.shouldUnregister) && !(ou(l.array, b) && o.action) && l.unMount.add(b);
      }
    };
  }, on = () => e.shouldFocusError && Un(r, Z, l.mount), te = (b) => {
    et(b) && (f.state.next({ disabled: b }), Un(r, (w, T) => {
      const P = I(r, T);
      P && (w.disabled = P._f.disabled || b, Array.isArray(P._f.refs) && P._f.refs.forEach((R) => {
        R.disabled = P._f.disabled || b;
      }));
    }, 0, !1));
  }, K = (b, w) => async (T) => {
    let P;
    T && (T.preventDefault && T.preventDefault(), T.persist && T.persist());
    let R = fe(i);
    if (f.state.next({
      isSubmitting: !0
    }), e.resolver) {
      const { errors: O, values: H } = await M();
      t.errors = O, R = fe(H);
    } else
      await L(r);
    if (l.disabled.size)
      for (const O of l.disabled)
        we(R, O);
    if (we(t.errors, "root"), je(t.errors)) {
      f.state.next({
        errors: {}
      });
      try {
        await b(R, T);
      } catch (O) {
        P = O;
      }
    } else
      w && await w({ ...t.errors }, T), on(), setTimeout(on);
    if (f.state.next({
      isSubmitted: !0,
      isSubmitting: !1,
      isSubmitSuccessful: je(t.errors) && !P,
      submitCount: t.submitCount + 1,
      errors: t.errors
    }), P)
      throw P;
  }, Se = (b, w = {}) => {
    I(r, b) && (ue(w.defaultValue) ? Q(b, fe(I(s, b))) : (Q(b, w.defaultValue), se(s, b, fe(w.defaultValue))), w.keepTouched || we(t.touchedFields, b), w.keepDirty || (we(t.dirtyFields, b), t.isDirty = w.defaultValue ? X(b, fe(I(s, b))) : X()), w.keepError || (we(t.errors, b), u.isValid && m()), f.state.next({ ...t }));
  }, Ct = (b, w = {}) => {
    const T = b ? fe(b) : s, P = fe(T), R = je(b), O = R ? s : P;
    if (w.keepDefaultValues || (s = T), !w.keepValues) {
      if (w.keepDirtyValues) {
        const H = /* @__PURE__ */ new Set([
          ...l.mount,
          ...Object.keys(Bn(s, i))
        ]);
        for (const ie of Array.from(H))
          I(t.dirtyFields, ie) ? se(O, ie, I(i, ie)) : Q(ie, I(O, ie));
      } else {
        if (el && ue(b))
          for (const H of l.mount) {
            const ie = I(r, H);
            if (ie && ie._f) {
              const ce = Array.isArray(ie._f.refs) ? ie._f.refs[0] : ie._f.ref;
              if (ls(ce)) {
                const ot = ce.closest("form");
                if (ot) {
                  ot.reset();
                  break;
                }
              }
            }
          }
        if (w.keepFieldsRef)
          for (const H of l.mount)
            Q(H, I(O, H));
        else
          r = {};
      }
      i = e.shouldUnregister ? w.keepDefaultValues ? fe(s) : {} : fe(O), f.array.next({
        values: { ...O }
      }), f.state.next({
        values: { ...O }
      });
    }
    l = {
      mount: w.keepDirtyValues ? l.mount : /* @__PURE__ */ new Set(),
      unMount: /* @__PURE__ */ new Set(),
      array: /* @__PURE__ */ new Set(),
      disabled: /* @__PURE__ */ new Set(),
      watch: /* @__PURE__ */ new Set(),
      watchAll: !1,
      focus: ""
    }, o.mount = !u.isValid || !!w.keepIsValid || !!w.keepDirtyValues || !e.shouldUnregister && !je(O), o.watch = !!e.shouldUnregister, f.state.next({
      submitCount: w.keepSubmitCount ? t.submitCount : 0,
      isDirty: R ? !1 : w.keepDirty ? t.isDirty : !!(w.keepDefaultValues && !pt(b, s)),
      isSubmitted: w.keepIsSubmitted ? t.isSubmitted : !1,
      dirtyFields: R ? {} : w.keepDirtyValues ? w.keepDefaultValues && i ? Bn(s, i) : t.dirtyFields : w.keepDefaultValues && b ? Bn(s, b) : w.keepDirty ? t.dirtyFields : {},
      touchedFields: w.keepTouched ? t.touchedFields : {},
      errors: w.keepErrors ? t.errors : {},
      isSubmitSuccessful: w.keepIsSubmitSuccessful ? t.isSubmitSuccessful : !1,
      isSubmitting: !1,
      defaultValues: s
    });
  }, it = (b, w) => Ct(mt(b) ? b(i) : b, w), Nn = (b, w = {}) => {
    const T = I(r, b), P = T && T._f;
    if (P) {
      const R = P.refs ? P.refs[0] : P.ref;
      R.focus && (R.focus(), w.shouldSelect && mt(R.select) && R.select());
    }
  }, On = (b) => {
    t = {
      ...t,
      ...b
    };
  }, Dn = {
    control: {
      register: Ge,
      unregister: xe,
      getFieldState: _e,
      handleSubmit: K,
      setError: Oe,
      _subscribe: be,
      _runSchema: M,
      _focusError: on,
      _getWatch: F,
      _getDirty: X,
      _setValid: m,
      _setFieldArray: y,
      _setDisabledField: Be,
      _setErrors: C,
      _getFieldArray: V,
      _reset: Ct,
      _resetDefaultValues: () => mt(e.defaultValues) && e.defaultValues().then((b) => {
        it(b, e.resetOptions), f.state.next({
          isLoading: !1
        });
      }),
      _removeUnmounted: z,
      _disableForm: te,
      _subjects: f,
      _proxyFormState: u,
      get _fields() {
        return r;
      },
      get _formValues() {
        return i;
      },
      get _state() {
        return o;
      },
      set _state(b) {
        o = b;
      },
      get _defaultValues() {
        return s;
      },
      get _names() {
        return l;
      },
      set _names(b) {
        l = b;
      },
      get _formState() {
        return t;
      },
      get _options() {
        return e;
      },
      set _options(b) {
        e = {
          ...e,
          ...b
        };
      }
    },
    subscribe: de,
    trigger: ee,
    register: Ge,
    handleSubmit: K,
    watch: ne,
    setValue: Q,
    getValues: ye,
    reset: it,
    resetField: Se,
    clearErrors: We,
    unregister: xe,
    setError: Oe,
    setFocus: Nn,
    getFieldState: _e
  };
  return {
    ...Dn,
    formControl: Dn
  };
}
var Bt = () => {
  if (typeof crypto < "u" && crypto.randomUUID)
    return crypto.randomUUID();
  const n = typeof performance > "u" ? Date.now() : performance.now() * 1e3;
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (e) => {
    const t = (Math.random() * 16 + n) % 16 | 0;
    return (e == "x" ? t : t & 3 | 8).toString(16);
  });
}, vi = (n, e, t = {}) => t.shouldFocus || ue(t.shouldFocus) ? t.focusName || `${n}.${ue(t.focusIndex) ? e : t.focusIndex}.` : "", Si = (n, e) => [
  ...n,
  ...Qe(e)
], wi = (n) => Array.isArray(n) ? n.map(() => {
}) : void 0;
function Ci(n, e, t) {
  return [
    ...n.slice(0, e),
    ...Qe(t),
    ...n.slice(e)
  ];
}
var Ei = (n, e, t) => Array.isArray(n) ? (ue(n[t]) && (n[t] = void 0), n.splice(t, 0, n.splice(e, 1)[0]), n) : [], Mi = (n, e) => [
  ...Qe(e),
  ...Qe(n)
];
function Yh(n, e) {
  let t = 0;
  const r = [...n];
  for (const s of e)
    r.splice(s - t, 1), t++;
  return Zs(r).length ? r : [];
}
var Ti = (n, e) => ue(e) ? [] : Yh(n, Qe(e).sort((t, r) => t - r)), Ai = (n, e, t) => {
  [n[e], n[t]] = [n[t], n[e]];
}, la = (n, e, t) => (n[e] = t, n);
function Xh(n) {
  const e = tn(), { control: t = e.control, name: r, keyName: s = "id", shouldUnregister: i, rules: o } = n, [l, a] = B.useState(t._getFieldArray(r)), c = B.useRef(t._getFieldArray(r).map(Bt)), u = B.useRef(!1);
  t._names.array.add(r), B.useMemo(() => o && l.length >= 0 && t.register(r, o), [t, r, l.length, o]), ei(() => t._subjects.array.subscribe({
    next: ({ values: v, name: x }) => {
      if (x === r || !x) {
        const E = I(v, r);
        Array.isArray(E) && (a(E), c.current = E.map(Bt));
      }
    }
  }).unsubscribe, [t, r]);
  const d = B.useCallback((v) => {
    u.current = !0, t._setFieldArray(r, v);
  }, [t, r]), f = (v, x) => {
    const E = Qe(fe(v)), M = Si(t._getFieldArray(r), E);
    t._names.focus = vi(r, M.length - 1, x), c.current = Si(c.current, E.map(Bt)), d(M), a(M), t._setFieldArray(r, M, Si, {
      argA: wi(v)
    });
  }, h = (v, x) => {
    const E = Qe(fe(v)), M = Mi(t._getFieldArray(r), E);
    t._names.focus = vi(r, 0, x), c.current = Mi(c.current, E.map(Bt)), d(M), a(M), t._setFieldArray(r, M, Mi, {
      argA: wi(v)
    });
  }, p = (v) => {
    const x = Ti(t._getFieldArray(r), v);
    c.current = Ti(c.current, v), d(x), a(x), !Array.isArray(I(t._fields, r)) && se(t._fields, r, void 0), t._setFieldArray(r, x, Ti, {
      argA: v
    });
  }, m = (v, x, E) => {
    const M = Qe(fe(x)), D = Ci(t._getFieldArray(r), v, M);
    t._names.focus = vi(r, v, E), c.current = Ci(c.current, v, M.map(Bt)), d(D), a(D), t._setFieldArray(r, D, Ci, {
      argA: v,
      argB: wi(x)
    });
  }, g = (v, x) => {
    const E = t._getFieldArray(r);
    Ai(E, v, x), Ai(c.current, v, x), d(E), a(E), t._setFieldArray(r, E, Ai, {
      argA: v,
      argB: x
    }, !1);
  }, y = (v, x) => {
    const E = t._getFieldArray(r);
    Ei(E, v, x), Ei(c.current, v, x), d(E), a(E), t._setFieldArray(r, E, Ei, {
      argA: v,
      argB: x
    }, !1);
  }, k = (v, x) => {
    const E = fe(x), M = la(t._getFieldArray(r), v, E);
    c.current = [...M].map((D, L) => !D || L === v ? Bt() : c.current[L]), d(M), a([...M]), t._setFieldArray(r, M, la, {
      argA: v,
      argB: E
    }, !0, !1);
  }, C = (v) => {
    const x = Qe(fe(v));
    c.current = x.map(Bt), d([...x]), a([...x]), t._setFieldArray(r, [...x], (E) => E, {}, !0, !1);
  };
  return B.useEffect(() => {
    if (t._state.action = !1, bo(r, t._names) && t._subjects.state.next({
      ...t._formState
    }), u.current && (!$n(t._options.mode).isOnSubmit || t._formState.isSubmitted) && !$n(t._options.reValidateMode).isOnSubmit)
      if (t._options.resolver)
        t._runSchema([r]).then((v) => {
          const x = I(v.errors, r), E = I(t._formState.errors, r);
          (E ? !x && E.type || x && (E.type !== x.type || E.message !== x.message) : x && x.type) && (x ? se(t._formState.errors, r, x) : we(t._formState.errors, r), t._subjects.state.next({
            errors: t._formState.errors
          }));
        });
      else {
        const v = I(t._fields, r);
        v && v._f && !($n(t._options.reValidateMode).isOnSubmit && $n(t._options.mode).isOnSubmit) && xo(v, t._names.disabled, t._formValues, t._options.criteriaMode === ut.all, t._options.shouldUseNativeValidation, !0).then((x) => !je(x) && t._subjects.state.next({
          errors: mu(t._formState.errors, x, r)
        }));
      }
    t._subjects.state.next({
      name: r,
      values: fe(t._formValues)
    }), t._names.focus && Un(t._fields, (v, x) => {
      if (t._names.focus && x.startsWith(t._names.focus) && v.focus)
        return v.focus(), 1;
    }), t._names.focus = "", t._setValid(), u.current = !1;
  }, [l, r, t]), B.useEffect(() => (!I(t._formValues, r) && t._setFieldArray(r), () => {
    const v = (x, E) => {
      const M = I(t._fields, x);
      M && M._f && (M._f.mount = E);
    };
    t._options.shouldUnregister || i ? t.unregister(r) : v(r, !1);
  }), [r, t, s, i]), {
    swap: B.useCallback(g, [d, r, t]),
    move: B.useCallback(y, [d, r, t]),
    prepend: B.useCallback(h, [d, r, t]),
    append: B.useCallback(f, [d, r, t]),
    remove: B.useCallback(p, [d, r, t]),
    insert: B.useCallback(m, [d, r, t]),
    update: B.useCallback(k, [d, r, t]),
    replace: B.useCallback(C, [d, r, t]),
    fields: B.useMemo(() => l.map((v, x) => ({
      ...v,
      [s]: c.current[x] || Bt()
    })), [l, s])
  };
}
function ol(n = {}) {
  const e = B.useRef(void 0), t = B.useRef(void 0), [r, s] = B.useState({
    isDirty: !1,
    isValidating: !1,
    isLoading: mt(n.defaultValues),
    isSubmitted: !1,
    isSubmitting: !1,
    isSubmitSuccessful: !1,
    isValid: !1,
    submitCount: 0,
    dirtyFields: {},
    touchedFields: {},
    validatingFields: {},
    errors: n.errors || {},
    disabled: n.disabled || !1,
    isReady: !1,
    defaultValues: mt(n.defaultValues) ? void 0 : n.defaultValues
  });
  if (!e.current)
    if (n.formControl)
      e.current = {
        ...n.formControl,
        formState: r
      }, n.defaultValues && !mt(n.defaultValues) && n.formControl.reset(n.defaultValues, n.resetOptions);
    else {
      const { formControl: o, ...l } = Gh(n);
      e.current = {
        ...l,
        formState: r
      };
    }
  const i = e.current.control;
  return i._options = n, ei(() => {
    const o = i._subscribe({
      formState: i._proxyFormState,
      callback: () => s({ ...i._formState }),
      reRenderRoot: !0
    });
    return s((l) => ({
      ...l,
      isReady: !0
    })), i._formState.isReady = !0, o;
  }, [i]), B.useEffect(() => i._disableForm(n.disabled), [i, n.disabled]), B.useEffect(() => {
    n.mode && (i._options.mode = n.mode), n.reValidateMode && (i._options.reValidateMode = n.reValidateMode);
  }, [i, n.mode, n.reValidateMode]), B.useEffect(() => {
    n.errors && (i._setErrors(n.errors), i._focusError());
  }, [i, n.errors]), B.useEffect(() => {
    n.shouldUnregister && i._subjects.state.next({
      values: i._getWatch()
    });
  }, [i, n.shouldUnregister]), B.useEffect(() => {
    if (i._proxyFormState.isDirty) {
      const o = i._getDirty();
      o !== r.isDirty && i._subjects.state.next({
        isDirty: o
      });
    }
  }, [i, r.isDirty]), B.useEffect(() => {
    var o;
    n.values && !pt(n.values, t.current) ? (i._reset(n.values, {
      keepFieldsRef: !0,
      ...i._options.resetOptions
    }), !((o = i._options.resetOptions) === null || o === void 0) && o.keepIsValid || i._setValid(), t.current = n.values, s((l) => ({ ...l }))) : i._resetDefaultValues();
  }, [i, n.values]), B.useEffect(() => {
    i._state.mount || (i._setValid(), i._state.mount = !0), i._state.watch && (i._state.watch = !1, i._subjects.state.next({ ...i._formState })), i._removeUnmounted();
  }), e.current.formState = lu(r, i), e.current;
}
function Qh(n, e) {
  var t;
  if (e)
    return (t = e.split(".").reduce((r, s) => r == null ? void 0 : r[s], n)) == null ? void 0 : t.message;
}
const ll = U.forwardRef(
  ({ className: n, label: e, error: t, required: r, htmlFor: s, children: i, name: o, ...l }, a) => {
    var f;
    const c = o ? tn() : null, u = t ?? Qh((f = c == null ? void 0 : c.formState) == null ? void 0 : f.errors, o);
    let d = i;
    if (o && (c != null && c.register) && U.isValidElement(i)) {
      const h = c.register(o);
      d = U.cloneElement(i, {
        ...h,
        ...i.props
      });
    }
    return /* @__PURE__ */ S.jsxs("div", { ref: a, className: Ce(pe("flex flex-col gap-1.5", n)), ...l, children: [
      e && /* @__PURE__ */ S.jsxs(
        "label",
        {
          htmlFor: s ?? (typeof o == "string" ? o : void 0),
          className: "text-sm font-medium leading-none text-text-primary peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          children: [
            e,
            r && /* @__PURE__ */ S.jsx("span", { className: "ml-1 text-red-500", children: "*" })
          ]
        }
      ),
      d,
      u && /* @__PURE__ */ S.jsx("p", { className: "text-xs font-medium text-red-500", children: u })
    ] });
  }
);
ll.displayName = "FormField";
const Zh = U.forwardRef(
  ({ className: n, label: e, toggleSize: t = 30, onChange: r, onCheckedChange: s, disabled: i, style: o, ...l }, a) => {
    const c = en(), u = (f) => {
      c(
        Lt.UI_CHANGE,
        { checked: f.target.checked, value: f.target.value },
        { meta: { component: "ThemeSwitch" } }
      ), s == null || s(f.target.checked), r == null || r(f);
    }, d = {
      ...o || {},
      ...t !== void 0 ? {
        "--toggle-size": typeof t == "number" ? `${t}px` : t
      } : {}
    };
    return /* @__PURE__ */ S.jsxs("div", { className: pe("inline-flex items-center gap-3", n), children: [
      /* @__PURE__ */ S.jsxs("label", { className: pe("rai-theme-switch", i && "rai-theme-switch--disabled"), style: d, children: [
        /* @__PURE__ */ S.jsx(
          "input",
          {
            ref: a,
            type: "checkbox",
            className: "rai-theme-switch__checkbox",
            disabled: i,
            onChange: u,
            ...l
          }
        ),
        /* @__PURE__ */ S.jsxs("div", { className: "rai-theme-switch__container", children: [
          /* @__PURE__ */ S.jsx("div", { className: "rai-theme-switch__clouds" }),
          /* @__PURE__ */ S.jsx("div", { className: "rai-theme-switch__stars-container", children: /* @__PURE__ */ S.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 144 55", fill: "none", children: /* @__PURE__ */ S.jsx(
            "path",
            {
              fillRule: "evenodd",
              clipRule: "evenodd",
              d: "M135.831 3.00688C135.055 3.85027 134.111 4.29946 133 4.35447C134.111 4.40947 135.055 4.85867 135.831 5.71123C136.607 6.55462 136.996 7.56303 136.996 8.72727C136.996 7.95722 137.172 7.25134 137.525 6.59129C137.886 5.93124 138.372 5.39954 138.98 5.00535C139.598 4.60199 140.268 4.39114 141 4.35447C139.88 4.2903 138.936 3.85027 138.16 3.00688C137.384 2.16348 136.996 1.16425 136.996 0C136.996 1.16425 136.607 2.16348 135.831 3.00688ZM31 23.3545C32.1114 23.2995 33.0551 22.8503 33.8313 22.0069C34.6075 21.1635 34.9956 20.1642 34.9956 19C34.9956 20.1642 35.3837 21.1635 36.1599 22.0069C36.9361 22.8503 37.8798 23.2903 39 23.3545C38.2679 23.3911 37.5976 23.602 36.9802 24.0053C36.3716 24.3995 35.8864 24.9312 35.5248 25.5913C35.172 26.2513 34.9956 26.9572 34.9956 27.7273C34.9956 26.563 34.6075 25.5546 33.8313 24.7112C33.0551 23.8587 32.1114 23.4095 31 23.3545ZM0 36.3545C1.11136 36.2995 2.05513 35.8503 2.83131 35.0069C3.6075 34.1635 3.99559 33.1642 3.99559 32C3.99559 33.1642 4.38368 34.1635 5.15987 35.0069C5.93605 35.8503 6.87982 36.2903 8 36.3545C7.26792 36.3911 6.59757 36.602 5.98015 37.0053C5.37155 37.3995 4.88644 37.9312 4.52481 38.5913C4.172 39.2513 3.99559 39.9572 3.99559 40.7273C3.99559 39.563 3.6075 38.5546 2.83131 37.7112C2.05513 36.8587 1.11136 36.4095 0 36.3545ZM56.8313 24.0069C56.0551 24.8503 55.1114 25.2995 54 25.3545C55.1114 25.4095 56.0551 25.8587 56.8313 26.7112C57.6075 27.5546 57.9956 28.563 57.9956 29.7273C57.9956 28.9572 58.172 28.2513 58.5248 27.5913C58.8864 26.9312 59.3716 26.3995 59.9802 26.0053C60.5976 25.602 61.2679 25.3911 62 25.3545C60.8798 25.2903 59.9361 24.8503 59.1599 24.0069C58.3837 23.1635 57.9956 22.1642 57.9956 21C57.9956 22.1642 57.6075 23.1635 56.8313 24.0069ZM81 25.3545C82.1114 25.2995 83.0551 24.8503 83.8313 24.0069C84.6075 23.1635 84.9956 22.1642 84.9956 21C84.9956 22.1642 85.3837 23.1635 86.1599 24.0069C86.9361 24.8503 87.8798 25.2903 89 25.3545C88.2679 25.3911 87.5976 25.602 86.9802 26.0053C86.3716 26.3995 85.8864 26.9312 85.5248 27.5913C85.172 28.2513 84.9956 28.9572 84.9956 29.7273C84.9956 28.563 84.6075 27.5546 83.8313 26.7112C83.0551 25.8587 82.1114 25.4095 81 25.3545ZM136 36.3545C137.111 36.2995 138.055 35.8503 138.831 35.0069C139.607 34.1635 139.996 33.1642 139.996 32C139.996 33.1642 140.384 34.1635 141.16 35.0069C141.936 35.8503 142.88 36.2903 144 36.3545C143.268 36.3911 142.598 36.602 141.98 37.0053C141.372 37.3995 140.886 37.9312 140.525 38.5913C140.172 39.2513 139.996 39.9572 139.996 40.7273C139.996 39.563 139.607 38.5546 138.831 37.7112C138.055 36.8587 137.111 36.4095 136 36.3545ZM101.831 49.0069C101.055 49.8503 100.111 50.2995 99 50.3545C100.111 50.4095 101.055 50.8587 101.831 51.7112C102.607 52.5546 102.996 53.563 102.996 54.7273C102.996 53.9572 103.172 53.2513 103.525 52.5913C103.886 51.9312 104.372 51.3995 104.98 51.0053C105.598 50.602 106.268 50.3911 107 50.3545C105.88 50.2903 104.936 49.8503 104.16 49.0069C103.384 48.1635 102.996 47.1642 102.996 46C102.996 47.1642 102.607 48.1635 101.831 49.0069Z",
              fill: "currentColor"
            }
          ) }) }),
          /* @__PURE__ */ S.jsx("div", { className: "rai-theme-switch__circle-container", children: /* @__PURE__ */ S.jsx("div", { className: "rai-theme-switch__sun-moon-container", children: /* @__PURE__ */ S.jsxs("div", { className: "rai-theme-switch__moon", children: [
            /* @__PURE__ */ S.jsx("div", { className: "rai-theme-switch__spot" }),
            /* @__PURE__ */ S.jsx("div", { className: "rai-theme-switch__spot" }),
            /* @__PURE__ */ S.jsx("div", { className: "rai-theme-switch__spot" })
          ] }) }) })
        ] })
      ] }),
      e && /* @__PURE__ */ S.jsx("span", { className: "text-sm font-medium text-text", children: e })
    ] });
  }
);
Zh.displayName = "ThemeSwitch";
const gu = U.forwardRef(
  ({ className: n, error: e, fullWidth: t = !0, resize: r = "vertical", onChange: s, ...i }, o) => {
    const l = en(), a = (u) => {
      l(
        Lt.UI_CHANGE,
        { value: u.target.value },
        {
          meta: { component: "Textarea" },
          flags: { sensitive: !1 }
        }
      ), s == null || s(u);
    }, c = {
      none: "resize-none",
      vertical: "resize-y",
      horizontal: "resize-x",
      both: "resize"
    };
    return /* @__PURE__ */ S.jsx(
      "textarea",
      {
        ref: o,
        className: Ce(
          pe(
            "flex min-h-[80px] w-full rounded-xl bg-surface-alt px-3 py-2 text-sm placeholder:text-text-muted",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "transition-all duration-200",
            c[r],
            e && "ring-2 ring-red-500 focus-visible:ring-red-500",
            t ? "w-full" : "w-auto",
            n
          )
        ),
        onChange: a,
        ...i
      }
    );
  }
);
gu.displayName = "Textarea";
const yu = U.forwardRef(
  ({ className: n, label: e, error: t, variant: r = "primary", onChange: s, id: i, ...o }, l) => {
    const a = en(), c = U.useId(), u = i || c, d = (p) => {
      a(
        Lt.UI_CHANGE,
        { checked: p.target.checked, value: p.target.value },
        { meta: { component: "Radio" } }
      ), s == null || s(p);
    }, h = t ? "border-red-500 checked:bg-red-500 checked:border-red-500 focus-visible:ring-red-500" : {
      primary: "checked:bg-primary-500 checked:border-primary-500 focus-visible:ring-primary-500",
      success: "checked:bg-green-500 checked:border-green-500 focus-visible:ring-green-500",
      warning: "checked:bg-amber-500 checked:border-amber-500 focus-visible:ring-amber-500",
      danger: "checked:bg-red-500 checked:border-red-500 focus-visible:ring-red-500",
      info: "checked:bg-blue-500 checked:border-blue-500 focus-visible:ring-blue-500"
    }[r];
    return /* @__PURE__ */ S.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ S.jsx(
        "input",
        {
          ref: l,
          type: "radio",
          id: u,
          className: Ce(
            pe(
              "h-4 w-4 cursor-pointer rounded-full border border-slate-300 bg-transparent",
              "appearance-none",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "transition-all duration-200",
              h,
              n
            )
          ),
          onChange: d,
          ...o
        }
      ),
      e && /* @__PURE__ */ S.jsx(
        "label",
        {
          htmlFor: u,
          className: "cursor-pointer text-sm font-medium text-text-primary select-none",
          children: e
        }
      )
    ] });
  }
);
yu.displayName = "Radio";
const ep = U.forwardRef(
  ({ name: n, options: e, value: t, onChange: r, orientation: s = "vertical", className: i, error: o }, l) => {
    const a = (c) => {
      r == null || r(c.target.value);
    };
    return /* @__PURE__ */ S.jsx(
      "div",
      {
        ref: l,
        role: "radiogroup",
        className: Ce(
          pe(
            "flex gap-4",
            s === "vertical" ? "flex-col" : "flex-row flex-wrap",
            i
          )
        ),
        children: e.map((c) => /* @__PURE__ */ S.jsx(
          yu,
          {
            name: n,
            value: c.value,
            label: c.label,
            checked: t === c.value,
            onChange: a,
            disabled: c.disabled,
            error: o
          },
          c.value
        ))
      }
    );
  }
);
ep.displayName = "RadioGroup";
const bu = U.forwardRef(
  ({
    className: n,
    fetchOptions: e,
    pageSize: t = 20,
    placeholder: r,
    error: s,
    fullWidth: i = !0,
    disabled: o = !1,
    value: l,
    defaultValue: a = "",
    onValueChange: c,
    enableSearch: u = !0,
    debounceMs: d = 400,
    searchPlaceholder: f = "Tìm kiếm...",
    emptyText: h = "No options",
    loadingText: p = "Loading...",
    name: m,
    id: g,
    onChange: y,
    ...k
  }, C) => {
    const v = en(), [x, E] = U.useState(!1), [M, D] = U.useState(a), L = U.useRef(null), z = U.useRef(null), [X, F] = U.useState([]), [V, W] = U.useState(!1), [J, Q] = U.useState(1), [re, Z] = U.useState(!0), [ee, ye] = U.useState(!1), [_e, We] = U.useState(null), [Oe, ne] = U.useState(""), [be, de] = U.useState(""), xe = l ?? M, Be = X.find((K) => K.value === xe), Ge = U.useCallback(
      async (K, Se = !1, Ct = be) => {
        if (!V) {
          W(!0);
          try {
            const it = await e({ page: K, pageSize: t, search: Ct });
            F((Nn) => Se ? it.data : [...Nn, ...it.data]), Z(it.hasMore), Q(K), We(null);
          } catch (it) {
            console.error("Failed to load options", it), We("Không tải được dữ liệu");
          } finally {
            W(!1), ye(!0);
          }
        }
      },
      [be, e, t, V]
    );
    U.useEffect(() => {
      const K = window.setTimeout(() => de(Oe.trim()), d);
      return () => window.clearTimeout(K);
    }, [Oe, d]), U.useEffect(() => {
      x && !ee && !V && Ge(1, !0);
    }, [x, ee, Ge, V]), U.useEffect(() => {
      x && Ge(1, !0, be);
    }, [be, x, Ge]);
    const on = (K) => {
      const { scrollTop: Se, scrollHeight: Ct, clientHeight: it } = K.currentTarget;
      Ct - Se <= it + 20 && re && !V && Ge(J + 1);
    }, te = (K) => {
      o || (l === void 0 && D(K), v(
        Lt.UI_CHANGE,
        { value: K },
        { meta: { component: "SelectLazy" } }
      ), y && y({
        target: { value: K, name: m }
      }), c == null || c(K), E(!1));
    };
    return U.useEffect(() => {
      if (!x) return;
      const K = (Se) => {
        L.current && (L.current.contains(Se.target) || E(!1));
      };
      return document.addEventListener("mousedown", K), () => document.removeEventListener("mousedown", K);
    }, [x]), /* @__PURE__ */ S.jsxs(
      "div",
      {
        ref: L,
        className: Ce(
          pe(
            "relative text-sm",
            i ? "w-full" : "w-auto",
            o && "opacity-60 cursor-not-allowed",
            n
          )
        ),
        ...k,
        children: [
          /* @__PURE__ */ S.jsx(
            "input",
            {
              ref: C,
              type: "hidden",
              name: m,
              id: g ?? m,
              value: xe ?? ""
            }
          ),
          /* @__PURE__ */ S.jsxs(
            "button",
            {
              type: "button",
              onClick: () => !o && E((K) => !K),
              className: Ce(
                pe(
                  "flex h-10 w-full items-center justify-between rounded-xl bg-surface-alt px-3 py-2",
                  "text-left",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100",
                  "transition-all duration-200",
                  !o && "cursor-pointer",
                  s && "bg-red-50 text-red-700 focus-visible:ring-red-100"
                )
              ),
              children: [
                /* @__PURE__ */ S.jsx("span", { className: pe("truncate", !Be && "text-text-muted"), children: (Be == null ? void 0 : Be.label) ?? (xe || r || "Select...") }),
                /* @__PURE__ */ S.jsx(
                  "span",
                  {
                    className: pe(
                      "ml-2 text-xs text-text-muted transition-transform",
                      x && "rotate-180"
                    ),
                    children: "▼"
                  }
                )
              ]
            }
          ),
          x && !o && /* @__PURE__ */ S.jsxs("div", { className: "absolute z-50 mt-1 w-full rounded-xl bg-surface shadow-lg outline-none overflow-hidden", children: [
            u && /* @__PURE__ */ S.jsx("div", { className: "border-b border-slate-100 bg-surface px-3 py-2", children: /* @__PURE__ */ S.jsx(
              "input",
              {
                type: "search",
                className: Ce(
                  "h-8 w-full rounded-lg bg-surface-alt px-3 text-sm",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100"
                ),
                placeholder: f,
                value: Oe,
                onChange: (K) => ne(K.target.value)
              }
            ) }),
            /* @__PURE__ */ S.jsxs(
              "ul",
              {
                ref: z,
                onScroll: on,
                className: "max-h-60 overflow-auto py-1 text-sm scrollbar-thin scrollbar-thumb-gray-200",
                children: [
                  r && /* @__PURE__ */ S.jsx("li", { className: "px-3 py-2 text-text-muted opacity-50", children: r }),
                  _e && /* @__PURE__ */ S.jsx("li", { className: "px-3 py-2 text-center text-xs text-red-600", children: _e }),
                  X.length === 0 && !V && !_e && /* @__PURE__ */ S.jsx("li", { className: "px-3 py-2 text-center text-text-muted", children: h }),
                  X.map((K) => {
                    const Se = K.value === xe;
                    return /* @__PURE__ */ S.jsx("li", { children: /* @__PURE__ */ S.jsxs(
                      "button",
                      {
                        type: "button",
                        disabled: K.disabled,
                        onClick: () => te(K.value),
                        className: Ce(
                          pe(
                            "flex w-full items-center justify-between px-3 py-2 text-left",
                            "transition-colors",
                            !K.disabled && "hover:bg-slate-50 cursor-pointer",
                            K.disabled && "cursor-not-allowed text-text-muted",
                            Se && "bg-primary-50 text-primary-700"
                          )
                        ),
                        children: [
                          /* @__PURE__ */ S.jsx("span", { className: "truncate", children: K.label }),
                          Se && /* @__PURE__ */ S.jsx("span", { className: "ml-2 text-xs text-primary-600", children: "●" })
                        ]
                      }
                    ) }, K.value);
                  }),
                  V && /* @__PURE__ */ S.jsx("li", { className: "px-3 py-2 text-center text-xs text-text-muted animate-pulse", children: p })
                ]
              }
            )
          ] })
        ]
      }
    );
  }
);
bu.displayName = "SelectLazy";
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tp = [
  [
    "path",
    {
      d: "M13.659 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v11.5",
      key: "4pqfef"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M8 12v-1", key: "1ej8lb" }],
  ["path", { d: "M8 18v-2", key: "qcmpov" }],
  ["path", { d: "M8 7V6", key: "1nbb54" }],
  ["circle", { cx: "8", cy: "20", r: "2", key: "ckkr5m" }]
], np = En("file-archive", tp);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rp = [
  [
    "path",
    {
      d: "M4 6.835V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-.343",
      key: "1vfytu"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  [
    "path",
    {
      d: "M2 19a2 2 0 0 1 4 0v1a2 2 0 0 1-4 0v-4a6 6 0 0 1 12 0v4a2 2 0 0 1-4 0v-1a2 2 0 0 1 4 0",
      key: "1etmh7"
    }
  ]
], sp = En("file-headphone", rp);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ip = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["circle", { cx: "10", cy: "12", r: "2", key: "737tya" }],
  ["path", { d: "m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22", key: "wt3hpn" }]
], op = En("file-image", ip);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lp = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  [
    "path",
    {
      d: "M15.033 13.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56v-4.704a.645.645 0 0 1 .967-.56z",
      key: "1tzo1f"
    }
  ]
], ap = En("file-play", lp);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cp = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
], up = En("file-text", cp);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dp = [
  [
    "path",
    {
      d: "M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21",
      key: "9csbqa"
    }
  ],
  ["path", { d: "m14 19.5 3-3 3 3", key: "9vmjn0" }],
  ["path", { d: "M17 22v-5.5", key: "1aa6fl" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }]
], fp = En("image-up", dp);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hp = [
  ["path", { d: "M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "14sxne" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ["path", { d: "M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16", key: "1hlbsb" }],
  ["path", { d: "M16 16h5v5", key: "ccwih5" }]
], pp = En("refresh-ccw", hp);
var ko = { exports: {} }, Ni = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var aa;
function mp() {
  if (aa) return Ni;
  aa = 1;
  var n = B;
  function e(d, f) {
    return d === f && (d !== 0 || 1 / d === 1 / f) || d !== d && f !== f;
  }
  var t = typeof Object.is == "function" ? Object.is : e, r = n.useState, s = n.useEffect, i = n.useLayoutEffect, o = n.useDebugValue;
  function l(d, f) {
    var h = f(), p = r({ inst: { value: h, getSnapshot: f } }), m = p[0].inst, g = p[1];
    return i(
      function() {
        m.value = h, m.getSnapshot = f, a(m) && g({ inst: m });
      },
      [d, h, f]
    ), s(
      function() {
        return a(m) && g({ inst: m }), d(function() {
          a(m) && g({ inst: m });
        });
      },
      [d]
    ), o(h), h;
  }
  function a(d) {
    var f = d.getSnapshot;
    d = d.value;
    try {
      var h = f();
      return !t(d, h);
    } catch {
      return !0;
    }
  }
  function c(d, f) {
    return f();
  }
  var u = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? c : l;
  return Ni.useSyncExternalStore = n.useSyncExternalStore !== void 0 ? n.useSyncExternalStore : u, Ni;
}
var Oi = {};
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ca;
function gp() {
  return ca || (ca = 1, process.env.NODE_ENV !== "production" && function() {
    function n(h, p) {
      return h === p && (h !== 0 || 1 / h === 1 / p) || h !== h && p !== p;
    }
    function e(h, p) {
      u || s.startTransition === void 0 || (u = !0, console.error(
        "You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."
      ));
      var m = p();
      if (!d) {
        var g = p();
        i(m, g) || (console.error(
          "The result of getSnapshot should be cached to avoid an infinite loop"
        ), d = !0);
      }
      g = o({
        inst: { value: m, getSnapshot: p }
      });
      var y = g[0].inst, k = g[1];
      return a(
        function() {
          y.value = m, y.getSnapshot = p, t(y) && k({ inst: y });
        },
        [h, m, p]
      ), l(
        function() {
          return t(y) && k({ inst: y }), h(function() {
            t(y) && k({ inst: y });
          });
        },
        [h]
      ), c(m), m;
    }
    function t(h) {
      var p = h.getSnapshot;
      h = h.value;
      try {
        var m = p();
        return !i(h, m);
      } catch {
        return !0;
      }
    }
    function r(h, p) {
      return p();
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var s = B, i = typeof Object.is == "function" ? Object.is : n, o = s.useState, l = s.useEffect, a = s.useLayoutEffect, c = s.useDebugValue, u = !1, d = !1, f = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? r : e;
    Oi.useSyncExternalStore = s.useSyncExternalStore !== void 0 ? s.useSyncExternalStore : f, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  }()), Oi;
}
process.env.NODE_ENV === "production" ? ko.exports = mp() : ko.exports = gp();
var ti = ko.exports;
function Fe(n) {
  this.content = n;
}
Fe.prototype = {
  constructor: Fe,
  find: function(n) {
    for (var e = 0; e < this.content.length; e += 2)
      if (this.content[e] === n) return e;
    return -1;
  },
  // :: (string) → ?any
  // Retrieve the value stored under `key`, or return undefined when
  // no such key exists.
  get: function(n) {
    var e = this.find(n);
    return e == -1 ? void 0 : this.content[e + 1];
  },
  // :: (string, any, ?string) → OrderedMap
  // Create a new map by replacing the value of `key` with a new
  // value, or adding a binding to the end of the map. If `newKey` is
  // given, the key of the binding will be replaced with that key.
  update: function(n, e, t) {
    var r = t && t != n ? this.remove(t) : this, s = r.find(n), i = r.content.slice();
    return s == -1 ? i.push(t || n, e) : (i[s + 1] = e, t && (i[s] = t)), new Fe(i);
  },
  // :: (string) → OrderedMap
  // Return a map with the given key removed, if it existed.
  remove: function(n) {
    var e = this.find(n);
    if (e == -1) return this;
    var t = this.content.slice();
    return t.splice(e, 2), new Fe(t);
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the start of the map.
  addToStart: function(n, e) {
    return new Fe([n, e].concat(this.remove(n).content));
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the end of the map.
  addToEnd: function(n, e) {
    var t = this.remove(n).content.slice();
    return t.push(n, e), new Fe(t);
  },
  // :: (string, string, any) → OrderedMap
  // Add a key after the given key. If `place` is not found, the new
  // key is added to the end.
  addBefore: function(n, e, t) {
    var r = this.remove(e), s = r.content.slice(), i = r.find(n);
    return s.splice(i == -1 ? s.length : i, 0, e, t), new Fe(s);
  },
  // :: ((key: string, value: any))
  // Call the given function for each key/value pair in the map, in
  // order.
  forEach: function(n) {
    for (var e = 0; e < this.content.length; e += 2)
      n(this.content[e], this.content[e + 1]);
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by prepending the keys in this map that don't
  // appear in `map` before the keys in `map`.
  prepend: function(n) {
    return n = Fe.from(n), n.size ? new Fe(n.content.concat(this.subtract(n).content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by appending the keys in this map that don't
  // appear in `map` after the keys in `map`.
  append: function(n) {
    return n = Fe.from(n), n.size ? new Fe(this.subtract(n).content.concat(n.content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a map containing all the keys in this map that don't
  // appear in `map`.
  subtract: function(n) {
    var e = this;
    n = Fe.from(n);
    for (var t = 0; t < n.content.length; t += 2)
      e = e.remove(n.content[t]);
    return e;
  },
  // :: () → Object
  // Turn ordered map into a plain object.
  toObject: function() {
    var n = {};
    return this.forEach(function(e, t) {
      n[e] = t;
    }), n;
  },
  // :: number
  // The amount of keys in this map.
  get size() {
    return this.content.length >> 1;
  }
};
Fe.from = function(n) {
  if (n instanceof Fe) return n;
  var e = [];
  if (n) for (var t in n) e.push(t, n[t]);
  return new Fe(e);
};
function xu(n, e, t) {
  for (let r = 0; ; r++) {
    if (r == n.childCount || r == e.childCount)
      return n.childCount == e.childCount ? null : t;
    let s = n.child(r), i = e.child(r);
    if (s == i) {
      t += s.nodeSize;
      continue;
    }
    if (!s.sameMarkup(i))
      return t;
    if (s.isText && s.text != i.text) {
      for (let o = 0; s.text[o] == i.text[o]; o++)
        t++;
      return t;
    }
    if (s.content.size || i.content.size) {
      let o = xu(s.content, i.content, t + 1);
      if (o != null)
        return o;
    }
    t += s.nodeSize;
  }
}
function ku(n, e, t, r) {
  for (let s = n.childCount, i = e.childCount; ; ) {
    if (s == 0 || i == 0)
      return s == i ? null : { a: t, b: r };
    let o = n.child(--s), l = e.child(--i), a = o.nodeSize;
    if (o == l) {
      t -= a, r -= a;
      continue;
    }
    if (!o.sameMarkup(l))
      return { a: t, b: r };
    if (o.isText && o.text != l.text) {
      let c = 0, u = Math.min(o.text.length, l.text.length);
      for (; c < u && o.text[o.text.length - c - 1] == l.text[l.text.length - c - 1]; )
        c++, t--, r--;
      return { a: t, b: r };
    }
    if (o.content.size || l.content.size) {
      let c = ku(o.content, l.content, t - 1, r - 1);
      if (c)
        return c;
    }
    t -= a, r -= a;
  }
}
class A {
  /**
  @internal
  */
  constructor(e, t) {
    if (this.content = e, this.size = t || 0, t == null)
      for (let r = 0; r < e.length; r++)
        this.size += e[r].nodeSize;
  }
  /**
  Invoke a callback for all descendant nodes between the given two
  positions (relative to start of this fragment). Doesn't descend
  into a node when the callback returns `false`.
  */
  nodesBetween(e, t, r, s = 0, i) {
    for (let o = 0, l = 0; l < t; o++) {
      let a = this.content[o], c = l + a.nodeSize;
      if (c > e && r(a, s + l, i || null, o) !== !1 && a.content.size) {
        let u = l + 1;
        a.nodesBetween(Math.max(0, e - u), Math.min(a.content.size, t - u), r, s + u);
      }
      l = c;
    }
  }
  /**
  Call the given callback for every descendant node. `pos` will be
  relative to the start of the fragment. The callback may return
  `false` to prevent traversal of a given node's children.
  */
  descendants(e) {
    this.nodesBetween(0, this.size, e);
  }
  /**
  Extract the text between `from` and `to`. See the same method on
  [`Node`](https://prosemirror.net/docs/ref/#model.Node.textBetween).
  */
  textBetween(e, t, r, s) {
    let i = "", o = !0;
    return this.nodesBetween(e, t, (l, a) => {
      let c = l.isText ? l.text.slice(Math.max(e, a) - a, t - a) : l.isLeaf ? s ? typeof s == "function" ? s(l) : s : l.type.spec.leafText ? l.type.spec.leafText(l) : "" : "";
      l.isBlock && (l.isLeaf && c || l.isTextblock) && r && (o ? o = !1 : i += r), i += c;
    }, 0), i;
  }
  /**
  Create a new fragment containing the combined content of this
  fragment and the other.
  */
  append(e) {
    if (!e.size)
      return this;
    if (!this.size)
      return e;
    let t = this.lastChild, r = e.firstChild, s = this.content.slice(), i = 0;
    for (t.isText && t.sameMarkup(r) && (s[s.length - 1] = t.withText(t.text + r.text), i = 1); i < e.content.length; i++)
      s.push(e.content[i]);
    return new A(s, this.size + e.size);
  }
  /**
  Cut out the sub-fragment between the two given positions.
  */
  cut(e, t = this.size) {
    if (e == 0 && t == this.size)
      return this;
    let r = [], s = 0;
    if (t > e)
      for (let i = 0, o = 0; o < t; i++) {
        let l = this.content[i], a = o + l.nodeSize;
        a > e && ((o < e || a > t) && (l.isText ? l = l.cut(Math.max(0, e - o), Math.min(l.text.length, t - o)) : l = l.cut(Math.max(0, e - o - 1), Math.min(l.content.size, t - o - 1))), r.push(l), s += l.nodeSize), o = a;
      }
    return new A(r, s);
  }
  /**
  @internal
  */
  cutByIndex(e, t) {
    return e == t ? A.empty : e == 0 && t == this.content.length ? this : new A(this.content.slice(e, t));
  }
  /**
  Create a new fragment in which the node at the given index is
  replaced by the given node.
  */
  replaceChild(e, t) {
    let r = this.content[e];
    if (r == t)
      return this;
    let s = this.content.slice(), i = this.size + t.nodeSize - r.nodeSize;
    return s[e] = t, new A(s, i);
  }
  /**
  Create a new fragment by prepending the given node to this
  fragment.
  */
  addToStart(e) {
    return new A([e].concat(this.content), this.size + e.nodeSize);
  }
  /**
  Create a new fragment by appending the given node to this
  fragment.
  */
  addToEnd(e) {
    return new A(this.content.concat(e), this.size + e.nodeSize);
  }
  /**
  Compare this fragment to another one.
  */
  eq(e) {
    if (this.content.length != e.content.length)
      return !1;
    for (let t = 0; t < this.content.length; t++)
      if (!this.content[t].eq(e.content[t]))
        return !1;
    return !0;
  }
  /**
  The first child of the fragment, or `null` if it is empty.
  */
  get firstChild() {
    return this.content.length ? this.content[0] : null;
  }
  /**
  The last child of the fragment, or `null` if it is empty.
  */
  get lastChild() {
    return this.content.length ? this.content[this.content.length - 1] : null;
  }
  /**
  The number of child nodes in this fragment.
  */
  get childCount() {
    return this.content.length;
  }
  /**
  Get the child node at the given index. Raise an error when the
  index is out of range.
  */
  child(e) {
    let t = this.content[e];
    if (!t)
      throw new RangeError("Index " + e + " out of range for " + this);
    return t;
  }
  /**
  Get the child node at the given index, if it exists.
  */
  maybeChild(e) {
    return this.content[e] || null;
  }
  /**
  Call `f` for every child node, passing the node, its offset
  into this parent node, and its index.
  */
  forEach(e) {
    for (let t = 0, r = 0; t < this.content.length; t++) {
      let s = this.content[t];
      e(s, r, t), r += s.nodeSize;
    }
  }
  /**
  Find the first position at which this fragment and another
  fragment differ, or `null` if they are the same.
  */
  findDiffStart(e, t = 0) {
    return xu(this, e, t);
  }
  /**
  Find the first position, searching from the end, at which this
  fragment and the given fragment differ, or `null` if they are
  the same. Since this position will not be the same in both
  nodes, an object with two separate positions is returned.
  */
  findDiffEnd(e, t = this.size, r = e.size) {
    return ku(this, e, t, r);
  }
  /**
  Find the index and inner offset corresponding to a given relative
  position in this fragment. The result object will be reused
  (overwritten) the next time the function is called. @internal
  */
  findIndex(e) {
    if (e == 0)
      return jr(0, e);
    if (e == this.size)
      return jr(this.content.length, e);
    if (e > this.size || e < 0)
      throw new RangeError(`Position ${e} outside of fragment (${this})`);
    for (let t = 0, r = 0; ; t++) {
      let s = this.child(t), i = r + s.nodeSize;
      if (i >= e)
        return i == e ? jr(t + 1, i) : jr(t, r);
      r = i;
    }
  }
  /**
  Return a debugging string that describes this fragment.
  */
  toString() {
    return "<" + this.toStringInner() + ">";
  }
  /**
  @internal
  */
  toStringInner() {
    return this.content.join(", ");
  }
  /**
  Create a JSON-serializeable representation of this fragment.
  */
  toJSON() {
    return this.content.length ? this.content.map((e) => e.toJSON()) : null;
  }
  /**
  Deserialize a fragment from its JSON representation.
  */
  static fromJSON(e, t) {
    if (!t)
      return A.empty;
    if (!Array.isArray(t))
      throw new RangeError("Invalid input for Fragment.fromJSON");
    return new A(t.map(e.nodeFromJSON));
  }
  /**
  Build a fragment from an array of nodes. Ensures that adjacent
  text nodes with the same marks are joined together.
  */
  static fromArray(e) {
    if (!e.length)
      return A.empty;
    let t, r = 0;
    for (let s = 0; s < e.length; s++) {
      let i = e[s];
      r += i.nodeSize, s && i.isText && e[s - 1].sameMarkup(i) ? (t || (t = e.slice(0, s)), t[t.length - 1] = i.withText(t[t.length - 1].text + i.text)) : t && t.push(i);
    }
    return new A(t || e, r);
  }
  /**
  Create a fragment from something that can be interpreted as a
  set of nodes. For `null`, it returns the empty fragment. For a
  fragment, the fragment itself. For a node or array of nodes, a
  fragment containing those nodes.
  */
  static from(e) {
    if (!e)
      return A.empty;
    if (e instanceof A)
      return e;
    if (Array.isArray(e))
      return this.fromArray(e);
    if (e.attrs)
      return new A([e], e.nodeSize);
    throw new RangeError("Can not convert " + e + " to a Fragment" + (e.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
  }
}
A.empty = new A([], 0);
const Ri = { index: 0, offset: 0 };
function jr(n, e) {
  return Ri.index = n, Ri.offset = e, Ri;
}
function cs(n, e) {
  if (n === e)
    return !0;
  if (!(n && typeof n == "object") || !(e && typeof e == "object"))
    return !1;
  let t = Array.isArray(n);
  if (Array.isArray(e) != t)
    return !1;
  if (t) {
    if (n.length != e.length)
      return !1;
    for (let r = 0; r < n.length; r++)
      if (!cs(n[r], e[r]))
        return !1;
  } else {
    for (let r in n)
      if (!(r in e) || !cs(n[r], e[r]))
        return !1;
    for (let r in e)
      if (!(r in n))
        return !1;
  }
  return !0;
}
let ae = class vo {
  /**
  @internal
  */
  constructor(e, t) {
    this.type = e, this.attrs = t;
  }
  /**
  Given a set of marks, create a new set which contains this one as
  well, in the right position. If this mark is already in the set,
  the set itself is returned. If any marks that are set to be
  [exclusive](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) with this mark are present,
  those are replaced by this one.
  */
  addToSet(e) {
    let t, r = !1;
    for (let s = 0; s < e.length; s++) {
      let i = e[s];
      if (this.eq(i))
        return e;
      if (this.type.excludes(i.type))
        t || (t = e.slice(0, s));
      else {
        if (i.type.excludes(this.type))
          return e;
        !r && i.type.rank > this.type.rank && (t || (t = e.slice(0, s)), t.push(this), r = !0), t && t.push(i);
      }
    }
    return t || (t = e.slice()), r || t.push(this), t;
  }
  /**
  Remove this mark from the given set, returning a new set. If this
  mark is not in the set, the set itself is returned.
  */
  removeFromSet(e) {
    for (let t = 0; t < e.length; t++)
      if (this.eq(e[t]))
        return e.slice(0, t).concat(e.slice(t + 1));
    return e;
  }
  /**
  Test whether this mark is in the given set of marks.
  */
  isInSet(e) {
    for (let t = 0; t < e.length; t++)
      if (this.eq(e[t]))
        return !0;
    return !1;
  }
  /**
  Test whether this mark has the same type and attributes as
  another mark.
  */
  eq(e) {
    return this == e || this.type == e.type && cs(this.attrs, e.attrs);
  }
  /**
  Convert this mark to a JSON-serializeable representation.
  */
  toJSON() {
    let e = { type: this.type.name };
    for (let t in this.attrs) {
      e.attrs = this.attrs;
      break;
    }
    return e;
  }
  /**
  Deserialize a mark from JSON.
  */
  static fromJSON(e, t) {
    if (!t)
      throw new RangeError("Invalid input for Mark.fromJSON");
    let r = e.marks[t.type];
    if (!r)
      throw new RangeError(`There is no mark type ${t.type} in this schema`);
    let s = r.create(t.attrs);
    return r.checkAttrs(s.attrs), s;
  }
  /**
  Test whether two sets of marks are identical.
  */
  static sameSet(e, t) {
    if (e == t)
      return !0;
    if (e.length != t.length)
      return !1;
    for (let r = 0; r < e.length; r++)
      if (!e[r].eq(t[r]))
        return !1;
    return !0;
  }
  /**
  Create a properly sorted mark set from null, a single mark, or an
  unsorted array of marks.
  */
  static setFrom(e) {
    if (!e || Array.isArray(e) && e.length == 0)
      return vo.none;
    if (e instanceof vo)
      return [e];
    let t = e.slice();
    return t.sort((r, s) => r.type.rank - s.type.rank), t;
  }
};
ae.none = [];
class us extends Error {
}
class _ {
  /**
  Create a slice. When specifying a non-zero open depth, you must
  make sure that there are nodes of at least that depth at the
  appropriate side of the fragment—i.e. if the fragment is an
  empty paragraph node, `openStart` and `openEnd` can't be greater
  than 1.
  
  It is not necessary for the content of open nodes to conform to
  the schema's content constraints, though it should be a valid
  start/end/middle for such a node, depending on which sides are
  open.
  */
  constructor(e, t, r) {
    this.content = e, this.openStart = t, this.openEnd = r;
  }
  /**
  The size this slice would add when inserted into a document.
  */
  get size() {
    return this.content.size - this.openStart - this.openEnd;
  }
  /**
  @internal
  */
  insertAt(e, t) {
    let r = Su(this.content, e + this.openStart, t);
    return r && new _(r, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(e, t) {
    return new _(vu(this.content, e + this.openStart, t + this.openStart), this.openStart, this.openEnd);
  }
  /**
  Tests whether this slice is equal to another slice.
  */
  eq(e) {
    return this.content.eq(e.content) && this.openStart == e.openStart && this.openEnd == e.openEnd;
  }
  /**
  @internal
  */
  toString() {
    return this.content + "(" + this.openStart + "," + this.openEnd + ")";
  }
  /**
  Convert a slice to a JSON-serializable representation.
  */
  toJSON() {
    if (!this.content.size)
      return null;
    let e = { content: this.content.toJSON() };
    return this.openStart > 0 && (e.openStart = this.openStart), this.openEnd > 0 && (e.openEnd = this.openEnd), e;
  }
  /**
  Deserialize a slice from its JSON representation.
  */
  static fromJSON(e, t) {
    if (!t)
      return _.empty;
    let r = t.openStart || 0, s = t.openEnd || 0;
    if (typeof r != "number" || typeof s != "number")
      throw new RangeError("Invalid input for Slice.fromJSON");
    return new _(A.fromJSON(e, t.content), r, s);
  }
  /**
  Create a slice from a fragment by taking the maximum possible
  open value on both side of the fragment.
  */
  static maxOpen(e, t = !0) {
    let r = 0, s = 0;
    for (let i = e.firstChild; i && !i.isLeaf && (t || !i.type.spec.isolating); i = i.firstChild)
      r++;
    for (let i = e.lastChild; i && !i.isLeaf && (t || !i.type.spec.isolating); i = i.lastChild)
      s++;
    return new _(e, r, s);
  }
}
_.empty = new _(A.empty, 0, 0);
function vu(n, e, t) {
  let { index: r, offset: s } = n.findIndex(e), i = n.maybeChild(r), { index: o, offset: l } = n.findIndex(t);
  if (s == e || i.isText) {
    if (l != t && !n.child(o).isText)
      throw new RangeError("Removing non-flat range");
    return n.cut(0, e).append(n.cut(t));
  }
  if (r != o)
    throw new RangeError("Removing non-flat range");
  return n.replaceChild(r, i.copy(vu(i.content, e - s - 1, t - s - 1)));
}
function Su(n, e, t, r) {
  let { index: s, offset: i } = n.findIndex(e), o = n.maybeChild(s);
  if (i == e || o.isText)
    return r && !r.canReplace(s, s, t) ? null : n.cut(0, e).append(t).append(n.cut(e));
  let l = Su(o.content, e - i - 1, t, o);
  return l && n.replaceChild(s, o.copy(l));
}
function yp(n, e, t) {
  if (t.openStart > n.depth)
    throw new us("Inserted content deeper than insertion position");
  if (n.depth - t.openStart != e.depth - t.openEnd)
    throw new us("Inconsistent open depths");
  return wu(n, e, t, 0);
}
function wu(n, e, t, r) {
  let s = n.index(r), i = n.node(r);
  if (s == e.index(r) && r < n.depth - t.openStart) {
    let o = wu(n, e, t, r + 1);
    return i.copy(i.content.replaceChild(s, o));
  } else if (t.content.size)
    if (!t.openStart && !t.openEnd && n.depth == r && e.depth == r) {
      let o = n.parent, l = o.content;
      return gn(o, l.cut(0, n.parentOffset).append(t.content).append(l.cut(e.parentOffset)));
    } else {
      let { start: o, end: l } = bp(t, n);
      return gn(i, Eu(n, o, l, e, r));
    }
  else return gn(i, ds(n, e, r));
}
function Cu(n, e) {
  if (!e.type.compatibleContent(n.type))
    throw new us("Cannot join " + e.type.name + " onto " + n.type.name);
}
function So(n, e, t) {
  let r = n.node(t);
  return Cu(r, e.node(t)), r;
}
function mn(n, e) {
  let t = e.length - 1;
  t >= 0 && n.isText && n.sameMarkup(e[t]) ? e[t] = n.withText(e[t].text + n.text) : e.push(n);
}
function fr(n, e, t, r) {
  let s = (e || n).node(t), i = 0, o = e ? e.index(t) : s.childCount;
  n && (i = n.index(t), n.depth > t ? i++ : n.textOffset && (mn(n.nodeAfter, r), i++));
  for (let l = i; l < o; l++)
    mn(s.child(l), r);
  e && e.depth == t && e.textOffset && mn(e.nodeBefore, r);
}
function gn(n, e) {
  return n.type.checkContent(e), n.copy(e);
}
function Eu(n, e, t, r, s) {
  let i = n.depth > s && So(n, e, s + 1), o = r.depth > s && So(t, r, s + 1), l = [];
  return fr(null, n, s, l), i && o && e.index(s) == t.index(s) ? (Cu(i, o), mn(gn(i, Eu(n, e, t, r, s + 1)), l)) : (i && mn(gn(i, ds(n, e, s + 1)), l), fr(e, t, s, l), o && mn(gn(o, ds(t, r, s + 1)), l)), fr(r, null, s, l), new A(l);
}
function ds(n, e, t) {
  let r = [];
  if (fr(null, n, t, r), n.depth > t) {
    let s = So(n, e, t + 1);
    mn(gn(s, ds(n, e, t + 1)), r);
  }
  return fr(e, null, t, r), new A(r);
}
function bp(n, e) {
  let t = e.depth - n.openStart, s = e.node(t).copy(n.content);
  for (let i = t - 1; i >= 0; i--)
    s = e.node(i).copy(A.from(s));
  return {
    start: s.resolveNoCache(n.openStart + t),
    end: s.resolveNoCache(s.content.size - n.openEnd - t)
  };
}
class wr {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.pos = e, this.path = t, this.parentOffset = r, this.depth = t.length / 3 - 1;
  }
  /**
  @internal
  */
  resolveDepth(e) {
    return e == null ? this.depth : e < 0 ? this.depth + e : e;
  }
  /**
  The parent node that the position points into. Note that even if
  a position points into a text node, that node is not considered
  the parent—text nodes are ‘flat’ in this model, and have no content.
  */
  get parent() {
    return this.node(this.depth);
  }
  /**
  The root node in which the position was resolved.
  */
  get doc() {
    return this.node(0);
  }
  /**
  The ancestor node at the given level. `p.node(p.depth)` is the
  same as `p.parent`.
  */
  node(e) {
    return this.path[this.resolveDepth(e) * 3];
  }
  /**
  The index into the ancestor at the given level. If this points
  at the 3rd node in the 2nd paragraph on the top level, for
  example, `p.index(0)` is 1 and `p.index(1)` is 2.
  */
  index(e) {
    return this.path[this.resolveDepth(e) * 3 + 1];
  }
  /**
  The index pointing after this position into the ancestor at the
  given level.
  */
  indexAfter(e) {
    return e = this.resolveDepth(e), this.index(e) + (e == this.depth && !this.textOffset ? 0 : 1);
  }
  /**
  The (absolute) position at the start of the node at the given
  level.
  */
  start(e) {
    return e = this.resolveDepth(e), e == 0 ? 0 : this.path[e * 3 - 1] + 1;
  }
  /**
  The (absolute) position at the end of the node at the given
  level.
  */
  end(e) {
    return e = this.resolveDepth(e), this.start(e) + this.node(e).content.size;
  }
  /**
  The (absolute) position directly before the wrapping node at the
  given level, or, when `depth` is `this.depth + 1`, the original
  position.
  */
  before(e) {
    if (e = this.resolveDepth(e), !e)
      throw new RangeError("There is no position before the top-level node");
    return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1];
  }
  /**
  The (absolute) position directly after the wrapping node at the
  given level, or the original position when `depth` is `this.depth + 1`.
  */
  after(e) {
    if (e = this.resolveDepth(e), !e)
      throw new RangeError("There is no position after the top-level node");
    return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1] + this.path[e * 3].nodeSize;
  }
  /**
  When this position points into a text node, this returns the
  distance between the position and the start of the text node.
  Will be zero for positions that point between nodes.
  */
  get textOffset() {
    return this.pos - this.path[this.path.length - 1];
  }
  /**
  Get the node directly after the position, if any. If the position
  points into a text node, only the part of that node after the
  position is returned.
  */
  get nodeAfter() {
    let e = this.parent, t = this.index(this.depth);
    if (t == e.childCount)
      return null;
    let r = this.pos - this.path[this.path.length - 1], s = e.child(t);
    return r ? e.child(t).cut(r) : s;
  }
  /**
  Get the node directly before the position, if any. If the
  position points into a text node, only the part of that node
  before the position is returned.
  */
  get nodeBefore() {
    let e = this.index(this.depth), t = this.pos - this.path[this.path.length - 1];
    return t ? this.parent.child(e).cut(0, t) : e == 0 ? null : this.parent.child(e - 1);
  }
  /**
  Get the position at the given index in the parent node at the
  given depth (which defaults to `this.depth`).
  */
  posAtIndex(e, t) {
    t = this.resolveDepth(t);
    let r = this.path[t * 3], s = t == 0 ? 0 : this.path[t * 3 - 1] + 1;
    for (let i = 0; i < e; i++)
      s += r.child(i).nodeSize;
    return s;
  }
  /**
  Get the marks at this position, factoring in the surrounding
  marks' [`inclusive`](https://prosemirror.net/docs/ref/#model.MarkSpec.inclusive) property. If the
  position is at the start of a non-empty node, the marks of the
  node after it (if any) are returned.
  */
  marks() {
    let e = this.parent, t = this.index();
    if (e.content.size == 0)
      return ae.none;
    if (this.textOffset)
      return e.child(t).marks;
    let r = e.maybeChild(t - 1), s = e.maybeChild(t);
    if (!r) {
      let l = r;
      r = s, s = l;
    }
    let i = r.marks;
    for (var o = 0; o < i.length; o++)
      i[o].type.spec.inclusive === !1 && (!s || !i[o].isInSet(s.marks)) && (i = i[o--].removeFromSet(i));
    return i;
  }
  /**
  Get the marks after the current position, if any, except those
  that are non-inclusive and not present at position `$end`. This
  is mostly useful for getting the set of marks to preserve after a
  deletion. Will return `null` if this position is at the end of
  its parent node or its parent node isn't a textblock (in which
  case no marks should be preserved).
  */
  marksAcross(e) {
    let t = this.parent.maybeChild(this.index());
    if (!t || !t.isInline)
      return null;
    let r = t.marks, s = e.parent.maybeChild(e.index());
    for (var i = 0; i < r.length; i++)
      r[i].type.spec.inclusive === !1 && (!s || !r[i].isInSet(s.marks)) && (r = r[i--].removeFromSet(r));
    return r;
  }
  /**
  The depth up to which this position and the given (non-resolved)
  position share the same parent nodes.
  */
  sharedDepth(e) {
    for (let t = this.depth; t > 0; t--)
      if (this.start(t) <= e && this.end(t) >= e)
        return t;
    return 0;
  }
  /**
  Returns a range based on the place where this position and the
  given position diverge around block content. If both point into
  the same textblock, for example, a range around that textblock
  will be returned. If they point into different blocks, the range
  around those blocks in their shared ancestor is returned. You can
  pass in an optional predicate that will be called with a parent
  node to see if a range into that parent is acceptable.
  */
  blockRange(e = this, t) {
    if (e.pos < this.pos)
      return e.blockRange(this);
    for (let r = this.depth - (this.parent.inlineContent || this.pos == e.pos ? 1 : 0); r >= 0; r--)
      if (e.pos <= this.end(r) && (!t || t(this.node(r))))
        return new fs(this, e, r);
    return null;
  }
  /**
  Query whether the given position shares the same parent node.
  */
  sameParent(e) {
    return this.pos - this.parentOffset == e.pos - e.parentOffset;
  }
  /**
  Return the greater of this and the given position.
  */
  max(e) {
    return e.pos > this.pos ? e : this;
  }
  /**
  Return the smaller of this and the given position.
  */
  min(e) {
    return e.pos < this.pos ? e : this;
  }
  /**
  @internal
  */
  toString() {
    let e = "";
    for (let t = 1; t <= this.depth; t++)
      e += (e ? "/" : "") + this.node(t).type.name + "_" + this.index(t - 1);
    return e + ":" + this.parentOffset;
  }
  /**
  @internal
  */
  static resolve(e, t) {
    if (!(t >= 0 && t <= e.content.size))
      throw new RangeError("Position " + t + " out of range");
    let r = [], s = 0, i = t;
    for (let o = e; ; ) {
      let { index: l, offset: a } = o.content.findIndex(i), c = i - a;
      if (r.push(o, l, s + a), !c || (o = o.child(l), o.isText))
        break;
      i = c - 1, s += a + 1;
    }
    return new wr(t, r, i);
  }
  /**
  @internal
  */
  static resolveCached(e, t) {
    let r = ua.get(e);
    if (r)
      for (let i = 0; i < r.elts.length; i++) {
        let o = r.elts[i];
        if (o.pos == t)
          return o;
      }
    else
      ua.set(e, r = new xp());
    let s = r.elts[r.i] = wr.resolve(e, t);
    return r.i = (r.i + 1) % kp, s;
  }
}
class xp {
  constructor() {
    this.elts = [], this.i = 0;
  }
}
const kp = 12, ua = /* @__PURE__ */ new WeakMap();
class fs {
  /**
  Construct a node range. `$from` and `$to` should point into the
  same node until at least the given `depth`, since a node range
  denotes an adjacent set of nodes in a single parent node.
  */
  constructor(e, t, r) {
    this.$from = e, this.$to = t, this.depth = r;
  }
  /**
  The position at the start of the range.
  */
  get start() {
    return this.$from.before(this.depth + 1);
  }
  /**
  The position at the end of the range.
  */
  get end() {
    return this.$to.after(this.depth + 1);
  }
  /**
  The parent node that the range points into.
  */
  get parent() {
    return this.$from.node(this.depth);
  }
  /**
  The start index of the range in the parent node.
  */
  get startIndex() {
    return this.$from.index(this.depth);
  }
  /**
  The end index of the range in the parent node.
  */
  get endIndex() {
    return this.$to.indexAfter(this.depth);
  }
}
const vp = /* @__PURE__ */ Object.create(null);
class bt {
  /**
  @internal
  */
  constructor(e, t, r, s = ae.none) {
    this.type = e, this.attrs = t, this.marks = s, this.content = r || A.empty;
  }
  /**
  The array of this node's child nodes.
  */
  get children() {
    return this.content.content;
  }
  /**
  The size of this node, as defined by the integer-based [indexing
  scheme](https://prosemirror.net/docs/guide/#doc.indexing). For text nodes, this is the
  amount of characters. For other leaf nodes, it is one. For
  non-leaf nodes, it is the size of the content plus two (the
  start and end token).
  */
  get nodeSize() {
    return this.isLeaf ? 1 : 2 + this.content.size;
  }
  /**
  The number of children that the node has.
  */
  get childCount() {
    return this.content.childCount;
  }
  /**
  Get the child node at the given index. Raises an error when the
  index is out of range.
  */
  child(e) {
    return this.content.child(e);
  }
  /**
  Get the child node at the given index, if it exists.
  */
  maybeChild(e) {
    return this.content.maybeChild(e);
  }
  /**
  Call `f` for every child node, passing the node, its offset
  into this parent node, and its index.
  */
  forEach(e) {
    this.content.forEach(e);
  }
  /**
  Invoke a callback for all descendant nodes recursively between
  the given two positions that are relative to start of this
  node's content. The callback is invoked with the node, its
  position relative to the original node (method receiver),
  its parent node, and its child index. When the callback returns
  false for a given node, that node's children will not be
  recursed over. The last parameter can be used to specify a
  starting position to count from.
  */
  nodesBetween(e, t, r, s = 0) {
    this.content.nodesBetween(e, t, r, s, this);
  }
  /**
  Call the given callback for every descendant node. Doesn't
  descend into a node when the callback returns `false`.
  */
  descendants(e) {
    this.nodesBetween(0, this.content.size, e);
  }
  /**
  Concatenates all the text nodes found in this fragment and its
  children.
  */
  get textContent() {
    return this.isLeaf && this.type.spec.leafText ? this.type.spec.leafText(this) : this.textBetween(0, this.content.size, "");
  }
  /**
  Get all text between positions `from` and `to`. When
  `blockSeparator` is given, it will be inserted to separate text
  from different block nodes. If `leafText` is given, it'll be
  inserted for every non-text leaf node encountered, otherwise
  [`leafText`](https://prosemirror.net/docs/ref/#model.NodeSpec.leafText) will be used.
  */
  textBetween(e, t, r, s) {
    return this.content.textBetween(e, t, r, s);
  }
  /**
  Returns this node's first child, or `null` if there are no
  children.
  */
  get firstChild() {
    return this.content.firstChild;
  }
  /**
  Returns this node's last child, or `null` if there are no
  children.
  */
  get lastChild() {
    return this.content.lastChild;
  }
  /**
  Test whether two nodes represent the same piece of document.
  */
  eq(e) {
    return this == e || this.sameMarkup(e) && this.content.eq(e.content);
  }
  /**
  Compare the markup (type, attributes, and marks) of this node to
  those of another. Returns `true` if both have the same markup.
  */
  sameMarkup(e) {
    return this.hasMarkup(e.type, e.attrs, e.marks);
  }
  /**
  Check whether this node's markup correspond to the given type,
  attributes, and marks.
  */
  hasMarkup(e, t, r) {
    return this.type == e && cs(this.attrs, t || e.defaultAttrs || vp) && ae.sameSet(this.marks, r || ae.none);
  }
  /**
  Create a new node with the same markup as this node, containing
  the given content (or empty, if no content is given).
  */
  copy(e = null) {
    return e == this.content ? this : new bt(this.type, this.attrs, e, this.marks);
  }
  /**
  Create a copy of this node, with the given set of marks instead
  of the node's own marks.
  */
  mark(e) {
    return e == this.marks ? this : new bt(this.type, this.attrs, this.content, e);
  }
  /**
  Create a copy of this node with only the content between the
  given positions. If `to` is not given, it defaults to the end of
  the node.
  */
  cut(e, t = this.content.size) {
    return e == 0 && t == this.content.size ? this : this.copy(this.content.cut(e, t));
  }
  /**
  Cut out the part of the document between the given positions, and
  return it as a `Slice` object.
  */
  slice(e, t = this.content.size, r = !1) {
    if (e == t)
      return _.empty;
    let s = this.resolve(e), i = this.resolve(t), o = r ? 0 : s.sharedDepth(t), l = s.start(o), c = s.node(o).content.cut(s.pos - l, i.pos - l);
    return new _(c, s.depth - o, i.depth - o);
  }
  /**
  Replace the part of the document between the given positions with
  the given slice. The slice must 'fit', meaning its open sides
  must be able to connect to the surrounding content, and its
  content nodes must be valid children for the node they are placed
  into. If any of this is violated, an error of type
  [`ReplaceError`](https://prosemirror.net/docs/ref/#model.ReplaceError) is thrown.
  */
  replace(e, t, r) {
    return yp(this.resolve(e), this.resolve(t), r);
  }
  /**
  Find the node directly after the given position.
  */
  nodeAt(e) {
    for (let t = this; ; ) {
      let { index: r, offset: s } = t.content.findIndex(e);
      if (t = t.maybeChild(r), !t)
        return null;
      if (s == e || t.isText)
        return t;
      e -= s + 1;
    }
  }
  /**
  Find the (direct) child node after the given offset, if any,
  and return it along with its index and offset relative to this
  node.
  */
  childAfter(e) {
    let { index: t, offset: r } = this.content.findIndex(e);
    return { node: this.content.maybeChild(t), index: t, offset: r };
  }
  /**
  Find the (direct) child node before the given offset, if any,
  and return it along with its index and offset relative to this
  node.
  */
  childBefore(e) {
    if (e == 0)
      return { node: null, index: 0, offset: 0 };
    let { index: t, offset: r } = this.content.findIndex(e);
    if (r < e)
      return { node: this.content.child(t), index: t, offset: r };
    let s = this.content.child(t - 1);
    return { node: s, index: t - 1, offset: r - s.nodeSize };
  }
  /**
  Resolve the given position in the document, returning an
  [object](https://prosemirror.net/docs/ref/#model.ResolvedPos) with information about its context.
  */
  resolve(e) {
    return wr.resolveCached(this, e);
  }
  /**
  @internal
  */
  resolveNoCache(e) {
    return wr.resolve(this, e);
  }
  /**
  Test whether a given mark or mark type occurs in this document
  between the two given positions.
  */
  rangeHasMark(e, t, r) {
    let s = !1;
    return t > e && this.nodesBetween(e, t, (i) => (r.isInSet(i.marks) && (s = !0), !s)), s;
  }
  /**
  True when this is a block (non-inline node)
  */
  get isBlock() {
    return this.type.isBlock;
  }
  /**
  True when this is a textblock node, a block node with inline
  content.
  */
  get isTextblock() {
    return this.type.isTextblock;
  }
  /**
  True when this node allows inline content.
  */
  get inlineContent() {
    return this.type.inlineContent;
  }
  /**
  True when this is an inline node (a text node or a node that can
  appear among text).
  */
  get isInline() {
    return this.type.isInline;
  }
  /**
  True when this is a text node.
  */
  get isText() {
    return this.type.isText;
  }
  /**
  True when this is a leaf node.
  */
  get isLeaf() {
    return this.type.isLeaf;
  }
  /**
  True when this is an atom, i.e. when it does not have directly
  editable content. This is usually the same as `isLeaf`, but can
  be configured with the [`atom` property](https://prosemirror.net/docs/ref/#model.NodeSpec.atom)
  on a node's spec (typically used when the node is displayed as
  an uneditable [node view](https://prosemirror.net/docs/ref/#view.NodeView)).
  */
  get isAtom() {
    return this.type.isAtom;
  }
  /**
  Return a string representation of this node for debugging
  purposes.
  */
  toString() {
    if (this.type.spec.toDebugString)
      return this.type.spec.toDebugString(this);
    let e = this.type.name;
    return this.content.size && (e += "(" + this.content.toStringInner() + ")"), Mu(this.marks, e);
  }
  /**
  Get the content match in this node at the given index.
  */
  contentMatchAt(e) {
    let t = this.type.contentMatch.matchFragment(this.content, 0, e);
    if (!t)
      throw new Error("Called contentMatchAt on a node with invalid content");
    return t;
  }
  /**
  Test whether replacing the range between `from` and `to` (by
  child index) with the given replacement fragment (which defaults
  to the empty fragment) would leave the node's content valid. You
  can optionally pass `start` and `end` indices into the
  replacement fragment.
  */
  canReplace(e, t, r = A.empty, s = 0, i = r.childCount) {
    let o = this.contentMatchAt(e).matchFragment(r, s, i), l = o && o.matchFragment(this.content, t);
    if (!l || !l.validEnd)
      return !1;
    for (let a = s; a < i; a++)
      if (!this.type.allowsMarks(r.child(a).marks))
        return !1;
    return !0;
  }
  /**
  Test whether replacing the range `from` to `to` (by index) with
  a node of the given type would leave the node's content valid.
  */
  canReplaceWith(e, t, r, s) {
    if (s && !this.type.allowsMarks(s))
      return !1;
    let i = this.contentMatchAt(e).matchType(r), o = i && i.matchFragment(this.content, t);
    return o ? o.validEnd : !1;
  }
  /**
  Test whether the given node's content could be appended to this
  node. If that node is empty, this will only return true if there
  is at least one node type that can appear in both nodes (to avoid
  merging completely incompatible nodes).
  */
  canAppend(e) {
    return e.content.size ? this.canReplace(this.childCount, this.childCount, e.content) : this.type.compatibleContent(e.type);
  }
  /**
  Check whether this node and its descendants conform to the
  schema, and raise an exception when they do not.
  */
  check() {
    this.type.checkContent(this.content), this.type.checkAttrs(this.attrs);
    let e = ae.none;
    for (let t = 0; t < this.marks.length; t++) {
      let r = this.marks[t];
      r.type.checkAttrs(r.attrs), e = r.addToSet(e);
    }
    if (!ae.sameSet(e, this.marks))
      throw new RangeError(`Invalid collection of marks for node ${this.type.name}: ${this.marks.map((t) => t.type.name)}`);
    this.content.forEach((t) => t.check());
  }
  /**
  Return a JSON-serializeable representation of this node.
  */
  toJSON() {
    let e = { type: this.type.name };
    for (let t in this.attrs) {
      e.attrs = this.attrs;
      break;
    }
    return this.content.size && (e.content = this.content.toJSON()), this.marks.length && (e.marks = this.marks.map((t) => t.toJSON())), e;
  }
  /**
  Deserialize a node from its JSON representation.
  */
  static fromJSON(e, t) {
    if (!t)
      throw new RangeError("Invalid input for Node.fromJSON");
    let r;
    if (t.marks) {
      if (!Array.isArray(t.marks))
        throw new RangeError("Invalid mark data for Node.fromJSON");
      r = t.marks.map(e.markFromJSON);
    }
    if (t.type == "text") {
      if (typeof t.text != "string")
        throw new RangeError("Invalid text node in JSON");
      return e.text(t.text, r);
    }
    let s = A.fromJSON(e, t.content), i = e.nodeType(t.type).create(t.attrs, s, r);
    return i.type.checkAttrs(i.attrs), i;
  }
}
bt.prototype.text = void 0;
class hs extends bt {
  /**
  @internal
  */
  constructor(e, t, r, s) {
    if (super(e, t, null, s), !r)
      throw new RangeError("Empty text nodes are not allowed");
    this.text = r;
  }
  toString() {
    return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : Mu(this.marks, JSON.stringify(this.text));
  }
  get textContent() {
    return this.text;
  }
  textBetween(e, t) {
    return this.text.slice(e, t);
  }
  get nodeSize() {
    return this.text.length;
  }
  mark(e) {
    return e == this.marks ? this : new hs(this.type, this.attrs, this.text, e);
  }
  withText(e) {
    return e == this.text ? this : new hs(this.type, this.attrs, e, this.marks);
  }
  cut(e = 0, t = this.text.length) {
    return e == 0 && t == this.text.length ? this : this.withText(this.text.slice(e, t));
  }
  eq(e) {
    return this.sameMarkup(e) && this.text == e.text;
  }
  toJSON() {
    let e = super.toJSON();
    return e.text = this.text, e;
  }
}
function Mu(n, e) {
  for (let t = n.length - 1; t >= 0; t--)
    e = n[t].type.name + "(" + e + ")";
  return e;
}
class kn {
  /**
  @internal
  */
  constructor(e) {
    this.validEnd = e, this.next = [], this.wrapCache = [];
  }
  /**
  @internal
  */
  static parse(e, t) {
    let r = new Sp(e, t);
    if (r.next == null)
      return kn.empty;
    let s = Tu(r);
    r.next && r.err("Unexpected trailing text");
    let i = Np(Ap(s));
    return Op(i, r), i;
  }
  /**
  Match a node type, returning a match after that node if
  successful.
  */
  matchType(e) {
    for (let t = 0; t < this.next.length; t++)
      if (this.next[t].type == e)
        return this.next[t].next;
    return null;
  }
  /**
  Try to match a fragment. Returns the resulting match when
  successful.
  */
  matchFragment(e, t = 0, r = e.childCount) {
    let s = this;
    for (let i = t; s && i < r; i++)
      s = s.matchType(e.child(i).type);
    return s;
  }
  /**
  @internal
  */
  get inlineContent() {
    return this.next.length != 0 && this.next[0].type.isInline;
  }
  /**
  Get the first matching node type at this match position that can
  be generated.
  */
  get defaultType() {
    for (let e = 0; e < this.next.length; e++) {
      let { type: t } = this.next[e];
      if (!(t.isText || t.hasRequiredAttrs()))
        return t;
    }
    return null;
  }
  /**
  @internal
  */
  compatible(e) {
    for (let t = 0; t < this.next.length; t++)
      for (let r = 0; r < e.next.length; r++)
        if (this.next[t].type == e.next[r].type)
          return !0;
    return !1;
  }
  /**
  Try to match the given fragment, and if that fails, see if it can
  be made to match by inserting nodes in front of it. When
  successful, return a fragment of inserted nodes (which may be
  empty if nothing had to be inserted). When `toEnd` is true, only
  return a fragment if the resulting match goes to the end of the
  content expression.
  */
  fillBefore(e, t = !1, r = 0) {
    let s = [this];
    function i(o, l) {
      let a = o.matchFragment(e, r);
      if (a && (!t || a.validEnd))
        return A.from(l.map((c) => c.createAndFill()));
      for (let c = 0; c < o.next.length; c++) {
        let { type: u, next: d } = o.next[c];
        if (!(u.isText || u.hasRequiredAttrs()) && s.indexOf(d) == -1) {
          s.push(d);
          let f = i(d, l.concat(u));
          if (f)
            return f;
        }
      }
      return null;
    }
    return i(this, []);
  }
  /**
  Find a set of wrapping node types that would allow a node of the
  given type to appear at this position. The result may be empty
  (when it fits directly) and will be null when no such wrapping
  exists.
  */
  findWrapping(e) {
    for (let r = 0; r < this.wrapCache.length; r += 2)
      if (this.wrapCache[r] == e)
        return this.wrapCache[r + 1];
    let t = this.computeWrapping(e);
    return this.wrapCache.push(e, t), t;
  }
  /**
  @internal
  */
  computeWrapping(e) {
    let t = /* @__PURE__ */ Object.create(null), r = [{ match: this, type: null, via: null }];
    for (; r.length; ) {
      let s = r.shift(), i = s.match;
      if (i.matchType(e)) {
        let o = [];
        for (let l = s; l.type; l = l.via)
          o.push(l.type);
        return o.reverse();
      }
      for (let o = 0; o < i.next.length; o++) {
        let { type: l, next: a } = i.next[o];
        !l.isLeaf && !l.hasRequiredAttrs() && !(l.name in t) && (!s.type || a.validEnd) && (r.push({ match: l.contentMatch, type: l, via: s }), t[l.name] = !0);
      }
    }
    return null;
  }
  /**
  The number of outgoing edges this node has in the finite
  automaton that describes the content expression.
  */
  get edgeCount() {
    return this.next.length;
  }
  /**
  Get the _n_​th outgoing edge from this node in the finite
  automaton that describes the content expression.
  */
  edge(e) {
    if (e >= this.next.length)
      throw new RangeError(`There's no ${e}th edge in this content match`);
    return this.next[e];
  }
  /**
  @internal
  */
  toString() {
    let e = [];
    function t(r) {
      e.push(r);
      for (let s = 0; s < r.next.length; s++)
        e.indexOf(r.next[s].next) == -1 && t(r.next[s].next);
    }
    return t(this), e.map((r, s) => {
      let i = s + (r.validEnd ? "*" : " ") + " ";
      for (let o = 0; o < r.next.length; o++)
        i += (o ? ", " : "") + r.next[o].type.name + "->" + e.indexOf(r.next[o].next);
      return i;
    }).join(`
`);
  }
}
kn.empty = new kn(!0);
class Sp {
  constructor(e, t) {
    this.string = e, this.nodeTypes = t, this.inline = null, this.pos = 0, this.tokens = e.split(/\s*(?=\b|\W|$)/), this.tokens[this.tokens.length - 1] == "" && this.tokens.pop(), this.tokens[0] == "" && this.tokens.shift();
  }
  get next() {
    return this.tokens[this.pos];
  }
  eat(e) {
    return this.next == e && (this.pos++ || !0);
  }
  err(e) {
    throw new SyntaxError(e + " (in content expression '" + this.string + "')");
  }
}
function Tu(n) {
  let e = [];
  do
    e.push(wp(n));
  while (n.eat("|"));
  return e.length == 1 ? e[0] : { type: "choice", exprs: e };
}
function wp(n) {
  let e = [];
  do
    e.push(Cp(n));
  while (n.next && n.next != ")" && n.next != "|");
  return e.length == 1 ? e[0] : { type: "seq", exprs: e };
}
function Cp(n) {
  let e = Tp(n);
  for (; ; )
    if (n.eat("+"))
      e = { type: "plus", expr: e };
    else if (n.eat("*"))
      e = { type: "star", expr: e };
    else if (n.eat("?"))
      e = { type: "opt", expr: e };
    else if (n.eat("{"))
      e = Ep(n, e);
    else
      break;
  return e;
}
function da(n) {
  /\D/.test(n.next) && n.err("Expected number, got '" + n.next + "'");
  let e = Number(n.next);
  return n.pos++, e;
}
function Ep(n, e) {
  let t = da(n), r = t;
  return n.eat(",") && (n.next != "}" ? r = da(n) : r = -1), n.eat("}") || n.err("Unclosed braced range"), { type: "range", min: t, max: r, expr: e };
}
function Mp(n, e) {
  let t = n.nodeTypes, r = t[e];
  if (r)
    return [r];
  let s = [];
  for (let i in t) {
    let o = t[i];
    o.isInGroup(e) && s.push(o);
  }
  return s.length == 0 && n.err("No node type or group '" + e + "' found"), s;
}
function Tp(n) {
  if (n.eat("(")) {
    let e = Tu(n);
    return n.eat(")") || n.err("Missing closing paren"), e;
  } else if (/\W/.test(n.next))
    n.err("Unexpected token '" + n.next + "'");
  else {
    let e = Mp(n, n.next).map((t) => (n.inline == null ? n.inline = t.isInline : n.inline != t.isInline && n.err("Mixing inline and block content"), { type: "name", value: t }));
    return n.pos++, e.length == 1 ? e[0] : { type: "choice", exprs: e };
  }
}
function Ap(n) {
  let e = [[]];
  return s(i(n, 0), t()), e;
  function t() {
    return e.push([]) - 1;
  }
  function r(o, l, a) {
    let c = { term: a, to: l };
    return e[o].push(c), c;
  }
  function s(o, l) {
    o.forEach((a) => a.to = l);
  }
  function i(o, l) {
    if (o.type == "choice")
      return o.exprs.reduce((a, c) => a.concat(i(c, l)), []);
    if (o.type == "seq")
      for (let a = 0; ; a++) {
        let c = i(o.exprs[a], l);
        if (a == o.exprs.length - 1)
          return c;
        s(c, l = t());
      }
    else if (o.type == "star") {
      let a = t();
      return r(l, a), s(i(o.expr, a), a), [r(a)];
    } else if (o.type == "plus") {
      let a = t();
      return s(i(o.expr, l), a), s(i(o.expr, a), a), [r(a)];
    } else {
      if (o.type == "opt")
        return [r(l)].concat(i(o.expr, l));
      if (o.type == "range") {
        let a = l;
        for (let c = 0; c < o.min; c++) {
          let u = t();
          s(i(o.expr, a), u), a = u;
        }
        if (o.max == -1)
          s(i(o.expr, a), a);
        else
          for (let c = o.min; c < o.max; c++) {
            let u = t();
            r(a, u), s(i(o.expr, a), u), a = u;
          }
        return [r(a)];
      } else {
        if (o.type == "name")
          return [r(l, void 0, o.value)];
        throw new Error("Unknown expr type");
      }
    }
  }
}
function Au(n, e) {
  return e - n;
}
function fa(n, e) {
  let t = [];
  return r(e), t.sort(Au);
  function r(s) {
    let i = n[s];
    if (i.length == 1 && !i[0].term)
      return r(i[0].to);
    t.push(s);
    for (let o = 0; o < i.length; o++) {
      let { term: l, to: a } = i[o];
      !l && t.indexOf(a) == -1 && r(a);
    }
  }
}
function Np(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return t(fa(n, 0));
  function t(r) {
    let s = [];
    r.forEach((o) => {
      n[o].forEach(({ term: l, to: a }) => {
        if (!l)
          return;
        let c;
        for (let u = 0; u < s.length; u++)
          s[u][0] == l && (c = s[u][1]);
        fa(n, a).forEach((u) => {
          c || s.push([l, c = []]), c.indexOf(u) == -1 && c.push(u);
        });
      });
    });
    let i = e[r.join(",")] = new kn(r.indexOf(n.length - 1) > -1);
    for (let o = 0; o < s.length; o++) {
      let l = s[o][1].sort(Au);
      i.next.push({ type: s[o][0], next: e[l.join(",")] || t(l) });
    }
    return i;
  }
}
function Op(n, e) {
  for (let t = 0, r = [n]; t < r.length; t++) {
    let s = r[t], i = !s.validEnd, o = [];
    for (let l = 0; l < s.next.length; l++) {
      let { type: a, next: c } = s.next[l];
      o.push(a.name), i && !(a.isText || a.hasRequiredAttrs()) && (i = !1), r.indexOf(c) == -1 && r.push(c);
    }
    i && e.err("Only non-generatable nodes (" + o.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
  }
}
function Nu(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n) {
    let r = n[t];
    if (!r.hasDefault)
      return null;
    e[t] = r.default;
  }
  return e;
}
function Ou(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  for (let r in n) {
    let s = e && e[r];
    if (s === void 0) {
      let i = n[r];
      if (i.hasDefault)
        s = i.default;
      else
        throw new RangeError("No value supplied for attribute " + r);
    }
    t[r] = s;
  }
  return t;
}
function Ru(n, e, t, r) {
  for (let s in e)
    if (!(s in n))
      throw new RangeError(`Unsupported attribute ${s} for ${t} of type ${s}`);
  for (let s in n) {
    let i = n[s];
    i.validate && i.validate(e[s]);
  }
}
function Du(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  if (e)
    for (let r in e)
      t[r] = new Dp(n, r, e[r]);
  return t;
}
let ha = class Iu {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.name = e, this.schema = t, this.spec = r, this.markSet = null, this.groups = r.group ? r.group.split(" ") : [], this.attrs = Du(e, r.attrs), this.defaultAttrs = Nu(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(r.inline || e == "text"), this.isText = e == "text";
  }
  /**
  True if this is an inline type.
  */
  get isInline() {
    return !this.isBlock;
  }
  /**
  True if this is a textblock type, a block that contains inline
  content.
  */
  get isTextblock() {
    return this.isBlock && this.inlineContent;
  }
  /**
  True for node types that allow no content.
  */
  get isLeaf() {
    return this.contentMatch == kn.empty;
  }
  /**
  True when this node is an atom, i.e. when it does not have
  directly editable content.
  */
  get isAtom() {
    return this.isLeaf || !!this.spec.atom;
  }
  /**
  Return true when this node type is part of the given
  [group](https://prosemirror.net/docs/ref/#model.NodeSpec.group).
  */
  isInGroup(e) {
    return this.groups.indexOf(e) > -1;
  }
  /**
  The node type's [whitespace](https://prosemirror.net/docs/ref/#model.NodeSpec.whitespace) option.
  */
  get whitespace() {
    return this.spec.whitespace || (this.spec.code ? "pre" : "normal");
  }
  /**
  Tells you whether this node type has any required attributes.
  */
  hasRequiredAttrs() {
    for (let e in this.attrs)
      if (this.attrs[e].isRequired)
        return !0;
    return !1;
  }
  /**
  Indicates whether this node allows some of the same content as
  the given node type.
  */
  compatibleContent(e) {
    return this == e || this.contentMatch.compatible(e.contentMatch);
  }
  /**
  @internal
  */
  computeAttrs(e) {
    return !e && this.defaultAttrs ? this.defaultAttrs : Ou(this.attrs, e);
  }
  /**
  Create a `Node` of this type. The given attributes are
  checked and defaulted (you can pass `null` to use the type's
  defaults entirely, if no required attributes exist). `content`
  may be a `Fragment`, a node, an array of nodes, or
  `null`. Similarly `marks` may be `null` to default to the empty
  set of marks.
  */
  create(e = null, t, r) {
    if (this.isText)
      throw new Error("NodeType.create can't construct text nodes");
    return new bt(this, this.computeAttrs(e), A.from(t), ae.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
  against the node type's content restrictions, and throw an error
  if it doesn't match.
  */
  createChecked(e = null, t, r) {
    return t = A.from(t), this.checkContent(t), new bt(this, this.computeAttrs(e), t, ae.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but see if it is
  necessary to add nodes to the start or end of the given fragment
  to make it fit the node. If no fitting wrapping can be found,
  return null. Note that, due to the fact that required nodes can
  always be created, this will always succeed if you pass null or
  `Fragment.empty` as content.
  */
  createAndFill(e = null, t, r) {
    if (e = this.computeAttrs(e), t = A.from(t), t.size) {
      let o = this.contentMatch.fillBefore(t);
      if (!o)
        return null;
      t = o.append(t);
    }
    let s = this.contentMatch.matchFragment(t), i = s && s.fillBefore(A.empty, !0);
    return i ? new bt(this, e, t.append(i), ae.setFrom(r)) : null;
  }
  /**
  Returns true if the given fragment is valid content for this node
  type.
  */
  validContent(e) {
    let t = this.contentMatch.matchFragment(e);
    if (!t || !t.validEnd)
      return !1;
    for (let r = 0; r < e.childCount; r++)
      if (!this.allowsMarks(e.child(r).marks))
        return !1;
    return !0;
  }
  /**
  Throws a RangeError if the given fragment is not valid content for this
  node type.
  @internal
  */
  checkContent(e) {
    if (!this.validContent(e))
      throw new RangeError(`Invalid content for node ${this.name}: ${e.toString().slice(0, 50)}`);
  }
  /**
  @internal
  */
  checkAttrs(e) {
    Ru(this.attrs, e, "node", this.name);
  }
  /**
  Check whether the given mark type is allowed in this node.
  */
  allowsMarkType(e) {
    return this.markSet == null || this.markSet.indexOf(e) > -1;
  }
  /**
  Test whether the given set of marks are allowed in this node.
  */
  allowsMarks(e) {
    if (this.markSet == null)
      return !0;
    for (let t = 0; t < e.length; t++)
      if (!this.allowsMarkType(e[t].type))
        return !1;
    return !0;
  }
  /**
  Removes the marks that are not allowed in this node from the given set.
  */
  allowedMarks(e) {
    if (this.markSet == null)
      return e;
    let t;
    for (let r = 0; r < e.length; r++)
      this.allowsMarkType(e[r].type) ? t && t.push(e[r]) : t || (t = e.slice(0, r));
    return t ? t.length ? t : ae.none : e;
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null);
    e.forEach((i, o) => r[i] = new Iu(i, t, o));
    let s = t.spec.topNode || "doc";
    if (!r[s])
      throw new RangeError("Schema is missing its top node type ('" + s + "')");
    if (!r.text)
      throw new RangeError("Every schema needs a 'text' type");
    for (let i in r.text.attrs)
      throw new RangeError("The text node type should not have attributes");
    return r;
  }
};
function Rp(n, e, t) {
  let r = t.split("|");
  return (s) => {
    let i = s === null ? "null" : typeof s;
    if (r.indexOf(i) < 0)
      throw new RangeError(`Expected value of type ${r} for attribute ${e} on type ${n}, got ${i}`);
  };
}
class Dp {
  constructor(e, t, r) {
    this.hasDefault = Object.prototype.hasOwnProperty.call(r, "default"), this.default = r.default, this.validate = typeof r.validate == "string" ? Rp(e, t, r.validate) : r.validate;
  }
  get isRequired() {
    return !this.hasDefault;
  }
}
class ni {
  /**
  @internal
  */
  constructor(e, t, r, s) {
    this.name = e, this.rank = t, this.schema = r, this.spec = s, this.attrs = Du(e, s.attrs), this.excluded = null;
    let i = Nu(this.attrs);
    this.instance = i ? new ae(this, i) : null;
  }
  /**
  Create a mark of this type. `attrs` may be `null` or an object
  containing only some of the mark's attributes. The others, if
  they have defaults, will be added.
  */
  create(e = null) {
    return !e && this.instance ? this.instance : new ae(this, Ou(this.attrs, e));
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null), s = 0;
    return e.forEach((i, o) => r[i] = new ni(i, s++, t, o)), r;
  }
  /**
  When there is a mark of this type in the given set, a new set
  without it is returned. Otherwise, the input set is returned.
  */
  removeFromSet(e) {
    for (var t = 0; t < e.length; t++)
      e[t].type == this && (e = e.slice(0, t).concat(e.slice(t + 1)), t--);
    return e;
  }
  /**
  Tests whether there is a mark of this type in the given set.
  */
  isInSet(e) {
    for (let t = 0; t < e.length; t++)
      if (e[t].type == this)
        return e[t];
  }
  /**
  @internal
  */
  checkAttrs(e) {
    Ru(this.attrs, e, "mark", this.name);
  }
  /**
  Queries whether a given mark type is
  [excluded](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) by this one.
  */
  excludes(e) {
    return this.excluded.indexOf(e) > -1;
  }
}
class Lu {
  /**
  Construct a schema from a schema [specification](https://prosemirror.net/docs/ref/#model.SchemaSpec).
  */
  constructor(e) {
    this.linebreakReplacement = null, this.cached = /* @__PURE__ */ Object.create(null);
    let t = this.spec = {};
    for (let s in e)
      t[s] = e[s];
    t.nodes = Fe.from(e.nodes), t.marks = Fe.from(e.marks || {}), this.nodes = ha.compile(this.spec.nodes, this), this.marks = ni.compile(this.spec.marks, this);
    let r = /* @__PURE__ */ Object.create(null);
    for (let s in this.nodes) {
      if (s in this.marks)
        throw new RangeError(s + " can not be both a node and a mark");
      let i = this.nodes[s], o = i.spec.content || "", l = i.spec.marks;
      if (i.contentMatch = r[o] || (r[o] = kn.parse(o, this.nodes)), i.inlineContent = i.contentMatch.inlineContent, i.spec.linebreakReplacement) {
        if (this.linebreakReplacement)
          throw new RangeError("Multiple linebreak nodes defined");
        if (!i.isInline || !i.isLeaf)
          throw new RangeError("Linebreak replacement nodes must be inline leaf nodes");
        this.linebreakReplacement = i;
      }
      i.markSet = l == "_" ? null : l ? pa(this, l.split(" ")) : l == "" || !i.inlineContent ? [] : null;
    }
    for (let s in this.marks) {
      let i = this.marks[s], o = i.spec.excludes;
      i.excluded = o == null ? [i] : o == "" ? [] : pa(this, o.split(" "));
    }
    this.nodeFromJSON = (s) => bt.fromJSON(this, s), this.markFromJSON = (s) => ae.fromJSON(this, s), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = /* @__PURE__ */ Object.create(null);
  }
  /**
  Create a node in this schema. The `type` may be a string or a
  `NodeType` instance. Attributes will be extended with defaults,
  `content` may be a `Fragment`, `null`, a `Node`, or an array of
  nodes.
  */
  node(e, t = null, r, s) {
    if (typeof e == "string")
      e = this.nodeType(e);
    else if (e instanceof ha) {
      if (e.schema != this)
        throw new RangeError("Node type from different schema used (" + e.name + ")");
    } else throw new RangeError("Invalid node type: " + e);
    return e.createChecked(t, r, s);
  }
  /**
  Create a text node in the schema. Empty text nodes are not
  allowed.
  */
  text(e, t) {
    let r = this.nodes.text;
    return new hs(r, r.defaultAttrs, e, ae.setFrom(t));
  }
  /**
  Create a mark with the given type and attributes.
  */
  mark(e, t) {
    return typeof e == "string" && (e = this.marks[e]), e.create(t);
  }
  /**
  @internal
  */
  nodeType(e) {
    let t = this.nodes[e];
    if (!t)
      throw new RangeError("Unknown node type: " + e);
    return t;
  }
}
function pa(n, e) {
  let t = [];
  for (let r = 0; r < e.length; r++) {
    let s = e[r], i = n.marks[s], o = i;
    if (i)
      t.push(i);
    else
      for (let l in n.marks) {
        let a = n.marks[l];
        (s == "_" || a.spec.group && a.spec.group.split(" ").indexOf(s) > -1) && t.push(o = a);
      }
    if (!o)
      throw new SyntaxError("Unknown mark type: '" + e[r] + "'");
  }
  return t;
}
function Ip(n) {
  return n.tag != null;
}
function Lp(n) {
  return n.style != null;
}
class Jt {
  /**
  Create a parser that targets the given schema, using the given
  parsing rules.
  */
  constructor(e, t) {
    this.schema = e, this.rules = t, this.tags = [], this.styles = [];
    let r = this.matchedStyles = [];
    t.forEach((s) => {
      if (Ip(s))
        this.tags.push(s);
      else if (Lp(s)) {
        let i = /[^=]*/.exec(s.style)[0];
        r.indexOf(i) < 0 && r.push(i), this.styles.push(s);
      }
    }), this.normalizeLists = !this.tags.some((s) => {
      if (!/^(ul|ol)\b/.test(s.tag) || !s.node)
        return !1;
      let i = e.nodes[s.node];
      return i.contentMatch.matchType(i);
    });
  }
  /**
  Parse a document from the content of a DOM node.
  */
  parse(e, t = {}) {
    let r = new ga(this, t, !1);
    return r.addAll(e, ae.none, t.from, t.to), r.finish();
  }
  /**
  Parses the content of the given DOM node, like
  [`parse`](https://prosemirror.net/docs/ref/#model.DOMParser.parse), and takes the same set of
  options. But unlike that method, which produces a whole node,
  this one returns a slice that is open at the sides, meaning that
  the schema constraints aren't applied to the start of nodes to
  the left of the input and the end of nodes at the end.
  */
  parseSlice(e, t = {}) {
    let r = new ga(this, t, !0);
    return r.addAll(e, ae.none, t.from, t.to), _.maxOpen(r.finish());
  }
  /**
  @internal
  */
  matchTag(e, t, r) {
    for (let s = r ? this.tags.indexOf(r) + 1 : 0; s < this.tags.length; s++) {
      let i = this.tags[s];
      if (Bp(e, i.tag) && (i.namespace === void 0 || e.namespaceURI == i.namespace) && (!i.context || t.matchesContext(i.context))) {
        if (i.getAttrs) {
          let o = i.getAttrs(e);
          if (o === !1)
            continue;
          i.attrs = o || void 0;
        }
        return i;
      }
    }
  }
  /**
  @internal
  */
  matchStyle(e, t, r, s) {
    for (let i = s ? this.styles.indexOf(s) + 1 : 0; i < this.styles.length; i++) {
      let o = this.styles[i], l = o.style;
      if (!(l.indexOf(e) != 0 || o.context && !r.matchesContext(o.context) || // Test that the style string either precisely matches the prop,
      // or has an '=' sign after the prop, followed by the given
      // value.
      l.length > e.length && (l.charCodeAt(e.length) != 61 || l.slice(e.length + 1) != t))) {
        if (o.getAttrs) {
          let a = o.getAttrs(t);
          if (a === !1)
            continue;
          o.attrs = a || void 0;
        }
        return o;
      }
    }
  }
  /**
  @internal
  */
  static schemaRules(e) {
    let t = [];
    function r(s) {
      let i = s.priority == null ? 50 : s.priority, o = 0;
      for (; o < t.length; o++) {
        let l = t[o];
        if ((l.priority == null ? 50 : l.priority) < i)
          break;
      }
      t.splice(o, 0, s);
    }
    for (let s in e.marks) {
      let i = e.marks[s].spec.parseDOM;
      i && i.forEach((o) => {
        r(o = ya(o)), o.mark || o.ignore || o.clearMark || (o.mark = s);
      });
    }
    for (let s in e.nodes) {
      let i = e.nodes[s].spec.parseDOM;
      i && i.forEach((o) => {
        r(o = ya(o)), o.node || o.ignore || o.mark || (o.node = s);
      });
    }
    return t;
  }
  /**
  Construct a DOM parser using the parsing rules listed in a
  schema's [node specs](https://prosemirror.net/docs/ref/#model.NodeSpec.parseDOM), reordered by
  [priority](https://prosemirror.net/docs/ref/#model.GenericParseRule.priority).
  */
  static fromSchema(e) {
    return e.cached.domParser || (e.cached.domParser = new Jt(e, Jt.schemaRules(e)));
  }
}
const Pu = {
  address: !0,
  article: !0,
  aside: !0,
  blockquote: !0,
  canvas: !0,
  dd: !0,
  div: !0,
  dl: !0,
  fieldset: !0,
  figcaption: !0,
  figure: !0,
  footer: !0,
  form: !0,
  h1: !0,
  h2: !0,
  h3: !0,
  h4: !0,
  h5: !0,
  h6: !0,
  header: !0,
  hgroup: !0,
  hr: !0,
  li: !0,
  noscript: !0,
  ol: !0,
  output: !0,
  p: !0,
  pre: !0,
  section: !0,
  table: !0,
  tfoot: !0,
  ul: !0
}, Pp = {
  head: !0,
  noscript: !0,
  object: !0,
  script: !0,
  style: !0,
  title: !0
}, _u = { ol: !0, ul: !0 }, Cr = 1, wo = 2, hr = 4;
function ma(n, e, t) {
  return e != null ? (e ? Cr : 0) | (e === "full" ? wo : 0) : n && n.whitespace == "pre" ? Cr | wo : t & ~hr;
}
class $r {
  constructor(e, t, r, s, i, o) {
    this.type = e, this.attrs = t, this.marks = r, this.solid = s, this.options = o, this.content = [], this.activeMarks = ae.none, this.match = i || (o & hr ? null : e.contentMatch);
  }
  findWrapping(e) {
    if (!this.match) {
      if (!this.type)
        return [];
      let t = this.type.contentMatch.fillBefore(A.from(e));
      if (t)
        this.match = this.type.contentMatch.matchFragment(t);
      else {
        let r = this.type.contentMatch, s;
        return (s = r.findWrapping(e.type)) ? (this.match = r, s) : null;
      }
    }
    return this.match.findWrapping(e.type);
  }
  finish(e) {
    if (!(this.options & Cr)) {
      let r = this.content[this.content.length - 1], s;
      if (r && r.isText && (s = /[ \t\r\n\u000c]+$/.exec(r.text))) {
        let i = r;
        r.text.length == s[0].length ? this.content.pop() : this.content[this.content.length - 1] = i.withText(i.text.slice(0, i.text.length - s[0].length));
      }
    }
    let t = A.from(this.content);
    return !e && this.match && (t = t.append(this.match.fillBefore(A.empty, !0))), this.type ? this.type.create(this.attrs, t, this.marks) : t;
  }
  inlineContext(e) {
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !Pu.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
  }
}
class ga {
  constructor(e, t, r) {
    this.parser = e, this.options = t, this.isOpen = r, this.open = 0, this.localPreserveWS = !1;
    let s = t.topNode, i, o = ma(null, t.preserveWhitespace, 0) | (r ? hr : 0);
    s ? i = new $r(s.type, s.attrs, ae.none, !0, t.topMatch || s.type.contentMatch, o) : r ? i = new $r(null, null, ae.none, !0, null, o) : i = new $r(e.schema.topNodeType, null, ae.none, !0, null, o), this.nodes = [i], this.find = t.findPositions, this.needsBlock = !1;
  }
  get top() {
    return this.nodes[this.open];
  }
  // Add a DOM node to the content. Text is inserted as text node,
  // otherwise, the node is passed to `addElement` or, if it has a
  // `style` attribute, `addElementWithStyles`.
  addDOM(e, t) {
    e.nodeType == 3 ? this.addTextNode(e, t) : e.nodeType == 1 && this.addElement(e, t);
  }
  addTextNode(e, t) {
    let r = e.nodeValue, s = this.top, i = s.options & wo ? "full" : this.localPreserveWS || (s.options & Cr) > 0, { schema: o } = this.parser;
    if (i === "full" || s.inlineContext(e) || /[^ \t\r\n\u000c]/.test(r)) {
      if (i)
        if (i === "full")
          r = r.replace(/\r\n?/g, `
`);
        else if (o.linebreakReplacement && /[\r\n]/.test(r) && this.top.findWrapping(o.linebreakReplacement.create())) {
          let l = r.split(/\r?\n|\r/);
          for (let a = 0; a < l.length; a++)
            a && this.insertNode(o.linebreakReplacement.create(), t, !0), l[a] && this.insertNode(o.text(l[a]), t, !/\S/.test(l[a]));
          r = "";
        } else
          r = r.replace(/\r?\n|\r/g, " ");
      else if (r = r.replace(/[ \t\r\n\u000c]+/g, " "), /^[ \t\r\n\u000c]/.test(r) && this.open == this.nodes.length - 1) {
        let l = s.content[s.content.length - 1], a = e.previousSibling;
        (!l || a && a.nodeName == "BR" || l.isText && /[ \t\r\n\u000c]$/.test(l.text)) && (r = r.slice(1));
      }
      r && this.insertNode(o.text(r), t, !/\S/.test(r)), this.findInText(e);
    } else
      this.findInside(e);
  }
  // Try to find a handler for the given tag and use that to parse. If
  // none is found, the element's content nodes are added directly.
  addElement(e, t, r) {
    let s = this.localPreserveWS, i = this.top;
    (e.tagName == "PRE" || /pre/.test(e.style && e.style.whiteSpace)) && (this.localPreserveWS = !0);
    let o = e.nodeName.toLowerCase(), l;
    _u.hasOwnProperty(o) && this.parser.normalizeLists && _p(e);
    let a = this.options.ruleFromNode && this.options.ruleFromNode(e) || (l = this.parser.matchTag(e, this, r));
    e: if (a ? a.ignore : Pp.hasOwnProperty(o))
      this.findInside(e), this.ignoreFallback(e, t);
    else if (!a || a.skip || a.closeParent) {
      a && a.closeParent ? this.open = Math.max(0, this.open - 1) : a && a.skip.nodeType && (e = a.skip);
      let c, u = this.needsBlock;
      if (Pu.hasOwnProperty(o))
        i.content.length && i.content[0].isInline && this.open && (this.open--, i = this.top), c = !0, i.type || (this.needsBlock = !0);
      else if (!e.firstChild) {
        this.leafFallback(e, t);
        break e;
      }
      let d = a && a.skip ? t : this.readStyles(e, t);
      d && this.addAll(e, d), c && this.sync(i), this.needsBlock = u;
    } else {
      let c = this.readStyles(e, t);
      c && this.addElementByRule(e, a, c, a.consuming === !1 ? l : void 0);
    }
    this.localPreserveWS = s;
  }
  // Called for leaf DOM nodes that would otherwise be ignored
  leafFallback(e, t) {
    e.nodeName == "BR" && this.top.type && this.top.type.inlineContent && this.addTextNode(e.ownerDocument.createTextNode(`
`), t);
  }
  // Called for ignored nodes
  ignoreFallback(e, t) {
    e.nodeName == "BR" && (!this.top.type || !this.top.type.inlineContent) && this.findPlace(this.parser.schema.text("-"), t, !0);
  }
  // Run any style parser associated with the node's styles. Either
  // return an updated array of marks, or null to indicate some of the
  // styles had a rule with `ignore` set.
  readStyles(e, t) {
    let r = e.style;
    if (r && r.length)
      for (let s = 0; s < this.parser.matchedStyles.length; s++) {
        let i = this.parser.matchedStyles[s], o = r.getPropertyValue(i);
        if (o)
          for (let l = void 0; ; ) {
            let a = this.parser.matchStyle(i, o, this, l);
            if (!a)
              break;
            if (a.ignore)
              return null;
            if (a.clearMark ? t = t.filter((c) => !a.clearMark(c)) : t = t.concat(this.parser.schema.marks[a.mark].create(a.attrs)), a.consuming === !1)
              l = a;
            else
              break;
          }
      }
    return t;
  }
  // Look up a handler for the given node. If none are found, return
  // false. Otherwise, apply it, use its return value to drive the way
  // the node's content is wrapped, and return true.
  addElementByRule(e, t, r, s) {
    let i, o;
    if (t.node)
      if (o = this.parser.schema.nodes[t.node], o.isLeaf)
        this.insertNode(o.create(t.attrs), r, e.nodeName == "BR") || this.leafFallback(e, r);
      else {
        let a = this.enter(o, t.attrs || null, r, t.preserveWhitespace);
        a && (i = !0, r = a);
      }
    else {
      let a = this.parser.schema.marks[t.mark];
      r = r.concat(a.create(t.attrs));
    }
    let l = this.top;
    if (o && o.isLeaf)
      this.findInside(e);
    else if (s)
      this.addElement(e, r, s);
    else if (t.getContent)
      this.findInside(e), t.getContent(e, this.parser.schema).forEach((a) => this.insertNode(a, r, !1));
    else {
      let a = e;
      typeof t.contentElement == "string" ? a = e.querySelector(t.contentElement) : typeof t.contentElement == "function" ? a = t.contentElement(e) : t.contentElement && (a = t.contentElement), this.findAround(e, a, !0), this.addAll(a, r), this.findAround(e, a, !1);
    }
    i && this.sync(l) && this.open--;
  }
  // Add all child nodes between `startIndex` and `endIndex` (or the
  // whole node, if not given). If `sync` is passed, use it to
  // synchronize after every block element.
  addAll(e, t, r, s) {
    let i = r || 0;
    for (let o = r ? e.childNodes[r] : e.firstChild, l = s == null ? null : e.childNodes[s]; o != l; o = o.nextSibling, ++i)
      this.findAtPoint(e, i), this.addDOM(o, t);
    this.findAtPoint(e, i);
  }
  // Try to find a way to fit the given node type into the current
  // context. May add intermediate wrappers and/or leave non-solid
  // nodes that we're in.
  findPlace(e, t, r) {
    let s, i;
    for (let o = this.open, l = 0; o >= 0; o--) {
      let a = this.nodes[o], c = a.findWrapping(e);
      if (c && (!s || s.length > c.length + l) && (s = c, i = a, !c.length))
        break;
      if (a.solid) {
        if (r)
          break;
        l += 2;
      }
    }
    if (!s)
      return null;
    this.sync(i);
    for (let o = 0; o < s.length; o++)
      t = this.enterInner(s[o], null, t, !1);
    return t;
  }
  // Try to insert the given node, adjusting the context when needed.
  insertNode(e, t, r) {
    if (e.isInline && this.needsBlock && !this.top.type) {
      let i = this.textblockFromContext();
      i && (t = this.enterInner(i, null, t));
    }
    let s = this.findPlace(e, t, r);
    if (s) {
      this.closeExtra();
      let i = this.top;
      i.match && (i.match = i.match.matchType(e.type));
      let o = ae.none;
      for (let l of s.concat(e.marks))
        (i.type ? i.type.allowsMarkType(l.type) : ba(l.type, e.type)) && (o = l.addToSet(o));
      return i.content.push(e.mark(o)), !0;
    }
    return !1;
  }
  // Try to start a node of the given type, adjusting the context when
  // necessary.
  enter(e, t, r, s) {
    let i = this.findPlace(e.create(t), r, !1);
    return i && (i = this.enterInner(e, t, r, !0, s)), i;
  }
  // Open a node of the given type
  enterInner(e, t, r, s = !1, i) {
    this.closeExtra();
    let o = this.top;
    o.match = o.match && o.match.matchType(e);
    let l = ma(e, i, o.options);
    o.options & hr && o.content.length == 0 && (l |= hr);
    let a = ae.none;
    return r = r.filter((c) => (o.type ? o.type.allowsMarkType(c.type) : ba(c.type, e)) ? (a = c.addToSet(a), !1) : !0), this.nodes.push(new $r(e, t, a, s, null, l)), this.open++, r;
  }
  // Make sure all nodes above this.open are finished and added to
  // their parents
  closeExtra(e = !1) {
    let t = this.nodes.length - 1;
    if (t > this.open) {
      for (; t > this.open; t--)
        this.nodes[t - 1].content.push(this.nodes[t].finish(e));
      this.nodes.length = this.open + 1;
    }
  }
  finish() {
    return this.open = 0, this.closeExtra(this.isOpen), this.nodes[0].finish(!!(this.isOpen || this.options.topOpen));
  }
  sync(e) {
    for (let t = this.open; t >= 0; t--) {
      if (this.nodes[t] == e)
        return this.open = t, !0;
      this.localPreserveWS && (this.nodes[t].options |= Cr);
    }
    return !1;
  }
  get currentPos() {
    this.closeExtra();
    let e = 0;
    for (let t = this.open; t >= 0; t--) {
      let r = this.nodes[t].content;
      for (let s = r.length - 1; s >= 0; s--)
        e += r[s].nodeSize;
      t && e++;
    }
    return e;
  }
  findAtPoint(e, t) {
    if (this.find)
      for (let r = 0; r < this.find.length; r++)
        this.find[r].node == e && this.find[r].offset == t && (this.find[r].pos = this.currentPos);
  }
  findInside(e) {
    if (this.find)
      for (let t = 0; t < this.find.length; t++)
        this.find[t].pos == null && e.nodeType == 1 && e.contains(this.find[t].node) && (this.find[t].pos = this.currentPos);
  }
  findAround(e, t, r) {
    if (e != t && this.find)
      for (let s = 0; s < this.find.length; s++)
        this.find[s].pos == null && e.nodeType == 1 && e.contains(this.find[s].node) && t.compareDocumentPosition(this.find[s].node) & (r ? 2 : 4) && (this.find[s].pos = this.currentPos);
  }
  findInText(e) {
    if (this.find)
      for (let t = 0; t < this.find.length; t++)
        this.find[t].node == e && (this.find[t].pos = this.currentPos - (e.nodeValue.length - this.find[t].offset));
  }
  // Determines whether the given context string matches this context.
  matchesContext(e) {
    if (e.indexOf("|") > -1)
      return e.split(/\s*\|\s*/).some(this.matchesContext, this);
    let t = e.split("/"), r = this.options.context, s = !this.isOpen && (!r || r.parent.type == this.nodes[0].type), i = -(r ? r.depth + 1 : 0) + (s ? 0 : 1), o = (l, a) => {
      for (; l >= 0; l--) {
        let c = t[l];
        if (c == "") {
          if (l == t.length - 1 || l == 0)
            continue;
          for (; a >= i; a--)
            if (o(l - 1, a))
              return !0;
          return !1;
        } else {
          let u = a > 0 || a == 0 && s ? this.nodes[a].type : r && a >= i ? r.node(a - i).type : null;
          if (!u || u.name != c && !u.isInGroup(c))
            return !1;
          a--;
        }
      }
      return !0;
    };
    return o(t.length - 1, this.open);
  }
  textblockFromContext() {
    let e = this.options.context;
    if (e)
      for (let t = e.depth; t >= 0; t--) {
        let r = e.node(t).contentMatchAt(e.indexAfter(t)).defaultType;
        if (r && r.isTextblock && r.defaultAttrs)
          return r;
      }
    for (let t in this.parser.schema.nodes) {
      let r = this.parser.schema.nodes[t];
      if (r.isTextblock && r.defaultAttrs)
        return r;
    }
  }
}
function _p(n) {
  for (let e = n.firstChild, t = null; e; e = e.nextSibling) {
    let r = e.nodeType == 1 ? e.nodeName.toLowerCase() : null;
    r && _u.hasOwnProperty(r) && t ? (t.appendChild(e), e = t) : r == "li" ? t = e : r && (t = null);
  }
}
function Bp(n, e) {
  return (n.matches || n.msMatchesSelector || n.webkitMatchesSelector || n.mozMatchesSelector).call(n, e);
}
function ya(n) {
  let e = {};
  for (let t in n)
    e[t] = n[t];
  return e;
}
function ba(n, e) {
  let t = e.schema.nodes;
  for (let r in t) {
    let s = t[r];
    if (!s.allowsMarkType(n))
      continue;
    let i = [], o = (l) => {
      i.push(l);
      for (let a = 0; a < l.edgeCount; a++) {
        let { type: c, next: u } = l.edge(a);
        if (c == e || i.indexOf(u) < 0 && o(u))
          return !0;
      }
    };
    if (o(s.contentMatch))
      return !0;
  }
}
class Mn {
  /**
  Create a serializer. `nodes` should map node names to functions
  that take a node and return a description of the corresponding
  DOM. `marks` does the same for mark names, but also gets an
  argument that tells it whether the mark's content is block or
  inline content (for typical use, it'll always be inline). A mark
  serializer may be `null` to indicate that marks of that type
  should not be serialized.
  */
  constructor(e, t) {
    this.nodes = e, this.marks = t;
  }
  /**
  Serialize the content of this fragment to a DOM fragment. When
  not in the browser, the `document` option, containing a DOM
  document, should be passed so that the serializer can create
  nodes.
  */
  serializeFragment(e, t = {}, r) {
    r || (r = Di(t).createDocumentFragment());
    let s = r, i = [];
    return e.forEach((o) => {
      if (i.length || o.marks.length) {
        let l = 0, a = 0;
        for (; l < i.length && a < o.marks.length; ) {
          let c = o.marks[a];
          if (!this.marks[c.type.name]) {
            a++;
            continue;
          }
          if (!c.eq(i[l][0]) || c.type.spec.spanning === !1)
            break;
          l++, a++;
        }
        for (; l < i.length; )
          s = i.pop()[1];
        for (; a < o.marks.length; ) {
          let c = o.marks[a++], u = this.serializeMark(c, o.isInline, t);
          u && (i.push([c, s]), s.appendChild(u.dom), s = u.contentDOM || u.dom);
        }
      }
      s.appendChild(this.serializeNodeInner(o, t));
    }), r;
  }
  /**
  @internal
  */
  serializeNodeInner(e, t) {
    let { dom: r, contentDOM: s } = Zr(Di(t), this.nodes[e.type.name](e), null, e.attrs);
    if (s) {
      if (e.isLeaf)
        throw new RangeError("Content hole not allowed in a leaf node spec");
      this.serializeFragment(e.content, t, s);
    }
    return r;
  }
  /**
  Serialize this node to a DOM node. This can be useful when you
  need to serialize a part of a document, as opposed to the whole
  document. To serialize a whole document, use
  [`serializeFragment`](https://prosemirror.net/docs/ref/#model.DOMSerializer.serializeFragment) on
  its [content](https://prosemirror.net/docs/ref/#model.Node.content).
  */
  serializeNode(e, t = {}) {
    let r = this.serializeNodeInner(e, t);
    for (let s = e.marks.length - 1; s >= 0; s--) {
      let i = this.serializeMark(e.marks[s], e.isInline, t);
      i && ((i.contentDOM || i.dom).appendChild(r), r = i.dom);
    }
    return r;
  }
  /**
  @internal
  */
  serializeMark(e, t, r = {}) {
    let s = this.marks[e.type.name];
    return s && Zr(Di(r), s(e, t), null, e.attrs);
  }
  static renderSpec(e, t, r = null, s) {
    return Zr(e, t, r, s);
  }
  /**
  Build a serializer using the [`toDOM`](https://prosemirror.net/docs/ref/#model.NodeSpec.toDOM)
  properties in a schema's node and mark specs.
  */
  static fromSchema(e) {
    return e.cached.domSerializer || (e.cached.domSerializer = new Mn(this.nodesFromSchema(e), this.marksFromSchema(e)));
  }
  /**
  Gather the serializers in a schema's node specs into an object.
  This can be useful as a base to build a custom serializer from.
  */
  static nodesFromSchema(e) {
    let t = xa(e.nodes);
    return t.text || (t.text = (r) => r.text), t;
  }
  /**
  Gather the serializers in a schema's mark specs into an object.
  */
  static marksFromSchema(e) {
    return xa(e.marks);
  }
}
function xa(n) {
  let e = {};
  for (let t in n) {
    let r = n[t].spec.toDOM;
    r && (e[t] = r);
  }
  return e;
}
function Di(n) {
  return n.document || window.document;
}
const ka = /* @__PURE__ */ new WeakMap();
function Fp(n) {
  let e = ka.get(n);
  return e === void 0 && ka.set(n, e = Vp(n)), e;
}
function Vp(n) {
  let e = null;
  function t(r) {
    if (r && typeof r == "object")
      if (Array.isArray(r))
        if (typeof r[0] == "string")
          e || (e = []), e.push(r);
        else
          for (let s = 0; s < r.length; s++)
            t(r[s]);
      else
        for (let s in r)
          t(r[s]);
  }
  return t(n), e;
}
function Zr(n, e, t, r) {
  if (typeof e == "string")
    return { dom: n.createTextNode(e) };
  if (e.nodeType != null)
    return { dom: e };
  if (e.dom && e.dom.nodeType != null)
    return e;
  let s = e[0], i;
  if (typeof s != "string")
    throw new RangeError("Invalid array passed to renderSpec");
  if (r && (i = Fp(r)) && i.indexOf(e) > -1)
    throw new RangeError("Using an array from an attribute object as a DOM spec. This may be an attempted cross site scripting attack.");
  let o = s.indexOf(" ");
  o > 0 && (t = s.slice(0, o), s = s.slice(o + 1));
  let l, a = t ? n.createElementNS(t, s) : n.createElement(s), c = e[1], u = 1;
  if (c && typeof c == "object" && c.nodeType == null && !Array.isArray(c)) {
    u = 2;
    for (let d in c)
      if (c[d] != null) {
        let f = d.indexOf(" ");
        f > 0 ? a.setAttributeNS(d.slice(0, f), d.slice(f + 1), c[d]) : d == "style" && a.style ? a.style.cssText = c[d] : a.setAttribute(d, c[d]);
      }
  }
  for (let d = u; d < e.length; d++) {
    let f = e[d];
    if (f === 0) {
      if (d < e.length - 1 || d > u)
        throw new RangeError("Content hole must be the only child of its parent node");
      return { dom: a, contentDOM: a };
    } else {
      let { dom: h, contentDOM: p } = Zr(n, f, t, r);
      if (a.appendChild(h), p) {
        if (l)
          throw new RangeError("Multiple content holes");
        l = p;
      }
    }
  }
  return { dom: a, contentDOM: l };
}
const Bu = 65535, Fu = Math.pow(2, 16);
function zp(n, e) {
  return n + e * Fu;
}
function va(n) {
  return n & Bu;
}
function jp(n) {
  return (n - (n & Bu)) / Fu;
}
const Vu = 1, zu = 2, es = 4, ju = 8;
class Co {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.pos = e, this.delInfo = t, this.recover = r;
  }
  /**
  Tells you whether the position was deleted, that is, whether the
  step removed the token on the side queried (via the `assoc`)
  argument from the document.
  */
  get deleted() {
    return (this.delInfo & ju) > 0;
  }
  /**
  Tells you whether the token before the mapped position was deleted.
  */
  get deletedBefore() {
    return (this.delInfo & (Vu | es)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (zu | es)) > 0;
  }
  /**
  Tells whether any of the steps mapped through deletes across the
  position (including both the token before and after the
  position).
  */
  get deletedAcross() {
    return (this.delInfo & es) > 0;
  }
}
class nt {
  /**
  Create a position map. The modifications to the document are
  represented as an array of numbers, in which each group of three
  represents a modified chunk as `[start, oldSize, newSize]`.
  */
  constructor(e, t = !1) {
    if (this.ranges = e, this.inverted = t, !e.length && nt.empty)
      return nt.empty;
  }
  /**
  @internal
  */
  recover(e) {
    let t = 0, r = va(e);
    if (!this.inverted)
      for (let s = 0; s < r; s++)
        t += this.ranges[s * 3 + 2] - this.ranges[s * 3 + 1];
    return this.ranges[r * 3] + t + jp(e);
  }
  mapResult(e, t = 1) {
    return this._map(e, t, !1);
  }
  map(e, t = 1) {
    return this._map(e, t, !0);
  }
  /**
  @internal
  */
  _map(e, t, r) {
    let s = 0, i = this.inverted ? 2 : 1, o = this.inverted ? 1 : 2;
    for (let l = 0; l < this.ranges.length; l += 3) {
      let a = this.ranges[l] - (this.inverted ? s : 0);
      if (a > e)
        break;
      let c = this.ranges[l + i], u = this.ranges[l + o], d = a + c;
      if (e <= d) {
        let f = c ? e == a ? -1 : e == d ? 1 : t : t, h = a + s + (f < 0 ? 0 : u);
        if (r)
          return h;
        let p = e == (t < 0 ? a : d) ? null : zp(l / 3, e - a), m = e == a ? zu : e == d ? Vu : es;
        return (t < 0 ? e != a : e != d) && (m |= ju), new Co(h, m, p);
      }
      s += u - c;
    }
    return r ? e + s : new Co(e + s, 0, null);
  }
  /**
  @internal
  */
  touches(e, t) {
    let r = 0, s = va(t), i = this.inverted ? 2 : 1, o = this.inverted ? 1 : 2;
    for (let l = 0; l < this.ranges.length; l += 3) {
      let a = this.ranges[l] - (this.inverted ? r : 0);
      if (a > e)
        break;
      let c = this.ranges[l + i], u = a + c;
      if (e <= u && l == s * 3)
        return !0;
      r += this.ranges[l + o] - c;
    }
    return !1;
  }
  /**
  Calls the given function on each of the changed ranges included in
  this map.
  */
  forEach(e) {
    let t = this.inverted ? 2 : 1, r = this.inverted ? 1 : 2;
    for (let s = 0, i = 0; s < this.ranges.length; s += 3) {
      let o = this.ranges[s], l = o - (this.inverted ? i : 0), a = o + (this.inverted ? 0 : i), c = this.ranges[s + t], u = this.ranges[s + r];
      e(l, l + c, a, a + u), i += u - c;
    }
  }
  /**
  Create an inverted version of this map. The result can be used to
  map positions in the post-step document to the pre-step document.
  */
  invert() {
    return new nt(this.ranges, !this.inverted);
  }
  /**
  @internal
  */
  toString() {
    return (this.inverted ? "-" : "") + JSON.stringify(this.ranges);
  }
  /**
  Create a map that moves all positions by offset `n` (which may be
  negative). This can be useful when applying steps meant for a
  sub-document to a larger document, or vice-versa.
  */
  static offset(e) {
    return e == 0 ? nt.empty : new nt(e < 0 ? [0, -e, 0] : [0, 0, e]);
  }
}
nt.empty = new nt([]);
class Er {
  /**
  Create a new mapping with the given position maps.
  */
  constructor(e, t, r = 0, s = e ? e.length : 0) {
    this.mirror = t, this.from = r, this.to = s, this._maps = e || [], this.ownData = !(e || t);
  }
  /**
  The step maps in this mapping.
  */
  get maps() {
    return this._maps;
  }
  /**
  Create a mapping that maps only through a part of this one.
  */
  slice(e = 0, t = this.maps.length) {
    return new Er(this._maps, this.mirror, e, t);
  }
  /**
  Add a step map to the end of this mapping. If `mirrors` is
  given, it should be the index of the step map that is the mirror
  image of this one.
  */
  appendMap(e, t) {
    this.ownData || (this._maps = this._maps.slice(), this.mirror = this.mirror && this.mirror.slice(), this.ownData = !0), this.to = this._maps.push(e), t != null && this.setMirror(this._maps.length - 1, t);
  }
  /**
  Add all the step maps in a given mapping to this one (preserving
  mirroring information).
  */
  appendMapping(e) {
    for (let t = 0, r = this._maps.length; t < e._maps.length; t++) {
      let s = e.getMirror(t);
      this.appendMap(e._maps[t], s != null && s < t ? r + s : void 0);
    }
  }
  /**
  Finds the offset of the step map that mirrors the map at the
  given offset, in this mapping (as per the second argument to
  `appendMap`).
  */
  getMirror(e) {
    if (this.mirror) {
      for (let t = 0; t < this.mirror.length; t++)
        if (this.mirror[t] == e)
          return this.mirror[t + (t % 2 ? -1 : 1)];
    }
  }
  /**
  @internal
  */
  setMirror(e, t) {
    this.mirror || (this.mirror = []), this.mirror.push(e, t);
  }
  /**
  Append the inverse of the given mapping to this one.
  */
  appendMappingInverted(e) {
    for (let t = e.maps.length - 1, r = this._maps.length + e._maps.length; t >= 0; t--) {
      let s = e.getMirror(t);
      this.appendMap(e._maps[t].invert(), s != null && s > t ? r - s - 1 : void 0);
    }
  }
  /**
  Create an inverted version of this mapping.
  */
  invert() {
    let e = new Er();
    return e.appendMappingInverted(this), e;
  }
  /**
  Map a position through this mapping.
  */
  map(e, t = 1) {
    if (this.mirror)
      return this._map(e, t, !0);
    for (let r = this.from; r < this.to; r++)
      e = this._maps[r].map(e, t);
    return e;
  }
  /**
  Map a position through this mapping, returning a mapping
  result.
  */
  mapResult(e, t = 1) {
    return this._map(e, t, !1);
  }
  /**
  @internal
  */
  _map(e, t, r) {
    let s = 0;
    for (let i = this.from; i < this.to; i++) {
      let o = this._maps[i], l = o.mapResult(e, t);
      if (l.recover != null) {
        let a = this.getMirror(i);
        if (a != null && a > i && a < this.to) {
          i = a, e = this._maps[a].recover(l.recover);
          continue;
        }
      }
      s |= l.delInfo, e = l.pos;
    }
    return r ? e : new Co(e, s, null);
  }
}
const Ii = /* @__PURE__ */ Object.create(null);
class Ue {
  /**
  Get the step map that represents the changes made by this step,
  and which can be used to transform between positions in the old
  and the new document.
  */
  getMap() {
    return nt.empty;
  }
  /**
  Try to merge this step with another one, to be applied directly
  after it. Returns the merged step when possible, null if the
  steps can't be merged.
  */
  merge(e) {
    return null;
  }
  /**
  Deserialize a step from its JSON representation. Will call
  through to the step class' own implementation of this method.
  */
  static fromJSON(e, t) {
    if (!t || !t.stepType)
      throw new RangeError("Invalid input for Step.fromJSON");
    let r = Ii[t.stepType];
    if (!r)
      throw new RangeError(`No step type ${t.stepType} defined`);
    return r.fromJSON(e, t);
  }
  /**
  To be able to serialize steps to JSON, each step needs a string
  ID to attach to its JSON representation. Use this method to
  register an ID for your step classes. Try to pick something
  that's unlikely to clash with steps from other modules.
  */
  static jsonID(e, t) {
    if (e in Ii)
      throw new RangeError("Duplicate use of step JSON ID " + e);
    return Ii[e] = t, t.prototype.jsonID = e, t;
  }
}
class Me {
  /**
  @internal
  */
  constructor(e, t) {
    this.doc = e, this.failed = t;
  }
  /**
  Create a successful step result.
  */
  static ok(e) {
    return new Me(e, null);
  }
  /**
  Create a failed step result.
  */
  static fail(e) {
    return new Me(null, e);
  }
  /**
  Call [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) with the given
  arguments. Create a successful result if it succeeds, and a
  failed one if it throws a `ReplaceError`.
  */
  static fromReplace(e, t, r, s) {
    try {
      return Me.ok(e.replace(t, r, s));
    } catch (i) {
      if (i instanceof us)
        return Me.fail(i.message);
      throw i;
    }
  }
}
function al(n, e, t) {
  let r = [];
  for (let s = 0; s < n.childCount; s++) {
    let i = n.child(s);
    i.content.size && (i = i.copy(al(i.content, e, i))), i.isInline && (i = e(i, t, s)), r.push(i);
  }
  return A.fromArray(r);
}
class Wt extends Ue {
  /**
  Create a mark step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = e.resolve(this.from), s = r.node(r.sharedDepth(this.to)), i = new _(al(t.content, (o, l) => !o.isAtom || !l.type.allowsMarkType(this.mark.type) ? o : o.mark(this.mark.addToSet(o.marks)), s), t.openStart, t.openEnd);
    return Me.fromReplace(e, this.from, this.to, i);
  }
  invert() {
    return new yt(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new Wt(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof Wt && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new Wt(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
  }
  toJSON() {
    return {
      stepType: "addMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for AddMarkStep.fromJSON");
    return new Wt(t.from, t.to, e.markFromJSON(t.mark));
  }
}
Ue.jsonID("addMark", Wt);
class yt extends Ue {
  /**
  Create a mark-removing step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = new _(al(t.content, (s) => s.mark(this.mark.removeFromSet(s.marks)), e), t.openStart, t.openEnd);
    return Me.fromReplace(e, this.from, this.to, r);
  }
  invert() {
    return new Wt(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new yt(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof yt && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new yt(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
  }
  toJSON() {
    return {
      stepType: "removeMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for RemoveMarkStep.fromJSON");
    return new yt(t.from, t.to, e.markFromJSON(t.mark));
  }
}
Ue.jsonID("removeMark", yt);
class qt extends Ue {
  /**
  Create a node mark step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return Me.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
    return Me.fromReplace(e, this.pos, this.pos + 1, new _(A.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    if (t) {
      let r = this.mark.addToSet(t.marks);
      if (r.length == t.marks.length) {
        for (let s = 0; s < t.marks.length; s++)
          if (!t.marks[s].isInSet(r))
            return new qt(this.pos, t.marks[s]);
        return new qt(this.pos, this.mark);
      }
    }
    return new vn(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new qt(t.pos, this.mark);
  }
  toJSON() {
    return { stepType: "addNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.pos != "number")
      throw new RangeError("Invalid input for AddNodeMarkStep.fromJSON");
    return new qt(t.pos, e.markFromJSON(t.mark));
  }
}
Ue.jsonID("addNodeMark", qt);
class vn extends Ue {
  /**
  Create a mark-removing step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return Me.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
    return Me.fromReplace(e, this.pos, this.pos + 1, new _(A.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    return !t || !this.mark.isInSet(t.marks) ? this : new qt(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new vn(t.pos, this.mark);
  }
  toJSON() {
    return { stepType: "removeNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.pos != "number")
      throw new RangeError("Invalid input for RemoveNodeMarkStep.fromJSON");
    return new vn(t.pos, e.markFromJSON(t.mark));
  }
}
Ue.jsonID("removeNodeMark", vn);
class De extends Ue {
  /**
  The given `slice` should fit the 'gap' between `from` and
  `to`—the depths must line up, and the surrounding nodes must be
  able to be joined with the open sides of the slice. When
  `structure` is true, the step will fail if the content between
  from and to is not just a sequence of closing and then opening
  tokens (this is to guard against rebased replace steps
  overwriting something they weren't supposed to).
  */
  constructor(e, t, r, s = !1) {
    super(), this.from = e, this.to = t, this.slice = r, this.structure = s;
  }
  apply(e) {
    return this.structure && Eo(e, this.from, this.to) ? Me.fail("Structure replace would overwrite content") : Me.fromReplace(e, this.from, this.to, this.slice);
  }
  getMap() {
    return new nt([this.from, this.to - this.from, this.slice.size]);
  }
  invert(e) {
    return new De(this.from, this.from + this.slice.size, e.slice(this.from, this.to));
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deletedAcross && r.deletedAcross ? null : new De(t.pos, Math.max(t.pos, r.pos), this.slice, this.structure);
  }
  merge(e) {
    if (!(e instanceof De) || e.structure || this.structure)
      return null;
    if (this.from + this.slice.size == e.from && !this.slice.openEnd && !e.slice.openStart) {
      let t = this.slice.size + e.slice.size == 0 ? _.empty : new _(this.slice.content.append(e.slice.content), this.slice.openStart, e.slice.openEnd);
      return new De(this.from, this.to + (e.to - e.from), t, this.structure);
    } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
      let t = this.slice.size + e.slice.size == 0 ? _.empty : new _(e.slice.content.append(this.slice.content), e.slice.openStart, this.slice.openEnd);
      return new De(e.from, this.to, t, this.structure);
    } else
      return null;
  }
  toJSON() {
    let e = { stepType: "replace", from: this.from, to: this.to };
    return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e;
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for ReplaceStep.fromJSON");
    return new De(t.from, t.to, _.fromJSON(e, t.slice), !!t.structure);
  }
}
Ue.jsonID("replace", De);
class Le extends Ue {
  /**
  Create a replace-around step with the given range and gap.
  `insert` should be the point in the slice into which the content
  of the gap should be moved. `structure` has the same meaning as
  it has in the [`ReplaceStep`](https://prosemirror.net/docs/ref/#transform.ReplaceStep) class.
  */
  constructor(e, t, r, s, i, o, l = !1) {
    super(), this.from = e, this.to = t, this.gapFrom = r, this.gapTo = s, this.slice = i, this.insert = o, this.structure = l;
  }
  apply(e) {
    if (this.structure && (Eo(e, this.from, this.gapFrom) || Eo(e, this.gapTo, this.to)))
      return Me.fail("Structure gap-replace would overwrite content");
    let t = e.slice(this.gapFrom, this.gapTo);
    if (t.openStart || t.openEnd)
      return Me.fail("Gap is not a flat range");
    let r = this.slice.insertAt(this.insert, t.content);
    return r ? Me.fromReplace(e, this.from, this.to, r) : Me.fail("Content does not fit in gap");
  }
  getMap() {
    return new nt([
      this.from,
      this.gapFrom - this.from,
      this.insert,
      this.gapTo,
      this.to - this.gapTo,
      this.slice.size - this.insert
    ]);
  }
  invert(e) {
    let t = this.gapTo - this.gapFrom;
    return new Le(this.from, this.from + this.slice.size + t, this.from + this.insert, this.from + this.insert + t, e.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1), s = this.from == this.gapFrom ? t.pos : e.map(this.gapFrom, -1), i = this.to == this.gapTo ? r.pos : e.map(this.gapTo, 1);
    return t.deletedAcross && r.deletedAcross || s < t.pos || i > r.pos ? null : new Le(t.pos, r.pos, s, i, this.slice, this.insert, this.structure);
  }
  toJSON() {
    let e = {
      stepType: "replaceAround",
      from: this.from,
      to: this.to,
      gapFrom: this.gapFrom,
      gapTo: this.gapTo,
      insert: this.insert
    };
    return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e;
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number" || typeof t.gapFrom != "number" || typeof t.gapTo != "number" || typeof t.insert != "number")
      throw new RangeError("Invalid input for ReplaceAroundStep.fromJSON");
    return new Le(t.from, t.to, t.gapFrom, t.gapTo, _.fromJSON(e, t.slice), t.insert, !!t.structure);
  }
}
Ue.jsonID("replaceAround", Le);
function Eo(n, e, t) {
  let r = n.resolve(e), s = t - e, i = r.depth;
  for (; s > 0 && i > 0 && r.indexAfter(i) == r.node(i).childCount; )
    i--, s--;
  if (s > 0) {
    let o = r.node(i).maybeChild(r.indexAfter(i));
    for (; s > 0; ) {
      if (!o || o.isLeaf)
        return !0;
      o = o.firstChild, s--;
    }
  }
  return !1;
}
function $p(n, e, t, r) {
  let s = [], i = [], o, l;
  n.doc.nodesBetween(e, t, (a, c, u) => {
    if (!a.isInline)
      return;
    let d = a.marks;
    if (!r.isInSet(d) && u.type.allowsMarkType(r.type)) {
      let f = Math.max(c, e), h = Math.min(c + a.nodeSize, t), p = r.addToSet(d);
      for (let m = 0; m < d.length; m++)
        d[m].isInSet(p) || (o && o.to == f && o.mark.eq(d[m]) ? o.to = h : s.push(o = new yt(f, h, d[m])));
      l && l.to == f ? l.to = h : i.push(l = new Wt(f, h, r));
    }
  }), s.forEach((a) => n.step(a)), i.forEach((a) => n.step(a));
}
function Hp(n, e, t, r) {
  let s = [], i = 0;
  n.doc.nodesBetween(e, t, (o, l) => {
    if (!o.isInline)
      return;
    i++;
    let a = null;
    if (r instanceof ni) {
      let c = o.marks, u;
      for (; u = r.isInSet(c); )
        (a || (a = [])).push(u), c = u.removeFromSet(c);
    } else r ? r.isInSet(o.marks) && (a = [r]) : a = o.marks;
    if (a && a.length) {
      let c = Math.min(l + o.nodeSize, t);
      for (let u = 0; u < a.length; u++) {
        let d = a[u], f;
        for (let h = 0; h < s.length; h++) {
          let p = s[h];
          p.step == i - 1 && d.eq(s[h].style) && (f = p);
        }
        f ? (f.to = c, f.step = i) : s.push({ style: d, from: Math.max(l, e), to: c, step: i });
      }
    }
  }), s.forEach((o) => n.step(new yt(o.from, o.to, o.style)));
}
function cl(n, e, t, r = t.contentMatch, s = !0) {
  let i = n.doc.nodeAt(e), o = [], l = e + 1;
  for (let a = 0; a < i.childCount; a++) {
    let c = i.child(a), u = l + c.nodeSize, d = r.matchType(c.type);
    if (!d)
      o.push(new De(l, u, _.empty));
    else {
      r = d;
      for (let f = 0; f < c.marks.length; f++)
        t.allowsMarkType(c.marks[f].type) || n.step(new yt(l, u, c.marks[f]));
      if (s && c.isText && t.whitespace != "pre") {
        let f, h = /\r?\n|\r/g, p;
        for (; f = h.exec(c.text); )
          p || (p = new _(A.from(t.schema.text(" ", t.allowedMarks(c.marks))), 0, 0)), o.push(new De(l + f.index, l + f.index + f[0].length, p));
      }
    }
    l = u;
  }
  if (!r.validEnd) {
    let a = r.fillBefore(A.empty, !0);
    n.replace(l, l, new _(a, 0, 0));
  }
  for (let a = o.length - 1; a >= 0; a--)
    n.step(o[a]);
}
function Up(n, e, t) {
  return (e == 0 || n.canReplace(e, n.childCount)) && (t == n.childCount || n.canReplace(0, t));
}
function tr(n) {
  let t = n.parent.content.cutByIndex(n.startIndex, n.endIndex);
  for (let r = n.depth, s = 0, i = 0; ; --r) {
    let o = n.$from.node(r), l = n.$from.index(r) + s, a = n.$to.indexAfter(r) - i;
    if (r < n.depth && o.canReplace(l, a, t))
      return r;
    if (r == 0 || o.type.spec.isolating || !Up(o, l, a))
      break;
    l && (s = 1), a < o.childCount && (i = 1);
  }
  return null;
}
function Wp(n, e, t) {
  let { $from: r, $to: s, depth: i } = e, o = r.before(i + 1), l = s.after(i + 1), a = o, c = l, u = A.empty, d = 0;
  for (let p = i, m = !1; p > t; p--)
    m || r.index(p) > 0 ? (m = !0, u = A.from(r.node(p).copy(u)), d++) : a--;
  let f = A.empty, h = 0;
  for (let p = i, m = !1; p > t; p--)
    m || s.after(p + 1) < s.end(p) ? (m = !0, f = A.from(s.node(p).copy(f)), h++) : c++;
  n.step(new Le(a, c, o, l, new _(u.append(f), d, h), u.size - d, !0));
}
function ul(n, e, t = null, r = n) {
  let s = qp(n, e), i = s && Kp(r, e);
  return i ? s.map(Sa).concat({ type: e, attrs: t }).concat(i.map(Sa)) : null;
}
function Sa(n) {
  return { type: n, attrs: null };
}
function qp(n, e) {
  let { parent: t, startIndex: r, endIndex: s } = n, i = t.contentMatchAt(r).findWrapping(e);
  if (!i)
    return null;
  let o = i.length ? i[0] : e;
  return t.canReplaceWith(r, s, o) ? i : null;
}
function Kp(n, e) {
  let { parent: t, startIndex: r, endIndex: s } = n, i = t.child(r), o = e.contentMatch.findWrapping(i.type);
  if (!o)
    return null;
  let a = (o.length ? o[o.length - 1] : e).contentMatch;
  for (let c = r; a && c < s; c++)
    a = a.matchType(t.child(c).type);
  return !a || !a.validEnd ? null : o;
}
function Jp(n, e, t) {
  let r = A.empty;
  for (let o = t.length - 1; o >= 0; o--) {
    if (r.size) {
      let l = t[o].type.contentMatch.matchFragment(r);
      if (!l || !l.validEnd)
        throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
    }
    r = A.from(t[o].type.create(t[o].attrs, r));
  }
  let s = e.start, i = e.end;
  n.step(new Le(s, i, s, i, new _(r, 0, 0), t.length, !0));
}
function Gp(n, e, t, r, s) {
  if (!r.isTextblock)
    throw new RangeError("Type given to setBlockType should be a textblock");
  let i = n.steps.length;
  n.doc.nodesBetween(e, t, (o, l) => {
    let a = typeof s == "function" ? s(o) : s;
    if (o.isTextblock && !o.hasMarkup(r, a) && Yp(n.doc, n.mapping.slice(i).map(l), r)) {
      let c = null;
      if (r.schema.linebreakReplacement) {
        let h = r.whitespace == "pre", p = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
        h && !p ? c = !1 : !h && p && (c = !0);
      }
      c === !1 && Hu(n, o, l, i), cl(n, n.mapping.slice(i).map(l, 1), r, void 0, c === null);
      let u = n.mapping.slice(i), d = u.map(l, 1), f = u.map(l + o.nodeSize, 1);
      return n.step(new Le(d, f, d + 1, f - 1, new _(A.from(r.create(a, null, o.marks)), 0, 0), 1, !0)), c === !0 && $u(n, o, l, i), !1;
    }
  });
}
function $u(n, e, t, r) {
  e.forEach((s, i) => {
    if (s.isText) {
      let o, l = /\r?\n|\r/g;
      for (; o = l.exec(s.text); ) {
        let a = n.mapping.slice(r).map(t + 1 + i + o.index);
        n.replaceWith(a, a + 1, e.type.schema.linebreakReplacement.create());
      }
    }
  });
}
function Hu(n, e, t, r) {
  e.forEach((s, i) => {
    if (s.type == s.type.schema.linebreakReplacement) {
      let o = n.mapping.slice(r).map(t + 1 + i);
      n.replaceWith(o, o + 1, e.type.schema.text(`
`));
    }
  });
}
function Yp(n, e, t) {
  let r = n.resolve(e), s = r.index();
  return r.parent.canReplaceWith(s, s + 1, t);
}
function Xp(n, e, t, r, s) {
  let i = n.doc.nodeAt(e);
  if (!i)
    throw new RangeError("No node at given position");
  t || (t = i.type);
  let o = t.create(r, null, s || i.marks);
  if (i.isLeaf)
    return n.replaceWith(e, e + i.nodeSize, o);
  if (!t.validContent(i.content))
    throw new RangeError("Invalid content for node type " + t.name);
  n.step(new Le(e, e + i.nodeSize, e + 1, e + i.nodeSize - 1, new _(A.from(o), 0, 0), 1, !0));
}
function Dt(n, e, t = 1, r) {
  let s = n.resolve(e), i = s.depth - t, o = r && r[r.length - 1] || s.parent;
  if (i < 0 || s.parent.type.spec.isolating || !s.parent.canReplace(s.index(), s.parent.childCount) || !o.type.validContent(s.parent.content.cutByIndex(s.index(), s.parent.childCount)))
    return !1;
  for (let c = s.depth - 1, u = t - 2; c > i; c--, u--) {
    let d = s.node(c), f = s.index(c);
    if (d.type.spec.isolating)
      return !1;
    let h = d.content.cutByIndex(f, d.childCount), p = r && r[u + 1];
    p && (h = h.replaceChild(0, p.type.create(p.attrs)));
    let m = r && r[u] || d;
    if (!d.canReplace(f + 1, d.childCount) || !m.type.validContent(h))
      return !1;
  }
  let l = s.indexAfter(i), a = r && r[0];
  return s.node(i).canReplaceWith(l, l, a ? a.type : s.node(i + 1).type);
}
function Qp(n, e, t = 1, r) {
  let s = n.doc.resolve(e), i = A.empty, o = A.empty;
  for (let l = s.depth, a = s.depth - t, c = t - 1; l > a; l--, c--) {
    i = A.from(s.node(l).copy(i));
    let u = r && r[c];
    o = A.from(u ? u.type.create(u.attrs, o) : s.node(l).copy(o));
  }
  n.step(new De(e, e, new _(i.append(o), t, t), !0));
}
function nn(n, e) {
  let t = n.resolve(e), r = t.index();
  return Uu(t.nodeBefore, t.nodeAfter) && t.parent.canReplace(r, r + 1);
}
function Zp(n, e) {
  e.content.size || n.type.compatibleContent(e.type);
  let t = n.contentMatchAt(n.childCount), { linebreakReplacement: r } = n.type.schema;
  for (let s = 0; s < e.childCount; s++) {
    let i = e.child(s), o = i.type == r ? n.type.schema.nodes.text : i.type;
    if (t = t.matchType(o), !t || !n.type.allowsMarks(i.marks))
      return !1;
  }
  return t.validEnd;
}
function Uu(n, e) {
  return !!(n && e && !n.isLeaf && Zp(n, e));
}
function ri(n, e, t = -1) {
  let r = n.resolve(e);
  for (let s = r.depth; ; s--) {
    let i, o, l = r.index(s);
    if (s == r.depth ? (i = r.nodeBefore, o = r.nodeAfter) : t > 0 ? (i = r.node(s + 1), l++, o = r.node(s).maybeChild(l)) : (i = r.node(s).maybeChild(l - 1), o = r.node(s + 1)), i && !i.isTextblock && Uu(i, o) && r.node(s).canReplace(l, l + 1))
      return e;
    if (s == 0)
      break;
    e = t < 0 ? r.before(s) : r.after(s);
  }
}
function em(n, e, t) {
  let r = null, { linebreakReplacement: s } = n.doc.type.schema, i = n.doc.resolve(e - t), o = i.node().type;
  if (s && o.inlineContent) {
    let u = o.whitespace == "pre", d = !!o.contentMatch.matchType(s);
    u && !d ? r = !1 : !u && d && (r = !0);
  }
  let l = n.steps.length;
  if (r === !1) {
    let u = n.doc.resolve(e + t);
    Hu(n, u.node(), u.before(), l);
  }
  o.inlineContent && cl(n, e + t - 1, o, i.node().contentMatchAt(i.index()), r == null);
  let a = n.mapping.slice(l), c = a.map(e - t);
  if (n.step(new De(c, a.map(e + t, -1), _.empty, !0)), r === !0) {
    let u = n.doc.resolve(c);
    $u(n, u.node(), u.before(), n.steps.length);
  }
  return n;
}
function tm(n, e, t) {
  let r = n.resolve(e);
  if (r.parent.canReplaceWith(r.index(), r.index(), t))
    return e;
  if (r.parentOffset == 0)
    for (let s = r.depth - 1; s >= 0; s--) {
      let i = r.index(s);
      if (r.node(s).canReplaceWith(i, i, t))
        return r.before(s + 1);
      if (i > 0)
        return null;
    }
  if (r.parentOffset == r.parent.content.size)
    for (let s = r.depth - 1; s >= 0; s--) {
      let i = r.indexAfter(s);
      if (r.node(s).canReplaceWith(i, i, t))
        return r.after(s + 1);
      if (i < r.node(s).childCount)
        return null;
    }
  return null;
}
function Wu(n, e, t) {
  let r = n.resolve(e);
  if (!t.content.size)
    return e;
  let s = t.content;
  for (let i = 0; i < t.openStart; i++)
    s = s.firstChild.content;
  for (let i = 1; i <= (t.openStart == 0 && t.size ? 2 : 1); i++)
    for (let o = r.depth; o >= 0; o--) {
      let l = o == r.depth ? 0 : r.pos <= (r.start(o + 1) + r.end(o + 1)) / 2 ? -1 : 1, a = r.index(o) + (l > 0 ? 1 : 0), c = r.node(o), u = !1;
      if (i == 1)
        u = c.canReplace(a, a, s);
      else {
        let d = c.contentMatchAt(a).findWrapping(s.firstChild.type);
        u = d && c.canReplaceWith(a, a, d[0]);
      }
      if (u)
        return l == 0 ? r.pos : l < 0 ? r.before(o + 1) : r.after(o + 1);
    }
  return null;
}
function si(n, e, t = e, r = _.empty) {
  if (e == t && !r.size)
    return null;
  let s = n.resolve(e), i = n.resolve(t);
  return qu(s, i, r) ? new De(e, t, r) : new nm(s, i, r).fit();
}
function qu(n, e, t) {
  return !t.openStart && !t.openEnd && n.start() == e.start() && n.parent.canReplace(n.index(), e.index(), t.content);
}
class nm {
  constructor(e, t, r) {
    this.$from = e, this.$to = t, this.unplaced = r, this.frontier = [], this.placed = A.empty;
    for (let s = 0; s <= e.depth; s++) {
      let i = e.node(s);
      this.frontier.push({
        type: i.type,
        match: i.contentMatchAt(e.indexAfter(s))
      });
    }
    for (let s = e.depth; s > 0; s--)
      this.placed = A.from(e.node(s).copy(this.placed));
  }
  get depth() {
    return this.frontier.length - 1;
  }
  fit() {
    for (; this.unplaced.size; ) {
      let c = this.findFittable();
      c ? this.placeNodes(c) : this.openMore() || this.dropNode();
    }
    let e = this.mustMoveInline(), t = this.placed.size - this.depth - this.$from.depth, r = this.$from, s = this.close(e < 0 ? this.$to : r.doc.resolve(e));
    if (!s)
      return null;
    let i = this.placed, o = r.depth, l = s.depth;
    for (; o && l && i.childCount == 1; )
      i = i.firstChild.content, o--, l--;
    let a = new _(i, o, l);
    return e > -1 ? new Le(r.pos, e, this.$to.pos, this.$to.end(), a, t) : a.size || r.pos != this.$to.pos ? new De(r.pos, s.pos, a) : null;
  }
  // Find a position on the start spine of `this.unplaced` that has
  // content that can be moved somewhere on the frontier. Returns two
  // depths, one for the slice and one for the frontier.
  findFittable() {
    let e = this.unplaced.openStart;
    for (let t = this.unplaced.content, r = 0, s = this.unplaced.openEnd; r < e; r++) {
      let i = t.firstChild;
      if (t.childCount > 1 && (s = 0), i.type.spec.isolating && s <= r) {
        e = r;
        break;
      }
      t = i.content;
    }
    for (let t = 1; t <= 2; t++)
      for (let r = t == 1 ? e : this.unplaced.openStart; r >= 0; r--) {
        let s, i = null;
        r ? (i = Li(this.unplaced.content, r - 1).firstChild, s = i.content) : s = this.unplaced.content;
        let o = s.firstChild;
        for (let l = this.depth; l >= 0; l--) {
          let { type: a, match: c } = this.frontier[l], u, d = null;
          if (t == 1 && (o ? c.matchType(o.type) || (d = c.fillBefore(A.from(o), !1)) : i && a.compatibleContent(i.type)))
            return { sliceDepth: r, frontierDepth: l, parent: i, inject: d };
          if (t == 2 && o && (u = c.findWrapping(o.type)))
            return { sliceDepth: r, frontierDepth: l, parent: i, wrap: u };
          if (i && c.matchType(i.type))
            break;
        }
      }
  }
  openMore() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, s = Li(e, t);
    return !s.childCount || s.firstChild.isLeaf ? !1 : (this.unplaced = new _(e, t + 1, Math.max(r, s.size + t >= e.size - r ? t + 1 : 0)), !0);
  }
  dropNode() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, s = Li(e, t);
    if (s.childCount <= 1 && t > 0) {
      let i = e.size - t <= t + s.size;
      this.unplaced = new _(lr(e, t - 1, 1), t - 1, i ? t - 1 : r);
    } else
      this.unplaced = new _(lr(e, t, 1), t, r);
  }
  // Move content from the unplaced slice at `sliceDepth` to the
  // frontier node at `frontierDepth`. Close that frontier node when
  // applicable.
  placeNodes({ sliceDepth: e, frontierDepth: t, parent: r, inject: s, wrap: i }) {
    for (; this.depth > t; )
      this.closeFrontierNode();
    if (i)
      for (let m = 0; m < i.length; m++)
        this.openFrontierNode(i[m]);
    let o = this.unplaced, l = r ? r.content : o.content, a = o.openStart - e, c = 0, u = [], { match: d, type: f } = this.frontier[t];
    if (s) {
      for (let m = 0; m < s.childCount; m++)
        u.push(s.child(m));
      d = d.matchFragment(s);
    }
    let h = l.size + e - (o.content.size - o.openEnd);
    for (; c < l.childCount; ) {
      let m = l.child(c), g = d.matchType(m.type);
      if (!g)
        break;
      c++, (c > 1 || a == 0 || m.content.size) && (d = g, u.push(Ku(m.mark(f.allowedMarks(m.marks)), c == 1 ? a : 0, c == l.childCount ? h : -1)));
    }
    let p = c == l.childCount;
    p || (h = -1), this.placed = ar(this.placed, t, A.from(u)), this.frontier[t].match = d, p && h < 0 && r && r.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let m = 0, g = l; m < h; m++) {
      let y = g.lastChild;
      this.frontier.push({ type: y.type, match: y.contentMatchAt(y.childCount) }), g = y.content;
    }
    this.unplaced = p ? e == 0 ? _.empty : new _(lr(o.content, e - 1, 1), e - 1, h < 0 ? o.openEnd : e - 1) : new _(lr(o.content, e, c), o.openStart, o.openEnd);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock)
      return -1;
    let e = this.frontier[this.depth], t;
    if (!e.type.isTextblock || !Pi(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (t = this.findCloseLevel(this.$to)) && t.depth == this.depth)
      return -1;
    let { depth: r } = this.$to, s = this.$to.after(r);
    for (; r > 1 && s == this.$to.end(--r); )
      ++s;
    return s;
  }
  findCloseLevel(e) {
    e: for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
      let { match: r, type: s } = this.frontier[t], i = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)), o = Pi(e, t, s, r, i);
      if (o) {
        for (let l = t - 1; l >= 0; l--) {
          let { match: a, type: c } = this.frontier[l], u = Pi(e, l, c, a, !0);
          if (!u || u.childCount)
            continue e;
        }
        return { depth: t, fit: o, move: i ? e.doc.resolve(e.after(t + 1)) : e };
      }
    }
  }
  close(e) {
    let t = this.findCloseLevel(e);
    if (!t)
      return null;
    for (; this.depth > t.depth; )
      this.closeFrontierNode();
    t.fit.childCount && (this.placed = ar(this.placed, t.depth, t.fit)), e = t.move;
    for (let r = t.depth + 1; r <= e.depth; r++) {
      let s = e.node(r), i = s.type.contentMatch.fillBefore(s.content, !0, e.index(r));
      this.openFrontierNode(s.type, s.attrs, i);
    }
    return e;
  }
  openFrontierNode(e, t = null, r) {
    let s = this.frontier[this.depth];
    s.match = s.match.matchType(e), this.placed = ar(this.placed, this.depth, A.from(e.create(t, r))), this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    let t = this.frontier.pop().match.fillBefore(A.empty, !0);
    t.childCount && (this.placed = ar(this.placed, this.frontier.length, t));
  }
}
function lr(n, e, t) {
  return e == 0 ? n.cutByIndex(t, n.childCount) : n.replaceChild(0, n.firstChild.copy(lr(n.firstChild.content, e - 1, t)));
}
function ar(n, e, t) {
  return e == 0 ? n.append(t) : n.replaceChild(n.childCount - 1, n.lastChild.copy(ar(n.lastChild.content, e - 1, t)));
}
function Li(n, e) {
  for (let t = 0; t < e; t++)
    n = n.firstChild.content;
  return n;
}
function Ku(n, e, t) {
  if (e <= 0)
    return n;
  let r = n.content;
  return e > 1 && (r = r.replaceChild(0, Ku(r.firstChild, e - 1, r.childCount == 1 ? t - 1 : 0))), e > 0 && (r = n.type.contentMatch.fillBefore(r).append(r), t <= 0 && (r = r.append(n.type.contentMatch.matchFragment(r).fillBefore(A.empty, !0)))), n.copy(r);
}
function Pi(n, e, t, r, s) {
  let i = n.node(e), o = s ? n.indexAfter(e) : n.index(e);
  if (o == i.childCount && !t.compatibleContent(i.type))
    return null;
  let l = r.fillBefore(i.content, !0, o);
  return l && !rm(t, i.content, o) ? l : null;
}
function rm(n, e, t) {
  for (let r = t; r < e.childCount; r++)
    if (!n.allowsMarks(e.child(r).marks))
      return !0;
  return !1;
}
function sm(n) {
  return n.spec.defining || n.spec.definingForContent;
}
function im(n, e, t, r) {
  if (!r.size)
    return n.deleteRange(e, t);
  let s = n.doc.resolve(e), i = n.doc.resolve(t);
  if (qu(s, i, r))
    return n.step(new De(e, t, r));
  let o = Gu(s, i);
  o[o.length - 1] == 0 && o.pop();
  let l = -(s.depth + 1);
  o.unshift(l);
  for (let f = s.depth, h = s.pos - 1; f > 0; f--, h--) {
    let p = s.node(f).type.spec;
    if (p.defining || p.definingAsContext || p.isolating)
      break;
    o.indexOf(f) > -1 ? l = f : s.before(f) == h && o.splice(1, 0, -f);
  }
  let a = o.indexOf(l), c = [], u = r.openStart;
  for (let f = r.content, h = 0; ; h++) {
    let p = f.firstChild;
    if (c.push(p), h == r.openStart)
      break;
    f = p.content;
  }
  for (let f = u - 1; f >= 0; f--) {
    let h = c[f], p = sm(h.type);
    if (p && !h.sameMarkup(s.node(Math.abs(l) - 1)))
      u = f;
    else if (p || !h.type.isTextblock)
      break;
  }
  for (let f = r.openStart; f >= 0; f--) {
    let h = (f + u + 1) % (r.openStart + 1), p = c[h];
    if (p)
      for (let m = 0; m < o.length; m++) {
        let g = o[(m + a) % o.length], y = !0;
        g < 0 && (y = !1, g = -g);
        let k = s.node(g - 1), C = s.index(g - 1);
        if (k.canReplaceWith(C, C, p.type, p.marks))
          return n.replace(s.before(g), y ? i.after(g) : t, new _(Ju(r.content, 0, r.openStart, h), h, r.openEnd));
      }
  }
  let d = n.steps.length;
  for (let f = o.length - 1; f >= 0 && (n.replace(e, t, r), !(n.steps.length > d)); f--) {
    let h = o[f];
    h < 0 || (e = s.before(h), t = i.after(h));
  }
}
function Ju(n, e, t, r, s) {
  if (e < t) {
    let i = n.firstChild;
    n = n.replaceChild(0, i.copy(Ju(i.content, e + 1, t, r, i)));
  }
  if (e > r) {
    let i = s.contentMatchAt(0), o = i.fillBefore(n).append(n);
    n = o.append(i.matchFragment(o).fillBefore(A.empty, !0));
  }
  return n;
}
function om(n, e, t, r) {
  if (!r.isInline && e == t && n.doc.resolve(e).parent.content.size) {
    let s = tm(n.doc, e, r.type);
    s != null && (e = t = s);
  }
  n.replaceRange(e, t, new _(A.from(r), 0, 0));
}
function lm(n, e, t) {
  let r = n.doc.resolve(e), s = n.doc.resolve(t), i = Gu(r, s);
  for (let o = 0; o < i.length; o++) {
    let l = i[o], a = o == i.length - 1;
    if (a && l == 0 || r.node(l).type.contentMatch.validEnd)
      return n.delete(r.start(l), s.end(l));
    if (l > 0 && (a || r.node(l - 1).canReplace(r.index(l - 1), s.indexAfter(l - 1))))
      return n.delete(r.before(l), s.after(l));
  }
  for (let o = 1; o <= r.depth && o <= s.depth; o++)
    if (e - r.start(o) == r.depth - o && t > r.end(o) && s.end(o) - t != s.depth - o && r.start(o - 1) == s.start(o - 1) && r.node(o - 1).canReplace(r.index(o - 1), s.index(o - 1)))
      return n.delete(r.before(o), t);
  n.delete(e, t);
}
function Gu(n, e) {
  let t = [], r = Math.min(n.depth, e.depth);
  for (let s = r; s >= 0; s--) {
    let i = n.start(s);
    if (i < n.pos - (n.depth - s) || e.end(s) > e.pos + (e.depth - s) || n.node(s).type.spec.isolating || e.node(s).type.spec.isolating)
      break;
    (i == e.start(s) || s == n.depth && s == e.depth && n.parent.inlineContent && e.parent.inlineContent && s && e.start(s - 1) == i - 1) && t.push(s);
  }
  return t;
}
class Wn extends Ue {
  /**
  Construct an attribute step.
  */
  constructor(e, t, r) {
    super(), this.pos = e, this.attr = t, this.value = r;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return Me.fail("No node at attribute step's position");
    let r = /* @__PURE__ */ Object.create(null);
    for (let i in t.attrs)
      r[i] = t.attrs[i];
    r[this.attr] = this.value;
    let s = t.type.create(r, null, t.marks);
    return Me.fromReplace(e, this.pos, this.pos + 1, new _(A.from(s), 0, t.isLeaf ? 0 : 1));
  }
  getMap() {
    return nt.empty;
  }
  invert(e) {
    return new Wn(this.pos, this.attr, e.nodeAt(this.pos).attrs[this.attr]);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new Wn(t.pos, this.attr, this.value);
  }
  toJSON() {
    return { stepType: "attr", pos: this.pos, attr: this.attr, value: this.value };
  }
  static fromJSON(e, t) {
    if (typeof t.pos != "number" || typeof t.attr != "string")
      throw new RangeError("Invalid input for AttrStep.fromJSON");
    return new Wn(t.pos, t.attr, t.value);
  }
}
Ue.jsonID("attr", Wn);
class Mr extends Ue {
  /**
  Construct an attribute step.
  */
  constructor(e, t) {
    super(), this.attr = e, this.value = t;
  }
  apply(e) {
    let t = /* @__PURE__ */ Object.create(null);
    for (let s in e.attrs)
      t[s] = e.attrs[s];
    t[this.attr] = this.value;
    let r = e.type.create(t, e.content, e.marks);
    return Me.ok(r);
  }
  getMap() {
    return nt.empty;
  }
  invert(e) {
    return new Mr(this.attr, e.attrs[this.attr]);
  }
  map(e) {
    return this;
  }
  toJSON() {
    return { stepType: "docAttr", attr: this.attr, value: this.value };
  }
  static fromJSON(e, t) {
    if (typeof t.attr != "string")
      throw new RangeError("Invalid input for DocAttrStep.fromJSON");
    return new Mr(t.attr, t.value);
  }
}
Ue.jsonID("docAttr", Mr);
let Kn = class extends Error {
};
Kn = function n(e) {
  let t = Error.call(this, e);
  return t.__proto__ = n.prototype, t;
};
Kn.prototype = Object.create(Error.prototype);
Kn.prototype.constructor = Kn;
Kn.prototype.name = "TransformError";
class Yu {
  /**
  Create a transform that starts with the given document.
  */
  constructor(e) {
    this.doc = e, this.steps = [], this.docs = [], this.mapping = new Er();
  }
  /**
  The starting document.
  */
  get before() {
    return this.docs.length ? this.docs[0] : this.doc;
  }
  /**
  Apply a new step in this transform, saving the result. Throws an
  error when the step fails.
  */
  step(e) {
    let t = this.maybeStep(e);
    if (t.failed)
      throw new Kn(t.failed);
    return this;
  }
  /**
  Try to apply a step in this transformation, ignoring it if it
  fails. Returns the step result.
  */
  maybeStep(e) {
    let t = e.apply(this.doc);
    return t.failed || this.addStep(e, t.doc), t;
  }
  /**
  True when the document has been changed (when there are any
  steps).
  */
  get docChanged() {
    return this.steps.length > 0;
  }
  /**
  @internal
  */
  addStep(e, t) {
    this.docs.push(this.doc), this.steps.push(e), this.mapping.appendMap(e.getMap()), this.doc = t;
  }
  /**
  Replace the part of the document between `from` and `to` with the
  given `slice`.
  */
  replace(e, t = e, r = _.empty) {
    let s = si(this.doc, e, t, r);
    return s && this.step(s), this;
  }
  /**
  Replace the given range with the given content, which may be a
  fragment, node, or array of nodes.
  */
  replaceWith(e, t, r) {
    return this.replace(e, t, new _(A.from(r), 0, 0));
  }
  /**
  Delete the content between the given positions.
  */
  delete(e, t) {
    return this.replace(e, t, _.empty);
  }
  /**
  Insert the given content at the given position.
  */
  insert(e, t) {
    return this.replaceWith(e, e, t);
  }
  /**
  Replace a range of the document with a given slice, using
  `from`, `to`, and the slice's
  [`openStart`](https://prosemirror.net/docs/ref/#model.Slice.openStart) property as hints, rather
  than fixed start and end points. This method may grow the
  replaced area or close open nodes in the slice in order to get a
  fit that is more in line with WYSIWYG expectations, by dropping
  fully covered parent nodes of the replaced region when they are
  marked [non-defining as
  context](https://prosemirror.net/docs/ref/#model.NodeSpec.definingAsContext), or including an
  open parent node from the slice that _is_ marked as [defining
  its content](https://prosemirror.net/docs/ref/#model.NodeSpec.definingForContent).
  
  This is the method, for example, to handle paste. The similar
  [`replace`](https://prosemirror.net/docs/ref/#transform.Transform.replace) method is a more
  primitive tool which will _not_ move the start and end of its given
  range, and is useful in situations where you need more precise
  control over what happens.
  */
  replaceRange(e, t, r) {
    return im(this, e, t, r), this;
  }
  /**
  Replace the given range with a node, but use `from` and `to` as
  hints, rather than precise positions. When from and to are the same
  and are at the start or end of a parent node in which the given
  node doesn't fit, this method may _move_ them out towards a parent
  that does allow the given node to be placed. When the given range
  completely covers a parent node, this method may completely replace
  that parent node.
  */
  replaceRangeWith(e, t, r) {
    return om(this, e, t, r), this;
  }
  /**
  Delete the given range, expanding it to cover fully covered
  parent nodes until a valid replace is found.
  */
  deleteRange(e, t) {
    return lm(this, e, t), this;
  }
  /**
  Split the content in the given range off from its parent, if there
  is sibling content before or after it, and move it up the tree to
  the depth specified by `target`. You'll probably want to use
  [`liftTarget`](https://prosemirror.net/docs/ref/#transform.liftTarget) to compute `target`, to make
  sure the lift is valid.
  */
  lift(e, t) {
    return Wp(this, e, t), this;
  }
  /**
  Join the blocks around the given position. If depth is 2, their
  last and first siblings are also joined, and so on.
  */
  join(e, t = 1) {
    return em(this, e, t), this;
  }
  /**
  Wrap the given [range](https://prosemirror.net/docs/ref/#model.NodeRange) in the given set of wrappers.
  The wrappers are assumed to be valid in this position, and should
  probably be computed with [`findWrapping`](https://prosemirror.net/docs/ref/#transform.findWrapping).
  */
  wrap(e, t) {
    return Jp(this, e, t), this;
  }
  /**
  Set the type of all textblocks (partly) between `from` and `to` to
  the given node type with the given attributes.
  */
  setBlockType(e, t = e, r, s = null) {
    return Gp(this, e, t, r, s), this;
  }
  /**
  Change the type, attributes, and/or marks of the node at `pos`.
  When `type` isn't given, the existing node type is preserved,
  */
  setNodeMarkup(e, t, r = null, s) {
    return Xp(this, e, t, r, s), this;
  }
  /**
  Set a single attribute on a given node to a new value.
  The `pos` addresses the document content. Use `setDocAttribute`
  to set attributes on the document itself.
  */
  setNodeAttribute(e, t, r) {
    return this.step(new Wn(e, t, r)), this;
  }
  /**
  Set a single attribute on the document to a new value.
  */
  setDocAttribute(e, t) {
    return this.step(new Mr(e, t)), this;
  }
  /**
  Add a mark to the node at position `pos`.
  */
  addNodeMark(e, t) {
    return this.step(new qt(e, t)), this;
  }
  /**
  Remove a mark (or all marks of the given type) from the node at
  position `pos`.
  */
  removeNodeMark(e, t) {
    let r = this.doc.nodeAt(e);
    if (!r)
      throw new RangeError("No node at position " + e);
    if (t instanceof ae)
      t.isInSet(r.marks) && this.step(new vn(e, t));
    else {
      let s = r.marks, i, o = [];
      for (; i = t.isInSet(s); )
        o.push(new vn(e, i)), s = i.removeFromSet(s);
      for (let l = o.length - 1; l >= 0; l--)
        this.step(o[l]);
    }
    return this;
  }
  /**
  Split the node at the given position, and optionally, if `depth` is
  greater than one, any number of nodes above that. By default, the
  parts split off will inherit the node type of the original node.
  This can be changed by passing an array of types and attributes to
  use after the split (with the outermost nodes coming first).
  */
  split(e, t = 1, r) {
    return Qp(this, e, t, r), this;
  }
  /**
  Add the given mark to the inline content between `from` and `to`.
  */
  addMark(e, t, r) {
    return $p(this, e, t, r), this;
  }
  /**
  Remove marks from inline nodes between `from` and `to`. When
  `mark` is a single mark, remove precisely that mark. When it is
  a mark type, remove all marks of that type. When it is null,
  remove all marks of any type.
  */
  removeMark(e, t, r) {
    return Hp(this, e, t, r), this;
  }
  /**
  Removes all marks and nodes from the content of the node at
  `pos` that don't match the given new parent node type. Accepts
  an optional starting [content match](https://prosemirror.net/docs/ref/#model.ContentMatch) as
  third argument.
  */
  clearIncompatible(e, t, r) {
    return cl(this, e, t, r), this;
  }
}
const _i = /* @__PURE__ */ Object.create(null);
let Y = class {
  /**
  Initialize a selection with the head and anchor and ranges. If no
  ranges are given, constructs a single range across `$anchor` and
  `$head`.
  */
  constructor(e, t, r) {
    this.$anchor = e, this.$head = t, this.ranges = r || [new am(e.min(t), e.max(t))];
  }
  /**
  The selection's anchor, as an unresolved position.
  */
  get anchor() {
    return this.$anchor.pos;
  }
  /**
  The selection's head.
  */
  get head() {
    return this.$head.pos;
  }
  /**
  The lower bound of the selection's main range.
  */
  get from() {
    return this.$from.pos;
  }
  /**
  The upper bound of the selection's main range.
  */
  get to() {
    return this.$to.pos;
  }
  /**
  The resolved lower  bound of the selection's main range.
  */
  get $from() {
    return this.ranges[0].$from;
  }
  /**
  The resolved upper bound of the selection's main range.
  */
  get $to() {
    return this.ranges[0].$to;
  }
  /**
  Indicates whether the selection contains any content.
  */
  get empty() {
    let e = this.ranges;
    for (let t = 0; t < e.length; t++)
      if (e[t].$from.pos != e[t].$to.pos)
        return !1;
    return !0;
  }
  /**
  Get the content of this selection as a slice.
  */
  content() {
    return this.$from.doc.slice(this.from, this.to, !0);
  }
  /**
  Replace the selection with a slice or, if no slice is given,
  delete the selection. Will append to the given transaction.
  */
  replace(e, t = _.empty) {
    let r = t.content.lastChild, s = null;
    for (let l = 0; l < t.openEnd; l++)
      s = r, r = r.lastChild;
    let i = e.steps.length, o = this.ranges;
    for (let l = 0; l < o.length; l++) {
      let { $from: a, $to: c } = o[l], u = e.mapping.slice(i);
      e.replaceRange(u.map(a.pos), u.map(c.pos), l ? _.empty : t), l == 0 && Ea(e, i, (r ? r.isInline : s && s.isTextblock) ? -1 : 1);
    }
  }
  /**
  Replace the selection with the given node, appending the changes
  to the given transaction.
  */
  replaceWith(e, t) {
    let r = e.steps.length, s = this.ranges;
    for (let i = 0; i < s.length; i++) {
      let { $from: o, $to: l } = s[i], a = e.mapping.slice(r), c = a.map(o.pos), u = a.map(l.pos);
      i ? e.deleteRange(c, u) : (e.replaceRangeWith(c, u, t), Ea(e, r, t.isInline ? -1 : 1));
    }
  }
  /**
  Find a valid cursor or leaf node selection starting at the given
  position and searching back if `dir` is negative, and forward if
  positive. When `textOnly` is true, only consider cursor
  selections. Will return null when no valid selection position is
  found.
  */
  static findFrom(e, t, r = !1) {
    let s = e.parent.inlineContent ? new q(e) : Fn(e.node(0), e.parent, e.pos, e.index(), t, r);
    if (s)
      return s;
    for (let i = e.depth - 1; i >= 0; i--) {
      let o = t < 0 ? Fn(e.node(0), e.node(i), e.before(i + 1), e.index(i), t, r) : Fn(e.node(0), e.node(i), e.after(i + 1), e.index(i) + 1, t, r);
      if (o)
        return o;
    }
    return null;
  }
  /**
  Find a valid cursor or leaf node selection near the given
  position. Searches forward first by default, but if `bias` is
  negative, it will search backwards first.
  */
  static near(e, t = 1) {
    return this.findFrom(e, t) || this.findFrom(e, -t) || new rt(e.node(0));
  }
  /**
  Find the cursor or leaf node selection closest to the start of
  the given document. Will return an
  [`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
  exists.
  */
  static atStart(e) {
    return Fn(e, e, 0, 0, 1) || new rt(e);
  }
  /**
  Find the cursor or leaf node selection closest to the end of the
  given document.
  */
  static atEnd(e) {
    return Fn(e, e, e.content.size, e.childCount, -1) || new rt(e);
  }
  /**
  Deserialize the JSON representation of a selection. Must be
  implemented for custom classes (as a static class method).
  */
  static fromJSON(e, t) {
    if (!t || !t.type)
      throw new RangeError("Invalid input for Selection.fromJSON");
    let r = _i[t.type];
    if (!r)
      throw new RangeError(`No selection type ${t.type} defined`);
    return r.fromJSON(e, t);
  }
  /**
  To be able to deserialize selections from JSON, custom selection
  classes must register themselves with an ID string, so that they
  can be disambiguated. Try to pick something that's unlikely to
  clash with classes from other modules.
  */
  static jsonID(e, t) {
    if (e in _i)
      throw new RangeError("Duplicate use of selection JSON ID " + e);
    return _i[e] = t, t.prototype.jsonID = e, t;
  }
  /**
  Get a [bookmark](https://prosemirror.net/docs/ref/#state.SelectionBookmark) for this selection,
  which is a value that can be mapped without having access to a
  current document, and later resolved to a real selection for a
  given document again. (This is used mostly by the history to
  track and restore old selections.) The default implementation of
  this method just converts the selection to a text selection and
  returns the bookmark for that.
  */
  getBookmark() {
    return q.between(this.$anchor, this.$head).getBookmark();
  }
};
Y.prototype.visible = !0;
class am {
  /**
  Create a range.
  */
  constructor(e, t) {
    this.$from = e, this.$to = t;
  }
}
let wa = !1;
function Ca(n) {
  !wa && !n.parent.inlineContent && (wa = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + n.parent.type.name + ")"));
}
class q extends Y {
  /**
  Construct a text selection between the given points.
  */
  constructor(e, t = e) {
    Ca(e), Ca(t), super(e, t);
  }
  /**
  Returns a resolved position if this is a cursor selection (an
  empty text selection), and null otherwise.
  */
  get $cursor() {
    return this.$anchor.pos == this.$head.pos ? this.$head : null;
  }
  map(e, t) {
    let r = e.resolve(t.map(this.head));
    if (!r.parent.inlineContent)
      return Y.near(r);
    let s = e.resolve(t.map(this.anchor));
    return new q(s.parent.inlineContent ? s : r, r);
  }
  replace(e, t = _.empty) {
    if (super.replace(e, t), t == _.empty) {
      let r = this.$from.marksAcross(this.$to);
      r && e.ensureMarks(r);
    }
  }
  eq(e) {
    return e instanceof q && e.anchor == this.anchor && e.head == this.head;
  }
  getBookmark() {
    return new ii(this.anchor, this.head);
  }
  toJSON() {
    return { type: "text", anchor: this.anchor, head: this.head };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.anchor != "number" || typeof t.head != "number")
      throw new RangeError("Invalid input for TextSelection.fromJSON");
    return new q(e.resolve(t.anchor), e.resolve(t.head));
  }
  /**
  Create a text selection from non-resolved positions.
  */
  static create(e, t, r = t) {
    let s = e.resolve(t);
    return new this(s, r == t ? s : e.resolve(r));
  }
  /**
  Return a text selection that spans the given positions or, if
  they aren't text positions, find a text selection near them.
  `bias` determines whether the method searches forward (default)
  or backwards (negative number) first. Will fall back to calling
  [`Selection.near`](https://prosemirror.net/docs/ref/#state.Selection^near) when the document
  doesn't contain a valid text position.
  */
  static between(e, t, r) {
    let s = e.pos - t.pos;
    if ((!r || s) && (r = s >= 0 ? 1 : -1), !t.parent.inlineContent) {
      let i = Y.findFrom(t, r, !0) || Y.findFrom(t, -r, !0);
      if (i)
        t = i.$head;
      else
        return Y.near(t, r);
    }
    return e.parent.inlineContent || (s == 0 ? e = t : (e = (Y.findFrom(e, -r, !0) || Y.findFrom(e, r, !0)).$anchor, e.pos < t.pos != s < 0 && (e = t))), new q(e, t);
  }
}
Y.jsonID("text", q);
class ii {
  constructor(e, t) {
    this.anchor = e, this.head = t;
  }
  map(e) {
    return new ii(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return q.between(e.resolve(this.anchor), e.resolve(this.head));
  }
}
class j extends Y {
  /**
  Create a node selection. Does not verify the validity of its
  argument.
  */
  constructor(e) {
    let t = e.nodeAfter, r = e.node(0).resolve(e.pos + t.nodeSize);
    super(e, r), this.node = t;
  }
  map(e, t) {
    let { deleted: r, pos: s } = t.mapResult(this.anchor), i = e.resolve(s);
    return r ? Y.near(i) : new j(i);
  }
  content() {
    return new _(A.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof j && e.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new dl(this.anchor);
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.anchor != "number")
      throw new RangeError("Invalid input for NodeSelection.fromJSON");
    return new j(e.resolve(t.anchor));
  }
  /**
  Create a node selection from non-resolved positions.
  */
  static create(e, t) {
    return new j(e.resolve(t));
  }
  /**
  Determines whether the given node may be selected as a node
  selection.
  */
  static isSelectable(e) {
    return !e.isText && e.type.spec.selectable !== !1;
  }
}
j.prototype.visible = !1;
Y.jsonID("node", j);
class dl {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    let { deleted: t, pos: r } = e.mapResult(this.anchor);
    return t ? new ii(r, r) : new dl(r);
  }
  resolve(e) {
    let t = e.resolve(this.anchor), r = t.nodeAfter;
    return r && j.isSelectable(r) ? new j(t) : Y.near(t);
  }
}
class rt extends Y {
  /**
  Create an all-selection over the given document.
  */
  constructor(e) {
    super(e.resolve(0), e.resolve(e.content.size));
  }
  replace(e, t = _.empty) {
    if (t == _.empty) {
      e.delete(0, e.doc.content.size);
      let r = Y.atStart(e.doc);
      r.eq(e.selection) || e.setSelection(r);
    } else
      super.replace(e, t);
  }
  toJSON() {
    return { type: "all" };
  }
  /**
  @internal
  */
  static fromJSON(e) {
    return new rt(e);
  }
  map(e) {
    return new rt(e);
  }
  eq(e) {
    return e instanceof rt;
  }
  getBookmark() {
    return cm;
  }
}
Y.jsonID("all", rt);
const cm = {
  map() {
    return this;
  },
  resolve(n) {
    return new rt(n);
  }
};
function Fn(n, e, t, r, s, i = !1) {
  if (e.inlineContent)
    return q.create(n, t);
  for (let o = r - (s > 0 ? 0 : 1); s > 0 ? o < e.childCount : o >= 0; o += s) {
    let l = e.child(o);
    if (l.isAtom) {
      if (!i && j.isSelectable(l))
        return j.create(n, t - (s < 0 ? l.nodeSize : 0));
    } else {
      let a = Fn(n, l, t + s, s < 0 ? l.childCount : 0, s, i);
      if (a)
        return a;
    }
    t += l.nodeSize * s;
  }
  return null;
}
function Ea(n, e, t) {
  let r = n.steps.length - 1;
  if (r < e)
    return;
  let s = n.steps[r];
  if (!(s instanceof De || s instanceof Le))
    return;
  let i = n.mapping.maps[r], o;
  i.forEach((l, a, c, u) => {
    o == null && (o = u);
  }), n.setSelection(Y.near(n.doc.resolve(o), t));
}
const Ma = 1, Hr = 2, Ta = 4;
class um extends Yu {
  /**
  @internal
  */
  constructor(e) {
    super(e.doc), this.curSelectionFor = 0, this.updated = 0, this.meta = /* @__PURE__ */ Object.create(null), this.time = Date.now(), this.curSelection = e.selection, this.storedMarks = e.storedMarks;
  }
  /**
  The transaction's current selection. This defaults to the editor
  selection [mapped](https://prosemirror.net/docs/ref/#state.Selection.map) through the steps in the
  transaction, but can be overwritten with
  [`setSelection`](https://prosemirror.net/docs/ref/#state.Transaction.setSelection).
  */
  get selection() {
    return this.curSelectionFor < this.steps.length && (this.curSelection = this.curSelection.map(this.doc, this.mapping.slice(this.curSelectionFor)), this.curSelectionFor = this.steps.length), this.curSelection;
  }
  /**
  Update the transaction's current selection. Will determine the
  selection that the editor gets when the transaction is applied.
  */
  setSelection(e) {
    if (e.$from.doc != this.doc)
      throw new RangeError("Selection passed to setSelection must point at the current document");
    return this.curSelection = e, this.curSelectionFor = this.steps.length, this.updated = (this.updated | Ma) & ~Hr, this.storedMarks = null, this;
  }
  /**
  Whether the selection was explicitly updated by this transaction.
  */
  get selectionSet() {
    return (this.updated & Ma) > 0;
  }
  /**
  Set the current stored marks.
  */
  setStoredMarks(e) {
    return this.storedMarks = e, this.updated |= Hr, this;
  }
  /**
  Make sure the current stored marks or, if that is null, the marks
  at the selection, match the given set of marks. Does nothing if
  this is already the case.
  */
  ensureMarks(e) {
    return ae.sameSet(this.storedMarks || this.selection.$from.marks(), e) || this.setStoredMarks(e), this;
  }
  /**
  Add a mark to the set of stored marks.
  */
  addStoredMark(e) {
    return this.ensureMarks(e.addToSet(this.storedMarks || this.selection.$head.marks()));
  }
  /**
  Remove a mark or mark type from the set of stored marks.
  */
  removeStoredMark(e) {
    return this.ensureMarks(e.removeFromSet(this.storedMarks || this.selection.$head.marks()));
  }
  /**
  Whether the stored marks were explicitly set for this transaction.
  */
  get storedMarksSet() {
    return (this.updated & Hr) > 0;
  }
  /**
  @internal
  */
  addStep(e, t) {
    super.addStep(e, t), this.updated = this.updated & ~Hr, this.storedMarks = null;
  }
  /**
  Update the timestamp for the transaction.
  */
  setTime(e) {
    return this.time = e, this;
  }
  /**
  Replace the current selection with the given slice.
  */
  replaceSelection(e) {
    return this.selection.replace(this, e), this;
  }
  /**
  Replace the selection with the given node. When `inheritMarks` is
  true and the content is inline, it inherits the marks from the
  place where it is inserted.
  */
  replaceSelectionWith(e, t = !0) {
    let r = this.selection;
    return t && (e = e.mark(this.storedMarks || (r.empty ? r.$from.marks() : r.$from.marksAcross(r.$to) || ae.none))), r.replaceWith(this, e), this;
  }
  /**
  Delete the selection.
  */
  deleteSelection() {
    return this.selection.replace(this), this;
  }
  /**
  Replace the given range, or the selection if no range is given,
  with a text node containing the given string.
  */
  insertText(e, t, r) {
    let s = this.doc.type.schema;
    if (t == null)
      return e ? this.replaceSelectionWith(s.text(e), !0) : this.deleteSelection();
    {
      if (r == null && (r = t), !e)
        return this.deleteRange(t, r);
      let i = this.storedMarks;
      if (!i) {
        let o = this.doc.resolve(t);
        i = r == t ? o.marks() : o.marksAcross(this.doc.resolve(r));
      }
      return this.replaceRangeWith(t, r, s.text(e, i)), !this.selection.empty && this.selection.to == t + e.length && this.setSelection(Y.near(this.selection.$to)), this;
    }
  }
  /**
  Store a metadata property in this transaction, keyed either by
  name or by plugin.
  */
  setMeta(e, t) {
    return this.meta[typeof e == "string" ? e : e.key] = t, this;
  }
  /**
  Retrieve a metadata property for a given name or plugin.
  */
  getMeta(e) {
    return this.meta[typeof e == "string" ? e : e.key];
  }
  /**
  Returns true if this transaction doesn't contain any metadata,
  and can thus safely be extended.
  */
  get isGeneric() {
    for (let e in this.meta)
      return !1;
    return !0;
  }
  /**
  Indicate that the editor should scroll the selection into view
  when updated to the state produced by this transaction.
  */
  scrollIntoView() {
    return this.updated |= Ta, this;
  }
  /**
  True when this transaction has had `scrollIntoView` called on it.
  */
  get scrolledIntoView() {
    return (this.updated & Ta) > 0;
  }
}
function Aa(n, e) {
  return !e || !n ? n : n.bind(e);
}
class cr {
  constructor(e, t, r) {
    this.name = e, this.init = Aa(t.init, r), this.apply = Aa(t.apply, r);
  }
}
const dm = [
  new cr("doc", {
    init(n) {
      return n.doc || n.schema.topNodeType.createAndFill();
    },
    apply(n) {
      return n.doc;
    }
  }),
  new cr("selection", {
    init(n, e) {
      return n.selection || Y.atStart(e.doc);
    },
    apply(n) {
      return n.selection;
    }
  }),
  new cr("storedMarks", {
    init(n) {
      return n.storedMarks || null;
    },
    apply(n, e, t, r) {
      return r.selection.$cursor ? n.storedMarks : null;
    }
  }),
  new cr("scrollToSelection", {
    init() {
      return 0;
    },
    apply(n, e) {
      return n.scrolledIntoView ? e + 1 : e;
    }
  })
];
class Bi {
  constructor(e, t) {
    this.schema = e, this.plugins = [], this.pluginsByKey = /* @__PURE__ */ Object.create(null), this.fields = dm.slice(), t && t.forEach((r) => {
      if (this.pluginsByKey[r.key])
        throw new RangeError("Adding different instances of a keyed plugin (" + r.key + ")");
      this.plugins.push(r), this.pluginsByKey[r.key] = r, r.spec.state && this.fields.push(new cr(r.key, r.spec.state, r));
    });
  }
}
class Hn {
  /**
  @internal
  */
  constructor(e) {
    this.config = e;
  }
  /**
  The schema of the state's document.
  */
  get schema() {
    return this.config.schema;
  }
  /**
  The plugins that are active in this state.
  */
  get plugins() {
    return this.config.plugins;
  }
  /**
  Apply the given transaction to produce a new state.
  */
  apply(e) {
    return this.applyTransaction(e).state;
  }
  /**
  @internal
  */
  filterTransaction(e, t = -1) {
    for (let r = 0; r < this.config.plugins.length; r++)
      if (r != t) {
        let s = this.config.plugins[r];
        if (s.spec.filterTransaction && !s.spec.filterTransaction.call(s, e, this))
          return !1;
      }
    return !0;
  }
  /**
  Verbose variant of [`apply`](https://prosemirror.net/docs/ref/#state.EditorState.apply) that
  returns the precise transactions that were applied (which might
  be influenced by the [transaction
  hooks](https://prosemirror.net/docs/ref/#state.PluginSpec.filterTransaction) of
  plugins) along with the new state.
  */
  applyTransaction(e) {
    if (!this.filterTransaction(e))
      return { state: this, transactions: [] };
    let t = [e], r = this.applyInner(e), s = null;
    for (; ; ) {
      let i = !1;
      for (let o = 0; o < this.config.plugins.length; o++) {
        let l = this.config.plugins[o];
        if (l.spec.appendTransaction) {
          let a = s ? s[o].n : 0, c = s ? s[o].state : this, u = a < t.length && l.spec.appendTransaction.call(l, a ? t.slice(a) : t, c, r);
          if (u && r.filterTransaction(u, o)) {
            if (u.setMeta("appendedTransaction", e), !s) {
              s = [];
              for (let d = 0; d < this.config.plugins.length; d++)
                s.push(d < o ? { state: r, n: t.length } : { state: this, n: 0 });
            }
            t.push(u), r = r.applyInner(u), i = !0;
          }
          s && (s[o] = { state: r, n: t.length });
        }
      }
      if (!i)
        return { state: r, transactions: t };
    }
  }
  /**
  @internal
  */
  applyInner(e) {
    if (!e.before.eq(this.doc))
      throw new RangeError("Applying a mismatched transaction");
    let t = new Hn(this.config), r = this.config.fields;
    for (let s = 0; s < r.length; s++) {
      let i = r[s];
      t[i.name] = i.apply(e, this[i.name], this, t);
    }
    return t;
  }
  /**
  Accessor that constructs and returns a new [transaction](https://prosemirror.net/docs/ref/#state.Transaction) from this state.
  */
  get tr() {
    return new um(this);
  }
  /**
  Create a new state.
  */
  static create(e) {
    let t = new Bi(e.doc ? e.doc.type.schema : e.schema, e.plugins), r = new Hn(t);
    for (let s = 0; s < t.fields.length; s++)
      r[t.fields[s].name] = t.fields[s].init(e, r);
    return r;
  }
  /**
  Create a new state based on this one, but with an adjusted set
  of active plugins. State fields that exist in both sets of
  plugins are kept unchanged. Those that no longer exist are
  dropped, and those that are new are initialized using their
  [`init`](https://prosemirror.net/docs/ref/#state.StateField.init) method, passing in the new
  configuration object..
  */
  reconfigure(e) {
    let t = new Bi(this.schema, e.plugins), r = t.fields, s = new Hn(t);
    for (let i = 0; i < r.length; i++) {
      let o = r[i].name;
      s[o] = this.hasOwnProperty(o) ? this[o] : r[i].init(e, s);
    }
    return s;
  }
  /**
  Serialize this state to JSON. If you want to serialize the state
  of plugins, pass an object mapping property names to use in the
  resulting JSON object to plugin objects. The argument may also be
  a string or number, in which case it is ignored, to support the
  way `JSON.stringify` calls `toString` methods.
  */
  toJSON(e) {
    let t = { doc: this.doc.toJSON(), selection: this.selection.toJSON() };
    if (this.storedMarks && (t.storedMarks = this.storedMarks.map((r) => r.toJSON())), e && typeof e == "object")
      for (let r in e) {
        if (r == "doc" || r == "selection")
          throw new RangeError("The JSON fields `doc` and `selection` are reserved");
        let s = e[r], i = s.spec.state;
        i && i.toJSON && (t[r] = i.toJSON.call(s, this[s.key]));
      }
    return t;
  }
  /**
  Deserialize a JSON representation of a state. `config` should
  have at least a `schema` field, and should contain array of
  plugins to initialize the state with. `pluginFields` can be used
  to deserialize the state of plugins, by associating plugin
  instances with the property names they use in the JSON object.
  */
  static fromJSON(e, t, r) {
    if (!t)
      throw new RangeError("Invalid input for EditorState.fromJSON");
    if (!e.schema)
      throw new RangeError("Required config field 'schema' missing");
    let s = new Bi(e.schema, e.plugins), i = new Hn(s);
    return s.fields.forEach((o) => {
      if (o.name == "doc")
        i.doc = bt.fromJSON(e.schema, t.doc);
      else if (o.name == "selection")
        i.selection = Y.fromJSON(i.doc, t.selection);
      else if (o.name == "storedMarks")
        t.storedMarks && (i.storedMarks = t.storedMarks.map(e.schema.markFromJSON));
      else {
        if (r)
          for (let l in r) {
            let a = r[l], c = a.spec.state;
            if (a.key == o.name && c && c.fromJSON && Object.prototype.hasOwnProperty.call(t, l)) {
              i[o.name] = c.fromJSON.call(a, e, t[l], i);
              return;
            }
          }
        i[o.name] = o.init(e, i);
      }
    }), i;
  }
}
function Xu(n, e, t) {
  for (let r in n) {
    let s = n[r];
    s instanceof Function ? s = s.bind(e) : r == "handleDOMEvents" && (s = Xu(s, e, {})), t[r] = s;
  }
  return t;
}
class ge {
  /**
  Create a plugin.
  */
  constructor(e) {
    this.spec = e, this.props = {}, e.props && Xu(e.props, this, this.props), this.key = e.key ? e.key.key : Qu("plugin");
  }
  /**
  Extract the plugin's state field from an editor state.
  */
  getState(e) {
    return e[this.key];
  }
}
const Fi = /* @__PURE__ */ Object.create(null);
function Qu(n) {
  return n in Fi ? n + "$" + ++Fi[n] : (Fi[n] = 0, n + "$");
}
class Re {
  /**
  Create a plugin key.
  */
  constructor(e = "key") {
    this.key = Qu(e);
  }
  /**
  Get the active plugin with this key, if any, from an editor
  state.
  */
  get(e) {
    return e.config.pluginsByKey[this.key];
  }
  /**
  Get the plugin's state from an editor state.
  */
  getState(e) {
    return e[this.key];
  }
}
const fl = (n, e) => n.selection.empty ? !1 : (e && e(n.tr.deleteSelection().scrollIntoView()), !0);
function Zu(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("backward", n) : t.parentOffset > 0) ? null : t;
}
const ed = (n, e, t) => {
  let r = Zu(n, t);
  if (!r)
    return !1;
  let s = hl(r);
  if (!s) {
    let o = r.blockRange(), l = o && tr(o);
    return l == null ? !1 : (e && e(n.tr.lift(o, l).scrollIntoView()), !0);
  }
  let i = s.nodeBefore;
  if (cd(n, s, e, -1))
    return !0;
  if (r.parent.content.size == 0 && (Jn(i, "end") || j.isSelectable(i)))
    for (let o = r.depth; ; o--) {
      let l = si(n.doc, r.before(o), r.after(o), _.empty);
      if (l && l.slice.size < l.to - l.from) {
        if (e) {
          let a = n.tr.step(l);
          a.setSelection(Jn(i, "end") ? Y.findFrom(a.doc.resolve(a.mapping.map(s.pos, -1)), -1) : j.create(a.doc, s.pos - i.nodeSize)), e(a.scrollIntoView());
        }
        return !0;
      }
      if (o == 1 || r.node(o - 1).childCount > 1)
        break;
    }
  return i.isAtom && s.depth == r.depth - 1 ? (e && e(n.tr.delete(s.pos - i.nodeSize, s.pos).scrollIntoView()), !0) : !1;
}, fm = (n, e, t) => {
  let r = Zu(n, t);
  if (!r)
    return !1;
  let s = hl(r);
  return s ? td(n, s, e) : !1;
}, hm = (n, e, t) => {
  let r = rd(n, t);
  if (!r)
    return !1;
  let s = pl(r);
  return s ? td(n, s, e) : !1;
};
function td(n, e, t) {
  let r = e.nodeBefore, s = r, i = e.pos - 1;
  for (; !s.isTextblock; i--) {
    if (s.type.spec.isolating)
      return !1;
    let u = s.lastChild;
    if (!u)
      return !1;
    s = u;
  }
  let o = e.nodeAfter, l = o, a = e.pos + 1;
  for (; !l.isTextblock; a++) {
    if (l.type.spec.isolating)
      return !1;
    let u = l.firstChild;
    if (!u)
      return !1;
    l = u;
  }
  let c = si(n.doc, i, a, _.empty);
  if (!c || c.from != i || c instanceof De && c.slice.size >= a - i)
    return !1;
  if (t) {
    let u = n.tr.step(c);
    u.setSelection(q.create(u.doc, i)), t(u.scrollIntoView());
  }
  return !0;
}
function Jn(n, e, t = !1) {
  for (let r = n; r; r = e == "start" ? r.firstChild : r.lastChild) {
    if (r.isTextblock)
      return !0;
    if (t && r.childCount != 1)
      return !1;
  }
  return !1;
}
const nd = (n, e, t) => {
  let { $head: r, empty: s } = n.selection, i = r;
  if (!s)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("backward", n) : r.parentOffset > 0)
      return !1;
    i = hl(r);
  }
  let o = i && i.nodeBefore;
  return !o || !j.isSelectable(o) ? !1 : (e && e(n.tr.setSelection(j.create(n.doc, i.pos - o.nodeSize)).scrollIntoView()), !0);
};
function hl(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      if (n.index(e) > 0)
        return n.doc.resolve(n.before(e + 1));
      if (n.node(e).type.spec.isolating)
        break;
    }
  return null;
}
function rd(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("forward", n) : t.parentOffset < t.parent.content.size) ? null : t;
}
const sd = (n, e, t) => {
  let r = rd(n, t);
  if (!r)
    return !1;
  let s = pl(r);
  if (!s)
    return !1;
  let i = s.nodeAfter;
  if (cd(n, s, e, 1))
    return !0;
  if (r.parent.content.size == 0 && (Jn(i, "start") || j.isSelectable(i))) {
    let o = si(n.doc, r.before(), r.after(), _.empty);
    if (o && o.slice.size < o.to - o.from) {
      if (e) {
        let l = n.tr.step(o);
        l.setSelection(Jn(i, "start") ? Y.findFrom(l.doc.resolve(l.mapping.map(s.pos)), 1) : j.create(l.doc, l.mapping.map(s.pos))), e(l.scrollIntoView());
      }
      return !0;
    }
  }
  return i.isAtom && s.depth == r.depth - 1 ? (e && e(n.tr.delete(s.pos, s.pos + i.nodeSize).scrollIntoView()), !0) : !1;
}, id = (n, e, t) => {
  let { $head: r, empty: s } = n.selection, i = r;
  if (!s)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("forward", n) : r.parentOffset < r.parent.content.size)
      return !1;
    i = pl(r);
  }
  let o = i && i.nodeAfter;
  return !o || !j.isSelectable(o) ? !1 : (e && e(n.tr.setSelection(j.create(n.doc, i.pos)).scrollIntoView()), !0);
};
function pl(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      let t = n.node(e);
      if (n.index(e) + 1 < t.childCount)
        return n.doc.resolve(n.after(e + 1));
      if (t.type.spec.isolating)
        break;
    }
  return null;
}
const pm = (n, e) => {
  let t = n.selection, r = t instanceof j, s;
  if (r) {
    if (t.node.isTextblock || !nn(n.doc, t.from))
      return !1;
    s = t.from;
  } else if (s = ri(n.doc, t.from, -1), s == null)
    return !1;
  if (e) {
    let i = n.tr.join(s);
    r && i.setSelection(j.create(i.doc, s - n.doc.resolve(s).nodeBefore.nodeSize)), e(i.scrollIntoView());
  }
  return !0;
}, mm = (n, e) => {
  let t = n.selection, r;
  if (t instanceof j) {
    if (t.node.isTextblock || !nn(n.doc, t.to))
      return !1;
    r = t.to;
  } else if (r = ri(n.doc, t.to, 1), r == null)
    return !1;
  return e && e(n.tr.join(r).scrollIntoView()), !0;
}, gm = (n, e) => {
  let { $from: t, $to: r } = n.selection, s = t.blockRange(r), i = s && tr(s);
  return i == null ? !1 : (e && e(n.tr.lift(s, i).scrollIntoView()), !0);
}, od = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  return !t.parent.type.spec.code || !t.sameParent(r) ? !1 : (e && e(n.tr.insertText(`
`).scrollIntoView()), !0);
};
function ml(n) {
  for (let e = 0; e < n.edgeCount; e++) {
    let { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
const ym = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  if (!t.parent.type.spec.code || !t.sameParent(r))
    return !1;
  let s = t.node(-1), i = t.indexAfter(-1), o = ml(s.contentMatchAt(i));
  if (!o || !s.canReplaceWith(i, i, o))
    return !1;
  if (e) {
    let l = t.after(), a = n.tr.replaceWith(l, l, o.createAndFill());
    a.setSelection(Y.near(a.doc.resolve(l), 1)), e(a.scrollIntoView());
  }
  return !0;
}, ld = (n, e) => {
  let t = n.selection, { $from: r, $to: s } = t;
  if (t instanceof rt || r.parent.inlineContent || s.parent.inlineContent)
    return !1;
  let i = ml(s.parent.contentMatchAt(s.indexAfter()));
  if (!i || !i.isTextblock)
    return !1;
  if (e) {
    let o = (!r.parentOffset && s.index() < s.parent.childCount ? r : s).pos, l = n.tr.insert(o, i.createAndFill());
    l.setSelection(q.create(l.doc, o + 1)), e(l.scrollIntoView());
  }
  return !0;
}, ad = (n, e) => {
  let { $cursor: t } = n.selection;
  if (!t || t.parent.content.size)
    return !1;
  if (t.depth > 1 && t.after() != t.end(-1)) {
    let i = t.before();
    if (Dt(n.doc, i))
      return e && e(n.tr.split(i).scrollIntoView()), !0;
  }
  let r = t.blockRange(), s = r && tr(r);
  return s == null ? !1 : (e && e(n.tr.lift(r, s).scrollIntoView()), !0);
};
function bm(n) {
  return (e, t) => {
    let { $from: r, $to: s } = e.selection;
    if (e.selection instanceof j && e.selection.node.isBlock)
      return !r.parentOffset || !Dt(e.doc, r.pos) ? !1 : (t && t(e.tr.split(r.pos).scrollIntoView()), !0);
    if (!r.depth)
      return !1;
    let i = [], o, l, a = !1, c = !1;
    for (let h = r.depth; ; h--)
      if (r.node(h).isBlock) {
        a = r.end(h) == r.pos + (r.depth - h), c = r.start(h) == r.pos - (r.depth - h), l = ml(r.node(h - 1).contentMatchAt(r.indexAfter(h - 1))), i.unshift(a && l ? { type: l } : null), o = h;
        break;
      } else {
        if (h == 1)
          return !1;
        i.unshift(null);
      }
    let u = e.tr;
    (e.selection instanceof q || e.selection instanceof rt) && u.deleteSelection();
    let d = u.mapping.map(r.pos), f = Dt(u.doc, d, i.length, i);
    if (f || (i[0] = l ? { type: l } : null, f = Dt(u.doc, d, i.length, i)), !f)
      return !1;
    if (u.split(d, i.length, i), !a && c && r.node(o).type != l) {
      let h = u.mapping.map(r.before(o)), p = u.doc.resolve(h);
      l && r.node(o - 1).canReplaceWith(p.index(), p.index() + 1, l) && u.setNodeMarkup(u.mapping.map(r.before(o)), l);
    }
    return t && t(u.scrollIntoView()), !0;
  };
}
const xm = bm(), km = (n, e) => {
  let { $from: t, to: r } = n.selection, s, i = t.sharedDepth(r);
  return i == 0 ? !1 : (s = t.before(i), e && e(n.tr.setSelection(j.create(n.doc, s))), !0);
};
function vm(n, e, t) {
  let r = e.nodeBefore, s = e.nodeAfter, i = e.index();
  return !r || !s || !r.type.compatibleContent(s.type) ? !1 : !r.content.size && e.parent.canReplace(i - 1, i) ? (t && t(n.tr.delete(e.pos - r.nodeSize, e.pos).scrollIntoView()), !0) : !e.parent.canReplace(i, i + 1) || !(s.isTextblock || nn(n.doc, e.pos)) ? !1 : (t && t(n.tr.join(e.pos).scrollIntoView()), !0);
}
function cd(n, e, t, r) {
  let s = e.nodeBefore, i = e.nodeAfter, o, l, a = s.type.spec.isolating || i.type.spec.isolating;
  if (!a && vm(n, e, t))
    return !0;
  let c = !a && e.parent.canReplace(e.index(), e.index() + 1);
  if (c && (o = (l = s.contentMatchAt(s.childCount)).findWrapping(i.type)) && l.matchType(o[0] || i.type).validEnd) {
    if (t) {
      let h = e.pos + i.nodeSize, p = A.empty;
      for (let y = o.length - 1; y >= 0; y--)
        p = A.from(o[y].create(null, p));
      p = A.from(s.copy(p));
      let m = n.tr.step(new Le(e.pos - 1, h, e.pos, h, new _(p, 1, 0), o.length, !0)), g = m.doc.resolve(h + 2 * o.length);
      g.nodeAfter && g.nodeAfter.type == s.type && nn(m.doc, g.pos) && m.join(g.pos), t(m.scrollIntoView());
    }
    return !0;
  }
  let u = i.type.spec.isolating || r > 0 && a ? null : Y.findFrom(e, 1), d = u && u.$from.blockRange(u.$to), f = d && tr(d);
  if (f != null && f >= e.depth)
    return t && t(n.tr.lift(d, f).scrollIntoView()), !0;
  if (c && Jn(i, "start", !0) && Jn(s, "end")) {
    let h = s, p = [];
    for (; p.push(h), !h.isTextblock; )
      h = h.lastChild;
    let m = i, g = 1;
    for (; !m.isTextblock; m = m.firstChild)
      g++;
    if (h.canReplace(h.childCount, h.childCount, m.content)) {
      if (t) {
        let y = A.empty;
        for (let C = p.length - 1; C >= 0; C--)
          y = A.from(p[C].copy(y));
        let k = n.tr.step(new Le(e.pos - p.length, e.pos + i.nodeSize, e.pos + g, e.pos + i.nodeSize - g, new _(y, p.length, 0), 0, !0));
        t(k.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function ud(n) {
  return function(e, t) {
    let r = e.selection, s = n < 0 ? r.$from : r.$to, i = s.depth;
    for (; s.node(i).isInline; ) {
      if (!i)
        return !1;
      i--;
    }
    return s.node(i).isTextblock ? (t && t(e.tr.setSelection(q.create(e.doc, n < 0 ? s.start(i) : s.end(i)))), !0) : !1;
  };
}
const Sm = ud(-1), wm = ud(1);
function Cm(n, e = null) {
  return function(t, r) {
    let { $from: s, $to: i } = t.selection, o = s.blockRange(i), l = o && ul(o, n, e);
    return l ? (r && r(t.tr.wrap(o, l).scrollIntoView()), !0) : !1;
  };
}
function Na(n, e = null) {
  return function(t, r) {
    let s = !1;
    for (let i = 0; i < t.selection.ranges.length && !s; i++) {
      let { $from: { pos: o }, $to: { pos: l } } = t.selection.ranges[i];
      t.doc.nodesBetween(o, l, (a, c) => {
        if (s)
          return !1;
        if (!(!a.isTextblock || a.hasMarkup(n, e)))
          if (a.type == n)
            s = !0;
          else {
            let u = t.doc.resolve(c), d = u.index();
            s = u.parent.canReplaceWith(d, d + 1, n);
          }
      });
    }
    if (!s)
      return !1;
    if (r) {
      let i = t.tr;
      for (let o = 0; o < t.selection.ranges.length; o++) {
        let { $from: { pos: l }, $to: { pos: a } } = t.selection.ranges[o];
        i.setBlockType(l, a, n, e);
      }
      r(i.scrollIntoView());
    }
    return !0;
  };
}
function gl(...n) {
  return function(e, t, r) {
    for (let s = 0; s < n.length; s++)
      if (n[s](e, t, r))
        return !0;
    return !1;
  };
}
gl(fl, ed, nd);
gl(fl, sd, id);
gl(od, ld, ad, xm);
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform() == "darwin";
function Em(n, e = null) {
  return function(t, r) {
    let { $from: s, $to: i } = t.selection, o = s.blockRange(i);
    if (!o)
      return !1;
    let l = r ? t.tr : null;
    return Mm(l, o, n, e) ? (r && r(l.scrollIntoView()), !0) : !1;
  };
}
function Mm(n, e, t, r = null) {
  let s = !1, i = e, o = e.$from.doc;
  if (e.depth >= 2 && e.$from.node(e.depth - 1).type.compatibleContent(t) && e.startIndex == 0) {
    if (e.$from.index(e.depth - 1) == 0)
      return !1;
    let a = o.resolve(e.start - 2);
    i = new fs(a, a, e.depth), e.endIndex < e.parent.childCount && (e = new fs(e.$from, o.resolve(e.$to.end(e.depth)), e.depth)), s = !0;
  }
  let l = ul(i, t, r, e);
  return l ? (n && Tm(n, e, l, s, t), !0) : !1;
}
function Tm(n, e, t, r, s) {
  let i = A.empty;
  for (let u = t.length - 1; u >= 0; u--)
    i = A.from(t[u].type.create(t[u].attrs, i));
  n.step(new Le(e.start - (r ? 2 : 0), e.end, e.start, e.end, new _(i, 0, 0), t.length, !0));
  let o = 0;
  for (let u = 0; u < t.length; u++)
    t[u].type == s && (o = u + 1);
  let l = t.length - o, a = e.start + t.length - (r ? 2 : 0), c = e.parent;
  for (let u = e.startIndex, d = e.endIndex, f = !0; u < d; u++, f = !1)
    !f && Dt(n.doc, a, l) && (n.split(a, l), a += 2 * l), a += c.child(u).nodeSize;
  return n;
}
function Am(n) {
  return function(e, t) {
    let { $from: r, $to: s } = e.selection, i = r.blockRange(s, (o) => o.childCount > 0 && o.firstChild.type == n);
    return i ? t ? r.node(i.depth - 1).type == n ? Nm(e, t, n, i) : Om(e, t, i) : !0 : !1;
  };
}
function Nm(n, e, t, r) {
  let s = n.tr, i = r.end, o = r.$to.end(r.depth);
  i < o && (s.step(new Le(i - 1, o, i, o, new _(A.from(t.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new fs(s.doc.resolve(r.$from.pos), s.doc.resolve(o), r.depth));
  const l = tr(r);
  if (l == null)
    return !1;
  s.lift(r, l);
  let a = s.doc.resolve(s.mapping.map(i, -1) - 1);
  return nn(s.doc, a.pos) && a.nodeBefore.type == a.nodeAfter.type && s.join(a.pos), e(s.scrollIntoView()), !0;
}
function Om(n, e, t) {
  let r = n.tr, s = t.parent;
  for (let h = t.end, p = t.endIndex - 1, m = t.startIndex; p > m; p--)
    h -= s.child(p).nodeSize, r.delete(h - 1, h + 1);
  let i = r.doc.resolve(t.start), o = i.nodeAfter;
  if (r.mapping.map(t.end) != t.start + i.nodeAfter.nodeSize)
    return !1;
  let l = t.startIndex == 0, a = t.endIndex == s.childCount, c = i.node(-1), u = i.index(-1);
  if (!c.canReplace(u + (l ? 0 : 1), u + 1, o.content.append(a ? A.empty : A.from(s))))
    return !1;
  let d = i.pos, f = d + o.nodeSize;
  return r.step(new Le(d - (l ? 1 : 0), f + (a ? 1 : 0), d + 1, f - 1, new _((l ? A.empty : A.from(s.copy(A.empty))).append(a ? A.empty : A.from(s.copy(A.empty))), l ? 0 : 1, a ? 0 : 1), l ? 0 : 1)), e(r.scrollIntoView()), !0;
}
function Rm(n) {
  return function(e, t) {
    let { $from: r, $to: s } = e.selection, i = r.blockRange(s, (c) => c.childCount > 0 && c.firstChild.type == n);
    if (!i)
      return !1;
    let o = i.startIndex;
    if (o == 0)
      return !1;
    let l = i.parent, a = l.child(o - 1);
    if (a.type != n)
      return !1;
    if (t) {
      let c = a.lastChild && a.lastChild.type == l.type, u = A.from(c ? n.create() : null), d = new _(A.from(n.create(null, A.from(l.type.create(null, u)))), c ? 3 : 1, 0), f = i.start, h = i.end;
      t(e.tr.step(new Le(f - (c ? 3 : 1), h, f, h, d, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
const Ve = function(n) {
  for (var e = 0; ; e++)
    if (n = n.previousSibling, !n)
      return e;
}, Gn = function(n) {
  let e = n.assignedSlot || n.parentNode;
  return e && e.nodeType == 11 ? e.host : e;
};
let Mo = null;
const Ot = function(n, e, t) {
  let r = Mo || (Mo = document.createRange());
  return r.setEnd(n, t ?? n.nodeValue.length), r.setStart(n, e || 0), r;
}, Dm = function() {
  Mo = null;
}, Sn = function(n, e, t, r) {
  return t && (Oa(n, e, t, r, -1) || Oa(n, e, t, r, 1));
}, Im = /^(img|br|input|textarea|hr)$/i;
function Oa(n, e, t, r, s) {
  for (var i; ; ) {
    if (n == t && e == r)
      return !0;
    if (e == (s < 0 ? 0 : dt(n))) {
      let o = n.parentNode;
      if (!o || o.nodeType != 1 || Pr(n) || Im.test(n.nodeName) || n.contentEditable == "false")
        return !1;
      e = Ve(n) + (s < 0 ? 0 : 1), n = o;
    } else if (n.nodeType == 1) {
      let o = n.childNodes[e + (s < 0 ? -1 : 0)];
      if (o.nodeType == 1 && o.contentEditable == "false")
        if (!((i = o.pmViewDesc) === null || i === void 0) && i.ignoreForSelection)
          e += s;
        else
          return !1;
      else
        n = o, e = s < 0 ? dt(n) : 0;
    } else
      return !1;
  }
}
function dt(n) {
  return n.nodeType == 3 ? n.nodeValue.length : n.childNodes.length;
}
function Lm(n, e) {
  for (; ; ) {
    if (n.nodeType == 3 && e)
      return n;
    if (n.nodeType == 1 && e > 0) {
      if (n.contentEditable == "false")
        return null;
      n = n.childNodes[e - 1], e = dt(n);
    } else if (n.parentNode && !Pr(n))
      e = Ve(n), n = n.parentNode;
    else
      return null;
  }
}
function Pm(n, e) {
  for (; ; ) {
    if (n.nodeType == 3 && e < n.nodeValue.length)
      return n;
    if (n.nodeType == 1 && e < n.childNodes.length) {
      if (n.contentEditable == "false")
        return null;
      n = n.childNodes[e], e = 0;
    } else if (n.parentNode && !Pr(n))
      e = Ve(n) + 1, n = n.parentNode;
    else
      return null;
  }
}
function _m(n, e, t) {
  for (let r = e == 0, s = e == dt(n); r || s; ) {
    if (n == t)
      return !0;
    let i = Ve(n);
    if (n = n.parentNode, !n)
      return !1;
    r = r && i == 0, s = s && i == dt(n);
  }
}
function Pr(n) {
  let e;
  for (let t = n; t && !(e = t.pmViewDesc); t = t.parentNode)
    ;
  return e && e.node && e.node.isBlock && (e.dom == n || e.contentDOM == n);
}
const oi = function(n) {
  return n.focusNode && Sn(n.focusNode, n.focusOffset, n.anchorNode, n.anchorOffset);
};
function an(n, e) {
  let t = document.createEvent("Event");
  return t.initEvent("keydown", !0, !0), t.keyCode = n, t.key = t.code = e, t;
}
function Bm(n) {
  let e = n.activeElement;
  for (; e && e.shadowRoot; )
    e = e.shadowRoot.activeElement;
  return e;
}
function Fm(n, e, t) {
  if (n.caretPositionFromPoint)
    try {
      let r = n.caretPositionFromPoint(e, t);
      if (r)
        return { node: r.offsetNode, offset: Math.min(dt(r.offsetNode), r.offset) };
    } catch {
    }
  if (n.caretRangeFromPoint) {
    let r = n.caretRangeFromPoint(e, t);
    if (r)
      return { node: r.startContainer, offset: Math.min(dt(r.startContainer), r.startOffset) };
  }
}
const St = typeof navigator < "u" ? navigator : null, Ra = typeof document < "u" ? document : null, rn = St && St.userAgent || "", To = /Edge\/(\d+)/.exec(rn), dd = /MSIE \d/.exec(rn), Ao = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(rn), Ze = !!(dd || Ao || To), Gt = dd ? document.documentMode : Ao ? +Ao[1] : To ? +To[1] : 0, ft = !Ze && /gecko\/(\d+)/i.test(rn);
ft && +(/Firefox\/(\d+)/.exec(rn) || [0, 0])[1];
const No = !Ze && /Chrome\/(\d+)/.exec(rn), Ie = !!No, fd = No ? +No[1] : 0, He = !Ze && !!St && /Apple Computer/.test(St.vendor), Yn = He && (/Mobile\/\w+/.test(rn) || !!St && St.maxTouchPoints > 2), ct = Yn || (St ? /Mac/.test(St.platform) : !1), hd = St ? /Win/.test(St.platform) : !1, Rt = /Android \d/.test(rn), _r = !!Ra && "webkitFontSmoothing" in Ra.documentElement.style, Vm = _r ? +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1] : 0;
function zm(n) {
  let e = n.defaultView && n.defaultView.visualViewport;
  return e ? {
    left: 0,
    right: e.width,
    top: 0,
    bottom: e.height
  } : {
    left: 0,
    right: n.documentElement.clientWidth,
    top: 0,
    bottom: n.documentElement.clientHeight
  };
}
function Mt(n, e) {
  return typeof n == "number" ? n : n[e];
}
function jm(n) {
  let e = n.getBoundingClientRect(), t = e.width / n.offsetWidth || 1, r = e.height / n.offsetHeight || 1;
  return {
    left: e.left,
    right: e.left + n.clientWidth * t,
    top: e.top,
    bottom: e.top + n.clientHeight * r
  };
}
function Da(n, e, t) {
  let r = n.someProp("scrollThreshold") || 0, s = n.someProp("scrollMargin") || 5, i = n.dom.ownerDocument;
  for (let o = t || n.dom; o; ) {
    if (o.nodeType != 1) {
      o = Gn(o);
      continue;
    }
    let l = o, a = l == i.body, c = a ? zm(i) : jm(l), u = 0, d = 0;
    if (e.top < c.top + Mt(r, "top") ? d = -(c.top - e.top + Mt(s, "top")) : e.bottom > c.bottom - Mt(r, "bottom") && (d = e.bottom - e.top > c.bottom - c.top ? e.top + Mt(s, "top") - c.top : e.bottom - c.bottom + Mt(s, "bottom")), e.left < c.left + Mt(r, "left") ? u = -(c.left - e.left + Mt(s, "left")) : e.right > c.right - Mt(r, "right") && (u = e.right - c.right + Mt(s, "right")), u || d)
      if (a)
        i.defaultView.scrollBy(u, d);
      else {
        let h = l.scrollLeft, p = l.scrollTop;
        d && (l.scrollTop += d), u && (l.scrollLeft += u);
        let m = l.scrollLeft - h, g = l.scrollTop - p;
        e = { left: e.left - m, top: e.top - g, right: e.right - m, bottom: e.bottom - g };
      }
    let f = a ? "fixed" : getComputedStyle(o).position;
    if (/^(fixed|sticky)$/.test(f))
      break;
    o = f == "absolute" ? o.offsetParent : Gn(o);
  }
}
function $m(n) {
  let e = n.dom.getBoundingClientRect(), t = Math.max(0, e.top), r, s;
  for (let i = (e.left + e.right) / 2, o = t + 1; o < Math.min(innerHeight, e.bottom); o += 5) {
    let l = n.root.elementFromPoint(i, o);
    if (!l || l == n.dom || !n.dom.contains(l))
      continue;
    let a = l.getBoundingClientRect();
    if (a.top >= t - 20) {
      r = l, s = a.top;
      break;
    }
  }
  return { refDOM: r, refTop: s, stack: pd(n.dom) };
}
function pd(n) {
  let e = [], t = n.ownerDocument;
  for (let r = n; r && (e.push({ dom: r, top: r.scrollTop, left: r.scrollLeft }), n != t); r = Gn(r))
    ;
  return e;
}
function Hm({ refDOM: n, refTop: e, stack: t }) {
  let r = n ? n.getBoundingClientRect().top : 0;
  md(t, r == 0 ? 0 : r - e);
}
function md(n, e) {
  for (let t = 0; t < n.length; t++) {
    let { dom: r, top: s, left: i } = n[t];
    r.scrollTop != s + e && (r.scrollTop = s + e), r.scrollLeft != i && (r.scrollLeft = i);
  }
}
let Ln = null;
function Um(n) {
  if (n.setActive)
    return n.setActive();
  if (Ln)
    return n.focus(Ln);
  let e = pd(n);
  n.focus(Ln == null ? {
    get preventScroll() {
      return Ln = { preventScroll: !0 }, !0;
    }
  } : void 0), Ln || (Ln = !1, md(e, 0));
}
function gd(n, e) {
  let t, r = 2e8, s, i = 0, o = e.top, l = e.top, a, c;
  for (let u = n.firstChild, d = 0; u; u = u.nextSibling, d++) {
    let f;
    if (u.nodeType == 1)
      f = u.getClientRects();
    else if (u.nodeType == 3)
      f = Ot(u).getClientRects();
    else
      continue;
    for (let h = 0; h < f.length; h++) {
      let p = f[h];
      if (p.top <= o && p.bottom >= l) {
        o = Math.max(p.bottom, o), l = Math.min(p.top, l);
        let m = p.left > e.left ? p.left - e.left : p.right < e.left ? e.left - p.right : 0;
        if (m < r) {
          t = u, r = m, s = m && t.nodeType == 3 ? {
            left: p.right < e.left ? p.right : p.left,
            top: e.top
          } : e, u.nodeType == 1 && m && (i = d + (e.left >= (p.left + p.right) / 2 ? 1 : 0));
          continue;
        }
      } else p.top > e.top && !a && p.left <= e.left && p.right >= e.left && (a = u, c = { left: Math.max(p.left, Math.min(p.right, e.left)), top: p.top });
      !t && (e.left >= p.right && e.top >= p.top || e.left >= p.left && e.top >= p.bottom) && (i = d + 1);
    }
  }
  return !t && a && (t = a, s = c, r = 0), t && t.nodeType == 3 ? Wm(t, s) : !t || r && t.nodeType == 1 ? { node: n, offset: i } : gd(t, s);
}
function Wm(n, e) {
  let t = n.nodeValue.length, r = document.createRange(), s;
  for (let i = 0; i < t; i++) {
    r.setEnd(n, i + 1), r.setStart(n, i);
    let o = Vt(r, 1);
    if (o.top != o.bottom && yl(e, o)) {
      s = { node: n, offset: i + (e.left >= (o.left + o.right) / 2 ? 1 : 0) };
      break;
    }
  }
  return r.detach(), s || { node: n, offset: 0 };
}
function yl(n, e) {
  return n.left >= e.left - 1 && n.left <= e.right + 1 && n.top >= e.top - 1 && n.top <= e.bottom + 1;
}
function qm(n, e) {
  let t = n.parentNode;
  return t && /^li$/i.test(t.nodeName) && e.left < n.getBoundingClientRect().left ? t : n;
}
function Km(n, e, t) {
  let { node: r, offset: s } = gd(e, t), i = -1;
  if (r.nodeType == 1 && !r.firstChild) {
    let o = r.getBoundingClientRect();
    i = o.left != o.right && t.left > (o.left + o.right) / 2 ? 1 : -1;
  }
  return n.docView.posFromDOM(r, s, i);
}
function Jm(n, e, t, r) {
  let s = -1;
  for (let i = e, o = !1; i != n.dom; ) {
    let l = n.docView.nearestDesc(i, !0), a;
    if (!l)
      return null;
    if (l.dom.nodeType == 1 && (l.node.isBlock && l.parent || !l.contentDOM) && // Ignore elements with zero-size bounding rectangles
    ((a = l.dom.getBoundingClientRect()).width || a.height) && (l.node.isBlock && l.parent && !/^T(R|BODY|HEAD|FOOT)$/.test(l.dom.nodeName) && (!o && a.left > r.left || a.top > r.top ? s = l.posBefore : (!o && a.right < r.left || a.bottom < r.top) && (s = l.posAfter), o = !0), !l.contentDOM && s < 0 && !l.node.isText))
      return (l.node.isBlock ? r.top < (a.top + a.bottom) / 2 : r.left < (a.left + a.right) / 2) ? l.posBefore : l.posAfter;
    i = l.dom.parentNode;
  }
  return s > -1 ? s : n.docView.posFromDOM(e, t, -1);
}
function yd(n, e, t) {
  let r = n.childNodes.length;
  if (r && t.top < t.bottom)
    for (let s = Math.max(0, Math.min(r - 1, Math.floor(r * (e.top - t.top) / (t.bottom - t.top)) - 2)), i = s; ; ) {
      let o = n.childNodes[i];
      if (o.nodeType == 1) {
        let l = o.getClientRects();
        for (let a = 0; a < l.length; a++) {
          let c = l[a];
          if (yl(e, c))
            return yd(o, e, c);
        }
      }
      if ((i = (i + 1) % r) == s)
        break;
    }
  return n;
}
function Gm(n, e) {
  let t = n.dom.ownerDocument, r, s = 0, i = Fm(t, e.left, e.top);
  i && ({ node: r, offset: s } = i);
  let o = (n.root.elementFromPoint ? n.root : t).elementFromPoint(e.left, e.top), l;
  if (!o || !n.dom.contains(o.nodeType != 1 ? o.parentNode : o)) {
    let c = n.dom.getBoundingClientRect();
    if (!yl(e, c) || (o = yd(n.dom, e, c), !o))
      return null;
  }
  if (He)
    for (let c = o; r && c; c = Gn(c))
      c.draggable && (r = void 0);
  if (o = qm(o, e), r) {
    if (ft && r.nodeType == 1 && (s = Math.min(s, r.childNodes.length), s < r.childNodes.length)) {
      let u = r.childNodes[s], d;
      u.nodeName == "IMG" && (d = u.getBoundingClientRect()).right <= e.left && d.bottom > e.top && s++;
    }
    let c;
    _r && s && r.nodeType == 1 && (c = r.childNodes[s - 1]).nodeType == 1 && c.contentEditable == "false" && c.getBoundingClientRect().top >= e.top && s--, r == n.dom && s == r.childNodes.length - 1 && r.lastChild.nodeType == 1 && e.top > r.lastChild.getBoundingClientRect().bottom ? l = n.state.doc.content.size : (s == 0 || r.nodeType != 1 || r.childNodes[s - 1].nodeName != "BR") && (l = Jm(n, r, s, e));
  }
  l == null && (l = Km(n, o, e));
  let a = n.docView.nearestDesc(o, !0);
  return { pos: l, inside: a ? a.posAtStart - a.border : -1 };
}
function Ia(n) {
  return n.top < n.bottom || n.left < n.right;
}
function Vt(n, e) {
  let t = n.getClientRects();
  if (t.length) {
    let r = t[e < 0 ? 0 : t.length - 1];
    if (Ia(r))
      return r;
  }
  return Array.prototype.find.call(t, Ia) || n.getBoundingClientRect();
}
const Ym = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
function bd(n, e, t) {
  let { node: r, offset: s, atom: i } = n.docView.domFromPos(e, t < 0 ? -1 : 1), o = _r || ft;
  if (r.nodeType == 3)
    if (o && (Ym.test(r.nodeValue) || (t < 0 ? !s : s == r.nodeValue.length))) {
      let a = Vt(Ot(r, s, s), t);
      if (ft && s && /\s/.test(r.nodeValue[s - 1]) && s < r.nodeValue.length) {
        let c = Vt(Ot(r, s - 1, s - 1), -1);
        if (c.top == a.top) {
          let u = Vt(Ot(r, s, s + 1), -1);
          if (u.top != a.top)
            return rr(u, u.left < c.left);
        }
      }
      return a;
    } else {
      let a = s, c = s, u = t < 0 ? 1 : -1;
      return t < 0 && !s ? (c++, u = -1) : t >= 0 && s == r.nodeValue.length ? (a--, u = 1) : t < 0 ? a-- : c++, rr(Vt(Ot(r, a, c), u), u < 0);
    }
  if (!n.state.doc.resolve(e - (i || 0)).parent.inlineContent) {
    if (i == null && s && (t < 0 || s == dt(r))) {
      let a = r.childNodes[s - 1];
      if (a.nodeType == 1)
        return Vi(a.getBoundingClientRect(), !1);
    }
    if (i == null && s < dt(r)) {
      let a = r.childNodes[s];
      if (a.nodeType == 1)
        return Vi(a.getBoundingClientRect(), !0);
    }
    return Vi(r.getBoundingClientRect(), t >= 0);
  }
  if (i == null && s && (t < 0 || s == dt(r))) {
    let a = r.childNodes[s - 1], c = a.nodeType == 3 ? Ot(a, dt(a) - (o ? 0 : 1)) : a.nodeType == 1 && (a.nodeName != "BR" || !a.nextSibling) ? a : null;
    if (c)
      return rr(Vt(c, 1), !1);
  }
  if (i == null && s < dt(r)) {
    let a = r.childNodes[s];
    for (; a.pmViewDesc && a.pmViewDesc.ignoreForCoords; )
      a = a.nextSibling;
    let c = a ? a.nodeType == 3 ? Ot(a, 0, o ? 0 : 1) : a.nodeType == 1 ? a : null : null;
    if (c)
      return rr(Vt(c, -1), !0);
  }
  return rr(Vt(r.nodeType == 3 ? Ot(r) : r, -t), t >= 0);
}
function rr(n, e) {
  if (n.width == 0)
    return n;
  let t = e ? n.left : n.right;
  return { top: n.top, bottom: n.bottom, left: t, right: t };
}
function Vi(n, e) {
  if (n.height == 0)
    return n;
  let t = e ? n.top : n.bottom;
  return { top: t, bottom: t, left: n.left, right: n.right };
}
function xd(n, e, t) {
  let r = n.state, s = n.root.activeElement;
  r != e && n.updateState(e), s != n.dom && n.focus();
  try {
    return t();
  } finally {
    r != e && n.updateState(r), s != n.dom && s && s.focus();
  }
}
function Xm(n, e, t) {
  let r = e.selection, s = t == "up" ? r.$from : r.$to;
  return xd(n, e, () => {
    let { node: i } = n.docView.domFromPos(s.pos, t == "up" ? -1 : 1);
    for (; ; ) {
      let l = n.docView.nearestDesc(i, !0);
      if (!l)
        break;
      if (l.node.isBlock) {
        i = l.contentDOM || l.dom;
        break;
      }
      i = l.dom.parentNode;
    }
    let o = bd(n, s.pos, 1);
    for (let l = i.firstChild; l; l = l.nextSibling) {
      let a;
      if (l.nodeType == 1)
        a = l.getClientRects();
      else if (l.nodeType == 3)
        a = Ot(l, 0, l.nodeValue.length).getClientRects();
      else
        continue;
      for (let c = 0; c < a.length; c++) {
        let u = a[c];
        if (u.bottom > u.top + 1 && (t == "up" ? o.top - u.top > (u.bottom - o.top) * 2 : u.bottom - o.bottom > (o.bottom - u.top) * 2))
          return !1;
      }
    }
    return !0;
  });
}
const Qm = /[\u0590-\u08ac]/;
function Zm(n, e, t) {
  let { $head: r } = e.selection;
  if (!r.parent.isTextblock)
    return !1;
  let s = r.parentOffset, i = !s, o = s == r.parent.content.size, l = n.domSelection();
  return l ? !Qm.test(r.parent.textContent) || !l.modify ? t == "left" || t == "backward" ? i : o : xd(n, e, () => {
    let { focusNode: a, focusOffset: c, anchorNode: u, anchorOffset: d } = n.domSelectionRange(), f = l.caretBidiLevel;
    l.modify("move", t, "character");
    let h = r.depth ? n.docView.domAfterPos(r.before()) : n.dom, { focusNode: p, focusOffset: m } = n.domSelectionRange(), g = p && !h.contains(p.nodeType == 1 ? p : p.parentNode) || a == p && c == m;
    try {
      l.collapse(u, d), a && (a != u || c != d) && l.extend && l.extend(a, c);
    } catch {
    }
    return f != null && (l.caretBidiLevel = f), g;
  }) : r.pos == r.start() || r.pos == r.end();
}
let La = null, Pa = null, _a = !1;
function eg(n, e, t) {
  return La == e && Pa == t ? _a : (La = e, Pa = t, _a = t == "up" || t == "down" ? Xm(n, e, t) : Zm(n, e, t));
}
const ht = 0, Ba = 1, dn = 2, wt = 3;
class Br {
  constructor(e, t, r, s) {
    this.parent = e, this.children = t, this.dom = r, this.contentDOM = s, this.dirty = ht, r.pmViewDesc = this;
  }
  // Used to check whether a given description corresponds to a
  // widget/mark/node.
  matchesWidget(e) {
    return !1;
  }
  matchesMark(e) {
    return !1;
  }
  matchesNode(e, t, r) {
    return !1;
  }
  matchesHack(e) {
    return !1;
  }
  // When parsing in-editor content (in domchange.js), we allow
  // descriptions to determine the parse rules that should be used to
  // parse them.
  parseRule() {
    return null;
  }
  // Used by the editor's event handler to ignore events that come
  // from certain descs.
  stopEvent(e) {
    return !1;
  }
  // The size of the content represented by this desc.
  get size() {
    let e = 0;
    for (let t = 0; t < this.children.length; t++)
      e += this.children[t].size;
    return e;
  }
  // For block nodes, this represents the space taken up by their
  // start/end tokens.
  get border() {
    return 0;
  }
  destroy() {
    this.parent = void 0, this.dom.pmViewDesc == this && (this.dom.pmViewDesc = void 0);
    for (let e = 0; e < this.children.length; e++)
      this.children[e].destroy();
  }
  posBeforeChild(e) {
    for (let t = 0, r = this.posAtStart; ; t++) {
      let s = this.children[t];
      if (s == e)
        return r;
      r += s.size;
    }
  }
  get posBefore() {
    return this.parent.posBeforeChild(this);
  }
  get posAtStart() {
    return this.parent ? this.parent.posBeforeChild(this) + this.border : 0;
  }
  get posAfter() {
    return this.posBefore + this.size;
  }
  get posAtEnd() {
    return this.posAtStart + this.size - 2 * this.border;
  }
  localPosFromDOM(e, t, r) {
    if (this.contentDOM && this.contentDOM.contains(e.nodeType == 1 ? e : e.parentNode))
      if (r < 0) {
        let i, o;
        if (e == this.contentDOM)
          i = e.childNodes[t - 1];
        else {
          for (; e.parentNode != this.contentDOM; )
            e = e.parentNode;
          i = e.previousSibling;
        }
        for (; i && !((o = i.pmViewDesc) && o.parent == this); )
          i = i.previousSibling;
        return i ? this.posBeforeChild(o) + o.size : this.posAtStart;
      } else {
        let i, o;
        if (e == this.contentDOM)
          i = e.childNodes[t];
        else {
          for (; e.parentNode != this.contentDOM; )
            e = e.parentNode;
          i = e.nextSibling;
        }
        for (; i && !((o = i.pmViewDesc) && o.parent == this); )
          i = i.nextSibling;
        return i ? this.posBeforeChild(o) : this.posAtEnd;
      }
    let s;
    if (e == this.dom && this.contentDOM)
      s = t > Ve(this.contentDOM);
    else if (this.contentDOM && this.contentDOM != this.dom && this.dom.contains(this.contentDOM))
      s = e.compareDocumentPosition(this.contentDOM) & 2;
    else if (this.dom.firstChild) {
      if (t == 0)
        for (let i = e; ; i = i.parentNode) {
          if (i == this.dom) {
            s = !1;
            break;
          }
          if (i.previousSibling)
            break;
        }
      if (s == null && t == e.childNodes.length)
        for (let i = e; ; i = i.parentNode) {
          if (i == this.dom) {
            s = !0;
            break;
          }
          if (i.nextSibling)
            break;
        }
    }
    return s ?? r > 0 ? this.posAtEnd : this.posAtStart;
  }
  nearestDesc(e, t = !1) {
    for (let r = !0, s = e; s; s = s.parentNode) {
      let i = this.getDesc(s), o;
      if (i && (!t || i.node))
        if (r && (o = i.nodeDOM) && !(o.nodeType == 1 ? o.contains(e.nodeType == 1 ? e : e.parentNode) : o == e))
          r = !1;
        else
          return i;
    }
  }
  getDesc(e) {
    let t = e.pmViewDesc;
    for (let r = t; r; r = r.parent)
      if (r == this)
        return t;
  }
  posFromDOM(e, t, r) {
    for (let s = e; s; s = s.parentNode) {
      let i = this.getDesc(s);
      if (i)
        return i.localPosFromDOM(e, t, r);
    }
    return -1;
  }
  // Find the desc for the node after the given pos, if any. (When a
  // parent node overrode rendering, there might not be one.)
  descAt(e) {
    for (let t = 0, r = 0; t < this.children.length; t++) {
      let s = this.children[t], i = r + s.size;
      if (r == e && i != r) {
        for (; !s.border && s.children.length; )
          for (let o = 0; o < s.children.length; o++) {
            let l = s.children[o];
            if (l.size) {
              s = l;
              break;
            }
          }
        return s;
      }
      if (e < i)
        return s.descAt(e - r - s.border);
      r = i;
    }
  }
  domFromPos(e, t) {
    if (!this.contentDOM)
      return { node: this.dom, offset: 0, atom: e + 1 };
    let r = 0, s = 0;
    for (let i = 0; r < this.children.length; r++) {
      let o = this.children[r], l = i + o.size;
      if (l > e || o instanceof vd) {
        s = e - i;
        break;
      }
      i = l;
    }
    if (s)
      return this.children[r].domFromPos(s - this.children[r].border, t);
    for (let i; r && !(i = this.children[r - 1]).size && i instanceof kd && i.side >= 0; r--)
      ;
    if (t <= 0) {
      let i, o = !0;
      for (; i = r ? this.children[r - 1] : null, !(!i || i.dom.parentNode == this.contentDOM); r--, o = !1)
        ;
      return i && t && o && !i.border && !i.domAtom ? i.domFromPos(i.size, t) : { node: this.contentDOM, offset: i ? Ve(i.dom) + 1 : 0 };
    } else {
      let i, o = !0;
      for (; i = r < this.children.length ? this.children[r] : null, !(!i || i.dom.parentNode == this.contentDOM); r++, o = !1)
        ;
      return i && o && !i.border && !i.domAtom ? i.domFromPos(0, t) : { node: this.contentDOM, offset: i ? Ve(i.dom) : this.contentDOM.childNodes.length };
    }
  }
  // Used to find a DOM range in a single parent for a given changed
  // range.
  parseRange(e, t, r = 0) {
    if (this.children.length == 0)
      return { node: this.contentDOM, from: e, to: t, fromOffset: 0, toOffset: this.contentDOM.childNodes.length };
    let s = -1, i = -1;
    for (let o = r, l = 0; ; l++) {
      let a = this.children[l], c = o + a.size;
      if (s == -1 && e <= c) {
        let u = o + a.border;
        if (e >= u && t <= c - a.border && a.node && a.contentDOM && this.contentDOM.contains(a.contentDOM))
          return a.parseRange(e, t, u);
        e = o;
        for (let d = l; d > 0; d--) {
          let f = this.children[d - 1];
          if (f.size && f.dom.parentNode == this.contentDOM && !f.emptyChildAt(1)) {
            s = Ve(f.dom) + 1;
            break;
          }
          e -= f.size;
        }
        s == -1 && (s = 0);
      }
      if (s > -1 && (c > t || l == this.children.length - 1)) {
        t = c;
        for (let u = l + 1; u < this.children.length; u++) {
          let d = this.children[u];
          if (d.size && d.dom.parentNode == this.contentDOM && !d.emptyChildAt(-1)) {
            i = Ve(d.dom);
            break;
          }
          t += d.size;
        }
        i == -1 && (i = this.contentDOM.childNodes.length);
        break;
      }
      o = c;
    }
    return { node: this.contentDOM, from: e, to: t, fromOffset: s, toOffset: i };
  }
  emptyChildAt(e) {
    if (this.border || !this.contentDOM || !this.children.length)
      return !1;
    let t = this.children[e < 0 ? 0 : this.children.length - 1];
    return t.size == 0 || t.emptyChildAt(e);
  }
  domAfterPos(e) {
    let { node: t, offset: r } = this.domFromPos(e, 0);
    if (t.nodeType != 1 || r == t.childNodes.length)
      throw new RangeError("No node after pos " + e);
    return t.childNodes[r];
  }
  // View descs are responsible for setting any selection that falls
  // entirely inside of them, so that custom implementations can do
  // custom things with the selection. Note that this falls apart when
  // a selection starts in such a node and ends in another, in which
  // case we just use whatever domFromPos produces as a best effort.
  setSelection(e, t, r, s = !1) {
    let i = Math.min(e, t), o = Math.max(e, t);
    for (let h = 0, p = 0; h < this.children.length; h++) {
      let m = this.children[h], g = p + m.size;
      if (i > p && o < g)
        return m.setSelection(e - p - m.border, t - p - m.border, r, s);
      p = g;
    }
    let l = this.domFromPos(e, e ? -1 : 1), a = t == e ? l : this.domFromPos(t, t ? -1 : 1), c = r.root.getSelection(), u = r.domSelectionRange(), d = !1;
    if ((ft || He) && e == t) {
      let { node: h, offset: p } = l;
      if (h.nodeType == 3) {
        if (d = !!(p && h.nodeValue[p - 1] == `
`), d && p == h.nodeValue.length)
          for (let m = h, g; m; m = m.parentNode) {
            if (g = m.nextSibling) {
              g.nodeName == "BR" && (l = a = { node: g.parentNode, offset: Ve(g) + 1 });
              break;
            }
            let y = m.pmViewDesc;
            if (y && y.node && y.node.isBlock)
              break;
          }
      } else {
        let m = h.childNodes[p - 1];
        d = m && (m.nodeName == "BR" || m.contentEditable == "false");
      }
    }
    if (ft && u.focusNode && u.focusNode != a.node && u.focusNode.nodeType == 1) {
      let h = u.focusNode.childNodes[u.focusOffset];
      h && h.contentEditable == "false" && (s = !0);
    }
    if (!(s || d && He) && Sn(l.node, l.offset, u.anchorNode, u.anchorOffset) && Sn(a.node, a.offset, u.focusNode, u.focusOffset))
      return;
    let f = !1;
    if ((c.extend || e == t) && !(d && ft)) {
      c.collapse(l.node, l.offset);
      try {
        e != t && c.extend(a.node, a.offset), f = !0;
      } catch {
      }
    }
    if (!f) {
      if (e > t) {
        let p = l;
        l = a, a = p;
      }
      let h = document.createRange();
      h.setEnd(a.node, a.offset), h.setStart(l.node, l.offset), c.removeAllRanges(), c.addRange(h);
    }
  }
  ignoreMutation(e) {
    return !this.contentDOM && e.type != "selection";
  }
  get contentLost() {
    return this.contentDOM && this.contentDOM != this.dom && !this.dom.contains(this.contentDOM);
  }
  // Remove a subtree of the element tree that has been touched
  // by a DOM change, so that the next update will redraw it.
  markDirty(e, t) {
    for (let r = 0, s = 0; s < this.children.length; s++) {
      let i = this.children[s], o = r + i.size;
      if (r == o ? e <= o && t >= r : e < o && t > r) {
        let l = r + i.border, a = o - i.border;
        if (e >= l && t <= a) {
          this.dirty = e == r || t == o ? dn : Ba, e == l && t == a && (i.contentLost || i.dom.parentNode != this.contentDOM) ? i.dirty = wt : i.markDirty(e - l, t - l);
          return;
        } else
          i.dirty = i.dom == i.contentDOM && i.dom.parentNode == this.contentDOM && !i.children.length ? dn : wt;
      }
      r = o;
    }
    this.dirty = dn;
  }
  markParentsDirty() {
    let e = 1;
    for (let t = this.parent; t; t = t.parent, e++) {
      let r = e == 1 ? dn : Ba;
      t.dirty < r && (t.dirty = r);
    }
  }
  get domAtom() {
    return !1;
  }
  get ignoreForCoords() {
    return !1;
  }
  get ignoreForSelection() {
    return !1;
  }
  isText(e) {
    return !1;
  }
}
class kd extends Br {
  constructor(e, t, r, s) {
    let i, o = t.type.toDOM;
    if (typeof o == "function" && (o = o(r, () => {
      if (!i)
        return s;
      if (i.parent)
        return i.parent.posBeforeChild(i);
    })), !t.type.spec.raw) {
      if (o.nodeType != 1) {
        let l = document.createElement("span");
        l.appendChild(o), o = l;
      }
      o.contentEditable = "false", o.classList.add("ProseMirror-widget");
    }
    super(e, [], o, null), this.widget = t, this.widget = t, i = this;
  }
  matchesWidget(e) {
    return this.dirty == ht && e.type.eq(this.widget.type);
  }
  parseRule() {
    return { ignore: !0 };
  }
  stopEvent(e) {
    let t = this.widget.spec.stopEvent;
    return t ? t(e) : !1;
  }
  ignoreMutation(e) {
    return e.type != "selection" || this.widget.spec.ignoreSelection;
  }
  destroy() {
    this.widget.type.destroy(this.dom), super.destroy();
  }
  get domAtom() {
    return !0;
  }
  get ignoreForSelection() {
    return !!this.widget.type.spec.relaxedSide;
  }
  get side() {
    return this.widget.type.side;
  }
}
class tg extends Br {
  constructor(e, t, r, s) {
    super(e, [], t, null), this.textDOM = r, this.text = s;
  }
  get size() {
    return this.text.length;
  }
  localPosFromDOM(e, t) {
    return e != this.textDOM ? this.posAtStart + (t ? this.size : 0) : this.posAtStart + t;
  }
  domFromPos(e) {
    return { node: this.textDOM, offset: e };
  }
  ignoreMutation(e) {
    return e.type === "characterData" && e.target.nodeValue == e.oldValue;
  }
}
class wn extends Br {
  constructor(e, t, r, s, i) {
    super(e, [], r, s), this.mark = t, this.spec = i;
  }
  static create(e, t, r, s) {
    let i = s.nodeViews[t.type.name], o = i && i(t, s, r);
    return (!o || !o.dom) && (o = Mn.renderSpec(document, t.type.spec.toDOM(t, r), null, t.attrs)), new wn(e, t, o.dom, o.contentDOM || o.dom, o);
  }
  parseRule() {
    return this.dirty & wt || this.mark.type.spec.reparseInView ? null : { mark: this.mark.type.name, attrs: this.mark.attrs, contentElement: this.contentDOM };
  }
  matchesMark(e) {
    return this.dirty != wt && this.mark.eq(e);
  }
  markDirty(e, t) {
    if (super.markDirty(e, t), this.dirty != ht) {
      let r = this.parent;
      for (; !r.node; )
        r = r.parent;
      r.dirty < this.dirty && (r.dirty = this.dirty), this.dirty = ht;
    }
  }
  slice(e, t, r) {
    let s = wn.create(this.parent, this.mark, !0, r), i = this.children, o = this.size;
    t < o && (i = Ro(i, t, o, r)), e > 0 && (i = Ro(i, 0, e, r));
    for (let l = 0; l < i.length; l++)
      i[l].parent = s;
    return s.children = i, s;
  }
  ignoreMutation(e) {
    return this.spec.ignoreMutation ? this.spec.ignoreMutation(e) : super.ignoreMutation(e);
  }
  destroy() {
    this.spec.destroy && this.spec.destroy(), super.destroy();
  }
}
class Yt extends Br {
  constructor(e, t, r, s, i, o, l, a, c) {
    super(e, [], i, o), this.node = t, this.outerDeco = r, this.innerDeco = s, this.nodeDOM = l;
  }
  // By default, a node is rendered using the `toDOM` method from the
  // node type spec. But client code can use the `nodeViews` spec to
  // supply a custom node view, which can influence various aspects of
  // the way the node works.
  //
  // (Using subclassing for this was intentionally decided against,
  // since it'd require exposing a whole slew of finicky
  // implementation details to the user code that they probably will
  // never need.)
  static create(e, t, r, s, i, o) {
    let l = i.nodeViews[t.type.name], a, c = l && l(t, i, () => {
      if (!a)
        return o;
      if (a.parent)
        return a.parent.posBeforeChild(a);
    }, r, s), u = c && c.dom, d = c && c.contentDOM;
    if (t.isText) {
      if (!u)
        u = document.createTextNode(t.text);
      else if (u.nodeType != 3)
        throw new RangeError("Text must be rendered as a DOM text node");
    } else u || ({ dom: u, contentDOM: d } = Mn.renderSpec(document, t.type.spec.toDOM(t), null, t.attrs));
    !d && !t.isText && u.nodeName != "BR" && (u.hasAttribute("contenteditable") || (u.contentEditable = "false"), t.type.spec.draggable && (u.draggable = !0));
    let f = u;
    return u = Cd(u, r, t), c ? a = new ng(e, t, r, s, u, d || null, f, c, i, o + 1) : t.isText ? new li(e, t, r, s, u, f, i) : new Yt(e, t, r, s, u, d || null, f, i, o + 1);
  }
  parseRule() {
    if (this.node.type.spec.reparseInView)
      return null;
    let e = { node: this.node.type.name, attrs: this.node.attrs };
    if (this.node.type.whitespace == "pre" && (e.preserveWhitespace = "full"), !this.contentDOM)
      e.getContent = () => this.node.content;
    else if (!this.contentLost)
      e.contentElement = this.contentDOM;
    else {
      for (let t = this.children.length - 1; t >= 0; t--) {
        let r = this.children[t];
        if (this.dom.contains(r.dom.parentNode)) {
          e.contentElement = r.dom.parentNode;
          break;
        }
      }
      e.contentElement || (e.getContent = () => A.empty);
    }
    return e;
  }
  matchesNode(e, t, r) {
    return this.dirty == ht && e.eq(this.node) && ps(t, this.outerDeco) && r.eq(this.innerDeco);
  }
  get size() {
    return this.node.nodeSize;
  }
  get border() {
    return this.node.isLeaf ? 0 : 1;
  }
  // Syncs `this.children` to match `this.node.content` and the local
  // decorations, possibly introducing nesting for marks. Then, in a
  // separate step, syncs the DOM inside `this.contentDOM` to
  // `this.children`.
  updateChildren(e, t) {
    let r = this.node.inlineContent, s = t, i = e.composing ? this.localCompositionInfo(e, t) : null, o = i && i.pos > -1 ? i : null, l = i && i.pos < 0, a = new sg(this, o && o.node, e);
    lg(this.node, this.innerDeco, (c, u, d) => {
      c.spec.marks ? a.syncToMarks(c.spec.marks, r, e) : c.type.side >= 0 && !d && a.syncToMarks(u == this.node.childCount ? ae.none : this.node.child(u).marks, r, e), a.placeWidget(c, e, s);
    }, (c, u, d, f) => {
      a.syncToMarks(c.marks, r, e);
      let h;
      a.findNodeMatch(c, u, d, f) || l && e.state.selection.from > s && e.state.selection.to < s + c.nodeSize && (h = a.findIndexWithChild(i.node)) > -1 && a.updateNodeAt(c, u, d, h, e) || a.updateNextNode(c, u, d, e, f, s) || a.addNode(c, u, d, e, s), s += c.nodeSize;
    }), a.syncToMarks([], r, e), this.node.isTextblock && a.addTextblockHacks(), a.destroyRest(), (a.changed || this.dirty == dn) && (o && this.protectLocalComposition(e, o), Sd(this.contentDOM, this.children, e), Yn && ag(this.dom));
  }
  localCompositionInfo(e, t) {
    let { from: r, to: s } = e.state.selection;
    if (!(e.state.selection instanceof q) || r < t || s > t + this.node.content.size)
      return null;
    let i = e.input.compositionNode;
    if (!i || !this.dom.contains(i.parentNode))
      return null;
    if (this.node.inlineContent) {
      let o = i.nodeValue, l = cg(this.node.content, o, r - t, s - t);
      return l < 0 ? null : { node: i, pos: l, text: o };
    } else
      return { node: i, pos: -1, text: "" };
  }
  protectLocalComposition(e, { node: t, pos: r, text: s }) {
    if (this.getDesc(t))
      return;
    let i = t;
    for (; i.parentNode != this.contentDOM; i = i.parentNode) {
      for (; i.previousSibling; )
        i.parentNode.removeChild(i.previousSibling);
      for (; i.nextSibling; )
        i.parentNode.removeChild(i.nextSibling);
      i.pmViewDesc && (i.pmViewDesc = void 0);
    }
    let o = new tg(this, i, t, s);
    e.input.compositionNodes.push(o), this.children = Ro(this.children, r, r + s.length, e, o);
  }
  // If this desc must be updated to match the given node decoration,
  // do so and return true.
  update(e, t, r, s) {
    return this.dirty == wt || !e.sameMarkup(this.node) ? !1 : (this.updateInner(e, t, r, s), !0);
  }
  updateInner(e, t, r, s) {
    this.updateOuterDeco(t), this.node = e, this.innerDeco = r, this.contentDOM && this.updateChildren(s, this.posAtStart), this.dirty = ht;
  }
  updateOuterDeco(e) {
    if (ps(e, this.outerDeco))
      return;
    let t = this.nodeDOM.nodeType != 1, r = this.dom;
    this.dom = wd(this.dom, this.nodeDOM, Oo(this.outerDeco, this.node, t), Oo(e, this.node, t)), this.dom != r && (r.pmViewDesc = void 0, this.dom.pmViewDesc = this), this.outerDeco = e;
  }
  // Mark this node as being the selected node.
  selectNode() {
    this.nodeDOM.nodeType == 1 && (this.nodeDOM.classList.add("ProseMirror-selectednode"), (this.contentDOM || !this.node.type.spec.draggable) && (this.nodeDOM.draggable = !0));
  }
  // Remove selected node marking from this node.
  deselectNode() {
    this.nodeDOM.nodeType == 1 && (this.nodeDOM.classList.remove("ProseMirror-selectednode"), (this.contentDOM || !this.node.type.spec.draggable) && this.nodeDOM.removeAttribute("draggable"));
  }
  get domAtom() {
    return this.node.isAtom;
  }
}
function Fa(n, e, t, r, s) {
  Cd(r, e, n);
  let i = new Yt(void 0, n, e, t, r, r, r, s, 0);
  return i.contentDOM && i.updateChildren(s, 0), i;
}
class li extends Yt {
  constructor(e, t, r, s, i, o, l) {
    super(e, t, r, s, i, null, o, l, 0);
  }
  parseRule() {
    let e = this.nodeDOM.parentNode;
    for (; e && e != this.dom && !e.pmIsDeco; )
      e = e.parentNode;
    return { skip: e || !0 };
  }
  update(e, t, r, s) {
    return this.dirty == wt || this.dirty != ht && !this.inParent() || !e.sameMarkup(this.node) ? !1 : (this.updateOuterDeco(t), (this.dirty != ht || e.text != this.node.text) && e.text != this.nodeDOM.nodeValue && (this.nodeDOM.nodeValue = e.text, s.trackWrites == this.nodeDOM && (s.trackWrites = null)), this.node = e, this.dirty = ht, !0);
  }
  inParent() {
    let e = this.parent.contentDOM;
    for (let t = this.nodeDOM; t; t = t.parentNode)
      if (t == e)
        return !0;
    return !1;
  }
  domFromPos(e) {
    return { node: this.nodeDOM, offset: e };
  }
  localPosFromDOM(e, t, r) {
    return e == this.nodeDOM ? this.posAtStart + Math.min(t, this.node.text.length) : super.localPosFromDOM(e, t, r);
  }
  ignoreMutation(e) {
    return e.type != "characterData" && e.type != "selection";
  }
  slice(e, t, r) {
    let s = this.node.cut(e, t), i = document.createTextNode(s.text);
    return new li(this.parent, s, this.outerDeco, this.innerDeco, i, i, r);
  }
  markDirty(e, t) {
    super.markDirty(e, t), this.dom != this.nodeDOM && (e == 0 || t == this.nodeDOM.nodeValue.length) && (this.dirty = wt);
  }
  get domAtom() {
    return !1;
  }
  isText(e) {
    return this.node.text == e;
  }
}
class vd extends Br {
  parseRule() {
    return { ignore: !0 };
  }
  matchesHack(e) {
    return this.dirty == ht && this.dom.nodeName == e;
  }
  get domAtom() {
    return !0;
  }
  get ignoreForCoords() {
    return this.dom.nodeName == "IMG";
  }
}
class ng extends Yt {
  constructor(e, t, r, s, i, o, l, a, c, u) {
    super(e, t, r, s, i, o, l, c, u), this.spec = a;
  }
  // A custom `update` method gets to decide whether the update goes
  // through. If it does, and there's a `contentDOM` node, our logic
  // updates the children.
  update(e, t, r, s) {
    if (this.dirty == wt)
      return !1;
    if (this.spec.update && (this.node.type == e.type || this.spec.multiType)) {
      let i = this.spec.update(e, t, r);
      return i && this.updateInner(e, t, r, s), i;
    } else return !this.contentDOM && !e.isLeaf ? !1 : super.update(e, t, r, s);
  }
  selectNode() {
    this.spec.selectNode ? this.spec.selectNode() : super.selectNode();
  }
  deselectNode() {
    this.spec.deselectNode ? this.spec.deselectNode() : super.deselectNode();
  }
  setSelection(e, t, r, s) {
    this.spec.setSelection ? this.spec.setSelection(e, t, r.root) : super.setSelection(e, t, r, s);
  }
  destroy() {
    this.spec.destroy && this.spec.destroy(), super.destroy();
  }
  stopEvent(e) {
    return this.spec.stopEvent ? this.spec.stopEvent(e) : !1;
  }
  ignoreMutation(e) {
    return this.spec.ignoreMutation ? this.spec.ignoreMutation(e) : super.ignoreMutation(e);
  }
}
function Sd(n, e, t) {
  let r = n.firstChild, s = !1;
  for (let i = 0; i < e.length; i++) {
    let o = e[i], l = o.dom;
    if (l.parentNode == n) {
      for (; l != r; )
        r = Va(r), s = !0;
      r = r.nextSibling;
    } else
      s = !0, n.insertBefore(l, r);
    if (o instanceof wn) {
      let a = r ? r.previousSibling : n.lastChild;
      Sd(o.contentDOM, o.children, t), r = a ? a.nextSibling : n.firstChild;
    }
  }
  for (; r; )
    r = Va(r), s = !0;
  s && t.trackWrites == n && (t.trackWrites = null);
}
const pr = function(n) {
  n && (this.nodeName = n);
};
pr.prototype = /* @__PURE__ */ Object.create(null);
const fn = [new pr()];
function Oo(n, e, t) {
  if (n.length == 0)
    return fn;
  let r = t ? fn[0] : new pr(), s = [r];
  for (let i = 0; i < n.length; i++) {
    let o = n[i].type.attrs;
    if (o) {
      o.nodeName && s.push(r = new pr(o.nodeName));
      for (let l in o) {
        let a = o[l];
        a != null && (t && s.length == 1 && s.push(r = new pr(e.isInline ? "span" : "div")), l == "class" ? r.class = (r.class ? r.class + " " : "") + a : l == "style" ? r.style = (r.style ? r.style + ";" : "") + a : l != "nodeName" && (r[l] = a));
      }
    }
  }
  return s;
}
function wd(n, e, t, r) {
  if (t == fn && r == fn)
    return e;
  let s = e;
  for (let i = 0; i < r.length; i++) {
    let o = r[i], l = t[i];
    if (i) {
      let a;
      l && l.nodeName == o.nodeName && s != n && (a = s.parentNode) && a.nodeName.toLowerCase() == o.nodeName || (a = document.createElement(o.nodeName), a.pmIsDeco = !0, a.appendChild(s), l = fn[0]), s = a;
    }
    rg(s, l || fn[0], o);
  }
  return s;
}
function rg(n, e, t) {
  for (let r in e)
    r != "class" && r != "style" && r != "nodeName" && !(r in t) && n.removeAttribute(r);
  for (let r in t)
    r != "class" && r != "style" && r != "nodeName" && t[r] != e[r] && n.setAttribute(r, t[r]);
  if (e.class != t.class) {
    let r = e.class ? e.class.split(" ").filter(Boolean) : [], s = t.class ? t.class.split(" ").filter(Boolean) : [];
    for (let i = 0; i < r.length; i++)
      s.indexOf(r[i]) == -1 && n.classList.remove(r[i]);
    for (let i = 0; i < s.length; i++)
      r.indexOf(s[i]) == -1 && n.classList.add(s[i]);
    n.classList.length == 0 && n.removeAttribute("class");
  }
  if (e.style != t.style) {
    if (e.style) {
      let r = /\s*([\w\-\xa1-\uffff]+)\s*:(?:"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\(.*?\)|[^;])*/g, s;
      for (; s = r.exec(e.style); )
        n.style.removeProperty(s[1]);
    }
    t.style && (n.style.cssText += t.style);
  }
}
function Cd(n, e, t) {
  return wd(n, n, fn, Oo(e, t, n.nodeType != 1));
}
function ps(n, e) {
  if (n.length != e.length)
    return !1;
  for (let t = 0; t < n.length; t++)
    if (!n[t].type.eq(e[t].type))
      return !1;
  return !0;
}
function Va(n) {
  let e = n.nextSibling;
  return n.parentNode.removeChild(n), e;
}
class sg {
  constructor(e, t, r) {
    this.lock = t, this.view = r, this.index = 0, this.stack = [], this.changed = !1, this.top = e, this.preMatch = ig(e.node.content, e);
  }
  // Destroy and remove the children between the given indices in
  // `this.top`.
  destroyBetween(e, t) {
    if (e != t) {
      for (let r = e; r < t; r++)
        this.top.children[r].destroy();
      this.top.children.splice(e, t - e), this.changed = !0;
    }
  }
  // Destroy all remaining children in `this.top`.
  destroyRest() {
    this.destroyBetween(this.index, this.top.children.length);
  }
  // Sync the current stack of mark descs with the given array of
  // marks, reusing existing mark descs when possible.
  syncToMarks(e, t, r) {
    let s = 0, i = this.stack.length >> 1, o = Math.min(i, e.length);
    for (; s < o && (s == i - 1 ? this.top : this.stack[s + 1 << 1]).matchesMark(e[s]) && e[s].type.spec.spanning !== !1; )
      s++;
    for (; s < i; )
      this.destroyRest(), this.top.dirty = ht, this.index = this.stack.pop(), this.top = this.stack.pop(), i--;
    for (; i < e.length; ) {
      this.stack.push(this.top, this.index + 1);
      let l = -1;
      for (let a = this.index; a < Math.min(this.index + 3, this.top.children.length); a++) {
        let c = this.top.children[a];
        if (c.matchesMark(e[i]) && !this.isLocked(c.dom)) {
          l = a;
          break;
        }
      }
      if (l > -1)
        l > this.index && (this.changed = !0, this.destroyBetween(this.index, l)), this.top = this.top.children[this.index];
      else {
        let a = wn.create(this.top, e[i], t, r);
        this.top.children.splice(this.index, 0, a), this.top = a, this.changed = !0;
      }
      this.index = 0, i++;
    }
  }
  // Try to find a node desc matching the given data. Skip over it and
  // return true when successful.
  findNodeMatch(e, t, r, s) {
    let i = -1, o;
    if (s >= this.preMatch.index && (o = this.preMatch.matches[s - this.preMatch.index]).parent == this.top && o.matchesNode(e, t, r))
      i = this.top.children.indexOf(o, this.index);
    else
      for (let l = this.index, a = Math.min(this.top.children.length, l + 5); l < a; l++) {
        let c = this.top.children[l];
        if (c.matchesNode(e, t, r) && !this.preMatch.matched.has(c)) {
          i = l;
          break;
        }
      }
    return i < 0 ? !1 : (this.destroyBetween(this.index, i), this.index++, !0);
  }
  updateNodeAt(e, t, r, s, i) {
    let o = this.top.children[s];
    return o.dirty == wt && o.dom == o.contentDOM && (o.dirty = dn), o.update(e, t, r, i) ? (this.destroyBetween(this.index, s), this.index++, !0) : !1;
  }
  findIndexWithChild(e) {
    for (; ; ) {
      let t = e.parentNode;
      if (!t)
        return -1;
      if (t == this.top.contentDOM) {
        let r = e.pmViewDesc;
        if (r) {
          for (let s = this.index; s < this.top.children.length; s++)
            if (this.top.children[s] == r)
              return s;
        }
        return -1;
      }
      e = t;
    }
  }
  // Try to update the next node, if any, to the given data. Checks
  // pre-matches to avoid overwriting nodes that could still be used.
  updateNextNode(e, t, r, s, i, o) {
    for (let l = this.index; l < this.top.children.length; l++) {
      let a = this.top.children[l];
      if (a instanceof Yt) {
        let c = this.preMatch.matched.get(a);
        if (c != null && c != i)
          return !1;
        let u = a.dom, d, f = this.isLocked(u) && !(e.isText && a.node && a.node.isText && a.nodeDOM.nodeValue == e.text && a.dirty != wt && ps(t, a.outerDeco));
        if (!f && a.update(e, t, r, s))
          return this.destroyBetween(this.index, l), a.dom != u && (this.changed = !0), this.index++, !0;
        if (!f && (d = this.recreateWrapper(a, e, t, r, s, o)))
          return this.destroyBetween(this.index, l), this.top.children[this.index] = d, d.contentDOM && (d.dirty = dn, d.updateChildren(s, o + 1), d.dirty = ht), this.changed = !0, this.index++, !0;
        break;
      }
    }
    return !1;
  }
  // When a node with content is replaced by a different node with
  // identical content, move over its children.
  recreateWrapper(e, t, r, s, i, o) {
    if (e.dirty || t.isAtom || !e.children.length || !e.node.content.eq(t.content) || !ps(r, e.outerDeco) || !s.eq(e.innerDeco))
      return null;
    let l = Yt.create(this.top, t, r, s, i, o);
    if (l.contentDOM) {
      l.children = e.children, e.children = [];
      for (let a of l.children)
        a.parent = l;
    }
    return e.destroy(), l;
  }
  // Insert the node as a newly created node desc.
  addNode(e, t, r, s, i) {
    let o = Yt.create(this.top, e, t, r, s, i);
    o.contentDOM && o.updateChildren(s, i + 1), this.top.children.splice(this.index++, 0, o), this.changed = !0;
  }
  placeWidget(e, t, r) {
    let s = this.index < this.top.children.length ? this.top.children[this.index] : null;
    if (s && s.matchesWidget(e) && (e == s.widget || !s.widget.type.toDOM.parentNode))
      this.index++;
    else {
      let i = new kd(this.top, e, t, r);
      this.top.children.splice(this.index++, 0, i), this.changed = !0;
    }
  }
  // Make sure a textblock looks and behaves correctly in
  // contentEditable.
  addTextblockHacks() {
    let e = this.top.children[this.index - 1], t = this.top;
    for (; e instanceof wn; )
      t = e, e = t.children[t.children.length - 1];
    (!e || // Empty textblock
    !(e instanceof li) || /\n$/.test(e.node.text) || this.view.requiresGeckoHackNode && /\s$/.test(e.node.text)) && ((He || Ie) && e && e.dom.contentEditable == "false" && this.addHackNode("IMG", t), this.addHackNode("BR", this.top));
  }
  addHackNode(e, t) {
    if (t == this.top && this.index < t.children.length && t.children[this.index].matchesHack(e))
      this.index++;
    else {
      let r = document.createElement(e);
      e == "IMG" && (r.className = "ProseMirror-separator", r.alt = ""), e == "BR" && (r.className = "ProseMirror-trailingBreak");
      let s = new vd(this.top, [], r, null);
      t != this.top ? t.children.push(s) : t.children.splice(this.index++, 0, s), this.changed = !0;
    }
  }
  isLocked(e) {
    return this.lock && (e == this.lock || e.nodeType == 1 && e.contains(this.lock.parentNode));
  }
}
function ig(n, e) {
  let t = e, r = t.children.length, s = n.childCount, i = /* @__PURE__ */ new Map(), o = [];
  e: for (; s > 0; ) {
    let l;
    for (; ; )
      if (r) {
        let c = t.children[r - 1];
        if (c instanceof wn)
          t = c, r = c.children.length;
        else {
          l = c, r--;
          break;
        }
      } else {
        if (t == e)
          break e;
        r = t.parent.children.indexOf(t), t = t.parent;
      }
    let a = l.node;
    if (a) {
      if (a != n.child(s - 1))
        break;
      --s, i.set(l, s), o.push(l);
    }
  }
  return { index: s, matched: i, matches: o.reverse() };
}
function og(n, e) {
  return n.type.side - e.type.side;
}
function lg(n, e, t, r) {
  let s = e.locals(n), i = 0;
  if (s.length == 0) {
    for (let c = 0; c < n.childCount; c++) {
      let u = n.child(c);
      r(u, s, e.forChild(i, u), c), i += u.nodeSize;
    }
    return;
  }
  let o = 0, l = [], a = null;
  for (let c = 0; ; ) {
    let u, d;
    for (; o < s.length && s[o].to == i; ) {
      let g = s[o++];
      g.widget && (u ? (d || (d = [u])).push(g) : u = g);
    }
    if (u)
      if (d) {
        d.sort(og);
        for (let g = 0; g < d.length; g++)
          t(d[g], c, !!a);
      } else
        t(u, c, !!a);
    let f, h;
    if (a)
      h = -1, f = a, a = null;
    else if (c < n.childCount)
      h = c, f = n.child(c++);
    else
      break;
    for (let g = 0; g < l.length; g++)
      l[g].to <= i && l.splice(g--, 1);
    for (; o < s.length && s[o].from <= i && s[o].to > i; )
      l.push(s[o++]);
    let p = i + f.nodeSize;
    if (f.isText) {
      let g = p;
      o < s.length && s[o].from < g && (g = s[o].from);
      for (let y = 0; y < l.length; y++)
        l[y].to < g && (g = l[y].to);
      g < p && (a = f.cut(g - i), f = f.cut(0, g - i), p = g, h = -1);
    } else
      for (; o < s.length && s[o].to < p; )
        o++;
    let m = f.isInline && !f.isLeaf ? l.filter((g) => !g.inline) : l.slice();
    r(f, m, e.forChild(i, f), h), i = p;
  }
}
function ag(n) {
  if (n.nodeName == "UL" || n.nodeName == "OL") {
    let e = n.style.cssText;
    n.style.cssText = e + "; list-style: square !important", window.getComputedStyle(n).listStyle, n.style.cssText = e;
  }
}
function cg(n, e, t, r) {
  for (let s = 0, i = 0; s < n.childCount && i <= r; ) {
    let o = n.child(s++), l = i;
    if (i += o.nodeSize, !o.isText)
      continue;
    let a = o.text;
    for (; s < n.childCount; ) {
      let c = n.child(s++);
      if (i += c.nodeSize, !c.isText)
        break;
      a += c.text;
    }
    if (i >= t) {
      if (i >= r && a.slice(r - e.length - l, r - l) == e)
        return r - e.length;
      let c = l < r ? a.lastIndexOf(e, r - l - 1) : -1;
      if (c >= 0 && c + e.length + l >= t)
        return l + c;
      if (t == r && a.length >= r + e.length - l && a.slice(r - l, r - l + e.length) == e)
        return r;
    }
  }
  return -1;
}
function Ro(n, e, t, r, s) {
  let i = [];
  for (let o = 0, l = 0; o < n.length; o++) {
    let a = n[o], c = l, u = l += a.size;
    c >= t || u <= e ? i.push(a) : (c < e && i.push(a.slice(0, e - c, r)), s && (i.push(s), s = void 0), u > t && i.push(a.slice(t - c, a.size, r)));
  }
  return i;
}
function bl(n, e = null) {
  let t = n.domSelectionRange(), r = n.state.doc;
  if (!t.focusNode)
    return null;
  let s = n.docView.nearestDesc(t.focusNode), i = s && s.size == 0, o = n.docView.posFromDOM(t.focusNode, t.focusOffset, 1);
  if (o < 0)
    return null;
  let l = r.resolve(o), a, c;
  if (oi(t)) {
    for (a = o; s && !s.node; )
      s = s.parent;
    let d = s.node;
    if (s && d.isAtom && j.isSelectable(d) && s.parent && !(d.isInline && _m(t.focusNode, t.focusOffset, s.dom))) {
      let f = s.posBefore;
      c = new j(o == f ? l : r.resolve(f));
    }
  } else {
    if (t instanceof n.dom.ownerDocument.defaultView.Selection && t.rangeCount > 1) {
      let d = o, f = o;
      for (let h = 0; h < t.rangeCount; h++) {
        let p = t.getRangeAt(h);
        d = Math.min(d, n.docView.posFromDOM(p.startContainer, p.startOffset, 1)), f = Math.max(f, n.docView.posFromDOM(p.endContainer, p.endOffset, -1));
      }
      if (d < 0)
        return null;
      [a, o] = f == n.state.selection.anchor ? [f, d] : [d, f], l = r.resolve(o);
    } else
      a = n.docView.posFromDOM(t.anchorNode, t.anchorOffset, 1);
    if (a < 0)
      return null;
  }
  let u = r.resolve(a);
  if (!c) {
    let d = e == "pointer" || n.state.selection.head < l.pos && !i ? 1 : -1;
    c = xl(n, u, l, d);
  }
  return c;
}
function Ed(n) {
  return n.editable ? n.hasFocus() : Td(n) && document.activeElement && document.activeElement.contains(n.dom);
}
function It(n, e = !1) {
  let t = n.state.selection;
  if (Md(n, t), !!Ed(n)) {
    if (!e && n.input.mouseDown && n.input.mouseDown.allowDefault && Ie) {
      let r = n.domSelectionRange(), s = n.domObserver.currentSelection;
      if (r.anchorNode && s.anchorNode && Sn(r.anchorNode, r.anchorOffset, s.anchorNode, s.anchorOffset)) {
        n.input.mouseDown.delayedSelectionSync = !0, n.domObserver.setCurSelection();
        return;
      }
    }
    if (n.domObserver.disconnectSelection(), n.cursorWrapper)
      dg(n);
    else {
      let { anchor: r, head: s } = t, i, o;
      za && !(t instanceof q) && (t.$from.parent.inlineContent || (i = ja(n, t.from)), !t.empty && !t.$from.parent.inlineContent && (o = ja(n, t.to))), n.docView.setSelection(r, s, n, e), za && (i && $a(i), o && $a(o)), t.visible ? n.dom.classList.remove("ProseMirror-hideselection") : (n.dom.classList.add("ProseMirror-hideselection"), "onselectionchange" in document && ug(n));
    }
    n.domObserver.setCurSelection(), n.domObserver.connectSelection();
  }
}
const za = He || Ie && fd < 63;
function ja(n, e) {
  let { node: t, offset: r } = n.docView.domFromPos(e, 0), s = r < t.childNodes.length ? t.childNodes[r] : null, i = r ? t.childNodes[r - 1] : null;
  if (He && s && s.contentEditable == "false")
    return zi(s);
  if ((!s || s.contentEditable == "false") && (!i || i.contentEditable == "false")) {
    if (s)
      return zi(s);
    if (i)
      return zi(i);
  }
}
function zi(n) {
  return n.contentEditable = "true", He && n.draggable && (n.draggable = !1, n.wasDraggable = !0), n;
}
function $a(n) {
  n.contentEditable = "false", n.wasDraggable && (n.draggable = !0, n.wasDraggable = null);
}
function ug(n) {
  let e = n.dom.ownerDocument;
  e.removeEventListener("selectionchange", n.input.hideSelectionGuard);
  let t = n.domSelectionRange(), r = t.anchorNode, s = t.anchorOffset;
  e.addEventListener("selectionchange", n.input.hideSelectionGuard = () => {
    (t.anchorNode != r || t.anchorOffset != s) && (e.removeEventListener("selectionchange", n.input.hideSelectionGuard), setTimeout(() => {
      (!Ed(n) || n.state.selection.visible) && n.dom.classList.remove("ProseMirror-hideselection");
    }, 20));
  });
}
function dg(n) {
  let e = n.domSelection();
  if (!e)
    return;
  let t = n.cursorWrapper.dom, r = t.nodeName == "IMG";
  r ? e.collapse(t.parentNode, Ve(t) + 1) : e.collapse(t, 0), !r && !n.state.selection.visible && Ze && Gt <= 11 && (t.disabled = !0, t.disabled = !1);
}
function Md(n, e) {
  if (e instanceof j) {
    let t = n.docView.descAt(e.from);
    t != n.lastSelectedViewDesc && (Ha(n), t && t.selectNode(), n.lastSelectedViewDesc = t);
  } else
    Ha(n);
}
function Ha(n) {
  n.lastSelectedViewDesc && (n.lastSelectedViewDesc.parent && n.lastSelectedViewDesc.deselectNode(), n.lastSelectedViewDesc = void 0);
}
function xl(n, e, t, r) {
  return n.someProp("createSelectionBetween", (s) => s(n, e, t)) || q.between(e, t, r);
}
function Ua(n) {
  return n.editable && !n.hasFocus() ? !1 : Td(n);
}
function Td(n) {
  let e = n.domSelectionRange();
  if (!e.anchorNode)
    return !1;
  try {
    return n.dom.contains(e.anchorNode.nodeType == 3 ? e.anchorNode.parentNode : e.anchorNode) && (n.editable || n.dom.contains(e.focusNode.nodeType == 3 ? e.focusNode.parentNode : e.focusNode));
  } catch {
    return !1;
  }
}
function fg(n) {
  let e = n.docView.domFromPos(n.state.selection.anchor, 0), t = n.domSelectionRange();
  return Sn(e.node, e.offset, t.anchorNode, t.anchorOffset);
}
function Do(n, e) {
  let { $anchor: t, $head: r } = n.selection, s = e > 0 ? t.max(r) : t.min(r), i = s.parent.inlineContent ? s.depth ? n.doc.resolve(e > 0 ? s.after() : s.before()) : null : s;
  return i && Y.findFrom(i, e);
}
function zt(n, e) {
  return n.dispatch(n.state.tr.setSelection(e).scrollIntoView()), !0;
}
function Wa(n, e, t) {
  let r = n.state.selection;
  if (r instanceof q)
    if (t.indexOf("s") > -1) {
      let { $head: s } = r, i = s.textOffset ? null : e < 0 ? s.nodeBefore : s.nodeAfter;
      if (!i || i.isText || !i.isLeaf)
        return !1;
      let o = n.state.doc.resolve(s.pos + i.nodeSize * (e < 0 ? -1 : 1));
      return zt(n, new q(r.$anchor, o));
    } else if (r.empty) {
      if (n.endOfTextblock(e > 0 ? "forward" : "backward")) {
        let s = Do(n.state, e);
        return s && s instanceof j ? zt(n, s) : !1;
      } else if (!(ct && t.indexOf("m") > -1)) {
        let s = r.$head, i = s.textOffset ? null : e < 0 ? s.nodeBefore : s.nodeAfter, o;
        if (!i || i.isText)
          return !1;
        let l = e < 0 ? s.pos - i.nodeSize : s.pos;
        return i.isAtom || (o = n.docView.descAt(l)) && !o.contentDOM ? j.isSelectable(i) ? zt(n, new j(e < 0 ? n.state.doc.resolve(s.pos - i.nodeSize) : s)) : _r ? zt(n, new q(n.state.doc.resolve(e < 0 ? l : l + i.nodeSize))) : !1 : !1;
      }
    } else return !1;
  else {
    if (r instanceof j && r.node.isInline)
      return zt(n, new q(e > 0 ? r.$to : r.$from));
    {
      let s = Do(n.state, e);
      return s ? zt(n, s) : !1;
    }
  }
}
function ms(n) {
  return n.nodeType == 3 ? n.nodeValue.length : n.childNodes.length;
}
function mr(n, e) {
  let t = n.pmViewDesc;
  return t && t.size == 0 && (e < 0 || n.nextSibling || n.nodeName != "BR");
}
function Pn(n, e) {
  return e < 0 ? hg(n) : pg(n);
}
function hg(n) {
  let e = n.domSelectionRange(), t = e.focusNode, r = e.focusOffset;
  if (!t)
    return;
  let s, i, o = !1;
  for (ft && t.nodeType == 1 && r < ms(t) && mr(t.childNodes[r], -1) && (o = !0); ; )
    if (r > 0) {
      if (t.nodeType != 1)
        break;
      {
        let l = t.childNodes[r - 1];
        if (mr(l, -1))
          s = t, i = --r;
        else if (l.nodeType == 3)
          t = l, r = t.nodeValue.length;
        else
          break;
      }
    } else {
      if (Ad(t))
        break;
      {
        let l = t.previousSibling;
        for (; l && mr(l, -1); )
          s = t.parentNode, i = Ve(l), l = l.previousSibling;
        if (l)
          t = l, r = ms(t);
        else {
          if (t = t.parentNode, t == n.dom)
            break;
          r = 0;
        }
      }
    }
  o ? Io(n, t, r) : s && Io(n, s, i);
}
function pg(n) {
  let e = n.domSelectionRange(), t = e.focusNode, r = e.focusOffset;
  if (!t)
    return;
  let s = ms(t), i, o;
  for (; ; )
    if (r < s) {
      if (t.nodeType != 1)
        break;
      let l = t.childNodes[r];
      if (mr(l, 1))
        i = t, o = ++r;
      else
        break;
    } else {
      if (Ad(t))
        break;
      {
        let l = t.nextSibling;
        for (; l && mr(l, 1); )
          i = l.parentNode, o = Ve(l) + 1, l = l.nextSibling;
        if (l)
          t = l, r = 0, s = ms(t);
        else {
          if (t = t.parentNode, t == n.dom)
            break;
          r = s = 0;
        }
      }
    }
  i && Io(n, i, o);
}
function Ad(n) {
  let e = n.pmViewDesc;
  return e && e.node && e.node.isBlock;
}
function mg(n, e) {
  for (; n && e == n.childNodes.length && !Pr(n); )
    e = Ve(n) + 1, n = n.parentNode;
  for (; n && e < n.childNodes.length; ) {
    let t = n.childNodes[e];
    if (t.nodeType == 3)
      return t;
    if (t.nodeType == 1 && t.contentEditable == "false")
      break;
    n = t, e = 0;
  }
}
function gg(n, e) {
  for (; n && !e && !Pr(n); )
    e = Ve(n), n = n.parentNode;
  for (; n && e; ) {
    let t = n.childNodes[e - 1];
    if (t.nodeType == 3)
      return t;
    if (t.nodeType == 1 && t.contentEditable == "false")
      break;
    n = t, e = n.childNodes.length;
  }
}
function Io(n, e, t) {
  if (e.nodeType != 3) {
    let i, o;
    (o = mg(e, t)) ? (e = o, t = 0) : (i = gg(e, t)) && (e = i, t = i.nodeValue.length);
  }
  let r = n.domSelection();
  if (!r)
    return;
  if (oi(r)) {
    let i = document.createRange();
    i.setEnd(e, t), i.setStart(e, t), r.removeAllRanges(), r.addRange(i);
  } else r.extend && r.extend(e, t);
  n.domObserver.setCurSelection();
  let { state: s } = n;
  setTimeout(() => {
    n.state == s && It(n);
  }, 50);
}
function qa(n, e) {
  let t = n.state.doc.resolve(e);
  if (!(Ie || hd) && t.parent.inlineContent) {
    let s = n.coordsAtPos(e);
    if (e > t.start()) {
      let i = n.coordsAtPos(e - 1), o = (i.top + i.bottom) / 2;
      if (o > s.top && o < s.bottom && Math.abs(i.left - s.left) > 1)
        return i.left < s.left ? "ltr" : "rtl";
    }
    if (e < t.end()) {
      let i = n.coordsAtPos(e + 1), o = (i.top + i.bottom) / 2;
      if (o > s.top && o < s.bottom && Math.abs(i.left - s.left) > 1)
        return i.left > s.left ? "ltr" : "rtl";
    }
  }
  return getComputedStyle(n.dom).direction == "rtl" ? "rtl" : "ltr";
}
function Ka(n, e, t) {
  let r = n.state.selection;
  if (r instanceof q && !r.empty || t.indexOf("s") > -1 || ct && t.indexOf("m") > -1)
    return !1;
  let { $from: s, $to: i } = r;
  if (!s.parent.inlineContent || n.endOfTextblock(e < 0 ? "up" : "down")) {
    let o = Do(n.state, e);
    if (o && o instanceof j)
      return zt(n, o);
  }
  if (!s.parent.inlineContent) {
    let o = e < 0 ? s : i, l = r instanceof rt ? Y.near(o, e) : Y.findFrom(o, e);
    return l ? zt(n, l) : !1;
  }
  return !1;
}
function Ja(n, e) {
  if (!(n.state.selection instanceof q))
    return !0;
  let { $head: t, $anchor: r, empty: s } = n.state.selection;
  if (!t.sameParent(r))
    return !0;
  if (!s)
    return !1;
  if (n.endOfTextblock(e > 0 ? "forward" : "backward"))
    return !0;
  let i = !t.textOffset && (e < 0 ? t.nodeBefore : t.nodeAfter);
  if (i && !i.isText) {
    let o = n.state.tr;
    return e < 0 ? o.delete(t.pos - i.nodeSize, t.pos) : o.delete(t.pos, t.pos + i.nodeSize), n.dispatch(o), !0;
  }
  return !1;
}
function Ga(n, e, t) {
  n.domObserver.stop(), e.contentEditable = t, n.domObserver.start();
}
function yg(n) {
  if (!He || n.state.selection.$head.parentOffset > 0)
    return !1;
  let { focusNode: e, focusOffset: t } = n.domSelectionRange();
  if (e && e.nodeType == 1 && t == 0 && e.firstChild && e.firstChild.contentEditable == "false") {
    let r = e.firstChild;
    Ga(n, r, "true"), setTimeout(() => Ga(n, r, "false"), 20);
  }
  return !1;
}
function bg(n) {
  let e = "";
  return n.ctrlKey && (e += "c"), n.metaKey && (e += "m"), n.altKey && (e += "a"), n.shiftKey && (e += "s"), e;
}
function xg(n, e) {
  let t = e.keyCode, r = bg(e);
  if (t == 8 || ct && t == 72 && r == "c")
    return Ja(n, -1) || Pn(n, -1);
  if (t == 46 && !e.shiftKey || ct && t == 68 && r == "c")
    return Ja(n, 1) || Pn(n, 1);
  if (t == 13 || t == 27)
    return !0;
  if (t == 37 || ct && t == 66 && r == "c") {
    let s = t == 37 ? qa(n, n.state.selection.from) == "ltr" ? -1 : 1 : -1;
    return Wa(n, s, r) || Pn(n, s);
  } else if (t == 39 || ct && t == 70 && r == "c") {
    let s = t == 39 ? qa(n, n.state.selection.from) == "ltr" ? 1 : -1 : 1;
    return Wa(n, s, r) || Pn(n, s);
  } else {
    if (t == 38 || ct && t == 80 && r == "c")
      return Ka(n, -1, r) || Pn(n, -1);
    if (t == 40 || ct && t == 78 && r == "c")
      return yg(n) || Ka(n, 1, r) || Pn(n, 1);
    if (r == (ct ? "m" : "c") && (t == 66 || t == 73 || t == 89 || t == 90))
      return !0;
  }
  return !1;
}
function kl(n, e) {
  n.someProp("transformCopied", (h) => {
    e = h(e, n);
  });
  let t = [], { content: r, openStart: s, openEnd: i } = e;
  for (; s > 1 && i > 1 && r.childCount == 1 && r.firstChild.childCount == 1; ) {
    s--, i--;
    let h = r.firstChild;
    t.push(h.type.name, h.attrs != h.type.defaultAttrs ? h.attrs : null), r = h.content;
  }
  let o = n.someProp("clipboardSerializer") || Mn.fromSchema(n.state.schema), l = Ld(), a = l.createElement("div");
  a.appendChild(o.serializeFragment(r, { document: l }));
  let c = a.firstChild, u, d = 0;
  for (; c && c.nodeType == 1 && (u = Id[c.nodeName.toLowerCase()]); ) {
    for (let h = u.length - 1; h >= 0; h--) {
      let p = l.createElement(u[h]);
      for (; a.firstChild; )
        p.appendChild(a.firstChild);
      a.appendChild(p), d++;
    }
    c = a.firstChild;
  }
  c && c.nodeType == 1 && c.setAttribute("data-pm-slice", `${s} ${i}${d ? ` -${d}` : ""} ${JSON.stringify(t)}`);
  let f = n.someProp("clipboardTextSerializer", (h) => h(e, n)) || e.content.textBetween(0, e.content.size, `

`);
  return { dom: a, text: f, slice: e };
}
function Nd(n, e, t, r, s) {
  let i = s.parent.type.spec.code, o, l;
  if (!t && !e)
    return null;
  let a = !!e && (r || i || !t);
  if (a) {
    if (n.someProp("transformPastedText", (f) => {
      e = f(e, i || r, n);
    }), i)
      return l = new _(A.from(n.state.schema.text(e.replace(/\r\n?/g, `
`))), 0, 0), n.someProp("transformPasted", (f) => {
        l = f(l, n, !0);
      }), l;
    let d = n.someProp("clipboardTextParser", (f) => f(e, s, r, n));
    if (d)
      l = d;
    else {
      let f = s.marks(), { schema: h } = n.state, p = Mn.fromSchema(h);
      o = document.createElement("div"), e.split(/(?:\r\n?|\n)+/).forEach((m) => {
        let g = o.appendChild(document.createElement("p"));
        m && g.appendChild(p.serializeNode(h.text(m, f)));
      });
    }
  } else
    n.someProp("transformPastedHTML", (d) => {
      t = d(t, n);
    }), o = wg(t), _r && Cg(o);
  let c = o && o.querySelector("[data-pm-slice]"), u = c && /^(\d+) (\d+)(?: -(\d+))? (.*)/.exec(c.getAttribute("data-pm-slice") || "");
  if (u && u[3])
    for (let d = +u[3]; d > 0; d--) {
      let f = o.firstChild;
      for (; f && f.nodeType != 1; )
        f = f.nextSibling;
      if (!f)
        break;
      o = f;
    }
  if (l || (l = (n.someProp("clipboardParser") || n.someProp("domParser") || Jt.fromSchema(n.state.schema)).parseSlice(o, {
    preserveWhitespace: !!(a || u),
    context: s,
    ruleFromNode(f) {
      return f.nodeName == "BR" && !f.nextSibling && f.parentNode && !kg.test(f.parentNode.nodeName) ? { ignore: !0 } : null;
    }
  })), u)
    l = Eg(Ya(l, +u[1], +u[2]), u[4]);
  else if (l = _.maxOpen(vg(l.content, s), !0), l.openStart || l.openEnd) {
    let d = 0, f = 0;
    for (let h = l.content.firstChild; d < l.openStart && !h.type.spec.isolating; d++, h = h.firstChild)
      ;
    for (let h = l.content.lastChild; f < l.openEnd && !h.type.spec.isolating; f++, h = h.lastChild)
      ;
    l = Ya(l, d, f);
  }
  return n.someProp("transformPasted", (d) => {
    l = d(l, n, a);
  }), l;
}
const kg = /^(a|abbr|acronym|b|cite|code|del|em|i|ins|kbd|label|output|q|ruby|s|samp|span|strong|sub|sup|time|u|tt|var)$/i;
function vg(n, e) {
  if (n.childCount < 2)
    return n;
  for (let t = e.depth; t >= 0; t--) {
    let s = e.node(t).contentMatchAt(e.index(t)), i, o = [];
    if (n.forEach((l) => {
      if (!o)
        return;
      let a = s.findWrapping(l.type), c;
      if (!a)
        return o = null;
      if (c = o.length && i.length && Rd(a, i, l, o[o.length - 1], 0))
        o[o.length - 1] = c;
      else {
        o.length && (o[o.length - 1] = Dd(o[o.length - 1], i.length));
        let u = Od(l, a);
        o.push(u), s = s.matchType(u.type), i = a;
      }
    }), o)
      return A.from(o);
  }
  return n;
}
function Od(n, e, t = 0) {
  for (let r = e.length - 1; r >= t; r--)
    n = e[r].create(null, A.from(n));
  return n;
}
function Rd(n, e, t, r, s) {
  if (s < n.length && s < e.length && n[s] == e[s]) {
    let i = Rd(n, e, t, r.lastChild, s + 1);
    if (i)
      return r.copy(r.content.replaceChild(r.childCount - 1, i));
    if (r.contentMatchAt(r.childCount).matchType(s == n.length - 1 ? t.type : n[s + 1]))
      return r.copy(r.content.append(A.from(Od(t, n, s + 1))));
  }
}
function Dd(n, e) {
  if (e == 0)
    return n;
  let t = n.content.replaceChild(n.childCount - 1, Dd(n.lastChild, e - 1)), r = n.contentMatchAt(n.childCount).fillBefore(A.empty, !0);
  return n.copy(t.append(r));
}
function Lo(n, e, t, r, s, i) {
  let o = e < 0 ? n.firstChild : n.lastChild, l = o.content;
  return n.childCount > 1 && (i = 0), s < r - 1 && (l = Lo(l, e, t, r, s + 1, i)), s >= t && (l = e < 0 ? o.contentMatchAt(0).fillBefore(l, i <= s).append(l) : l.append(o.contentMatchAt(o.childCount).fillBefore(A.empty, !0))), n.replaceChild(e < 0 ? 0 : n.childCount - 1, o.copy(l));
}
function Ya(n, e, t) {
  return e < n.openStart && (n = new _(Lo(n.content, -1, e, n.openStart, 0, n.openEnd), e, n.openEnd)), t < n.openEnd && (n = new _(Lo(n.content, 1, t, n.openEnd, 0, 0), n.openStart, t)), n;
}
const Id = {
  thead: ["table"],
  tbody: ["table"],
  tfoot: ["table"],
  caption: ["table"],
  colgroup: ["table"],
  col: ["table", "colgroup"],
  tr: ["table", "tbody"],
  td: ["table", "tbody", "tr"],
  th: ["table", "tbody", "tr"]
};
let Xa = null;
function Ld() {
  return Xa || (Xa = document.implementation.createHTMLDocument("title"));
}
let ji = null;
function Sg(n) {
  let e = window.trustedTypes;
  return e ? (ji || (ji = e.defaultPolicy || e.createPolicy("ProseMirrorClipboard", { createHTML: (t) => t })), ji.createHTML(n)) : n;
}
function wg(n) {
  let e = /^(\s*<meta [^>]*>)*/.exec(n);
  e && (n = n.slice(e[0].length));
  let t = Ld().createElement("div"), r = /<([a-z][^>\s]+)/i.exec(n), s;
  if ((s = r && Id[r[1].toLowerCase()]) && (n = s.map((i) => "<" + i + ">").join("") + n + s.map((i) => "</" + i + ">").reverse().join("")), t.innerHTML = Sg(n), s)
    for (let i = 0; i < s.length; i++)
      t = t.querySelector(s[i]) || t;
  return t;
}
function Cg(n) {
  let e = n.querySelectorAll(Ie ? "span:not([class]):not([style])" : "span.Apple-converted-space");
  for (let t = 0; t < e.length; t++) {
    let r = e[t];
    r.childNodes.length == 1 && r.textContent == " " && r.parentNode && r.parentNode.replaceChild(n.ownerDocument.createTextNode(" "), r);
  }
}
function Eg(n, e) {
  if (!n.size)
    return n;
  let t = n.content.firstChild.type.schema, r;
  try {
    r = JSON.parse(e);
  } catch {
    return n;
  }
  let { content: s, openStart: i, openEnd: o } = n;
  for (let l = r.length - 2; l >= 0; l -= 2) {
    let a = t.nodes[r[l]];
    if (!a || a.hasRequiredAttrs())
      break;
    s = A.from(a.create(r[l + 1], s)), i++, o++;
  }
  return new _(s, i, o);
}
const Ke = {}, Je = {}, Mg = { touchstart: !0, touchmove: !0 };
class Tg {
  constructor() {
    this.shiftKey = !1, this.mouseDown = null, this.lastKeyCode = null, this.lastKeyCodeTime = 0, this.lastClick = { time: 0, x: 0, y: 0, type: "", button: 0 }, this.lastSelectionOrigin = null, this.lastSelectionTime = 0, this.lastIOSEnter = 0, this.lastIOSEnterFallbackTimeout = -1, this.lastFocus = 0, this.lastTouch = 0, this.lastChromeDelete = 0, this.composing = !1, this.compositionNode = null, this.composingTimeout = -1, this.compositionNodes = [], this.compositionEndedAt = -2e8, this.compositionID = 1, this.compositionPendingChanges = 0, this.domChangeCount = 0, this.eventHandlers = /* @__PURE__ */ Object.create(null), this.hideSelectionGuard = null;
  }
}
function Ag(n) {
  for (let e in Ke) {
    let t = Ke[e];
    n.dom.addEventListener(e, n.input.eventHandlers[e] = (r) => {
      Og(n, r) && !vl(n, r) && (n.editable || !(r.type in Je)) && t(n, r);
    }, Mg[e] ? { passive: !0 } : void 0);
  }
  He && n.dom.addEventListener("input", () => null), Po(n);
}
function Kt(n, e) {
  n.input.lastSelectionOrigin = e, n.input.lastSelectionTime = Date.now();
}
function Ng(n) {
  n.domObserver.stop();
  for (let e in n.input.eventHandlers)
    n.dom.removeEventListener(e, n.input.eventHandlers[e]);
  clearTimeout(n.input.composingTimeout), clearTimeout(n.input.lastIOSEnterFallbackTimeout);
}
function Po(n) {
  n.someProp("handleDOMEvents", (e) => {
    for (let t in e)
      n.input.eventHandlers[t] || n.dom.addEventListener(t, n.input.eventHandlers[t] = (r) => vl(n, r));
  });
}
function vl(n, e) {
  return n.someProp("handleDOMEvents", (t) => {
    let r = t[e.type];
    return r ? r(n, e) || e.defaultPrevented : !1;
  });
}
function Og(n, e) {
  if (!e.bubbles)
    return !0;
  if (e.defaultPrevented)
    return !1;
  for (let t = e.target; t != n.dom; t = t.parentNode)
    if (!t || t.nodeType == 11 || t.pmViewDesc && t.pmViewDesc.stopEvent(e))
      return !1;
  return !0;
}
function Rg(n, e) {
  !vl(n, e) && Ke[e.type] && (n.editable || !(e.type in Je)) && Ke[e.type](n, e);
}
Je.keydown = (n, e) => {
  let t = e;
  if (n.input.shiftKey = t.keyCode == 16 || t.shiftKey, !_d(n, t) && (n.input.lastKeyCode = t.keyCode, n.input.lastKeyCodeTime = Date.now(), !(Rt && Ie && t.keyCode == 13)))
    if (t.keyCode != 229 && n.domObserver.forceFlush(), Yn && t.keyCode == 13 && !t.ctrlKey && !t.altKey && !t.metaKey) {
      let r = Date.now();
      n.input.lastIOSEnter = r, n.input.lastIOSEnterFallbackTimeout = setTimeout(() => {
        n.input.lastIOSEnter == r && (n.someProp("handleKeyDown", (s) => s(n, an(13, "Enter"))), n.input.lastIOSEnter = 0);
      }, 200);
    } else n.someProp("handleKeyDown", (r) => r(n, t)) || xg(n, t) ? t.preventDefault() : Kt(n, "key");
};
Je.keyup = (n, e) => {
  e.keyCode == 16 && (n.input.shiftKey = !1);
};
Je.keypress = (n, e) => {
  let t = e;
  if (_d(n, t) || !t.charCode || t.ctrlKey && !t.altKey || ct && t.metaKey)
    return;
  if (n.someProp("handleKeyPress", (s) => s(n, t))) {
    t.preventDefault();
    return;
  }
  let r = n.state.selection;
  if (!(r instanceof q) || !r.$from.sameParent(r.$to)) {
    let s = String.fromCharCode(t.charCode), i = () => n.state.tr.insertText(s).scrollIntoView();
    !/[\r\n]/.test(s) && !n.someProp("handleTextInput", (o) => o(n, r.$from.pos, r.$to.pos, s, i)) && n.dispatch(i()), t.preventDefault();
  }
};
function ai(n) {
  return { left: n.clientX, top: n.clientY };
}
function Dg(n, e) {
  let t = e.x - n.clientX, r = e.y - n.clientY;
  return t * t + r * r < 100;
}
function Sl(n, e, t, r, s) {
  if (r == -1)
    return !1;
  let i = n.state.doc.resolve(r);
  for (let o = i.depth + 1; o > 0; o--)
    if (n.someProp(e, (l) => o > i.depth ? l(n, t, i.nodeAfter, i.before(o), s, !0) : l(n, t, i.node(o), i.before(o), s, !1)))
      return !0;
  return !1;
}
function qn(n, e, t) {
  if (n.focused || n.focus(), n.state.selection.eq(e))
    return;
  let r = n.state.tr.setSelection(e);
  r.setMeta("pointer", !0), n.dispatch(r);
}
function Ig(n, e) {
  if (e == -1)
    return !1;
  let t = n.state.doc.resolve(e), r = t.nodeAfter;
  return r && r.isAtom && j.isSelectable(r) ? (qn(n, new j(t)), !0) : !1;
}
function Lg(n, e) {
  if (e == -1)
    return !1;
  let t = n.state.selection, r, s;
  t instanceof j && (r = t.node);
  let i = n.state.doc.resolve(e);
  for (let o = i.depth + 1; o > 0; o--) {
    let l = o > i.depth ? i.nodeAfter : i.node(o);
    if (j.isSelectable(l)) {
      r && t.$from.depth > 0 && o >= t.$from.depth && i.before(t.$from.depth + 1) == t.$from.pos ? s = i.before(t.$from.depth) : s = i.before(o);
      break;
    }
  }
  return s != null ? (qn(n, j.create(n.state.doc, s)), !0) : !1;
}
function Pg(n, e, t, r, s) {
  return Sl(n, "handleClickOn", e, t, r) || n.someProp("handleClick", (i) => i(n, e, r)) || (s ? Lg(n, t) : Ig(n, t));
}
function _g(n, e, t, r) {
  return Sl(n, "handleDoubleClickOn", e, t, r) || n.someProp("handleDoubleClick", (s) => s(n, e, r));
}
function Bg(n, e, t, r) {
  return Sl(n, "handleTripleClickOn", e, t, r) || n.someProp("handleTripleClick", (s) => s(n, e, r)) || Fg(n, t, r);
}
function Fg(n, e, t) {
  if (t.button != 0)
    return !1;
  let r = n.state.doc;
  if (e == -1)
    return r.inlineContent ? (qn(n, q.create(r, 0, r.content.size)), !0) : !1;
  let s = r.resolve(e);
  for (let i = s.depth + 1; i > 0; i--) {
    let o = i > s.depth ? s.nodeAfter : s.node(i), l = s.before(i);
    if (o.inlineContent)
      qn(n, q.create(r, l + 1, l + 1 + o.content.size));
    else if (j.isSelectable(o))
      qn(n, j.create(r, l));
    else
      continue;
    return !0;
  }
}
function wl(n) {
  return gs(n);
}
const Pd = ct ? "metaKey" : "ctrlKey";
Ke.mousedown = (n, e) => {
  let t = e;
  n.input.shiftKey = t.shiftKey;
  let r = wl(n), s = Date.now(), i = "singleClick";
  s - n.input.lastClick.time < 500 && Dg(t, n.input.lastClick) && !t[Pd] && n.input.lastClick.button == t.button && (n.input.lastClick.type == "singleClick" ? i = "doubleClick" : n.input.lastClick.type == "doubleClick" && (i = "tripleClick")), n.input.lastClick = { time: s, x: t.clientX, y: t.clientY, type: i, button: t.button };
  let o = n.posAtCoords(ai(t));
  o && (i == "singleClick" ? (n.input.mouseDown && n.input.mouseDown.done(), n.input.mouseDown = new Vg(n, o, t, !!r)) : (i == "doubleClick" ? _g : Bg)(n, o.pos, o.inside, t) ? t.preventDefault() : Kt(n, "pointer"));
};
class Vg {
  constructor(e, t, r, s) {
    this.view = e, this.pos = t, this.event = r, this.flushed = s, this.delayedSelectionSync = !1, this.mightDrag = null, this.startDoc = e.state.doc, this.selectNode = !!r[Pd], this.allowDefault = r.shiftKey;
    let i, o;
    if (t.inside > -1)
      i = e.state.doc.nodeAt(t.inside), o = t.inside;
    else {
      let u = e.state.doc.resolve(t.pos);
      i = u.parent, o = u.depth ? u.before() : 0;
    }
    const l = s ? null : r.target, a = l ? e.docView.nearestDesc(l, !0) : null;
    this.target = a && a.nodeDOM.nodeType == 1 ? a.nodeDOM : null;
    let { selection: c } = e.state;
    (r.button == 0 && i.type.spec.draggable && i.type.spec.selectable !== !1 || c instanceof j && c.from <= o && c.to > o) && (this.mightDrag = {
      node: i,
      pos: o,
      addAttr: !!(this.target && !this.target.draggable),
      setUneditable: !!(this.target && ft && !this.target.hasAttribute("contentEditable"))
    }), this.target && this.mightDrag && (this.mightDrag.addAttr || this.mightDrag.setUneditable) && (this.view.domObserver.stop(), this.mightDrag.addAttr && (this.target.draggable = !0), this.mightDrag.setUneditable && setTimeout(() => {
      this.view.input.mouseDown == this && this.target.setAttribute("contentEditable", "false");
    }, 20), this.view.domObserver.start()), e.root.addEventListener("mouseup", this.up = this.up.bind(this)), e.root.addEventListener("mousemove", this.move = this.move.bind(this)), Kt(e, "pointer");
  }
  done() {
    this.view.root.removeEventListener("mouseup", this.up), this.view.root.removeEventListener("mousemove", this.move), this.mightDrag && this.target && (this.view.domObserver.stop(), this.mightDrag.addAttr && this.target.removeAttribute("draggable"), this.mightDrag.setUneditable && this.target.removeAttribute("contentEditable"), this.view.domObserver.start()), this.delayedSelectionSync && setTimeout(() => It(this.view)), this.view.input.mouseDown = null;
  }
  up(e) {
    if (this.done(), !this.view.dom.contains(e.target))
      return;
    let t = this.pos;
    this.view.state.doc != this.startDoc && (t = this.view.posAtCoords(ai(e))), this.updateAllowDefault(e), this.allowDefault || !t ? Kt(this.view, "pointer") : Pg(this.view, t.pos, t.inside, e, this.selectNode) ? e.preventDefault() : e.button == 0 && (this.flushed || // Safari ignores clicks on draggable elements
    He && this.mightDrag && !this.mightDrag.node.isAtom || // Chrome will sometimes treat a node selection as a
    // cursor, but still report that the node is selected
    // when asked through getSelection. You'll then get a
    // situation where clicking at the point where that
    // (hidden) cursor is doesn't change the selection, and
    // thus doesn't get a reaction from ProseMirror. This
    // works around that.
    Ie && !this.view.state.selection.visible && Math.min(Math.abs(t.pos - this.view.state.selection.from), Math.abs(t.pos - this.view.state.selection.to)) <= 2) ? (qn(this.view, Y.near(this.view.state.doc.resolve(t.pos))), e.preventDefault()) : Kt(this.view, "pointer");
  }
  move(e) {
    this.updateAllowDefault(e), Kt(this.view, "pointer"), e.buttons == 0 && this.done();
  }
  updateAllowDefault(e) {
    !this.allowDefault && (Math.abs(this.event.x - e.clientX) > 4 || Math.abs(this.event.y - e.clientY) > 4) && (this.allowDefault = !0);
  }
}
Ke.touchstart = (n) => {
  n.input.lastTouch = Date.now(), wl(n), Kt(n, "pointer");
};
Ke.touchmove = (n) => {
  n.input.lastTouch = Date.now(), Kt(n, "pointer");
};
Ke.contextmenu = (n) => wl(n);
function _d(n, e) {
  return n.composing ? !0 : He && Math.abs(e.timeStamp - n.input.compositionEndedAt) < 500 ? (n.input.compositionEndedAt = -2e8, !0) : !1;
}
const zg = Rt ? 5e3 : -1;
Je.compositionstart = Je.compositionupdate = (n) => {
  if (!n.composing) {
    n.domObserver.flush();
    let { state: e } = n, t = e.selection.$to;
    if (e.selection instanceof q && (e.storedMarks || !t.textOffset && t.parentOffset && t.nodeBefore.marks.some((r) => r.type.spec.inclusive === !1) || Ie && hd && jg(n)))
      n.markCursor = n.state.storedMarks || t.marks(), gs(n, !0), n.markCursor = null;
    else if (gs(n, !e.selection.empty), ft && e.selection.empty && t.parentOffset && !t.textOffset && t.nodeBefore.marks.length) {
      let r = n.domSelectionRange();
      for (let s = r.focusNode, i = r.focusOffset; s && s.nodeType == 1 && i != 0; ) {
        let o = i < 0 ? s.lastChild : s.childNodes[i - 1];
        if (!o)
          break;
        if (o.nodeType == 3) {
          let l = n.domSelection();
          l && l.collapse(o, o.nodeValue.length);
          break;
        } else
          s = o, i = -1;
      }
    }
    n.input.composing = !0;
  }
  Bd(n, zg);
};
function jg(n) {
  let { focusNode: e, focusOffset: t } = n.domSelectionRange();
  if (!e || e.nodeType != 1 || t >= e.childNodes.length)
    return !1;
  let r = e.childNodes[t];
  return r.nodeType == 1 && r.contentEditable == "false";
}
Je.compositionend = (n, e) => {
  n.composing && (n.input.composing = !1, n.input.compositionEndedAt = e.timeStamp, n.input.compositionPendingChanges = n.domObserver.pendingRecords().length ? n.input.compositionID : 0, n.input.compositionNode = null, n.input.compositionPendingChanges && Promise.resolve().then(() => n.domObserver.flush()), n.input.compositionID++, Bd(n, 20));
};
function Bd(n, e) {
  clearTimeout(n.input.composingTimeout), e > -1 && (n.input.composingTimeout = setTimeout(() => gs(n), e));
}
function Fd(n) {
  for (n.composing && (n.input.composing = !1, n.input.compositionEndedAt = Hg()); n.input.compositionNodes.length > 0; )
    n.input.compositionNodes.pop().markParentsDirty();
}
function $g(n) {
  let e = n.domSelectionRange();
  if (!e.focusNode)
    return null;
  let t = Lm(e.focusNode, e.focusOffset), r = Pm(e.focusNode, e.focusOffset);
  if (t && r && t != r) {
    let s = r.pmViewDesc, i = n.domObserver.lastChangedTextNode;
    if (t == i || r == i)
      return i;
    if (!s || !s.isText(r.nodeValue))
      return r;
    if (n.input.compositionNode == r) {
      let o = t.pmViewDesc;
      if (!(!o || !o.isText(t.nodeValue)))
        return r;
    }
  }
  return t || r;
}
function Hg() {
  let n = document.createEvent("Event");
  return n.initEvent("event", !0, !0), n.timeStamp;
}
function gs(n, e = !1) {
  if (!(Rt && n.domObserver.flushingSoon >= 0)) {
    if (n.domObserver.forceFlush(), Fd(n), e || n.docView && n.docView.dirty) {
      let t = bl(n), r = n.state.selection;
      return t && !t.eq(r) ? n.dispatch(n.state.tr.setSelection(t)) : (n.markCursor || e) && !r.$from.node(r.$from.sharedDepth(r.to)).inlineContent ? n.dispatch(n.state.tr.deleteSelection()) : n.updateState(n.state), !0;
    }
    return !1;
  }
}
function Ug(n, e) {
  if (!n.dom.parentNode)
    return;
  let t = n.dom.parentNode.appendChild(document.createElement("div"));
  t.appendChild(e), t.style.cssText = "position: fixed; left: -10000px; top: 10px";
  let r = getSelection(), s = document.createRange();
  s.selectNodeContents(e), n.dom.blur(), r.removeAllRanges(), r.addRange(s), setTimeout(() => {
    t.parentNode && t.parentNode.removeChild(t), n.focus();
  }, 50);
}
const Tr = Ze && Gt < 15 || Yn && Vm < 604;
Ke.copy = Je.cut = (n, e) => {
  let t = e, r = n.state.selection, s = t.type == "cut";
  if (r.empty)
    return;
  let i = Tr ? null : t.clipboardData, o = r.content(), { dom: l, text: a } = kl(n, o);
  i ? (t.preventDefault(), i.clearData(), i.setData("text/html", l.innerHTML), i.setData("text/plain", a)) : Ug(n, l), s && n.dispatch(n.state.tr.deleteSelection().scrollIntoView().setMeta("uiEvent", "cut"));
};
function Wg(n) {
  return n.openStart == 0 && n.openEnd == 0 && n.content.childCount == 1 ? n.content.firstChild : null;
}
function qg(n, e) {
  if (!n.dom.parentNode)
    return;
  let t = n.input.shiftKey || n.state.selection.$from.parent.type.spec.code, r = n.dom.parentNode.appendChild(document.createElement(t ? "textarea" : "div"));
  t || (r.contentEditable = "true"), r.style.cssText = "position: fixed; left: -10000px; top: 10px", r.focus();
  let s = n.input.shiftKey && n.input.lastKeyCode != 45;
  setTimeout(() => {
    n.focus(), r.parentNode && r.parentNode.removeChild(r), t ? Ar(n, r.value, null, s, e) : Ar(n, r.textContent, r.innerHTML, s, e);
  }, 50);
}
function Ar(n, e, t, r, s) {
  let i = Nd(n, e, t, r, n.state.selection.$from);
  if (n.someProp("handlePaste", (a) => a(n, s, i || _.empty)))
    return !0;
  if (!i)
    return !1;
  let o = Wg(i), l = o ? n.state.tr.replaceSelectionWith(o, r) : n.state.tr.replaceSelection(i);
  return n.dispatch(l.scrollIntoView().setMeta("paste", !0).setMeta("uiEvent", "paste")), !0;
}
function Vd(n) {
  let e = n.getData("text/plain") || n.getData("Text");
  if (e)
    return e;
  let t = n.getData("text/uri-list");
  return t ? t.replace(/\r?\n/g, " ") : "";
}
Je.paste = (n, e) => {
  let t = e;
  if (n.composing && !Rt)
    return;
  let r = Tr ? null : t.clipboardData, s = n.input.shiftKey && n.input.lastKeyCode != 45;
  r && Ar(n, Vd(r), r.getData("text/html"), s, t) ? t.preventDefault() : qg(n, t);
};
class zd {
  constructor(e, t, r) {
    this.slice = e, this.move = t, this.node = r;
  }
}
const Kg = ct ? "altKey" : "ctrlKey";
function jd(n, e) {
  let t = n.someProp("dragCopies", (r) => !r(e));
  return t ?? !e[Kg];
}
Ke.dragstart = (n, e) => {
  let t = e, r = n.input.mouseDown;
  if (r && r.done(), !t.dataTransfer)
    return;
  let s = n.state.selection, i = s.empty ? null : n.posAtCoords(ai(t)), o;
  if (!(i && i.pos >= s.from && i.pos <= (s instanceof j ? s.to - 1 : s.to))) {
    if (r && r.mightDrag)
      o = j.create(n.state.doc, r.mightDrag.pos);
    else if (t.target && t.target.nodeType == 1) {
      let d = n.docView.nearestDesc(t.target, !0);
      d && d.node.type.spec.draggable && d != n.docView && (o = j.create(n.state.doc, d.posBefore));
    }
  }
  let l = (o || n.state.selection).content(), { dom: a, text: c, slice: u } = kl(n, l);
  (!t.dataTransfer.files.length || !Ie || fd > 120) && t.dataTransfer.clearData(), t.dataTransfer.setData(Tr ? "Text" : "text/html", a.innerHTML), t.dataTransfer.effectAllowed = "copyMove", Tr || t.dataTransfer.setData("text/plain", c), n.dragging = new zd(u, jd(n, t), o);
};
Ke.dragend = (n) => {
  let e = n.dragging;
  window.setTimeout(() => {
    n.dragging == e && (n.dragging = null);
  }, 50);
};
Je.dragover = Je.dragenter = (n, e) => e.preventDefault();
Je.drop = (n, e) => {
  try {
    Jg(n, e, n.dragging);
  } finally {
    n.dragging = null;
  }
};
function Jg(n, e, t) {
  if (!e.dataTransfer)
    return;
  let r = n.posAtCoords(ai(e));
  if (!r)
    return;
  let s = n.state.doc.resolve(r.pos), i = t && t.slice;
  i ? n.someProp("transformPasted", (h) => {
    i = h(i, n, !1);
  }) : i = Nd(n, Vd(e.dataTransfer), Tr ? null : e.dataTransfer.getData("text/html"), !1, s);
  let o = !!(t && jd(n, e));
  if (n.someProp("handleDrop", (h) => h(n, e, i || _.empty, o))) {
    e.preventDefault();
    return;
  }
  if (!i)
    return;
  e.preventDefault();
  let l = i ? Wu(n.state.doc, s.pos, i) : s.pos;
  l == null && (l = s.pos);
  let a = n.state.tr;
  if (o) {
    let { node: h } = t;
    h ? h.replace(a) : a.deleteSelection();
  }
  let c = a.mapping.map(l), u = i.openStart == 0 && i.openEnd == 0 && i.content.childCount == 1, d = a.doc;
  if (u ? a.replaceRangeWith(c, c, i.content.firstChild) : a.replaceRange(c, c, i), a.doc.eq(d))
    return;
  let f = a.doc.resolve(c);
  if (u && j.isSelectable(i.content.firstChild) && f.nodeAfter && f.nodeAfter.sameMarkup(i.content.firstChild))
    a.setSelection(new j(f));
  else {
    let h = a.mapping.map(l);
    a.mapping.maps[a.mapping.maps.length - 1].forEach((p, m, g, y) => h = y), a.setSelection(xl(n, f, a.doc.resolve(h)));
  }
  n.focus(), n.dispatch(a.setMeta("uiEvent", "drop"));
}
Ke.focus = (n) => {
  n.input.lastFocus = Date.now(), n.focused || (n.domObserver.stop(), n.dom.classList.add("ProseMirror-focused"), n.domObserver.start(), n.focused = !0, setTimeout(() => {
    n.docView && n.hasFocus() && !n.domObserver.currentSelection.eq(n.domSelectionRange()) && It(n);
  }, 20));
};
Ke.blur = (n, e) => {
  let t = e;
  n.focused && (n.domObserver.stop(), n.dom.classList.remove("ProseMirror-focused"), n.domObserver.start(), t.relatedTarget && n.dom.contains(t.relatedTarget) && n.domObserver.currentSelection.clear(), n.focused = !1);
};
Ke.beforeinput = (n, e) => {
  if (Ie && Rt && e.inputType == "deleteContentBackward") {
    n.domObserver.flushSoon();
    let { domChangeCount: r } = n.input;
    setTimeout(() => {
      if (n.input.domChangeCount != r || (n.dom.blur(), n.focus(), n.someProp("handleKeyDown", (i) => i(n, an(8, "Backspace")))))
        return;
      let { $cursor: s } = n.state.selection;
      s && s.pos > 0 && n.dispatch(n.state.tr.delete(s.pos - 1, s.pos).scrollIntoView());
    }, 50);
  }
};
for (let n in Je)
  Ke[n] = Je[n];
function Nr(n, e) {
  if (n == e)
    return !0;
  for (let t in n)
    if (n[t] !== e[t])
      return !1;
  for (let t in e)
    if (!(t in n))
      return !1;
  return !0;
}
class ys {
  constructor(e, t) {
    this.toDOM = e, this.spec = t || yn, this.side = this.spec.side || 0;
  }
  map(e, t, r, s) {
    let { pos: i, deleted: o } = e.mapResult(t.from + s, this.side < 0 ? -1 : 1);
    return o ? null : new qe(i - r, i - r, this);
  }
  valid() {
    return !0;
  }
  eq(e) {
    return this == e || e instanceof ys && (this.spec.key && this.spec.key == e.spec.key || this.toDOM == e.toDOM && Nr(this.spec, e.spec));
  }
  destroy(e) {
    this.spec.destroy && this.spec.destroy(e);
  }
}
class Xt {
  constructor(e, t) {
    this.attrs = e, this.spec = t || yn;
  }
  map(e, t, r, s) {
    let i = e.map(t.from + s, this.spec.inclusiveStart ? -1 : 1) - r, o = e.map(t.to + s, this.spec.inclusiveEnd ? 1 : -1) - r;
    return i >= o ? null : new qe(i, o, this);
  }
  valid(e, t) {
    return t.from < t.to;
  }
  eq(e) {
    return this == e || e instanceof Xt && Nr(this.attrs, e.attrs) && Nr(this.spec, e.spec);
  }
  static is(e) {
    return e.type instanceof Xt;
  }
  destroy() {
  }
}
class Cl {
  constructor(e, t) {
    this.attrs = e, this.spec = t || yn;
  }
  map(e, t, r, s) {
    let i = e.mapResult(t.from + s, 1);
    if (i.deleted)
      return null;
    let o = e.mapResult(t.to + s, -1);
    return o.deleted || o.pos <= i.pos ? null : new qe(i.pos - r, o.pos - r, this);
  }
  valid(e, t) {
    let { index: r, offset: s } = e.content.findIndex(t.from), i;
    return s == t.from && !(i = e.child(r)).isText && s + i.nodeSize == t.to;
  }
  eq(e) {
    return this == e || e instanceof Cl && Nr(this.attrs, e.attrs) && Nr(this.spec, e.spec);
  }
  destroy() {
  }
}
class qe {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.from = e, this.to = t, this.type = r;
  }
  /**
  @internal
  */
  copy(e, t) {
    return new qe(e, t, this.type);
  }
  /**
  @internal
  */
  eq(e, t = 0) {
    return this.type.eq(e.type) && this.from + t == e.from && this.to + t == e.to;
  }
  /**
  @internal
  */
  map(e, t, r) {
    return this.type.map(e, this, t, r);
  }
  /**
  Creates a widget decoration, which is a DOM node that's shown in
  the document at the given position. It is recommended that you
  delay rendering the widget by passing a function that will be
  called when the widget is actually drawn in a view, but you can
  also directly pass a DOM node. `getPos` can be used to find the
  widget's current document position.
  */
  static widget(e, t, r) {
    return new qe(e, e, new ys(t, r));
  }
  /**
  Creates an inline decoration, which adds the given attributes to
  each inline node between `from` and `to`.
  */
  static inline(e, t, r, s) {
    return new qe(e, t, new Xt(r, s));
  }
  /**
  Creates a node decoration. `from` and `to` should point precisely
  before and after a node in the document. That node, and only that
  node, will receive the given attributes.
  */
  static node(e, t, r, s) {
    return new qe(e, t, new Cl(r, s));
  }
  /**
  The spec provided when creating this decoration. Can be useful
  if you've stored extra information in that object.
  */
  get spec() {
    return this.type.spec;
  }
  /**
  @internal
  */
  get inline() {
    return this.type instanceof Xt;
  }
  /**
  @internal
  */
  get widget() {
    return this.type instanceof ys;
  }
}
const Vn = [], yn = {};
class me {
  /**
  @internal
  */
  constructor(e, t) {
    this.local = e.length ? e : Vn, this.children = t.length ? t : Vn;
  }
  /**
  Create a set of decorations, using the structure of the given
  document. This will consume (modify) the `decorations` array, so
  you must make a copy if you want need to preserve that.
  */
  static create(e, t) {
    return t.length ? bs(t, e, 0, yn) : $e;
  }
  /**
  Find all decorations in this set which touch the given range
  (including decorations that start or end directly at the
  boundaries) and match the given predicate on their spec. When
  `start` and `end` are omitted, all decorations in the set are
  considered. When `predicate` isn't given, all decorations are
  assumed to match.
  */
  find(e, t, r) {
    let s = [];
    return this.findInner(e ?? 0, t ?? 1e9, s, 0, r), s;
  }
  findInner(e, t, r, s, i) {
    for (let o = 0; o < this.local.length; o++) {
      let l = this.local[o];
      l.from <= t && l.to >= e && (!i || i(l.spec)) && r.push(l.copy(l.from + s, l.to + s));
    }
    for (let o = 0; o < this.children.length; o += 3)
      if (this.children[o] < t && this.children[o + 1] > e) {
        let l = this.children[o] + 1;
        this.children[o + 2].findInner(e - l, t - l, r, s + l, i);
      }
  }
  /**
  Map the set of decorations in response to a change in the
  document.
  */
  map(e, t, r) {
    return this == $e || e.maps.length == 0 ? this : this.mapInner(e, t, 0, 0, r || yn);
  }
  /**
  @internal
  */
  mapInner(e, t, r, s, i) {
    let o;
    for (let l = 0; l < this.local.length; l++) {
      let a = this.local[l].map(e, r, s);
      a && a.type.valid(t, a) ? (o || (o = [])).push(a) : i.onRemove && i.onRemove(this.local[l].spec);
    }
    return this.children.length ? Gg(this.children, o || [], e, t, r, s, i) : o ? new me(o.sort(bn), Vn) : $e;
  }
  /**
  Add the given array of decorations to the ones in the set,
  producing a new set. Consumes the `decorations` array. Needs
  access to the current document to create the appropriate tree
  structure.
  */
  add(e, t) {
    return t.length ? this == $e ? me.create(e, t) : this.addInner(e, t, 0) : this;
  }
  addInner(e, t, r) {
    let s, i = 0;
    e.forEach((l, a) => {
      let c = a + r, u;
      if (u = Hd(t, l, c)) {
        for (s || (s = this.children.slice()); i < s.length && s[i] < a; )
          i += 3;
        s[i] == a ? s[i + 2] = s[i + 2].addInner(l, u, c + 1) : s.splice(i, 0, a, a + l.nodeSize, bs(u, l, c + 1, yn)), i += 3;
      }
    });
    let o = $d(i ? Ud(t) : t, -r);
    for (let l = 0; l < o.length; l++)
      o[l].type.valid(e, o[l]) || o.splice(l--, 1);
    return new me(o.length ? this.local.concat(o).sort(bn) : this.local, s || this.children);
  }
  /**
  Create a new set that contains the decorations in this set, minus
  the ones in the given array.
  */
  remove(e) {
    return e.length == 0 || this == $e ? this : this.removeInner(e, 0);
  }
  removeInner(e, t) {
    let r = this.children, s = this.local;
    for (let i = 0; i < r.length; i += 3) {
      let o, l = r[i] + t, a = r[i + 1] + t;
      for (let u = 0, d; u < e.length; u++)
        (d = e[u]) && d.from > l && d.to < a && (e[u] = null, (o || (o = [])).push(d));
      if (!o)
        continue;
      r == this.children && (r = this.children.slice());
      let c = r[i + 2].removeInner(o, l + 1);
      c != $e ? r[i + 2] = c : (r.splice(i, 3), i -= 3);
    }
    if (s.length) {
      for (let i = 0, o; i < e.length; i++)
        if (o = e[i])
          for (let l = 0; l < s.length; l++)
            s[l].eq(o, t) && (s == this.local && (s = this.local.slice()), s.splice(l--, 1));
    }
    return r == this.children && s == this.local ? this : s.length || r.length ? new me(s, r) : $e;
  }
  forChild(e, t) {
    if (this == $e)
      return this;
    if (t.isLeaf)
      return me.empty;
    let r, s;
    for (let l = 0; l < this.children.length; l += 3)
      if (this.children[l] >= e) {
        this.children[l] == e && (r = this.children[l + 2]);
        break;
      }
    let i = e + 1, o = i + t.content.size;
    for (let l = 0; l < this.local.length; l++) {
      let a = this.local[l];
      if (a.from < o && a.to > i && a.type instanceof Xt) {
        let c = Math.max(i, a.from) - i, u = Math.min(o, a.to) - i;
        c < u && (s || (s = [])).push(a.copy(c, u));
      }
    }
    if (s) {
      let l = new me(s.sort(bn), Vn);
      return r ? new Ht([l, r]) : l;
    }
    return r || $e;
  }
  /**
  @internal
  */
  eq(e) {
    if (this == e)
      return !0;
    if (!(e instanceof me) || this.local.length != e.local.length || this.children.length != e.children.length)
      return !1;
    for (let t = 0; t < this.local.length; t++)
      if (!this.local[t].eq(e.local[t]))
        return !1;
    for (let t = 0; t < this.children.length; t += 3)
      if (this.children[t] != e.children[t] || this.children[t + 1] != e.children[t + 1] || !this.children[t + 2].eq(e.children[t + 2]))
        return !1;
    return !0;
  }
  /**
  @internal
  */
  locals(e) {
    return El(this.localsInner(e));
  }
  /**
  @internal
  */
  localsInner(e) {
    if (this == $e)
      return Vn;
    if (e.inlineContent || !this.local.some(Xt.is))
      return this.local;
    let t = [];
    for (let r = 0; r < this.local.length; r++)
      this.local[r].type instanceof Xt || t.push(this.local[r]);
    return t;
  }
  forEachSet(e) {
    e(this);
  }
}
me.empty = new me([], []);
me.removeOverlap = El;
const $e = me.empty;
class Ht {
  constructor(e) {
    this.members = e;
  }
  map(e, t) {
    const r = this.members.map((s) => s.map(e, t, yn));
    return Ht.from(r);
  }
  forChild(e, t) {
    if (t.isLeaf)
      return me.empty;
    let r = [];
    for (let s = 0; s < this.members.length; s++) {
      let i = this.members[s].forChild(e, t);
      i != $e && (i instanceof Ht ? r = r.concat(i.members) : r.push(i));
    }
    return Ht.from(r);
  }
  eq(e) {
    if (!(e instanceof Ht) || e.members.length != this.members.length)
      return !1;
    for (let t = 0; t < this.members.length; t++)
      if (!this.members[t].eq(e.members[t]))
        return !1;
    return !0;
  }
  locals(e) {
    let t, r = !0;
    for (let s = 0; s < this.members.length; s++) {
      let i = this.members[s].localsInner(e);
      if (i.length)
        if (!t)
          t = i;
        else {
          r && (t = t.slice(), r = !1);
          for (let o = 0; o < i.length; o++)
            t.push(i[o]);
        }
    }
    return t ? El(r ? t : t.sort(bn)) : Vn;
  }
  // Create a group for the given array of decoration sets, or return
  // a single set when possible.
  static from(e) {
    switch (e.length) {
      case 0:
        return $e;
      case 1:
        return e[0];
      default:
        return new Ht(e.every((t) => t instanceof me) ? e : e.reduce((t, r) => t.concat(r instanceof me ? r : r.members), []));
    }
  }
  forEachSet(e) {
    for (let t = 0; t < this.members.length; t++)
      this.members[t].forEachSet(e);
  }
}
function Gg(n, e, t, r, s, i, o) {
  let l = n.slice();
  for (let c = 0, u = i; c < t.maps.length; c++) {
    let d = 0;
    t.maps[c].forEach((f, h, p, m) => {
      let g = m - p - (h - f);
      for (let y = 0; y < l.length; y += 3) {
        let k = l[y + 1];
        if (k < 0 || f > k + u - d)
          continue;
        let C = l[y] + u - d;
        h >= C ? l[y + 1] = f <= C ? -2 : -1 : f >= u && g && (l[y] += g, l[y + 1] += g);
      }
      d += g;
    }), u = t.maps[c].map(u, -1);
  }
  let a = !1;
  for (let c = 0; c < l.length; c += 3)
    if (l[c + 1] < 0) {
      if (l[c + 1] == -2) {
        a = !0, l[c + 1] = -1;
        continue;
      }
      let u = t.map(n[c] + i), d = u - s;
      if (d < 0 || d >= r.content.size) {
        a = !0;
        continue;
      }
      let f = t.map(n[c + 1] + i, -1), h = f - s, { index: p, offset: m } = r.content.findIndex(d), g = r.maybeChild(p);
      if (g && m == d && m + g.nodeSize == h) {
        let y = l[c + 2].mapInner(t, g, u + 1, n[c] + i + 1, o);
        y != $e ? (l[c] = d, l[c + 1] = h, l[c + 2] = y) : (l[c + 1] = -2, a = !0);
      } else
        a = !0;
    }
  if (a) {
    let c = Yg(l, n, e, t, s, i, o), u = bs(c, r, 0, o);
    e = u.local;
    for (let d = 0; d < l.length; d += 3)
      l[d + 1] < 0 && (l.splice(d, 3), d -= 3);
    for (let d = 0, f = 0; d < u.children.length; d += 3) {
      let h = u.children[d];
      for (; f < l.length && l[f] < h; )
        f += 3;
      l.splice(f, 0, u.children[d], u.children[d + 1], u.children[d + 2]);
    }
  }
  return new me(e.sort(bn), l);
}
function $d(n, e) {
  if (!e || !n.length)
    return n;
  let t = [];
  for (let r = 0; r < n.length; r++) {
    let s = n[r];
    t.push(new qe(s.from + e, s.to + e, s.type));
  }
  return t;
}
function Yg(n, e, t, r, s, i, o) {
  function l(a, c) {
    for (let u = 0; u < a.local.length; u++) {
      let d = a.local[u].map(r, s, c);
      d ? t.push(d) : o.onRemove && o.onRemove(a.local[u].spec);
    }
    for (let u = 0; u < a.children.length; u += 3)
      l(a.children[u + 2], a.children[u] + c + 1);
  }
  for (let a = 0; a < n.length; a += 3)
    n[a + 1] == -1 && l(n[a + 2], e[a] + i + 1);
  return t;
}
function Hd(n, e, t) {
  if (e.isLeaf)
    return null;
  let r = t + e.nodeSize, s = null;
  for (let i = 0, o; i < n.length; i++)
    (o = n[i]) && o.from > t && o.to < r && ((s || (s = [])).push(o), n[i] = null);
  return s;
}
function Ud(n) {
  let e = [];
  for (let t = 0; t < n.length; t++)
    n[t] != null && e.push(n[t]);
  return e;
}
function bs(n, e, t, r) {
  let s = [], i = !1;
  e.forEach((l, a) => {
    let c = Hd(n, l, a + t);
    if (c) {
      i = !0;
      let u = bs(c, l, t + a + 1, r);
      u != $e && s.push(a, a + l.nodeSize, u);
    }
  });
  let o = $d(i ? Ud(n) : n, -t).sort(bn);
  for (let l = 0; l < o.length; l++)
    o[l].type.valid(e, o[l]) || (r.onRemove && r.onRemove(o[l].spec), o.splice(l--, 1));
  return o.length || s.length ? new me(o, s) : $e;
}
function bn(n, e) {
  return n.from - e.from || n.to - e.to;
}
function El(n) {
  let e = n;
  for (let t = 0; t < e.length - 1; t++) {
    let r = e[t];
    if (r.from != r.to)
      for (let s = t + 1; s < e.length; s++) {
        let i = e[s];
        if (i.from == r.from) {
          i.to != r.to && (e == n && (e = n.slice()), e[s] = i.copy(i.from, r.to), Qa(e, s + 1, i.copy(r.to, i.to)));
          continue;
        } else {
          i.from < r.to && (e == n && (e = n.slice()), e[t] = r.copy(r.from, i.from), Qa(e, s, r.copy(i.from, r.to)));
          break;
        }
      }
  }
  return e;
}
function Qa(n, e, t) {
  for (; e < n.length && bn(t, n[e]) > 0; )
    e++;
  n.splice(e, 0, t);
}
function $i(n) {
  let e = [];
  return n.someProp("decorations", (t) => {
    let r = t(n.state);
    r && r != $e && e.push(r);
  }), n.cursorWrapper && e.push(me.create(n.state.doc, [n.cursorWrapper.deco])), Ht.from(e);
}
const Xg = {
  childList: !0,
  characterData: !0,
  characterDataOldValue: !0,
  attributes: !0,
  attributeOldValue: !0,
  subtree: !0
}, Qg = Ze && Gt <= 11;
class Zg {
  constructor() {
    this.anchorNode = null, this.anchorOffset = 0, this.focusNode = null, this.focusOffset = 0;
  }
  set(e) {
    this.anchorNode = e.anchorNode, this.anchorOffset = e.anchorOffset, this.focusNode = e.focusNode, this.focusOffset = e.focusOffset;
  }
  clear() {
    this.anchorNode = this.focusNode = null;
  }
  eq(e) {
    return e.anchorNode == this.anchorNode && e.anchorOffset == this.anchorOffset && e.focusNode == this.focusNode && e.focusOffset == this.focusOffset;
  }
}
class ey {
  constructor(e, t) {
    this.view = e, this.handleDOMChange = t, this.queue = [], this.flushingSoon = -1, this.observer = null, this.currentSelection = new Zg(), this.onCharData = null, this.suppressingSelectionUpdates = !1, this.lastChangedTextNode = null, this.observer = window.MutationObserver && new window.MutationObserver((r) => {
      for (let s = 0; s < r.length; s++)
        this.queue.push(r[s]);
      Ze && Gt <= 11 && r.some((s) => s.type == "childList" && s.removedNodes.length || s.type == "characterData" && s.oldValue.length > s.target.nodeValue.length) ? this.flushSoon() : this.flush();
    }), Qg && (this.onCharData = (r) => {
      this.queue.push({ target: r.target, type: "characterData", oldValue: r.prevValue }), this.flushSoon();
    }), this.onSelectionChange = this.onSelectionChange.bind(this);
  }
  flushSoon() {
    this.flushingSoon < 0 && (this.flushingSoon = window.setTimeout(() => {
      this.flushingSoon = -1, this.flush();
    }, 20));
  }
  forceFlush() {
    this.flushingSoon > -1 && (window.clearTimeout(this.flushingSoon), this.flushingSoon = -1, this.flush());
  }
  start() {
    this.observer && (this.observer.takeRecords(), this.observer.observe(this.view.dom, Xg)), this.onCharData && this.view.dom.addEventListener("DOMCharacterDataModified", this.onCharData), this.connectSelection();
  }
  stop() {
    if (this.observer) {
      let e = this.observer.takeRecords();
      if (e.length) {
        for (let t = 0; t < e.length; t++)
          this.queue.push(e[t]);
        window.setTimeout(() => this.flush(), 20);
      }
      this.observer.disconnect();
    }
    this.onCharData && this.view.dom.removeEventListener("DOMCharacterDataModified", this.onCharData), this.disconnectSelection();
  }
  connectSelection() {
    this.view.dom.ownerDocument.addEventListener("selectionchange", this.onSelectionChange);
  }
  disconnectSelection() {
    this.view.dom.ownerDocument.removeEventListener("selectionchange", this.onSelectionChange);
  }
  suppressSelectionUpdates() {
    this.suppressingSelectionUpdates = !0, setTimeout(() => this.suppressingSelectionUpdates = !1, 50);
  }
  onSelectionChange() {
    if (Ua(this.view)) {
      if (this.suppressingSelectionUpdates)
        return It(this.view);
      if (Ze && Gt <= 11 && !this.view.state.selection.empty) {
        let e = this.view.domSelectionRange();
        if (e.focusNode && Sn(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset))
          return this.flushSoon();
      }
      this.flush();
    }
  }
  setCurSelection() {
    this.currentSelection.set(this.view.domSelectionRange());
  }
  ignoreSelectionChange(e) {
    if (!e.focusNode)
      return !0;
    let t = /* @__PURE__ */ new Set(), r;
    for (let i = e.focusNode; i; i = Gn(i))
      t.add(i);
    for (let i = e.anchorNode; i; i = Gn(i))
      if (t.has(i)) {
        r = i;
        break;
      }
    let s = r && this.view.docView.nearestDesc(r);
    if (s && s.ignoreMutation({
      type: "selection",
      target: r.nodeType == 3 ? r.parentNode : r
    }))
      return this.setCurSelection(), !0;
  }
  pendingRecords() {
    if (this.observer)
      for (let e of this.observer.takeRecords())
        this.queue.push(e);
    return this.queue;
  }
  flush() {
    let { view: e } = this;
    if (!e.docView || this.flushingSoon > -1)
      return;
    let t = this.pendingRecords();
    t.length && (this.queue = []);
    let r = e.domSelectionRange(), s = !this.suppressingSelectionUpdates && !this.currentSelection.eq(r) && Ua(e) && !this.ignoreSelectionChange(r), i = -1, o = -1, l = !1, a = [];
    if (e.editable)
      for (let u = 0; u < t.length; u++) {
        let d = this.registerMutation(t[u], a);
        d && (i = i < 0 ? d.from : Math.min(d.from, i), o = o < 0 ? d.to : Math.max(d.to, o), d.typeOver && (l = !0));
      }
    if (ft && a.length) {
      let u = a.filter((d) => d.nodeName == "BR");
      if (u.length == 2) {
        let [d, f] = u;
        d.parentNode && d.parentNode.parentNode == f.parentNode ? f.remove() : d.remove();
      } else {
        let { focusNode: d } = this.currentSelection;
        for (let f of u) {
          let h = f.parentNode;
          h && h.nodeName == "LI" && (!d || ry(e, d) != h) && f.remove();
        }
      }
    } else if ((Ie || He) && a.some((u) => u.nodeName == "BR") && (e.input.lastKeyCode == 8 || e.input.lastKeyCode == 46)) {
      for (let u of a)
        if (u.nodeName == "BR" && u.parentNode) {
          let d = u.nextSibling;
          d && d.nodeType == 1 && d.contentEditable == "false" && u.parentNode.removeChild(u);
        }
    }
    let c = null;
    i < 0 && s && e.input.lastFocus > Date.now() - 200 && Math.max(e.input.lastTouch, e.input.lastClick.time) < Date.now() - 300 && oi(r) && (c = bl(e)) && c.eq(Y.near(e.state.doc.resolve(0), 1)) ? (e.input.lastFocus = 0, It(e), this.currentSelection.set(r), e.scrollToSelection()) : (i > -1 || s) && (i > -1 && (e.docView.markDirty(i, o), ty(e)), this.handleDOMChange(i, o, l, a), e.docView && e.docView.dirty ? e.updateState(e.state) : this.currentSelection.eq(r) || It(e), this.currentSelection.set(r));
  }
  registerMutation(e, t) {
    if (t.indexOf(e.target) > -1)
      return null;
    let r = this.view.docView.nearestDesc(e.target);
    if (e.type == "attributes" && (r == this.view.docView || e.attributeName == "contenteditable" || // Firefox sometimes fires spurious events for null/empty styles
    e.attributeName == "style" && !e.oldValue && !e.target.getAttribute("style")) || !r || r.ignoreMutation(e))
      return null;
    if (e.type == "childList") {
      for (let u = 0; u < e.addedNodes.length; u++) {
        let d = e.addedNodes[u];
        t.push(d), d.nodeType == 3 && (this.lastChangedTextNode = d);
      }
      if (r.contentDOM && r.contentDOM != r.dom && !r.contentDOM.contains(e.target))
        return { from: r.posBefore, to: r.posAfter };
      let s = e.previousSibling, i = e.nextSibling;
      if (Ze && Gt <= 11 && e.addedNodes.length)
        for (let u = 0; u < e.addedNodes.length; u++) {
          let { previousSibling: d, nextSibling: f } = e.addedNodes[u];
          (!d || Array.prototype.indexOf.call(e.addedNodes, d) < 0) && (s = d), (!f || Array.prototype.indexOf.call(e.addedNodes, f) < 0) && (i = f);
        }
      let o = s && s.parentNode == e.target ? Ve(s) + 1 : 0, l = r.localPosFromDOM(e.target, o, -1), a = i && i.parentNode == e.target ? Ve(i) : e.target.childNodes.length, c = r.localPosFromDOM(e.target, a, 1);
      return { from: l, to: c };
    } else return e.type == "attributes" ? { from: r.posAtStart - r.border, to: r.posAtEnd + r.border } : (this.lastChangedTextNode = e.target, {
      from: r.posAtStart,
      to: r.posAtEnd,
      // An event was generated for a text change that didn't change
      // any text. Mark the dom change to fall back to assuming the
      // selection was typed over with an identical value if it can't
      // find another change.
      typeOver: e.target.nodeValue == e.oldValue
    });
  }
}
let Za = /* @__PURE__ */ new WeakMap(), ec = !1;
function ty(n) {
  if (!Za.has(n) && (Za.set(n, null), ["normal", "nowrap", "pre-line"].indexOf(getComputedStyle(n.dom).whiteSpace) !== -1)) {
    if (n.requiresGeckoHackNode = ft, ec)
      return;
    console.warn("ProseMirror expects the CSS white-space property to be set, preferably to 'pre-wrap'. It is recommended to load style/prosemirror.css from the prosemirror-view package."), ec = !0;
  }
}
function tc(n, e) {
  let t = e.startContainer, r = e.startOffset, s = e.endContainer, i = e.endOffset, o = n.domAtPos(n.state.selection.anchor);
  return Sn(o.node, o.offset, s, i) && ([t, r, s, i] = [s, i, t, r]), { anchorNode: t, anchorOffset: r, focusNode: s, focusOffset: i };
}
function ny(n, e) {
  if (e.getComposedRanges) {
    let s = e.getComposedRanges(n.root)[0];
    if (s)
      return tc(n, s);
  }
  let t;
  function r(s) {
    s.preventDefault(), s.stopImmediatePropagation(), t = s.getTargetRanges()[0];
  }
  return n.dom.addEventListener("beforeinput", r, !0), document.execCommand("indent"), n.dom.removeEventListener("beforeinput", r, !0), t ? tc(n, t) : null;
}
function ry(n, e) {
  for (let t = e.parentNode; t && t != n.dom; t = t.parentNode) {
    let r = n.docView.nearestDesc(t, !0);
    if (r && r.node.isBlock)
      return t;
  }
  return null;
}
function sy(n, e, t) {
  let { node: r, fromOffset: s, toOffset: i, from: o, to: l } = n.docView.parseRange(e, t), a = n.domSelectionRange(), c, u = a.anchorNode;
  if (u && n.dom.contains(u.nodeType == 1 ? u : u.parentNode) && (c = [{ node: u, offset: a.anchorOffset }], oi(a) || c.push({ node: a.focusNode, offset: a.focusOffset })), Ie && n.input.lastKeyCode === 8)
    for (let g = i; g > s; g--) {
      let y = r.childNodes[g - 1], k = y.pmViewDesc;
      if (y.nodeName == "BR" && !k) {
        i = g;
        break;
      }
      if (!k || k.size)
        break;
    }
  let d = n.state.doc, f = n.someProp("domParser") || Jt.fromSchema(n.state.schema), h = d.resolve(o), p = null, m = f.parse(r, {
    topNode: h.parent,
    topMatch: h.parent.contentMatchAt(h.index()),
    topOpen: !0,
    from: s,
    to: i,
    preserveWhitespace: h.parent.type.whitespace == "pre" ? "full" : !0,
    findPositions: c,
    ruleFromNode: iy,
    context: h
  });
  if (c && c[0].pos != null) {
    let g = c[0].pos, y = c[1] && c[1].pos;
    y == null && (y = g), p = { anchor: g + o, head: y + o };
  }
  return { doc: m, sel: p, from: o, to: l };
}
function iy(n) {
  let e = n.pmViewDesc;
  if (e)
    return e.parseRule();
  if (n.nodeName == "BR" && n.parentNode) {
    if (He && /^(ul|ol)$/i.test(n.parentNode.nodeName)) {
      let t = document.createElement("div");
      return t.appendChild(document.createElement("li")), { skip: t };
    } else if (n.parentNode.lastChild == n || He && /^(tr|table)$/i.test(n.parentNode.nodeName))
      return { ignore: !0 };
  } else if (n.nodeName == "IMG" && n.getAttribute("mark-placeholder"))
    return { ignore: !0 };
  return null;
}
const oy = /^(a|abbr|acronym|b|bd[io]|big|br|button|cite|code|data(list)?|del|dfn|em|i|img|ins|kbd|label|map|mark|meter|output|q|ruby|s|samp|small|span|strong|su[bp]|time|u|tt|var)$/i;
function ly(n, e, t, r, s) {
  let i = n.input.compositionPendingChanges || (n.composing ? n.input.compositionID : 0);
  if (n.input.compositionPendingChanges = 0, e < 0) {
    let M = n.input.lastSelectionTime > Date.now() - 50 ? n.input.lastSelectionOrigin : null, D = bl(n, M);
    if (D && !n.state.selection.eq(D)) {
      if (Ie && Rt && n.input.lastKeyCode === 13 && Date.now() - 100 < n.input.lastKeyCodeTime && n.someProp("handleKeyDown", (z) => z(n, an(13, "Enter"))))
        return;
      let L = n.state.tr.setSelection(D);
      M == "pointer" ? L.setMeta("pointer", !0) : M == "key" && L.scrollIntoView(), i && L.setMeta("composition", i), n.dispatch(L);
    }
    return;
  }
  let o = n.state.doc.resolve(e), l = o.sharedDepth(t);
  e = o.before(l + 1), t = n.state.doc.resolve(t).after(l + 1);
  let a = n.state.selection, c = sy(n, e, t), u = n.state.doc, d = u.slice(c.from, c.to), f, h;
  n.input.lastKeyCode === 8 && Date.now() - 100 < n.input.lastKeyCodeTime ? (f = n.state.selection.to, h = "end") : (f = n.state.selection.from, h = "start"), n.input.lastKeyCode = null;
  let p = uy(d.content, c.doc.content, c.from, f, h);
  if (p && n.input.domChangeCount++, (Yn && n.input.lastIOSEnter > Date.now() - 225 || Rt) && s.some((M) => M.nodeType == 1 && !oy.test(M.nodeName)) && (!p || p.endA >= p.endB) && n.someProp("handleKeyDown", (M) => M(n, an(13, "Enter")))) {
    n.input.lastIOSEnter = 0;
    return;
  }
  if (!p)
    if (r && a instanceof q && !a.empty && a.$head.sameParent(a.$anchor) && !n.composing && !(c.sel && c.sel.anchor != c.sel.head))
      p = { start: a.from, endA: a.to, endB: a.to };
    else {
      if (c.sel) {
        let M = nc(n, n.state.doc, c.sel);
        if (M && !M.eq(n.state.selection)) {
          let D = n.state.tr.setSelection(M);
          i && D.setMeta("composition", i), n.dispatch(D);
        }
      }
      return;
    }
  n.state.selection.from < n.state.selection.to && p.start == p.endB && n.state.selection instanceof q && (p.start > n.state.selection.from && p.start <= n.state.selection.from + 2 && n.state.selection.from >= c.from ? p.start = n.state.selection.from : p.endA < n.state.selection.to && p.endA >= n.state.selection.to - 2 && n.state.selection.to <= c.to && (p.endB += n.state.selection.to - p.endA, p.endA = n.state.selection.to)), Ze && Gt <= 11 && p.endB == p.start + 1 && p.endA == p.start && p.start > c.from && c.doc.textBetween(p.start - c.from - 1, p.start - c.from + 1) == "  " && (p.start--, p.endA--, p.endB--);
  let m = c.doc.resolveNoCache(p.start - c.from), g = c.doc.resolveNoCache(p.endB - c.from), y = u.resolve(p.start), k = m.sameParent(g) && m.parent.inlineContent && y.end() >= p.endA;
  if ((Yn && n.input.lastIOSEnter > Date.now() - 225 && (!k || s.some((M) => M.nodeName == "DIV" || M.nodeName == "P")) || !k && m.pos < c.doc.content.size && (!m.sameParent(g) || !m.parent.inlineContent) && m.pos < g.pos && !/\S/.test(c.doc.textBetween(m.pos, g.pos, "", ""))) && n.someProp("handleKeyDown", (M) => M(n, an(13, "Enter")))) {
    n.input.lastIOSEnter = 0;
    return;
  }
  if (n.state.selection.anchor > p.start && cy(u, p.start, p.endA, m, g) && n.someProp("handleKeyDown", (M) => M(n, an(8, "Backspace")))) {
    Rt && Ie && n.domObserver.suppressSelectionUpdates();
    return;
  }
  Ie && p.endB == p.start && (n.input.lastChromeDelete = Date.now()), Rt && !k && m.start() != g.start() && g.parentOffset == 0 && m.depth == g.depth && c.sel && c.sel.anchor == c.sel.head && c.sel.head == p.endA && (p.endB -= 2, g = c.doc.resolveNoCache(p.endB - c.from), setTimeout(() => {
    n.someProp("handleKeyDown", function(M) {
      return M(n, an(13, "Enter"));
    });
  }, 20));
  let C = p.start, v = p.endA, x = (M) => {
    let D = M || n.state.tr.replace(C, v, c.doc.slice(p.start - c.from, p.endB - c.from));
    if (c.sel) {
      let L = nc(n, D.doc, c.sel);
      L && !(Ie && n.composing && L.empty && (p.start != p.endB || n.input.lastChromeDelete < Date.now() - 100) && (L.head == C || L.head == D.mapping.map(v) - 1) || Ze && L.empty && L.head == C) && D.setSelection(L);
    }
    return i && D.setMeta("composition", i), D.scrollIntoView();
  }, E;
  if (k)
    if (m.pos == g.pos) {
      Ze && Gt <= 11 && m.parentOffset == 0 && (n.domObserver.suppressSelectionUpdates(), setTimeout(() => It(n), 20));
      let M = x(n.state.tr.delete(C, v)), D = u.resolve(p.start).marksAcross(u.resolve(p.endA));
      D && M.ensureMarks(D), n.dispatch(M);
    } else if (
      // Adding or removing a mark
      p.endA == p.endB && (E = ay(m.parent.content.cut(m.parentOffset, g.parentOffset), y.parent.content.cut(y.parentOffset, p.endA - y.start())))
    ) {
      let M = x(n.state.tr);
      E.type == "add" ? M.addMark(C, v, E.mark) : M.removeMark(C, v, E.mark), n.dispatch(M);
    } else if (m.parent.child(m.index()).isText && m.index() == g.index() - (g.textOffset ? 0 : 1)) {
      let M = m.parent.textBetween(m.parentOffset, g.parentOffset), D = () => x(n.state.tr.insertText(M, C, v));
      n.someProp("handleTextInput", (L) => L(n, C, v, M, D)) || n.dispatch(D());
    } else
      n.dispatch(x());
  else
    n.dispatch(x());
}
function nc(n, e, t) {
  return Math.max(t.anchor, t.head) > e.content.size ? null : xl(n, e.resolve(t.anchor), e.resolve(t.head));
}
function ay(n, e) {
  let t = n.firstChild.marks, r = e.firstChild.marks, s = t, i = r, o, l, a;
  for (let u = 0; u < r.length; u++)
    s = r[u].removeFromSet(s);
  for (let u = 0; u < t.length; u++)
    i = t[u].removeFromSet(i);
  if (s.length == 1 && i.length == 0)
    l = s[0], o = "add", a = (u) => u.mark(l.addToSet(u.marks));
  else if (s.length == 0 && i.length == 1)
    l = i[0], o = "remove", a = (u) => u.mark(l.removeFromSet(u.marks));
  else
    return null;
  let c = [];
  for (let u = 0; u < e.childCount; u++)
    c.push(a(e.child(u)));
  if (A.from(c).eq(n))
    return { mark: l, type: o };
}
function cy(n, e, t, r, s) {
  if (
    // The content must have shrunk
    t - e <= s.pos - r.pos || // newEnd must point directly at or after the end of the block that newStart points into
    Hi(r, !0, !1) < s.pos
  )
    return !1;
  let i = n.resolve(e);
  if (!r.parent.isTextblock) {
    let l = i.nodeAfter;
    return l != null && t == e + l.nodeSize;
  }
  if (i.parentOffset < i.parent.content.size || !i.parent.isTextblock)
    return !1;
  let o = n.resolve(Hi(i, !0, !0));
  return !o.parent.isTextblock || o.pos > t || Hi(o, !0, !1) < t ? !1 : r.parent.content.cut(r.parentOffset).eq(o.parent.content);
}
function Hi(n, e, t) {
  let r = n.depth, s = e ? n.end() : n.pos;
  for (; r > 0 && (e || n.indexAfter(r) == n.node(r).childCount); )
    r--, s++, e = !1;
  if (t) {
    let i = n.node(r).maybeChild(n.indexAfter(r));
    for (; i && !i.isLeaf; )
      i = i.firstChild, s++;
  }
  return s;
}
function uy(n, e, t, r, s) {
  let i = n.findDiffStart(e, t);
  if (i == null)
    return null;
  let { a: o, b: l } = n.findDiffEnd(e, t + n.size, t + e.size);
  if (s == "end") {
    let a = Math.max(0, i - Math.min(o, l));
    r -= o + a - i;
  }
  if (o < i && n.size < e.size) {
    let a = r <= i && r >= o ? i - r : 0;
    i -= a, i && i < e.size && rc(e.textBetween(i - 1, i + 1)) && (i += a ? 1 : -1), l = i + (l - o), o = i;
  } else if (l < i) {
    let a = r <= i && r >= l ? i - r : 0;
    i -= a, i && i < n.size && rc(n.textBetween(i - 1, i + 1)) && (i += a ? 1 : -1), o = i + (o - l), l = i;
  }
  return { start: i, endA: o, endB: l };
}
function rc(n) {
  if (n.length != 2)
    return !1;
  let e = n.charCodeAt(0), t = n.charCodeAt(1);
  return e >= 56320 && e <= 57343 && t >= 55296 && t <= 56319;
}
class Wd {
  /**
  Create a view. `place` may be a DOM node that the editor should
  be appended to, a function that will place it into the document,
  or an object whose `mount` property holds the node to use as the
  document container. If it is `null`, the editor will not be
  added to the document.
  */
  constructor(e, t) {
    this._root = null, this.focused = !1, this.trackWrites = null, this.mounted = !1, this.markCursor = null, this.cursorWrapper = null, this.lastSelectedViewDesc = void 0, this.input = new Tg(), this.prevDirectPlugins = [], this.pluginViews = [], this.requiresGeckoHackNode = !1, this.dragging = null, this._props = t, this.state = t.state, this.directPlugins = t.plugins || [], this.directPlugins.forEach(ac), this.dispatch = this.dispatch.bind(this), this.dom = e && e.mount || document.createElement("div"), e && (e.appendChild ? e.appendChild(this.dom) : typeof e == "function" ? e(this.dom) : e.mount && (this.mounted = !0)), this.editable = oc(this), ic(this), this.nodeViews = lc(this), this.docView = Fa(this.state.doc, sc(this), $i(this), this.dom, this), this.domObserver = new ey(this, (r, s, i, o) => ly(this, r, s, i, o)), this.domObserver.start(), Ag(this), this.updatePluginViews();
  }
  /**
  Holds `true` when a
  [composition](https://w3c.github.io/uievents/#events-compositionevents)
  is active.
  */
  get composing() {
    return this.input.composing;
  }
  /**
  The view's current [props](https://prosemirror.net/docs/ref/#view.EditorProps).
  */
  get props() {
    if (this._props.state != this.state) {
      let e = this._props;
      this._props = {};
      for (let t in e)
        this._props[t] = e[t];
      this._props.state = this.state;
    }
    return this._props;
  }
  /**
  Update the view's props. Will immediately cause an update to
  the DOM.
  */
  update(e) {
    e.handleDOMEvents != this._props.handleDOMEvents && Po(this);
    let t = this._props;
    this._props = e, e.plugins && (e.plugins.forEach(ac), this.directPlugins = e.plugins), this.updateStateInner(e.state, t);
  }
  /**
  Update the view by updating existing props object with the object
  given as argument. Equivalent to `view.update(Object.assign({},
  view.props, props))`.
  */
  setProps(e) {
    let t = {};
    for (let r in this._props)
      t[r] = this._props[r];
    t.state = this.state;
    for (let r in e)
      t[r] = e[r];
    this.update(t);
  }
  /**
  Update the editor's `state` prop, without touching any of the
  other props.
  */
  updateState(e) {
    this.updateStateInner(e, this._props);
  }
  updateStateInner(e, t) {
    var r;
    let s = this.state, i = !1, o = !1;
    e.storedMarks && this.composing && (Fd(this), o = !0), this.state = e;
    let l = s.plugins != e.plugins || this._props.plugins != t.plugins;
    if (l || this._props.plugins != t.plugins || this._props.nodeViews != t.nodeViews) {
      let h = lc(this);
      fy(h, this.nodeViews) && (this.nodeViews = h, i = !0);
    }
    (l || t.handleDOMEvents != this._props.handleDOMEvents) && Po(this), this.editable = oc(this), ic(this);
    let a = $i(this), c = sc(this), u = s.plugins != e.plugins && !s.doc.eq(e.doc) ? "reset" : e.scrollToSelection > s.scrollToSelection ? "to selection" : "preserve", d = i || !this.docView.matchesNode(e.doc, c, a);
    (d || !e.selection.eq(s.selection)) && (o = !0);
    let f = u == "preserve" && o && this.dom.style.overflowAnchor == null && $m(this);
    if (o) {
      this.domObserver.stop();
      let h = d && (Ze || Ie) && !this.composing && !s.selection.empty && !e.selection.empty && dy(s.selection, e.selection);
      if (d) {
        let p = Ie ? this.trackWrites = this.domSelectionRange().focusNode : null;
        this.composing && (this.input.compositionNode = $g(this)), (i || !this.docView.update(e.doc, c, a, this)) && (this.docView.updateOuterDeco(c), this.docView.destroy(), this.docView = Fa(e.doc, c, a, this.dom, this)), p && !this.trackWrites && (h = !0);
      }
      h || !(this.input.mouseDown && this.domObserver.currentSelection.eq(this.domSelectionRange()) && fg(this)) ? It(this, h) : (Md(this, e.selection), this.domObserver.setCurSelection()), this.domObserver.start();
    }
    this.updatePluginViews(s), !((r = this.dragging) === null || r === void 0) && r.node && !s.doc.eq(e.doc) && this.updateDraggedNode(this.dragging, s), u == "reset" ? this.dom.scrollTop = 0 : u == "to selection" ? this.scrollToSelection() : f && Hm(f);
  }
  /**
  @internal
  */
  scrollToSelection() {
    let e = this.domSelectionRange().focusNode;
    if (!(!e || !this.dom.contains(e.nodeType == 1 ? e : e.parentNode))) {
      if (!this.someProp("handleScrollToSelection", (t) => t(this))) if (this.state.selection instanceof j) {
        let t = this.docView.domAfterPos(this.state.selection.from);
        t.nodeType == 1 && Da(this, t.getBoundingClientRect(), e);
      } else
        Da(this, this.coordsAtPos(this.state.selection.head, 1), e);
    }
  }
  destroyPluginViews() {
    let e;
    for (; e = this.pluginViews.pop(); )
      e.destroy && e.destroy();
  }
  updatePluginViews(e) {
    if (!e || e.plugins != this.state.plugins || this.directPlugins != this.prevDirectPlugins) {
      this.prevDirectPlugins = this.directPlugins, this.destroyPluginViews();
      for (let t = 0; t < this.directPlugins.length; t++) {
        let r = this.directPlugins[t];
        r.spec.view && this.pluginViews.push(r.spec.view(this));
      }
      for (let t = 0; t < this.state.plugins.length; t++) {
        let r = this.state.plugins[t];
        r.spec.view && this.pluginViews.push(r.spec.view(this));
      }
    } else
      for (let t = 0; t < this.pluginViews.length; t++) {
        let r = this.pluginViews[t];
        r.update && r.update(this, e);
      }
  }
  updateDraggedNode(e, t) {
    let r = e.node, s = -1;
    if (this.state.doc.nodeAt(r.from) == r.node)
      s = r.from;
    else {
      let i = r.from + (this.state.doc.content.size - t.doc.content.size);
      (i > 0 && this.state.doc.nodeAt(i)) == r.node && (s = i);
    }
    this.dragging = new zd(e.slice, e.move, s < 0 ? void 0 : j.create(this.state.doc, s));
  }
  someProp(e, t) {
    let r = this._props && this._props[e], s;
    if (r != null && (s = t ? t(r) : r))
      return s;
    for (let o = 0; o < this.directPlugins.length; o++) {
      let l = this.directPlugins[o].props[e];
      if (l != null && (s = t ? t(l) : l))
        return s;
    }
    let i = this.state.plugins;
    if (i)
      for (let o = 0; o < i.length; o++) {
        let l = i[o].props[e];
        if (l != null && (s = t ? t(l) : l))
          return s;
      }
  }
  /**
  Query whether the view has focus.
  */
  hasFocus() {
    if (Ze) {
      let e = this.root.activeElement;
      if (e == this.dom)
        return !0;
      if (!e || !this.dom.contains(e))
        return !1;
      for (; e && this.dom != e && this.dom.contains(e); ) {
        if (e.contentEditable == "false")
          return !1;
        e = e.parentElement;
      }
      return !0;
    }
    return this.root.activeElement == this.dom;
  }
  /**
  Focus the editor.
  */
  focus() {
    this.domObserver.stop(), this.editable && Um(this.dom), It(this), this.domObserver.start();
  }
  /**
  Get the document root in which the editor exists. This will
  usually be the top-level `document`, but might be a [shadow
  DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Shadow_DOM)
  root if the editor is inside one.
  */
  get root() {
    let e = this._root;
    if (e == null) {
      for (let t = this.dom.parentNode; t; t = t.parentNode)
        if (t.nodeType == 9 || t.nodeType == 11 && t.host)
          return t.getSelection || (Object.getPrototypeOf(t).getSelection = () => t.ownerDocument.getSelection()), this._root = t;
    }
    return e || document;
  }
  /**
  When an existing editor view is moved to a new document or
  shadow tree, call this to make it recompute its root.
  */
  updateRoot() {
    this._root = null;
  }
  /**
  Given a pair of viewport coordinates, return the document
  position that corresponds to them. May return null if the given
  coordinates aren't inside of the editor. When an object is
  returned, its `pos` property is the position nearest to the
  coordinates, and its `inside` property holds the position of the
  inner node that the position falls inside of, or -1 if it is at
  the top level, not in any node.
  */
  posAtCoords(e) {
    return Gm(this, e);
  }
  /**
  Returns the viewport rectangle at a given document position.
  `left` and `right` will be the same number, as this returns a
  flat cursor-ish rectangle. If the position is between two things
  that aren't directly adjacent, `side` determines which element
  is used. When < 0, the element before the position is used,
  otherwise the element after.
  */
  coordsAtPos(e, t = 1) {
    return bd(this, e, t);
  }
  /**
  Find the DOM position that corresponds to the given document
  position. When `side` is negative, find the position as close as
  possible to the content before the position. When positive,
  prefer positions close to the content after the position. When
  zero, prefer as shallow a position as possible.
  
  Note that you should **not** mutate the editor's internal DOM,
  only inspect it (and even that is usually not necessary).
  */
  domAtPos(e, t = 0) {
    return this.docView.domFromPos(e, t);
  }
  /**
  Find the DOM node that represents the document node after the
  given position. May return `null` when the position doesn't point
  in front of a node or if the node is inside an opaque node view.
  
  This is intended to be able to call things like
  `getBoundingClientRect` on that DOM node. Do **not** mutate the
  editor DOM directly, or add styling this way, since that will be
  immediately overriden by the editor as it redraws the node.
  */
  nodeDOM(e) {
    let t = this.docView.descAt(e);
    return t ? t.nodeDOM : null;
  }
  /**
  Find the document position that corresponds to a given DOM
  position. (Whenever possible, it is preferable to inspect the
  document structure directly, rather than poking around in the
  DOM, but sometimes—for example when interpreting an event
  target—you don't have a choice.)
  
  The `bias` parameter can be used to influence which side of a DOM
  node to use when the position is inside a leaf node.
  */
  posAtDOM(e, t, r = -1) {
    let s = this.docView.posFromDOM(e, t, r);
    if (s == null)
      throw new RangeError("DOM position not inside the editor");
    return s;
  }
  /**
  Find out whether the selection is at the end of a textblock when
  moving in a given direction. When, for example, given `"left"`,
  it will return true if moving left from the current cursor
  position would leave that position's parent textblock. Will apply
  to the view's current state by default, but it is possible to
  pass a different state.
  */
  endOfTextblock(e, t) {
    return eg(this, t || this.state, e);
  }
  /**
  Run the editor's paste logic with the given HTML string. The
  `event`, if given, will be passed to the
  [`handlePaste`](https://prosemirror.net/docs/ref/#view.EditorProps.handlePaste) hook.
  */
  pasteHTML(e, t) {
    return Ar(this, "", e, !1, t || new ClipboardEvent("paste"));
  }
  /**
  Run the editor's paste logic with the given plain-text input.
  */
  pasteText(e, t) {
    return Ar(this, e, null, !0, t || new ClipboardEvent("paste"));
  }
  /**
  Serialize the given slice as it would be if it was copied from
  this editor. Returns a DOM element that contains a
  representation of the slice as its children, a textual
  representation, and the transformed slice (which can be
  different from the given input due to hooks like
  [`transformCopied`](https://prosemirror.net/docs/ref/#view.EditorProps.transformCopied)).
  */
  serializeForClipboard(e) {
    return kl(this, e);
  }
  /**
  Removes the editor from the DOM and destroys all [node
  views](https://prosemirror.net/docs/ref/#view.NodeView).
  */
  destroy() {
    this.docView && (Ng(this), this.destroyPluginViews(), this.mounted ? (this.docView.update(this.state.doc, [], $i(this), this), this.dom.textContent = "") : this.dom.parentNode && this.dom.parentNode.removeChild(this.dom), this.docView.destroy(), this.docView = null, Dm());
  }
  /**
  This is true when the view has been
  [destroyed](https://prosemirror.net/docs/ref/#view.EditorView.destroy) (and thus should not be
  used anymore).
  */
  get isDestroyed() {
    return this.docView == null;
  }
  /**
  Used for testing.
  */
  dispatchEvent(e) {
    return Rg(this, e);
  }
  /**
  @internal
  */
  domSelectionRange() {
    let e = this.domSelection();
    return e ? He && this.root.nodeType === 11 && Bm(this.dom.ownerDocument) == this.dom && ny(this, e) || e : { focusNode: null, focusOffset: 0, anchorNode: null, anchorOffset: 0 };
  }
  /**
  @internal
  */
  domSelection() {
    return this.root.getSelection();
  }
}
Wd.prototype.dispatch = function(n) {
  let e = this._props.dispatchTransaction;
  e ? e.call(this, n) : this.updateState(this.state.apply(n));
};
function sc(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return e.class = "ProseMirror", e.contenteditable = String(n.editable), n.someProp("attributes", (t) => {
    if (typeof t == "function" && (t = t(n.state)), t)
      for (let r in t)
        r == "class" ? e.class += " " + t[r] : r == "style" ? e.style = (e.style ? e.style + ";" : "") + t[r] : !e[r] && r != "contenteditable" && r != "nodeName" && (e[r] = String(t[r]));
  }), e.translate || (e.translate = "no"), [qe.node(0, n.state.doc.content.size, e)];
}
function ic(n) {
  if (n.markCursor) {
    let e = document.createElement("img");
    e.className = "ProseMirror-separator", e.setAttribute("mark-placeholder", "true"), e.setAttribute("alt", ""), n.cursorWrapper = { dom: e, deco: qe.widget(n.state.selection.from, e, { raw: !0, marks: n.markCursor }) };
  } else
    n.cursorWrapper = null;
}
function oc(n) {
  return !n.someProp("editable", (e) => e(n.state) === !1);
}
function dy(n, e) {
  let t = Math.min(n.$anchor.sharedDepth(n.head), e.$anchor.sharedDepth(e.head));
  return n.$anchor.start(t) != e.$anchor.start(t);
}
function lc(n) {
  let e = /* @__PURE__ */ Object.create(null);
  function t(r) {
    for (let s in r)
      Object.prototype.hasOwnProperty.call(e, s) || (e[s] = r[s]);
  }
  return n.someProp("nodeViews", t), n.someProp("markViews", t), e;
}
function fy(n, e) {
  let t = 0, r = 0;
  for (let s in n) {
    if (n[s] != e[s])
      return !0;
    t++;
  }
  for (let s in e)
    r++;
  return t != r;
}
function ac(n) {
  if (n.spec.state || n.spec.filterTransaction || n.spec.appendTransaction)
    throw new RangeError("Plugins passed directly to the view must not have a state component");
}
var Qt = {
  8: "Backspace",
  9: "Tab",
  10: "Enter",
  12: "NumLock",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  44: "PrintScreen",
  45: "Insert",
  46: "Delete",
  59: ";",
  61: "=",
  91: "Meta",
  92: "Meta",
  106: "*",
  107: "+",
  108: ",",
  109: "-",
  110: ".",
  111: "/",
  144: "NumLock",
  145: "ScrollLock",
  160: "Shift",
  161: "Shift",
  162: "Control",
  163: "Control",
  164: "Alt",
  165: "Alt",
  173: "-",
  186: ";",
  187: "=",
  188: ",",
  189: "-",
  190: ".",
  191: "/",
  192: "`",
  219: "[",
  220: "\\",
  221: "]",
  222: "'"
}, xs = {
  48: ")",
  49: "!",
  50: "@",
  51: "#",
  52: "$",
  53: "%",
  54: "^",
  55: "&",
  56: "*",
  57: "(",
  59: ":",
  61: "+",
  173: "_",
  186: ":",
  187: "+",
  188: "<",
  189: "_",
  190: ">",
  191: "?",
  192: "~",
  219: "{",
  220: "|",
  221: "}",
  222: '"'
}, hy = typeof navigator < "u" && /Mac/.test(navigator.platform), py = typeof navigator < "u" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
for (var ze = 0; ze < 10; ze++) Qt[48 + ze] = Qt[96 + ze] = String(ze);
for (var ze = 1; ze <= 24; ze++) Qt[ze + 111] = "F" + ze;
for (var ze = 65; ze <= 90; ze++)
  Qt[ze] = String.fromCharCode(ze + 32), xs[ze] = String.fromCharCode(ze);
for (var Ui in Qt) xs.hasOwnProperty(Ui) || (xs[Ui] = Qt[Ui]);
function my(n) {
  var e = hy && n.metaKey && n.shiftKey && !n.ctrlKey && !n.altKey || py && n.shiftKey && n.key && n.key.length == 1 || n.key == "Unidentified", t = !e && n.key || (n.shiftKey ? xs : Qt)[n.keyCode] || n.key || "Unidentified";
  return t == "Esc" && (t = "Escape"), t == "Del" && (t = "Delete"), t == "Left" && (t = "ArrowLeft"), t == "Up" && (t = "ArrowUp"), t == "Right" && (t = "ArrowRight"), t == "Down" && (t = "ArrowDown"), t;
}
const gy = typeof navigator < "u" && /Mac|iP(hone|[oa]d)/.test(navigator.platform), yy = typeof navigator < "u" && /Win/.test(navigator.platform);
function by(n) {
  let e = n.split(/-(?!$)/), t = e[e.length - 1];
  t == "Space" && (t = " ");
  let r, s, i, o;
  for (let l = 0; l < e.length - 1; l++) {
    let a = e[l];
    if (/^(cmd|meta|m)$/i.test(a))
      o = !0;
    else if (/^a(lt)?$/i.test(a))
      r = !0;
    else if (/^(c|ctrl|control)$/i.test(a))
      s = !0;
    else if (/^s(hift)?$/i.test(a))
      i = !0;
    else if (/^mod$/i.test(a))
      gy ? o = !0 : s = !0;
    else
      throw new Error("Unrecognized modifier name: " + a);
  }
  return r && (t = "Alt-" + t), s && (t = "Ctrl-" + t), o && (t = "Meta-" + t), i && (t = "Shift-" + t), t;
}
function xy(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n)
    e[by(t)] = n[t];
  return e;
}
function Wi(n, e, t = !0) {
  return e.altKey && (n = "Alt-" + n), e.ctrlKey && (n = "Ctrl-" + n), e.metaKey && (n = "Meta-" + n), t && e.shiftKey && (n = "Shift-" + n), n;
}
function ky(n) {
  return new ge({ props: { handleKeyDown: qd(n) } });
}
function qd(n) {
  let e = xy(n);
  return function(t, r) {
    let s = my(r), i, o = e[Wi(s, r)];
    if (o && o(t.state, t.dispatch, t))
      return !0;
    if (s.length == 1 && s != " ") {
      if (r.shiftKey) {
        let l = e[Wi(s, r, !1)];
        if (l && l(t.state, t.dispatch, t))
          return !0;
      }
      if ((r.altKey || r.metaKey || r.ctrlKey) && // Ctrl-Alt may be used for AltGr on Windows
      !(yy && r.ctrlKey && r.altKey) && (i = Qt[r.keyCode]) && i != s) {
        let l = e[Wi(i, r)];
        if (l && l(t.state, t.dispatch, t))
          return !0;
      }
    }
    return !1;
  };
}
var vy = Object.defineProperty, Ml = (n, e) => {
  for (var t in e)
    vy(n, t, { get: e[t], enumerable: !0 });
};
function ci(n) {
  const { state: e, transaction: t } = n;
  let { selection: r } = t, { doc: s } = t, { storedMarks: i } = t;
  return {
    ...e,
    apply: e.apply.bind(e),
    applyTransaction: e.applyTransaction.bind(e),
    plugins: e.plugins,
    schema: e.schema,
    reconfigure: e.reconfigure.bind(e),
    toJSON: e.toJSON.bind(e),
    get storedMarks() {
      return i;
    },
    get selection() {
      return r;
    },
    get doc() {
      return s;
    },
    get tr() {
      return r = t.selection, s = t.doc, i = t.storedMarks, t;
    }
  };
}
var ui = class {
  constructor(n) {
    this.editor = n.editor, this.rawCommands = this.editor.extensionManager.commands, this.customState = n.state;
  }
  get hasCustomState() {
    return !!this.customState;
  }
  get state() {
    return this.customState || this.editor.state;
  }
  get commands() {
    const { rawCommands: n, editor: e, state: t } = this, { view: r } = e, { tr: s } = t, i = this.buildProps(s);
    return Object.fromEntries(
      Object.entries(n).map(([o, l]) => [o, (...c) => {
        const u = l(...c)(i);
        return !s.getMeta("preventDispatch") && !this.hasCustomState && r.dispatch(s), u;
      }])
    );
  }
  get chain() {
    return () => this.createChain();
  }
  get can() {
    return () => this.createCan();
  }
  createChain(n, e = !0) {
    const { rawCommands: t, editor: r, state: s } = this, { view: i } = r, o = [], l = !!n, a = n || s.tr, c = () => (!l && e && !a.getMeta("preventDispatch") && !this.hasCustomState && i.dispatch(a), o.every((d) => d === !0)), u = {
      ...Object.fromEntries(
        Object.entries(t).map(([d, f]) => [d, (...p) => {
          const m = this.buildProps(a, e), g = f(...p)(m);
          return o.push(g), u;
        }])
      ),
      run: c
    };
    return u;
  }
  createCan(n) {
    const { rawCommands: e, state: t } = this, r = !1, s = n || t.tr, i = this.buildProps(s, r);
    return {
      ...Object.fromEntries(
        Object.entries(e).map(([l, a]) => [l, (...c) => a(...c)({ ...i, dispatch: void 0 })])
      ),
      chain: () => this.createChain(s, r)
    };
  }
  buildProps(n, e = !0) {
    const { rawCommands: t, editor: r, state: s } = this, { view: i } = r, o = {
      tr: n,
      editor: r,
      view: i,
      state: ci({
        state: s,
        transaction: n
      }),
      dispatch: e ? () => {
      } : void 0,
      chain: () => this.createChain(n, e),
      can: () => this.createCan(n),
      get commands() {
        return Object.fromEntries(
          Object.entries(t).map(([l, a]) => [l, (...c) => a(...c)(o)])
        );
      }
    };
    return o;
  }
}, Kd = {};
Ml(Kd, {
  blur: () => Sy,
  clearContent: () => wy,
  clearNodes: () => Cy,
  command: () => Ey,
  createParagraphNear: () => My,
  cut: () => Ty,
  deleteCurrentNode: () => Ay,
  deleteNode: () => Ny,
  deleteRange: () => Oy,
  deleteSelection: () => Ry,
  enter: () => Dy,
  exitCode: () => Iy,
  extendMarkRange: () => Ly,
  first: () => Py,
  focus: () => _y,
  forEach: () => By,
  insertContent: () => Fy,
  insertContentAt: () => jy,
  joinBackward: () => Uy,
  joinDown: () => Hy,
  joinForward: () => Wy,
  joinItemBackward: () => qy,
  joinItemForward: () => Ky,
  joinTextblockBackward: () => Jy,
  joinTextblockForward: () => Gy,
  joinUp: () => $y,
  keyboardShortcut: () => Xy,
  lift: () => Qy,
  liftEmptyBlock: () => Zy,
  liftListItem: () => e0,
  newlineInCode: () => t0,
  resetAttributes: () => n0,
  scrollIntoView: () => r0,
  selectAll: () => s0,
  selectNodeBackward: () => i0,
  selectNodeForward: () => o0,
  selectParentNode: () => l0,
  selectTextblockEnd: () => a0,
  selectTextblockStart: () => c0,
  setContent: () => u0,
  setMark: () => O0,
  setMeta: () => R0,
  setNode: () => D0,
  setNodeSelection: () => I0,
  setTextDirection: () => L0,
  setTextSelection: () => P0,
  sinkListItem: () => _0,
  splitBlock: () => B0,
  splitListItem: () => F0,
  toggleList: () => V0,
  toggleMark: () => z0,
  toggleNode: () => j0,
  toggleWrap: () => $0,
  undoInputRule: () => H0,
  unsetAllMarks: () => U0,
  unsetMark: () => W0,
  unsetTextDirection: () => q0,
  updateAttributes: () => K0,
  wrapIn: () => J0,
  wrapInList: () => G0
});
var Sy = () => ({ editor: n, view: e }) => (requestAnimationFrame(() => {
  var t;
  n.isDestroyed || (e.dom.blur(), (t = window == null ? void 0 : window.getSelection()) == null || t.removeAllRanges());
}), !0), wy = (n = !0) => ({ commands: e }) => e.setContent("", { emitUpdate: n }), Cy = () => ({ state: n, tr: e, dispatch: t }) => {
  const { selection: r } = e, { ranges: s } = r;
  return t && s.forEach(({ $from: i, $to: o }) => {
    n.doc.nodesBetween(i.pos, o.pos, (l, a) => {
      if (l.type.isText)
        return;
      const { doc: c, mapping: u } = e, d = c.resolve(u.map(a)), f = c.resolve(u.map(a + l.nodeSize)), h = d.blockRange(f);
      if (!h)
        return;
      const p = tr(h);
      if (l.type.isTextblock) {
        const { defaultType: m } = d.parent.contentMatchAt(d.index());
        e.setNodeMarkup(h.start, m);
      }
      (p || p === 0) && e.lift(h, p);
    });
  }), !0;
}, Ey = (n) => (e) => n(e), My = () => ({ state: n, dispatch: e }) => ld(n, e), Ty = (n, e) => ({ editor: t, tr: r }) => {
  const { state: s } = t, i = s.doc.slice(n.from, n.to);
  r.deleteRange(n.from, n.to);
  const o = r.mapping.map(e);
  return r.insert(o, i.content), r.setSelection(new q(r.doc.resolve(Math.max(o - 1, 0)))), !0;
}, Ay = () => ({ tr: n, dispatch: e }) => {
  const { selection: t } = n, r = t.$anchor.node();
  if (r.content.size > 0)
    return !1;
  const s = n.selection.$anchor;
  for (let i = s.depth; i > 0; i -= 1)
    if (s.node(i).type === r.type) {
      if (e) {
        const l = s.before(i), a = s.after(i);
        n.delete(l, a).scrollIntoView();
      }
      return !0;
    }
  return !1;
};
function Ae(n, e) {
  if (typeof n == "string") {
    if (!e.nodes[n])
      throw Error(`There is no node type named '${n}'. Maybe you forgot to add the extension?`);
    return e.nodes[n];
  }
  return n;
}
var Ny = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const s = Ae(n, t.schema), i = e.selection.$anchor;
  for (let o = i.depth; o > 0; o -= 1)
    if (i.node(o).type === s) {
      if (r) {
        const a = i.before(o), c = i.after(o);
        e.delete(a, c).scrollIntoView();
      }
      return !0;
    }
  return !1;
}, Oy = (n) => ({ tr: e, dispatch: t }) => {
  const { from: r, to: s } = n;
  return t && e.delete(r, s), !0;
}, Ry = () => ({ state: n, dispatch: e }) => fl(n, e), Dy = () => ({ commands: n }) => n.keyboardShortcut("Enter"), Iy = () => ({ state: n, dispatch: e }) => ym(n, e);
function Tl(n) {
  return Object.prototype.toString.call(n) === "[object RegExp]";
}
function ks(n, e, t = { strict: !0 }) {
  const r = Object.keys(e);
  return r.length ? r.every((s) => t.strict ? e[s] === n[s] : Tl(e[s]) ? e[s].test(n[s]) : e[s] === n[s]) : !0;
}
function Jd(n, e, t = {}) {
  return n.find((r) => r.type === e && ks(
    // Only check equality for the attributes that are provided
    Object.fromEntries(Object.keys(t).map((s) => [s, r.attrs[s]])),
    t
  ));
}
function cc(n, e, t = {}) {
  return !!Jd(n, e, t);
}
function Al(n, e, t) {
  var r;
  if (!n || !e)
    return;
  let s = n.parent.childAfter(n.parentOffset);
  if ((!s.node || !s.node.marks.some((u) => u.type === e)) && (s = n.parent.childBefore(n.parentOffset)), !s.node || !s.node.marks.some((u) => u.type === e) || (t = t || ((r = s.node.marks[0]) == null ? void 0 : r.attrs), !Jd([...s.node.marks], e, t)))
    return;
  let o = s.index, l = n.start() + s.offset, a = o + 1, c = l + s.node.nodeSize;
  for (; o > 0 && cc([...n.parent.child(o - 1).marks], e, t); )
    o -= 1, l -= n.parent.child(o).nodeSize;
  for (; a < n.parent.childCount && cc([...n.parent.child(a).marks], e, t); )
    c += n.parent.child(a).nodeSize, a += 1;
  return {
    from: l,
    to: c
  };
}
function Pt(n, e) {
  if (typeof n == "string") {
    if (!e.marks[n])
      throw Error(`There is no mark type named '${n}'. Maybe you forgot to add the extension?`);
    return e.marks[n];
  }
  return n;
}
var Ly = (n, e = {}) => ({ tr: t, state: r, dispatch: s }) => {
  const i = Pt(n, r.schema), { doc: o, selection: l } = t, { $from: a, from: c, to: u } = l;
  if (s) {
    const d = Al(a, i, e);
    if (d && d.from <= c && d.to >= u) {
      const f = q.create(o, d.from, d.to);
      t.setSelection(f);
    }
  }
  return !0;
}, Py = (n) => (e) => {
  const t = typeof n == "function" ? n(e) : n;
  for (let r = 0; r < t.length; r += 1)
    if (t[r](e))
      return !0;
  return !1;
};
function Gd(n) {
  return n instanceof q;
}
function hn(n = 0, e = 0, t = 0) {
  return Math.min(Math.max(n, e), t);
}
function Yd(n, e = null) {
  if (!e)
    return null;
  const t = Y.atStart(n), r = Y.atEnd(n);
  if (e === "start" || e === !0)
    return t;
  if (e === "end")
    return r;
  const s = t.from, i = r.to;
  return e === "all" ? q.create(n, hn(0, s, i), hn(n.content.size, s, i)) : q.create(n, hn(e, s, i), hn(e, s, i));
}
function Xd() {
  return navigator.platform === "Android" || /android/i.test(navigator.userAgent);
}
function di() {
  return ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"].includes(navigator.platform) || // iPad on iOS 13 detection
  navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
var _y = (n = null, e = {}) => ({ editor: t, view: r, tr: s, dispatch: i }) => {
  e = {
    scrollIntoView: !0,
    ...e
  };
  const o = () => {
    (di() || Xd()) && r.dom.focus(), requestAnimationFrame(() => {
      t.isDestroyed || (r.focus(), e != null && e.scrollIntoView && t.commands.scrollIntoView());
    });
  };
  if (r.hasFocus() && n === null || n === !1)
    return !0;
  if (i && n === null && !Gd(t.state.selection))
    return o(), !0;
  const l = Yd(s.doc, n) || t.state.selection, a = t.state.selection.eq(l);
  return i && (a || s.setSelection(l), a && s.storedMarks && s.setStoredMarks(s.storedMarks), o()), !0;
}, By = (n, e) => (t) => n.every((r, s) => e(r, { ...t, index: s })), Fy = (n, e) => ({ tr: t, commands: r }) => r.insertContentAt({ from: t.selection.from, to: t.selection.to }, n, e), Qd = (n) => {
  const e = n.childNodes;
  for (let t = e.length - 1; t >= 0; t -= 1) {
    const r = e[t];
    r.nodeType === 3 && r.nodeValue && /^(\n\s\s|\n)$/.test(r.nodeValue) ? n.removeChild(r) : r.nodeType === 1 && Qd(r);
  }
  return n;
};
function Ur(n) {
  if (typeof window > "u")
    throw new Error("[tiptap error]: there is no window object available, so this function cannot be used");
  const e = `<body>${n}</body>`, t = new window.DOMParser().parseFromString(e, "text/html").body;
  return Qd(t);
}
function Or(n, e, t) {
  if (n instanceof bt || n instanceof A)
    return n;
  t = {
    slice: !0,
    parseOptions: {},
    ...t
  };
  const r = typeof n == "object" && n !== null, s = typeof n == "string";
  if (r)
    try {
      if (Array.isArray(n) && n.length > 0)
        return A.fromArray(n.map((l) => e.nodeFromJSON(l)));
      const o = e.nodeFromJSON(n);
      return t.errorOnInvalidContent && o.check(), o;
    } catch (i) {
      if (t.errorOnInvalidContent)
        throw new Error("[tiptap error]: Invalid JSON content", { cause: i });
      return console.warn("[tiptap warn]: Invalid content.", "Passed value:", n, "Error:", i), Or("", e, t);
    }
  if (s) {
    if (t.errorOnInvalidContent) {
      let o = !1, l = "";
      const a = new Lu({
        topNode: e.spec.topNode,
        marks: e.spec.marks,
        // Prosemirror's schemas are executed such that: the last to execute, matches last
        // This means that we can add a catch-all node at the end of the schema to catch any content that we don't know how to handle
        nodes: e.spec.nodes.append({
          __tiptap__private__unknown__catch__all__node: {
            content: "inline*",
            group: "block",
            parseDOM: [
              {
                tag: "*",
                getAttrs: (c) => (o = !0, l = typeof c == "string" ? c : c.outerHTML, null)
              }
            ]
          }
        })
      });
      if (t.slice ? Jt.fromSchema(a).parseSlice(Ur(n), t.parseOptions) : Jt.fromSchema(a).parse(Ur(n), t.parseOptions), t.errorOnInvalidContent && o)
        throw new Error("[tiptap error]: Invalid HTML content", {
          cause: new Error(`Invalid element found: ${l}`)
        });
    }
    const i = Jt.fromSchema(e);
    return t.slice ? i.parseSlice(Ur(n), t.parseOptions).content : i.parse(Ur(n), t.parseOptions);
  }
  return Or("", e, t);
}
function Vy(n, e, t) {
  const r = n.steps.length - 1;
  if (r < e)
    return;
  const s = n.steps[r];
  if (!(s instanceof De || s instanceof Le))
    return;
  const i = n.mapping.maps[r];
  let o = 0;
  i.forEach((l, a, c, u) => {
    o === 0 && (o = u);
  }), n.setSelection(Y.near(n.doc.resolve(o), t));
}
var zy = (n) => !("type" in n), jy = (n, e, t) => ({ tr: r, dispatch: s, editor: i }) => {
  var o;
  if (s) {
    t = {
      parseOptions: i.options.parseOptions,
      updateSelection: !0,
      applyInputRules: !1,
      applyPasteRules: !1,
      ...t
    };
    let l;
    const a = (g) => {
      i.emit("contentError", {
        editor: i,
        error: g,
        disableCollaboration: () => {
          "collaboration" in i.storage && typeof i.storage.collaboration == "object" && i.storage.collaboration && (i.storage.collaboration.isDisabled = !0);
        }
      });
    }, c = {
      preserveWhitespace: "full",
      ...t.parseOptions
    };
    if (!t.errorOnInvalidContent && !i.options.enableContentCheck && i.options.emitContentError)
      try {
        Or(e, i.schema, {
          parseOptions: c,
          errorOnInvalidContent: !0
        });
      } catch (g) {
        a(g);
      }
    try {
      l = Or(e, i.schema, {
        parseOptions: c,
        errorOnInvalidContent: (o = t.errorOnInvalidContent) != null ? o : i.options.enableContentCheck
      });
    } catch (g) {
      return a(g), !1;
    }
    let { from: u, to: d } = typeof n == "number" ? { from: n, to: n } : { from: n.from, to: n.to }, f = !0, h = !0;
    if ((zy(l) ? l : [l]).forEach((g) => {
      g.check(), f = f ? g.isText && g.marks.length === 0 : !1, h = h ? g.isBlock : !1;
    }), u === d && h) {
      const { parent: g } = r.doc.resolve(u);
      g.isTextblock && !g.type.spec.code && !g.childCount && (u -= 1, d += 1);
    }
    let m;
    if (f) {
      if (Array.isArray(e))
        m = e.map((g) => g.text || "").join("");
      else if (e instanceof A) {
        let g = "";
        e.forEach((y) => {
          y.text && (g += y.text);
        }), m = g;
      } else typeof e == "object" && e && e.text ? m = e.text : m = e;
      r.insertText(m, u, d);
    } else {
      m = l;
      const g = r.doc.resolve(u), y = g.node(), k = g.parentOffset === 0, C = y.isText || y.isTextblock, v = y.content.size > 0;
      k && C && v && (u = Math.max(0, u - 1)), r.replaceWith(u, d, m);
    }
    t.updateSelection && Vy(r, r.steps.length - 1, -1), t.applyInputRules && r.setMeta("applyInputRules", { from: u, text: m }), t.applyPasteRules && r.setMeta("applyPasteRules", { from: u, text: m });
  }
  return !0;
}, $y = () => ({ state: n, dispatch: e }) => pm(n, e), Hy = () => ({ state: n, dispatch: e }) => mm(n, e), Uy = () => ({ state: n, dispatch: e }) => ed(n, e), Wy = () => ({ state: n, dispatch: e }) => sd(n, e), qy = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = ri(n.doc, n.selection.$from.pos, -1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, Ky = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = ri(n.doc, n.selection.$from.pos, 1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, Jy = () => ({ state: n, dispatch: e }) => fm(n, e), Gy = () => ({ state: n, dispatch: e }) => hm(n, e);
function Zd() {
  return typeof navigator < "u" ? /Mac/.test(navigator.platform) : !1;
}
function Yy(n) {
  const e = n.split(/-(?!$)/);
  let t = e[e.length - 1];
  t === "Space" && (t = " ");
  let r, s, i, o;
  for (let l = 0; l < e.length - 1; l += 1) {
    const a = e[l];
    if (/^(cmd|meta|m)$/i.test(a))
      o = !0;
    else if (/^a(lt)?$/i.test(a))
      r = !0;
    else if (/^(c|ctrl|control)$/i.test(a))
      s = !0;
    else if (/^s(hift)?$/i.test(a))
      i = !0;
    else if (/^mod$/i.test(a))
      di() || Zd() ? o = !0 : s = !0;
    else
      throw new Error(`Unrecognized modifier name: ${a}`);
  }
  return r && (t = `Alt-${t}`), s && (t = `Ctrl-${t}`), o && (t = `Meta-${t}`), i && (t = `Shift-${t}`), t;
}
var Xy = (n) => ({ editor: e, view: t, tr: r, dispatch: s }) => {
  const i = Yy(n).split(/-(?!$)/), o = i.find((c) => !["Alt", "Ctrl", "Meta", "Shift"].includes(c)), l = new KeyboardEvent("keydown", {
    key: o === "Space" ? " " : o,
    altKey: i.includes("Alt"),
    ctrlKey: i.includes("Ctrl"),
    metaKey: i.includes("Meta"),
    shiftKey: i.includes("Shift"),
    bubbles: !0,
    cancelable: !0
  }), a = e.captureTransaction(() => {
    t.someProp("handleKeyDown", (c) => c(t, l));
  });
  return a == null || a.steps.forEach((c) => {
    const u = c.map(r.mapping);
    u && s && r.maybeStep(u);
  }), !0;
};
function Zt(n, e, t = {}) {
  const { from: r, to: s, empty: i } = n.selection, o = e ? Ae(e, n.schema) : null, l = [];
  n.doc.nodesBetween(r, s, (d, f) => {
    if (d.isText)
      return;
    const h = Math.max(r, f), p = Math.min(s, f + d.nodeSize);
    l.push({
      node: d,
      from: h,
      to: p
    });
  });
  const a = s - r, c = l.filter((d) => o ? o.name === d.node.type.name : !0).filter((d) => ks(d.node.attrs, t, { strict: !1 }));
  return i ? !!c.length : c.reduce((d, f) => d + f.to - f.from, 0) >= a;
}
var Qy = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const s = Ae(n, t.schema);
  return Zt(t, s, e) ? gm(t, r) : !1;
}, Zy = () => ({ state: n, dispatch: e }) => ad(n, e), e0 = (n) => ({ state: e, dispatch: t }) => {
  const r = Ae(n, e.schema);
  return Am(r)(e, t);
}, t0 = () => ({ state: n, dispatch: e }) => od(n, e);
function fi(n, e) {
  return e.nodes[n] ? "node" : e.marks[n] ? "mark" : null;
}
function uc(n, e) {
  const t = typeof e == "string" ? [e] : e;
  return Object.keys(n).reduce((r, s) => (t.includes(s) || (r[s] = n[s]), r), {});
}
var n0 = (n, e) => ({ tr: t, state: r, dispatch: s }) => {
  let i = null, o = null;
  const l = fi(
    typeof n == "string" ? n : n.name,
    r.schema
  );
  if (!l)
    return !1;
  l === "node" && (i = Ae(n, r.schema)), l === "mark" && (o = Pt(n, r.schema));
  let a = !1;
  return t.selection.ranges.forEach((c) => {
    r.doc.nodesBetween(c.$from.pos, c.$to.pos, (u, d) => {
      i && i === u.type && (a = !0, s && t.setNodeMarkup(d, void 0, uc(u.attrs, e))), o && u.marks.length && u.marks.forEach((f) => {
        o === f.type && (a = !0, s && t.addMark(d, d + u.nodeSize, o.create(uc(f.attrs, e))));
      });
    });
  }), a;
}, r0 = () => ({ tr: n, dispatch: e }) => (e && n.scrollIntoView(), !0), s0 = () => ({ tr: n, dispatch: e }) => {
  if (e) {
    const t = new rt(n.doc);
    n.setSelection(t);
  }
  return !0;
}, i0 = () => ({ state: n, dispatch: e }) => nd(n, e), o0 = () => ({ state: n, dispatch: e }) => id(n, e), l0 = () => ({ state: n, dispatch: e }) => km(n, e), a0 = () => ({ state: n, dispatch: e }) => wm(n, e), c0 = () => ({ state: n, dispatch: e }) => Sm(n, e);
function _o(n, e, t = {}, r = {}) {
  return Or(n, e, {
    slice: !1,
    parseOptions: t,
    errorOnInvalidContent: r.errorOnInvalidContent
  });
}
var u0 = (n, { errorOnInvalidContent: e, emitUpdate: t = !0, parseOptions: r = {} } = {}) => ({ editor: s, tr: i, dispatch: o, commands: l }) => {
  const { doc: a } = i;
  if (r.preserveWhitespace !== "full") {
    const c = _o(n, s.schema, r, {
      errorOnInvalidContent: e ?? s.options.enableContentCheck
    });
    return o && i.replaceWith(0, a.content.size, c).setMeta("preventUpdate", !t), !0;
  }
  return o && i.setMeta("preventUpdate", !t), l.insertContentAt({ from: 0, to: a.content.size }, n, {
    parseOptions: r,
    errorOnInvalidContent: e ?? s.options.enableContentCheck
  });
};
function ef(n, e) {
  const t = Pt(e, n.schema), { from: r, to: s, empty: i } = n.selection, o = [];
  i ? (n.storedMarks && o.push(...n.storedMarks), o.push(...n.selection.$head.marks())) : n.doc.nodesBetween(r, s, (a) => {
    o.push(...a.marks);
  });
  const l = o.find((a) => a.type.name === t.name);
  return l ? { ...l.attrs } : {};
}
function tf(n, e) {
  const t = new Yu(n);
  return e.forEach((r) => {
    r.steps.forEach((s) => {
      t.step(s);
    });
  }), t;
}
function d0(n) {
  for (let e = 0; e < n.edgeCount; e += 1) {
    const { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
function f0(n, e, t) {
  const r = [];
  return n.nodesBetween(e.from, e.to, (s, i) => {
    t(s) && r.push({
      node: s,
      pos: i
    });
  }), r;
}
function h0(n, e) {
  for (let t = n.depth; t > 0; t -= 1) {
    const r = n.node(t);
    if (e(r))
      return {
        pos: t > 0 ? n.before(t) : 0,
        start: n.start(t),
        depth: t,
        node: r
      };
  }
}
function hi(n) {
  return (e) => h0(e.$from, n);
}
function $(n, e, t) {
  return n.config[e] === void 0 && n.parent ? $(n.parent, e, t) : typeof n.config[e] == "function" ? n.config[e].bind({
    ...t,
    parent: n.parent ? $(n.parent, e, t) : null
  }) : n.config[e];
}
function Nl(n) {
  return n.map((e) => {
    const t = {
      name: e.name,
      options: e.options,
      storage: e.storage
    }, r = $(e, "addExtensions", t);
    return r ? [e, ...Nl(r())] : e;
  }).flat(10);
}
function Ol(n, e) {
  const t = Mn.fromSchema(e).serializeFragment(n), s = document.implementation.createHTMLDocument().createElement("div");
  return s.appendChild(t), s.innerHTML;
}
function nf(n) {
  return typeof n == "function";
}
function oe(n, e = void 0, ...t) {
  return nf(n) ? e ? n.bind(e)(...t) : n(...t) : n;
}
function p0(n = {}) {
  return Object.keys(n).length === 0 && n.constructor === Object;
}
function Xn(n) {
  const e = n.filter((s) => s.type === "extension"), t = n.filter((s) => s.type === "node"), r = n.filter((s) => s.type === "mark");
  return {
    baseExtensions: e,
    nodeExtensions: t,
    markExtensions: r
  };
}
function rf(n) {
  const e = [], { nodeExtensions: t, markExtensions: r } = Xn(n), s = [...t, ...r], i = {
    default: null,
    validate: void 0,
    rendered: !0,
    renderHTML: null,
    parseHTML: null,
    keepOnSplit: !0,
    isRequired: !1
  };
  return n.forEach((o) => {
    const l = {
      name: o.name,
      options: o.options,
      storage: o.storage,
      extensions: s
    }, a = $(
      o,
      "addGlobalAttributes",
      l
    );
    if (!a)
      return;
    a().forEach((u) => {
      u.types.forEach((d) => {
        Object.entries(u.attributes).forEach(([f, h]) => {
          e.push({
            type: d,
            name: f,
            attribute: {
              ...i,
              ...h
            }
          });
        });
      });
    });
  }), s.forEach((o) => {
    const l = {
      name: o.name,
      options: o.options,
      storage: o.storage
    }, a = $(
      o,
      "addAttributes",
      l
    );
    if (!a)
      return;
    const c = a();
    Object.entries(c).forEach(([u, d]) => {
      const f = {
        ...i,
        ...d
      };
      typeof (f == null ? void 0 : f.default) == "function" && (f.default = f.default()), f != null && f.isRequired && (f == null ? void 0 : f.default) === void 0 && delete f.default, e.push({
        type: o.name,
        name: u,
        attribute: f
      });
    });
  }), e;
}
function Ne(...n) {
  return n.filter((e) => !!e).reduce((e, t) => {
    const r = { ...e };
    return Object.entries(t).forEach(([s, i]) => {
      if (!r[s]) {
        r[s] = i;
        return;
      }
      if (s === "class") {
        const l = i ? String(i).split(" ") : [], a = r[s] ? r[s].split(" ") : [], c = l.filter((u) => !a.includes(u));
        r[s] = [...a, ...c].join(" ");
      } else if (s === "style") {
        const l = i ? i.split(";").map((u) => u.trim()).filter(Boolean) : [], a = r[s] ? r[s].split(";").map((u) => u.trim()).filter(Boolean) : [], c = /* @__PURE__ */ new Map();
        a.forEach((u) => {
          const [d, f] = u.split(":").map((h) => h.trim());
          c.set(d, f);
        }), l.forEach((u) => {
          const [d, f] = u.split(":").map((h) => h.trim());
          c.set(d, f);
        }), r[s] = Array.from(c.entries()).map(([u, d]) => `${u}: ${d}`).join("; ");
      } else
        r[s] = i;
    }), r;
  }, {});
}
function Rr(n, e) {
  return e.filter((t) => t.type === n.type.name).filter((t) => t.attribute.rendered).map((t) => t.attribute.renderHTML ? t.attribute.renderHTML(n.attrs) || {} : {
    [t.name]: n.attrs[t.name]
  }).reduce((t, r) => Ne(t, r), {});
}
function m0(n) {
  return typeof n != "string" ? n : n.match(/^[+-]?(?:\d*\.)?\d+$/) ? Number(n) : n === "true" ? !0 : n === "false" ? !1 : n;
}
function dc(n, e) {
  return "style" in n ? n : {
    ...n,
    getAttrs: (t) => {
      const r = n.getAttrs ? n.getAttrs(t) : n.attrs;
      if (r === !1)
        return !1;
      const s = e.reduce((i, o) => {
        const l = o.attribute.parseHTML ? o.attribute.parseHTML(t) : m0(t.getAttribute(o.name));
        return l == null ? i : {
          ...i,
          [o.name]: l
        };
      }, {});
      return { ...r, ...s };
    }
  };
}
function fc(n) {
  return Object.fromEntries(
    // @ts-ignore
    Object.entries(n).filter(([e, t]) => e === "attrs" && p0(t) ? !1 : t != null)
  );
}
function hc(n) {
  var e, t;
  const r = {};
  return !((e = n == null ? void 0 : n.attribute) != null && e.isRequired) && "default" in ((n == null ? void 0 : n.attribute) || {}) && (r.default = n.attribute.default), ((t = n == null ? void 0 : n.attribute) == null ? void 0 : t.validate) !== void 0 && (r.validate = n.attribute.validate), [n.name, r];
}
function g0(n, e) {
  var t;
  const r = rf(n), { nodeExtensions: s, markExtensions: i } = Xn(n), o = (t = s.find((c) => $(c, "topNode"))) == null ? void 0 : t.name, l = Object.fromEntries(
    s.map((c) => {
      const u = r.filter((y) => y.type === c.name), d = {
        name: c.name,
        options: c.options,
        storage: c.storage,
        editor: e
      }, f = n.reduce((y, k) => {
        const C = $(k, "extendNodeSchema", d);
        return {
          ...y,
          ...C ? C(c) : {}
        };
      }, {}), h = fc({
        ...f,
        content: oe($(c, "content", d)),
        marks: oe($(c, "marks", d)),
        group: oe($(c, "group", d)),
        inline: oe($(c, "inline", d)),
        atom: oe($(c, "atom", d)),
        selectable: oe($(c, "selectable", d)),
        draggable: oe($(c, "draggable", d)),
        code: oe($(c, "code", d)),
        whitespace: oe($(c, "whitespace", d)),
        linebreakReplacement: oe(
          $(c, "linebreakReplacement", d)
        ),
        defining: oe($(c, "defining", d)),
        isolating: oe($(c, "isolating", d)),
        attrs: Object.fromEntries(u.map(hc))
      }), p = oe($(c, "parseHTML", d));
      p && (h.parseDOM = p.map(
        (y) => dc(y, u)
      ));
      const m = $(c, "renderHTML", d);
      m && (h.toDOM = (y) => m({
        node: y,
        HTMLAttributes: Rr(y, u)
      }));
      const g = $(c, "renderText", d);
      return g && (h.toText = g), [c.name, h];
    })
  ), a = Object.fromEntries(
    i.map((c) => {
      const u = r.filter((g) => g.type === c.name), d = {
        name: c.name,
        options: c.options,
        storage: c.storage,
        editor: e
      }, f = n.reduce((g, y) => {
        const k = $(y, "extendMarkSchema", d);
        return {
          ...g,
          ...k ? k(c) : {}
        };
      }, {}), h = fc({
        ...f,
        inclusive: oe($(c, "inclusive", d)),
        excludes: oe($(c, "excludes", d)),
        group: oe($(c, "group", d)),
        spanning: oe($(c, "spanning", d)),
        code: oe($(c, "code", d)),
        attrs: Object.fromEntries(u.map(hc))
      }), p = oe($(c, "parseHTML", d));
      p && (h.parseDOM = p.map(
        (g) => dc(g, u)
      ));
      const m = $(c, "renderHTML", d);
      return m && (h.toDOM = (g) => m({
        mark: g,
        HTMLAttributes: Rr(g, u)
      })), [c.name, h];
    })
  );
  return new Lu({
    topNode: o,
    nodes: l,
    marks: a
  });
}
function y0(n) {
  const e = n.filter((t, r) => n.indexOf(t) !== r);
  return Array.from(new Set(e));
}
function Rl(n) {
  return n.sort((t, r) => {
    const s = $(t, "priority") || 100, i = $(r, "priority") || 100;
    return s > i ? -1 : s < i ? 1 : 0;
  });
}
function sf(n) {
  const e = Rl(Nl(n)), t = y0(e.map((r) => r.name));
  return t.length && console.warn(
    `[tiptap warn]: Duplicate extension names found: [${t.map((r) => `'${r}'`).join(", ")}]. This can lead to issues.`
  ), e;
}
function of(n, e, t) {
  const { from: r, to: s } = e, { blockSeparator: i = `

`, textSerializers: o = {} } = t || {};
  let l = "";
  return n.nodesBetween(r, s, (a, c, u, d) => {
    var f;
    a.isBlock && c > r && (l += i);
    const h = o == null ? void 0 : o[a.type.name];
    if (h)
      return u && (l += h({
        node: a,
        pos: c,
        parent: u,
        index: d,
        range: e
      })), !1;
    a.isText && (l += (f = a == null ? void 0 : a.text) == null ? void 0 : f.slice(Math.max(r, c) - c, s - c));
  }), l;
}
function b0(n, e) {
  const t = {
    from: 0,
    to: n.content.size
  };
  return of(n, t, e);
}
function lf(n) {
  return Object.fromEntries(
    Object.entries(n.nodes).filter(([, e]) => e.spec.toText).map(([e, t]) => [e, t.spec.toText])
  );
}
function x0(n, e) {
  const t = Ae(e, n.schema), { from: r, to: s } = n.selection, i = [];
  n.doc.nodesBetween(r, s, (l) => {
    i.push(l);
  });
  const o = i.reverse().find((l) => l.type.name === t.name);
  return o ? { ...o.attrs } : {};
}
function af(n, e) {
  const t = fi(
    typeof e == "string" ? e : e.name,
    n.schema
  );
  return t === "node" ? x0(n, e) : t === "mark" ? ef(n, e) : {};
}
function k0(n, e = JSON.stringify) {
  const t = {};
  return n.filter((r) => {
    const s = e(r);
    return Object.prototype.hasOwnProperty.call(t, s) ? !1 : t[s] = !0;
  });
}
function v0(n) {
  const e = k0(n);
  return e.length === 1 ? e : e.filter((t, r) => !e.filter((i, o) => o !== r).some((i) => t.oldRange.from >= i.oldRange.from && t.oldRange.to <= i.oldRange.to && t.newRange.from >= i.newRange.from && t.newRange.to <= i.newRange.to));
}
function cf(n) {
  const { mapping: e, steps: t } = n, r = [];
  return e.maps.forEach((s, i) => {
    const o = [];
    if (s.ranges.length)
      s.forEach((l, a) => {
        o.push({ from: l, to: a });
      });
    else {
      const { from: l, to: a } = t[i];
      if (l === void 0 || a === void 0)
        return;
      o.push({ from: l, to: a });
    }
    o.forEach(({ from: l, to: a }) => {
      const c = e.slice(i).map(l, -1), u = e.slice(i).map(a), d = e.invert().map(c, -1), f = e.invert().map(u);
      r.push({
        oldRange: {
          from: d,
          to: f
        },
        newRange: {
          from: c,
          to: u
        }
      });
    });
  }), v0(r);
}
function Dl(n, e, t) {
  const r = [];
  return n === e ? t.resolve(n).marks().forEach((s) => {
    const i = t.resolve(n), o = Al(i, s.type);
    o && r.push({
      mark: s,
      ...o
    });
  }) : t.nodesBetween(n, e, (s, i) => {
    !s || (s == null ? void 0 : s.nodeSize) === void 0 || r.push(
      ...s.marks.map((o) => ({
        from: i,
        to: i + s.nodeSize,
        mark: o
      }))
    );
  }), r;
}
var S0 = (n, e, t, r = 20) => {
  const s = n.doc.resolve(t);
  let i = r, o = null;
  for (; i > 0 && o === null; ) {
    const l = s.node(i);
    (l == null ? void 0 : l.type.name) === e ? o = l : i -= 1;
  }
  return [o, i];
};
function qi(n, e) {
  return e.nodes[n] || e.marks[n] || null;
}
function ts(n, e, t) {
  return Object.fromEntries(
    Object.entries(t).filter(([r]) => {
      const s = n.find((i) => i.type === e && i.name === r);
      return s ? s.attribute.keepOnSplit : !1;
    })
  );
}
var w0 = (n, e = 500) => {
  let t = "";
  const r = n.parentOffset;
  return n.parent.nodesBetween(Math.max(0, r - e), r, (s, i, o, l) => {
    var a, c;
    const u = ((c = (a = s.type.spec).toText) == null ? void 0 : c.call(a, {
      node: s,
      pos: i,
      parent: o,
      index: l
    })) || s.textContent || "%leaf%";
    t += s.isAtom && !s.isText ? u : u.slice(0, Math.max(0, r - i));
  }), t;
};
function Bo(n, e, t = {}) {
  const { empty: r, ranges: s } = n.selection, i = e ? Pt(e, n.schema) : null;
  if (r)
    return !!(n.storedMarks || n.selection.$from.marks()).filter((d) => i ? i.name === d.type.name : !0).find((d) => ks(d.attrs, t, { strict: !1 }));
  let o = 0;
  const l = [];
  if (s.forEach(({ $from: d, $to: f }) => {
    const h = d.pos, p = f.pos;
    n.doc.nodesBetween(h, p, (m, g) => {
      if (!m.isText && !m.marks.length)
        return;
      const y = Math.max(h, g), k = Math.min(p, g + m.nodeSize), C = k - y;
      o += C, l.push(
        ...m.marks.map((v) => ({
          mark: v,
          from: y,
          to: k
        }))
      );
    });
  }), o === 0)
    return !1;
  const a = l.filter((d) => i ? i.name === d.mark.type.name : !0).filter((d) => ks(d.mark.attrs, t, { strict: !1 })).reduce((d, f) => d + f.to - f.from, 0), c = l.filter((d) => i ? d.mark.type !== i && d.mark.type.excludes(i) : !0).reduce((d, f) => d + f.to - f.from, 0);
  return (a > 0 ? a + c : a) >= o;
}
function C0(n, e, t = {}) {
  if (!e)
    return Zt(n, null, t) || Bo(n, null, t);
  const r = fi(e, n.schema);
  return r === "node" ? Zt(n, e, t) : r === "mark" ? Bo(n, e, t) : !1;
}
var E0 = (n, e) => {
  const { $from: t, $to: r, $anchor: s } = n.selection;
  if (e) {
    const i = hi((l) => l.type.name === e)(n.selection);
    if (!i)
      return !1;
    const o = n.doc.resolve(i.pos + 1);
    return s.pos + 1 === o.end();
  }
  return !(r.parentOffset < r.parent.nodeSize - 2 || t.pos !== r.pos);
}, M0 = (n) => {
  const { $from: e, $to: t } = n.selection;
  return !(e.parentOffset > 0 || e.pos !== t.pos);
};
function pc(n, e) {
  return Array.isArray(e) ? e.some((t) => (typeof t == "string" ? t : t.name) === n.name) : e;
}
function mc(n, e) {
  const { nodeExtensions: t } = Xn(e), r = t.find((o) => o.name === n);
  if (!r)
    return !1;
  const s = {
    name: r.name,
    options: r.options,
    storage: r.storage
  }, i = oe($(r, "group", s));
  return typeof i != "string" ? !1 : i.split(" ").includes("list");
}
function pi(n, {
  checkChildren: e = !0,
  ignoreWhitespace: t = !1
} = {}) {
  var r;
  if (t) {
    if (n.type.name === "hardBreak")
      return !0;
    if (n.isText)
      return /^\s*$/m.test((r = n.text) != null ? r : "");
  }
  if (n.isText)
    return !n.text;
  if (n.isAtom || n.isLeaf)
    return !1;
  if (n.content.childCount === 0)
    return !0;
  if (e) {
    let s = !0;
    return n.content.forEach((i) => {
      s !== !1 && (pi(i, { ignoreWhitespace: t, checkChildren: e }) || (s = !1));
    }), s;
  }
  return !1;
}
function uf(n) {
  return n instanceof j;
}
var df = class ff {
  constructor(e) {
    this.position = e;
  }
  /**
   * Creates a MappablePosition from a JSON object.
   */
  static fromJSON(e) {
    return new ff(e.position);
  }
  /**
   * Converts the MappablePosition to a JSON object.
   */
  toJSON() {
    return {
      position: this.position
    };
  }
};
function T0(n, e) {
  const t = e.mapping.mapResult(n.position);
  return {
    position: new df(t.pos),
    mapResult: t
  };
}
function A0(n) {
  return new df(n);
}
function N0(n, e, t) {
  var r;
  const { selection: s } = e;
  let i = null;
  if (Gd(s) && (i = s.$cursor), i) {
    const l = (r = n.storedMarks) != null ? r : i.marks();
    return i.parent.type.allowsMarkType(t) && (!!t.isInSet(l) || !l.some((c) => c.type.excludes(t)));
  }
  const { ranges: o } = s;
  return o.some(({ $from: l, $to: a }) => {
    let c = l.depth === 0 ? n.doc.inlineContent && n.doc.type.allowsMarkType(t) : !1;
    return n.doc.nodesBetween(l.pos, a.pos, (u, d, f) => {
      if (c)
        return !1;
      if (u.isInline) {
        const h = !f || f.type.allowsMarkType(t), p = !!t.isInSet(u.marks) || !u.marks.some((m) => m.type.excludes(t));
        c = h && p;
      }
      return !c;
    }), c;
  });
}
var O0 = (n, e = {}) => ({ tr: t, state: r, dispatch: s }) => {
  const { selection: i } = t, { empty: o, ranges: l } = i, a = Pt(n, r.schema);
  if (s)
    if (o) {
      const c = ef(r, a);
      t.addStoredMark(
        a.create({
          ...c,
          ...e
        })
      );
    } else
      l.forEach((c) => {
        const u = c.$from.pos, d = c.$to.pos;
        r.doc.nodesBetween(u, d, (f, h) => {
          const p = Math.max(h, u), m = Math.min(h + f.nodeSize, d);
          f.marks.find((y) => y.type === a) ? f.marks.forEach((y) => {
            a === y.type && t.addMark(
              p,
              m,
              a.create({
                ...y.attrs,
                ...e
              })
            );
          }) : t.addMark(p, m, a.create(e));
        });
      });
  return N0(r, t, a);
}, R0 = (n, e) => ({ tr: t }) => (t.setMeta(n, e), !0), D0 = (n, e = {}) => ({ state: t, dispatch: r, chain: s }) => {
  const i = Ae(n, t.schema);
  let o;
  return t.selection.$anchor.sameParent(t.selection.$head) && (o = t.selection.$anchor.parent.attrs), i.isTextblock ? s().command(({ commands: l }) => Na(i, { ...o, ...e })(t) ? !0 : l.clearNodes()).command(({ state: l }) => Na(i, { ...o, ...e })(l, r)).run() : (console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.'), !1);
}, I0 = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, s = hn(n, 0, r.content.size), i = j.create(r, s);
    e.setSelection(i);
  }
  return !0;
}, L0 = (n, e) => ({ tr: t, state: r, dispatch: s }) => {
  const { selection: i } = r;
  let o, l;
  return typeof e == "number" ? (o = e, l = e) : e && "from" in e && "to" in e ? (o = e.from, l = e.to) : (o = i.from, l = i.to), s && t.doc.nodesBetween(o, l, (a, c) => {
    a.isText || t.setNodeMarkup(c, void 0, {
      ...a.attrs,
      dir: n
    });
  }), !0;
}, P0 = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, { from: s, to: i } = typeof n == "number" ? { from: n, to: n } : n, o = q.atStart(r).from, l = q.atEnd(r).to, a = hn(s, o, l), c = hn(i, o, l), u = q.create(r, a, c);
    e.setSelection(u);
  }
  return !0;
}, _0 = (n) => ({ state: e, dispatch: t }) => {
  const r = Ae(n, e.schema);
  return Rm(r)(e, t);
};
function gc(n, e) {
  const t = n.storedMarks || n.selection.$to.parentOffset && n.selection.$from.marks();
  if (t) {
    const r = t.filter((s) => e == null ? void 0 : e.includes(s.type.name));
    n.tr.ensureMarks(r);
  }
}
var B0 = ({ keepMarks: n = !0 } = {}) => ({ tr: e, state: t, dispatch: r, editor: s }) => {
  const { selection: i, doc: o } = e, { $from: l, $to: a } = i, c = s.extensionManager.attributes, u = ts(c, l.node().type.name, l.node().attrs);
  if (i instanceof j && i.node.isBlock)
    return !l.parentOffset || !Dt(o, l.pos) ? !1 : (r && (n && gc(t, s.extensionManager.splittableMarks), e.split(l.pos).scrollIntoView()), !0);
  if (!l.parent.isBlock)
    return !1;
  const d = a.parentOffset === a.parent.content.size, f = l.depth === 0 ? void 0 : d0(l.node(-1).contentMatchAt(l.indexAfter(-1)));
  let h = d && f ? [
    {
      type: f,
      attrs: u
    }
  ] : void 0, p = Dt(e.doc, e.mapping.map(l.pos), 1, h);
  if (!h && !p && Dt(e.doc, e.mapping.map(l.pos), 1, f ? [{ type: f }] : void 0) && (p = !0, h = f ? [
    {
      type: f,
      attrs: u
    }
  ] : void 0), r) {
    if (p && (i instanceof q && e.deleteSelection(), e.split(e.mapping.map(l.pos), 1, h), f && !d && !l.parentOffset && l.parent.type !== f)) {
      const m = e.mapping.map(l.before()), g = e.doc.resolve(m);
      l.node(-1).canReplaceWith(g.index(), g.index() + 1, f) && e.setNodeMarkup(e.mapping.map(l.before()), f);
    }
    n && gc(t, s.extensionManager.splittableMarks), e.scrollIntoView();
  }
  return p;
}, F0 = (n, e = {}) => ({ tr: t, state: r, dispatch: s, editor: i }) => {
  var o;
  const l = Ae(n, r.schema), { $from: a, $to: c } = r.selection, u = r.selection.node;
  if (u && u.isBlock || a.depth < 2 || !a.sameParent(c))
    return !1;
  const d = a.node(-1);
  if (d.type !== l)
    return !1;
  const f = i.extensionManager.attributes;
  if (a.parent.content.size === 0 && a.node(-1).childCount === a.indexAfter(-1)) {
    if (a.depth === 2 || a.node(-3).type !== l || a.index(-2) !== a.node(-2).childCount - 1)
      return !1;
    if (s) {
      let y = A.empty;
      const k = a.index(-1) ? 1 : a.index(-2) ? 2 : 3;
      for (let D = a.depth - k; D >= a.depth - 3; D -= 1)
        y = A.from(a.node(D).copy(y));
      const C = (
        // eslint-disable-next-line no-nested-ternary
        a.indexAfter(-1) < a.node(-2).childCount ? 1 : a.indexAfter(-2) < a.node(-3).childCount ? 2 : 3
      ), v = {
        ...ts(f, a.node().type.name, a.node().attrs),
        ...e
      }, x = ((o = l.contentMatch.defaultType) == null ? void 0 : o.createAndFill(v)) || void 0;
      y = y.append(A.from(l.createAndFill(null, x) || void 0));
      const E = a.before(a.depth - (k - 1));
      t.replace(E, a.after(-C), new _(y, 4 - k, 0));
      let M = -1;
      t.doc.nodesBetween(E, t.doc.content.size, (D, L) => {
        if (M > -1)
          return !1;
        D.isTextblock && D.content.size === 0 && (M = L + 1);
      }), M > -1 && t.setSelection(q.near(t.doc.resolve(M))), t.scrollIntoView();
    }
    return !0;
  }
  const h = c.pos === a.end() ? d.contentMatchAt(0).defaultType : null, p = {
    ...ts(f, d.type.name, d.attrs),
    ...e
  }, m = {
    ...ts(f, a.node().type.name, a.node().attrs),
    ...e
  };
  t.delete(a.pos, c.pos);
  const g = h ? [
    { type: l, attrs: p },
    { type: h, attrs: m }
  ] : [{ type: l, attrs: p }];
  if (!Dt(t.doc, a.pos, 2))
    return !1;
  if (s) {
    const { selection: y, storedMarks: k } = r, { splittableMarks: C } = i.extensionManager, v = k || y.$to.parentOffset && y.$from.marks();
    if (t.split(a.pos, 2, g).scrollIntoView(), !v || !s)
      return !0;
    const x = v.filter((E) => C.includes(E.type.name));
    t.ensureMarks(x);
  }
  return !0;
}, Ki = (n, e) => {
  const t = hi((o) => o.type === e)(n.selection);
  if (!t)
    return !0;
  const r = n.doc.resolve(Math.max(0, t.pos - 1)).before(t.depth);
  if (r === void 0)
    return !0;
  const s = n.doc.nodeAt(r);
  return t.node.type === (s == null ? void 0 : s.type) && nn(n.doc, t.pos) && n.join(t.pos), !0;
}, Ji = (n, e) => {
  const t = hi((o) => o.type === e)(n.selection);
  if (!t)
    return !0;
  const r = n.doc.resolve(t.start).after(t.depth);
  if (r === void 0)
    return !0;
  const s = n.doc.nodeAt(r);
  return t.node.type === (s == null ? void 0 : s.type) && nn(n.doc, r) && n.join(r), !0;
}, V0 = (n, e, t, r = {}) => ({ editor: s, tr: i, state: o, dispatch: l, chain: a, commands: c, can: u }) => {
  const { extensions: d, splittableMarks: f } = s.extensionManager, h = Ae(n, o.schema), p = Ae(e, o.schema), { selection: m, storedMarks: g } = o, { $from: y, $to: k } = m, C = y.blockRange(k), v = g || m.$to.parentOffset && m.$from.marks();
  if (!C)
    return !1;
  const x = hi((E) => mc(E.type.name, d))(m);
  if (C.depth >= 1 && x && C.depth - x.depth <= 1) {
    if (x.node.type === h)
      return c.liftListItem(p);
    if (mc(x.node.type.name, d) && h.validContent(x.node.content) && l)
      return a().command(() => (i.setNodeMarkup(x.pos, h), !0)).command(() => Ki(i, h)).command(() => Ji(i, h)).run();
  }
  return !t || !v || !l ? a().command(() => u().wrapInList(h, r) ? !0 : c.clearNodes()).wrapInList(h, r).command(() => Ki(i, h)).command(() => Ji(i, h)).run() : a().command(() => {
    const E = u().wrapInList(h, r), M = v.filter((D) => f.includes(D.type.name));
    return i.ensureMarks(M), E ? !0 : c.clearNodes();
  }).wrapInList(h, r).command(() => Ki(i, h)).command(() => Ji(i, h)).run();
}, z0 = (n, e = {}, t = {}) => ({ state: r, commands: s }) => {
  const { extendEmptyMarkRange: i = !1 } = t, o = Pt(n, r.schema);
  return Bo(r, o, e) ? s.unsetMark(o, { extendEmptyMarkRange: i }) : s.setMark(o, e);
}, j0 = (n, e, t = {}) => ({ state: r, commands: s }) => {
  const i = Ae(n, r.schema), o = Ae(e, r.schema), l = Zt(r, i, t);
  let a;
  return r.selection.$anchor.sameParent(r.selection.$head) && (a = r.selection.$anchor.parent.attrs), l ? s.setNode(o, a) : s.setNode(i, { ...a, ...t });
}, $0 = (n, e = {}) => ({ state: t, commands: r }) => {
  const s = Ae(n, t.schema);
  return Zt(t, s, e) ? r.lift(s) : r.wrapIn(s, e);
}, H0 = () => ({ state: n, dispatch: e }) => {
  const t = n.plugins;
  for (let r = 0; r < t.length; r += 1) {
    const s = t[r];
    let i;
    if (s.spec.isInputRules && (i = s.getState(n))) {
      if (e) {
        const o = n.tr, l = i.transform;
        for (let a = l.steps.length - 1; a >= 0; a -= 1)
          o.step(l.steps[a].invert(l.docs[a]));
        if (i.text) {
          const a = o.doc.resolve(i.from).marks();
          o.replaceWith(i.from, i.to, n.schema.text(i.text, a));
        } else
          o.delete(i.from, i.to);
      }
      return !0;
    }
  }
  return !1;
}, U0 = () => ({ tr: n, dispatch: e }) => {
  const { selection: t } = n, { empty: r, ranges: s } = t;
  return r || e && s.forEach((i) => {
    n.removeMark(i.$from.pos, i.$to.pos);
  }), !0;
}, W0 = (n, e = {}) => ({ tr: t, state: r, dispatch: s }) => {
  var i;
  const { extendEmptyMarkRange: o = !1 } = e, { selection: l } = t, a = Pt(n, r.schema), { $from: c, empty: u, ranges: d } = l;
  if (!s)
    return !0;
  if (u && o) {
    let { from: f, to: h } = l;
    const p = (i = c.marks().find((g) => g.type === a)) == null ? void 0 : i.attrs, m = Al(c, a, p);
    m && (f = m.from, h = m.to), t.removeMark(f, h, a);
  } else
    d.forEach((f) => {
      t.removeMark(f.$from.pos, f.$to.pos, a);
    });
  return t.removeStoredMark(a), !0;
}, q0 = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const { selection: s } = t;
  let i, o;
  return typeof n == "number" ? (i = n, o = n) : n && "from" in n && "to" in n ? (i = n.from, o = n.to) : (i = s.from, o = s.to), r && e.doc.nodesBetween(i, o, (l, a) => {
    if (l.isText)
      return;
    const c = { ...l.attrs };
    delete c.dir, e.setNodeMarkup(a, void 0, c);
  }), !0;
}, K0 = (n, e = {}) => ({ tr: t, state: r, dispatch: s }) => {
  let i = null, o = null;
  const l = fi(
    typeof n == "string" ? n : n.name,
    r.schema
  );
  if (!l)
    return !1;
  l === "node" && (i = Ae(n, r.schema)), l === "mark" && (o = Pt(n, r.schema));
  let a = !1;
  return t.selection.ranges.forEach((c) => {
    const u = c.$from.pos, d = c.$to.pos;
    let f, h, p, m;
    t.selection.empty ? r.doc.nodesBetween(u, d, (g, y) => {
      i && i === g.type && (a = !0, p = Math.max(y, u), m = Math.min(y + g.nodeSize, d), f = y, h = g);
    }) : r.doc.nodesBetween(u, d, (g, y) => {
      y < u && i && i === g.type && (a = !0, p = Math.max(y, u), m = Math.min(y + g.nodeSize, d), f = y, h = g), y >= u && y <= d && (i && i === g.type && (a = !0, s && t.setNodeMarkup(y, void 0, {
        ...g.attrs,
        ...e
      })), o && g.marks.length && g.marks.forEach((k) => {
        if (o === k.type && (a = !0, s)) {
          const C = Math.max(y, u), v = Math.min(y + g.nodeSize, d);
          t.addMark(
            C,
            v,
            o.create({
              ...k.attrs,
              ...e
            })
          );
        }
      }));
    }), h && (f !== void 0 && s && t.setNodeMarkup(f, void 0, {
      ...h.attrs,
      ...e
    }), o && h.marks.length && h.marks.forEach((g) => {
      o === g.type && s && t.addMark(
        p,
        m,
        o.create({
          ...g.attrs,
          ...e
        })
      );
    }));
  }), a;
}, J0 = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const s = Ae(n, t.schema);
  return Cm(s, e)(t, r);
}, G0 = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const s = Ae(n, t.schema);
  return Em(s, e)(t, r);
}, Y0 = class {
  constructor() {
    this.callbacks = {};
  }
  on(n, e) {
    return this.callbacks[n] || (this.callbacks[n] = []), this.callbacks[n].push(e), this;
  }
  emit(n, ...e) {
    const t = this.callbacks[n];
    return t && t.forEach((r) => r.apply(this, e)), this;
  }
  off(n, e) {
    const t = this.callbacks[n];
    return t && (e ? this.callbacks[n] = t.filter((r) => r !== e) : delete this.callbacks[n]), this;
  }
  once(n, e) {
    const t = (...r) => {
      this.off(n, t), e.apply(this, r);
    };
    return this.on(n, t);
  }
  removeAllListeners() {
    this.callbacks = {};
  }
}, Fr = class {
  constructor(n) {
    var e;
    this.find = n.find, this.handler = n.handler, this.undoable = (e = n.undoable) != null ? e : !0;
  }
}, X0 = (n, e) => {
  if (Tl(e))
    return e.exec(n);
  const t = e(n);
  if (!t)
    return null;
  const r = [t.text];
  return r.index = t.index, r.input = n, r.data = t.data, t.replaceWith && (t.text.includes(t.replaceWith) || console.warn('[tiptap warn]: "inputRuleMatch.replaceWith" must be part of "inputRuleMatch.text".'), r.push(t.replaceWith)), r;
};
function Wr(n) {
  var e;
  const { editor: t, from: r, to: s, text: i, rules: o, plugin: l } = n, { view: a } = t;
  if (a.composing)
    return !1;
  const c = a.state.doc.resolve(r);
  if (
    // check for code node
    c.parent.type.spec.code || (e = c.nodeBefore || c.nodeAfter) != null && e.marks.find((f) => f.type.spec.code)
  )
    return !1;
  let u = !1;
  const d = w0(c) + i;
  return o.forEach((f) => {
    if (u)
      return;
    const h = X0(d, f.find);
    if (!h)
      return;
    const p = a.state.tr, m = ci({
      state: a.state,
      transaction: p
    }), g = {
      from: r - (h[0].length - i.length),
      to: s
    }, { commands: y, chain: k, can: C } = new ui({
      editor: t,
      state: m
    });
    f.handler({
      state: m,
      range: g,
      match: h,
      commands: y,
      chain: k,
      can: C
    }) === null || !p.steps.length || (f.undoable && p.setMeta(l, {
      transform: p,
      from: r,
      to: s,
      text: i
    }), a.dispatch(p), u = !0);
  }), u;
}
function Q0(n) {
  const { editor: e, rules: t } = n, r = new ge({
    state: {
      init() {
        return null;
      },
      apply(s, i, o) {
        const l = s.getMeta(r);
        if (l)
          return l;
        const a = s.getMeta("applyInputRules");
        return !!a && setTimeout(() => {
          let { text: u } = a;
          typeof u == "string" ? u = u : u = Ol(A.from(u), o.schema);
          const { from: d } = a, f = d + u.length;
          Wr({
            editor: e,
            from: d,
            to: f,
            text: u,
            rules: t,
            plugin: r
          });
        }), s.selectionSet || s.docChanged ? null : i;
      }
    },
    props: {
      handleTextInput(s, i, o, l) {
        return Wr({
          editor: e,
          from: i,
          to: o,
          text: l,
          rules: t,
          plugin: r
        });
      },
      handleDOMEvents: {
        compositionend: (s) => (setTimeout(() => {
          const { $cursor: i } = s.state.selection;
          i && Wr({
            editor: e,
            from: i.pos,
            to: i.pos,
            text: "",
            rules: t,
            plugin: r
          });
        }), !1)
      },
      // add support for input rules to trigger on enter
      // this is useful for example for code blocks
      handleKeyDown(s, i) {
        if (i.key !== "Enter")
          return !1;
        const { $cursor: o } = s.state.selection;
        return o ? Wr({
          editor: e,
          from: o.pos,
          to: o.pos,
          text: `
`,
          rules: t,
          plugin: r
        }) : !1;
      }
    },
    // @ts-ignore
    isInputRules: !0
  });
  return r;
}
function Z0(n) {
  return Object.prototype.toString.call(n).slice(8, -1);
}
function qr(n) {
  return Z0(n) !== "Object" ? !1 : n.constructor === Object && Object.getPrototypeOf(n) === Object.prototype;
}
function hf(n, e) {
  const t = { ...n };
  return qr(n) && qr(e) && Object.keys(e).forEach((r) => {
    qr(e[r]) && qr(n[r]) ? t[r] = hf(n[r], e[r]) : t[r] = e[r];
  }), t;
}
var Il = class {
  constructor(n = {}) {
    this.type = "extendable", this.parent = null, this.child = null, this.name = "", this.config = {
      name: this.name
    }, this.config = {
      ...this.config,
      ...n
    }, this.name = this.config.name;
  }
  get options() {
    return {
      ...oe(
        $(this, "addOptions", {
          name: this.name
        })
      ) || {}
    };
  }
  get storage() {
    return {
      ...oe(
        $(this, "addStorage", {
          name: this.name,
          options: this.options
        })
      ) || {}
    };
  }
  configure(n = {}) {
    const e = this.extend({
      ...this.config,
      addOptions: () => hf(this.options, n)
    });
    return e.name = this.name, e.parent = this.parent, e;
  }
  extend(n = {}) {
    const e = new this.constructor({ ...this.config, ...n });
    return e.parent = this, this.child = e, e.name = "name" in n ? n.name : e.parent.name, e;
  }
}, Tn = class pf extends Il {
  constructor() {
    super(...arguments), this.type = "mark";
  }
  /**
   * Create a new Mark instance
   * @param config - Mark configuration object or a function that returns a configuration object
   */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new pf(t);
  }
  static handleExit({ editor: e, mark: t }) {
    const { tr: r } = e.state, s = e.state.selection.$from;
    if (s.pos === s.end()) {
      const o = s.marks();
      if (!!!o.find((c) => (c == null ? void 0 : c.type.name) === t.name))
        return !1;
      const a = o.find((c) => (c == null ? void 0 : c.type.name) === t.name);
      return a && r.removeStoredMark(a), r.insertText(" ", s.pos), e.view.dispatch(r), !0;
    }
    return !1;
  }
  configure(e) {
    return super.configure(e);
  }
  extend(e) {
    const t = typeof e == "function" ? e() : e;
    return super.extend(t);
  }
};
function eb(n) {
  return typeof n == "number";
}
var tb = class {
  constructor(n) {
    this.find = n.find, this.handler = n.handler;
  }
}, nb = (n, e, t) => {
  if (Tl(e))
    return [...n.matchAll(e)];
  const r = e(n, t);
  return r ? r.map((s) => {
    const i = [s.text];
    return i.index = s.index, i.input = n, i.data = s.data, s.replaceWith && (s.text.includes(s.replaceWith) || console.warn('[tiptap warn]: "pasteRuleMatch.replaceWith" must be part of "pasteRuleMatch.text".'), i.push(s.replaceWith)), i;
  }) : [];
};
function rb(n) {
  const { editor: e, state: t, from: r, to: s, rule: i, pasteEvent: o, dropEvent: l } = n, { commands: a, chain: c, can: u } = new ui({
    editor: e,
    state: t
  }), d = [];
  return t.doc.nodesBetween(r, s, (h, p) => {
    var m, g, y, k, C;
    if ((g = (m = h.type) == null ? void 0 : m.spec) != null && g.code || !(h.isText || h.isTextblock || h.isInline))
      return;
    const v = (C = (k = (y = h.content) == null ? void 0 : y.size) != null ? k : h.nodeSize) != null ? C : 0, x = Math.max(r, p), E = Math.min(s, p + v);
    if (x >= E)
      return;
    const M = h.isText ? h.text || "" : h.textBetween(x - p, E - p, void 0, "￼");
    nb(M, i.find, o).forEach((L) => {
      if (L.index === void 0)
        return;
      const z = x + L.index + 1, X = z + L[0].length, F = {
        from: t.tr.mapping.map(z),
        to: t.tr.mapping.map(X)
      }, V = i.handler({
        state: t,
        range: F,
        match: L,
        commands: a,
        chain: c,
        can: u,
        pasteEvent: o,
        dropEvent: l
      });
      d.push(V);
    });
  }), d.every((h) => h !== null);
}
var Kr = null, sb = (n) => {
  var e;
  const t = new ClipboardEvent("paste", {
    clipboardData: new DataTransfer()
  });
  return (e = t.clipboardData) == null || e.setData("text/html", n), t;
};
function ib(n) {
  const { editor: e, rules: t } = n;
  let r = null, s = !1, i = !1, o = typeof ClipboardEvent < "u" ? new ClipboardEvent("paste") : null, l;
  try {
    l = typeof DragEvent < "u" ? new DragEvent("drop") : null;
  } catch {
    l = null;
  }
  const a = ({
    state: u,
    from: d,
    to: f,
    rule: h,
    pasteEvt: p
  }) => {
    const m = u.tr, g = ci({
      state: u,
      transaction: m
    });
    if (!(!rb({
      editor: e,
      state: g,
      from: Math.max(d - 1, 0),
      to: f.b - 1,
      rule: h,
      pasteEvent: p,
      dropEvent: l
    }) || !m.steps.length)) {
      try {
        l = typeof DragEvent < "u" ? new DragEvent("drop") : null;
      } catch {
        l = null;
      }
      return o = typeof ClipboardEvent < "u" ? new ClipboardEvent("paste") : null, m;
    }
  };
  return t.map((u) => new ge({
    // we register a global drag handler to track the current drag source element
    view(d) {
      const f = (p) => {
        var m;
        r = (m = d.dom.parentElement) != null && m.contains(p.target) ? d.dom.parentElement : null, r && (Kr = e);
      }, h = () => {
        Kr && (Kr = null);
      };
      return window.addEventListener("dragstart", f), window.addEventListener("dragend", h), {
        destroy() {
          window.removeEventListener("dragstart", f), window.removeEventListener("dragend", h);
        }
      };
    },
    props: {
      handleDOMEvents: {
        drop: (d, f) => {
          if (i = r === d.dom.parentElement, l = f, !i) {
            const h = Kr;
            h != null && h.isEditable && setTimeout(() => {
              const p = h.state.selection;
              p && h.commands.deleteRange({ from: p.from, to: p.to });
            }, 10);
          }
          return !1;
        },
        paste: (d, f) => {
          var h;
          const p = (h = f.clipboardData) == null ? void 0 : h.getData("text/html");
          return o = f, s = !!(p != null && p.includes("data-pm-slice")), !1;
        }
      }
    },
    appendTransaction: (d, f, h) => {
      const p = d[0], m = p.getMeta("uiEvent") === "paste" && !s, g = p.getMeta("uiEvent") === "drop" && !i, y = p.getMeta("applyPasteRules"), k = !!y;
      if (!m && !g && !k)
        return;
      if (k) {
        let { text: x } = y;
        typeof x == "string" ? x = x : x = Ol(A.from(x), h.schema);
        const { from: E } = y, M = E + x.length, D = sb(x);
        return a({
          rule: u,
          state: h,
          from: E,
          to: { b: M },
          pasteEvt: D
        });
      }
      const C = f.doc.content.findDiffStart(h.doc.content), v = f.doc.content.findDiffEnd(h.doc.content);
      if (!(!eb(C) || !v || C === v.b))
        return a({
          rule: u,
          state: h,
          from: C,
          to: v,
          pasteEvt: o
        });
    }
  }));
}
var mi = class {
  constructor(n, e) {
    this.splittableMarks = [], this.editor = e, this.baseExtensions = n, this.extensions = sf(n), this.schema = g0(this.extensions, e), this.setupExtensions();
  }
  /**
   * Get all commands from the extensions.
   * @returns An object with all commands where the key is the command name and the value is the command function
   */
  get commands() {
    return this.extensions.reduce((n, e) => {
      const t = {
        name: e.name,
        options: e.options,
        storage: this.editor.extensionStorage[e.name],
        editor: this.editor,
        type: qi(e.name, this.schema)
      }, r = $(e, "addCommands", t);
      return r ? {
        ...n,
        ...r()
      } : n;
    }, {});
  }
  /**
   * Get all registered Prosemirror plugins from the extensions.
   * @returns An array of Prosemirror plugins
   */
  get plugins() {
    const { editor: n } = this;
    return Rl([...this.extensions].reverse()).flatMap((r) => {
      const s = {
        name: r.name,
        options: r.options,
        storage: this.editor.extensionStorage[r.name],
        editor: n,
        type: qi(r.name, this.schema)
      }, i = [], o = $(
        r,
        "addKeyboardShortcuts",
        s
      );
      let l = {};
      if (r.type === "mark" && $(r, "exitable", s) && (l.ArrowRight = () => Tn.handleExit({ editor: n, mark: r })), o) {
        const f = Object.fromEntries(
          Object.entries(o()).map(([h, p]) => [h, () => p({ editor: n })])
        );
        l = { ...l, ...f };
      }
      const a = ky(l);
      i.push(a);
      const c = $(r, "addInputRules", s);
      if (pc(r, n.options.enableInputRules) && c) {
        const f = c();
        if (f && f.length) {
          const h = Q0({
            editor: n,
            rules: f
          }), p = Array.isArray(h) ? h : [h];
          i.push(...p);
        }
      }
      const u = $(r, "addPasteRules", s);
      if (pc(r, n.options.enablePasteRules) && u) {
        const f = u();
        if (f && f.length) {
          const h = ib({ editor: n, rules: f });
          i.push(...h);
        }
      }
      const d = $(
        r,
        "addProseMirrorPlugins",
        s
      );
      if (d) {
        const f = d();
        i.push(...f);
      }
      return i;
    });
  }
  /**
   * Get all attributes from the extensions.
   * @returns An array of attributes
   */
  get attributes() {
    return rf(this.extensions);
  }
  /**
   * Get all node views from the extensions.
   * @returns An object with all node views where the key is the node name and the value is the node view function
   */
  get nodeViews() {
    const { editor: n } = this, { nodeExtensions: e } = Xn(this.extensions);
    return Object.fromEntries(
      e.filter((t) => !!$(t, "addNodeView")).map((t) => {
        const r = this.attributes.filter((a) => a.type === t.name), s = {
          name: t.name,
          options: t.options,
          storage: this.editor.extensionStorage[t.name],
          editor: n,
          type: Ae(t.name, this.schema)
        }, i = $(t, "addNodeView", s);
        if (!i)
          return [];
        const o = i();
        if (!o)
          return [];
        const l = (a, c, u, d, f) => {
          const h = Rr(a, r);
          return o({
            // pass-through
            node: a,
            view: c,
            getPos: u,
            decorations: d,
            innerDecorations: f,
            // tiptap-specific
            editor: n,
            extension: t,
            HTMLAttributes: h
          });
        };
        return [t.name, l];
      })
    );
  }
  get markViews() {
    const { editor: n } = this, { markExtensions: e } = Xn(this.extensions);
    return Object.fromEntries(
      e.filter((t) => !!$(t, "addMarkView")).map((t) => {
        const r = this.attributes.filter((l) => l.type === t.name), s = {
          name: t.name,
          options: t.options,
          storage: this.editor.extensionStorage[t.name],
          editor: n,
          type: Pt(t.name, this.schema)
        }, i = $(t, "addMarkView", s);
        if (!i)
          return [];
        const o = (l, a, c) => {
          const u = Rr(l, r);
          return i()({
            // pass-through
            mark: l,
            view: a,
            inline: c,
            // tiptap-specific
            editor: n,
            extension: t,
            HTMLAttributes: u,
            updateAttributes: (d) => {
              kb(l, n, d);
            }
          });
        };
        return [t.name, o];
      })
    );
  }
  /**
   * Go through all extensions, create extension storages & setup marks
   * & bind editor event listener.
   */
  setupExtensions() {
    const n = this.extensions;
    this.editor.extensionStorage = Object.fromEntries(
      n.map((e) => [e.name, e.storage])
    ), n.forEach((e) => {
      var t;
      const r = {
        name: e.name,
        options: e.options,
        storage: this.editor.extensionStorage[e.name],
        editor: this.editor,
        type: qi(e.name, this.schema)
      };
      e.type === "mark" && ((t = oe($(e, "keepOnSplit", r))) == null || t) && this.splittableMarks.push(e.name);
      const s = $(e, "onBeforeCreate", r), i = $(e, "onCreate", r), o = $(e, "onUpdate", r), l = $(
        e,
        "onSelectionUpdate",
        r
      ), a = $(e, "onTransaction", r), c = $(e, "onFocus", r), u = $(e, "onBlur", r), d = $(e, "onDestroy", r);
      s && this.editor.on("beforeCreate", s), i && this.editor.on("create", i), o && this.editor.on("update", o), l && this.editor.on("selectionUpdate", l), a && this.editor.on("transaction", a), c && this.editor.on("focus", c), u && this.editor.on("blur", u), d && this.editor.on("destroy", d);
    });
  }
};
mi.resolve = sf;
mi.sort = Rl;
mi.flatten = Nl;
var ob = {};
Ml(ob, {
  ClipboardTextSerializer: () => gf,
  Commands: () => yf,
  Delete: () => bf,
  Drop: () => xf,
  Editable: () => kf,
  FocusEvents: () => Sf,
  Keymap: () => wf,
  Paste: () => Cf,
  Tabindex: () => Ef,
  TextDirection: () => Mf,
  focusEventsPluginKey: () => vf
});
var Ee = class mf extends Il {
  constructor() {
    super(...arguments), this.type = "extension";
  }
  /**
   * Create a new Extension instance
   * @param config - Extension configuration object or a function that returns a configuration object
   */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new mf(t);
  }
  configure(e) {
    return super.configure(e);
  }
  extend(e) {
    const t = typeof e == "function" ? e() : e;
    return super.extend(t);
  }
}, gf = Ee.create({
  name: "clipboardTextSerializer",
  addOptions() {
    return {
      blockSeparator: void 0
    };
  },
  addProseMirrorPlugins() {
    return [
      new ge({
        key: new Re("clipboardTextSerializer"),
        props: {
          clipboardTextSerializer: () => {
            const { editor: n } = this, { state: e, schema: t } = n, { doc: r, selection: s } = e, { ranges: i } = s, o = Math.min(...i.map((u) => u.$from.pos)), l = Math.max(...i.map((u) => u.$to.pos)), a = lf(t);
            return of(r, { from: o, to: l }, {
              ...this.options.blockSeparator !== void 0 ? { blockSeparator: this.options.blockSeparator } : {},
              textSerializers: a
            });
          }
        }
      })
    ];
  }
}), yf = Ee.create({
  name: "commands",
  addCommands() {
    return {
      ...Kd
    };
  }
}), bf = Ee.create({
  name: "delete",
  onUpdate({ transaction: n, appendedTransactions: e }) {
    var t, r, s;
    const i = () => {
      var o, l, a, c;
      if ((c = (a = (l = (o = this.editor.options.coreExtensionOptions) == null ? void 0 : o.delete) == null ? void 0 : l.filterTransaction) == null ? void 0 : a.call(l, n)) != null ? c : n.getMeta("y-sync$"))
        return;
      const u = tf(n.before, [n, ...e]);
      cf(u).forEach((h) => {
        u.mapping.mapResult(h.oldRange.from).deletedAfter && u.mapping.mapResult(h.oldRange.to).deletedBefore && u.before.nodesBetween(h.oldRange.from, h.oldRange.to, (p, m) => {
          const g = m + p.nodeSize - 2, y = h.oldRange.from <= m && g <= h.oldRange.to;
          this.editor.emit("delete", {
            type: "node",
            node: p,
            from: m,
            to: g,
            newFrom: u.mapping.map(m),
            newTo: u.mapping.map(g),
            deletedRange: h.oldRange,
            newRange: h.newRange,
            partial: !y,
            editor: this.editor,
            transaction: n,
            combinedTransform: u
          });
        });
      });
      const f = u.mapping;
      u.steps.forEach((h, p) => {
        var m, g;
        if (h instanceof yt) {
          const y = f.slice(p).map(h.from, -1), k = f.slice(p).map(h.to), C = f.invert().map(y, -1), v = f.invert().map(k), x = (m = u.doc.nodeAt(y - 1)) == null ? void 0 : m.marks.some((M) => M.eq(h.mark)), E = (g = u.doc.nodeAt(k)) == null ? void 0 : g.marks.some((M) => M.eq(h.mark));
          this.editor.emit("delete", {
            type: "mark",
            mark: h.mark,
            from: h.from,
            to: h.to,
            deletedRange: {
              from: C,
              to: v
            },
            newRange: {
              from: y,
              to: k
            },
            partial: !!(E || x),
            editor: this.editor,
            transaction: n,
            combinedTransform: u
          });
        }
      });
    };
    (s = (r = (t = this.editor.options.coreExtensionOptions) == null ? void 0 : t.delete) == null ? void 0 : r.async) == null || s ? setTimeout(i, 0) : i();
  }
}), xf = Ee.create({
  name: "drop",
  addProseMirrorPlugins() {
    return [
      new ge({
        key: new Re("tiptapDrop"),
        props: {
          handleDrop: (n, e, t, r) => {
            this.editor.emit("drop", {
              editor: this.editor,
              event: e,
              slice: t,
              moved: r
            });
          }
        }
      })
    ];
  }
}), kf = Ee.create({
  name: "editable",
  addProseMirrorPlugins() {
    return [
      new ge({
        key: new Re("editable"),
        props: {
          editable: () => this.editor.options.editable
        }
      })
    ];
  }
}), vf = new Re("focusEvents"), Sf = Ee.create({
  name: "focusEvents",
  addProseMirrorPlugins() {
    const { editor: n } = this;
    return [
      new ge({
        key: vf,
        props: {
          handleDOMEvents: {
            focus: (e, t) => {
              n.isFocused = !0;
              const r = n.state.tr.setMeta("focus", { event: t }).setMeta("addToHistory", !1);
              return e.dispatch(r), !1;
            },
            blur: (e, t) => {
              n.isFocused = !1;
              const r = n.state.tr.setMeta("blur", { event: t }).setMeta("addToHistory", !1);
              return e.dispatch(r), !1;
            }
          }
        }
      })
    ];
  }
}), wf = Ee.create({
  name: "keymap",
  addKeyboardShortcuts() {
    const n = () => this.editor.commands.first(({ commands: o }) => [
      () => o.undoInputRule(),
      // maybe convert first text block node to default node
      () => o.command(({ tr: l }) => {
        const { selection: a, doc: c } = l, { empty: u, $anchor: d } = a, { pos: f, parent: h } = d, p = d.parent.isTextblock && f > 0 ? l.doc.resolve(f - 1) : d, m = p.parent.type.spec.isolating, g = d.pos - d.parentOffset, y = m && p.parent.childCount === 1 ? g === d.pos : Y.atStart(c).from === f;
        return !u || !h.type.isTextblock || h.textContent.length || !y || y && d.parent.type.name === "paragraph" ? !1 : o.clearNodes();
      }),
      () => o.deleteSelection(),
      () => o.joinBackward(),
      () => o.selectNodeBackward()
    ]), e = () => this.editor.commands.first(({ commands: o }) => [
      () => o.deleteSelection(),
      () => o.deleteCurrentNode(),
      () => o.joinForward(),
      () => o.selectNodeForward()
    ]), r = {
      Enter: () => this.editor.commands.first(({ commands: o }) => [
        () => o.newlineInCode(),
        () => o.createParagraphNear(),
        () => o.liftEmptyBlock(),
        () => o.splitBlock()
      ]),
      "Mod-Enter": () => this.editor.commands.exitCode(),
      Backspace: n,
      "Mod-Backspace": n,
      "Shift-Backspace": n,
      Delete: e,
      "Mod-Delete": e,
      "Mod-a": () => this.editor.commands.selectAll()
    }, s = {
      ...r
    }, i = {
      ...r,
      "Ctrl-h": n,
      "Alt-Backspace": n,
      "Ctrl-d": e,
      "Ctrl-Alt-Backspace": e,
      "Alt-Delete": e,
      "Alt-d": e,
      "Ctrl-a": () => this.editor.commands.selectTextblockStart(),
      "Ctrl-e": () => this.editor.commands.selectTextblockEnd()
    };
    return di() || Zd() ? i : s;
  },
  addProseMirrorPlugins() {
    return [
      // With this plugin we check if the whole document was selected and deleted.
      // In this case we will additionally call `clearNodes()` to convert e.g. a heading
      // to a paragraph if necessary.
      // This is an alternative to ProseMirror's `AllSelection`, which doesn’t work well
      // with many other commands.
      new ge({
        key: new Re("clearDocument"),
        appendTransaction: (n, e, t) => {
          if (n.some((m) => m.getMeta("composition")))
            return;
          const r = n.some((m) => m.docChanged) && !e.doc.eq(t.doc), s = n.some((m) => m.getMeta("preventClearDocument"));
          if (!r || s)
            return;
          const { empty: i, from: o, to: l } = e.selection, a = Y.atStart(e.doc).from, c = Y.atEnd(e.doc).to;
          if (i || !(o === a && l === c) || !pi(t.doc))
            return;
          const f = t.tr, h = ci({
            state: t,
            transaction: f
          }), { commands: p } = new ui({
            editor: this.editor,
            state: h
          });
          if (p.clearNodes(), !!f.steps.length)
            return f;
        }
      })
    ];
  }
}), Cf = Ee.create({
  name: "paste",
  addProseMirrorPlugins() {
    return [
      new ge({
        key: new Re("tiptapPaste"),
        props: {
          handlePaste: (n, e, t) => {
            this.editor.emit("paste", {
              editor: this.editor,
              event: e,
              slice: t
            });
          }
        }
      })
    ];
  }
}), Ef = Ee.create({
  name: "tabindex",
  addProseMirrorPlugins() {
    return [
      new ge({
        key: new Re("tabindex"),
        props: {
          attributes: () => this.editor.isEditable ? { tabindex: "0" } : {}
        }
      })
    ];
  }
}), Mf = Ee.create({
  name: "textDirection",
  addOptions() {
    return {
      direction: void 0
    };
  },
  addGlobalAttributes() {
    if (!this.options.direction)
      return [];
    const { nodeExtensions: n } = Xn(this.extensions);
    return [
      {
        types: n.filter((e) => e.name !== "text").map((e) => e.name),
        attributes: {
          dir: {
            default: this.options.direction,
            parseHTML: (e) => {
              const t = e.getAttribute("dir");
              return t && (t === "ltr" || t === "rtl" || t === "auto") ? t : this.options.direction;
            },
            renderHTML: (e) => e.dir ? {
              dir: e.dir
            } : {}
          }
        }
      }
    ];
  },
  addProseMirrorPlugins() {
    return [
      new ge({
        key: new Re("textDirection"),
        props: {
          attributes: () => {
            const n = this.options.direction;
            return n ? {
              dir: n
            } : {};
          }
        }
      })
    ];
  }
}), lb = class zn {
  constructor(e, t, r = !1, s = null) {
    this.currentNode = null, this.actualDepth = null, this.isBlock = r, this.resolvedPos = e, this.editor = t, this.currentNode = s;
  }
  get name() {
    return this.node.type.name;
  }
  get node() {
    return this.currentNode || this.resolvedPos.node();
  }
  get element() {
    return this.editor.view.domAtPos(this.pos).node;
  }
  get depth() {
    var e;
    return (e = this.actualDepth) != null ? e : this.resolvedPos.depth;
  }
  get pos() {
    return this.resolvedPos.pos;
  }
  get content() {
    return this.node.content;
  }
  set content(e) {
    let t = this.from, r = this.to;
    if (this.isBlock) {
      if (this.content.size === 0) {
        console.error(`You can’t set content on a block node. Tried to set content on ${this.name} at ${this.pos}`);
        return;
      }
      t = this.from + 1, r = this.to - 1;
    }
    this.editor.commands.insertContentAt({ from: t, to: r }, e);
  }
  get attributes() {
    return this.node.attrs;
  }
  get textContent() {
    return this.node.textContent;
  }
  get size() {
    return this.node.nodeSize;
  }
  get from() {
    return this.isBlock ? this.pos : this.resolvedPos.start(this.resolvedPos.depth);
  }
  get range() {
    return {
      from: this.from,
      to: this.to
    };
  }
  get to() {
    return this.isBlock ? this.pos + this.size : this.resolvedPos.end(this.resolvedPos.depth) + (this.node.isText ? 0 : 1);
  }
  get parent() {
    if (this.depth === 0)
      return null;
    const e = this.resolvedPos.start(this.resolvedPos.depth - 1), t = this.resolvedPos.doc.resolve(e);
    return new zn(t, this.editor);
  }
  get before() {
    let e = this.resolvedPos.doc.resolve(this.from - (this.isBlock ? 1 : 2));
    return e.depth !== this.depth && (e = this.resolvedPos.doc.resolve(this.from - 3)), new zn(e, this.editor);
  }
  get after() {
    let e = this.resolvedPos.doc.resolve(this.to + (this.isBlock ? 2 : 1));
    return e.depth !== this.depth && (e = this.resolvedPos.doc.resolve(this.to + 3)), new zn(e, this.editor);
  }
  get children() {
    const e = [];
    return this.node.content.forEach((t, r) => {
      const s = t.isBlock && !t.isTextblock, i = t.isAtom && !t.isText, o = this.pos + r + (i ? 0 : 1);
      if (o < 0 || o > this.resolvedPos.doc.nodeSize - 2)
        return;
      const l = this.resolvedPos.doc.resolve(o);
      if (!s && l.depth <= this.depth)
        return;
      const a = new zn(l, this.editor, s, s ? t : null);
      s && (a.actualDepth = this.depth + 1), e.push(new zn(l, this.editor, s, s ? t : null));
    }), e;
  }
  get firstChild() {
    return this.children[0] || null;
  }
  get lastChild() {
    const e = this.children;
    return e[e.length - 1] || null;
  }
  closest(e, t = {}) {
    let r = null, s = this.parent;
    for (; s && !r; ) {
      if (s.node.type.name === e)
        if (Object.keys(t).length > 0) {
          const i = s.node.attrs, o = Object.keys(t);
          for (let l = 0; l < o.length; l += 1) {
            const a = o[l];
            if (i[a] !== t[a])
              break;
          }
        } else
          r = s;
      s = s.parent;
    }
    return r;
  }
  querySelector(e, t = {}) {
    return this.querySelectorAll(e, t, !0)[0] || null;
  }
  querySelectorAll(e, t = {}, r = !1) {
    let s = [];
    if (!this.children || this.children.length === 0)
      return s;
    const i = Object.keys(t);
    return this.children.forEach((o) => {
      r && s.length > 0 || (o.node.type.name === e && i.every((a) => t[a] === o.node.attrs[a]) && s.push(o), !(r && s.length > 0) && (s = s.concat(o.querySelectorAll(e, t, r))));
    }), s;
  }
  setAttribute(e) {
    const { tr: t } = this.editor.state;
    t.setNodeMarkup(this.from, void 0, {
      ...this.node.attrs,
      ...e
    }), this.editor.view.dispatch(t);
  }
}, ab = `.ProseMirror {
  position: relative;
}

.ProseMirror {
  word-wrap: break-word;
  white-space: pre-wrap;
  white-space: break-spaces;
  -webkit-font-variant-ligatures: none;
  font-variant-ligatures: none;
  font-feature-settings: "liga" 0; /* the above doesn't seem to work in Edge */
}

.ProseMirror [contenteditable="false"] {
  white-space: normal;
}

.ProseMirror [contenteditable="false"] [contenteditable="true"] {
  white-space: pre-wrap;
}

.ProseMirror pre {
  white-space: pre-wrap;
}

img.ProseMirror-separator {
  display: inline !important;
  border: none !important;
  margin: 0 !important;
  width: 0 !important;
  height: 0 !important;
}

.ProseMirror-gapcursor {
  display: none;
  pointer-events: none;
  position: absolute;
  margin: 0;
}

.ProseMirror-gapcursor:after {
  content: "";
  display: block;
  position: absolute;
  top: -2px;
  width: 20px;
  border-top: 1px solid black;
  animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;
}

@keyframes ProseMirror-cursor-blink {
  to {
    visibility: hidden;
  }
}

.ProseMirror-hideselection *::selection {
  background: transparent;
}

.ProseMirror-hideselection *::-moz-selection {
  background: transparent;
}

.ProseMirror-hideselection * {
  caret-color: transparent;
}

.ProseMirror-focused .ProseMirror-gapcursor {
  display: block;
}`;
function cb(n, e, t) {
  const r = document.querySelector("style[data-tiptap-style]");
  if (r !== null)
    return r;
  const s = document.createElement("style");
  return e && s.setAttribute("nonce", e), s.setAttribute("data-tiptap-style", ""), s.innerHTML = n, document.getElementsByTagName("head")[0].appendChild(s), s;
}
var ub = class extends Y0 {
  constructor(n = {}) {
    super(), this.css = null, this.className = "tiptap", this.editorView = null, this.isFocused = !1, this.isInitialized = !1, this.extensionStorage = {}, this.instanceId = Math.random().toString(36).slice(2, 9), this.options = {
      element: typeof document < "u" ? document.createElement("div") : null,
      content: "",
      injectCSS: !0,
      injectNonce: void 0,
      extensions: [],
      autofocus: !1,
      editable: !0,
      textDirection: void 0,
      editorProps: {},
      parseOptions: {},
      coreExtensionOptions: {},
      enableInputRules: !0,
      enablePasteRules: !0,
      enableCoreExtensions: !0,
      enableContentCheck: !1,
      emitContentError: !1,
      onBeforeCreate: () => null,
      onCreate: () => null,
      onMount: () => null,
      onUnmount: () => null,
      onUpdate: () => null,
      onSelectionUpdate: () => null,
      onTransaction: () => null,
      onFocus: () => null,
      onBlur: () => null,
      onDestroy: () => null,
      onContentError: ({ error: r }) => {
        throw r;
      },
      onPaste: () => null,
      onDrop: () => null,
      onDelete: () => null
    }, this.isCapturingTransaction = !1, this.capturedTransaction = null, this.utils = {
      getUpdatedPosition: T0,
      createMappablePosition: A0
    }, this.setOptions(n), this.createExtensionManager(), this.createCommandManager(), this.createSchema(), this.on("beforeCreate", this.options.onBeforeCreate), this.emit("beforeCreate", { editor: this }), this.on("mount", this.options.onMount), this.on("unmount", this.options.onUnmount), this.on("contentError", this.options.onContentError), this.on("create", this.options.onCreate), this.on("update", this.options.onUpdate), this.on("selectionUpdate", this.options.onSelectionUpdate), this.on("transaction", this.options.onTransaction), this.on("focus", this.options.onFocus), this.on("blur", this.options.onBlur), this.on("destroy", this.options.onDestroy), this.on("drop", ({ event: r, slice: s, moved: i }) => this.options.onDrop(r, s, i)), this.on("paste", ({ event: r, slice: s }) => this.options.onPaste(r, s)), this.on("delete", this.options.onDelete);
    const e = this.createDoc(), t = Yd(e, this.options.autofocus);
    this.editorState = Hn.create({
      doc: e,
      schema: this.schema,
      selection: t || void 0
    }), this.options.element && this.mount(this.options.element);
  }
  /**
   * Attach the editor to the DOM, creating a new editor view.
   */
  mount(n) {
    if (typeof document > "u")
      throw new Error(
        "[tiptap error]: The editor cannot be mounted because there is no 'document' defined in this environment."
      );
    this.createView(n), this.emit("mount", { editor: this }), this.css && !document.head.contains(this.css) && document.head.appendChild(this.css), window.setTimeout(() => {
      this.isDestroyed || (this.options.autofocus !== !1 && this.options.autofocus !== null && this.commands.focus(this.options.autofocus), this.emit("create", { editor: this }), this.isInitialized = !0);
    }, 0);
  }
  /**
   * Remove the editor from the DOM, but still allow remounting at a different point in time
   */
  unmount() {
    if (this.editorView) {
      const n = this.editorView.dom;
      n != null && n.editor && delete n.editor, this.editorView.destroy();
    }
    if (this.editorView = null, this.isInitialized = !1, this.css && !document.querySelectorAll(`.${this.className}`).length)
      try {
        typeof this.css.remove == "function" ? this.css.remove() : this.css.parentNode && this.css.parentNode.removeChild(this.css);
      } catch (n) {
        console.warn("Failed to remove CSS element:", n);
      }
    this.css = null, this.emit("unmount", { editor: this });
  }
  /**
   * Returns the editor storage.
   */
  get storage() {
    return this.extensionStorage;
  }
  /**
   * An object of all registered commands.
   */
  get commands() {
    return this.commandManager.commands;
  }
  /**
   * Create a command chain to call multiple commands at once.
   */
  chain() {
    return this.commandManager.chain();
  }
  /**
   * Check if a command or a command chain can be executed. Without executing it.
   */
  can() {
    return this.commandManager.can();
  }
  /**
   * Inject CSS styles.
   */
  injectCSS() {
    this.options.injectCSS && typeof document < "u" && (this.css = cb(ab, this.options.injectNonce));
  }
  /**
   * Update editor options.
   *
   * @param options A list of options
   */
  setOptions(n = {}) {
    this.options = {
      ...this.options,
      ...n
    }, !(!this.editorView || !this.state || this.isDestroyed) && (this.options.editorProps && this.view.setProps(this.options.editorProps), this.view.updateState(this.state));
  }
  /**
   * Update editable state of the editor.
   */
  setEditable(n, e = !0) {
    this.setOptions({ editable: n }), e && this.emit("update", { editor: this, transaction: this.state.tr, appendedTransactions: [] });
  }
  /**
   * Returns whether the editor is editable.
   */
  get isEditable() {
    return this.options.editable && this.view && this.view.editable;
  }
  /**
   * Returns the editor state.
   */
  get view() {
    return this.editorView ? this.editorView : new Proxy(
      {
        state: this.editorState,
        updateState: (n) => {
          this.editorState = n;
        },
        dispatch: (n) => {
          this.dispatchTransaction(n);
        },
        // Stub some commonly accessed properties to prevent errors
        composing: !1,
        dragging: null,
        editable: !0,
        isDestroyed: !1
      },
      {
        get: (n, e) => {
          if (this.editorView)
            return this.editorView[e];
          if (e === "state")
            return this.editorState;
          if (e in n)
            return Reflect.get(n, e);
          throw new Error(
            `[tiptap error]: The editor view is not available. Cannot access view['${e}']. The editor may not be mounted yet.`
          );
        }
      }
    );
  }
  /**
   * Returns the editor state.
   */
  get state() {
    return this.editorView && (this.editorState = this.view.state), this.editorState;
  }
  /**
   * Register a ProseMirror plugin.
   *
   * @param plugin A ProseMirror plugin
   * @param handlePlugins Control how to merge the plugin into the existing plugins.
   * @returns The new editor state
   */
  registerPlugin(n, e) {
    const t = nf(e) ? e(n, [...this.state.plugins]) : [...this.state.plugins, n], r = this.state.reconfigure({ plugins: t });
    return this.view.updateState(r), r;
  }
  /**
   * Unregister a ProseMirror plugin.
   *
   * @param nameOrPluginKeyToRemove The plugins name
   * @returns The new editor state or undefined if the editor is destroyed
   */
  unregisterPlugin(n) {
    if (this.isDestroyed)
      return;
    const e = this.state.plugins;
    let t = e;
    if ([].concat(n).forEach((s) => {
      const i = typeof s == "string" ? `${s}$` : s.key;
      t = t.filter((o) => !o.key.startsWith(i));
    }), e.length === t.length)
      return;
    const r = this.state.reconfigure({
      plugins: t
    });
    return this.view.updateState(r), r;
  }
  /**
   * Creates an extension manager.
   */
  createExtensionManager() {
    var n, e;
    const r = [...this.options.enableCoreExtensions ? [
      kf,
      gf.configure({
        blockSeparator: (e = (n = this.options.coreExtensionOptions) == null ? void 0 : n.clipboardTextSerializer) == null ? void 0 : e.blockSeparator
      }),
      yf,
      Sf,
      wf,
      Ef,
      xf,
      Cf,
      bf,
      Mf.configure({
        direction: this.options.textDirection
      })
    ].filter((s) => typeof this.options.enableCoreExtensions == "object" ? this.options.enableCoreExtensions[s.name] !== !1 : !0) : [], ...this.options.extensions].filter((s) => ["extension", "node", "mark"].includes(s == null ? void 0 : s.type));
    this.extensionManager = new mi(r, this);
  }
  /**
   * Creates an command manager.
   */
  createCommandManager() {
    this.commandManager = new ui({
      editor: this
    });
  }
  /**
   * Creates a ProseMirror schema.
   */
  createSchema() {
    this.schema = this.extensionManager.schema;
  }
  /**
   * Creates the initial document.
   */
  createDoc() {
    let n;
    try {
      n = _o(this.options.content, this.schema, this.options.parseOptions, {
        errorOnInvalidContent: this.options.enableContentCheck
      });
    } catch (e) {
      if (!(e instanceof Error) || !["[tiptap error]: Invalid JSON content", "[tiptap error]: Invalid HTML content"].includes(e.message))
        throw e;
      this.emit("contentError", {
        editor: this,
        error: e,
        disableCollaboration: () => {
          "collaboration" in this.storage && typeof this.storage.collaboration == "object" && this.storage.collaboration && (this.storage.collaboration.isDisabled = !0), this.options.extensions = this.options.extensions.filter((t) => t.name !== "collaboration"), this.createExtensionManager();
        }
      }), n = _o(this.options.content, this.schema, this.options.parseOptions, {
        errorOnInvalidContent: !1
      });
    }
    return n;
  }
  /**
   * Creates a ProseMirror view.
   */
  createView(n) {
    var e;
    this.editorView = new Wd(n, {
      ...this.options.editorProps,
      attributes: {
        // add `role="textbox"` to the editor element
        role: "textbox",
        ...(e = this.options.editorProps) == null ? void 0 : e.attributes
      },
      dispatchTransaction: this.dispatchTransaction.bind(this),
      state: this.editorState,
      markViews: this.extensionManager.markViews,
      nodeViews: this.extensionManager.nodeViews
    });
    const t = this.state.reconfigure({
      plugins: this.extensionManager.plugins
    });
    this.view.updateState(t), this.prependClass(), this.injectCSS();
    const r = this.view.dom;
    r.editor = this;
  }
  /**
   * Creates all node and mark views.
   */
  createNodeViews() {
    this.view.isDestroyed || this.view.setProps({
      markViews: this.extensionManager.markViews,
      nodeViews: this.extensionManager.nodeViews
    });
  }
  /**
   * Prepend class name to element.
   */
  prependClass() {
    this.view.dom.className = `${this.className} ${this.view.dom.className}`;
  }
  captureTransaction(n) {
    this.isCapturingTransaction = !0, n(), this.isCapturingTransaction = !1;
    const e = this.capturedTransaction;
    return this.capturedTransaction = null, e;
  }
  /**
   * The callback over which to send transactions (state updates) produced by the view.
   *
   * @param transaction An editor state transaction
   */
  dispatchTransaction(n) {
    if (this.view.isDestroyed)
      return;
    if (this.isCapturingTransaction) {
      if (!this.capturedTransaction) {
        this.capturedTransaction = n;
        return;
      }
      n.steps.forEach((c) => {
        var u;
        return (u = this.capturedTransaction) == null ? void 0 : u.step(c);
      });
      return;
    }
    const { state: e, transactions: t } = this.state.applyTransaction(n), r = !this.state.selection.eq(e.selection), s = t.includes(n), i = this.state;
    if (this.emit("beforeTransaction", {
      editor: this,
      transaction: n,
      nextState: e
    }), !s)
      return;
    this.view.updateState(e), this.emit("transaction", {
      editor: this,
      transaction: n,
      appendedTransactions: t.slice(1)
    }), r && this.emit("selectionUpdate", {
      editor: this,
      transaction: n
    });
    const o = t.findLast((c) => c.getMeta("focus") || c.getMeta("blur")), l = o == null ? void 0 : o.getMeta("focus"), a = o == null ? void 0 : o.getMeta("blur");
    l && this.emit("focus", {
      editor: this,
      event: l.event,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      transaction: o
    }), a && this.emit("blur", {
      editor: this,
      event: a.event,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      transaction: o
    }), !(n.getMeta("preventUpdate") || !t.some((c) => c.docChanged) || i.doc.eq(e.doc)) && this.emit("update", {
      editor: this,
      transaction: n,
      appendedTransactions: t.slice(1)
    });
  }
  /**
   * Get attributes of the currently selected node or mark.
   */
  getAttributes(n) {
    return af(this.state, n);
  }
  isActive(n, e) {
    const t = typeof n == "string" ? n : null, r = typeof n == "string" ? e : n;
    return C0(this.state, t, r);
  }
  /**
   * Get the document as JSON.
   */
  getJSON() {
    return this.state.doc.toJSON();
  }
  /**
   * Get the document as HTML.
   */
  getHTML() {
    return Ol(this.state.doc.content, this.schema);
  }
  /**
   * Get the document as text.
   */
  getText(n) {
    const { blockSeparator: e = `

`, textSerializers: t = {} } = n || {};
    return b0(this.state.doc, {
      blockSeparator: e,
      textSerializers: {
        ...lf(this.schema),
        ...t
      }
    });
  }
  /**
   * Check if there is no content.
   */
  get isEmpty() {
    return pi(this.state.doc);
  }
  /**
   * Destroy the editor.
   */
  destroy() {
    this.emit("destroy"), this.unmount(), this.removeAllListeners();
  }
  /**
   * Check if the editor is already destroyed.
   */
  get isDestroyed() {
    var n, e;
    return (e = (n = this.editorView) == null ? void 0 : n.isDestroyed) != null ? e : !0;
  }
  $node(n, e) {
    var t;
    return ((t = this.$doc) == null ? void 0 : t.querySelector(n, e)) || null;
  }
  $nodes(n, e) {
    var t;
    return ((t = this.$doc) == null ? void 0 : t.querySelectorAll(n, e)) || null;
  }
  $pos(n) {
    const e = this.state.doc.resolve(n);
    return new lb(e, this);
  }
  get $doc() {
    return this.$pos(0);
  }
};
function Qn(n) {
  return new Fr({
    find: n.find,
    handler: ({ state: e, range: t, match: r }) => {
      const s = oe(n.getAttributes, void 0, r);
      if (s === !1 || s === null)
        return null;
      const { tr: i } = e, o = r[r.length - 1], l = r[0];
      if (o) {
        const a = l.search(/\S/), c = t.from + l.indexOf(o), u = c + o.length;
        if (Dl(t.from, t.to, e.doc).filter((h) => h.mark.type.excluded.find((m) => m === n.type && m !== h.mark.type)).filter((h) => h.to > c).length)
          return null;
        u < t.to && i.delete(u, t.to), c > t.from && i.delete(t.from + a, c);
        const f = t.from + a + o.length;
        i.addMark(t.from + a, f, n.type.create(s || {})), i.removeStoredMark(n.type);
      }
    },
    undoable: n.undoable
  });
}
function db(n) {
  return new Fr({
    find: n.find,
    handler: ({ state: e, range: t, match: r }) => {
      const s = oe(n.getAttributes, void 0, r) || {}, { tr: i } = e, o = t.from;
      let l = t.to;
      const a = n.type.create(s);
      if (r[1]) {
        const c = r[0].lastIndexOf(r[1]);
        let u = o + c;
        u > l ? u = l : l = u + r[1].length;
        const d = r[0][r[0].length - 1];
        i.insertText(d, o + r[0].length - 1), i.replaceWith(u, l, a);
      } else if (r[0]) {
        const c = n.type.isInline ? o : o - 1;
        i.insert(c, n.type.create(s)).delete(i.mapping.map(o), i.mapping.map(l));
      }
      i.scrollIntoView();
    },
    undoable: n.undoable
  });
}
function Fo(n) {
  return new Fr({
    find: n.find,
    handler: ({ state: e, range: t, match: r }) => {
      const s = e.doc.resolve(t.from), i = oe(n.getAttributes, void 0, r) || {};
      if (!s.node(-1).canReplaceWith(s.index(-1), s.indexAfter(-1), n.type))
        return null;
      e.tr.delete(t.from, t.to).setBlockType(t.from, t.from, n.type, i);
    },
    undoable: n.undoable
  });
}
function jk(n) {
  return new Fr({
    find: n.find,
    handler: ({ state: e, range: t, match: r }) => {
      let s = n.replace, i = t.from;
      const o = t.to;
      if (r[1]) {
        const l = r[0].lastIndexOf(r[1]);
        s += r[0].slice(l + r[1].length), i += l;
        const a = i - o;
        a > 0 && (s = r[0].slice(l - a, l) + s, i = o);
      }
      e.tr.insertText(s, i, o);
    },
    undoable: n.undoable
  });
}
function Zn(n) {
  return new Fr({
    find: n.find,
    handler: ({ state: e, range: t, match: r, chain: s }) => {
      const i = oe(n.getAttributes, void 0, r) || {}, o = e.tr.delete(t.from, t.to), a = o.doc.resolve(t.from).blockRange(), c = a && ul(a, n.type, i);
      if (!c)
        return null;
      if (o.wrap(a, c), n.keepMarks && n.editor) {
        const { selection: d, storedMarks: f } = e, { splittableMarks: h } = n.editor.extensionManager, p = f || d.$to.parentOffset && d.$from.marks();
        if (p) {
          const m = p.filter((g) => h.includes(g.type.name));
          o.ensureMarks(m);
        }
      }
      if (n.keepAttributes) {
        const d = n.type.name === "bulletList" || n.type.name === "orderedList" ? "listItem" : "taskList";
        s().updateAttributes(d, i).run();
      }
      const u = o.doc.resolve(t.from - 1).nodeBefore;
      u && u.type === n.type && nn(o.doc, t.from - 1) && (!n.joinPredicate || n.joinPredicate(r, u)) && o.join(t.from - 1);
    },
    undoable: n.undoable
  });
}
var fb = (n) => "touches" in n, $k = class {
  /**
   * Creates a new ResizableNodeView instance.
   *
   * The constructor sets up the resize handles, applies initial sizing from
   * node attributes, and configures all resize behavior options.
   *
   * @param options - Configuration options for the resizable node view
   */
  constructor(n) {
    this.directions = ["bottom-left", "bottom-right", "top-left", "top-right"], this.minSize = {
      height: 8,
      width: 8
    }, this.preserveAspectRatio = !1, this.classNames = {
      container: "",
      wrapper: "",
      handle: "",
      resizing: ""
    }, this.initialWidth = 0, this.initialHeight = 0, this.aspectRatio = 1, this.isResizing = !1, this.activeHandle = null, this.startX = 0, this.startY = 0, this.startWidth = 0, this.startHeight = 0, this.isShiftKeyPressed = !1, this.lastEditableState = void 0, this.handleMap = /* @__PURE__ */ new Map(), this.handleMouseMove = (l) => {
      if (!this.isResizing || !this.activeHandle)
        return;
      const a = l.clientX - this.startX, c = l.clientY - this.startY;
      this.handleResize(a, c);
    }, this.handleTouchMove = (l) => {
      if (!this.isResizing || !this.activeHandle)
        return;
      const a = l.touches[0];
      if (!a)
        return;
      const c = a.clientX - this.startX, u = a.clientY - this.startY;
      this.handleResize(c, u);
    }, this.handleMouseUp = () => {
      if (!this.isResizing)
        return;
      const l = this.element.offsetWidth, a = this.element.offsetHeight;
      this.onCommit(l, a), this.isResizing = !1, this.activeHandle = null, this.container.dataset.resizeState = "false", this.classNames.resizing && this.container.classList.remove(this.classNames.resizing), document.removeEventListener("mousemove", this.handleMouseMove), document.removeEventListener("mouseup", this.handleMouseUp), document.removeEventListener("keydown", this.handleKeyDown), document.removeEventListener("keyup", this.handleKeyUp);
    }, this.handleKeyDown = (l) => {
      l.key === "Shift" && (this.isShiftKeyPressed = !0);
    }, this.handleKeyUp = (l) => {
      l.key === "Shift" && (this.isShiftKeyPressed = !1);
    };
    var e, t, r, s, i, o;
    this.node = n.node, this.editor = n.editor, this.element = n.element, this.contentElement = n.contentElement, this.getPos = n.getPos, this.onResize = n.onResize, this.onCommit = n.onCommit, this.onUpdate = n.onUpdate, (e = n.options) != null && e.min && (this.minSize = {
      ...this.minSize,
      ...n.options.min
    }), (t = n.options) != null && t.max && (this.maxSize = n.options.max), (r = n == null ? void 0 : n.options) != null && r.directions && (this.directions = n.options.directions), (s = n.options) != null && s.preserveAspectRatio && (this.preserveAspectRatio = n.options.preserveAspectRatio), (i = n.options) != null && i.className && (this.classNames = {
      container: n.options.className.container || "",
      wrapper: n.options.className.wrapper || "",
      handle: n.options.className.handle || "",
      resizing: n.options.className.resizing || ""
    }), (o = n.options) != null && o.createCustomHandle && (this.createCustomHandle = n.options.createCustomHandle), this.wrapper = this.createWrapper(), this.container = this.createContainer(), this.applyInitialSize(), this.attachHandles(), this.editor.on("update", this.handleEditorUpdate.bind(this));
  }
  /**
   * Returns the top-level DOM node that should be placed in the editor.
   *
   * This is required by the ProseMirror NodeView interface. The container
   * includes the wrapper, handles, and the actual content element.
   *
   * @returns The container element to be inserted into the editor
   */
  get dom() {
    return this.container;
  }
  get contentDOM() {
    return this.contentElement;
  }
  handleEditorUpdate() {
    const n = this.editor.isEditable;
    n !== this.lastEditableState && (this.lastEditableState = n, n ? n && this.handleMap.size === 0 && this.attachHandles() : this.removeHandles());
  }
  /**
   * Called when the node's content or attributes change.
   *
   * Updates the internal node reference. If a custom `onUpdate` callback
   * was provided, it will be called to handle additional update logic.
   *
   * @param node - The new/updated node
   * @param decorations - Node decorations
   * @param innerDecorations - Inner decorations
   * @returns `false` if the node type has changed (requires full rebuild), otherwise the result of `onUpdate` or `true`
   */
  update(n, e, t) {
    return n.type !== this.node.type ? !1 : (this.node = n, this.onUpdate ? this.onUpdate(n, e, t) : !0);
  }
  /**
   * Cleanup method called when the node view is being removed.
   *
   * Removes all event listeners to prevent memory leaks. This is required
   * by the ProseMirror NodeView interface. If a resize is active when
   * destroy is called, it will be properly cancelled.
   */
  destroy() {
    this.isResizing && (this.container.dataset.resizeState = "false", this.classNames.resizing && this.container.classList.remove(this.classNames.resizing), document.removeEventListener("mousemove", this.handleMouseMove), document.removeEventListener("mouseup", this.handleMouseUp), document.removeEventListener("keydown", this.handleKeyDown), document.removeEventListener("keyup", this.handleKeyUp), this.isResizing = !1, this.activeHandle = null), this.editor.off("update", this.handleEditorUpdate.bind(this)), this.container.remove();
  }
  /**
   * Creates the outer container element.
   *
   * The container is the top-level element returned by the NodeView and
   * wraps the entire resizable node. It's set up with flexbox to handle
   * alignment and includes data attributes for styling and identification.
   *
   * @returns The container element
   */
  createContainer() {
    const n = document.createElement("div");
    return n.dataset.resizeContainer = "", n.dataset.node = this.node.type.name, n.style.display = "flex", this.classNames.container && (n.className = this.classNames.container), n.appendChild(this.wrapper), n;
  }
  /**
   * Creates the wrapper element that contains the content and handles.
   *
   * The wrapper uses relative positioning so that resize handles can be
   * positioned absolutely within it. This is the direct parent of the
   * content element being made resizable.
   *
   * @returns The wrapper element
   */
  createWrapper() {
    const n = document.createElement("div");
    return n.style.position = "relative", n.style.display = "block", n.dataset.resizeWrapper = "", this.classNames.wrapper && (n.className = this.classNames.wrapper), n.appendChild(this.element), n;
  }
  /**
   * Creates a resize handle element for a specific direction.
   *
   * Each handle is absolutely positioned and includes a data attribute
   * identifying its direction for styling purposes.
   *
   * @param direction - The resize direction for this handle
   * @returns The handle element
   */
  createHandle(n) {
    const e = document.createElement("div");
    return e.dataset.resizeHandle = n, e.style.position = "absolute", this.classNames.handle && (e.className = this.classNames.handle), e;
  }
  /**
   * Positions a handle element according to its direction.
   *
   * Corner handles (e.g., 'top-left') are positioned at the intersection
   * of two edges. Edge handles (e.g., 'top') span the full width or height.
   *
   * @param handle - The handle element to position
   * @param direction - The direction determining the position
   */
  positionHandle(n, e) {
    const t = e.includes("top"), r = e.includes("bottom"), s = e.includes("left"), i = e.includes("right");
    t && (n.style.top = "0"), r && (n.style.bottom = "0"), s && (n.style.left = "0"), i && (n.style.right = "0"), (e === "top" || e === "bottom") && (n.style.left = "0", n.style.right = "0"), (e === "left" || e === "right") && (n.style.top = "0", n.style.bottom = "0");
  }
  /**
   * Creates and attaches all resize handles to the wrapper.
   *
   * Iterates through the configured directions, creates a handle for each,
   * positions it, attaches the mousedown listener, and appends it to the DOM.
   */
  attachHandles() {
    this.directions.forEach((n) => {
      let e;
      this.createCustomHandle ? e = this.createCustomHandle(n) : e = this.createHandle(n), e instanceof HTMLElement || (console.warn(
        `[ResizableNodeView] createCustomHandle("${n}") did not return an HTMLElement. Falling back to default handle.`
      ), e = this.createHandle(n)), this.createCustomHandle || this.positionHandle(e, n), e.addEventListener("mousedown", (t) => this.handleResizeStart(t, n)), e.addEventListener("touchstart", (t) => this.handleResizeStart(t, n)), this.handleMap.set(n, e), this.wrapper.appendChild(e);
    });
  }
  /**
   * Removes all resize handles from the wrapper.
   *
   * Cleans up the handle map and removes each handle element from the DOM.
   */
  removeHandles() {
    this.handleMap.forEach((n) => n.remove()), this.handleMap.clear();
  }
  /**
   * Applies initial sizing from node attributes to the element.
   *
   * If width/height attributes exist on the node, they're applied to the element.
   * Otherwise, the element's natural/current dimensions are measured. The aspect
   * ratio is calculated for later use in aspect-ratio-preserving resizes.
   */
  applyInitialSize() {
    const n = this.node.attrs.width, e = this.node.attrs.height;
    n ? (this.element.style.width = `${n}px`, this.initialWidth = n) : this.initialWidth = this.element.offsetWidth, e ? (this.element.style.height = `${e}px`, this.initialHeight = e) : this.initialHeight = this.element.offsetHeight, this.initialWidth > 0 && this.initialHeight > 0 && (this.aspectRatio = this.initialWidth / this.initialHeight);
  }
  /**
   * Initiates a resize operation when a handle is clicked.
   *
   * Captures the starting mouse position and element dimensions, sets up
   * the resize state, adds the resizing class and state attribute, and
   * attaches document-level listeners for mouse movement and keyboard input.
   *
   * @param event - The mouse down event
   * @param direction - The direction of the handle being dragged
   */
  handleResizeStart(n, e) {
    n.preventDefault(), n.stopPropagation(), this.isResizing = !0, this.activeHandle = e, fb(n) ? (this.startX = n.touches[0].clientX, this.startY = n.touches[0].clientY) : (this.startX = n.clientX, this.startY = n.clientY), this.startWidth = this.element.offsetWidth, this.startHeight = this.element.offsetHeight, this.startWidth > 0 && this.startHeight > 0 && (this.aspectRatio = this.startWidth / this.startHeight), this.getPos(), this.container.dataset.resizeState = "true", this.classNames.resizing && this.container.classList.add(this.classNames.resizing), document.addEventListener("mousemove", this.handleMouseMove), document.addEventListener("touchmove", this.handleTouchMove), document.addEventListener("mouseup", this.handleMouseUp), document.addEventListener("keydown", this.handleKeyDown), document.addEventListener("keyup", this.handleKeyUp);
  }
  handleResize(n, e) {
    if (!this.activeHandle)
      return;
    const t = this.preserveAspectRatio || this.isShiftKeyPressed, { width: r, height: s } = this.calculateNewDimensions(this.activeHandle, n, e), i = this.applyConstraints(r, s, t);
    this.element.style.width = `${i.width}px`, this.element.style.height = `${i.height}px`, this.onResize && this.onResize(i.width, i.height);
  }
  /**
   * Calculates new dimensions based on mouse delta and resize direction.
   *
   * Takes the starting dimensions and applies the mouse movement delta
   * according to the handle direction. For corner handles, both dimensions
   * are affected. For edge handles, only one dimension changes. If aspect
   * ratio should be preserved, delegates to applyAspectRatio.
   *
   * @param direction - The active resize handle direction
   * @param deltaX - Horizontal mouse movement since resize start
   * @param deltaY - Vertical mouse movement since resize start
   * @returns The calculated width and height
   */
  calculateNewDimensions(n, e, t) {
    let r = this.startWidth, s = this.startHeight;
    const i = n.includes("right"), o = n.includes("left"), l = n.includes("bottom"), a = n.includes("top");
    return i ? r = this.startWidth + e : o && (r = this.startWidth - e), l ? s = this.startHeight + t : a && (s = this.startHeight - t), (n === "right" || n === "left") && (r = this.startWidth + (i ? e : -e)), (n === "top" || n === "bottom") && (s = this.startHeight + (l ? t : -t)), this.preserveAspectRatio || this.isShiftKeyPressed ? this.applyAspectRatio(r, s, n) : { width: r, height: s };
  }
  /**
   * Applies min/max constraints to dimensions.
   *
   * When aspect ratio is NOT preserved, constraints are applied independently
   * to width and height. When aspect ratio IS preserved, constraints are
   * applied while maintaining the aspect ratio—if one dimension hits a limit,
   * the other is recalculated proportionally.
   *
   * This ensures that aspect ratio is never broken when constrained.
   *
   * @param width - The unconstrained width
   * @param height - The unconstrained height
   * @param preserveAspectRatio - Whether to maintain aspect ratio while constraining
   * @returns The constrained dimensions
   */
  applyConstraints(n, e, t) {
    var r, s, i, o;
    if (!t) {
      let c = Math.max(this.minSize.width, n), u = Math.max(this.minSize.height, e);
      return (r = this.maxSize) != null && r.width && (c = Math.min(this.maxSize.width, c)), (s = this.maxSize) != null && s.height && (u = Math.min(this.maxSize.height, u)), { width: c, height: u };
    }
    let l = n, a = e;
    return l < this.minSize.width && (l = this.minSize.width, a = l / this.aspectRatio), a < this.minSize.height && (a = this.minSize.height, l = a * this.aspectRatio), (i = this.maxSize) != null && i.width && l > this.maxSize.width && (l = this.maxSize.width, a = l / this.aspectRatio), (o = this.maxSize) != null && o.height && a > this.maxSize.height && (a = this.maxSize.height, l = a * this.aspectRatio), { width: l, height: a };
  }
  /**
   * Adjusts dimensions to maintain the original aspect ratio.
   *
   * For horizontal handles (left/right), uses width as the primary dimension
   * and calculates height from it. For vertical handles (top/bottom), uses
   * height as primary and calculates width. For corner handles, uses width
   * as the primary dimension.
   *
   * @param width - The new width
   * @param height - The new height
   * @param direction - The active resize direction
   * @returns Dimensions adjusted to preserve aspect ratio
   */
  applyAspectRatio(n, e, t) {
    const r = t === "left" || t === "right", s = t === "top" || t === "bottom";
    return r ? {
      width: n,
      height: n / this.aspectRatio
    } : s ? {
      width: e * this.aspectRatio,
      height: e
    } : {
      width: n,
      height: n / this.aspectRatio
    };
  }
};
function hb(n, e) {
  const { selection: t } = n, { $from: r } = t;
  if (t instanceof j) {
    const i = r.index();
    return r.parent.canReplaceWith(i, i + 1, e);
  }
  let s = r.depth;
  for (; s >= 0; ) {
    const i = r.index(s);
    if (r.node(s).contentMatchAt(i).matchType(e))
      return !0;
    s -= 1;
  }
  return !1;
}
var pb = {};
Ml(pb, {
  createAtomBlockMarkdownSpec: () => mb,
  createBlockMarkdownSpec: () => gb,
  createInlineMarkdownSpec: () => xb,
  parseAttributes: () => Ll,
  parseIndentedBlocks: () => Vo,
  renderNestedMarkdownContent: () => _l,
  serializeAttributes: () => Pl
});
function Ll(n) {
  if (!(n != null && n.trim()))
    return {};
  const e = {}, t = [], r = n.replace(/["']([^"']*)["']/g, (c) => (t.push(c), `__QUOTED_${t.length - 1}__`)), s = r.match(/(?:^|\s)\.([a-zA-Z][\w-]*)/g);
  if (s) {
    const c = s.map((u) => u.trim().slice(1));
    e.class = c.join(" ");
  }
  const i = r.match(/(?:^|\s)#([a-zA-Z][\w-]*)/);
  i && (e.id = i[1]);
  const o = /([a-zA-Z][\w-]*)\s*=\s*(__QUOTED_\d+__)/g;
  Array.from(r.matchAll(o)).forEach(([, c, u]) => {
    var d;
    const f = parseInt(((d = u.match(/__QUOTED_(\d+)__/)) == null ? void 0 : d[1]) || "0", 10), h = t[f];
    h && (e[c] = h.slice(1, -1));
  });
  const a = r.replace(/(?:^|\s)\.([a-zA-Z][\w-]*)/g, "").replace(/(?:^|\s)#([a-zA-Z][\w-]*)/g, "").replace(/([a-zA-Z][\w-]*)\s*=\s*__QUOTED_\d+__/g, "").trim();
  return a && a.split(/\s+/).filter(Boolean).forEach((u) => {
    u.match(/^[a-zA-Z][\w-]*$/) && (e[u] = !0);
  }), e;
}
function Pl(n) {
  if (!n || Object.keys(n).length === 0)
    return "";
  const e = [];
  return n.class && String(n.class).split(/\s+/).filter(Boolean).forEach((r) => e.push(`.${r}`)), n.id && e.push(`#${n.id}`), Object.entries(n).forEach(([t, r]) => {
    t === "class" || t === "id" || (r === !0 ? e.push(t) : r !== !1 && r != null && e.push(`${t}="${String(r)}"`));
  }), e.join(" ");
}
function mb(n) {
  const {
    nodeName: e,
    name: t,
    parseAttributes: r = Ll,
    serializeAttributes: s = Pl,
    defaultAttributes: i = {},
    requiredAttributes: o = [],
    allowedAttributes: l
  } = n, a = t || e, c = (u) => {
    if (!l)
      return u;
    const d = {};
    return l.forEach((f) => {
      f in u && (d[f] = u[f]);
    }), d;
  };
  return {
    parseMarkdown: (u, d) => {
      const f = { ...i, ...u.attributes };
      return d.createNode(e, f, []);
    },
    markdownTokenizer: {
      name: e,
      level: "block",
      start(u) {
        var d;
        const f = new RegExp(`^:::${a}(?:\\s|$)`, "m"), h = (d = u.match(f)) == null ? void 0 : d.index;
        return h !== void 0 ? h : -1;
      },
      tokenize(u, d, f) {
        const h = new RegExp(`^:::${a}(?:\\s+\\{([^}]*)\\})?\\s*:::(?:\\n|$)`), p = u.match(h);
        if (!p)
          return;
        const m = p[1] || "", g = r(m);
        if (!o.find((k) => !(k in g)))
          return {
            type: e,
            raw: p[0],
            attributes: g
          };
      }
    },
    renderMarkdown: (u) => {
      const d = c(u.attrs || {}), f = s(d), h = f ? ` {${f}}` : "";
      return `:::${a}${h} :::`;
    }
  };
}
function gb(n) {
  const {
    nodeName: e,
    name: t,
    getContent: r,
    parseAttributes: s = Ll,
    serializeAttributes: i = Pl,
    defaultAttributes: o = {},
    content: l = "block",
    allowedAttributes: a
  } = n, c = t || e, u = (d) => {
    if (!a)
      return d;
    const f = {};
    return a.forEach((h) => {
      h in d && (f[h] = d[h]);
    }), f;
  };
  return {
    parseMarkdown: (d, f) => {
      let h;
      if (r) {
        const m = r(d);
        h = typeof m == "string" ? [{ type: "text", text: m }] : m;
      } else l === "block" ? h = f.parseChildren(d.tokens || []) : h = f.parseInline(d.tokens || []);
      const p = { ...o, ...d.attributes };
      return f.createNode(e, p, h);
    },
    markdownTokenizer: {
      name: e,
      level: "block",
      start(d) {
        var f;
        const h = new RegExp(`^:::${c}`, "m"), p = (f = d.match(h)) == null ? void 0 : f.index;
        return p !== void 0 ? p : -1;
      },
      tokenize(d, f, h) {
        var p;
        const m = new RegExp(`^:::${c}(?:\\s+\\{([^}]*)\\})?\\s*\\n`), g = d.match(m);
        if (!g)
          return;
        const [y, k = ""] = g, C = s(k);
        let v = 1;
        const x = y.length;
        let E = "";
        const M = /^:::([\w-]*)(\s.*)?/gm, D = d.slice(x);
        for (M.lastIndex = 0; ; ) {
          const L = M.exec(D);
          if (L === null)
            break;
          const z = L.index, X = L[1];
          if (!((p = L[2]) != null && p.endsWith(":::"))) {
            if (X)
              v += 1;
            else if (v -= 1, v === 0) {
              const F = D.slice(0, z);
              E = F.trim();
              const V = d.slice(0, x + z + L[0].length);
              let W = [];
              if (E)
                if (l === "block")
                  for (W = h.blockTokens(F), W.forEach((J) => {
                    J.text && (!J.tokens || J.tokens.length === 0) && (J.tokens = h.inlineTokens(J.text));
                  }); W.length > 0; ) {
                    const J = W[W.length - 1];
                    if (J.type === "paragraph" && (!J.text || J.text.trim() === ""))
                      W.pop();
                    else
                      break;
                  }
                else
                  W = h.inlineTokens(E);
              return {
                type: e,
                raw: V,
                attributes: C,
                content: E,
                tokens: W
              };
            }
          }
        }
      }
    },
    renderMarkdown: (d, f) => {
      const h = u(d.attrs || {}), p = i(h), m = p ? ` {${p}}` : "", g = f.renderChildren(d.content || [], `

`);
      return `:::${c}${m}

${g}

:::`;
    }
  };
}
function yb(n) {
  if (!n.trim())
    return {};
  const e = {}, t = /(\w+)=(?:"([^"]*)"|'([^']*)')/g;
  let r = t.exec(n);
  for (; r !== null; ) {
    const [, s, i, o] = r;
    e[s] = i || o, r = t.exec(n);
  }
  return e;
}
function bb(n) {
  return Object.entries(n).filter(([, e]) => e != null).map(([e, t]) => `${e}="${t}"`).join(" ");
}
function xb(n) {
  const {
    nodeName: e,
    name: t,
    getContent: r,
    parseAttributes: s = yb,
    serializeAttributes: i = bb,
    defaultAttributes: o = {},
    selfClosing: l = !1,
    allowedAttributes: a
  } = n, c = t || e, u = (f) => {
    if (!a)
      return f;
    const h = {};
    return a.forEach((p) => {
      const m = typeof p == "string" ? p : p.name, g = typeof p == "string" ? void 0 : p.skipIfDefault;
      if (m in f) {
        const y = f[m];
        if (g !== void 0 && y === g)
          return;
        h[m] = y;
      }
    }), h;
  }, d = c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return {
    parseMarkdown: (f, h) => {
      const p = { ...o, ...f.attributes };
      if (l)
        return h.createNode(e, p);
      const m = r ? r(f) : f.content || "";
      return m ? h.createNode(e, p, [h.createTextNode(m)]) : h.createNode(e, p, []);
    },
    markdownTokenizer: {
      name: e,
      level: "inline",
      start(f) {
        const h = l ? new RegExp(`\\[${d}\\s*[^\\]]*\\]`) : new RegExp(`\\[${d}\\s*[^\\]]*\\][\\s\\S]*?\\[\\/${d}\\]`), p = f.match(h), m = p == null ? void 0 : p.index;
        return m !== void 0 ? m : -1;
      },
      tokenize(f, h, p) {
        const m = l ? new RegExp(`^\\[${d}\\s*([^\\]]*)\\]`) : new RegExp(`^\\[${d}\\s*([^\\]]*)\\]([\\s\\S]*?)\\[\\/${d}\\]`), g = f.match(m);
        if (!g)
          return;
        let y = "", k = "";
        if (l) {
          const [, v] = g;
          k = v;
        } else {
          const [, v, x] = g;
          k = v, y = x || "";
        }
        const C = s(k.trim());
        return {
          type: e,
          raw: g[0],
          content: y.trim(),
          attributes: C
        };
      }
    },
    renderMarkdown: (f) => {
      let h = "";
      r ? h = r(f) : f.content && f.content.length > 0 && (h = f.content.filter((y) => y.type === "text").map((y) => y.text).join(""));
      const p = u(f.attrs || {}), m = i(p), g = m ? ` ${m}` : "";
      return l ? `[${c}${g}]` : `[${c}${g}]${h}[/${c}]`;
    }
  };
}
function Vo(n, e, t) {
  var r, s, i, o;
  const l = n.split(`
`), a = [];
  let c = "", u = 0;
  const d = e.baseIndentSize || 2;
  for (; u < l.length; ) {
    const f = l[u], h = f.match(e.itemPattern);
    if (!h) {
      if (a.length > 0)
        break;
      if (f.trim() === "") {
        u += 1, c = `${c}${f}
`;
        continue;
      } else
        return;
    }
    const p = e.extractItemData(h), { indentLevel: m, mainContent: g } = p;
    c = `${c}${f}
`;
    const y = [g];
    for (u += 1; u < l.length; ) {
      const x = l[u];
      if (x.trim() === "") {
        const M = l.slice(u + 1).findIndex((z) => z.trim() !== "");
        if (M === -1)
          break;
        if ((((s = (r = l[u + 1 + M].match(/^(\s*)/)) == null ? void 0 : r[1]) == null ? void 0 : s.length) || 0) > m) {
          y.push(x), c = `${c}${x}
`, u += 1;
          continue;
        } else
          break;
      }
      if ((((o = (i = x.match(/^(\s*)/)) == null ? void 0 : i[1]) == null ? void 0 : o.length) || 0) > m)
        y.push(x), c = `${c}${x}
`, u += 1;
      else
        break;
    }
    let k;
    const C = y.slice(1);
    if (C.length > 0) {
      const x = C.map((E) => E.slice(m + d)).join(`
`);
      x.trim() && (e.customNestedParser ? k = e.customNestedParser(x) : k = t.blockTokens(x));
    }
    const v = e.createToken(p, k);
    a.push(v);
  }
  if (a.length !== 0)
    return {
      items: a,
      raw: c
    };
}
function _l(n, e, t, r) {
  if (!n || !Array.isArray(n.content))
    return "";
  const s = typeof t == "function" ? t(r) : t, [i, ...o] = n.content, l = e.renderChildren([i]), a = [`${s}${l}`];
  return o && o.length > 0 && o.forEach((c) => {
    const u = e.renderChildren([c]);
    if (u) {
      const d = u.split(`
`).map((f) => f ? e.indent(f) : "").join(`
`);
      a.push(d);
    }
  }), a.join(`
`);
}
function kb(n, e, t = {}) {
  const { state: r } = e, { doc: s, tr: i } = r, o = n;
  s.descendants((l, a) => {
    const c = i.mapping.map(a), u = i.mapping.map(a) + l.nodeSize;
    let d = null;
    if (l.marks.forEach((h) => {
      if (h !== o)
        return !1;
      d = h;
    }), !d)
      return;
    let f = !1;
    if (Object.keys(t).forEach((h) => {
      t[h] !== d.attrs[h] && (f = !0);
    }), f) {
      const h = n.type.create({
        ...n.attrs,
        ...t
      });
      i.removeMark(c, u, n.type), i.addMark(c, u, h);
    }
  }), i.docChanged && e.view.dispatch(i);
}
var st = class Tf extends Il {
  constructor() {
    super(...arguments), this.type = "node";
  }
  /**
   * Create a new Node instance
   * @param config - Node configuration object or a function that returns a configuration object
   */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new Tf(t);
  }
  configure(e) {
    return super.configure(e);
  }
  extend(e) {
    const t = typeof e == "function" ? e() : e;
    return super.extend(t);
  }
}, vb = class {
  constructor(n, e, t) {
    this.isDragging = !1, this.component = n, this.editor = e.editor, this.options = {
      stopEvent: null,
      ignoreMutation: null,
      ...t
    }, this.extension = e.extension, this.node = e.node, this.decorations = e.decorations, this.innerDecorations = e.innerDecorations, this.view = e.view, this.HTMLAttributes = e.HTMLAttributes, this.getPos = e.getPos, this.mount();
  }
  mount() {
  }
  get dom() {
    return this.editor.view.dom;
  }
  get contentDOM() {
    return null;
  }
  onDragStart(n) {
    var e, t, r, s, i, o, l;
    const { view: a } = this.editor, c = n.target, u = c.nodeType === 3 ? (e = c.parentElement) == null ? void 0 : e.closest("[data-drag-handle]") : c.closest("[data-drag-handle]");
    if (!this.dom || (t = this.contentDOM) != null && t.contains(c) || !u)
      return;
    let d = 0, f = 0;
    if (this.dom !== u) {
      const k = this.dom.getBoundingClientRect(), C = u.getBoundingClientRect(), v = (s = n.offsetX) != null ? s : (r = n.nativeEvent) == null ? void 0 : r.offsetX, x = (o = n.offsetY) != null ? o : (i = n.nativeEvent) == null ? void 0 : i.offsetY;
      d = C.x - k.x + v, f = C.y - k.y + x;
    }
    const h = this.dom.cloneNode(!0);
    try {
      const k = this.dom.getBoundingClientRect();
      h.style.width = `${Math.round(k.width)}px`, h.style.height = `${Math.round(k.height)}px`, h.style.boxSizing = "border-box", h.style.pointerEvents = "none";
    } catch {
    }
    let p = null;
    try {
      p = document.createElement("div"), p.style.position = "absolute", p.style.top = "-9999px", p.style.left = "-9999px", p.style.pointerEvents = "none", p.appendChild(h), document.body.appendChild(p), (l = n.dataTransfer) == null || l.setDragImage(h, d, f);
    } finally {
      p && setTimeout(() => {
        try {
          p == null || p.remove();
        } catch {
        }
      }, 0);
    }
    const m = this.getPos();
    if (typeof m != "number")
      return;
    const g = j.create(a.state.doc, m), y = a.state.tr.setSelection(g);
    a.dispatch(y);
  }
  stopEvent(n) {
    var e;
    if (!this.dom)
      return !1;
    if (typeof this.options.stopEvent == "function")
      return this.options.stopEvent({ event: n });
    const t = n.target;
    if (!(this.dom.contains(t) && !((e = this.contentDOM) != null && e.contains(t))))
      return !1;
    const s = n.type.startsWith("drag"), i = n.type === "drop";
    if ((["INPUT", "BUTTON", "SELECT", "TEXTAREA"].includes(t.tagName) || t.isContentEditable) && !i && !s)
      return !0;
    const { isEditable: l } = this.editor, { isDragging: a } = this, c = !!this.node.type.spec.draggable, u = j.isSelectable(this.node), d = n.type === "copy", f = n.type === "paste", h = n.type === "cut", p = n.type === "mousedown";
    if (!c && u && s && n.target === this.dom && n.preventDefault(), c && s && !a && n.target === this.dom)
      return n.preventDefault(), !1;
    if (c && l && !a && p) {
      const m = t.closest("[data-drag-handle]");
      m && (this.dom === m || this.dom.contains(m)) && (this.isDragging = !0, document.addEventListener(
        "dragend",
        () => {
          this.isDragging = !1;
        },
        { once: !0 }
      ), document.addEventListener(
        "drop",
        () => {
          this.isDragging = !1;
        },
        { once: !0 }
      ), document.addEventListener(
        "mouseup",
        () => {
          this.isDragging = !1;
        },
        { once: !0 }
      ));
    }
    return !(a || i || d || f || h || p && u);
  }
  /**
   * Called when a DOM [mutation](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) or a selection change happens within the view.
   * @return `false` if the editor should re-read the selection or re-parse the range around the mutation
   * @return `true` if it can safely be ignored.
   */
  ignoreMutation(n) {
    return !this.dom || !this.contentDOM ? !0 : typeof this.options.ignoreMutation == "function" ? this.options.ignoreMutation({ mutation: n }) : this.node.isLeaf || this.node.isAtom ? !0 : n.type === "selection" || this.dom.contains(n.target) && n.type === "childList" && (di() || Xd()) && this.editor.isFocused && [...Array.from(n.addedNodes), ...Array.from(n.removedNodes)].every((t) => t.isContentEditable) ? !1 : this.contentDOM === n.target && n.type === "attributes" ? !0 : !this.contentDOM.contains(n.target);
  }
  /**
   * Update the attributes of the prosemirror node.
   */
  updateAttributes(n) {
    this.editor.commands.command(({ tr: e }) => {
      const t = this.getPos();
      return typeof t != "number" ? !1 : (e.setNodeMarkup(t, void 0, {
        ...this.node.attrs,
        ...n
      }), !0);
    });
  }
  /**
   * Delete the node.
   */
  deleteNode() {
    const n = this.getPos();
    if (typeof n != "number")
      return;
    const e = n + this.node.nodeSize;
    this.editor.commands.deleteRange({ from: n, to: e });
  }
};
function Cn(n) {
  return new tb({
    find: n.find,
    handler: ({ state: e, range: t, match: r, pasteEvent: s }) => {
      const i = oe(n.getAttributes, void 0, r, s);
      if (i === !1 || i === null)
        return null;
      const { tr: o } = e, l = r[r.length - 1], a = r[0];
      let c = t.to;
      if (l) {
        const u = a.search(/\S/), d = t.from + a.indexOf(l), f = d + l.length;
        if (Dl(t.from, t.to, e.doc).filter((p) => p.mark.type.excluded.find((g) => g === n.type && g !== p.mark.type)).filter((p) => p.to > d).length)
          return null;
        f < t.to && o.delete(f, t.to), d > t.from && o.delete(t.from + u, d), c = t.from + u + l.length, o.addMark(t.from + u, c, n.type.create(i || {})), o.removeStoredMark(n.type);
      }
    }
  });
}
const { getOwnPropertyNames: Sb, getOwnPropertySymbols: wb } = Object, { hasOwnProperty: Cb } = Object.prototype;
function yc(n, e) {
  return function(r, s, i) {
    return n(r, s, i) && e(r, s, i);
  };
}
function Jr(n) {
  return function(t, r, s) {
    if (!t || !r || typeof t != "object" || typeof r != "object")
      return n(t, r, s);
    const { cache: i } = s, o = i.get(t), l = i.get(r);
    if (o && l)
      return o === r && l === t;
    i.set(t, r), i.set(r, t);
    const a = n(t, r, s);
    return i.delete(t), i.delete(r), a;
  };
}
function Eb(n) {
  return n != null ? n[Symbol.toStringTag] : void 0;
}
function bc(n) {
  return Sb(n).concat(wb(n));
}
const Mb = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  Object.hasOwn || ((n, e) => Cb.call(n, e))
);
function An(n, e) {
  return n === e || !n && !e && n !== n && e !== e;
}
const Tb = "__v", Ab = "__o", Nb = "_owner", { getOwnPropertyDescriptor: xc, keys: kc } = Object;
function Ob(n, e, t) {
  let r = n.length;
  if (e.length !== r)
    return !1;
  for (; r-- > 0; )
    if (!t.equals(n[r], e[r], r, r, n, e, t))
      return !1;
  return !0;
}
function Rb(n, e) {
  return An(n.getTime(), e.getTime());
}
function Db(n, e) {
  return n.name === e.name && n.message === e.message && n.cause === e.cause && n.stack === e.stack;
}
function Ib(n, e) {
  return n === e;
}
function vc(n, e, t) {
  const r = n.size;
  if (r !== e.size)
    return !1;
  if (!r)
    return !0;
  const s = new Array(r), i = n.entries();
  let o, l, a = 0;
  for (; (o = i.next()) && !o.done; ) {
    const c = e.entries();
    let u = !1, d = 0;
    for (; (l = c.next()) && !l.done; ) {
      if (s[d]) {
        d++;
        continue;
      }
      const f = o.value, h = l.value;
      if (t.equals(f[0], h[0], a, d, n, e, t) && t.equals(f[1], h[1], f[0], h[0], n, e, t)) {
        u = s[d] = !0;
        break;
      }
      d++;
    }
    if (!u)
      return !1;
    a++;
  }
  return !0;
}
const Lb = An;
function Pb(n, e, t) {
  const r = kc(n);
  let s = r.length;
  if (kc(e).length !== s)
    return !1;
  for (; s-- > 0; )
    if (!Af(n, e, t, r[s]))
      return !1;
  return !0;
}
function sr(n, e, t) {
  const r = bc(n);
  let s = r.length;
  if (bc(e).length !== s)
    return !1;
  let i, o, l;
  for (; s-- > 0; )
    if (i = r[s], !Af(n, e, t, i) || (o = xc(n, i), l = xc(e, i), (o || l) && (!o || !l || o.configurable !== l.configurable || o.enumerable !== l.enumerable || o.writable !== l.writable)))
      return !1;
  return !0;
}
function _b(n, e) {
  return An(n.valueOf(), e.valueOf());
}
function Bb(n, e) {
  return n.source === e.source && n.flags === e.flags;
}
function Sc(n, e, t) {
  const r = n.size;
  if (r !== e.size)
    return !1;
  if (!r)
    return !0;
  const s = new Array(r), i = n.values();
  let o, l;
  for (; (o = i.next()) && !o.done; ) {
    const a = e.values();
    let c = !1, u = 0;
    for (; (l = a.next()) && !l.done; ) {
      if (!s[u] && t.equals(o.value, l.value, o.value, l.value, n, e, t)) {
        c = s[u] = !0;
        break;
      }
      u++;
    }
    if (!c)
      return !1;
  }
  return !0;
}
function Fb(n, e) {
  let t = n.length;
  if (e.length !== t)
    return !1;
  for (; t-- > 0; )
    if (n[t] !== e[t])
      return !1;
  return !0;
}
function Vb(n, e) {
  return n.hostname === e.hostname && n.pathname === e.pathname && n.protocol === e.protocol && n.port === e.port && n.hash === e.hash && n.username === e.username && n.password === e.password;
}
function Af(n, e, t, r) {
  return (r === Nb || r === Ab || r === Tb) && (n.$$typeof || e.$$typeof) ? !0 : Mb(e, r) && t.equals(n[r], e[r], r, r, n, e, t);
}
const zb = "[object Arguments]", jb = "[object Boolean]", $b = "[object Date]", Hb = "[object Error]", Ub = "[object Map]", Wb = "[object Number]", qb = "[object Object]", Kb = "[object RegExp]", Jb = "[object Set]", Gb = "[object String]", Yb = "[object URL]", { isArray: Xb } = Array, wc = (
  // eslint-disable-next-line @typescript-eslint/unbound-method
  typeof ArrayBuffer < "u" && typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView : null
), { assign: Cc } = Object, Qb = Object.prototype.toString.call.bind(Object.prototype.toString);
function Zb({ areArraysEqual: n, areDatesEqual: e, areErrorsEqual: t, areFunctionsEqual: r, areMapsEqual: s, areNumbersEqual: i, areObjectsEqual: o, arePrimitiveWrappersEqual: l, areRegExpsEqual: a, areSetsEqual: c, areTypedArraysEqual: u, areUrlsEqual: d, unknownTagComparators: f }) {
  return function(p, m, g) {
    if (p === m)
      return !0;
    if (p == null || m == null)
      return !1;
    const y = typeof p;
    if (y !== typeof m)
      return !1;
    if (y !== "object")
      return y === "number" ? i(p, m, g) : y === "function" ? r(p, m, g) : !1;
    const k = p.constructor;
    if (k !== m.constructor)
      return !1;
    if (k === Object)
      return o(p, m, g);
    if (Xb(p))
      return n(p, m, g);
    if (wc != null && wc(p))
      return u(p, m, g);
    if (k === Date)
      return e(p, m, g);
    if (k === RegExp)
      return a(p, m, g);
    if (k === Map)
      return s(p, m, g);
    if (k === Set)
      return c(p, m, g);
    const C = Qb(p);
    if (C === $b)
      return e(p, m, g);
    if (C === Kb)
      return a(p, m, g);
    if (C === Ub)
      return s(p, m, g);
    if (C === Jb)
      return c(p, m, g);
    if (C === qb)
      return typeof p.then != "function" && typeof m.then != "function" && o(p, m, g);
    if (C === Yb)
      return d(p, m, g);
    if (C === Hb)
      return t(p, m, g);
    if (C === zb)
      return o(p, m, g);
    if (C === jb || C === Wb || C === Gb)
      return l(p, m, g);
    if (f) {
      let v = f[C];
      if (!v) {
        const x = Eb(p);
        x && (v = f[x]);
      }
      if (v)
        return v(p, m, g);
    }
    return !1;
  };
}
function ex({ circular: n, createCustomConfig: e, strict: t }) {
  let r = {
    areArraysEqual: t ? sr : Ob,
    areDatesEqual: Rb,
    areErrorsEqual: Db,
    areFunctionsEqual: Ib,
    areMapsEqual: t ? yc(vc, sr) : vc,
    areNumbersEqual: Lb,
    areObjectsEqual: t ? sr : Pb,
    arePrimitiveWrappersEqual: _b,
    areRegExpsEqual: Bb,
    areSetsEqual: t ? yc(Sc, sr) : Sc,
    areTypedArraysEqual: t ? sr : Fb,
    areUrlsEqual: Vb,
    unknownTagComparators: void 0
  };
  if (e && (r = Cc({}, r, e(r))), n) {
    const s = Jr(r.areArraysEqual), i = Jr(r.areMapsEqual), o = Jr(r.areObjectsEqual), l = Jr(r.areSetsEqual);
    r = Cc({}, r, {
      areArraysEqual: s,
      areMapsEqual: i,
      areObjectsEqual: o,
      areSetsEqual: l
    });
  }
  return r;
}
function tx(n) {
  return function(e, t, r, s, i, o, l) {
    return n(e, t, l);
  };
}
function nx({ circular: n, comparator: e, createState: t, equals: r, strict: s }) {
  if (t)
    return function(l, a) {
      const { cache: c = n ? /* @__PURE__ */ new WeakMap() : void 0, meta: u } = t();
      return e(l, a, {
        cache: c,
        equals: r,
        meta: u,
        strict: s
      });
    };
  if (n)
    return function(l, a) {
      return e(l, a, {
        cache: /* @__PURE__ */ new WeakMap(),
        equals: r,
        meta: void 0,
        strict: s
      });
    };
  const i = {
    cache: void 0,
    equals: r,
    meta: void 0,
    strict: s
  };
  return function(l, a) {
    return e(l, a, i);
  };
}
const rx = sn();
sn({ strict: !0 });
sn({ circular: !0 });
sn({
  circular: !0,
  strict: !0
});
sn({
  createInternalComparator: () => An
});
sn({
  strict: !0,
  createInternalComparator: () => An
});
sn({
  circular: !0,
  createInternalComparator: () => An
});
sn({
  circular: !0,
  createInternalComparator: () => An,
  strict: !0
});
function sn(n = {}) {
  const { circular: e = !1, createInternalComparator: t, createState: r, strict: s = !1 } = n, i = ex(n), o = Zb(i), l = t ? t(o) : tx(o);
  return nx({ circular: e, comparator: o, createState: r, equals: l, strict: s });
}
var zo = { exports: {} }, Gi = {};
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ec;
function sx() {
  if (Ec) return Gi;
  Ec = 1;
  var n = B, e = ti;
  function t(c, u) {
    return c === u && (c !== 0 || 1 / c === 1 / u) || c !== c && u !== u;
  }
  var r = typeof Object.is == "function" ? Object.is : t, s = e.useSyncExternalStore, i = n.useRef, o = n.useEffect, l = n.useMemo, a = n.useDebugValue;
  return Gi.useSyncExternalStoreWithSelector = function(c, u, d, f, h) {
    var p = i(null);
    if (p.current === null) {
      var m = { hasValue: !1, value: null };
      p.current = m;
    } else m = p.current;
    p = l(
      function() {
        function y(E) {
          if (!k) {
            if (k = !0, C = E, E = f(E), h !== void 0 && m.hasValue) {
              var M = m.value;
              if (h(M, E))
                return v = M;
            }
            return v = E;
          }
          if (M = v, r(C, E)) return M;
          var D = f(E);
          return h !== void 0 && h(M, D) ? (C = E, M) : (C = E, v = D);
        }
        var k = !1, C, v, x = d === void 0 ? null : d;
        return [
          function() {
            return y(u());
          },
          x === null ? void 0 : function() {
            return y(x());
          }
        ];
      },
      [u, d, f, h]
    );
    var g = s(c, p[0], p[1]);
    return o(
      function() {
        m.hasValue = !0, m.value = g;
      },
      [g]
    ), a(g), g;
  }, Gi;
}
var Yi = {};
/**
 * @license React
 * use-sync-external-store-shim/with-selector.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Mc;
function ix() {
  return Mc || (Mc = 1, process.env.NODE_ENV !== "production" && function() {
    function n(c, u) {
      return c === u && (c !== 0 || 1 / c === 1 / u) || c !== c && u !== u;
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var e = B, t = ti, r = typeof Object.is == "function" ? Object.is : n, s = t.useSyncExternalStore, i = e.useRef, o = e.useEffect, l = e.useMemo, a = e.useDebugValue;
    Yi.useSyncExternalStoreWithSelector = function(c, u, d, f, h) {
      var p = i(null);
      if (p.current === null) {
        var m = { hasValue: !1, value: null };
        p.current = m;
      } else m = p.current;
      p = l(
        function() {
          function y(E) {
            if (!k) {
              if (k = !0, C = E, E = f(E), h !== void 0 && m.hasValue) {
                var M = m.value;
                if (h(M, E))
                  return v = M;
              }
              return v = E;
            }
            if (M = v, r(C, E))
              return M;
            var D = f(E);
            return h !== void 0 && h(M, D) ? (C = E, M) : (C = E, v = D);
          }
          var k = !1, C, v, x = d === void 0 ? null : d;
          return [
            function() {
              return y(u());
            },
            x === null ? void 0 : function() {
              return y(x());
            }
          ];
        },
        [u, d, f, h]
      );
      var g = s(c, p[0], p[1]);
      return o(
        function() {
          m.hasValue = !0, m.value = g;
        },
        [g]
      ), a(g), g;
    }, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  }()), Yi;
}
process.env.NODE_ENV === "production" ? zo.exports = sx() : zo.exports = ix();
var Nf = zo.exports;
const Hk = /* @__PURE__ */ Oh(Nf);
var ox = (...n) => (e) => {
  n.forEach((t) => {
    typeof t == "function" ? t(e) : t && (t.current = e);
  });
}, lx = ({ contentComponent: n }) => {
  const e = ti.useSyncExternalStore(
    n.subscribe,
    n.getSnapshot,
    n.getServerSnapshot
  );
  return /* @__PURE__ */ S.jsx(S.Fragment, { children: Object.values(e) });
};
function ax() {
  const n = /* @__PURE__ */ new Set();
  let e = {};
  return {
    /**
     * Subscribe to the editor instance's changes.
     */
    subscribe(t) {
      return n.add(t), () => {
        n.delete(t);
      };
    },
    getSnapshot() {
      return e;
    },
    getServerSnapshot() {
      return e;
    },
    /**
     * Adds a new NodeView Renderer to the editor.
     */
    setRenderer(t, r) {
      e = {
        ...e,
        [t]: Ah.createPortal(r.reactElement, r.element, t)
      }, n.forEach((s) => s());
    },
    /**
     * Removes a NodeView Renderer from the editor.
     */
    removeRenderer(t) {
      const r = { ...e };
      delete r[t], e = r, n.forEach((s) => s());
    }
  };
}
var cx = class extends B.Component {
  constructor(n) {
    var e;
    super(n), this.editorContentRef = B.createRef(), this.initialized = !1, this.state = {
      hasContentComponentInitialized: !!((e = n.editor) != null && e.contentComponent)
    };
  }
  componentDidMount() {
    this.init();
  }
  componentDidUpdate() {
    this.init();
  }
  init() {
    var n;
    const e = this.props.editor;
    if (e && !e.isDestroyed && ((n = e.view.dom) != null && n.parentNode)) {
      if (e.contentComponent)
        return;
      const t = this.editorContentRef.current;
      t.append(...e.view.dom.parentNode.childNodes), e.setOptions({
        element: t
      }), e.contentComponent = ax(), this.state.hasContentComponentInitialized || (this.unsubscribeToContentComponent = e.contentComponent.subscribe(() => {
        this.setState((r) => r.hasContentComponentInitialized ? r : {
          hasContentComponentInitialized: !0
        }), this.unsubscribeToContentComponent && this.unsubscribeToContentComponent();
      })), e.createNodeViews(), this.initialized = !0;
    }
  }
  componentWillUnmount() {
    var n;
    const e = this.props.editor;
    if (e) {
      this.initialized = !1, e.isDestroyed || e.view.setProps({
        nodeViews: {}
      }), this.unsubscribeToContentComponent && this.unsubscribeToContentComponent(), e.contentComponent = null;
      try {
        if (!((n = e.view.dom) != null && n.parentNode))
          return;
        const t = document.createElement("div");
        t.append(...e.view.dom.parentNode.childNodes), e.setOptions({
          element: t
        });
      } catch {
      }
    }
  }
  render() {
    const { editor: n, innerRef: e, ...t } = this.props;
    return /* @__PURE__ */ S.jsxs(S.Fragment, { children: [
      /* @__PURE__ */ S.jsx("div", { ref: ox(e, this.editorContentRef), ...t }),
      (n == null ? void 0 : n.contentComponent) && /* @__PURE__ */ S.jsx(lx, { contentComponent: n.contentComponent })
    ] });
  }
}, ux = vh(
  (n, e) => {
    const t = B.useMemo(() => Math.floor(Math.random() * 4294967295).toString(), [n.editor]);
    return B.createElement(cx, {
      key: t,
      innerRef: e,
      ...n
    });
  }
), dx = B.memo(ux), fx = typeof window < "u" ? kh : Zc, hx = class {
  constructor(n) {
    this.transactionNumber = 0, this.lastTransactionNumber = 0, this.subscribers = /* @__PURE__ */ new Set(), this.editor = n, this.lastSnapshot = { editor: n, transactionNumber: 0 }, this.getSnapshot = this.getSnapshot.bind(this), this.getServerSnapshot = this.getServerSnapshot.bind(this), this.watch = this.watch.bind(this), this.subscribe = this.subscribe.bind(this);
  }
  /**
   * Get the current editor instance.
   */
  getSnapshot() {
    return this.transactionNumber === this.lastTransactionNumber ? this.lastSnapshot : (this.lastTransactionNumber = this.transactionNumber, this.lastSnapshot = { editor: this.editor, transactionNumber: this.transactionNumber }, this.lastSnapshot);
  }
  /**
   * Always disable the editor on the server-side.
   */
  getServerSnapshot() {
    return { editor: null, transactionNumber: 0 };
  }
  /**
   * Subscribe to the editor instance's changes.
   */
  subscribe(n) {
    return this.subscribers.add(n), () => {
      this.subscribers.delete(n);
    };
  }
  /**
   * Watch the editor instance for changes.
   */
  watch(n) {
    if (this.editor = n, this.editor) {
      const e = () => {
        this.transactionNumber += 1, this.subscribers.forEach((r) => r());
      }, t = this.editor;
      return t.on("transaction", e), () => {
        t.off("transaction", e);
      };
    }
  }
};
function px(n) {
  var e;
  const [t] = dr(() => new hx(n.editor)), r = Nf.useSyncExternalStoreWithSelector(
    t.subscribe,
    t.getSnapshot,
    t.getServerSnapshot,
    n.selector,
    (e = n.equalityFn) != null ? e : rx
  );
  return fx(() => t.watch(n.editor), [n.editor, t]), eu(r), r;
}
var Tc = process.env.NODE_ENV !== "production", jo = typeof window > "u", mx = jo || !!(typeof window < "u" && window.next), gx = class Of {
  constructor(e) {
    this.editor = null, this.subscriptions = /* @__PURE__ */ new Set(), this.isComponentMounted = !1, this.previousDeps = null, this.instanceId = "", this.options = e, this.subscriptions = /* @__PURE__ */ new Set(), this.setEditor(this.getInitialEditor()), this.scheduleDestroy(), this.getEditor = this.getEditor.bind(this), this.getServerSnapshot = this.getServerSnapshot.bind(this), this.subscribe = this.subscribe.bind(this), this.refreshEditorInstance = this.refreshEditorInstance.bind(this), this.scheduleDestroy = this.scheduleDestroy.bind(this), this.onRender = this.onRender.bind(this), this.createEditor = this.createEditor.bind(this);
  }
  setEditor(e) {
    this.editor = e, this.instanceId = Math.random().toString(36).slice(2, 9), this.subscriptions.forEach((t) => t());
  }
  getInitialEditor() {
    if (this.options.current.immediatelyRender === void 0) {
      if (jo || mx) {
        if (Tc)
          throw new Error(
            "Tiptap Error: SSR has been detected, please set `immediatelyRender` explicitly to `false` to avoid hydration mismatches."
          );
        return null;
      }
      return this.createEditor();
    }
    if (this.options.current.immediatelyRender && jo && Tc)
      throw new Error(
        "Tiptap Error: SSR has been detected, and `immediatelyRender` has been set to `true` this is an unsupported configuration that may result in errors, explicitly set `immediatelyRender` to `false` to avoid hydration mismatches."
      );
    return this.options.current.immediatelyRender ? this.createEditor() : null;
  }
  /**
   * Create a new editor instance. And attach event listeners.
   */
  createEditor() {
    const e = {
      ...this.options.current,
      // Always call the most recent version of the callback function by default
      onBeforeCreate: (...r) => {
        var s, i;
        return (i = (s = this.options.current).onBeforeCreate) == null ? void 0 : i.call(s, ...r);
      },
      onBlur: (...r) => {
        var s, i;
        return (i = (s = this.options.current).onBlur) == null ? void 0 : i.call(s, ...r);
      },
      onCreate: (...r) => {
        var s, i;
        return (i = (s = this.options.current).onCreate) == null ? void 0 : i.call(s, ...r);
      },
      onDestroy: (...r) => {
        var s, i;
        return (i = (s = this.options.current).onDestroy) == null ? void 0 : i.call(s, ...r);
      },
      onFocus: (...r) => {
        var s, i;
        return (i = (s = this.options.current).onFocus) == null ? void 0 : i.call(s, ...r);
      },
      onSelectionUpdate: (...r) => {
        var s, i;
        return (i = (s = this.options.current).onSelectionUpdate) == null ? void 0 : i.call(s, ...r);
      },
      onTransaction: (...r) => {
        var s, i;
        return (i = (s = this.options.current).onTransaction) == null ? void 0 : i.call(s, ...r);
      },
      onUpdate: (...r) => {
        var s, i;
        return (i = (s = this.options.current).onUpdate) == null ? void 0 : i.call(s, ...r);
      },
      onContentError: (...r) => {
        var s, i;
        return (i = (s = this.options.current).onContentError) == null ? void 0 : i.call(s, ...r);
      },
      onDrop: (...r) => {
        var s, i;
        return (i = (s = this.options.current).onDrop) == null ? void 0 : i.call(s, ...r);
      },
      onPaste: (...r) => {
        var s, i;
        return (i = (s = this.options.current).onPaste) == null ? void 0 : i.call(s, ...r);
      },
      onDelete: (...r) => {
        var s, i;
        return (i = (s = this.options.current).onDelete) == null ? void 0 : i.call(s, ...r);
      }
    };
    return new ub(e);
  }
  /**
   * Get the current editor instance.
   */
  getEditor() {
    return this.editor;
  }
  /**
   * Always disable the editor on the server-side.
   */
  getServerSnapshot() {
    return null;
  }
  /**
   * Subscribe to the editor instance's changes.
   */
  subscribe(e) {
    return this.subscriptions.add(e), () => {
      this.subscriptions.delete(e);
    };
  }
  static compareOptions(e, t) {
    return Object.keys(e).every((r) => [
      "onCreate",
      "onBeforeCreate",
      "onDestroy",
      "onUpdate",
      "onTransaction",
      "onFocus",
      "onBlur",
      "onSelectionUpdate",
      "onContentError",
      "onDrop",
      "onPaste"
    ].includes(r) ? !0 : r === "extensions" && e.extensions && t.extensions ? e.extensions.length !== t.extensions.length ? !1 : e.extensions.every((s, i) => {
      var o;
      return s === ((o = t.extensions) == null ? void 0 : o[i]);
    }) : e[r] === t[r]);
  }
  /**
   * On each render, we will create, update, or destroy the editor instance.
   * @param deps The dependencies to watch for changes
   * @returns A cleanup function
   */
  onRender(e) {
    return () => (this.isComponentMounted = !0, clearTimeout(this.scheduledDestructionTimeout), this.editor && !this.editor.isDestroyed && e.length === 0 ? Of.compareOptions(this.options.current, this.editor.options) || this.editor.setOptions({
      ...this.options.current,
      editable: this.editor.isEditable
    }) : this.refreshEditorInstance(e), () => {
      this.isComponentMounted = !1, this.scheduleDestroy();
    });
  }
  /**
   * Recreate the editor instance if the dependencies have changed.
   */
  refreshEditorInstance(e) {
    if (this.editor && !this.editor.isDestroyed) {
      if (this.previousDeps === null) {
        this.previousDeps = e;
        return;
      }
      if (this.previousDeps.length === e.length && this.previousDeps.every((r, s) => r === e[s]))
        return;
    }
    this.editor && !this.editor.isDestroyed && this.editor.destroy(), this.setEditor(this.createEditor()), this.previousDeps = e;
  }
  /**
   * Schedule the destruction of the editor instance.
   * This will only destroy the editor if it was not mounted on the next tick.
   * This is to avoid destroying the editor instance when it's actually still mounted.
   */
  scheduleDestroy() {
    const e = this.instanceId, t = this.editor;
    this.scheduledDestructionTimeout = setTimeout(() => {
      if (this.isComponentMounted && this.instanceId === e) {
        t && t.setOptions(this.options.current);
        return;
      }
      t && !t.isDestroyed && (t.destroy(), this.instanceId === e && this.setEditor(null));
    }, 1);
  }
};
function yx(n = {}, e = []) {
  const t = tu(n);
  t.current = n;
  const [r] = dr(() => new gx(t)), s = ti.useSyncExternalStore(
    r.subscribe,
    r.getEditor,
    r.getServerSnapshot
  );
  return eu(s), Zc(r.onRender(e)), px({
    editor: s,
    selector: ({ transactionNumber: i }) => n.shouldRerenderOnTransaction === !1 || n.shouldRerenderOnTransaction === void 0 ? null : n.immediatelyRender && i === 0 ? 0 : i + 1
  }), s;
}
var Rf = Xc({
  editor: null
});
Rf.Consumer;
var Uk = () => Qc(Rf), Df = Xc({
  onDragStart: () => {
  },
  nodeViewContentChildren: void 0,
  nodeViewContentRef: () => {
  }
}), bx = () => Qc(Df), Wk = B.forwardRef((n, e) => {
  const { onDragStart: t } = bx(), r = n.as || "div";
  return (
    // @ts-ignore
    /* @__PURE__ */ S.jsx(
      r,
      {
        ...n,
        ref: e,
        "data-node-view-wrapper": "",
        onDragStart: t,
        style: {
          whiteSpace: "normal",
          ...n.style
        }
      }
    )
  );
});
function Ac(n) {
  return !!(typeof n == "function" && n.prototype && n.prototype.isReactComponent);
}
function Nc(n) {
  return !!(typeof n == "object" && n.$$typeof && (n.$$typeof.toString() === "Symbol(react.forward_ref)" || n.$$typeof.description === "react.forward_ref"));
}
function xx(n) {
  return !!(typeof n == "object" && n.$$typeof && (n.$$typeof.toString() === "Symbol(react.memo)" || n.$$typeof.description === "react.memo"));
}
function kx(n) {
  if (Ac(n) || Nc(n))
    return !0;
  if (xx(n)) {
    const e = n.type;
    if (e)
      return Ac(e) || Nc(e);
  }
  return !1;
}
function vx() {
  try {
    if (Ql)
      return parseInt(Ql.split(".")[0], 10) >= 19;
  } catch {
  }
  return !1;
}
var Sx = class {
  /**
   * Immediately creates element and renders the provided React component.
   */
  constructor(n, { editor: e, props: t = {}, as: r = "div", className: s = "" }) {
    this.ref = null, this.id = Math.floor(Math.random() * 4294967295).toString(), this.component = n, this.editor = e, this.props = t, this.element = document.createElement(r), this.element.classList.add("react-renderer"), s && this.element.classList.add(...s.split(" ")), this.editor.isInitialized ? Nh(() => {
      this.render();
    }) : queueMicrotask(() => {
      this.render();
    });
  }
  /**
   * Render the React component.
   */
  render() {
    var n;
    const e = this.component, t = this.props, r = this.editor, s = vx(), i = kx(e), o = { ...t };
    o.ref && !(s || i) && delete o.ref, !o.ref && (s || i) && (o.ref = (l) => {
      this.ref = l;
    }), this.reactElement = /* @__PURE__ */ S.jsx(e, { ...o }), (n = r == null ? void 0 : r.contentComponent) == null || n.setRenderer(this.id, this);
  }
  /**
   * Re-renders the React component with new props.
   */
  updateProps(n = {}) {
    this.props = {
      ...this.props,
      ...n
    }, this.render();
  }
  /**
   * Destroy the React component.
   */
  destroy() {
    var n;
    const e = this.editor;
    (n = e == null ? void 0 : e.contentComponent) == null || n.removeRenderer(this.id);
    try {
      this.element && this.element.parentNode && this.element.parentNode.removeChild(this.element);
    } catch {
    }
  }
  /**
   * Update the attributes of the element that holds the React component.
   */
  updateAttributes(n) {
    Object.keys(n).forEach((e) => {
      this.element.setAttribute(e, n[e]);
    });
  }
};
B.createContext({
  markViewContentRef: () => {
  }
});
var wx = class extends vb {
  constructor(n, e, t) {
    if (super(n, e, t), this.selectionRafId = null, !this.node.isLeaf) {
      this.options.contentDOMElementTag ? this.contentDOMElement = document.createElement(this.options.contentDOMElementTag) : this.contentDOMElement = document.createElement(this.node.isInline ? "span" : "div"), this.contentDOMElement.dataset.nodeViewContentReact = "", this.contentDOMElement.dataset.nodeViewWrapper = "", this.contentDOMElement.style.whiteSpace = "inherit";
      const r = this.dom.querySelector("[data-node-view-content]");
      if (!r)
        return;
      r.appendChild(this.contentDOMElement);
    }
  }
  /**
   * Setup the React component.
   * Called on initialization.
   */
  mount() {
    const n = {
      editor: this.editor,
      node: this.node,
      decorations: this.decorations,
      innerDecorations: this.innerDecorations,
      view: this.view,
      selected: !1,
      extension: this.extension,
      HTMLAttributes: this.HTMLAttributes,
      getPos: () => this.getPos(),
      updateAttributes: (a = {}) => this.updateAttributes(a),
      deleteNode: () => this.deleteNode(),
      ref: yh()
    };
    if (!this.component.displayName) {
      const a = (c) => c.charAt(0).toUpperCase() + c.substring(1);
      this.component.displayName = a(this.extension.name);
    }
    const r = { onDragStart: this.onDragStart.bind(this), nodeViewContentRef: (a) => {
      a && this.contentDOMElement && a.firstChild !== this.contentDOMElement && (a.hasAttribute("data-node-view-wrapper") && a.removeAttribute("data-node-view-wrapper"), a.appendChild(this.contentDOMElement));
    } }, s = this.component, i = bh((a) => /* @__PURE__ */ S.jsx(Df.Provider, { value: r, children: xh(s, a) }));
    i.displayName = "ReactNodeView";
    let o = this.node.isInline ? "span" : "div";
    this.options.as && (o = this.options.as);
    const { className: l = "" } = this.options;
    this.handleSelectionUpdate = this.handleSelectionUpdate.bind(this), this.renderer = new Sx(i, {
      editor: this.editor,
      props: n,
      as: o,
      className: `node-${this.node.type.name} ${l}`.trim()
    }), this.editor.on("selectionUpdate", this.handleSelectionUpdate), this.updateElementAttributes();
  }
  /**
   * Return the DOM element.
   * This is the element that will be used to display the node view.
   */
  get dom() {
    var n;
    if (this.renderer.element.firstElementChild && !((n = this.renderer.element.firstElementChild) != null && n.hasAttribute("data-node-view-wrapper")))
      throw Error("Please use the NodeViewWrapper component for your node view.");
    return this.renderer.element;
  }
  /**
   * Return the content DOM element.
   * This is the element that will be used to display the rich-text content of the node.
   */
  get contentDOM() {
    return this.node.isLeaf ? null : this.contentDOMElement;
  }
  /**
   * On editor selection update, check if the node is selected.
   * If it is, call `selectNode`, otherwise call `deselectNode`.
   */
  handleSelectionUpdate() {
    this.selectionRafId && (cancelAnimationFrame(this.selectionRafId), this.selectionRafId = null), this.selectionRafId = requestAnimationFrame(() => {
      this.selectionRafId = null;
      const { from: n, to: e } = this.editor.state.selection, t = this.getPos();
      if (typeof t == "number")
        if (n <= t && e >= t + this.node.nodeSize) {
          if (this.renderer.props.selected)
            return;
          this.selectNode();
        } else {
          if (!this.renderer.props.selected)
            return;
          this.deselectNode();
        }
    });
  }
  /**
   * On update, update the React component.
   * To prevent unnecessary updates, the `update` option can be used.
   */
  update(n, e, t) {
    const r = (s) => {
      this.renderer.updateProps(s), typeof this.options.attrs == "function" && this.updateElementAttributes();
    };
    if (n.type !== this.node.type)
      return !1;
    if (typeof this.options.update == "function") {
      const s = this.node, i = this.decorations, o = this.innerDecorations;
      return this.node = n, this.decorations = e, this.innerDecorations = t, this.options.update({
        oldNode: s,
        oldDecorations: i,
        newNode: n,
        newDecorations: e,
        oldInnerDecorations: o,
        innerDecorations: t,
        updateProps: () => r({ node: n, decorations: e, innerDecorations: t })
      });
    }
    return n === this.node && this.decorations === e && this.innerDecorations === t || (this.node = n, this.decorations = e, this.innerDecorations = t, r({ node: n, decorations: e, innerDecorations: t })), !0;
  }
  /**
   * Select the node.
   * Add the `selected` prop and the `ProseMirror-selectednode` class.
   */
  selectNode() {
    this.renderer.updateProps({
      selected: !0
    }), this.renderer.element.classList.add("ProseMirror-selectednode");
  }
  /**
   * Deselect the node.
   * Remove the `selected` prop and the `ProseMirror-selectednode` class.
   */
  deselectNode() {
    this.renderer.updateProps({
      selected: !1
    }), this.renderer.element.classList.remove("ProseMirror-selectednode");
  }
  /**
   * Destroy the React component instance.
   */
  destroy() {
    this.renderer.destroy(), this.editor.off("selectionUpdate", this.handleSelectionUpdate), this.contentDOMElement = null, this.selectionRafId && (cancelAnimationFrame(this.selectionRafId), this.selectionRafId = null);
  }
  /**
   * Update the attributes of the top-level element that holds the React component.
   * Applying the attributes defined in the `attrs` option.
   */
  updateElementAttributes() {
    if (this.options.attrs) {
      let n = {};
      if (typeof this.options.attrs == "function") {
        const e = this.editor.extensionManager.attributes, t = Rr(this.node, e);
        n = this.options.attrs({ node: this.node, HTMLAttributes: t });
      } else
        n = this.options.attrs;
      this.renderer.updateAttributes(n);
    }
  }
};
function qk(n, e) {
  return (t) => t.editor.contentComponent ? new wx(n, t, e) : {};
}
var vs = (n, e) => {
  if (n === "slot")
    return 0;
  if (n instanceof Function)
    return n(e);
  const { children: t, ...r } = e ?? {};
  if (n === "svg")
    throw new Error("SVG elements are not supported in the JSX syntax, use the array syntax instead");
  return [n, r, t];
}, Cx = /^\s*>\s$/, Ex = st.create({
  name: "blockquote",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  content: "block+",
  group: "block",
  defining: !0,
  parseHTML() {
    return [{ tag: "blockquote" }];
  },
  renderHTML({ HTMLAttributes: n }) {
    return /* @__PURE__ */ vs("blockquote", { ...Ne(this.options.HTMLAttributes, n), children: /* @__PURE__ */ vs("slot", {}) });
  },
  parseMarkdown: (n, e) => e.createNode("blockquote", void 0, e.parseChildren(n.tokens || [])),
  renderMarkdown: (n, e) => {
    if (!n.content)
      return "";
    const t = ">", r = [];
    return n.content.forEach((s) => {
      const l = e.renderChildren([s]).split(`
`).map((a) => a.trim() === "" ? t : `${t} ${a}`);
      r.push(l.join(`
`));
    }), r.join(`
${t}
`);
  },
  addCommands() {
    return {
      setBlockquote: () => ({ commands: n }) => n.wrapIn(this.name),
      toggleBlockquote: () => ({ commands: n }) => n.toggleWrap(this.name),
      unsetBlockquote: () => ({ commands: n }) => n.lift(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-b": () => this.editor.commands.toggleBlockquote()
    };
  },
  addInputRules() {
    return [
      Zn({
        find: Cx,
        type: this.type
      })
    ];
  }
}), Mx = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))$/, Tx = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))/g, Ax = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))$/, Nx = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))/g, Ox = Tn.create({
  name: "bold",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "strong"
      },
      {
        tag: "b",
        getAttrs: (n) => n.style.fontWeight !== "normal" && null
      },
      {
        style: "font-weight=400",
        clearMark: (n) => n.type.name === this.name
      },
      {
        style: "font-weight",
        getAttrs: (n) => /^(bold(er)?|[5-9]\d{2,})$/.test(n) && null
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return /* @__PURE__ */ vs("strong", { ...Ne(this.options.HTMLAttributes, n), children: /* @__PURE__ */ vs("slot", {}) });
  },
  markdownTokenName: "strong",
  parseMarkdown: (n, e) => e.applyMark("bold", e.parseInline(n.tokens || [])),
  renderMarkdown: (n, e) => `**${e.renderChildren(n)}**`,
  addCommands() {
    return {
      setBold: () => ({ commands: n }) => n.setMark(this.name),
      toggleBold: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetBold: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-b": () => this.editor.commands.toggleBold(),
      "Mod-B": () => this.editor.commands.toggleBold()
    };
  },
  addInputRules() {
    return [
      Qn({
        find: Mx,
        type: this.type
      }),
      Qn({
        find: Ax,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      Cn({
        find: Tx,
        type: this.type
      }),
      Cn({
        find: Nx,
        type: this.type
      })
    ];
  }
}), Rx = /(^|[^`])`([^`]+)`(?!`)$/, Dx = /(^|[^`])`([^`]+)`(?!`)/g, Ix = Tn.create({
  name: "code",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  excludes: "_",
  code: !0,
  exitable: !0,
  parseHTML() {
    return [{ tag: "code" }];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["code", Ne(this.options.HTMLAttributes, n), 0];
  },
  markdownTokenName: "codespan",
  parseMarkdown: (n, e) => e.applyMark("code", [{ type: "text", text: n.text || "" }]),
  renderMarkdown: (n, e) => n.content ? `\`${e.renderChildren(n.content)}\`` : "",
  addCommands() {
    return {
      setCode: () => ({ commands: n }) => n.setMark(this.name),
      toggleCode: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetCode: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-e": () => this.editor.commands.toggleCode()
    };
  },
  addInputRules() {
    return [
      Qn({
        find: Rx,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      Cn({
        find: Dx,
        type: this.type
      })
    ];
  }
}), Xi = 4, Lx = /^```([a-z]+)?[\s\n]$/, Px = /^~~~([a-z]+)?[\s\n]$/, _x = st.create({
  name: "codeBlock",
  addOptions() {
    return {
      languageClassPrefix: "language-",
      exitOnTripleEnter: !0,
      exitOnArrowDown: !0,
      defaultLanguage: null,
      enableTabIndentation: !1,
      tabSize: Xi,
      HTMLAttributes: {}
    };
  },
  content: "text*",
  marks: "",
  group: "block",
  code: !0,
  defining: !0,
  addAttributes() {
    return {
      language: {
        default: this.options.defaultLanguage,
        parseHTML: (n) => {
          var e;
          const { languageClassPrefix: t } = this.options;
          if (!t)
            return null;
          const i = [...((e = n.firstElementChild) == null ? void 0 : e.classList) || []].filter((o) => o.startsWith(t)).map((o) => o.replace(t, ""))[0];
          return i || null;
        },
        rendered: !1
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "pre",
        preserveWhitespace: "full"
      }
    ];
  },
  renderHTML({ node: n, HTMLAttributes: e }) {
    return [
      "pre",
      Ne(this.options.HTMLAttributes, e),
      [
        "code",
        {
          class: n.attrs.language ? this.options.languageClassPrefix + n.attrs.language : null
        },
        0
      ]
    ];
  },
  markdownTokenName: "code",
  parseMarkdown: (n, e) => {
    var t;
    return ((t = n.raw) == null ? void 0 : t.startsWith("```")) === !1 && n.codeBlockStyle !== "indented" ? [] : e.createNode(
      "codeBlock",
      { language: n.lang || null },
      n.text ? [e.createTextNode(n.text)] : []
    );
  },
  renderMarkdown: (n, e) => {
    var t;
    let r = "";
    const s = ((t = n.attrs) == null ? void 0 : t.language) || "";
    return n.content ? r = [`\`\`\`${s}`, e.renderChildren(n.content), "```"].join(`
`) : r = `\`\`\`${s}

\`\`\``, r;
  },
  addCommands() {
    return {
      setCodeBlock: (n) => ({ commands: e }) => e.setNode(this.name, n),
      toggleCodeBlock: (n) => ({ commands: e }) => e.toggleNode(this.name, "paragraph", n)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Alt-c": () => this.editor.commands.toggleCodeBlock(),
      // remove code block when at start of document or code block is empty
      Backspace: () => {
        const { empty: n, $anchor: e } = this.editor.state.selection, t = e.pos === 1;
        return !n || e.parent.type.name !== this.name ? !1 : t || !e.parent.textContent.length ? this.editor.commands.clearNodes() : !1;
      },
      // handle tab indentation
      Tab: ({ editor: n }) => {
        var e;
        if (!this.options.enableTabIndentation)
          return !1;
        const t = (e = this.options.tabSize) != null ? e : Xi, { state: r } = n, { selection: s } = r, { $from: i, empty: o } = s;
        if (i.parent.type !== this.type)
          return !1;
        const l = " ".repeat(t);
        return o ? n.commands.insertContent(l) : n.commands.command(({ tr: a }) => {
          const { from: c, to: u } = s, h = r.doc.textBetween(c, u, `
`, `
`).split(`
`).map((p) => l + p).join(`
`);
          return a.replaceWith(c, u, r.schema.text(h)), !0;
        });
      },
      // handle shift+tab reverse indentation
      "Shift-Tab": ({ editor: n }) => {
        var e;
        if (!this.options.enableTabIndentation)
          return !1;
        const t = (e = this.options.tabSize) != null ? e : Xi, { state: r } = n, { selection: s } = r, { $from: i, empty: o } = s;
        return i.parent.type !== this.type ? !1 : o ? n.commands.command(({ tr: l }) => {
          var a;
          const { pos: c } = i, u = i.start(), d = i.end(), h = r.doc.textBetween(u, d, `
`, `
`).split(`
`);
          let p = 0, m = 0;
          const g = c - u;
          for (let E = 0; E < h.length; E += 1) {
            if (m + h[E].length >= g) {
              p = E;
              break;
            }
            m += h[E].length + 1;
          }
          const k = ((a = h[p].match(/^ */)) == null ? void 0 : a[0]) || "", C = Math.min(k.length, t);
          if (C === 0)
            return !0;
          let v = u;
          for (let E = 0; E < p; E += 1)
            v += h[E].length + 1;
          return l.delete(v, v + C), c - v <= C && l.setSelection(q.create(l.doc, v)), !0;
        }) : n.commands.command(({ tr: l }) => {
          const { from: a, to: c } = s, f = r.doc.textBetween(a, c, `
`, `
`).split(`
`).map((h) => {
            var p;
            const m = ((p = h.match(/^ */)) == null ? void 0 : p[0]) || "", g = Math.min(m.length, t);
            return h.slice(g);
          }).join(`
`);
          return l.replaceWith(a, c, r.schema.text(f)), !0;
        });
      },
      // exit node on triple enter
      Enter: ({ editor: n }) => {
        if (!this.options.exitOnTripleEnter)
          return !1;
        const { state: e } = n, { selection: t } = e, { $from: r, empty: s } = t;
        if (!s || r.parent.type !== this.type)
          return !1;
        const i = r.parentOffset === r.parent.nodeSize - 2, o = r.parent.textContent.endsWith(`

`);
        return !i || !o ? !1 : n.chain().command(({ tr: l }) => (l.delete(r.pos - 2, r.pos), !0)).exitCode().run();
      },
      // exit node on arrow down
      ArrowDown: ({ editor: n }) => {
        if (!this.options.exitOnArrowDown)
          return !1;
        const { state: e } = n, { selection: t, doc: r } = e, { $from: s, empty: i } = t;
        if (!i || s.parent.type !== this.type || !(s.parentOffset === s.parent.nodeSize - 2))
          return !1;
        const l = s.after();
        return l === void 0 ? !1 : r.nodeAt(l) ? n.commands.command(({ tr: c }) => (c.setSelection(Y.near(r.resolve(l))), !0)) : n.commands.exitCode();
      }
    };
  },
  addInputRules() {
    return [
      Fo({
        find: Lx,
        type: this.type,
        getAttributes: (n) => ({
          language: n[1]
        })
      }),
      Fo({
        find: Px,
        type: this.type,
        getAttributes: (n) => ({
          language: n[1]
        })
      })
    ];
  },
  addProseMirrorPlugins() {
    return [
      // this plugin creates a code block for pasted content from VS Code
      // we can also detect the copied code language
      new ge({
        key: new Re("codeBlockVSCodeHandler"),
        props: {
          handlePaste: (n, e) => {
            if (!e.clipboardData || this.editor.isActive(this.type.name))
              return !1;
            const t = e.clipboardData.getData("text/plain"), r = e.clipboardData.getData("vscode-editor-data"), s = r ? JSON.parse(r) : void 0, i = s == null ? void 0 : s.mode;
            if (!t || !i)
              return !1;
            const { tr: o, schema: l } = n.state, a = l.text(t.replace(/\r\n?/g, `
`));
            return o.replaceSelectionWith(this.type.create({ language: i }, a)), o.selection.$from.parent.type !== this.type && o.setSelection(q.near(o.doc.resolve(Math.max(0, o.selection.from - 2)))), o.setMeta("paste", !0), n.dispatch(o), !0;
          }
        }
      })
    ];
  }
}), Bx = st.create({
  name: "doc",
  topNode: !0,
  content: "block+",
  renderMarkdown: (n, e) => n.content ? e.renderChildren(n.content, `

`) : ""
}), Fx = st.create({
  name: "hardBreak",
  markdownTokenName: "br",
  addOptions() {
    return {
      keepMarks: !0,
      HTMLAttributes: {}
    };
  },
  inline: !0,
  group: "inline",
  selectable: !1,
  linebreakReplacement: !0,
  parseHTML() {
    return [{ tag: "br" }];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["br", Ne(this.options.HTMLAttributes, n)];
  },
  renderText() {
    return `
`;
  },
  renderMarkdown: () => `  
`,
  parseMarkdown: () => ({
    type: "hardBreak"
  }),
  addCommands() {
    return {
      setHardBreak: () => ({ commands: n, chain: e, state: t, editor: r }) => n.first([
        () => n.exitCode(),
        () => n.command(() => {
          const { selection: s, storedMarks: i } = t;
          if (s.$from.parent.type.spec.isolating)
            return !1;
          const { keepMarks: o } = this.options, { splittableMarks: l } = r.extensionManager, a = i || s.$to.parentOffset && s.$from.marks();
          return e().insertContent({ type: this.name }).command(({ tr: c, dispatch: u }) => {
            if (u && a && o) {
              const d = a.filter((f) => l.includes(f.type.name));
              c.ensureMarks(d);
            }
            return !0;
          }).run();
        })
      ])
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Enter": () => this.editor.commands.setHardBreak(),
      "Shift-Enter": () => this.editor.commands.setHardBreak()
    };
  }
}), Vx = st.create({
  name: "heading",
  addOptions() {
    return {
      levels: [1, 2, 3, 4, 5, 6],
      HTMLAttributes: {}
    };
  },
  content: "inline*",
  group: "block",
  defining: !0,
  addAttributes() {
    return {
      level: {
        default: 1,
        rendered: !1
      }
    };
  },
  parseHTML() {
    return this.options.levels.map((n) => ({
      tag: `h${n}`,
      attrs: { level: n }
    }));
  },
  renderHTML({ node: n, HTMLAttributes: e }) {
    return [`h${this.options.levels.includes(n.attrs.level) ? n.attrs.level : this.options.levels[0]}`, Ne(this.options.HTMLAttributes, e), 0];
  },
  parseMarkdown: (n, e) => e.createNode("heading", { level: n.depth || 1 }, e.parseInline(n.tokens || [])),
  renderMarkdown: (n, e) => {
    var t;
    const r = (t = n.attrs) != null && t.level ? parseInt(n.attrs.level, 10) : 1, s = "#".repeat(r);
    return n.content ? `${s} ${e.renderChildren(n.content)}` : "";
  },
  addCommands() {
    return {
      setHeading: (n) => ({ commands: e }) => this.options.levels.includes(n.level) ? e.setNode(this.name, n) : !1,
      toggleHeading: (n) => ({ commands: e }) => this.options.levels.includes(n.level) ? e.toggleNode(this.name, "paragraph", n) : !1
    };
  },
  addKeyboardShortcuts() {
    return this.options.levels.reduce(
      (n, e) => ({
        ...n,
        [`Mod-Alt-${e}`]: () => this.editor.commands.toggleHeading({ level: e })
      }),
      {}
    );
  },
  addInputRules() {
    return this.options.levels.map((n) => Fo({
      find: new RegExp(`^(#{${Math.min(...this.options.levels)},${n}})\\s$`),
      type: this.type,
      getAttributes: {
        level: n
      }
    }));
  }
}), If = st.create({
  name: "horizontalRule",
  addOptions() {
    return {
      HTMLAttributes: {},
      nextNodeType: "paragraph"
    };
  },
  group: "block",
  parseHTML() {
    return [{ tag: "hr" }];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["hr", Ne(this.options.HTMLAttributes, n)];
  },
  markdownTokenName: "hr",
  parseMarkdown: (n, e) => e.createNode("horizontalRule"),
  renderMarkdown: () => "---",
  addCommands() {
    return {
      setHorizontalRule: () => ({ chain: n, state: e }) => {
        if (!hb(e, e.schema.nodes[this.name]))
          return !1;
        const { selection: t } = e, { $to: r } = t, s = n();
        return uf(t) ? s.insertContentAt(r.pos, {
          type: this.name
        }) : s.insertContent({ type: this.name }), s.command(({ state: i, tr: o, dispatch: l }) => {
          if (l) {
            const { $to: a } = o.selection, c = a.end();
            if (a.nodeAfter)
              a.nodeAfter.isTextblock ? o.setSelection(q.create(o.doc, a.pos + 1)) : a.nodeAfter.isBlock ? o.setSelection(j.create(o.doc, a.pos)) : o.setSelection(q.create(o.doc, a.pos));
            else {
              const u = i.schema.nodes[this.options.nextNodeType] || a.parent.type.contentMatch.defaultType, d = u == null ? void 0 : u.create();
              d && (o.insert(c, d), o.setSelection(q.create(o.doc, c + 1)));
            }
            o.scrollIntoView();
          }
          return !0;
        }).run();
      }
    };
  },
  addInputRules() {
    return [
      db({
        find: /^(?:---|—-|___\s|\*\*\*\s)$/,
        type: this.type
      })
    ];
  }
}), Kk = If, zx = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))$/, jx = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))/g, $x = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))$/, Hx = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))/g, Ux = Tn.create({
  name: "italic",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "em"
      },
      {
        tag: "i",
        getAttrs: (n) => n.style.fontStyle !== "normal" && null
      },
      {
        style: "font-style=normal",
        clearMark: (n) => n.type.name === this.name
      },
      {
        style: "font-style=italic"
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["em", Ne(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setItalic: () => ({ commands: n }) => n.setMark(this.name),
      toggleItalic: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetItalic: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  markdownTokenName: "em",
  parseMarkdown: (n, e) => e.applyMark("italic", e.parseInline(n.tokens || [])),
  renderMarkdown: (n, e) => `*${e.renderChildren(n)}*`,
  addKeyboardShortcuts() {
    return {
      "Mod-i": () => this.editor.commands.toggleItalic(),
      "Mod-I": () => this.editor.commands.toggleItalic()
    };
  },
  addInputRules() {
    return [
      Qn({
        find: zx,
        type: this.type
      }),
      Qn({
        find: $x,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      Cn({
        find: jx,
        type: this.type
      }),
      Cn({
        find: Hx,
        type: this.type
      })
    ];
  }
});
const Wx = "aaa1rp3bb0ott3vie4c1le2ogado5udhabi7c0ademy5centure6ountant0s9o1tor4d0s1ult4e0g1ro2tna4f0l1rica5g0akhan5ency5i0g1rbus3force5tel5kdn3l0ibaba4pay4lfinanz6state5y2sace3tom5m0azon4ericanexpress7family11x2fam3ica3sterdam8nalytics7droid5quan4z2o0l2partments8p0le4q0uarelle8r0ab1mco4chi3my2pa2t0e3s0da2ia2sociates9t0hleta5torney7u0ction5di0ble3o3spost5thor3o0s4w0s2x0a2z0ure5ba0by2idu3namex4d1k2r0celona5laycard4s5efoot5gains6seball5ketball8uhaus5yern5b0c1t1va3cg1n2d1e0ats2uty4er2rlin4st0buy5t2f1g1h0arti5i0ble3d1ke2ng0o3o1z2j1lack0friday9ockbuster8g1omberg7ue3m0s1w2n0pparibas9o0ats3ehringer8fa2m1nd2o0k0ing5sch2tik2on4t1utique6x2r0adesco6idgestone9oadway5ker3ther5ussels7s1t1uild0ers6siness6y1zz3v1w1y1z0h3ca0b1fe2l0l1vinklein9m0era3p2non3petown5ital0one8r0avan4ds2e0er0s4s2sa1e1h1ino4t0ering5holic7ba1n1re3c1d1enter4o1rn3f0a1d2g1h0anel2nel4rity4se2t2eap3intai5ristmas6ome4urch5i0priani6rcle4sco3tadel4i0c2y3k1l0aims4eaning6ick2nic1que6othing5ud3ub0med6m1n1o0ach3des3ffee4llege4ogne5m0mbank4unity6pany2re3uter5sec4ndos3struction8ulting7tact3ractors9oking4l1p2rsica5untry4pon0s4rses6pa2r0edit0card4union9icket5own3s1uise0s6u0isinella9v1w1x1y0mru3ou3z2dad1nce3ta1e1ing3sun4y2clk3ds2e0al0er2s3gree4livery5l1oitte5ta3mocrat6ntal2ist5si0gn4v2hl2iamonds6et2gital5rect0ory7scount3ver5h2y2j1k1m1np2o0cs1tor4g1mains5t1wnload7rive4tv2ubai3nlop4pont4rban5vag2r2z2earth3t2c0o2deka3u0cation8e1g1mail3erck5nergy4gineer0ing9terprises10pson4quipment8r0icsson6ni3s0q1tate5t1u0rovision8s2vents5xchange6pert3osed4ress5traspace10fage2il1rwinds6th3mily4n0s2rm0ers5shion4t3edex3edback6rrari3ero6i0delity5o2lm2nal1nce1ial7re0stone6mdale6sh0ing5t0ness6j1k1lickr3ghts4r2orist4wers5y2m1o0o0d1tball6rd1ex2sale4um3undation8x2r0ee1senius7l1ogans4ntier7tr2ujitsu5n0d2rniture7tbol5yi3ga0l0lery3o1up4me0s3p1rden4y2b0iz3d0n2e0a1nt0ing5orge5f1g0ee3h1i0ft0s3ves2ing5l0ass3e1obal2o4m0ail3bh2o1x2n1odaddy5ld0point6f2o0dyear5g0le4p1t1v2p1q1r0ainger5phics5tis4een3ipe3ocery4up4s1t1u0cci3ge2ide2tars5ru3w1y2hair2mburg5ngout5us3bo2dfc0bank7ealth0care8lp1sinki6re1mes5iphop4samitsu7tachi5v2k0t2m1n1ockey4ldings5iday5medepot5goods5s0ense7nda3rse3spital5t0ing5t0els3mail5use3w2r1sbc3t1u0ghes5yatt3undai7ibm2cbc2e1u2d1e0ee3fm2kano4l1m0amat4db2mo0bilien9n0c1dustries8finiti5o2g1k1stitute6urance4e4t0ernational10uit4vestments10o1piranga7q1r0ish4s0maili5t0anbul7t0au2v3jaguar4va3cb2e0ep2tzt3welry6io2ll2m0p2nj2o0bs1urg4t1y2p0morgan6rs3uegos4niper7kaufen5ddi3e0rryhotels6properties14fh2g1h1i0a1ds2m1ndle4tchen5wi3m1n1oeln3matsu5sher5p0mg2n2r0d1ed3uokgroup8w1y0oto4z2la0caixa5mborghini8er3nd0rover6xess5salle5t0ino3robe5w0yer5b1c1ds2ease3clerc5frak4gal2o2xus4gbt3i0dl2fe0insurance9style7ghting6ke2lly3mited4o2ncoln4k2ve1ing5k1lc1p2oan0s3cker3us3l1ndon4tte1o3ve3pl0financial11r1s1t0d0a3u0ndbeck6xe1ury5v1y2ma0drid4if1son4keup4n0agement7go3p1rket0ing3s4riott5shalls7ttel5ba2c0kinsey7d1e0d0ia3et2lbourne7me1orial6n0u2rckmsd7g1h1iami3crosoft7l1ni1t2t0subishi9k1l0b1s2m0a2n1o0bi0le4da2e1i1m1nash3ey2ster5rmon3tgage6scow4to0rcycles9v0ie4p1q1r1s0d2t0n1r2u0seum3ic4v1w1x1y1z2na0b1goya4me2vy3ba2c1e0c1t0bank4flix4work5ustar5w0s2xt0direct7us4f0l2g0o2hk2i0co2ke1on3nja3ssan1y5l1o0kia3rton4w0ruz3tv4p1r0a1w2tt2u1yc2z2obi1server7ffice5kinawa6layan0group9lo3m0ega4ne1g1l0ine5oo2pen3racle3nge4g0anic5igins6saka4tsuka4t2vh3pa0ge2nasonic7ris2s1tners4s1y3y2ccw3e0t2f0izer5g1h0armacy6d1ilips5one2to0graphy6s4ysio5ics1tet2ures6d1n0g1k2oneer5zza4k1l0ace2y0station9umbing5s3m1n0c2ohl2ker3litie5rn2st3r0axi3ess3ime3o0d0uctions8f1gressive8mo2perties3y5tection8u0dential9s1t1ub2w0c2y2qa1pon3uebec3st5racing4dio4e0ad1lestate6tor2y4cipes5d0stone5umbrella9hab3ise0n3t2liance6n0t0als5pair3ort3ublican8st0aurant8view0s5xroth6ich0ardli6oh3l1o1p2o0cks3deo3gers4om3s0vp3u0gby3hr2n2w0e2yukyu6sa0arland6fe0ty4kura4le1on3msclub4ung5ndvik0coromant12ofi4p1rl2s1ve2xo3b0i1s2c0b1haeffler7midt4olarships8ol3ule3warz5ience5ot3d1e0arch3t2cure1ity6ek2lect4ner3rvices6ven3w1x0y3fr2g1h0angrila6rp3ell3ia1ksha5oes2p0ping5uji3w3i0lk2na1gles5te3j1k0i0n2y0pe4l0ing4m0art3ile4n0cf3o0ccer3ial4ftbank4ware6hu2lar2utions7ng1y2y2pa0ce3ort2t3r0l2s1t0ada2ples4r1tebank4farm7c0group6ockholm6rage3e3ream4udio2y3yle4u0cks3pplies3y2ort5rf1gery5zuki5v1watch4iss4x1y0dney4stems6z2tab1ipei4lk2obao4rget4tamotors6r2too4x0i3c0i2d0k2eam2ch0nology8l1masek5nnis4va3f1g1h0d1eater2re6iaa2ckets5enda4ps2res2ol4j0maxx4x2k0maxx5l1m0all4n1o0day3kyo3ols3p1ray3shiba5tal3urs3wn2yota3s3r0ade1ing4ining5vel0ers0insurance16ust3v2t1ube2i1nes3shu4v0s2w1z2ua1bank3s2g1k1nicom3versity8o2ol2ps2s1y1z2va0cations7na1guard7c1e0gas3ntures6risign5mögensberater2ung14sicherung10t2g1i0ajes4deo3g1king4llas4n1p1rgin4sa1ion4va1o3laanderen9n1odka3lvo3te1ing3o2yage5u2wales2mart4ter4ng0gou5tch0es6eather0channel12bcam3er2site5d0ding5ibo2r3f1hoswho6ien2ki2lliamhill9n0dows4e1ners6me2olterskluwer11odside6rk0s2ld3w2s1tc1f3xbox3erox4ihuan4n2xx2yz3yachts4hoo3maxun5ndex5e1odobashi7ga2kohama6u0tube6t1un3za0ppos4ra3ero3ip2m1one3uerich6w2", qx = "ελ1υ2бг1ел3дети4ею2католик6ом3мкд2он1сква6онлайн5рг3рус2ф2сайт3рб3укр3қаз3հայ3ישראל5קום3ابوظبي5رامكو5لاردن4بحرين5جزائر5سعودية6عليان5مغرب5مارات5یران5بارت2زار4يتك3ھارت5تونس4سودان3رية5شبكة4عراق2ب2مان4فلسطين6قطر3كاثوليك6وم3مصر2ليسيا5وريتانيا7قع4همراه5پاکستان7ڀارت4कॉम3नेट3भारत0म्3ोत5संगठन5বাংলা5ভারত2ৰত4ਭਾਰਤ4ભારત4ଭାରତ4இந்தியா6லங்கை6சிங்கப்பூர்11భారత్5ಭಾರತ4ഭാരതം5ලංකා4คอม3ไทย3ລາວ3გე2みんな3アマゾン4クラウド4グーグル4コム2ストア3セール3ファッション6ポイント4世界2中信1国1國1文网3亚马逊3企业2佛山2信息2健康2八卦2公司1益2台湾1灣2商城1店1标2嘉里0大酒店5在线2大拿2天主教3娱乐2家電2广东2微博2慈善2我爱你3手机2招聘2政务1府2新加坡2闻2时尚2書籍2机构2淡马锡3游戏2澳門2点看2移动2组织机构4网址1店1站1络2联通2谷歌2购物2通販2集团2電訊盈科4飞利浦3食品2餐厅2香格里拉3港2닷넷1컴2삼성2한국2", $o = "numeric", Ho = "ascii", Uo = "alpha", gr = "asciinumeric", ur = "alphanumeric", Wo = "domain", Lf = "emoji", Kx = "scheme", Jx = "slashscheme", Qi = "whitespace";
function Gx(n, e) {
  return n in e || (e[n] = []), e[n];
}
function pn(n, e, t) {
  e[$o] && (e[gr] = !0, e[ur] = !0), e[Ho] && (e[gr] = !0, e[Uo] = !0), e[gr] && (e[ur] = !0), e[Uo] && (e[ur] = !0), e[ur] && (e[Wo] = !0), e[Lf] && (e[Wo] = !0);
  for (const r in e) {
    const s = Gx(r, t);
    s.indexOf(n) < 0 && s.push(n);
  }
}
function Yx(n, e) {
  const t = {};
  for (const r in e)
    e[r].indexOf(n) >= 0 && (t[r] = !0);
  return t;
}
function Xe(n = null) {
  this.j = {}, this.jr = [], this.jd = null, this.t = n;
}
Xe.groups = {};
Xe.prototype = {
  accepts() {
    return !!this.t;
  },
  /**
   * Follow an existing transition from the given input to the next state.
   * Does not mutate.
   * @param {string} input character or token type to transition on
   * @returns {?State<T>} the next state, if any
   */
  go(n) {
    const e = this, t = e.j[n];
    if (t)
      return t;
    for (let r = 0; r < e.jr.length; r++) {
      const s = e.jr[r][0], i = e.jr[r][1];
      if (i && s.test(n))
        return i;
    }
    return e.jd;
  },
  /**
   * Whether the state has a transition for the given input. Set the second
   * argument to true to only look for an exact match (and not a default or
   * regular-expression-based transition)
   * @param {string} input
   * @param {boolean} exactOnly
   */
  has(n, e = !1) {
    return e ? n in this.j : !!this.go(n);
  },
  /**
   * Short for "transition all"; create a transition from the array of items
   * in the given list to the same final resulting state.
   * @param {string | string[]} inputs Group of inputs to transition on
   * @param {Transition<T> | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   */
  ta(n, e, t, r) {
    for (let s = 0; s < n.length; s++)
      this.tt(n[s], e, t, r);
  },
  /**
   * Short for "take regexp transition"; defines a transition for this state
   * when it encounters a token which matches the given regular expression
   * @param {RegExp} regexp Regular expression transition (populate first)
   * @param {T | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   * @returns {State<T>} taken after the given input
   */
  tr(n, e, t, r) {
    r = r || Xe.groups;
    let s;
    return e && e.j ? s = e : (s = new Xe(e), t && r && pn(e, t, r)), this.jr.push([n, s]), s;
  },
  /**
   * Short for "take transitions", will take as many sequential transitions as
   * the length of the given input and returns the
   * resulting final state.
   * @param {string | string[]} input
   * @param {T | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   * @returns {State<T>} taken after the given input
   */
  ts(n, e, t, r) {
    let s = this;
    const i = n.length;
    if (!i)
      return s;
    for (let o = 0; o < i - 1; o++)
      s = s.tt(n[o]);
    return s.tt(n[i - 1], e, t, r);
  },
  /**
   * Short for "take transition", this is a method for building/working with
   * state machines.
   *
   * If a state already exists for the given input, returns it.
   *
   * If a token is specified, that state will emit that token when reached by
   * the linkify engine.
   *
   * If no state exists, it will be initialized with some default transitions
   * that resemble existing default transitions.
   *
   * If a state is given for the second argument, that state will be
   * transitioned to on the given input regardless of what that input
   * previously did.
   *
   * Specify a token group flags to define groups that this token belongs to.
   * The token will be added to corresponding entires in the given groups
   * object.
   *
   * @param {string} input character, token type to transition on
   * @param {T | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of groups
   * @returns {State<T>} taken after the given input
   */
  tt(n, e, t, r) {
    r = r || Xe.groups;
    const s = this;
    if (e && e.j)
      return s.j[n] = e, e;
    const i = e;
    let o, l = s.go(n);
    if (l ? (o = new Xe(), Object.assign(o.j, l.j), o.jr.push.apply(o.jr, l.jr), o.jd = l.jd, o.t = l.t) : o = new Xe(), i) {
      if (r)
        if (o.t && typeof o.t == "string") {
          const a = Object.assign(Yx(o.t, r), t);
          pn(i, a, r);
        } else t && pn(i, t, r);
      o.t = i;
    }
    return s.j[n] = o, o;
  }
};
const G = (n, e, t, r, s) => n.ta(e, t, r, s), ke = (n, e, t, r, s) => n.tr(e, t, r, s), Oc = (n, e, t, r, s) => n.ts(e, t, r, s), N = (n, e, t, r, s) => n.tt(e, t, r, s), Nt = "WORD", qo = "UWORD", Pf = "ASCIINUMERICAL", _f = "ALPHANUMERICAL", Dr = "LOCALHOST", Ko = "TLD", Jo = "UTLD", ns = "SCHEME", jn = "SLASH_SCHEME", Bl = "NUM", Go = "WS", Fl = "NL", yr = "OPENBRACE", br = "CLOSEBRACE", Ss = "OPENBRACKET", ws = "CLOSEBRACKET", Cs = "OPENPAREN", Es = "CLOSEPAREN", Ms = "OPENANGLEBRACKET", Ts = "CLOSEANGLEBRACKET", As = "FULLWIDTHLEFTPAREN", Ns = "FULLWIDTHRIGHTPAREN", Os = "LEFTCORNERBRACKET", Rs = "RIGHTCORNERBRACKET", Ds = "LEFTWHITECORNERBRACKET", Is = "RIGHTWHITECORNERBRACKET", Ls = "FULLWIDTHLESSTHAN", Ps = "FULLWIDTHGREATERTHAN", _s = "AMPERSAND", Bs = "APOSTROPHE", Fs = "ASTERISK", jt = "AT", Vs = "BACKSLASH", zs = "BACKTICK", js = "CARET", Ut = "COLON", Vl = "COMMA", $s = "DOLLAR", xt = "DOT", Hs = "EQUALS", zl = "EXCLAMATION", at = "HYPHEN", xr = "PERCENT", Us = "PIPE", Ws = "PLUS", qs = "POUND", kr = "QUERY", jl = "QUOTE", Bf = "FULLWIDTHMIDDLEDOT", $l = "SEMI", kt = "SLASH", vr = "TILDE", Ks = "UNDERSCORE", Ff = "EMOJI", Js = "SYM";
var Vf = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ALPHANUMERICAL: _f,
  AMPERSAND: _s,
  APOSTROPHE: Bs,
  ASCIINUMERICAL: Pf,
  ASTERISK: Fs,
  AT: jt,
  BACKSLASH: Vs,
  BACKTICK: zs,
  CARET: js,
  CLOSEANGLEBRACKET: Ts,
  CLOSEBRACE: br,
  CLOSEBRACKET: ws,
  CLOSEPAREN: Es,
  COLON: Ut,
  COMMA: Vl,
  DOLLAR: $s,
  DOT: xt,
  EMOJI: Ff,
  EQUALS: Hs,
  EXCLAMATION: zl,
  FULLWIDTHGREATERTHAN: Ps,
  FULLWIDTHLEFTPAREN: As,
  FULLWIDTHLESSTHAN: Ls,
  FULLWIDTHMIDDLEDOT: Bf,
  FULLWIDTHRIGHTPAREN: Ns,
  HYPHEN: at,
  LEFTCORNERBRACKET: Os,
  LEFTWHITECORNERBRACKET: Ds,
  LOCALHOST: Dr,
  NL: Fl,
  NUM: Bl,
  OPENANGLEBRACKET: Ms,
  OPENBRACE: yr,
  OPENBRACKET: Ss,
  OPENPAREN: Cs,
  PERCENT: xr,
  PIPE: Us,
  PLUS: Ws,
  POUND: qs,
  QUERY: kr,
  QUOTE: jl,
  RIGHTCORNERBRACKET: Rs,
  RIGHTWHITECORNERBRACKET: Is,
  SCHEME: ns,
  SEMI: $l,
  SLASH: kt,
  SLASH_SCHEME: jn,
  SYM: Js,
  TILDE: vr,
  TLD: Ko,
  UNDERSCORE: Ks,
  UTLD: Jo,
  UWORD: qo,
  WORD: Nt,
  WS: Go
});
const Tt = /[a-z]/, ir = new RegExp("\\p{L}", "u"), Zi = new RegExp("\\p{Emoji}", "u"), At = /\d/, eo = /\s/, Rc = "\r", to = `
`, Xx = "️", Qx = "‍", no = "￼";
let Gr = null, Yr = null;
function Zx(n = []) {
  const e = {};
  Xe.groups = e;
  const t = new Xe();
  Gr == null && (Gr = Dc(Wx)), Yr == null && (Yr = Dc(qx)), N(t, "'", Bs), N(t, "{", yr), N(t, "}", br), N(t, "[", Ss), N(t, "]", ws), N(t, "(", Cs), N(t, ")", Es), N(t, "<", Ms), N(t, ">", Ts), N(t, "（", As), N(t, "）", Ns), N(t, "「", Os), N(t, "」", Rs), N(t, "『", Ds), N(t, "』", Is), N(t, "＜", Ls), N(t, "＞", Ps), N(t, "&", _s), N(t, "*", Fs), N(t, "@", jt), N(t, "`", zs), N(t, "^", js), N(t, ":", Ut), N(t, ",", Vl), N(t, "$", $s), N(t, ".", xt), N(t, "=", Hs), N(t, "!", zl), N(t, "-", at), N(t, "%", xr), N(t, "|", Us), N(t, "+", Ws), N(t, "#", qs), N(t, "?", kr), N(t, '"', jl), N(t, "/", kt), N(t, ";", $l), N(t, "~", vr), N(t, "_", Ks), N(t, "\\", Vs), N(t, "・", Bf);
  const r = ke(t, At, Bl, {
    [$o]: !0
  });
  ke(r, At, r);
  const s = ke(r, Tt, Pf, {
    [gr]: !0
  }), i = ke(r, ir, _f, {
    [ur]: !0
  }), o = ke(t, Tt, Nt, {
    [Ho]: !0
  });
  ke(o, At, s), ke(o, Tt, o), ke(s, At, s), ke(s, Tt, s);
  const l = ke(t, ir, qo, {
    [Uo]: !0
  });
  ke(l, Tt), ke(l, At, i), ke(l, ir, l), ke(i, At, i), ke(i, Tt), ke(i, ir, i);
  const a = N(t, to, Fl, {
    [Qi]: !0
  }), c = N(t, Rc, Go, {
    [Qi]: !0
  }), u = ke(t, eo, Go, {
    [Qi]: !0
  });
  N(t, no, u), N(c, to, a), N(c, no, u), ke(c, eo, u), N(u, Rc), N(u, to), ke(u, eo, u), N(u, no, u);
  const d = ke(t, Zi, Ff, {
    [Lf]: !0
  });
  N(d, "#"), ke(d, Zi, d), N(d, Xx, d);
  const f = N(d, Qx);
  N(f, "#"), ke(f, Zi, d);
  const h = [[Tt, o], [At, s]], p = [[Tt, null], [ir, l], [At, i]];
  for (let m = 0; m < Gr.length; m++)
    Ft(t, Gr[m], Ko, Nt, h);
  for (let m = 0; m < Yr.length; m++)
    Ft(t, Yr[m], Jo, qo, p);
  pn(Ko, {
    tld: !0,
    ascii: !0
  }, e), pn(Jo, {
    utld: !0,
    alpha: !0
  }, e), Ft(t, "file", ns, Nt, h), Ft(t, "mailto", ns, Nt, h), Ft(t, "http", jn, Nt, h), Ft(t, "https", jn, Nt, h), Ft(t, "ftp", jn, Nt, h), Ft(t, "ftps", jn, Nt, h), pn(ns, {
    scheme: !0,
    ascii: !0
  }, e), pn(jn, {
    slashscheme: !0,
    ascii: !0
  }, e), n = n.sort((m, g) => m[0] > g[0] ? 1 : -1);
  for (let m = 0; m < n.length; m++) {
    const g = n[m][0], k = n[m][1] ? {
      [Kx]: !0
    } : {
      [Jx]: !0
    };
    g.indexOf("-") >= 0 ? k[Wo] = !0 : Tt.test(g) ? At.test(g) ? k[gr] = !0 : k[Ho] = !0 : k[$o] = !0, Oc(t, g, g, k);
  }
  return Oc(t, "localhost", Dr, {
    ascii: !0
  }), t.jd = new Xe(Js), {
    start: t,
    tokens: Object.assign({
      groups: e
    }, Vf)
  };
}
function zf(n, e) {
  const t = e1(e.replace(/[A-Z]/g, (l) => l.toLowerCase())), r = t.length, s = [];
  let i = 0, o = 0;
  for (; o < r; ) {
    let l = n, a = null, c = 0, u = null, d = -1, f = -1;
    for (; o < r && (a = l.go(t[o])); )
      l = a, l.accepts() ? (d = 0, f = 0, u = l) : d >= 0 && (d += t[o].length, f++), c += t[o].length, i += t[o].length, o++;
    i -= d, o -= f, c -= d, s.push({
      t: u.t,
      // token type/name
      v: e.slice(i - c, i),
      // string value
      s: i - c,
      // start index
      e: i
      // end index (excluding)
    });
  }
  return s;
}
function e1(n) {
  const e = [], t = n.length;
  let r = 0;
  for (; r < t; ) {
    let s = n.charCodeAt(r), i, o = s < 55296 || s > 56319 || r + 1 === t || (i = n.charCodeAt(r + 1)) < 56320 || i > 57343 ? n[r] : n.slice(r, r + 2);
    e.push(o), r += o.length;
  }
  return e;
}
function Ft(n, e, t, r, s) {
  let i;
  const o = e.length;
  for (let l = 0; l < o - 1; l++) {
    const a = e[l];
    n.j[a] ? i = n.j[a] : (i = new Xe(r), i.jr = s.slice(), n.j[a] = i), n = i;
  }
  return i = new Xe(t), i.jr = s.slice(), n.j[e[o - 1]] = i, i;
}
function Dc(n) {
  const e = [], t = [];
  let r = 0, s = "0123456789";
  for (; r < n.length; ) {
    let i = 0;
    for (; s.indexOf(n[r + i]) >= 0; )
      i++;
    if (i > 0) {
      e.push(t.join(""));
      for (let o = parseInt(n.substring(r, r + i), 10); o > 0; o--)
        t.pop();
      r += i;
    } else
      t.push(n[r]), r++;
  }
  return e;
}
const Ir = {
  defaultProtocol: "http",
  events: null,
  format: Ic,
  formatHref: Ic,
  nl2br: !1,
  tagName: "a",
  target: null,
  rel: null,
  validate: !0,
  truncate: 1 / 0,
  className: null,
  attributes: null,
  ignoreTags: [],
  render: null
};
function Hl(n, e = null) {
  let t = Object.assign({}, Ir);
  n && (t = Object.assign(t, n instanceof Hl ? n.o : n));
  const r = t.ignoreTags, s = [];
  for (let i = 0; i < r.length; i++)
    s.push(r[i].toUpperCase());
  this.o = t, e && (this.defaultRender = e), this.ignoreTags = s;
}
Hl.prototype = {
  o: Ir,
  /**
   * @type string[]
   */
  ignoreTags: [],
  /**
   * @param {IntermediateRepresentation} ir
   * @returns {any}
   */
  defaultRender(n) {
    return n;
  },
  /**
   * Returns true or false based on whether a token should be displayed as a
   * link based on the user options.
   * @param {MultiToken} token
   * @returns {boolean}
   */
  check(n) {
    return this.get("validate", n.toString(), n);
  },
  // Private methods
  /**
   * Resolve an option's value based on the value of the option and the given
   * params. If operator and token are specified and the target option is
   * callable, automatically calls the function with the given argument.
   * @template {keyof Opts} K
   * @param {K} key Name of option to use
   * @param {string} [operator] will be passed to the target option if it's a
   * function. If not specified, RAW function value gets returned
   * @param {MultiToken} [token] The token from linkify.tokenize
   * @returns {Opts[K] | any}
   */
  get(n, e, t) {
    const r = e != null;
    let s = this.o[n];
    return s && (typeof s == "object" ? (s = t.t in s ? s[t.t] : Ir[n], typeof s == "function" && r && (s = s(e, t))) : typeof s == "function" && r && (s = s(e, t.t, t)), s);
  },
  /**
   * @template {keyof Opts} L
   * @param {L} key Name of options object to use
   * @param {string} [operator]
   * @param {MultiToken} [token]
   * @returns {Opts[L] | any}
   */
  getObj(n, e, t) {
    let r = this.o[n];
    return typeof r == "function" && e != null && (r = r(e, t.t, t)), r;
  },
  /**
   * Convert the given token to a rendered element that may be added to the
   * calling-interface's DOM
   * @param {MultiToken} token Token to render to an HTML element
   * @returns {any} Render result; e.g., HTML string, DOM element, React
   *   Component, etc.
   */
  render(n) {
    const e = n.render(this);
    return (this.get("render", null, n) || this.defaultRender)(e, n.t, n);
  }
};
function Ic(n) {
  return n;
}
function jf(n, e) {
  this.t = "token", this.v = n, this.tk = e;
}
jf.prototype = {
  isLink: !1,
  /**
   * Return the string this token represents.
   * @return {string}
   */
  toString() {
    return this.v;
  },
  /**
   * What should the value for this token be in the `href` HTML attribute?
   * Returns the `.toString` value by default.
   * @param {string} [scheme]
   * @return {string}
   */
  toHref(n) {
    return this.toString();
  },
  /**
   * @param {Options} options Formatting options
   * @returns {string}
   */
  toFormattedString(n) {
    const e = this.toString(), t = n.get("truncate", e, this), r = n.get("format", e, this);
    return t && r.length > t ? r.substring(0, t) + "…" : r;
  },
  /**
   *
   * @param {Options} options
   * @returns {string}
   */
  toFormattedHref(n) {
    return n.get("formatHref", this.toHref(n.get("defaultProtocol")), this);
  },
  /**
   * The start index of this token in the original input string
   * @returns {number}
   */
  startIndex() {
    return this.tk[0].s;
  },
  /**
   * The end index of this token in the original input string (up to this
   * index but not including it)
   * @returns {number}
   */
  endIndex() {
    return this.tk[this.tk.length - 1].e;
  },
  /**
  	Returns an object  of relevant values for this token, which includes keys
  	* type - Kind of token ('url', 'email', etc.)
  	* value - Original text
  	* href - The value that should be added to the anchor tag's href
  		attribute
  		@method toObject
  	@param {string} [protocol] `'http'` by default
  */
  toObject(n = Ir.defaultProtocol) {
    return {
      type: this.t,
      value: this.toString(),
      isLink: this.isLink,
      href: this.toHref(n),
      start: this.startIndex(),
      end: this.endIndex()
    };
  },
  /**
   *
   * @param {Options} options Formatting option
   */
  toFormattedObject(n) {
    return {
      type: this.t,
      value: this.toFormattedString(n),
      isLink: this.isLink,
      href: this.toFormattedHref(n),
      start: this.startIndex(),
      end: this.endIndex()
    };
  },
  /**
   * Whether this token should be rendered as a link according to the given options
   * @param {Options} options
   * @returns {boolean}
   */
  validate(n) {
    return n.get("validate", this.toString(), this);
  },
  /**
   * Return an object that represents how this link should be rendered.
   * @param {Options} options Formattinng options
   */
  render(n) {
    const e = this, t = this.toHref(n.get("defaultProtocol")), r = n.get("formatHref", t, this), s = n.get("tagName", t, e), i = this.toFormattedString(n), o = {}, l = n.get("className", t, e), a = n.get("target", t, e), c = n.get("rel", t, e), u = n.getObj("attributes", t, e), d = n.getObj("events", t, e);
    return o.href = r, l && (o.class = l), a && (o.target = a), c && (o.rel = c), u && Object.assign(o, u), {
      tagName: s,
      attributes: o,
      content: i,
      eventListeners: d
    };
  }
};
function gi(n, e) {
  class t extends jf {
    constructor(s, i) {
      super(s, i), this.t = n;
    }
  }
  for (const r in e)
    t.prototype[r] = e[r];
  return t.t = n, t;
}
const Lc = gi("email", {
  isLink: !0,
  toHref() {
    return "mailto:" + this.toString();
  }
}), Pc = gi("text"), t1 = gi("nl"), Xr = gi("url", {
  isLink: !0,
  /**
  	Lowercases relevant parts of the domain and adds the protocol if
  	required. Note that this will not escape unsafe HTML characters in the
  	URL.
  		@param {string} [scheme] default scheme (e.g., 'https')
  	@return {string} the full href
  */
  toHref(n = Ir.defaultProtocol) {
    return this.hasProtocol() ? this.v : `${n}://${this.v}`;
  },
  /**
   * Check whether this URL token has a protocol
   * @return {boolean}
   */
  hasProtocol() {
    const n = this.tk;
    return n.length >= 2 && n[0].t !== Dr && n[1].t === Ut;
  }
}), lt = (n) => new Xe(n);
function n1({
  groups: n
}) {
  const e = n.domain.concat([_s, Fs, jt, Vs, zs, js, $s, Hs, at, Bl, xr, Us, Ws, qs, kt, Js, vr, Ks]), t = [Bs, Ut, Vl, xt, zl, xr, kr, jl, $l, Ms, Ts, yr, br, ws, Ss, Cs, Es, As, Ns, Os, Rs, Ds, Is, Ls, Ps], r = [_s, Bs, Fs, Vs, zs, js, $s, Hs, at, yr, br, xr, Us, Ws, qs, kr, kt, Js, vr, Ks], s = lt(), i = N(s, vr);
  G(i, r, i), G(i, n.domain, i);
  const o = lt(), l = lt(), a = lt();
  G(s, n.domain, o), G(s, n.scheme, l), G(s, n.slashscheme, a), G(o, r, i), G(o, n.domain, o);
  const c = N(o, jt);
  N(i, jt, c), N(l, jt, c), N(a, jt, c);
  const u = N(i, xt);
  G(u, r, i), G(u, n.domain, i);
  const d = lt();
  G(c, n.domain, d), G(d, n.domain, d);
  const f = N(d, xt);
  G(f, n.domain, d);
  const h = lt(Lc);
  G(f, n.tld, h), G(f, n.utld, h), N(c, Dr, h);
  const p = N(d, at);
  N(p, at, p), G(p, n.domain, d), G(h, n.domain, d), N(h, xt, f), N(h, at, p);
  const m = N(h, Ut);
  G(m, n.numeric, Lc);
  const g = N(o, at), y = N(o, xt);
  N(g, at, g), G(g, n.domain, o), G(y, r, i), G(y, n.domain, o);
  const k = lt(Xr);
  G(y, n.tld, k), G(y, n.utld, k), G(k, n.domain, o), G(k, r, i), N(k, xt, y), N(k, at, g), N(k, jt, c);
  const C = N(k, Ut), v = lt(Xr);
  G(C, n.numeric, v);
  const x = lt(Xr), E = lt();
  G(x, e, x), G(x, t, E), G(E, e, x), G(E, t, E), N(k, kt, x), N(v, kt, x);
  const M = N(l, Ut), D = N(a, Ut), L = N(D, kt), z = N(L, kt);
  G(l, n.domain, o), N(l, xt, y), N(l, at, g), G(a, n.domain, o), N(a, xt, y), N(a, at, g), G(M, n.domain, x), N(M, kt, x), N(M, kr, x), G(z, n.domain, x), G(z, e, x), N(z, kt, x);
  const X = [
    [yr, br],
    // {}
    [Ss, ws],
    // []
    [Cs, Es],
    // ()
    [Ms, Ts],
    // <>
    [As, Ns],
    // （）
    [Os, Rs],
    // 「」
    [Ds, Is],
    // 『』
    [Ls, Ps]
    // ＜＞
  ];
  for (let F = 0; F < X.length; F++) {
    const [V, W] = X[F], J = N(x, V);
    N(E, V, J), N(J, W, x);
    const Q = lt(Xr);
    G(J, e, Q);
    const re = lt();
    G(J, t), G(Q, e, Q), G(Q, t, re), G(re, e, Q), G(re, t, re), N(Q, W, x), N(re, W, x);
  }
  return N(s, Dr, k), N(s, Fl, t1), {
    start: s,
    tokens: Vf
  };
}
function r1(n, e, t) {
  let r = t.length, s = 0, i = [], o = [];
  for (; s < r; ) {
    let l = n, a = null, c = null, u = 0, d = null, f = -1;
    for (; s < r && !(a = l.go(t[s].t)); )
      o.push(t[s++]);
    for (; s < r && (c = a || l.go(t[s].t)); )
      a = null, l = c, l.accepts() ? (f = 0, d = l) : f >= 0 && f++, s++, u++;
    if (f < 0)
      s -= u, s < r && (o.push(t[s]), s++);
    else {
      o.length > 0 && (i.push(ro(Pc, e, o)), o = []), s -= f, u -= f;
      const h = d.t, p = t.slice(s - u, s);
      i.push(ro(h, e, p));
    }
  }
  return o.length > 0 && i.push(ro(Pc, e, o)), i;
}
function ro(n, e, t) {
  const r = t[0].s, s = t[t.length - 1].e, i = e.slice(r, s);
  return new n(i, t);
}
const s1 = typeof console < "u" && console && console.warn || (() => {
}), i1 = "until manual call of linkify.init(). Register all schemes and plugins before invoking linkify the first time.", he = {
  scanner: null,
  parser: null,
  tokenQueue: [],
  pluginQueue: [],
  customSchemes: [],
  initialized: !1
};
function o1() {
  return Xe.groups = {}, he.scanner = null, he.parser = null, he.tokenQueue = [], he.pluginQueue = [], he.customSchemes = [], he.initialized = !1, he;
}
function _c(n, e = !1) {
  if (he.initialized && s1(`linkifyjs: already initialized - will not register custom scheme "${n}" ${i1}`), !/^[0-9a-z]+(-[0-9a-z]+)*$/.test(n))
    throw new Error(`linkifyjs: incorrect scheme format.
1. Must only contain digits, lowercase ASCII letters or "-"
2. Cannot start or end with "-"
3. "-" cannot repeat`);
  he.customSchemes.push([n, e]);
}
function l1() {
  he.scanner = Zx(he.customSchemes);
  for (let n = 0; n < he.tokenQueue.length; n++)
    he.tokenQueue[n][1]({
      scanner: he.scanner
    });
  he.parser = n1(he.scanner.tokens);
  for (let n = 0; n < he.pluginQueue.length; n++)
    he.pluginQueue[n][1]({
      scanner: he.scanner,
      parser: he.parser
    });
  return he.initialized = !0, he;
}
function Ul(n) {
  return he.initialized || l1(), r1(he.parser.start, n, zf(he.scanner.start, n));
}
Ul.scan = zf;
function $f(n, e = null, t = null) {
  if (e && typeof e == "object") {
    if (t)
      throw Error(`linkifyjs: Invalid link type ${e}; must be a string`);
    t = e, e = null;
  }
  const r = new Hl(t), s = Ul(n), i = [];
  for (let o = 0; o < s.length; o++) {
    const l = s[o];
    l.isLink && (!e || l.t === e) && r.check(l) && i.push(l.toFormattedObject(r));
  }
  return i;
}
var Wl = "[\0-   ᠎ -\u2029 　]", a1 = new RegExp(Wl), c1 = new RegExp(`${Wl}$`), u1 = new RegExp(Wl, "g");
function d1(n) {
  return n.length === 1 ? n[0].isLink : n.length === 3 && n[1].isLink ? ["()", "[]"].includes(n[0].value + n[2].value) : !1;
}
function f1(n) {
  return new ge({
    key: new Re("autolink"),
    appendTransaction: (e, t, r) => {
      const s = e.some((c) => c.docChanged) && !t.doc.eq(r.doc), i = e.some((c) => c.getMeta("preventAutolink"));
      if (!s || i)
        return;
      const { tr: o } = r, l = tf(t.doc, [...e]);
      if (cf(l).forEach(({ newRange: c }) => {
        const u = f0(r.doc, c, (h) => h.isTextblock);
        let d, f;
        if (u.length > 1)
          d = u[0], f = r.doc.textBetween(
            d.pos,
            d.pos + d.node.nodeSize,
            void 0,
            " "
          );
        else if (u.length) {
          const h = r.doc.textBetween(c.from, c.to, " ", " ");
          if (!c1.test(h))
            return;
          d = u[0], f = r.doc.textBetween(d.pos, c.to, void 0, " ");
        }
        if (d && f) {
          const h = f.split(a1).filter(Boolean);
          if (h.length <= 0)
            return !1;
          const p = h[h.length - 1], m = d.pos + f.lastIndexOf(p);
          if (!p)
            return !1;
          const g = Ul(p).map((y) => y.toObject(n.defaultProtocol));
          if (!d1(g))
            return !1;
          g.filter((y) => y.isLink).map((y) => ({
            ...y,
            from: m + y.start + 1,
            to: m + y.end + 1
          })).filter((y) => r.schema.marks.code ? !r.doc.rangeHasMark(y.from, y.to, r.schema.marks.code) : !0).filter((y) => n.validate(y.value)).filter((y) => n.shouldAutoLink(y.value)).forEach((y) => {
            Dl(y.from, y.to, r.doc).some((k) => k.mark.type === n.type) || o.addMark(
              y.from,
              y.to,
              n.type.create({
                href: y.href
              })
            );
          });
        }
      }), !!o.steps.length)
        return o;
    }
  });
}
function h1(n) {
  return new ge({
    key: new Re("handleClickLink"),
    props: {
      handleClick: (e, t, r) => {
        var s, i;
        if (r.button !== 0 || !e.editable)
          return !1;
        let o = !1;
        if (n.enableClickSelection && (o = n.editor.commands.extendMarkRange(n.type.name)), n.openOnClick) {
          let l = null;
          if (r.target instanceof HTMLAnchorElement)
            l = r.target;
          else {
            let d = r.target;
            const f = [];
            for (; d.nodeName !== "DIV"; )
              f.push(d), d = d.parentNode;
            l = f.find((h) => h.nodeName === "A");
          }
          if (!l)
            return o;
          const a = af(e.state, n.type.name), c = (s = l == null ? void 0 : l.href) != null ? s : a.href, u = (i = l == null ? void 0 : l.target) != null ? i : a.target;
          l && c && (window.open(c, u), o = !0);
        }
        return o;
      }
    }
  });
}
function p1(n) {
  return new ge({
    key: new Re("handlePasteLink"),
    props: {
      handlePaste: (e, t, r) => {
        const { shouldAutoLink: s } = n, { state: i } = e, { selection: o } = i, { empty: l } = o;
        if (l)
          return !1;
        let a = "";
        r.content.forEach((u) => {
          a += u.textContent;
        });
        const c = $f(a, { defaultProtocol: n.defaultProtocol }).find(
          (u) => u.isLink && u.value === a
        );
        return !a || !c || s !== void 0 && !s(c.href) ? !1 : n.editor.commands.setMark(n.type, {
          href: c.href
        });
      }
    }
  });
}
function ln(n, e) {
  const t = ["http", "https", "ftp", "ftps", "mailto", "tel", "callto", "sms", "cid", "xmpp"];
  return e && e.forEach((r) => {
    const s = typeof r == "string" ? r : r.scheme;
    s && t.push(s);
  }), !n || n.replace(u1, "").match(
    new RegExp(
      // eslint-disable-next-line no-useless-escape
      `^(?:(?:${t.join("|")}):|[^a-z]|[a-z0-9+.-]+(?:[^a-z+.-:]|$))`,
      "i"
    )
  );
}
var m1 = Tn.create({
  name: "link",
  priority: 1e3,
  keepOnSplit: !1,
  exitable: !0,
  onCreate() {
    this.options.validate && !this.options.shouldAutoLink && (this.options.shouldAutoLink = this.options.validate, console.warn("The `validate` option is deprecated. Rename to the `shouldAutoLink` option instead.")), this.options.protocols.forEach((n) => {
      if (typeof n == "string") {
        _c(n);
        return;
      }
      _c(n.scheme, n.optionalSlashes);
    });
  },
  onDestroy() {
    o1();
  },
  inclusive() {
    return this.options.autolink;
  },
  addOptions() {
    return {
      openOnClick: !0,
      enableClickSelection: !1,
      linkOnPaste: !0,
      autolink: !0,
      protocols: [],
      defaultProtocol: "http",
      HTMLAttributes: {
        target: "_blank",
        rel: "noopener noreferrer nofollow",
        class: null
      },
      isAllowedUri: (n, e) => !!ln(n, e.protocols),
      validate: (n) => !!n,
      shouldAutoLink: (n) => !!n
    };
  },
  addAttributes() {
    return {
      href: {
        default: null,
        parseHTML(n) {
          return n.getAttribute("href");
        }
      },
      target: {
        default: this.options.HTMLAttributes.target
      },
      rel: {
        default: this.options.HTMLAttributes.rel
      },
      class: {
        default: this.options.HTMLAttributes.class
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "a[href]",
        getAttrs: (n) => {
          const e = n.getAttribute("href");
          return !e || !this.options.isAllowedUri(e, {
            defaultValidate: (t) => !!ln(t, this.options.protocols),
            protocols: this.options.protocols,
            defaultProtocol: this.options.defaultProtocol
          }) ? !1 : null;
        }
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return this.options.isAllowedUri(n.href, {
      defaultValidate: (e) => !!ln(e, this.options.protocols),
      protocols: this.options.protocols,
      defaultProtocol: this.options.defaultProtocol
    }) ? ["a", Ne(this.options.HTMLAttributes, n), 0] : ["a", Ne(this.options.HTMLAttributes, { ...n, href: "" }), 0];
  },
  markdownTokenName: "link",
  parseMarkdown: (n, e) => e.applyMark("link", e.parseInline(n.tokens || []), {
    href: n.href,
    title: n.title || null
  }),
  renderMarkdown: (n, e) => {
    var t;
    const r = ((t = n.attrs) == null ? void 0 : t.href) || "";
    return `[${e.renderChildren(n)}](${r})`;
  },
  addCommands() {
    return {
      setLink: (n) => ({ chain: e }) => {
        const { href: t } = n;
        return this.options.isAllowedUri(t, {
          defaultValidate: (r) => !!ln(r, this.options.protocols),
          protocols: this.options.protocols,
          defaultProtocol: this.options.defaultProtocol
        }) ? e().setMark(this.name, n).setMeta("preventAutolink", !0).run() : !1;
      },
      toggleLink: (n) => ({ chain: e }) => {
        const { href: t } = n || {};
        return t && !this.options.isAllowedUri(t, {
          defaultValidate: (r) => !!ln(r, this.options.protocols),
          protocols: this.options.protocols,
          defaultProtocol: this.options.defaultProtocol
        }) ? !1 : e().toggleMark(this.name, n, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run();
      },
      unsetLink: () => ({ chain: n }) => n().unsetMark(this.name, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run()
    };
  },
  addPasteRules() {
    return [
      Cn({
        find: (n) => {
          const e = [];
          if (n) {
            const { protocols: t, defaultProtocol: r } = this.options, s = $f(n).filter(
              (i) => i.isLink && this.options.isAllowedUri(i.value, {
                defaultValidate: (o) => !!ln(o, t),
                protocols: t,
                defaultProtocol: r
              })
            );
            s.length && s.forEach((i) => {
              this.options.shouldAutoLink(i.value) && e.push({
                text: i.value,
                data: {
                  href: i.href
                },
                index: i.start
              });
            });
          }
          return e;
        },
        type: this.type,
        getAttributes: (n) => {
          var e;
          return {
            href: (e = n.data) == null ? void 0 : e.href
          };
        }
      })
    ];
  },
  addProseMirrorPlugins() {
    const n = [], { protocols: e, defaultProtocol: t } = this.options;
    return this.options.autolink && n.push(
      f1({
        type: this.type,
        defaultProtocol: this.options.defaultProtocol,
        validate: (r) => this.options.isAllowedUri(r, {
          defaultValidate: (s) => !!ln(s, e),
          protocols: e,
          defaultProtocol: t
        }),
        shouldAutoLink: this.options.shouldAutoLink
      })
    ), n.push(
      h1({
        type: this.type,
        editor: this.editor,
        openOnClick: this.options.openOnClick === "whenNotEditable" ? !0 : this.options.openOnClick,
        enableClickSelection: this.options.enableClickSelection
      })
    ), this.options.linkOnPaste && n.push(
      p1({
        editor: this.editor,
        defaultProtocol: this.options.defaultProtocol,
        type: this.type,
        shouldAutoLink: this.options.shouldAutoLink
      })
    ), n;
  }
}), g1 = Object.defineProperty, y1 = (n, e) => {
  for (var t in e)
    g1(n, t, { get: e[t], enumerable: !0 });
}, b1 = "listItem", Bc = "textStyle", Fc = /^\s*([-+*])\s$/, Hf = st.create({
  name: "bulletList",
  addOptions() {
    return {
      itemTypeName: "listItem",
      HTMLAttributes: {},
      keepMarks: !1,
      keepAttributes: !1
    };
  },
  group: "block list",
  content() {
    return `${this.options.itemTypeName}+`;
  },
  parseHTML() {
    return [{ tag: "ul" }];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["ul", Ne(this.options.HTMLAttributes, n), 0];
  },
  markdownTokenName: "list",
  parseMarkdown: (n, e) => n.type !== "list" || n.ordered ? [] : {
    type: "bulletList",
    content: n.items ? e.parseChildren(n.items) : []
  },
  renderMarkdown: (n, e) => n.content ? e.renderChildren(n.content, `
`) : "",
  markdownOptions: {
    indentsContent: !0
  },
  addCommands() {
    return {
      toggleBulletList: () => ({ commands: n, chain: e }) => this.options.keepAttributes ? e().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(b1, this.editor.getAttributes(Bc)).run() : n.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-8": () => this.editor.commands.toggleBulletList()
    };
  },
  addInputRules() {
    let n = Zn({
      find: Fc,
      type: this.type
    });
    return (this.options.keepMarks || this.options.keepAttributes) && (n = Zn({
      find: Fc,
      type: this.type,
      keepMarks: this.options.keepMarks,
      keepAttributes: this.options.keepAttributes,
      getAttributes: () => this.editor.getAttributes(Bc),
      editor: this.editor
    })), [n];
  }
}), Uf = st.create({
  name: "listItem",
  addOptions() {
    return {
      HTMLAttributes: {},
      bulletListTypeName: "bulletList",
      orderedListTypeName: "orderedList"
    };
  },
  content: "paragraph block*",
  defining: !0,
  parseHTML() {
    return [
      {
        tag: "li"
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["li", Ne(this.options.HTMLAttributes, n), 0];
  },
  markdownTokenName: "list_item",
  parseMarkdown: (n, e) => {
    if (n.type !== "list_item")
      return [];
    let t = [];
    if (n.tokens && n.tokens.length > 0)
      if (n.tokens.some((s) => s.type === "paragraph"))
        t = e.parseChildren(n.tokens);
      else {
        const s = n.tokens[0];
        if (s && s.type === "text" && s.tokens && s.tokens.length > 0) {
          if (t = [
            {
              type: "paragraph",
              content: e.parseInline(s.tokens)
            }
          ], n.tokens.length > 1) {
            const o = n.tokens.slice(1), l = e.parseChildren(o);
            t.push(...l);
          }
        } else
          t = e.parseChildren(n.tokens);
      }
    return t.length === 0 && (t = [
      {
        type: "paragraph",
        content: []
      }
    ]), {
      type: "listItem",
      content: t
    };
  },
  renderMarkdown: (n, e, t) => _l(
    n,
    e,
    (r) => r.parentType === "bulletList" ? "- " : r.parentType === "orderedList" ? `${r.index + 1}. ` : "- ",
    t
  ),
  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.splitListItem(this.name),
      Tab: () => this.editor.commands.sinkListItem(this.name),
      "Shift-Tab": () => this.editor.commands.liftListItem(this.name)
    };
  }
}), x1 = {};
y1(x1, {
  findListItemPos: () => Vr,
  getNextListDepth: () => ql,
  handleBackspace: () => Yo,
  handleDelete: () => Xo,
  hasListBefore: () => Wf,
  hasListItemAfter: () => k1,
  hasListItemBefore: () => qf,
  listItemHasSubList: () => Kf,
  nextListIsDeeper: () => Jf,
  nextListIsHigher: () => Gf
});
var Vr = (n, e) => {
  const { $from: t } = e.selection, r = Ae(n, e.schema);
  let s = null, i = t.depth, o = t.pos, l = null;
  for (; i > 0 && l === null; )
    s = t.node(i), s.type === r ? l = i : (i -= 1, o -= 1);
  return l === null ? null : { $pos: e.doc.resolve(o), depth: l };
}, ql = (n, e) => {
  const t = Vr(n, e);
  if (!t)
    return !1;
  const [, r] = S0(e, n, t.$pos.pos + 4);
  return r;
}, Wf = (n, e, t) => {
  const { $anchor: r } = n.selection, s = Math.max(0, r.pos - 2), i = n.doc.resolve(s).node();
  return !(!i || !t.includes(i.type.name));
}, qf = (n, e) => {
  var t;
  const { $anchor: r } = e.selection, s = e.doc.resolve(r.pos - 2);
  return !(s.index() === 0 || ((t = s.nodeBefore) == null ? void 0 : t.type.name) !== n);
}, Kf = (n, e, t) => {
  if (!t)
    return !1;
  const r = Ae(n, e.schema);
  let s = !1;
  return t.descendants((i) => {
    i.type === r && (s = !0);
  }), s;
}, Yo = (n, e, t) => {
  if (n.commands.undoInputRule())
    return !0;
  if (n.state.selection.from !== n.state.selection.to)
    return !1;
  if (!Zt(n.state, e) && Wf(n.state, e, t)) {
    const { $anchor: l } = n.state.selection, a = n.state.doc.resolve(l.before() - 1), c = [];
    a.node().descendants((f, h) => {
      f.type.name === e && c.push({ node: f, pos: h });
    });
    const u = c.at(-1);
    if (!u)
      return !1;
    const d = n.state.doc.resolve(a.start() + u.pos + 1);
    return n.chain().cut({ from: l.start() - 1, to: l.end() + 1 }, d.end()).joinForward().run();
  }
  if (!Zt(n.state, e) || !M0(n.state))
    return !1;
  const r = Vr(e, n.state);
  if (!r)
    return !1;
  const i = n.state.doc.resolve(r.$pos.pos - 2).node(r.depth), o = Kf(e, n.state, i);
  return qf(e, n.state) && !o ? n.commands.joinItemBackward() : n.chain().liftListItem(e).run();
}, Jf = (n, e) => {
  const t = ql(n, e), r = Vr(n, e);
  return !r || !t ? !1 : t > r.depth;
}, Gf = (n, e) => {
  const t = ql(n, e), r = Vr(n, e);
  return !r || !t ? !1 : t < r.depth;
}, Xo = (n, e) => {
  if (!Zt(n.state, e) || !E0(n.state, e))
    return !1;
  const { selection: t } = n.state, { $from: r, $to: s } = t;
  return !t.empty && r.sameParent(s) ? !1 : Jf(e, n.state) ? n.chain().focus(n.state.selection.from + 4).lift(e).joinBackward().run() : Gf(e, n.state) ? n.chain().joinForward().joinBackward().run() : n.commands.joinItemForward();
}, k1 = (n, e) => {
  var t;
  const { $anchor: r } = e.selection, s = e.doc.resolve(r.pos - r.parentOffset - 2);
  return !(s.index() === s.parent.childCount - 1 || ((t = s.nodeAfter) == null ? void 0 : t.type.name) !== n);
}, Yf = Ee.create({
  name: "listKeymap",
  addOptions() {
    return {
      listTypes: [
        {
          itemName: "listItem",
          wrapperNames: ["bulletList", "orderedList"]
        },
        {
          itemName: "taskItem",
          wrapperNames: ["taskList"]
        }
      ]
    };
  },
  addKeyboardShortcuts() {
    return {
      Delete: ({ editor: n }) => {
        let e = !1;
        return this.options.listTypes.forEach(({ itemName: t }) => {
          n.state.schema.nodes[t] !== void 0 && Xo(n, t) && (e = !0);
        }), e;
      },
      "Mod-Delete": ({ editor: n }) => {
        let e = !1;
        return this.options.listTypes.forEach(({ itemName: t }) => {
          n.state.schema.nodes[t] !== void 0 && Xo(n, t) && (e = !0);
        }), e;
      },
      Backspace: ({ editor: n }) => {
        let e = !1;
        return this.options.listTypes.forEach(({ itemName: t, wrapperNames: r }) => {
          n.state.schema.nodes[t] !== void 0 && Yo(n, t, r) && (e = !0);
        }), e;
      },
      "Mod-Backspace": ({ editor: n }) => {
        let e = !1;
        return this.options.listTypes.forEach(({ itemName: t, wrapperNames: r }) => {
          n.state.schema.nodes[t] !== void 0 && Yo(n, t, r) && (e = !0);
        }), e;
      }
    };
  }
}), Vc = /^(\s*)(\d+)\.\s+(.*)$/, v1 = /^\s/;
function S1(n) {
  const e = [];
  let t = 0, r = 0;
  for (; t < n.length; ) {
    const s = n[t], i = s.match(Vc);
    if (!i)
      break;
    const [, o, l, a] = i, c = o.length;
    let u = a, d = t + 1;
    const f = [s];
    for (; d < n.length; ) {
      const h = n[d];
      if (h.match(Vc))
        break;
      if (h.trim() === "")
        f.push(h), u += `
`, d += 1;
      else if (h.match(v1))
        f.push(h), u += `
${h.slice(c + 2)}`, d += 1;
      else
        break;
    }
    e.push({
      indent: c,
      number: parseInt(l, 10),
      content: u.trim(),
      raw: f.join(`
`)
    }), r = d, t = d;
  }
  return [e, r];
}
function Xf(n, e, t) {
  var r;
  const s = [];
  let i = 0;
  for (; i < n.length; ) {
    const o = n[i];
    if (o.indent === e) {
      const l = o.content.split(`
`), a = ((r = l[0]) == null ? void 0 : r.trim()) || "", c = [];
      a && c.push({
        type: "paragraph",
        raw: a,
        tokens: t.inlineTokens(a)
      });
      const u = l.slice(1).join(`
`).trim();
      if (u) {
        const h = t.blockTokens(u);
        c.push(...h);
      }
      let d = i + 1;
      const f = [];
      for (; d < n.length && n[d].indent > e; )
        f.push(n[d]), d += 1;
      if (f.length > 0) {
        const h = Math.min(...f.map((m) => m.indent)), p = Xf(f, h, t);
        c.push({
          type: "list",
          ordered: !0,
          start: f[0].number,
          items: p,
          raw: f.map((m) => m.raw).join(`
`)
        });
      }
      s.push({
        type: "list_item",
        raw: o.raw,
        tokens: c
      }), i = d;
    } else
      i += 1;
  }
  return s;
}
function w1(n, e) {
  return n.map((t) => {
    if (t.type !== "list_item")
      return e.parseChildren([t])[0];
    const r = [];
    return t.tokens && t.tokens.length > 0 && t.tokens.forEach((s) => {
      if (s.type === "paragraph" || s.type === "list" || s.type === "blockquote" || s.type === "code")
        r.push(...e.parseChildren([s]));
      else if (s.type === "text" && s.tokens) {
        const i = e.parseChildren([s]);
        r.push({
          type: "paragraph",
          content: i
        });
      } else {
        const i = e.parseChildren([s]);
        i.length > 0 && r.push(...i);
      }
    }), {
      type: "listItem",
      content: r
    };
  });
}
var C1 = "listItem", zc = "textStyle", jc = /^(\d+)\.\s$/, Qf = st.create({
  name: "orderedList",
  addOptions() {
    return {
      itemTypeName: "listItem",
      HTMLAttributes: {},
      keepMarks: !1,
      keepAttributes: !1
    };
  },
  group: "block list",
  content() {
    return `${this.options.itemTypeName}+`;
  },
  addAttributes() {
    return {
      start: {
        default: 1,
        parseHTML: (n) => n.hasAttribute("start") ? parseInt(n.getAttribute("start") || "", 10) : 1
      },
      type: {
        default: null,
        parseHTML: (n) => n.getAttribute("type")
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "ol"
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    const { start: e, ...t } = n;
    return e === 1 ? ["ol", Ne(this.options.HTMLAttributes, t), 0] : ["ol", Ne(this.options.HTMLAttributes, n), 0];
  },
  markdownTokenName: "list",
  parseMarkdown: (n, e) => {
    if (n.type !== "list" || !n.ordered)
      return [];
    const t = n.start || 1, r = n.items ? w1(n.items, e) : [];
    return t !== 1 ? {
      type: "orderedList",
      attrs: { start: t },
      content: r
    } : {
      type: "orderedList",
      content: r
    };
  },
  renderMarkdown: (n, e) => n.content ? e.renderChildren(n.content, `
`) : "",
  markdownTokenizer: {
    name: "orderedList",
    level: "block",
    start: (n) => {
      const e = n.match(/^(\s*)(\d+)\.\s+/), t = e == null ? void 0 : e.index;
      return t !== void 0 ? t : -1;
    },
    tokenize: (n, e, t) => {
      var r;
      const s = n.split(`
`), [i, o] = S1(s);
      if (i.length === 0)
        return;
      const l = Xf(i, 0, t);
      return l.length === 0 ? void 0 : {
        type: "list",
        ordered: !0,
        start: ((r = i[0]) == null ? void 0 : r.number) || 1,
        items: l,
        raw: s.slice(0, o).join(`
`)
      };
    }
  },
  markdownOptions: {
    indentsContent: !0
  },
  addCommands() {
    return {
      toggleOrderedList: () => ({ commands: n, chain: e }) => this.options.keepAttributes ? e().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(C1, this.editor.getAttributes(zc)).run() : n.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-7": () => this.editor.commands.toggleOrderedList()
    };
  },
  addInputRules() {
    let n = Zn({
      find: jc,
      type: this.type,
      getAttributes: (e) => ({ start: +e[1] }),
      joinPredicate: (e, t) => t.childCount + t.attrs.start === +e[1]
    });
    return (this.options.keepMarks || this.options.keepAttributes) && (n = Zn({
      find: jc,
      type: this.type,
      keepMarks: this.options.keepMarks,
      keepAttributes: this.options.keepAttributes,
      getAttributes: (e) => ({ start: +e[1], ...this.editor.getAttributes(zc) }),
      joinPredicate: (e, t) => t.childCount + t.attrs.start === +e[1],
      editor: this.editor
    })), [n];
  }
}), E1 = /^\s*(\[([( |x])?\])\s$/, M1 = st.create({
  name: "taskItem",
  addOptions() {
    return {
      nested: !1,
      HTMLAttributes: {},
      taskListTypeName: "taskList",
      a11y: void 0
    };
  },
  content() {
    return this.options.nested ? "paragraph block*" : "paragraph+";
  },
  defining: !0,
  addAttributes() {
    return {
      checked: {
        default: !1,
        keepOnSplit: !1,
        parseHTML: (n) => {
          const e = n.getAttribute("data-checked");
          return e === "" || e === "true";
        },
        renderHTML: (n) => ({
          "data-checked": n.checked
        })
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: `li[data-type="${this.name}"]`,
        priority: 51
      }
    ];
  },
  renderHTML({ node: n, HTMLAttributes: e }) {
    return [
      "li",
      Ne(this.options.HTMLAttributes, e, {
        "data-type": this.name
      }),
      [
        "label",
        [
          "input",
          {
            type: "checkbox",
            checked: n.attrs.checked ? "checked" : null
          }
        ],
        ["span"]
      ],
      ["div", 0]
    ];
  },
  parseMarkdown: (n, e) => {
    const t = [];
    if (n.tokens && n.tokens.length > 0 ? t.push(e.createNode("paragraph", {}, e.parseInline(n.tokens))) : n.text ? t.push(e.createNode("paragraph", {}, [e.createNode("text", { text: n.text })])) : t.push(e.createNode("paragraph", {}, [])), n.nestedTokens && n.nestedTokens.length > 0) {
      const r = e.parseChildren(n.nestedTokens);
      t.push(...r);
    }
    return e.createNode("taskItem", { checked: n.checked || !1 }, t);
  },
  renderMarkdown: (n, e) => {
    var t;
    const s = `- [${(t = n.attrs) != null && t.checked ? "x" : " "}] `;
    return _l(n, e, s);
  },
  addKeyboardShortcuts() {
    const n = {
      Enter: () => this.editor.commands.splitListItem(this.name),
      "Shift-Tab": () => this.editor.commands.liftListItem(this.name)
    };
    return this.options.nested ? {
      ...n,
      Tab: () => this.editor.commands.sinkListItem(this.name)
    } : n;
  },
  addNodeView() {
    return ({ node: n, HTMLAttributes: e, getPos: t, editor: r }) => {
      const s = document.createElement("li"), i = document.createElement("label"), o = document.createElement("span"), l = document.createElement("input"), a = document.createElement("div"), c = (u) => {
        var d, f;
        l.ariaLabel = ((f = (d = this.options.a11y) == null ? void 0 : d.checkboxLabel) == null ? void 0 : f.call(d, u, l.checked)) || `Task item checkbox for ${u.textContent || "empty task item"}`;
      };
      return c(n), i.contentEditable = "false", l.type = "checkbox", l.addEventListener("mousedown", (u) => u.preventDefault()), l.addEventListener("change", (u) => {
        if (!r.isEditable && !this.options.onReadOnlyChecked) {
          l.checked = !l.checked;
          return;
        }
        const { checked: d } = u.target;
        r.isEditable && typeof t == "function" && r.chain().focus(void 0, { scrollIntoView: !1 }).command(({ tr: f }) => {
          const h = t();
          if (typeof h != "number")
            return !1;
          const p = f.doc.nodeAt(h);
          return f.setNodeMarkup(h, void 0, {
            ...p == null ? void 0 : p.attrs,
            checked: d
          }), !0;
        }).run(), !r.isEditable && this.options.onReadOnlyChecked && (this.options.onReadOnlyChecked(n, d) || (l.checked = !l.checked));
      }), Object.entries(this.options.HTMLAttributes).forEach(([u, d]) => {
        s.setAttribute(u, d);
      }), s.dataset.checked = n.attrs.checked, l.checked = n.attrs.checked, i.append(l, o), s.append(i, a), Object.entries(e).forEach(([u, d]) => {
        s.setAttribute(u, d);
      }), {
        dom: s,
        contentDOM: a,
        update: (u) => u.type !== this.type ? !1 : (s.dataset.checked = u.attrs.checked, l.checked = u.attrs.checked, c(u), !0)
      };
    };
  },
  addInputRules() {
    return [
      Zn({
        find: E1,
        type: this.type,
        getAttributes: (n) => ({
          checked: n[n.length - 1] === "x"
        })
      })
    ];
  }
}), T1 = st.create({
  name: "taskList",
  addOptions() {
    return {
      itemTypeName: "taskItem",
      HTMLAttributes: {}
    };
  },
  group: "block list",
  content() {
    return `${this.options.itemTypeName}+`;
  },
  parseHTML() {
    return [
      {
        tag: `ul[data-type="${this.name}"]`,
        priority: 51
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["ul", Ne(this.options.HTMLAttributes, n, { "data-type": this.name }), 0];
  },
  parseMarkdown: (n, e) => e.createNode("taskList", {}, e.parseChildren(n.items || [])),
  renderMarkdown: (n, e) => n.content ? e.renderChildren(n.content, `
`) : "",
  markdownTokenizer: {
    name: "taskList",
    level: "block",
    start(n) {
      var e;
      const t = (e = n.match(/^\s*[-+*]\s+\[([ xX])\]\s+/)) == null ? void 0 : e.index;
      return t !== void 0 ? t : -1;
    },
    tokenize(n, e, t) {
      const r = (i) => {
        const o = Vo(
          i,
          {
            itemPattern: /^(\s*)([-+*])\s+\[([ xX])\]\s+(.*)$/,
            extractItemData: (l) => ({
              indentLevel: l[1].length,
              mainContent: l[4],
              checked: l[3].toLowerCase() === "x"
            }),
            createToken: (l, a) => ({
              type: "taskItem",
              raw: "",
              mainContent: l.mainContent,
              indentLevel: l.indentLevel,
              checked: l.checked,
              text: l.mainContent,
              tokens: t.inlineTokens(l.mainContent),
              nestedTokens: a
            }),
            // Allow recursive nesting
            customNestedParser: r
          },
          t
        );
        return o ? [
          {
            type: "taskList",
            raw: o.raw,
            items: o.items
          }
        ] : t.blockTokens(i);
      }, s = Vo(
        n,
        {
          itemPattern: /^(\s*)([-+*])\s+\[([ xX])\]\s+(.*)$/,
          extractItemData: (i) => ({
            indentLevel: i[1].length,
            mainContent: i[4],
            checked: i[3].toLowerCase() === "x"
          }),
          createToken: (i, o) => ({
            type: "taskItem",
            raw: "",
            mainContent: i.mainContent,
            indentLevel: i.indentLevel,
            checked: i.checked,
            text: i.mainContent,
            tokens: t.inlineTokens(i.mainContent),
            nestedTokens: o
          }),
          // Use the recursive parser for nested content
          customNestedParser: r
        },
        t
      );
      if (s)
        return {
          type: "taskList",
          raw: s.raw,
          items: s.items
        };
    }
  },
  markdownOptions: {
    indentsContent: !0
  },
  addCommands() {
    return {
      toggleTaskList: () => ({ commands: n }) => n.toggleList(this.name, this.options.itemTypeName)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-9": () => this.editor.commands.toggleTaskList()
    };
  }
});
Ee.create({
  name: "listKit",
  addExtensions() {
    const n = [];
    return this.options.bulletList !== !1 && n.push(Hf.configure(this.options.bulletList)), this.options.listItem !== !1 && n.push(Uf.configure(this.options.listItem)), this.options.listKeymap !== !1 && n.push(Yf.configure(this.options.listKeymap)), this.options.orderedList !== !1 && n.push(Qf.configure(this.options.orderedList)), this.options.taskItem !== !1 && n.push(M1.configure(this.options.taskItem)), this.options.taskList !== !1 && n.push(T1.configure(this.options.taskList)), n;
  }
});
var A1 = st.create({
  name: "paragraph",
  priority: 1e3,
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  group: "block",
  content: "inline*",
  parseHTML() {
    return [{ tag: "p" }];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["p", Ne(this.options.HTMLAttributes, n), 0];
  },
  parseMarkdown: (n, e) => {
    const t = n.tokens || [];
    return t.length === 1 && t[0].type === "image" ? e.parseChildren([t[0]]) : e.createNode(
      "paragraph",
      void 0,
      // no attributes for paragraph
      e.parseInline(t)
    );
  },
  renderMarkdown: (n, e) => !n || !Array.isArray(n.content) ? "" : e.renderChildren(n.content),
  addCommands() {
    return {
      setParagraph: () => ({ commands: n }) => n.setNode(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Alt-0": () => this.editor.commands.setParagraph()
    };
  }
}), N1 = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))$/, O1 = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))/g, R1 = Tn.create({
  name: "strike",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "s"
      },
      {
        tag: "del"
      },
      {
        tag: "strike"
      },
      {
        style: "text-decoration",
        consuming: !1,
        getAttrs: (n) => n.includes("line-through") ? {} : !1
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["s", Ne(this.options.HTMLAttributes, n), 0];
  },
  markdownTokenName: "del",
  parseMarkdown: (n, e) => e.applyMark("strike", e.parseInline(n.tokens || [])),
  renderMarkdown: (n, e) => `~~${e.renderChildren(n)}~~`,
  addCommands() {
    return {
      setStrike: () => ({ commands: n }) => n.setMark(this.name),
      toggleStrike: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetStrike: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-s": () => this.editor.commands.toggleStrike()
    };
  },
  addInputRules() {
    return [
      Qn({
        find: N1,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      Cn({
        find: O1,
        type: this.type
      })
    ];
  }
}), D1 = st.create({
  name: "text",
  group: "inline",
  parseMarkdown: (n) => ({
    type: "text",
    text: n.text || ""
  }),
  renderMarkdown: (n) => n.text || ""
}), I1 = Tn.create({
  name: "underline",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "u"
      },
      {
        style: "text-decoration",
        consuming: !1,
        getAttrs: (n) => n.includes("underline") ? {} : !1
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["u", Ne(this.options.HTMLAttributes, n), 0];
  },
  parseMarkdown(n, e) {
    return e.applyMark(this.name || "underline", e.parseInline(n.tokens || []));
  },
  renderMarkdown(n, e) {
    return `++${e.renderChildren(n)}++`;
  },
  markdownTokenizer: {
    name: "underline",
    level: "inline",
    start(n) {
      return n.indexOf("++");
    },
    tokenize(n, e, t) {
      const s = /^(\+\+)([\s\S]+?)(\+\+)/.exec(n);
      if (!s)
        return;
      const i = s[2].trim();
      return {
        type: "underline",
        raw: s[0],
        text: i,
        tokens: t.inlineTokens(i)
      };
    }
  },
  addCommands() {
    return {
      setUnderline: () => ({ commands: n }) => n.setMark(this.name),
      toggleUnderline: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetUnderline: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-u": () => this.editor.commands.toggleUnderline(),
      "Mod-U": () => this.editor.commands.toggleUnderline()
    };
  }
});
function L1(n = {}) {
  return new ge({
    view(e) {
      return new P1(e, n);
    }
  });
}
class P1 {
  constructor(e, t) {
    var r;
    this.editorView = e, this.cursorPos = null, this.element = null, this.timeout = -1, this.width = (r = t.width) !== null && r !== void 0 ? r : 1, this.color = t.color === !1 ? void 0 : t.color || "black", this.class = t.class, this.handlers = ["dragover", "dragend", "drop", "dragleave"].map((s) => {
      let i = (o) => {
        this[s](o);
      };
      return e.dom.addEventListener(s, i), { name: s, handler: i };
    });
  }
  destroy() {
    this.handlers.forEach(({ name: e, handler: t }) => this.editorView.dom.removeEventListener(e, t));
  }
  update(e, t) {
    this.cursorPos != null && t.doc != e.state.doc && (this.cursorPos > e.state.doc.content.size ? this.setCursor(null) : this.updateOverlay());
  }
  setCursor(e) {
    e != this.cursorPos && (this.cursorPos = e, e == null ? (this.element.parentNode.removeChild(this.element), this.element = null) : this.updateOverlay());
  }
  updateOverlay() {
    let e = this.editorView.state.doc.resolve(this.cursorPos), t = !e.parent.inlineContent, r, s = this.editorView.dom, i = s.getBoundingClientRect(), o = i.width / s.offsetWidth, l = i.height / s.offsetHeight;
    if (t) {
      let d = e.nodeBefore, f = e.nodeAfter;
      if (d || f) {
        let h = this.editorView.nodeDOM(this.cursorPos - (d ? d.nodeSize : 0));
        if (h) {
          let p = h.getBoundingClientRect(), m = d ? p.bottom : p.top;
          d && f && (m = (m + this.editorView.nodeDOM(this.cursorPos).getBoundingClientRect().top) / 2);
          let g = this.width / 2 * l;
          r = { left: p.left, right: p.right, top: m - g, bottom: m + g };
        }
      }
    }
    if (!r) {
      let d = this.editorView.coordsAtPos(this.cursorPos), f = this.width / 2 * o;
      r = { left: d.left - f, right: d.left + f, top: d.top, bottom: d.bottom };
    }
    let a = this.editorView.dom.offsetParent;
    this.element || (this.element = a.appendChild(document.createElement("div")), this.class && (this.element.className = this.class), this.element.style.cssText = "position: absolute; z-index: 50; pointer-events: none;", this.color && (this.element.style.backgroundColor = this.color)), this.element.classList.toggle("prosemirror-dropcursor-block", t), this.element.classList.toggle("prosemirror-dropcursor-inline", !t);
    let c, u;
    if (!a || a == document.body && getComputedStyle(a).position == "static")
      c = -pageXOffset, u = -pageYOffset;
    else {
      let d = a.getBoundingClientRect(), f = d.width / a.offsetWidth, h = d.height / a.offsetHeight;
      c = d.left - a.scrollLeft * f, u = d.top - a.scrollTop * h;
    }
    this.element.style.left = (r.left - c) / o + "px", this.element.style.top = (r.top - u) / l + "px", this.element.style.width = (r.right - r.left) / o + "px", this.element.style.height = (r.bottom - r.top) / l + "px";
  }
  scheduleRemoval(e) {
    clearTimeout(this.timeout), this.timeout = setTimeout(() => this.setCursor(null), e);
  }
  dragover(e) {
    if (!this.editorView.editable)
      return;
    let t = this.editorView.posAtCoords({ left: e.clientX, top: e.clientY }), r = t && t.inside >= 0 && this.editorView.state.doc.nodeAt(t.inside), s = r && r.type.spec.disableDropCursor, i = typeof s == "function" ? s(this.editorView, t, e) : s;
    if (t && !i) {
      let o = t.pos;
      if (this.editorView.dragging && this.editorView.dragging.slice) {
        let l = Wu(this.editorView.state.doc, o, this.editorView.dragging.slice);
        l != null && (o = l);
      }
      this.setCursor(o), this.scheduleRemoval(5e3);
    }
  }
  dragend() {
    this.scheduleRemoval(20);
  }
  drop() {
    this.scheduleRemoval(20);
  }
  dragleave(e) {
    this.editorView.dom.contains(e.relatedTarget) || this.setCursor(null);
  }
}
class ve extends Y {
  /**
  Create a gap cursor.
  */
  constructor(e) {
    super(e, e);
  }
  map(e, t) {
    let r = e.resolve(t.map(this.head));
    return ve.valid(r) ? new ve(r) : Y.near(r);
  }
  content() {
    return _.empty;
  }
  eq(e) {
    return e instanceof ve && e.head == this.head;
  }
  toJSON() {
    return { type: "gapcursor", pos: this.head };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.pos != "number")
      throw new RangeError("Invalid input for GapCursor.fromJSON");
    return new ve(e.resolve(t.pos));
  }
  /**
  @internal
  */
  getBookmark() {
    return new Kl(this.anchor);
  }
  /**
  @internal
  */
  static valid(e) {
    let t = e.parent;
    if (t.isTextblock || !_1(e) || !B1(e))
      return !1;
    let r = t.type.spec.allowGapCursor;
    if (r != null)
      return r;
    let s = t.contentMatchAt(e.index()).defaultType;
    return s && s.isTextblock;
  }
  /**
  @internal
  */
  static findGapCursorFrom(e, t, r = !1) {
    e: for (; ; ) {
      if (!r && ve.valid(e))
        return e;
      let s = e.pos, i = null;
      for (let o = e.depth; ; o--) {
        let l = e.node(o);
        if (t > 0 ? e.indexAfter(o) < l.childCount : e.index(o) > 0) {
          i = l.child(t > 0 ? e.indexAfter(o) : e.index(o) - 1);
          break;
        } else if (o == 0)
          return null;
        s += t;
        let a = e.doc.resolve(s);
        if (ve.valid(a))
          return a;
      }
      for (; ; ) {
        let o = t > 0 ? i.firstChild : i.lastChild;
        if (!o) {
          if (i.isAtom && !i.isText && !j.isSelectable(i)) {
            e = e.doc.resolve(s + i.nodeSize * t), r = !1;
            continue e;
          }
          break;
        }
        i = o, s += t;
        let l = e.doc.resolve(s);
        if (ve.valid(l))
          return l;
      }
      return null;
    }
  }
}
ve.prototype.visible = !1;
ve.findFrom = ve.findGapCursorFrom;
Y.jsonID("gapcursor", ve);
class Kl {
  constructor(e) {
    this.pos = e;
  }
  map(e) {
    return new Kl(e.map(this.pos));
  }
  resolve(e) {
    let t = e.resolve(this.pos);
    return ve.valid(t) ? new ve(t) : Y.near(t);
  }
}
function Zf(n) {
  return n.isAtom || n.spec.isolating || n.spec.createGapCursor;
}
function _1(n) {
  for (let e = n.depth; e >= 0; e--) {
    let t = n.index(e), r = n.node(e);
    if (t == 0) {
      if (r.type.spec.isolating)
        return !0;
      continue;
    }
    for (let s = r.child(t - 1); ; s = s.lastChild) {
      if (s.childCount == 0 && !s.inlineContent || Zf(s.type))
        return !0;
      if (s.inlineContent)
        return !1;
    }
  }
  return !0;
}
function B1(n) {
  for (let e = n.depth; e >= 0; e--) {
    let t = n.indexAfter(e), r = n.node(e);
    if (t == r.childCount) {
      if (r.type.spec.isolating)
        return !0;
      continue;
    }
    for (let s = r.child(t); ; s = s.firstChild) {
      if (s.childCount == 0 && !s.inlineContent || Zf(s.type))
        return !0;
      if (s.inlineContent)
        return !1;
    }
  }
  return !0;
}
function F1() {
  return new ge({
    props: {
      decorations: $1,
      createSelectionBetween(n, e, t) {
        return e.pos == t.pos && ve.valid(t) ? new ve(t) : null;
      },
      handleClick: z1,
      handleKeyDown: V1,
      handleDOMEvents: { beforeinput: j1 }
    }
  });
}
const V1 = qd({
  ArrowLeft: Qr("horiz", -1),
  ArrowRight: Qr("horiz", 1),
  ArrowUp: Qr("vert", -1),
  ArrowDown: Qr("vert", 1)
});
function Qr(n, e) {
  const t = n == "vert" ? e > 0 ? "down" : "up" : e > 0 ? "right" : "left";
  return function(r, s, i) {
    let o = r.selection, l = e > 0 ? o.$to : o.$from, a = o.empty;
    if (o instanceof q) {
      if (!i.endOfTextblock(t) || l.depth == 0)
        return !1;
      a = !1, l = r.doc.resolve(e > 0 ? l.after() : l.before());
    }
    let c = ve.findGapCursorFrom(l, e, a);
    return c ? (s && s(r.tr.setSelection(new ve(c))), !0) : !1;
  };
}
function z1(n, e, t) {
  if (!n || !n.editable)
    return !1;
  let r = n.state.doc.resolve(e);
  if (!ve.valid(r))
    return !1;
  let s = n.posAtCoords({ left: t.clientX, top: t.clientY });
  return s && s.inside > -1 && j.isSelectable(n.state.doc.nodeAt(s.inside)) ? !1 : (n.dispatch(n.state.tr.setSelection(new ve(r))), !0);
}
function j1(n, e) {
  if (e.inputType != "insertCompositionText" || !(n.state.selection instanceof ve))
    return !1;
  let { $from: t } = n.state.selection, r = t.parent.contentMatchAt(t.index()).findWrapping(n.state.schema.nodes.text);
  if (!r)
    return !1;
  let s = A.empty;
  for (let o = r.length - 1; o >= 0; o--)
    s = A.from(r[o].createAndFill(null, s));
  let i = n.state.tr.replace(t.pos, t.pos, new _(s, 0, 0));
  return i.setSelection(q.near(i.doc.resolve(t.pos + 1))), n.dispatch(i), !1;
}
function $1(n) {
  if (!(n.selection instanceof ve))
    return null;
  let e = document.createElement("div");
  return e.className = "ProseMirror-gapcursor", me.create(n.doc, [qe.widget(n.selection.head, e, { key: "gapcursor" })]);
}
var Gs = 200, Pe = function() {
};
Pe.prototype.append = function(e) {
  return e.length ? (e = Pe.from(e), !this.length && e || e.length < Gs && this.leafAppend(e) || this.length < Gs && e.leafPrepend(this) || this.appendInner(e)) : this;
};
Pe.prototype.prepend = function(e) {
  return e.length ? Pe.from(e).append(this) : this;
};
Pe.prototype.appendInner = function(e) {
  return new H1(this, e);
};
Pe.prototype.slice = function(e, t) {
  return e === void 0 && (e = 0), t === void 0 && (t = this.length), e >= t ? Pe.empty : this.sliceInner(Math.max(0, e), Math.min(this.length, t));
};
Pe.prototype.get = function(e) {
  if (!(e < 0 || e >= this.length))
    return this.getInner(e);
};
Pe.prototype.forEach = function(e, t, r) {
  t === void 0 && (t = 0), r === void 0 && (r = this.length), t <= r ? this.forEachInner(e, t, r, 0) : this.forEachInvertedInner(e, t, r, 0);
};
Pe.prototype.map = function(e, t, r) {
  t === void 0 && (t = 0), r === void 0 && (r = this.length);
  var s = [];
  return this.forEach(function(i, o) {
    return s.push(e(i, o));
  }, t, r), s;
};
Pe.from = function(e) {
  return e instanceof Pe ? e : e && e.length ? new eh(e) : Pe.empty;
};
var eh = /* @__PURE__ */ function(n) {
  function e(r) {
    n.call(this), this.values = r;
  }
  n && (e.__proto__ = n), e.prototype = Object.create(n && n.prototype), e.prototype.constructor = e;
  var t = { length: { configurable: !0 }, depth: { configurable: !0 } };
  return e.prototype.flatten = function() {
    return this.values;
  }, e.prototype.sliceInner = function(s, i) {
    return s == 0 && i == this.length ? this : new e(this.values.slice(s, i));
  }, e.prototype.getInner = function(s) {
    return this.values[s];
  }, e.prototype.forEachInner = function(s, i, o, l) {
    for (var a = i; a < o; a++)
      if (s(this.values[a], l + a) === !1)
        return !1;
  }, e.prototype.forEachInvertedInner = function(s, i, o, l) {
    for (var a = i - 1; a >= o; a--)
      if (s(this.values[a], l + a) === !1)
        return !1;
  }, e.prototype.leafAppend = function(s) {
    if (this.length + s.length <= Gs)
      return new e(this.values.concat(s.flatten()));
  }, e.prototype.leafPrepend = function(s) {
    if (this.length + s.length <= Gs)
      return new e(s.flatten().concat(this.values));
  }, t.length.get = function() {
    return this.values.length;
  }, t.depth.get = function() {
    return 0;
  }, Object.defineProperties(e.prototype, t), e;
}(Pe);
Pe.empty = new eh([]);
var H1 = /* @__PURE__ */ function(n) {
  function e(t, r) {
    n.call(this), this.left = t, this.right = r, this.length = t.length + r.length, this.depth = Math.max(t.depth, r.depth) + 1;
  }
  return n && (e.__proto__ = n), e.prototype = Object.create(n && n.prototype), e.prototype.constructor = e, e.prototype.flatten = function() {
    return this.left.flatten().concat(this.right.flatten());
  }, e.prototype.getInner = function(r) {
    return r < this.left.length ? this.left.get(r) : this.right.get(r - this.left.length);
  }, e.prototype.forEachInner = function(r, s, i, o) {
    var l = this.left.length;
    if (s < l && this.left.forEachInner(r, s, Math.min(i, l), o) === !1 || i > l && this.right.forEachInner(r, Math.max(s - l, 0), Math.min(this.length, i) - l, o + l) === !1)
      return !1;
  }, e.prototype.forEachInvertedInner = function(r, s, i, o) {
    var l = this.left.length;
    if (s > l && this.right.forEachInvertedInner(r, s - l, Math.max(i, l) - l, o + l) === !1 || i < l && this.left.forEachInvertedInner(r, Math.min(s, l), i, o) === !1)
      return !1;
  }, e.prototype.sliceInner = function(r, s) {
    if (r == 0 && s == this.length)
      return this;
    var i = this.left.length;
    return s <= i ? this.left.slice(r, s) : r >= i ? this.right.slice(r - i, s - i) : this.left.slice(r, i).append(this.right.slice(0, s - i));
  }, e.prototype.leafAppend = function(r) {
    var s = this.right.leafAppend(r);
    if (s)
      return new e(this.left, s);
  }, e.prototype.leafPrepend = function(r) {
    var s = this.left.leafPrepend(r);
    if (s)
      return new e(s, this.right);
  }, e.prototype.appendInner = function(r) {
    return this.left.depth >= Math.max(this.right.depth, r.depth) + 1 ? new e(this.left, new e(this.right, r)) : new e(this, r);
  }, e;
}(Pe);
const U1 = 500;
class gt {
  constructor(e, t) {
    this.items = e, this.eventCount = t;
  }
  // Pop the latest event off the branch's history and apply it
  // to a document transform.
  popEvent(e, t) {
    if (this.eventCount == 0)
      return null;
    let r = this.items.length;
    for (; ; r--)
      if (this.items.get(r - 1).selection) {
        --r;
        break;
      }
    let s, i;
    t && (s = this.remapping(r, this.items.length), i = s.maps.length);
    let o = e.tr, l, a, c = [], u = [];
    return this.items.forEach((d, f) => {
      if (!d.step) {
        s || (s = this.remapping(r, f + 1), i = s.maps.length), i--, u.push(d);
        return;
      }
      if (s) {
        u.push(new vt(d.map));
        let h = d.step.map(s.slice(i)), p;
        h && o.maybeStep(h).doc && (p = o.mapping.maps[o.mapping.maps.length - 1], c.push(new vt(p, void 0, void 0, c.length + u.length))), i--, p && s.appendMap(p, i);
      } else
        o.maybeStep(d.step);
      if (d.selection)
        return l = s ? d.selection.map(s.slice(i)) : d.selection, a = new gt(this.items.slice(0, r).append(u.reverse().concat(c)), this.eventCount - 1), !1;
    }, this.items.length, 0), { remaining: a, transform: o, selection: l };
  }
  // Create a new branch with the given transform added.
  addTransform(e, t, r, s) {
    let i = [], o = this.eventCount, l = this.items, a = !s && l.length ? l.get(l.length - 1) : null;
    for (let u = 0; u < e.steps.length; u++) {
      let d = e.steps[u].invert(e.docs[u]), f = new vt(e.mapping.maps[u], d, t), h;
      (h = a && a.merge(f)) && (f = h, u ? i.pop() : l = l.slice(0, l.length - 1)), i.push(f), t && (o++, t = void 0), s || (a = f);
    }
    let c = o - r.depth;
    return c > q1 && (l = W1(l, c), o -= c), new gt(l.append(i), o);
  }
  remapping(e, t) {
    let r = new Er();
    return this.items.forEach((s, i) => {
      let o = s.mirrorOffset != null && i - s.mirrorOffset >= e ? r.maps.length - s.mirrorOffset : void 0;
      r.appendMap(s.map, o);
    }, e, t), r;
  }
  addMaps(e) {
    return this.eventCount == 0 ? this : new gt(this.items.append(e.map((t) => new vt(t))), this.eventCount);
  }
  // When the collab module receives remote changes, the history has
  // to know about those, so that it can adjust the steps that were
  // rebased on top of the remote changes, and include the position
  // maps for the remote changes in its array of items.
  rebased(e, t) {
    if (!this.eventCount)
      return this;
    let r = [], s = Math.max(0, this.items.length - t), i = e.mapping, o = e.steps.length, l = this.eventCount;
    this.items.forEach((f) => {
      f.selection && l--;
    }, s);
    let a = t;
    this.items.forEach((f) => {
      let h = i.getMirror(--a);
      if (h == null)
        return;
      o = Math.min(o, h);
      let p = i.maps[h];
      if (f.step) {
        let m = e.steps[h].invert(e.docs[h]), g = f.selection && f.selection.map(i.slice(a + 1, h));
        g && l++, r.push(new vt(p, m, g));
      } else
        r.push(new vt(p));
    }, s);
    let c = [];
    for (let f = t; f < o; f++)
      c.push(new vt(i.maps[f]));
    let u = this.items.slice(0, s).append(c).append(r), d = new gt(u, l);
    return d.emptyItemCount() > U1 && (d = d.compress(this.items.length - r.length)), d;
  }
  emptyItemCount() {
    let e = 0;
    return this.items.forEach((t) => {
      t.step || e++;
    }), e;
  }
  // Compressing a branch means rewriting it to push the air (map-only
  // items) out. During collaboration, these naturally accumulate
  // because each remote change adds one. The `upto` argument is used
  // to ensure that only the items below a given level are compressed,
  // because `rebased` relies on a clean, untouched set of items in
  // order to associate old items with rebased steps.
  compress(e = this.items.length) {
    let t = this.remapping(0, e), r = t.maps.length, s = [], i = 0;
    return this.items.forEach((o, l) => {
      if (l >= e)
        s.push(o), o.selection && i++;
      else if (o.step) {
        let a = o.step.map(t.slice(r)), c = a && a.getMap();
        if (r--, c && t.appendMap(c, r), a) {
          let u = o.selection && o.selection.map(t.slice(r));
          u && i++;
          let d = new vt(c.invert(), a, u), f, h = s.length - 1;
          (f = s.length && s[h].merge(d)) ? s[h] = f : s.push(d);
        }
      } else o.map && r--;
    }, this.items.length, 0), new gt(Pe.from(s.reverse()), i);
  }
}
gt.empty = new gt(Pe.empty, 0);
function W1(n, e) {
  let t;
  return n.forEach((r, s) => {
    if (r.selection && e-- == 0)
      return t = s, !1;
  }), n.slice(t);
}
class vt {
  constructor(e, t, r, s) {
    this.map = e, this.step = t, this.selection = r, this.mirrorOffset = s;
  }
  merge(e) {
    if (this.step && e.step && !e.selection) {
      let t = e.step.merge(this.step);
      if (t)
        return new vt(t.getMap().invert(), t, this.selection);
    }
  }
}
class $t {
  constructor(e, t, r, s, i) {
    this.done = e, this.undone = t, this.prevRanges = r, this.prevTime = s, this.prevComposition = i;
  }
}
const q1 = 20;
function K1(n, e, t, r) {
  let s = t.getMeta(xn), i;
  if (s)
    return s.historyState;
  t.getMeta(Y1) && (n = new $t(n.done, n.undone, null, 0, -1));
  let o = t.getMeta("appendedTransaction");
  if (t.steps.length == 0)
    return n;
  if (o && o.getMeta(xn))
    return o.getMeta(xn).redo ? new $t(n.done.addTransform(t, void 0, r, rs(e)), n.undone, $c(t.mapping.maps), n.prevTime, n.prevComposition) : new $t(n.done, n.undone.addTransform(t, void 0, r, rs(e)), null, n.prevTime, n.prevComposition);
  if (t.getMeta("addToHistory") !== !1 && !(o && o.getMeta("addToHistory") === !1)) {
    let l = t.getMeta("composition"), a = n.prevTime == 0 || !o && n.prevComposition != l && (n.prevTime < (t.time || 0) - r.newGroupDelay || !J1(t, n.prevRanges)), c = o ? so(n.prevRanges, t.mapping) : $c(t.mapping.maps);
    return new $t(n.done.addTransform(t, a ? e.selection.getBookmark() : void 0, r, rs(e)), gt.empty, c, t.time, l ?? n.prevComposition);
  } else return (i = t.getMeta("rebased")) ? new $t(n.done.rebased(t, i), n.undone.rebased(t, i), so(n.prevRanges, t.mapping), n.prevTime, n.prevComposition) : new $t(n.done.addMaps(t.mapping.maps), n.undone.addMaps(t.mapping.maps), so(n.prevRanges, t.mapping), n.prevTime, n.prevComposition);
}
function J1(n, e) {
  if (!e)
    return !1;
  if (!n.docChanged)
    return !0;
  let t = !1;
  return n.mapping.maps[0].forEach((r, s) => {
    for (let i = 0; i < e.length; i += 2)
      r <= e[i + 1] && s >= e[i] && (t = !0);
  }), t;
}
function $c(n) {
  let e = [];
  for (let t = n.length - 1; t >= 0 && e.length == 0; t--)
    n[t].forEach((r, s, i, o) => e.push(i, o));
  return e;
}
function so(n, e) {
  if (!n)
    return null;
  let t = [];
  for (let r = 0; r < n.length; r += 2) {
    let s = e.map(n[r], 1), i = e.map(n[r + 1], -1);
    s <= i && t.push(s, i);
  }
  return t;
}
function G1(n, e, t) {
  let r = rs(e), s = xn.get(e).spec.config, i = (t ? n.undone : n.done).popEvent(e, r);
  if (!i)
    return null;
  let o = i.selection.resolve(i.transform.doc), l = (t ? n.done : n.undone).addTransform(i.transform, e.selection.getBookmark(), s, r), a = new $t(t ? l : i.remaining, t ? i.remaining : l, null, 0, -1);
  return i.transform.setSelection(o).setMeta(xn, { redo: t, historyState: a });
}
let io = !1, Hc = null;
function rs(n) {
  let e = n.plugins;
  if (Hc != e) {
    io = !1, Hc = e;
    for (let t = 0; t < e.length; t++)
      if (e[t].spec.historyPreserveItems) {
        io = !0;
        break;
      }
  }
  return io;
}
const xn = new Re("history"), Y1 = new Re("closeHistory");
function X1(n = {}) {
  return n = {
    depth: n.depth || 100,
    newGroupDelay: n.newGroupDelay || 500
  }, new ge({
    key: xn,
    state: {
      init() {
        return new $t(gt.empty, gt.empty, null, 0, -1);
      },
      apply(e, t, r) {
        return K1(t, r, e, n);
      }
    },
    config: n,
    props: {
      handleDOMEvents: {
        beforeinput(e, t) {
          let r = t.inputType, s = r == "historyUndo" ? nh : r == "historyRedo" ? rh : null;
          return !s || !e.editable ? !1 : (t.preventDefault(), s(e.state, e.dispatch));
        }
      }
    }
  });
}
function th(n, e) {
  return (t, r) => {
    let s = xn.getState(t);
    if (!s || (n ? s.undone : s.done).eventCount == 0)
      return !1;
    if (r) {
      let i = G1(s, t, n);
      i && r(e ? i.scrollIntoView() : i);
    }
    return !0;
  };
}
const nh = th(!1, !0), rh = th(!0, !0);
Ee.create({
  name: "characterCount",
  addOptions() {
    return {
      limit: null,
      mode: "textSize",
      textCounter: (n) => n.length,
      wordCounter: (n) => n.split(" ").filter((e) => e !== "").length
    };
  },
  addStorage() {
    return {
      characters: () => 0,
      words: () => 0
    };
  },
  onBeforeCreate() {
    this.storage.characters = (n) => {
      const e = (n == null ? void 0 : n.node) || this.editor.state.doc;
      if (((n == null ? void 0 : n.mode) || this.options.mode) === "textSize") {
        const r = e.textBetween(0, e.content.size, void 0, " ");
        return this.options.textCounter(r);
      }
      return e.nodeSize;
    }, this.storage.words = (n) => {
      const e = (n == null ? void 0 : n.node) || this.editor.state.doc, t = e.textBetween(0, e.content.size, " ", " ");
      return this.options.wordCounter(t);
    };
  },
  addProseMirrorPlugins() {
    let n = !1;
    return [
      new ge({
        key: new Re("characterCount"),
        appendTransaction: (e, t, r) => {
          if (n)
            return;
          const s = this.options.limit;
          if (s == null || s === 0) {
            n = !0;
            return;
          }
          const i = this.storage.characters({ node: r.doc });
          if (i > s) {
            const o = i - s, l = 0, a = o;
            console.warn(
              `[CharacterCount] Initial content exceeded limit of ${s} characters. Content was automatically trimmed.`
            );
            const c = r.tr.deleteRange(l, a);
            return n = !0, c;
          }
          n = !0;
        },
        filterTransaction: (e, t) => {
          const r = this.options.limit;
          if (!e.docChanged || r === 0 || r === null || r === void 0)
            return !0;
          const s = this.storage.characters({ node: t.doc }), i = this.storage.characters({ node: e.doc });
          if (i <= r || s > r && i > r && i <= s)
            return !0;
          if (s > r && i > r && i > s || !e.getMeta("paste"))
            return !1;
          const l = e.selection.$head.pos, a = i - r, c = l - a, u = l;
          return e.deleteRange(c, u), !(this.storage.characters({ node: e.doc }) > r);
        }
      })
    ];
  }
});
var Q1 = Ee.create({
  name: "dropCursor",
  addOptions() {
    return {
      color: "currentColor",
      width: 1,
      class: void 0
    };
  },
  addProseMirrorPlugins() {
    return [L1(this.options)];
  }
});
Ee.create({
  name: "focus",
  addOptions() {
    return {
      className: "has-focus",
      mode: "all"
    };
  },
  addProseMirrorPlugins() {
    return [
      new ge({
        key: new Re("focus"),
        props: {
          decorations: ({ doc: n, selection: e }) => {
            const { isEditable: t, isFocused: r } = this.editor, { anchor: s } = e, i = [];
            if (!t || !r)
              return me.create(n, []);
            let o = 0;
            this.options.mode === "deepest" && n.descendants((a, c) => {
              if (a.isText)
                return;
              if (!(s >= c && s <= c + a.nodeSize - 1))
                return !1;
              o += 1;
            });
            let l = 0;
            return n.descendants((a, c) => {
              if (a.isText || !(s >= c && s <= c + a.nodeSize - 1))
                return !1;
              if (l += 1, this.options.mode === "deepest" && o - l > 0 || this.options.mode === "shallowest" && l > 1)
                return this.options.mode === "deepest";
              i.push(
                qe.node(c, c + a.nodeSize, {
                  class: this.options.className
                })
              );
            }), me.create(n, i);
          }
        }
      })
    ];
  }
});
var Z1 = Ee.create({
  name: "gapCursor",
  addProseMirrorPlugins() {
    return [F1()];
  },
  extendNodeSchema(n) {
    var e;
    const t = {
      name: n.name,
      options: n.options,
      storage: n.storage
    };
    return {
      allowGapCursor: (e = oe($(n, "allowGapCursor", t))) != null ? e : null
    };
  }
});
Ee.create({
  name: "placeholder",
  addOptions() {
    return {
      emptyEditorClass: "is-editor-empty",
      emptyNodeClass: "is-empty",
      placeholder: "Write something …",
      showOnlyWhenEditable: !0,
      showOnlyCurrent: !0,
      includeChildren: !1
    };
  },
  addProseMirrorPlugins() {
    return [
      new ge({
        key: new Re("placeholder"),
        props: {
          decorations: ({ doc: n, selection: e }) => {
            const t = this.editor.isEditable || !this.options.showOnlyWhenEditable, { anchor: r } = e, s = [];
            if (!t)
              return null;
            const i = this.editor.isEmpty;
            return n.descendants((o, l) => {
              const a = r >= l && r <= l + o.nodeSize, c = !o.isLeaf && pi(o);
              if ((a || !this.options.showOnlyCurrent) && c) {
                const u = [this.options.emptyNodeClass];
                i && u.push(this.options.emptyEditorClass);
                const d = qe.node(l, l + o.nodeSize, {
                  class: u.join(" "),
                  "data-placeholder": typeof this.options.placeholder == "function" ? this.options.placeholder({
                    editor: this.editor,
                    node: o,
                    pos: l,
                    hasAnchor: a
                  }) : this.options.placeholder
                });
                s.push(d);
              }
              return this.options.includeChildren;
            }), me.create(n, s);
          }
        }
      })
    ];
  }
});
var Jk = Ee.create({
  name: "selection",
  addOptions() {
    return {
      className: "selection"
    };
  },
  addProseMirrorPlugins() {
    const { editor: n, options: e } = this;
    return [
      new ge({
        key: new Re("selection"),
        props: {
          decorations(t) {
            return t.selection.empty || n.isFocused || !n.isEditable || uf(t.selection) || n.view.dragging ? null : me.create(t.doc, [
              qe.inline(t.selection.from, t.selection.to, {
                class: e.className
              })
            ]);
          }
        }
      })
    ];
  }
});
function Uc({ types: n, node: e }) {
  return e && Array.isArray(n) && n.includes(e.type) || (e == null ? void 0 : e.type) === n;
}
var ek = Ee.create({
  name: "trailingNode",
  addOptions() {
    return {
      node: void 0,
      notAfter: []
    };
  },
  addProseMirrorPlugins() {
    var n;
    const e = new Re(this.name), t = this.options.node || ((n = this.editor.schema.topNodeType.contentMatch.defaultType) == null ? void 0 : n.name) || "paragraph", r = Object.entries(this.editor.schema.nodes).map(([, s]) => s).filter((s) => (this.options.notAfter || []).concat(t).includes(s.name));
    return [
      new ge({
        key: e,
        appendTransaction: (s, i, o) => {
          const { doc: l, tr: a, schema: c } = o, u = e.getState(o), d = l.content.size, f = c.nodes[t];
          if (u)
            return a.insert(d, f.create());
        },
        state: {
          init: (s, i) => {
            const o = i.tr.doc.lastChild;
            return !Uc({ node: o, types: r });
          },
          apply: (s, i) => {
            if (!s.docChanged || s.getMeta("__uniqueIDTransaction"))
              return i;
            const o = s.doc.lastChild;
            return !Uc({ node: o, types: r });
          }
        }
      })
    ];
  }
}), tk = Ee.create({
  name: "undoRedo",
  addOptions() {
    return {
      depth: 100,
      newGroupDelay: 500
    };
  },
  addCommands() {
    return {
      undo: () => ({ state: n, dispatch: e }) => nh(n, e),
      redo: () => ({ state: n, dispatch: e }) => rh(n, e)
    };
  },
  addProseMirrorPlugins() {
    return [X1(this.options)];
  },
  addKeyboardShortcuts() {
    return {
      "Mod-z": () => this.editor.commands.undo(),
      "Shift-Mod-z": () => this.editor.commands.redo(),
      "Mod-y": () => this.editor.commands.redo(),
      // Russian keyboard layouts
      "Mod-я": () => this.editor.commands.undo(),
      "Shift-Mod-я": () => this.editor.commands.redo()
    };
  }
}), nk = Ee.create({
  name: "starterKit",
  addExtensions() {
    var n, e, t, r;
    const s = [];
    return this.options.bold !== !1 && s.push(Ox.configure(this.options.bold)), this.options.blockquote !== !1 && s.push(Ex.configure(this.options.blockquote)), this.options.bulletList !== !1 && s.push(Hf.configure(this.options.bulletList)), this.options.code !== !1 && s.push(Ix.configure(this.options.code)), this.options.codeBlock !== !1 && s.push(_x.configure(this.options.codeBlock)), this.options.document !== !1 && s.push(Bx.configure(this.options.document)), this.options.dropcursor !== !1 && s.push(Q1.configure(this.options.dropcursor)), this.options.gapcursor !== !1 && s.push(Z1.configure(this.options.gapcursor)), this.options.hardBreak !== !1 && s.push(Fx.configure(this.options.hardBreak)), this.options.heading !== !1 && s.push(Vx.configure(this.options.heading)), this.options.undoRedo !== !1 && s.push(tk.configure(this.options.undoRedo)), this.options.horizontalRule !== !1 && s.push(If.configure(this.options.horizontalRule)), this.options.italic !== !1 && s.push(Ux.configure(this.options.italic)), this.options.listItem !== !1 && s.push(Uf.configure(this.options.listItem)), this.options.listKeymap !== !1 && s.push(Yf.configure((n = this.options) == null ? void 0 : n.listKeymap)), this.options.link !== !1 && s.push(m1.configure((e = this.options) == null ? void 0 : e.link)), this.options.orderedList !== !1 && s.push(Qf.configure(this.options.orderedList)), this.options.paragraph !== !1 && s.push(A1.configure(this.options.paragraph)), this.options.strike !== !1 && s.push(R1.configure(this.options.strike)), this.options.text !== !1 && s.push(D1.configure(this.options.text)), this.options.underline !== !1 && s.push(I1.configure((t = this.options) == null ? void 0 : t.underline)), this.options.trailingNode !== !1 && s.push(ek.configure((r = this.options) == null ? void 0 : r.trailingNode)), s;
  }
}), rk = nk;
const sh = ({
  value: n,
  onValueChange: e,
  className: t,
  placeholder: r = "Nhập nội dung..."
}) => {
  const s = yx({
    extensions: [rk],
    content: n || "",
    editorProps: {
      attributes: {
        class: "min-h-[160px] w-full rounded-xl bg-surface-alt px-3 py-2 text-sm text-text-primary focus:outline-none",
        "data-placeholder": r
      }
    },
    onUpdate({ editor: i }) {
      const o = i.getHTML();
      e == null || e(o);
    }
  });
  return U.useEffect(() => {
    if (!s) return;
    const i = s.getHTML(), o = n || "";
    i !== o && s.commands.setContent(o, { emitUpdate: !1 });
  }, [s, n]), s ? /* @__PURE__ */ S.jsx(
    "div",
    {
      className: Ce(
        pe(
          "rounded-xl border border-slate-200 bg-surface",
          "focus-within:ring-2 focus-within:ring-primary-500",
          t
        )
      ),
      children: /* @__PURE__ */ S.jsx(dx, { editor: s })
    }
  ) : null;
};
sh.displayName = "TiptapEditor";
const ih = (n) => n.replace(/[^0-9a-zA-Z]/g, ""), Wc = (n, e, t) => {
  const r = ih(e);
  let s = 0, i = "";
  for (let o = 0; o < n.length; o++) {
    const l = n[o];
    if (l === t)
      if (s < r.length)
        i += r[s], s++;
      else
        break;
    else
      i += l;
  }
  return i;
}, sk = U.forwardRef(
  ({ className: n, mask: e, placeholderChar: t = "X", onChange: r, error: s, value: i, defaultValue: o, ...l }, a) => {
    const c = en(), [u, d] = U.useState(
      (i ?? o ?? "").toString()
    ), f = U.useMemo(
      () => Wc(e, u, t),
      [e, u, t]
    );
    U.useEffect(() => {
      i !== void 0 && d(i.toString());
    }, [i]);
    const h = (p) => {
      const m = p.target.value, g = ih(m);
      d(g);
      const y = Wc(e, g, t);
      c(
        Lt.UI_CHANGE,
        { value: y, masked: y, raw: g },
        { meta: { component: "MaskedInput" } }
      ), r == null || r(y, g);
    };
    return /* @__PURE__ */ S.jsx(
      "input",
      {
        ref: a,
        value: f,
        className: Ce(
          pe(
            "flex h-10 w-full rounded-xl bg-surface-alt px-3 py-2 text-sm placeholder:text-text-muted",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "transition-all duration-200",
            s && "ring-2 ring-red-500 focus-visible:ring-red-500",
            n
          )
        ),
        onChange: h,
        ...l
      }
    );
  }
);
sk.displayName = "MaskedInput";
const ik = U.forwardRef(
  ({
    className: n,
    min: e = 0,
    max: t = 100,
    step: r = 1,
    value: s,
    defaultValue: i = e,
    showValue: o = !0,
    variant: l = "default",
    onChange: a,
    style: c,
    ...u
  }, d) => {
    const f = en(), [h, p] = U.useState(i), m = s ?? h, g = (v) => {
      const x = Number(v.target.value);
      s === void 0 && p(x), f(Lt.UI_CHANGE, { value: x }, { meta: { component: "Slider" } }), a == null || a(x);
    }, y = (m - e) / (t - e) * 100, k = {
      default: "bg-primary-500",
      success: "bg-emerald-500",
      error: "bg-rose-500",
      warning: "bg-amber-400",
      info: "bg-sky-500"
    }, C = {
      default: {},
      success: { accentColor: "#10b981" },
      error: { accentColor: "#f43f5e" },
      warning: { accentColor: "#fbbf24" },
      info: { accentColor: "#0ea5e9" }
    };
    return /* @__PURE__ */ S.jsxs("div", { className: Ce(pe("flex w-full flex-col gap-2", n)), children: [
      o && /* @__PURE__ */ S.jsxs("div", { className: "flex justify-between text-xs text-text-muted", children: [
        /* @__PURE__ */ S.jsx("span", { children: e }),
        /* @__PURE__ */ S.jsx("span", { className: "font-medium text-text-primary", children: m }),
        /* @__PURE__ */ S.jsx("span", { children: t })
      ] }),
      /* @__PURE__ */ S.jsxs("div", { className: "relative flex items-center", children: [
        /* @__PURE__ */ S.jsx("div", { className: "pointer-events-none absolute h-1 w-full rounded-full bg-slate-200" }),
        /* @__PURE__ */ S.jsx(
          "div",
          {
            className: pe(
              "pointer-events-none absolute h-1 rounded-full",
              k[l]
            ),
            style: { width: `${y}%` }
          }
        ),
        /* @__PURE__ */ S.jsx(
          "input",
          {
            ref: d,
            type: "range",
            min: e,
            max: t,
            step: r,
            value: m,
            onChange: g,
            className: "relative w-full appearance-none bg-transparent",
            style: { ...c, ...C[l] },
            ...u
          }
        )
      ] })
    ] });
  }
);
ik.displayName = "Slider";
const oo = (n) => {
  if (!Number.isFinite(n)) return "";
  if (n < 1024) return `${n} B`;
  const e = n / 1024;
  return e < 1024 ? `${e.toFixed(1)} KB` : `${(e / 1024).toFixed(1)} MB`;
}, _n = (n) => `${n.name}-${n.size}-${n.lastModified}`, ok = (n) => {
  const e = n.split("?")[0].split("#")[0], t = e.split("/").pop() || e, r = t.lastIndexOf(".");
  return r <= 0 ? "" : t.slice(r + 1).toLowerCase();
}, lk = (n) => {
  const e = n.toLowerCase();
  return ["pdf"].includes(e) ? { label: "PDF", className: "bg-red-500 text-white" } : ["doc", "docx"].includes(e) ? { label: "W", className: "bg-blue-600 text-white" } : ["xls", "xlsx", "csv"].includes(e) ? { label: "X", className: "bg-emerald-600 text-white" } : ["ppt", "pptx"].includes(e) ? { label: "P", className: "bg-orange-500 text-white" } : ["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(e) ? { icon: op, className: "bg-teal-500 text-white" } : ["mp4", "mov", "webm", "mkv"].includes(e) ? { icon: ap, className: "bg-fuchsia-500 text-white" } : ["mp3", "wav", "ogg", "m4a"].includes(e) ? { icon: sp, className: "bg-indigo-500 text-white" } : ["zip", "rar", "7z", "tar", "gz"].includes(e) ? { icon: np, className: "bg-amber-500 text-white" } : { icon: up, className: "bg-slate-100 text-text-secondary" };
}, lo = ({ file: n, previewUrl: e }) => {
  if (e)
    return /* @__PURE__ */ S.jsx("img", { src: e, alt: n.name, className: "h-10 w-10 shrink-0 rounded-xl object-cover" });
  const t = ok(n.name), r = lk(t);
  return /* @__PURE__ */ S.jsx("div", { className: Ce(pe("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", r.className)), children: r.label ? /* @__PURE__ */ S.jsx("span", { className: "text-xs font-extrabold tracking-wide", children: r.label }) : r.icon ? /* @__PURE__ */ S.jsx(nu, { icon: r.icon, size: "md", variant: r.className.includes("text-white") ? "white" : "default" }) : null });
}, ao = ({ disabled: n, onClick: e }) => /* @__PURE__ */ S.jsx(
  ho,
  {
    icon: ru,
    size: "xs",
    variant: "muted",
    onClick: e,
    disabled: n,
    "aria-label": "Remove file",
    className: "shrink-0"
  }
), oh = U.forwardRef(
  ({
    className: n,
    files: e,
    imagePreviews: t,
    layout: r = "vertical",
    disabled: s = !1,
    allowRemove: i = !0,
    onRemove: o,
    ...l
  }, a) => e.length ? r === "horizontal" ? /* @__PURE__ */ S.jsx("div", { ref: a, className: n, ...l, children: /* @__PURE__ */ S.jsx(wh, { autoHide: !0, direction: "horizontal", className: "mt-2", children: /* @__PURE__ */ S.jsx("div", { className: "flex gap-2 pr-1", children: e.map((c, u) => {
    const d = t == null ? void 0 : t[_n(c)];
    return /* @__PURE__ */ S.jsxs(
      "div",
      {
        className: Ce(
          pe(
            "flex w-64 shrink-0 items-center gap-3 rounded-2xl bg-surface px-3 py-2 ring-1 ring-slate-200",
            s && "opacity-60"
          )
        ),
        children: [
          /* @__PURE__ */ S.jsx(lo, { file: c, previewUrl: d }),
          /* @__PURE__ */ S.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ S.jsx("div", { className: "truncate font-medium text-text", children: c.name }),
            /* @__PURE__ */ S.jsx("div", { className: "text-xs text-text-muted", children: oo(c.size) })
          ] }),
          i && /* @__PURE__ */ S.jsx(ao, { disabled: s, onClick: () => o == null ? void 0 : o(u) })
        ]
      },
      _n(c)
    );
  }) }) }) }) : r === "wrap" ? /* @__PURE__ */ S.jsx("div", { ref: a, className: Ce(pe("mt-2", n)), ...l, children: /* @__PURE__ */ S.jsx("div", { className: "flex flex-wrap gap-2", children: e.map((c, u) => {
    const d = t == null ? void 0 : t[_n(c)];
    return /* @__PURE__ */ S.jsxs(
      "div",
      {
        className: Ce(
          pe(
            "flex w-full items-center gap-3 rounded-2xl bg-surface px-3 py-2 ring-1 ring-slate-200 sm:w-64",
            s && "opacity-60"
          )
        ),
        children: [
          /* @__PURE__ */ S.jsx(lo, { file: c, previewUrl: d }),
          /* @__PURE__ */ S.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ S.jsx("div", { className: "truncate font-medium text-text", children: c.name }),
            /* @__PURE__ */ S.jsx("div", { className: "text-xs text-text-muted", children: oo(c.size) })
          ] }),
          i && /* @__PURE__ */ S.jsx(ao, { disabled: s, onClick: () => o == null ? void 0 : o(u) })
        ]
      },
      _n(c)
    );
  }) }) }) : /* @__PURE__ */ S.jsx("div", { ref: a, className: Ce(pe("mt-2", n)), ...l, children: /* @__PURE__ */ S.jsx("ul", { className: "space-y-1 text-left text-sm text-text-secondary", children: e.map((c, u) => {
    const d = t == null ? void 0 : t[_n(c)];
    return /* @__PURE__ */ S.jsxs(
      "li",
      {
        className: "flex items-center gap-3 rounded-2xl bg-surface px-3 py-2 ring-1 ring-slate-200",
        children: [
          /* @__PURE__ */ S.jsx(lo, { file: c, previewUrl: d }),
          /* @__PURE__ */ S.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ S.jsx("div", { className: "truncate font-medium text-text", children: c.name }),
            /* @__PURE__ */ S.jsx("div", { className: "text-xs text-text-muted", children: oo(c.size) })
          ] }),
          i && /* @__PURE__ */ S.jsx(ao, { disabled: s, onClick: () => o == null ? void 0 : o(u) })
        ]
      },
      _n(c)
    );
  }) }) }) : null
);
oh.displayName = "FileUploaderSelectedFiles";
const qc = (n) => `${n.name}-${n.size}-${n.lastModified}`, ak = (n, e) => {
  if (!n) return !0;
  const t = n.split(",").map((i) => i.trim()).filter(Boolean);
  if (!t.length) return !0;
  const r = e.name.toLowerCase(), s = (e.type || "").toLowerCase();
  return t.some((i) => {
    const o = i.toLowerCase();
    if (!o) return !0;
    if (o.startsWith("."))
      return r.endsWith(o);
    if (o.includes("/")) {
      if (o.endsWith("/*")) {
        const l = o.slice(0, -1);
        return s.startsWith(l);
      }
      return s === o;
    }
    return !0;
  });
}, lh = U.forwardRef(
  ({
    className: n,
    value: e,
    defaultValue: t,
    multiple: r = !1,
    appendOnSelect: s,
    accept: i,
    maxSizeMb: o = 5,
    maxFiles: l,
    disabled: a = !1,
    mode: c = "dropzone",
    size: u = "md",
    variant: d = "outline",
    dropLabel: f = "Drag & drop files here",
    browseLabel: h = "Browse files",
    helperText: p,
    showFileList: m = !0,
    fileListLayout: g = "vertical",
    allowRemove: y = !0,
    allowClear: k = !0,
    onValueChange: C,
    onFilesSelected: v,
    ...x
  }, E) => {
    const M = en(), D = U.useRef(null), [L, z] = U.useState(!1), [X, F] = U.useState(null), V = e !== void 0, [W, J] = U.useState(t ?? []), Q = V ? e ?? [] : W, [re, Z] = U.useState({});
    U.useEffect(() => {
      var K;
      const te = {};
      for (const Se of Q)
        (K = Se.type) != null && K.startsWith("image/") && (te[qc(Se)] = URL.createObjectURL(Se));
      return Z(te), () => {
        for (const Se of Object.values(te))
          URL.revokeObjectURL(Se);
      };
    }, [Q]);
    const ee = (te) => {
      V || J(te), M(
        Lt.UI_CHANGE,
        { files: te.map((K) => ({ name: K.name, size: K.size, type: K.type })) },
        { meta: { component: "FileUploader" }, flags: { sensitive: !0 } }
      ), v == null || v(te), C == null || C(te);
    }, ye = (te) => {
      if (!te) return;
      const K = Array.from(te), Se = r ? K : K.slice(0, 1), it = r && (s ?? !0) ? [...Q, ...Se] : Se, Nn = /* @__PURE__ */ new Set(), On = [];
      for (const R of it) {
        const O = qc(R);
        Nn.has(O) || (Nn.add(O), On.push(R));
      }
      const Rn = typeof l == "number" ? l : r ? void 0 : 1, Dn = Rn ? On.slice(0, Math.max(0, Rn)) : On, b = !!Rn && On.length > Rn, w = o * 1024 * 1024, T = Dn.find((R) => R.size > w);
      if (T) {
        F(`File "${T.name}" exceeds ${o}MB limit`);
        return;
      }
      const P = Dn.find((R) => !ak(i, R));
      if (P) {
        F(`File "${P.name}" is not an allowed type`);
        return;
      }
      F(b ? `Only ${Rn} file(s) allowed` : null), ee(Dn), D.current && (D.current.value = "");
    }, _e = (te) => {
      ye(te.target.files);
    }, We = (te) => {
      te.preventDefault(), te.stopPropagation(), !a && (z(!1), ye(te.dataTransfer.files));
    }, Oe = (te) => {
      te.preventDefault(), te.stopPropagation(), !a && z(!0);
    }, ne = (te) => {
      te.preventDefault(), te.stopPropagation(), !a && z(!1);
    }, be = () => {
      var te;
      a || (te = D.current) == null || te.click();
    }, de = (te) => {
      F(null);
      const K = Q.filter((Se, Ct) => Ct !== te);
      ee(K);
    }, xe = () => {
      F(null), ee([]);
    }, Be = u === "sm" ? "gap-2 rounded-xl p-4" : u === "lg" ? "gap-4 rounded-3xl p-8" : "gap-3 rounded-2xl p-6", Ge = d === "soft" ? "border border-slate-200 bg-surface" : "border border-dashed border-slate-300 bg-surface-alt", on = p ?? `${r ? "Multiple files supported." : "Single file only."} Max ${o}MB each.`;
    return /* @__PURE__ */ S.jsxs(
      "div",
      {
        ref: E,
        className: Ce(
          pe(
            "flex flex-col text-center",
            Be,
            Ge,
            L && !a && "border-primary-500 bg-primary-50",
            a && "opacity-60",
            n
          )
        ),
        onDrop: c === "dropzone" ? We : void 0,
        onDragOver: c === "dropzone" ? Oe : void 0,
        onDragLeave: c === "dropzone" ? ne : void 0,
        role: c === "dropzone" ? "button" : void 0,
        tabIndex: c === "dropzone" && !a ? 0 : void 0,
        "aria-disabled": a || void 0,
        onKeyDown: (te) => {
          c === "dropzone" && (a || (te.key === "Enter" || te.key === " ") && (te.preventDefault(), be()));
        },
        ...x,
        children: [
          /* @__PURE__ */ S.jsx(
            "input",
            {
              ref: D,
              type: "file",
              className: "hidden",
              multiple: r,
              accept: i,
              onChange: _e
            }
          ),
          /* @__PURE__ */ S.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
            c === "dropzone" && /* @__PURE__ */ S.jsx("p", { className: "text-base font-medium text-text-primary", children: f }),
            c === "dropzone" && /* @__PURE__ */ S.jsx("p", { className: "text-sm text-text-muted", children: "or" }),
            /* @__PURE__ */ S.jsx(
              "button",
              {
                type: "button",
                disabled: a,
                onClick: be,
                className: Ce(
                  pe(
                    "rounded-full bg-primary-500 text-sm font-medium text-white hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-60",
                    u === "sm" ? "px-3 py-1.5" : u === "lg" ? "px-5 py-2.5" : "px-4 py-2"
                  )
                ),
                children: h
              }
            ),
            /* @__PURE__ */ S.jsx("p", { className: "text-xs text-text-muted", children: on })
          ] }),
          X && /* @__PURE__ */ S.jsx("p", { className: "text-sm text-red-500", children: X }),
          Q.length > 0 && k && /* @__PURE__ */ S.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ S.jsx(
            "button",
            {
              type: "button",
              disabled: a,
              onClick: xe,
              className: "text-xs font-medium text-text-muted underline underline-offset-2 hover:text-text",
              children: "Clear"
            }
          ) }),
          m && /* @__PURE__ */ S.jsx(
            oh,
            {
              files: Q,
              imagePreviews: re,
              layout: g,
              disabled: a,
              allowRemove: y,
              onRemove: de
            }
          )
        ]
      }
    );
  }
);
lh.displayName = "FileUploader";
const ck = U.forwardRef(
  ({
    className: n,
    name: e,
    value: t,
    defaultValue: r,
    onValueChange: s,
    onChange: i,
    disabled: o = !1,
    accept: l = "image/*",
    shape: a = "circle",
    size: c = "md",
    alt: u,
    placeholder: d,
    allowClear: f = !0,
    allowReplace: h = !0,
    onBlur: p,
    ...m
  }, g) => {
    const y = U.useRef(null), k = t !== void 0, [C, v] = U.useState(r ?? null), x = k ? t ?? null : C, [E, M] = U.useState(null);
    U.useEffect(() => {
      if (!(x instanceof File)) {
        M(null);
        return;
      }
      const Z = URL.createObjectURL(x);
      return M(Z), () => {
        URL.revokeObjectURL(Z);
      };
    }, [x]);
    const D = typeof x == "string" ? x : E, L = (Z) => {
      k || v(Z), s == null || s(Z), i == null || i(Z);
    }, z = () => {
      var Z;
      o || (Z = y.current) == null || Z.click();
    }, X = () => {
      o || (L(null), y.current && (y.current.value = ""));
    }, F = (Z) => {
      if (!Z || Z.length === 0) return;
      const ee = Z[0];
      ee && (L(ee), y.current && (y.current.value = ""));
    }, V = !!D, Q = Ce(
      pe(
        "relative flex items-center justify-center overflow-hidden bg-slate-100 text-sm font-medium text-slate-600 ring-1 ring-slate-200",
        a === "circle" && "rounded-full",
        a !== "circle" && "rounded-2xl",
        a === "rect" ? {
          sm: "h-20 w-full",
          md: "h-28 w-full",
          lg: "h-36 w-full"
        }[c] : {
          sm: "h-16 w-16",
          md: "h-24 w-24",
          lg: "h-32 w-32"
        }[c],
        !o && "cursor-pointer",
        o && "opacity-60"
      )
    ), re = d ?? /* @__PURE__ */ S.jsx(nu, { icon: fp, size: c === "sm" ? "lg" : c === "md" ? "xl" : "2xl", variant: "muted" });
    return /* @__PURE__ */ S.jsxs("div", { ref: g, className: Ce(pe("relative inline-block", a === "rect" && "w-full", n)), ...m, children: [
      /* @__PURE__ */ S.jsx(
        "input",
        {
          ref: y,
          type: "file",
          accept: l,
          className: "hidden",
          onChange: (Z) => F(Z.target.files),
          disabled: o
        }
      ),
      /* @__PURE__ */ S.jsx(
        "button",
        {
          type: "button",
          id: e,
          name: e,
          onClick: z,
          onBlur: p,
          disabled: o,
          className: Q,
          "aria-label": V ? "Replace image" : "Upload image",
          children: D ? /* @__PURE__ */ S.jsx("img", { src: D, alt: u, className: "h-full w-full object-cover" }) : /* @__PURE__ */ S.jsx("div", { className: "flex items-center justify-center px-3 text-center", children: typeof re == "string" ? /* @__PURE__ */ S.jsx("span", { className: "text-text-muted", children: re }) : re })
        }
      ),
      (h || f) && V && !o && /* @__PURE__ */ S.jsxs("div", { className: "absolute right-2 top-2 flex gap-1", children: [
        h && /* @__PURE__ */ S.jsx(
          ho,
          {
            icon: pp,
            size: "xs",
            variant: "muted",
            disableHover: !0,
            className: "bg-white/90 ring-1 ring-slate-200 hover:bg-white",
            "aria-label": "Replace",
            onClick: (Z) => {
              Z.stopPropagation(), z();
            }
          }
        ),
        f && /* @__PURE__ */ S.jsx(
          ho,
          {
            icon: ru,
            size: "xs",
            variant: "muted",
            disableHover: !0,
            className: "bg-white/90 ring-1 ring-slate-200 hover:bg-white",
            "aria-label": "Remove",
            onClick: (Z) => {
              Z.stopPropagation(), X();
            }
          }
        )
      ] })
    ] });
  }
);
ck.displayName = "AvatarUpload";
const Kc = (n, e, t) => {
  if (n && "reportValidity" in n) {
    const r = I(t, e);
    n.setCustomValidity(r && r.message || ""), n.reportValidity();
  }
}, ah = (n, e) => {
  for (const t in e.fields) {
    const r = e.fields[t];
    r && r.ref && "reportValidity" in r.ref ? Kc(r.ref, t, n) : r.refs && r.refs.forEach((s) => Kc(s, t, n));
  }
}, uk = (n, e) => {
  e.shouldUseNativeValidation && ah(n, e);
  const t = {};
  for (const r in n) {
    const s = I(e.fields, r), i = Object.assign(n[r] || {}, { ref: s && s.ref });
    if (dk(e.names || Object.keys(n), r)) {
      const o = Object.assign({}, I(t, r));
      se(o, "root", i), se(t, r, o);
    } else se(t, r, i);
  }
  return t;
}, dk = (n, e) => n.some((t) => t.startsWith(e + "."));
var fk = function(n, e) {
  for (var t = {}; n.length; ) {
    var r = n[0], s = r.code, i = r.message, o = r.path.join(".");
    if (!t[o]) if ("unionErrors" in r) {
      var l = r.unionErrors[0].errors[0];
      t[o] = { message: l.message, type: l.code };
    } else t[o] = { message: i, type: s };
    if ("unionErrors" in r && r.unionErrors.forEach(function(u) {
      return u.errors.forEach(function(d) {
        return n.push(d);
      });
    }), e) {
      var a = t[o].types, c = a && a[r.code];
      t[o] = au(o, e, t, s, c ? [].concat(c, r.message) : r.message);
    }
    n.shift();
  }
  return t;
}, ch = function(n, e, t) {
  return t === void 0 && (t = {}), function(r, s, i) {
    try {
      return Promise.resolve(function(o, l) {
        try {
          var a = Promise.resolve(n[t.mode === "sync" ? "parse" : "parseAsync"](r, e)).then(function(c) {
            return i.shouldUseNativeValidation && ah({}, i), { errors: {}, values: t.raw ? r : c };
          });
        } catch (c) {
          return l(c);
        }
        return a && a.then ? a.then(void 0, l) : a;
      }(0, function(o) {
        if (function(l) {
          return Array.isArray(l == null ? void 0 : l.errors);
        }(o)) return { values: {}, errors: uk(fk(o.errors, !i.shouldUseNativeValidation && i.criteriaMode === "all"), i) };
        throw o;
      }));
    } catch (o) {
      return Promise.reject(o);
    }
  };
};
function hk({
  children: n,
  methods: e,
  onSubmit: t,
  onInvalid: r,
  options: s,
  className: i,
  schema: o,
  formRef: l,
  formId: a,
  instanceId: c,
  defaultValues: u,
  values: d,
  mode: f,
  reValidateMode: h,
  resolver: p,
  context: m,
  criteriaMode: g,
  shouldFocusError: y,
  shouldUnregister: k,
  shouldUseNativeValidation: C,
  delayError: v,
  resetOptions: x,
  ...E
}, M) {
  const D = en(), L = U.useRef(null);
  L.current || (L.current = Sh());
  const z = c ?? L.current, X = {
    defaultValues: u,
    values: d,
    mode: f,
    reValidateMode: h,
    resolver: p,
    context: m,
    criteriaMode: g,
    shouldFocusError: y,
    shouldUnregister: k,
    shouldUseNativeValidation: C,
    delayError: v,
    resetOptions: x,
    ...s || {}
  };
  o && !X.resolver && (X.resolver = ch(o));
  const F = e ?? ol(X), V = U.useRef(null), W = (ee) => {
    const ye = V.current;
    if (!ye) return;
    const _e = (ne, be = "") => {
      for (const de in ne) {
        const xe = ne[de];
        if (!xe) continue;
        const Be = be ? `${be}.${de}` : de;
        if (xe.message)
          return Be;
        if (typeof xe == "object") {
          const Ge = _e(xe, Be);
          if (Ge) return Ge;
        }
      }
    }, We = _e(ee);
    if (!We) return;
    const Oe = ye.querySelector(`[name="${We}"]`);
    Oe && typeof Oe.focus == "function" && (Oe.focus(), typeof Oe.scrollIntoView == "function" && Oe.scrollIntoView({ block: "center", behavior: "smooth" }));
  }, J = async (ee, ye) => {
    D(
      Lt.FORM_SUBMIT,
      { formData: ee, formId: a, instanceId: z },
      { meta: { component: "Form", formId: a, instanceId: z }, flags: { persist: !0 } }
    ), await (t == null ? void 0 : t(ee, ye));
  }, Q = async (ee, ye) => {
    D(
      Lt.FORM_VALIDATE,
      { success: !1, errors: ee, formId: a, instanceId: z },
      { meta: { component: "Form", formId: a, instanceId: z } }
    ), W(ee), await (r == null ? void 0 : r(ee, ye));
  }, re = F.handleSubmit(J, Q), Z = (ee) => {
    V.current = ee, typeof M == "function" ? M(ee) : M && (M.current = ee), l && "current" in l && (l.current = ee);
  };
  return /* @__PURE__ */ S.jsx(Ih, { ...F, children: /* @__PURE__ */ S.jsx("form", { ref: Z, className: i, onSubmit: re, ...E, children: n }) });
}
const uh = U.forwardRef(hk);
uh.displayName = "Form";
function Ys({
  name: n,
  render: e,
  children: t,
  label: r,
  required: s,
  helperText: i,
  control: o,
  ...l
}) {
  const { control: a } = tn(), c = e ?? t;
  if (!c)
    throw new Error("FormFieldController requires a render/children prop");
  return /* @__PURE__ */ S.jsx(
    _h,
    {
      control: o ?? a,
      name: n,
      render: ({ field: u, fieldState: d }) => {
        var f;
        return /* @__PURE__ */ S.jsxs(
          ll,
          {
            label: r,
            required: s,
            error: (f = d.error) == null ? void 0 : f.message,
            htmlFor: u.name,
            ...l,
            children: [
              c({ field: u, fieldState: d }),
              i && /* @__PURE__ */ S.jsx("p", { className: "text-xs text-text-muted", children: i })
            ]
          }
        );
      }
    }
  );
}
Ys.displayName = "FormFieldController";
var le = /* @__PURE__ */ ((n) => (n.STRING = "string", n.NUMBER = "number", n.INTEGER = "integer", n.BOOLEAN = "boolean", n.ARRAY = "array", n.OBJECT = "object", n.NULL = "null", n))(le || {}), cn = /* @__PURE__ */ ((n) => (n.STATIC = "static", n.VIEW_QUERY = "view_query", n.API = "api", n.LOOKUP = "lookup", n.TABLE = "table", n))(cn || {});
function er(n) {
  if (n == null) return;
  const e = typeof n == "number" ? n : Number(String(n).trim());
  return Number.isFinite(e) ? e : void 0;
}
function Xs(n) {
  var e, t;
  if (n.default !== void 0) return n.default;
  if (((e = n.ui) == null ? void 0 : e.widget) === "file")
    return (t = n.ui.file) != null && t.multiple ? [] : void 0;
  if (n.type === le.OBJECT) {
    const r = n.properties ?? {}, s = {};
    for (const i of Object.keys(r))
      s[i] = Xs(r[i]);
    return s;
  }
  if (n.type === le.ARRAY) {
    const r = er(n.minItems) ?? 0, s = n.items ?? { type: le.STRING };
    return Array.from({ length: r }, () => Xs(s));
  }
  if (n.type === le.STRING) return "";
  if (n.type === le.BOOLEAN) return !1;
}
function Jc(n) {
  return !!(n == null || typeof n == "string" && n.trim() === "" || Array.isArray(n) && n.length === 0);
}
function pk(n) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n);
}
function mk(n) {
  return /^\+?[0-9\s().-]{7,}$/.test(n);
}
function Qo(n) {
  return typeof File > "u" ? [] : n instanceof File ? [n] : Array.isArray(n) ? n.filter((e) => e instanceof File) : [];
}
function gk(n, e) {
  const t = n.trim();
  if (!t) return !0;
  if (t.includes("/")) {
    if (t.endsWith("/*")) {
      const r = t.slice(0, -1);
      return e.type.startsWith(r);
    }
    return e.type === t;
  }
  return t.startsWith(".") ? e.name.toLowerCase().endsWith(t.toLowerCase()) : !0;
}
function Gc(n) {
  if (n != null) {
    if (typeof n == "number") return Number.isFinite(n) ? n : void 0;
    if (typeof n == "string") {
      const e = n.trim();
      if (!e) return;
      const t = Number(e);
      return Number.isFinite(t) ? t : void 0;
    }
  }
}
function yk(n, e, t) {
  switch (n) {
    case "=":
      return e === t;
    case "!=":
      return e !== t;
    case ">":
      return (e ?? 0) > t;
    case ">=":
      return (e ?? 0) >= t;
    case "<":
      return (e ?? 0) < t;
    case "<=":
      return (e ?? 0) <= t;
    case "in":
      return Array.isArray(t) ? t.includes(e) : !1;
    case "not_in":
      return Array.isArray(t) ? !t.includes(e) : !1;
    case "contains":
      return typeof e == "string" ? e.includes(String(t)) : Array.isArray(e) ? e.includes(t) : !1;
    default:
      return !1;
  }
}
function Jl(n, e) {
  return e.split(".").reduce((t, r) => t == null ? void 0 : t[r], n);
}
function co(n) {
  return /^[0-9]+$/.test(n);
}
function or(n, e, t) {
  const r = e.split(".").filter(Boolean);
  if (!r.length) return;
  let s = n;
  for (let l = 0; l < r.length - 1; l++) {
    const a = r[l], c = r[l + 1], u = co(a) ? Number(a) : a, d = co(c);
    (s[u] === void 0 || s[u] === null || typeof s[u] != "object") && (s[u] = d ? [] : {}), s = s[u];
  }
  const i = r[r.length - 1], o = co(i) ? Number(i) : i;
  s[o] = { type: "schema", message: t };
}
function Sr(n) {
  return (n.validation ?? []).some((e) => e.type === "required");
}
function Gl(n) {
  var c;
  const { fieldSchema: e, values: t, baseRequired: r } = n;
  let s = !0, i = !0, o = r;
  const l = e.visibility ?? [];
  for (const u of l) {
    const d = Jl(t, u.when.field);
    if (yk(u.when.op, d, u.when.value))
      switch (u.effect) {
        case "show":
          s = !0;
          break;
        case "hide":
          s = !1;
          break;
        case "enable":
          i = !0;
          break;
        case "disable":
          i = !1;
          break;
        case "require":
          o = !0;
          break;
        case "unrequire":
          o = !1;
          break;
      }
  }
  return !!((c = e.ui) != null && c.readOnly) && (i = !1), { visible: s, enabled: i, required: o };
}
function dh(n, e = "") {
  var l;
  const t = n.properties ?? {}, r = Object.keys(t), s = (l = n.propertyOrdering) != null && l.length ? n.propertyOrdering.filter((a) => a in t) : r, i = s.length ? s : r, o = [];
  for (const a of i) {
    const c = t[a], u = e ? `${e}.${a}` : a;
    if (c.type === le.OBJECT) {
      o.push({ path: u, schema: c, parentSchema: n, key: a });
      const d = dh(c, u);
      o.push(...d);
      continue;
    }
    o.push({ path: u, schema: c, parentSchema: n, key: a });
  }
  return o;
}
function fh(n) {
  if (!n) return;
  if (typeof n == "number")
    return n;
  const e = {};
  return n.xs && (e.xs = n.xs), n.sm && (e.sm = n.sm), n.md && (e.md = n.md), n.lg && (e.lg = n.lg), n.xl && (e.xl = n.xl), n["2xl"] && (e["2xl"] = n["2xl"]), e;
}
function bk(n) {
  const e = /* @__PURE__ */ new Set(), t = (r) => {
    var s;
    if (r) {
      for (const i of r.visibility ?? [])
        (s = i == null ? void 0 : i.when) != null && s.field && e.add(i.when.field);
      if (r.type === le.OBJECT) {
        const i = r.properties ?? {};
        for (const o of Object.keys(i))
          t(i[o]);
      }
      r.type === le.ARRAY && t(r.items);
      for (const i of r.anyOf ?? [])
        t(i);
    }
  };
  return t(n), Array.from(e);
}
function xk(n) {
  return n.options.map((e) => ({ label: e.label, value: e.id }));
}
async function kk(n) {
  const { source: e, page: t, pageSize: r, search: s } = n, i = e.method ?? "GET";
  let o = e.url;
  const l = {
    "Content-Type": "application/json",
    ...e.headers ?? {}
  };
  let a;
  if (i === "GET") {
    const p = new URL(o, window.location.origin);
    p.searchParams.set("page", String(t)), p.searchParams.set("pageSize", String(r)), s && p.searchParams.set("search", s), o = p.toString();
  } else
    a = JSON.stringify({ page: t, pageSize: r, search: s });
  const u = await (await fetch(o, {
    method: i,
    headers: l,
    body: a
  })).json(), f = (Array.isArray(u) ? u : Array.isArray(u == null ? void 0 : u.data) ? u.data : Array.isArray(u == null ? void 0 : u.items) ? u.items : []).map((p) => ({
    value: String((p == null ? void 0 : p[e.mapping.value]) ?? ""),
    label: String((p == null ? void 0 : p[e.mapping.label]) ?? "")
  })), h = typeof (u == null ? void 0 : u.hasMore) == "boolean" ? u.hasMore : typeof (u == null ? void 0 : u.total) == "number" ? t * r < u.total : f.length >= r;
  return { data: f, hasMore: h };
}
function uo(n) {
  var i, o, l, a, c, u, d, f, h, p;
  const { schema: e, value: t, required: r } = n;
  if (r && Jc(t))
    return ((o = (i = e.validation) == null ? void 0 : i.find((g) => g.type === "required")) == null ? void 0 : o.message) ?? "Trường này là bắt buộc";
  if (r && e.type === le.BOOLEAN && t !== !0)
    return ((a = (l = e.validation) == null ? void 0 : l.find((g) => g.type === "required")) == null ? void 0 : a.message) ?? "Trường này là bắt buộc";
  if (Jc(t))
    return;
  if ((c = e.enum) != null && c.length && typeof t == "string" && !e.enum.includes(t))
    return "Giá trị không hợp lệ";
  if (e.pattern && typeof t == "string")
    try {
      if (!new RegExp(e.pattern).test(t)) return "Giá trị không đúng định dạng";
    } catch {
      return "Giá trị không đúng định dạng";
    }
  if (e.minLength && typeof t == "string") {
    const m = Number(e.minLength);
    if (Number.isFinite(m) && t.length < m) return `Tối thiểu ${m} ký tự`;
  }
  if (e.maxLength && typeof t == "string") {
    const m = Number(e.maxLength);
    if (Number.isFinite(m) && t.length > m) return `Tối đa ${m} ký tự`;
  }
  if ((e.type === le.NUMBER || e.type === le.INTEGER) && (e.minimum !== void 0 || e.maximum !== void 0)) {
    const m = Gc(t);
    if (m === void 0) return "Giá trị số không hợp lệ";
    if (e.minimum !== void 0 && m < e.minimum) return `Tối thiểu ${e.minimum}`;
    if (e.maximum !== void 0 && m > e.maximum) return `Tối đa ${e.maximum}`;
  }
  const s = e.validation ?? [];
  for (const m of s) {
    const g = m.message;
    switch (m.type) {
      case "required":
        break;
      case "email":
        if (typeof t == "string" && !pk(t)) return g ?? "Email không hợp lệ";
        break;
      case "phone":
        if (typeof t == "string" && !mk(t)) return g ?? "Số điện thoại không hợp lệ";
        break;
      case "regex":
        if (typeof t == "string") {
          const y = m.pattern ?? e.pattern;
          if (!y) break;
          try {
            if (!new RegExp(y).test(t)) return g ?? "Giá trị không đúng định dạng";
          } catch {
            return g ?? "Giá trị không đúng định dạng";
          }
        }
        break;
      case "number_range": {
        const y = Gc(t);
        if (y === void 0) return g ?? "Giá trị số không hợp lệ";
        if (m.min !== void 0 && y < m.min) return g ?? `Tối thiểu ${m.min}`;
        if (m.max !== void 0 && y > m.max) return g ?? `Tối đa ${m.max}`;
        break;
      }
      case "date_range": {
        if (typeof t != "string") break;
        const y = t.trim();
        if (!y) break;
        const k = Date.parse(y);
        if (!Number.isFinite(k)) return g ?? "Ngày không hợp lệ";
        if (m.min !== void 0) {
          const C = Date.parse(String(m.min));
          if (Number.isFinite(C) && k < C) return g ?? "Ngày không hợp lệ";
        }
        if (m.max !== void 0) {
          const C = Date.parse(String(m.max));
          if (Number.isFinite(C) && k > C) return g ?? "Ngày không hợp lệ";
        }
        break;
      }
      case "enum_in": {
        if (typeof t != "string") break;
        const y = e.enum ?? [];
        if (y.length && !y.includes(t))
          return g ?? "Giá trị không hợp lệ";
        break;
      }
      case "file_size": {
        const y = Qo(t);
        if (!y.length) break;
        const k = typeof ((d = (u = e.ui) == null ? void 0 : u.file) == null ? void 0 : d.maxSizeMb) == "number" ? e.ui.file.maxSizeMb * 1024 * 1024 : void 0, C = m.maxSizeBytes ?? k;
        if (!C) break;
        if (y.find((x) => x.size > C)) return g ?? "File vượt quá dung lượng cho phép";
        break;
      }
      case "file_type": {
        const y = Qo(t);
        if (!y.length) break;
        const k = (h = (f = e.ui) == null ? void 0 : f.file) != null && h.accept ? e.ui.file.accept.split(",").map((x) => x.trim()).filter(Boolean) : [], C = ((p = m.allowedTypes) != null && p.length ? m.allowedTypes : k) ?? [];
        if (!C.length) break;
        if (y.find((x) => !C.some((E) => gk(E, x)))) return g ?? "Định dạng file không được hỗ trợ";
        break;
      }
    }
  }
}
function vk(n) {
  return async (e) => {
    const t = {}, r = (i) => {
      const { fieldSchema: o, fieldPath: l, value: a, required: c } = i, u = Array.isArray(a) ? a : [], d = uo({ schema: o, value: u, required: c });
      if (d) {
        or(t, l, d);
        return;
      }
      const f = er(o.minItems);
      if (f !== void 0 && u.length < f) {
        or(t, l, `Tối thiểu ${f} mục`);
        return;
      }
      const h = er(o.maxItems);
      if (h !== void 0 && u.length > h) {
        or(t, l, `Tối đa ${h} mục`);
        return;
      }
      const p = o.items;
      if (p)
        for (let m = 0; m < u.length; m++) {
          const g = `${l}.${m}`, y = u[m];
          if (p.type === le.OBJECT) {
            s(p, g);
            continue;
          }
          if (p.type === le.ARRAY) {
            r({
              fieldSchema: p,
              fieldPath: g,
              value: y,
              required: Sr(p)
            });
            continue;
          }
          const k = uo({ schema: p, value: y, required: Sr(p) });
          k && or(t, g, k);
        }
    }, s = (i, o) => {
      const l = i.properties ?? {}, a = Object.keys(l);
      for (const c of a) {
        const u = l[c], d = o ? `${o}.${c}` : c, f = (i.required ?? []).includes(c) || Sr(u), { visible: h, required: p } = Gl({ fieldSchema: u, values: e, baseRequired: f });
        if (!h) continue;
        const m = Jl(e, d);
        if (u.type === le.OBJECT) {
          s(u, d);
          continue;
        }
        if (u.type === le.ARRAY) {
          r({ fieldSchema: u, fieldPath: d, value: m, required: p });
          continue;
        }
        const g = uo({ schema: u, value: m, required: p });
        g && or(t, d, g);
      }
    };
    return s(n, ""), {
      values: e,
      errors: t
    };
  };
}
function hh(n) {
  var r, s;
  const e = n.properties ?? {}, t = {};
  for (const i of Object.keys(e)) {
    const o = e[i];
    if (o.type === le.OBJECT) {
      t[i] = hh(o);
      continue;
    }
    if (o.default !== void 0) {
      t[i] = o.default;
      continue;
    }
    if (((r = o.ui) == null ? void 0 : r.widget) === "file") {
      t[i] = (s = o.ui.file) != null && s.multiple ? [] : void 0;
      continue;
    }
    if (o.type === le.ARRAY) {
      const l = er(o.minItems) ?? 0, a = o.items ?? { type: le.STRING };
      t[i] = Array.from({ length: l }, () => Xs(a));
      continue;
    }
  }
  return t;
}
function Sk(n) {
  const r = dh(n).filter((s) => s.schema.type !== le.OBJECT).map((s, i) => {
    var a, c;
    const o = ((a = s.schema.ui) == null ? void 0 : a.section) ?? "", l = ((c = s.schema.ui) == null ? void 0 : c.order) ?? i;
    return { ...s, section: o, order: l };
  });
  return r.sort((s, i) => s.section !== i.section ? s.section.localeCompare(i.section) : s.order - i.order), r;
}
function wk(n) {
  var t, r, s, i, o, l;
  if (((t = n.ui) == null ? void 0 : t.widget) === "date" || n.format === "date")
    return { kind: "date" };
  if (((r = n.ui) == null ? void 0 : r.widget) === "datetime" || n.format === "date-time")
    return { kind: "datetime" };
  if (((s = n.ui) == null ? void 0 : s.widget) === "richtext")
    return { kind: "richtext" };
  if (((i = n.ui) == null ? void 0 : i.widget) === "file")
    return { kind: "file" };
  if (((o = n.ui) == null ? void 0 : o.widget) === "textarea")
    return { kind: "textarea" };
  const e = n.options;
  return e ? { kind: "select", source: e } : (l = n.enum) != null && l.length ? { kind: "select", source: {
    type: cn.STATIC,
    options: n.enum.map((c) => ({ id: c, label: c }))
  } } : { kind: "input" };
}
function Yc(n) {
  var s;
  const e = n.properties ?? {}, t = Object.keys(e), r = (s = n.propertyOrdering) != null && s.length ? n.propertyOrdering.filter((i) => i in e) : t;
  return r.length ? r : t;
}
function Ck(n) {
  const { name: e, fieldSchema: t, disabled: r, placeholder: s, optionsProvider: i, getValues: o } = n, { control: l } = tn(), a = Xh({ control: l, name: e }), c = er(t.minItems) ?? 0, u = er(t.maxItems), d = t.items ?? { type: le.STRING }, f = !r && (u === void 0 || a.fields.length < u), h = (v) => !r && a.fields.length > Math.max(0, c) && v >= 0, p = !r && c > 0 ? `Không thể xoá vì minItems=${c}` : void 0, m = !r && u !== void 0 ? `Không thể thêm vì maxItems=${u}` : void 0, y = rl({ control: l, name: e }) ?? [], k = (v) => {
    if (d.type !== le.OBJECT) return;
    const x = y == null ? void 0 : y[v];
    if (!x || typeof x != "object") return;
    const E = ["title", "name", "fullName", "label", "code", "id"];
    for (const L of E) {
      const z = x == null ? void 0 : x[L];
      if (typeof z == "string" && z.trim()) return z;
      if (typeof z == "number") return String(z);
    }
    const M = Yc(d)[0], D = M ? x == null ? void 0 : x[M] : void 0;
    if (typeof D == "string" && D.trim()) return D;
    if (typeof D == "number") return String(D);
  }, C = () => {
    a.append(Xs(d));
  };
  return /* @__PURE__ */ S.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ S.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ S.jsx("div", { className: "text-xs text-text-secondary", children: /* @__PURE__ */ S.jsxs("span", { children: [
        a.fields.length,
        " mục",
        c ? ` (min ${c})` : "",
        u !== void 0 ? ` (max ${u})` : ""
      ] }) }),
      /* @__PURE__ */ S.jsx(
        po,
        {
          type: "button",
          variant: "secondary",
          size: "sm",
          disabled: !f,
          title: f ? void 0 : m,
          onClick: C,
          children: "Thêm"
        }
      )
    ] }),
    /* @__PURE__ */ S.jsx("div", { className: "space-y-3", children: a.fields.map((v, x) => {
      const E = `${e}.${x}`, M = k(x), D = o();
      return /* @__PURE__ */ S.jsxs("div", { className: "rounded-2xl border border-slate-200 bg-surface p-4", children: [
        /* @__PURE__ */ S.jsxs("div", { className: "mb-3 flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ S.jsxs("div", { className: "text-sm font-medium text-text-primary", children: [
            /* @__PURE__ */ S.jsxs("span", { children: [
              "#",
              x + 1
            ] }),
            M ? /* @__PURE__ */ S.jsx("span", { className: "ml-2 text-text-secondary", children: M }) : null
          ] }),
          /* @__PURE__ */ S.jsx(
            po,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              disabled: !h(x),
              title: h(x) ? void 0 : p,
              onClick: () => a.remove(x),
              children: "Xoá"
            }
          )
        ] }),
        d.type === le.OBJECT ? /* @__PURE__ */ S.jsx(ss, { container: !0, spacing: 2, children: Yc(d).map((L) => {
          var Z, ee, ye, _e, We;
          const z = ((Z = d.properties) == null ? void 0 : Z[L]) ?? { type: le.STRING }, X = `${E}.${L}`, F = z.title ?? L, V = (ee = z.ui) == null ? void 0 : ee.placeholder, W = ((ye = z.ui) == null ? void 0 : ye.helper) ?? ((_e = z.ui) == null ? void 0 : _e.hint), J = fh((We = z.ui) == null ? void 0 : We.width), Q = (d.required ?? []).includes(L) || Sr(z), re = Gl({ fieldSchema: z, values: D, baseRequired: Q });
          return re.visible ? /* @__PURE__ */ S.jsx(ss, { size: J, children: /* @__PURE__ */ S.jsx(Ys, { name: X, label: F, required: re.required, helperText: W, children: ({ field: Oe }) => Zo({
            field: Oe,
            fieldSchema: z,
            disabled: !re.enabled,
            placeholder: V,
            optionsProvider: i,
            getValues: o
          }) }) }, X) : null;
        }) }) : /* @__PURE__ */ S.jsx(Ys, { name: E, label: `#${x + 1}`, children: ({ field: L }) => Zo({
          field: L,
          fieldSchema: d,
          disabled: r,
          placeholder: s,
          optionsProvider: i,
          getValues: o
        }) })
      ] }, v.id);
    }) })
  ] });
}
function Zo(n) {
  var a, c, u, d, f, h, p, m, g, y, k, C, v, x, E, M, D, L, z, X, F, V, W, J, Q, re, Z, ee, ye, _e, We, Oe;
  const { field: e, fieldSchema: t, disabled: r, placeholder: s, optionsProvider: i, getValues: o } = n, l = wk(t);
  if (l.kind === "date")
    return /* @__PURE__ */ S.jsx(
      Ch,
      {
        name: e.name,
        disabled: r,
        placeholder: s,
        value: e.value ?? "",
        onValueChange: (ne) => e.onChange(ne),
        onBlur: e.onBlur
      }
    );
  if (l.kind === "datetime")
    return /* @__PURE__ */ S.jsx(
      Eh,
      {
        name: e.name,
        disabled: r,
        placeholder: s,
        value: e.value ?? "",
        onValueChange: (ne) => e.onChange(ne),
        onBlur: e.onBlur
      }
    );
  if (l.kind === "richtext")
    return /* @__PURE__ */ S.jsx("div", { className: r ? "pointer-events-none opacity-60" : void 0, children: /* @__PURE__ */ S.jsx(sh, { value: e.value ?? "", onValueChange: (ne) => e.onChange(ne) }) });
  if (l.kind === "file") {
    const ne = ((c = (a = t.ui) == null ? void 0 : a.file) == null ? void 0 : c.multiple) ?? !1, be = Qo(e.value);
    return /* @__PURE__ */ S.jsx("div", { className: r ? "pointer-events-none opacity-60" : void 0, children: /* @__PURE__ */ S.jsx(
      lh,
      {
        value: be,
        multiple: ne,
        appendOnSelect: (d = (u = t.ui) == null ? void 0 : u.file) == null ? void 0 : d.appendOnSelect,
        accept: (h = (f = t.ui) == null ? void 0 : f.file) == null ? void 0 : h.accept,
        maxSizeMb: (m = (p = t.ui) == null ? void 0 : p.file) == null ? void 0 : m.maxSizeMb,
        maxFiles: (y = (g = t.ui) == null ? void 0 : g.file) == null ? void 0 : y.maxFiles,
        mode: (C = (k = t.ui) == null ? void 0 : k.file) == null ? void 0 : C.mode,
        size: (x = (v = t.ui) == null ? void 0 : v.file) == null ? void 0 : x.size,
        variant: (M = (E = t.ui) == null ? void 0 : E.file) == null ? void 0 : M.variant,
        dropLabel: (L = (D = t.ui) == null ? void 0 : D.file) == null ? void 0 : L.dropLabel,
        browseLabel: (X = (z = t.ui) == null ? void 0 : z.file) == null ? void 0 : X.browseLabel,
        helperText: (V = (F = t.ui) == null ? void 0 : F.file) == null ? void 0 : V.helperText,
        showFileList: (J = (W = t.ui) == null ? void 0 : W.file) == null ? void 0 : J.showFileList,
        fileListLayout: (re = (Q = t.ui) == null ? void 0 : Q.file) == null ? void 0 : re.fileListLayout,
        allowRemove: (ee = (Z = t.ui) == null ? void 0 : Z.file) == null ? void 0 : ee.allowRemove,
        allowClear: (_e = (ye = t.ui) == null ? void 0 : ye.file) == null ? void 0 : _e.allowClear,
        disabled: r,
        onValueChange: (de) => {
          e.onChange(ne ? de : de[0]), e.onBlur();
        }
      }
    ) });
  }
  if (l.kind === "select") {
    const ne = l.source;
    if (ne.type === cn.STATIC) {
      const de = xk(ne);
      return /* @__PURE__ */ S.jsx(
        Mh,
        {
          name: e.name,
          value: e.value ?? "",
          disabled: r,
          placeholder: s,
          options: de,
          onValueChange: (xe) => e.onChange(xe),
          onBlur: e.onBlur
        }
      );
    }
    const be = async ({ page: de, pageSize: xe, search: Be }) => {
      if (ne.type === cn.API)
        return kk({ source: ne, page: de, pageSize: xe, search: Be });
      if (ne.type === cn.TABLE) {
        if (!(i != null && i.fetchTableOptions)) throw new Error("Missing optionsProvider.fetchTableOptions");
        return i.fetchTableOptions({ source: ne, page: de, pageSize: xe, search: Be, values: o() });
      }
      if (ne.type === cn.VIEW_QUERY) {
        if (!(i != null && i.fetchViewQueryOptions)) throw new Error("Missing optionsProvider.fetchViewQueryOptions");
        return i.fetchViewQueryOptions({ source: ne, page: de, pageSize: xe, search: Be, values: o() });
      }
      if (ne.type === cn.LOOKUP) {
        if (!(i != null && i.fetchLookupOptions)) throw new Error("Missing optionsProvider.fetchLookupOptions");
        return i.fetchLookupOptions({ source: ne, page: de, pageSize: xe, search: Be, values: o() });
      }
      throw new Error("Unsupported options source");
    };
    return /* @__PURE__ */ S.jsx(
      bu,
      {
        name: e.name,
        value: e.value ?? "",
        disabled: r,
        placeholder: s,
        fetchOptions: be,
        onValueChange: (de) => e.onChange(de),
        onBlur: e.onBlur
      }
    );
  }
  if (t.type === le.BOOLEAN)
    return /* @__PURE__ */ S.jsx(
      Th,
      {
        name: e.name,
        checked: !!e.value,
        disabled: r,
        onChange: (ne) => e.onChange(ne.target.checked),
        onBlur: e.onBlur
      }
    );
  if (t.type === le.NUMBER || t.type === le.INTEGER)
    return /* @__PURE__ */ S.jsx(
      xi,
      {
        name: e.name,
        type: "number",
        disabled: r,
        placeholder: s,
        value: e.value ?? "",
        onChange: (ne) => {
          const be = ne.target.value;
          e.onChange(be === "" ? void 0 : Number(be));
        },
        onBlur: e.onBlur
      }
    );
  if (t.type === le.STRING) {
    if (l.kind === "textarea" || Number(t.maxLength ?? 0) > 120)
      return /* @__PURE__ */ S.jsx(
        gu,
        {
          name: e.name,
          disabled: r,
          placeholder: s,
          value: e.value ?? "",
          onChange: (de) => e.onChange(de.target.value),
          onBlur: e.onBlur,
          rows: ((We = t.ui) == null ? void 0 : We.rows) ?? 4
        }
      );
    const be = ((Oe = t.ui) == null ? void 0 : Oe.inputType) ?? (t.format === "email" ? "email" : void 0);
    return /* @__PURE__ */ S.jsx(
      xi,
      {
        name: e.name,
        type: be,
        disabled: r,
        placeholder: s,
        value: e.value ?? "",
        onChange: (de) => e.onChange(de.target.value),
        onBlur: e.onBlur
      }
    );
  }
  return /* @__PURE__ */ S.jsx(
    xi,
    {
      name: e.name,
      disabled: r,
      placeholder: s,
      value: e.value ?? "",
      onChange: (ne) => e.onChange(ne.target.value),
      onBlur: e.onBlur
    }
  );
}
function Ek(n, e) {
  return (n.required ?? []).includes(e);
}
function Gk({
  schema: n,
  methods: e,
  formOptions: t,
  onSubmit: r,
  onInvalid: s,
  optionsProvider: i,
  gridSpacing: o = 2,
  renderFooter: l,
  className: a,
  ...c
}) {
  const u = U.useMemo(() => vk(n), [n]), d = ol({
    ...t ?? {},
    defaultValues: (t == null ? void 0 : t.defaultValues) ?? hh(n),
    resolver: (t == null ? void 0 : t.resolver) ?? u
  }), f = e ?? d, h = U.useMemo(() => bk(n), [n]);
  rl({ control: f.control, name: h });
  const p = U.useCallback(() => f.getValues() ?? {}, [f]), m = p(), g = U.useMemo(() => Sk(n), [n]);
  return /* @__PURE__ */ S.jsxs(uh, { methods: f, onSubmit: r, onInvalid: s, className: a, ...c, children: [
    /* @__PURE__ */ S.jsx(ss, { container: !0, spacing: o, children: g.map((y) => {
      var D, L, z, X, F;
      const k = y.schema.title ?? y.key, C = (D = y.schema.ui) == null ? void 0 : D.placeholder, v = ((L = y.schema.ui) == null ? void 0 : L.helper) ?? ((z = y.schema.ui) == null ? void 0 : z.hint), x = fh((X = y.schema.ui) == null ? void 0 : X.width), E = Ek(y.parentSchema, y.key) || Sr(y.schema), M = Gl({ fieldSchema: y.schema, values: m, baseRequired: E });
      return M.visible ? /* @__PURE__ */ S.jsx(ss, { size: x, children: y.schema.type === le.ARRAY ? /* @__PURE__ */ S.jsx(
        ll,
        {
          label: k,
          required: M.required,
          error: ((F = Jl(f.formState.errors, y.path)) == null ? void 0 : F.message) ?? void 0,
          children: /* @__PURE__ */ S.jsx(
            Ck,
            {
              name: y.path,
              fieldSchema: y.schema,
              disabled: !M.enabled,
              placeholder: C,
              optionsProvider: i,
              getValues: p
            }
          )
        }
      ) : /* @__PURE__ */ S.jsx(Ys, { name: y.path, label: k, required: M.required, helperText: v, children: ({ field: V }) => Zo({
        field: V,
        fieldSchema: y.schema,
        disabled: !M.enabled,
        placeholder: C,
        optionsProvider: i,
        getValues: p
      }) }) }, y.path) : null;
    }) }),
    l == null ? void 0 : l({ methods: f })
  ] });
}
const Mk = ({ message: n, className: e, children: t, ...r }) => !n && !t ? null : /* @__PURE__ */ S.jsxs(
  "div",
  {
    className: Ce(
      pe(
        "flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700",
        e
      )
    ),
    role: "alert",
    ...r,
    children: [
      /* @__PURE__ */ S.jsx("span", { className: "text-base leading-none", children: "⚠" }),
      /* @__PURE__ */ S.jsxs("div", { className: "flex-1", children: [
        n && /* @__PURE__ */ S.jsx("p", { className: "font-medium", children: n }),
        t
      ] })
    ]
  }
);
Mk.displayName = "FormErrorBanner";
function Yk(n) {
  const { schema: e, ...t } = n;
  return ol({
    ...t,
    resolver: ch(e)
  });
}
function Xk(n) {
  const e = tu(null), t = fo((s) => {
    if (!s || s.length === 0) return;
    const i = e.current;
    if (!i) return;
    const o = s[0];
    if (!(o != null && o.field)) return;
    const l = i.querySelector(`[name="${o.field}"]`);
    l && typeof l.focus == "function" && (l.focus(), typeof l.scrollIntoView == "function" && l.scrollIntoView({ block: "center", behavior: "smooth" }));
  }, []);
  return { setFormErrors: fo(
    (s) => (s.fieldErrors && s.fieldErrors.forEach((i) => {
      n.setError(i.field, { type: "server", message: i.message });
    }), t(s.fieldErrors), s.message || null),
    [n, t]
  ), formRef: e };
}
function Qk(n) {
  const { request: e, parseError: t, onSuccess: r, onError: s, onFinally: i } = n, [o, l] = dr(!1), [a, c] = dr(null), [u, d] = dr(null);
  return { handleSubmit: fo(
    async (h) => {
      l(!0), c(null);
      try {
        const p = await e(h);
        d(p), r == null || r(p);
      } catch (p) {
        const m = t ? t(p) : p, g = s == null ? void 0 : s(m);
        g && c(g);
      } finally {
        l(!1), i == null || i();
      }
    },
    [e, t, r, s, i]
  ), isSubmitting: o, formError: a, data: u, setFormError: c };
}
const Tk = U.forwardRef(
  ({ isLoading: n, disabled: e, ...t }, r) => {
    const { formState: s } = tn(), i = s.isSubmitting, o = n ?? i, l = e ?? i;
    return /* @__PURE__ */ S.jsx(
      po,
      {
        ref: r,
        type: "submit",
        isLoading: o,
        disabled: l,
        ...t
      }
    );
  }
);
Tk.displayName = "FormSubmitButton";
export {
  nk as $,
  ck as A,
  Qn as B,
  _h as C,
  Y as D,
  Ee as E,
  Ih as F,
  qd as G,
  q as H,
  am as I,
  A as J,
  _ as K,
  j as L,
  sk as M,
  st as N,
  cn as O,
  Re as P,
  rt as Q,
  yu as R,
  bu as S,
  gu as T,
  Wk as U,
  qk as V,
  Kk as W,
  Uk as X,
  px as Y,
  Vk as Z,
  yx as _,
  Xh as a,
  T1 as a0,
  M1 as a1,
  Jk as a2,
  Rf as a3,
  dx as a4,
  op as a5,
  ap as a6,
  sp as a7,
  np as a8,
  up as a9,
  sh as aa,
  Yk as b,
  ol as c,
  Xk as d,
  Qk as e,
  ep as f,
  ik as g,
  Zh as h,
  lh as i,
  oh as j,
  ll as k,
  Tk as l,
  uh as m,
  Gk as n,
  le as o,
  Ys as p,
  Mk as q,
  Hk as r,
  Oh as s,
  db as t,
  tn as u,
  $k as v,
  Ne as w,
  jk as x,
  Tn as y,
  Cn as z
};
