<script>
    import { beforeUpdate } from 'svelte';
    import { goto } from '$app/navigation';

    import { getUserConnecte } from '$lib/scripts/User.js';

    import ListerArticles from '$lib/components/listerArticles.svelte';
    
    beforeUpdate(() => {
        let user = getUserConnecte();    
        if (!user || user.estCommercant) {
            // On doit être connecté et en tant que commercant pour accéder à cette page
            goto('/');
        }
    });
</script>

<main>
    <ListerArticles titre="Bienvenue, que souhaitez-vous acheter ?" texteQuantite="Quantité dans le panier" />
</main>