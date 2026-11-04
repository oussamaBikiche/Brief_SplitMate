const GROUPES_KEY = "groupes";

export function readGroupsFromLS() {
    return JSON.parse(localStorage.getItem(GROUPES_KEY)) || [];
}

export function saveGroupsToLS(groupes) {
    localStorage.setItem(GROUPES_KEY, JSON.stringify(groupes))
}



const MEMBRES_KEY = "membres";

export function readMembresFromLS() {
    return JSON.parse(localStorage.getItem(MEMBRES_KEY)) || [];
}

export function saveMembresToLS(membres) {
    localStorage.setItem(MEMBRES_KEY, JSON.stringify(membres))
}
