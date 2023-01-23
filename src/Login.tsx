import strings from "./strings";
import { useSnackbar } from "notistack";
import { useState } from "preact/hooks";
import { loginWithGoogle } from "./server";

// Components.
import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton";
import GoogleIcon from "@mui/icons-material/Google";

export default function Login() {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  function onClickListener() {
    setIsLoading(true);

    loginWithGoogle({
      onFailure: (message) => {
        setIsLoading(false);
        enqueueSnackbar(message, {
          variant: "error",
        });
      },
    });
  }

  return (
    <Grid
      display="flex"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <LoadingButton
        color="error"
        variant="contained"
        loading={isLoading}
        startIcon={<GoogleIcon />}
        onClick={() => onClickListener()}
      >
        {strings.LOGIN}
      </LoadingButton>
    </Grid>
  );
}
