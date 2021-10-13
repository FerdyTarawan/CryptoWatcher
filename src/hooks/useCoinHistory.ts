import {secondsToMilliseconds} from "date-fns"
import type {QueryClient, UseQueryResult} from "react-query"
import {useQuery, useQueryClient} from "react-query"

import {COIN_DETAIL_HISTORY_URL} from "_constants/url"
import type {
  CoinHistoryRequest,
  CoinHistoryResponse,
  CoinPriceHistories,
} from "_hooks/type/coin"
import {cryptoApi} from "_utils/api"

const fetchCoinHistory = async (
  params: CoinHistoryRequest,
): Promise<CoinHistoryResponse> => {
  const response = await cryptoApi.post<CoinHistoryResponse>(
    COIN_DETAIL_HISTORY_URL,
    {
      ...params,
    },
  )

  if (!response.ok) {
    throw new Error(response.problem)
  }

  return response.data!
}

const transformCoinHistory = (
  queryData: CoinHistoryResponse,
): CoinPriceHistories =>
  queryData.history.map(history => ({date: history.date, rate: history.rate}))

const useCoinHistory = (
  params: CoinHistoryRequest,
): UseQueryResult<CoinPriceHistories, unknown> & {
  queryClient: QueryClient
} => {
  const queryInfo = useQuery(
    ["coinHistory", {...params}],
    async () => await fetchCoinHistory(params),
    {
      refetchInterval: secondsToMilliseconds(5),
      select: transformCoinHistory,
    },
  )
  const queryClient = useQueryClient()

  return {...queryInfo, queryClient}
}

export default useCoinHistory
