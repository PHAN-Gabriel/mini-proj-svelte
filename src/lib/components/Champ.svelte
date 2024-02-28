<script>
    import { afterUpdate } from 'svelte';

    export let type = 'text';
    export let label = undefined;
    export let value = undefined;
    export let erreur = undefined;
    export let step = 1;
    export let required = true;

    let labelDev = label.replaceAll(" ", "_").toLowerCase();

    let pos_div = "start";
    if (type == "submit") {
        value = label;
        pos_div = "end";
    }

    afterUpdate(() => {
        let inputElement = document.getElementById(`input_${labelDev}`);
        if (inputElement && type !== 'submit') {
            if (required) {
                inputElement.setAttribute('required', '');
            } else {
                inputElement.removeAttribute('required');
            }
        }
    });

    function handleFileInputChange(event) {
        value = event.target.files[0];
    }

    function typeInput(node) {
        node.type = type;

        switch (type) {
            case "number":
                node.step = step;
            case "text":
            case "password":
                node.className += "form-control w-100";
                break;
            case "submit":
                node.className += "btn btn-success";
                node.parentNode.classList.remove("d-flex");
                break;
        }
    }
</script>

<div class="text-{pos_div} mt-1 d-flex align-items-center text-nowrap">
    {#if type == "checkbox"}
        <label for={labelDev}>{label} :</label>
        <input id="input_{labelDev}" name="{labelDev}" type="checkbox" bind:checked={value} class="ms-1">
    {:else if type == "file"}
        <label for={labelDev} class="me-1">{label} :</label>
        <input id="input_{labelDev}" name="{labelDev}" type="file" class="form-control" on:change={handleFileInputChange}>
    {:else}
        <input id="input_{labelDev}" name="{labelDev}" use:typeInput bind:value placeholder="{label}">
    {/if}
</div>
{#if erreur}
<span id="errors_{labelDev}" class="text-danger">{erreur}</span>
{/if}
