import { Channel } from "./types";

export function isChannel(object: any): object is Channel {
  return object && object.users && object.label && object.messages;
}
