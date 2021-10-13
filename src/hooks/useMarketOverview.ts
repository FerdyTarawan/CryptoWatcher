import {secondsToMilliseconds} from "date-fns"
import type {QueryClient, UseQueryResult} from "react-query"
import {useQuery, useQueryClient} from "react-query"

import type {CurrencyPairs} from "_constants/currency"
import {MARKET_OVERVIEW_URL} from "_constants/url"
import type {MarketOverview, MarketOverviewResponse} from "_hooks/type/market"
import useCurrency from "_hooks/useCurrencyStore"
import {cryptoApi} from "_utils/api"
import {toPercentageString} from "_utils/string"

const defaultCurrency = useCurrency.getState().currency

const fetchMarketOverview = async (
  currency: CurrencyPairs = defaultCurrency,
): Promise<MarketOverviewResponse> => {
  const response = await cryptoApi.post<MarketOverviewResponse>(
    MARKET_OVERVIEW_URL,
    {currency},
  )

  if (!response.ok) {
    throw new Error(response.problem)
  }

  return response.data!
}

const transformMarketOverview = (
  queryData: MarketOverviewResponse,
): MarketOverview => ({
  btcDominance: toPercentageString(queryData.btcDominance),
  cap: queryData.cap.toString(),
  liquidity: queryData.liquidity.toString(),
  volume: queryData.volume.toString(),
})

const useMarketOverview = (
  currency: CurrencyPairs = defaultCurrency,
): UseQueryResult<MarketOverview, unknown> & {
  queryClient: QueryClient
} => {
  const queryInfo = useQuery(
    ["overview", {currency}],
    async () => await fetchMarketOverview(currency),
    {
      refetchInterval: secondsToMilliseconds(5),
      select: transformMarketOverview,
    },
  )
  const queryClient = useQueryClient()

  return {...queryInfo, queryClient}
}

export default useMarketOverview
