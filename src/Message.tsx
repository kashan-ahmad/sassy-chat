import {
  Collapse,
  ListItem,
  Typography,
  ListItemText,
  ListItemButton,
} from "@mui/material";

// Types.
import type { Message } from "./types";
import { useState } from "preact/hooks";
import { AccessTimeFilled } from "@mui/icons-material";

export type MessageProps = {
  from: string;
  isSentByUser?: boolean;
} & Omit<Message, "from">;

/**
 * Global date variable. Instantiated globally since the component gets called
 * in a loop, each time setting a new time to this date instance.
 */
let date = new Date();

export default function Message({
  text,
  from,
  createdAt,
  isSentByUser,
}: MessageProps) {
  // Set the time for each message.
  date.setTime(createdAt.seconds * 1000);

  // The collapse's state.
  const [areDetailsShown, setAreDetailsShown] = useState(false);

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
          primary={from}
          primaryTypographyProps={{
            color: "secondary",
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
          gap="4px"
          display="flex"
          color="grey.500"
          variant="overline"
          alignItems="center"
          flexDirection={isSentByUser ? "row-reverse" : "row"}
        >
          <AccessTimeFilled fontSize="inherit" />
          {date.toLocaleTimeString()}
        </Typography>
      </Collapse>
    </ListItem>
  );
}
