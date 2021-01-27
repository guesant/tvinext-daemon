import EventEmmiter from "eventemitter3";

class Events extends EventEmmiter<{
  volume: (volume: number) => void;
  channel: (id: number) => void;
  update: () => void;
}> {}

export const localEvents = new Events();
