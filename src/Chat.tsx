import { SassyChannel } from "./types";
import { useContext, useEffect, useState } from "preact/hooks";

// Components
import ChatBox from "./ChatBox";
import Grid from "@mui/material/Grid";
import ErrorInline from "./ErrorInline";
import { useSnackbar } from "notistack";
import { SassyContext } from "./context";
import LoaderInline from "./LoaderInline";
import { getUserChannels } from "./server";
import ChatBoxHeader from "./ChatBoxHeader";
import CardContent from "@mui/material/CardContent";

export default function Chat() {
  const { user } = useContext(SassyContext);
  const { enqueueSnackbar } = useSnackbar();
  const [channelState, setChannelState] = useState<SassyChannel>({
    data: [],
    status: "loading",
  });

  useEffect(() => {
    if (!user.data) return;

    getUserChannels({
      user: user.data,
      onSuccess: (data) =>
        setChannelState({
          data: data!,
          status: "loaded",
        }),
      onFailure: (message) => {
        setChannelState({
          data: [],
          status: "erred",
        });
        enqueueSnackbar(message, {
          variant: "error",
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
        <CardContent>
          {channelState.status === "erred" ? (
            <ErrorInline />
          ) : channelState.status === "loading" ? (
            <LoaderInline />
          ) : (
            "Hello World"
          )}
        </CardContent>
      </ChatBox>
    </Grid>
  );
}
