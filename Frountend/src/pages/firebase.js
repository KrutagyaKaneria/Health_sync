import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAYEtLs9f-qgs-skM19jk7rH7p9c1pWKIM",
  authDomain: "healthsync-45e93.firebaseapp.com",
  projectId: "healthsync-45e93",
  storageBucket: "healthsync-45e93.firebasestorage.app",
  messagingSenderId: "711424267367",
  appId: "1:711424267367:web:1efd7d56779d016a5cf0c2",
  measurementId: "G-BY6KGX0TQ7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider };