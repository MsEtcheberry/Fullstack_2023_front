
var userData
async function login() {
    email = document.getElementById("inputEmail").value;
    password = document.getElementById("inputPassword").value;

    await fetch('http://localhost:8080/auth/login', {
        method: "POST",
        headers: {

            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password })
    }).then(response => {

        response.json().then(result => {

            if (response.status == 401) {
                document.getElementById("login-error-message").style.visibility = "visible"
            } else {
                document.getElementById("login-error-message").style.visibility = "hidden"
                sessionStorage.setItem('userId', result.data.userId)
                sessionStorage.setItem('token', result.data.token)
                window.location.href = "menu.html"
                return true
            }
        })
    }).catch((err) => console.log("Error ", err))

}

function navigateMain() {
    window.location.href = "index.html"

}
