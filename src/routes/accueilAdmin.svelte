<script>
    import IconButton from '@smui/icon-button';
    import AddIcon from 'svelte-icons/io/IoIosAddCircleOutline.svelte'
    let clicked = 0;

    function handleClick() {
        clicked += 1;
    }
</script>

<style>
    .transparent-button {
        background-color: transparent;
        border: none;
    }
</style>
<main>
    <div>
        <h1>Accueil Admin</h1>
    </div>
    <div>
        <p>Vous avez cliqué {clicked} fois</p>
    </div>
    <div style="display: flex; align-items: center;">
        <IconButton class="transparent-button" pressed={handleClick}>
            <AddIcon/>
        </IconButton>
    </div>
</main>