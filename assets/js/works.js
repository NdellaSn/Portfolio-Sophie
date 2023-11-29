const urlServer = "http://localhost:5678/api"


function generateWorks(data) {
    sectionWorks.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
        const work = data[i];

        const figureElement = document.createElement("figure");

        const imgElement = document.createElement("img");
        imgElement.src = work.imageUrl;
        imgElement.setAttribute('alt', work.title);

        const figcaptionElement = document.createElement("figcaption");
        figcaptionElement.innerHTML = work.title;

        figureElement.appendChild(imgElement);
        figureElement.appendChild(figcaptionElement);

        sectionWorks.appendChild(figureElement);

    }
}

function generateCategories(data) {

    const inputFiltre = document.createElement("button");
    inputFiltre.setAttribute("name", "Tous");
    inputFiltre.dataset.id = -1;
    inputFiltre.classList.add('btn-filtre');
    inputFiltre.classList.add('btn-selected');
    inputFiltre.innerHTML = "Tous"

    sectionFiltres.appendChild(inputFiltre);

    for (let i = 0; i < data.length; i++) {
        const categorie = data[i];
        const inputFiltre = document.createElement("button");
        inputFiltre.dataset.id = categorie.id;
        inputFiltre.setAttribute("name", categorie.name);
        inputFiltre.classList.add('btn-filtre');
        inputFiltre.innerHTML = categorie.name

        sectionFiltres.appendChild(inputFiltre);
    }


    listernerClick();

}


function listernerClick() {
    const btnsFiltre = document.getElementsByClassName("btn-filtre");
    for (let i = 0; i < btnsFiltre.length; i++) {
        const btnElement = btnsFiltre[i];
        btnElement.addEventListener("click", function (event) {

            document.querySelector('.btn-selected').classList.remove("btn-selected");
            btnElement.classList.add("btn-selected");

            const filtre = btnElement.getAttribute('name');

            if (filtre == "Tous") {
                generateWorks(works);
            }
            else {
                const arrayFiltre = works.filter(function (work) {
                    return work.category.name == filtre
                })

                generateWorks(arrayFiltre)
            }

        })

    }
}

function generateWorksForModal(data) {
    sectionmodal.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
        const work = data[i];

        const divElement = document.createElement("div");
        divElement.classList.add('photo');

        const imgElement = document.createElement("img");
        imgElement.src = work.imageUrl;
        imgElement.setAttribute('alt', work.title);

        const iconElement = document.createElement("i");
        iconElement.classList.add('fa-solid');
        iconElement.classList.add('fa-trash-can');

        const buttonElement = document.createElement("button");
        buttonElement.dataset.id = work.id;

        buttonElement.append(iconElement);


        divElement.appendChild(imgElement);
        divElement.appendChild(buttonElement);

        sectionmodal.appendChild(divElement);

    }
}


function generateCategoriesForModal(data) {


    for (let i = 0; i < data.length; i++) {
        const categorie = data[i];
        const optionElement = document.createElement("option");
        optionElement.dataset.id = categorie.id;
        optionElement.setAttribute("name", categorie.name);
        optionElement.innerHTML = categorie.name

        selectElement.appendChild(optionElement);
    }

}

function loginLogout() {
    const loginBtn = document.querySelector('.login-btn');


    if (localStorage.getItem('user')) {
        loginBtn.innerHTML = 'Logout';
        loginBtn.classList.remove('Login');
        loginBtn.classList.add('Logout');
        userConnected = true;

    }
    else {
        loginBtn.innerHTML = 'Login';
        loginBtn.classList.add('Login');
        loginBtn.classList.remove('Logout');
        userConnected = false;
    }

    loginBtn.addEventListener('click', function (event) {
        if (loginBtn.classList.contains('Logout')) {
            localStorage.removeItem("user");
        }
        document.location = 'login.html';
    });
}

function closeModal() {
    const btnCloses = document.querySelectorAll('.close-btn');
    for (let i = 0; i < btnCloses.length; i++) {
        const btnClose = btnCloses[i];

        btnClose.addEventListener('click', function (event) {
            const modal = document.querySelector('.modal');
            modal.style.display = 'none';
        });

    }

}

function openModal() {
    const openClose = document.querySelector('.modify-projet-btn');
    openClose.addEventListener('click', function (event) {
        const modal = document.querySelector('.modal');
        modal.style.display = 'flex';
    });
}


function adminView() {
    document.querySelector('.modal').innerHTML = "";
    if (userConnected) {

        const modifyBtn = document.createElement('div');
        modifyBtn.classList.add("modify-projet-btn");

        const modifyBtnIcon = document.createElement('i');
        modifyBtnIcon.classList.add("fa-regular");
        modifyBtnIcon.classList.add("fa-pen-to-square");

        modifyBtn.append(modifyBtnIcon);
        modifyBtn.append("Modifier");

        const filtre = document.querySelector('.filtre');
        filtre.remove();
        document.querySelector('.title').append(modifyBtn);
        document.querySelector('.modal').innerHTML = modalContent;
        openModal();

    }
}

function goBack() {
    const btnBack = document.querySelector('.back-btn');
    btnBack.addEventListener('click', function (event) {
        modalContentPhotos.style.display = 'block';
        modalContentAjout.style.display = 'none';
    });
}

function addPhotoSection() {
    const btnAdd = document.getElementById('btn-add-photo');
    btnAdd.addEventListener('click', function (event) {
        modalContentPhotos.style.display = 'none';
        modalContentAjout.style.display = 'block';
    });
}

function addPhotoBtn() {
    fileInput.addEventListener('change', function (event) {
        const file = fileInput.files[0];
        if (file.size > 4 * 1024 * 1024) {
            console.log("fichier trop lourd");
            isPhotoSet = false;
        }
        else {
            fileAdd.innerHTML = "";
            const preview = document.createElement('img');
            preview.src = URL.createObjectURL(file);
            fileAdd.append(preview);
            isPhotoSet = true;

        }

        enableBtn();

    });
}


function triggerClickOnInputFile() {
    const getPhoto = document.getElementById('get-photo');
    getPhoto.addEventListener('click', function (event) {
        fileInput.click();
    });
}



function isFormValid() {
    console.log(isPhotoSet, isTitleSet, isSelectedOption)
    return isPhotoSet && isTitleSet && isSelectedOption;
}


function enableBtn() {

    const btnValider = document.getElementById("btn-valider");
    if (isFormValid()) {
        btnValider.removeAttribute('disabled')
    }
    else {
        btnValider.setAttribute('disabled', 'disabled')

    }
}

function manageSelectCategorie() {
    
    selectElement.addEventListener("select", function (event) {
        event.preventDefault();
        const indice = selectElement.selectedIndex;
        selectedOption = selectElement.options[indice];
        if (indice > 0) {
            isSelectedOption = true;
        }
        else {
            isSelectedOption = false;
        }
        enableBtn();
    });
}

function manageTitleInput() {
    titleElement.addEventListener('keyup', function (event) {
        if (titleElement.value != '') {
            isTitleSet = true;
        }
        else {
            isTitleSet = false;
        }
        enableBtn();

    });
}



let reponseWorks = await fetch(urlServer + "/works", { method: "GET" });
const works = await reponseWorks.json();
const sectionWorks = document.querySelector(".gallery");
const sectionmodal = document.querySelector(".photos");
generateWorks(works);
generateWorksForModal(works);

let reponseCategories = await fetch(urlServer + "/categories", { method: "GET" });
const categories = await reponseCategories.json();
const sectionFiltres = document.querySelector(".filtre");
const selectElement = document.getElementById("categorie");
generateCategories(categories);
generateCategoriesForModal(categories);

let userConnected = false;
const modalContent = document.querySelector('.modal').innerHTML;

loginLogout();
closeModal();
adminView();

const modalContentPhotos = document.querySelector('.modal-content-photos')
const modalContentAjout = document.querySelector('.modal-content-ajout')
goBack();
addPhotoSection();

const fileAdd = document.querySelector('#get-photo');
const fileAddInner = fileAdd.innerHTML
let isPhotoSet = false;
const fileInput = document.querySelector('input[type="file"]');
triggerClickOnInputFile();
addPhotoBtn();

let isTitleSet = false;
const titleElement = document.getElementById('title');
manageTitleInput();

let isSelectedOption = true;
let selectedOption = null;
manageSelectCategorie();



const formNewWork = document.getElementById("form-new-work");
formNewWork.addEventListener('submit', function (event) {
    event.preventDefault();
    if (isFormValid()) {
        console.log('formulaire valide');
    }
    else {
        console.log('formulaire non valide');

    }
})

