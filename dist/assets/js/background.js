/*POUR DOM DE LA PAGE*/

chrome.storage.local.set({urlChrome: window.location.toString()}, function() {});//on stock l'url actuel

function setBanner(company,url){

    for (let k = 0; k < company.length; k++) {

        if (company[k] !== null && company[k] !== undefined) {


            let companyWebsite = company[k]['id_company']['socials']['website'];
            let conditionCashBack = company[k]['conditions']['min_value'];
            let conditionMinCashBack = company[k]['min_cashback'];
            let cashback = company[k]['cashback'];
            let unitCashback = company[k]['unit'];
            let freeCondition = 'pour tout achat éffectué';
            let freeConditonMinCashBack = '';

            if (companyWebsite !== null && companyWebsite !== "") {

                // use `url` here inside the callback because it's asynchronous!
                if (url.includes(companyWebsite.replace(/\s/g, ''))) {

                    let div = document.createElement("div"); //création d'une div
                    document.body.insertBefore(div, document.body.firstChild); //insertion de la div dans le body

                    if (conditionCashBack !== 0 && conditionCashBack !== null && conditionCashBack !== undefined) {
                        freeCondition = "pour chaque achat supérieur ou égale à " + conditionCashBack + " euros";
                    }

                    if (conditionMinCashBack !== 0 && conditionMinCashBack !== null && conditionMinCashBack !== undefined) {
                        freeConditonMinCashBack = "Cagnotte versée dès " + conditionMinCashBack + "€ cumulés !"
                    }

                    div.id = 'extention_chympy_patern'; //ajout d'un id à la div
                    div.innerHTML = '<div style="z-index: 9999999999999; position: relative;width: 100%; border-bottom: #FD9F57 2px solid; height: auto; min-height: 5vh; color: white; background-color: #fafafa; display: flex; justify-content: space-around; align-content: center; align-items: center">' +
                        '<div style="background-repeat: no-repeat; background-size: contain; background-position: center;background-image: url(https://i.imgur.com/E2qN8Da.png); width: 150px; height: 100px"></div>' +
                        '<p style="color: #4b4b4b; font-size: 22px; font-weight: 700; margin: 0; width: 70%;line-height: 1.5em">Ce site est partenaire de Chympy, ' + freeCondition + ' vous recuperez ' + cashback + ' ' + unitCashback + ' en CashBack. ' + freeConditonMinCashBack + ' (cliquer <a style="font-weight: 900; text-decoration: none; color: #FD9F57" href="https://www.chympy.net/cgu" target="_blank">ici</a> pour voir les conditions d\'utilisation)</p>' +
                        '</div>'; //ajout d'un contenu à la div*
                    break;
                }
            }
        }
    }
}

chrome.storage.local.get(["company","urlChrome"], function(items) {
    setBanner(JSON.parse(items['company']),items['urlChrome']);
});






