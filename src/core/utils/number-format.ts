export function amountFormatter(number: number | undefined, currency?: string, language?: string): string {
  return number === undefined
    ? ''
    : new Intl.NumberFormat(language || 'de-DE', {
        style: 'currency',
        currency: currency || 'EUR',
        minimumFractionDigits: number % 1 != 0 ? 2 : 0,
      }).format(number ?? 0);
}
