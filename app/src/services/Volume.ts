import { System } from "./System";

const MODE_INCREMENT = Symbol("increment");
const MODE_DECREMENT = Symbol("decrement");
const MODE_EXACT = Symbol("exact");

export type IModes =
  | typeof MODE_DECREMENT
  | typeof MODE_INCREMENT
  | typeof MODE_EXACT;

const getMultiplierByMode = (mode: IModes) => {
  switch (mode) {
    case MODE_INCREMENT:
      return 1;
    case MODE_DECREMENT:
      return -1;
    case MODE_EXACT:
      return 0;
  }
};

export class Volume {
  static castRate = async (rate: number, mode: IModes) =>
    Math.max(
      Math.min(
        1,
        mode === MODE_EXACT
          ? rate
          : (await System.getVolume()) + getMultiplierByMode(mode) * rate,
      ),
      0,
    );
  static async setVolume(rate: number, mode: IModes = MODE_EXACT) {
    await System.setVolume(
      `${Math.floor((await Volume.castRate(rate, mode)) * 100)}%`,
    );
  }
  static async increment(rate = 0.1) {
    await Volume.setVolume(rate, MODE_INCREMENT);
  }
  static async decrement(rate = 0.1) {
    await Volume.setVolume(rate, MODE_DECREMENT);
  }
}
