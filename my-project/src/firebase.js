
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9GSDXw7KB-a8eJQlNr-ZLlW1rcQ1ViJI",
  authDomain: "collective-dreams-e11e9.firebaseapp.com",
  projectId: "collective-dreams-e11e9",
  storageBucket: "collective-dreams-e11e9.firebasestorage.app",
  messagingSenderId: "190892123583",
  appId: "1:190892123583:web:7d34b1397e53e962f26d0a",
  measurementId: "G-YPHWX7H7FT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);