import { User } from "firebase/auth";

export interface SassyUser extends User {
  accessToken?: string;
}

export interface SassyContextInterface {
  user?: SassyUser;
  setUser: (user: SassyUser) => unknown;
}

export interface BoolBacks<T> {
  onSuccess: (data: T) => unknown;
  onFailure: (message: string) => unknown;
}

// Types
export type Language = "en" | "de" | "ar";
