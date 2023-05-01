// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATHf57gkoB4Y46BCqGjDtdBXvzjrVQaRk",
  authDomain: "voting-app-dev-b7137.firebaseapp.com",
  projectId: "voting-app-dev-b7137",
  storageBucket: "voting-app-dev-b7137.appspot.com",
  messagingSenderId: "913915058411",
  appId: "1:913915058411:web:276c087b93c84c0b9246ae",
  measurementId: "G-4WY6521KQ4"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore(app)
const auth = getAuth()

export default app
export { auth, db };
