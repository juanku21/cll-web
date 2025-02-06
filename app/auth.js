

// importaciones exclusivas del servicio de autenticación de firebase

import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    signOut, 
    setPersistence, 
    browserSessionPersistence, 
    onAuthStateChanged, 
    GoogleAuthProvider,
    signInWithPopup } 
from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";


// configuramos la persistencia de sesión para que trabaje con el "sesionStorage" del sitio
setPersistence(auth, browserSessionPersistence);

export { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signOut };
