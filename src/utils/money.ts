import type {Money} from "ts-money"

export {Money, Currencies} from "ts-money"
export const formatCurrency = (money: Money): string =>
  `${money.getCurrency()} ${money
    .toString()
    .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")}`
