import { createContext } from "preact";
import type { BaseContextType } from "./types";

export const BaseContext = createContext<BaseContextType>({
  user: undefined,
  setUser: () => {},
});
