import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "reactblog-da46f.firebaseapp.com",
  projectId: "reactblog-da46f",
  storageBucket: "reactblog-da46f.appspot.com",
  messagingSenderId: "880938698929",
  appId: "1:880938698929:web:9deca037b9f0597832fa90",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
