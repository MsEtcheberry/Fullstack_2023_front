
let userId = sessionStorage.getItem('userId')

document.addEventListener("DOMContentLoaded", function () {

    if (userId) {
        document.getElementById("header-btn-login").innerHTML = "Mi cuenta"
    }

    contenedor = document.getElementById("personajes_id");
    fetch('http://localhost:8080/characters')
        .then(response => response.json())  // convertir a json
        .then(json => json.forEach(displayCharacters))    //imprimir los datos en la consola
        .catch(err => console.log(err, err)); // Capturar errores


    function displayCharacters(character) {
        const card =
            `<div class="personaje">
            <p class="personaje_title">
            ${character.displayName}
            </p>
            <div class="contenedor-imagenes">
                <img src="${character.baseCharacter.imgUrl}" class="personaje_img" onerror="this.style.display='none'">
                <img src="${character.upperClothing.imgUrl}" class="personaje_img" onerror="this.style.display='none'">
                <img src="${character.bottomClothing.imgUrl}" class="personaje_img" onerror="this.style.display='none'">
                <img src="${character.shoes.imgUrl}" class="personaje_img" onerror="this.style.display='none'">
            </div>
        </div>`
        document.getElementById("personajes_id").insertAdjacentHTML('beforeend', card);
    }
})

function showLogin() {
    if (!userId) {
        var popup = document.getElementById("popupLogin");
        popup.classList.toggle("show");
    } else {
        window.location.href = "menu.html"
    }

}

function showHeaderGif() {
    document.getElementById("header-logo-index").src = "imgs/assets/animated-logo.GIF"
}

function removeHeaderGif() {
    document.getElementById("header-logo-index").src = "imgs/assets/logo.JPG"
}

