import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { Firestore, getDoc, getFirestore, setDoc } from "firebase/firestore";
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



export async function newCard(docId: string, data: any) {
    const defaultCard = {
        front: "Front",
        back: "Back",
        color: Math.floor(Math.random() * cardColors.length),
    };

    const stackRef = doc(firestore, "stacks", docId);

    await updateDoc(stackRef, {
        cards: [...data.cards, defaultCard]
    });
}

export async function updateCard(docId: string, data: any, cardIndex: number, newCard:any) {
    const stackRef = doc(firestore, "stacks", docId);

    data.cards[cardIndex] = newCard;

    await updateDoc(stackRef, {
        cards: data.cards
    });
}