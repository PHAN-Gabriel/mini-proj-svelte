<script>
    import { sha256 } from 'js-sha256';

    export let type = 'text';
    export let label = undefined;
    export let value = undefined;
    export let errors = undefined;

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
        <label for={label}>{label} :</label>
        <input id="input_{label}" name="{label}" type="checkbox" bind:checked={value}>
    {:else if type == "password"}
        <input id="input_{label}" name="{label}" use:typeInput on:change={() => value = sha256(value)} placeholder="{label}" required>
    {:else}
        <input id="input_{label}" name="{label}" use:typeInput bind:value placeholder="{label}" required>
    {/if}


    {#if errors}
        <span id="errors_{label}" class="text-danger">{errors}</span>
    {/if}
</div>
