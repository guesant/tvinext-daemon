import { Server, Socket } from "socket.io";
import { localEvents } from "./services/Events";

export const setupSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    function handleUpdate() {
      socket.emit("update");
    }
    function handleVolumeChange(volume: number) {
      socket.emit("volume", volume);
    }
    function handleChannelChange(channel: number) {
      socket.emit("channel", channel);
    }
    localEvents.on("volume", handleVolumeChange);
    localEvents.on("channel", handleChannelChange);
    localEvents.on("update", handleUpdate);
    socket.on("disconnect", () => {
      localEvents.off("volume", handleVolumeChange);
      localEvents.off("channel", handleChannelChange);
      localEvents.off("update", handleUpdate);
    });
  });
  return io;
};
