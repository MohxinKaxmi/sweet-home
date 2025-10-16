// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "sweet-home-c322e.firebaseapp.com",
  projectId: "sweet-home-c322e",
  storageBucket: "sweet-home-c322e.firebasestorage.app",
  messagingSenderId: "1074347364935",
  appId: "1:1074347364935:web:2ec8a52fda0e1e99d6d762",
  measurementId: "G-V13WXJJ0GN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);