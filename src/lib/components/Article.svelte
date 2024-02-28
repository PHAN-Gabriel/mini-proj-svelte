<script>
    import { modifierQuantiteStockageArticle, supprimerArticle, modifierQuantitePanier, getQuantiteActuelArticle  } from '$lib/scripts/Article.js';

    import { goto } from '$app/navigation';

    import Bouton from '$lib/components/Bouton.svelte';
    import IoIosAddIcon from 'svelte-icons/io/IoIosAddCircleOutline.svelte';
    import IoIosRemoveIcon from 'svelte-icons/io/IoIosRemoveCircleOutline.svelte'
    import FaPencilAlt from 'svelte-icons/fa/FaPencilAlt.svelte'
    import MdDelete from 'svelte-icons/md/MdDelete.svelte'

    export let id;
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

    function ajouterQuantite(nb) {
      if (!modifierQuantiteStockage && quantite + nb > quantiteMax) {
        alert('Vous avez épuisé le stock !')
      } else if (quantite + nb >= 0) {
        quantite += nb;
      }

      if(modifierQuantiteStockage) {
        modifierQuantiteStockageArticle(id, quantite);
      } else {
        modifierQuantitePanier(id, quantite);
      }
    }

    function editer() {
      goto('/addOrUpdateArticle?idArticle=' + id);
    }

    function supprimer() {
      if (window.confirm("Êtes-vous sûr de vouloir supprimer l'article \"" + nom + "\" ?")) {
        supprimerArticle(id);
        goto("/");
      } else {
        return;
      }
    }

    if (!modifierQuantiteStockage) {
      quantite = getQuantiteActuelArticle(id);
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
    <div>
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
        <div class="d-flex flex-nowrap justify-content-center my-1">
          <Bouton Bouton={IoIosRemoveIcon} largeur="3.5em" onClick={() => ajouterQuantite(-1)}/>
          <span class="d-flex align-items-center h5">{quantite}</span>
          <Bouton Bouton={IoIosAddIcon} largeur="3.5em" onClick={() => ajouterQuantite(+1)}/>
        </div>
        <span class="m-1 text-nowrap">{texteQuantite} : { quantite }</span>
      </div>
    </div>
  </div>
  