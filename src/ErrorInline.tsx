import strings from "./strings";
import { Grid, Typography } from "@mui/material";

const gifSources = ["/crying-sad.gif", "/crying-meme.gif"];

export default function ErrorInline() {
  const { RANDOM_ERRORS: lines } = strings;

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
      <img src={gifSources[Math.floor(Math.random() * gifSources.length)]} />
      <Typography align="center">
        {lines[Math.floor(Math.random() * lines.length)]}
      </Typography>
    </Grid>
  );
}
