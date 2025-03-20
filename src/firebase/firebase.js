// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADFsex1tRtkWwpv5I5jAVX4QBT6p_a5HQ",
  authDomain: "sphero-0000.firebaseapp.com",
  projectId: "sphero-0000",
  storageBucket: "sphero-0000.firebasestorage.app",
  messagingSenderId: "5639021979",
  appId: "1:5639021979:web:809d23e1d59195a164ed3e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export { auth };