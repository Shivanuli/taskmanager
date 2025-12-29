import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDsrJ60gd0HNWcdSAtaO-HppGnpaTpHHok",
    authDomain: "task-manager-app-6472b.firebaseapp.com",
    projectId: "task-manager-app-6472b",
    storageBucket: "task-manager-app-6472b.firebasestorage.app",
    messagingSenderId: "520281540050",
    appId: "1:520281540050:web:12e731a7f82bc38bf4b40b",
    measurementId: "G-EPE60TF88Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
