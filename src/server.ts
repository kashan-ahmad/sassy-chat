import strings from "./strings";
import { initializeApp } from "firebase/app";
import { BoolBacks, Channel, SassyUser } from "./types";
import {
  doc,
  updateDoc,
  arrayUnion,
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import {
  User,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { isChannel } from "./utils";
import userConverter from "./UserConverter";

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

  updateDoc(globalChannel, {
    users: arrayUnion(user.uid),
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

  const queryRef = query(
    channelsRef,
    where("users", "array-contains", user.uid)
  );

  getDocs(queryRef)
    .then((docs) => {
      const channels: unknown[] = [];

      // Extract the documents' data
      docs.forEach((doc) => channels.push(doc.data()));

      // Type guard
      if (isChannel(channels[0])) {
        onSuccess(channels as Channel[]);
        return;
      }

      // Type error
      console.error("TypeError: doc isn't of type Channel");
      onFailure(strings.DEFAULT_ERROR);
    })
    .catch((error) => {
      console.error(error);
      onFailure(strings.DEFAULT_ERROR);
    });
}
