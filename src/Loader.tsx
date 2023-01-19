import strings from "./strings";
import { Grid, Typography, CircularProgress } from "@mui/material";

export default function Loader() {
  const { RANDOM_STRINGS: lines } = strings;

  return (
    <Grid
      gap={4}
      display="flex"
      minHeight="100vh"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
    >
      <CircularProgress color="secondary" />
      <Typography>{lines[Math.floor(Math.random() * lines.length)]}</Typography>
    </Grid>
  );
}
