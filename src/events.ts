import { Server, Socket } from "socket.io";
import { addMsg, changeName, getMsgs, msgs } from "./messages";
import { SendMsg } from "./types/msg";
import { getClient, getClients, removeClient } from "./clients";
import { createChannel } from "./channels";

type EventsType = { [key: string]: (arg0: any, arg1: any) => void };

export const ioSocketToEvents: (io: Server, socket: Socket) => EventsType = (
  io: Server,
  socket: Socket
) => ({
  disconnect: () => {
    removeClient(socket.id);
    io.emit("removeClient", socket.id);

    console.log(`disconnected socket id '${socket.id}'`);
  },
  disconnecting: () => {
    removeClient(socket.id);
    io.emit("removeClient", socket.id);

    console.log(`disconnecting socket id '${socket.id}'`);
  },
  sendMsg: (sendMsg: SendMsg) => {
    const receiveMsg = addMsg(socket.id, sendMsg);
    io.emit("sendMsg", sendMsg.channel, receiveMsg);
  },
  join: (name?: string) => {
    const nameToChangeTo = name || "";
    changeName(socket.id, nameToChangeTo);
    socket.broadcast.emit("newClient", getClient(socket.id));

    msgs?.forEach((_, channel) => {
      const msgs = getMsgs(channel);
      socket.emit("getMsgs", channel, msgs);
    });

    const clients = getClients();
    socket.emit("getClients", clients);

    console.log(`joined socket id '${socket.id}' as '${nameToChangeTo}'`);
  },
  changeName: (newName: string) => {
    changeName(socket.id, newName);
    socket.broadcast.emit("changeName", newName);
  },
  getMsgs: (channel: string) => {
    const msgs = getMsgs(channel);
    socket.emit("getMsgs", channel, msgs);
  },
  getClients: () => {
    const clients = getClients();
    socket.emit("getClients", clients);
  },
  createChannel: (name: string) => {
    createChannel(name);
    const msgs = getMsgs(name);
    io.emit("getMsgs", name, msgs);
  },
});

export const ioToEvents: (io: Server) => EventsType = (io: Server) => ({
  connection: (socket: Socket) => {
    socket.join("general");

    const events = ioSocketToEvents(io, socket);

    Object.keys(events).forEach((eventName: string) => {
      socket.on(eventName, events[eventName]);
    });

    changeName(socket.id, "");

    console.log(`connected socket id '${socket.id}'`);
  },
  disconnect: () => {
    console.log("Server disconnected");
  },
});
