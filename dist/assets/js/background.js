/*POUR DOM DE LA PAGE*/

chrome.storage.local.get(["company","token"], function(items) {

    const url = window.location.toString(); //url de la page
    console.log(items);
    let company=JSON.parse(items['company']);
    console.log(company);

    for(let k =0 ; k < company.length; k++){

        if(company[k] !== null && company[k] !== undefined) {

            let companyWebsite = company[k]['id_company']['socials']['website'];
            let conditionCashBack = company[k]['conditions']['min_value'];
            let cashback=company[k]['cashback'];
            let unitCashback=company[k]['unit'];
            let freeCondition = '';



            // use `url` here inside the callback because it's asynchronous!
            if (url.includes(companyWebsite.replace(/\s/g, ''))) {
                let div = document.createElement("div"); //création d'une div
                document.body.insertBefore(div, document.body.firstChild); //insertion de la div dans le body

                if (conditionCashBack !== 0  && conditionCashBack !== null && conditionCashBack !== undefined) {
                    freeCondition = "pour chaque achat supérieur ou égale à "+ conditionCashBack +" euros";

                }else {
                    freeCondition = "pour tout achat éffectué";
                }


                div.id = 'extention_chympy_patern'; //ajout d'un id à la div
                div.innerHTML = '<div style="width: 100%; border-bottom: #FD9F57 2px solid; height: auto; min-height: 5vh; color: white; background-color: #fafafa; display: flex; justify-content: space-around; align-content: center; align-items: center">' +
                    '<div style="background-repeat: no-repeat; background-size: contain; background-position: center;background-image: url(https://i.imgur.com/E2qN8Da.png); width: 150px; height: 100px"></div>' +
                    '<p style="color: #4b4b4b; font-size: 22px; font-weight: 700; margin: 0; width: 70%;line-height: 1.5em">Ce site est partenaire de Chympy, '+ freeCondition +' vous recuperez '+ cashback +' '+ unitCashback +' en CashBack (cliquer <a style="font-weight: 900; text-decoration: none; color: #FD9F57" href="https://www.chympy.net/cgu" target="_blank">ici</a> pour voir les conditions d\'utilization)</p>' +
                    '</div>'; //ajout d'un contenu à la div*
            }
        }
    }

});




