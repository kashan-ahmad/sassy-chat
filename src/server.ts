import strings from "./strings";
import { initializeApp } from "firebase/app";
import { BoolBacks, SassyUser } from "./types";
import { doc, updateDoc, arrayUnion, getFirestore } from "firebase/firestore";
import {
  User,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

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

// Firestore
export function addUserToGlobalChannel({ user }: { user: User }) {
  const globalChannel = doc(db, "channels", "global");

  updateDoc(globalChannel, {
    users: arrayUnion(user.uid),
  })
    .then(() => console.log("Added"))
    .catch((error) => console.log(error));
}
