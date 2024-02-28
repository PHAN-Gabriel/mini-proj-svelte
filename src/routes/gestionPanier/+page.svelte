<script>
    import { beforeUpdate } from 'svelte';
    import { goto } from '$app/navigation';

    import { getUserConnecte, estConnecte} from '$lib/scripts/User.js';
    import { getArticlesPanier, modifierQuantitePanier } from '$lib/scripts/Article.js';
    import { getArticle } from '$lib/scripts/Article.js';

    beforeUpdate(() => {
        let user = getUserConnecte();    
        if (!user || user.estCommercant) {
            // On doit être connecté et en tant que commercant pour accéder à cette page
            goto('/');
        }
    });

    let panier = {};
    let total = 0;

    // Initialisation du panier et du total lors du chargement de la page
    function initialiserPanier() {
        panier = getArticlesPanier(getUserConnecte().id);
        recalculerTotal();
    }

    // Recalculer le total du panier
    function recalculerTotal() {
        total = Object.entries(panier).reduce((acc, [idArticle, quantite]) => {
            let article = getArticle(idArticle);
            return acc + (article.prix * quantite);
        }, 0);
    }

    // Modifier la quantité d'un article dans le panier
    function modifierQuantite(idArticle, nouvelleQuantite) {
        if (nouvelleQuantite < 0) {
            nouvelleQuantite = 0; // Assure que la quantité ne devient pas négative
        }
        panier[idArticle] = nouvelleQuantite;
        modifierQuantitePanier(getUserConnecte().id, panier); // Mettre à jour la quantité dans le panier
        recalculerTotal();
    }

    // Supprimer un article du panier
    function supprimerArticle(idArticle) {
        delete panier[idArticle];
        modifierQuantitePanier(getUserConnecte().id, panier); // Mettre à jour le panier après la suppression
        recalculerTotal();
    }

    function validerAchat() {
        alert("Achat validé !");
        panier = {};
        recalculerTotal();
    }

    initialiserPanier();
</script>

<!-- <main>
    {#each [] as color}
        <p>color</p>
    {:else}
        <h2 class="text-center mt-5">Vous n'avez aucun article dans le panier</h2>
	{/each} 
</main> -->

<main>
    {#if !estConnecte()}
        <p>Veuillez vous connecter pour accéder à votre panier.</p>
    {:else}
        <h1>Panier</h1>
        <ul>
            {#each Object.entries(panier) as [idArticle, quantite]}
                {#if getArticle(idArticle)}
                    <li>
                        <span>{getArticle(idArticle).nom} - Quantité: {quantite}</span>
                        <button on:click={() => modifierQuantite(idArticle, quantite - 1)}>-</button>
                        <button on:click={() => supprimerArticle(idArticle)}>Supprimer</button>
                    </li>
                {/if}
            {/each}
        </ul>
        <p>Total: {total}€</p>
        <button on:click={validerAchat}>Valider l'achat</button>
    {/if}
</main>