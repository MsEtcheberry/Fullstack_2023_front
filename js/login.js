
var userData
async function login() {
    console.log("HOLA")
    email = document.getElementById("inputEmail").value;
    password = document.getElementById("inputPassword").value;

    console.log(email);
    console.log(password);

    await fetch('http://localhost:8080/auth/login', {
        method: "POST",
        headers: {

            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password })
    }).then(response => {
        console.log(response.body)
        response.json().then(result => {

            console.log("result: " & result)
            if (response.status == 401) {
                alert("Datos incorrectos")
            } else {
                console.log(result.data)
                localStorage.setItem('userId', result.data.userId)
                localStorage.setItem('token', result.data.token)
                window.location.href = "menu.html"
                return true
            }
        })
    }).catch((err) => console.log("Error ", err))

}

function user() {
    console.log("1 - " & userData)
    return userData
}
