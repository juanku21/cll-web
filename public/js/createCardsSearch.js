


// función para generar cards de usuarios

const createUserCard = (data) => {
    
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

export {createUserCard};