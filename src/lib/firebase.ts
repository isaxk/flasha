import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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