import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore";

const apiKey = process.env.REACT_APP_API_KEY

const firebaseConfig = {
    apiKey: apiKey,
    authDomain: "homepage-df3b1.firebaseapp.com",
    projectId: "homepage-df3b1",
    storageBucket: "homepage-df3b1.appspot.com",
    messagingSenderId: "385563837106",
    appId: "1:385563837106:web:b29fb2020a9fa679cb7fab"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db, doc, addDoc, getDocs, updateDoc, deleteDoc, collection, serverTimestamp, orderBy, query };

