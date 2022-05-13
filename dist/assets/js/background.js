/*POUR DOM DE LA PAGE*/

chrome.storage.local.get(["company","token"], function(items) {

    const url = window.location.toString(); //url de la page
    let company=JSON.parse(items['company']);
    console.log(company);
    console.log(items);

    for(let k =0 ; k < company.length; k++){

        if(company[k] !== null && company[k] !== undefined) {

            let companyWebsite = company[k]['id_company']['socials']['website'];
            let conditionCashBack = company[k]['conditions']['min_value'];
            let cashback=company[k]['cashback'];
            let unitCashback=company[k]['unit'];

            if(companyWebsite !== null && companyWebsite !== "") {
                // use `url` here inside the callback because it's asynchronous!
                if (url.includes(companyWebsite.replace(/\s/g, ''))) {
                    let div = document.createElement("div"); //création d'une div
                    document.body.insertBefore(div, document.body.firstChild); //insertion de la div dans le body

                    div.id = 'content'; //ajout d'un id à la div
                    div.innerHTML = '<div style="width: 100%; border-bottom: #FD9F57 2px solid; height: auto; min-height: 5vh; color: white; background-color: #fafafa; display: flex; justify-content: space-around; align-content: center; align-items: center">' +
                        '<div style="background-repeat: no-repeat; background-size: contain; background-position: center;background-image: url(https://i.imgur.com/E2qN8Da.png); width: 150px; height: 100px"></div>' +
                        '<p style="color: #4b4b4b; font-size: 2rem; font-weight: 700; margin: 0">Ce site est partenaire de Chympy, sur chaque achat supérieur a ' + conditionCashBack + ' euros vous recuperez ' + cashback + ' ' + unitCashback + ' en CashBack (cliquer <a style="font-weight: 900; text-decoration: none; color: #FD9F57" href="" target="_blank">ici</a> pour voir les conditions d\'achat)</p>' +
                        '</div>'; //ajout d'un contenu à la div*
                }
            }
        }
    }

});




