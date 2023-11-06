console.log("hola mundo!")

const userId = sessionStorage.getItem('userId');
const token = sessionStorage.getItem('token');
console.log(userId)

let limit = 5
let offset = 0


document.addEventListener("DOMContentLoaded", function () {
    contenedor = document.getElementById("personajes_id");
    fetch(`http://localhost:8080/users/${userId}`)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            darBienvenida(result)
        })
        .catch(err => console.log(err))

    getCharacters()


})
function darBienvenida(user) {
    console.log(user)
    const texto = `<h2>¡Bienvenid@ ${user.nickname}!</h2>`
    document.getElementById("Subheader").insertAdjacentHTML("afterBegin", texto);

}

function crearPersonaje() {
    window.location.href = "crear-personaje.html"
}

const previusPage = async () => {
    offset -= limit
    getCharacters()
}

const nextPage = async () => {

    offset += limit
    console.log(offset)
    getCharacters()
}

async function getCharacters() {
    document.getElementById("personajes_id").innerHTML = ''
    fetch(`http://localhost:8080/users/${userId}/characters?limit=${limit}&offset=${offset}`)
        .then(response => response.json())
        .then(json => json.forEach(displayCharacters))
        .catch(err => console.log(err, err));

}
function displayCharacters(character) {
    console.log(character);
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
function showHeaderGif() {
    console.log("aaa")
    document.getElementById("header-logo-index").src = "imgs/assets/animated-logo.GIF"
}

function removeHeaderGif() {
    document.getElementById("header-logo-index").src = "imgs/assets/logo.JPG"
}
