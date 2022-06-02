/*Notification*/

function notification(){

    console.log("notif");
    chrome.storage.local.get(["token","company"], function(items) {

        if (items.company !== null && items.company !== undefined) {
            let countCurrentCompany = JSON.parse(items["company"]).length;

            token = items.token;


            if (token !== null && token !== undefined) {

                chrome.browserAction.setIcon({path: 'assets/img/on.png'})


                fetch("https://api-chympy.plasilva.com/", { //requete avec les données
                    method: "GET",
                    /* headers: {
                         "Content-Type": "application/json",
                         "Autorization": "Bearer "+token
                     },*/
                }).then(function (response) { //recuperation du json
                    return response.json();

                }).then(function (data) {

                    console.log(countCurrentCompany)
                    console.log(data.length)

                    if (countCurrentCompany !== data.length) {
                        chrome.browserAction.setBadgeText({
                            text: (data.length - countCurrentCompany).toString()
                        });
                        //chrome.storage.local.set({company: JSON.stringify(data)}, function() {});
                    } else {
                        chrome.browserAction.setBadgeText({
                            text: ""
                        });

                    }
                }).catch((error) => { //si il y a une erreur on redirige vers la page d'accueil
                    console.log(error)
                });
            } else {
                chrome.browserAction.setIcon({path: 'assets/img/off.png'});
                chrome.browserAction.setBadgeText({
                    text: ""
                });
            }
        } else {
            chrome.browserAction.setIcon({path: 'assets/img/off.png'});
            chrome.browserAction.setBadgeText({
                text: ""
            });
        }
    });

}

notification();

