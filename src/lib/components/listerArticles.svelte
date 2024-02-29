<script>
    import { getArticles } from '$lib/scripts/Article.js';
    import Article from '$lib/components/Article.svelte';

    export let idCommercantConcerne = null;
    export let texteQuantite;
    export let titre;

    let modifierQuantiteStockage = idCommercantConcerne != null;
    let editable = idCommercantConcerne != null;
</script>

<style>
    .w-15vw {
      width: 15vw
    }

    .w-min {
      width: min-content;
    }
  </style>

<h1 class="text-center mt-5">{titre}</h1>
<div class="d-flex flex-wrap justify-content-center">
    {#each Object.entries(getArticles(idCommercantConcerne)) as [idArticle, article]}
        {#if idCommercantConcerne != null || article.quantite > 0}
            <Article idArticle={idArticle} nom={article["nom"]} prix={article["prix"]} image={article["image"]} quantiteMax={article["quantite"]} modifierQuantiteStockage={modifierQuantiteStockage} editable={editable} texteQuantite={texteQuantite} />
        {:else if idCommercantConcerne == null && article.quantite == 0}
            <div class="border border-black rounded border-2 w-min text-center m-3 bg-light">
                <img class="m-1 w-15vw h-auto" src="src/lib/img/Article/{article["image"]}" alt={"Image de " + article["nom"]}>
                <span class="h5">{article["nom"]}<br/>[HORS STOCK]</span>
            </div>
        {/if}  
    {/each}
</div>