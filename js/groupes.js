import { saveGroupsToLS } from "./storage.js";
import { readGroupsFromLS } from "./storage.js";

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

const messageVide = document.getElementById('message-vide');



const enregistrerButton = document.getElementById('Enregistrer-groupe')

const buttonModifier = document.querySelector('.button-modifier')


btnOvrtG.addEventListener('click', () => {
    dialogG.showModal();



    enregistrerButton.style.display = 'block';
    buttonModifier.style.display = 'none';


});

btnClsG.addEventListener('click', () => {
    dialogG.close();
});



let groupes = [];

function createId() {
    if (groupes.length === 0) {
        return 1;
    } else {

        let ids = groupes.map(function (groupe) {
            return groupe.id;
        });

        let maxId = Math.max(...ids);


        return maxId + 1;
    }
}
formGroupe.addEventListener('submit', function (event) {



    event.preventDefault();




    let objtGroupes = {
        id: createId(),

        NomGroup: nomGroupe.value,
        Description: descriptionGroupe.value,
        Devise: deviseGroupe.value,
        DateDebut: dateDebutGroupe.value,



    }




    groupes.push(objtGroupes);
    console.log(groupes)


    dialogG.close();


    nomGroupe.value = " ";
    descriptionGroupe.value = " ";
    dateDebutGroupe.value = " ";
    deviseGroupe.value = "";
    saveGroupsToLS(groupes);
    AfficherGroupes()



})

function AfficherGroupes() {
    Card.innerHTML = " ";
    groupes.forEach(function (index) {
        if (groupes.length > 0) {
            messageVide.innerHTML = " ";
        }

        Card.innerHTML += `   <div data-id=${index.id}>
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
                            <button class="modifier-button" data-id=${index.id} > <i class="fa-solid fa-pen-to-square"></i> </button>
                            <button   class="delete-button" data-id=${index.id} ><i class="fa-solid fa-trash-can"></i></button>
                        </div>
                    </div>
        
        
        `
    })


}



function deleteModifyGroup() {


    Card.addEventListener('click', (event) => {
        let Btndelete = event.target.closest('.delete-button')
        if (Btndelete) {

            console.log('leoooooooooooo')
            let dataIddelete = +Btndelete.dataset.id;
            console.log(dataIddelete)

            groupes = groupes.filter((index) => index.id !== dataIddelete);
            saveGroupsToLS(groupes)
            AfficherGroupes(groupes)
        }


    })

    Card.addEventListener('click', (mod) => {



        let BtnModifier = mod.target.closest('.modifier-button')
        if (BtnModifier) {


            enregistrerButton.style.display = 'none';
            buttonModifier.style.display = 'block';



            console.log('messssiiiiii')
            let dataIdModifier = +BtnModifier.dataset.id;
            console.log(dataIdModifier);
            dialogG.showModal();

            groupes.forEach((index) => {

                if (index.id === dataIdModifier) {



                    nomGroupe.value = index.NomGroup
                    descriptionGroupe.value = index.Description
                    deviseGroupe.value = index.Devise
                    dateDebutGroupe.value = index.DateDebut




                    buttonModifier.addEventListener('click', () => {


                        index.NomGroup = nomGroupe.value
                        index.Description = descriptionGroupe.value
                        index.Devise = deviseGroupe.value
                        index.DateDebut = dateDebutGroupe.value
                        console.log(groupes)
                        saveGroupsToLS(groupes)
                        AfficherGroupes();

                        dialogG.close();

                    })


                }




            })
        }
    })

}






groupes = readGroupsFromLS();
AfficherGroupes();
deleteModifyGroup();