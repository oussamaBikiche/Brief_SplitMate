import { readMembresFromLS, saveGroupsToLS } from "./storage.js";

import { readGroupsFromLS } from "./storage.js";
import { getGroupes } from "./groupes.js";
import{readMembresFromLS} from "./storage.js";
import { getMembres } from "./membres.js";

const groupes = getGroupes();
const btnOvrtD = document.getElementById("Creer-depense");
const dialogD = document.getElementById("dialogD");
const btnClsD = document.getElementById("annuler-depense");

btnOvrtD.addEventListener('click', () => {
    dialogD.showModal();
});

btnClsD.addEventListener('click', () => {
    dialogD.close();
});

const titreDepenseInput = document.getElementById('titre-depense')
const montantDepenseInput = document.getElementById('montant-depense')
const categorieDepense = document.getElementById('categorie-depense')
const dateDepense = document.getElementById('date-depense')
const groupeDepense = document.getElementById('groupe-depense')
const payeurDepense = document.getElementById('payeur-depense')
const membresConcernes = document.getElementById('membres-concernes')
const partsPersonnalisees = document.getElementById('parts-personnalisees')
const formActions = document.getElementById('enregistrer-depenses')

let tabDepenses = []
function EnregistrerUneDepense() {
    formActions.addEventListener('submit', (event) => {
        event.preventDefault();

        let depenses = {}

        depenses.titre = titreDepenseInput.value,
            depenses.montant = montantDepenseInput.value,
            depenses.catégorie = categorieDepense.value,
            depenses.date = dateDepense.value,
            depenses.groupeDepense = groupeDepense.value,
            depenses.payeur = payeurDepense.value,
            depenses.membresConcernés = membresConcernes.value



        tabDepenses.push(depenses);
        console.log(tabDepenses)


    })
   

}

function SelectAfficherGroupesAndMembre() {
    readGroupsFromLS();
    
    const optionHTML=groupes.map(groupe=>{

return `  <option value=${groupe.id}>${groupe.NomGroup}</option>`;
});
 groupeDepense.innerHTML=`  <option value=>Choisir un groupe</option>` +optionHTML.join('');
}
function filtrerPayeur(){

 readMembresFromLS()
 const membrePayeur=groupes.filter((group)=>group.NomGroup ===membres.groupeMembre)
    const optionHTML2= membrePayeur.map(membre=>{
        return `  <option value=${membre.id }>${membre.nomMembre}</option>`
 });
 payeurDepense.innerHTML=`<option value="">Choisir un payeur</option>`+optionHTML2.join('');


}



EnregistrerUneDepense()
 SelectAfficherGroupesAndMembre()
 filtrerPayeur()
 