<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    
    import { getUserConnecte } from '$lib/Users.js';

    import IconButton from '@smui/icon-button';
    import AddIcon from 'svelte-icons/io/IoIosAddCircleOutline.svelte';
    
    onMount(() => {
        let user = getUserConnecte();
        if (!user) {
            goto('/');
        } else if (!user.estCommercant) {
            goto('/acheterArticles');
        }
    });

    let clicked = 0;
    function handleClick() {
        clicked += 1;
    }
</script>

<main>
    <div>
        <h1>Accueil commerçant</h1>
    </div>
    <div>
        <p>Vous avez cliqué {clicked} fois</p>
    </div>
    <div>
        <IconButton class="bg-transparent" style="border: none;" on:click={handleClick}>
            <AddIcon/>
        </IconButton>
    </div>
</main>