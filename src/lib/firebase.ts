import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { Firestore, addDoc, collection, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { cardColors } from "./data/cardcolors";

export const app = initializeApp({
    apiKey: "AIzaSyCXmPGcPYEtbgZChLvme1YHzePXtaPyKNI",
    authDomain: "flasha-isaxk.firebaseapp.com",
    projectId: "flasha-isaxk",
    storageBucket: "flasha-isaxk.appspot.com",
    messagingSenderId: "658346994217",
    appId: "1:658346994217:web:5825fd6ffefa23b92bca38",
    measurementId: "G-RSFTEYD0MN",
});
export const firestore = getFirestore(app);
export const auth = getAuth(app);


function defaultCard() {
    return {
        front: "Front",
        back: "Back",
        color: Math.floor(Math.random() * cardColors.length),
    };
}


export async function newCard(docId: string, data: any) {

    const stackRef = doc(firestore, "stacks", docId);

    await updateDoc(stackRef, {
        cards: [...data.cards, defaultCard()]
    });
}

export async function updateCard(docId: string, data: any, cardIndex: number, newCard: any) {
    const stackRef = doc(firestore, "stacks", docId);

    data.cards[cardIndex] = newCard;

    await updateDoc(stackRef, {
        cards: data.cards
    });
}

export async function newStack(uid: string) {

    const stacksRef = collection(firestore, "stacks");

    const stackRef = await addDoc(stacksRef, {
        name: "New Stack",
        uid,
        cards: [
            defaultCard()
        ]
    });

    return stackRef.id;
}