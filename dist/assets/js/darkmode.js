let darkMode = document.getElementById("darkmode"); //recuperation du bouton darkmode
darkMode.addEventListener("click", dark_mode); //ajout d'un evenement au click du bouton darkmode
let checkDarkMode = localStorage.getItem("darkMode"); //recuperation du darkmode dans le localstorage
let lougoutIcon = document.getElementById("logout"); //recuperation du bouton logout


function dark_mode() {
    checkDarkMode = localStorage.getItem("darkMode"); //recuperation du darkmode dans le localstorage
    if (checkDarkMode === undefined || checkDarkMode === "false") {
        localStorage.setItem("darkMode", "true"); //ajoute le darkmode a true dans le localstorage
    } else {
        localStorage.setItem("darkMode", "false");
    }
    setDarkmode(); //appel de la fonction setDarkmode
}

function setDarkmode() {
    checkDarkMode = localStorage.getItem("darkMode"); //recuperation du darkmode dans le localstorage
    if (checkDarkMode === null || checkDarkMode === "false") { //si le darkmode est false
        document.body.classList.remove("dark-mode"); //supprime la class dark-mode
        darkMode.classList.remove("icon_off"); //supprime la class icon_off
        darkMode.classList.add("icon_on"); //ajoute la class icon_on
        lougoutIcon.classList.remove("lougout-dm-actif"); //supprime la class lougout-dm-actif


    } else {
        document.body.classList.add("dark-mode"); //ajoute la class dark-mode
        darkMode.classList.remove("icon_on"); //supprime la class icon_on
        darkMode.classList.add("icon_off"); //ajoute la class icon_off
        lougoutIcon.classList.add("lougout-dm-actif"); //ajoute la class lougout-dm-actif
    }
}

setDarkmode(); //appel de la fonction setDarkmode