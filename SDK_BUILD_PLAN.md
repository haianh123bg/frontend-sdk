# SDK Build Plan: React Frontend Component Library
**Role:** Senior Frontend Architect  
**Target:** Production-ready npm package (SDK Template)  
**Design Philosophy:** Flat Design, No Borders, No Shadows, Soft/Rounded Corners.

---

## 1. Technology Stack & Standards

| Category | Technology | Configuration Notes |
| :--- | :--- | :--- |
| **Language** | TypeScript 5.x | Strict mode, Interface-first design |
| **Core** | React 18 | Externalized peer dependency |
| **Build Tool** | Vite 5 | Library Mode (Build formats: ESM, CJS) |
| **Styling** | Tailwind CSS | Utility-first, CSS Variables for Theming |
| **Linting** | ESLint + Prettier | Recommended config, Auto-fix enabled |
| **Testing** | Vitest | Unit testing core logic & components |
| **Doc/Dev** | Storybook | Component isolation & documentation |
| **Package** | npm/pnpm | `exports` field configuration for modern bundlers |

---

## 2. Architecture Overview

### 2.1. Core Pattern: ActionBus (In-Memory Pub/Sub)
Thay vì truyền props callback sâu (prop-drilling), các components sẽ emit events lên `ActionBus`.
- **Flow:** Component -> `useDispatchAction` -> Middleware Pipeline (PII Filter, Audit) -> Subscribers.
- **Features:** Async support, Cancellation, Event ordering, Correlation IDs.

### 2.2. Styling Strategy (Flat & Soft)
- **Constraint:** Không sử dụng `border` hoặc `box-shadow` để phân tách UI.
- **Solution:** Sử dụng sự tương phản màu sắc (Color Contrast) và Spacing.
- **Theming:**
    - Định nghĩa Design Tokens tại `src/styles/tokens.ts`.
    - Map tokens vào CSS Variables tại `src/styles/base.css`.
    - Tailwind config sử dụng CSS Variables.

### 2.3. Project Structure
```text
root/
├── .storybook/             # Storybook config
├── src/
│   ├── __tests__/          # Integration tests
│   ├── bus/                # ActionBus Core & Hooks
│   ├── components/         # UI Components
│   │   ├── atoms/          # Button, Input, Icon...
│   │   ├── molecules/      # FormField, SearchBar...
│   │   └── organisms/      # DashboardLayout, Complex Widgets...
│   ├── events/             # Type definitions & Schemas
│   ├── middleware/         # ActionBus Middlewares (PII, Logger)
│   ├── styles/             # CSS, Tokens, Tailwind setup
│   ├── utils/              # Helpers (ID generator)
│   └── index.ts            # Main Entry Point
├── package.json
├── vite.config.ts
└── tailwind.config.cjs
```

---

## 3. Implementation Roadmap

### Phase 1: Scaffolding & Infrastructure
- [ ] Initialize Vite project (React-TS).
- [ ] Configure ESLint, Prettier.
- [ ] Setup Tailwind CSS with specific "Flat/No-Border" constraints.
- [ ] Configure Vite for Library Build (Rollup options, externalizing React).

### Phase 2: Core Logic (The "Brain")
- [ ] **Events:** Define `EventType`, `ActionEvent` interfaces.
- [ ] **ActionBus:** Implement Pub/Sub logic, subscriber management.
- [ ] **Middleware:** Implement `Executor` pattern for middleware pipeline.
    - *PII Filter:* Redact sensitive data.
    - *Audit Logger:* Batch & debounce logging to mock endpoint.
- [ ] **Hooks:** `useDispatchAction`, `useSubscribeAction`.

### Phase 3: Design System Foundation (The "Look")
- [ ] **Tokens:** Define colors, spacing, radiuses in `src/styles/tokens.ts`.
    - *Radius:* `lg`, `xl`, `2xl` (Soft corners).
    - *Colors:* Slate/Zinc palette for backgrounds (depth without shadow).
- [ ] **Base CSS:** Setup CSS Variables for Light/Dark mode switching.
- [ ] **Tailwind Config:** Extend theme to use the defined variables.

### Phase 4: Component Implementation (The "Body")
*All components must integrate `useDispatchAction` for telemetry/events.*

**Group A: Primitives (Atoms)**
- [ ] **Button:** Variants (Primary, Secondary, Ghost). No borders.
- [ ] **Typography:** Title, Text, Caption, Label.
- [ ] **Layout Primitives:** Box, Row, Col, Spacer, Divider.
- [ ] **Icon:** Wrapper for SVG icons.

**Group B: Data Entry**
- [ ] **Input / Textarea:** Soft background style, no border lines.
- [ ] **Checkbox / Radio:** Custom SVG styled.
- [ ] **Select:** Dropdown with soft rounding.
- [ ] **DatePicker:** Flat calendar design.

**Group C: Feedback & Complex**
- [ ] **Badge:** Soft background pills.
- [ ] **FormField:** Wrapper with Label + Error handling.
- [ ] **Transition:** Animation wrappers.
- [ ] **Chart / Image:** Placeholders/Wrappers.

**Group D: Layouts**
- [ ] **DashboardLayout:** Sidebar + Header + Content Area.

### Phase 5: Documentation & Testing
- [ ] **Storybook:** Create stories for key components (Button, FormField).
- [ ] **Unit Tests:** Test ActionBus logic, Middleware, and basic Component rendering.
- [ ] **README:** Documentation on installation, usage, and theming.

---

## 4. Detailed Specifications

### 4.1. Functional Requirements (Core)
- **ActionBus:** Must support `subscribeAll` for global logging.
- **Middleware:**
    - `piiFilter.ts`: Regex matching for email/phone if `flags.sensitive` is true.
    - `auditLogger.ts`: Accumulate events, send every 5s or when batch size > 10.

### 4.2. Component List to Generate
| Component | Type | Notes |
| :--- | :--- | :--- |
| Controls | Atom | Wrapper/Logic |
| Button | Atom | Primary/Secondary/Destructive |
| DatePicker | Molecule | Flat design calendar |
| Select | Atom | Native or Custom UI |
| Checkbox | Atom | Custom SVG |
| RadioGroup | Molecule | |
| Input | Atom | `bg-surface-alt` style |
| Textarea | Atom | |
| Form | Organism | Context provider |
| Layout, Box, Row, Col | Atom | Flexbox utilities |
| Spacer, Divider | Atom | Visual separators |
| Typography, Text, Title | Atom | Font scale implementation |
| Caption, Label | Atom | |
| Markdown | Molecule | React-markdown wrapper stub |
| Content | Atom | Container |
| Image | Atom | With fallback |
| Icon | Atom | SVG passthrough |
| Chart | Molecule | Recharts/ChartJS wrapper stub |
| Badge | Atom | Status indicator |
| Other | Atom | Catch-all |
| Transition | Atom | Framer Motion or CSS transition |

### 4.3. Design Rules (Flat + Soft)
1.  **No Borders:** Never use `border-solid`. Use `bg-gray-100` vs `bg-white`.
2.  **No Shadows:** Avoid `shadow-md`, `drop-shadow`.
3.  **Rounding:** Default to `rounded-xl` or `rounded-2xl` for containers. `rounded-full` for buttons.
4.  **Interaction:** Use `brightness-95` or `bg-opacity` changes on hover/active.

---

## 5. Execution Command
Ready to generate code. The output will strictly follow the file constraints:
- Valid TypeScript/TSX.
- Runnable `pnpm build`.
- No secrets.
