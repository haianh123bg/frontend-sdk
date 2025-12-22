export function toDate(value: string | number): Date {
  if (typeof value === 'number') return new Date(value)
  const d = new Date(value)
  return d
}

export function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

export function isYesterday(d: Date, now: Date): boolean {
  const y = new Date(now)
  y.setDate(now.getDate() - 1)
  return isSameDay(d, y)
}

export function formatDateSeparatorLabel(createdAt: string | number, now = new Date()): string {
  const d = toDate(createdAt)
  if (isSameDay(d, now)) return 'Hôm nay'
  if (isYesterday(d, now)) return 'Hôm qua'
  return new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(d)
}

export function formatMessageTime(createdAt: string | number, now = new Date()): string {
  const d = toDate(createdAt)
  if (isSameDay(d, now)) {
    return new Intl.DateTimeFormat('vi-VN', { hour: '2-digit', minute: '2-digit' }).format(d)
  }
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
}

export function isProbablyUrl(text: string): boolean {
  return /^https?:\/\//i.test(text)
}
