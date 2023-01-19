import "./app.css";

// Helpers.
import useUser from "./useUser";
import { SassyContext } from "./context";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

// Components.
import Chat from "./Chat";
import Login from "./Login";
import Loader from "./Loader";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  const [user, setUser] = useUser();

  return (
    <ThemeProvider theme={darkTheme}>
      <>
        {/* <Loader /> */}
        <CssBaseline />
        <SassyContext.Provider value={{ user, setUser }}>
          {user.status === "idle" && <Login />}
          {user.status === "loaded" && <Chat />}
          {user.status === "loading" && <Loader />}
        </SassyContext.Provider>
      </>
    </ThemeProvider>
  );
}
