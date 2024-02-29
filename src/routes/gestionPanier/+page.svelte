<script>
    import { beforeUpdate } from 'svelte';
    import { goto } from '$app/navigation';

    import MdDelete from 'svelte-icons/md/MdDelete.svelte'
    
    import Bouton from '$lib/components/Bouton.svelte';
    import GestionQuantiteArticle from '$lib/components/GestionQuantiteArticle.svelte';

    import { getUserConnecte, getIdUserConnecte } from '$lib/scripts/User.js';
    import { getArticlesPanier, modifierQuantitePanier, ajouterQuantiteStockageArticle, viderPanier } from '$lib/scripts/Article.js';

    beforeUpdate(() => {
        let user = getUserConnecte();    
        if (!user || user.estCommercant) {
            // On doit être connecté et en tant que commercant pour accéder à cette page
            goto('/');
        }
    });

    let panier = getArticlesPanier(getIdUserConnecte());

    // Supprimer un article du panier
    function supprimerArticle(idArticle) {
        document.querySelector('li[idArticle="' + idArticle + '"]').remove();
        panier[idArticle].quantite = 0;
        modifierQuantitePanier(idArticle, 0);
    }
    
    function validerAchat() {
        let obj_panier = Object.entries(panier)
        for (const i in obj_panier) {
            let [idArticle, articleEtQuantiteActuelle] = obj_panier[i];
            ajouterQuantiteStockageArticle(idArticle, -articleEtQuantiteActuelle.quantite)
        }
        viderPanier();
        goto('/');
        alert('Achat validé');
    }
</script>

<main class="d-flex align-content-center flex-wrap flex-column">
    <h1 class="text-center">Panier</h1>
    <ul class="list-unstyled">
        {#each Object.entries(panier) as [idArticle, articleEtQuantiteActuelle] (idArticle)}
            <li class="card m-3" idArticle={idArticle}>
                <div class="card-body d-flex justify-content-between align-items-center">
                    <h3 style="width: 7.5em;" class="text-center">{articleEtQuantiteActuelle.article.nom}</h3>
                    <img style="width: 6.5em;" src="src/lib/img/Article/{articleEtQuantiteActuelle.article.image}" alt={"Image de " + articleEtQuantiteActuelle.article.nom}>
                    <span style="width: 15em;" class="text-center">Prix unitaire : { Number(articleEtQuantiteActuelle.article.prix).toFixed(2) }€</span>
                    <div class="d-flex flex-column align-items-center">
                        <span>Quantité :</span>
                        <GestionQuantiteArticle idArticle={idArticle} bind:quantite={panier[idArticle].quantite} quantiteMax={articleEtQuantiteActuelle.article.quantite} modifierQuantiteStockage={false}/>
                    </div>
                    <span style="width: 15em;" class="text-center">Prix total : <span class="fw-bold">{Number(articleEtQuantiteActuelle.article.prix * panier[idArticle].quantite).toFixed(2) }€</span></span>
                    <Bouton Bouton={MdDelete} largeur="4.25em" onClick={() => supprimerArticle(idArticle)} style={"color: red;"}/>
                </div>
            </li>
        {/each}
    </ul>
    

    <div class="align-items-right d-flex justify-content-end">
        <p>Total à payer : { Number(Object.values(panier).reduce((acc, item) => acc + (item.quantite * item.article.prix) , 0)).toFixed(2) }€</p>
        <button class="btn btn-success mx-5" on:click={validerAchat}>Valider l'achat</button>
    </div>
</main>