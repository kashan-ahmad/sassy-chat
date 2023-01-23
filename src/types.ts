import { User } from "firebase/auth";

export type Language = "en" | "de" | "ar";

export type Status = "idle" | "loading" | "loaded" | "erred";

export interface BoolBacks<T> {
  onSuccess: (data?: T) => unknown;
  onFailure: (message: string) => unknown;
}

export interface Fetchable<T> {
  data: T;
  status: Status;
}

export type SassyUser = Fetchable<User | undefined>;

export interface SassyContextInterface {
  user: SassyUser;
  setUser: (user: SassyUser) => unknown;
}
