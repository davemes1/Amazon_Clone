


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrQshmGcOrqXkgqMumUk1I9hDe0GPi48I",
  authDomain: "clone-e4957.firebaseapp.com",
  projectId: "clone-e4957",
  storageBucket: "clone-e4957.firebasestorage.com",
  messagingSenderId: "99970127528",
  appId: "1:99970127528:web:e89809544e9c7ddac2549d",
  measurementId: "G-KJ7RL1BQ34"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth(app)
export const db = getFirestore(app)