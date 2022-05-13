
chrome.storage.local.get(["company","token"], function(items) {

    let company=JSON.parse(items['company']);
    let gridPattern=document.querySelector("#grid__paterns");

    for(let k =0 ; k < company.length; k++) {

        if (company[k] !== null && company[k] !== undefined) {

            let companyWebsite = company[k]['id_company']['socials']['website'];
            let companyCommercial_name= company[k]['id_company']['commercial_name'];
            console.log(companyWebsite)

            if(companyWebsite !== null && companyWebsite !== "") {

                gridPattern.innerHTML+="<a href="+companyWebsite+" target='_blank' class='patern'><h3>"+companyCommercial_name+"</h3></a>";
            }
        }

    }


});
