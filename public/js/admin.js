

import { userModel } from "../app/firestore.js";
import { showMessage } from "./showMessage.js";

// objeto que permite hacer uso de la base de datos Firestore 

const pool = new userModel();


// función para generar Excel con datos

function createExcelWithData(data) {

    let excelData = []

    for (let i = 0; i < data.length; i++) {
        
        const keysBodyReq = ["nombre", "telefono", "ffaa", "liceo", "tipo-vinculo", "promocion", "profesion", "especialidad", "rubro", "provincia", "ciudad", "empresa", "info"];
        
        let excelRegister = {}

        keysBodyReq.forEach(key => {
            excelRegister[key] = data[i][key];
        })

        excelData.push(excelRegister);

    }

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Crear un nuevo libro de Excel
    const workbook = XLSX.utils.book_new();
    
    // Agregar la hoja al libro con un nombre específico
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

    // Escribir el libro en formato binario
    const workbookBinary = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
    
    // Función para convertir el string binario a un ArrayBuffer
    function s2ab(s) {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) {
        view[i] = s.charCodeAt(i) & 0xFF;
        }
        return buf;
    }
    
    // Crear un Blob a partir del ArrayBuffer
    const blob = new Blob([s2ab(workbookBinary)], { type: "application/octet-stream" });
    
    // Crear una URL para el Blob
    const url = URL.createObjectURL(blob);
    

    // Crear un enlace invisible y simular el click para iniciar la descarga
    const a = document.createElement("a");
    a.href = url;
    const date = new Date()

    a.download = `copia-seguridad-cll-${date.toISOString().substring(0, 10)}.xlsx`; // Nombre del archivo a descargar

    document.body.appendChild(a);
    a.click();
    

    // Limpiar el DOM y liberar la URL
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

}


// evento disparado al cargar la página

addEventListener("DOMContentLoaded", async () => {

    // obtención de elementos necesarios del DOM

    const btnData = document.getElementById("btnData");
    let contNotAccepted = document.getElementById("contNotAccepted");
    let statistics = document.querySelector(".statistics-data")

    // consultas a la base de datos

    const usersAccepted = await pool.getUsersAccepted();
    const users = await pool.getUsersNotAccepted();

    // añadimos funcionalidad al botón creado para la descarga de datos en formato Excel

    btnData.addEventListener("click", (e) => {
        createExcelWithData(usersAccepted);
    })

    // generamos estadísticas para visualización por administrador

    statistics.innerHTML = `<div><p>${usersAccepted.length}</p><p>USUARIOS VERIFICADOS</p></div><div><p>${users.length}</p><p>USUARIOS POR VERIFICAR</p></div><div><p>${usersAccepted.length + users.length}</p><p>USUARIOS TOTALES</p></div>`


    // lógica para el listado de usaurios que aguardan verificación

    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        
        // cargar elementos HTML en el DOM

        let fila = document.createElement("tr");
        fila.classList.add("border-b", "border-neutral-200", "bg-neutral-50");

        let campos = ["nombre", "email", "telefono", "liceo"];

        for (let j = 0; j < 5; j++) {
            
            let campo = document.createElement("td");
            campo.classList.add("whitespace-nowrap", "px-6", "py-4", "font-medium", "text-black");

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


