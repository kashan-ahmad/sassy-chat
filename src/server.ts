import strings from "./strings";
import { initializeApp } from "firebase/app";
import { BoolBacks, Channel, Message, SassyUser } from "./types";
import {
  doc,
  query,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
  collection,
  getFirestore,
  onSnapshot,
  Unsubscribe,
} from "firebase/firestore";
import {
  User,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { isChannel } from "./utils";
import { userToChannelUser } from "./userConverter";

const firebaseConfig = {
  appId: import.meta.env.VITE_APP_ID,
  apiKey: import.meta.env.VITE_API_KEY,
  projectId: import.meta.env.VITE_PROJECT_ID,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const authProvider = new GoogleAuthProvider();
let unsubscribe: Unsubscribe;

// Auth
export function loginWithGoogle({
  onFailure,
}: {
  onFailure: BoolBacks<SassyUser["data"]>["onFailure"];
}) {
  signInWithPopup(auth, authProvider)
    .then((result) => {
      const credentials = GoogleAuthProvider.credentialFromResult(result);

      if (!credentials) throw new Error(strings.DEFAULT_ERROR);
    })
    .catch((error) => {
      console.error(error);
      onFailure(strings.DEFAULT_ERROR);
    });
}

export function logout({
  onFailure,
}: {
  onFailure: BoolBacks<any>["onFailure"];
}) {
  signOut(auth).catch((reason) => {
    console.error(reason);
    onFailure(strings.DEFAULT_ERROR);
  });
}

// Channels
export function addUserToGlobalChannel({
  user,
  onSuccess,
  onFailure,
}: { user: User } & BoolBacks<any>) {
  const globalChannel = doc(db, "channels", "global");

  const key = `users.${user.uid}`;

  updateDoc(globalChannel, {
    [key]: userToChannelUser(user),
  })
    .then(onSuccess)
    .catch((error) => {
      console.error(error);
      onFailure(strings.DEFAULT_ERROR);
    });
}

export function getUserChannels({
  user,
  onSuccess,
  onFailure,
}: { user: User } & BoolBacks<Channel[]>) {
  const channelsRef = collection(db, "channels");

  // Select channels where `users.uid` isn't empty.
  const queryRef = query(channelsRef, where(`users.${user.uid}`, "!=", ""));

  getDocs(queryRef)
    .then((docs) => {
      const channels: unknown[] = [];

      // Extract the documents' data
      docs.forEach((doc) => channels.push({ ...doc.data(), id: doc.id }));

      // Type guard
      if (isChannel(channels[0])) {
        onSuccess(channels as Channel[]);
        return;
      }

      // Type error
      console.error("TypeScriptError: doc isn't of type Channel");
      onFailure(strings.DEFAULT_ERROR);
    })
    .catch((error) => {
      console.error(error);
      onFailure(strings.DEFAULT_ERROR);
    });
}

export function sendMessageToChannel({
  channel,
  message,
  onSuccess,
  onFailure,
}: BoolBacks<any> & {
  message: Message;
  channel: Channel;
}) {
  const channelRef = doc(db, "channels", channel.id);

  updateDoc(channelRef, {
    messages: arrayUnion(message),
  })
    .then(onSuccess)
    .catch((error) => {
      console.error(error);
      onFailure(strings.DEFAULT_ERROR);
    });
}

/**
 * Subscribes to a channel for real-time updates.
 */
export function subscribeToChannel({
  channel,
  onSuccess,
  onFailure,
}: {
  channel: Channel;
} & BoolBacks<Channel>) {
  unsubscribe = onSnapshot(doc(db, "channels", channel.id), (doc) => {
    const updatedChannel = {
      ...(doc.data() as Channel),
      id: doc.id,
    };

    // Type guard
    if (isChannel(updatedChannel)) {
      onSuccess(updatedChannel);
      return;
    }

    // Type error
    console.error("TypeScriptError: doc isn't of type Channel");
    onFailure(strings.DEFAULT_ERROR);
  });
}

/**
 * Unsubscribes from a subscribed channel. Since multi-channel subscription
 * isn't yet supported, the default subscribed channel is unsubscribed from.
 */
export function unsubscribeFromChannel() {
  unsubscribe();
}
