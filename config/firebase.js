import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
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


export const getUserId = async () => {
    const auth = getAuth();
    let id;
    await onAuthStateChanged(auth, (user) => {
        if (user)
            id = user.uid;
        else
            id = "";
    });
    return id;
}

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
        return docSnap.data();
    } else {
        console.log("Pas de user id : " + id);
        return null;
    }
}

export const getPlacesById = async (id) => {
    const docRef = doc(db, "Places", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Place data:", docSnap.data());
        return docSnap.data();
    } else {
        console.log("Pas de place id : " + id);
        return null;
    }
}

export const addPlace = async (address, coordinates, description, name, tags) => {
    const place = await addDoc(collection(db, "Places"), {
        address: address,
        coordinates: coordinates,
        description: description,
        name: name,
        tags: tags,
    })

    const id = await getUserId();

    let user = await getUserById(id);
    let places = user.places || [];
    places.push(place.id);

    await setDoc(doc(db, "User", id), {
        ...user,
        places: places,
    });
    console.log("add place : " + name);
}

export const addUser = async (username, mailAddress, friends = [], places = []) => {
    await addDoc(collection(db, "User"), {
        friends: friends,
        mailAddress: mailAddress,
        places: places,
        username: username,
    })
    console.log("add user : " + username);
}

export const setPlace = async (id, address, coordinates, description, name, tags) => {
    await setDoc(doc(db, "Places", id), {
        address: address,
        coordinates: coordinates,
        description: description,
        name: name,
        tags: tags,
    });
    console.log("set place : " + id);
}

export const setUser = async (id, username, mailAddress, friends = [], places = []) => {
    await setDoc(doc(db, "User", id), {
        friends: friends,
        mailAddress: mailAddress,
        places: places,
        username: username,
    });
    console.log("set user : " + id);
}

export const addFriend = async (friendId) => {
    const id = await getUserId();

    let friend = await getUserById(friendId);
    let user = await getUserById(id);

    if (friend !== null) {
        let friends = user?.friends || [];

        if (friends.includes(friendId))
            return false;

        friends.push(friendId);

        await setDoc(doc(db, "User", id), {
            ...user,
            friends: friends,
        });

        friends = friend?.friends || [];
        friends.push(id)

        await setDoc(doc(db, "User", friendId), {
            ...friend,
            friends: friends,
        });

        return true;
    }
    else {
        return false;
    }
}

export const getFriends = async () => {
    const id = await getUserId();

    let user = await getUserById(id);

    if (user != null)
        return user.friends;
    else
        return null;
}

export const getUserPlaces = async (userId = null) => {
    const user = await getUserById(userId || await getUserId())
    let tabPlace = []
    if (user != null) {
      for (const element of user.places) {
        const place = await getPlacesById(element)
        if (place != null)
          if (!tabPlace.includes(place))
            tabPlace.push(place)
      }
    }
    return tabPlace;
  }
