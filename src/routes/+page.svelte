<script>
    import { beforeUpdate } from 'svelte';
    import { goto } from '$app/navigation';
    
    import { estConnecte, getUserConnecte } from '$lib/scripts/User.js';
    import { definirLocalStorageAvecValeursDefaut } from '$lib/scripts/localstorage.js';

    import FormLoginOrRegister from "$lib/components/formLoginOrRegister.svelte";

    function faireRedirectionSelonConnexion() {
        if (estConnecte()) {
            let redirectTo = '/acheterArticles';
            if (getUserConnecte() != null && getUserConnecte().estCommercant) {
                redirectTo = '/gestionArticles';
            }
            goto(redirectTo);
        }
    }

    beforeUpdate(() => { definirLocalStorageAvecValeursDefaut(); faireRedirectionSelonConnexion(); });
</script>

<FormLoginOrRegister fn_redirection={() => location.reload()}/>