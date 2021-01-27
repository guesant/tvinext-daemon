import { IModes, MODE_EXACT } from "./MULTIPLIER_MODES";
import { getMultiplierByMode } from "./getMultiplierByMode";
import { SystemSound } from "../services/SystemSounds";

export const getExpectedNextVolumeRate = async (mode: IModes, rate: number) =>
  mode === MODE_EXACT
    ? rate
    : (await SystemSound.getVolume()) + getMultiplierByMode(mode) * rate;
