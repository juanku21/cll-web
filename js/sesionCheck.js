
import { auth } from "../app/firebase.js";
import { onAuthStateChanged } from "../app/auth.js";
import { userModel } from "../app/firestore.js";


// objeto que permite hacer uso de la base de datos Firestore 

const pool = new userModel();


// opciones de navegación y servicios que pueden tener los usuarios dependiendo aceptación y rol

const signInOptionsBasic = () => {
    
    let navbar = document.querySelector("#navbarSupportedContent2").children[0];
    navbar.children[4].classList.add("hidden");
    navbar.children[5].classList.remove("hidden");

    const actual = location.href;

    if (actual.includes("/login.html") || actual.includes("/register.html")) {
        location.href = "../pages/profile.html";
    }

}


const signInOptionsFull = () => {
    
    let navbar = document.querySelector("#navbarSupportedContent2").children[0];
    navbar.children[4].classList.add("hidden");
    navbar.children[5].classList.remove("hidden");
    navbar.children[6].classList.remove("hidden");

    const actual = location.href;

    if (actual.includes("/login.html") || actual.includes("/register.html")) {
        location.href = "../pages/profile.html";
    }

}


const signInOptionsAdmin = () => {
    
    let navbar = document.querySelector("#navbarSupportedContent2").children[0];
    navbar.children[4].classList.add("hidden");
    navbar.children[5].classList.remove("hidden");
    navbar.children[6].classList.remove("hidden");
    navbar.children[7].classList.remove("hidden");

    const actual = location.href;
    
    if (actual.includes("/login.html") || actual.includes("/register.html")) {
        location.href = "../pages/profile.html";
    }

}


const logOutOptions = () => {
    
    let navbar = document.querySelector("#navbarSupportedContent2").children[0];
    navbar.children[4].classList.remove("hidden");
    navbar.children[5].classList.add("hidden");
    navbar.children[6].classList.add("hidden");
    navbar.children[7].classList.add("hidden");
    
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
            const avisoCont = document.querySelector("#avisoCont");
            avisoCont.innerHTML += `<p>Debe completar el formulario con los datos para poder usar el sitio</p>`
        }
    }
    else{
        logOutOptions();
    }

})
