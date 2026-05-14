// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCU3mmUgQy-IcIU5u6-pGhmPJRVfWtSJvo",
  authDomain: "testing-bfc9f.firebaseapp.com",
  projectId: "testing-bfc9f",
  storageBucket: "testing-bfc9f.firebasestorage.app",
  messagingSenderId: "1089308197638",
  appId: "1:1089308197638:web:c7bdbddd3101ff97a09487",
  measurementId: "G-4BTC050HE1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)