

import { auth } from "../app/firebase.js";
import { signOut } from "../app/auth.js";
import { showMessage } from "./showMessage.js";
import { userModel } from "../app/firestore.js";


// objeto que permite hacer uso de la base de datos Firestore 

const pool = new userModel();


// función auxiliar para menejar coherencia en formulario

const resetOptions = (select) => {
    select.innerHTML = ``;
    select.innerHTML = `
    <option value="Liceo Militar General Espejo">Liceo Militar General Espejo</option>
    <option value="Liceo Militar General Lamadrid">Liceo Militar General Lamadrid</option>
    <option value="Liceo Militar General San Martin">Liceo Militar General San Martín</option>
    <option value="Liceo Militar General Belgrano">Liceo Militar General Belgrano</option>
    <option value="Liceo Militar General Paz">Liceo Militar General Paz</option>
    <option value="Liceo Militar General Roca">Liceo Militar General Roca</option>
    <option value="Liceo Militar Naval Almirante Storni">Liceo Militar Naval Almirante Storni</option>
    <option value="Liceo Militar Naval Almirante Brown">Liceo Militar Naval Almirante Brown</option>
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



// evento disparado al cargar la página

const editProfileForm = document.getElementById("editProfileForm");

addEventListener("DOMContentLoaded", async (e) => {

    const res = await reqProfile();

    if (!res.ok) {
        console.log(res.content);
        return alert("Fallo la solicitud al servidor. Por favor espere");
    }
        
    const profileData = res.content;

    // rellenamos el formulario de edición con la información preexistente

    const claves = Object.keys(profileData);

    for (let i = 0; i < editProfileForm.elements.length; i++) {
        const element = editProfileForm.elements[i];

        if (i != 2){
            element.value = profileData[claves[i+1]];
        }

    }

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
        
        if (element.value.toString().trim() == "" && (i != 10 && i != 11)) {
            return alert("Debe completar todos los campos del formulario");
        }
        
    }

    let datosForm = {}

    const keysBodyReq = ["nombre", "telefono", "ffaa", "liceo", "promocion", "profesion", "especialidad", "rubro", "provincia", "ciudad", "empresa", "info"];

    for (let i = 0; i < keysBodyReq.length; i++) {
        const key = keysBodyReq[i];

        if (campos[i].value.toString().trim() == "") {
            if (i == 10 || i == 11) {
                datosForm[key] = campos[i].value;
            }
        }
        else{
            datosForm[key] = campos[i].value;
        }

    }

    console.log(datosForm);

    const res = await pool.updateUserWithID(auth.lastNotifiedUid, datosForm)

    res == true ? showMessage("Datos actualizados", "success") : showMessage("Error al actualizar", "error");

})