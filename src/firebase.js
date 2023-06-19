// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const FIREBASE_API = process.env.REACT_APP_FIREBASE_API;
const FIREBASE_APP_ID = process.env.REACT_APP_FIREBASE_APP_ID;

const firebaseConfig = {
  apiKey: FIREBASE_API,
  authDomain: "memora-chain.firebaseapp.com",
  projectId: "memora-chain",
  storageBucket: "memora-chain.appspot.com",
  messagingSenderId: "199140780697",
  appId: FIREBASE_APP_ID,
  measurementId: "G-BWV8CWSHJT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
