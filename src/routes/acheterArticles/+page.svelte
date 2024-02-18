<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    import { getUserConnecte } from '$lib/Users.js';
    
    onMount(() => {
        let user = getUserConnecte();    
        if (!user) {
            // On doit être connecté pour accéder à cette page
            goto('/');
        } else if (user.estCommercant) {
            goto('/gestionArticles');
        }
    });
</script>

<main>
    <div>
        <h1>Accueil client</h1>
    </div>
</main>