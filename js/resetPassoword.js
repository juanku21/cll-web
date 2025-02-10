

import { auth } from "../app/firebase.js";
import { sendPasswordResetEmail } from "../app/auth.js";
import { showMessage } from "./showMessage.js";

const resetPasswordCont = document.querySelector(".reset-password-cont");
const changePassword = document.getElementById("changePassword");

let active = false;

resetPasswordCont.addEventListener("click", () => {
    if (active) {
        changePassword.classList.remove("cont-change-pass")
        changePassword.classList.add("hidden");
        active = false;
    }
    else{
        changePassword.classList.remove("hidden")
        changePassword.classList.add("cont-change-pass")
        active = true;
    }
})

const btnChange = changePassword.children[2];

btnChange.addEventListener("click", async () => {

    const email = changePassword.children[1].children[1].value;

    try{
        await sendPasswordResetEmail(auth, email);
        changePassword.children[1].children[1].value = "";
        showMessage("Correo enviado", "success");
    }
    catch(err){
        showMessage(err.message, "error");
    }

})