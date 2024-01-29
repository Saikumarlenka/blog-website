// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-3e562.firebaseapp.com",
  projectId: "mern-blog-3e562",
  storageBucket: "mern-blog-3e562.appspot.com",
  messagingSenderId: "2653282523",
  appId: "1:2653282523:web:8e9614ec8f4c4eb804ecfe"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);