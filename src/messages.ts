import { clients } from "./clients";
import { ReceiveMsg, SendMsg } from "./types/msg";

export const msgs: Map<string, ReceiveMsg[]> = new Map();
msgs.set("general", []);

export const addMsg = (socketId: string, msg: SendMsg) => {
  const receiveMsg: ReceiveMsg = {
    fromName: clients.get(socketId) || "Anonymous",
    id: socketId,
    text: msg.text,
    time: new Date(),
  };

  msgs.get(msg.channel)?.push(receiveMsg);

  return receiveMsg;
};

export const changeName = (id: string, name: string) => {
  clients.set(id, name);
};

export const getMsgs = (channel: string) => msgs.get(channel);
