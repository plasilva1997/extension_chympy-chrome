/*POUR L'HTML DE L'EXETENSION */

document.getElementById("submit").addEventListener("click", login); //Ajoute la fonction au boutton submit

function login() {
    var login = document.getElementById("email").value; //recuperation de l'email
    var password = document.getElementById("password").value; //recuperation du mot de passe

    fetch("https://chympy.net/api/particuliers/login", { //requete avec les données
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: login,
            password: password
        })
    }).then(function (response) {
        return response.json(); //recuperation du json
    }).then(function (data) {
        localStorage.setItem("token", data.token); //stockage du token
    });
}
