import { readGroupsFromLS } from "./storage.js";
import { readMembresFromLS } from "./storage.js";
import { saveMembresToLS } from "./storage.js";


const btnOvrtM = document.getElementById("Creer-membre");
const dialogM = document.getElementById("dialogM");
const btnClsM = document.getElementById("Annuler-membre");

const formGembre = document.getElementById("form-membre");
const nomMembre = document.getElementById("nom-membre");
const pseudoMembre = document.getElementById("pseudo-membre");
const selectGroupe = document.getElementById("groupe-membre");
const listes = document.getElementById("liste-membres");
const formActions = document.getElementById("form-actions");
const enregistrerMembre = document.getElementById('enregistrer-membre');


let membres = readMembresFromLS();
let groupes = readGroupsFromLS();


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


formGembre.addEventListener('submit', function (event) {
    event.preventDefault();
    let objtMembre = {
        id: createId(),
        nomMembre: nomMembre.value,
        pseudoMembre: pseudoMembre.value,
        groupeMembre: selectGroupe.selectedOptions[0].text,
        idGroupe: Number(selectGroupe.value),
        totalPaye: 0,
        soldeActuel: 0
    }

    membres.push(objtMembre);
    saveMembresToLS(membres);
    afficheMembres()
    console.log(membres)
})


function afficheMembres() {
    listes.innerHTML = "";
    membres.forEach(function (membre) {
        if (membres.length == 0) {
            listes.innerHTML = ` <tr>
                            <td colspan="6">Aucun membre enregistré pour le moment.</td>
                        </tr>`
        } else {
            listes.innerHTML += `<tr>
                            <td>${membre.nomMembre}</td>
                            <td>${membre.pseudoMembre}</td>
                            <td>${membre.groupeMembre}</td>
                            <td>${membre.totalPaye ?? 0} DH</td>
                            <td>${membre.soldeActuel ?? 0} DH</td>
                            <td>
                                <a href="js/membres.js"> <i class="fa-solid fa-pen-clip"></i></a>
                                <a href="js/membres.js"><i class="fa-solid fa-trash-can"></i></a>
                            </td>
                        </tr>`
        }
    })
}
