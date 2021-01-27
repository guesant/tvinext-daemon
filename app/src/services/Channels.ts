import axios from "axios";
import db from "./Database";
import parser from "iptv-playlist-parser";
import { localEvents } from "./Events";
import { Channel } from "./Channel";

export class Channels {
  static async changePlaylistURL(url: string) {
    await db.set("playlist.url", url).write();
    await Channel.setChannel(0, false);
    localEvents.emit("update");
  }
  static async getChannels() {
    return await axios({ url: db.get("playlist.url").value() })
      .then((res) => res.data)
      .then((m3u) => parser.parse(m3u).items);
  }
  static async getChannel(id: number) {
    const channels = await Channels.getChannels();
    return channels[Math.abs(id)];
  }
}
