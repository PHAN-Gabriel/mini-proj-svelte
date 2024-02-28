<script>
    import { getArticles } from '$lib/scripts/Article.js';
    import Article from '$lib/components/Article.svelte';

    export let idCommercantConcerne = null;
    export let texteQuantite;
    export let titre;

    let modifierQuantiteStockage = idCommercantConcerne != null;
    let editable = idCommercantConcerne != null;
</script>

<h1 class="text-center mt-5">{titre}</h1>
<div class="d-flex flex-wrap justify-content-center">
    {#each Object.entries(getArticles(idCommercantConcerne)) as [idArticle, article]}
        <Article id={idArticle} nom={article["nom"]} prix={article["prix"]} image={article["image"]} quantiteMax={article["quantite"]} modifierQuantiteStockage={modifierQuantiteStockage} editable={editable} texteQuantite={texteQuantite} />
    {/each}
</div>