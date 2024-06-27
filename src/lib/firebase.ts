import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getFirestore, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { cardColors } from "./cardColors";

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
export const provider = new GoogleAuthProvider();

export async function updateCard(stackId:string, cardId: string, newCard: any) {
    const cardRef = doc(firestore, `/stacks/${stackId}/cards/${cardId}`);

    await updateDoc(cardRef, newCard);
}

export async function deleteCard(stackId:string, cardId:string) {
    const cardRef = doc(firestore, `/stacks/${stackId}/cards/${cardId}`);

    await deleteDoc(cardRef);
}

export async function createCard(stackId:string) {
    const stackRef = collection(firestore, `/stacks/${stackId}/cards/`);

    await addDoc(stackRef, {
        front: "Front",
        back: "Back",
        color: cardColors[Math.floor(Math.random() * cardColors.length)],
        dateAdded: serverTimestamp()
    })
}

export async function updateStack(stackId:string, data:any) {
    const stackRef = doc(firestore, `/stacks/${stackId}`);

    await updateDoc(stackRef, data);
}

    
