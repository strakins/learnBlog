// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-43720.firebaseapp.com",
  projectId: "blog-43720",
  storageBucket: "blog-43720.appspot.com",
  messagingSenderId: "878462538261",
  appId: "1:878462538261:web:71b75baf2f15f74e90741c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);