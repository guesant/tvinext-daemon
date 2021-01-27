import { Router } from "express";
import { Channel } from "../../services/Channel";
import { Channels } from "../../services/Channels";
import { System } from "../../services/System";
import { Volume } from "../../services/Volume";

const v1 = Router();

/**
 * /api/v1/volume
 */

v1.get("/volume", async (_, res) => {
  res.json(await System.getVolume());
});

v1.get("/volume/increment", async (_, res) => {
  await Volume.increment(0.05);
  res.json(await System.getVolume());
});

v1.get("/volume/decrement", async (_, res) => {
  await Volume.decrement(0.05);
  res.json(await System.getVolume());
});

/**
 * /api/v1/channels
 */

v1.get("/channels", async (_, res) => {
  res.json(await Channels.getChannels());
});

v1.post("/channels", async (req, res) => {
  await Channels.changePlaylistURL(req.body.url);
  res.json();
});

/**
 * /api/v1/channel
 */

v1.get("/channel", async (_, res) => {
  res.json({ channel: await Channel.getCurrentChannel() });
});

v1.get("/channel/:id", async (req, res) => {
  const channel = await Channels.getChannel(+req.params.id);
  res.json(channel);
});

v1.post("/channel/:id", async (req, res) => {
  const id = Math.floor(Math.abs(+req.params.id));
  if (id <= (await Channels.getChannels()).length - 1) {
    await Channel.setChannel(+req.params.id);
    return res.send("");
  }
  return res.sendStatus(401);
});

export { v1 };
