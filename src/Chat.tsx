import { SassyChannel } from "./types";
import { SassyContext } from "./context";
import { getUserChannels } from "./server";
import { useContext, useEffect, useState } from "preact/hooks";

// Components
import ChatBox from "./ChatBox";
import Grid from "@mui/material/Grid";
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

export default function Chat() {
  const { user } = useContext(SassyContext);
  const [channels, setChannels] = useState<SassyChannel>({
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
    <Grid
      display="flex"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <ChatBox>
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
              <ListItem key={i} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <PublicIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={channel.label}
                    secondary={
                      channel.messages.length > 0
                        ? // Text of the last text sent in this channel
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
      </ChatBox>
    </Grid>
  );
}
