<script>
    export let type = 'text';
    export let label = undefined;
    export let value = undefined;
    export let errors = undefined;

    if (type == "submit") {
        value = label;
    }

    function typeInput(node) {
        node.type = type;
    }
</script>

<style>
    div {
        text-align: right;
        margin-top: 0.5em;
    }
</style>

<div class="space-y-1">
    {#if type != "submit"}
        <label for={label}>{label} :</label>
    {/if}

    <input id="input_{label}" name="{label}" use:typeInput bind:value class="rounded-md w-full" placeholder="{label}">

    {#if errors}
        <p id="errors_{label}" class="text-sm text-red-600">{errors}</p>
    {/if}
</div>
