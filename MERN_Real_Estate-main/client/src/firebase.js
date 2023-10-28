// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "q-estate.firebaseapp.com",
    projectId: "q-estate",
    storageBucket: "q-estate.appspot.com",
    messagingSenderId: "906856527759",
    appId: "1:906856527759:web:28b3e9e4de83fc69c63dfa"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);