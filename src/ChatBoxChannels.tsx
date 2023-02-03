import { SassyContext } from "./context";
import { getUserChannels } from "./server";
import { Channel, SassyChannels } from "./types";
import { useContext, useEffect, useState } from "preact/hooks";

// Components
import List from "@mui/material/List";
import ErrorInline from "./ErrorInline";
import LoaderInline from "./LoaderInline";
import ChatBoxHeader from "./ChatBoxHeader";
import ListItem from "@mui/material/ListItem";
import CardContent from "@mui/material/CardContent";
import PublicIcon from "@mui/icons-material/Public";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";

export default function ChatBoxChannels({
  onSelectChannel,
}: {
  onSelectChannel: (channel: Channel) => unknown;
}) {
  const { user } = useContext(SassyContext);
  const [channels, setChannels] = useState<SassyChannels>({
    data: [],
    status: "loading",
  });

  useEffect(() => {
    if (!user.data) return;

    getUserChannels({
      user: user.data,
      onSuccess: (data) =>
        setChannels({
          data: data!,
          status: "loaded",
        }),
      onFailure: () => {
        setChannels({
          data: [],
          status: "erred",
        });
      },
    });
  }, []);

  return (
    <>
      <ChatBoxHeader />
      {channels.status === "erred" && (
        <CardContent>
          <ErrorInline />
        </CardContent>
      )}
      {channels.status === "loading" && (
        <CardContent>
          <LoaderInline />
        </CardContent>
      )}
      {channels.status === "loaded" && (
        <List
          sx={{
            height: "100%",
            overflow: "auto",
          }}
        >
          {channels.data.map((channel, i) => (
            <ListItem
              key={i}
              disablePadding
              onClick={() => onSelectChannel(channel)}
            >
              <ListItemButton>
                <ListItemIcon>
                  <PublicIcon />
                </ListItemIcon>
                <ListItemText
                  primary={channel.label}
                  secondaryTypographyProps={{
                    noWrap: true,
                  }}
                  secondary={
                    channel.messages.length > 0
                      ? // Text of the last message sent in this channel
                        channel.messages[channel.messages.length - 1].text
                      : // Default text
                        "💀 Dead chat"
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
}
