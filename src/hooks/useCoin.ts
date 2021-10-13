import {secondsToMilliseconds} from "date-fns"
import type {QueryClient, UseQueryResult} from "react-query"
import {useQuery, useQueryClient} from "react-query"

import {COIN_DETAIL_URL} from "_constants/url"
import type {Coin, CoinRequest, CoinResponse} from "_hooks/type/coin"
import useCurrency from "_hooks/useCurrencyStore"
import {cryptoApi} from "_utils/api"
import {Currencies, Money, formatCurrency} from "_utils/money"

const defaultCurrency = useCurrency.getState().currency

const fetchCoin = async (params: CoinRequest): Promise<CoinResponse> => {
  const response = await cryptoApi.post<CoinResponse>(COIN_DETAIL_URL, {
    ...params,
  })

  if (!response.ok) {
    throw new Error(response.problem)
  }

  return response.data!
}

const transformCoin =
  (currency: string = defaultCurrency) =>
  (queryData: CoinResponse): Coin => ({
    allTimeHighUSD: queryData.allTimeHighUSD,
    cap: queryData.cap,
    circulatingSupply: queryData.circulatingSupply,
    code: queryData.code,
    maxSupply: queryData.maxSupply,
    name: queryData.name,
    png64: queryData.png64,
    rate: queryData.rate,
    rateString: formatCurrency(
      // @ts-ignore
      Money.fromDecimal(queryData.rate, Currencies[currency], "ceil"),
    ),
    symbol: queryData.symbol,
    totalSupply: queryData.totalSupply,
    volume: queryData.volume,
    webp64: queryData.webp64,
  })

const useCoin = (
  params: CoinRequest,
): UseQueryResult<Coin, unknown> & {
  queryClient: QueryClient
} => {
  const queryInfo = useQuery(
    ["coin", {...params}],
    async () => await fetchCoin(params),
    {
      refetchInterval: secondsToMilliseconds(5),
      select: transformCoin(params.currency),
    },
  )
  const queryClient = useQueryClient()

  return {...queryInfo, queryClient}
}

export default useCoin
