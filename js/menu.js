const userId = sessionStorage.getItem('userId');
const token = sessionStorage.getItem('token');

let limit = 5
let offset = 0
let cantPersonajes


document.addEventListener("DOMContentLoaded", function () {
    contenedor = document.getElementById("personajes_id");

    if (!userId) {
        window.location.href = "index.html"

    }
    fetch(`http://localhost:8080/users/${userId}`)
        .then(response => response.json())
        .then(result => {
            welcomeUser(result)
        })
        .catch(err => console.log(err))

    getCharacters()


})
function welcomeUser(user) {
    const texto = `<h2>¡Bienvenid@ ${user.nickname}!</h2>`
    document.getElementById("Subheader").insertAdjacentHTML("afterBegin", texto);

}

function crearPersonaje() {
    window.location.href = "crear-personaje.html"
}

const previusPage = async () => {
    document.getElementById("paginator-btn-next").style.visibility = "visible";
    offset -= limit
    await getCharacters()
    if (offset <= 0) {
        document.getElementById("paginator-btn-previus").style.visibility = "hidden";

    }
}

async function nextPage() {
    document.getElementById("paginator-btn-previus").style.visibility = "visible";
    document.getElementById("paginator-btn-next").style.visibility = "visible";
    offset += limit
    await getCharacters()
    if (cantPersonajes < 5) {
        document.getElementById("paginator-btn-next").style.visibility = "hidden";
    }
}

async function getCharacters() {
    document.getElementById("personajes_id").innerHTML = ''
    fetch(`http://localhost:8080/users/${userId}/characters?limit=${limit}&offset=${offset}`)
        .then(response => response.json())
        .then(json => {
            json.forEach(displayCharacters)
            cantPersonajes = json.length
        })
        .catch(err => console.log(err, err));

}
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
function showHeaderGif() {
    document.getElementById("header-logo-index").src = "imgs/assets/animated-logo.GIF"
}

function removeHeaderGif() {
    document.getElementById("header-logo-index").src = "imgs/assets/logo.JPG"
}

function closeSession() {
    sessionStorage.clear()
    window.location.href = "index.html"
}
