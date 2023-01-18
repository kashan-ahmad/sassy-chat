import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { loginWithGoogle } from "./server";
import LoginIcon from "@mui/icons-material/Login";

export default function Login() {
  function onClickListener() {
    loginWithGoogle({ onSuccess: () => {}, onFailure: () => {} });
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
        startIcon={<LoginIcon />}
      >
        Login
      </Button>
    </Grid>
  );
}
