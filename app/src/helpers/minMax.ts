export const minMax = (min: number, max: number) => (val: number) =>
  Math.max(Math.min(max, val), min);
