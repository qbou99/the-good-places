import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs, doc, getDoc, addDoc } from "firebase/firestore";

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
    return snapshot.docs.map(document => { return { id: document.id, ...document.data() } });
}

export const getUsers = async () => {
    const col = collection(db, "User");
    const snapshot = await getDocs(col);
    return snapshot.docs.map(document => { return { id: document.id, ...document.data() } });
}

export const getPlaces = async () => {
    const col = collection(db, "Places");
    const snapshot = await getDocs(col);
    return snapshot.docs.map(document => { return { id: document.id, ...document.data() } });
}

export const getUserById = async (id) => {
    const docRef = doc(db, "User", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
    } else {
        console.log("No such document!");
    }
    return docSnap.data();
}

export const getPlacesById = async (id) => {
    const docRef = doc(db, "Places", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
    } else {
        console.log("No such document!");
    }
    return docSnap.data();
}

export const setPlace = async (address, coordinates, description, name, tags) => {
    await addDoc(collection(db, "Places"), {
        address: address,
        coordinates: coordinates,
        description: description,
        name: name,
        tags: tags,
    })
}

export const setUser = async (friends, mailAddress, places, username) => {
    await addDoc(collection(db, "User"), {
        friends: friends,
        mailAddress: mailAddress,
        places: places,
        username: username,
    })
}