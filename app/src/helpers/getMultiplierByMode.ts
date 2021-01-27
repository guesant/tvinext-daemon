import { IModes, multiplierModes } from "../helpers/MULTIPLIER_MODES";

export const getMultiplierByMode = (mode: IModes) => multiplierModes.get(mode)!;
