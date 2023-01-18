import { User } from "firebase/auth";

export type BaseUser = User & {
  accessToken: string;
};

export type BaseContextType = {
  user?: BaseUser;
  setUser: (user: BaseUser) => unknown;
};
