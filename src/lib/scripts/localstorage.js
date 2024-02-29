import { ajouterArticle } from '$lib/scripts/Article.js';


export function definirLocalStorageAvecValeursDefaut() {
    if (localStorage.length == 0) {
        let users = {
            "0": {
                "nom": "JeSuis",
                "prenom": "UnCommercant",
                "pseudo": "Commercant",
                "mdp": "ac80722c0e6f63ea3a2e1839ba55fda87596230e426718ea3ec0d57908068272",
                "estCommercant": true
            },
            "1": {
                "nom": "UnAutre",
                "prenom": "CommercantConcurrent",
                "pseudo": "CommercantAdverse",
                "mdp": "CommercantAdverse",
                "estCommercant": true
            },
            "2": {
                "nom": "MoiÊtre",
                "prenom": "UnClient",
                "pseudo": "LeClient",
                "mdp": "25e951c5854901093244d22b7dbe58309e665b7615f1f6f1a66f1bf74b9508d5",
                "estCommercant": false
            }
        }

        ajouterArticle("Orange", 0.50, 5, "orange.jpg", 0);
        ajouterArticle("Pomme", 1, 4, "pomme.jpg", 0);
        ajouterArticle("Poire", 2, 0, "poire.jpg", 0);
        ajouterArticle("Banane", 1.50, 7, "banane.jpg", 1);

        localStorage.setItem("users", JSON.stringify(users));
    }
}