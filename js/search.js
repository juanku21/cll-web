

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


// función para filtrar registros a partir de texto de búsqueda

const searchInfo = (documents, data) => {

    let check = documents.filter(

        doc => {

            const keys = Object.keys(doc);
    
            for(let i = 0; i < keys.length; i++){
    
                const clave = keys[i];
    
                if (doc[clave].toString().toLowerCase().includes(data.toLowerCase())) {
                    return true;
                }
                else if (i == keys.length - 1) {
                    return false;
                } 
            }
    
        }
    )

    return check;

}



// función para filtrar registros a partir de un filtro definido

const filterInfo = (documents, filtro) => {

    const check = documents.filter(doc => {

        if (doc[filtro.key] == filtro.value) {
            return true;
        }
        else{
            return false;
        }

    })

    return check;
}

// despliegue de barra de filtros

const btnSFilters = document.getElementById("btnSFilters");
let desplegado = false;

btnSFilters.addEventListener("click", (e) => {

    const filtersCont = document.getElementById("filtersCont");

    if (desplegado) {
        filtersCont.classList.remove("filters-on");
        filtersCont.classList.add("filters-off");
        desplegado = false;
    }
    else{
        filtersCont.classList.remove("filters-off");
        filtersCont.classList.add("filters-on");
        desplegado = true;
    }

})


// control del uso de filtro de búsqueda

let filter = false;
const checkFilter = document.getElementById("checkFilter");

checkFilter.addEventListener("change", () => {

    if (filter) {
        filter = false;
    }
    else{
        filter = true;
    }

})


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

addEventListener("DOMContentLoaded", async () => {
    
    const searchInp = document.getElementById("searchInp");

    // petición al servidor para obtener todos los usuarios
    
    const usersData = await pool.getUsers();

    // logica de búsqueda

    searchInp.addEventListener("input", (e) => {
        const dato = searchInp.value;
        
        let results = searchInfo(usersData, dato);

        const selects = document.getElementsByTagName("select");

        if (filter == true) {

            for (let select of selects) {
                results = filterInfo(results, {
                    key: select.name,
                    value: select.value
                });
            }

        }

        console.log(results)

    })

})






// const selects = document.getElementsByTagName("select");

// for (let select of selects) {
//     select.addEventListener("change", (e) => {
//     console.log("jajaja");
// })}