import { SassyContext } from "./context";
import { Channel } from "./types";
import { useContext } from "preact/hooks";

// Components
import Message from "./Message";
import List from "@mui/material/List";
import ChatBoxForm from "./ChatBoxForm";
import ChatBoxEmpty from "./ChatBoxEmpty";
import { CardActions } from "@mui/material";
import ChannelHeader from "./ChannelHeader";

export default function ChatBoxChannel({
  selectedChannel,
  onDeSelectChannel,
}: {
  selectedChannel: Channel;
  onDeSelectChannel: Function;
}) {
  const { user } = useContext(SassyContext);

  return (
    <>
      <ChannelHeader {...{ onDeSelectChannel }} />
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
        {selectedChannel.messages.length === 0 ? (
          <ChatBoxEmpty />
        ) : (
          selectedChannel.messages.map((message, i) => (
            <Message
              key={i}
              {...message}
              channelUsers={selectedChannel.users}
              isSentByUser={user.data!.uid === message.from}
            />
          ))
        )}
      </List>
      <CardActions>
        <ChatBoxForm {...{ selectedChannel }} />
      </CardActions>
    </>
  );
}
