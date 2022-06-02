/*Ce fichier permet la deconnexion de l'utilisateur */

init_logout(); //lance la fonction init_logout

function init_logout(){
    let submitLogout=document.getElementById("logout"); //recupere le boutton submit
    submitLogout.addEventListener("click", logout); //Ajoute la fonction au boutton logout
    check_expires_at(); //lance la verification de l'expiration du token
}

function logout(){//supprime toute les infos pour la deconnexion
    chrome.storage.local.clear(function() { //supprime toute les infos
        chrome.browserAction.setIcon({path: '/dist/assets/img/off.png'});
        window.location.replace("./index.html"); //redirection vers la page d'accueil
    });
}

function expires_at(token_at){
    let currentTime = new Date().getTime(); //recupere le timestamp actuel
    let time = token_at; //recupere le timestamp de l'expiration
    let difference = (currentTime - time) / 1000; //calcul la difference entre le timestamp actuel et le timestamp de l'expiration

    if (difference >= 86390) { //si la difference est superieur a 86390 secondes
        logout();//on se deconnect quand le token est expiré environ 24 heure
    }
}


function check_expires_at() {//recupere le timestamp d'expiratrion et effectue une verification avec la fonction expires_at
    chrome.storage.local.get(["token_at"], function (items) { //recupere le timestamp d'expiration
        expires_at(items["token_at"]); //lance la verification
    });
}