import strings from "./strings";
import { useSnackbar } from "notistack";
import { useState } from "preact/hooks";
import { loginWithGoogle } from "./server";

// Components.
import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton";
import GoogleIcon from "@mui/icons-material/Google";

// Static.
import logoImage from "./assets/logo.svg";
import { Box } from "@mui/material";

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
      <Box display="flex" flexDirection="column" alignItems="center" gap="1rem">
        <img src={logoImage} width="100" />
        <LoadingButton
          color="secondary"
          variant="contained"
          loading={isLoading}
          startIcon={<GoogleIcon />}
          onClick={() => onClickListener()}
        >
          {strings.LOGIN}
        </LoadingButton>
      </Box>
    </Grid>
  );
}
