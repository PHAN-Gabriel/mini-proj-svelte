<script>
    import IconButton from '@smui/icon-button';

    export let Bouton;
    export let onClick;
    export let largeur = "auto";
    export let style = "";
</script>

<IconButton class="bg-transparent" style={"border: none; height: auto; width: " + largeur + "; " + style} on:click={onClick}>
    <Bouton />
</IconButton>