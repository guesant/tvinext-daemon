import { Channel } from "./services/Channel";
import db from "./services/Database";
import { localEvents } from "./services/Events";
import { SystemSoundsVolume } from "./services/SystemSoundsVolume";

export const syncDBWithLocalEvents = async () => {
  await SystemSoundsVolume.setVolume(+db.get("config.volume").value());
  await Channel.setChannel(+db.get("config.channel").value());

  function volumeChanged(volume: number) {
    db.set("config.volume", volume).write();
  }

  function channelChanged(channel: number) {
    db.set("config.channel", channel).write();
  }

  localEvents.on("volume", volumeChanged);
  localEvents.on("channel", channelChanged);

  return () => {
    localEvents.off("volume", volumeChanged);
    localEvents.off("channel", channelChanged);
  };
};
