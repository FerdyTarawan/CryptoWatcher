export const roundToTwo = (num: number): number =>
  Math.round((num + Number.EPSILON) * 100) / 100
