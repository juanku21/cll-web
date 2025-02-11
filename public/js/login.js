

import { showMessage } from "./showMessage.js";
import { auth } from "../app/firebase.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "../app/auth.js";


const btnLogin = document.getElementById("btnLogin");

btnLogin.addEventListener("click", async (e) => {

    e.preventDefault()

    const form = document.getElementById("formLogin");

    const email = document.getElementById("emailInp").value;
    const password = document.getElementById("passwordInp").value;

    // corresponde a registro, no exactamente a logueo

    try{
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
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

    // reqLogin(email, password).then(res => {
    //     if (res.ok) {
    //         sessionStorage.setItem("token", res.content.token);
    //         location.href = "../pages/search.html";
    //     } else {
    //         alert("Usuario o contraseña incorrectos");
    //     }
    // });

    form.reset();

})