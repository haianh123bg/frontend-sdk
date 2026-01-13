var o = Object.defineProperty;
var h = (r, s, i) => s in r ? o(r, s, { enumerable: !0, configurable: !0, writable: !0, value: i }) : r[s] = i;
var t = (r, s, i) => h(r, typeof s != "symbol" ? s + "" : s, i);
import { useCallback as m, useRef as S, useEffect as l } from "react";
let n;
const g = new Uint8Array(16);
function I() {
  if (!n && (n = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !n))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return n(g);
}
const c = [];
for (let r = 0; r < 256; ++r)
  c.push((r + 256).toString(16).slice(1));
function U(r, s = 0) {
  return c[r[s + 0]] + c[r[s + 1]] + c[r[s + 2]] + c[r[s + 3]] + "-" + c[r[s + 4]] + c[r[s + 5]] + "-" + c[r[s + 6]] + c[r[s + 7]] + "-" + c[r[s + 8]] + c[r[s + 9]] + "-" + c[r[s + 10]] + c[r[s + 11]] + c[r[s + 12]] + c[r[s + 13]] + c[r[s + 14]] + c[r[s + 15]];
}
const A = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), a = {
  randomUUID: A
};
function R(r, s, i) {
  if (a.randomUUID && !r)
    return a.randomUUID();
  r = r || {};
  const e = r.random || (r.rng || I)();
  return e[6] = e[6] & 15 | 64, e[8] = e[8] & 63 | 128, U(e);
}
class E {
  constructor() {
    t(this, "subscribers", /* @__PURE__ */ new Map());
    t(this, "globalSubscribers", /* @__PURE__ */ new Set());
    t(this, "middlewares", []);
    t(this, "handlerPipeline", null);
    this.handlerPipeline = async (s) => {
      this.notifySubscribers(s);
    };
  }
  use(s) {
    this.middlewares.push(s), this.rebuildPipeline();
  }
  rebuildPipeline() {
    let s = async (i) => {
      this.notifySubscribers(i);
    };
    for (let i = this.middlewares.length - 1; i >= 0; i--)
      s = this.middlewares[i](s);
    this.handlerPipeline = s;
  }
  notifySubscribers(s) {
    const i = this.subscribers.get(s.type);
    i && i.forEach((e) => {
      try {
        e(s);
      } catch (u) {
        console.error(`[ActionBus] Error in subscriber for ${s.type}:`, u);
      }
    }), this.globalSubscribers.forEach((e) => {
      try {
        e(s);
      } catch (u) {
        console.error("[ActionBus] Error in global subscriber:", u);
      }
    });
  }
  publish(s) {
    const i = {
      ...s,
      id: R(),
      timestamp: Date.now()
    };
    this.handlerPipeline && Promise.resolve(this.handlerPipeline(i)).catch((e) => {
      console.error("[ActionBus] Pipeline error:", e);
    });
  }
  subscribe(s, i) {
    return this.subscribers.has(s) || this.subscribers.set(s, /* @__PURE__ */ new Set()), this.subscribers.get(s).add(i), {
      unsubscribe: () => {
        const e = this.subscribers.get(s);
        e && (e.delete(i), e.size === 0 && this.subscribers.delete(s));
      }
    };
  }
  subscribeAll(s) {
    return this.globalSubscribers.add(s), {
      unsubscribe: () => {
        this.globalSubscribers.delete(s);
      }
    };
  }
}
const b = new E(), M = () => b, O = () => m(
  (s, i, e) => {
    b.publish({
      type: s,
      payload: i,
      source: (e == null ? void 0 : e.source) || "component",
      meta: e == null ? void 0 : e.meta,
      flags: e == null ? void 0 : e.flags
    });
  },
  []
), V = (r, s, i = []) => {
  const e = S(s);
  l(() => {
    e.current = s;
  }, [s]), l(() => {
    const u = b.subscribe(r, (d) => {
      e.current && e.current(d);
    });
    return () => {
      u.unsubscribe();
    };
  }, [r, ...i]);
}, f = () => {
};
var p = /* @__PURE__ */ ((r) => (r.UI_CLICK = "UI.CLICK", r.UI_HOVER = "UI.HOVER", r.UI_CHANGE = "UI.CHANGE", r.FORM_SUBMIT = "FORM.SUBMIT", r.FORM_VALIDATE = "FORM.VALIDATE", r.SYSTEM_INIT = "SYSTEM.INIT", r.SYSTEM_ERROR = "SYSTEM.ERROR", r.NAV_ROUTE = "NAV.ROUTE", r))(p || {});
export {
  E as A,
  p as E,
  b as a,
  O as b,
  V as c,
  f as d,
  M as u,
  R as v
};
