/*Notification*/


function notification(){

    console.log("notif");
    chrome.storage.local.get(["token","company"], function(items) {

        let countCurrentCompany=JSON.parse(items["company"]).length;

        token=items.token;

        if(token!==null && token!== undefined) {

            chrome.browserAction.setIcon({
                path: "../img/on.png"
            }, function() {
                // window.close();
            });

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

                if(countCurrentCompany !== data.length){
                    chrome.browserAction.setBadgeText({
                           text: (data.length-countCurrentCompany).toString()
                       });
                    //chrome.storage.local.set({company: JSON.stringify(data)}, function() {});
                }
            }).catch((error)=>{ //si il y a une erreur on redirige vers la page d'accueil
                console.log(error)
            });
        }
    });

}

notification();
