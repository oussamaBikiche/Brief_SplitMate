import { readGroupsFromLS } from "./storage.js";
import { readMembresFromLS } from "./storage.js";
import { saveMembresToLS } from "./storage.js";
export function getMembres(){
    return membres
}
const btnOvrtM = document.getElementById("Creer-membre");
const dialogM = document.getElementById("dialogM");
const btnClsM = document.getElementById("Annuler-membre");

const formGembre = document.getElementById("form-membre");
const nomMembre = document.getElementById("nom-membre");
const pseudoMembre = document.getElementById("pseudo-membre");
const selectGroupe = document.getElementById("groupe-membre");
const listes = document.getElementById("liste-membres");




let membres = readMembresFromLS();
let groupes = readGroupsFromLS();
let membreEnCours = null;



btnOvrtM.addEventListener('click', () => {
    dialogM.showModal();
});
btnClsM.addEventListener('click', () => {
    dialogM.close();
});



function createId() {
    if (membres.length === 0) {
        return 1;
    } else {
        let ids = membres.map(function (membre) {
            return membre.id;
        });

        let maxId = Math.max(...ids);//spread operator(bch yfr9 lina les elements)

        return maxId + 1;
    }
}


function selectGroupes() {

    groupes.forEach(function (groupe) {

        let option = document.createElement("option");

        option.value = groupe.id;

        option.textContent = groupe.NomGroup;

        selectGroupe.appendChild(option);

    });

}
selectGroupes()
console.log(selectGroupe.options);



//ajoute membre:
function ajouteMembre() {

    formGembre.addEventListener('submit', function (event) {

        event.preventDefault();

        let objtMembre = {
            id: membreEnCours ? membreEnCours.id : createId(),

            nomMembre: nomMembre.value,

            pseudoMembre: pseudoMembre.value,

            groupeMembre: selectGroupe.selectedOptions[0].text,

            idGroupe: Number(selectGroupe.value),

            totalPaye: membreEnCours ? membreEnCours.totalPaye : 0,

            soldeActuel: membreEnCours ? membreEnCours.soldeActuel : 0
        };

        if (membreEnCours) {

            membres = membres.map(function (membre) {

                if (membre.id === membreEnCours.id) {
                    return objtMembre;
                }

                return membre;

            });

        } else {

            membres.push(objtMembre);

        }

        saveMembresToLS(membres);

        afficheMembres();

        nomMembre.value = "";
        pseudoMembre.value = "";
        selectGroupe.value = "";

        membreEnCours = null;

        dialogM.close();

    });

}

ajouteMembre();


//affiche membre:
function afficheMembres() {
    listes.innerHTML = "";

    if (membres.length === 0) {

        listes.innerHTML = `
            <tr>
                <td colspan="6">
                    Aucun membre enregistré pour le moment.
                </td>
            </tr>
        `;
        return;
    }
    membres.forEach(function (membre) {
        listes.innerHTML += `<tr>
                            <td>${membre.nomMembre}</td>
                            <td><img src="${membre.pseudoMembre}"</td>
                            <td>${membre.groupeMembre}</td>
                            <td>${membre.totalPaye} DH</td>
                            <td>${membre.soldeActuel} DH</td>
                            <td>
                                <button class="btn-modifier"  data-id=${membre.id}> <i class="fa-solid fa-pen-clip"></i></button>
                                <button class="btn-delete" data-id=${membre.id}><i class="fa-solid fa-trash-can" ></i></button>
                            </td>
                        </tr>`
    });

}

afficheMembres()


//supprssion membre:

listes.addEventListener("click", function (event) {

    let button = event.target.closest(".btn-delete");

    if (button) {
        supprimerMembre(button);
    }

});

function filterMembreParId(id) {
    return membres.filter(item => item.id != id);
}

function supprimerMembre(target) {
    let idDelete = target.dataset.id;

    membres = filterMembreParId(idDelete);

    saveMembresToLS(membres);

    afficheMembres();
}

//modifier membre:

listes.addEventListener("click", function (event) {

    let button = event.target.closest(".btn-modifier");

    if (button) {
        modifierMembre(button);
    }

});


function trouverMembreId(id) {
    return membres.find((membre) => membre.id == id)
}


function modifierMembre(target) {

    let idModifier = Number(target.dataset.id);
    let membre = trouverMembreId(idModifier);

    membreEnCours = membre;

    dialogM.showModal();

    nomMembre.value = membre.nomMembre;
    selectGroupe.value = membre.idGroupe;
    previewMembre.src = membre.pseudoMembre;


}



//afficher total des membres dans interface
function afficherTotalMembres() {
      let total = membres.length;
       document.getElementById("total-membres").textContent = total;
}
afficherTotalMembres()
