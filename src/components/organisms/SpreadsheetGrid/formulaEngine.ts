export type FormulaErrorCode = '#DIV/0!' | '#REF!' | '#NAME?' | '#VALUE!' | '#CYCLE!' | '#ERROR!'

export type FormulaError = {
  code: FormulaErrorCode
}

export type FormulaPrimitive = number | string | boolean | null
export type FormulaValue = FormulaPrimitive | FormulaError

export const isFormulaError = (v: FormulaValue): v is FormulaError => {
  return typeof v === 'object' && v !== null && 'code' in v
}

const err = (code: FormulaErrorCode): FormulaError => ({ code })

const isFormulaText = (raw: unknown): raw is string => {
  return typeof raw === 'string' && raw.trim().startsWith('=')
}

const normalizeScalar = (raw: unknown): FormulaValue => {
  if (raw === undefined || raw === null) return null
  if (typeof raw === 'number') return Number.isFinite(raw) ? raw : err('#VALUE!')
  if (typeof raw === 'boolean') return raw
  if (typeof raw === 'string') return raw
  return err('#VALUE!')
}

const toNumber = (v: FormulaValue): number | FormulaError => {
  if (isFormulaError(v)) return v
  if (v === null) return 0
  if (typeof v === 'number') return v
  if (typeof v === 'boolean') return v ? 1 : 0
  if (typeof v === 'string') {
    const t = v.trim()
    if (!t) return 0
    const n = Number(t)
    if (!Number.isFinite(n)) return err('#VALUE!')
    return n
  }
  return err('#VALUE!')
}

const truthy = (v: FormulaValue): boolean | FormulaError => {
  if (isFormulaError(v)) return v
  if (v === null) return false
  if (typeof v === 'boolean') return v
  if (typeof v === 'number') return v !== 0
  if (typeof v === 'string') return v.trim().length > 0
  return err('#VALUE!')
}

const columnLabelToIndex = (label: string): number => {
  const s = label.toUpperCase()
  let result = 0
  for (let i = 0; i < s.length; i += 1) {
    const code = s.charCodeAt(i)
    if (code < 65 || code > 90) return -1
    result = result * 26 + (code - 64)
  }
  return result - 1
}

export type CellAddress = { row: number; col: number }

export const parseCellRef = (ref: string): CellAddress | FormulaError => {
  const trimmed = ref.trim().replace(/\$/g, '')
  const m = /^([A-Za-z]{1,3})(\d+)$/.exec(trimmed)
  if (!m) return err('#REF!')
  const col = columnLabelToIndex(m[1])
  const row = Number(m[2]) - 1
  if (!Number.isFinite(row) || row < 0 || col < 0) return err('#REF!')
  return { row, col }
}

type TokenType =
  | 'number'
  | 'string'
  | 'ident'
  | 'cell'
  | 'eq'
  | 'ne'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'plus'
  | 'minus'
  | 'star'
  | 'slash'
  | 'caret'
  | 'lparen'
  | 'rparen'
  | 'comma'
  | 'colon'
  | 'eof'

type Token = { type: TokenType; value?: string; pos: number }

const tokenize = (input: string): Token[] | FormulaError => {
  const tokens: Token[] = []
  let i = 0

  const push = (type: TokenType, value?: string) => {
    tokens.push({ type, value, pos: i })
  }

  const isSpace = (ch: string) => ch === ' ' || ch === '\t' || ch === '\n'
  const isDigit = (ch: string) => ch >= '0' && ch <= '9'
  const isAlpha = (ch: string) => (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || ch === '_'

  while (i < input.length) {
    const ch = input[i]

    if (isSpace(ch)) {
      i += 1
      continue
    }

    if (ch === '+') {
      push('plus')
      i += 1
      continue
    }
    if (ch === '-') {
      push('minus')
      i += 1
      continue
    }
    if (ch === '*') {
      push('star')
      i += 1
      continue
    }
    if (ch === '/') {
      push('slash')
      i += 1
      continue
    }
    if (ch === '^') {
      push('caret')
      i += 1
      continue
    }
    if (ch === '(') {
      push('lparen')
      i += 1
      continue
    }
    if (ch === ')') {
      push('rparen')
      i += 1
      continue
    }
    if (ch === ',') {
      push('comma')
      i += 1
      continue
    }
    if (ch === ':') {
      push('colon')
      i += 1
      continue
    }

    if (ch === '=') {
      push('eq')
      i += 1
      continue
    }

    if (ch === '<') {
      const next = input[i + 1]
      if (next === '=') {
        push('lte')
        i += 2
        continue
      }
      if (next === '>') {
        push('ne')
        i += 2
        continue
      }
      push('lt')
      i += 1
      continue
    }

    if (ch === '>') {
      const next = input[i + 1]
      if (next === '=') {
        push('gte')
        i += 2
        continue
      }
      push('gt')
      i += 1
      continue
    }

    if (ch === '"') {
      const start = i
      i += 1
      let out = ''
      while (i < input.length) {
        const c = input[i]
        if (c === '"') {
          i += 1
          push('string', out)
          break
        }
        out += c
        i += 1
      }
      if (i >= input.length && input[input.length - 1] !== '"') {
        return err('#ERROR!')
      }
      if (tokens[tokens.length - 1]?.type !== 'string') {
        return err('#ERROR!')
      }
      void start
      continue
    }

    if (isDigit(ch) || (ch === '.' && i + 1 < input.length && isDigit(input[i + 1]))) {
      const start = i
      let text = ''
      while (i < input.length) {
        const c = input[i]
        if (isDigit(c) || c === '.') {
          text += c
          i += 1
        } else {
          break
        }
      }
      const n = Number(text)
      if (!Number.isFinite(n)) return err('#VALUE!')
      tokens.push({ type: 'number', value: String(n), pos: start })
      continue
    }

    if (ch === '$' || isAlpha(ch)) {
      const start = i
      let text = ''
      while (i < input.length) {
        const c = input[i]
        if (c === '$' || isAlpha(c) || isDigit(c)) {
          text += c
          i += 1
        } else {
          break
        }
      }

      const withoutDollar = text.replace(/\$/g, '')
      const cellMatch = /^([A-Za-z]{1,3})(\d+)$/.exec(withoutDollar)
      if (cellMatch) {
        tokens.push({ type: 'cell', value: withoutDollar.toUpperCase(), pos: start })
      } else {
        tokens.push({ type: 'ident', value: text.toUpperCase(), pos: start })
      }
      continue
    }

    return err('#ERROR!')
  }

  push('eof')
  return tokens
}

type AstNode =
  | { kind: 'number'; value: number }
  | { kind: 'string'; value: string }
  | { kind: 'boolean'; value: boolean }
  | { kind: 'cell'; ref: string }
  | { kind: 'range'; start: string; end: string }
  | { kind: 'unary'; op: '+' | '-'; expr: AstNode }
  | { kind: 'binary'; op: '+' | '-' | '*' | '/' | '^'; left: AstNode; right: AstNode }
  | { kind: 'compare'; op: '=' | '<>' | '>' | '>=' | '<' | '<='; left: AstNode; right: AstNode }
  | { kind: 'call'; name: string; args: AstNode[] }

const parse = (tokens: Token[]): AstNode | FormulaError => {
  let idx = 0

  const peek = () => tokens[idx]
  const consume = (type?: TokenType) => {
    const t = tokens[idx]
    if (!t) return null
    if (type && t.type !== type) return null
    idx += 1
    return t
  }

  const parsePrimary = (): AstNode | FormulaError => {
    const t = peek()
    if (!t) return err('#ERROR!')

    if (t.type === 'number') {
      consume()
      return { kind: 'number', value: Number(t.value) }
    }

    if (t.type === 'string') {
      consume()
      return { kind: 'string', value: t.value ?? '' }
    }

    if (t.type === 'cell') {
      consume()
      const cellRef = t.value ?? ''
      if (peek()?.type === 'colon') {
        consume('colon')
        const t2 = consume('cell')
        if (!t2?.value) return err('#REF!')
        return { kind: 'range', start: cellRef, end: t2.value }
      }
      return { kind: 'cell', ref: cellRef }
    }

    if (t.type === 'ident') {
      consume()
      const name = t.value ?? ''

      if (name === 'TRUE') {
        return { kind: 'boolean', value: true }
      }

      if (name === 'FALSE') {
        return { kind: 'boolean', value: false }
      }

      if (consume('lparen')) {
        const args: AstNode[] = []
        if (peek()?.type !== 'rparen') {
          while (true) {
            const expr = parseComparison()
            if (isFormulaError(expr as any)) return expr as any
            args.push(expr as AstNode)
            if (peek()?.type === 'comma') {
              consume('comma')
              continue
            }
            break
          }
        }
        if (!consume('rparen')) return err('#ERROR!')
        return { kind: 'call', name, args }
      }
      return err('#NAME?')
    }

    if (t.type === 'lparen') {
      consume('lparen')
      const expr = parseComparison()
      if (isFormulaError(expr as any)) return expr as any
      if (!consume('rparen')) return err('#ERROR!')
      return expr as AstNode
    }

    return err('#ERROR!')
  }

  const parseUnary = (): AstNode | FormulaError => {
    const t = peek()
    if (t?.type === 'plus') {
      consume('plus')
      const expr = parseUnary()
      if (isFormulaError(expr as any)) return expr as any
      return { kind: 'unary', op: '+', expr: expr as AstNode }
    }
    if (t?.type === 'minus') {
      consume('minus')
      const expr = parseUnary()
      if (isFormulaError(expr as any)) return expr as any
      return { kind: 'unary', op: '-', expr: expr as AstNode }
    }
    return parsePrimary()
  }

  const parsePower = (): AstNode | FormulaError => {
    let left = parseUnary()
    if (isFormulaError(left as any)) return left as any

    while (peek()?.type === 'caret') {
      consume('caret')
      const right = parseUnary()
      if (isFormulaError(right as any)) return right as any
      left = { kind: 'binary', op: '^', left: left as AstNode, right: right as AstNode }
    }

    return left
  }

  const parseComparison = (): AstNode | FormulaError => {
    let left = parseExpression()
    if (isFormulaError(left as any)) return left as any

    const t = peek()
    if (
      t?.type === 'eq' ||
      t?.type === 'ne' ||
      t?.type === 'gt' ||
      t?.type === 'gte' ||
      t?.type === 'lt' ||
      t?.type === 'lte'
    ) {
      consume()
      const right = parseExpression()
      if (isFormulaError(right as any)) return right as any

      const op =
        t.type === 'eq'
          ? '='
          : t.type === 'ne'
            ? '<>'
            : t.type === 'gt'
              ? '>'
              : t.type === 'gte'
                ? '>='
                : t.type === 'lt'
                  ? '<'
                  : '<='

      return { kind: 'compare', op, left: left as AstNode, right: right as AstNode }
    }

    return left
  }

  const parseTerm = (): AstNode | FormulaError => {
    let left = parsePower()
    if (isFormulaError(left as any)) return left as any

    while (true) {
      const t = peek()
      if (t?.type === 'star' || t?.type === 'slash') {
        consume()
        const right = parsePower()
        if (isFormulaError(right as any)) return right as any
        left = {
          kind: 'binary',
          op: t.type === 'star' ? '*' : '/',
          left: left as AstNode,
          right: right as AstNode,
        }
        continue
      }
      break
    }

    return left
  }

  const parseExpression = (): AstNode | FormulaError => {
    let left = parseTerm()
    if (isFormulaError(left as any)) return left as any

    while (true) {
      const t = peek()
      if (t?.type === 'plus' || t?.type === 'minus') {
        consume()
        const right = parseTerm()
        if (isFormulaError(right as any)) return right as any
        left = {
          kind: 'binary',
          op: t.type === 'plus' ? '+' : '-',
          left: left as AstNode,
          right: right as AstNode,
        }
        continue
      }
      break
    }

    return left
  }

  const result = parseComparison()
  if (isFormulaError(result as any)) return result as any
  if (peek()?.type !== 'eof') return err('#ERROR!')
  return result as AstNode
}

type EvalValue = FormulaValue | FormulaValue[]

const flatten = (values: EvalValue[]): FormulaValue[] => {
  const out: FormulaValue[] = []
  values.forEach((v) => {
    if (Array.isArray(v)) out.push(...v)
    else out.push(v)
  })
  return out
}

const compareScalars = (a: FormulaValue, b: FormulaValue): number | FormulaError => {
  if (isFormulaError(a)) return a
  if (isFormulaError(b)) return b

  const an = toNumber(a)
  const bn = toNumber(b)
  if (!isFormulaError(an as any) && !isFormulaError(bn as any)) {
    const x = an as number
    const y = bn as number
    if (x < y) return -1
    if (x > y) return 1
    return 0
  }

  const as = a === null ? '' : String(a)
  const bs = b === null ? '' : String(b)
  if (as < bs) return -1
  if (as > bs) return 1
  return 0
}

export type FormulaRuntime = {
  evaluateCell: (row: number, col: number) => FormulaValue
  evaluateFormula: (formulaText: string) => FormulaValue
}

export const createFormulaRuntime = (params: {
  rowCount: number
  colCount: number
  getCellRaw: (row: number, col: number) => unknown
}): FormulaRuntime => {
  const cache = new Map<string, FormulaValue>()
  const visiting = new Set<string>()

  const addrKey = (row: number, col: number) => `${row}:${col}`

  const evaluateCell = (row: number, col: number): FormulaValue => {
    if (row < 0 || col < 0 || row >= params.rowCount || col >= params.colCount) return err('#REF!')

    const key = addrKey(row, col)
    const cached = cache.get(key)
    if (cached !== undefined) return cached

    if (visiting.has(key)) return err('#CYCLE!')
    visiting.add(key)

    const raw = params.getCellRaw(row, col)
    let value: FormulaValue

    if (isFormulaText(raw)) {
      value = evaluateFormula(String(raw).trim().slice(1))
    } else {
      value = normalizeScalar(raw)
    }

    visiting.delete(key)
    cache.set(key, value)
    return value
  }

  const evalNode = (node: AstNode): EvalValue => {
    if (node.kind === 'number') return node.value
    if (node.kind === 'string') return node.value
    if (node.kind === 'boolean') return node.value

    if (node.kind === 'cell') {
      const addr = parseCellRef(node.ref)
      if (isFormulaError(addr as any)) return addr as any
      return evaluateCell((addr as CellAddress).row, (addr as CellAddress).col)
    }

    if (node.kind === 'range') {
      const a = parseCellRef(node.start)
      const b = parseCellRef(node.end)
      if (isFormulaError(a as any)) return a as any
      if (isFormulaError(b as any)) return b as any

      const aAddr = a as CellAddress
      const bAddr = b as CellAddress

      const r0 = Math.min(aAddr.row, bAddr.row)
      const r1 = Math.max(aAddr.row, bAddr.row)
      const c0 = Math.min(aAddr.col, bAddr.col)
      const c1 = Math.max(aAddr.col, bAddr.col)

      const out: FormulaValue[] = []
      for (let r = r0; r <= r1; r += 1) {
        for (let c = c0; c <= c1; c += 1) {
          out.push(evaluateCell(r, c))
        }
      }
      return out
    }

    if (node.kind === 'unary') {
      const v = evalNode(node.expr)
      if (Array.isArray(v)) return err('#VALUE!')
      const n = toNumber(v)
      if (isFormulaError(n as any)) return n as any
      return node.op === '-' ? -(n as number) : (n as number)
    }

    if (node.kind === 'binary') {
      const left = evalNode(node.left)
      const right = evalNode(node.right)
      if (Array.isArray(left) || Array.isArray(right)) return err('#VALUE!')

      const ln = toNumber(left)
      if (isFormulaError(ln as any)) return ln as any
      const rn = toNumber(right)
      if (isFormulaError(rn as any)) return rn as any

      const a = ln as number
      const b = rn as number

      if (node.op === '+') return a + b
      if (node.op === '-') return a - b
      if (node.op === '*') return a * b
      if (node.op === '/') {
        if (b === 0) return err('#DIV/0!')
        return a / b
      }
      if (node.op === '^') return Math.pow(a, b)

      return err('#ERROR!')
    }

    if (node.kind === 'compare') {
      const left = evalNode(node.left)
      const right = evalNode(node.right)
      if (Array.isArray(left) || Array.isArray(right)) return err('#VALUE!')

      const c = compareScalars(left, right)
      if (isFormulaError(c as any)) return c as any

      const cmp = c as number
      if (node.op === '=') return cmp === 0
      if (node.op === '<>') return cmp !== 0
      if (node.op === '>') return cmp > 0
      if (node.op === '>=') return cmp >= 0
      if (node.op === '<') return cmp < 0
      if (node.op === '<=') return cmp <= 0

      return err('#ERROR!')
    }

    if (node.kind === 'call') {
      const name = node.name
      const args = node.args.map((a) => evalNode(a))

      if (name === 'SUM') {
        const flat = flatten(args)
        let total = 0
        for (const v of flat) {
          const n = toNumber(v)
          if (isFormulaError(n as any)) {
            return n as any
          }
          total += n as number
        }
        return total
      }

      if (name === 'AVERAGE') {
        const flat = flatten(args)
        let total = 0
        let count = 0
        for (const v of flat) {
          const n = toNumber(v)
          if (isFormulaError(n as any)) {
            return n as any
          }
          total += n as number
          count += 1
        }
        if (count === 0) return err('#DIV/0!')
        return total / count
      }

      if (name === 'MIN' || name === 'MAX') {
        const flat = flatten(args)
        let best: number | null = null
        for (const v of flat) {
          const n = toNumber(v)
          if (isFormulaError(n as any)) {
            return n as any
          }
          const nn = n as number
          if (best === null) best = nn
          else best = name === 'MIN' ? Math.min(best, nn) : Math.max(best, nn)
        }
        return best ?? 0
      }

      if (name === 'IF') {
        const cond = args[0]
        const tVal = args.length > 1 ? args[1] : null
        const fVal = args.length > 2 ? args[2] : null

        if (Array.isArray(cond)) return err('#VALUE!')
        const c = truthy(cond)
        if (isFormulaError(c as any)) return c as any
        const chosen = (c as boolean) ? tVal : fVal
        if (Array.isArray(chosen)) return err('#VALUE!')
        return chosen as FormulaValue
      }

      return err('#NAME?')
    }

    return err('#ERROR!')
  }

  const evaluateFormula = (formulaText: string): FormulaValue => {
    const tokens = tokenize(formulaText)
    if (isFormulaError(tokens as any)) return tokens as any

    const ast = parse(tokens as Token[])
    if (isFormulaError(ast as any)) return ast as any

    const out = evalNode(ast as AstNode)
    if (Array.isArray(out)) return err('#VALUE!')
    return out as FormulaValue
  }

  return {
    evaluateCell,
    evaluateFormula,
  }
}
