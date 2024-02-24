export function getUsers() {
    try {
        return JSON.parse(localStorage.getItem('users'));
    } catch(error) {
        return {};
    }
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

    return userId;
}

export function estConnecte() {
    try {
        return localStorage.getItem('IdUserConnecte') != null;
    } catch {
        return false;
    }
}

export function faireConnecter(idUser) {
    let dict = {'idUser': idUser}
    localStorage.setItem('IdUserConnecte', JSON.stringify(dict));
}

export function getIdUserConnecte() {
    try {
        return JSON.parse(localStorage.getItem('IdUserConnecte'))['idUser'];
    } catch {
        return undefined;
    }
}

export function getUserConnecte() {
    try {
        let idUser = JSON.parse(localStorage.getItem('IdUserConnecte'))['idUser'];
        return getUsers()[idUser];
    } catch {
        return undefined;
    }
}

export function logOut() {
    localStorage.removeItem('IdUserConnecte');
    window.location.href = "/";
}