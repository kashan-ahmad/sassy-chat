import { User } from "firebase/auth";
import { ChannelUser } from "./types";

// Convert User to ChannelUser
export function userToChannelUser(user: User): ChannelUser {
  return {
    photoURL: user.photoURL,
    displayName: user.displayName,
  };
}
