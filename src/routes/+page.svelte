<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    
    import { estConnecte, getUserConnecte } from '$lib/Users.js';

    import FormLoginOrRegister from "./formLoginOrRegister.svelte";

    onMount(() => {
        if (estConnecte()) {
            let redirectTo = '/acheterArticles';
            if (getUserConnecte().estCommercant) {
            redirectTo = '/gestionArticles';
            }
            goto(redirectTo);
        }
    });
</script>

<FormLoginOrRegister />