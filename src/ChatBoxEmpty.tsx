import strings from "./strings";
import { Box, Grid, Typography } from "@mui/material";

export default function ChatBoxEmpty() {
  const { RANDOM_ERRORS: lines } = strings;

  return (
    <Grid
      gap={4}
      height="100%"
      display="flex"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
    >
      <Box textAlign="center">
        <Typography align="center" fontSize="5rem">
          💀
        </Typography>
        <Typography align="center">Dead Chat</Typography>
      </Box>
    </Grid>
  );
}
