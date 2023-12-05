const urlServer = "http://localhost:5678/api"

// récupération de l'entrée user dans le localstrorage 
//redriger l'utilsateur sur la page d'accueil si l'entrée existe
function isUserConnected() {
    if (localStorage.getItem('user')) {
        document.location = "index.html";

    }
}

//soumission du formulaire de connexion
function onLogin() {
    const formLogin = document.getElementById("form-login");
    formLogin.addEventListener('submit', async function (event) {
        event.preventDefault();

        //creer un objet de connexion dans le quel on va mettre l'email et le mot de passe 
        let connexion = {};
        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");
        connexion = {
            email: emailInput.value,
            password: passwordInput.value
        };

        // pour eviter les erreurs logiques
        try {

            const requestBody = JSON.stringify(connexion);
            await fetch(urlServer + "/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: requestBody,
            })
            .then(async function (response) {
                /*récupération de la réponse: 
                                - si le status est 200 le serveur a bien pris en compte la réponse 
                                    puis on stock le token dans le localStorage et on redrige la page vers l'index
                                - sinon on affiche le block de message d'erreur 

                */

                if (response.status === 200) {
                    const responseData = await response.json();
                    localStorage.setItem('user', JSON.stringify(responseData));
                    document.location = "index.html";
                }
                else {
                    const errorElement = document.querySelector(".erreur-message");
                    errorElement.style.display = "block";
                }
            }
            );

        } catch (error) {
            console.error("Une erreur s'est produite lors de la requête:", error);
        }
    });
}


onLogin();
isUserConnected();

