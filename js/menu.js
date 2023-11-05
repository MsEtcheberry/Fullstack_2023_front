console.log("hola mundo!")

const userId = localStorage.getItem('userId');
const token = localStorage.getItem('token');

console.log(userId)

document.addEventListener("DOMContentLoaded", function () {
    contenedor = document.getElementById("personajes_id");
    fetch(`http://localhost:8080/users/${userId}`)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            darBienvenida(result)
        })
        .catch(err => console.log(err))


    fetch(`http://localhost:8080/users/${userId}/characters`)
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
function darBienvenida(user) {
    console.log(user)
    const texto = `<h2>¡Bienvenid@ ${user.nickname}!</h2>`
    document.getElementById("Subheader").insertAdjacentHTML("afterBegin", texto);

}

function crearPersonaje() {
    window.location.href = "crear-personaje.html"
}

