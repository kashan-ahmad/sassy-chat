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
        elevation={1}
        sx={{
          boxShadow: 4,
          position: "relative",
          border: {
            xs: "none",
            sm: "1px solid",
          },
          borderColor: {
            sm: "secondary.dark",
          },
          width: {
            xs: "100vw",
            sm: "300px",
          },
          height: {
            xs: "100vh",
            sm: "605px",
          },
        }}
      >
        <img />
        <CardContent>Hello World</CardContent>
      </Card>
    </Grid>
  );
}
