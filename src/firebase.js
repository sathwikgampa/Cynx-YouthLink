// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCnShDV_1uquG8uYVBx1YU7aTBE3gCwO2E",
    authDomain: "cnyx-24.firebaseapp.com",
    projectId: "cnyx-24",
    storageBucket: "cnyx-24.firebasestorage.app",
    messagingSenderId: "1071542594881",
    appId: "1:1071542594881:web:627854b1eb4054507e45c0",
    measurementId: "G-0629Y85KYL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);