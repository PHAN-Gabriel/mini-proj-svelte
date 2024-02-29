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

<main>
    <h1>Panier</h1>
    <ul>
        {#each Object.entries(panier) as [idArticle, articleEtQuantiteActuelle] (idArticle)}
            <li idArticle={idArticle}>
                <Bouton Bouton={MdDelete} largeur="2.25em" onClick={() => supprimerArticle(idArticle)}/>
                <span>{articleEtQuantiteActuelle.article.nom}</span>
                <span>Prix unitaire : { Number(articleEtQuantiteActuelle.article.prix).toFixed(2) }€</span>
                <GestionQuantiteArticle idArticle={idArticle} bind:quantite={panier[idArticle].quantite} quantiteMax={articleEtQuantiteActuelle.article.quantite} modifierQuantiteStockage={false}/>
                <span>Prix total : {Number(articleEtQuantiteActuelle.article.prix * panier[idArticle].quantite).toFixed(2) }€</span>
            </li>
        {/each}
    </ul>

    <p>Total: { Number(Object.values(panier).reduce((acc, item) => acc + (item.quantite * item.article.prix) , 0)).toFixed(2) }€</p>
    <button class="btn btn-success" on:click={validerAchat}>Valider l'achat</button>
</main>