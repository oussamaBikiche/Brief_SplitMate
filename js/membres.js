const btnOvrtM = document.getElementById("Creer-membre");
const dialogM= document.getElementById("dialogM");
const btnClsM = document.getElementById("Annuler-membre");

btnOvrtM.addEventListener('click', () => {
    dialogM.showModal(); 
});

btnClsM.addEventListener('click', () => {
    dialogM.close(); 
});

console.log(addEventListener)