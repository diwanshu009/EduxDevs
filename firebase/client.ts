// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAVlx_pFD0uUmtEfgUCwHVdsGqiEgU5sfE",
    authDomain: "eduxdevs.firebaseapp.com",
    projectId: "eduxdevs",
    storageBucket: "eduxdevs.firebasestorage.app",
    messagingSenderId: "182873427042",
    appId: "1:182873427042:web:df8c83e1a15d74acc9953b",
    measurementId: "G-67YCPT318L"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

export const auth = getAuth(app)
export const db = getFirestore(app)