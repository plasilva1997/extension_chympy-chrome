
chrome.storage.local.get(["company","token","urlChrome"], function(items) {

    const url = items['urlChrome']; //url de la page

    let company=JSON.parse(items['company']);
    let gridPattern=document.querySelector("#grid__paterns");

    for(let k =0 ; k < company.length; k++) {

        if (company[k] !== null && company[k] !== undefined) {

            let companyWebsite = company[k]['id_company']['socials']['website'];
            let companyCommercial_name= company[k]['id_company']['commercial_name'];

            if(companyWebsite !== null && companyWebsite !== "") {

                console.log(companyWebsite)
                console.log(url)

                if (url.includes(companyWebsite.replace(/\s/g, ''))) {

                    let infos = document.querySelector("#infosCompany");

                    infos.innerHTML="<h2>"+companyCommercial_name+"</h2>"+
                        "<div id=\"infos\"><div class=\"horaires\">";
                    infos.innerHTML+="<p>"+company[k]['id_company']['hours']['monday']['closed']==false ?  "Lundi : "+company[k]['id_company']['hours']['monday']['open_hour'] +"-"+ company[k]['id_company']['hours']['monday']['close_hour']+"</p>" : "fermé";
                    infos.innerHTML+="<p>"+company[k]['id_company']['hours']['tuesday']['closed']==true ?  "Mardi : "+company[k]['id_company']['hours']['tuesday']['open_hour'] +"-"+ company[k]['id_company']['hours']['tuesday']['close_hour']+"</p>" : "fermé";
                    infos.innerHTML+="<p>"+company[k]['id_company']['hours']['wednesday']['closed']==true ?  "Mercredi : "+company[k]['id_company']['hours']['wednesday']['open_hour'] +"-"+ company[k]['id_company']['hours']['wednesday']['close_hour']+"</p>" : "fermé";
                    infos.innerHTML+="<p>"+company[k]['id_company']['hours']['thursday']['closed']==true ?  "Jeudi : "+company[k]['id_company']['hours']['thursday']['open_hour'] +"-"+ company[k]['id_company']['hours']['thursday']['close_hour']+"</p>" : "fermé";
                    infos.innerHTML+="<p>"+company[k]['id_company']['hours']['friday']['closed'] ==true?  "Vendredi : "+company[k]['id_company']['hours']['friday']['open_hour'] +"-"+ company[k]['id_company']['hours']['friday']['close_hour']+"</p>" : "fermé";
                    infos.innerHTML+="<p>"+company[k]['id_company']['hours']['saturday']['closed']==true ?  "Samedi : "+company[k]['id_company']['hours']['saturday']['open_hour'] +"-"+ company[k]['id_company']['hours']['saturday']['close_hour']+"</p>" : "fermé";
                    infos.innerHTML+="<p>"+company[k]['id_company']['hours']['sunday']['closed']==true ?  "Samedi : "+company[k]['id_company']['hours']['sunday']['open_hour'] +"-"+ company[k]['id_company']['hours']['sunday']['close_hour']+"</p>" : "fermé";
                        "  </div></div>";
                }

                if(!companyWebsite.includes("https")){
                    companyWebsite="https://"+companyWebsite;
                }

                gridPattern.innerHTML+="<a href="+companyWebsite+" target='_blank' class='patern'><h3>"+companyCommercial_name+"</h3></a>";
            }
        }

    }


});
