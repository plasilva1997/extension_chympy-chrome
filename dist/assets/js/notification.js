/*Notification*/

function notification(onCheck){

    chrome.storage.local.get(["token","company"], function(items) { // on récupere le token et les partenaires du local storage

            token = items.token;

            if (token !== null && token !== undefined && items.company !== null && items.company !== undefined) { //si le token et les partenaires sont null

                let countCurrentCompany = JSON.parse(items["company"]).length;

                fetch("https://nfactory.hausplus.fr/api-chympy/", { //requete avec les données
                    method: "GET",
                }).then(function (response) { //recuperation du json
                    return response.json();
                }).then(function (data) {
                        // si la taille du tableau des partenaires dans localStorage est inferieur au tableau de l'api
                    if (countCurrentCompany !== data.length && data.length - countCurrentCompany > 0) {
                        chrome.browserAction.setBadgeText({
                            text: (data.length - countCurrentCompany).toString() // afficher le nombre des nouveaux partenaires
                        });
                    }

                    if(onCheck){
                        chrome.browserAction.setBadgeText({
                            text: ""
                        });
                    }
                    chrome.storage.local.set({company: JSON.stringify(data)}, function() {});

                }).catch((error) => {
                });
            } else {
                chrome.browserAction.setBadgeText({
                    text: ""
                });
            }
        });

    setTimeout(notification,3600000); //on relance la requete toutes les heures

}

notification(false);