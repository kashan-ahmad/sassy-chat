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
  createdAt: string;
  from: User["uid"];
  text: string;
};

export type Channel = {
  label: string;
  messages: Message[];
  users: User["uid"][];
};

export type SassyChannels = Fetchable<Channel[]>;
