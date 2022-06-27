/*Notification*/

function notification(onCheck){

    chrome.storage.local.get(["token","company"], function(items) { // on récupere le token et les partenaires du local storage

            token = items.token;

            if (token !== null && token !== undefined && items.company !== null && items.company !== undefined) { //si le token et les partenaires sont null


                let countCurrentCompany = JSON.parse(items["company"]).length;

                fetch("https://api-chympy.plasilva.com/", { //requete avec les données
                    method: "GET",
                }).then(function (response) { //recuperation du json
                    return response.json();
                }).then(function (data) {

                    if (countCurrentCompany !== data.length && data.length-countCurrentCompany>0) {
                        chrome.browserAction.setBadgeText({
                            text: (data.length - countCurrentCompany).toString()
                        });
                    }

                    if(onCheck){
                        chrome.browserAction.setBadgeText({
                            text: ""
                        });
                    }
                    chrome.storage.local.set({company: JSON.stringify(data)}, function() {});


                }).catch((error) => { //si il y a une erreur on redirige vers la page d'accueil
                });
            } else {
                chrome.browserAction.setBadgeText({
                    text: ""
                });
            }
        });

    setTimeout(notification,10000000000); //on relance la requete toutes les heures

}

notification(false);