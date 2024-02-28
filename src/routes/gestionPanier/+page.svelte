<script>
    import { beforeUpdate } from 'svelte';
    import { goto } from '$app/navigation';

    import { getUserConnecte } from '$lib/scripts/User.js';

    beforeUpdate(() => {
        let user = getUserConnecte();    
        if (!user || user.estCommercant) {
            // On doit être connecté et en tant que commercant pour accéder à cette page
            goto('/');
        }
    });
</script>

<main>
    {#each [] as color}
        <p>color</p>
    {:else}
        <h2 class="text-center mt-5">Vous n'avez aucun article dans le panier</h2>
	{/each} 
</main>