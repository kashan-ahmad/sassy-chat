import { Channel } from "./types";
import { SassyContext } from "./context";
import { useContext } from "preact/hooks";

// Components
import List from "@mui/material/List";
import ChatBoxHeader from "./ChatBoxHeader";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ListItemButton } from "@mui/material";

export default function ChatBoxChannel({
  selectedChannel,
  onDeSelectChannel,
}: {
  selectedChannel: Channel;
  onDeSelectChannel: () => unknown;
}) {
  const { user } = useContext(SassyContext);

  return (
    <>
      <ChatBoxHeader />
      <List
        sx={{
          height: "100%",
          overflow: "auto",
        }}
      >
        {selectedChannel.messages.map((message, i) => (
          <ListItem key={i} disablePadding className="Message">
            <ListItemButton selected={user.data!.uid === message.from}>
              <ListItemText primary={message.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
}
