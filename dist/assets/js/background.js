/*POUR DOM DE LA PAGE*/

const url =window.location.toString()

    // use `url` here inside the callback because it's asynchronous!
    if(url === "https://www.caf.fr/") {
        let div = document.createElement("h1");
        document.body.insertBefore(div, document.body.firstChild);

        div.innerText = "JE SUIS UNE DIV";
        div.style.color="red";
    }

localStorage.setItem("chatte","dsfsdf")