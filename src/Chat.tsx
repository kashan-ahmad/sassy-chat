import { Channel } from "./types";
import { useEffect, useState } from "preact/hooks";

// Components
import ChatBox from "./ChatBox";
import Grid from "@mui/material/Grid";
import { useSnackbar } from "notistack";
import ChatBoxChannel from "./ChatBoxChannel";
import { subscribeToChannel } from "./server";
import ChatBoxChannels from "./ChatBoxChannels";

export default function Chat() {
  const { enqueueSnackbar } = useSnackbar();
  const [selectedChannel, setSelectedChannel] = useState<Channel>();

  function onSelectChannelListener(channel: Channel) {
    // Subscribe for real-time updates.
    subscribeToChannel({
      channel,
      onSuccess: (channel) => {
        // Replace the current channel with it's updated state.
        setSelectedChannel(channel);
      },
      onFailure: (message) =>
        enqueueSnackbar(message, {
          variant: "error",
        }),
    });
  }

  useEffect(() => {
    // The message list.
    const chatBoxMessageList = document.querySelector(".chatBoxMessageList");

    // Scroll the list to show the new message.
    // We're doing this on mount because it is required each time the channel
    // gets updated.
    chatBoxMessageList?.scrollTo(0, chatBoxMessageList.scrollHeight);
  }, [selectedChannel]);

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
          <ChatBoxChannels onSelectChannel={onSelectChannelListener} />
        )}
      </ChatBox>
    </Grid>
  );
}
