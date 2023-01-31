import { Channel } from "./types";
import { SassyContext } from "./context";
import { useContext } from "preact/hooks";

// Components
import Message from "./Message";
import List from "@mui/material/List";
import ChatBoxHeader from "./ChatBoxHeader";

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
        {selectedChannel.messages.map((message, i) => (
          <Message
            key={i}
            {...message}
            isSentByUser={user.data!.uid === message.from.uid}
          />
        ))}
      </List>
    </>
  );
}
