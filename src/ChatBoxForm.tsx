import { SassyContext } from "./context";
import { Channel, NewMessage } from "./types";
import { useContext, useState } from "preact/hooks";

// Components
import { useSnackbar } from "notistack";
import { Timestamp } from "firebase/firestore";
import SendIcon from "@mui/icons-material/Send";
import { sendMessageToChannel } from "./server";
import {
  Box,
  IconButton,
  FormControl,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { getMessageUserFromUser } from "./userConverter";

export default function ChatBoxForm({
  selectedChannel,
}: {
  selectedChannel: Channel;
}) {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useContext(SassyContext);
  const [typedMessage, setTypedMessage] = useState("");

  function onSendListener(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!typedMessage) return;

    const message: NewMessage = {
      variant: "plain",
      text: typedMessage,
      createdAt: Timestamp.now(),
      from: getMessageUserFromUser(user.data!),
    };

    sendMessageToChannel({
      message,
      channel: selectedChannel,
      onSuccess: () => {
        // Reset the form.
        setTypedMessage("");
      },
      onFailure: (message) =>
        enqueueSnackbar(message, {
          variant: "error",
        }),
    });
  }

  return (
    <Box component="form" width="100%" onSubmit={onSendListener}>
      <FormControl fullWidth variant="outlined">
        <OutlinedInput
          autoFocus
          value={typedMessage}
          placeholder="Type a message..."
          onChange={(e) => setTypedMessage(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton type="submit">
                <SendIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
}
