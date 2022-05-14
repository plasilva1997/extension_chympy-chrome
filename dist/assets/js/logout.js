document.getElementById("logout").addEventListener("click", logout); //Ajoute la fonction au boutton logout
function logout(){//supprime toute les infos pour la deconnexion
    chrome.storage.local.clear(function() {
        window.location.replace("./index.html"); //redirection vers la page d'accueil
    });
}

function expires_at(token_at){
    let currentTime = new Date().getTime();
    let time = token_at;
    let difference = (currentTime - time) / 1000;

    if (difference >= 3580) {
        logout();//on se deconnect quand le token est expiré environ 1 heure
    }
}

chrome.storage.local.get(["token_at"], function(items) {
    expires_at(items["token_at"]);
});