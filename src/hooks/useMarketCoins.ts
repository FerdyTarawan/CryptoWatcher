import {secondsToMilliseconds} from "date-fns"
import type {QueryClient, UseQueryResult} from "react-query"
import {useQuery, useQueryClient} from "react-query"

import {MARKET_LISTING_URL} from "_constants/url"
import type {
  CoinListData,
  CoinListRequest,
  CoinListResponse,
} from "_hooks/type/market"
import useCurrency from "_hooks/useCurrencyStore"
import {cryptoApi} from "_utils/api"
import {Currencies, Money, formatCurrency} from "_utils/money"

const defaultCurrency = useCurrency.getState().currency

export const defaultCoinListRequestParams: CoinListRequest = {
  currency: defaultCurrency,
  limit: 50,
  meta: true,
  offset: 0,
  order: "ascending",
  sort: "rank",
}

const fetchCoinList = async (
  params: CoinListRequest = defaultCoinListRequestParams,
): Promise<CoinListResponse> => {
  const response = await cryptoApi.post<CoinListResponse>(MARKET_LISTING_URL, {
    ...params,
  })

  if (!response.ok) {
    throw new Error(response.problem)
  }

  return response.data!
}

const transformCoinList =
  (currency: string = defaultCurrency) =>
  (queryData: CoinListResponse): CoinListData[] =>
    queryData.map(coin => ({
      ...coin,
      rate: formatCurrency(
        // @ts-ignore
        Money.fromDecimal(coin.rate, Currencies[currency], "ceil"),
      ),
    }))

const useMarketCoins = (
  params: CoinListRequest = defaultCoinListRequestParams,
): UseQueryResult<CoinListData[], unknown> & {
  queryClient: QueryClient
} => {
  const queryInfo = useQuery(
    ["coins", {...params}],
    async () => await fetchCoinList(params),
    {
      refetchInterval: secondsToMilliseconds(5),
      select: transformCoinList(params.currency),
    },
  )
  const queryClient = useQueryClient()

  return {...queryInfo, queryClient}
}

export default useMarketCoins
