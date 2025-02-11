
import { auth } from "../app/firebase.js";
import { GoogleAuthProvider, signInWithPopup } from "../app/auth.js";
import { showMessage } from "./showMessage.js";

const googleLoginBtn = document.querySelector("#googleLoginBtn");

googleLoginBtn.addEventListener("click", async (e) => {

    const provider = new GoogleAuthProvider();

    try{
        const userCredentials = await signInWithPopup(auth, provider);
        showMessage("Welcome " + userCredentials.user.email, "success")
    }
    catch(err){

        if (err.code === "auth/wrong-password") {
            showMessage("Contraseña incorrecta", "error")
        }
        else if (err.code === "auth/user-not-found") {
            showMessage("Usuario no encontrado", "error")
        }
        else{
            showMessage(err.message, "error")
        }

    }

})