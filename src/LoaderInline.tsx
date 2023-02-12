import strings from "./strings";
import { Grid, Typography, CircularProgress } from "@mui/material";

export default function LoaderInline() {
  const { RANDOM_STRINGS: lines } = strings;

  return (
    <Grid
      gap={4}
      padding={4}
      height="100%"
      display="flex"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
    >
      <CircularProgress color="secondary" />
      <Typography align="center">
        {lines[Math.floor(Math.random() * lines.length)]}
      </Typography>
    </Grid>
  );
}
