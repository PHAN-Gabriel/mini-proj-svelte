import { getUserConnecte, getIdUserConnecte } from '$lib/scripts/User.js';

export function getArticles(idCommercant=null) {
    try {
        let articles = JSON.parse(localStorage.getItem('articles'));
        if (idCommercant == null) {
            return articles;
        } else {
            console.log( Object.fromEntries(Object.entries(articles).filter(([key]) => articles[key].idCommercantAppartenance == idCommercant)));
            return Object.fromEntries(Object.entries(articles).filter(([key]) => articles[key].idCommercantAppartenance == idCommercant));
        }
    } catch(error) {
        return {};
    }
}

export function getArticle(idArticle) {
    return getArticles()[idArticle];
}

export function changerQuantite(idArticle, nouvelleQuantite) {
    let articles = getArticles();

    articles[idArticle].quantite = nouvelleQuantite;

    localStorage.setItem('articles', JSON.stringify(articles));
}

export function ajouterArticle(nom, prix, quantite, nom_fichier_image, idCommercant=null) {
    let user = getUserConnecte();
    if (idCommercant == null && (user == null || user.idCommercant)) {
        console.error("L'article n'a pas pu être ajoutée car l'utilisateur connecté n'est pas un commerçant");
        return;
    }

    idCommercant = idCommercant ?? getIdUserConnecte();

    let articles = {}
    try {
        articles = getArticles() ?? {};
    } catch {
        articles = {};
    }

    let nouveauIdArticle = 0;
    let idArticles = Object.keys(articles);
    if (idArticles.length > 0) {
        nouveauIdArticle = 1 + Math.max(...idArticles.map(str => parseInt(str)));
    }

    let nouveauArticle = {
        "nom": nom,
        "prix": parseFloat(prix),
        "image": nom_fichier_image,
        "quantite": parseInt(quantite),
        "idCommercantAppartenance": parseInt(idCommercant)
    };
    articles[nouveauIdArticle] = nouveauArticle;
    localStorage.setItem('articles', JSON.stringify(articles));
}


export function editerArticle(idArticle, nom, prix, quantite, nom_fichier_image) {
    let articles = {}
    try {
        articles = getArticles() ?? {};
    } catch {
        articles = {};
    }

    if (!(idArticle in articles)) {
        console.error("L'article ayant l'id " + idArticle + " est inexistant");
        return;
    }

    articles[idArticle] = {
        "nom": nom,
        "prix": parseFloat(prix),
        "image": nom_fichier_image ?? articles[idArticle].image,
        "quantite": parseInt(quantite),
        "idCommercantAppartenance": articles[idArticle].idCommercantAppartenance
    };

    localStorage.setItem('articles', JSON.stringify(articles));
}

export function supprimerArticle(idArticle) {
    let articles = {}
    try {
        articles = getArticles() ?? {};
    } catch {
        articles = {};
    }

    if (!(idArticle in articles)) {
        return;
    }

    delete articles[idArticle];
    localStorage.setItem('articles', JSON.stringify(articles));
}