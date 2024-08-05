// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    
  apiKey: "AIzaSyCPqxgnHb9WdVQfYKzu080BBvOMX7czrBI",
  authDomain: "foodconnect-25b60.firebaseapp.com",
  projectId: "foodconnect-25b60",
  storageBucket: "foodconnect-25b60.appspot.com",
  messagingSenderId: "603207607901",
  appId: "1:603207607901:web:f67b993d70974ced6a8fb4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db =getFirestore(app)
export default app;