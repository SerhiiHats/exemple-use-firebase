// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAi3rd4kQHLvHEHR-wZb8aYbV-iJ9S_h6o",
  authDomain: "fir-learn-e0117.firebaseapp.com",
  projectId: "fir-learn-e0117",
  storageBucket: "fir-learn-e0117.appspot.com",
  messagingSenderId: "53116794522",
  appId: "1:53116794522:web:b8ae84dbd349c0fe0ed123"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);