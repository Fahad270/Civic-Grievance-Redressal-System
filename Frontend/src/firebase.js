import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCKcy_ZMJP1g_6ofRInFS8JH9BjcWyqiHA",
  authDomain: "civicgrievanceredressalsystem.firebaseapp.com",
  projectId: "civicgrievanceredressalsystem",
  storageBucket: "civicgrievanceredressalsystem.firebasestorage.app",
  messagingSenderId: "603180316274",
  appId: "1:603180316274:web:b3f89ba52e86a7ca8874eb",
  measurementId: "G-444ELX6GS3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);