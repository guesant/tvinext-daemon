import express from "express";
import http from "http";
import { Server } from "socket.io";
import { setupApp } from "./setupApp";
import { setupSocket } from "./setupSocket";

const getSocket = (server: http.Server) =>
  require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
    },
  }) as Server;

export async function startServer({
  host,
  port,
}: {
  host: string;
  port: number;
}) {
  const app = express();
  const server = http.createServer(app);
  setupSocket(getSocket(server));
  setupApp(app);
  server.listen(port, host, () => {
    console.info(`RESTful API server started on ${host}:${port}`);
  });
}
