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
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          height: "100%",
          overflow: "auto",
        }}
      >
        {selectedChannel.messages.map((message, i) => {
          const isSelected = user.data!.uid === message.from.uid;

          return (
            <ListItem
              key={i}
              disablePadding
              className={`Message ${isSelected ? "Message-selected" : ""}`}
            >
              <ListItemButton
                sx={{
                  bgColor: "black",
                }}
              >
                <ListItemText
                  primary={message.from.displayName}
                  primaryTypographyProps={{
                    fontSize: ".75rem",
                    textAlign: isSelected ? "right" : "left",
                  }}
                  secondary={message.text}
                  secondaryTypographyProps={{
                    textAlign: isSelected ? "right" : "left",
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
