import db from "./Database";
import { localEvents } from "./Events";

export class Channel {
  static async getCurrentChannel() {
    return +db.get("config.channel").value();
  }
  static async setChannel(id: number, emit = true) {
    await db.set("config.channel", Math.abs(id)).write();
    emit && localEvents.emit("channel", await Channel.getCurrentChannel());
  }
}
