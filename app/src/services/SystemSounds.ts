import execa from "execa";
import { localEvents } from "./Events";

export class SystemSound {
  static async setVolume(value: string) {
    execa.command(`pactl set-sink-volume @DEFAULT_SINK@ ${value}`);
    localEvents.emit("volume", await SystemSound.getVolume());
  }
  static async getVolume() {
    const { stdout } = await execa.command(`amixer -D pulse scontents`);
    const [_, vol = "0"] = stdout.match(/\[(.+)\%\]/) || [];
    return parseFloat(vol) / 100;
  }
}
