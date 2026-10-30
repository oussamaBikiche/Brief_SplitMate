const items = document.querySelectorAll(".items");

const sections = document.querySelectorAll(".page-section");

const titrePage = document.getElementById("titre-page");

items.forEach(function (item) {

    item.addEventListener("click", function () {
        const sectionId = item.dataset.section;
        sections.forEach(function (sectionHidden) {
            sectionHidden.hidden = true;
        });
        const sectionActive = document.getElementById(sectionId);
        sectionActive.hidden = false;
        titrePage.textContent = item.textContent.trim();

    });

});
