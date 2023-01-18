import strings from "./strings";
import { SassyContext } from "./context";
import { useContext } from "preact/hooks";
import { loginWithGoogle } from "./server";

// Components.
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";

export default function Login() {
  const { setUser } = useContext(SassyContext);

  function onClickListener() {
    loginWithGoogle({
      onSuccess: (user) => {
        setUser(user);
      },
      onFailure: () => {},
    });
  }

  return (
    <Grid
      display="flex"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Button
        color="error"
        variant="contained"
        onClick={onClickListener}
        startIcon={<GoogleIcon />}
      >
        {strings.LOGIN}
      </Button>
    </Grid>
  );
}
