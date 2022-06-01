let darkMode = document.getElementById("darkmode"); //recuperation du bouton darkmode
darkMode.addEventListener("click", dark_mode); //ajout d'un evenement au click du bouton darkmode
let checkDarkMode = localStorage.getItem("darkMode"); //recuperation du darkmode dans le localstorage

function dark_mode() {
    checkDarkMode = localStorage.getItem("darkMode"); //recuperation du darkmode dans le localstorage
    if (checkDarkMode === undefined || checkDarkMode === "false") {
        localStorage.setItem("darkMode", "true");
    } else {
        localStorage.setItem("darkMode", "false");
    }
    setDarkmode();
}

function setDarkmode() {
    checkDarkMode = localStorage.getItem("darkMode");
    if (checkDarkMode === null || checkDarkMode === "false") {
        document.body.classList.remove("dark-mode");

    } else {
        document.body.classList.add("dark-mode");
    }
}

setDarkmode();