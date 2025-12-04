import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA25WGyDeW9JL0FwHgmn6zyz_XH7G7k4h4",
  authDomain: "tdtt-web.firebaseapp.com",
  projectId: "tdtt-web",
  storageBucket: "tdtt-web.firebasestorage.app",
  messagingSenderId: "623381305792",
  appId: "1:623381305792:web:a153231bf99b24be0f9025",
  measurementId: "G-KJ29DH752J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);