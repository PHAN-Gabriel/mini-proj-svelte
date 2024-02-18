export function getUsers() {
    return JSON.parse(localStorage.getItem('users'));
}

export function getIdUserByPseudo(pseudo) {
    let users = getUsers();
    let userId = null;

    if (users) {
        for (let id in users) {
            if(users[id].pseudo == pseudo) {
                userId = id;
                break;
            }
        }
    }

    return userId
}

export function estConnecte() {
    return localStorage.getItem('IdUserConnecte') != null;
}

export function getUserConnecte() {
    let idUser = localStorage.getItem('IdUserConnecte');
    return getUsers()[idUser];
}