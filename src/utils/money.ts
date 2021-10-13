import type {Money} from "ts-money"

export {Money, Currencies} from "ts-money"
export const formatCurrency = (money: Money): string =>
  `${money.getCurrency()} ${money
    .getAmount()
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`
