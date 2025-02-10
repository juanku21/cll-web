

import { userModel } from "../app/firestore.js";
import { showMessage } from "./showMessage.js";

// objeto que permite hacer uso de la base de datos Firestore 

const pool = new userModel();


// evento disparado al cargar la página

addEventListener("DOMContentLoaded", async () => {

    let contNotAccepted = document.getElementById("contNotAccepted");

    const users = await pool.getUsersNotAccepted();

    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        
        // cargar elementos HTML en el DOM

        let fila = document.createElement("tr");
        fila.classList.add("border-b", "border-neutral-200", "bg-neutral-50");

        let campos = ["nombre", "email", "telefono", "liceo"];

        for (let j = 0; j < 5; j++) {
            
            let campo = document.createElement("td");
            campo.classList.add("whitespace-nowrap", "px-6", "py-4", "font-medium");

            if (j != 0) {

                user[campos[j - 1]] === undefined ? campo.innerText = "No proporcionado" : campo.innerText = user[campos[j - 1]];

            }
            else{
                campo.innerText = i + 1;
            }
            
            fila.appendChild(campo);

        }


        let contAcceptOptions = document.createElement("td");
        contAcceptOptions.classList.add("whitespace-nowrap", "px-6", "py-4", "font-medium");

        let acceptOptions = document.createElement("div");
        acceptOptions.classList.add("accept-options");


        let aceptar = document.createElement("div");
        aceptar.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"  fill="#75FB4C">
                <path d="M378-246 154-470l43-43 181 181 384-384 43 43-427 427Z"/>
            </svg>`


        let eliminar = document.createElement("div");
        eliminar.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"  fill="#EA3323">
                <path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/>
            </svg>`


        aceptar.addEventListener("click", async () => {

            const seguro = confirm(`Seguro desea aceptar a ${user["nombre"]}`);

            if (seguro) {
                aceptar.parentElement.parentElement.parentElement.remove();
                const res = await pool.updateUserWithID(user["userID"], {aceptado: true});
                res == true ? showMessage("Usuario aceptado", "success") : showMessage("Error al aceptar", "error");
            }
            
        })

        eliminar.addEventListener("click", async () => {

            let nombreUser;
            user["nombre"] === undefined ? nombreUser = "Sin nombre" : nombreUser = user["nombre"];
            const seguro = confirm(`Seguro desea eliminar a ${nombreUser}`);

            if (seguro) {
                eliminar.parentElement.parentElement.parentElement.remove();
                const res = await pool.updateUserWithID(user["userID"], {aceptado: "ELIMINAR"});
                res == true ? showMessage("Usuario eliminado", "success") : showMessage("Error al aceptar", "error");
            }
        })

        acceptOptions.appendChild(aceptar);
        acceptOptions.appendChild(eliminar);

        contAcceptOptions.appendChild(acceptOptions);

        fila.appendChild(contAcceptOptions);

        contNotAccepted.appendChild(fila);

    }

})