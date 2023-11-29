const urlServer = "http://localhost:5678/api"


function isUserConnected() {
    if (localStorage.getItem('user')) {
        document.location = "index.html";

    }
}

function onLogin() {
    const formLogin = document.getElementById("form-login");
    formLogin.addEventListener('submit', async function (event) {
        event.preventDefault();


        let connexion = {};
        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");
        connexion = {
            email: emailInput.value,
            password: passwordInput.value
        };

        try {
            const chargeUtile = JSON.stringify(connexion);
            const response = await fetch(urlServer + "/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: chargeUtile,
            })
                .then(
                    async (response) => {

                        if (response.status == 200) {
                            const responseData = await response.json();
                            localStorage.setItem('user',JSON.stringify(responseData));
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

