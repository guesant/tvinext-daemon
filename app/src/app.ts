import { startServer } from "./server";
import config from "config";
import "./services/Database";
import { syncDBWithLocalEvents } from "./syncDBWithLocalEvents";

async function main() {
  const host = config.get("api.host") as string;
  const port = config.get("api.port") as number;

  const disposeSyncDBWithLocalEvents = await syncDBWithLocalEvents();

  try {
    await startServer({ host, port });
  } catch (error) {
    disposeSyncDBWithLocalEvents();
    throw error;
  }
}

main();
