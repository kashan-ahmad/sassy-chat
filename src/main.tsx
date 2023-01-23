import "./index.css";
import App from "./App";
import { render } from "preact";
import { SnackbarProvider } from "notistack";

render(
  <SnackbarProvider>
    <App />
  </SnackbarProvider>,
  document.getElementById("app") as HTMLElement
);
