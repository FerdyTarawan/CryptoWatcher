export const CURRENCY_PAIRS = [
  "USD",
  "EUR",
  "JPY",
  "GBP",
  "AUD",
  "SGD",
  "IDR",
  "BTC",
] as const
export type CurrencyPairs = typeof CURRENCY_PAIRS[number]
