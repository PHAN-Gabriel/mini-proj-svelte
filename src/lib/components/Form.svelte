<script>
    import { goto } from '$app/navigation';
    
    export let titre = null;
    export let fn_onsubmit;
</script>

<form on:submit={fn_onsubmit} class="d-flex flex-column align-items-center" enctype="multipart/form-data">
    <div class="border border-dark border-2 w-25 px-4 py-2" style="min-width: 20em">
        {#if titre != null}
            <h1>{titre}</h1>
        {/if}

        <slot></slot>
    </div>
</form>