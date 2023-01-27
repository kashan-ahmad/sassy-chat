import { User } from "firebase/auth";

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
  from: User;
  text: string;
  createdAt: string;
};

export type Channel = {
  label: string;
  isGroup: boolean;
  messages: Message[];
  users: User["uid"][];
};

export type SassyChannels = Fetchable<Channel[]>;
