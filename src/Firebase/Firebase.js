
import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6OdVkj5zimFUABIXzzrN5aDlCtO65Ut4",
  authDomain: "ourschool-7f85b.firebaseapp.com",
  projectId: "ourschool-7f85b",
  storageBucket: "ourschool-7f85b.appspot.com",
  messagingSenderId: "737898111189",
  appId: "1:737898111189:web:bb0b6f04dfc2451748425c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;

