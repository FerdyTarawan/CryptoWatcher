import type {CurrencyPairs} from "_constants/currency"

export interface MarketOverviewResponse {
  btcDominance: number
  cap: number
  liquidity: number
  volume: number
}

export interface MarketOverview {
  btcDominance: string
  cap: string
  liquidity: string
  volume: string
}

export interface CoinListRequest {
  currency: CurrencyPairs
  limit: number
  meta: boolean
  offset: number
  order: string
  sort: string
}

export interface CoinListResponse {
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

export interface CoinList {
  code: string
  name: string
  png64: string
  rate: string
  symbol: string
  webp64: string
}
