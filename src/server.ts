import { BoolBacks, SassyUser } from "./types";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import strings from "./strings";

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
export const auth = getAuth(app);
export const authProvider = new GoogleAuthProvider();

// Methods
export function loginWithGoogle({
  onSuccess,
  onFailure,
}: BoolBacks<SassyUser>) {
  signInWithPopup(auth, authProvider)
    .then((result) => {
      const credentials = GoogleAuthProvider.credentialFromResult(result);

      if (!credentials) throw new Error(strings.DEFAULT_ERROR);

      onSuccess({
        status: "loaded",
        data: result.user,
      });
    })
    .catch(() => {
      onFailure(strings.DEFAULT_ERROR);
    });
}
