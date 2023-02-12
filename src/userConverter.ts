import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";
import { ChannelUser, MessageUser } from "./types";

// Converts a User to ChannelUser
export function getChannelUserFromUser(user: User): ChannelUser {
  return {
    addedAt: Timestamp.now(),
  };
}

/**
 * Converts User to MessageUser
 */
export function getMessageUserFromUser(user: User): MessageUser {
  return {
    uid: user.uid,
    photoURL: user.photoURL,
    displayName: user.displayName,
  };
}
