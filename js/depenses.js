const btnOvrtD = document.getElementById("Creer-depense");
const dialogD= document.getElementById("dialogD");
const btnClsD = document.getElementById("annuler-depense");

btnOvrtD.addEventListener('click', () => {
    dialogD.showModal(); 
});

btnClsD.addEventListener('click', () => {
    dialogD.close(); 
});

