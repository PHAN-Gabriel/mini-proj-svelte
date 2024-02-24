<script>
    import IconButton from '@smui/icon-button';

    export let Bouton;
    export let onClick;
</script>

<IconButton class="bg-transparent" style="border: none;" on:click={onClick}>
    <Bouton />
</IconButton>