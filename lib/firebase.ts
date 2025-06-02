// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2zwzw4COSRkd4BMc5KHzKT1Rv-m5fGMk",
  authDomain: "firevase-d79f6.firebaseapp.com",
  projectId: "firevase-d79f6",
  storageBucket: "firevase-d79f6.firebasestorage.app",
  messagingSenderId: "1058412300176",
  appId: "1:1058412300176:web:85b73909cf314215211515",
  measurementId: "G-NGNG6F17WF"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)