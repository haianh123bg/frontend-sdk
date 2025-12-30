export function formatCurrency(value: number, currency: string) {
  try {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency }).format(value)
  } catch {
    return String(value)
  }
}
