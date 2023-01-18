import "./app.css";

// Helpers.
import { useState } from "preact/hooks";
import { SassyContext } from "./context";
import { SassyContextInterface } from "./types";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

// Components.
import Chat from "./Chat";
import Login from "./Login";
import { auth } from "./server";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  console.log(auth.currentUser);

  const [user, setUser] = useState<SassyContextInterface["user"]>(
    auth.currentUser
  );

  console.log({ user });

  return (
    <ThemeProvider theme={darkTheme}>
      <>
        <CssBaseline />
        <SassyContext.Provider value={{ user, setUser }}>
          {user ? <Chat /> : <Login />}
        </SassyContext.Provider>
      </>
    </ThemeProvider>
  );
}
