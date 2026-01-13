import { B as U, C as P, D as _, a as v, I as z, S as G, b as W } from "../chunks/Switch-CQj_EZyS.js";
import { u as g, a as T, b as A, c as E, d as k, e as x } from "../chunks/FormSubmitButton-C0poo5f0.js";
import { A as $, C as H, i as J, j as K, m as N, q as Q, k as X, p as Y, F as ee, l as re, M as te, O as oe, R as se, f as ae, n as ne, o as ue, S as ie, g as ce, T as le, h as fe } from "../chunks/FormSubmitButton-C0poo5f0.js";
import { j as I } from "../chunks/jsx-runtime-DGlMoOmv.js";
import { useState as O, useCallback as f } from "react";
import { c as m } from "../chunks/types-CglsW3cy.js";
function V({ name: i, children: e, ...o }) {
  const { control: r } = g(), t = T({
    control: r,
    name: i,
    ...o
  });
  return /* @__PURE__ */ I.jsx(I.Fragment, { children: e(t) });
}
function L(i) {
  const { schema: e, formOptions: o, request: r, parseError: t, onSuccess: a, onError: s, onFinally: l } = i, c = e ? A({
    schema: e,
    ...o || {}
  }) : E(o || {}), { setFormErrors: F, formRef: h } = k(c), { handleSubmit: n, isSubmitting: u, formError: S, data: y } = x({
    request: r,
    parseError: t,
    onSuccess: a,
    onError: (p) => {
      const b = F(p);
      return s == null || s(p), b;
    },
    onFinally: l
  });
  return {
    methods: c,
    formRef: h,
    handleSubmit: n,
    isSubmitting: u,
    formError: S,
    data: y
  };
}
function w(i, e, o = {}) {
  const [r, t] = O(0), a = o.shouldFocus ?? !0, s = f(
    async (n) => {
      const u = e[n];
      return !u || !u.fields || u.fields.length === 0 ? !0 : i.trigger(u.fields, { shouldFocus: a });
    },
    [i, a, e]
  ), l = f(async () => await s(r) ? (r < e.length - 1 && t((u) => u + 1), !0) : !1, [r, e.length, s]), c = f(() => {
    t((n) => n > 0 ? n - 1 : n);
  }, []), F = f(
    async (n, u) => n < 0 || n >= e.length || u != null && u.validate && !await s(r) ? !1 : (t(n), !0),
    [r, e.length, s]
  ), h = f(() => {
    t(0);
  }, []);
  return {
    stepIndex: r,
    currentStep: e[r],
    steps: e,
    isFirstStep: r === 0,
    isLastStep: r === e.length - 1,
    next: l,
    back: c,
    goTo: F,
    reset: h
  };
}
const d = (i, e) => {
  var t, a;
  const o = (t = i.meta) == null ? void 0 : t.target;
  if (o != null && o.instanceId && o.instanceId !== e)
    return !1;
  const r = (a = i.payload) == null ? void 0 : a.instanceId;
  return !(r && r !== e);
};
function j(i) {
  const { instanceId: e, methods: o, formRef: r } = i;
  m(
    "AI.FORM.FILL_FIELDS",
    (t) => {
      var s;
      if (!d(t, e)) return;
      const a = (s = t.payload) == null ? void 0 : s.values;
      a && Object.entries(a).forEach(([l, c]) => {
        o.setValue(l, c, {
          shouldDirty: !0,
          shouldTouch: !0,
          shouldValidate: !0
        });
      });
    },
    [e, o]
  ), m(
    "AI.FORM.SET_FIELD",
    (t) => {
      if (!d(t, e)) return;
      const { name: a, value: s } = t.payload || {};
      a && o.setValue(a, s, {
        shouldDirty: !0,
        shouldTouch: !0,
        shouldValidate: !0
      });
    },
    [e, o]
  ), m(
    "AI.FORM.RESET",
    (t) => {
      var s;
      if (!d(t, e)) return;
      const a = (s = t.payload) == null ? void 0 : s.values;
      a ? o.reset(a) : o.reset();
    },
    [e, o]
  ), m(
    "AI.FORM.FOCUS_FIELD",
    (t) => {
      if (!d(t, e)) return;
      const { name: a } = t.payload || {};
      if (a && (typeof o.setFocus == "function" && o.setFocus(a), r != null && r.current)) {
        const s = r.current.querySelector(`[name="${a}"]`);
        s && typeof s.focus == "function" && (s.focus(), typeof s.scrollIntoView == "function" && s.scrollIntoView({ block: "center", behavior: "smooth" }));
      }
    },
    [e, o, r]
  ), m(
    "AI.FORM.SUBMIT",
    (t) => {
      d(t, e) && r != null && r.current && typeof r.current.requestSubmit == "function" && r.current.requestSubmit();
    },
    [e, r]
  );
}
export {
  $ as AvatarUpload,
  U as Button,
  P as Checkbox,
  H as Controller,
  _ as DatePicker,
  v as DatetimePicker,
  J as FileUploader,
  K as FileUploaderSelectedFiles,
  N as Form,
  Q as FormErrorBanner,
  X as FormField,
  V as FormFieldArray,
  Y as FormFieldController,
  ee as FormProvider,
  re as FormSubmitButton,
  z as Input,
  te as MaskedInput,
  oe as OptionSourceType,
  se as Radio,
  ae as RadioGroup,
  ne as SchemaForm,
  ue as SchemaType,
  G as Select,
  ie as SelectLazy,
  ce as Slider,
  W as Switch,
  le as Textarea,
  fe as ThemeSwitch,
  L as useApiForm,
  E as useForm,
  j as useFormAiControl,
  g as useFormContext,
  k as useFormErrors,
  x as useFormSubmit,
  w as useFormWizard,
  A as useZodForm
};
