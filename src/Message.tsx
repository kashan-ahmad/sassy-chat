import {
  Collapse,
  ListItem,
  Typography,
  ListItemText,
  ListItemButton,
} from "@mui/material";

// Types.
import type { Message } from "./types";
import { useRef, useState } from "preact/hooks";
import { AccessTimeFilled } from "@mui/icons-material";

export type MessageProps = {
  isSentByUser?: boolean;
} & Message;

export default function Message({
  from,
  text,
  createdAt,
  isSentByUser,
}: MessageProps) {
  const date = useRef(new Date());
  const [areDetailsShown, setAreDetailsShown] = useState(false);

  date.current.setTime(createdAt.seconds);

  return (
    <ListItem
      disablePadding
      className={`Message ${isSentByUser ? "Message-selected" : ""}`}
      sx={{
        flexDirection: "column",
      }}
    >
      <ListItemButton
        sx={{
          backgroundColor: "action.hover",
        }}
        onClick={() => setAreDetailsShown(!areDetailsShown)}
      >
        <ListItemText
          primary={from.displayName}
          primaryTypographyProps={{
            fontSize: ".75rem",
            textAlign: isSentByUser ? "right" : "left",
          }}
          secondary={text}
          secondaryTypographyProps={{
            textAlign: isSentByUser ? "right" : "left",
          }}
        />
      </ListItemButton>
      <Collapse direction="down" in={areDetailsShown}>
        <Typography
          variant="overline"
          fontStyle="italic"
          display="flex"
          flexDirection={isSentByUser ? "row-reverse" : "row"}
          alignItems="center"
          gap="4px"
        >
          <AccessTimeFilled fontSize="inherit" />
          {date.current.toLocaleTimeString()}
        </Typography>
      </Collapse>
    </ListItem>
  );
}
