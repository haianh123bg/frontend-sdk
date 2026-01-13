var y = Object.defineProperty;
var O = (e, t, r) => t in e ? y(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var h = (e, t, r) => O(e, typeof t != "symbol" ? t + "" : t, r);
import * as a from "react";
import { useRef as D, useEffect as _ } from "react";
import { j as g } from "./jsx-runtime-DGlMoOmv.js";
import { a as T } from "./types-CglsW3cy.js";
const Q = {
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
}, S = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, U = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g, b = (e) => {
  if (typeof e == "string") {
    let t = e;
    return t = t.replace(S, "[REDACTED_EMAIL]"), t = t.replace(U, "[REDACTED_PHONE]"), t;
  }
  if (Array.isArray(e))
    return e.map(b);
  if (typeof e == "object" && e !== null) {
    const t = {};
    for (const r in e)
      t[r] = b(e[r]);
    return t;
  }
  return e;
}, W = (e) => async (t) => {
  var r;
  if ((r = t.flags) != null && r.sensitive) {
    const s = {
      ...t,
      payload: b(t.payload)
    };
    return e(s);
  }
  return e(t);
}, I = 10, k = 5e3, M = "/telemetry/event";
class C {
  constructor() {
    h(this, "queue", []);
    h(this, "timer", null);
    this.startTimer();
  }
  startTimer() {
    this.timer || (this.timer = setInterval(() => this.flush(), k));
  }
  async flush() {
    if (this.queue.length === 0) return;
    const t = [...this.queue];
    this.queue = [];
    try {
      process.env.NODE_ENV !== "test" && console.log(`[AuditLogger] Mock send ${t.length} events to ${M}`);
    } catch (r) {
      console.error("[AuditLogger] Failed to send events, requeuing", r), this.queue = [...t, ...this.queue];
    }
  }
  log(t) {
    this.queue.push(t), this.queue.length >= I && this.flush();
  }
}
const L = new C(), Y = (e) => async (t) => {
  var r;
  await e(t), (r = t.flags) != null && r.persist && L.log(t);
}, v = a.createContext(null), j = ({ children: e, sockets: t }) => {
  const r = a.useRef(t);
  a.useEffect(() => {
    r.current = t;
  }, [t]);
  const s = a.useMemo(
    () => ({
      getSocket: (o) => r.current[o],
      subscribe: (o, u, c) => {
        const n = r.current[o];
        if (!n)
          return process.env.NODE_ENV !== "production" && console.warn(`[SocketProvider] Socket channel "${o}" is not available`), () => {
          };
        const f = (p) => {
          c(p);
        };
        return n.on(u, f), () => {
          n.off(u, f);
        };
      },
      emit: (o, u, c) => {
        const n = r.current[o];
        if (!n) {
          process.env.NODE_ENV !== "production" && console.warn(`[SocketProvider] Socket channel "${o}" is not available`);
          return;
        }
        n.emit(u, c);
      }
    }),
    []
  );
  return /* @__PURE__ */ g.jsx(v.Provider, { value: s, children: e });
}, m = () => {
  const e = a.useContext(v);
  if (!e)
    throw new Error("useSocketContext must be used within SocketProvider");
  return e;
}, ee = (e, t, r) => {
  const { subscribe: s } = m(), o = D(r);
  _(() => {
    o.current = r;
  }, [r]), _(() => {
    const u = s(e, t, (c) => {
      o.current && o.current(c);
    });
    return () => {
      u();
    };
  }, [e, t, s]);
}, te = () => {
  const { emit: e } = m();
  return (t, r, s) => {
    e(t, r, s);
  };
}, x = "ai-events", B = "event", R = "ai-control", w = "command", V = (e) => !0, q = (e) => {
  var t, r, s;
  return {
    id: e.id,
    direction: "UI→AI",
    type: String(e.type),
    target: {
      component: (t = e.meta) == null ? void 0 : t.component,
      instanceId: (r = e.meta) == null ? void 0 : r.instanceId,
      path: (s = e.meta) == null ? void 0 : s.path
    },
    payload: e.payload,
    meta: {
      ...e.meta,
      source: e.source,
      flags: e.flags
    },
    timestamp: e.timestamp
  };
}, F = (e) => e.direction && e.direction !== "AI→UI" ? null : {
  type: e.type,
  payload: e.payload,
  source: "ai",
  meta: {
    ...e.meta || {},
    target: e.target
  },
  flags: {
    priority: "high",
    persist: !0
  }
}, P = ({ socket: e, config: t }) => {
  const r = (t == null ? void 0 : t.enabled) !== !1;
  let s = null, o = null;
  if (r) {
    const c = t == null ? void 0 : t.outbound, n = t == null ? void 0 : t.inbound, f = (c == null ? void 0 : c.enabled) !== !1, p = (n == null ? void 0 : n.enabled) !== !1;
    if (f) {
      const E = (c == null ? void 0 : c.channel) || x, N = (c == null ? void 0 : c.eventName) || B, A = (c == null ? void 0 : c.filter) || V, d = (c == null ? void 0 : c.mapEventToMessage) || q;
      s = T.subscribeAll((l) => {
        try {
          if (!A(l)) return;
          const i = d(l);
          if (!i) return;
          e.emit(E, N, i);
        } catch (i) {
          process.env.NODE_ENV !== "production" && console.error("[AiBridge] Outbound error", i);
        }
      });
    }
    if (p) {
      const E = (n == null ? void 0 : n.channel) || R, N = (n == null ? void 0 : n.eventName) || w, A = (n == null ? void 0 : n.mapMessageToEvent) || F, d = n == null ? void 0 : n.onMessage;
      o = e.subscribe(E, N, (l) => {
        try {
          d && d(l);
          const i = A(l);
          if (!i) return;
          T.publish(i);
        } catch (i) {
          process.env.NODE_ENV !== "production" && console.error("[AiBridge] Inbound error", i);
        }
      });
    }
  }
  return { dispose: () => {
    s && (s.unsubscribe(), s = null), o && (o(), o = null);
  } };
}, re = ({ children: e, config: t }) => {
  const r = m(), s = a.useRef(null);
  return a.useEffect(() => (s.current && (s.current.dispose(), s.current = null), s.current = P({
    socket: {
      subscribe: r.subscribe,
      emit: r.emit
    },
    config: t
  }), () => {
    s.current && (s.current.dispose(), s.current = null);
  }), [r, t]), /* @__PURE__ */ g.jsx(g.Fragment, { children: e });
}, H = "ai-events", Z = "event", $ = "ai-control", G = "command", se = () => {
  const { emit: e } = m(), t = a.useCallback(
    (s) => {
      e(H, Z, {
        ...s,
        direction: "UI→AI"
      });
    },
    [e]
  ), r = a.useCallback(
    (s) => {
      e($, G, {
        ...s,
        direction: "AI→UI"
      });
    },
    [e]
  );
  return a.useMemo(
    () => ({
      sendUiEvent: t,
      sendCommand: r
    }),
    [t, r]
  );
};
export {
  re as A,
  j as S,
  Y as a,
  ee as b,
  te as c,
  se as d,
  W as p,
  Q as t,
  m as u
};
