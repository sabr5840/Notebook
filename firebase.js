// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8HLh0bz43GJN3HhjEq0baFHqUH5SRbms",
  authDomain: "myproject-8be87.firebaseapp.com",
  projectId: "myproject-8be87",
  storageBucket: "myproject-8be87.appspot.com",
  messagingSenderId: "127529709",
  appId: "1:127529709:web:5d221b267bb497820492e4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app)
export { app, database }