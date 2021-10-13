export const toPercentageString = (num: number, decimal: number = 0): string =>
  `${(100 * num).toFixed(decimal)}%`
