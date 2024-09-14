import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDbPN9xDfByZGFEqR4wfpYuJr-kPubd2mc",
  authDomain: "healthlens-70986.firebaseapp.com",
  projectId: "healthlens-70986",
  storageBucket: "healthlens-70986.appspot.com",
  messagingSenderId: "592700156567",
  appId: "1:592700156567:web:8be455d4da40f6551bd7d2",
  measurementId: "G-G4QVM4JFBM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();

export {auth, provider};
export { app };