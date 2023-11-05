
const userId = localStorage.getItem('userId');
const token = localStorage.getItem('token');
console.log(token)
let upperClothing;
let bottomClothing;
let baseCharacters;
let shoes;
let allClothing;

var selectedBase;
let selectedUpper;
let selectedBottom;
let selectedShoes;

document.addEventListener("DOMContentLoaded", async function () {
    contenedor = document.getElementById("personajes_id");



    await fetch(`http://localhost:8080/clothing/BASE_CHARACTER`)
        .then(response => response.json())
        .then(result => {
            baseCharacters = result
            loadDefaultCharacter(result[0], "character-base")
            result.forEach(loadIcon)
        })
        .catch(err => console.log(err))


    await fetch(`http://localhost:8080/clothing/UPPER`)
        .then(response => response.json())
        .then(result => {
            upperClothing = result
            loadDefaultCharacter(result[0], "character-upper")
            result.forEach(loadClothing,)
        })
        .catch(err => console.log(err))
    await fetch(`http://localhost:8080/clothing/BOTTOM`)
        .then(response => response.json())
        .then(result => {
            bottomClothing = result
            loadDefaultCharacter(result[0], "character-bottom")
            result.forEach(loadClothing,)
        })
        .catch(err => console.log(err))
    await fetch(`http://localhost:8080/clothing/SHOES`)
        .then(response => response.json())
        .then(result => {
            shoes = result
            loadDefaultCharacter(result[0], "character-shoes")
            result.forEach(loadClothing,)
        })
        .catch(err => console.log(err))

    await fetch(`http://localhost:8080/clothing`)
        .then(response => response.json())
        .then(result => {
            allClothing = result
        })
        .catch(err => console.log(err))

    function loadDefaultCharacter(item, id) {
        console.log(item);
        const card =
            `<img id="${id}" src="${item.imgUrl}" class="personaje_img">`
        document.getElementById("character-in-process").insertAdjacentHTML('beforeend', card);
    }
})


function loadClothing(clothing) {
    const option =
        `<div class="icon-select" ">
        <img class="icon-${clothing.type.toLowerCase()}" id="${clothing.id}" src="${clothing.imgUrl}" onClick="selectClothing(this.id)"/>
    </div>
    `
    document.getElementById(`${clothing.type.toLowerCase()}-clothing`).insertAdjacentHTML("afterBegin", option)
}

function loadIcon(baseCharacter) {
    const icon =
        `<div class="icon-select">
        <image class="icon" id="${baseCharacter.id}" src="${baseCharacter.iconUrl}" onClick="setBaseCharacter(this.id)"/>
        <p>${baseCharacter.displayName}</p>
        </div>`
    document.getElementById("icons").insertAdjacentHTML("afterbegin", icon)
}

function setBaseCharacter(itemId) {
    selectedBase = baseCharacters.find((character) => itemId === character.id)
    console.log(selectedBase)

    document.getElementById("character-base").src = selectedBase.imgUrl

}

function selectClothing(clothingId) {
    let selected = allClothing.find(clothing => clothing.id == clothingId)
    console.log(selected)
    switch (selected.type) {
        case "UPPER": {
            selectedUpper = selected;
            document.getElementById("character-upper").src = selectedUpper.imgUrl;
            break;
        }
        case "BOTTOM": {
            selectedBottom = selected;
            document.getElementById("character-bottom").src = selectedBottom.imgUrl;
            break;
        }
        case "SHOES": {
            selectedShoes = selected;
            document.getElementById("character-shoes").src = selectedShoes.imgUrl;
            break;
        }
        default:
    }
}

async function saveCharacter() {
    let characterName = document.getElementById("inputCharacterName").value;
    console.log({
        userId: userId,
        displayName: characterName,
        baseCharacter: selectedBase,
        upperClothing: selectedUpper,
        bottomClothing: selectedBottom,
        shoes: selectedShoes
    })
    if (characterName != "") {
        //let headers = { "'Authorization': 'Bearer "+token & "'" }

        await fetch('http://localhost:8080/characters', {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': "application/json, text/plain, */*",
                "Content-Type": "application/json",
            }
            ,
            body: JSON.stringify({
                userId: userId,
                displayName: characterName,
                baseCharacter: selectedBase,
                upperClothing: selectedUpper,
                bottomClothing: selectedBottom,
                shoes: selectedShoes
            })
        }).then(response => {
            console.log(response.body)
            response.json().then(result => {

                console.log("result: " & result)
                if (response.status == 409) {
                    alert("Error al intentar crear")
                } else {
                    //localStorage.setItem('userId', result.data.userId)
                    window.location.href = "menu.html"
                    return true
                }
            })
        }).catch((err) => console.log("Error ", err))
    } else {
        alert("El nombre del personaje no puede quedar vacío.")
    }
}
