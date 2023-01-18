import "./app.css";

// Helpers.
import { useState } from "preact/hooks";
import { BaseContext } from "./context";
import { BaseContextType } from "./types";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

// Components.
import Chat from "./Chat";
import Login from "./Login";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  const [user, setUser] = useState<BaseContextType["user"]>();

  return (
    <ThemeProvider theme={darkTheme}>
      <>
        <CssBaseline />
        <BaseContext.Provider value={{ user, setUser }}>
          {user ? <Chat /> : <Login />}
        </BaseContext.Provider>
      </>
    </ThemeProvider>
  );
}
