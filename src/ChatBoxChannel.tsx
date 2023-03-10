import { SassyContext } from "./context";
import { Channel, SassyMessages } from "./types";
import { useContext, useEffect, useState } from "preact/hooks";

// Components
import Message from "./Message";
import List from "@mui/material/List";
import ChatBoxForm from "./ChatBoxForm";
import ErrorInline from "./ErrorInline";
import LoaderInline from "./LoaderInline";
import { CardActions } from "@mui/material";
import ChannelHeader from "./ChannelHeader";
import TimestampInjector from "./Message/Injectors/TimestampInjector";
import { subscribeUserToChannel, unsubscribeFromChannel } from "./server";

export default function ChatBoxChannel({
  selectedChannel,
  onDeSelectChannel,
}: {
  selectedChannel: Channel;
  onDeSelectChannel: Function;
}) {
  const { user } = useContext(SassyContext);
  const [messages, setMessages] = useState<SassyMessages>({
    data: [],
    status: "loading",
  });

  /**
   * The currently active user/sender. This is used to make the first message
   * of a user has their name on the message and stop the consequent ones from
   * showing a name, simulating a chat-like behavior.
   */
  let currentUserID = "";

  /**
   * Variable to check if a message is the first message of a user from a
   * sequence of messages from the same user.
   */
  let isFirstMessageOfUser = false;

  // Effect: Subscribe to the selected channel to listen for updates.
  useEffect(() => {
    const timestampInjector = new TimestampInjector();

    // Subscribe for real-time updates.
    subscribeUserToChannel({
      user: user.data!,
      channel: selectedChannel,
      onSuccess: (messages) => {
        // Replace the current channel with it's updated state.
        setMessages({
          data: timestampInjector.inject(
            selectedChannel.users[user.data!.uid].addedAt,
            messages
          ),
          status: "loaded",
        });
      },
      onFailure: () =>
        setMessages({
          data: [],
          status: "erred",
        }),
    });

    // Unsubscribe on unmount.
    return unsubscribeFromChannel;
  }, []);

  // Effect: Close the channel on escape.
  useEffect(() => {
    function onPressEscape(e: KeyboardEvent) {
      if (e.key == "Escape") onDeSelectChannel();
    }

    window.addEventListener("keydown", onPressEscape);

    return () => window.removeEventListener("keydown", onPressEscape);
  }, []);

  // Effect: Scroll the message list to the bottom on each state change.
  useEffect(() => {
    // The message list.
    const chatBoxMessageList = document.querySelector(".chatBoxMessageList");

    // Scroll the list to show the new message.
    // We're doing this on mount because it is required each time the channel
    // gets updated.
    chatBoxMessageList?.scroll({
      behavior: "smooth",
      top: chatBoxMessageList.scrollHeight,
    });
  }, [messages]);

  return (
    <>
      <ChannelHeader
        channel={selectedChannel}
        onDeSelectChannel={onDeSelectChannel}
      />
      {messages.status === "erred" ? (
        <ErrorInline />
      ) : messages.status === "loading" ? (
        <LoaderInline />
      ) : (
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
          {messages.data.map((message, i) => {
            // It's not the first message by default.
            isFirstMessageOfUser = false;

            // First-case scenario, when the first message gets rendered,
            // currentUserID is empty.
            if (!currentUserID) {
              // In this case, we set the message sender's ID as the
              // currently active user ID.
              currentUserID = message.from.uid;

              // And since it's the first message of this user;
              isFirstMessageOfUser = true;
            }

            // The currently active user ID doesn't match the sender's ID.
            // Which means this sender is different than the previous one.
            if (currentUserID != message.from.uid) {
              // Let's set this sender as the currently active sender.
              currentUserID = message.from.uid;
              isFirstMessageOfUser = true;
            }

            return (
              <Message
                key={i}
                {...message}
                isSentByUser={user.data!.uid === message.from.uid}
                from={isFirstMessageOfUser ? message.from.displayName : ""}
              />
            );
          })}
        </List>
      )}
      <CardActions>
        <ChatBoxForm {...{ selectedChannel }} />
      </CardActions>
    </>
  );
}
