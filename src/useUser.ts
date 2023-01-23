import { useSnackbar } from "notistack";
import { onAuthStateChanged } from "firebase/auth";
import { addUserToGlobalChannel, auth } from "./server";
import { SassyContextInterface, SassyUser } from "./types";
import { StateUpdater, useEffect, useState } from "preact/hooks";

export default function useUser(): [SassyUser, StateUpdater<SassyUser>] {
  const { enqueueSnackbar } = useSnackbar();

  const [user, setUser] = useState<SassyContextInterface["user"]>({
    data: auth.currentUser || undefined,
    status: auth.currentUser ? "loaded" : "loading",
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // Logged in
      if (user) {
        addUserToGlobalChannel({
          user,
          onSuccess: () =>
            setUser({
              data: user,
              status: "loaded",
            }),
          onFailure: (message) =>
            enqueueSnackbar(message, {
              variant: "error",
            }),
        });

        return;
      }

      // User hasn't logged in yet.
      setUser({
        status: "idle",
        data: undefined,
      });
    });
  }, []);

  return [user, setUser];
}
