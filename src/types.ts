import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

/// Entities.
export type Language = "en" | "de" | "ar";

export type Status = "idle" | "loading" | "loaded" | "erred";

export type NewMessage = Omit<Message, "id">;

export type Message = {
  id: string;
  text: string;
  createdAt: Timestamp;
  variant: MessageVariant;
  /**
   * Messages can be sent by users as well as by integrations/bots and the
   * system itself.
   */
  from: MessageUser | "system" | "bot";
};

export type Channel = {
  id: string;
  label: string;
  variant: ChannelVariant;
  users: Record<User["uid"], ChannelUser>;
};

/**
 * A user as stored in a channel.
 */
export type ChannelUser = {
  // Time when the user was added to the channel.
  addedAt: Timestamp;
};

/**
 * A user as stored in a message.
 */
export type MessageUser = Pick<User, "uid" | "displayName" | "photoURL">;

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
export type SassyUser = Fetchable<User>;

export type SassyChannels = Fetchable<Channel[]>;

export type SassyMessages = Fetchable<Message[]>;

export type SassyContextInterface = {
  user: SassyUser;
  setUser: (user: SassyUser) => unknown;
};

/// Variants.
export type MessageVariant = "plain" | "timestamp";

export type ChannelVariant = "one-to-one" | "group";
