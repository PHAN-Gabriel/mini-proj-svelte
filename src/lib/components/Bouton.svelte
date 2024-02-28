<script>
    import IconButton from '@smui/icon-button';

    export let Bouton;
    export let onClick;
    export let largeur = "auto";
</script>

<IconButton class="bg-transparent" style="border: none; height: auto; width: {largeur}" on:click={onClick}>
    <Bouton />
</IconButton>