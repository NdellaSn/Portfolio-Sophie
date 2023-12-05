const urlServer = "http://localhost:5678/api"

/*Retrieve and transform user input
and we return the token
*/
function getToken() {
    const user = JSON.parse(localStorage.user);
    return user.token;
}
/* empty the works section then we go through the table
to add the works to the section by calling the function
createWorkElement with work parameter */
function generateWorks(data) {
    sectionWorks.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        const work = data[i];
        createWorkElement(work);}
}
/* take a work object as a parameter
then it creates a figure in which we will put an image and a figuecaption
and add it to the works section */
function createWorkElement(work) {
    const figureElement = document.createElement("figure");
    figureElement.setAttribute('id', 'work-' + work.id)
    const imgElement = document.createElement("img");
    imgElement.src = work.imageUrl;
    imgElement.setAttribute('alt', work.title);

    const figcaptionElement = document.createElement("figcaption");
    figcaptionElement.innerHTML = work.title;

    figureElement.appendChild(imgElement);
    figureElement.appendChild(figcaptionElement);

    sectionWorks.appendChild(figureElement);
}
/* it goes through the data that is in the data table
and calls the createWorkPhotoForModal function passing each work in the array 
 */
function generateWorksForModal(data) {

    for (let i = 0; i < data.length; i++) {
        const work = data[i];
        createWorkPhotoForModal(work);

    }
}
/* I did the design beforehand to know which classes to add
for this section. we create a div in which we have an img and
a button that will allow you to delete a work with the manageDeleteButton function*/
function createWorkPhotoForModal(work) {
    const sectionPhotos = document.querySelector(".photos");

    const divElement = document.createElement("div");
    divElement.classList.add('photo');

    const imgElement = document.createElement("img");
    imgElement.src = work.imageUrl;
    imgElement.setAttribute('alt', work.title);

    const iconElement = document.createElement("i");
    iconElement.classList.add('fa-solid', 'fa-trash-can');
    const buttonElement = document.createElement("button");
    buttonElement.setAttribute("type", "button");
    buttonElement.dataset.id = work.id;

    buttonElement.append(iconElement);

    divElement.appendChild(imgElement);
    divElement.appendChild(buttonElement);
    sectionPhotos.appendChild(divElement);
    manageDeleteButton(buttonElement);

}
/*create the button all with two class btn-filter and btn-selected,
name attribute then we go through the data table to add the
other categories one by one
Then we add a click listerner on each button with the listernerClick function
*/
function generateCategories(data) {

    const inputFiltre = document.createElement("button");
    inputFiltre.setAttribute("name", "Tous");
    inputFiltre.classList.add('btn-filtre', 'btn-selected');
    inputFiltre.innerHTML = "Tous"

    sectionFiltres.append(inputFiltre);

    for (let i = 0; i < data.length; i++) {
        const categorie = data[i];
        const inputFiltre = document.createElement("button");
        inputFiltre.dataset.id = categorie.id;
        inputFiltre.setAttribute("name", categorie.name);
        inputFiltre.classList.add('btn-filtre');
        inputFiltre.innerHTML = categorie.name

        sectionFiltres.append(inputFiltre);
    }
    listernerClick();

}
/*create a drop-down list of different categorie
*/
function generateCategoriesForModal(data) {
     for (let i = 0; i < data.length; i++) {
        const categorie = data[i];
        const optionElement = document.createElement("option");
        optionElement.dataset.id = categorie.id;
        optionElement.setAttribute("value", categorie.id);
        optionElement.innerHTML = categorie.name

        selectElement.appendChild(optionElement);
    }

}
/*we recover all the buttons and add a click event which
checks the clicked button is all in this it calls the generateWorks function
by passing it the works of the sinn server it filters the works and does not take
that the works which correspond to the clicked category
*/
function listernerClick() {
    const btnsFiltre = document.getElementsByClassName("btn-filtre");
    for (let i = 0; i < btnsFiltre.length; i++) {
        const btnElement = btnsFiltre[i];
        btnElement.addEventListener("click", (event)=> {

            document.querySelector('.btn-selected').classList.remove("btn-selected");
            btnElement.classList.add("btn-selected");

            const filtre = btnElement.getAttribute('name');

            if (filtre == "Tous") {
                generateWorks(works);
            }else {
                const arrayFiltre = works.filter( (work)=> {
                    return work.category.name === filtre
                })

                generateWorks(arrayFiltre)
            }
        })

    }
}
/*we retrieve the loginbtn, we check if there is a user entry
if yes we change the word login to logout
sinn the connection is false and we change the logout to login
then we add a listener event on the loginbtn button
to check if the user is connected if yes he deletes the
user and redirects it to login.html
*/
function loginLogout() {
    const loginBtn = document.querySelector('.login-btn');

    if (localStorage.getItem('user')) {
        userConnected = true;
        loginBtn.innerHTML = 'Logout';
    }else {
        userConnected = false;
        loginBtn.innerHTML = 'Login';
    }
    loginBtn.addEventListener('click', function (event) {
        if (userConnected) {
            localStorage.removeItem("user");
        }
        document.location = 'login.html';
    });
}


function adminView() {
    if (userConnected) {
        editButton();
        //mode edition
        modeEdtion();
    }else {
// we empty the modal to prevent the user from having access to the code in the inspector
    document.querySelector('.modal-works').innerHTML = "";
    }
}

function editButton() {

    //add button edit

    const modifyBtn = document.createElement('div');
    modifyBtn.classList.add("modify-projet-btn");

    const modifyBtnIcon = document.createElement('i');
    modifyBtnIcon.classList.add("fa-regular", "fa-pen-to-square");

    modifyBtn.append(modifyBtnIcon);
    modifyBtn.append("Modifier");
    document.querySelector('.title').append(modifyBtn);

    //manage click to edition button
    openModal();

    //delete filtre section
    const filtre = document.querySelector('.filtre');
    filtre.remove();

    document.querySelector('.modal-works').innerHTML = modalWorksContent;


}

function modeEdtion() {
    const modalEditionMode = document.querySelector('.modal-edition');
    modalEditionMode.style.display = 'block';
}

//opens the edit popup
function openModal() {
    const openClose = document.querySelector('.modify-projet-btn');
    openClose.addEventListener('click', function (event) {
        const modal = document.querySelector('.modal-works');
        modal.style.display = 'flex';
        closeModal();

    });
}
//close the modification popup by clicking on the cross on click or outside the modal
function closeModal() {
    const btnCloses = document.querySelectorAll('.close-btn');

    for (let i = 0; i < btnCloses.length; i++) {
        const btnClose = btnCloses[i];
        btnClose.addEventListener('click', function (event) {
            const modal = document.querySelector('.modal-works');
            if (event.target == btnClose) {
                modal.style.display = 'none';
            }


        });

    }

}

function manageDeleteButton(btnDelete) {

    btnDelete.addEventListener('click', async (event)=> {
        const idWork = btnDelete.dataset.id;
        await fetch(urlServer + "/works/" + idWork,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': "Bearer " + getToken(),
                },
            }
        )
            .then(function (reponse) {
                if (reponse.ok) {
                    btnDelete.parentNode.remove();
                    document.getElementById('work-' + idWork).remove();

                }else {
                    const errorElement = document.querySelector(".modal-content-photos .erreur-message");
                    errorElement.innerHTML = "Une erreur s'est produite.";
                    errorElement.style.display = "block";
                }
            });
    });
}

function addPhotoSection() {
    const btnAdd = document.getElementById('btn-add-photo');
    btnAdd.addEventListener('click', function (event) {
        modalWorksContentPhotos.style.display = 'none';
        modalWorksContentAjout.style.display = 'block';
    });
}

function goBack() {
    const btnBack = document.querySelector('.back-btn');
    btnBack.addEventListener('click',(event)=> {
        modalWorksContentPhotos.style.display = 'block';
        modalWorksContentAjout.style.display = 'none';


    });
}

function triggerClickOnInputFile() {
    const getPhoto = document.getElementById('get-photo');
    getPhoto.addEventListener('click',(event)=> {
        fileInput.click();
    });
}


function addPhotoBtn() {
    fileInput.addEventListener('change',(event)=> {
        const file = fileInput.files[0];
        if (file.size > 4 * 1024 * 1024) {
            console.log("fichier trop lourd");
            const errorElement = document.querySelector("#form-new-work .erreur-message");
            errorElement.innerHTML = "Image trop lourde."
            errorElement.style.display = "block";
            isPhotoSet = false;
        }else {
            fileAdd.innerHTML = "";
            const preview = document.createElement('img');
            preview.src = URL.createObjectURL(file);
            preview.setAttribute("name", "image");
            fileAdd.append(preview);
            isPhotoSet = true;
             }

        enableBtn();

    });
}

function manageTitleInput() {
    titleElement.addEventListener('keyup', function (event) {
        if (titleElement.value != '') {
            isTitleSet = true;
        }else {
            isTitleSet = false;
        }
        enableBtn();


    });
}

function manageSelectCategorie() {

    selectElement.addEventListener("change", function (event) {
        const indice = selectElement.selectedIndex;
        selectedOption = selectElement.options[indice];
        isSelectedOption = true;
        enableBtn();

    });
}


function isFormValid() {
    return isPhotoSet && isTitleSet && isSelectedOption;
}


function enableBtn() {

    const btnValider = document.getElementById("btn-valider");
    if (isFormValid()) {
        btnValider.removeAttribute('disabled')
    }else {
        btnValider.setAttribute('disabled', 'disabled')

    }
}


function createNewWork() {
    const formNewWork = document.getElementById("form-new-work");

    formNewWork.addEventListener('submit', async (event) =>{
        event.preventDefault();

        if (isFormValid()) {
            const formData = new FormData(formNewWork);
            await fetch(urlServer + "/works", {
                method: 'POST',
                headers: {
                    'Authorization': "Bearer " + getToken()
                },
                body: formData
            })
                .then(
                    async (response) => {
                        if (response.status == 201) {
                            const newWork = await response.json();
                            createWorkElement(newWork);
                            createWorkPhotoForModal(newWork);

                            // reset form
                            formNewWork.reset();
                            fileAdd.innerHTML = fileAddInner;
                            // trigger click on back button
                            const btnBack = document.querySelector('.back-btn');
                            btnBack.click();
                        }else {
                            const errorElement = document.querySelector("#form-new-work .erreur-message");
                            errorElement.style.display = "block";
                            errorElement.innerHTML = "Une erreur s'est produite"


                        }
                    }
                );
        }else {
            const errorElement = document.querySelector("#form-new-work .erreur-message");
            errorElement.innerHTML = "formulaire non valide"
            errorElement.style.display = "block";
            console.log(errorElement);
        }


    });
}



// mes projets
async function mainFunction() {
    let reponseWorks = await fetch(urlServer + "/works", { method: "GET" });
     works = await reponseWorks.json();
     sectionWorks = document.querySelector(".gallery");
    generateWorks(works);


    // filtres
    let reponseCategories = await fetch(urlServer + "/categories", { method: "GET" });
    const categories = await reponseCategories.json();
     sectionFiltres = document.querySelector(".filtre");
    generateCategories(categories);

    //connection/disconnection
    let userConnected = false;
     modalWorksContent = document.querySelector('.modal-works').innerHTML;
    loginLogout();
    adminView();

    //modal
     selectElement = document.getElementById("categorie");
    generateWorksForModal(works);
    generateCategoriesForModal(categories);

     modalWorksContentPhotos = document.querySelector('.modal-content-photos');
     modalWorksContentAjout = document.querySelector('.modal-content-ajout');
    addPhotoSection();
    goBack();

    // input photo
    isPhotoSet = false;
     fileAdd = document.querySelector('#get-photo');
     fileAddInner = fileAdd.innerHTML; // garder le cotenu
     fileInput = document.querySelector('input[type="file"]');
    triggerClickOnInputFile();
    addPhotoBtn();

    // input title
     isTitleSet = false;
    titleElement = document.getElementById('title');
    manageTitleInput();

    // select categorie
    isSelectedOption = true;
    selectedOption = null;
    manageSelectCategorie();

    // validate creation work
    createNewWork();
    return { sectionWorks, sectionFiltres, selectElement, works, userConnected, modalWorksContent, modalWorksContentPhotos, modalWorksContentAjout, fileInput, isPhotoSet, fileAdd, titleElement, isTitleSet, selectedOption, isSelectedOption, fileAddInner };
}
let  sectionWorks
let sectionFiltres
let selectElement
let works
let userConnected
let modalWorksContent
let modalWorksContentPhotos
let modalWorksContentAjout
let fileInput
let isPhotoSet
let fileAdd
let titleElement
let isTitleSet
let selectedOption
let isSelectedOption
let fileAddInner 
await mainFunction();


