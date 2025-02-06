
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";

// importaciones del servicio de Analíticas de google
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";

// importaciones del servicio de autenticación
import { getAuth } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// importaciones del servicio de base de datos
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCUqls2Jic4nEfc7Sw942YxO-63hHjo4cw",
    authDomain: "clliceista.firebaseapp.com",
    projectId: "clliceista",
    storageBucket: "clliceista.firebasestorage.app",
    messagingSenderId: "808533814047",
    appId: "1:808533814047:web:8a899c3f045b62752b5e2a",
    measurementId: "G-NXW0FHEWGM"
};

// Initialize Firebase & Google Analytics Service
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// inicializamos el servicios de autenticación y base de datos
export const auth = getAuth(app);
export const db = getFirestore(app);



// eliminar turnos existentes

// export const deleteTurnos = async (fecha, hora) => {
//     try{
//         deleteDoc(doc(db, "Turnos", `${fecha} | ${hora}`))
//     }
//     catch(e){
//         console.log("Ha ocurrido un error", e.message);
//     }
// }