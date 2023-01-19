import { auth } from "./server";
import { SassyContextInterface, SassyUser } from "./types";
import { onAuthStateChanged } from "firebase/auth";
import { StateUpdater, useEffect, useState } from "preact/hooks";

export default function useUser(): [SassyUser, StateUpdater<SassyUser>] {
  const [user, setUser] = useState<SassyContextInterface["user"]>({
    data: auth.currentUser || undefined,
    status: auth.currentUser ? "loaded" : "loading",
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          data: user,
          status: "loaded",
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
