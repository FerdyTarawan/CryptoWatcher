import {format, fromUnixTime, hoursToMilliseconds} from "date-fns"
import type {UseQueryResult} from "react-query"
import {useQuery} from "react-query"

import {FEAR_AND_GREED_INDEX_URL} from "_constants/url"
import type {FnGIndex, FnGIndexResponse} from "_hooks/type/fng"
import {indexApi} from "_utils/api"

const fetchFnGIndex = async (): Promise<FnGIndexResponse> => {
  const response = await indexApi.get<FnGIndexResponse>(
    FEAR_AND_GREED_INDEX_URL,
  )

  if (!response.ok) {
    throw new Error(response.problem)
  }

  return response.data!
}

const transformFnGIndex = (queryData: FnGIndexResponse): FnGIndex => ({
  timestamp: format(
    fromUnixTime(Number(queryData.data[0].timestamp)),
    "MMM d yyyy",
  ),
  value: Number(queryData.data[0].value),
  value_classification: queryData.data[0].value_classification,
})

const useFnGIndex = (
  key: string | Array<unknown> = "fng",
): UseQueryResult<FnGIndex, unknown> =>
  useQuery(key, fetchFnGIndex, {
    refetchInterval: hoursToMilliseconds(1),
    select: transformFnGIndex,
  })

export default useFnGIndex
