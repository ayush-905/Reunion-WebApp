import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBhxhxh3yf6vinBYBdBaOFywQHLhd-jixM",
    authDomain: "reunion-396eb.firebaseapp.com",
    projectId: "reunion-396eb",
    storageBucket: "reunion-396eb.appspot.com",
    messagingSenderId: "1038384103917",
    appId: "1:1038384103917:web:345c8ab9a0a52d747d27e4",
    measurementId: "G-LYY63GB3SK"
  };
  
  // Initialize Firebase
export const app = initializeApp(firebaseConfig)
const storage = getStorage(app)
export { storage }