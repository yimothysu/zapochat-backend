import { Server } from "socket.io";
import "dotenv/config";
import { ioToEvents } from "./events";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;

const io = new Server({
  cors: {
    origin: process.env.ORIGIN,
  },
});

const events = ioToEvents(io);
Object.keys(events).forEach((eventName: string) => {
  io.on(eventName, events[eventName]);
});

io.listen(PORT);
