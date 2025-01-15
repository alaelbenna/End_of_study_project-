import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // Import GoogleAuthProvider

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC_APD6RZNjh2KvEKP_VsUCOuJtqoqvpcE",
  authDomain: "stadium-reservations.firebaseapp.com",
  projectId: "stadium-reservations",
  storageBucket: "stadium-reservations.firebasestorage.app",
  messagingSenderId: "101043766213",
  appId: "1:101043766213:web:1977559647189cd131c1ac",
  measurementId: "G-94C4ZMGP64",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and GoogleAuthProvider
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();  // Set up the Google Auth provider

export { auth, googleProvider };
