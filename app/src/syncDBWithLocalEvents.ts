import { Channel } from "./services/Channel";
import db from "./services/Database";
import { localEvents } from "./services/Events";
import { SystemSoundsVolume } from "./services/SystemSoundsVolume";

export const syncDBWithLocalEvents = async () => {
  await SystemSoundsVolume.setVolume(+db.get("config.volume").value());
  await Channel.setChannel(+db.get("config.channel").value());
  function handleVolumeChange(volume: number) {
    db.set("config.volume", volume).write();
  }
  function handleChannelChange(channel: number) {
    db.set("config.channel", channel).write();
  }
  localEvents.on("volume", handleVolumeChange);
  localEvents.on("channel", handleChannelChange);
  return () => {
    localEvents.off("volume", handleVolumeChange);
    localEvents.off("channel", handleChannelChange);
  };
};
