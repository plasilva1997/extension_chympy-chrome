/*DASHBOARD DE LEXTENSION*/

get_chrome_value();

function setInformationCompany(company, url) {

    let currentDayName = new Date().toLocaleDateString("en-EN", {weekday: 'long'}).toLowerCase();

    let gridPattern = document.querySelector("#grid__paterns");

    let existCompany = false;

    for (let k = 0; k < company.length; k++) {  //parcours le tableau de magasins

        if (company[k] !== null && company[k] !== undefined) { //si le magasin existe

            let companyWebsite = company[k]['id_company']['socials']['website']; //recuperation du site web
            let companyCommercial_name = company[k]['id_company']['commercial_name']; //recuperation du nom du magasin

            if (companyWebsite !== null && companyWebsite !== "") { //si le site web existe

                if (url.includes(companyWebsite.replace(/\s/g, '')) && !existCompany) {


                    /*Informations générales*/
                    let infosPhoneDiv = document.querySelector("#infosPhone"); //div de l'information du partenaire
                    imgUrl = "https://chympy.net/" + company[k]['id_company']['pictures']['profile_pic'].replace("client/dist/mdb-angular-free/", "").trim(); //recuperation de l'image du partenaire
                    infosImg = "<div class='imgCommerce' style='background-image: url(" + encodeURI(imgUrl) + ")'></div>"; //affichage de l'image du partenaire
                    infosPhoneDiv.innerHTML += infosImg;
                    infosPhoneDiv.innerHTML += "<p>Téléphone : <a href='tel:" + company[k]['id_company']['phone'] + "'>" + company[k]['id_company']['phone'] + "</a></p>"; //affichage du numero de telephone du partenaire
                    infosPhoneDiv.innerHTML += "<p>Adresse : " + company[k]['id_company']['address'] + "</p>"; //affichage de l'adresse du partenaire
                    infosPhoneDiv.innerHTML += "<p>Description : " + company[k]['id_company']['presentation'] + "</p>"; //affichage de la description du partenaire


                    /*Information de l'entreprise*/
                    let infos = document.querySelector("#horaires"); //div de l'information de l'entreprise


                    if (company_open(new Date(), company[k]['id_company']['hours'][currentDayName]['open_hour'], company[k]['id_company']['hours'][currentDayName]['close_hour'])) {
                        infos.innerHTML += "<div id='name'><h2>" + companyCommercial_name + "</h2><div class='statusOpen'><div class='open'></div><p>Ouvert</p></div></div>";//Notification d'ouverture !
                    } else {
                        infos.innerHTML += "<div id='name'><h2>" + companyCommercial_name + "</h2><div class='statusOpen'><div class='closed'></div><p>Fermé</p></div></div>";//Notification d'ouverture !
                    }

                    infos.innerHTML += getOpened(company[k]['id_company']['hours']['monday']['closed'], "Lundi :", company[k]['id_company']['hours']['monday']['open_hour'], company[k]['id_company']['hours']['monday']['close_hour']);
                    infos.innerHTML += getOpened(company[k]['id_company']['hours']['tuesday']['closed'], "Mardi :", company[k]['id_company']['hours']['tuesday']['open_hour'], company[k]['id_company']['hours']['tuesday']['close_hour']);
                    infos.innerHTML += getOpened(company[k]['id_company']['hours']['wednesday']['closed'], "Mercredi :", company[k]['id_company']['hours']['wednesday']['open_hour'], company[k]['id_company']['hours']['wednesday']['close_hour']);
                    infos.innerHTML += getOpened(company[k]['id_company']['hours']['thursday']['closed'], "Jeudi :", company[k]['id_company']['hours']['thursday']['open_hour'], company[k]['id_company']['hours']['thursday']['close_hour']);
                    infos.innerHTML += getOpened(company[k]['id_company']['hours']['friday']['closed'], "Vendredi :", company[k]['id_company']['hours']['friday']['open_hour'], company[k]['id_company']['hours']['friday']['close_hour']);
                    infos.innerHTML += getOpened(company[k]['id_company']['hours']['saturday']['closed'], "Samedi :", company[k]['id_company']['hours']['saturday']['open_hour'], company[k]['id_company']['hours']['saturday']['close_hour']);
                    infos.innerHTML += getOpened(company[k]['id_company']['hours']['sunday']['closed'], "Dimanche :", company[k]['id_company']['hours']['sunday']['open_hour'], company[k]['id_company']['hours']['sunday']['close_hour']);

                    "</div>";

                    existCompany = true; //permet d'eviter les heures en double ...
                }
                if (!companyWebsite.includes("https://")) {
                    companyWebsite = "https://" + companyWebsite
                }
                idUrl = 'link-' + companyWebsite;
                gridPattern.innerHTML += "<a id=" + idUrl + " href=" + companyWebsite + " target='_blank' class='patern'><h3>" + companyCommercial_name + "</h3></a>"; //ajout du nom du magasin dans la grid

                reformat_url(idUrl, companyWebsite, 0);

            }
        }
    }

    return true;
}

function getOpened(isClosed, day, open_at, close_at) {//cette fonction renvoie si le magasin est ouvert ou non

    return isClosed ? "<p>" + day + " fermé</p>" : "<p>" + day + " " + open_at + " - " + close_at + "</p>";
}


function get_chrome_value() {
    chrome.storage.local.get(["company", "urlChrome"], async function (items) { //recuperation des données de l'extension

        if (items['urlChrome'] !== null && items['urlChrome'] !== undefined) { //si le site web existe
            const test = await setInformationCompany(JSON.parse(items['company']), items['urlChrome']); //affichage des informations
        } else {
            get_chrome_value();//fonction recurssive tant qu'on a pas l'url
        }
    });

}

function reformat_url(idUrl, url, tryReformat) {

    let link = document.getElementById(idUrl);
    tryReformat++;
    let newurl = "";

    if (tryReformat <= 4) {
        fetch(url, { //requete avec les données
            mode: "no-cors",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(function (response) {
            link = document.getElementById(idUrl);
            link.setAttribute("href", url);
            tryReformat = 0;

            if (response.status !== 200 || response.status === 0) {//si c'est pas une 200 ou si c'est une cors alors on affiche pas le liens
                if (link !== null) {
                    link.style.display = "none";
                }
            }
        }).catch((error) => {

            switch (tryReformat) {
                case 1:
                    newurl = "https://www." + url.replace("https://", "");
                    break;
                case 2:
                    newurl = "http://" + url.replace("https://www.", "");
                    break;
                case 3:
                    newurl = "http://www." + url.replace("http://", "");
                    break;
                default:
                    newurl = url;
            }

            if (tryReformat === 4) {
                if (link != null) {
                    link.style.display = "none";
                }
            }

            reformat_url(idUrl, newurl, tryReformat);
        });
    }
}

function company_open(currentDay, openHours, closeHours) {//donne l'information si le magasin est ouvert en temps réel


    if (currentDay !== null && openHours !== null && closeHours !== null) {
        /*Heure et minute actuel*/
        let currentHours = currentDay.getHours();
        let currentMinute = currentDay.getMinutes();

        /*Heure d'ouveture du magsin*/
        let convertStringOpenHours = openHours;
        convertStringOpenHours = convertStringOpenHours.split("h");
        let convertOpenHours = parseInt(convertStringOpenHours[0]);
        let convertOpenMinutes = parseInt(convertStringOpenHours[1]) || 0;

        /*Heure de fermeture du magsin*/
        let convertStringCloseHours = closeHours;
        convertStringCloseHours = convertStringCloseHours.split("h");
        let convertCloseHours = parseInt(convertStringCloseHours[0]);
        let convertCloseMinutes = parseInt(convertStringCloseHours[1]) || 0;


        /*on calcul le nombre de secondes total */
        let currentTotalHours = currentHours * 3600 + currentMinute * 60;
        let openHoursTotal = convertOpenHours * 3600 + convertOpenMinutes * 60;
        let openCloseTotal = convertCloseHours * 3600 + convertCloseMinutes * 60;


        if (currentTotalHours >= openHoursTotal && currentTotalHours <= openCloseTotal) {
            return true;//Ouvert actuelement
        } else {
            return false;//fermé actuelement
        }
    } else {
        return false;//fermé actuelement
    }

}



