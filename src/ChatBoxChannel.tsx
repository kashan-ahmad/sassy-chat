import { SassyContext } from "./context";
import { Channel } from "./types";
import { useContext } from "preact/hooks";

// Components
import Message from "./Message";
import List from "@mui/material/List";
import ChatBoxForm from "./ChatBoxForm";
import ChatBoxHeader from "./ChatBoxHeader";
import { CardActions } from "@mui/material";

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
        className="chatBoxMessageList"
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
            channelUsers={selectedChannel.users}
            isSentByUser={user.data!.uid === message.from}
          />
        ))}
      </List>
      <CardActions>
        <ChatBoxForm {...{ selectedChannel }} />
      </CardActions>
    </>
  );
}
