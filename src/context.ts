import { createContext } from "preact";
import type { SassyContextInterface } from "./types";

export const SassyContext = createContext<SassyContextInterface>({
  setUser: () => {},
  user: {
    status: "idle",
    data: undefined,
  },
});
