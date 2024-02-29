<script>
    import { modifierQuantiteStockageArticle, supprimerArticle, modifierQuantitePanier, getQuantiteActuelleArticle  } from '$lib/scripts/Article.js';

    import { goto } from '$app/navigation';

    import Bouton from '$lib/components/Bouton.svelte';
    import GestionQuantiteArticle from '$lib/components/GestionQuantiteArticle.svelte';
    import FaPencilAlt from 'svelte-icons/fa/FaPencilAlt.svelte'
    import MdDelete from 'svelte-icons/md/MdDelete.svelte'

    export let idArticle;
    export let nom;
    export let prix;
    export let image;
    export let texteQuantite = "Quantité actuelle";
    export let quantiteMax;
    export let modifierQuantiteStockage;
    export let editable = false;

    let quantite = 0;
    if (modifierQuantiteStockage) {
      quantite = quantiteMax;
    }

    function editer() {
      goto('/addOrUpdateArticle?idArticle=' + idArticle);
    }

    function supprimer() {
      if (window.confirm("Êtes-vous sûr de vouloir supprimer l'article \"" + nom + "\" ?")) {
        supprimerArticle(idArticle);
        goto("/");
      } else {
        return;
      }
    }

    if (!modifierQuantiteStockage) {
      quantite = getQuantiteActuelleArticle(idArticle);
    }
  </script>
  
  <style>
    .w-15vw {
      width: 15vw
    }

    .w-min {
      width: min-content;
    }
  </style>
  
  <div class="border border-black rounded border-2 w-min text-center m-3 bg-light d-flex flex-wrap align-content-between justify-content-center">
    <img class="m-1 w-15vw h-auto" src="src/lib/img/Article/{image}" alt={"Image de " + nom}>
    <div class="d-flex flex-column align-items-center">
      <div class="d-flex flex-nowrap justify-content-between my-1">
        {#if editable}
            <Bouton Bouton={MdDelete} largeur="2.25em" onClick={() => supprimer()}/>
        {/if}
        <div class="d-flex align-items-center h5">{nom}</div>
        {#if editable}
            <Bouton Bouton={FaPencilAlt} largeur="2.25em" onClick={() => editer()}/>
        {/if}
      </div>
      <div class="my-1">{ Number(prix).toFixed(2) }€</div>
      <div>
        <GestionQuantiteArticle idArticle={idArticle} bind:quantite={quantite} quantiteMax={quantiteMax} modifierQuantiteStockage={modifierQuantiteStockage}/>
        <span class="m-1 text-nowrap">{texteQuantite} : { quantite }</span>
      </div>
    </div>
  </div>
  