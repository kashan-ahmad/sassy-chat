import "./index.css";
import App from "./App";
import { render } from "preact";
import getStrings from "./strings";

render(<App />, document.getElementById("app") as HTMLElement);
