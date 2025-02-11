

import { auth } from "../app/firebase.js";
import { signOut, getUserID } from "../app/auth.js";
import { showMessage } from "./showMessage.js";
import { userModel } from "../app/firestore.js";


// objeto que permite hacer uso de la base de datos Firestore 

const pool = new userModel();


// función auxiliar para menejar coherencia en formulario

const resetOptions = (select) => {
    select.innerHTML = ``;
    select.innerHTML = `
        <option value="LM General Espejo">Liceo Militar General Espejo</option>
        <option value="LM General Lamadrid">Liceo Militar General Lamadrid</option>
        <option value="LM General San Martin">Liceo Militar General San Martín</option>
        <option value="LM General Belgrano">Liceo Militar General Belgrano</option>
        <option value="LM General Paz">Liceo Militar General Paz</option>
        <option value="LM General Roca">Liceo Militar General Roca</option>
        <option value="LM Naval Almirante Storni">Liceo Militar Naval Almirante Storni</option>
        <option value="LM Naval Almirante Brown">Liceo Militar Naval Almirante Brown</option>
        <option value="Liceo Aeronáutico Militar">Liceo Aeronáutico Militar</option>
    `;
}


// lógica para manejar coherencia entre FFAA y respectivos liceos

const ffaaInp = document.getElementById("ffaaInp");

ffaaInp.addEventListener("change", (e) => {

    const liceoInp = document.getElementById("liceoInp");
    resetOptions(liceoInp);

    if (ffaaInp.value == "Ejército") {
        for (let i = liceoInp.children.length - 1; i > 5; i--) {
            const option = liceoInp.children[i];
            option.remove();
        }
    }
    else if (ffaaInp.value == "Armada") {
        for (let i = 0; i < 6; i++) {
            const option = liceoInp.children[0];
            option.remove();
        }
        liceoInp.children[2].remove();
    }
    else if (ffaaInp.value == "Fuerza Aérea") {
        for (let i = 0; i < 8; i++) {
            const option = liceoInp.children[0];
            option.remove();
        }
    }

})


// lógica para menajar tipos de vínculos de usuario

const typeRelationship = document.getElementById("typeRelationship");
const promotionCont = document.getElementById("promotionCont");

typeRelationship.addEventListener("change", () => {

    if (typeRelationship.value == "Ex-cadete") {
        promotionCont.classList.remove("hidden");
    }
    else if (typeRelationship.value == "Personal Militar o Civil") {
        promotionCont.classList.add("hidden");
    }

})


// evento disparado al cargar la página

const editProfileForm = document.getElementById("editProfileForm");

addEventListener("DOMContentLoaded", async (e) => {

    const avisoCont = document.querySelector("#avisoCont");

    try {

        let profileData = await pool.getUserWithID(getUserID());
    
        profileData = profileData.data();
        
        // rellenamos el formulario de edición con la información preexistente

        let profileIMG = document.getElementById("profileIMG");
        profileData["photoURL"] != null ? profileIMG.setAttribute("src", profileData["photoURL"]) : profileIMG.setAttribute("src", "../assets/logo-usuario.png");

        const keysBodyReqCarga = ["nombre", "telefono", "ffaa", "liceo", "tipo-vinculo", "promocion", "profesion", "especialidad", "rubro", "provincia", "ciudad", "empresa", "info"];

        for (let i = 0; i < editProfileForm.elements.length - 1; i++) {
            const element = editProfileForm.elements[i];

            console.log(profileData[keysBodyReqCarga[i]], element);

            if (profileData[keysBodyReqCarga[i]] !== undefined) {
                element.value = profileData[keysBodyReqCarga[i]];
            }
            else{
                element.value = "";
                avisoCont.innerHTML = `<p>Debe completar el formulario con sus datos para poder usar el sitio</p>`;
            }

        }

        typeRelationship.value == "Ex-cadete" ? promotionCont.classList.remove("hidden") : promotionCont.classList.add("hidden");

    } 
    catch (err) {
        showMessage(err.message, "error");
    }

})

// cambiar foto de perfil

const fileInput = document.querySelector("#fileInput");

fileInput.addEventListener("change", e => {
    console.log(e.target.files[0]);
})

// cerrar sesión del usuario

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", async (e) => {
    
    try {
        await signOut(auth);
    } 
    catch (err) {
        showMessage(err.message, "error");
    }

})


// control del uso de la edición de datos de usuario

let edit = false;
const checkEdit = document.getElementById("checkEdit");

checkEdit.addEventListener("change", () => {

    if (edit) {
        edit = false;
        for (const element of editProfileForm.elements) {
            element.setAttribute('disabled', 'true');
        }
    }
    else{
        edit = true;
        for (const element of editProfileForm.elements) {
            element.removeAttribute('disabled');
        }
    }

})


// asentar cambios en el perfil

const btnEdit = document.getElementById("btnEdit");

btnEdit.addEventListener("click", async (e) => {
    e.preventDefault();

    const campos = editProfileForm.elements;

    for (let i = 0; i < campos.length - 1; i++) {
        const element = campos[i];

        if (typeRelationship.value == "Ex-cadete") {
            if (element.value.toString().trim() == "" && (i != 11 && i != 12)) {
                return showMessage("Debe completar todos los datos", "error");
            }
        }
        else if (typeRelationship.value == "Personal Militar o Civil") {
            if (element.value.toString().trim() == "" && (i != 11 && i != 12 && i != 5)) {
                return showMessage("Debe completar todos los datos", "error");
            }
        }
        
    }

    let datosForm = {}

    const keysBodyReq = ["nombre", "telefono", "ffaa", "liceo", "tipo-vinculo", "promocion", "profesion", "especialidad", "rubro", "provincia", "ciudad", "empresa", "info"];


    for (let j = 0; j < keysBodyReq.length; j++) {
        const key = keysBodyReq[j];

        if (typeRelationship.value == "Personal Militar o Civil" && j == 5) {
            continue;
        }

        if (campos[j].value.toString().trim() == "") {
            if (j == 10 || j == 11) {
                datosForm[key] = campos[j].value;
            }
        }
        else{
            datosForm[key] = campos[j].value;
        }

    }


    const res = await pool.updateUserWithID(getUserID(), datosForm)

    res == true ? showMessage("Datos actualizados", "success") : showMessage("Error al actualizar", "error");

    setTimeout(() => {
        window.location.reload();
    }, 1000)

})

