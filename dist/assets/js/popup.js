/*POUR L'HTML DE L'EXETENSION */

document.getElementById("submit").addEventListener("click", login);

function login() {
    var login = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    fetch("https://chympy.net/api/particuliers/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: login,
            password: password
        })
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        localStorage.setItem("token", data.token);
    });
}
