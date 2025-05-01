import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// Get this from Firebase Console -> Project Settings -> General -> Your Apps
const firebaseConfig = {
  apiKey: "AIzaSyDcxOU63etr1qMBOegnzEmu8l8J1rkQgbE",
  authDomain: "notifications-31f6e.firebaseapp.com",
  projectId: "notifications-31f6e",
  storageBucket: "notifications-31f6e.firebasestorage.app",
  messagingSenderId: "67735847791",
  appId: "1:67735847791:web:8837061a9f1bf367ca1e9a",
  measurementId: "G-YWMHKLT6V0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
