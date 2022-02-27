import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs } from "firebase/firestore";
import Constants from 'expo-constants';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCoKB9ZpR59Byo0kJa0nkEymu31tGNP3EA",
    authDomain: "the-good-places.firebaseapp.com",
    projectId: "the-good-places",
    storageBucket: "the-good-places.appspot.com",
    messagingSenderId: "428572468144",
    appId: "1:428572468144:web:ffa97e01d58a00707b2c75"
};

const Firebase = initializeApp(firebaseConfig);

export const auth = getAuth(Firebase);
export const db = getFirestore(Firebase);

export const getData = async (table) => {
    const col = collection(db, table);
    const snapshot = await getDocs(col);
    const list = snapshot.docs.map(doc => doc.data());
    return list;
}