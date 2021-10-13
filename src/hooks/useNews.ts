import {formatDistanceToNow} from "date-fns"
import type {QueryClient, UseQueryResult} from "react-query"
import {useQuery, useQueryClient} from "react-query"

import {NEWS_URL} from "_constants/url"
import type {News, NewsResponse} from "_hooks/type/news"
import {newsApi} from "_utils/api"

const fetchNews = async (): Promise<NewsResponse> => {
  const response = await newsApi.get<NewsResponse>(NEWS_URL, {filter: "rising"})

  if (!response.ok) {
    throw new Error(response.problem)
  }

  return response.data!
}

const transformNews = (queryData: NewsResponse): News[] =>
  queryData.results.map(data => {
    const publishedDate = new Date(data.published_at)

    return {
      ...data,
      published_at: publishedDate,
      published_time_from_now: formatDistanceToNow(publishedDate, {
        addSuffix: true,
      }),
    }
  })

const useNews = (
  key: string | Array<unknown> = "news",
): UseQueryResult<News[], unknown> & {
  queryClient: QueryClient
} => {
  const queryInfo = useQuery(key, fetchNews, {
    select: transformNews,
  })
  const queryClient = useQueryClient()

  return {...queryInfo, queryClient}
}

export default useNews
