

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

let filter = [false, false, false, false];


const filters = document.querySelectorAll(".category-filter");
for (let i = 0; i < filters.length; i++) {
    
    filters[i].addEventListener("change", () => {
        if (filter[i]) {
            filter[i] = false;
        }
        else{
            filter[i] = true;
        }

        console.log(filter);
    })
    
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


// función para generar cards de usuarios

const createUserCard = (data) => {
    console.log(data);
    
    if (data["photoURL"] === undefined) {
        if (data["promocion"] === undefined) {
            const component = `
            <div class="profile-card">
                <div class="img-profile-card">
                    <div>
                        <img src="../assets/logo-usuario.png" alt="foto-de-perfil-usuario">
                    </div>
                </div>
                <div class="content-profile-card">
                    <div>
                        <div>
                            <p>${data["nombre"]}</p>
                        </div>
                        <div>
                            <p><b>E-Mail: </b>${data["email"]}</p>
                            <p><b>Teléfono: </b>${data["telefono"]}</p>
                            <p><b>FFAA: </b>${data["ffaa"]}</p>
                            <p><b>Liceo: </b>${data["liceo"]}</p>
                            <p><b>Tipo de Relación: </b>${data["tipo-vinculo"]}</p>
                            <p><b>Profesión: </b>${data["profesion"]}</p>
                            <p><b>Especialidad: </b>${data["especialidad"]}</p>
                            <p><b>Rubro: </b>${data["rubro"]}</p>
                            <p><b>Provincia: </b>${data["provincia"]}</p>
                            <p><b>Ciudad: </b>${data["ciudad"]}</p>
                            <p><b>Empresa: </b>${data["empresa"]}</p>
                            <p><b>Info: </b>${data["info"]}</p>
                        </div>
                    </div>
                </div>
            </div>
            `
            return component;
        }
        else{
            const component = `
            <div class="profile-card">
                <div class="img-profile-card">
                    <div>
                        <img src="../assets/logo-usuario.png" alt="foto-de-perfil-usuario">
                    </div>
                </div>
                <div class="content-profile-card">
                    <div>
                        <div>
                            <p>${data["nombre"]}</p>
                        </div>
                        <div>
                            <p><b>E-Mail: </b>${data["email"]}</p>
                            <p><b>Teléfono: </b>${data["telefono"]}</p>
                            <p><b>FFAA: </b>${data["ffaa"]}</p>
                            <p><b>Liceo: </b>${data["liceo"]}</p>
                            <p><b>Promocion: </b>${data["promocion"]}</p>
                            <p><b>Profesión: </b>${data["profesion"]}</p>
                            <p><b>Especialidad: </b>${data["especialidad"]}</p>
                            <p><b>Rubro: </b>${data["rubro"]}</p>
                            <p><b>Provincia: </b>${data["provincia"]}</p>
                            <p><b>Ciudad: </b>${data["ciudad"]}</p>
                            <p><b>Empresa: </b>${data["empresa"]}</p>
                            <p><b>Info: </b>${data["info"]}</p>
                        </div>
                    </div>
                </div>
            </div>
            `
            return component;
        }
    }
    else{

        if (data["promocion"] === undefined) {
            const component = `
            <div class="profile-card">
                <div class="img-profile-card">
                    <div>
                        <img src="${data["photoURL"]}" alt="foto-de-perfil-usuario">
                    </div>
                </div>
                <div class="content-profile-card">
                    <div>
                        <div>
                            <p>${data["nombre"]}</p>
                        </div>
                        <div>
                            <p><b>E-Mail: </b>${data["email"]}</p>
                            <p><b>Teléfono: </b>${data["telefono"]}</p>
                            <p><b>FFAA: </b>${data["ffaa"]}</p>
                            <p><b>Liceo: </b>${data["liceo"]}</p>
                            <p><b>Tipo de Relación: </b>${data["tipo-vinculo"]}</p>
                            <p><b>Profesión: </b>${data["profesion"]}</p>
                            <p><b>Especialidad: </b>${data["especialidad"]}</p>
                            <p><b>Rubro: </b>${data["rubro"]}</p>
                            <p><b>Provincia: </b>${data["provincia"]}</p>
                            <p><b>Ciudad: </b>${data["ciudad"]}</p>
                            <p><b>Empresa: </b>${data["empresa"]}</p>
                            <p><b>Info: </b>${data["info"]}</p>
                        </div>
                    </div>
                </div>
            </div>
            `
            return component;
        }
        else{
            const component = `
            <div class="profile-card">
                <div class="img-profile-card">
                    <div>
                        <img src="${data["photoURL"]}" alt="foto-de-perfil-usuario">
                    </div>
                </div>
                <div class="content-profile-card">
                    <div>
                        <div>
                            <p>${data["nombre"]}</p>
                        </div>
                        <div>
                            <p><b>E-Mail: </b>${data["email"]}</p>
                            <p><b>Teléfono: </b>${data["telefono"]}</p>
                            <p><b>FFAA: </b>${data["ffaa"]}</p>
                            <p><b>Liceo: </b>${data["liceo"]}</p>
                            <p><b>Promocion: </b>${data["promocion"]}</p>
                            <p><b>Profesión: </b>${data["profesion"]}</p>
                            <p><b>Especialidad: </b>${data["especialidad"]}</p>
                            <p><b>Rubro: </b>${data["rubro"]}</p>
                            <p><b>Provincia: </b>${data["provincia"]}</p>
                            <p><b>Ciudad: </b>${data["ciudad"]}</p>
                            <p><b>Empresa: </b>${data["empresa"]}</p>
                            <p><b>Info: </b>${data["info"]}</p>
                        </div>
                    </div>
                </div>
            </div>
            `
            return component;
        }

    }
}


// evento disparado al cargar la página

addEventListener("DOMContentLoaded", async () => {
    
    const searchInp = document.getElementById("searchInp");

    // petición al servidor para obtener todos los usuarios
    
    const usersData = await pool.getUsersAccepted();

    // logica de búsqueda

    searchInp.addEventListener("input", (e) => {
        const dato = searchInp.value;

        const resultsSearch = document.querySelector("#resultsSearch");
        resultsSearch.innerHTML = ``;

        if (dato.length != 0) {

            let results = searchInfo(usersData, dato);

            const selects = document.getElementsByTagName("select");

            // activación de filtrado

            for (let i = 0; i < selects.length; i++) {
                const select = selects[i];

                if (filter[i]) {
                    results = filterInfo(results, {
                        key: select.name,
                        value: select.value
                    });
                }
                
            }

            if (results.length != 0) {
                for (let i = 0; i < results.length; i++) {
                    const userData = results[i];
                    console.log(userData);
                    resultsSearch.innerHTML += createUserCard(userData);
                }
            }
            else{
                resultsSearch.innerHTML += `<p>Sin resultados de búsqueda</p>`
            }
        
        }

    })

})

