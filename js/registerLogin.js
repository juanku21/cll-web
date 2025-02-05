


import { showMessage } from "./showMessage.js";
import { auth } from "../app/firebase.js";
import { createUserWithEmailAndPassword } from "../app/auth.js";


const btnLogin = document.getElementById("btnLogin");

btnLogin.addEventListener("click", async (e) => {

    e.preventDefault()

    const form = document.getElementById("formLogin");

    const email = document.getElementById("emailInp").value;
    const password = document.getElementById("passwordInp").value;

    try{
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        location.href = "./profile.html";
        showMessage("Welcome " + userCredentials.user.email, "success");
        // setTimeout(() => {
        //     location.href = "./profile.html";
        // }, 1000)
    }
    catch(err){

        if (err.code === "auth/weak-password") {
            showMessage("Contraseña débil", "error");
        }
        else if (err.code === "auth/invalid-email") {
            showMessage("Correo no válido", "error");
        }
        else if (err.code === "auth/email-alredy-in-use") {
            showMessage("Correo ya en uso", "error");
        }
        else{
            showMessage(err.message, "error");
        }

    }

    form.reset();

})