// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLLdCJjrXUzAI7tlfvOoiNmZN4unZo9l8",
  authDomain: "urbanestate-dbfe4.firebaseapp.com",
  projectId: "urbanestate-dbfe4",
  storageBucket: "urbanestate-dbfe4.firebasestorage.app",
  messagingSenderId: "39124381222",
  appId: "1:39124381222:web:7aeaa724905ad8f94280e7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
