import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAIOkUYDjpHFWPcCv9LsUB6i1EzFM0C1nY",
  authDomain: "sassy-chat.firebaseapp.com",
  projectId: "sassy-chat",
  storageBucket: "sassy-chat.appspot.com",
  messagingSenderId: "42006284388",
  appId: "1:42006284388:web:49ef1e4fe7ead925547771",
  measurementId: "G-L6VGLRGT0C",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const authProvider = new GoogleAuthProvider();

export function loginWithGoogle({
  onSuccess,
  onFailure,
}: {
  onSuccess: Function;
  onFailure: Function;
}) {
  signInWithPopup(auth, authProvider)
    .then((result) => {
      const credentials = GoogleAuthProvider.credentialFromResult(result);

      console.log({ credentials, result });
    })
    .catch((error) => {
      console.log(error);
    });
}
