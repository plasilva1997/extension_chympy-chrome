function setInformationCompany(company,url){

    let gridPattern=document.querySelector("#grid__paterns");

    for(let k =0 ; k < company.length; k++) {

        if (company[k] !== null && company[k] !== undefined) {

            let companyWebsite = company[k]['id_company']['socials']['website'];
            let companyCommercial_name= company[k]['id_company']['commercial_name'];

            if(companyWebsite !== null && companyWebsite !== "") {

                if (url.includes(companyWebsite.replace(/\s/g, ''))) {

                    let infos = document.querySelector("#infosCompany");

                    infos.innerHTML="<h2>"+companyCommercial_name+"</h2>"+
                        "<div id=\"infos\"><div class=\"horaires\">";
                    infos.innerHTML+= getOpened(company[k]['id_company']['hours']['monday']['closed'],"Lundi :",company[k]['id_company']['hours']['monday']['open_hour'],company[k]['id_company']['hours']['monday']['close_hour']);
                    infos.innerHTML+= getOpened(company[k]['id_company']['hours']['tuesday']['closed'],"Mardi :",company[k]['id_company']['hours']['tuesday']['open_hour'],company[k]['id_company']['hours']['tuesday']['close_hour']);
                    infos.innerHTML+= getOpened(company[k]['id_company']['hours']['wednesday']['closed'],"Mercredi :",company[k]['id_company']['hours']['wednesday']['open_hour'],company[k]['id_company']['hours']['wednesday']['close_hour']);
                    infos.innerHTML+= getOpened(company[k]['id_company']['hours']['thursday']['closed'],"Jeudi :",company[k]['id_company']['hours']['thursday']['open_hour'],company[k]['id_company']['hours']['thursday']['close_hour']);
                    infos.innerHTML+= getOpened(company[k]['id_company']['hours']['friday']['closed'],"Vendredi :",company[k]['id_company']['hours']['friday']['open_hour'],company[k]['id_company']['hours']['friday']['close_hour']);
                    infos.innerHTML+= getOpened(company[k]['id_company']['hours']['saturday']['closed'],"Samedi :",company[k]['id_company']['hours']['saturday']['open_hour'],company[k]['id_company']['hours']['saturday']['close_hour']);
                    infos.innerHTML+= getOpened(company[k]['id_company']['hours']['sunday']['closed'],"Dimanche :",company[k]['id_company']['hours']['sunday']['open_hour'],company[k]['id_company']['hours']['sunday']['close_hour']);

                    "  </div></div>";
                }

                if(!companyWebsite.includes("https")){
                    companyWebsite="https://"+companyWebsite;
                }

                gridPattern.innerHTML+="<a href="+companyWebsite+" target='_blank' class='patern'><h3>"+companyCommercial_name+"</h3></a>";
            }
        }

    }

}

function getOpened(isClosed,day,open_at,close_at){//cette fonction renvoie si le magasin est ouvert ou non

    return isClosed ? "<p>"+day+" fermé</p>" : "<p>"+day+" "+open_at+" - "+close_at+"</p>";
}

chrome.storage.local.get(["company","urlChrome"], function(items) {
    setInformationCompany(JSON.parse(items['company']),items['urlChrome']);
});

