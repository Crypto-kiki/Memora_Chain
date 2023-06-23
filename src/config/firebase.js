import firebase from "firebase/app";
import "firebase/database";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDsFA5Rc1u5gTtmv2ArgVM1a0AMbW1oh3E",
  authDomain: "memora-chain.firebaseapp.com",
  projectId: "memora-chain",
  storageBucket: "memora-chain.appspot.com",
  messagingSenderId: "199140780697",
  appId: "1:199140780697:web:2ba1b23acdf3669b3aa608",
  measurementId: "G-BWV8CWSHJT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default database;
