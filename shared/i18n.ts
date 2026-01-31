/**
 * Multi-language ve Currency support
 */

// Desteklenen diller
export const SUPPORTED_LANGUAGES = [
  {
    code: 'tr',
    name: 'Türkçe',
    flag: '🇹🇷'
  },
  {
    code: 'en',
    name: 'English',
    flag: '🇬🇧'
  }
] as const;

export type LanguageCode = typeof SUPPORTED_LANGUAGES[number]['code'];

// Desteklenen para birimleri
export const SUPPORTED_CURRENCIES = [
  {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    locale: 'de-DE'
  },
  {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    locale: 'en-US'
  },
  {
    code: 'TRY',
    symbol: '₺',
    name: 'Turkish Lira',
    locale: 'tr-TR'
  }
] as const;

export type CurrencyCode = typeof SUPPORTED_CURRENCIES[number]['code'];

// Para birimi dönüşüm oranları (EUR bazlı)
export const EXCHANGE_RATES: Record<CurrencyCode, number> = {
  EUR: 1,
  USD: 1.08,
  TRY: 34.50
} as const;

/**
 * Para birimi çevirisi
 * @param amount EUR cinsinden tutar
 * @param toCurrency Hedef para birimi
 * @returns Çevrilmiş tutar
 */
export function convertCurrency(amount: number, toCurrency: CurrencyCode): number {
  const rate = EXCHANGE_RATES[toCurrency];
  return Math.round(amount * rate * 100) / 100;
}

/**
 * Para birimi formatlama
 * @param amount Tutar
 * @param currency Para birimi
 * @returns Formatlanmış tutar (örn: "1.250,00 €")
 */
export function formatCurrency(amount: number, currency: CurrencyCode): string {
  const currencyInfo = SUPPORTED_CURRENCIES.find(c => c.code === currency);
  if (!currencyInfo) return `${amount} €`;

  return new Intl.NumberFormat(currencyInfo.locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Tutarı farklı para birimlerinde gösterme
 * @param amount EUR cinsinden tutar
 * @returns Tüm para birimlerindeki tutarlar
 */
export function getAmountInAllCurrencies(amount: number): Record<CurrencyCode, string> {
  return {
    EUR: formatCurrency(amount, 'EUR'),
    USD: formatCurrency(convertCurrency(amount, 'USD'), 'USD'),
    TRY: formatCurrency(convertCurrency(amount, 'TRY'), 'TRY')
  };
}
