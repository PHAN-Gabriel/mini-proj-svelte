<script>
    export let type = 'text';
    export let label = undefined;
    export let value = undefined;
    export let erreur = undefined;
    let labelDev = label.replaceAll(" ", "_").toLowerCase();

    let pos_div = "start";
    if (type == "submit") {
        value = label;
        pos_div = "end";
    }

    function typeInput(node) {
        node.type = type;

        switch (type) {
            case "text":
            case "password":
                node.className += "form-control w-100";
                break;
            case "submit":
                node.className += "btn btn-success";
                break;
        }
    }
</script>

<div class="text-{pos_div} mt-1">
    {#if type == "checkbox"}
        <label for={labelDev}>{label} :</label>
        <input id="input_{labelDev}" name="{labelDev}" type="checkbox" bind:checked={value}>
    {:else}
        <input id="input_{labelDev}" name="{labelDev}" use:typeInput bind:value placeholder="{label}" required>
    {/if}


    {#if erreur}
        <span id="errors_{labelDev}" class="text-danger">{erreur}</span>
    {/if}
</div>
