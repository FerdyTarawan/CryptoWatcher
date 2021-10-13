import type {CurrencyPairs} from "_constants/currency"
import type {CoinResponse} from "_hooks/type/coin"

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

export type CoinListResponse = CoinResponse[]

export interface CoinListData {
  code: string
  name: string
  png64: string
  rate: string
  symbol: string
  webp64: string
}
