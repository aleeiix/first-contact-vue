// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBPSJZzPiVEglqHGv7baEN96c13T4XR9ro",
    authDomain: "auth-gmfa.firebaseapp.com",
    databaseURL: "https://auth-gmfa.firebaseio.com",
    projectId: "auth-gmfa",
    storageBucket: "auth-gmfa.appspot.com",
    messagingSenderId: "59988674864",
    appId: "1:59988674864:web:8f54e52058403f142e20f5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {firebase, firestore, auth, storage}