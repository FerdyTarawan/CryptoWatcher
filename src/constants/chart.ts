export const CHART_INTERVAL_OPTIONS = ["1D", "7D", "1M", "3M", "1Y"] as const
export type ChartIntervalOptions = typeof CHART_INTERVAL_OPTIONS[number]
