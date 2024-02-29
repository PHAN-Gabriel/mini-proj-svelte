<script>
    import { modifierQuantiteStockageArticle, modifierQuantitePanier  } from '$lib/scripts/Article.js';

    import Bouton from '$lib/components/Bouton.svelte';
    import IoIosAddIcon from 'svelte-icons/io/IoIosAddCircleOutline.svelte';
    import IoIosRemoveIcon from 'svelte-icons/io/IoIosRemoveCircleOutline.svelte'

    export let idArticle;
    export let quantite;
    export let quantiteMax;
    export let modifierQuantiteStockage;

    function ajouterQuantite(nb) {
      if (!modifierQuantiteStockage && quantite + nb > quantiteMax) {
        alert('Vous avez épuisé le stock !')
      } else if (quantite + nb >= 0) {
        quantite += nb;
      }

      if(modifierQuantiteStockage) {
        modifierQuantiteStockageArticle(idArticle, quantite);
      } else {
        modifierQuantitePanier(idArticle, quantite);
      }
    }
</script>

<div class="d-flex flex-nowrap justify-content-center my-1">
    <Bouton Bouton={IoIosRemoveIcon} largeur="3.5em" onClick={() => ajouterQuantite(-1)}/>
    <span class="d-flex align-items-center h5">{quantite}</span>
    <Bouton Bouton={IoIosAddIcon} largeur="3.5em" onClick={() => ajouterQuantite(+1)}/>
</div>
  