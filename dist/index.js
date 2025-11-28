var $r = Object.defineProperty;
var Br = (e, t, o) => t in e ? $r(e, t, { enumerable: !0, configurable: !0, writable: !0, value: o }) : e[t] = o;
var ce = (e, t, o) => Br(e, typeof t != "symbol" ? t + "" : t, o);
import * as Re from "react";
import lr, { useCallback as Yr, useRef as Kr, useEffect as tr } from "react";
var Ne = { exports: {} }, ue = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var or;
function Hr() {
  if (or) return ue;
  or = 1;
  var e = lr, t = Symbol.for("react.element"), o = Symbol.for("react.fragment"), n = Object.prototype.hasOwnProperty, l = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, i = { key: !0, ref: !0, __self: !0, __source: !0 };
  function u(c, p, y) {
    var m, C = {}, j = null, I = null;
    y !== void 0 && (j = "" + y), p.key !== void 0 && (j = "" + p.key), p.ref !== void 0 && (I = p.ref);
    for (m in p) n.call(p, m) && !i.hasOwnProperty(m) && (C[m] = p[m]);
    if (c && c.defaultProps) for (m in p = c.defaultProps, p) C[m] === void 0 && (C[m] = p[m]);
    return { $$typeof: t, type: c, key: j, ref: I, props: C, _owner: l.current };
  }
  return ue.Fragment = o, ue.jsx = u, ue.jsxs = u, ue;
}
var de = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var nr;
function Jr() {
  return nr || (nr = 1, process.env.NODE_ENV !== "production" && function() {
    var e = lr, t = Symbol.for("react.element"), o = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), i = Symbol.for("react.profiler"), u = Symbol.for("react.provider"), c = Symbol.for("react.context"), p = Symbol.for("react.forward_ref"), y = Symbol.for("react.suspense"), m = Symbol.for("react.suspense_list"), C = Symbol.for("react.memo"), j = Symbol.for("react.lazy"), I = Symbol.for("react.offscreen"), N = Symbol.iterator, P = "@@iterator";
    function _(r) {
      if (r === null || typeof r != "object")
        return null;
      var s = N && r[N] || r[P];
      return typeof s == "function" ? s : null;
    }
    var S = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function x(r) {
      {
        for (var s = arguments.length, a = new Array(s > 1 ? s - 1 : 0), d = 1; d < s; d++)
          a[d - 1] = arguments[d];
        H("error", r, a);
      }
    }
    function H(r, s, a) {
      {
        var d = S.ReactDebugCurrentFrame, v = d.getStackAddendum();
        v !== "" && (s += "%s", a = a.concat([v]));
        var R = a.map(function(h) {
          return String(h);
        });
        R.unshift("Warning: " + s), Function.prototype.apply.call(console[r], console, R);
      }
    }
    var V = !1, X = !1, be = !1, ge = !1, me = !1, Z;
    Z = Symbol.for("react.module.reference");
    function ne(r) {
      return !!(typeof r == "string" || typeof r == "function" || r === n || r === i || me || r === l || r === y || r === m || ge || r === I || V || X || be || typeof r == "object" && r !== null && (r.$$typeof === j || r.$$typeof === C || r.$$typeof === u || r.$$typeof === c || r.$$typeof === p || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      r.$$typeof === Z || r.getModuleId !== void 0));
    }
    function se(r, s, a) {
      var d = r.displayName;
      if (d)
        return d;
      var v = s.displayName || s.name || "";
      return v !== "" ? a + "(" + v + ")" : a;
    }
    function w(r) {
      return r.displayName || "Context";
    }
    function G(r) {
      if (r == null)
        return null;
      if (typeof r.tag == "number" && x("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof r == "function")
        return r.displayName || r.name || null;
      if (typeof r == "string")
        return r;
      switch (r) {
        case n:
          return "Fragment";
        case o:
          return "Portal";
        case i:
          return "Profiler";
        case l:
          return "StrictMode";
        case y:
          return "Suspense";
        case m:
          return "SuspenseList";
      }
      if (typeof r == "object")
        switch (r.$$typeof) {
          case c:
            var s = r;
            return w(s) + ".Consumer";
          case u:
            var a = r;
            return w(a._context) + ".Provider";
          case p:
            return se(r, r.render, "ForwardRef");
          case C:
            var d = r.displayName || null;
            return d !== null ? d : G(r.type) || "Memo";
          case j: {
            var v = r, R = v._payload, h = v._init;
            try {
              return G(h(R));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var U = Object.assign, $ = 0, J, ae, Q, B, ie, D, De;
    function Le() {
    }
    Le.__reactDisabledLog = !0;
    function hr() {
      {
        if ($ === 0) {
          J = console.log, ae = console.info, Q = console.warn, B = console.error, ie = console.group, D = console.groupCollapsed, De = console.groupEnd;
          var r = {
            configurable: !0,
            enumerable: !0,
            value: Le,
            writable: !0
          };
          Object.defineProperties(console, {
            info: r,
            log: r,
            warn: r,
            error: r,
            group: r,
            groupCollapsed: r,
            groupEnd: r
          });
        }
        $++;
      }
    }
    function vr() {
      {
        if ($--, $ === 0) {
          var r = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: U({}, r, {
              value: J
            }),
            info: U({}, r, {
              value: ae
            }),
            warn: U({}, r, {
              value: Q
            }),
            error: U({}, r, {
              value: B
            }),
            group: U({}, r, {
              value: ie
            }),
            groupCollapsed: U({}, r, {
              value: D
            }),
            groupEnd: U({}, r, {
              value: De
            })
          });
        }
        $ < 0 && x("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var _e = S.ReactCurrentDispatcher, Se;
    function he(r, s, a) {
      {
        if (Se === void 0)
          try {
            throw Error();
          } catch (v) {
            var d = v.stack.trim().match(/\n( *(at )?)/);
            Se = d && d[1] || "";
          }
        return `
` + Se + r;
      }
    }
    var je = !1, ve;
    {
      var xr = typeof WeakMap == "function" ? WeakMap : Map;
      ve = new xr();
    }
    function Ge(r, s) {
      if (!r || je)
        return "";
      {
        var a = ve.get(r);
        if (a !== void 0)
          return a;
      }
      var d;
      je = !0;
      var v = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var R;
      R = _e.current, _e.current = null, hr();
      try {
        if (s) {
          var h = function() {
            throw Error();
          };
          if (Object.defineProperty(h.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(h, []);
            } catch (z) {
              d = z;
            }
            Reflect.construct(r, [], h);
          } else {
            try {
              h.call();
            } catch (z) {
              d = z;
            }
            r.call(h.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (z) {
            d = z;
          }
          r();
        }
      } catch (z) {
        if (z && d && typeof z.stack == "string") {
          for (var g = z.stack.split(`
`), M = d.stack.split(`
`), k = g.length - 1, T = M.length - 1; k >= 1 && T >= 0 && g[k] !== M[T]; )
            T--;
          for (; k >= 1 && T >= 0; k--, T--)
            if (g[k] !== M[T]) {
              if (k !== 1 || T !== 1)
                do
                  if (k--, T--, T < 0 || g[k] !== M[T]) {
                    var L = `
` + g[k].replace(" at new ", " at ");
                    return r.displayName && L.includes("<anonymous>") && (L = L.replace("<anonymous>", r.displayName)), typeof r == "function" && ve.set(r, L), L;
                  }
                while (k >= 1 && T >= 0);
              break;
            }
        }
      } finally {
        je = !1, _e.current = R, vr(), Error.prepareStackTrace = v;
      }
      var re = r ? r.displayName || r.name : "", q = re ? he(re) : "";
      return typeof r == "function" && ve.set(r, q), q;
    }
    function yr(r, s, a) {
      return Ge(r, !1);
    }
    function wr(r) {
      var s = r.prototype;
      return !!(s && s.isReactComponent);
    }
    function xe(r, s, a) {
      if (r == null)
        return "";
      if (typeof r == "function")
        return Ge(r, wr(r));
      if (typeof r == "string")
        return he(r);
      switch (r) {
        case y:
          return he("Suspense");
        case m:
          return he("SuspenseList");
      }
      if (typeof r == "object")
        switch (r.$$typeof) {
          case p:
            return yr(r.render);
          case C:
            return xe(r.type, s, a);
          case j: {
            var d = r, v = d._payload, R = d._init;
            try {
              return xe(R(v), s, a);
            } catch {
            }
          }
        }
      return "";
    }
    var le = Object.prototype.hasOwnProperty, Ve = {}, We = S.ReactDebugCurrentFrame;
    function ye(r) {
      if (r) {
        var s = r._owner, a = xe(r.type, r._source, s ? s.type : null);
        We.setExtraStackFrame(a);
      } else
        We.setExtraStackFrame(null);
    }
    function Rr(r, s, a, d, v) {
      {
        var R = Function.call.bind(le);
        for (var h in r)
          if (R(r, h)) {
            var g = void 0;
            try {
              if (typeof r[h] != "function") {
                var M = Error((d || "React class") + ": " + a + " type `" + h + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof r[h] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw M.name = "Invariant Violation", M;
              }
              g = r[h](s, h, d, a, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (k) {
              g = k;
            }
            g && !(g instanceof Error) && (ye(v), x("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", d || "React class", a, h, typeof g), ye(null)), g instanceof Error && !(g.message in Ve) && (Ve[g.message] = !0, ye(v), x("Failed %s type: %s", a, g.message), ye(null));
          }
      }
    }
    var Er = Array.isArray;
    function ke(r) {
      return Er(r);
    }
    function Cr(r) {
      {
        var s = typeof Symbol == "function" && Symbol.toStringTag, a = s && r[Symbol.toStringTag] || r.constructor.name || "Object";
        return a;
      }
    }
    function _r(r) {
      try {
        return $e(r), !1;
      } catch {
        return !0;
      }
    }
    function $e(r) {
      return "" + r;
    }
    function Be(r) {
      if (_r(r))
        return x("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Cr(r)), $e(r);
    }
    var Ye = S.ReactCurrentOwner, Sr = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Ke, He;
    function jr(r) {
      if (le.call(r, "ref")) {
        var s = Object.getOwnPropertyDescriptor(r, "ref").get;
        if (s && s.isReactWarning)
          return !1;
      }
      return r.ref !== void 0;
    }
    function kr(r) {
      if (le.call(r, "key")) {
        var s = Object.getOwnPropertyDescriptor(r, "key").get;
        if (s && s.isReactWarning)
          return !1;
      }
      return r.key !== void 0;
    }
    function Tr(r, s) {
      typeof r.ref == "string" && Ye.current;
    }
    function Pr(r, s) {
      {
        var a = function() {
          Ke || (Ke = !0, x("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", s));
        };
        a.isReactWarning = !0, Object.defineProperty(r, "key", {
          get: a,
          configurable: !0
        });
      }
    }
    function Ar(r, s) {
      {
        var a = function() {
          He || (He = !0, x("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", s));
        };
        a.isReactWarning = !0, Object.defineProperty(r, "ref", {
          get: a,
          configurable: !0
        });
      }
    }
    var Or = function(r, s, a, d, v, R, h) {
      var g = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: t,
        // Built-in properties that belong on the element
        type: r,
        key: s,
        ref: a,
        props: h,
        // Record the component responsible for creating this element.
        _owner: R
      };
      return g._store = {}, Object.defineProperty(g._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(g, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: d
      }), Object.defineProperty(g, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: v
      }), Object.freeze && (Object.freeze(g.props), Object.freeze(g)), g;
    };
    function Ir(r, s, a, d, v) {
      {
        var R, h = {}, g = null, M = null;
        a !== void 0 && (Be(a), g = "" + a), kr(s) && (Be(s.key), g = "" + s.key), jr(s) && (M = s.ref, Tr(s, v));
        for (R in s)
          le.call(s, R) && !Sr.hasOwnProperty(R) && (h[R] = s[R]);
        if (r && r.defaultProps) {
          var k = r.defaultProps;
          for (R in k)
            h[R] === void 0 && (h[R] = k[R]);
        }
        if (g || M) {
          var T = typeof r == "function" ? r.displayName || r.name || "Unknown" : r;
          g && Pr(h, T), M && Ar(h, T);
        }
        return Or(r, g, M, v, d, Ye.current, h);
      }
    }
    var Te = S.ReactCurrentOwner, Je = S.ReactDebugCurrentFrame;
    function ee(r) {
      if (r) {
        var s = r._owner, a = xe(r.type, r._source, s ? s.type : null);
        Je.setExtraStackFrame(a);
      } else
        Je.setExtraStackFrame(null);
    }
    var Pe;
    Pe = !1;
    function Ae(r) {
      return typeof r == "object" && r !== null && r.$$typeof === t;
    }
    function qe() {
      {
        if (Te.current) {
          var r = G(Te.current.type);
          if (r)
            return `

Check the render method of \`` + r + "`.";
        }
        return "";
      }
    }
    function Nr(r) {
      return "";
    }
    var Xe = {};
    function Mr(r) {
      {
        var s = qe();
        if (!s) {
          var a = typeof r == "string" ? r : r.displayName || r.name;
          a && (s = `

Check the top-level render call using <` + a + ">.");
        }
        return s;
      }
    }
    function Ze(r, s) {
      {
        if (!r._store || r._store.validated || r.key != null)
          return;
        r._store.validated = !0;
        var a = Mr(s);
        if (Xe[a])
          return;
        Xe[a] = !0;
        var d = "";
        r && r._owner && r._owner !== Te.current && (d = " It was passed a child from " + G(r._owner.type) + "."), ee(r), x('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', a, d), ee(null);
      }
    }
    function Qe(r, s) {
      {
        if (typeof r != "object")
          return;
        if (ke(r))
          for (var a = 0; a < r.length; a++) {
            var d = r[a];
            Ae(d) && Ze(d, s);
          }
        else if (Ae(r))
          r._store && (r._store.validated = !0);
        else if (r) {
          var v = _(r);
          if (typeof v == "function" && v !== r.entries)
            for (var R = v.call(r), h; !(h = R.next()).done; )
              Ae(h.value) && Ze(h.value, s);
        }
      }
    }
    function zr(r) {
      {
        var s = r.type;
        if (s == null || typeof s == "string")
          return;
        var a;
        if (typeof s == "function")
          a = s.propTypes;
        else if (typeof s == "object" && (s.$$typeof === p || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        s.$$typeof === C))
          a = s.propTypes;
        else
          return;
        if (a) {
          var d = G(s);
          Rr(a, r.props, "prop", d, r);
        } else if (s.PropTypes !== void 0 && !Pe) {
          Pe = !0;
          var v = G(s);
          x("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", v || "Unknown");
        }
        typeof s.getDefaultProps == "function" && !s.getDefaultProps.isReactClassApproved && x("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Fr(r) {
      {
        for (var s = Object.keys(r.props), a = 0; a < s.length; a++) {
          var d = s[a];
          if (d !== "children" && d !== "key") {
            ee(r), x("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", d), ee(null);
            break;
          }
        }
        r.ref !== null && (ee(r), x("Invalid attribute `ref` supplied to `React.Fragment`."), ee(null));
      }
    }
    var er = {};
    function rr(r, s, a, d, v, R) {
      {
        var h = ne(r);
        if (!h) {
          var g = "";
          (r === void 0 || typeof r == "object" && r !== null && Object.keys(r).length === 0) && (g += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var M = Nr();
          M ? g += M : g += qe();
          var k;
          r === null ? k = "null" : ke(r) ? k = "array" : r !== void 0 && r.$$typeof === t ? (k = "<" + (G(r.type) || "Unknown") + " />", g = " Did you accidentally export a JSX literal instead of a component?") : k = typeof r, x("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", k, g);
        }
        var T = Ir(r, s, a, v, R);
        if (T == null)
          return T;
        if (h) {
          var L = s.children;
          if (L !== void 0)
            if (d)
              if (ke(L)) {
                for (var re = 0; re < L.length; re++)
                  Qe(L[re], r);
                Object.freeze && Object.freeze(L);
              } else
                x("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Qe(L, r);
        }
        if (le.call(s, "key")) {
          var q = G(r), z = Object.keys(s).filter(function(Wr) {
            return Wr !== "key";
          }), Oe = z.length > 0 ? "{key: someKey, " + z.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!er[q + Oe]) {
            var Vr = z.length > 0 ? "{" + z.join(": ..., ") + ": ...}" : "{}";
            x(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Oe, q, Vr, q), er[q + Oe] = !0;
          }
        }
        return r === n ? Fr(T) : zr(T), T;
      }
    }
    function Ur(r, s, a) {
      return rr(r, s, a, !0);
    }
    function Dr(r, s, a) {
      return rr(r, s, a, !1);
    }
    var Lr = Dr, Gr = Ur;
    de.Fragment = n, de.jsx = Lr, de.jsxs = Gr;
  }()), de;
}
process.env.NODE_ENV === "production" ? Ne.exports = Hr() : Ne.exports = Jr();
var b = Ne.exports;
function cr(e) {
  var t, o, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var l = e.length;
    for (t = 0; t < l; t++) e[t] && (o = cr(e[t])) && (n && (n += " "), n += o);
  } else for (o in e) e[o] && (n && (n += " "), n += o);
  return n;
}
function A() {
  for (var e, t, o = 0, n = "", l = arguments.length; o < l; o++) (e = arguments[o]) && (t = cr(e)) && (n && (n += " "), n += t);
  return n;
}
const ze = "-", qr = (e) => {
  const t = Zr(e), {
    conflictingClassGroups: o,
    conflictingClassGroupModifiers: n
  } = e;
  return {
    getClassGroupId: (u) => {
      const c = u.split(ze);
      return c[0] === "" && c.length !== 1 && c.shift(), ur(c, t) || Xr(u);
    },
    getConflictingClassGroupIds: (u, c) => {
      const p = o[u] || [];
      return c && n[u] ? [...p, ...n[u]] : p;
    }
  };
}, ur = (e, t) => {
  var u;
  if (e.length === 0)
    return t.classGroupId;
  const o = e[0], n = t.nextPart.get(o), l = n ? ur(e.slice(1), n) : void 0;
  if (l)
    return l;
  if (t.validators.length === 0)
    return;
  const i = e.join(ze);
  return (u = t.validators.find(({
    validator: c
  }) => c(i))) == null ? void 0 : u.classGroupId;
}, sr = /^\[(.+)\]$/, Xr = (e) => {
  if (sr.test(e)) {
    const t = sr.exec(e)[1], o = t == null ? void 0 : t.substring(0, t.indexOf(":"));
    if (o)
      return "arbitrary.." + o;
  }
}, Zr = (e) => {
  const {
    theme: t,
    prefix: o
  } = e, n = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return et(Object.entries(e.classGroups), o).forEach(([i, u]) => {
    Me(u, n, i, t);
  }), n;
}, Me = (e, t, o, n) => {
  e.forEach((l) => {
    if (typeof l == "string") {
      const i = l === "" ? t : ar(t, l);
      i.classGroupId = o;
      return;
    }
    if (typeof l == "function") {
      if (Qr(l)) {
        Me(l(n), t, o, n);
        return;
      }
      t.validators.push({
        validator: l,
        classGroupId: o
      });
      return;
    }
    Object.entries(l).forEach(([i, u]) => {
      Me(u, ar(t, i), o, n);
    });
  });
}, ar = (e, t) => {
  let o = e;
  return t.split(ze).forEach((n) => {
    o.nextPart.has(n) || o.nextPart.set(n, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), o = o.nextPart.get(n);
  }), o;
}, Qr = (e) => e.isThemeGetter, et = (e, t) => t ? e.map(([o, n]) => {
  const l = n.map((i) => typeof i == "string" ? t + i : typeof i == "object" ? Object.fromEntries(Object.entries(i).map(([u, c]) => [t + u, c])) : i);
  return [o, l];
}) : e, rt = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, o = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
  const l = (i, u) => {
    o.set(i, u), t++, t > e && (t = 0, n = o, o = /* @__PURE__ */ new Map());
  };
  return {
    get(i) {
      let u = o.get(i);
      if (u !== void 0)
        return u;
      if ((u = n.get(i)) !== void 0)
        return l(i, u), u;
    },
    set(i, u) {
      o.has(i) ? o.set(i, u) : l(i, u);
    }
  };
}, dr = "!", tt = (e) => {
  const {
    separator: t,
    experimentalParseClassName: o
  } = e, n = t.length === 1, l = t[0], i = t.length, u = (c) => {
    const p = [];
    let y = 0, m = 0, C;
    for (let _ = 0; _ < c.length; _++) {
      let S = c[_];
      if (y === 0) {
        if (S === l && (n || c.slice(_, _ + i) === t)) {
          p.push(c.slice(m, _)), m = _ + i;
          continue;
        }
        if (S === "/") {
          C = _;
          continue;
        }
      }
      S === "[" ? y++ : S === "]" && y--;
    }
    const j = p.length === 0 ? c : c.substring(m), I = j.startsWith(dr), N = I ? j.substring(1) : j, P = C && C > m ? C - m : void 0;
    return {
      modifiers: p,
      hasImportantModifier: I,
      baseClassName: N,
      maybePostfixModifierPosition: P
    };
  };
  return o ? (c) => o({
    className: c,
    parseClassName: u
  }) : u;
}, ot = (e) => {
  if (e.length <= 1)
    return e;
  const t = [];
  let o = [];
  return e.forEach((n) => {
    n[0] === "[" ? (t.push(...o.sort(), n), o = []) : o.push(n);
  }), t.push(...o.sort()), t;
}, nt = (e) => ({
  cache: rt(e.cacheSize),
  parseClassName: tt(e),
  ...qr(e)
}), st = /\s+/, at = (e, t) => {
  const {
    parseClassName: o,
    getClassGroupId: n,
    getConflictingClassGroupIds: l
  } = t, i = [], u = e.trim().split(st);
  let c = "";
  for (let p = u.length - 1; p >= 0; p -= 1) {
    const y = u[p], {
      modifiers: m,
      hasImportantModifier: C,
      baseClassName: j,
      maybePostfixModifierPosition: I
    } = o(y);
    let N = !!I, P = n(N ? j.substring(0, I) : j);
    if (!P) {
      if (!N) {
        c = y + (c.length > 0 ? " " + c : c);
        continue;
      }
      if (P = n(j), !P) {
        c = y + (c.length > 0 ? " " + c : c);
        continue;
      }
      N = !1;
    }
    const _ = ot(m).join(":"), S = C ? _ + dr : _, x = S + P;
    if (i.includes(x))
      continue;
    i.push(x);
    const H = l(P, N);
    for (let V = 0; V < H.length; ++V) {
      const X = H[V];
      i.push(S + X);
    }
    c = y + (c.length > 0 ? " " + c : c);
  }
  return c;
};
function it() {
  let e = 0, t, o, n = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (o = fr(t)) && (n && (n += " "), n += o);
  return n;
}
const fr = (e) => {
  if (typeof e == "string")
    return e;
  let t, o = "";
  for (let n = 0; n < e.length; n++)
    e[n] && (t = fr(e[n])) && (o && (o += " "), o += t);
  return o;
};
function lt(e, ...t) {
  let o, n, l, i = u;
  function u(p) {
    const y = t.reduce((m, C) => C(m), e());
    return o = nt(y), n = o.cache.get, l = o.cache.set, i = c, c(p);
  }
  function c(p) {
    const y = n(p);
    if (y)
      return y;
    const m = at(p, o);
    return l(p, m), m;
  }
  return function() {
    return i(it.apply(null, arguments));
  };
}
const E = (e) => {
  const t = (o) => o[e] || [];
  return t.isThemeGetter = !0, t;
}, pr = /^\[(?:([a-z-]+):)?(.+)\]$/i, ct = /^\d+\/\d+$/, ut = /* @__PURE__ */ new Set(["px", "full", "screen"]), dt = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, ft = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, pt = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, bt = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, gt = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, W = (e) => te(e) || ut.has(e) || ct.test(e), Y = (e) => oe(e, "length", Et), te = (e) => !!e && !Number.isNaN(Number(e)), Ie = (e) => oe(e, "number", te), fe = (e) => !!e && Number.isInteger(Number(e)), mt = (e) => e.endsWith("%") && te(e.slice(0, -1)), f = (e) => pr.test(e), K = (e) => dt.test(e), ht = /* @__PURE__ */ new Set(["length", "size", "percentage"]), vt = (e) => oe(e, ht, br), xt = (e) => oe(e, "position", br), yt = /* @__PURE__ */ new Set(["image", "url"]), wt = (e) => oe(e, yt, _t), Rt = (e) => oe(e, "", Ct), pe = () => !0, oe = (e, t, o) => {
  const n = pr.exec(e);
  return n ? n[1] ? typeof t == "string" ? n[1] === t : t.has(n[1]) : o(n[2]) : !1;
}, Et = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  ft.test(e) && !pt.test(e)
), br = () => !1, Ct = (e) => bt.test(e), _t = (e) => gt.test(e), St = () => {
  const e = E("colors"), t = E("spacing"), o = E("blur"), n = E("brightness"), l = E("borderColor"), i = E("borderRadius"), u = E("borderSpacing"), c = E("borderWidth"), p = E("contrast"), y = E("grayscale"), m = E("hueRotate"), C = E("invert"), j = E("gap"), I = E("gradientColorStops"), N = E("gradientColorStopPositions"), P = E("inset"), _ = E("margin"), S = E("opacity"), x = E("padding"), H = E("saturate"), V = E("scale"), X = E("sepia"), be = E("skew"), ge = E("space"), me = E("translate"), Z = () => ["auto", "contain", "none"], ne = () => ["auto", "hidden", "clip", "visible", "scroll"], se = () => ["auto", f, t], w = () => [f, t], G = () => ["", W, Y], U = () => ["auto", te, f], $ = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], J = () => ["solid", "dashed", "dotted", "double", "none"], ae = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], Q = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], B = () => ["", "0", f], ie = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], D = () => [te, f];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [pe],
      spacing: [W, Y],
      blur: ["none", "", K, f],
      brightness: D(),
      borderColor: [e],
      borderRadius: ["none", "", "full", K, f],
      borderSpacing: w(),
      borderWidth: G(),
      contrast: D(),
      grayscale: B(),
      hueRotate: D(),
      invert: B(),
      gap: w(),
      gradientColorStops: [e],
      gradientColorStopPositions: [mt, Y],
      inset: se(),
      margin: se(),
      opacity: D(),
      padding: w(),
      saturate: D(),
      scale: D(),
      sepia: B(),
      skew: D(),
      space: w(),
      translate: w()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", f]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [K]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": ie()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": ie()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: [...$(), f]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: ne()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": ne()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": ne()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: Z()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": Z()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": Z()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [P]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [P]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [P]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [P]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [P]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [P]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [P]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [P]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [P]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ["auto", fe, f]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: se()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ["1", "auto", "initial", "none", f]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: B()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: B()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", fe, f]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [pe]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", fe, f]
        }, f]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": U()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": U()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [pe]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [fe, f]
        }, f]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": U()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": U()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", f]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", f]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [j]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [j]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [j]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal", ...Q()]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...Q(), "baseline"]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": [...Q(), "baseline"]
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [x]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [x]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [x]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [x]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [x]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [x]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [x]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [x]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [x]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [_]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [_]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [_]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [_]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [_]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [_]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [_]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [_]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [_]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [ge]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      "space-y": [{
        "space-y": [ge]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-y-reverse": ["space-y-reverse"],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", f, t]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [f, t, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [f, t, "none", "full", "min", "max", "fit", "prose", {
          screen: [K]
        }, K]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [f, t, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [f, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [f, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [f, t, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", K, Y]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", Ie]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [pe]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", f]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", te, Ie]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", W, f]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", f]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", f]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: [e]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      "placeholder-opacity": [{
        "placeholder-opacity": [S]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: [e]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      "text-opacity": [{
        "text-opacity": [S]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...J(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", W, Y]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", W, f]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: [e]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: w()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", f]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", f]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      "bg-opacity": [{
        "bg-opacity": [S]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: [...$(), xt]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ["auto", "cover", "contain", vt]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, wt]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: [e]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: [N]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [N]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [N]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [I]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [I]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [I]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [i]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [i]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [i]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [i]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [i]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [i]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [i]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [i]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [i]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [i]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [i]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [i]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [i]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [i]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [i]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [c]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [c]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [c]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [c]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [c]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [c]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [c]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [c]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [c]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [S]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...J(), "hidden"]
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [c]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y": [{
        "divide-y": [c]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      "divide-opacity": [{
        "divide-opacity": [S]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: J()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: [l]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": [l]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": [l]
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": [l]
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": [l]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": [l]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": [l]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": [l]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": [l]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: [l]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: ["", ...J()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [W, f]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [W, Y]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [e]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w": [{
        ring: G()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      "ring-color": [{
        ring: [e]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      "ring-opacity": [{
        "ring-opacity": [S]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [W, Y]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      "ring-offset-color": [{
        "ring-offset": [e]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ["", "inner", "none", K, Rt]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [pe]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [S]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...ae(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": ae()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ["", "none"]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [o]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [n]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [p]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", K, f]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [y]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [m]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [C]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [H]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [X]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": [o]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [n]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [p]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [y]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [m]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [C]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [S]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [H]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [X]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": [u]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [u]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [u]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", f]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: D()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", f]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: D()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", f]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [V]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [V]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [V]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [fe, f]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [me]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [me]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [be]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [be]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", f]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ["auto", e]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", f]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: [e]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["none", "auto"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "y", "x", ""]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": w()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": w()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": w()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": w()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": w()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": w()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": w()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": w()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": w()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": w()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": w()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": w()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": w()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": w()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": w()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": w()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": w()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": w()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", f]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [e, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [W, Y, Ie]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [e, "none"]
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    }
  };
}, F = /* @__PURE__ */ lt(St);
let we;
const jt = new Uint8Array(16);
function kt() {
  if (!we && (we = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !we))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return we(jt);
}
const O = [];
for (let e = 0; e < 256; ++e)
  O.push((e + 256).toString(16).slice(1));
function Tt(e, t = 0) {
  return O[e[t + 0]] + O[e[t + 1]] + O[e[t + 2]] + O[e[t + 3]] + "-" + O[e[t + 4]] + O[e[t + 5]] + "-" + O[e[t + 6]] + O[e[t + 7]] + "-" + O[e[t + 8]] + O[e[t + 9]] + "-" + O[e[t + 10]] + O[e[t + 11]] + O[e[t + 12]] + O[e[t + 13]] + O[e[t + 14]] + O[e[t + 15]];
}
const Pt = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), ir = {
  randomUUID: Pt
};
function At(e, t, o) {
  if (ir.randomUUID && !e)
    return ir.randomUUID();
  e = e || {};
  const n = e.random || (e.rng || kt)();
  return n[6] = n[6] & 15 | 64, n[8] = n[8] & 63 | 128, Tt(n);
}
class Ot {
  constructor() {
    ce(this, "subscribers", /* @__PURE__ */ new Map());
    ce(this, "globalSubscribers", /* @__PURE__ */ new Set());
    ce(this, "middlewares", []);
    ce(this, "handlerPipeline", null);
    this.handlerPipeline = async (t) => {
      this.notifySubscribers(t);
    };
  }
  use(t) {
    this.middlewares.push(t), this.rebuildPipeline();
  }
  rebuildPipeline() {
    let t = async (o) => {
      this.notifySubscribers(o);
    };
    for (let o = this.middlewares.length - 1; o >= 0; o--)
      t = this.middlewares[o](t);
    this.handlerPipeline = t;
  }
  notifySubscribers(t) {
    const o = this.subscribers.get(t.type);
    o && o.forEach((n) => {
      try {
        n(t);
      } catch (l) {
        console.error(`[ActionBus] Error in subscriber for ${t.type}:`, l);
      }
    }), this.globalSubscribers.forEach((n) => {
      try {
        n(t);
      } catch (l) {
        console.error("[ActionBus] Error in global subscriber:", l);
      }
    });
  }
  publish(t) {
    const o = {
      ...t,
      id: At(),
      timestamp: Date.now()
    };
    this.handlerPipeline && Promise.resolve(this.handlerPipeline(o)).catch((n) => {
      console.error("[ActionBus] Pipeline error:", n);
    });
  }
  subscribe(t, o) {
    return this.subscribers.has(t) || this.subscribers.set(t, /* @__PURE__ */ new Set()), this.subscribers.get(t).add(o), {
      unsubscribe: () => {
        const n = this.subscribers.get(t);
        n && (n.delete(o), n.size === 0 && this.subscribers.delete(t));
      }
    };
  }
  subscribeAll(t) {
    return this.globalSubscribers.add(t), {
      unsubscribe: () => {
        this.globalSubscribers.delete(t);
      }
    };
  }
}
const Fe = new Ot(), Dt = () => Fe, Ue = () => Yr(
  (t, o, n) => {
    Fe.publish({
      type: t,
      payload: o,
      source: (n == null ? void 0 : n.source) || "component",
      meta: n == null ? void 0 : n.meta,
      flags: n == null ? void 0 : n.flags
    });
  },
  []
), Lt = (e, t, o = []) => {
  const n = Kr(t);
  tr(() => {
    n.current = t;
  }, [t]), tr(() => {
    const l = Fe.subscribe(e, (i) => {
      n.current && n.current(i);
    });
    return () => {
      l.unsubscribe();
    };
  }, [e, ...o]);
}, Gt = () => {
};
var Ee = /* @__PURE__ */ ((e) => (e.UI_CLICK = "UI.CLICK", e.UI_HOVER = "UI.HOVER", e.UI_CHANGE = "UI.CHANGE", e.FORM_SUBMIT = "FORM.SUBMIT", e.FORM_VALIDATE = "FORM.VALIDATE", e.SYSTEM_INIT = "SYSTEM.INIT", e.SYSTEM_ERROR = "SYSTEM.ERROR", e.NAV_ROUTE = "NAV.ROUTE", e))(Ee || {});
const It = Re.forwardRef(
  ({ className: e, variant: t = "primary", size: o = "md", fullWidth: n, isLoading: l, onClick: i, children: u, ...c }, p) => {
    const y = Ue(), m = "inline-flex items-center justify-center rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50", C = {
      primary: "bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700",
      secondary: "bg-surface-alt text-text-primary hover:bg-slate-200 active:bg-slate-300",
      ghost: "hover:bg-slate-100 text-text-secondary hover:text-text-primary",
      danger: "bg-red-500 text-white hover:bg-red-600 active:bg-red-700"
    }, j = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-8 text-base"
    }, I = (N) => {
      y(Ee.UI_CLICK, { component: "Button", variant: t }, { meta: { component: "Button" } }), i == null || i(N);
    };
    return /* @__PURE__ */ b.jsxs(
      "button",
      {
        ref: p,
        className: F(
          A(
            m,
            C[t],
            j[o],
            n && "w-full",
            e
          )
        ),
        onClick: I,
        ...c,
        children: [
          l && /* @__PURE__ */ b.jsx("span", { className: "mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" }),
          u
        ]
      }
    );
  }
);
It.displayName = "Button";
const Nt = Re.forwardRef(
  ({ className: e, type: t, error: o, fullWidth: n = !0, onChange: l, onBlur: i, ...u }, c) => {
    const p = Ue(), y = (m) => {
      p(Ee.UI_CHANGE, { value: m.target.value }, {
        meta: { component: "Input", type: t },
        flags: { sensitive: t === "password" || t === "email" }
      }), l == null || l(m);
    };
    return /* @__PURE__ */ b.jsx(
      "input",
      {
        ref: c,
        type: t,
        className: F(
          A(
            "flex h-10 w-full rounded-xl bg-surface-alt px-3 py-2 text-sm placeholder:text-text-muted",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "transition-all duration-200",
            o && "ring-2 ring-red-500 focus-visible:ring-red-500",
            n ? "w-full" : "w-auto",
            e
          )
        ),
        onChange: y,
        onBlur: i,
        ...u
      }
    );
  }
);
Nt.displayName = "Input";
const Mt = Re.forwardRef(
  ({ className: e, label: t, error: o, required: n, htmlFor: l, children: i, ...u }, c) => /* @__PURE__ */ b.jsxs("div", { ref: c, className: F(A("flex flex-col gap-1.5", e)), ...u, children: [
    t && /* @__PURE__ */ b.jsxs(
      "label",
      {
        htmlFor: l,
        className: "text-sm font-medium leading-none text-text-primary peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        children: [
          t,
          n && /* @__PURE__ */ b.jsx("span", { className: "ml-1 text-red-500", children: "*" })
        ]
      }
    ),
    i,
    o && /* @__PURE__ */ b.jsx("p", { className: "text-xs font-medium text-red-500", children: o })
  ] })
);
Mt.displayName = "FormField";
const Vt = ({
  children: e,
  sidebar: t,
  header: o,
  className: n
}) => {
  const l = Ue();
  return Re.useEffect(() => {
    l(Ee.NAV_ROUTE, { component: "DashboardLayout" }, { meta: { timestamp: Date.now() } });
  }, [l]), /* @__PURE__ */ b.jsxs("div", { className: "flex min-h-screen w-full bg-background text-text-primary", children: [
    t && /* @__PURE__ */ b.jsx("aside", { className: "hidden w-64 flex-col gap-4 bg-surface p-6 lg:flex", children: t }),
    /* @__PURE__ */ b.jsxs("div", { className: "flex flex-1 flex-col", children: [
      o && /* @__PURE__ */ b.jsx("header", { className: "sticky top-0 z-10 flex h-16 items-center gap-4 bg-background/80 px-6 backdrop-blur-sm", children: o }),
      /* @__PURE__ */ b.jsx("main", { className: F(A("flex-1 p-6", n)), children: /* @__PURE__ */ b.jsx("div", { className: "mx-auto w-full max-w-7xl", children: e }) })
    ] })
  ] });
}, Wt = {
  colors: {
    primary: {
      50: "#f0f9ff",
      100: "#e0f2fe",
      200: "#bae6fd",
      300: "#7dd3fc",
      400: "#38bdf8",
      500: "#0ea5e9",
      600: "#0284c7",
      700: "#0369a1",
      800: "#075985",
      900: "#0c4a6e"
    },
    slate: {
      50: "#f8fafc",
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b",
      600: "#475569",
      700: "#334155",
      800: "#1e293b",
      900: "#0f172a"
    },
    danger: {
      500: "#ef4444",
      600: "#dc2626"
    },
    success: {
      500: "#22c55e",
      600: "#16a34a"
    },
    warning: {
      500: "#eab308",
      600: "#ca8a04"
    }
  },
  radius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    "2xl": "1.5rem",
    full: "9999px"
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem"
  }
}, gr = { none: "", sm: "gap-2", md: "gap-4", lg: "gap-8" }, zt = { none: "", sm: "p-2", md: "p-4", lg: "p-8" }, mr = ({ className: e, padding: t = "none", ...o }) => /* @__PURE__ */ b.jsx("div", { className: F(A(zt[t], e)), ...o }), $t = ({ className: e, gap: t = "none", ...o }) => /* @__PURE__ */ b.jsx("div", { className: F(A("flex flex-row items-center", gr[t], e)), ...o }), Bt = ({ className: e, gap: t = "none", ...o }) => /* @__PURE__ */ b.jsx("div", { className: F(A("flex flex-col", gr[t], e)), ...o }), Yt = ({ size: e = "md" }) => {
  const t = { sm: "h-2 w-2", md: "h-4 w-4", lg: "h-8 w-8", xl: "h-16 w-16" };
  return /* @__PURE__ */ b.jsx("div", { className: t[e] });
}, Kt = ({ className: e }) => /* @__PURE__ */ b.jsx("hr", { className: F(A("border-t border-slate-200", e)) }), Ht = mr, Jt = mr, Ce = ({ as: e = "p", className: t, ...o }) => /* @__PURE__ */ b.jsx(e, { className: F(A("text-text-primary", t)), ...o }), qt = ({ className: e, ...t }) => /* @__PURE__ */ b.jsx(Ce, { as: "h2", className: F(A("text-2xl font-bold text-text-primary", e)), ...t }), Xt = ({ className: e, ...t }) => /* @__PURE__ */ b.jsx(Ce, { as: "p", className: F(A("text-base text-text-primary", e)), ...t }), Zt = ({ className: e, ...t }) => /* @__PURE__ */ b.jsx(Ce, { as: "span", className: F(A("text-xs text-text-muted", e)), ...t }), Qt = ({ className: e, ...t }) => /* @__PURE__ */ b.jsx(Ce, { as: "label", className: F(A("text-sm font-medium text-text-secondary", e)), ...t }), eo = (e) => /* @__PURE__ */ b.jsx("input", { type: "checkbox", className: A("h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500", e.className), ...e }), ro = (e) => /* @__PURE__ */ b.jsx("div", { role: "radiogroup", ...e }), to = (e) => /* @__PURE__ */ b.jsx("select", { className: A("block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6", e.className), ...e }), oo = (e) => /* @__PURE__ */ b.jsx("textarea", { className: A("block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6", e.className), ...e }), no = ({ children: e, className: t }) => /* @__PURE__ */ b.jsx("span", { className: A("inline-flex items-center rounded-md bg-primary-50 px-2 py-1 text-xs font-medium text-primary-700 ring-1 ring-inset ring-primary-700/10", t), children: e }), so = (e) => /* @__PURE__ */ b.jsx("img", { alt: "", className: A("rounded-xl bg-slate-100", e.className), ...e }), ao = ({ name: e, className: t }) => /* @__PURE__ */ b.jsx("span", { className: A("material-icons", t), children: e }), io = ({ content: e }) => /* @__PURE__ */ b.jsx("div", { className: "prose prose-slate", children: e }), lo = () => /* @__PURE__ */ b.jsx("div", { className: "flex h-64 w-full items-center justify-center rounded-xl bg-slate-50 text-slate-400", children: "Chart Placeholder" }), co = ({ children: e }) => /* @__PURE__ */ b.jsx(b.Fragment, { children: e }), uo = () => /* @__PURE__ */ b.jsx("input", { type: "date", className: "rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300" }), fo = ({ children: e, onSubmit: t }) => /* @__PURE__ */ b.jsx("form", { onSubmit: (o) => {
  o.preventDefault(), t == null || t();
}, children: e }), po = ({ children: e }) => /* @__PURE__ */ b.jsx("div", { className: "flex gap-2", children: e }), bo = () => /* @__PURE__ */ b.jsx("div", { children: "Other Component" });
export {
  Ot as ActionBus,
  no as Badge,
  mr as Box,
  It as Button,
  Zt as Caption,
  lo as Chart,
  eo as Checkbox,
  Bt as Col,
  Jt as Content,
  po as Controls,
  Vt as DashboardLayout,
  uo as DatePicker,
  Kt as Divider,
  Ee as EventType,
  fo as Form,
  Mt as FormField,
  ao as Icon,
  so as Image,
  Nt as Input,
  Qt as Label,
  Ht as Layout,
  io as Markdown,
  bo as Other,
  ro as RadioGroup,
  $t as Row,
  to as Select,
  Yt as Spacer,
  Xt as Text,
  oo as Textarea,
  qt as Title,
  co as Transition,
  Ce as Typography,
  Fe as actionBus,
  Wt as tokens,
  Dt as useActionBus,
  Gt as useAsyncAction,
  Ue as useDispatchAction,
  Lt as useSubscribeAction
};
