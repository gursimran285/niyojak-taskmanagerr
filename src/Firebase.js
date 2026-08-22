// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBWzwM8qWcrSU8vIFsbqUhgUD_apKI2zyg",
    authDomain: "project-niyojak.firebaseapp.com",
    projectId: "project-niyojak",
    storageBucket: "project-niyojak.firebasestorage.app",
    messagingSenderId: "321151195151",
    appId: "1:321151195151:web:0f1a9798d7112876406b7a",
    measurementId: "G-CV6H5Y1X00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);    
export const db = getFirestore(app);
export const firestore = getFirestore(app);