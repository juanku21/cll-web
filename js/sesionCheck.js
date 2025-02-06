
import { auth } from "../app/firebase.js";
import { onAuthStateChanged } from "../app/auth.js";
import { userModel } from "../app/firestore.js";


// objeto que permite hacer uso de la base de datos Firestore 

const pool = new userModel();


// todos los SIGNIN OPTIONS HACERLOS PERO CAMBIANDO LA CLASE DEL CONTEDOR DIPLAY NONE/BLOCK
// EFICIENTIZAR CÓDIGO Y USAR LA CASCADA

const signInOptionsBasic = () => {
    
    const actual = location.href;

    if (actual.includes("/index.html")) {
        let navbar = document.querySelector("#navbarSupportedContent2").children[0];
        navbar.children[4].remove();
        navbar.innerHTML += `
        <li class="mb-4 ps-2 lg:mb-0 lg:pe-1 lg:ps-0" data-twe-nav-item-ref>
            <a class="p-0 pb-1 text-white transition duration-200 hover:text-amber-400 hover:ease-in-out hover:border-b-2 hover:border-amber-400 focus:text-amber-400 active:text-amber-400 motion-reduce:transition-none lg:px-2"
            href="./pages/profile.html" data-twe-nav-link-ref>Perfil</a>
        </li>
        `;
    }
    else{
        let navbar = document.querySelector("#navbarSupportedContent2").children[0];
        navbar.children[4].remove();
        navbar.innerHTML += `
        <li class="mb-4 ps-2 lg:mb-0 lg:pe-1 lg:ps-0" data-twe-nav-item-ref>
            <a class="p-0 pb-1 text-white transition duration-200 hover:text-amber-400 hover:ease-in-out hover:border-b-2 hover:border-amber-400 focus:text-amber-400 active:text-amber-400 motion-reduce:transition-none lg:px-2"
            href="../pages/profile.html" data-twe-nav-link-ref>Perfil</a>
        </li>
        `;
    }


    if (actual.includes("/login.html") || actual.includes("/register.html")) {
        location.href = "../pages/profile.html";
    }

}


const signInOptionsFull = () => {
    
    const actual = location.href;

    if (actual.includes("/index.html")) {
        let navbar = document.querySelector("#navbarSupportedContent2").children[0];
        navbar.children[4].remove();
        navbar.innerHTML += `
        <li class="mb-4 ps-2 lg:mb-0 lg:pe-1 lg:ps-0" data-twe-nav-item-ref>
            <a class="p-0 pb-1 text-white transition duration-200 hover:text-amber-400 hover:ease-in-out hover:border-b-2 hover:border-amber-400 focus:text-amber-400 active:text-amber-400 motion-reduce:transition-none lg:px-2"
            href="./pages/search.html" data-twe-nav-link-ref>Buscar</a>
        </li>
        <li class="mb-4 ps-2 lg:mb-0 lg:pe-1 lg:ps-0" data-twe-nav-item-ref>
            <a class="p-0 pb-1 text-white transition duration-200 hover:text-amber-400 hover:ease-in-out hover:border-b-2 hover:border-amber-400 focus:text-amber-400 active:text-amber-400 motion-reduce:transition-none lg:px-2"
            href="./pages/profile.html" data-twe-nav-link-ref>Perfil</a>
        </li>
        `;
    }
    else{
        let navbar = document.querySelector("#navbarSupportedContent2").children[0];
        navbar.children[4].remove();
        navbar.innerHTML += `
        <li class="mb-4 ps-2 lg:mb-0 lg:pe-1 lg:ps-0" data-twe-nav-item-ref>
            <a class="p-0 pb-1 text-white transition duration-200 hover:text-amber-400 hover:ease-in-out hover:border-b-2 hover:border-amber-400 focus:text-amber-400 active:text-amber-400 motion-reduce:transition-none lg:px-2"
            href="../pages/search.html" data-twe-nav-link-ref>Buscar</a>
        </li>
        <li class="mb-4 ps-2 lg:mb-0 lg:pe-1 lg:ps-0" data-twe-nav-item-ref>
            <a class="p-0 pb-1 text-white transition duration-200 hover:text-amber-400 hover:ease-in-out hover:border-b-2 hover:border-amber-400 focus:text-amber-400 active:text-amber-400 motion-reduce:transition-none lg:px-2"
            href="../pages/profile.html" data-twe-nav-link-ref>Perfil</a>
        </li>
        `;
    }


    if (actual.includes("/login.html") || actual.includes("/register.html")) {
        location.href = "../pages/profile.html";
    }

}


const signInOptionsAdmin = () => {
    
    const actual = location.href;

    if (actual.includes("/index.html")) {
        let navbar = document.querySelector("#navbarSupportedContent2").children[0];
        navbar.children[4].remove();
        navbar.innerHTML += `
        <li class="mb-4 ps-2 lg:mb-0 lg:pe-1 lg:ps-0" data-twe-nav-item-ref>
            <a class="p-0 pb-1 text-white transition duration-200 hover:text-amber-400 hover:ease-in-out hover:border-b-2 hover:border-amber-400 focus:text-amber-400 active:text-amber-400 motion-reduce:transition-none lg:px-2"
            href="./pages/search.html" data-twe-nav-link-ref>Buscar</a>
        </li>
        <li class="mb-4 ps-2 lg:mb-0 lg:pe-1 lg:ps-0" data-twe-nav-item-ref>
            <a class="p-0 pb-1 text-white transition duration-200 hover:text-amber-400 hover:ease-in-out hover:border-b-2 hover:border-amber-400 focus:text-amber-400 active:text-amber-400 motion-reduce:transition-none lg:px-2"
            href="./pages/profile.html" data-twe-nav-link-ref>Perfil</a>
        </li>
        <li class="mb-4 ps-2 lg:mb-0 lg:pe-1 lg:ps-0" data-twe-nav-item-ref>
            <a class="p-0 pb-1 text-white transition duration-200 hover:text-amber-400 hover:ease-in-out hover:border-b-2 hover:border-amber-400 focus:text-amber-400 active:text-amber-400 motion-reduce:transition-none lg:px-2"
            href="./pages/admin.html" data-twe-nav-link-ref>Admin</a>
        </li>
        `;
    }
    else{
        let navbar = document.querySelector("#navbarSupportedContent2").children[0];
        navbar.children[4].remove();
        navbar.innerHTML += `
        <li class="mb-4 ps-2 lg:mb-0 lg:pe-1 lg:ps-0" data-twe-nav-item-ref>
            <a class="p-0 pb-1 text-white transition duration-200 hover:text-amber-400 hover:ease-in-out hover:border-b-2 hover:border-amber-400 focus:text-amber-400 active:text-amber-400 motion-reduce:transition-none lg:px-2"
            href="../pages/search.html" data-twe-nav-link-ref>Buscar</a>
        </li>
        <li class="mb-4 ps-2 lg:mb-0 lg:pe-1 lg:ps-0" data-twe-nav-item-ref>
            <a class="p-0 pb-1 text-white transition duration-200 hover:text-amber-400 hover:ease-in-out hover:border-b-2 hover:border-amber-400 focus:text-amber-400 active:text-amber-400 motion-reduce:transition-none lg:px-2"
            href="../pages/profile.html" data-twe-nav-link-ref>Perfil</a>
        </li>
        <li class="mb-4 ps-2 lg:mb-0 lg:pe-1 lg:ps-0" data-twe-nav-item-ref>
            <a class="p-0 pb-1 text-white transition duration-200 hover:text-amber-400 hover:ease-in-out hover:border-b-2 hover:border-amber-400 focus:text-amber-400 active:text-amber-400 motion-reduce:transition-none lg:px-2"
            href="../pages/admin.html" data-twe-nav-link-ref>Admin</a>
        </li>
        `;
    }


    if (actual.includes("/login.html") || actual.includes("/register.html")) {
        location.href = "../pages/profile.html";
    }

}


const logOutOptions = () => {
    const actual = location.href;
    if (actual.includes("/admin.html") || actual.includes("/search.html") || actual.includes("/profile.html")) {
        location.href = "../pages/login.html";
    }
}


// verificación de cambios en el estado de la sesión

onAuthStateChanged(auth, async (user) =>{

    if (user) {    
        signInOptionsBasic();
        const userData = await pool.getUserWithID(user.uid);

        if (userData) {
            
            if (userData["aceptado"] == true && userData["rol"] == "admin") {
                signInOptionsAdmin();
            }
            else if (userData["aceptado"] == true) {
                signInOptionsFull();
            }

        }
        else{
            console.log("En construcción...")
            // insertar alguna advertencia en la página de perfil para completar los datos
        }
    }
    else{
        logOutOptions();
    }

})
