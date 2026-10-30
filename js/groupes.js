const btnOvrtG = document.getElementById("Creer-groupe");
const dialogG = document.getElementById("dialogG");
const btnClsG = document.getElementById("annuler-groupe");



const formGroupe = document.getElementById('form-groupe')

const buttonEnregistrer = document.getElementById('Enregistrer-groupe')

const nomGroupe = document.getElementById('nom-groupe')
const descriptionGroupe = document.getElementById('description-groupe')
const deviseGroupe = document.getElementById('devise-groupe')
const dateDebutGroupe = document.getElementById('date-debut-groupe')
const clotureGroupe = document.getElementById('cloture-groupe')


const Card = document.getElementById('card');
const groupDescription = document.getElementById('group-description')
const startedInfo = document.getElementById('started-info')
const deviseInfo = document.getElementById('devise-info')





btnOvrtG.addEventListener('click', () => {
    dialogG.showModal();
});

btnClsG.addEventListener('click', () => {
    dialogG.close();
});

let groupes = [];
let counter = 1;
formGroupe.addEventListener('submit', function (event) {
    event.preventDefault();
    let objtGroupes = {
        id: counter++,
        NomGroup: nomGroupe.value,
        Description: descriptionGroupe.value,
        Devise: deviseGroupe.value,
        DateDebut: dateDebutGroupe.value,
        Cloture: clotureGroupe.value
    }

    groupes.push(objtGroupes);
    console.log(groupes)
    AfficherGroupes() 
    nomGroupe.value=" ";
    descriptionGroupe.value=" ";
    dateDebutGroupe.value=" ";
    deviseGroupe.value="";

})

function AfficherGroupes() {

    groupes.forEach(function (index) {
        Card.innerHTML = " ";
        counter = groupes.length;
        Card.innerHTML += `   <div id=${index.id}>
                        <div>
                            <h3 id="group-name">${index.NomGroup} </h3>
                            <p id="group-description">${index.Description} </p>
                        </div>
                        <div id="started-devise"> 
                            <div>
                                <p id="started"> Début :
                                    :</p>
                                <p id="started-info"> ${index.DateDebut}</p>
                            </div>
                            <div>
                                <p id="devise"> DEVISE:</p>
                                <p id="devise-info"> ${index.Devise}</p>
                            </div>
                        </div>

                        <div class="-total">
                            
                            <div class="total-depenses">
                                <p class="total"> </p>
                                <p class="description-total-depenses">Total des dépenses</p>
                            </div>
                        </div>
                        <div class="group-buttons">
                            <button id="card-button"> <i class="fa-solid fa-pen-to-square"></i> </button>
                            <button id="delete-button"><i class="fa-solid fa-trash-can"></i></button>
                        </div>
                    </div>
        
        
        `



    })
}






