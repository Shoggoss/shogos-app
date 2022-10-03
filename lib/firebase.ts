// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInAnonymously } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5Ri8C7WxMnSmcOaStO3hcPknfvFXQh-o",
  authDomain: "shogos-app.firebaseapp.com",
  databaseURL:
    "https://shogos-app-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "shogos-app",
  storageBucket: "shogos-app.appspot.com",
  messagingSenderId: "741495003519",
  appId: "1:741495003519:web:859129c09421f21469224a",
  measurementId: "G-PN1YX34EB5",
};

// Initialize Firebase
export const app = getApps().length
  ? getApps()[0]
  : initializeApp(firebaseConfig);
export const analytics =
  typeof window === "undefined" ? undefined : getAnalytics(app);

export const auth = getAuth();
signInAnonymously(auth);
