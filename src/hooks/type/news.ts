export interface NewsCurrency {
  code: string
  slug: string
  title: string
  url: string
}

export interface NewsResult {
  currencies: NewsCurrency[]
  domain: string
  id: number
  kind: "news"
  published_at: string
  slug: string
  source: {
    domain: string
    path: string | null
    region: string
    title: string
  }
  title: string
  url: string
}

export interface NewsResponse {
  count: number
  next: string | null
  previous: string | null
  results: NewsResult[]
}

export interface News extends Omit<NewsResult, "published_at"> {
  published_at: Date
  published_time_from_now: string
}
