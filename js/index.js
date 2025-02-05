


// CÓDIGO DEL CARRUSEL DE IMÁGENES

let btnLSlider = document.querySelector(".btn-slider-left");
let btnRSlider = document.querySelector(".btn-slider-right");
let contImg = document.querySelector(".slider--inner").children;
let contIndicators = document.querySelector(".slider-indicators").children;

btnRSlider.addEventListener("click", (e) => {
    e.preventDefault();

    for (let i = 0; i < contImg.length; i++) {
        const element = contImg[i];
        const indicator = contIndicators[i];

        if (element.classList[0] == "primer-img") {
            if (i != contImg.length - 1) {
                let next = element.nextElementSibling;
                element.classList.remove("primer-img");
                next.classList.add("primer-img")

                let nextInd = indicator.nextElementSibling;
                indicator.classList.remove("indicador-active");
                nextInd.classList.add("indicador-active")

                break
            }
            else{
                let next = contImg[0];
                element.classList.remove("primer-img");
                next.classList.add("primer-img");
                
                let nextInd = contIndicators[0];
                indicator.classList.remove("indicador-active");
                nextInd.classList.add("indicador-active")

                break
            }
        }
    }

})

btnLSlider.addEventListener("click", (e) => {
    e.preventDefault();

    for (let i = 0; i < contImg.length; i++) {
        const element = contImg[i];
        const indicator = contIndicators[i];

        if (element.classList[0] == "primer-img") {
            if (i != 0) {
                let previous = element.previousElementSibling;
                element.classList.remove("primer-img");
                previous.classList.add("primer-img")

                let previousInd = indicator.previousElementSibling;
                indicator.classList.remove("indicador-active");
                previousInd.classList.add("indicador-active")

                break
            }
            else{
                let previous = contImg[contImg.length - 1];
                element.classList.remove("primer-img");
                previous.classList.add("primer-img");

                let previousInd = contIndicators[contIndicators.length - 1];
                indicator.classList.remove("indicador-active");
                previousInd.classList.add("indicador-active")

                break
            }
        }
    }

})

for (let i = 0; i < contIndicators.length; i++) {
    const element = contIndicators[i];
    
    element.addEventListener("click", (e) => {
        e.preventDefault();

        
        for (let j = 0; j < contImg.length; j++) {
            const element = contImg[j];
            if (element.classList[0] == "primer-img") {
                element.classList.remove("primer-img");
                contIndicators[j].classList.remove("indicador-active");
                break
            }
            
        }
        
        contIndicators[i].classList.add("indicador-active");
        contImg[i].classList.add("primer-img")
        
    })

}


// código destinado a resolver el problema de la sección de testimonios



addEventListener("DOMContentLoaded", (e) => {

    let feedback = document.getElementById("feedback").children[1];

    fetch("../json/feedback.json").then(data => data.json())
    .then(data => {

        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            
            feedback.innerHTML += `
                <div class="feedback-card"> 
                    <div>
                        <div>
                            <img src="${element.imgRoute}" alt="${element.imgAlt}">
                        </div>
                    </div>
                    <div>
                        <h4>${element.name}</h4>
                        <p>${element.prom}</p>
                        <p>${element.info}</p>
                    </div>
                </div>`
        }

    })
})