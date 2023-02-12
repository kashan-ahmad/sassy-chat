import { createContext } from "preact";
import type { SassyContextInterface } from "./types";

/**
 * @see {@link https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/}
 */
export const SassyContext = createContext<SassyContextInterface>(
  {} as SassyContextInterface
);
