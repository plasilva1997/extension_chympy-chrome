/*DASHBOARD DE LEXTENSION*/

get_chrome_value();

function setInformationCompany(company,url){

    let gridPattern=document.querySelector("#grid__paterns");

    let existCompany=false;
    for(let k =0 ; k < company.length; k++) {  //parcours le tableau de magasins

        if (company[k] !== null && company[k] !== undefined) { //si le magasin existe

            let companyWebsite = company[k]['id_company']['socials']['website']; //recuperation du site web
            let companyCommercial_name= company[k]['id_company']['commercial_name']; //recuperation du nom du magasin

            if(companyWebsite !== null && companyWebsite !== "") { //si le site web existe

                if (url.includes(companyWebsite.replace(/\s/g, '')) && !existCompany) {

                    let infos = document.querySelector("#horaires");

                    infos.innerHTML="<h2>"+companyCommercial_name+"</h2>";
                    infos.innerHTML+= getOpened(company[k]['id_company']['hours']['monday']['closed'],"Lundi :",company[k]['id_company']['hours']['monday']['open_hour'],company[k]['id_company']['hours']['monday']['close_hour']);
                    infos.innerHTML+= getOpened(company[k]['id_company']['hours']['tuesday']['closed'],"Mardi :",company[k]['id_company']['hours']['tuesday']['open_hour'],company[k]['id_company']['hours']['tuesday']['close_hour']);
                    infos.innerHTML+= getOpened(company[k]['id_company']['hours']['wednesday']['closed'],"Mercredi :",company[k]['id_company']['hours']['wednesday']['open_hour'],company[k]['id_company']['hours']['wednesday']['close_hour']);
                    infos.innerHTML+= getOpened(company[k]['id_company']['hours']['thursday']['closed'],"Jeudi :",company[k]['id_company']['hours']['thursday']['open_hour'],company[k]['id_company']['hours']['thursday']['close_hour']);
                    infos.innerHTML+= getOpened(company[k]['id_company']['hours']['friday']['closed'],"Vendredi :",company[k]['id_company']['hours']['friday']['open_hour'],company[k]['id_company']['hours']['friday']['close_hour']);
                    infos.innerHTML+= getOpened(company[k]['id_company']['hours']['saturday']['closed'],"Samedi :",company[k]['id_company']['hours']['saturday']['open_hour'],company[k]['id_company']['hours']['saturday']['close_hour']);
                    infos.innerHTML+= getOpened(company[k]['id_company']['hours']['sunday']['closed'],"Dimanche :",company[k]['id_company']['hours']['sunday']['open_hour'],company[k]['id_company']['hours']['sunday']['close_hour']);

                    "  </div>";
                    existCompany=true; //permet d'eviter les heures en double ...
                }

                if(!companyWebsite.includes("https")){
                    companyWebsite="https://"+companyWebsite; //ajout du https
                }

                gridPattern.innerHTML+="<a href="+companyWebsite+" target='_blank' class='patern'><h3>"+companyCommercial_name+"</h3></a>"; //ajout du nom du magasin dans la grid
            }
        }

    }

}

function getOpened(isClosed,day,open_at,close_at){//cette fonction renvoie si le magasin est ouvert ou non

    return isClosed ? "<p>"+day+" fermé</p>" : "<p>"+day+" "+open_at+" - "+close_at+"</p>";
}


function get_chrome_value() {
    chrome.storage.local.get(["company", "urlChrome"], function (items) { //recuperation des données de l'extension

        if (items['urlChrome'] !== null && items['urlChrome'] !== undefined) { //si le site web existe
             setInformationCompany(JSON.parse(items['company']), items['urlChrome']); //affichage des informations
        } else {
            get_chrome_value();//fonction recurssive tant qu'on a pas l'url
        }
    });
}


