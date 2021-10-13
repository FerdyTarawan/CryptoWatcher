import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  getUnixTime,
  secondsToMilliseconds,
} from "date-fns"

import type {ChartIntervalOptions} from "_constants/chart"
import type {Money} from "_utils/money"
import {roundToTwo} from "_utils/numeric"

const now = Date.now()
export const nowUnix = getUnixTime(now)
export const nowUnixMilis = secondsToMilliseconds(getUnixTime(now))
export const lastDayUnix = getUnixTime(addDays(now, -1))
export const lastWeekUnix = getUnixTime(addWeeks(now, -1))
export const lastMonthUnix = getUnixTime(addMonths(now, -1))
export const lastThreeMonthUnix = getUnixTime(addMonths(now, -3))
export const lastYearUnix = getUnixTime(addYears(now, -1))

export const getStartUnixTime = (
  interval: ChartIntervalOptions,
  milis: boolean = true,
): number => {
  switch (interval) {
    case "1D":
      return milis ? secondsToMilliseconds(lastDayUnix) : lastDayUnix
    case "7D":
      return milis ? secondsToMilliseconds(lastWeekUnix) : lastWeekUnix
    case "1M":
      return milis ? secondsToMilliseconds(lastMonthUnix) : lastMonthUnix
    case "3M":
      return milis
        ? secondsToMilliseconds(lastThreeMonthUnix)
        : lastThreeMonthUnix
    case "1Y":
      return milis ? secondsToMilliseconds(lastYearUnix) : lastYearUnix
    default:
      return milis ? secondsToMilliseconds(lastDayUnix) : lastDayUnix
  }
}

export const getVerboseChartInterval = (
  interval: ChartIntervalOptions,
): string | undefined => {
  switch (interval) {
    case "1D":
      return "1 Day"
    case "7D":
      return "1 Week"
    case "1M":
      return "1 Month"
    case "3M":
      return "3 Months"
    case "1Y":
      return "1 Year"
    default:
      return undefined
  }
}

type PriceChangeType = "INC" | "DEC"
type PriceChangeTuple = [number, number, PriceChangeType]
type PercentageChangeTuple = [number, PriceChangeType, string]
export const calculatePriceChangePercentage = (
  newPrice: Money,
  oldPrice: Money,
): PercentageChangeTuple => {
  const newPriceAmount = newPrice.getAmount()
  const oldPriceAmount = oldPrice.getAmount()
  const [greaterOne, smallerOne, changeType]: PriceChangeTuple =
    newPrice.greaterThanOrEqual(oldPrice)
      ? [newPriceAmount, oldPriceAmount, "INC"]
      : [oldPriceAmount, newPriceAmount, "DEC"]

  const percentage = ((greaterOne - smallerOne) / greaterOne) * 100
  const color = changeType === "INC" ? "green500" : "red500"

  return [percentage, changeType, color]
}

export const formatPriceChange = (data: PercentageChangeTuple): string => {
  const [percentage, changeType] = data
  const symbol = changeType === "INC" ? "+" : "-"

  return `${symbol} ${roundToTwo(percentage)}%`
}
