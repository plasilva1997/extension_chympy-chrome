/*POUR L'HTML DE L'EXETENSION */

let getToken=localStorage.getItem("token") ;

if(getToken!==null){
    window.location.replace("./dashboard.html")
}

document.getElementById("submit").addEventListener("click", login); //Ajoute la fonction au boutton submit
let form = document.querySelector("#form-login");
let loading = document.querySelector(".loading");


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

        if(data['token'] !== null) {
            localStorage.setItem("token", data['token']); //stockage du token
            form.style.display = "none"; //Cache le login si on est connecté
            window.location.replace("./dashboard.html")
        }
    });

    loading.style.display="block";
}


