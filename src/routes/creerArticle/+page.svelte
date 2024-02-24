<script>
    import { beforeUpdate } from 'svelte';
    import { goto } from '$app/navigation';

    import { getUserConnecte } from '$lib/scripts/User.js';

    beforeUpdate(() => {
        let user = getUserConnecte();    
        if (!user || !user.estCommercant) {
            // On doit être connecté et en tant que client pour accéder à cette page
            goto('/');
        }
    });
</script>

<main>

</main>