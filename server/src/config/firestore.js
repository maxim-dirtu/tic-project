// src/config/firestore.js
const admin = require("firebase-admin");

// Load Firebase service account credentials (replace with your actual path)
const serviceAccount = require("./firebase-service-account.json");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${process.env.VITE_FIREBASE_PROJECT_ID}.firebaseio.com`,
});

const db = admin.firestore();

module.exports = db;
