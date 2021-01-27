export const MODE_INCREMENT = Symbol("increment");
export const MODE_DECREMENT = Symbol("decrement");
export const MODE_EXACT = Symbol("exact");

export type IModes =
  | typeof MODE_DECREMENT
  | typeof MODE_INCREMENT
  | typeof MODE_EXACT;

export const multiplierModes = new Map<IModes, number>();
multiplierModes.set(MODE_INCREMENT, 1);
multiplierModes.set(MODE_DECREMENT, -1);
multiplierModes.set(MODE_EXACT, 0);
