import { msgs } from "./messages";

export const createChannel = (name: string) => {
  if (msgs.has(name)) {
    console.error("Tried to create channel but channel already exists.");
    return;
  }
  msgs.set(name, []);
};
