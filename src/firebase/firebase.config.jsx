// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "YOUR_ENG_API_KEY",
  authDomain: "YOUR_ENG_AUTH_DOMAIN",
  projectId: "YOUR_ENG_PROJECT_ID",
  storageBucket: "YOUR_ENG_STORAGE_BUCKET",
  messagingSenderId: "YOUR_ENG_MESSAGING_SENDER_ID",
  appId: "YOUR_ENG_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;