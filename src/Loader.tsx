import { Grid, Typography, CircularProgress } from "@mui/material";

const lines = [
  "Swinging the Leviathan Axe",
  "Calling out the Mjolnir",
  "Praying to the All Father",
  "469 - Setting things up 😏",
  "Kicking up the Chainsaw",
];

export default function Loader() {
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
