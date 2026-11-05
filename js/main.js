const items = document.querySelectorAll(".items");
const sections = document.querySelectorAll(".page-section");
const titrePage = document.getElementById("titre-page");
const searchInput = document.getElementById("search");
let titre = document.querySelector("h1, h2, h3, p");


//affiche les sections
items.forEach(function (item) {

    item.addEventListener("click", function (event) {

        event.preventDefault();

        const sectionId = item.dataset.section;

        sections.forEach(function (sectionHidden) {

            sectionHidden.hidden = true;

        });

        const sectionActive = document.getElementById(sectionId);

        sectionActive.hidden = false;

        titrePage.textContent = item.textContent.trim();

    });

});


//recherche:
searchInput.addEventListener("input", function () {

    let searchValue = searchInput.value.toLowerCase().trim();

    sections.forEach(function (section) {

        let titre = section.querySelector(".title-main");

        if (titre && titre.textContent.toLowerCase().includes(searchValue)) {
            section.hidden = false;
        } else {
            section.hidden = true;
        }

    });

});