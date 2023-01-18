import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export default function Chat() {
  return (
    <Grid
      display="flex"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Card
        variant="outlined"
        sx={{
          width: "100vw",
          height: "100vh",
          maxWidth: "300px",
          maxHeight: "600px",
          boxShadow: 10,
        }}
      >
        Hello World
      </Card>
    </Grid>
  );
}
