import Card, { CardProps } from "@mui/material/Card";

export default function ChatBox({ children, ...rest }: CardProps) {
  return (
    <Card
      {...rest}
      elevation={1}
      sx={{
        boxShadow: 4,
        position: "relative",
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
      {children}
    </Card>
  );
}
