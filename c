const PLAYERS_KEY = "players";

let players = readPlayersFromLS();  // [] ; [{id: 1, name: "elkf"}, {id: 1, name: "elkf"}]

const nameInput = document.getElementById("name");
const addBtn = document.getElementById("addBtn");
const modifyBtn = document.getElementById("modifyBtn");
const list = document.getElementById("list");

displayPlayers()


// document.addEventListener('DOMContentLoaded', ()=>{
//     modifyBtn.style.display = 'none'
// })

addBtn.addEventListener('click', function (event) {

    let nameInputValue = nameInput.value.trim();
    nameInput.value = "";

    if (!nameInputValue) alert("The name is empty");

    let player = {
        id: Date.now(),
        name: nameInputValue
    };

    players.push(player);
    savePlayersToLS(players);
    displayPlayers();

})


modifyBtn.addEventListener('click', function (event) {

    let player  = findPlayerById(event.target.dataset.id)

    player.name = nameInput.value

    savePlayersToLS(players);
    displayPlayers()


    addBtn.style.display = 'inline';
    modifyBtn.style.display = 'none';
    

    // let index = null;

    // players.forEach((player, position) => {
    //     if (player.id == event.target.dataset.id) {
    //         index = position;
    //         return;
    //     }
    // });

    // console.log(index);
    

    // if (index == null) { console.log("player index is not found!!"); return; }

    // players[index].name = nameInput.value

    // savePlayersToLS(players);
    // displayPlayers()


    // addBtn.style.display = 'inline';
    // modifyBtn.style.display = 'none';

})


// handle delete buttons
list.addEventListener('click', function (event) {

    if (event.target.classList.contains("supprimerBtn"))
        handleDelete(event.target);

    else if (event.target.classList.contains("modifierBtn"))
        handleModifyDisplay(event.target);

})


function handleDelete(target) {
    let idToDelete = target.dataset.id;  //event.target.getAttribute("data-id")

    players = filterPlayersById(idToDelete);

    savePlayersToLS(players);

    displayPlayers()
}



function handleModifyDisplay(target) {

    let idToDelete = target.dataset.id;  //event.target.getAttribute("data-id")
    let player = findPlayerById(idToDelete);

    nameInput.value = player.name;

    addBtn.style.display = 'none';
    modifyBtn.style.display = 'inline';

    modifyBtn.dataset.id = player.id;
}




function displayPlayers() {
    list.innerHTML = players.map((player) => {
        return `<li>${player.name}</li><button data-id=${player.id} class="supprimerBtn">Supprimer</button> <button data-id=${player.id} class="modifierBtn">Modifier</button>`
    })
        .join("")
}


function filterPlayersById(id) {
    return players.filter((item) => item.id != id);
}


function findPlayerById(id) {
    return players.find((item) => item.id == id);
}

function readPlayersFromLS() {
    return JSON.parse(localStorage.getItem(PLAYERS_KEY)) || [];
}

function savePlayersToLS(newPlayersList) {
    localStorage.setItem(PLAYERS_KEY, JSON.stringify(newPlayersList))
}