
import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    doc,
    setDoc,
    getDocs,
    deleteDoc,
    query,
    where
}
from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";


// clase usuarios, cada método permite realizar consultas sobre la base de datos

export class userModel {

    constructor() { }

    // obtener todos los usuarios de la base de datos

    async getUsers() {
        try {
            const querySnapshot = await getDocs(collection(db, "Users"));
            let users = [];

            querySnapshot.docs.forEach((user) => {
                users.push(user.data());
            });

            return users;
        }
        catch (err) {
            return err.message;
        }
    }


    // obtener usuarios aceptados

    async getUsersAccepted(){
        try {
            const consult = query(collection(db, "Users"), where("aceptado", "==", true));
            const querySnapshot = await getDocs(consult);
            let users = [];
            
            if (!querySnapshot) {
                return false;
            }

            querySnapshot.docs.forEach((user) => {
                users.push(user.data());
            });

            return users;
        } 
        catch (err) {
            return err.message;
        }
    }


    // obtener usuarios no aceptados

    async getUsersNotAccepted(){
        try {
            const consult = query(collection(db, "Users"), where("aceptado", "==", false));
            const querySnapshot = await getDocs(consult);
            let users = [];
            
            if (!querySnapshot) {
                return false;
            }

            querySnapshot.docs.forEach((user) => {
                users.push(user.data());
            });

            return users;
        } 
        catch (err) {
            return err.message;
        }
    }


    // obtener usuario con id

    async getUserWithID(id){
        try {
            const consult = query(collection(db, "Users"), where("userID", "==", id));
            const querySnapshot = await getDocs(consult);
            
            if (!querySnapshot) {
                return false;
            }

            return querySnapshot.docs[0];
        } 
        catch (err) {
            return err.message;
        }
    }

    
    // añadir un usuario a la base de datos
    
    async addUser(user) {
        try {
            const userAdd = await addDoc(collection(db, "Users"), user);
            return userAdd;
        }
        catch (err) {
            return err.message;
        }
    }


    // actualizar usuarios con id

    async updateUserWithID(id, data){
        try {
            const consult = query(collection(db, "Users"), where("userID", "==", id));
            const querySnapshot = await getDocs(consult);
            
            if (!querySnapshot.docs) {
                return false;
            }

            const docID = querySnapshot.docs[0].id;

            const updateQuerySnapshot = await setDoc(doc(db, "Users", docID), data, {merge: true});

            return true;
        } 
        catch (err) {
            return err.message;
        }
    }


    // eliminar usuario con id

    async deleteUserWithID(id){
        try{
            const consult = query(collection(db, "Users"), where("userID", "==", id));
            const querySnapshot = await getDocs(consult);
            
            if (!querySnapshot.docs) {
                return false;
            }

            const docID = querySnapshot.docs[0].id;

            const deleteQuerySnapshot = await deleteDoc(doc(db, "Users", docID));

            return true;
        }
        catch(err){
            console.log("Ha ocurrido un error", err.message);
        }
    }

}
