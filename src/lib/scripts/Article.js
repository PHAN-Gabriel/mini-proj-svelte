export function getArticles(idCommercant=null) {
    try {
        let articles = JSON.parse(localStorage.getItem('articles'));

        if (idCommercant == null) {
            return articles;
        } else {
            return Object.values(articles).filter((article) => article.idCommercantAppartenance == idCommercant);
        }
    } catch(error) {
        return {};
    }
}

export function changerQuantite(idArticle, nouvelleQuantite) {
    let articles = JSON.parse(localStorage.getItem('articles'));

    articles[idArticle].quantite = nouvelleQuantite;

    localStorage.setItem('articles', JSON.stringify(articles));
}

export function ajouterArticle(nom, prix, quantite, nom_fichier_image, idCommercant) {
    let articles = {}
    try {
        articles = JSON.parse(localStorage.getItem('articles')) ?? {};
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
        "prix": prix,
        "image": nom_fichier_image,
        "quantite": quantite,
        "idCommercantAppartenance": idCommercant
    };

    articles[nouveauIdArticle] = nouveauArticle;
    localStorage.setItem('articles', JSON.stringify(articles));
}