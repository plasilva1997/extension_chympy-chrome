/*POUR L'HTML DE L'EXETENSION */

const token=localStorage.getItem("token") ;
const urlAPI="https://chympy.net/api/";

if(token!==null){
    window.location.replace("./dashboard.html")
}

document.getElementById("submit").addEventListener("click", login); //Ajoute la fonction au boutton submit

let form = document.querySelector("#form-login"); //Recupere le formulaire
let loading = document.querySelector("#loading"); //Recupere le loader
let errorMessageDiv=document.querySelector("#error-message");// recuper la div des erreurs


function login() {
    var login = document.getElementById("email").value; //recuperation de l'email
    var password = document.getElementById("password").value; //recuperation du mot de passe

    fetch(urlAPI+"particuliers/login", { //requete avec les données
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

        if(data['success'] !== false) {
            localStorage.setItem("token", data['token']); //stockage du token
            form.style.display = "none"; //Cache le login si on est connecté
            getCompany();
        }else{
            errorMessageDiv.innerHTML="Une erreur s'est produites veuillez rééssayer";
            loading.style.display="none"; //cache le loader
        }
    }).catch((error)=>{
        errorMessageDiv.innerHTML="Une erreur s'est produites veuillez rééssayer";
        loading.style.display="none"; //cache le loader
    });

    loading.style.display="flex"; //Affiche le loader
}


function getCompany(){

    fetch(urlAPI+"offres/find", { //requete avec les données
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Autorization": "Bearer "+token
        },
    }).then(function (response) {
        return response.json(); //recuperation du json
    }).then(function (data) {
        localStorage.setItem("company",JSON.stringify(data))
        window.location.replace("./dashboard.html");// redirection vers le dashboard
    }).catch((error)=>{
        errorMessageDiv.innerHTML="Une erreur s'est produites veuillez rééssayer";
        loading.style.display="none"; //cache le loader
    });
}





