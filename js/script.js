(function(){
    var lista = document.getElementById("lista"),
    txInput = document.getElementById("txInput"),
    btnNuevaTarea = document.getElementById("btn-agregar"),
    btnJugar = document.getElementById("btn-jugar"),
    resultado = document.getElementById("sec-imagen-juego");
    
    function agregarTarea(){
        var tarea = txInput.value,
        nuevo = document.createElement("li");
        if(tarea === ""){
            txInput.className = "error";
            return false;
        }
        var textTarea = document.createTextNode(tarea);
        nuevo.appendChild(textTarea);
        nuevo.addEventListener("click", eliminarTarea);
        lista.appendChild(nuevo);
        txInput.value = "";
    }
    
    function comprobarInput(){
        txInput.className = "";
    }
    
    function eliminarTarea(){
        this.parentNode.removeChild(this);
    }

    function compararResultados(){
        let arrAnimales=[],
        arrNoAnimales=[],
        animales= ["CABALLO", "CABRA", "CERDO", "CONEJO", "GALLINA", "GALLO", "OVEJA", "PATO", "VACA"]
        btnNuevaTarea.click();
        for(child of lista.children){
            let text = child.textContent.trim();
            if (animales.includes(text.toUpperCase())){
                arrAnimales.push(text.toUpperCase());
            }else if(text != "¡Si envías algo mal, hazle click para eliminarlo!"){
                arrNoAnimales.push(text);
            }
        }
        mostrarResultados(arrAnimales, arrNoAnimales, animales);
    }

    function mostrarResultados(correctos, erroneos, animales){
        let mostrarImg = "",
        mostrarTxt = "",
        ganar = "Resultados:";
        animales.forEach(animal => {
            if (correctos.includes(animal)){
                mostrarImg += `<img src="../img/${animal}.png" class="correcto" alt="${animal}">`;
            }else{
                mostrarImg += `<img src="../img/${animal}.png" class="incorrecto" alt="${animal}">`;
            }
        })
        erroneos.forEach(erroneo => {
            mostrarTxt += `<p class="noEnLista">${erroneo}</p>`;
        })
        resultado.id = "galeriaJuego";
        if(correctos.length == 9){
            ganar = "¡GANASTE!";
        }
        resultado.innerHTML = `<section><h2>${ganar}</h2><article><figure id="figure-imagenes">${mostrarImg}</figure></article></section>`;
        if(mostrarTxt != ""){
            resultado.innerHTML += `<section><h2>Incorrectos:</h2><article>${mostrarTxt}</article></section>`;
        }
        reinicioJuego();
    }
    
    function reinicioJuego(){
        let secFormJuego = document.getElementById("sec-form-juego"),
        article = document.createElement("article"),
        input = document.createElement("input");

        article.className = "pp formulario";

        input.className = "boton";
        input.type = "button";
        input.id = "btn-reiniciar-juego";
        input.value = "Volver a jugar";
        input.addEventListener("click", () => {location.reload()})
        article.appendChild(input);
        secFormJuego.innerHTML = "";
        secFormJuego.className = "";
        secFormJuego.appendChild(article);
    }
    btnJugar.addEventListener("click", compararResultados);
    
    lista.children[0].addEventListener("click", eliminarTarea);
    btnNuevaTarea.addEventListener("click", agregarTarea);
    txInput.addEventListener("click", comprobarInput);
    txInput.addEventListener("keypress", (e) => { if (e.key === "Enter"){
            e.preventDefault();
            btnNuevaTarea.click();
        } 
    })
}());