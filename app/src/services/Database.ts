import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import config from "config";

const adapter = new FileSync<{
  config: { volume: number; channel: number };
  playlist: { url: string };
}>(config.get("db.path"));

const db = low(adapter);

db.defaults({
  config: { volume: 0, channel: 1 },
  playlist: {
    url:
      "https://raw.githubusercontent.com/Free-IPTV/Countries/master/BR01_BRAZIL.m3u",
  },
}).write();

export default db;
