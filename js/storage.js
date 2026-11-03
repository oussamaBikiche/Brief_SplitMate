
const GROUPES_KEY = "groupes";


export function saveGroupsToLS(Ngroupes) {
    localStorage.setItem(GROUPES_KEY, JSON.stringify(Ngroupes))
}

export function readGroupsFromLS() {
    return JSON.parse(localStorage.getItem(GROUPES_KEY)) || [];
}
