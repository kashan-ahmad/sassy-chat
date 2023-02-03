import {
  Collapse,
  ListItem,
  Typography,
  ListItemText,
  ListItemButton,
} from "@mui/material";

// Types.
import { useState } from "preact/hooks";
import type { Channel, ChannelUser, Message } from "./types";
import { AccessTimeFilled } from "@mui/icons-material";

export type MessageProps = {
  isSentByUser?: boolean;
  channelUsers: Channel["users"];
} & Message;

let date = new Date();

export default function Message({
  from,
  text,
  createdAt,
  channelUsers,
  isSentByUser,
}: MessageProps) {
  // Set the time for each message.
  date.setTime(createdAt.seconds * 1000);

  // The collapse's state.
  const [areDetailsShown, setAreDetailsShown] = useState(false);

  const channelUser = channelUsers[from];

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
          primary={channelUser.displayName}
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
