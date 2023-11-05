console.log("hola mundo!")

let perros = ["Caniche", "Labrador", "Collie", "Akita"] // se crea una lista de elementos
console.log(perros)

document.addEventListener("DOMContentLoaded", function () {
    contenedor = document.getElementById("personajes_id");
    fetch('http://localhost:8080/characters')
        .then(response => response.json())  // convertir a json
        .then(json => json.forEach(displayCharacters))    //imprimir los datos en la consola
        .catch(err => console.log(err, err)); // Capturar errores


    function displayCharacters(character) {
        console.log(character);
        const card =
            `<div class="personaje">
            <p class="personaje_title">
            ${character.displayName}
            </p>
            <div class="contenedor-imagenes">
                <img src="${character.baseCharacter.imgUrl}" class="personaje_img">
                <img src="${character.upperClothing.imgUrl}" class="personaje_img">
                <img src="${character.bottomClothing.imgUrl}" class="personaje_img">
                <img src="${character.shoes.imgUrl}" class="personaje_img">
            </div>
        </div>`
        document.getElementById("personajes_id").insertAdjacentHTML('beforeend', card);
    }
})

function showLogin() {
    console.log("Holaaaa")
    var popup = document.getElementById("popupLogin");

    popup.classList.toggle("show");
}

