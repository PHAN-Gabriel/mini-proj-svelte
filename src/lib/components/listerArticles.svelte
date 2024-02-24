<script>
    import { getArticles } from '$lib/scripts/Article.js';
    import Article from '$lib/components/Article.svelte';

    export let idCommercantConcerne = null;
    export let texteQuantite;

    let modifierQuantiteStockage = idCommercantConcerne != null;
</script>

<div class="d-flex flex-wrap justify-content-center">
    {#each Object.entries(getArticles(idCommercantConcerne)) as [idArticle, article]}
        <Article id={idArticle} nom={article["nom"]} prix={article["prix"]} image={article["image"]} quantiteMax={article["quantite"]} modifierQuantiteStockage={modifierQuantiteStockage} texteQuantite={texteQuantite} />
    {/each}
</div>