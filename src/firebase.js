import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC1o0XLmx4cqUYa1z7ew1wA7Ipku2LHqtI",
  authDomain: "med-app-f0a25.firebaseapp.com",
  projectId: "med-app-f0a25",
  storageBucket: "med-app-f0a25.appspot.com",
  messagingSenderId: "362681693416",
  appId: "1:362681693416:web:ca9de0c8507689faa4055d",
  measurementId: "G-Q5B66PHY97",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, db, auth };
