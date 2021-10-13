import type {CurrencyPairs} from "_constants/currency"

export interface CoinResponse {
  allTimeHighUSD: number
  cap: number
  circulatingSupply: number
  code: string
  color: string
  exchanges: number
  markets: number
  maxSupply: number
  name: string
  pairs: number
  png32: string
  png64: string
  rate: number
  symbol: string
  totalSupply: number
  volume: number
  webp32: string
  webp64: string
}

export interface Coin {
  allTimeHighUSD: number
  cap: number
  circulatingSupply: number
  code: string
  maxSupply: number
  name: string
  png64: string
  rate: number
  rateString: string
  symbol: string
  totalSupply: number
  volume: number
  webp64: string
}

export interface CoinHistoryData {
  cap: number
  date: number // unix time
  rate: number
  volume: number
}

export interface CoinPriceHistory {
  date: number
  rate: number
}

export type CoinHistory = CoinHistoryData[]
export type CoinPriceHistory = CoinPriceHistory[]

export interface CoinHistoryResponse {
  history: CoinHistoryData[]
}

export interface CoinRequest {
  code: string
  currency: CurrencyPairs
  meta: boolean
}

export interface CoinHistoryRequest {
  code: string
  currency: CurrencyPairs
  end: number // Unix time
  start: number // Unix time
}
