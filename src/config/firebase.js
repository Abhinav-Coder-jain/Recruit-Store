// src/config/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwUhRV75uv6Ze_bWL1IwvUnWMC9qoiTlI",
  authDomain:"recruit-crm-ecommerce.firebaseapp.com",
  projectId: "recruit-crm-ecommerce",
  storageBucket: "recruit-crm-ecommerce.firebasestorage.app",
  messagingSenderId:"653213899716",
  appId: "1:653213899716:web:355b19e0e5f41e746a2291"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth and Database for use in other files
export const auth = getAuth(app);
export const db = getFirestore(app);