import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

/// Entities.
export type Language = "en" | "de" | "ar";

export type Status = "idle" | "loading" | "loaded" | "erred";

export type NewMessage = Omit<Message, "id">;

export type Message = {
  id: string;
  text: string;
  from: User["uid"];
  createdAt: Timestamp;
};

export type Channel = {
  id: string;
  type: string;
  label: string;
  users: Record<User["uid"], ChannelUser>;
};

/**
 * A user as stored in a channel.
 */
export type ChannelUser = Pick<User, "displayName" | "photoURL"> & {
  // Time when the user was added to the channel.
  addedAt: Timestamp;
};

/// Builders.
export type BoolBacks<T> = {
  onSuccess: (data: T) => unknown;
  onFailure: (message: string) => unknown;
};

export type Fetchable<T> = {
  data: T;
  status: Status;
};

/// Sassy Entities.
export type SassyUser = Fetchable<User | undefined>;

export type SassyChannels = Fetchable<Channel[]>;

export type SassyMessages = Fetchable<Message[]>;

export type SassyContextInterface = {
  user: SassyUser;
  setUser: (user: SassyUser) => unknown;
};
