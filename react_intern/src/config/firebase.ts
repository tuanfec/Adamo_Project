import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAt78Is2RS7c5skO4xm9QARsbql_xfNQso",
  authDomain: "authen-app-817a4.firebaseapp.com",
  projectId: "authen-app-817a4",
  storageBucket: "authen-app-817a4.firebasestorage.app",
  messagingSenderId: "270209930345",
  appId: "1:270209930345:web:356aa21d99ec1c8fa4bef8",
  measurementId: "G-Y30QXFQ3PD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Handle initial auth state
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in:", user.email);
  } else {
    console.log("No user is signed in");
  }
});
