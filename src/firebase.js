// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAX4Ht1ybR2xd9qs8UVUsXonqM_AXCaY24",
  authDomain: "raywebsolutions-b797b.firebaseapp.com",
  projectId: "raywebsolutions-b797b",
  storageBucket: "raywebsolutions-b797b.firebasestorage.app",
  messagingSenderId: "279284666655",
  appId: "1:279284666655:web:c104829d34c895269ba02a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, RecaptchaVerifier };

