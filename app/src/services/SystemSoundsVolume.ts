import { getExpectedNextVolumeRate } from "../helpers/getExpectedNextVolumeRate";
import { minMax } from "../helpers/minMax";
import {
  IModes,
  MODE_DECREMENT,
  MODE_EXACT,
  MODE_INCREMENT,
} from "../helpers/MULTIPLIER_MODES";
import { SystemSound } from "./SystemSounds";

export class SystemSoundsVolume {
  static castRate = async (rate: number, mode: IModes) =>
    minMax(0, 1)(await getExpectedNextVolumeRate(mode, rate));
  static async setVolume(rate: number, mode: IModes = MODE_EXACT) {
    await SystemSound.setVolume(
      `${Math.floor((await SystemSoundsVolume.castRate(rate, mode)) * 100)}%`,
    );
  }
  static async increment(rate = 0.1) {
    await SystemSoundsVolume.setVolume(rate, MODE_INCREMENT);
  }
  static async decrement(rate = 0.1) {
    await SystemSoundsVolume.setVolume(rate, MODE_DECREMENT);
  }
}
