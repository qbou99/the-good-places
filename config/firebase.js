import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, getDoc, setDoc, addDoc } from "firebase/firestore";

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

export default Firebase;
export const db = getFirestore(Firebase);

export const getData = async (table) => {
    const col = collection(db, table);
    const snapshot = await getDocs(col);
    const list = snapshot.docs.map(document => { return { id: document.id, ...document.data() } });
    console.log("Data : " + JSON.stringify(list));
    return list;
}

export const getUsers = async () => {
    const col = collection(db, "User");
    const snapshot = await getDocs(col);
    const list = snapshot.docs.map(document => { return { id: document.id, ...document.data() } });
    console.log("Users : " + JSON.stringify(list));
    return list;
}

export const getPlaces = async () => {
    const col = collection(db, "Places");
    const snapshot = await getDocs(col);
    const list = snapshot.docs.map(document => { return { id: document.id, ...document.data() } });
    console.log("Places : " + JSON.stringify(list));
    return list;
}

export const getUserById = async (id) => {
    const docRef = doc(db, "User", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("User data:", docSnap.data());
    } else {
        console.log("Pas de user id : " + id);
    }
    return docSnap.data();
}

export const getPlacesById = async (id) => {
    const docRef = doc(db, "Places", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Place data:", docSnap.data());
    } else {
        console.log("Pas de place id : " + id);
    }
    return docSnap.data();
}

export const addPlace = async (address, coordinates, description, name, tag) => {
    await addDoc(collection(db, "Places"), {
        address: address,
        coordinates: coordinates,
        description: description,
        name: name,
        tag: tag,
    })
    console.log("add place : " + name);
}

export const addUser = async (username, mailAddress, friends = null, places = null) => {
    await addDoc(collection(db, "User"), {
        friends: friends,
        mailAddress: mailAddress,
        places: places,
        username: username,
    })
    console.log("add user : " + username);
}

export const setPlace = async (id, address, coordinates, description, name, tag) => {
    await setDoc(doc(db, "Places", id), {
        address: address,
        coordinates: coordinates,
        description: description,
        name: name,
        tag: tag,
    });
    console.log("set place : " + id);
}

export const setUser = async (id, username, mailAddress, friends = null, places = null) => {
    await setDoc(doc(db, "User", id), {
        friends: friends,
        mailAddress: mailAddress,
        places: places,
        username: username,
    });
    console.log("set user : " + id);
}