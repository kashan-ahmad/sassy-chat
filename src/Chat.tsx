import { Channel } from "./types";
import { useEffect, useState } from "preact/hooks";

// Components
import ChatBox from "./ChatBox";
import Grid from "@mui/material/Grid";
import ChatBoxChannel from "./ChatBoxChannel";
import ChatBoxChannels from "./ChatBoxChannels";

export default function Chat() {
  const [selectedChannel, setSelectedChannel] = useState<Channel>();

  return (
    <Grid
      display="flex"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <ChatBox>
        {selectedChannel ? (
          <ChatBoxChannel
            selectedChannel={selectedChannel}
            onDeSelectChannel={() => setSelectedChannel(undefined)}
          />
        ) : (
          <ChatBoxChannels
            onSelectChannel={(channel) => setSelectedChannel(channel)}
          />
        )}
      </ChatBox>
    </Grid>
  );
}
