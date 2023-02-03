import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

export type Language = "en" | "de" | "ar";

export type Status = "idle" | "loading" | "loaded" | "erred";

export type BoolBacks<T> = {
  onSuccess: (data?: T) => unknown;
  onFailure: (message: string) => unknown;
};

export type Fetchable<T> = {
  data: T;
  status: Status;
};

export type SassyUser = Fetchable<User | undefined>;

export type SassyContextInterface = {
  user: SassyUser;
  setUser: (user: SassyUser) => unknown;
};

export type Message = {
  text: string;
  from: User["uid"];
  createdAt: Timestamp;
};

/**
 * A user as stored in a channel.
 */
export type ChannelUser = Pick<User, "displayName" | "photoURL">;

export type Channel = {
  id: string;
  label: string;
  isGroup: boolean;
  messages: Message[];
  users: Record<User["uid"], ChannelUser>;
};

export type SassyChannels = Fetchable<Channel[]>;
