// src/config/firestore.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3xTY9A2umJ2puVGtHYfBir9pS2EuB45Q",
  authDomain: "tic-project-867c0.firebaseapp.com",
  projectId: "tic-project-867c0",
  storageBucket: "tic-project-867c0.firebasestorage.app",
  messagingSenderId: "545939077276",
  appId: "1:545939077276:web:213cc53faeacd70ec21559",
  measurementId: "G-ZHMFNEMBLS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore instance
const db = getFirestore(app);

export default db;
