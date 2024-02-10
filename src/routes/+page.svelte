<script>
    import FormLoginOrRegister from "./formLoginOrRegister.svelte";

    function isConnected() {
		return false;
	}
</script>

{#if isConnected()}
<p>Condition is true</p>
{:else}
    <FormLoginOrRegister />
{/if}