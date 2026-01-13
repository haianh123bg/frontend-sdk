"use strict";const i=require("./jsx-runtime-BYECrxsp.cjs"),s=require("react"),b=require("./bundle-mjs-jYufibJ6.cjs"),h=require("./Icon-CBip1fSL.cjs");function g(t){const e=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(t){for(const r in t)if(r!=="default"){const o=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(e,r,o.get?o:{enumerable:!0,get:()=>t[r]})}}return e.default=t,Object.freeze(e)}const j=g(s),x={xs:"h-8 w-8",sm:"h-9 w-9",md:"h-10 w-10",lg:"h-11 w-11"},d=j.forwardRef(({icon:t,size:e="sm",variant:r="muted",className:o,disableHover:c=!1,...n},a)=>i.jsxRuntimeExports.jsx("button",{ref:a,type:"button",className:b.clsx("flex items-center justify-center rounded-full transition-colors",!c&&"hover:bg-slate-100",x[e],o),...n,children:i.jsxRuntimeExports.jsx(h.Icon,{icon:t,size:e,variant:r})}));d.displayName="IconButton";/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),y=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,r,o)=>o?o.toUpperCase():r.toLowerCase()),l=t=>{const e=y(t);return e.charAt(0).toUpperCase()+e.slice(1)},m=(...t)=>t.filter((e,r,o)=>!!e&&e.trim()!==""&&o.indexOf(e)===r).join(" ").trim(),I=t=>{for(const e in t)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var R={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=s.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:r=2,absoluteStrokeWidth:o,className:c="",children:n,iconNode:a,...u},f)=>s.createElement("svg",{ref:f,...R,width:e,height:e,stroke:t,strokeWidth:o?Number(r)*24/Number(e):r,className:m("lucide",c),...!n&&!I(u)&&{"aria-hidden":"true"},...u},[...a.map(([p,w])=>s.createElement(p,w)),...Array.isArray(n)?n:[n]]));/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=(t,e)=>{const r=s.forwardRef(({className:o,...c},n)=>s.createElement(A,{ref:n,iconNode:e,className:m(`lucide-${C(l(t))}`,`lucide-${t}`,o),...c}));return r.displayName=l(t),r};exports.IconButton=d;exports.createLucideIcon=k;
