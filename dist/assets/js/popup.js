/*POUR L'HTML DE L'EXETENSION */

/**initiation des valeurs**/
let form = "";
let loading = "";
let errorMessageDiv = "";

init_extension();

chrome.storage.local.get(["token"], function (items) {
    let token = items.token;
    if (token !== null && token !== undefined) {
        window.location.replace("./dashboard.html"); //redirige vers le dashboard si le token de connexion est toujours actif
    }
});

function init_extension() {//recupere les infos de base pour l'extension
    let subimtAction = document.getElementById("submit");
    subimtAction.addEventListener("click", login); //Ajoute la fonction au boutton submit

    form = document.querySelector("#form-login"); //Recupere le formulaire
    loading = document.querySelector("#loading"); //Recupere le loader
    errorMessageDiv = document.querySelector("#error-message");// recuper la div des erreurs
}


function login() {
    var login = document.getElementById("email").value; //recuperation de l'email
    var password = document.getElementById("password").value; //recuperation du mot de passe
    let bodyValue = {email: login, password: password}; //creation du body

    let callLogin = fetchApi("particuliers/login", 'POST', '', bodyValue);//requete avec les données
    callLogin.then((data) => {
        console.log(data);
        if (data['success'] !== false) {
            form.style.display = "none"; //Cache le login si on est connecté
            chrome.storage.local.set({token: data['token']}, function () {
            });
            let d = new Date().getTime();
            chrome.storage.local.set({token_at: d.toString()}, function () {
            });
            getCompany();
            getCategory();

        } else {
            errorMessageDiv.innerHTML = "Une erreur s'est produites veuillez rééssayer";
            loading.style.display = "none"; //cache le loader
        }
    });
    loading.style.display = "flex"; //Affiche le loader
}





function getCompany() {

    chrome.storage.local.get(["token"], function (items) {

        token = items.token;

        if (token !== null && token !== undefined) {

            let fetchCompany = fetchApi("offres/find", 'GET', token, '');

            fetchCompany.then((data) => {
                if (data !== null && data !== undefined) {
                    chrome.storage.local.set({company: JSON.stringify(data)}, function () {
                    });
                    window.location.replace("./dashboard.html");
                } else {
                    errorMessageDiv.innerHTML = "Une erreur s'est produites veuillez rééssayer";
                    loading.style.display = "none"; //cache le loader
                }
            });
        }
    });
}
function getCategory() {
    chrome.storage.local.get(["token"], function (items) {
        token = items.token;

        let fetchCategorty = fetchApi("categorie/find", 'GET', token, '');

        console.log(fetchCategorty)
        fetchCategorty.then((data) => {
            if (data !== null && data !== undefined){
                chrome.storage.local.set({category : JSON.stringify(data)}, function (){});

            } else {
                console.log("Une erreur s'est produite lors de la recupération des catégories");
            }
        })
    });
}



set_chrome_url();

