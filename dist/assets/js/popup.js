/*POUR L'HTML DE L'EXETENSION */

/**initiation des valeurs**/
const urlAPI="https://chympy.net/api/";
let form = "";
let loading = "";
let errorMessageDiv="";

init_extension();

chrome.storage.local.get(["token"], function(items) {
    let token=items.token;
    if(token!==null && token!== undefined) {
        window.location.replace("./dashboard.html"); //redirige vers le dashboard si le token de connexion est toujours actif
    }
});


function init_extension(){//recupere les infos de base pour l'extension
    let subimtAction=document.getElementById("submit");
    subimtAction.addEventListener("click", login); //Ajoute la fonction au boutton submit

    form = document.querySelector("#form-login"); //Recupere le formulaire
    loading = document.querySelector("#loading"); //Recupere le loader
    errorMessageDiv=document.querySelector("#error-message");// recuper la div des erreurs
}


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
            chrome.storage.local.set({token: data['token']}, function() {});
            let d= new Date().getTime();
            chrome.storage.local.set({token_at: d.toString()}, function() {});
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

    chrome.storage.local.get(["token"], function(items) {

        token=items.token;

        if(token!==null && token!== undefined) {
            fetch(urlAPI+"offres/find", { //requete avec les données
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Autorization": "Bearer "+token
                },
            }).then(function (response) {
                return response.json(); //recuperation du json
            }).then(function (data) {
                chrome.storage.local.set({company: JSON.stringify(data)}, function() {});
                window.location.replace("./dashboard.html");// redirection vers le dashboard
            }).catch((error)=>{
                errorMessageDiv.innerHTML="Une erreur s'est produites veuillez rééssayer";
                loading.style.display="none"; //cache le loader
            });
        }
    });
}

set_chrome_url();

function set_chrome_url(){
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        if(tabs[0]!==null){
            chrome.storage.local.set({urlChrome: tabs[0].url}, function() {});//on stock l'url actuel
        }else{
            set_chrome_url();
        }
    });
}

