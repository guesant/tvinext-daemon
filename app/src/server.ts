import express from "express";
import { setupApp } from "./setupApp";
import http from "http";
import { Server, Socket } from "socket.io";
import { localEvents } from "./services/Events";

export async function startServer({
  host,
  port,
}: {
  host: string;
  port: number;
}) {
  const app = express();
  const server = http.createServer(app);
  const io: Server = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
    },
  });

  setupApp(app);

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

  server.listen(port, host, () => {
    console.info(`RESTful API server started on ${host}:${port}`);
  });
}
