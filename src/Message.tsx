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

/**
 * Global date variable. Instantiated globally since the component gets called
 * in a loop, each time setting a new time to this date instance.
 */
let date = new Date();

/**
 * The currently active user/sender. This is used to make the first message of a
 * user has their name on the message and stop the consequent ones from showing
 * a name, simulating a chat-like behavior.
 */
let currentUserID = "";

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

  // Extract the displayName of the current user.
  const { displayName } = channelUsers[from];

  // Every message isn't the first one until we know it's the first one.
  let isFirstMessageOfUser = false;

  // First-case scenario, when the first message gets rendered, currentUserID
  // is empty.
  if (!currentUserID) {
    // In this case, we set the message sender's ID as the currently active
    // user ID.
    currentUserID = from;

    // And since it's the first message of this user;
    isFirstMessageOfUser = true;
  }

  // The currently active user ID doesn't match the sender's ID.
  // Which means this sender is different than the previous one.
  if (currentUserID != from) {
    // Let's set this sender as the currently active sender.
    currentUserID = from;
    isFirstMessageOfUser = true;
  }

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
          primary={
            // If the sender is different from the previous sender
            // + It's the sender's first message
            // = Display the sender's name.
            from === currentUserID && !isFirstMessageOfUser ? "" : displayName
          }
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
