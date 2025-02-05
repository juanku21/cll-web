import { auth } from "../app/firebase.js";
import { onAuthStateChanged } from "../app/auth.js";

// cuando ocurra un cambio en el estado de la sesión se ejecuta este código 

const signInOptions = () => {
    
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


const logOutOptions = () => {
    const actual = location.href;
    if (actual.includes("/admin.html") || actual.includes("/search.html") || actual.includes("/profile.html")) {
        location.href = "../pages/login.html";
    }
}

onAuthStateChanged(auth, (user) =>{

    if (user) {
        signInOptions();
    }
    else{
        logOutOptions();
    }
})
