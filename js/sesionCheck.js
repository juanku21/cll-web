
import { auth } from "../app/firebase.js";
import { onAuthStateChanged } from "../app/auth.js";
import { userModel } from "../app/firestore.js";


// objeto que permite hacer uso de la base de datos Firestore 

const pool = new userModel();


// opciones de navegación y servicios que pueden tener los usuarios dependiendo aceptación y rol

const signInOptionsBasic = () => {
    
    let navbar = document.querySelector("#navbarSupportedContent2").children[0];
    navbar.children[4].classList.add("hidden");
    navbar.children[6].classList.remove("hidden");

    const actual = location.href;

    if (actual.includes("/login.html") || actual.includes("/registerLogin.html") || actual.includes("/search.html") || actual.includes("/admin.html")) {
        location.href = "../pages/profile.html";
    }

}


const signInOptionsFull = () => {
    
    let navbar = document.querySelector("#navbarSupportedContent2").children[0];
    navbar.children[4].classList.add("hidden");
    navbar.children[5].classList.remove("hidden");
    navbar.children[6].classList.remove("hidden");

    const actual = location.href;

    if (actual.includes("/login.html") || actual.includes("/registerLogin.html") || actual.includes("/admin.html")) {
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
    
    if (actual.includes("/login.html") || actual.includes("/registerLogin.html")) {
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

        const userData = await pool.getUserWithID(user.uid);

        if (userData) {
            
            if (userData.data()["aceptado"] == true && userData.data()["role"] == "admin") {
                signInOptionsAdmin();
            }
            else if (userData.data()["aceptado"] == true) {
                signInOptionsFull();
            }
            else if(userData.data()["aceptado"] == false){
                signInOptionsBasic();
            }

        }
        else{
            signInOptionsBasic();

            let newUser;

            if (user.providerData[0].providerId == "google.com") {
                newUser = {
                    userID: user.uid,
                    aceptado: false,
                    role: "user",
                    nombre: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL
                }
            }
            else{
                newUser = {
                    userID: user.uid,
                    aceptado: false,
                    role: "user",
                    email: user.email,
                }
            }

            const nuevo = await pool.addUser(newUser);
        }
    }
    else{
        logOutOptions();
    }

})
