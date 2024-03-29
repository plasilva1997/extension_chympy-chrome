/*DASHBOARD DE LEXTENSION*/

setTimeout(get_chrome_value, 250); // une pause de 250 millesecondes avant de lancer la function get_chrome_value

let activeClass = document.getElementById("activeOne"); //on recupere la classe active
activeClass.addEventListener("click", ActiveOne); //Ajoute la fonction au boutton submit

let activeClass2 = document.getElementById("activeTwo");
activeClass2.addEventListener("click", ActiveTwo);

let activeClass3 = document.getElementById("activeThree");
activeClass3.addEventListener("click", ActiveThree);

let selectCategoryDisplay = document.querySelector("#choiceCategory");

function ActiveOne() {
    var oldElement2 = document.getElementById("activeTwo");
    var element = document.getElementById("activeOne");
    var oldElement3 = document.getElementById("activeThree");
    var grid1 = document.getElementById("grid__paterns1");
    var grid2 = document.getElementById("grid__paterns");
    var grid3 = document.getElementById("grid__new__paterns");
    element.classList.add("active"); // on ajoute la classe active a la grid 1
    oldElement2.classList.remove("active"); // on retire la classe active a la grid 2
    oldElement3.classList.remove("active"); // on retire la classe active a la grid 3
    grid1.classList.remove("d-none"); // on ajoute la classe d'affichage a la grid 1
    grid2.classList.add("d-none"); // on retire la classe d'affichage a la grid 2
    grid3.classList.add("d-none"); // on ajoute la classe d'affichage a la grid 3
    selectCategoryDisplay.classList.add("d-none");
}

function ActiveTwo() {
    var oldElement1 = document.getElementById("activeOne");
    var element = document.getElementById("activeTwo");
    var oldElement3 = document.getElementById("activeThree");
    var grid1 = document.getElementById("grid__paterns1");
    var grid2 = document.getElementById("grid__paterns");
    var grid3 = document.getElementById("grid__new__paterns");
    element.classList.add("active");
    oldElement1.classList.remove("active");
    oldElement3.classList.remove("active"); // on retire la classe active a la grid 3
    grid1.classList.add("d-none"); // on ajoute la classe d'affichage a la grid 1
    grid2.classList.remove("d-none"); // on retire la classe d'affichage a la grid 2
    grid3.classList.add("d-none"); // on ajoute la classe d'affichage a la grid 3
    selectCategoryDisplay.classList.remove("d-none");
}

function ActiveThree() {
    var oldElement1 = document.getElementById("activeOne");
    var oldElement2 = document.getElementById("activeTwo");
    var element = document.getElementById("activeThree");
    var grid1 = document.getElementById("grid__paterns1");
    var grid2 = document.getElementById("grid__paterns");
    var grid3 = document.getElementById("grid__new__paterns");
    element.classList.add("active");
    oldElement1.classList.remove("active");
    oldElement2.classList.remove("active");
    grid1.classList.add("d-none"); // on ajoute la classe d'affichage a la grid 1
    grid2.classList.add("d-none"); // on retire la classe d'affichage a la grid 2
    grid3.classList.remove("d-none"); // on ajoute la classe d'affichage a la grid 3
    selectCategoryDisplay.classList.remove("d-none");
}

function setInformationCompany(company, url, lastConnexion, categoryName) {

    chrome.browserAction.setIcon({path: '/dist/assets/img/on.png'});

    let currentDayName = new Date().toLocaleDateString("en-EN", {weekday: 'long'}).toLowerCase();
    let gridPattern = document.querySelector("#grid__paterns");
    let isNewOffers = false;
    let existCompany = false;
    let currentCompanyCategory = null;
    let gridNewOffers = document.querySelector("#grid__newpattern");
    let buttonNewOffers = document.querySelector("#activeThree");
    let selectCategory = document.querySelector("#categorie-select");

    for (let c = 0; c < categoryName.length; c++) {
        selectCategory.innerHTML += "<option value='" + categoryName[c]._id + "'>" + categoryName[c].label + "</option>" // ajout des option du select des catégories
    }

    selectCategory.addEventListener('change', loadstoreselected);

    for (let k = 0; k < company.length; k++) {  //parcours le tableau de magasins

        if (company[k] !== null && company[k] !== undefined) { //si le magasin existe

            let companyWebsite = company[k]['id_company']['socials']['website']; //recuperation du site web
            let companyCommercial_name = company[k]['id_company']['commercial_name']; //recuperation du nom du magasin

            if (companyWebsite !== null && companyWebsite !== "") { //si le site web existe

                if (url.includes(companyWebsite.replace(/\s/g, '')) && !existCompany) {

                    currentCompanyCategory = company[k]['id_company']['id_category']['label'];//categorie actuel du site à laquel se trouve le client
                    activeClass.classList.remove("d-none"); //affiche le boutton active

                    /*Informations l'entreprise*/
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

                    /*Heures d'ouverture du partenaire en cours*/
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

                idUrl = 'link-' + companyWebsite;

                /*Patenaire de la meme catgeorie*/
                let gridSameCatgeory = document.querySelector("#grid__paterns1");

                if (company[k]['id_company']['id_category']['label'] === currentCompanyCategory && !url.includes(companyWebsite.replace(/\s/g, ''))) {//si la categorie du site client est egale a la catgeorie du site de la boucle alors ils font font partie de la meme categorie
                    gridSameCatgeory.innerHTML += "<a class='patern brown' id=" + idUrl + " href=" + companyWebsite + " target='_blank' class='patern'><h3>" + companyCommercial_name + "</h3></a>"; //ajout du nom du magasin dans la grid
                }

                let gridNewOffers = document.querySelector("#grid__new__paterns");

                const dateOffers = new Date(company[k]['id_company']['created_at']);
                const dateOffersTimestamp = dateOffers.getTime();

                let Lastoffer = dateOffersTimestamp;
                let LastConnectionCurrent = lastConnexion;
                if (!companyWebsite.includes("https://")) {//format les url en https
                    companyWebsite = "https://" + companyWebsite
                }
                if (lastConnexion < Lastoffer) {
                    activeClass3.classList.remove("d-none");
                    activeClass3.addEventListener("click", function () {
                        notification(true);
                    });
                    gridNewOffers.innerHTML += "<a class='patern brow " + company[k]['id_company']['id_category']['_id'] + " store' id=" + idUrl + " href=" + companyWebsite + " target='_blank' class='patern'><h3>" + companyCommercial_name + "</h3></a>"; //ajout du nom du magasin dans la grid
                }

                if (!companyWebsite.includes("https://")) {//format les url en https
                    companyWebsite = "https://" + companyWebsite
                }
                /*tout les partenaires*/
                gridPattern.innerHTML += "<a class='patern " + company[k]['id_company']['id_category']['_id'] + " store' id=" + idUrl + " href=" + companyWebsite + " target='_blank' class='patern'><h3>" + companyCommercial_name + "</h3></a>"; //ajout du nom du magasin dans la grid
            }
        }
    }
    return true;
}

function getOpened(isClosed, day, open_at, close_at) {//cette fonction renvoie si le magasin est ouvert avec les heures ou non

    if (open_at === null) {
        open_at = "Non definis";
    }
    if (close_at === null) {
        close_at = "Non definis";
    }
    return isClosed ? "<p>" + day + " fermé</p>" : "<p>" + day + " " + open_at + " - " + close_at + "</p>";
}

function loadstoreselected(e) {//cette function ajoute et enleve la class "d-none" en fonction de la catégorie choisi

    let categoryID = e.target.value;
    let store = document.getElementsByClassName('store');

    for (let r = 0; r < store.length; r++) {
        if (categoryID === 'tout') {
            store[r].classList.remove('d-none');
        } else {
            if (!store[r].className.includes(categoryID)) {
                store[r].classList.add('d-none');

            } else {
                store[r].classList.remove('d-none');
            }
        }

    }

}

function get_chrome_value() {
    chrome.storage.local.get(["company", "urlChrome", "token", "token_at", "category"], function (items) { //recuperation des données de l'extension
        if (items['urlChrome'] !== null && items['urlChrome'] !== undefined) { //si le site web existe
            setInformationCompany(JSON.parse(items['company']), items['urlChrome'], items['token_at'], JSON.parse(items['category'])); //affichage des informations
        } else {
            get_chrome_value();//fonction recurssive tant qu'on a pas l'url
        }
    });

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


        if (currentTotalHours >= openHoursTotal && currentTotalHours <= openCloseTotal) {//si l'heure du client se situe entre l'heure d'ouverture et de fermeture du site actuel alors il est notifier pas un ouver ou fermé
            return true;//Ouvert actuelement
        } else {
            return false;//fermé actuelement
        }
    } else {
        return false;//fermé actuelement
    }
}