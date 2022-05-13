document.getElementById("logout").addEventListener("click", logout); //Ajoute la fonction au boutton logout
function logout(){
    console.log("logout");
    localStorage.removeItem("token"); //supprime le token
    window.location.replace("./index.html"); //redirection vers la page d'accueil
}