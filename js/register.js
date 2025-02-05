

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


// solicitud HTTP a servidor para efectuar registro de usuarios

const reqRegister = async (data) => {
    const res = await fetch("../usuarios/register", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    
    return {
        status: res.status,
        statusText: res.statusText,
        ok: res.ok,
        content: await res.json()
    };
}


// manejar coherencia entre FFAA y respectivos liceos

const btnRegister = document.getElementById("btnRegister");
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


// completar formulario

btnRegister.addEventListener("click", (e) => {
    e.preventDefault();

    const formRegister = document.getElementById("formRegister");

    const campos = formRegister.elements;

    for (let i = 0; i < campos.length - 1; i++) {
        const element = campos[i];
        
        if (element.value.toString().trim() == "" && (i != 12 || i != 13)) {
            return alert("Debe completar todos los campos del formulario");
        }
    }

    console.log("campos completos");

    datosForm = {
        nombre: campos[0].value,
        email: campos[1].value,
        telefono: campos[2].value,
        password:campos[3].value,
        ffaa: campos[4].value,
        liceo: campos[5].value,
        promocion: campos[6].value,
        profesion: campos[7].value,
        especialidad: campos[8].value,
        rubro: campos[9].value,
        provincia: campos[10].value,
        ciudad: campos[11].value,
        empresa: campos[12].value,
        info: campos[13].value
    }

    reqRegister(datosForm).then(res => {

        console.log(res.content);

        if (res.ok) {
            location.href = "../pages/login.html";
        } else {
            alert("Hubo un error al crear el usuario");
        }
    });

    formRegister.reset();
})


