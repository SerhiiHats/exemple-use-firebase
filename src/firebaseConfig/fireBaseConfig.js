// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use



const firebaseConfig = {
  apiKey: "AIzaSyAi3rd4kQHLvHEHR-wZb8aYbV-iJ9S_h6o",
  authDomain: "fir-learn-e0117.firebaseapp.com",
  databaseURL: "https://fir-learn-e0117-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fir-learn-e0117",
  storageBucket: "fir-learn-e0117.appspot.com",
  messagingSenderId: "53116794522",
  appId: "1:53116794522:web:0c84744d97e431650ed123"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth();
export const db = getFirestore(app);
