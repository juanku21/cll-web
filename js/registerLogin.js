


import { showMessage } from "./showMessage.js";
import { auth } from "../app/firebase.js";
import { createUserWithEmailAndPassword, sendEmailVerification } from "../app/auth.js";


const btnLogin = document.getElementById("btnLogin");

console.log(sendEmailVerification);

btnLogin.addEventListener("click", async (e) => {

    e.preventDefault()

    const form = document.getElementById("formLogin");

    if (form.elements[1].value == form.elements[2].value) {

        try{
            const userCredentials = await createUserWithEmailAndPassword(auth, form.elements[0].value, form.elements[1].value);

            try {
                await sendEmailVerification(userCredentials.user);
            } 
            catch (err) {
                console.log("Error al enviar email de verificación");
            }

            location.href = "./profile.html";
            showMessage("Welcome " + userCredentials.user.email, "success");
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
    }
    else{
        showMessage("Las contraseñas deben coincidir", "error");
    }

    form.reset();

})