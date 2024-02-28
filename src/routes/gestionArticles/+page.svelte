<script>
    import Bouton from '$lib/components/Bouton.svelte';

    import { beforeUpdate } from 'svelte';
    import { goto } from '$app/navigation';

    import MdAddShoppingCart from 'svelte-icons/md/MdAddShoppingCart.svelte'
    
    import { getUserConnecte, getIdUserConnecte } from '$lib/scripts/User.js';
    
    import ListerArticles from '$lib/components/listerArticles.svelte';
    
    beforeUpdate(() => {
        let user = getUserConnecte();    
        if (!user || !user.estCommercant) {
            // On doit être connecté et en tant que client pour accéder à cette page
            goto('/');
        }
    });
</script>

<main>
    <div>
        <ListerArticles titre="Gestion du stock" idCommercantConcerne={ getIdUserConnecte() } texteQuantite="Quantité restante"/>
    </div>

    <div class="d-flex btn btn-secondary position-fixed bottom-0 end-0 m-5 p-0 border border-dark rounded-circle border-2" style="width: 4em; height: 4em;">
        <Bouton Bouton={MdAddShoppingCart} onClick={() => goto('addOrUpdateArticle')}/>
    </div>
</main>