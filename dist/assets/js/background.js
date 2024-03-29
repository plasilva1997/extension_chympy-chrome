/*POUR LE DOM DE LA PAGE*/

const urlAPI="https://chympy.net/api/";

function get_chrome_value() {

    let currentURL = window.location.href; //recupere l'url de la page

    chrome.storage.local.get(["company", "urlChrome","token"], function (items) { //recupere les données stockées dans le local storage
        if(items['token'] !== undefined) {

            chrome.runtime.sendMessage({
                action: 'updateIcon',
                value: false
            });

            chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
                if (msg.action === "updateIcon") {
                        chrome.browserAction.setIcon({path: '/dist/assets/img/on.png'});
                } // Si l'utilisateur est log l'icon de l'extention change
            });

            if (items['urlChrome'] !== null && items['urlChrome'] !== undefined && currentURL === items['urlChrome']) { //verifie si l'url de la page est la meme que celle stockée dans le local storage
                setBanner(JSON.parse(items['company']), items['urlChrome']); //appel de la fonction setBanner
            } else {
                chrome.storage.local.set({urlChrome: currentURL}, function () {});//on stock l'url actuel
                get_chrome_value();//fonction recurssive tant qu'on a pas l'url
            }
        }else{
            return;
        }
    });
}

get_chrome_value();

function setBanner(company,url){

    for (let k = 0; k < company.length; k++) { //parcours le tableau de la company

        if (company[k] !== null && company[k] !== undefined) { //verifie si la company n'est pas null ou undefined

            let companyWebsite = company[k]['id_company']['socials']['website']; //recupere le site web de la company
            let conditionCashBack = company[k]['conditions']['min_value']; //recupere la condition de cashback
            let conditionMinCashBack = company[k]['min_cashback'];
            let cashback = company[k]['cashback'];
            let unitCashback = company[k]['unit'];
            let freeCondition = 'pour tout achat éffectué';
            let freeConditonMinCashBack = '';

            if (companyWebsite !== null && companyWebsite !== "") {

                if (url.includes(companyWebsite.replace(/\s/g, '')) && !url.includes("google.com")) { //verifie si l'url de la page contient le site web de la company

                    let div = document.createElement("div"); //création d'une div
                    document.body.insertBefore(div, document.body.firstChild); //insertion de la div dans le body

                    if (conditionCashBack !== 0 && conditionCashBack !== null && conditionCashBack !== undefined) {
                        freeCondition = "pour chaque achat supérieur ou égale à " + conditionCashBack + " euros";
                    }

                    if (conditionMinCashBack !== 0 && conditionMinCashBack !== null && conditionMinCashBack !== undefined) {
                        freeConditonMinCashBack = "Cagnotte versée dès " + conditionMinCashBack + "€ cumulés !"
                    }

                    div.id = 'extention_chympy_patern'; //ajout d'un id à la div
                    div.innerHTML = '<style>.colorImportant{color: #FD9F57 !important;}' +
                        '</style><div style="z-index: 9999999999999; position: relative;width: 100%; border-bottom: #FD9F57 2px solid; height: auto; min-height: 5vh; color: white; background-color: #fafafa; display: flex; justify-content: space-around; align-content: center; align-items: center">' +
                        '<div style="background-repeat: no-repeat; background-size: contain; background-position: center;background-image: url(https://i.imgur.com/E2qN8Da.png); width: 150px; height: 100px"></div>' +
                        '<p style="color: #4b4b4b; font-size: 1.2vw; font-weight: 700; margin: 0; width: 70%;line-height: 1.5em">Ce site est partenaire de Chympy, <span class="colorImportant">' + freeCondition + '</span> vous recuperez <span class="colorImportant">' + cashback + ' ' + unitCashback + '</span> en CashBack. <span class="colorImportant">' + freeConditonMinCashBack + '</span> (cliquer <a style="font-weight: 900; text-decoration: none; color: #FD9F57" href="https://www.chympy.net/cgu" target="_blank">ici</a> pour voir les conditions d\'utilisation)</p>' + //ajout d'un contenu à la div*
                        ' <div id="close" style="cursor: pointer;color: black; position: absolute; right: 25px; top: 25px; z-index: 999999999999; font-size: 3rem">x</div></div>'; //ajout du contenu de la div

                    document.getElementById('close').addEventListener('click', function () { //ajout d'un event listener sur la div
                        document.getElementById('extention_chympy_patern').remove(); //suppression de la div
                    });
                    return;
                }
            }
        }
    }
}






